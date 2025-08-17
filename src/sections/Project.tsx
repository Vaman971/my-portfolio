"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Code2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const projects = [
  {
    title: "Financial Data Dashboard",
    description:
      "A full-stack dashboard for managing and visualizing $2M+ worth of financial data with charts, role-based access, and currency support.",
    tech: ["React.js", "Express.js", "MySQL", "Sequelize.js", "ApexCharts"],
    image: "/projects/digital-invoice.png",
    live: "https://your-demo-link.com",
    github: "https://github.com/your-repo-link",
  },
  {
    title: "AI Resume Parser",
    description:
      "An AI-powered tool that extracts and structures resume data for recruitment automation, with 90%+ parsing accuracy.",
    tech: ["Next.js", "Node.js", "MongoDB", "OpenAI API"],
    image: "/projects/mern-blog.png",
    live: "https://mern-blog.com",
    github: "https://github.com/your-repo-link",
  },
  {
    title: "Portfolio Website",
    description:
      "A fully responsive personal portfolio showcasing skills, experience, and projects with animations and an admin panel.",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion", "MongoDB"],
    image: "/projects/my-portfolio.png",
    live: "https://your-demo-link.com",
    github: "https://github.com/your-repo-link",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <div className="relative flex">
        <div className="ml-12 w-full">
          {projects.map((project, index) => {
            const segmentRef = useRef<HTMLDivElement>(null);

            // Track scroll for line growth
            const { scrollYProgress } = useScroll({
              target: segmentRef,
              offset: ["start center", "end center"],
            });

            const scaleY = useSpring(scrollYProgress, {
              stiffness: 90,
              damping: 20,
              mass: 0.4,
            });

            return (
              <motion.div
                key={index}
                ref={segmentRef}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.25,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.4 }}
                className="relative"
              >
                {/* Dot with Glow */}
                <motion.div
                  className="absolute -left-[38px] z-10 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.25 + 0.1,
                  }}
                  viewport={{ once: true }}
                >
                  <Code2 size={16} />
                  {/* Glow ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/50"
                    style={{
                      boxShadow:
                        "0 0 15px rgba(var(--primary-rgb), 0.6), 0 0 30px rgba(var(--primary-rgb), 0.4)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.25 + 0.15,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>

                {/* Line for this segment */}
                {index < projects.length - 1 && (
                  <motion.div
                    style={{ scaleY }}
                    className="absolute left-[21px] top-8 w-[3px] bg-primary origin-top"
                  />
                )}

                {/* Project Content */}
                <div className="pt-2 pb-16 flex flex-col md:flex-row gap-6 items-start">
                  {/* Image */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.25 + 0.15,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.6 }}
                    className="relative group w-full md:w-1/2 overflow-hidden rounded-xl shadow-lg"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Link
                        href={project.live}
                        target="_blank"
                        className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition"
                      >
                        <ExternalLink size={16} />
                        View Live
                      </Link>
                    </div>
                  </motion.div>

                  {/* Text */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.25 + 0.2,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true, amount: 0.6 }}
                    className="md:w-1/2"
                  >
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Link
                        href={project.github}
                        target="_blank"
                        className="text-primary hover:underline font-medium"
                      >
                        GitHub
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
