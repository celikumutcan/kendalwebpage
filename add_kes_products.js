const fs = require('fs');
const path = require('path');

const newProductsInput = {
  "KES010": {
    "id": "KES010",
    "model": "KES010",
    "image": "urunler/kes010.webp",
    "name": {
      "tr": "KES010 G9 DUY LEDLİ AMPUL",
      "en": "KES010 G9 SOCKET LED BULB"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "2W" },
        { "label": "Lümen", "value": "200" },
        { "label": "Duy", "value": "G9" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 6500K" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "55 mm x 16 mm" },
        { "label": "Açıklama", "value": "COB Led" }
      ],
      "en": [
        { "label": "Watt", "value": "2W" },
        { "label": "Lumen", "value": "200" },
        { "label": "Socket", "value": "G9" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Temperature", "value": "3000K, 6500K" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "55 mm x 16 mm" },
        { "label": "Description", "value": "COB Led" }
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
      "watt": "2W"
    }
  },
  "KES016": {
    "id": "KES016",
    "model": "KES016",
    "image": "urunler/kes016.webp",
    "name": {
      "tr": "KES016 G9 DUY LEDLİ AMPUL - DİM",
      "en": "KES016 G9 SOCKET LED BULB - DIMMABLE"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "5W" },
        { "label": "Lümen", "value": "270" },
        { "label": "Duy", "value": "G9" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 6500K" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "46 mm x 16 mm" },
        { "label": "Özellik", "value": "Dimlenebilir" },
        { "label": "Açıklama", "value": "COB Led" }
      ],
      "en": [
        { "label": "Watt", "value": "5W" },
        { "label": "Lumen", "value": "270" },
        { "label": "Socket", "value": "G9" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Temperature", "value": "3000K, 6500K" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "46 mm x 16 mm" },
        { "label": "Feature", "value": "Dimmable" },
        { "label": "Description", "value": "COB Led" }
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
      "watt": "5W"
    }
  },
  "KES110": {
    "id": "KES110",
    "model": "KES110",
    "image": "urunler/kes110.webp",
    "name": {
      "tr": "KES110 G9 DUY LEDLİ AMPUL",
      "en": "KES110 G9 SOCKET LED BULB"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "3W" },
        { "label": "Lümen", "value": "200" },
        { "label": "Duy", "value": "G9" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 6500K" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "55 mm x 16 mm" },
        { "label": "Açıklama", "value": "SMD Led" }
      ],
      "en": [
        { "label": "Watt", "value": "3W" },
        { "label": "Lumen", "value": "200" },
        { "label": "Socket", "value": "G9" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Color Temperature", "value": "3000K, 6500K" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "55 mm x 16 mm" },
        { "label": "Description", "value": "SMD Led" }
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
      "watt": "3W"
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
        
        // Add CCT support
        const lightAttrIndex = attrs.findIndex(a => a.label === "Renk Sıcaklığı" || a.label === "Color Temperature" || a.label === "CCT");
        if (lightAttrIndex !== -1) {
            const isCCT = attrs[lightAttrIndex].label === "CCT";
            const lightStr = attrs[lightAttrIndex].value;
            newProduct.variantOptions = newProduct.variantOptions || {};
            
            const mappedStr = mapColorStr(lightStr);
            if (isCCT || (lightStr.split(',').length > 1 && attrs.some(a => a.value.includes("3 Renk Fonksiyonu") || a.value.includes("3 Color Function")))) {
                newProduct.variantOptions.light = "CCT (" + mappedStr + ")";
            } else {
                newProduct.variantOptions.light = mappedStr;
            }
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
            if (attr.label.includes("Özellik") || attr.label.includes("Feature") || attr.label.includes("Açıklama") || attr.label.includes("Description") || attr.label.includes("Garanti") || attr.label.includes("Warranty")) {
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
