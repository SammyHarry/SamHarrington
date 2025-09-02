import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import SectionHeader from '@/components/section-header';
import CertCard, { type Cert } from '@/components/cert-card';
import Stat from '@/components/stat';

export default function CertificationsPage() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'certifications.yml'), 'utf8');
  const certs = yaml.parse(file) as Cert[];
  return (
    <div className="py-16">
      <SectionHeader eyebrow="Certifications" title="Finance Training & Credentials" />
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Stat label="Programs" value={String(certs.filter((c) => !!c.credential).length)} />
        <Stat label="Modules/Tracks" value={String(certs.filter((c) => !c.credential).length)} />
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {certs.map((c) => (
          <CertCard key={c.group + (c.credential || '')} cert={c} />
        ))}
      </div>
    </div>
  );
}
