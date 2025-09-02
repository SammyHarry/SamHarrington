import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import Link from 'next/link';
import SectionHeader from '@/components/section-header';

export default function ResumePage() {
  const resumeFile = fs.readFileSync(path.join(process.cwd(), 'data', 'resume.yml'), 'utf8');
  const resume = yaml.parse(resumeFile);
  const courseFile = fs.readFileSync(path.join(process.cwd(), 'data', 'courses.yml'), 'utf8');
  const courses = yaml.parse(courseFile) as {
    category: string;
    courses: { code: string; name: string; skills: string }[];
  }[];
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
        <div className="mt-4">
          <h3 className="font-semibold">Course Highlights</h3>
          {courses.map((cat) => (
            <div key={cat.category} className="mt-2">
              <h4 className="text-neutral-300">{cat.category}</h4>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                {cat.courses.map((c) => (
                  <div key={c.code} className="rounded border border-neutral-700 p-3">
                    <p className="font-medium">{c.code}: {c.name}</p>
                    <p className="text-sm text-neutral-400">{c.skills}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/transcript.pdf"
            className="mt-4 inline-block text-accent underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Transcript (PDF)
          </Link>
        </div>
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
