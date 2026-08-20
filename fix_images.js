const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync('./src/data/products.json', 'utf8'));

const imagesDir = './public/images/urunler';
const files = fs.readdirSync(imagesDir);

let fixedCount = 0;

Object.keys(data).forEach(id => {
  const p = data[id];
  if (p.brand === 'k2' && p.category?.tr?.includes('LED Armatür')) {
    const imgName = p.image.replace('urunler/', '');
    const imgPath = path.join(imagesDir, imgName);
    
    if (!fs.existsSync(imgPath)) {
      const prefix = p.model.toLowerCase();
      // Try to find a matching image that starts with the model name, prioritizing 'byz' or 'beyaz'
      const matches = files.filter(f => f.toLowerCase().startsWith(prefix));
      
      if (matches.length > 0) {
        // Prefer white (beyaz/byz) if available
        let bestMatch = matches.find(m => m.includes('byz') || m.includes('beyaz')) || matches[0];
        
        console.log(`Fixing ${p.model}: ${imgName} -> ${bestMatch}`);
        p.image = `urunler/${bestMatch}`;
        fixedCount++;
      }
    }
  }
});

if (fixedCount > 0) {
  fs.writeFileSync('./src/data/products.json', JSON.stringify(data, null, 2), 'utf8');
}
console.log(`Fixed ${fixedCount} missing images.`);
