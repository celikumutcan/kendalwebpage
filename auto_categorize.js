const fs = require('fs');
const products = require('./src/data/products.json');

const ampulCategory = {"tr": ["Ampuller", "Led Ampuller"], "en": ["Bulbs", "Led Bulbs"]};
const seritCategory = {"tr": ["Dış Mekan Şerit Led, Neon ve Ledli Hortumlar", "Neon Led Hortumlar"], "en": ["Led Strips and Led Neon Hoses", "Neon Led Hoses"]};
const projektorCategory = {"tr": ["Dış Mekan Aydınlatma", "Led Projektörler"], "en": ["Outdoor Lighting", "Led Projectors"]};
const spotCategory = {"tr": ["İç Aydınlatma", "Ray Spotlar"], "en": ["Indoor Lighting", "Track Spotlights"]};
const sinekCategory = {"tr": ["İç Aydınlatma", "Sinek Öldürücü Armatürler"], "en": ["Indoor Lighting", "Bug Zapper Fixtures"]};

let updated = 0;

for (const key in products) {
    const p = products[key];
    if (p.brand === 'global' && (!p.category || !p.category.tr || p.category.tr.length === 0)) {
        const nameTr = (p.name.tr || '').toUpperCase();
        
        if (nameTr.includes('AMPUL')) {
            p.category = ampulCategory;
        } else if (nameTr.includes('ŞERİT') || nameTr.includes('SERIT') || nameTr.includes('NEON')) {
            p.category = seritCategory;
        } else if (nameTr.includes('PROJEKTÖR') || nameTr.includes('PROJEKTOR')) {
            p.category = projektorCategory;
        } else if (nameTr.includes('SPOT')) {
            p.category = spotCategory;
        } else if (nameTr.includes('SİNEK') || nameTr.includes('SINEK')) {
            p.category = sinekCategory;
        } else {
            p.category = {"tr": ["Diğer Ürünler"], "en": ["Other Products"]};
        }
        updated++;
    }
}

fs.writeFileSync('./src/data/products.json', JSON.stringify(products, null, 2));
console.log('Automatically categorized ' + updated + ' products.');
