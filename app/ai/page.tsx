import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
export const metadata = {
  title: 'AI Notes – Sam Harrington',
  description: 'A growing list of AI tools, ideas, and experiments.',
};

type Item = { title: string; note?: string };

export default function AIPage() {
  let items: Item[] = [];
  try {
    const file = fs.readFileSync(path.join(process.cwd(), 'data', 'ai.yml'), 'utf8');
    const parsed = yaml.parse(file) as unknown;
    items = Array.isArray(parsed) ? (parsed as Item[]) : [];
  } catch {
    // Graceful fallback if file not present or invalid
    items = [];
  }

  return (
    <div className="py-16">
      <SectionHeader eyebrow="AI" title="16 AI Things" blurb={items.length ? undefined : 'Coming soon — I\'m collecting notes and links here.'} />
      {items.length > 0 ? (
        <ol className="list-decimal pl-6 space-y-2 text-neutral-300">
          {items.map((it, idx) => (
            <li key={`${idx}-${it.title}`}>
              <span className="font-medium">{it.title}</span>
              {it.note ? <span className="text-neutral-400"> — {it.note}</span> : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-neutral-400">Check back soon — this section will feature AI experiments, tools, and write‑ups.</p>
      )}
    </div>
  );
}
