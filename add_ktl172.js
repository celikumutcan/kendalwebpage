const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KTL172": {
    "id": "KTL172",
    "model": "KTL172",
    "image": "urunler/ktl1728wbyz-ararenk.webp",
    "name": {
      "tr": "KTL172 İZNİK COB MAGNET SARKIT RAY SPOT",
      "en": "KTL172 IZNIK COB MAGNETIC PENDANT TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "300" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "25" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 200 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "300" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "25" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 200 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL173": {
    "id": "KTL173",
    "model": "KTL173",
    "image": "urunler/ktl17316wbyz-ararenk.webp",
    "name": {
      "tr": "KTL173 İZNİK COB MAGNET SARKIT RAY SPOT",
      "en": "KTL173 IZNIK COB MAGNETIC PENDANT TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "25" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 300 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "25" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 300 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL172D": {
    "id": "KTL172D",
    "model": "KTL172D",
    "image": "urunler/ktl172d-sarkit-spot.webp",
    "name": {
      "tr": "KTL172D İZNİK COB MAGNET SARKIT RAY SPOT",
      "en": "KTL172D IZNIK COB MAGNETIC PENDANT TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "300" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "25" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 200 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "300" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "25" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 200 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL173D": {
    "id": "KTL173D",
    "model": "KTL173D",
    "image": "urunler/ktl173d-sarkit-spot.webp",
    "name": {
      "tr": "KTL173D İZNİK COB MAGNET SARKIT RAY SPOT",
      "en": "KTL173D IZNIK COB MAGNETIC PENDANT TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "25" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 300 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "25" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 300 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  }
};

// Insert data
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Ghost cleanup (Rule #13)
const ghostIds = [];
Object.keys(data).forEach(id => {
  if (/^\d+$/.test(id)) {
    const name = data[id].name?.tr || '';
    if (name.includes('KTL172') || name.includes('KTL173')) {
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
console.log('Added products and mapped slugs. Deleted', ghostIds.length, 'ghosts.');
