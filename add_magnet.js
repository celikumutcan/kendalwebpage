const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KTL159": {
    "id": "KTL159",
    "model": "KTL159",
    "image": "urunler/ktl159.webp",
    "name": {
      "tr": "KTL159 ULUBAT DİFÜZÖRLÜ MAGNET ARMATÜR",
      "en": "KTL159 ULUBAT DIFFUSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lümen", "value": "500" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "23 mm x 43 mm x 200 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lumen", "value": "500" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "23 mm x 43 mm x 200 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "10W",
      "light": "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"
    }
  },
  "KTL160": {
    "id": "KTL160",
    "model": "KTL160",
    "image": "urunler/ktl160.webp",
    "name": {
      "tr": "KTL160 ULUBAT DİFÜZÖRLÜ MAGNET ARMATÜR",
      "en": "KTL160 ULUBAT DIFFUSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "23 mm x 43 mm x 300 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "23 mm x 43 mm x 300 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W",
      "light": "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"
    }
  },
  "KTL160D": {
    "id": "KTL160D",
    "model": "KTL160D",
    "image": "urunler/ktl160d.webp",
    "name": {
      "tr": "KTL160D ULUBAT DİFÜZÖRLÜ MAGNET ARMATÜR",
      "en": "KTL160D ULUBAT DIFFUSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "23 mm x 43 mm x 300 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "23 mm x 43 mm x 300 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W",
      "light": "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"
    }
  }
};

Object.keys(newProducts).forEach(id => {
  if (data[id]) {
    console.log('Updated:', id);
  } else {
    console.log('Added:', id);
  }
  data[id] = newProducts[id];
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

const mapPath = './src/data/slug-map.json';
const slugMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

Object.keys(newProducts).forEach(id => {
  slugMap[id.toLowerCase()] = id;
});

fs.writeFileSync(mapPath, JSON.stringify(slugMap, null, 2), 'utf8');
console.log('Done mapping.');
