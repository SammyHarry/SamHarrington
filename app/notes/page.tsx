import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import SectionHeader from '@/components/section-header';
import QuickLinks from '@/components/quick-links';

type Note = { slug: string; title: string; summary?: string };

export default function NotesIndex() {
  const dir = path.join(process.cwd(), 'app', 'notes');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const notes: Note[] = files.map((f) => {
    const slug = f.replace('.mdx', '');
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const titleMatch = content.match(/export const metadata\s*=\s*\{[^}]*title:\s*['\"]([^'\"]+)['\"]/i);
    const summaryMatch = content.match(/export const metadata\s*=\s*\{[^}]*summary:\s*['\"]([^'\"]+)['\"]/i);
    const title = titleMatch?.[1] || slug;
    const summary = summaryMatch?.[1];
    return { slug, title, summary };
  });

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Notes" title="Blog Posts" />
      <div className="mb-6">
        <QuickLinks
          items={[
            { href: '/projects', label: 'Projects', title: 'Explore Case Studies' },
            { href: '/academics', label: 'Academics', title: 'See Coursework & Terms' },
            { href: '/writing', label: 'Writing', title: 'Research & Papers' },
            { href: '/contact', label: 'Contact', title: 'Get in Touch' },
          ]}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map(({ slug, title, summary }) => (
          <Link
            key={slug}
            href={`/notes/${slug}`}
            className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4 hover:bg-neutral-800/90 hover:ring-1 hover:ring-accent transition"
          >
            <h3 className="font-semibold gradient-text">{title}</h3>
            <p className="text-xs text-neutral-400 mt-1">/notes/{slug}</p>
            {summary && <p className="mt-2 text-sm text-neutral-300">{summary}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
