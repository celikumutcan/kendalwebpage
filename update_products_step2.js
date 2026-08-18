const fs = require('fs');

const userProducts = {
  "KDL404": {
    "name": {
      "tr": "KDL404 SIVA ALTI SLİM LED PANEL",
      "en": "KDL404 RECESSED SLIM LED PANEL"
    }
  },
  "KDL400": {
    "name": {
      "tr": "KDL400 SIVA ALTI SLİM LED PANEL",
      "en": "KDL400 RECESSED SLIM LED PANEL"
    }
  },
  "KDL405": {
    "name": {
      "tr": "KDL405 SIVA ALTI SLİM LED PANEL",
      "en": "KDL405 RECESSED SLIM LED PANEL"
    }
  },
  "KDL401": {
    "name": {
      "tr": "KDL401 SIVA ALTI SLİM LED PANEL",
      "en": "KDL401 RECESSED SLIM LED PANEL"
    }
  },
  "KDL402": {
    "name": {
      "tr": "KDL402 SIVA ALTI SLİM LED PANEL",
      "en": "KDL402 RECESSED SLIM LED PANEL"
    }
  },
  "KDL403": {
    "name": {
      "tr": "KDL403 SIVA ALTI SLİM LED PANEL",
      "en": "KDL403 RECESSED SLIM LED PANEL"
    }
  },
  "KDL407": {
    "name": {
      "tr": "KDL407 SIVA ALTI SLİM LED PANEL",
      "en": "KDL407 RECESSED SLIM LED PANEL"
    }
  }
};

const srcDataPath = 'c:/Users/umutcan.celik/Documents/GitHub/kendalwebpage/src/data/products.json';
const p = require(srcDataPath);

let updatedCount = 0;

for (const key of Object.keys(p)) {
  const model = p[key].model;
  if (!model) continue;
  
  const matchingBase = Object.keys(userProducts).find(base => model.startsWith(base));
  
  if (matchingBase) {
    let changed = false;
    
    // 1. Update Name
    if (JSON.stringify(p[key].name) !== JSON.stringify(userProducts[matchingBase].name)) {
      p[key].name = userProducts[matchingBase].name;
      changed = true;
    }
    
    // 2. Remove "Renk Sıcaklığı" and "Color Temperature"
    if (p[key].attributes) {
      if (p[key].attributes.tr) {
        const originalLength = p[key].attributes.tr.length;
        p[key].attributes.tr = p[key].attributes.tr.filter(attr => attr.label !== 'Renk Sıcaklığı');
        if (p[key].attributes.tr.length !== originalLength) changed = true;
      }
      if (p[key].attributes.en) {
        const originalLength = p[key].attributes.en.length;
        p[key].attributes.en = p[key].attributes.en.filter(attr => attr.label !== 'Color Temperature');
        if (p[key].attributes.en.length !== originalLength) changed = true;
      }
    }
    
    if (changed) {
      updatedCount++;
    }
  }
}

console.log("Total products updated for name and Renk Sıcaklığı removal:", updatedCount);
fs.writeFileSync(srcDataPath, JSON.stringify(p, null, 2));
