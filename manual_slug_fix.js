const fs = require('fs');
const path = require('path');

const slugMapFilePath = path.join(__dirname, 'src', 'data', 'slug-map.json');
const slugMap = JSON.parse(fs.readFileSync(slugMapFilePath, 'utf8'));

const manualSlugs = {
    "kes049b-smd-ledli-lensli-g5-3-amp-7w-g%C3%BCni%C5%9Fi%C4%9Fi": "KES049B",
    "kes049b-smd-ledli-lensli-g5-3-amp-7w-günişiği": "KES049B",
    
    "kes049d-ledli-lensli-gu10-ampul-7w-g%C3%BCni%C5%9Fi%C4%9Fi": "KES049D",
    "kes049d-ledli-lensli-gu10-ampul-7w-günişiği": "KES049D",
    
    "kes049r-gu10-ampul-7w-ye%C5%9Fil": "KES049R",
    "kes049r-gu10-ampul-7w-yeşil": "KES049R",
    
    "kes049r-gu10-ampul-7w-k%C4%B1rm%C4%B1z%C4%B1": "KES049R",
    "kes049r-gu10-ampul-7w-kırmızı": "KES049R"
};

let manualAdded = 0;
for (const [slug, canonical] of Object.entries(manualSlugs)) {
    slugMap[slug] = canonical;
    manualAdded++;
}

fs.writeFileSync(slugMapFilePath, JSON.stringify(slugMap, null, 2), 'utf8');

console.log(`Manually mapped ${manualAdded} specific slugs.`);
