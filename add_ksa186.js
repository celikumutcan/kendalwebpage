const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

const newProducts = {
  "KSA186": {
    "id": "KSA186",
    "model": "KSA186",
    "image": "urunler/ksa18625we27sn.webp",
    "name": {
      "tr": "KSA186 SENSÖRLÜ TAVAN ARMATÜRÜ",
      "en": "KSA186 SENSOR CEILING FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "2x25W" },
        { "label": "Açıklama", "value": "Saç + Cam" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "IP Sınıfı", "value": "IP20" },
        { "label": "Duy Tipi", "value": "2xE27" },
        { "label": "Ölçüler", "value": "Çap: 300 mm, Yükseklik: 75 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "2x25W" },
        { "label": "Description", "value": "Metal + Glass" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "IP Rating", "value": "IP20" },
        { "label": "Socket Type", "value": "2xE27" },
        { "label": "Dimensions", "value": "Diameter: 300 mm, Height: 75 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "2x25W" }
  },
  "KSA187": {
    "id": "KSA187",
    "model": "KSA187",
    "image": "urunler/ksa187-sensorlu-armatur.webp",
    "name": {
      "tr": "KSA187 SENSÖRLÜ TAVAN ARMATÜRÜ",
      "en": "KSA187 SENSOR CEILING FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "2x25W" },
        { "label": "Açıklama", "value": "Plastik + Plastik" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "IP Sınıfı", "value": "IP20" },
        { "label": "Duy Tipi", "value": "2xE27" },
        { "label": "Ölçüler", "value": "Çap: 300 mm, Yükseklik: 75 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "2x25W" },
        { "label": "Description", "value": "Plastic + Plastic" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "IP Rating", "value": "IP20" },
        { "label": "Socket Type", "value": "2xE27" },
        { "label": "Dimensions", "value": "Diameter: 300 mm, Height: 75 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "2x25W" }
  },
  "KSA192": {
    "id": "KSA192",
    "model": "KSA192",
    "image": "urunler/ksa192.webp",
    "name": {
      "tr": "KSA192 DUVAR SENSÖRLÜ ARMATÜR",
      "en": "KSA192 WALL SENSOR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "15W" },
        { "label": "Açıklama", "value": "Ledli Yuvarlak" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "IP Sınıfı", "value": "IP44" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Ölçüler", "value": "Ø195 mm, Yükseklik: 55 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "15W" },
        { "label": "Description", "value": "LED Round" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "IP Rating", "value": "IP44" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Dimensions", "value": "Ø195 mm, Height: 55 mm" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "15W" }
  },
  "KSA193": {
    "id": "KSA193",
    "model": "KSA193",
    "image": "urunler/ksa193.webp",
    "name": {
      "tr": "KSA193 DUVAR SENSÖRLÜ ARMATÜR",
      "en": "KSA193 WALL SENSOR FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "15W" },
        { "label": "Açıklama", "value": "Ledli Oval" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "IP Sınıfı", "value": "IP44" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Ölçüler", "value": "120 mm x 180 mm, Yükseklik: 55 mm" }
      ],
      "en": [
        { "label": "Watt", "value": "15W" },
        { "label": "Description", "value": "LED Oval" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "IP Rating", "value": "IP44" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Dimensions", "value": "120 mm x 180 mm, Height: 55 mm" }
      ]
    },
    "category": { "tr": ["Sensörlü LED Armatür"], "en": ["Sensor LED Fixture"] },
    "brand": "k2",
    "variantOptions": { "watt": "15W" }
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
    if (name.includes('KSA186') || name.includes('KSA187') || name.includes('KSA192') || name.includes('KSA193')) {
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
