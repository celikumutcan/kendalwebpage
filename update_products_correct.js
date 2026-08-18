const fs = require('fs');

const userProducts = {
  "KDL404": {
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "3W" },
        { "label": "Lümen", "value": "180" },
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
        { "label": "Lumen", "value": "180" },
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
    }
  },
  "KDL400": {
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
    }
  },
  "KDL405": {
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "9W" },
        { "label": "Lümen", "value": "630" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "60" },
        { "label": "Ölçüler", "value": "İç Çap: 12 cm, Dış Çap: 14,5 cm" },
        { "label": "Kasa", "value": "Alüminyum Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "PS LGP 3 mm" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "9W" },
        { "label": "Lumen", "value": "630" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "60" },
        { "label": "Dimensions", "value": "Inner Diameter: 12 cm, Outer Diameter: 14.5 cm" },
        { "label": "Body", "value": "Aluminum Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "PS LGP 3 mm" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    }
  },
  "KDL401": {
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
    }
  },
  "KDL402": {
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
    }
  },
  "KDL403": {
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
    }
  },
  "KDL407": {
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
    }
  }
};

const srcDataPath = 'c:/Users/umutcan.celik/Documents/GitHub/kendalwebpage/src/data/products.json';
const p = require(srcDataPath);

let updated = 0;

// Remove the wrongly added keys (the base models I just added if they exist as keys)
const keysToRemove = Object.keys(userProducts);
for (const key of keysToRemove) {
    if (p[key] && p[key].id === key) {
        console.log("Removing accidentally added base product:", key);
        delete p[key];
    }
}

// Update attributes of matching variant products
for (const key of Object.keys(p)) {
  const model = p[key].model;
  if (!model) continue;
  
  // Find if this model starts with any of our userProducts keys (e.g. KDL404)
  const matchingBase = Object.keys(userProducts).find(base => model.startsWith(base));
  
  if (matchingBase) {
    const newAttrs = userProducts[matchingBase].attributes;
    
    // check if different
    if (JSON.stringify(p[key].attributes) !== JSON.stringify(newAttrs)) {
        p[key].attributes = newAttrs;
        updated++;
        console.log(`Updated attributes for ${key} (${model}) from base ${matchingBase}`);
    }
  }
}

console.log("Total updated:", updated);
fs.writeFileSync(srcDataPath, JSON.stringify(p, null, 2));
