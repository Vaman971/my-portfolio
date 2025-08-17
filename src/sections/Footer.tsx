"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#experience", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

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
          <h3 className="text-lg font-semibold text-white">Aman Verma</h3>
          <p className="text-sm text-gray-400">Full-Stack Developer</p>
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
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:your-email@example.com"
            className="hover:text-white transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
      </motion.div>

      {/* Bottom line */}
      <div className="mt-8 text-center text-xs text-gray-500 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Aman Verma. Built with{" "}
        <span className="text-white">Next.js</span> &{" "}
        <span className="text-white">Tailwind CSS</span>.
      </div>
    </footer>
  );
}
