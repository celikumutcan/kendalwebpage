const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'src/data/products.json');
const slugMapFile = path.join(__dirname, 'src/data/slug-map.json');

let products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));
let slugMap = JSON.parse(fs.readFileSync(slugMapFile, 'utf8'));

// Delete legacy items
const ghosts = [
  { "id": "5918", "canonical": "KBA747" },
  { "id": "5919", "canonical": "KBA747" },
  { "id": "5920", "canonical": "KBA747" },
  { "id": "5921", "canonical": "KBA747" }
];

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

// Add new items
const newItems = {
  "KBA747": {
    "id": "KBA747",
    "model": "KBA747",
    "image": "urunler/kba747.webp",
    "name": {
      "tr": "KBA747 KAZIKLI ÇİM ARMATÜRÜ",
      "en": "KBA747 SPIKE GRASS FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "7W" },
        { "label": "Lümen", "value": "700" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "7W" },
        { "label": "Lumen", "value": "700" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Aplik"],
      "en": ["LED Aplik"]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "7W",
      "light": "Turuncu, Sarı, Yeşil, Mavi"
    }
  },
  "KBA791": {
    "id": "KBA791",
    "model": "KBA791",
    "image": "urunler/kba791.webp",
    "name": {
      "tr": "KBA791 SET ÜSTÜ ARMATÜR",
      "en": "KBA791 BOLLARD FIXTURE"
    },
    "attributes": {
      "tr": [
        { "label": "Duy Tipi", "value": "E27" },
        { "label": "Koli Adedi", "value": "12" },
        { "label": "Ölçüler", "value": "210 mm x 240 mm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Socket Type", "value": "E27" },
        { "label": "Package Quantity", "value": "12" },
        { "label": "Dimensions", "value": "210 mm x 240 mm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Aplik"],
      "en": ["LED Aplik"]
    },
    "brand": "k2",
    "variantOptions": {}
  }
};

Object.assign(products, newItems);

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
fs.writeFileSync(slugMapFile, JSON.stringify(slugMap, null, 2), 'utf8');

console.log("Done");
