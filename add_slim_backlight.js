const fs = require('fs');

const userProducts = {
  "KDL485": {
    "id": "KDL485",
    "model": "KDL485",
    "image": "urunler/kdl485.webp",
    "name": {
      "tr": "KDL485 SLİM BACKLİGHT ÇERÇEVELİ PANEL",
      "en": "KDL485 SLIM BACKLIGHT FRAMED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lümen", "value": "360" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "100" },
        { "label": "Ölçüler", "value": "Ø100mm, Kalınlık: 20mm" },
        { "label": "Kasa", "value": "Metal Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "6W" },
        { "label": "Lumen", "value": "360" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "100" },
        { "label": "Dimensions", "value": "Ø100mm, Thickness: 20mm" },
        { "label": "Body", "value": "Metal Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "Adjustable" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "6W" }
  },
  "KDL486": {
    "id": "KDL486",
    "model": "KDL486",
    "image": "urunler/kdl486.webp",
    "name": {
      "tr": "KDL486 SLİM BACKLİGHT ÇERÇEVELİ PANEL",
      "en": "KDL486 SLIM BACKLIGHT FRAMED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "8W" },
        { "label": "Lümen", "value": "480" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "60" },
        { "label": "Ölçüler", "value": "Ø115mm, Kalınlık: 20mm" },
        { "label": "Kasa", "value": "Metal Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "8W" },
        { "label": "Lumen", "value": "480" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "60" },
        { "label": "Dimensions", "value": "Ø115mm, Thickness: 20mm" },
        { "label": "Body", "value": "Metal Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "Adjustable" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "8W" }
  },
  "KDL487": {
    "id": "KDL487",
    "model": "KDL487",
    "image": "urunler/kdl487.webp",
    "name": {
      "tr": "KDL487 SLİM BACKLİGHT ÇERÇEVELİ PANEL",
      "en": "KDL487 SLIM BACKLIGHT FRAMED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "15W" },
        { "label": "Lümen", "value": "900" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Ø175mm, Kalınlık: 20mm" },
        { "label": "Kasa", "value": "Metal Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "15W" },
        { "label": "Lumen", "value": "900" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Ø175mm, Thickness: 20mm" },
        { "label": "Body", "value": "Metal Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "Adjustable" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "15W" }
  },
  "KDL488": {
    "id": "KDL488",
    "model": "KDL488",
    "image": "urunler/kdl488.webp",
    "name": {
      "tr": "KDL488 SLİM BACKLİGHT ÇERÇEVELİ PANEL",
      "en": "KDL488 SLIM BACKLIGHT FRAMED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lümen", "value": "1350" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Ø230mm, Kalınlık: 20mm" },
        { "label": "Kasa", "value": "Metal Kasa" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "20W" },
        { "label": "Lumen", "value": "1350" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Ø230mm, Thickness: 20mm" },
        { "label": "Body", "value": "Metal Body" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "Adjustable" },
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
  const processAttrs = (lang) => {
    let attrs = prod.attributes[lang] || [];
    
    // Combine features (if there were multiple Özellik 1, etc., although there is only "Özellik" and "Ekstra Özellik" here)
    const featureLabels = lang === 'tr' ? ['Özellik', 'Ekstra Özellik'] : ['Feature', 'Extra Feature'];
    const features = attrs.filter(a => featureLabels.includes(a.label)).map(a => a.value);
    
    attrs = attrs.filter(a => !featureLabels.includes(a.label) && a.label !== (lang === 'tr' ? 'Renk Sıcaklığı' : 'Color Temperature'));
    
    if (features.length > 0) {
      attrs.push({ label: lang === 'tr' ? 'Özellik' : 'Feature', value: features.join(' / ') });
    }
    
    return attrs;
  };

  prod.attributes.tr = processAttrs('tr');
  prod.attributes.en = processAttrs('en');
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
console.log('Added 4 Slim Backlight Panel products! Deleted ' + deletedCount + ' old products. Remapped ' + remappedCount + ' old slugs.');
