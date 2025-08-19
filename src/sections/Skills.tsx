"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
  icon?: string; // URL from your DB
};

// shimmer animation config
const shimmerAnimation = {
  x: ["-100%", "100%"],
  transition: {
    repeat: Infinity,
    duration: 1.2,
    ease: "linear" as const,
  },
};

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [viewed, setViewed] = useState(false);

  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await axios.get("/api/skills");
        setSkills(res.data || []);
      } catch (err) {
        console.error("Failed to fetch skills:", err);
      }
    }
    fetchSkills();
  }, []);

  // group skills by category
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {Object.entries(grouped).map(([category, skills], idx) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: { duration: 0.6, delay: idx * 0.2 },
            }}
            viewport={{ once: true }}
            onViewportEnter={() => setViewed(true)}
          >
            {/* Category title */}
            <motion.h3
              className="text-xl font-semibold mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: { duration: 0.6, delay: idx * 0.15 },
              }}
              viewport={{ once: true }}
            >
              {category}
            </motion.h3>

            {/* Skills */}
            <div className="space-y-5">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, delay: i * 0.25 },
                  }}
                  viewport={{ once: true }}
                >
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {skill.icon ? (
                        <Image
                          src={skill.icon}
                          alt={skill.name}
                          width={20}
                          height={20}
                          className="object-contain"
                          unoptimized = {true}
                        />
                      ) : (
                        <span className="text-primary">⚡</span>
                      )}
                      <span>{skill.name}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary h-3 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      initial={{ width: 0 }}
                      animate={{
                        width: viewed ? `${skill.level}%` : 0,
                      }}
                      transition={{
                        duration: 1,
                        delay: i * 0.25,
                      }}
                      style={{
                        background:
                          "linear-gradient(180deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--primary)))",
                        backgroundSize: "200% 100%",
                      }}
                    >
                      {/* shimmer */}
                      {viewed && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/50 to-white/10"
                          animate={shimmerAnimation}
                        />
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
