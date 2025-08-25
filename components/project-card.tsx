import Image from 'next/image';
import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

interface Project {
  title: string;
  summary: string;
  stack: string[];
  features: string[];
}

export function getProjects(): Project[] {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'projects.yml'), 'utf8');
  return yaml.parse(file) as Project[];
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-2xl bg-neutral-800 p-6 shadow">
      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
      <p className="text-neutral-400 mb-4">{project.summary}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span key={s} className="rounded-md bg-neutral-700 px-2 py-1 text-xs">
            {s}
          </span>
        ))}
      </div>
      <ul className="list-disc pl-4 text-sm text-neutral-300">
        {project.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
    </div>
  );
}
