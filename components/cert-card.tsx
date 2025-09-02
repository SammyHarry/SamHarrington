"use client";

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

export type Cert = {
  group: string;
  credential?: string;
  date?: string;
  items?: string[];
  link?: string;
};

export default function CertCard({ cert }: { cert: Cert }) {
  return (
    <motion.div
      className="rounded-2xl bg-neutral-800/90 p-5 ring-1 ring-inset ring-white/5 backdrop-blur-sm"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20%' }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400"><Award size={18} /></span>
          <h3 className="text-lg font-semibold gradient-text">{cert.group}</h3>
        </div>
        {cert.date && <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-400">{cert.date}</span>}
      </div>
      {cert.credential && (
        <p className="mt-2 text-sm text-neutral-300">{cert.credential}</p>
      )}
      {cert.items && (
        <ul className="mt-3 list-disc pl-5 text-sm text-neutral-300">
          {cert.items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      )}
      {cert.link && (
        <a
          href={cert.link}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 rounded-md border border-neutral-700 px-3 py-1 text-sm hover:bg-neutral-800"
        >
          <ExternalLink size={14} />
          <span>View Credential</span>
        </a>
      )}
    </motion.div>
  );
}
