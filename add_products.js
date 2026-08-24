const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'src/data/products.json');
let products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

const updatedItemsRaw = {
  "KLF190": {
    "id": "KLF190",
    "model": "KLF190",
    "image": "urunler/klf190.webp",
    "name": {
      "tr": "KLF190 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF190 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lümen", "value": "900" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Mavi, Sarı, Turuncu, Yeşil" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "14.3 cm x 9 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "10W" },
        { "label": "Lumen", "value": "900" },
        { "label": "Color Options", "value": "White, Blue, Yellow, Orange, Green" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "14.3 cm x 9 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "10W" }
  },
  "KLF191": {
    "id": "KLF191",
    "model": "KLF191",
    "image": "urunler/klf191.webp",
    "name": {
      "tr": "KLF191 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF191 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1700" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Mavi, Sarı, Yeşil, Turuncu" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "17.3 cm x 12.1 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1700" },
        { "label": "Color Options", "value": "White, Blue, Yellow, Green, Orange" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "17.3 cm x 12.1 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W" }
  },
  "KLF192": {
    "id": "KLF192",
    "model": "KLF192",
    "image": "urunler/klf192.webp",
    "name": {
      "tr": "KLF192 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF192 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "30W" },
        { "label": "Lümen", "value": "2550" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Mavi, Sarı, Yeşil, Turuncu" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Ölçüler", "value": "19.5 cm x 14.5 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "30W" },
        { "label": "Lumen", "value": "2550" },
        { "label": "Color Options", "value": "White, Blue, Yellow, Green, Orange" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Dimensions", "value": "19.5 cm x 14.5 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "30W" }
  },
  "KLF193": {
    "id": "KLF193",
    "model": "KLF193",
    "image": "urunler/klf193.webp",
    "name": {
      "tr": "KLF193 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF193 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "50W" },
        { "label": "Lümen", "value": "4000" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Sarı, Yeşil, Turuncu" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Ölçüler", "value": "21.5 cm x 16 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "50W" },
        { "label": "Lumen", "value": "4000" },
        { "label": "Color Options", "value": "White, Yellow, Green, Orange" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Dimensions", "value": "21.5 cm x 16 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "50W" }
  },
  "KLF195": {
    "id": "KLF195",
    "model": "KLF195",
    "image": "urunler/klf195.webp",
    "name": {
      "tr": "KLF195 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF195 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "100W" },
        { "label": "Lümen", "value": "8000" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Sarı, Yeşil" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "10" },
        { "label": "Ölçüler", "value": "27.7 cm x 21 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "100W" },
        { "label": "Lumen", "value": "8000" },
        { "label": "Color Options", "value": "White, Yellow, Green" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "10" },
        { "label": "Dimensions", "value": "27.7 cm x 21 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "100W" }
  },
  "KLF196": {
    "id": "KLF196",
    "model": "KLF196",
    "image": "urunler/klf196.webp",
    "name": {
      "tr": "KLF196 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF196 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "150W" },
        { "label": "Lümen", "value": "12000" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Sarı" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "5" },
        { "label": "Ölçüler", "value": "33.6 cm x 25.5 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "150W" },
        { "label": "Lumen", "value": "12000" },
        { "label": "Color Options", "value": "White, Yellow" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "5" },
        { "label": "Dimensions", "value": "33.6 cm x 25.5 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "150W" }
  },
  "KLF197": {
    "id": "KLF197",
    "model": "KLF197",
    "image": "urunler/klf197.webp",
    "name": {
      "tr": "KLF197 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF197 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "200W" },
        { "label": "Lümen", "value": "16000" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Sarı" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "5" },
        { "label": "Ölçüler", "value": "37.8 cm x 32.2 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "200W" },
        { "label": "Lumen", "value": "16000" },
        { "label": "Color Options", "value": "White, Yellow" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "5" },
        { "label": "Dimensions", "value": "37.8 cm x 32.2 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "200W" }
  },
  "KLF198": {
    "id": "KLF198",
    "model": "KLF198",
    "image": "urunler/klf198.webp",
    "name": {
      "tr": "KLF198 PARİS SMD LEDLİ PROJEKTÖR",
      "en": "KLF198 PARIS SMD LED PROJECTOR"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "300W" },
        { "label": "Lümen", "value": "24000" },
        { "label": "Renk Seçenekleri", "value": "Beyaz, Sarı" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "5" },
        { "label": "Ölçüler", "value": "41.8 cm x 37.8 cm" },
        { "label": "IP Koruma", "value": "IP65" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "300W" },
        { "label": "Lumen", "value": "24000" },
        { "label": "Color Options", "value": "White, Yellow" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "5" },
        { "label": "Dimensions", "value": "41.8 cm x 37.8 cm" },
        { "label": "IP Rating", "value": "IP65" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["Projektör"], "en": ["Projektör"] },
    "brand": "k2",
    "variantOptions": { "watt": "300W" }
  }
};

for (const [id, item] of Object.entries(updatedItemsRaw)) {
  ['tr', 'en'].forEach(lang => {
    let renkValue = null;
    let newAttrs = [];
    for (const attr of item.attributes[lang]) {
      if (attr.label === 'Renk Seçenekleri' || attr.label === 'Color Options') {
        renkValue = attr.value;
      } else if (attr.label === 'Ekstra Özellik' || attr.label === 'Extra Feature') {
        newAttrs.push({
          label: lang === 'tr' ? 'Özellik' : 'Feature',
          value: attr.value
        });
      } else {
        newAttrs.push(attr);
      }
    }
    item.attributes[lang] = newAttrs;
    if (renkValue && lang === 'tr') {
      item.variantOptions.light = renkValue;
    }
  });
  products[id] = item;
}

fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
console.log('KLF190 series updated successfully.');
