import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
export const metadata = {
  title: 'Academics – Sam Harrington',
  description: 'Academic profile, terms, coursework, and in-progress classes at William & Mary.',
};

type Profile = {
  school: string;
  degree: string;
  gpa: string;
  deans_list?: string[];
  transfer_ap_credits?: number;
  completed_credits?: number;
};

type Course = { code: string; name: string; grade?: string };
type Term = { title: string; gpa?: string; courses: Course[] };

export default function AcademicsPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'academics.yml'), 'utf8');
  const data = yaml.parse(file) as {
    profile: Profile;
    transfer_ap: { category: string; items: string[] }[];
    terms: Term[];
    in_progress?: { term: string; courses: Course[] };
  };

  const { profile, transfer_ap, terms, in_progress } = data;
  // Add course highlights and training data for consolidated Academics
  const courseFile = fs.readFileSync(path.join(process.cwd(), 'data', 'courses.yml'), 'utf8');
  const courses = yaml.parse(courseFile) as {
    category: string;
    courses: { code: string; name: string; skills: string }[];
  }[];
  const resumeFile = fs.readFileSync(path.join(process.cwd(), 'data', 'resume.yml'), 'utf8');
  const resume = yaml.parse(resumeFile) as any;

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Academics" title="Academic Profile" />

      <div className="rounded-2xl border border-white/5 bg-neutral-800/70 p-5">
        <h3 className="text-lg font-semibold gradient-text">{profile.school}</h3>
        <p className="text-neutral-300 mt-1">{profile.degree}</p>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <span className="rounded-lg bg-neutral-700/60 px-2 py-1">GPA: {profile.gpa}</span>
          {typeof profile.completed_credits !== 'undefined' && (
            <span className="rounded-lg bg-neutral-700/60 px-2 py-1">Completed: {profile.completed_credits} credits</span>
          )}
          {typeof profile.transfer_ap_credits !== 'undefined' && (
            <span className="rounded-lg bg-neutral-700/60 px-2 py-1">Transfer & AP: {profile.transfer_ap_credits} credits</span>
          )}
          {profile.deans_list?.map((d) => (
            <span key={d} className="rounded-lg bg-emerald-700/50 px-2 py-1">Dean’s List: {d}</span>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <SectionHeader eyebrow="Completed" title="Terms & Courses" />
        <div className="space-y-8">
          {terms.map((term) => (
            <section key={term.title} className="rounded-2xl border border-white/5 bg-neutral-800/70 p-5">
              <div className="flex items-baseline justify-between gap-2">
                <h4 className="text-lg font-semibold">{term.title}</h4>
                {term.gpa && <span className="text-sm text-neutral-400">Term GPA: {term.gpa}</span>}
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {term.courses.map((c) => {
                  const slug = c.code.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <a
                      key={c.code + c.name}
                      href={`/academics/course/${slug}`}
                      className="rounded-xl border border-neutral-700 p-3 hover:bg-neutral-800/60"
                    >
                      <p className="font-medium">{c.code} — {c.name}</p>
                      {c.grade && <p className="text-sm text-neutral-400">Grade: {c.grade}</p>}
                    </a>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {in_progress && (
        <div className="mt-10">
          <SectionHeader eyebrow="In Progress" title={in_progress.term} />
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {in_progress.courses.map((c) => (
              <div key={c.code + c.name} className="rounded-xl border border-neutral-700 p-3">
                <p className="font-medium">{c.code} — {c.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10">
        <SectionHeader eyebrow="Transfer & AP" title="Credit Summary" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {transfer_ap.map((cat) => (
            <div key={cat.category} className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4">
              <h5 className="font-semibold">{cat.category}</h5>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-300">
                {cat.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <SectionHeader eyebrow="Course Highlights" title="Key Courses" />
        {courses.map((cat) => (
          <div key={cat.category} className="mt-4">
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
      </div>

      <div className="mt-12">
        <SectionHeader eyebrow="Certifications" title="Training & Credentials" />
        <div className="grid gap-4 md:grid-cols-2">
          {resume.training?.map((t: any) => (
            <div key={t.title} className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4">
              <h5 className="font-semibold">{t.title}</h5>
              <ul className="mt-2 list-disc pl-5 text-sm text-neutral-300">
                {t.items.map((i: string) => (<li key={i}>{i}</li>))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
