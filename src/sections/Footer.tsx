"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { set } from "zod";

interface SiteConfig {
  id?: string;
  ownerName: string;
  title: string;
  socials?: Record<string, string>;
};

interface Socials {
  github?: string;
  linkedin?: string;
  email?: string;
}

export default function Footer() {
  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [socials, setSocials] = useState<Socials | null>(null);


  // 🔹 Fetch site-config once
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch("/api/site-config");
        const data = await res.json();
        setConfig(data);
        setSocials(data?.socials || {});
      } catch (err) {
        console.error("Failed to fetch site config:", err);
      }
    }
    fetchConfig();
  }, []);


  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-20">
      <motion.div
        className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Left side - Name & Role */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">{config?.ownerName}</h3>
          <p className="text-sm text-gray-400">{config?.title}</p>
        </div>

        {/* Middle - Navigation */}
        <nav className="flex flex-wrap justify-center gap-4 text-sm">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side - Social Icons */}
        <div className="flex gap-5 text-lg">
          {socials?.github && (
            <a
              href={socials?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
          )}
          {socials?.linkedin && (
            <a
              href={socials?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <FaLinkedin />
            </a>
          )}
          {socials?.email && (
            <a
              href={`mailto:${socials?.email}`}
              className="hover:text-white transition-colors"
            >
              <FaEnvelope />
            </a>
          )}
        </div>
      </motion.div>

      {/* Bottom line */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} {config?.ownerName}. Built with{" "}
        <span className="text-white">Next.js</span> &{" "}
        <span className="text-white">Tailwind CSS</span>.
      </div>
    </footer>
  );
}
