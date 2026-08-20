const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "GFL155": {
    "id": "GFL155",
    "model": "GFL155",
    "image": "urunler/gfl15520wbeyaz.webp",
    "name": {
      "tr": "GFL155 ECO YATAY BANT ARMATÜR",
      "en": "GFL155 ECO HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W (60cm)" },
        { "label": "Lümen", "value": "1600" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 60 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W (60cm)" },
        { "label": "Lumen", "value": "1600" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 60 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "global",
    "variantOptions": { "watt": "18W" }
  },
  "GFL156": {
    "id": "GFL156",
    "model": "GFL156",
    "image": "urunler/gfl15640wbeyaz.webp",
    "name": {
      "tr": "GFL156 ECO YATAY BANT ARMATÜR",
      "en": "GFL156 ECO HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W (120cm)" },
        { "label": "Lümen", "value": "2700" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 120 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "36W (120cm)" },
        { "label": "Lumen", "value": "2700" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 120 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "global",
    "variantOptions": { "watt": "36W" }
  },
  "KFL141": {
    "id": "KFL141",
    "model": "KFL141",
    "image": "urunler/kfl14110wbeyaz.webp",
    "name": {
      "tr": "KFL141 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL141 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "10W (30cm)" },
        { "label": "Lümen", "value": "800" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 30 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "10W (30cm)" },
        { "label": "Lumen", "value": "800" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 30 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "10W" }
  },
  "KFL142": {
    "id": "KFL142",
    "model": "KFL142",
    "image": "urunler/kfl14220wbeyaz.webp",
    "name": {
      "tr": "KFL142 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL142 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W (60cm)" },
        { "label": "Lümen", "value": "1800" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 60 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W (60cm)" },
        { "label": "Lumen", "value": "1800" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 60 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W" }
  },
  "KFL143": {
    "id": "KFL143",
    "model": "KFL143",
    "image": "urunler/kfl14330wbeyaz.webp",
    "name": {
      "tr": "KFL143 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL143 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "30W (90cm)" },
        { "label": "Lümen", "value": "2400" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 90 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "30W (90cm)" },
        { "label": "Lumen", "value": "2400" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 90 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "30W" }
  },
  "KFL144": {
    "id": "KFL144",
    "model": "KFL144",
    "image": "urunler/kfl14440wbeyaz.webp",
    "name": {
      "tr": "KFL144 LEDLİ YATAY BANT ARMATÜR",
      "en": "KFL144 LED HORIZONTAL STRIP FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "40W (120cm)" },
        { "label": "Lümen", "value": "3200" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "L: 120 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "40W (120cm)" },
        { "label": "Lumen", "value": "3200" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "L: 120 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "40W" }
  }
};

// Replace variantOptions.light correctly for CCT if color options exist
Object.keys(newProducts).forEach(id => {
  const trAttrs = newProducts[id].attributes.tr;
  const colorAttr = trAttrs.find(a => a.label === 'Renk Seçenekleri');
  if (colorAttr && colorAttr.value === '3000K-4000K-6500K') {
    newProducts[id].variantOptions = newProducts[id].variantOptions || {};
    newProducts[id].variantOptions.light = "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)";
    newProducts[id].attributes.tr = trAttrs.filter(a => a.label !== 'Renk Seçenekleri');
    newProducts[id].attributes.en = newProducts[id].attributes.en.filter(a => a.label !== 'Color Options');
  }
});

// Insert data
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

// Ghost cleanup (Rule #13)
const targetModels = ['GFL155', 'GFL156', 'KFL141', 'KFL142', 'KFL143', 'KFL144'];
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
console.log('Added GFL/KFL products and mapped slugs. Deleted', ghostIds.length, 'ghosts.');
