import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';

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
      <SectionHeader eyebrow="AI" title="16 AI Things" blurb="A running list of AI ideas, tools, and notes I'm tracking." />
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
        <p className="text-neutral-400">No items yet. Add entries to <code>data/ai.yml</code> as a list of objects with <code>title</code> and optional <code>note</code>.</p>
      )}
    </div>
  );
}
