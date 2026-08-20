const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KRS134": {
    "id": "KRS134",
    "model": "KRS134",
    "image": "urunler/krs134-magnet-yay.webp",
    "name": {
      "tr": "KRS134 MAGNET MONTAJ APARATI",
      "en": "KRS134 MAGNETIC MOUNTING ACCESSORY"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Yay Sıva Altı Aparatı" },
        { "label": "Koli Adedi", "value": "2000" },
        { "label": "Ölçüler", "value": "70 mm x 15 mm" },
        { "label": "Özellik", "value": "Vida Seti ile Birlikte" }
      ],
      "en": [
        { "label": "Description", "value": "Spring Recessed Mounting Bracket" },
        { "label": "Package Quantity", "value": "2000" },
        { "label": "Dimensions", "value": "70 mm x 15 mm" },
        { "label": "Feature", "value": "Includes Screw Set" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS131B": {
    "id": "KRS131B",
    "model": "KRS131B",
    "image": "urunler/krs131b-ray-baglanti-aparati.webp",
    "name": {
      "tr": "KRS131B MAGNET MONTAJ APARATI",
      "en": "KRS131B MAGNETIC MOUNTING ACCESSORY"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Bağlantı Aparatı" },
        { "label": "Koli Adedi", "value": "200" },
        { "label": "Ölçüler", "value": "80 mm x 32 mm" }
      ],
      "en": [
        { "label": "Description", "value": "Connector Bracket" },
        { "label": "Package Quantity", "value": "200" },
        { "label": "Dimensions", "value": "80 mm x 32 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS136": {
    "id": "KRS136",
    "model": "KRS136",
    "image": "urunler/krs136-kurulum-aparati.webp",
    "name": {
      "tr": "KRS136 ALÇIPAN APARATI",
      "en": "KRS136 DRYWALL ACCESSORY"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Alçıpana Bağlantı Aparatı" },
        { "label": "Koli Adedi", "value": "200" },
        { "label": "Özellik", "value": "1 Metre - 4 Adet Kurulum Plakası, 1 Metreye 4 Adet, Vida Seti" }
      ],
      "en": [
        { "label": "Description", "value": "Drywall Connection Accessory" },
        { "label": "Package Quantity", "value": "200" },
        { "label": "Feature", "value": "1 Meter - 4 Installation Plates, 4 per Meter, Screw Set" }
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
    if (name.includes('KRS134') || name.includes('KRS131B') || name.includes('KRS136')) {
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
