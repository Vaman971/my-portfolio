"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  message: string;
  honeypot: string; // hidden anti-spam
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null); // <-- added for testing

  // Load reCAPTCHA script once (optional)
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
    if (!siteKey) return;
    const id = "recaptcha-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let recaptchaToken: string | undefined;
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY;
    if (siteKey && typeof window !== "undefined" && (window as any).grecaptcha) {
      try {
        recaptchaToken = await (window as any).grecaptcha.execute(siteKey, {
          action: "contact",
        });
      } catch (err) {
        console.warn("reCAPTCHA execution failed", err);
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMessage("Message sent successfully!"); // <-- added for test
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatusMessage(data.error || "Failed to send message."); // <-- added for test
        toast.error(data.error || "Failed to send message.");
      }
    } catch (err) {
      setStatusMessage("Something went wrong. Please try again."); // <-- added for test
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Contact Me
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-muted-foreground mb-6">
            I’m always open to discussing new opportunities, collaborations, or sharing ideas.
            Drop me a message and I’ll get back to you as soon as possible.
          </p>

          <div className="flex gap-6 mt-6">
            <a
              href="https://github.com/your-github"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/your-linkedin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-primary transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="mailto:your-email@example.com"
              className="text-2xl hover:text-primary transition-colors"
            >
              <FaEnvelope />
            </a>
          </div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="space-y-6"
          onSubmit={handleSubmit}
        >
          {/* Honeypot hidden field */}
          <input
            type="text"
            name="honeypot"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
            className="hidden"
            autoComplete="off"
            tabIndex={-1}
          />

          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>

          <motion.button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>
        </motion.form>
          {/* Visible status for testing */}
          {statusMessage && (
            <p className="mt-4 text-sm text-green-500" role="status">
              {statusMessage}
            </p>
          )}
      </div>
    </section>
  );
}
