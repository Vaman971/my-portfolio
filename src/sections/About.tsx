"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import axios from "axios";

type About = {
  id: string;
  title: string;
  content: string;
  avatar?: string;
  order: number;
};

export default function AboutSection() {
  const [aboutData, setAboutData] = useState<About[] | null>(null);

  useEffect(() => {
    async function fetchAbout() {
      try {
        const res = await axios.get("/api/about");
        const sorted = res.data.sort((a: About, b: About) => a.order - b.order);
        setAboutData(sorted);
      } catch (err) {
        console.error("Failed to fetch about data:", err);
      }
    }
    fetchAbout();
  }, []);

  if (!aboutData || aboutData.length === 0) return null;

  const first = aboutData[0]; // Primary "About Me" entry
  const others = aboutData.slice(1); // Additional paragraphs/sections

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
    >
      {/* Image */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-lg">
          <Image
            src={first?.avatar || "/profile.png"}
            alt={first?.title || "About Me"}
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {first?.title || "About Me"}
        </h2>

        <p className="text-muted-foreground mb-4">{first?.content}</p>

        {/* {others.map((item) => (
          <p key={item.id} className="text-muted-foreground mb-4">
            {item.content}
          </p>
        ))} */}
      </motion.div>
    </section>
  );
}
