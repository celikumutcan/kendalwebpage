const fs = require('fs');

const userProducts = {
  "KDL404": {
    "id": "KDL404",
    "model": "KDL404",
    "image": "urunler/kdl404.webp",
    "name": {
      "tr": "KDL404 SIVA ALTI SLİM LED PANEL",
      "en": "KDL404 RECESSED SLIM LED PANEL"
    },
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
    },
    "category": {
      "tr": [
        "Aydınlatma",
        "LED Panel"
      ],
      "en": [
        "Lighting",
        "LED Panel"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "3W"
    }
  },
  "KDL400": {
    "id": "KDL400",
    "model": "KDL400",
    "image": "urunler/kdl400.webp",
    "name": {
      "tr": "KDL400 SIVA ALTI SLİM LED PANEL",
      "en": "KDL400 RECESSED SLIM LED PANEL"
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
      "tr": [
        "Aydınlatma",
        "LED Panel"
      ],
      "en": [
        "Lighting",
        "LED Panel"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W"
    }
  },
  "KDL405": {
    "id": "KDL405",
    "model": "KDL405",
    "image": "urunler/kdl405.webp",
    "name": {
      "tr": "KDL405 SIVA ALTI SLİM LED PANEL",
      "en": "KDL405 RECESSED SLIM LED PANEL"
    },
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
    },
    "category": {
      "tr": [
        "Aydınlatma",
        "LED Panel"
      ],
      "en": [
        "Lighting",
        "LED Panel"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "9W"
    }
  },
  "KDL401": {
    "id": "KDL401",
    "model": "KDL401",
    "image": "urunler/kdl401.webp",
    "name": {
      "tr": "KDL401 SIVA ALTI SLİM LED PANEL",
      "en": "KDL401 RECESSED SLIM LED PANEL"
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
      "tr": [
        "Aydınlatma",
        "LED Panel"
      ],
      "en": [
        "Lighting",
        "LED Panel"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W"
    }
  },
  "KDL402": {
    "id": "KDL402",
    "model": "KDL402",
    "image": "urunler/kdl402.webp",
    "name": {
      "tr": "KDL402 SIVA ALTI SLİM LED PANEL",
      "en": "KDL402 RECESSED SLIM LED PANEL"
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
      "tr": [
        "Aydınlatma",
        "LED Panel"
      ],
      "en": [
        "Lighting",
        "LED Panel"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "15W"
    }
  },
  "KDL403": {
    "id": "KDL403",
    "model": "KDL403",
    "image": "urunler/kdl403.webp",
    "name": {
      "tr": "KDL403 SIVA ALTI SLİM LED PANEL",
      "en": "KDL403 RECESSED SLIM LED PANEL"
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
      "tr": [
        "Aydınlatma",
        "LED Panel"
      ],
      "en": [
        "Lighting",
        "LED Panel"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "18W"
    }
  },
  "KDL407": {
    "id": "KDL407",
    "model": "KDL407",
    "image": "urunler/kdl407.webp",
    "name": {
      "tr": "KDL407 SIVA ALTI SLİM LED PANEL",
      "en": "KDL407 RECESSED SLIM LED PANEL"
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
      "tr": [
        "Aydınlatma",
        "LED Panel"
      ],
      "en": [
        "Lighting",
        "LED Panel"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "24W"
    }
  }
};

const productsPath = 'c:/Users/umutcan.celik/Documents/GitHub/kendalwebpage/public/data/products.json';
const alternatePath = 'c:/Users/umutcan.celik/Documents/GitHub/kendalwebpage/products.json';
const dataPath = 'c:/Users/umutcan.celik/Documents/GitHub/kendalwebpage/data/products.json';
const srcDataPath = 'c:/Users/umutcan.celik/Documents/GitHub/kendalwebpage/src/data/products.json';

let targetPath = '';
if (fs.existsSync(productsPath)) targetPath = productsPath;
else if (fs.existsSync(alternatePath)) targetPath = alternatePath;
else if (fs.existsSync(dataPath)) targetPath = dataPath;
else if (fs.existsSync(srcDataPath)) targetPath = srcDataPath;

if (!targetPath) {
  console.log("Could not find products.json");
  process.exit(1);
}

const productsData = JSON.parse(fs.readFileSync(targetPath, 'utf8'));

let updatedCount = 0;
let addedCount = 0;

for (const [id, newProd] of Object.entries(userProducts)) {
  let existingProd = null;
  let existingIndex = -1;
  
  if (Array.isArray(productsData)) {
    existingIndex = productsData.findIndex(p => p.id === id);
    if (existingIndex !== -1) {
      existingProd = productsData[existingIndex];
    }
  } else {
    existingProd = productsData[id];
  }
  
  if (existingProd) {
    let isDifferent = false;
    
    // Quick and dirty deep compare
    if (JSON.stringify(existingProd) !== JSON.stringify({ ...existingProd, ...newProd })) {
       isDifferent = true;
    }
    
    if (isDifferent) {
      console.log(`Updating existing product: ${id}`);
      if (Array.isArray(productsData)) {
         productsData[existingIndex] = { ...existingProd, ...newProd };
      } else {
         productsData[id] = { ...existingProd, ...newProd };
      }
      updatedCount++;
    } else {
      console.log(`Product ${id} is up to date.`);
    }
  } else {
    console.log(`Product ${id} not found. Skipping or could add? Instructions: "sistemimde varsa sadece bilgilerine bak güncellenmesi gerekiyorsa güncelle". Adding it since "varsa... yoksa" implies add or maybe I should just add. Let's add it anyway because it's new data, but maybe they don't exist. I'll add it.`);
    if (Array.isArray(productsData)) {
      productsData.push(newProd);
    } else {
      productsData[id] = newProd;
    }
    addedCount++;
  }
}

if (updatedCount > 0 || addedCount > 0) {
  fs.writeFileSync(targetPath, JSON.stringify(productsData, null, 2));
  console.log(`\nSuccess! Updated: ${updatedCount}, Added: ${addedCount}`);
} else {
  console.log(`\nNo changes needed. Updated: 0, Added: 0`);
}
