const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const Tesseract = require('tesseract.js');

const CERT_DIR = path.join(process.cwd(), 'public', 'certificates');
const LOG_FILE = path.join(process.cwd(), 'data', 'cert-rename-log.json');

function slugify(s) {
  return String(s || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function detectProvider(text) {
  const t = (text || '').toLowerCase();
  if (/wall\s*street\s*prep|\bwsp\b/.test(t)) return 'wsp';
  if (/(sell[-\s]?side\s+equity\s+research|\berc\b)/.test(t)) return 'erc';
  if (/project\s+finance\s+model(ing)?/.test(t)) return 'project-finance';
  if (/financial\s+\&?\s*valuation\s+model(ing)?/.test(t)) return 'fvm';
  if (/equity\s+research/.test(t)) return 'equity-research';
  if (/certificate|certified|credential/.test(t)) return 'certificate';
  return 'cert';
}

function extractDate(text) {
  const month = /(January|February|March|April|May|June|July|August|September|October|November|December)/i;
  const m = (text || '').match(new RegExp(`${month.source}[^\n\r]{0,20}(20\d{2})`, 'i'));
  if (m) {
    const mm = {
      january: '01', february: '02', march: '03', april: '04', may: '05', june: '06',
      july: '07', august: '08', september: '09', october: '10', november: '11', december: '12',
    }[m[1].toLowerCase()];
    return `${m[2]}${mm}`; // YYYYMM
  }
  const y = (text || '').match(/\b(20\d{2})\b/);
  return y ? y[1] : null;
}

function pickTitle(text) {
  const lines = String(text || '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  const candidates = [];
  for (const l of lines.slice(0, 30)) {
    if (/sam\s+harrington/i.test(l)) continue;
    if (/prof/i.test(l)) continue;
    if (/william\s*&\s*mary/i.test(l)) continue;
    if (/^\d{1,2}\s?\w+\s?\d{4}|\b20\d{2}\b/i.test(l)) continue;
    if (/^certificate(\b|\s)/i.test(l)) continue;
    if (/[A-Za-z]/.test(l) && l.length >= 6 && l.length <= 80) candidates.push(l);
  }
  const ranked = candidates
    .map((l) => ({
      l,
      score:
        (/(research|finance|valuation|model|equity|project|sell[-\s]?side|completion|credential|certification)/i.test(l) ? 2 : 0) +
        (/[A-Z][a-z]+/.test(l) ? 1 : 0),
    }))
    .sort((a, b) => b.score - a.score);
  return (ranked[0] && ranked[0].l) || candidates[0] || 'certificate';
}

async function textFromPdf(abs) {
  const data = await pdf(fs.readFileSync(abs));
  return String(data.text || '');
}

async function textFromImage(abs, timeoutMs = 10000) {
  const p = Tesseract.recognize(abs, 'eng', { logger: () => {} }).then((res) => res?.data?.text || '');
  const timeout = new Promise((resolve) => setTimeout(() => resolve(''), timeoutMs));
  return Promise.race([p, timeout]);
}

function uniqueName(dir, base, ext) {
  let candidate = `${base}${ext}`;
  let i = 2;
  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${base}-${i}${ext}`;
    i += 1;
  }
  return candidate;
}

async function main() {
  if (!fs.existsSync(CERT_DIR)) {
    console.log('No certificates directory found.');
    return;
  }
  const entries = fs.readdirSync(CERT_DIR).filter((f) => /\.(pdf|png|jpe?g)$/i.test(f));
  const plan = [];

  for (const name of entries) {
    const abs = path.join(CERT_DIR, name);
    try {
      const isPdf = /\.pdf$/i.test(name);
      const text = isPdf ? await textFromPdf(abs) : await textFromImage(abs);
      const provider = detectProvider(text);
      const title = pickTitle(text);
      const yymm = extractDate(text);
      const base = [provider, slugify(title), yymm].filter(Boolean).join('-') || 'cert';
      const ext = path.extname(name).toLowerCase();
      const targetName = uniqueName(CERT_DIR, base, ext);
      if (targetName !== name) {
        fs.renameSync(abs, path.join(CERT_DIR, targetName));
        console.log(`Renamed: ${name} -> ${targetName}`);
        plan.push({ from: name, to: targetName, provider, title, yymm });
      } else {
        plan.push({ from: name, to: name, provider, title, yymm });
      }
    } catch (e) {
      plan.push({ from: name, to: null, error: e.message });
    }
  }

  fs.writeFileSync(LOG_FILE, JSON.stringify({ generatedAt: new Date().toISOString(), plan }, null, 2));
  console.log('Wrote rename log to', LOG_FILE);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

