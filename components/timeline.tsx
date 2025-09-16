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
}

export default function Timeline() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'experience.yml'), 'utf8');
  const experience = yaml.parse(file) as Experience[];

  return (
    <ol className="relative border-l border-neutral-700 pl-6">
      {experience.map((exp) => (
        <li key={exp.company + exp.dates} className="mb-10 ml-4">
          <div className="absolute -left-2 h-4 w-4 rounded-full bg-accent" />
          <h3 className="text-xl font-semibold">{exp.role}</h3>
          <span className="text-sm text-neutral-400">{exp.company} • {exp.dates}</span>
          {(exp.bullets && exp.bullets.length > 0) && (
            <ul className="mt-2 list-disc pl-4 text-neutral-300">
              {exp.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {exp.skills && (exp.skills.soft?.length || exp.skills.technical?.length) && (
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
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
        </li>
      ))}
    </ol>
  );
}
