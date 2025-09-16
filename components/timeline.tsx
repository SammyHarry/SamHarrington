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
  let experience = yaml.parse(file) as Experience[];
  if (category) {
    experience = experience.filter((e) => (e.category || 'work') === category);
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {experience.map((exp) => (
        <article
          key={exp.company + exp.dates}
          className="rounded-2xl bg-neutral-800/90 p-5 ring-1 ring-inset ring-white/5 backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-neutral-800"
        >
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
        </article>
      ))}
    </div>
  );
}
