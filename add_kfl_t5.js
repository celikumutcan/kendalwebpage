const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KFL137": {
    "id": "KFL137",
    "model": "KFL137",
    "image": "urunler/kfl137.webp",
    "name": {
      "tr": "KFL137 T5 LEDLİ BANT ARMATÜR (YUVARLAK)",
      "en": "KFL137 T5 LED STRIP FIXTURE (ROUND)"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "4W (30cm)" },
        { "label": "Lümen", "value": "340" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 30 cm" },
        { "label": "Özellik", "value": "Anahtarlı LED" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "4W (30cm)" },
        { "label": "Lumen", "value": "340" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 30 cm" },
        { "label": "Feature", "value": "LED with Switch" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "4W" }
  },
  "KFL138": {
    "id": "KFL138",
    "model": "KFL138",
    "image": "urunler/kfl138.webp",
    "name": {
      "tr": "KFL138 T5 LEDLİ BANT ARMATÜR (YUVARLAK)",
      "en": "KFL138 T5 LED STRIP FIXTURE (ROUND)"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "9W (60cm)" },
        { "label": "Lümen", "value": "765" },
        { "label": "Koli Adedi", "value": "25" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 60 cm" },
        { "label": "Özellik", "value": "Anahtarlı LED" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "9W (60cm)" },
        { "label": "Lumen", "value": "765" },
        { "label": "Package Quantity", "value": "25" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 60 cm" },
        { "label": "Feature", "value": "LED with Switch" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "9W" }
  },
  "KFL139": {
    "id": "KFL139",
    "model": "KFL139",
    "image": "urunler/kfl139.webp",
    "name": {
      "tr": "KFL139 T5 LEDLİ BANT ARMATÜR (YUVARLAK)",
      "en": "KFL139 T5 LED STRIP FIXTURE (ROUND)"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "14W (90cm)" },
        { "label": "Lümen", "value": "1120" },
        { "label": "Koli Adedi", "value": "35" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 90 cm" },
        { "label": "Özellik", "value": "Anahtarlı LED" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "14W (90cm)" },
        { "label": "Lumen", "value": "1120" },
        { "label": "Package Quantity", "value": "35" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 90 cm" },
        { "label": "Feature", "value": "LED with Switch" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "14W" }
  },
  "KFL140": {
    "id": "KFL140",
    "model": "KFL140",
    "image": "urunler/kfl140.webp",
    "name": {
      "tr": "KFL140 T5 LEDLİ BANT ARMATÜR (YUVARLAK)",
      "en": "KFL140 T5 LED STRIP FIXTURE (ROUND)"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W (120cm)" },
        { "label": "Lümen", "value": "1440" },
        { "label": "Koli Adedi", "value": "35" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 120 cm" },
        { "label": "Özellik", "value": "Anahtarlı LED" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W (120cm)" },
        { "label": "Lumen", "value": "1440" },
        { "label": "Package Quantity", "value": "35" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 120 cm" },
        { "label": "Feature", "value": "LED with Switch" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KFL151": {
    "id": "KFL151",
    "model": "KFL151",
    "image": "urunler/kfl151.webp",
    "name": {
      "tr": "KFL151 İNCE TİP ETANJ",
      "en": "KFL151 SLIM TYPE WATERPROOF FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W (60cm)" },
        { "label": "Lümen", "value": "1440" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "IP Sınıfı", "value": "IP66" },
        { "label": "Ölçüler", "value": "L: 60 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W (60cm)" },
        { "label": "Lumen", "value": "1440" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "IP Rating", "value": "IP66" },
        { "label": "Dimensions", "value": "L: 60 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KFL152": {
    "id": "KFL152",
    "model": "KFL152",
    "image": "urunler/kfl152.webp",
    "name": {
      "tr": "KFL152 İNCE TİP ETANJ",
      "en": "KFL152 SLIM TYPE WATERPROOF FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W (120cm)" },
        { "label": "Lümen", "value": "2880" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "IP Sınıfı", "value": "IP66" },
        { "label": "Ölçüler", "value": "L: 120 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "36W (120cm)" },
        { "label": "Lumen", "value": "2880" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "IP Rating", "value": "IP66" },
        { "label": "Dimensions", "value": "L: 120 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "36W" }
  }
};

// Map CCT
Object.keys(newProducts).forEach(id => {
  const trAttrs = newProducts[id].attributes.tr;
  const colorAttr = trAttrs.find(a => a.label === 'Renk Seçenekleri');
  if (colorAttr && colorAttr.value === '3000K-4000K-6500K') {
    newProducts[id].variantOptions = newProducts[id].variantOptions || {};
    newProducts[id].variantOptions.light = "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)";
    newProducts[id].attributes.tr = trAttrs.filter(a => a.label !== 'Renk Seçenekleri');
    newProducts[id].attributes.en = newProducts[id].attributes.en.filter(a => a.label !== 'Color Options');
  }
});

// Insert data
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Ghost cleanup (Rule #13)
const targetModels = ['KFL137', 'KFL138', 'KFL139', 'KFL140', 'KFL151', 'KFL152'];
const ghostIds = [];
Object.keys(data).forEach(id => {
  if (/^\d+$/.test(id)) {
    const name = data[id].name?.tr || '';
    if (targetModels.some(model => name.includes(model))) {
      ghostIds.push(id);
    }
  }
});

ghostIds.forEach(id => {
  console.log('Deleting ghost:', id, data[id].name.tr);
  delete data[id];
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

// Update slug map
const mapPath = './src/data/slug-map.json';
const slugMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

Object.keys(newProducts).forEach(id => {
  slugMap[id.toLowerCase()] = id;
});

fs.writeFileSync(mapPath, JSON.stringify(slugMap, null, 2), 'utf8');
console.log('Added KFL T5 and slim waterproof products, mapped slugs. Deleted', ghostIds.length, 'ghosts.');
