import SectionHeader from '@/components/section-header';
import ProjectCard, { getProjects } from '@/components/project-card';

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Projects" title="Things I've Built" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  );
}
