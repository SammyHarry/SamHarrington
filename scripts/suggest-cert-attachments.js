const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

function loadY(file) {
  return yaml.parse(fs.readFileSync(file, 'utf8'));
}

function saveY(file, obj) {
  fs.writeFileSync(file, yaml.stringify(obj), 'utf8');
}

function main() {
  const certsFile = path.join(process.cwd(), 'data', 'certifications.yml');
  const uploadsFile = path.join(process.cwd(), 'data', 'cert-uploads.yml');
  const outFile = path.join(process.cwd(), 'data', 'cert-attachments.suggest.yml');
  const certs = loadY(certsFile);
  const uploads = loadY(uploadsFile);

  const suggestions = certs.map((c) => ({ group: c.group, suggestions: [] }));

  const rules = [
    { groupMatch: /sell\s*-?side|equity\s+research|\berc\b/i, include: [/erc|equity-research/i] },
    { groupMatch: /wall\s*street\s*prep|Financial & Valuation/i, include: [/wsp|financial|model|dcf|m-a|valuation/i] },
    { groupMatch: /project\s+finance/i, include: [/project\s*finance/i] },
  ];

  for (const c of suggestions) {
    const rule = rules.find((r) => r.groupMatch.test(c.group));
    if (!rule) continue;
    const matches = uploads.filter((u) => rule.include.some((re) => re.test(u.name) || re.test(u.href)));
    for (const u of matches) {
      const isPdf = /\.pdf$/i.test(u.name);
      const label = isPdf
        ? (u.name.replace(/wsp[-_]?/i, '').replace(/-/g, ' ').replace(/\.pdf$/i, '').trim() + ' (PDF)')
        : u.name.replace(/wsp[-_]?/i, '').replace(/-/g, ' ').replace(/\.png$/i, '').trim();
      c.suggestions.push({ href: u.href, label });
    }
  }

  saveY(outFile, suggestions);
  console.log('Wrote', outFile);
}

main();

