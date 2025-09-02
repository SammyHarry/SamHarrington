import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import CertCard, { type Cert } from '@/components/cert-card';
import Stat from '@/components/stat';
import { FileText, Image as ImageIcon, ExternalLink, Download } from 'lucide-react';

type Upload = { name: string; href: string; type: 'pdf' | 'image'; pages?: number; sizeKB?: number };

export default function CertificationsPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'certifications.yml'), 'utf8');
  const certs = yaml.parse(file) as Cert[];
  let uploads: Upload[] = [];
  try {
    const uploadsYaml = fs.readFileSync(path.join(process.cwd(), 'data', 'cert-uploads.yml'), 'utf8');
    uploads = (yaml.parse(uploadsYaml) as Upload[]) || [];
  } catch {
    // fallback to simple directory listing
    const certDir = path.join(process.cwd(), 'public', 'certificates');
    try {
      uploads = fs
        .readdirSync(certDir)
        .filter((f) => /\.(pdf|png|jpe?g)$/i.test(f))
        .map((name) => ({ name, href: `/certificates/${name}`, type: /\.pdf$/i.test(name) ? 'pdf' : 'image' }));
    } catch {}
  }
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Certifications" title="Finance Training & Credentials" />
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Stat label="Programs" value={String(certs.filter((c) => !!c.credential).length)} />
        <Stat label="Modules/Tracks" value={String(certs.filter((c) => !c.credential).length)} />
        <Stat label="Uploaded Files" value={String(uploads.length)} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {certs.map((c) => (
          <CertCard key={c.group + (c.credential || '')} cert={c} />
        ))}
      </div>

      {uploads.length > 0 && (
        <div className="mt-12">
          <SectionHeader eyebrow="Uploads" title="Uploaded Certificates" blurb="Auto-collected from /public/certificates with file size and page counts." />
          <ul className="mt-4 divide-y divide-neutral-800 rounded-2xl border border-neutral-800">
            {uploads
              .slice()
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((u) => (
                <li key={u.href} className="flex items-start gap-3 p-3">
                  <span className="mt-0.5 text-neutral-400">
                    {u.type === 'pdf' ? <FileText size={18} /> : <ImageIcon size={18} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <a href={u.href} target="_blank" rel="noreferrer" className="block truncate hover:underline">
                      {u.name}
                    </a>
                    <div className="text-xs text-neutral-400">
                      {u.type.toUpperCase()}
                      {typeof u.pages === 'number' ? ` • ${u.pages} pages` : ''}
                      {typeof u.sizeKB === 'number' ? ` • ${u.sizeKB} KB` : ''}
                    </div>
                  </div>
                  <a href={u.href} target="_blank" rel="noreferrer" aria-label="Open file" className="ml-2 text-neutral-400 hover:text-accent">
                    <ExternalLink size={16} />
                  </a>
                  <a href={u.href} download aria-label="Download file" className="ml-1 text-neutral-400 hover:text-accent">
                    <Download size={16} />
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
