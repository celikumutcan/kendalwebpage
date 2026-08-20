const fs = require('fs');
const path = './src/data/products.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));

let updatedCount = 0;
Object.keys(data).forEach(k => {
  const p = data[k];
  if (p.variantOptions && p.variantOptions.casing) {
    const oldVal = p.variantOptions.casing;
    const newVal = oldVal.replace(/\s*Kasa\b/gi, '').trim();
    if (newVal !== oldVal) {
      console.log(`Changed [${k}]: ${oldVal} -> ${newVal}`);
      p.variantOptions.casing = newVal;
      updatedCount++;
    }
  }
});

if (updatedCount > 0) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
}
console.log('Cleaned "Kasa" from variantOptions.casing for ' + updatedCount + ' products.');
