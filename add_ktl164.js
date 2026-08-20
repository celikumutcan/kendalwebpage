const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KTL164": {
    "id": "KTL164",
    "model": "KTL164",
    "image": "urunler/ktl1648wsyh-ararenk.webp",
    "name": {
      "tr": "KTL164 BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL164 BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "300" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 112 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "300" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 112 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL165": {
    "id": "KTL165",
    "model": "KTL165",
    "image": "urunler/ktl16516wsyh-ararenk.webp",
    "name": {
      "tr": "KTL165 BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL165 BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 223 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 223 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL166": {
    "id": "KTL166",
    "model": "KTL166",
    "image": "urunler/ktl16624wsyh-ararenk.webp",
    "name": {
      "tr": "KTL166 BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL166 BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "900" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 330 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "900" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 330 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "18W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL167": {
    "id": "KTL167",
    "model": "KTL167",
    "image": "urunler/ktl16732wsyh-ararenk.webp",
    "name": {
      "tr": "KTL167 BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL167 BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1200" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 436 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lumen", "value": "1200" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 436 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "24W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL164D": {
    "id": "KTL164D",
    "model": "KTL164D",
    "image": "urunler/ktl164d-magnet-armatur.webp",
    "name": {
      "tr": "KTL164D BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL164D BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "300" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 112 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "300" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 112 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL165D": {
    "id": "KTL165D",
    "model": "KTL165D",
    "image": "urunler/ktl165d-magnet-armatur.webp",
    "name": {
      "tr": "KTL165D BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL165D BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 223 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 223 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL166D": {
    "id": "KTL166D",
    "model": "KTL166D",
    "image": "urunler/ktl166d-magnet-armatur.webp",
    "name": {
      "tr": "KTL166D BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL166D BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "900" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 330 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "900" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 330 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "18W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  },
  "KTL167D": {
    "id": "KTL167D",
    "model": "KTL167D",
    "image": "urunler/ktl167d-magnet-armatur.webp",
    "name": {
      "tr": "KTL167D BAFA LENSLİ MAGNET ARMATÜR",
      "en": "KTL167D BAFA LENSED MAGNETIC FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1200" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Gerilim", "value": "48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Ölçüler", "value": "22 mm x 43 mm x 436 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lumen", "value": "1200" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Voltage", "value": "48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Dimensions", "value": "22 mm x 43 mm x 436 mm" }
      ]
    },
    "category": { "tr": ["Magnet"], "en": ["Magnet"] },
    "brand": "k2",
    "variantOptions": {
      "watt": "24W",
      "light": "Günışığı (3000K), Ararenk (4000K)"
    }
  }
};

// Update records
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Clean ghosts (Rule #13)
const ghostIds = [];
Object.keys(data).forEach(id => {
  if (/^\d+$/.test(id)) {
    const name = data[id].name?.tr || '';
    if (name.includes('KTL164') || name.includes('KTL165') || name.includes('KTL166') || name.includes('KTL167')) {
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
