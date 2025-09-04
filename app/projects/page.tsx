import SectionHeader from '@/components/section-header';
import ProjectCard from '@/components/project-card';
import { getProjects } from '@/lib/projects';
import QuickLinks from '@/components/quick-links';

export default function ProjectsPage() {
  const projects = getProjects();
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Projects" title="Things I've Built" />
      <div className="mb-6">
        <QuickLinks
          items={[
            { href: '/sam-harrington-resume.pdf', label: 'Résumé', title: 'Download PDF', external: true },
            { href: '/academics', label: 'Academics', title: 'See Coursework & Terms' },
            { href: '/coursework', label: 'Coursework', title: 'Browse Deliverables' },
            { href: '/contact', label: 'Contact', title: 'Get in Touch' },
          ]}
        />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </div>
  );
}
