import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';

export default function ResumePage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'resume.yml'), 'utf8');
  const resume = yaml.parse(file);
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Resume" title="My Experience" />
      <h2 className="text-2xl font-semibold">{resume.education.school}</h2>
      <p className="text-neutral-400">{resume.education.degree} — GPA {resume.education.gpa}</p>
      <div className="mt-6">
        <h3 className="font-semibold">Education &amp; Training</h3>
        {resume.training.map((t: any) => (
          <div key={t.title} className="mt-2">
            <p className="text-neutral-400">{t.title}</p>
            <ul className="list-disc pl-5 text-sm text-neutral-300">
              {t.items.map((i: string) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
        <a
          href="/transcript.pdf"
          className="mt-4 inline-block text-accent underline"
          target="_blank"
        >
          View Transcript (PDF)
        </a>
      </div>
      <div className="mt-8 space-y-6">
        {resume.experience.map((exp: any) => (
          <div key={exp.company}>
            <h3 className="font-semibold">{exp.role} — {exp.company}</h3>
            <ul className="list-disc pl-5 text-sm text-neutral-300">
              {exp.bullets.map((b: string) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
