import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';

interface Writing {
  title: string;
  description: string;
  link: string;
}

export default function WritingPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'writing.yml'), 'utf8');
  const writings = yaml.parse(file) as Writing[];
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Research & Writing" title="Reports & Papers" />
      <ul className="space-y-6">
        {writings.map((w) => (
          <li key={w.title}>
            <h3 className="text-xl font-semibold">
              <a href={w.link} className="hover:underline" target="_blank" rel="noreferrer">
                {w.title}
              </a>
            </h3>
            <p className="text-neutral-400">{w.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
