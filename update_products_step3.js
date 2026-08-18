const fs = require('fs');

const srcDataPath = 'c:/Users/umutcan.celik/Documents/GitHub/kendalwebpage/src/data/products.json';
const p = require(srcDataPath);

const modelFamilies = ["KDL400", "KDL401", "KDL402", "KDL403", "KDL404", "KDL405", "KDL407"];

let deletedCount = 0;
let updatedCount = 0;

for (const key of Object.keys(p)) {
  const model = p[key].model;
  if (!model) continue;

  const isMatchingFamily = modelFamilies.some(family => model.startsWith(family));

  if (isMatchingFamily) {
    // 1. Delete if it has Saten or Siyah variants
    // Saten models have 'S' after the wattage or model, Siyah have 'B'
    // Let's check the variantOptions.casing string
    const opts = p[key].variantOptions || {};
    const casing = (opts.casing || '').toLowerCase();
    
    if (casing.includes('saten') || casing.includes('siyah') || model.includes('WSYH') || model.match(/KDL\d{3}S\d/)) {
      console.log(`Deleting Saten/Siyah variant: ${key} (${model})`);
      delete p[key];
      deletedCount++;
      continue; // Skip attribute updates for deleted products
    }

    // 2. Change label "Ekstra Özellik" to "Özellik"
    let changed = false;
    if (p[key].attributes && p[key].attributes.tr) {
      for (const attr of p[key].attributes.tr) {
        if (attr.label === "Ekstra Özellik") {
          attr.label = "Özellik";
          changed = true;
        }
      }
    }
    
    if (p[key].attributes && p[key].attributes.en) {
      for (const attr of p[key].attributes.en) {
        if (attr.label === "Extra Feature") {
          attr.label = "Feature";
          changed = true;
        }
      }
    }

    if (changed) {
      updatedCount++;
    }
  }
}

console.log(`Success! Deleted ${deletedCount} Saten/Siyah variants. Updated ${updatedCount} products to fix features.`);
fs.writeFileSync(srcDataPath, JSON.stringify(p, null, 2));
