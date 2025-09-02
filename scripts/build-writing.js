const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const pdf = require('pdf-parse');

function toAbs(link) {
  const base = String(link || '').replace(/^\//, '').split('#')[0];
  return path.join(process.cwd(), 'public', base);
}

async function main() {
  const src = path.join(process.cwd(), 'data', 'writing.yml');
  const raw = yaml.parse(fs.readFileSync(src, 'utf8'));
  const out = [];
  for (const item of raw) {
    const abs = toAbs(item.link);
    const next = { ...item };
    try {
      if (abs.toLowerCase().endsWith('.pdf') && fs.existsSync(abs)) {
        const data = await pdf(fs.readFileSync(abs));
        const stat = fs.statSync(abs);
        next.pages = data?.numpages || undefined;
        next.sizeKB = Math.max(1, Math.round(stat.size / 1024));
      }
    } catch {}
    out.push(next);
  }
  fs.writeFileSync(src, yaml.stringify(out), 'utf8');
  console.log('Updated', src);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

