const fs = require('fs');
const path = require('path');

const newProductsInput = {
  "KES301": {
    "id": "KES301",
    "model": "KES301",
    "image": "urunler/kes301.webp",
    "name": {
      "tr": "KES301 LEDLİ RGB AKILLI AMPUL",
      "en": "KES301 LED RGB SMART BULB"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "9W" },
        { "label": "Lümen", "value": "850" },
        { "label": "Duy", "value": "E27" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "10 cm x 6 cm" },
        { "label": "Özellik", "value": "RGB" },
        { "label": "Özellik", "value": "Kendal Smart, Google Home, Alexa, Tuya Uyumlu" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "9W" },
        { "label": "Lumen", "value": "850" },
        { "label": "Socket", "value": "E27" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "10 cm x 6 cm" },
        { "label": "Feature", "value": "RGB" },
        { "label": "Feature", "value": "Kendal Smart, Google Home, Alexa, Tuya Compatible" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Ampul"
      ],
      "en": [
        "LED Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "9W"
    }
  },
  "KES302": {
    "id": "KES302",
    "model": "KES302",
    "image": "urunler/kes302.webp",
    "name": {
      "tr": "KES302 LEDLİ RGB AKILLI AMPUL",
      "en": "KES302 LED RGB SMART BULB"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lümen", "value": "1050" },
        { "label": "Duy", "value": "E27" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "11.8 cm x 6 cm" },
        { "label": "Özellik", "value": "RGB" },
        { "label": "Özellik", "value": "Kendal Smart, Google Home, Alexa, Tuya Uyumlu" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "12W" },
        { "label": "Lumen", "value": "1050" },
        { "label": "Socket", "value": "E27" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "11.8 cm x 6 cm" },
        { "label": "Feature", "value": "RGB" },
        { "label": "Feature", "value": "Kendal Smart, Google Home, Alexa, Tuya Compatible" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Ampul"
      ],
      "en": [
        "LED Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "12W"
    }
  },
  "KES224": {
    "id": "KES224",
    "model": "KES224",
    "image": "urunler/kes224.webp",
    "name": {
      "tr": "KES224 12-48 VOLT LED AMPUL",
      "en": "KES224 12-48 VOLT LED BULB"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "9W (24V)" },
        { "label": "Lümen", "value": "810" },
        { "label": "Duy", "value": "E27" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 6500K" },
        { "label": "Gerilim", "value": "24V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "10.7 cm x 6 cm" },
        { "label": "Özellik", "value": "Alüminyum Isı Transfer Modülü" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "9W (24V)" },
        { "label": "Lumen", "value": "810" },
        { "label": "Socket", "value": "E27" },
        { "label": "Color Temperature", "value": "3000K, 6500K" },
        { "label": "Voltage", "value": "24V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "10.7 cm x 6 cm" },
        { "label": "Feature", "value": "Aluminum Heat Transfer Module" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Ampul"
      ],
      "en": [
        "LED Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "9W (24V)"
    }
  },
  "KES222": {
    "id": "KES222",
    "model": "KES222",
    "image": "urunler/kes222.webp",
    "name": {
      "tr": "KES222 12-48 VOLT LED AMPUL",
      "en": "KES222 12-48 VOLT LED BULB"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "9W (12-48V)" },
        { "label": "Lümen", "value": "810" },
        { "label": "Duy", "value": "E27" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 6500K" },
        { "label": "Gerilim", "value": "12-48V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "10.7 cm x 6 cm" },
        { "label": "Özellik", "value": "Alüminyum Isı Transfer Modülü" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "9W (12-48V)" },
        { "label": "Lumen", "value": "810" },
        { "label": "Socket", "value": "E27" },
        { "label": "Color Temperature", "value": "3000K, 6500K" },
        { "label": "Voltage", "value": "12-48V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "10.7 cm x 6 cm" },
        { "label": "Feature", "value": "Aluminum Heat Transfer Module" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": {
      "tr": [
        "LED Ampul"
      ],
      "en": [
        "LED Bulb"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "watt": "9W (12-48V)"
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
        "2200K": "Amber (2200K)",
        "3000K": "Günışığı (3000K)",
        "4000K": "Ararenk (4000K)",
        "6500K": "Beyaz (6500K)"
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
