import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { withBase } from '@/lib/url';

interface Writing {
  title: string;
  description: string;
  link: string;
  excerpt?: string;
  pages?: number;
  sizeKB?: number;
}

export default function WritingPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'writing.yml'), 'utf8');
  const writings = yaml.parse(file) as Writing[];
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Research & Writing" title="Reports & Papers" />
      <ul className="space-y-6">
        {writings.map((w) => {
          const downloadHref = withBase(w.link.split('#')[0]);
          return (
            <li key={w.title} className="rounded border border-neutral-800 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-neutral-400">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-semibold">
                    <a href={withBase(w.link)} className="hover:underline" target="_blank" rel="noreferrer">
                      {w.title}
                    </a>
                  </h3>
                  <div className="mt-1 text-xs text-neutral-400">
                    {w.pages ? `${w.pages} pages` : 'PDF'}
                    {typeof w.sizeKB === 'number' ? ` • ${w.sizeKB} KB` : ''}
                  </div>
                  <p className="text-neutral-400 mt-1">{w.description}</p>
                  {w.excerpt && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-accent">Read excerpt</summary>
                      <p className="mt-2 whitespace-pre-line text-neutral-300">{w.excerpt}</p>
                    </details>
                  )}
                </div>
                <a href={withBase(w.link)} target="_blank" rel="noreferrer" aria-label="Open PDF" className="ml-2 text-neutral-400 hover:text-accent">
                  <ExternalLink size={16} />
                </a>
                <a href={downloadHref} download aria-label="Download PDF" className="ml-1 text-neutral-400 hover:text-accent">
                  <Download size={16} />
                </a>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
