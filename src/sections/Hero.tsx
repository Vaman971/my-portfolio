"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
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
        <span className="text-primary">Aman Verma</span>👋
      </motion.h1>

      <motion.p
        className="mt-6 text-lg md:text-xl max-w-2xl text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        I specialize in building scalable, high-performance systems and modern
        web applications. Experienced in C/C++, MERN Stack, AWS, and DevOps.
        
      </motion.p>

      <motion.div
        className="mt-8 flex gap-4 flex-wrap justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button size="lg" asChild>
          <a href="#projects">View Projects</a>
        </Button>
        <Button size="lg" variant="outline" asChild>
          <a href="#contact">Contact Me</a>
        </Button>
      </motion.div>
    </section>
  );
}
