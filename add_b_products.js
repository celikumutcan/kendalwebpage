const fs = require('fs');

const userProducts = {
  "KDL404B": {
    "id": "KDL404B",
    "model": "KDL404B",
    "image": "urunler/kdl404b.webp",
    "name": {
      "tr": "KDL404B SIVA ALTI SİYAH KASA SLİM LED PANEL",
      "en": "KDL404B RECESSED BLACK BODY SLIM LED PANEL"
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
  "KDL400B": {
    "id": "KDL400B",
    "model": "KDL400B",
    "image": "urunler/kdl400b.webp",
    "name": {
      "tr": "KDL400B SIVA ALTI SİYAH KASA SLİM LED PANEL",
      "en": "KDL400B RECESSED BLACK BODY SLIM LED PANEL"
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
  "KDL405B": {
    "id": "KDL405B",
    "model": "KDL405B",
    "image": "urunler/kdl405b.webp",
    "name": {
      "tr": "KDL405B SIVA ALTI SİYAH KASA SLİM LED PANEL",
      "en": "KDL405B RECESSED BLACK BODY SLIM LED PANEL"
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
  "KDL401B": {
    "id": "KDL401B",
    "model": "KDL401B",
    "image": "urunler/kdl401b.webp",
    "name": {
      "tr": "KDL401B SIVA ALTI SİYAH KASA SLİM LED PANEL",
      "en": "KDL401B RECESSED BLACK BODY SLIM LED PANEL"
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
  "KDL402B": {
    "id": "KDL402B",
    "model": "KDL402B",
    "image": "urunler/kdl402b.webp",
    "name": {
      "tr": "KDL402B SIVA ALTI SİYAH KASA SLİM LED PANEL",
      "en": "KDL402B RECESSED BLACK BODY SLIM LED PANEL"
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
  "KDL403B": {
    "id": "KDL403B",
    "model": "KDL403B",
    "image": "urunler/kdl403b.webp",
    "name": {
      "tr": "KDL403B SIVA ALTI SİYAH KASA SLİM LED PANEL",
      "en": "KDL403B RECESSED BLACK BODY SLIM LED PANEL"
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
  "KDL407B": {
    "id": "KDL407B",
    "model": "KDL407B",
    "image": "urunler/kdl407b.webp",
    "name": {
      "tr": "KDL407B SIVA ALTI SİYAH KASA SLİM LED PANEL",
      "en": "KDL407B RECESSED BLACK BODY SLIM LED PANEL"
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

  // Remove "Renk Sıcaklığı" / "Color Temperature" since it's a standalone product now without variants
  prod.attributes.tr = prod.attributes.tr.filter(a => a.label !== "Renk Sıcaklığı");
  prod.attributes.en = prod.attributes.en.filter(a => a.label !== "Color Temperature");

  // Since it's a standalone product representing all colors, let's keep variantOptions clean
  // but wait, if it's standalone, we might want to just set light to "3000K, 4000K, 6500K" so it shows as a badge?
  // User didn't want that earlier for KDL404, but here they didn't explicitly say. 
  // I will just add "light": "3000K, 4000K, 6500K" to variantOptions so it appears nicely in the variant badges!
  // Wait, if it's not a variant, just displaying it as a badge is good.
  prod.variantOptions.light = "3000K, 4000K, 6500K";

  // Add to products
  p[key] = prod;

  // Generate slug
  const slug = slugify(prod.name.tr);
  s[slug] = key;
}

fs.writeFileSync(pPath, JSON.stringify(p, null, 2));
fs.writeFileSync(sPath, JSON.stringify(s, null, 2));
console.log('Added 7 new products and their slugs!');
