const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const slugMapPath = path.join(root, 'src/data/slug-map.json');

const slugMapRaw = fs.readFileSync(slugMapPath, 'utf8');
const slugMap = JSON.parse(slugMapRaw);
const missing = JSON.parse(fs.readFileSync(path.join(__dirname, 'missing_likely_active.json'), 'utf8'));

// sanity: dedupe by keyword, detect conflicts (same keyword -> different product ids)
const toAdd = new Map();
const conflicts = [];
for (const m of missing) {
  if (slugMap[m.keyword]) continue; // safety: never overwrite existing key
  if (toAdd.has(m.keyword) && toAdd.get(m.keyword) !== m.matchedProductId) {
    conflicts.push(m);
    continue;
  }
  toAdd.set(m.keyword, m.matchedProductId);
}

if (conflicts.length) {
  console.log('CONFLICTS found, not applied automatically:', conflicts.length);
  conflicts.forEach(c => console.log('  ', c.keyword, '->', c.matchedProductId));
}

console.log('Existing slug-map.json keys:', Object.keys(slugMap).length);
console.log('New keys to add:', toAdd.size);

for (const [k, v] of toAdd.entries()) {
  slugMap[k] = v;
}

console.log('New total keys:', Object.keys(slugMap).length);

const out = JSON.stringify(slugMap, null, 2) + '\n';
fs.writeFileSync(slugMapPath, out, 'utf8');
console.log('Written to', slugMapPath);
