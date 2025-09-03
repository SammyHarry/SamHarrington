import SectionHeader from '@/components/section-header';
import { withBase } from '@/lib/url';
import SkillPills from '@/components/skill-pills';

export const metadata = {
  title: 'About – Sam Harrington',
  description: 'About Sam Harrington — Data Science & Applied Math student at William & Mary. Interests, values, and skills.',
};

export default function AboutPage() {
  const technicalSkills = [
    { name: 'Python', from: 'CSCI 243, DATA 201, independent projects' },
    { name: 'React Native / Expo', from: 'Crawler App' },
    { name: 'Firebase', from: 'Crawler App, All Cup Tour' },
    { name: 'Docker & FastAPI', from: 'AI Scorecard Reader' },
    { name: 'PaddleOCR & AI APIs', from: 'AI Scorecard Reader' },
    { name: 'SQL & Data Analysis', from: 'DATA 201, internship, Tableau' },
    { name: 'Financial Modeling & Valuation', from: 'Wall Street Prep, equity research projects' },
    { name: 'Excel', from: 'internship, WSP' },
    { name: 'Tableau', from: 'internship' },
  ];

  const softSkills = [
    { name: 'Leadership & Decision-Making', from: 'Housing Manager, D2W Ambassador' },
    { name: 'Independence & Initiative', from: 'self-driven projects and research' },
    { name: 'Problem-Solving', from: 'crawler bugs, AI OCR pipeline, analytics' },
    { name: 'Team Collaboration', from: 'Crawler, All Cup Tour, fraternity leadership' },
    { name: 'Adaptability', from: 'fast learning across stacks and domains' },
    { name: 'Communication', from: 'ethics/history papers and presentations' },
    { name: 'Community Building', from: 'fraternity & campus involvement' },
    { name: 'Persistence & Work Ethic', from: 'accelerated 3-year graduation plan' },
  ];

  const interests = [
    'Climbing & bouldering',
    'Running & hiking national parks',
    'Philly sports',
    'Lifelong learning (finance, AI, data science)',
    'Friends, community, and being outdoors',
  ];

  return (
    <div className="space-y-12 py-16">
      <SectionHeader eyebrow="About" title="Who I Am" />
      <p className="text-neutral-300">
        I&apos;m Sam Harrington — a motivated learner and the hardest worker in the room.
        I study Applied Mathematics & Data Science (AI Track) with a Finance minor at
        William & Mary, graduating on an accelerated 3-year plan (May 2027).
        I love building data-driven products and models that make a tangible impact.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <SkillPills title="Technical Skills" skills={technicalSkills} />
        <SkillPills title="Soft Skills" skills={softSkills} />
      </div>
      <div>
        <SectionHeader eyebrow="Interests" title="Beyond Work" />
        <ul className="mt-4 list-disc pl-5 space-y-2 text-neutral-300">
          {interests.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div>
        <SectionHeader eyebrow="Values" title="What I Stand For" />
        <ul className="mt-4 list-disc pl-5 space-y-2 text-neutral-300">
          {['Kindness', 'Accountability', 'Humility', 'Achievement', 'Ambition'].map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      </div>
      <div>
        <SectionHeader eyebrow="AI" title="16 AI Things" blurb="Reflections from W&M’s self‑paced Generative AI program." />
        <a href={withBase('/genai')} className="mt-2 inline-block text-accent underline">Open the program</a>
      </div>
    </div>
  );
}
