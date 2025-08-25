import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import SectionHeader from '@/components/section-header';

export default function NotesIndex() {
  const files = fs
    .readdirSync(path.join(process.cwd(), 'app', 'notes'))
    .filter((f) => f.endsWith('.mdx'));
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Notes" title="Blog Posts" />
      <ul className="list-disc pl-6">
        {files.map((f) => {
          const slug = f.replace('.mdx', '');
          return (
            <li key={slug}>
              <Link href={`/notes/${slug}`}>{slug}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
