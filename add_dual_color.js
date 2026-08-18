const fs = require('fs');

const userProducts = {
  "KDL440": {
    "id": "KDL440",
    "model": "KDL440",
    "image": "urunler/kdl440.webp",
    "name": {
      "tr": "KDL440 SIVA ALTI ÇİFT RENKLİ 3 FONKSİYONLU LED PANEL",
      "en": "KDL440 RECESSED DUAL COLOR 3 FUNCTION LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "4W+3W" },
        { "label": "Lümen", "value": "580" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "İç Çap: 7 cm, Dış Çap: 10,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik 1", "value": "PS LGP 3 mm" },
        { "label": "Özellik 2", "value": "Çift Renkli 3 Fonksiyonlu" },
        { "label": "Özellik 3", "value": "Gece Modunda Mavi Yanar" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "4W+3W" },
        { "label": "Lumen", "value": "580" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "50" },
        { "label": "Dimensions", "value": "Inner Diameter: 7 cm, Outer Diameter: 10.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature 1", "value": "PS LGP 3 mm" },
        { "label": "Feature 2", "value": "Dual Color 3 Functions" },
        { "label": "Feature 3", "value": "Lights Blue in Night Mode" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "4W+3W" }
  },
  "KDL441": {
    "id": "KDL441",
    "model": "KDL441",
    "image": "urunler/kdl441.webp",
    "name": {
      "tr": "KDL441 SIVA ALTI ÇİFT RENKLİ 3 FONKSİYONLU LED PANEL",
      "en": "KDL441 RECESSED DUAL COLOR 3 FUNCTION LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W+4W" },
        { "label": "Lümen", "value": "850" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "30" },
        { "label": "Ölçüler", "value": "İç Çap: 10,5 cm, Dış Çap: 14,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik 1", "value": "PS LGP 3 mm" },
        { "label": "Özellik 2", "value": "Çift Renkli 3 Fonksiyonlu" },
        { "label": "Özellik 3", "value": "Gece Modunda Mavi Yanar" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "6W+4W" },
        { "label": "Lumen", "value": "850" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "30" },
        { "label": "Dimensions", "value": "Inner Diameter: 10.5 cm, Outer Diameter: 14.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature 1", "value": "PS LGP 3 mm" },
        { "label": "Feature 2", "value": "Dual Color 3 Functions" },
        { "label": "Feature 3", "value": "Lights Blue in Night Mode" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "6W+4W" }
  },
  "KDL442": {
    "id": "KDL442",
    "model": "KDL442",
    "image": "urunler/kdl442.webp",
    "name": {
      "tr": "KDL442 SIVA ALTI ÇİFT RENKLİ 3 FONKSİYONLU LED PANEL",
      "en": "KDL442 RECESSED DUAL COLOR 3 FUNCTION LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W+6W" },
        { "label": "Lümen", "value": "1300" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "İç Çap: 15 cm, Dış Çap: 19 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik 1", "value": "PS LGP 3 mm" },
        { "label": "Özellik 2", "value": "Çift Renkli 3 Fonksiyonlu" },
        { "label": "Özellik 3", "value": "Gece Modunda Mavi Yanar" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W+6W" },
        { "label": "Lumen", "value": "1300" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Inner Diameter: 15 cm, Outer Diameter: 19 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature 1", "value": "PS LGP 3 mm" },
        { "label": "Feature 2", "value": "Dual Color 3 Functions" },
        { "label": "Feature 3", "value": "Lights Blue in Night Mode" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "12W+6W" }
  },
  "KDL443": {
    "id": "KDL443",
    "model": "KDL443",
    "image": "urunler/kdl443.webp",
    "name": {
      "tr": "KDL443 SIVA ALTI ÇİFT RENKLİ 3 FONKSİYONLU LED PANEL",
      "en": "KDL443 RECESSED DUAL COLOR 3 FUNCTION LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W+6W" },
        { "label": "Lümen", "value": "2020" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "İç Çap: 20 cm, Dış Çap: 24,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik 1", "value": "PS LGP 3 mm" },
        { "label": "Özellik 2", "value": "Çift Renkli 3 Fonksiyonlu" },
        { "label": "Özellik 3", "value": "Gece Modunda Mavi Yanar" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W+6W" },
        { "label": "Lumen", "value": "2020" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Inner Diameter: 20 cm, Outer Diameter: 24.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature 1", "value": "PS LGP 3 mm" },
        { "label": "Feature 2", "value": "Dual Color 3 Functions" },
        { "label": "Feature 3", "value": "Lights Blue in Night Mode" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W+6W" }
  },
  "KDL444": {
    "id": "KDL444",
    "model": "KDL444",
    "image": "urunler/kdl444.webp",
    "name": {
      "tr": "KDL444 SIVA ÜSTÜ ÇİFT RENKLİ 3 FONKSİYONLU LED PANEL",
      "en": "KDL444 SURFACE MOUNTED DUAL COLOR 3 FUNCTION LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W+4W" },
        { "label": "Lümen", "value": "1800" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "Dış Çap: 19 cm, Kalınlık: 3,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik 1", "value": "PS LGP 3 mm" },
        { "label": "Özellik 2", "value": "Çift Renkli 3 Fonksiyonlu" },
        { "label": "Özellik 3", "value": "Gece Modunda Mavi Yanar" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W+4W" },
        { "label": "Lumen", "value": "1800" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Outer Diameter: 19 cm, Thickness: 3.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature 1", "value": "PS LGP 3 mm" },
        { "label": "Feature 2", "value": "Dual Color 3 Functions" },
        { "label": "Feature 3", "value": "Lights Blue in Night Mode" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "12W+4W" }
  },
  "KDL445": {
    "id": "KDL445",
    "model": "KDL445",
    "image": "urunler/kdl445.webp",
    "name": {
      "tr": "KDL445 SIVA ÜSTÜ ÇİFT RENKLİ 3 FONKSİYONLU LED PANEL",
      "en": "KDL445 SURFACE MOUNTED DUAL COLOR 3 FUNCTION LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W+6W" },
        { "label": "Lümen", "value": "2200" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "Dış Çap: 24 cm, Kalınlık: 3,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik 1", "value": "PS LGP 3 mm" },
        { "label": "Özellik 2", "value": "Çift Renkli 3 Fonksiyonlu" },
        { "label": "Özellik 3", "value": "Gece Modunda Mavi Yanar" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W+6W" },
        { "label": "Lumen", "value": "2200" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Outer Diameter: 24 cm, Thickness: 3.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature 1", "value": "PS LGP 3 mm" },
        { "label": "Feature 2", "value": "Dual Color 3 Functions" },
        { "label": "Feature 3", "value": "Lights Blue in Night Mode" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "18W+6W" }
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
console.log('Added 6 Dual Color Panel products! Deleted ' + deletedCount + ' old products. Remapped ' + remappedCount + ' old slugs.');
