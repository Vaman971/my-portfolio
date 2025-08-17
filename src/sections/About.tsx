"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
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
            src="/profile.png" // <-- replace with your actual image in public/profile.jpg
            alt="Aman Verma"
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
        <p className="text-muted-foreground mb-4">
          I’m a <b>software developer</b> passionate about building scalable,
          high-performance systems and modern web applications.
          My experience spans from <b>system-level development in C/C++</b>
          to <b>full-stack web apps with MERN</b>, and I’ve delivered solutions
          used in aerospace and enterprise software.
        </p>
        <p className="text-muted-foreground mb-4">
          At Tata Technologies, I migrated <b>75+ legacy libraries</b> to modern
          platforms, automated CI/CD pipelines, and collaborated on-site with
          Airbus teams in France. I also designed financial dashboards <b>managing
          $2M+ in data</b> , with secure authentication and interactive
          visualizations.
        </p>
        <p className="text-muted-foreground">
          When I’m not coding, I enjoy mentoring peers, participating in tech
          events, and exploring new tools that make development faster and more
          reliable.
        </p>
      </motion.div>
    </section>
  );
}
