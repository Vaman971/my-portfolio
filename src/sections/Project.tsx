"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

type Project = {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  order: number;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get("/api/projects");
        const sorted = res.data.sort((a: Project, b: Project) => a.order - b.order);
        setProjects(sorted);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Projects
        </h2>
        <p className="text-center text-muted-foreground">Loading...</p>
      </section>
    );
  }

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
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
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
              {/* Dot with glow */}
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
                  transition={{
                    duration: 0.6,
                    delay: index * 0.25 + 0.15,
                    ease: "easeOut",
                  }}
                />
              </motion.div>

              {/* Line */}
              {index < projects.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute left-[-23px] top-6 w-[3px] bg-primary origin-top"
                />
              )}

              {/* Project content */}
              <div className="pt-2 pb-16 flex flex-col md:flex-row gap-6 items-start">
                {/* Image */}
                {project?.imageUrl && (
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
                      src={project?.imageUrl}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                    {project.liveUrl && (
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          className="bg-white text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition"
                        >
                          <ExternalLink size={16} />
                          View Live
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}

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
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-primary text-primary-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="text-secondary hover:underline hover:text-primary font-medium"
                      >
                        GitHub
                      </Link>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
