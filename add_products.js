const fs = require('fs');

const productsFile = './src/data/products.json';
const slugMapFile = './src/data/slug-map.json';

const productsData = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
const slugMapData = JSON.parse(fs.readFileSync(slugMapFile, 'utf8'));

// 1. Delete legacy products
const legacyIds = ['7945', '7946', '7947'];
legacyIds.forEach(id => {
  if (productsData[id]) {
    delete productsData[id];
    console.log(`Deleted legacy product: ${id}`);
  }
});

// 2. Add New Products with cleaned attributes
const newProducts = {
  "KLD023": {
    "id": "KLD023",
    "model": "KLD023",
    "image": "urunler/kld023.webp",
    "name": {
      "tr": "KLD023 MİNİ LED DRİVER",
      "en": "KLD023 MINI LED DRIVER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Akım", "value": "1A" },
        { "label": "Giriş Gerilimi", "value": "175-265V 50/60Hz" },
        { "label": "Çıkış Gerilimi", "value": "12V DC" },
        { "label": "Açıklama", "value": "12W 1A" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Özellik", "value": "1, 2 veya 3 Metre Şerit Ledler İçin" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Current", "value": "1A" },
        { "label": "Input Voltage", "value": "175-265V 50/60Hz" },
        { "label": "Output Voltage", "value": "12V DC" },
        { "label": "Description", "value": "12W 1A" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Feature", "value": "For 1, 2 or 3 Meter LED Strips" }
      ]
    },
    "category": { "tr": ["LED Trafo"], "en": ["LED Transformer"] },
    "brand": "k2",
    "variantOptions": { "watt": "12W" }
  },
  "KLD024": {
    "id": "KLD024",
    "model": "KLD024",
    "image": "urunler/kld024.webp",
    "name": {
      "tr": "KLD024 MİNİ LED DRİVER",
      "en": "KLD024 MINI LED DRIVER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Akım", "value": "2A" },
        { "label": "Giriş Gerilimi", "value": "175-265V 50/60Hz" },
        { "label": "Çıkış Gerilimi", "value": "12V DC" },
        { "label": "Açıklama", "value": "24W 2A" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Özellik", "value": "1, 2 veya 3 Metre Şerit Ledler İçin" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Current", "value": "2A" },
        { "label": "Input Voltage", "value": "175-265V 50/60Hz" },
        { "label": "Output Voltage", "value": "12V DC" },
        { "label": "Description", "value": "24W 2A" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Feature", "value": "For 1, 2 or 3 Meter LED Strips" }
      ]
    },
    "category": { "tr": ["LED Trafo"], "en": ["LED Transformer"] },
    "brand": "k2",
    "variantOptions": { "watt": "24W" }
  },
  "KLD025": {
    "id": "KLD025",
    "model": "KLD025",
    "image": "urunler/kld025.webp",
    "name": {
      "tr": "KLD025 MİNİ LED DRİVER",
      "en": "KLD025 MINI LED DRIVER"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W" },
        { "label": "Akım", "value": "3A" },
        { "label": "Giriş Gerilimi", "value": "175-265V 50/60Hz" },
        { "label": "Çıkış Gerilimi", "value": "12V DC" },
        { "label": "Açıklama", "value": "36W 3A" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Özellik", "value": "1, 2 veya 3 Metre Şerit Ledler İçin" }
      ],
      "en": [
        { "label": "Watt", "value": "36W" },
        { "label": "Current", "value": "3A" },
        { "label": "Input Voltage", "value": "175-265V 50/60Hz" },
        { "label": "Output Voltage", "value": "12V DC" },
        { "label": "Description", "value": "36W 3A" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Feature", "value": "For 1, 2 or 3 Meter LED Strips" }
      ]
    },
    "category": { "tr": ["LED Trafo"], "en": ["LED Transformer"] },
    "brand": "k2",
    "variantOptions": { "watt": "36W" }
  }
};

for (const [id, product] of Object.entries(newProducts)) {
  productsData[id] = product;
  console.log(`Added product: ${id}`);
}

for (const [slug, id] of Object.entries(slugMapData)) {
  if (id === '7945') slugMapData[slug] = 'KLD023';
  if (id === '7946') slugMapData[slug] = 'KLD024';
  if (id === '7947') slugMapData[slug] = 'KLD025';
}

fs.writeFileSync(productsFile, JSON.stringify(productsData, null, 2), 'utf8');
fs.writeFileSync(slugMapFile, JSON.stringify(slugMapData, null, 2), 'utf8');

console.log('Finished processing new batch 13.');
