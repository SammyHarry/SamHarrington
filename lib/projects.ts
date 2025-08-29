import yaml from 'yaml';
import fs from 'fs';
import path from 'path';

export interface Project {
  title: string;
  summary: string;
  stack: string[];
  features: string[];
}

export function getProjects(): Project[] {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'projects.yml'), 'utf8');
  return yaml.parse(file) as Project[];
}

