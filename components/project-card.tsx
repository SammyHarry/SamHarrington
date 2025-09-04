"use client";
import { motion } from 'framer-motion';
import type { Project } from '@/lib/projects';
import { Github, ExternalLink, FileText } from 'lucide-react';
import { withBase } from '@/lib/url';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="rounded-2xl bg-neutral-800/90 p-6 shadow ring-1 ring-inset ring-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="mb-2 text-xl font-semibold">
        <span className="gradient-text bg-clip-text text-transparent">{project.title}</span>
      </h3>
      <p className="mb-4 text-neutral-400">{project.summary}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="rounded-md bg-neutral-700/80 px-2 py-1 text-xs">
            {s}
          </span>
        ))}
      </div>
      <ul className="list-disc pl-4 text-sm text-neutral-300">
        {project.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      {(project.github || project.link || project.caseStudyPath) && (
        <div className="mt-4 flex gap-3">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-neutral-700 px-2 py-1 text-sm hover:bg-neutral-800"
            >
              <ExternalLink size={14} /> Live
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-neutral-700 px-2 py-1 text-sm hover:bg-neutral-800"
            >
              <Github size={14} /> GitHub
            </a>
          )}
          {project.caseStudyPath && (
            <a
              href={withBase(project.caseStudyPath)}
              className="inline-flex items-center gap-1 rounded-md border border-neutral-700 px-2 py-1 text-sm hover:bg-neutral-800"
            >
              <FileText size={14} /> Case Study
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}
