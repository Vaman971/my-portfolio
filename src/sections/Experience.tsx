"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import axios from "axios";

type Experience = {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  bullets: string[];
  order: number;
};

export default function ExperienceSection() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExperiences() {
      try {
        const res = await axios.get("/api/experience");
        // Ensure correct order
        const sorted = res.data.sort((a: Experience, b: Experience) => a.order - b.order);
        setExperiences(sorted);
      } catch (err) {
        console.error("Failed to fetch experiences:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section id="experience" className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Experience
        </h2>
        <p className="text-center text-muted-foreground">Loading...</p>
      </section>
    );
  }

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
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                viewport={{ once: true, amount: 0.8 }}
                className="absolute -left-[38px] z-10 flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full shadow-lg"
              >
                <Briefcase size={16} />
              </motion.div>

              {/* Connector line */}
              {index < experiences.length - 1 && (
                <motion.div
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="absolute left-[-23px] top-6 w-[3px] bg-primary origin-top"
                />
              )}

              {/* Experience content */}
              <motion.div
                className="pt-2 pb-16"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-muted-foreground text-sm mb-2">
                  {exp.company} &nbsp;•&nbsp;{" "}
                  {exp.endDate
                    ? `${exp.startDate} – ${exp.endDate}`
                    : `${exp.startDate} – Present`}
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {exp.bullets.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
