"use client";

import React from "react";

export default function Hero() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-sm uppercase tracking-widest text-neutral-400">
          Data Science • Applied Math • Finance + AI
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Sam Harrington
        </h1>
        <p className="mt-4 text-neutral-300">
          Building a clean, fast personal site with Next.js 14, TypeScript, and Tailwind.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
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
        </div>
      </div>
    </section>
  );
}