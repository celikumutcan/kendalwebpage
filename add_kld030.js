const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KLD030": {
    "id": "KLD030",
    "model": "KLD030",
    "image": "urunler/kld030.webp",
    "name": {
      "tr": "KLD030 MAGNET DRIVER",
      "en": "KLD030 MAGNETIC DRIVER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "100W" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "195mm x 44mm x 22mm" },
        { "label": "Giriş", "value": "176-264V AC" },
        { "label": "Çıkış", "value": "DC48V ±2.08A" }
      ],
      "en": [
        { "label": "Watt", "value": "100W" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "195mm x 44mm x 22mm" },
        { "label": "Input", "value": "176-264V AC" },
        { "label": "Output", "value": "DC48V ±2.08A" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": { "watt": "100W" }
  },
  "KLD031": {
    "id": "KLD031",
    "model": "KLD031",
    "image": "urunler/kld030.webp",
    "name": {
      "tr": "KLD031 MAGNET DRIVER",
      "en": "KLD031 MAGNETIC DRIVER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "200W" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "227mm x 44mm x 22mm" },
        { "label": "Giriş", "value": "176-264V AC" },
        { "label": "Çıkış", "value": "DC48V ±4.16A" }
      ],
      "en": [
        { "label": "Watt", "value": "200W" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "227mm x 44mm x 22mm" },
        { "label": "Input", "value": "176-264V AC" },
        { "label": "Output", "value": "DC48V ±4.16A" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": { "watt": "200W" }
  },
  "KRS137": {
    "id": "KRS137",
    "model": "KRS137",
    "image": "urunler/krs137-kose-modul.webp",
    "name": {
      "tr": "KRS137 2 PİNLİ İLETKEN MODÜL",
      "en": "KRS137 2-PIN CONDUCTOR MODULE"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Magnet Raydan Raya Enerji Geçiş Aparatı" },
        { "label": "Koli Adedi", "value": "200" },
        { "label": "Özellik", "value": "Bakır & PC Plastik - DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "Magnetic Track to Track Power Transfer Accessory" },
        { "label": "Package Quantity", "value": "200" },
        { "label": "Feature", "value": "Copper & PC Plastic - DC48V" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS138": {
    "id": "KRS138",
    "model": "KRS138",
    "image": "urunler/krs138-2pın-modul.webp",
    "name": {
      "tr": "KRS138 2 PİNLİ İLETKEN MODÜL",
      "en": "KRS138 2-PIN CONDUCTOR MODULE"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Magnet Harici Güç Modülü" },
        { "label": "Koli Adedi", "value": "200" },
        { "label": "Özellik", "value": "Bakır & PC Plastik - DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "Magnet External Power Module" },
        { "label": "Package Quantity", "value": "200" },
        { "label": "Feature", "value": "Copper & PC Plastic - DC48V" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {}
  },
  "KRS139": {
    "id": "KRS139",
    "model": "KRS139",
    "image": "urunler/krs139-2pın-modul.webp",
    "name": {
      "tr": "KRS139 2 PİNLİ İLETKEN MODÜL",
      "en": "KRS139 2-PIN CONDUCTOR MODULE"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "Magnet Dönüş Enerji Modülü" },
        { "label": "Koli Adedi", "value": "200" },
        { "label": "Özellik", "value": "Bakır & PC Plastik - DC48V" }
      ],
      "en": [
        { "label": "Description", "value": "Magnet Corner Power Module" },
        { "label": "Package Quantity", "value": "200" },
        { "label": "Feature", "value": "Copper & PC Plastic - DC48V" }
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
    if (name.includes('KLD030') || name.includes('KLD031') || name.includes('KRS137') || name.includes('KRS138') || name.includes('KRS139')) {
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
