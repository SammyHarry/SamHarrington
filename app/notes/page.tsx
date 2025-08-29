import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import SectionHeader from '@/components/section-header';

type Note = { slug: string; title: string };

export default async function NotesIndex() {
  const dir = path.join(process.cwd(), 'app', 'notes');
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

  const notes: Note[] = await Promise.all(
    files.map(async (f) => {
      const slug = f.replace('.mdx', '');
      try {
        // Import the MDX module to read its exported metadata
        const mod = await import(`./${slug}.mdx`);
        const title = (mod as any).metadata?.title || slug;
        return { slug, title };
      } catch {
        return { slug, title: slug };
      }
    })
  );

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Notes" title="Blog Posts" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map(({ slug, title }) => (
          <Link
            key={slug}
            href={`/notes/${slug}`}
            className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4 hover:bg-neutral-800/90 hover:ring-1 hover:ring-accent transition"
          >
            <h3 className="font-semibold gradient-text">{title}</h3>
            <p className="text-xs text-neutral-400 mt-1">/notes/{slug}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
