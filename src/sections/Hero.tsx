"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import axios from "axios";

type SiteConfig = {
  ownerName: string;
  title: string;
  tagline?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
};

export default function Hero() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await axios.get("/api/site-config");
        setConfig(res.data);
      } catch (err) {
        console.error("Failed to fetch site config:", err);
      }
    }
    fetchConfig();
  }, []);

  const ownerName = config?.ownerName || "Your Name";
  const title = config?.title || "Your Title";
  const tagline =config?.tagline;
  const primary = config?.theme?.primaryColor || "hsl(var(--primary))";
  const secondary = config?.theme?.secondaryColor || "hsl(var(--secondary))";

  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20"
    >
      <motion.h1
        className="text-5xl md:text-7xl font-extrabold leading-tight"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Hi, I’m{" "}
        <span style={{ color: primary }}>{ownerName}</span> 👋
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl max-w-2xl text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.p>

      {tagline && (
        <motion.p
          className="mt-3 text-base md:text-lg max-w-2xl text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {tagline}
        </motion.p>
      )}

      <motion.div
        className="mt-8 flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          size="lg"
          asChild
          style={{ backgroundColor: primary, color: "#fff" }}
        >
          <a href="#projects">View Projects</a>
        </Button>
        <Button
          size="lg"
          variant="outline"
          asChild
          style={{
            borderColor: secondary,
            color: primary,
          }}
        >
          <a href="#contact">Contact Me</a>
        </Button>
      </motion.div>
    </section>
  );
}
