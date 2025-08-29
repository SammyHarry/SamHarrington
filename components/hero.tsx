"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          className="text-sm uppercase tracking-widest text-neutral-400"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
        >
          Data Science • Applied Math • Finance + AI
        </motion.p>
        <motion.h1
          className="mt-3 text-4xl font-bold tracking-tight gradient-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          Sam Harrington
        </motion.h1>
        <motion.p
          className="mt-4 text-neutral-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          Building a clean, fast personal site with Next.js 14, TypeScript, and Tailwind.
        </motion.p>
        <motion.div
          className="mt-6 flex items-center justify-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <a
            href="/Sam_Harrington_Resume.pdf"
            className="rounded-xl border border-neutral-700 px-4 py-2 hover:bg-neutral-800"
          >
            Download Resume
          </a>
          <a
            href="mailto:sharrington329@gmail.com"
            className="rounded-xl bg-white/10 px-4 py-2 hover:bg-white/20"
          >
            Email Me
          </a>
          <a
            href="https://github.com/" aria-label="GitHub"
            className="rounded-xl border border-neutral-700/60 p-2 hover:bg-neutral-800/60"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/s-harrington011" aria-label="LinkedIn"
            className="rounded-xl border border-neutral-700/60 p-2 hover:bg-neutral-800/60"
          >
            <Linkedin size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
