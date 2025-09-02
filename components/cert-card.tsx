"use client";

import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText, Image as ImageIcon, Download } from 'lucide-react';

export type Cert = {
  group: string;
  credential?: string;
  date?: string;
  items?: string[];
  link?: string;
  attachments?: { href: string; label?: string }[];
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
      {cert.attachments && cert.attachments.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-sm text-neutral-400">Attachments</p>
          <ul className="divide-y divide-neutral-800 overflow-hidden rounded-2xl border border-neutral-800">
            {cert.attachments.map((a) => {
              const isImg = /\.(png|jpe?g|webp|gif)$/i.test(a.href);
              const isPdf = /\.(pdf)$/i.test(a.href);
              const name = a.label || a.href.split('/').pop();
              return (
                <li key={a.href} className="flex items-start gap-3 p-3">
                  <span className="mt-0.5 text-neutral-400">{isPdf ? <FileText size={18} /> : <ImageIcon size={18} />}</span>
                  <div className="min-w-0 flex-1">
                    <a href={a.href} target="_blank" rel="noreferrer" className="block truncate hover:underline">
                      {name}
                    </a>
                    <div className="text-xs text-neutral-500">{isPdf ? 'PDF' : 'Image'}</div>
                  </div>
                  <a href={a.href} target="_blank" rel="noreferrer" aria-label="Open attachment" className="ml-2 text-neutral-400 hover:text-accent">
                    <ExternalLink size={16} />
                  </a>
                  <a href={a.href} download aria-label="Download attachment" className="ml-1 text-neutral-400 hover:text-accent">
                    <Download size={16} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
