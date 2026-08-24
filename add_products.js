const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'src/data/products.json');
const slugMapFile = path.join(__dirname, 'src/data/slug-map.json');
const urunlerDir = path.join(__dirname, 'public', 'images', 'urunler');

let products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
let slugMap = JSON.parse(fs.readFileSync(slugMapFile, 'utf8'));

const modelsToCheck = [
  'ksl1903', 'ksl1904', 'ksl1905', 
  'ksl2103', 'ksl2106', 
  'ksl2303', 'ksl2306', 'ksl2316', 'ksl2319',
  'ksl2409', 'ksl2410', 
  'ksl1937'
];
const ghosts = [];

for (const id in products) {
  const p = products[id];
  if (/^\d+$/.test(id)) {
    const modelLower = (p.model || '').toLowerCase();
    const nameLower = (p.name && p.name.tr ? p.name.tr : '').toLowerCase();
    
    for (const m of modelsToCheck) {
      if (modelLower.includes(m) || nameLower.includes(m)) {
        ghosts.push({ id, canonical: m.toUpperCase() });
        break;
      }
    }
  }
}

for (const slug in slugMap) {
  for (const ghost of ghosts) {
    if (slugMap[slug] === ghost.id) {
      slugMap[slug] = ghost.canonical;
    }
  }
}

ghosts.forEach(ghost => {
  if (products[ghost.id]) {
    delete products[ghost.id];
  }
});

const newItemsRaw = {
  "KSL1903": {
    "id": "KSL1903",
    "model": "KSL1903",
    "image": "urunler/ksl1903.webp",
    "name": {
      "tr": "KSL1903 LINEER ARMATÜR",
      "en": "KSL1903 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "30W" },
        { "label": "Lümen", "value": "3600" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Düz Linear" },
        { "label": "Ölçüler", "value": "100 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "30W" },
        { "label": "Lumen", "value": "3600" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Straight Linear" },
        { "label": "Dimensions", "value": "100 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "30W" }
  },
  "KSL1904": {
    "id": "KSL1904",
    "model": "KSL1904",
    "image": "urunler/ksl1904.webp",
    "name": {
      "tr": "KSL1904 LINEER ARMATÜR",
      "en": "KSL1904 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lümen", "value": "4320" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Düz Linear" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lumen", "value": "4320" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Straight Linear" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "36W" }
  },
  "KSL1905": {
    "id": "KSL1905",
    "model": "KSL1905",
    "image": "urunler/ksl1905.webp",
    "name": {
      "tr": "KSL1905 LINEER ARMATÜR",
      "en": "KSL1905 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "45W" },
        { "label": "Lümen", "value": "5400" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Düz Linear" },
        { "label": "Ölçüler", "value": "150 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "45W" },
        { "label": "Lumen", "value": "5400" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Straight Linear" },
        { "label": "Dimensions", "value": "150 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "45W" }
  },
  "KSL2103": {
    "id": "KSL2103",
    "model": "KSL2103",
    "image": "urunler/ksl2103.webp",
    "name": {
      "tr": "KSL2103 LINEER ARMATÜR",
      "en": "KSL2103 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "50W" },
        { "label": "Lümen", "value": "6000" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Yuvarlak Linear" },
        { "label": "Ölçüler", "value": "60 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "50W" },
        { "label": "Lumen", "value": "6000" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Round Linear" },
        { "label": "Dimensions", "value": "60 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "50W" }
  },
  "KSL2106": {
    "id": "KSL2106",
    "model": "KSL2106",
    "image": "urunler/ksl2106.webp",
    "name": {
      "tr": "KSL2106 LINEER ARMATÜR",
      "en": "KSL2106 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "80W" },
        { "label": "Lümen", "value": "9600" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Yuvarlak Linear" },
        { "label": "Ölçüler", "value": "90 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "80W" },
        { "label": "Lumen", "value": "9600" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Round Linear" },
        { "label": "Dimensions", "value": "90 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "80W" }
  },
  "KSL2303": {
    "id": "KSL2303",
    "model": "KSL2303",
    "image": "urunler/ksl2303.webp",
    "name": {
      "tr": "KSL2303 LINEER ARMATÜR",
      "en": "KSL2303 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "70W" },
        { "label": "Lümen", "value": "8400" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Kare Linear" },
        { "label": "Ölçüler", "value": "60x60" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "70W" },
        { "label": "Lumen", "value": "8400" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Square Linear" },
        { "label": "Dimensions", "value": "60x60" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "70W" }
  },
  "KSL2306": {
    "id": "KSL2306",
    "model": "KSL2306",
    "image": "urunler/ksl2306.webp",
    "name": {
      "tr": "KSL2306 LINEER ARMATÜR",
      "en": "KSL2306 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "100W" },
        { "label": "Lümen", "value": "12000" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Kare Linear" },
        { "label": "Ölçüler", "value": "90x90" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "100W" },
        { "label": "Lumen", "value": "12000" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Square Linear" },
        { "label": "Dimensions", "value": "90x90" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "100W" }
  },
  "KSL2316": {
    "id": "KSL2316",
    "model": "KSL2316",
    "image": "urunler/ksl2316.webp",
    "name": {
      "tr": "KSL2316 LINEER ARMATÜR",
      "en": "KSL2316 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "105W" },
        { "label": "Lümen", "value": "12600" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Dikdörtgen Linear" },
        { "label": "Ölçüler", "value": "60x120" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "105W" },
        { "label": "Lumen", "value": "12600" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Rectangular Linear" },
        { "label": "Dimensions", "value": "60x120" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "105W" }
  },
  "KSL2319": {
    "id": "KSL2319",
    "model": "KSL2319",
    "image": "urunler/ksl2319.webp",
    "name": {
      "tr": "KSL2319 LINEER ARMATÜR",
      "en": "KSL2319 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "140W" },
        { "label": "Lümen", "value": "16800" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Dikdörtgen Linear" },
        { "label": "Ölçüler", "value": "80x160" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "140W" },
        { "label": "Lumen", "value": "16800" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Rectangular Linear" },
        { "label": "Dimensions", "value": "80x160" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "140W" }
  },
  "KSL2409": {
    "id": "KSL2409",
    "model": "KSL2409",
    "image": "urunler/ksl2409.webp",
    "name": {
      "tr": "KSL2409 LINEER ARMATÜR",
      "en": "KSL2409 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "50W" },
        { "label": "Lümen", "value": "6000" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Altıgen Linear" },
        { "label": "Ölçüler", "value": "Ø60 & 30cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "50W" },
        { "label": "Lumen", "value": "6000" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Hexagonal Linear" },
        { "label": "Dimensions", "value": "Ø60 & 30cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "50W" }
  },
  "KSL2410": {
    "id": "KSL2410",
    "model": "KSL2410",
    "image": "urunler/ksl2410.webp",
    "name": {
      "tr": "KSL2410 LINEER ARMATÜR",
      "en": "KSL2410 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "80W" },
        { "label": "Lümen", "value": "9600" },
        { "label": "Işık Rengi", "value": "CCT (Günışığı (3000K), Ararenk (4000K), Beyaz (6500K))" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "1" },
        { "label": "Açıklama", "value": "Altıgen Linear" },
        { "label": "Ölçüler", "value": "Ø90 & 45cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "80W" },
        { "label": "Lumen", "value": "9600" },
        { "label": "Light Color", "value": "CCT (Warm White (3000K), Natural White (4000K), Cool White (6500K))" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "1" },
        { "label": "Description", "value": "Hexagonal Linear" },
        { "label": "Dimensions", "value": "Ø90 & 45cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "80W" }
  },
  "KSL1937": {
    "id": "KSL1937",
    "model": "KSL1937",
    "image": "urunler/ksl1937.webp",
    "name": {
      "tr": "KSL1937 LİNEER ARMATÜR",
      "en": "KSL1937 LINEAR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Ölçüler", "value": "200 cm" },
        { "label": "Açıklama", "value": "İlave Askı Takım 2 Adet" }
      ],
      "en": [
        { "label": "Dimensions", "value": "200 cm" },
        { "label": "Description", "value": "Additional Suspension Kit 2 Pieces" }
      ]
    },
    "category": { "tr": ["Armatür", "Linear Armatür"], "en": ["Armatür", "Linear Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "" }
  }
};

for (const [id, item] of Object.entries(newItemsRaw)) {
  ['tr', 'en'].forEach(lang => {
    let newAttrs = [];
    for (const attr of item.attributes[lang]) {
      if (attr.label === 'Özellik' || attr.label === 'Feature') {
        const features = attr.value.split(', ');
        for (const feat of features) {
          newAttrs.push({
            label: lang === 'tr' ? 'Özellik' : 'Feature',
            value: feat
          });
        }
      } else {
        newAttrs.push(attr);
      }
    }
    item.attributes[lang] = newAttrs;
  });
  
  if (item.variantOptions && item.variantOptions.watt === "") {
    delete item.variantOptions.watt;
  }
  
  products[id] = item;
}

let allFiles = [];
try {
  allFiles = fs.readdirSync(urunlerDir);
} catch(e) {}

const missing = [];
for (const id of modelsToCheck) {
  const pId = id.toUpperCase();
  const p = products[pId];
  if (!p) continue;

  const targetFileName = id.toLowerCase() + '.webp';
  let found = false;

  if (allFiles.includes(targetFileName)) {
    found = true;
  } else {
    const matches = allFiles.filter(f => f.toLowerCase().startsWith(id.toLowerCase()));
    if (matches.length > 0) {
      const oldFilePath = path.join(urunlerDir, matches[0]);
      const newFilePath = path.join(urunlerDir, targetFileName);
      fs.renameSync(oldFilePath, newFilePath);
      console.log('Renamed photo for', pId, ':', matches[0], '->', targetFileName);
      found = true;
    }
  }

  if (!found) {
    missing.push(pId);
  }
}

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
fs.writeFileSync(slugMapFile, JSON.stringify(slugMap, null, 2), 'utf8');

console.log("Deleted " + ghosts.length + " ghosts. Added 12 items.");
if (missing.length > 0) {
  console.log("Missing photos for:", missing);
} else {
  console.log("Photos for all 12 items are present/fixed!");
}
