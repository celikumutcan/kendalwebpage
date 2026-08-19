const fs = require('fs');
const path = require('path');

const slugMapFilePath = path.join(__dirname, 'src', 'data', 'slug-map.json');
const slugMap = JSON.parse(fs.readFileSync(slugMapFilePath, 'utf8'));

const manualSlugs = {
    "kes076-%C5%9Farjli-led-ampul": "KES076",
    "kes076-şarjli-led-ampul": "KES076",
    "kes077-%C5%9Farjli-led-ampul": "KES077",
    "kes077-şarjli-led-ampul": "KES077",
    "kes632-cob-flam-amp-6w-e27-g%C3%BCn%C4%B1%C5%9F%C4%B1%C4%9F%C4%B1-dimmable": "KES632",
    "kes632-cob-flam-amp-6w-e27-günışığı-dimmable": "KES632",
    "kes632-cob-flam-amp-6w-e27-günışığı-dimmable": "KES632",
    "kes633-cob-flam-amp-8w-e27-g%C3%BCn%C4%B1%C5%9F%C4%B1%C4%9F%C4%B1-dimmable": "KES633",
    "kes633-cob-flam-amp-8w-e27-günışığı-dimmable": "KES633",
    "kes634-cob-flam-amp-8w-e27-g%C3%BCn%C4%B1%C5%9F%C4%B1%C4%9F%C4%B1-dimmable": "KES634",
    "kes634-cob-flam-amp-8w-e27-g%C3%BCn%C4%B1%C5%9F%C4%B1%C4%9F%C4%B1-dimmable": "KES634",
    "kes634-cob-flam-amp-8w-e27-günışığı-dimmable": "KES634",
    "kes119-5w-led-ampul-ye%C5%9Fil": "KES119",
    "kes119-5w-led-ampul-yeşil": "KES119",
    "kes119-5w-led-ampul-sar%C4%B1": "KES119",
    "kes119-5w-led-ampul-sarı": "KES119",
    "kes119-5w-led-ampul-k%C4%B1rm%C4%B1z%C4%B1": "KES119",
    "kes119-5w-led-ampul-kırmızı": "KES119",
    "knl380-ledli-gece-lambasi-1w-sar%C4%B1": "KNL380",
    "knl380-ledli-gece-lambasi-1w-sarı": "KNL380",
    "knl380-ledli-gece-lambasi-1w-ye%C5%9Fil": "KNL380",
    "knl380-ledli-gece-lambasi-1w-yeşil": "KNL380",
    "knl380-ledli-gece-lambasi-1w-k%C4%B1rm%C4%B1z%C4%B1": "KNL380",
    "knl380-ledli-gece-lambasi-1w-kırmızı": "KNL380",
    "knl381-ledli-gece-lambasi-1w-sar%C4%B1": "KNL381",
    "knl381-ledli-gece-lambasi-1w-sarı": "KNL381",
    "knl381-ledli-gece-lambasi-1w-ye%C5%9Fil": "KNL381",
    "knl381-ledli-gece-lambasi-1w-yeşil": "KNL381",
    "knl381-ledli-gece-lambasi-1w-k%C4%B1rm%C4%B1z%C4%B1": "KNL381",
    "knl381-ledli-gece-lambasi-1w-kırmızı": "KNL381",
    "kes475-30w-led-k%C3%BCre-ampul-beyaz": "KES475",
    "kes475-30w-led-küre-ampul-beyaz": "KES475",
    "kes475-30w-led-k%C3%BCre-ampul-g%C3%BCn%C4%B1%C5%9F%C4%B1%C4%9F%C4%B1": "KES475",
    "kes475-30w-led-küre-ampul-günışığı": "KES475",
    "kes473-vantilat%C3%B6rl%C3%BC-led-ampul": "KES473",
    "kes473-vantilatörlü-led-ampul": "KES473"
};

let manualAdded = 0;
for (const [slug, canonical] of Object.entries(manualSlugs)) {
    slugMap[slug] = canonical;
    manualAdded++;
}

fs.writeFileSync(slugMapFilePath, JSON.stringify(slugMap, null, 2), 'utf8');

console.log(`Manually mapped ${manualAdded} specific slugs.`);
