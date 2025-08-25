import Hero from '@/components/hero';
import SectionHeader from '@/components/section-header';
import ProjectCard, { getProjects } from '@/components/project-card';

export default function HomePage() {
  const projects = getProjects().slice(0, 2);
  return (
    <div>
      <Hero />
      <SectionHeader eyebrow="Highlights" title="Featured Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  );
}
