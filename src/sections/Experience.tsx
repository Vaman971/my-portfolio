"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    role: "Software Developer",
    company: "Tata Technologies",
    period: "Aug 2024 – Present",
    achievements: [
      "Migrated 75+ C/C++ and FORTRAN libraries from RHEL 5 to RHEL 9, enhancing performance, security, and compatibility.",
      "Proposed and implemented a new build strategy using CMake + Conan, reducing build setup time by 40%.",
      "Automated build and testing with Jenkins and managed artifact delivery via JFrog Artifactory.",
      "Collaborated with Airbus teams on-site in Toulouse, France to present testing strategies for 150+ critical executables.",
    ],
  },
  {
    role: "Apprenticeship - Full-Stack Developer",
    company: "Tata Technologies",
    period: "Feb 2024 – Jul 2024",
    achievements: [
      "Developed a financial data dashboard using React.js, Express.js, MySQL, and Sequelize.js.",
      "Designed backend schema with 15+ tables to efficiently manage $2M+ worth of financial data.",
      "Implemented secure JWT-based authentication and role-based access control for 3+ user roles.",
      "Integrated ApexCharts for visualizing financial metrics across multiple currencies.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>

      <div className="relative flex">
        <div className="ml-12 w-full">
          {experiences.map((exp, index) => {
            const segmentRef = useRef<HTMLDivElement>(null);

            // Scroll tracking for each segment
            const { scrollYProgress } = useScroll({
              target: segmentRef,
              offset: ["start center", "end center"],
            });

            const scaleY = useSpring(scrollYProgress, {
              stiffness: 80,
              damping: 20,
              mass: 0.5,
            });

            return (
              <div key={index} className="relative">
                {/* Dot Animation */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true, amount: 0.8 }}
                  className="absolute -left-[38px] z-10 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full shadow-lg"
                >
                  <Briefcase size={16} />
                </motion.div>

                {/* Segment Line Animation */}
                {index < experiences.length - 1 && (
                  <motion.div
                    style={{ scaleY }}
                    className="absolute left-[21px] top-8 w-[3px] bg-primary origin-top"
                  />
                )}

                {/* Experience Content */}
                <motion.div
                  ref={segmentRef}
                  className="pt-2 pb-16"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <p className="text-muted-foreground text-sm mb-2">
                    {exp.company} &nbsp;•&nbsp; {exp.period}
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {exp.achievements.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
