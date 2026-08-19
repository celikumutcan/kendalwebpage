const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const files = fs.readdirSync(__dirname);
const imgFiles = files.filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.jpeg'));

const targetDir = path.join(__dirname, 'public', 'images', 'urunler');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

(async () => {
  for (const file of imgFiles) {
    const inputPath = path.join(__dirname, file);
    const parsed = path.parse(file);
    const outName = parsed.name.toLowerCase() + '.webp';
    const outputPath = path.join(targetDir, outName);
    
    console.log(`Processing: ${file} -> ${outName}`);
    try {
      await sharp(inputPath)
        .resize({ width: 800, height: 800, fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(outputPath);
      
      console.log(`Success: ${outputPath}`);
      fs.unlinkSync(inputPath);
      console.log(`Deleted original: ${inputPath}`);
    } catch (err) {
      console.error(`Error processing ${file}:`, err);
    }
  }
})();
