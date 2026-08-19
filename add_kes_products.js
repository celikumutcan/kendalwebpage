const fs = require('fs');
const path = require('path');

const newProductsInput = {
  "KES700": {
    "id": "KES700",
    "model": "KES700",
    "image": "urunler/kes700.webp",
    "name": {
      "tr": "KES700 DIŞ MEKAN E27 5'Lİ DUY SET",
      "en": "KES700 OUTDOOR E27 5-SOCKET SET"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "5 Duy / 5 Metre" },
        { "label": "Duy", "value": "E27" },
        { "label": "IP Sınıfı", "value": "IP64" },
        { "label": "Koli Adedi", "value": "50" }
      ],
      "en": [
        { "label": "Description", "value": "5 Sockets / 5 Meters" },
        { "label": "Socket", "value": "E27" },
        { "label": "IP Class", "value": "IP64" },
        { "label": "Package Quantity", "value": "50" }
      ]
    },
    "category": {
      "tr": [
        "Ampul Duy Seti"
      ],
      "en": [
        "Bulb Socket Set"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "açıklama": "5 Duy / 5 Metre"
    }
  },
  "KES701": {
    "id": "KES701",
    "model": "KES701",
    "image": "urunler/kes701.webp",
    "name": {
      "tr": "KES701 DIŞ MEKAN E27 20'Lİ DUY SET",
      "en": "KES701 OUTDOOR E27 20-SOCKET SET"
    },
    "attributes": {
      "tr": [
        { "label": "Açıklama", "value": "20 Duy / 10 Metre" },
        { "label": "Duy", "value": "E27" },
        { "label": "IP Sınıfı", "value": "IP64" },
        { "label": "Koli Adedi", "value": "20" }
      ],
      "en": [
        { "label": "Description", "value": "20 Sockets / 10 Meters" },
        { "label": "Socket", "value": "E27" },
        { "label": "IP Class", "value": "IP64" },
        { "label": "Package Quantity", "value": "20" }
      ]
    },
    "category": {
      "tr": [
        "Ampul Duy Seti"
      ],
      "en": [
        "Bulb Socket Set"
      ]
    },
    "brand": "k2",
    "variantOptions": {
      "açıklama": "20 Duy / 10 Metre"
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
            if (attr.label.includes("Özellik") || attr.label.includes("Feature") || attr.label.includes("Açıklama") || attr.label.includes("Description") || attr.label.includes("Garanti") || attr.label.includes("Warranty") || attr.label.includes("IP Sınıfı") || attr.label.includes("IP Class")) {
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
