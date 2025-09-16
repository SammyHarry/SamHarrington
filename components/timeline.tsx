import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

interface Experience {
  company: string;
  role: string;
  dates: string;
  bullets: string[];
  tags?: string[];
  skills?: {
    soft?: string[];
    technical?: string[];
  };
  category?: 'work' | 'leadership';
}

export default function Timeline({ category }: { category?: 'work' | 'leadership' }) {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'experience.yml'), 'utf8');
  let experienceRaw = yaml.parse(file) as Experience[];
  if (category) {
    experienceRaw = experienceRaw.filter((e) => (e.category || 'work') === category);
  }
  // Sort by most recent first with season awareness; break ties by source order (later first)
  const seasonRank: Record<string, number> = { spring: 1, summer: 2, fall: 3, winter: 4 };
  const dateWeight = (d: string) => {
    if (/present/i.test(d)) return 999999; // pin to top
    // Try to find the last "Season YYYY" in the string
    const matches = Array.from(d.matchAll(/(Spring|Summer|Fall|Winter)\s+(\d{4})/gi));
    if (matches.length) {
      const last = matches[matches.length - 1];
      const season = (last[1] || '').toLowerCase();
      const year = Number(last[2]);
      const s = seasonRank[season] ?? 0;
      return year * 10 + s;
    }
    // Fallback: use max year found
    const years = Array.from(d.matchAll(/\d{4}/g)).map((m) => Number(m[0]));
    const maxYear = years.length ? Math.max(...years) : 0;
    return maxYear * 10; // scale to align with season-weighted values
  };
  const experience = experienceRaw
    .map((e, idx) => ({ e, idx }))
    .sort((a, b) => {
      const diff = dateWeight(b.e.dates) - dateWeight(a.e.dates);
      if (diff !== 0) return diff;
      return b.idx - a.idx; // prefer later items in the source file
    })
    .map(({ e }) => e);

  return (
    <ol className="relative pl-8">
      {/* vertical timeline line with gradient */}
      <div aria-hidden className="pointer-events-none absolute left-3 top-0 h-full w-px bg-gradient-to-b from-accent/40 via-neutral-700 to-accent/30" />
      {experience.map((exp) => (
        <li key={exp.company + exp.dates} className="relative mb-10">
          {/* timeline dot */}
          <div aria-hidden className="absolute left-2 top-5 h-3 w-3 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgba(23,23,23,1)]" />
          {/* card */}
          <article className="ml-6 overflow-hidden rounded-2xl bg-neutral-800/90 ring-1 ring-inset ring-white/5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:ring-accent/40">
            {/* top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-accent/60 via-transparent to-accent/60" />
            <div className="p-5">
              <header className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold gradient-text">{exp.role}</h3>
                <span className="text-xs rounded-full border border-neutral-700 px-2 py-0.5 uppercase tracking-wide text-neutral-400">{exp.dates}</span>
              </header>
              <p className="mt-1 text-sm text-neutral-400">{exp.company}</p>
              {(exp.tags && exp.tags.length > 0) && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {exp.tags.map((t) => (
                    <span key={t} className="rounded-md bg-neutral-700/60 px-2 py-0.5 text-xs text-neutral-300">{t}</span>
                  ))}
                </div>
              )}
              {(exp.bullets && exp.bullets.length > 0) && (
                <ul className="mt-3 list-disc pl-5 text-sm text-neutral-300">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              )}
              {exp.skills && (exp.skills.soft?.length || exp.skills.technical?.length) && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {exp.skills.soft && exp.skills.soft.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-neutral-400">Skills — Soft</p>
                      <ul className="mt-1 list-disc pl-4 text-sm text-neutral-300">
                        {exp.skills.soft.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exp.skills.technical && exp.skills.technical.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-neutral-400">Skills — Technical</p>
                      <ul className="mt-1 list-disc pl-4 text-sm text-neutral-300">
                        {exp.skills.technical.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </article>
        </li>
      ))}
    </ol>
  );
}
