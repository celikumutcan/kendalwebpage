const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KDL640": {
    "id": "KDL640",
    "model": "KDL640",
    "image": "urunler/kdl640.webp",
    "name": {
      "tr": "KDL640 LEDLİ GLOP ARMATÜR",
      "en": "KDL640 LED BULKHEAD FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1650" },
        { "label": "Açıklama", "value": "Beyaz - Siyah Kasa" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "IP Sınıfı", "value": "IP65" },
        { "label": "Ölçüler", "value": "16,3 cm x 8,8 cm (Yuvarlak)" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1650" },
        { "label": "Description", "value": "White - Black Housing" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Dimensions", "value": "16,3 cm x 8,8 cm (Round)" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W" }
  },
  "KDL643": {
    "id": "KDL643",
    "model": "KDL643",
    "image": "urunler/kdl643.webp",
    "name": {
      "tr": "KDL643 LEDLİ GLOP ARMATÜR",
      "en": "KDL643 LED BULKHEAD FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1650" },
        { "label": "Açıklama", "value": "Beyaz - Siyah Kasa" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "IP Sınıfı", "value": "IP65" },
        { "label": "Ölçüler", "value": "16,3 cm x 8,8 cm (Yuvarlak)" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1650" },
        { "label": "Description", "value": "White - Black Housing" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Dimensions", "value": "16,3 cm x 8,8 cm (Round)" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W" }
  },
  "KDL641": {
    "id": "KDL641",
    "model": "KDL641",
    "image": "urunler/kdl641.webp",
    "name": {
      "tr": "KDL641 LEDLİ GLOP ARMATÜR",
      "en": "KDL641 LED BULKHEAD FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1650" },
        { "label": "Açıklama", "value": "Beyaz - Siyah Kasa" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "IP Sınıfı", "value": "IP65" },
        { "label": "Ölçüler", "value": "21 cm x 8,8 cm (Oval)" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1650" },
        { "label": "Description", "value": "White - Black Housing" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Dimensions", "value": "21 cm x 8,8 cm (Oval)" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W" }
  },
  "KDL642": {
    "id": "KDL642",
    "model": "KDL642",
    "image": "urunler/kdl642.webp",
    "name": {
      "tr": "KDL642 LEDLİ GLOP ARMATÜR",
      "en": "KDL642 LED BULKHEAD FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1650" },
        { "label": "Açıklama", "value": "Beyaz - Siyah Kasa" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "IP Sınıfı", "value": "IP65" },
        { "label": "Ölçüler", "value": "21 cm x 8,8 cm (Oval)" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1650" },
        { "label": "Description", "value": "White - Black Housing" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Dimensions", "value": "21 cm x 8,8 cm (Oval)" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W" }
  },
  "KDL648": {
    "id": "KDL648",
    "model": "KDL648",
    "image": "urunler/kdl648.webp",
    "name": {
      "tr": "KDL648 ÇİFT RENKLİ OVAL GLOP ARMATÜR",
      "en": "KDL648 DUAL COLOR OVAL BULKHEAD FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "16W" },
        { "label": "Lümen", "value": "995" },
        { "label": "IP Sınıfı", "value": "IP65" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "210 mm x 112 mm x 50 mm" },
        { "label": "Özellik", "value": "Ana Işık 6500K / Yan Işık 3000K" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "16W" },
        { "label": "Lumen", "value": "995" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "210 mm x 112 mm x 50 mm" },
        { "label": "Feature", "value": "Main Light 6500K / Side Light 3000K" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "16W" }
  }
};

// Replace variantOptions.light correctly for CCT if color options exist
Object.keys(newProducts).forEach(id => {
  const trAttrs = newProducts[id].attributes.tr;
  const colorAttr = trAttrs.find(a => a.label === 'Renk Seçenekleri');
  if (colorAttr && colorAttr.value === '3000K-4000K-6500K') {
    newProducts[id].variantOptions = newProducts[id].variantOptions || {};
    newProducts[id].variantOptions.light = "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)";
    // We can remove it from attributes so it doesn't duplicate in tech specs
    newProducts[id].attributes.tr = trAttrs.filter(a => a.label !== 'Renk Seçenekleri');
    newProducts[id].attributes.en = newProducts[id].attributes.en.filter(a => a.label !== 'Color Options');
  }
});

// Insert data
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Ghost cleanup (Rule #13)
const targetModels = ['KDL640', 'KDL641', 'KDL642', 'KDL643', 'KDL648'];
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
console.log('Added KDL products and mapped slugs. Deleted', ghostIds.length, 'ghosts.');
