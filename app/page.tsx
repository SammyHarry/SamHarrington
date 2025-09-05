import Hero from '@/components/hero';
import SectionHeader from '@/components/section-header';
import Link from 'next/link';
import ProjectCard from '@/components/project-card';
import Stat from '@/components/stat';
import { getProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getProjects().slice(0, 2);
  return (
    <div>
      <Hero />
      <div className="mx-auto mt-4 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Stat label="GPA" value="3.97 / 4.0" />
        <Stat label="Graduation" value="May 2027" />
        <Stat label="Majors" value="Applied Math & Data Science (AI Track)" />
      </div>
      <SectionHeader eyebrow="Highlights" title="Featured Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
      <div className="mt-6 text-center">
        <Link href="/projects" className="underline text-accent">View all projects →</Link>
      </div>
    </div>
  );
}
