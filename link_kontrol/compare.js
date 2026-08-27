const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const csvPath = path.join(__dirname, 'oc_seo_url.csv');
const slugMapPath = path.join(root, 'src/data/slug-map.json');
const productsPath = path.join(root, 'src/data/products.json');

const slugMap = JSON.parse(fs.readFileSync(slugMapPath, 'utf8'));
const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// --- parse CSV (simple quoted-csv, 2 columns: query, keyword) ---
const raw = fs.readFileSync(csvPath, 'utf8');
const lines = raw.split(/\r?\n/).filter(l => l.trim().length > 0);
const dataLines = lines.slice(1); // skip header

function parseCsvLine(line) {
  // format: "product_id=5259","boş-seyyar-kablo-makarası"
  const m = line.match(/^"([^"]*)","([^"]*)"$/);
  if (!m) return null;
  return { query: m[1], keyword: m[2] };
}

const rows = dataLines.map(parseCsvLine).filter(Boolean);
console.log('Total CSV data rows:', rows.length);

// check for percent-encoded keywords
const pctEncoded = rows.filter(r => /%[0-9A-Fa-f]{2}/.test(r.keyword));
console.log('Rows with percent-encoding in keyword:', pctEncoded.length);
pctEncoded.slice(0, 5).forEach(r => console.log('  sample:', r.keyword));

// decode keyword if percent-encoded
function normalizeKeyword(kw) {
  if (/%[0-9A-Fa-f]{2}/.test(kw)) {
    try { return decodeURIComponent(kw); } catch (e) { return kw; }
  }
  return kw;
}

// build old_product_id -> set of slugs
const byOldId = new Map();
const uniquePairs = new Set();
for (const r of rows) {
  const oldId = r.query.replace('product_id=', '');
  const kw = normalizeKeyword(r.keyword);
  const key = oldId + '|' + kw;
  uniquePairs.add(key);
  if (!byOldId.has(oldId)) byOldId.set(oldId, new Set());
  byOldId.get(oldId).add(kw);
}
console.log('Unique (old_product_id, keyword) pairs:', uniquePairs.size);
console.log('Unique old product_ids:', byOldId.size);

const allSlugs = new Set();
for (const set of byOldId.values()) for (const s of set) allSlugs.add(s);
console.log('Unique keywords total:', allSlugs.size);

// --- compare against slug-map.json keys ---
const slugMapKeys = new Set(Object.keys(slugMap));
const missing = [];
for (const [oldId, kwSet] of byOldId.entries()) {
  for (const kw of kwSet) {
    if (!slugMapKeys.has(kw)) {
      missing.push({ oldId, keyword: kw });
    }
  }
}
console.log('\n=== Missing from slug-map.json ===');
console.log('Missing slug count:', missing.length);

// --- try to guess which missing ones correspond to CURRENT catalog products ---
// heuristic: extract leading model-code token from slug, e.g. "kes120-5w-..." -> "kes120"
// compare (case-insensitive) against products.json "model" field and against slug-map.json values (ids) and existing slug-map key prefixes.

const modelToId = new Map(); // uppercase model -> product id
for (const [id, p] of Object.entries(products)) {
  if (p.model) modelToId.set(String(p.model).toUpperCase(), id);
}

const validIds = new Set(Object.keys(products));
const BRAND_PREFIXES = new Set(['global', 'k2', 'vanti', 'sü', 'su']);
const MODEL_RE = /^[a-z]{2,6}\d{2,4}[a-z]{0,2}$/i;

function guessModelToken(slug) {
  const segments = slug.split('-').filter(Boolean);
  for (let i = 0; i < Math.min(segments.length, 3); i++) {
    const seg = segments[i];
    if (BRAND_PREFIXES.has(seg.toLowerCase())) continue;
    if (MODEL_RE.test(seg)) return seg.toUpperCase();
    break; // only skip through leading brand prefixes, then require match on first real segment
  }
  return null;
}

const withGuess = missing.map(m => {
  const token = guessModelToken(m.keyword);
  const matchedByModel = token ? modelToId.get(token) : undefined;
  const matchedByOldId = validIds.has(m.oldId) ? m.oldId : undefined;
  const matchedProductId = matchedByModel || matchedByOldId;
  const matchSource = matchedByModel ? 'model' : (matchedByOldId ? 'old_id' : null);
  return { ...m, modelToken: token, matchedProductId, matchSource };
});

const likelyActive = withGuess.filter(m => m.matchedProductId);
const likelyDiscontinued = withGuess.filter(m => !m.matchedProductId);

console.log('\nLikely ACTIVE (model token matches a product in products.json):', likelyActive.length);
console.log('Likely DISCONTINUED/unknown (no model match in current catalog):', likelyDiscontinued.length);

// write outputs
fs.writeFileSync(path.join(__dirname, 'missing_all.json'), JSON.stringify(withGuess, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, 'missing_likely_active.json'), JSON.stringify(likelyActive, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, 'missing_likely_discontinued.json'), JSON.stringify(likelyDiscontinued, null, 2), 'utf8');

console.log('\nSample likely ACTIVE (first 20):');
likelyActive.slice(0, 20).forEach(m => console.log(`  ${m.keyword}  -> product ${m.matchedProductId} (token ${m.modelToken})`));

console.log('\nSample likely DISCONTINUED (first 20):');
likelyDiscontinued.slice(0, 20).forEach(m => console.log(`  ${m.keyword}  (old_id=${m.oldId}, token=${m.modelToken})`));
