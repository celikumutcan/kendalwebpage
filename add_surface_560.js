const fs = require('fs');

const userProducts = {
  "KDL560": {
    "id": "KDL560",
    "model": "KDL560",
    "image": "urunler/kdl560.webp",
    "name": {
      "tr": "KDL560 SIVA ÜSTÜ LED PANEL",
      "en": "KDL560 SURFACE MOUNTED LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "40W" },
        { "label": "Lümen", "value": "4350" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Ø220 mm, Kalınlık: 30 mm" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" },
        { "label": "Durum", "value": "Yeni" }
      ],
      "en": [
        { "label": "Watt", "value": "40W" },
        { "label": "Lumen", "value": "4350" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Ø220 mm, Thickness: 30 mm" },
        { "label": "Feature", "value": "Adjustable" },
        { "label": "Extra Feature", "value": "Domestic Production" },
        { "label": "Status", "value": "New" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "40W", "light": "Beyaz (6500K)" }
  },
  "KDL561": {
    "id": "KDL561",
    "model": "KDL561",
    "image": "urunler/kdl561.webp",
    "name": {
      "tr": "KDL561 SIVA ÜSTÜ LED PANEL",
      "en": "KDL561 SURFACE MOUNTED LED PANEL"
    },
    "attributes": {
      "tr": [
        { "label": "Watt", "value": "55W" },
        { "label": "Lümen", "value": "6600" },
        { "label": "Gerilim", "value": "220-240V" },
        { "label": "Çalışma Ömrü", "value": "20000 Saat" },
        { "label": "Koli Adedi", "value": "40" },
        { "label": "Ölçüler", "value": "Ø285 mm, Kalınlık: 30 mm" },
        { "label": "Özellik", "value": "Ayarlanabilir" },
        { "label": "Ekstra Özellik", "value": "Yerli Üretim" }
      ],
      "en": [
        { "label": "Watt", "value": "55W" },
        { "label": "Lumen", "value": "6600" },
        { "label": "Voltage", "value": "220-240V" },
        { "label": "Life Span", "value": "20000 Hours" },
        { "label": "Package Quantity", "value": "40" },
        { "label": "Dimensions", "value": "Ø285 mm, Thickness: 30 mm" },
        { "label": "Feature", "value": "Adjustable" },
        { "label": "Extra Feature", "value": "Domestic Production" }
      ]
    },
    "category": { "tr": ["LED Panel"], "en": ["LED Panel"] },
    "brand": "k2",
    "variantOptions": { "watt": "55W", "light": "Beyaz (6500K)" }
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
console.log('Added 2 KDL560/561 products! Deleted ' + deletedCount + ' old products. Remapped ' + remappedCount + ' old slugs.');
