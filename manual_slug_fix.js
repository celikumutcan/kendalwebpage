const fs = require('fs');
const path = require('path');

const slugMapFilePath = path.join(__dirname, 'src', 'data', 'slug-map.json');
const slugMap = JSON.parse(fs.readFileSync(slugMapFilePath, 'utf8'));

const manualSlugs = {
    "kes076-%C5%9Farjli-led-ampul": "KES076",
    "kes076-şarjli-led-ampul": "KES076",
    "kes077-%C5%9Farjli-led-ampul": "KES077",
    "kes077-şarjli-led-ampul": "KES077"
};

let manualAdded = 0;
for (const [slug, canonical] of Object.entries(manualSlugs)) {
    slugMap[slug] = canonical;
    manualAdded++;
}

fs.writeFileSync(slugMapFilePath, JSON.stringify(slugMap, null, 2), 'utf8');

console.log(`Manually mapped ${manualAdded} specific slugs.`);
