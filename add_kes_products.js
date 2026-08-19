const fs = require('fs');
const path = require('path');

const newProductsInput = {
  "KES602": {
    "id": "KES602",
    "model": "KES602",
    "image": "urunler/kes602.webp",
    "name": {
      "tr": "KES602 LED FLAMANLI AMPUL (G45) (RUSTİK)",
      "en": "KES602 LED FILAMENT BULB (G45) (RUSTIC)"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "4W" },
        { "label": "Lümen", "value": "430" },
        { "label": "Kasa", "value": "G45" },
        { "label": "Duy", "value": "E27" },
        { "label": "Renk Sıcaklığı", "value": "Amber" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "7.5 cm x 4.5 cm" },
        { "label": "Garanti", "value": "3 Yıl" },
        { "label": "Özellik", "value": "IC Driver" },
        { "label": "Özellik", "value": "Rustik" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "4W" },
        { "label": "Lumen", "value": "430" },
        { "label": "Case", "value": "G45" },
        { "label": "Socket", "value": "E27" },
        { "label": "Color Temperature", "value": "Amber" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "7.5 cm x 4.5 cm" },
        { "label": "Warranty", "value": "3 Years" },
        { "label": "Feature", "value": "IC Driver" },
        { "label": "Feature", "value": "Rustic" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Flaman Ampul"
      ],
      "en": [
        "LED Filament Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "4W"
    }
  },
  "KES603": {
    "id": "KES603",
    "model": "KES603",
    "image": "urunler/kes603.webp",
    "name": {
      "tr": "KES603 LED FLAMANLI AMPUL (A60) (RUSTİK)",
      "en": "KES603 LED FILAMENT BULB (A60) (RUSTIC)"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "600" },
        { "label": "Kasa", "value": "A60" },
        { "label": "Duy", "value": "E27" },
        { "label": "Renk Sıcaklığı", "value": "Amber" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "10.6 cm x 6 cm" },
        { "label": "Garanti", "value": "3 Yıl" },
        { "label": "Özellik", "value": "IC Driver" },
        { "label": "Özellik", "value": "Rustik" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "600" },
        { "label": "Case", "value": "A60" },
        { "label": "Socket", "value": "E27" },
        { "label": "Color Temperature", "value": "Amber" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "10.6 cm x 6 cm" },
        { "label": "Warranty", "value": "3 Years" },
        { "label": "Feature", "value": "IC Driver" },
        { "label": "Feature", "value": "Rustic" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Flaman Ampul"
      ],
      "en": [
        "LED Filament Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W"
    }
  },
  "KES604": {
    "id": "KES604",
    "model": "KES604",
    "image": "urunler/kes604.webp",
    "name": {
      "tr": "KES604 LED FLAMANLI AMPUL (A60) (RUSTİK)",
      "en": "KES604 LED FILAMENT BULB (A60) (RUSTIC)"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "8W" },
        { "label": "Lümen", "value": "800" },
        { "label": "Kasa", "value": "A60" },
        { "label": "Duy", "value": "E27" },
        { "label": "Renk Sıcaklığı", "value": "Amber" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "10.6 cm x 6 cm" },
        { "label": "Garanti", "value": "3 Yıl" },
        { "label": "Özellik", "value": "IC Driver" },
        { "label": "Özellik", "value": "Rustik" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "8W" },
        { "label": "Lumen", "value": "800" },
        { "label": "Case", "value": "A60" },
        { "label": "Socket", "value": "E27" },
        { "label": "Color Temperature", "value": "Amber" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "10.6 cm x 6 cm" },
        { "label": "Warranty", "value": "3 Years" },
        { "label": "Feature", "value": "IC Driver" },
        { "label": "Feature", "value": "Rustic" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Flaman Ampul"
      ],
      "en": [
        "LED Filament Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "8W"
    }
  },
  "KES630": {
    "id": "KES630",
    "model": "KES630",
    "image": "urunler/kes630.webp",
    "name": {
      "tr": "KES630 LED FLAMANLI AMPUL (A60) (RUSTİK) - DİM",
      "en": "KES630 LED FILAMENT BULB (A60) (RUSTIC) - DIMMABLE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "4W" },
        { "label": "Lümen", "value": "440" },
        { "label": "Kasa", "value": "A60" },
        { "label": "Duy", "value": "E27" },
        { "label": "Renk Sıcaklığı", "value": "Amber" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "10.6 cm x 6 cm" },
        { "label": "Garanti", "value": "3 Yıl" },
        { "label": "Özellik", "value": "Dimlenebilir" },
        { "label": "Özellik", "value": "IC Driver" },
        { "label": "Özellik", "value": "Rustik" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "4W" },
        { "label": "Lumen", "value": "440" },
        { "label": "Case", "value": "A60" },
        { "label": "Socket", "value": "E27" },
        { "label": "Color Temperature", "value": "Amber" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "10.6 cm x 6 cm" },
        { "label": "Warranty", "value": "3 Years" },
        { "label": "Feature", "value": "Dimmable" },
        { "label": "Feature", "value": "IC Driver" },
        { "label": "Feature", "value": "Rustic" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Flaman Ampul"
      ],
      "en": [
        "LED Filament Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "4W"
    }
  },
  "KES631": {
    "id": "KES631",
    "model": "KES631",
    "image": "urunler/kes631.webp",
    "name": {
      "tr": "KES631 LED FLAMANLI AMPUL (A60) (RUSTİK) - DİM",
      "en": "KES631 LED FILAMENT BULB (A60) (RUSTIC) - DIMMABLE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "540" },
        { "label": "Kasa", "value": "A60" },
        { "label": "Duy", "value": "E27" },
        { "label": "Renk Sıcaklığı", "value": "Amber" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "10.6 cm x 6 cm" },
        { "label": "Garanti", "value": "3 Yıl" },
        { "label": "Özellik", "value": "Dimlenebilir" },
        { "label": "Özellik", "value": "IC Driver" },
        { "label": "Özellik", "value": "Rustik" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "540" },
        { "label": "Case", "value": "A60" },
        { "label": "Socket", "value": "E27" },
        { "label": "Color Temperature", "value": "Amber" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "10.6 cm x 6 cm" },
        { "label": "Warranty", "value": "3 Years" },
        { "label": "Feature", "value": "Dimmable" },
        { "label": "Feature", "value": "IC Driver" },
        { "label": "Feature", "value": "Rustic" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Flaman Ampul"
      ],
      "en": [
        "LED Filament Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "6W"
    }
  }
};

const productsFilePath = path.join(__dirname, 'src', 'data', 'products.json');
let products = {};
if (fs.existsSync(productsFilePath)) {
    products = JSON.parse(fs.readFileSync(productsFilePath, 'utf8'));
}

const mapColorStr = (str) => {
    const mapTr = {
        "1700K": "Alev Rengi (1700K)",
        "2200K": "Amber (2200K)",
        "2700K": "Sıcak Günışığı (2700K)",
        "3000K": "Günışığı (3000K)",
        "4000K": "Ararenk (4000K)",
        "6500K": "Beyaz (6500K)",
        "Amber": "Amber"
    };
    return str.split(',').map(s => s.trim()).map(s => mapTr[s] || s).join(', ');
};

for (const key of Object.keys(newProductsInput)) {
    const newProduct = newProductsInput[key];
    
    if (products[key]) {
        newProduct.image = products[key].image;
    }
    
    const processAttributes = (lang) => {
        let attrs = newProduct.attributes[lang] || [];
        
        const lightAttrIndex = attrs.findIndex(a => a.label === "Renk Sıcaklığı" || a.label === "Color Temperature");
        if (lightAttrIndex !== -1) {
            const lightStr = attrs[lightAttrIndex].value;
            newProduct.variantOptions = newProduct.variantOptions || {};
            newProduct.variantOptions.light = mapColorStr(lightStr);
            attrs.splice(lightAttrIndex, 1);
        }

        const colorAttrIndex = attrs.findIndex(a => a.label === "Renk Seçenekleri" || a.label === "Color Options");
        if (colorAttrIndex !== -1) {
            const colorStr = attrs[colorAttrIndex].value;
            newProduct.variantOptions = newProduct.variantOptions || {};
            newProduct.variantOptions.color = colorStr;
            attrs.splice(colorAttrIndex, 1);
        }

        let mergedFeatures = [];
        let remainingAttrs = [];
        
        for (const attr of attrs) {
            if (attr.label.includes("Özellik") || attr.label.includes("Feature") || attr.label.includes("Garanti") || attr.label.includes("Warranty")) {
                mergedFeatures.push(attr.value);
            } else {
                remainingAttrs.push(attr);
            }
        }
        
        if (mergedFeatures.length > 0) {
            const featureLabel = lang === 'tr' ? 'Özellik' : 'Feature';
            remainingAttrs.push({
                label: featureLabel,
                value: mergedFeatures.join(' / ')
            });
        }
        
        newProduct.attributes[lang] = remainingAttrs;
    };
    
    processAttributes('tr');
    processAttributes('en');
    
    products[key] = newProduct;
}

fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
console.log('Products added/updated successfully.');
