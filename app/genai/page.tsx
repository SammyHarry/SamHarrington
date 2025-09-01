import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import Link from 'next/link';
import SectionHeader from '@/components/section-header';

type Item = { title: string; status: 'completed' | 'in_progress' | 'pending'; link?: string };

export default function GenAIPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'genai.yml'), 'utf8');
  const data = yaml.parse(file) as { completion: number; total: number; description?: string; items: Item[] };
  return (
    <div className="py-16">
      <SectionHeader
        eyebrow="16 Things in 93 Days"
        title={`✅ ${data.completion}/${data.total} Completed`}
        blurb={
          data.description ||
          'Accelerated program applying Generative AI across communication, coding, data, creativity, productivity, and more.'
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((it, idx) => {
          const label = `Thing ${idx + 1}`;
          return (
            <Link
              key={it.title + idx}
              href={it.link || '#'}
              className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4 transition hover:bg-neutral-800/90 hover:ring-1 hover:ring-accent"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs rounded-md bg-neutral-700/70 px-2 py-1">{label}</span>
                <span className="text-xs text-accent">{it.status === 'completed' ? 'Completed' : it.status}</span>
              </div>
              <h3 className="mt-2 font-semibold">{it.title}</h3>
              <p className="mt-1 text-xs text-neutral-400">Click to open reflections</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
