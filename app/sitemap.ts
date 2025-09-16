import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const now = new Date();
  // Do not prefix with leading slash so URLs append to GitHub Pages base path
  const paths = [
    '',
    'about',
    'experience',
    'projects',
    'academics',
    'certifications',
    'writing',
    'resume',
    'awards',
    'contact',
    'transcript',
    'genai',
    'projects/case-study/act-ai-ocr-pipeline',
  ];
  return paths.map((p) => ({
    url: new URL(p || '', base).toString(),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.7,
  }));
}
