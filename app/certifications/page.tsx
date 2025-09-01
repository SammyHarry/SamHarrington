import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import CertCard, { type Cert } from '@/components/cert-card';

export default function CertificationsPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'certifications.yml'), 'utf8');
  const certs = yaml.parse(file) as Cert[];
  const certDir = path.join(process.cwd(), 'public', 'certificates');
  let uploads: string[] = [];
  try {
    uploads = fs.readdirSync(certDir).filter((f) => /\.(pdf|png|jpe?g)$/i.test(f));
  } catch {}
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Certifications" title="Finance Training & Credentials" />
      <div className="grid gap-6 md:grid-cols-2">
        {certs.map((c) => (
          <CertCard key={c.group + (c.credential || '')} cert={c} />
        ))}
      </div>

      {uploads.length > 0 && (
        <div className="mt-12">
          <SectionHeader eyebrow="Uploads" title="Uploaded Certificates" blurb="These were auto‑collected from your repo root and moved under /public/certificates. Tell me which map to which credential and I’ll attach them inline." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {uploads.sort().map((name) => {
              const href = `/certificates/${name}`;
              const isImg = /\.(png|jpe?g)$/i.test(name);
              return (
                <a key={name} href={href} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/5 bg-neutral-800/70 p-3 hover:bg-neutral-800/90 hover:ring-1 hover:ring-accent transition">
                  <div className="aspect-video w-full overflow-hidden rounded-lg bg-neutral-900/60 flex items-center justify-center">
                    {isImg ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={href} alt={name} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-sm text-neutral-400">PDF</span>
                    )}
                  </div>
                  <p className="mt-2 truncate text-xs text-neutral-400" title={name}>{name}</p>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
