"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

type SiteConfig = {
  ownerName: string;
  cvUrl?: string;
};

export default function Navbar() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await axios.get("/api/site-config");
        setConfig(res.data);
        setTheme(res.data.theme?.mode || "light"); // Set initial theme
      } catch (err) {
        console.error("Failed to fetch site config:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchConfig();
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link
          href="/"
          className="text-xl font-bold text-primary hover:opacity-80 transition"
        >
          {loading ? "Loading..." : config?.ownerName || "My Portfolio"}
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-primary text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-4">
          {/* Resume button */}
          {config?.cvUrl && (
            <Button asChild>
              <a href={config.cvUrl} target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </Button>
          )}

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
