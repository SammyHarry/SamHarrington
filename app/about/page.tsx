import SectionHeader from '@/components/section-header';
import SkillPills from '@/components/skill-pills';

export default function AboutPage() {
  return (
    <div className="space-y-12 py-16">
      <SectionHeader eyebrow="About" title="Who I Am" />
      <p className="text-neutral-300">
        I&apos;m Sam Harrington, a curious and driven student studying Data Science and Applied
        Mathematics at William & Mary. I enjoy building models and products that solve
        real problems, with a people-first mindset and a love for learning.
      </p>
      <div className="grid gap-8 md:grid-cols-2">
        <SkillPills
          title="Technical Skills"
          skills={["Python", "SQL", "Excel", "Tableau", "Pandas", "NumPy", "scikit-learn"]}
        />
        <SkillPills
          title="Soft Skills"
          skills={["Analytical", "Strategic", "Organized", "Team-Driven", "Coachable"]}
        />
      </div>
    </div>
  );
}
