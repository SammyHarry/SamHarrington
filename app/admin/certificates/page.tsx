import fs from 'fs';
import path from 'path';
import SectionHeader from '@/components/section-header';

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

export default function AdminCertificatesPage() {
  const uploads = listUploads();

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Admin" title="Certificates (Preview Only)" blurb="Static hosting can’t support in-browser renaming or editing. Preview your uploaded files here, then tell me how to rename/attach and I’ll commit updates." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {uploads.map((name) => {
          const href = `/certificates/${name}`;
          const isImg = /\.(png|jpe?g)$/i.test(name);
          return (
            <div key={name} className="rounded-2xl border border-white/5 bg-neutral-800/70 p-4">
              <div className="aspect-video overflow-hidden rounded-lg bg-neutral-900/60 flex items-center justify-center">
                {isImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={href} alt={name} className="h-full w-full object-contain" />
                ) : (
                  <a href={href} target="_blank" rel="noreferrer" className="text-sm text-accent underline">Open PDF</a>
                )}
              </div>
              <p className="mt-2 truncate text-xs text-neutral-400" title={name}>{name}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-neutral-500">Note: This page is not linked in the nav. Visit /admin/certificates directly.</p>
    </div>
  );
}
