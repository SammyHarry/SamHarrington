const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const pdf = require('pdf-parse');

function toTitleCase(s) {
  return s
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace(/\bPdf\b/i, '')
    .trim();
}

function courseFromDir(dirName) {
  if (!dirName || dirName === 'coursework') return 'Misc';
  if (dirName === 'misc') return 'Misc';
  if (dirName === 'writing') return 'Writing';
  const parts = dirName.split('-');
  if (parts.length >= 2) {
    return `${parts[0].toUpperCase()} ${parts[1].toUpperCase()}`;
  }
  return toTitleCase(dirName);
}

async function readPdfInfo(absPath) {
  const data = await pdf(fs.readFileSync(absPath));
  const lines = String(data.text)
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const metaTitle = data?.info?.Title || undefined;
  const badTitles = ['document', 'document7', 'questions', 'reflection_3', 'dancemt'];
  const metaClean = metaTitle && !badTitles.includes(String(metaTitle).toLowerCase()) ? metaTitle : undefined;
  // Heuristic: find a likely heading line after skipping name/course/date lines
  const month = /(january|february|march|april|may|june|july|august|september|october|november|december)/i;
  const skipPatterns = [
    /^sam harrington/i,
    /^prof/i,
    /^(apia|hist|phil|math|thea|fmst)\b/i,
    /william & mary/i,
    /^\d{4}/,
    /homework/i,
    /foundations of mathematics/i,
    /^space [12]:/i,
    /^\(?due/i,
    month,
  ];
  let heading;
  for (const l of lines.slice(0, 20)) {
    if (skipPatterns.some((re) => re.test(l))) continue;
    if (!/[a-zA-Z]/.test(l)) continue; // must contain letters
    const trimmed = l.replace(/^[^A-Za-z0-9]+|[^A-Za-z0-9]+$/g, '');
    if (trimmed.length < 4) continue;
    if (l.length >= 4 && l.length <= 100) { heading = l; break; }
  }
  const excerpt = lines.slice(0, 6).join('\n');
  const pages = data?.numpages || undefined;
  return { metaTitle: metaClean, heading, excerpt, pages };
}

async function main() {
  const base = path.join(process.cwd(), 'public');
  const roots = [path.join(base, 'coursework'), path.join(base, 'writing')].filter((p) => fs.existsSync(p));
  const docs = [];
  for (const root of roots) {
    const walk = (dir) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        if (entry.isDirectory()) {
          walk(path.join(dir, entry.name));
        } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.pdf')) {
          const abs = path.join(dir, entry.name);
          const rel = abs.replace(base, '').split(path.sep).join('/');
          const parts = rel.split('/').filter(Boolean);
          let courseDir = 'misc';
          if (parts[0] === 'coursework') courseDir = parts[1] || 'misc';
          if (parts[0] === 'writing') courseDir = 'writing';
          const course = courseFromDir(courseDir);
          docs.push({ course, title: entry.name, href: rel, excerpt: '' });
        }
      }
    };
    walk(root);
  }

  for (const d of docs) {
    const abs = path.join(base, d.href);
    try {
      const info = await readPdfInfo(abs);
      const fileBase = path.basename(d.href).replace(/\.pdf$/i, '');
      let derived = toTitleCase(
        fileBase
          .replace(/^([a-z]+)-(\d{3})-?/i, '')
          .replace(/^(apia|math|thea|hist|ethics)-?\d{0,3}-?/i, '')
      ).replace(/\bHw\b/i, 'HW');
      if (!derived || derived.length < 3) derived = toTitleCase(fileBase);
      const meta = info.metaTitle && String(info.metaTitle).trim();
      const looksGeneric = meta ? /^(APIA|HIST|THEA|ETHICS|FMST|Document|Harrington|APIA_\d+)/i.test(meta) : false;
      if (/^MATH\b/i.test(d.course)) {
        d.title = derived;
      } else if (meta && !looksGeneric) {
        d.title = meta;
      } else if (looksGeneric && info.heading) {
        d.title = info.heading;
      } else {
        d.title = derived;
      }
      d.excerpt = info.excerpt;
      d.pages = info.pages;
      const stat = fs.statSync(abs);
      d.sizeKB = Math.max(1, Math.round(stat.size / 1024));
    } catch (e) {
      const fileBase = path.basename(d.href).replace(/\.pdf$/i, '');
      d.title = toTitleCase(fileBase);
      d.excerpt = '';
      d.pages = undefined;
      try {
        const stat = fs.statSync(abs);
        d.sizeKB = Math.max(1, Math.round(stat.size / 1024));
      } catch {}
    }
  }

  // Group by course
  const grouped = {};
  for (const d of docs) {
    grouped[d.course] = grouped[d.course] || [];
    grouped[d.course].push({ title: d.title, link: d.href, excerpt: d.excerpt, pages: d.pages, sizeKB: d.sizeKB });
  }

  // Sort within groups
  for (const k of Object.keys(grouped)) {
    grouped[k].sort((a, b) => a.title.localeCompare(b.title));
  }

  const out = Object.keys(grouped)
    .sort()
    .map((course) => ({ course, items: grouped[course] }));

  const y = yaml.stringify(out);
  const outFile = path.join(process.cwd(), 'data', 'coursework.yml');
  fs.writeFileSync(outFile, y, 'utf8');
  console.log(`Wrote ${outFile}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
