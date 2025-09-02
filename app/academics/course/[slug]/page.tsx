import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import { withBase } from '@/lib/url';

type Catalog = { courses: { code: string; name: string; description: string }[] };
type CourseworkGroup = { course: string; items: { title: string; link: string; excerpt?: string; pages?: number; sizeKB?: number }[] };

function slugToCode(slug: string) {
  // e.g., 'math-214' -> 'MATH 214'; 'math-311h' -> 'MATH 311H'
  return slug.toUpperCase().replace(/-/g, ' ');
}

function findCourse(catalog: Catalog, code: string) {
  const byCode = catalog.courses.find((c) => c.code.toUpperCase() === code.toUpperCase());
  if (byCode) return byCode;
  // try loose match: allow multiple spaces
  const norm = code.replace(/\s+/g, ' ').trim().toUpperCase();
  return (
    catalog.courses.find((c) => c.code.replace(/\s+/g, ' ').trim().toUpperCase() === norm) ||
    { code, name: code, description: 'No catalog entry found yet. Categorized under Other.' }
  );
}

function loadCatalog(): Catalog {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'course-catalog.yml'), 'utf8');
  return yaml.parse(file) as Catalog;
}

function loadCoursework(): CourseworkGroup[] {
  const f = fs.readFileSync(path.join(process.cwd(), 'data', 'coursework.yml'), 'utf8');
  return yaml.parse(f) as CourseworkGroup[];
}

export default function CourseDetail({ params }: { params: { slug: string } }) {
  const code = slugToCode(params.slug);
  const catalog = loadCatalog();
  const course = findCourse(catalog, code);
  const coursework = loadCoursework();
  // find matching items by exact course code; otherwise also show any ambiguous under Other
  const group = coursework.find((g) => g.course.toUpperCase() === code.toUpperCase());
  const items = group?.items ?? [];

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Course" title={`${course.code}: ${course.name}`} blurb={course.description} />
      <div className="mt-6 rounded-2xl border border-neutral-800 p-4">
        <h3 className="font-semibold">Coursework</h3>
        {items.length === 0 ? (
          <p className="mt-2 text-neutral-400">No coursework attached yet. I’ll categorize anything uncertain under Other.</p>
        ) : (
          <ul className="mt-2 space-y-3">
            {items.map((it) => (
              <li key={it.link} className="rounded border border-neutral-800 p-3">
                <a href={withBase(it.link)} className="font-medium hover:underline" target="_blank" rel="noreferrer">
                  {it.title}
                </a>
                <div className="mt-1 text-xs text-neutral-400">
                  {it.pages ? `${it.pages} pages` : 'PDF'}
                  {typeof it.sizeKB === 'number' ? ` • ${it.sizeKB} KB` : ''}
                </div>
                {it.excerpt && <p className="mt-2 whitespace-pre-line text-neutral-300">{it.excerpt}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const codes = new Set<string>();
  try {
    const acadFile = fs.readFileSync(path.join(process.cwd(), 'data', 'academics.yml'), 'utf8');
    const acad = yaml.parse(acadFile) as any;
    for (const term of acad?.terms ?? []) {
      for (const c of term?.courses ?? []) {
        if (c?.code) codes.add(String(c.code));
      }
    }
    for (const c of acad?.in_progress?.courses ?? []) {
      if (c?.code) codes.add(String(c.code));
    }
  } catch {}
  try {
    const cwFile = fs.readFileSync(path.join(process.cwd(), 'data', 'coursework.yml'), 'utf8');
    const groups = yaml.parse(cwFile) as any[];
    for (const g of groups ?? []) {
      if (g?.course) codes.add(String(g.course));
    }
  } catch {}
  try {
    const catalogFile = fs.readFileSync(path.join(process.cwd(), 'data', 'course-catalog.yml'), 'utf8');
    const catalog = yaml.parse(catalogFile) as any;
    for (const c of catalog?.courses ?? []) {
      if (c?.code) codes.add(String(c.code));
    }
  } catch {}
  const slugs = Array.from(codes).map((code) => ({ slug: String(code).toLowerCase().replace(/\s+/g, '-') }));
  return slugs;
}
