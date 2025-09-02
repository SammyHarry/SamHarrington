import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import CourseworkList, { CourseworkGroup } from '@/components/coursework-list';
import { FileText, ExternalLink, Download } from 'lucide-react';

function readCoursework(): CourseworkGroup[] {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'coursework.yml'), 'utf8');
  const parsed = yaml.parse(file) as CourseworkGroup[];
  return parsed;
}

export default function CourseworkPage() {
  const groups = readCoursework();

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Coursework" title="All Coursework PDFs" blurb="Clean file names with quick expandable excerpts." />
      <div className="mt-6">
        <CourseworkList groups={groups} />
      </div>
    </div>
  );
}
