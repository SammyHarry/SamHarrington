import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';

interface Award {
  title: string;
  description: string;
}

export default function AwardsPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'awards.yml'), 'utf8');
  const awards = yaml.parse(file) as Award[];
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Awards & Leadership" title="Recognitions" />
      <ul className="space-y-4">
        {awards.map((a) => (
          <li key={a.title}>
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-neutral-400">{a.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
