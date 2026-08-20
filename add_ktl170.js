const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KTL170": {
    "id": "KTL170",
    "model": "KTL170",
    "image": "urunler/ktl17024wsyh-ararenk.webp",
    "name": {
      "tr": "KTL170 İZNİK COB MAGNET RAY SPOT",
      "en": "KTL170 IZNIK COB MAGNETIC TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lümen", "value": "500" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 170 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lumen", "value": "500" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 170 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "10W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL171": {
    "id": "KTL171",
    "model": "KTL171",
    "image": "urunler/ktl17132wsyh-ararenk.webp",
    "name": {
      "tr": "KTL171 İZNİK COB MAGNET RAY SPOT",
      "en": "KTL171 IZNIK COB MAGNETIC TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1000" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 195 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1000" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 195 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "20W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL170D": {
    "id": "KTL170D",
    "model": "KTL170D",
    "image": "urunler/ktl171d-ray-spot.webp",
    "name": {
      "tr": "KTL170D İZNİK COB MAGNET RAY SPOT",
      "en": "KTL170D IZNIK COB MAGNETIC TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lümen", "value": "500" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 170 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lumen", "value": "500" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 170 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "10W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL171D": {
    "id": "KTL171D",
    "model": "KTL171D",
    "image": "urunler/ktl171d-ray-spot.webp",
    "name": {
      "tr": "KTL171D İZNİK COB MAGNET RAY SPOT",
      "en": "KTL171D IZNIK COB MAGNETIC TRACK SPOT"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1000" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "Ø60 mm x 195 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1000" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "Ø60 mm x 195 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "20W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  }
};

// Insert new products
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Ghost cleanup (Rule #13)
const ghostIds = [];
Object.keys(data).forEach(id => {
  if (/^\d+$/.test(id)) {
    const name = data[id].name?.tr || '';
    if (name.includes('KTL170') || name.includes('KTL171')) {
      ghostIds.push(id);
    }
  }
});
ghostIds.forEach(id => {
  console.log('Deleting ghost:', id, data[id].name.tr);
  delete data[id];
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');

// Slug mappings
const mapPath = './src/data/slug-map.json';
const slugMap = JSON.parse(fs.readFileSync(mapPath, 'utf8'));

Object.keys(newProducts).forEach(id => {
  slugMap[id.toLowerCase()] = id;
});

fs.writeFileSync(mapPath, JSON.stringify(slugMap, null, 2), 'utf8');
console.log('Added products and mapped slugs. Deleted', ghostIds.length, 'ghosts.');
