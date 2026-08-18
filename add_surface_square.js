const fs = require('fs');

const userProducts = {
  "KDL430": {
    "id": "KDL430",
    "model": "KDL430",
    "image": "urunler/kdl430.webp",
    "name": {
      "tr": "KDL430 SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL430 SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "510" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "12x12 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Beyaz Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "510" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "12x12 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "White Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "6W" }
  },
  "KDL431": {
    "id": "KDL431",
    "model": "KDL431",
    "image": "urunler/kdl431.webp",
    "name": {
      "tr": "KDL431 SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL431 SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "840" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "16x16 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Beyaz Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "840" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "16x16 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "White Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "12W" }
  },
  "KDL432": {
    "id": "KDL432",
    "model": "KDL432",
    "image": "urunler/kdl432.webp",
    "name": {
      "tr": "KDL432 SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL432 SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1350" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "21x21 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Beyaz Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "1350" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "21x21 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "White Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KDL433": {
    "id": "KDL433",
    "model": "KDL433",
    "image": "urunler/kdl433.webp",
    "name": {
      "tr": "KDL433 SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL433 SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1450" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "30x30 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Beyaz Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lumen", "value": "1450" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "30x30 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "White Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "24W" }
  },
  "KDL430B": {
    "id": "KDL430B",
    "model": "KDL430B",
    "image": "urunler/kdl430b.webp",
    "name": {
      "tr": "KDL430B SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL430B SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "510" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "12x12 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Siyah Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "510" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "12x12 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "Black Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "6W" }
  },
  "KDL431B": {
    "id": "KDL431B",
    "model": "KDL431B",
    "image": "urunler/kdl431b.webp",
    "name": {
      "tr": "KDL431B SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL431B SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "840" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "16x16 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Siyah Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "840" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "16x16 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "Black Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "12W" }
  },
  "KDL432B": {
    "id": "KDL432B",
    "model": "KDL432B",
    "image": "urunler/kdl432b.webp",
    "name": {
      "tr": "KDL432B SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL432B SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1350" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "21x21 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Siyah Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "1350" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "21x21 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "Black Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KDL433B": {
    "id": "KDL433B",
    "model": "KDL433B",
    "image": "urunler/kdl433b.webp",
    "name": {
      "tr": "KDL433B SIVA ÜSTÜ KARE LED PANEL",
      "en": "KDL433B SURFACE MOUNTED SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1450" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "30x30 cm, Kalınlık: 2,5 cm" },
        { "label": "Kasa Rengi", "value": "Siyah Kasa" },
        { "label": "Kasa Malzemesi", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lumen", "value": "1450" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "30x30 cm, Thickness: 2.5 cm" },
        { "label": "Body Color", "value": "Black Body" },
        { "label": "Body Material", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "24W" }
  }
};

const slugify = (text) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const pPath = './src/data/products.json';
const sPath = './src/data/slug-map.json';
const p = require(pPath);
const s = require(sPath);

let deletedCount = 0;
let remappedCount = 0;

for (const key in userProducts) {
  const prod = userProducts[key];

  // Clean attributes
  prod.attributes.tr.forEach(attr => { if (attr.label === "Ekstra Özellik") attr.label = "Özellik"; });
  prod.attributes.en.forEach(attr => { if (attr.label === "Extra Feature") attr.label = "Feature"; });

  prod.attributes.tr = prod.attributes.tr.filter(a => a.label !== "Renk Sıcaklığı");
  prod.attributes.en = prod.attributes.en.filter(a => a.label !== "Color Temperature");

  prod.variantOptions.light = "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)";

  p[key] = prod;

  // Generate main slug
  const slug = slugify(prod.name.tr);
  s[slug] = key;
}

// Cleanup old duplicates and remap
const targets = Object.keys(userProducts);
Object.keys(p).forEach(key => {
  const prod = p[key];
  if (!prod || !prod.model) return;
  
  const sortedTargets = [...targets].sort((a,b) => b.length - a.length);
  const bestTarget = sortedTargets.find(t => prod.model.toUpperCase().startsWith(t));

  if (bestTarget && key !== bestTarget) {
    console.log('Deleting duplicate old product: ' + key + ' (' + prod.model + ') -> mapping to ' + bestTarget);
    Object.keys(s).forEach(slug => {
      if (s[slug] === key) {
        s[slug] = bestTarget;
        remappedCount++;
      }
    });
    delete p[key];
    deletedCount++;
  }
});

fs.writeFileSync(pPath, JSON.stringify(p, null, 2));
fs.writeFileSync(sPath, JSON.stringify(s, null, 2));
console.log('Added 8 Surface Square Panel products! Deleted ' + deletedCount + ' old products. Remapped ' + remappedCount + ' old slugs.');
