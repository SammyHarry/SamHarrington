import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';

type CourseGroup = {
  course: string;
  items: { title: string; link: string; excerpt?: string }[];
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
                  <a href={it.link} target="_blank" rel="noreferrer" className="font-medium hover:underline">
                    {it.title}
                  </a>
                  {it.excerpt && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-accent">Read excerpt</summary>
                      <p className="mt-2 whitespace-pre-line text-neutral-300">{it.excerpt}</p>
                    </details>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
