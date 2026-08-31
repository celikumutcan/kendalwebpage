const fs = require('fs');
const path = require('path');

const productsFile = path.join(__dirname, 'src/data/products.json');
const products = JSON.parse(fs.readFileSync(productsFile, 'utf8'));

const imagesToMove = [
  'HAN018B.jpg',
  'HAN018A.jpg',
  'HAN017B.jpg',
  'HAN017A.jpg',
  'KWL108.jpg',
  'KWL129.jpg',
];

let movedCount = 0;

imagesToMove.forEach((filename) => {
  const sourcePath = path.join(__dirname, filename);
  if (fs.existsSync(sourcePath)) {
    const id = filename.split('.')[0];
    const ext = path.extname(filename).toLowerCase();
    const newFilename = id.toLowerCase() + ext;
    const destPath = path.join(__dirname, 'public/images/urunler', newFilename);

    // Move file
    fs.renameSync(sourcePath, destPath);
    console.log(`Moved ${filename} to ${destPath}`);

    // Update products.json
    if (products[id]) {
      products[id].image = `urunler/${newFilename}`;
      console.log(`Updated products.json for ${id} to use ${newFilename}`);
    }

    movedCount++;
  }
});

if (movedCount > 0) {
  fs.writeFileSync(productsFile, JSON.stringify(products, null, 2), 'utf8');
  console.log(
    `Successfully processed ${movedCount} images and updated products.json`,
  );
} else {
  console.log('No images found to move.');
}
