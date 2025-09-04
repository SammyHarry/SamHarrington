'use client';

import { useMemo, useState } from 'react';
import { FileText, ExternalLink, Download } from 'lucide-react';
import { withBase } from '@/lib/url';

export type CourseworkItem = {
  title: string;
  link: string;
  excerpt?: string;
  pages?: number;
  sizeKB?: number;
};

export type CourseworkGroup = {
  course: string;
  items: CourseworkItem[];
};

export default function CourseworkList({ groups }: { groups: CourseworkGroup[] }) {
  const [selected, setSelected] = useState<string>('All');

  const courses = useMemo(() => ['All', ...groups.map((g) => g.course)], [groups]);

  const filtered = useMemo(() => {
    if (selected === 'All') return groups;
    return groups.filter((g) => g.course === selected);
  }, [groups, selected]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {courses.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={
              'rounded-full border px-3 py-1 text-sm ' +
              (selected === c
                ? 'border-accent text-accent'
                : 'border-neutral-700 text-neutral-300 hover:border-neutral-500')
            }
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-10">
        {filtered.map((g) => (
          <section key={g.course}>
            <h3 className="mb-3 text-xl font-semibold">{g.course}</h3>
            <ul className="space-y-3">
              {g.items.map((it) => (
                <li key={it.link} className="rounded border border-neutral-800 p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-neutral-400">
                      <FileText size={18} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <a href={withBase(it.link)} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                          {it.title}
                        </a>
                        {(() => {
                          const slug = g.course.toLowerCase().replace(/\s+/g, '-');
                          return (
                            <a
                              href={withBase(`/academics/course/${slug}`)}
                              className="rounded-full border border-neutral-700 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-400 hover:border-neutral-500 hover:text-neutral-200"
                              title={`View course details for ${g.course}`}
                            >
                              {g.course}
                            </a>
                          );
                        })()}
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
                    <a href={withBase(it.link)} target="_blank" rel="noreferrer" aria-label="Open PDF" className="ml-2 text-neutral-400 hover:text-accent">
                      <ExternalLink size={16} />
                    </a>
                    <a href={withBase(it.link)} download aria-label="Download PDF" className="ml-1 text-neutral-400 hover:text-accent">
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
