const fs = require('fs');

const userProducts = {
  "KDL410": {
    "id": "KDL410",
    "model": "KDL410",
    "image": "urunler/kdl410.webp",
    "name": {
      "tr": "KDL410 SLİM KARE LED PANEL",
      "en": "KDL410 SLIM SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "3W" },
        { "label": "Lümen", "value": "255" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "İç Çap: 7 cm, Dış Çap: 8,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "3W" },
        { "label": "Lumen", "value": "255" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "Inner Diameter: 7 cm, Outer Diameter: 8.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Panel"],
      "en": ["LED Panel"]
    },
    "brand": "k2",
    "variantOptions": { "watt": "3W" }
  },
  "KDL411": {
    "id": "KDL411",
    "model": "KDL411",
    "image": "urunler/kdl411.webp",
    "name": {
      "tr": "KDL411 SLİM KARE LED PANEL",
      "en": "KDL411 SLIM SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "510" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "İç Çap: 10,2 cm, Dış Çap: 12 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
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
        { "label": "Dimensions", "value": "Inner Diameter: 10.2 cm, Outer Diameter: 12 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Panel"],
      "en": ["LED Panel"]
    },
    "brand": "k2",
    "variantOptions": { "watt": "6W" }
  },
  "KDL412": {
    "id": "KDL412",
    "model": "KDL412",
    "image": "urunler/kdl412.webp",
    "name": {
      "tr": "KDL412 SLİM KARE LED PANEL",
      "en": "KDL412 SLIM SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "900" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "İç Çap: 15 cm, Dış Çap: 17 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "900" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Inner Diameter: 15 cm, Outer Diameter: 17 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Panel"],
      "en": ["LED Panel"]
    },
    "brand": "k2",
    "variantOptions": { "watt": "12W" }
  },
  "KDL413": {
    "id": "KDL413",
    "model": "KDL413",
    "image": "urunler/kdl413.webp",
    "name": {
      "tr": "KDL413 SLİM KARE LED PANEL",
      "en": "KDL413 SLIM SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "15W" },
        { "label": "Lümen", "value": "1200" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "İç Çap: 17,5 cm, Dış Çap: 19,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "15W" },
        { "label": "Lumen", "value": "1200" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Inner Diameter: 17.5 cm, Outer Diameter: 19.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Panel"],
      "en": ["LED Panel"]
    },
    "brand": "k2",
    "variantOptions": { "watt": "15W" }
  },
  "KDL409": {
    "id": "KDL409",
    "model": "KDL409",
    "image": "urunler/kdl409.webp",
    "name": {
      "tr": "KDL409 SLİM KARE LED PANEL",
      "en": "KDL409 SLIM SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1440" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "İç Çap: 20 cm, Dış Çap: 22 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lumen", "value": "1440" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Inner Diameter: 20 cm, Outer Diameter: 22 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Panel"],
      "en": ["LED Panel"]
    },
    "brand": "k2",
    "variantOptions": { "watt": "18W" }
  },
  "KDL424": {
    "id": "KDL424",
    "model": "KDL424",
    "image": "urunler/kdl424.webp",
    "name": {
      "tr": "KDL424 SLİM KARE LED PANEL",
      "en": "KDL424 SLIM SQUARE LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1920" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "İç Çap: 27,5 cm, Dış Çap: 29,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lumen", "value": "1920" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Inner Diameter: 27.5 cm, Outer Diameter: 29.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": ["LED Panel"],
      "en": ["LED Panel"]
    },
    "brand": "k2",
    "variantOptions": { "watt": "24W" }
  }
};

const slugify = (text) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const pPath = './src/data/products.json';
const sPath = './src/data/slug-map.json';
const p = require(pPath);
const s = require(sPath);

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
  
  // Proactively add legacy aliases for KDL410 series (kdl410-slim-kare-led-panel-3w*ararenk)
  const wattStr = prod.variantOptions.watt.toLowerCase();
  const baseLegacy = slug + "-" + wattStr;
  
  s[baseLegacy] = key;
  s[baseLegacy + "*ararenk"] = key;
  s[baseLegacy + "*beyaz"] = key;
  s[baseLegacy + "*gün-işiği"] = key;
  s[baseLegacy + "*gun-isigi"] = key;
  s[baseLegacy + "*günışığı"] = key;
}

fs.writeFileSync(pPath, JSON.stringify(p, null, 2));
fs.writeFileSync(sPath, JSON.stringify(s, null, 2));
console.log('Added 6 Square Panel products and legacy redirects!');
