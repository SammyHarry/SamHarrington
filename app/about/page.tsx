import SectionHeader from '@/components/section-header';
import SkillPills from '@/components/skill-pills';

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
    { name: 'Leadership & Decision-Making', from: 'Ice Cream Shop Manager' },
    { name: 'Independence & Initiative', from: 'coding projects and research' },
    { name: 'Problem-Solving', from: 'crawler bugs, AI OCR pipeline, equity models' },
    { name: 'Team Collaboration', from: 'Crawler team, All Cup Tour, housing manager' },
    { name: 'Adaptability', from: 'internship projects, rapid learning new stacks' },
    { name: 'Communication', from: 'ethics papers, history research, presentations' },
    { name: 'Community Building', from: 'Sigma Pi fraternity, small acts of kindness' },
    { name: 'Persistence & Work Ethic', from: '3-year graduation plan' },
  ];

  const interests = [
    'Being in nature (hiking national parks)',
    'Rock climbing',
    'Wrestling',
    'Ice cream',
    'Hanging out with friends & building community',
    'Lifelong learning (finance, AI, data science)',
  ];

  return (
    <div className="space-y-12 py-16">
      <SectionHeader eyebrow="About" title="Who I Am" />
      <p className="text-neutral-300">
        I&apos;m Sam Harrington, a curious and driven student studying Data Science and Applied
        Mathematics at William & Mary. I enjoy building models and products that solve
        real problems, with a people-first mindset and a love for learning.
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
    </div>
  );
}
