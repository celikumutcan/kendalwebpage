const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src', 'data', 'products.json');
const imagesDir = path.join(__dirname, 'public', 'images');
const urunlerDir = path.join(imagesDir, 'urunler');

let dataContent = fs.readFileSync(dataPath, 'utf8');
const data = JSON.parse(dataContent);
const allFiles = fs.readdirSync(urunlerDir).map(f => f.toLowerCase());

let fixedCount = 0;
let stillMissing = [];

for (const key in data) {
    const item = data[key];
    if (item.image) {
        const imagePath = path.join(imagesDir, item.image);
        if (!fs.existsSync(imagePath)) {
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
            
            if (suggested) {
                // Replace in the file content directly to preserve formatting
                const oldString = `"image": "${item.image}"`;
                const newString = `"image": "${suggested}"`;
                dataContent = dataContent.replace(oldString, newString);
                fixedCount++;
            } else {
                stillMissing.push(item.id);
            }
        }
    }
}

fs.writeFileSync(dataPath, dataContent, 'utf8');

console.log(`Fixed ${fixedCount} images automatically.`);
console.log(`Could not find images for ${stillMissing.length} products:`);
console.log(stillMissing.join(', '));
