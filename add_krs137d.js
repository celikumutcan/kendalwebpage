const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KRS137D": {
    "id": "KRS137D",
    "model": "KRS137D",
    "image": "urunler/krs137d-modul.webp",
    "name": {
      "tr": "KRS137D 4 PİNLİ İLETKEN MODÜL",
      "en": "KRS137D 4-PIN CONDUCTOR MODULE"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "4 Pinli Ray Bağlantı Kablosu" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Özellik", "value": "Bakır & PC Plastik - DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "4-Pin Track Connection Cable" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Feature", "value": "Copper & PC Plastic - DC48V" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS138D": {
    "id": "KRS138D",
    "model": "KRS138D",
    "image": "urunler/krs138d-4pın-modul.webp",
    "name": {
      "tr": "KRS138D 4 PİNLİ İLETKEN MODÜL",
      "en": "KRS138D 4-PIN CONDUCTOR MODULE"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Harici Dim Edilebilir Enerji Modülü" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Özellik", "value": "Bakır & PC Plastik - DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "External Dimmable Power Module" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Feature", "value": "Copper & PC Plastic - DC48V" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS139D": {
    "id": "KRS139D",
    "model": "KRS139D",
    "image": "urunler/krs139d-4pın-modul.webp",
    "name": {
      "tr": "KRS139D 4 PİNLİ İLETKEN MODÜL",
      "en": "KRS139D 4-PIN CONDUCTOR MODULE"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Ray Bağlantı Kablosu L Köşe" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Özellik", "value": "Bakır & PC Plastik - DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "Track Connection Cable L Corner" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Feature", "value": "Copper & PC Plastic - DC48V" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS135": {
    "id": "KRS135",
    "model": "KRS135",
    "image": "urunler/krs135-aski-aparati.webp",
    "name": {
      "tr": "KRS135 ASKI APARAT TAKIMI",
      "en": "KRS135 SUSPENSION ACCESSORY KIT"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Magnet Askı Aparatı" },
        { "label": "Koli Adedi", "value": "250" },
        { "label": "Özellik", "value": "2 Adet 1mt Çelik Kablo, Paslanmaz Çelik Plaka, Vida Seti" }
      ],
      "en": [
        { "label": "Description", "value": "Magnet Suspension Accessory" },
        { "label": "Package Quantity", "value": "250" },
        { "label": "Feature", "value": "2 Pieces 1m Steel Cable, Stainless Steel Plate, Screw Set" }
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
    if (name.includes('KRS137') || name.includes('KRS138') || name.includes('KRS139') || name.includes('KRS135')) {
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
