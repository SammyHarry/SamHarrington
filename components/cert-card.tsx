"use client";

import { motion } from 'framer-motion';

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
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="text-lg font-semibold gradient-text">{cert.group}</h3>
        {cert.date && <span className="text-xs text-neutral-400">{cert.date}</span>}
      </div>
      {cert.credential && (
        <p className="mt-1 text-sm text-neutral-300">{cert.credential}</p>
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
          className="mt-3 inline-block text-sm text-accent underline"
        >
          View Credential
        </a>
      )}
    </motion.div>
  );
}

