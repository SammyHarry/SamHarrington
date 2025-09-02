const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function extractFromFile(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  const lines = data.text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const firstLines = lines.slice(0, 15); // first-page-ish excerpt (heuristic)
  return {
    file: filePath,
    title: (data.info && data.info.Title) || (data.metadata && data.metadata._metadata && data.metadata._metadata['dc:title']) || null,
    pages: data.numpages,
    firstLines,
  };
}

async function main() {
  const dir = path.join(process.cwd(), 'public', 'writing');
  const pdfs = fs.readdirSync(dir).filter((f) => f.toLowerCase().endsWith('.pdf'));
  for (const f of pdfs) {
    const filePath = path.join(dir, f);
    try {
      const info = await extractFromFile(filePath);
      console.log(`\n=== ${f} ===`);
      console.log(`Title (metadata): ${info.title || '—'}`);
      console.log(`Pages: ${info.pages}`);
      console.log('First lines:');
      info.firstLines.forEach((l) => console.log(l));
    } catch (e) {
      console.error(`Failed to parse ${f}:`, e.message);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

