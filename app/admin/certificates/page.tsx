import fs from 'fs';
import path from 'path';
import SectionHeader from '@/components/section-header';
import yaml from 'yaml';
import { FileText, Image as ImageIcon, ExternalLink, Download } from 'lucide-react';
import { withBase } from '@/lib/url';

function getCertDir() {
  return path.join(process.cwd(), 'public', 'certificates');
}

function listUploads() {
  const dir = getCertDir();
  try {
    return fs.readdirSync(dir).filter((f) => /\.(pdf|png|jpe?g)$/i.test(f));
  } catch {
    return [];
  }
}

type Upload = { name: string; href: string; type: 'pdf' | 'image'; pages?: number; sizeKB?: number };

export default function AdminCertificatesPage() {
  let uploads: Upload[] = [];
  try {
    const y = fs.readFileSync(path.join(process.cwd(), 'data', 'cert-uploads.yml'), 'utf8');
    uploads = yaml.parse(y) as Upload[];
  } catch {
    const names = listUploads();
    uploads = names.map((name) => ({ name, href: `/certificates/${name}`, type: /\.pdf$/i.test(name) ? 'pdf' : 'image' }));
  }

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Admin" title="Certificates (Preview Only)" blurb="Static hosting can’t support in-browser renaming or editing. Preview your uploaded files here, then tell me how to rename/attach and I’ll commit updates." />
      <ul className="divide-y divide-neutral-800 rounded-2xl border border-neutral-800">
        {uploads.map((u) => (
          <li key={u.href} className="flex items-start gap-3 p-3">
            <span className="mt-0.5 text-neutral-400">{u.type === 'pdf' ? <FileText size={18} /> : <ImageIcon size={18} />}</span>
            <div className="min-w-0 flex-1">
              <a href={withBase(u.href)} target="_blank" rel="noreferrer" className="block truncate hover:underline">
                {u.name}
              </a>
              <div className="text-xs text-neutral-400">
                {u.type.toUpperCase()}
                {typeof u.pages === 'number' ? ` • ${u.pages} pages` : ''}
                {typeof u.sizeKB === 'number' ? ` • ${u.sizeKB} KB` : ''}
              </div>
            </div>
            <a href={withBase(u.href)} target="_blank" rel="noreferrer" aria-label="Open file" className="ml-2 text-neutral-400 hover:text-accent">
              <ExternalLink size={16} />
            </a>
            <a href={withBase(u.href)} download aria-label="Download file" className="ml-1 text-neutral-400 hover:text-accent">
              <Download size={16} />
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-neutral-500">Note: This page is not linked in the nav. Visit /admin/certificates directly.</p>
    </div>
  );
}
