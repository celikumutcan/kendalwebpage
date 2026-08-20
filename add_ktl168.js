const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KTL168": {
    "id": "KTL168",
    "model": "KTL168",
    "image": "urunler/ktl1688wsyh-ararenk.webp",
    "name": {
      "tr": "KTL168 BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL168 BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "300" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "115 mm x 105 mm x 22 mm" },
        { "label": "Özellik", "value": "Ayarlanabilir Başlıklı" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "300" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "115 mm x 105 mm x 22 mm" },
        { "label": "Feature", "value": "Adjustable Head" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W",
      "light": "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"
    }
  },
  "KTL169": {
    "id": "KTL169",
    "model": "KTL169",
    "image": "urunler/ktl16916wsyh-ararenk.webp",
    "name": {
      "tr": "KTL169 BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL169 BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "223 mm x 105 mm x 22 mm" },
        { "label": "Özellik", "value": "Ayarlanabilir Başlıklı" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "223 mm x 105 mm x 22 mm" },
        { "label": "Feature", "value": "Adjustable Head" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W",
      "light": "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"
    }
  },
  "KTL169D": {
    "id": "KTL169D",
    "model": "KTL169D",
    "image": "urunler/ktl169d-magnet-armatur.webp",
    "name": {
      "tr": "KTL169D BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL169D BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "223 mm x 105 mm x 22 mm" },
        { "label": "Özellik", "value": "Ayarlanabilir Başlıklı" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "223 mm x 105 mm x 22 mm" },
        { "label": "Feature", "value": "Adjustable Head" }
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

// Insert data
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Ghost cleanup (Rule #13)
const ghostIds = [];
Object.keys(data).forEach(id => {
  if (/^\d+$/.test(id)) {
    const name = data[id].name?.tr || '';
    if (name.includes('KTL168') || name.includes('KTL169')) {
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
