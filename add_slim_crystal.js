const fs = require('fs');

const userProducts = {
  "KDL510": {
    "id": "KDL510",
    "model": "KDL510",
    "image": "urunler/kdl510.webp",
    "name": {
      "tr": "KDL510 SLİM KRİSTAL BACKLİGHT ÇERÇEVESİZ PANEL",
      "en": "KDL510 SLIM CRYSTAL BACKLIGHT FRAMELESS PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lümen", "value": "2400" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Ø170mm, Kalınlık: 20mm" },
        { "label": "Kasa", "value": "Metal Kasa" },
        { "label": "Difüzör", "value": "Polikarbon Difüzör" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik 1", "value": "Yüksek Lümen" },
        { "label": "Ekstra Özellik 2", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "24W" },
        { "label": "Lumen", "value": "2400" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Ø170mm, Thickness: 20mm" },
        { "label": "Body", "value": "Metal Body" },
        { "label": "Diffuser", "value": "Polycarbonate Diffuser" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "Adjustable" },
        { "label": "Extra Feature 1", "value": "High Lumen" },
        { "label": "Extra Feature 2", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "24W" }
  },
  "KDL511": {
    "id": "KDL511",
    "model": "KDL511",
    "image": "urunler/kdl511.webp",
    "name": {
      "tr": "KDL511 SLİM KRİSTAL BACKLİGHT ÇERÇEVESİZ PANEL",
      "en": "KDL511 SLIM CRYSTAL BACKLIGHT FRAMELESS PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lümen", "value": "3600" },
        { "label": "Renk Sıcaklığı", "value": "3000K, 4000K, 6500K" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Ø220mm, Kalınlık: 20mm" },
        { "label": "Kasa", "value": "Metal Kasa" },
        { "label": "Difüzör", "value": "Polikarbon Difüzör" },
        { "label": "LED Çip", "value": "SMD 2835 Led Chip" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik 1", "value": "Yüksek Lümen" },
        { "label": "Ekstra Özellik 2", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "36W" },
        { "label": "Lumen", "value": "3600" },
        { "label": "Color Temperature", "value": "3000K, 4000K, 6500K" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Ø220mm, Thickness: 20mm" },
        { "label": "Body", "value": "Metal Body" },
        { "label": "Diffuser", "value": "Polycarbonate Diffuser" },
        { "label": "LED Chip", "value": "SMD 2835 Led Chip" },
        { "label": "Feature", "value": "Adjustable" },
        { "label": "Extra Feature 1", "value": "High Lumen" },
        { "label": "Extra Feature 2", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "36W" }
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

  const processAttrs = (lang) => {
    let attrs = prod.attributes[lang] || [];
    
    // Combine features (Özellik, Ekstra Özellik 1, Ekstra Özellik 2)
    const featureLabels = lang === 'tr' ? ['Özellik', 'Ekstra Özellik 1', 'Ekstra Özellik 2'] : ['Feature', 'Extra Feature 1', 'Extra Feature 2'];
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
console.log('Added 2 Slim Crystal Panel products! Deleted ' + deletedCount + ' old products. Remapped ' + remappedCount + ' old slugs.');
