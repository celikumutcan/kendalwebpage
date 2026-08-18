const fs = require('fs');

const userProducts = {
  "KDL404S": {
    "id": "KDL404S",
    "model": "KDL404S",
    "image": "urunler/kdl404s.webp",
    "name": {
      "tr": "KDL404S SIVA ALTI SATEN KASA SLİM LED PANEL",
      "en": "KDL404S RECESSED SATIN BODY SLIM LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "3W" },
        { "label": "Lümen", "value": "255" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "İç Çap: 6,5 cm, Dış Çap: 8 cm" },
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
        { "label": "Dimensions", "value": "Inner Diameter: 6.5 cm, Outer Diameter: 8 cm" },
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
  "KDL400S": {
    "id": "KDL400S",
    "model": "KDL400S",
    "image": "urunler/kdl400s.webp",
    "name": {
      "tr": "KDL400S SIVA ALTI SATEN KASA SLİM LED PANEL",
      "en": "KDL400S RECESSED SATIN BODY SLIM LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "510" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "İç Çap: 10,5 cm, Dış Çap: 12 cm" },
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
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "Inner Diameter: 10.5 cm, Outer Diameter: 12 cm" },
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
  "KDL401S": {
    "id": "KDL401S",
    "model": "KDL401S",
    "image": "urunler/kdl401s.webp",
    "name": {
      "tr": "KDL401S SIVA ALTI SATEN KASA SLİM LED PANEL",
      "en": "KDL401S RECESSED SATIN BODY SLIM LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "900" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "İç Çap: 15,2 cm, Dış Çap: 17 cm" },
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
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Inner Diameter: 15.2 cm, Outer Diameter: 17 cm" },
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
  "KDL402S": {
    "id": "KDL402S",
    "model": "KDL402S",
    "image": "urunler/kdl402s.webp",
    "name": {
      "tr": "KDL402S SIVA ALTI SATEN KASA SLİM LED PANEL",
      "en": "KDL402S RECESSED SATIN BODY SLIM LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "15W" },
        { "label": "Lümen", "value": "1200" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "İç Çap: 17 cm, Dış Çap: 19 cm" },
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
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Inner Diameter: 17 cm, Outer Diameter: 19 cm" },
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
  "KDL403S": {
    "id": "KDL403S",
    "model": "KDL403S",
    "image": "urunler/kdl403s.webp",
    "name": {
      "tr": "KDL403S SIVA ALTI SATEN KASA SLİM LED PANEL",
      "en": "KDL403S RECESSED SATIN BODY SLIM LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1440" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "30" },
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
        { "label": "Package Quantity", "value": "30" },
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
  }
};

const slugify = (text) => text.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ğ/g, 'g').replace(/ç/g, 'c').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const pPath = './src/data/products.json';
const sPath = './src/data/slug-map.json';
const p = require(pPath);
const s = require(sPath);

for (const key in userProducts) {
  const prod = userProducts[key];

  // Fix "Ekstra Özellik" to "Özellik"
  prod.attributes.tr.forEach(attr => {
    if (attr.label === "Ekstra Özellik") attr.label = "Özellik";
  });
  prod.attributes.en.forEach(attr => {
    if (attr.label === "Extra Feature") attr.label = "Feature";
  });

  // Remove "Renk Sıcaklığı" / "Color Temperature" from attributes
  prod.attributes.tr = prod.attributes.tr.filter(a => a.label !== "Renk Sıcaklığı");
  prod.attributes.en = prod.attributes.en.filter(a => a.label !== "Color Temperature");

  // Format light options nicely exactly as requested previously
  prod.variantOptions.light = "Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)";

  // Add to products
  p[key] = prod;

  // Generate main slug
  const slug = slugify(prod.name.tr);
  s[slug] = key;
  
  // Also add legacy redirects for saten
  const modLower = prod.id.toLowerCase();
  const wattVal = prod.variantOptions.watt.toLowerCase();
  
  const baseSatenSlug = modLower + "-slim-led-panel-" + wattVal + "-saten";
  
  s[baseSatenSlug] = key;
  s[baseSatenSlug + "*ararenk"] = key;
  s[baseSatenSlug + "*beyaz"] = key;
  s[baseSatenSlug + "*gün-işiği"] = key;
  s[baseSatenSlug + "*gun-isigi"] = key;
}

fs.writeFileSync(pPath, JSON.stringify(p, null, 2));
fs.writeFileSync(sPath, JSON.stringify(s, null, 2));
console.log('Added 5 new SATEN products and their legacy redirects!');
