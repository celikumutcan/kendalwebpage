const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KTL161": {
    "id": "KTL161",
    "model": "KTL161",
    "image": "urunler/ktl16124wsyh-ararenk.webp",
    "name": {
      "tr": "KTL161 ULUBAT DİFÜZÖRLÜ MAGNET ARMATÜR",
      "en": "KTL161 ULUBAT DIFFUSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1200" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 600 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lumen", "value": "1200" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 600 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "24W",
      "light": "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"
    }
  },
  "KTL162": {
    "id": "KTL162",
    "model": "KTL162",
    "image": "urunler/ktl16212wsyh-ararenk.webp",
    "name": {
      "tr": "KTL162 ULUBAT DİFÜZÖRLÜ MAGNET ARMATÜR",
      "en": "KTL162 ULUBAT DIFFUSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lümen", "value": "1800" },
        { "label": "Koli Adedi", "value": "25" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 900 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lumen", "value": "1800" },
        { "label": "Package Quantity", "value": "25" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 900 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "36W",
      "light": "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"
    }
  },
  "KTL163": {
    "id": "KTL163",
    "model": "KTL163",
    "image": "urunler/ktl16324wsyh-ararenk.webp",
    "name": {
      "tr": "KTL163 ULUBAT DİFÜZÖRLÜ MAGNET ARMATÜR",
      "en": "KTL163 ULUBAT DIFFUSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "48W" },
        { "label": "Lümen", "value": "2400" },
        { "label": "Koli Adedi", "value": "25" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 1200 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "48W" },
        { "label": "Lumen", "value": "2400" },
        { "label": "Package Quantity", "value": "25" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 1200 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "48W",
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

// Standard mappings
Object.keys(newProducts).forEach(id => {
  slugMap[id.toLowerCase()] = id;
});

// Legacy URL mappings
slugMap[decodeURIComponent('ktl161-ulubat-magnet-light-24w-siyah-kasa*ararenk')] = 'KTL161';
slugMap[decodeURIComponent('ktl161-ulubat-magnet-light-24w-siyah-kasa*beyaz')] = 'KTL161';
slugMap[decodeURIComponent('ktl161-ulubat-magnet-light-24w-siyah-kasa*g%C3%BCni%C5%9Fi%C4%9Fi')] = 'KTL161';
slugMap[decodeURIComponent('ktl162-bafa-magnet-light-12w-siyah-kasa*ararenk')] = 'KTL162';
slugMap[decodeURIComponent('ktl162-bafa-magnet-light-12w-siyah-kasa*beyaz')] = 'KTL162';
slugMap[decodeURIComponent('ktl162-bafa-magnet-light-12w-siyah-kasa*g%C3%BCni%C5%9Fi%C4%9Fi')] = 'KTL162';
slugMap[decodeURIComponent('ktl163-bafa-magnet-light-24w-siyah-kasa*ararenk')] = 'KTL163';
slugMap[decodeURIComponent('ktl163-bafa-magnet-light-24w-siyah-kasa*beyaz')] = 'KTL163';
slugMap[decodeURIComponent('ktl163-bafa-magnet-light-24w-siyah-kasa*g%C3%BCni%C5%9Fi%C4%9Fi')] = 'KTL163';

fs.writeFileSync(mapPath, JSON.stringify(slugMap, null, 2), 'utf8');
console.log('Done mapping.');
