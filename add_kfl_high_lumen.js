const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KFL150": {
    "id": "KFL150",
    "model": "KFL150",
    "image": "urunler/kfl150.webp",
    "name": {
      "tr": "KFL150 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL150 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "54W" },
        { "label": "Lümen", "value": "5450" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Özellik", "value": "2 Sıra LED / Yüksek Lümen" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "54W" },
        { "label": "Lumen", "value": "5450" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Feature", "value": "2 Row LED / High Lumen" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "54W" }
  },
  "KFL155": {
    "id": "KFL155",
    "model": "KFL155",
    "image": "urunler/kfl155.webp",
    "name": {
      "tr": "KFL155 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL155 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "72W" },
        { "label": "Lümen", "value": "6500" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Özellik", "value": "3 Sıra LED / Yüksek Lümen" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "72W" },
        { "label": "Lumen", "value": "6500" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Feature", "value": "3 Row LED / High Lumen" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "72W" }
  },
  "KFL156": {
    "id": "KFL156",
    "model": "KFL156",
    "image": "urunler/kfl156.webp",
    "name": {
      "tr": "KFL156 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL156 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "90W" },
        { "label": "Lümen", "value": "8100" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Özellik", "value": "4 Sıra LED / Yüksek Lümen" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "90W" },
        { "label": "Lumen", "value": "8100" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Feature", "value": "4 Row LED / High Lumen" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "90W" }
  },
  "KFL157": {
    "id": "KFL157",
    "model": "KFL157",
    "image": "urunler/kfl157.webp",
    "name": {
      "tr": "KFL157 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL157 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "120W" },
        { "label": "Lümen", "value": "12000" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Özellik", "value": "5 Sıra LED / Yüksek Lümen" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "120W" },
        { "label": "Lumen", "value": "12000" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Feature", "value": "5 Row LED / High Lumen" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "120W" }
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
const targetModels = ['KFL150', 'KFL155', 'KFL156', 'KFL157'];
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
console.log('Added KFL high lumen products and mapped slugs. Deleted', ghostIds.length, 'ghosts.');
