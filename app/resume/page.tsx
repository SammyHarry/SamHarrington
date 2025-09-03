import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import Link from 'next/link';
import { withBase } from '@/lib/url';
import SectionHeader from '@/components/section-header';

export default function ResumePage() {
  const resumeFile = fs.readFileSync(path.join(process.cwd(), 'data', 'resume.yml'), 'utf8');
  const resume = yaml.parse(resumeFile);
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Resume" title="Download My Résumé" blurb="For full details, download the PDF below. See Experience and Academics for the live overview." />
      <h2 className="text-2xl font-semibold">{resume.education.school}</h2>
      <p className="text-neutral-400">{resume.education.degree} — GPA {resume.education.gpa}</p>
      <div className="mt-6 flex items-center gap-3">
        <Link href={withBase('/sam-harrington-resume.pdf')} className="btn-primary">Download PDF</Link>
        <Link href={withBase('/transcript.pdf')} className="btn" target="_blank" rel="noopener noreferrer">View Transcript</Link>
      </div>
    </div>
  );
}
