"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useState } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiDocker,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: JSX.Element;
  level: number;
};

const skillsData: { category: string; skills: Skill[] }[] = [
  {
    category: "Frontend",
    skills: [
      { name: "Next.js", icon: <SiNextdotjs />, level: 90 },
      { name: "React.js", icon: <SiReact />, level: 90 },
      { name: "TypeScript", icon: <SiTypescript />, level: 85 },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 90 },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", icon: <SiNodedotjs />, level: 85 },
      { name: "Express.js", icon: <SiExpress />, level: 85 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, level: 85 },
      { name: "MySQL", icon: <SiMysql />, level: 80 },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git", icon: <SiGit />, level: 90 },
      { name: "GitHub", icon: <SiGithub />, level: 90 },
      { name: "Docker", icon: <SiDocker />, level: 70 },
    ],
  },
];

export default function Skills() {
  const [viewed, setViewed] = useState(false);

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
        {skillsData.map((category, idx) => (
          <motion.div
            key={idx}
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
              {category.category}
            </motion.h3>

            {/* Skills */}
            <div className="space-y-5">
              {category.skills.map((skill, i) => {
                const shimmerControls = useAnimationControls();

                if (viewed) {
                  shimmerControls.start({
                    x: ["-100%", "100%"],
                    transition: {
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "linear",
                    },
                  });

                  setTimeout(() => {
                    shimmerControls.stop();
                  }, (1 + i * 0.25) * 1000); // matches sequential delay
                }

                return (
                  <motion.div
                    key={i}
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
                        <span className="text-primary text-lg">
                          {skill.icon}
                        </span>
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
                          delay: i * 0.25, // sequential fill
                        }}
                        style={{
                          background:
                            "linear-gradient(90deg, #3b82f6, #06b6d4, #3b82f6)",
                          backgroundSize: "200% 100%",
                        }}
                      >
                        {/* Shimmer */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/50 to-white/10"
                          animate={shimmerControls}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
