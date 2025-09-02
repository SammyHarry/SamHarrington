const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
const pdf = require('pdf-parse');

async function getMeta(abs) {
  const stat = fs.statSync(abs);
  const sizeKB = Math.max(1, Math.round(stat.size / 1024));
  let pages;
  if (/\.pdf$/i.test(abs)) {
    try {
      const data = await pdf(fs.readFileSync(abs));
      pages = data?.numpages;
    } catch {}
  }
  return { sizeKB, pages };
}

async function main() {
  const dir = path.join(process.cwd(), 'public', 'certificates');
  const files = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((f) => /\.(pdf|png|jpe?g)$/i.test(f))
    : [];
  const items = [];
  for (const name of files) {
    const abs = path.join(dir, name);
    const meta = await getMeta(abs);
    items.push({ name, href: `/certificates/${name}`, type: name.toLowerCase().endsWith('.pdf') ? 'pdf' : 'image', ...meta });
  }
  const outFile = path.join(process.cwd(), 'data', 'cert-uploads.yml');
  fs.writeFileSync(outFile, yaml.stringify(items), 'utf8');
  console.log(`Wrote ${outFile} (${items.length} items)`);
}

main().catch((e) => { console.error(e); process.exit(1); });

