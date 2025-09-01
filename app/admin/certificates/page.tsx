import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
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

function getGroups() {
  const file = fs.readFileSync(path.join(process.cwd(), 'data', 'certifications.yml'), 'utf8');
  const groups = yaml.parse(file) as { group: string; link?: string }[];
  return groups.map((g) => ({ group: g.group, link: g.link }));
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

export default function AdminCertificatesPage() {
  const uploads = listUploads();
  const groups = getGroups();

  async function renameAction(formData: FormData) {
    'use server';
    const current = String(formData.get('current') || '');
    const desired = String(formData.get('desired') || '');
    if (!current || !desired) return;
    const dir = getCertDir();
    const ext = path.extname(current);
    const nice = slugify(desired) || 'certificate';
    const next = `${nice}${ext}`;
    const from = path.join(dir, current);
    const to = path.join(dir, next);
    if (!fs.existsSync(from)) return;
    if (fs.existsSync(to)) return;
    fs.renameSync(from, to);
  }

  async function attachAction(formData: FormData) {
    'use server';
    const file = String(formData.get('file') || '');
    const group = String(formData.get('group') || '');
    if (!file || !group) return;
    const yamlPath = path.join(process.cwd(), 'data', 'certifications.yml');
    const raw = fs.readFileSync(yamlPath, 'utf8');
    const data = yaml.parse(raw) as any[];
    const idx = data.findIndex((g) => g.group === group);
    if (idx === -1) return;
    data[idx].link = `/certificates/${file}`;
    fs.writeFileSync(yamlPath, yaml.stringify(data));
  }

  return (
    <div className="py-16">
      <SectionHeader eyebrow="Admin" title="Certificates Manager" blurb="Preview, rename, and attach uploaded certificate files to certification groups." />
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

              <form action={renameAction} className="mt-3 flex gap-2">
                <input type="hidden" name="current" value={name} />
                <input
                  type="text"
                  name="desired"
                  placeholder="Nice file name (no ext)"
                  className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm"
                  required
                />
                <button className="rounded-md bg-accent px-3 py-1 text-neutral-900 text-sm">Rename</button>
              </form>

              <form action={attachAction} className="mt-3 flex gap-2">
                <input type="hidden" name="file" value={name} />
                <select name="group" className="w-full rounded-md border border-neutral-700 bg-neutral-900 px-2 py-1 text-sm" required>
                  <option value="">Attach to…</option>
                  {groups.map((g) => (
                    <option key={g.group} value={g.group}>{g.group}</option>
                  ))}
                </select>
                <button className="rounded-md border border-neutral-700 px-3 py-1 text-sm">Attach</button>
              </form>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-xs text-neutral-500">Note: This page is not linked in the nav. Visit /admin/certificates directly.</p>
    </div>
  );
}
