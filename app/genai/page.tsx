import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import { withBase } from '@/lib/url';
export const metadata = {
  title: '16 AI Things (Generative AI) – Sam Harrington',
  description:
    'William & Mary’s “16 Things in 93 Days” Generative AI program — reflections, tools, and what I learned across text, images, ethics, and productivity.'
};

type Item = { title: string; status: 'completed' | 'in_progress' | 'pending'; link?: string };

export default function GenAIPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'genai.yml'), 'utf8');
  const data = yaml.parse(file) as { completion: number; total: number; description?: string; items: Item[] };
  return (
    <div className="py-16">
      <SectionHeader
        eyebrow="Generative AI — 16 Things in 93 Days"
        title={`✅ ${data.completion}/${data.total} Completed`}
        blurb={
          data.description ||
          'W&M self‑paced program exploring AI across text, images, ethics, creativity, productivity, and more — with takeaways that feed into my projects and coursework.'
        }
      />
      <p className="mb-6 text-sm text-neutral-400">
        See how this learning translates to my <a className="underline hover:text-accent" href={withBase('/projects')}>projects</a>
        {' '}and <a className="underline hover:text-accent" href={withBase('/academics')}>academics</a>.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.items.map((it, idx) => {
          const label = `Thing ${idx + 1}`;
          const slug = `${String(idx + 1).padStart(2, '0')}-${it.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
          const postHref = withBase(`/notes/genai-${slug}`);
          const content = (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs rounded-md bg-neutral-700/70 px-2 py-1">{label}</span>
                <span className="text-xs text-accent">{it.status === 'completed' ? 'Completed' : it.status}</span>
              </div>
              <h3 className="mt-2 font-semibold">{it.title}</h3>
              <p className="mt-1 text-xs text-neutral-400">{it.status === 'completed' ? 'Read the reflection' : 'Reflection coming soon'}</p>
            </>
          );
          return it.status === 'completed' ? (
            <a key={it.title + idx} href={postHref} className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4 transition hover:bg-neutral-800/90 hover:ring-1 hover:ring-accent">
              {content}
            </a>
          ) : (
            <div key={it.title + idx} className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4 opacity-90">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
