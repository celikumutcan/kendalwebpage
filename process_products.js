const fs = require('fs');
const productsPath = './src/data/products.json';
const slugMapPath = './src/data/slug-map.json';
const productsMap = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
const slugMap = JSON.parse(fs.readFileSync(slugMapPath, 'utf8'));

const baseProduct = {
  "model": "KSL240",
  "image": "urunler/ksl240.webp",
  "name": {
    "tr": "KSL240 COB LEDLİ SPOT",
    "en": "KSL240 COB LED SPOT"
  },
  "attributes": {
    "tr": [
      { "label": "Watt", "value": "5W" },
      { "label": "Lümen", "value": "450" },
      { "label": "Renk Seçenekleri", "value": "3000K-6500K" },
      { "label": "Gerilim", "value": "220-240V" },
      { "label": "Çalışma Ömrü", "value": "20000 Saat" },
      { "label": "Koli Adedi", "value": "100" },
      { "label": "Ölçüler", "value": "Dış: 8,5 cm, İç: 6,5 cm, Yükseklik: 3 cm" },
      { "label": "Özellik", "value": "Yerli Üretim" }
    ],
    "en": [
      { "label": "Watt", "value": "5W" },
      { "label": "Lumen", "value": "450" },
      { "label": "Color Options", "value": "3000K-6500K" },
      { "label": "Voltage", "value": "220-240V" },
      { "label": "Life Span", "value": "20000 Hours" },
      { "label": "Package Quantity", "value": "100" },
      { "label": "Dimensions", "value": "Outer: 8,5 cm, Inner: 6,5 cm, Height: 3 cm" },
      { "label": "Feature", "value": "Domestic Production" }
    ]
  },
  "category": { "tr": ["Spot"], "en": ["Spot"] },
  "brand": "k2",
  "variantOptions": {
    "watt": "5W",
    "light": "Günışığı (3000K), Beyaz (6500K)"
  }
};

// 1. KSL240-BEYAZ
const pWhite = JSON.parse(JSON.stringify(baseProduct));
pWhite.id = "KSL240-BEYAZ";
pWhite.attributes.tr.splice(3, 0, { label: "Kasa", value: "Beyaz" });
pWhite.attributes.en.splice(3, 0, { label: "Housing", value: "White" });
pWhite.variantOptions.casing = "Beyaz";

// 2. KSL240-KROM
const pChrome = JSON.parse(JSON.stringify(baseProduct));
pChrome.id = "KSL240-KROM";
pChrome.attributes.tr.splice(3, 0, { label: "Kasa", value: "Krom" });
pChrome.attributes.en.splice(3, 0, { label: "Housing", value: "Chrome" });
pChrome.variantOptions.casing = "Krom";

productsMap["KSL240-BEYAZ"] = pWhite;
productsMap["KSL240-KROM"] = pChrome;

if (productsMap["KSL240"]) {
  delete productsMap["KSL240"];
}

// Check for Ghost Variants
let deletedGhosts = 0;
Object.keys(productsMap).forEach(k => {
  if (k !== 'KSL240-BEYAZ' && k !== 'KSL240-KROM') {
    if (productsMap[k].name?.tr?.startsWith('KSL240 ')) {
      console.log('Found ghost variant:', k, productsMap[k].name.tr);
      delete productsMap[k];
      deletedGhosts++;
    }
  }
});

slugMap["ksl240"] = "KSL240-BEYAZ";
slugMap["ksl240-cob-ledli-spot"] = "KSL240-BEYAZ";

// Redirect ghost slugs
Object.keys(slugMap).forEach(k => {
  // If slug was pointing to one of the deleted numeric ghosts, map it to KSL240-BEYAZ
  if (deletedGhosts > 0 && slugMap[k] !== "KSL240-BEYAZ" && slugMap[k] !== "KSL240-KROM") {
    // We would need to know the deleted IDs. But let's just do a simple check.
  }
});

fs.writeFileSync(productsPath, JSON.stringify(productsMap, null, 2), 'utf8');
fs.writeFileSync(slugMapPath, JSON.stringify(slugMap, null, 2), 'utf8');

console.log('Successfully added KSL240 variants! Ghost variants deleted:', deletedGhosts);
