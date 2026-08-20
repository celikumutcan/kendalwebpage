const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KWP4020": {
    "id": "KWP4020",
    "model": "KWP4020",
    "image": "urunler/kwp4020.webp",
    "name": {
      "tr": "KWP4020 LEDLİ ETANJ",
      "en": "KWP4020 LED WATERPROOF FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1800" },
        { "label": "Koli Adedi", "value": "12" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "60 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "1800" },
        { "label": "Package Quantity", "value": "12" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "60 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KWP4040": {
    "id": "KWP4040",
    "model": "KWP4040",
    "image": "urunler/kwp4040.webp",
    "name": {
      "tr": "KWP4040 LEDLİ ETANJ",
      "en": "KWP4040 LED WATERPROOF FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lümen", "value": "3600" },
        { "label": "Koli Adedi", "value": "12" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lumen", "value": "3600" },
        { "label": "Package Quantity", "value": "12" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "36W" }
  },
  "KWP2118": {
    "id": "KWP2118",
    "model": "KWP2118",
    "image": "urunler/kwp2118.webp",
    "name": {
      "tr": "KWP2118 LEDLİ ETANJ",
      "en": "KWP2118 LED WATERPROOF FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1800" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "60 cm" },
        { "label": "Belge", "value": "TSE" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "1800" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "60 cm" },
        { "label": "Certificate", "value": "TSE" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KWP2136": {
    "id": "KWP2136",
    "model": "KWP2136",
    "image": "urunler/kwp2136.webp",
    "name": {
      "tr": "KWP2136 LEDLİ ETANJ",
      "en": "KWP2136 LED WATERPROOF FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lümen", "value": "3600" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Belge", "value": "TSE" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lumen", "value": "3600" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Certificate", "value": "TSE" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "36W" }
  },
  "KWP2154": {
    "id": "KWP2154",
    "model": "KWP2154",
    "image": "urunler/kwp2154.webp",
    "name": {
      "tr": "KWP2154 LEDLİ ETANJ",
      "en": "KWP2154 LED WATERPROOF FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "75W" },
        { "label": "Lümen", "value": "7500" },
        { "label": "Koli Adedi", "value": "15" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Seçenekleri", "value": "3000K-4000K-6500K" },
        { "label": "Ölçüler", "value": "120 cm" },
        { "label": "Belge", "value": "TSE" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "75W" },
        { "label": "Lumen", "value": "7500" },
        { "label": "Package Quantity", "value": "15" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Options", "value": "3000K-4000K-6500K" },
        { "label": "Dimensions", "value": "120 cm" },
        { "label": "Certificate", "value": "TSE" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Armatür"], "en": ["LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "75W" }
  }
};

// Map CCT
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

// Update data
Object.keys(newProducts).forEach(id => {
  data[id] = newProducts[id];
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log('Updated KWP products with TSE certificate attribute.');
