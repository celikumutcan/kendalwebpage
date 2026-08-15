const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data', 'products.json');
const imagesDir = path.join(__dirname, 'public', 'images');

const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const urunlerDir = path.join(imagesDir, 'urunler');
const allFiles = fs.readdirSync(urunlerDir).map(f => f.toLowerCase());

let missingCount = 0;
for (const key in data) {
    const item = data[key];
    if (item.image) {
        const imagePath = path.join(imagesDir, item.image);
        if (!fs.existsSync(imagePath)) {
            missingCount++;
            
            const basename = path.basename(item.image, path.extname(item.image)).toLowerCase();
            const baseCodeMatch = basename.match(/^([a-z]+[0-9]+)/);
            let suggested = null;
            
            if (baseCodeMatch) {
                const baseCode = baseCodeMatch[1];
                const candidates = allFiles.filter(f => f.includes(baseCode));
                if (candidates.length > 0) {
                    suggested = 'urunler/' + candidates[0];
                }
            }
            
            console.log(`Missing: ${item.id} -> ${item.image} | Suggested: ${suggested}`);
        }
    }
}
console.log(`Total missing: ${missingCount}`);