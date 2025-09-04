import SectionHeader from '@/components/section-header';
import { withBase } from '@/lib/url';
import SkillPills from '@/components/skill-pills';

export const metadata = {
  title: 'About – Sam Harrington',
  description: 'About Sam Harrington — Data Science & Applied Math student at William & Mary. Interests, values, and skills.',
};

export default function AboutPage() {
  const technicalSkills = [
    { name: 'Python', from: 'CSCI 241, DATA 201, projects' },
    { name: 'Next.js & TypeScript', from: 'web projects, portfolio' },
    { name: 'React Native / Expo', from: 'Crawler App' },
    { name: 'Firebase (Auth, Firestore, Hosting)', from: 'All Cup Tour, ACT Scorecard, Crawler' },
    { name: 'FastAPI & Docker', from: 'ACT_AI Scorecard OCR' },
    { name: 'PaddleOCR & AI APIs', from: 'ACT_AI pipeline' },
    { name: 'SQL & Relational DBs', from: 'DATA 201/302, internship' },
    { name: 'Tableau & Excel', from: 'internships' },
    { name: 'Financial Modeling & Valuation', from: 'Wall Street Prep' },
  ];

  const softSkills = [
    { name: 'Leadership & Decision-Making', from: 'Housing Manager, Ambassador' },
    { name: 'Independence & Initiative', from: 'self‑driven projects & research' },
    { name: 'Problem‑Solving', from: 'debugging, OCR pipeline, analytics' },
    { name: 'Team Collaboration', from: 'All Cup Tour, fraternity leadership' },
    { name: 'Adaptability', from: 'learning new stacks quickly' },
    { name: 'Communication', from: 'presentations & research papers' },
    { name: 'Community Building', from: 'campus involvement' },
    { name: 'Persistence', from: 'accelerated 3‑year plan' },
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
        I grew up in Gloucester Point, Virginia, and I’m passionate about mathematics, technology, and finance. At William & Mary I’m pursuing Applied Mathematics and Data Science (AI Track). I’ve completed Wall Street Prep’s Financial Modeling & Valuation training. My studies and training combine statistical modeling, machine learning, and finance—giving me a strong foundation in both the theoretical and practical sides of data science. I plan to graduate in May 2027 on an accelerated three‑year schedule.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <SkillPills title="Technical Skills" skills={technicalSkills} />
        <SkillPills title="Soft Skills" skills={softSkills} />
      </div>
      <div>
        <SectionHeader eyebrow="Interests & Values" title="Outside of Work" />
        <p className="text-neutral-300">
          I love climbing and bouldering, running and hiking national parks, and cheering for Philadelphia sports teams. Lifelong learning matters to me—especially in finance, AI, and data science. I value strong friendships, being part of a community, and spending time outdoors. What I stand for: kindness, accountability, humility, achievement, and ambition.
        </p>
      </div>
      <div>
        <SectionHeader eyebrow="AI" title="16 AI Things" blurb="Reflections from W&M’s self‑paced Generative AI program." />
        <a href={withBase('/genai')} className="mt-2 inline-block text-accent underline">Open the program</a>
      </div>
    </div>
  );
}
