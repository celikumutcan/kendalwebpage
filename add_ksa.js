const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KSA190": {
    "id": "KSA190",
    "model": "KSA190",
    "image": "urunler/ksa190-sensorlu-armatur.webp",
    "name": {
      "tr": "KSA190 PIR SENSÖRLÜ TAVAN ARMATÜRÜ",
      "en": "KSA190 PIR SENSOR CEILING FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "1020" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Açıklama", "value": "Ledli" },
        { "label": "IP Sınıfı", "value": "IP20" },
        { "label": "Ölçüler", "value": "Çap: 230 mm, Yükseklik: 50 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "1020" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Description", "value": "With LED" },
        { "label": "IP Rating", "value": "IP20" },
        { "label": "Dimensions", "value": "Diameter: 230 mm, Height: 50 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "12W" }
  },
  "KSA191": {
    "id": "KSA191",
    "model": "KSA191",
    "image": "urunler/ksa190-sensorlu-armatur.webp",
    "name": {
      "tr": "KSA191 PIR SENSÖRLÜ TAVAN ARMATÜRÜ",
      "en": "KSA191 PIR SENSOR CEILING FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1530" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Açıklama", "value": "Ledli" },
        { "label": "IP Sınıfı", "value": "IP20" },
        { "label": "Ölçüler", "value": "Çap: 300 mm, Yükseklik: 50 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "1530" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Description", "value": "With LED" },
        { "label": "IP Rating", "value": "IP20" },
        { "label": "Dimensions", "value": "Diameter: 300 mm, Height: 50 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KSA188": {
    "id": "KSA188",
    "model": "KSA188",
    "image": "urunler/ksa18818we27ld.webp",
    "name": {
      "tr": "KSA188 LEDLİ SENSÖRLÜ TAVAN ARMATÜRÜ",
      "en": "KSA188 LED SENSOR CEILING FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "2200" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Açıklama", "value": "Ledli" },
        { "label": "IP Sınıfı", "value": "IP20" },
        { "label": "Ölçüler", "value": "Çap: 300 mm, Yükseklik: 75 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "2200" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Description", "value": "With LED" },
        { "label": "IP Rating", "value": "IP20" },
        { "label": "Dimensions", "value": "Diameter: 300 mm, Height: 75 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KSA189": {
    "id": "KSA189",
    "model": "KSA189",
    "image": "urunler/ksa18918we27ld.webp",
    "name": {
      "tr": "KSA189 LEDLİ SENSÖRLÜ TAVAN ARMATÜRÜ",
      "en": "KSA189 LED SENSOR CEILING FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "2200" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Açıklama", "value": "Ledli Kitli" },
        { "label": "IP Sınıfı", "value": "IP20" },
        { "label": "Ölçüler", "value": "Çap: 300 mm, Yükseklik: 75 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "2200" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Description", "value": "LED with Battery" },
        { "label": "IP Rating", "value": "IP20" },
        { "label": "Dimensions", "value": "Diameter: 300 mm, Height: 75 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "12W" }
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
    if (name.includes('KSA190') || name.includes('KSA191') || name.includes('KSA188') || name.includes('KSA189')) {
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
