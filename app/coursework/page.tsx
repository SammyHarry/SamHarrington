import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import Link from 'next/link';
import SectionHeader from '@/components/section-header';

type CourseMeta = { key: string; title: string; note?: string };

function listCourseDirs(): string[] {
  const base = path.join(process.cwd(), 'public', 'coursework');
  try {
    return fs
      .readdirSync(base, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
  } catch {
    return [];
  }
}

function listFilesFor(dir: string) {
  const full = path.join(process.cwd(), 'public', 'coursework', dir);
  try {
    return fs
      .readdirSync(full)
      .filter((f) => /\.(pdf|png|jpe?g)$/i.test(f))
      .sort();
  } catch {
    return [];
  }
}

export default function CourseworkPage() {
  const meta = yaml.parse(
    fs.readFileSync(path.join(process.cwd(), 'data', 'coursework.yml'), 'utf8')
  ) as { courses: CourseMeta[] };

  const presentDirs = new Set(listCourseDirs());
  const courses = (meta.courses || []).filter((c) => presentDirs.has(c.key));

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Coursework" title="Class Files & Assignments" blurb="Selected homework and projects, organized by course." />
      {courses.length === 0 && (
        <p className="text-neutral-400">No coursework uploaded yet.</p>
      )}
      <div className="space-y-10">
        {courses.map((c) => {
          const files = listFilesFor(c.key);
          if (files.length === 0) return null;
          return (
            <section key={c.key}>
              <h3 className="text-xl font-semibold gradient-text">{c.title}</h3>
              {c.note && <p className="text-sm text-neutral-400 mt-1">{c.note}</p>}
              <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {files.map((f) => (
                  <li key={f} className="truncate">
                    <Link
                      href={`/coursework/${c.key}/${f}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block rounded-lg border border-white/5 bg-neutral-800/70 px-3 py-2 hover:bg-neutral-800/90 hover:ring-1 hover:ring-accent transition"
                      title={f}
                    >
                      {f}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

