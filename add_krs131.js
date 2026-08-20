const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KRS131": {
    "id": "KRS131",
    "model": "KRS131",
    "image": "urunler/krs131raysoksyh.webp",
    "name": {
      "tr": "KRS131 MAGNET RAY",
      "en": "KRS131 MAGNETIC TRACK"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "1 Metre" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Ölçüler", "value": "5 cm x 100 cm" },
        { "label": "Özellik", "value": "4 in 1 Fonksiyon / Alüminyum / 0,6mm Bakır Kablo" }
      ],
      "en": [
        { "label": "Description", "value": "1 Meter" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Dimensions", "value": "5 cm x 100 cm" },
        { "label": "Feature", "value": "4 in 1 Function / Aluminum / 0.6mm Copper Cable" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS132": {
    "id": "KRS132",
    "model": "KRS132",
    "image": "urunler/krs132raysoksyh.webp",
    "name": {
      "tr": "KRS132 MAGNET RAY",
      "en": "KRS132 MAGNETIC TRACK"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "2 Metre" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Ölçüler", "value": "5 cm x 200 cm" },
        { "label": "Özellik", "value": "4 in 1 Fonksiyon / Alüminyum / 0,6mm Bakır Kablo" }
      ],
      "en": [
        { "label": "Description", "value": "2 Meter" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Dimensions", "value": "5 cm x 200 cm" },
        { "label": "Feature", "value": "4 in 1 Function / Aluminum / 0.6mm Copper Cable" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS133": {
    "id": "KRS133",
    "model": "KRS133",
    "image": "urunler/krs133raysoksyh.webp",
    "name": {
      "tr": "KRS133 MAGNET RAY",
      "en": "KRS133 MAGNETIC TRACK"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "3 Metre" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Ölçüler", "value": "3 cm x 300 cm" },
        { "label": "Özellik", "value": "4 in 1 Fonksiyon / Alüminyum / 0,6mm Bakır Kablo" }
      ],
      "en": [
        { "label": "Description", "value": "3 Meter" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Dimensions", "value": "3 cm x 300 cm" },
        { "label": "Feature", "value": "4 in 1 Function / Aluminum / 0.6mm Copper Cable" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS131L": {
    "id": "KRS131L",
    "model": "KRS131L",
    "image": "urunler/krs131l-l-donus-aparati.webp",
    "name": {
      "tr": "KRS131L MAGNET DÖNÜŞ APARATI",
      "en": "KRS131L MAGNETIC CORNER CONNECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Yatay L Dönüş" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "80 mm x 80 mm" },
        { "label": "Özellik", "value": "Alüminyum / DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "Horizontal L Connector" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "80 mm x 80 mm" },
        { "label": "Feature", "value": "Aluminum / DC48V" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS132L": {
    "id": "KRS132L",
    "model": "KRS132L",
    "image": "urunler/krs132l-l-donus.webp",
    "name": {
      "tr": "KRS132L MAGNET DÖNÜŞ APARATI",
      "en": "KRS132L MAGNETIC CORNER CONNECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Dikey L Dönüş" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "80 mm x 80 mm" },
        { "label": "Özellik", "value": "Alüminyum / DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "Vertical L Connector" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "80 mm x 80 mm" },
        { "label": "Feature", "value": "Aluminum / DC48V" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
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
    if (name.includes('KRS131') || name.includes('KRS132') || name.includes('KRS133')) {
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
