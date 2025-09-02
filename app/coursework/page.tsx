import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import { FileText, ExternalLink, Download } from 'lucide-react';

type CourseGroup = {
  course: string;
  items: { title: string; link: string; excerpt?: string; pages?: number; sizeKB?: number }[];
};

function readCoursework(): CourseGroup[] {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'coursework.yml'), 'utf8');
  const parsed = yaml.parse(file) as CourseGroup[];
  return parsed;
}

export default function CourseworkPage() {
  const groups = readCoursework();

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Coursework" title="All Coursework PDFs" blurb="Clean file names with quick expandable excerpts." />
      <div className="mt-6 space-y-10">
        {groups.map((g) => (
          <section key={g.course}>
            <h3 className="mb-3 text-xl font-semibold">{g.course}</h3>
            <ul className="space-y-3">
              {g.items.map((it) => (
                <li key={it.link} className="rounded border border-neutral-800 p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-neutral-400"><FileText size={18} /></div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <a href={it.link} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                          {it.title}
                        </a>
                        <span className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-400">
                          {g.course}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-neutral-400">
                        {it.pages ? `${it.pages} pages` : 'PDF'}
                        {typeof it.sizeKB === 'number' ? ` • ${it.sizeKB} KB` : ''}
                      </div>
                      {it.excerpt && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-accent">Read excerpt</summary>
                          <p className="mt-2 whitespace-pre-line text-neutral-300">{it.excerpt}</p>
                        </details>
                      )}
                    </div>
                    <a href={it.link} target="_blank" rel="noreferrer" aria-label="Open PDF" className="ml-2 text-neutral-400 hover:text-accent">
                      <ExternalLink size={16} />
                    </a>
                    <a href={it.link} download aria-label="Download PDF" className="ml-1 text-neutral-400 hover:text-accent">
                      <Download size={16} />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
