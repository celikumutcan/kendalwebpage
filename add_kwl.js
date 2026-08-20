const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KWL108": {
    "id": "KWL108",
    "model": "KWL108",
    "image": "urunler/kwl108.webp",
    "name": {
      "tr": "KWL108 WALLWASHER",
      "en": "KWL108 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "3W (10cm)" },
        { "label": "Lümen", "value": "300" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "3W (10cm)" },
        { "label": "Lumen", "value": "300" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "3W" }
  },
  "KWL117": {
    "id": "KWL117",
    "model": "KWL117",
    "image": "urunler/kwl117.webp",
    "name": {
      "tr": "KWL117 WALLWASHER",
      "en": "KWL117 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W (17cm)" },
        { "label": "Lümen", "value": "600" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "6W (17cm)" },
        { "label": "Lumen", "value": "600" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "6W" }
  },
  "KWL118": {
    "id": "KWL118",
    "model": "KWL118",
    "image": "urunler/kwl118.webp",
    "name": {
      "tr": "KWL118 WALLWASHER",
      "en": "KWL118 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "9W (25cm)" },
        { "label": "Lümen", "value": "900" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "9W (25cm)" },
        { "label": "Lumen", "value": "900" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "9W" }
  },
  "KWL119": {
    "id": "KWL119",
    "model": "KWL119",
    "image": "urunler/kwl119.webp",
    "name": {
      "tr": "KWL119 WALLWASHER",
      "en": "KWL119 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W (35cm)" },
        { "label": "Lümen", "value": "1200" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W (35cm)" },
        { "label": "Lumen", "value": "1200" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "12W" }
  },
  "KWL120": {
    "id": "KWL120",
    "model": "KWL120",
    "image": "urunler/kwl120.webp",
    "name": {
      "tr": "KWL120 WALLWASHER",
      "en": "KWL120 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W (45cm)" },
        { "label": "Lümen", "value": "1800" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W (45cm)" },
        { "label": "Lumen", "value": "1800" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KWL121": {
    "id": "KWL121",
    "model": "KWL121",
    "image": "urunler/kwl121.webp",
    "name": {
      "tr": "KWL121 WALLWASHER",
      "en": "KWL121 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W (60cm)" },
        { "label": "Lümen", "value": "2400" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "24W (60cm)" },
        { "label": "Lumen", "value": "2400" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "24W" }
  },
  "KWL122": {
    "id": "KWL122",
    "model": "KWL122",
    "image": "urunler/kwl122.webp",
    "name": {
      "tr": "KWL122 WALLWASHER",
      "en": "KWL122 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W (90cm)" },
        { "label": "Lümen", "value": "3600" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "36W (90cm)" },
        { "label": "Lumen", "value": "3600" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "36W" }
  },
  "KWL123": {
    "id": "KWL123",
    "model": "KWL123",
    "image": "urunler/kwl123.webp",
    "name": {
      "tr": "KWL123 WALLWASHER",
      "en": "KWL123 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "48W (120cm)" },
        { "label": "Lümen", "value": "4800" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "48W (120cm)" },
        { "label": "Lumen", "value": "4800" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "48W" }
  },
  "KWL129": {
    "id": "KWL129",
    "model": "KWL129",
    "image": "urunler/kwl129.webp",
    "name": {
      "tr": "KWL129 WALLWASHER",
      "en": "KWL129 WALLWASHER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "54W (150cm)" },
        { "label": "Lümen", "value": "4800" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "54W (150cm)" },
        { "label": "Lumen", "value": "4800" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [ "LED Armatür" ],
      "en": [ "LED Fixture" ]
    },
    "brand": "k2",
    "variantOptions": { "watt": "54W" }
  }
};

// Insert data
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Ghost cleanup (Rule #13)
const targetModels = ['KWL108', 'KWL117', 'KWL118', 'KWL119', 'KWL120', 'KWL121', 'KWL122', 'KWL123', 'KWL129'];
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
console.log('Added KWL products and mapped slugs. Deleted', ghostIds.length, 'ghosts.');
