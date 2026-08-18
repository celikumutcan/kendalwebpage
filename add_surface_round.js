const fs = require('fs');

const userProducts = {
  "KDL420": {
    "id": "KDL420",
    "model": "KDL420",
    "image": "urunler/kdl420.webp",
    "name": {
      "tr": "KDL420 SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL420 SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "510" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "Çap: 12 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Dimensions", "value": "Diameter: 12 cm, Thickness: 2.5 cm" },
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
  "KDL421": {
    "id": "KDL421",
    "model": "KDL421",
    "image": "urunler/kdl421.webp",
    "name": {
      "tr": "KDL421 SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL421 SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "840" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "Çap: 18 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Dimensions", "value": "Diameter: 18 cm, Thickness: 2.5 cm" },
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
  "KDL422": {
    "id": "KDL422",
    "model": "KDL422",
    "image": "urunler/kdl422.webp",
    "name": {
      "tr": "KDL422 SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL422 SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1350" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Çap: 22,5 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Diameter: 22.5 cm, Thickness: 2.5 cm" },
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
  "KDL423": {
    "id": "KDL423",
    "model": "KDL423",
    "image": "urunler/kdl423.webp",
    "name": {
      "tr": "KDL423 SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL423 SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1450" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "Çap: 30 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Dimensions", "value": "Diameter: 30 cm, Thickness: 2.5 cm" },
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
  "KDL420B": {
    "id": "KDL420B",
    "model": "KDL420B",
    "image": "urunler/kdl420b.webp",
    "name": {
      "tr": "KDL420B SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL420B SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "510" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "50" },
        { "label": "Ölçüler", "value": "Çap: 12 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Dimensions", "value": "Diameter: 12 cm, Thickness: 2.5 cm" },
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
  "KDL421B": {
    "id": "KDL421B",
    "model": "KDL421B",
    "image": "urunler/kdl421b.webp",
    "name": {
      "tr": "KDL421B SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL421B SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "840" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "Çap: 18 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Dimensions", "value": "Diameter: 18 cm, Thickness: 2.5 cm" },
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
  "KDL422B": {
    "id": "KDL422B",
    "model": "KDL422B",
    "image": "urunler/kdl422b.webp",
    "name": {
      "tr": "KDL422B SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL422B SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "18W" },
        { "label": "Lümen", "value": "1350" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Çap: 22,5 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Diameter: 22.5 cm, Thickness: 2.5 cm" },
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
  "KDL423B": {
    "id": "KDL423B",
    "model": "KDL423B",
    "image": "urunler/kdl423b.webp",
    "name": {
      "tr": "KDL423B SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL423B SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "1450" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "Çap: 30 cm, Kalınlık: 2,5 cm" },
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
        { "label": "Dimensions", "value": "Diameter: 30 cm, Thickness: 2.5 cm" },
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
  },
  "KDL550": {
    "id": "KDL550",
    "model": "KDL550",
    "image": "urunler/kdl550.webp",
    "name": {
      "tr": "KDL550 SIVA ÜSTÜ YUVARLAK LED PANEL",
      "en": "KDL550 SURFACE MOUNTED ROUND LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "2100" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "20" },
        { "label": "Ölçüler", "value": "Çap: 22 cm" },
        { "label": "Açıklama", "value": "Sensörlü" },
        { "label": "Çalışma Modu", "value": "Gündüz ve Gece Modu" },
        { "label": "Kasa Malzemesi", "value": "Plastik Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "2100" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "20" },
        { "label": "Dimensions", "value": "Diameter: 22 cm" },
        { "label": "Description", "value": "With Sensor" },
        { "label": "Operating Mode", "value": "Day and Night Mode" },
        { "label": "Body Material", "value": "Plastic Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "20W" }
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
  
  // E.g. find KDL420B among targets
  // Check exact prefix so KDL420 doesn't match KDL420B
  const matchedTarget = targets.find(t => {
      // It must start with the target, and either be exact or followed by something that isn't a letter
      // Actually, since KDL420 and KDL420B are both in targets, we should sort targets by length descending
      return prod.model.toUpperCase().startsWith(t);
  });
  
  // Better matching: sort targets by length so KDL420B matches before KDL420
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
console.log('Added 9 Surface Round Panel products! Deleted ' + deletedCount + ' old products. Remapped ' + remappedCount + ' old slugs.');
