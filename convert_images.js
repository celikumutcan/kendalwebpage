const sharp = require('sharp');
const fs = require('fs');

async function convertImage(inputFile, outputFile) {
  try {
    if (fs.existsSync(inputFile)) {
      await sharp(inputFile)
        .webp({ quality: 80 })
        .toFile(outputFile);
      console.log(`Successfully converted ${inputFile} to ${outputFile}`);
      // Clean up original JPG
      fs.unlinkSync(inputFile);
      console.log(`Deleted original file: ${inputFile}`);
    } else {
      console.log(`File not found: ${inputFile}`);
    }
  } catch (error) {
    console.error(`Error converting ${inputFile}:`, error);
  }
}

async function main() {
  await convertImage('./KDL114.jpg', './public/images/urunler/kdl114.webp');
  await convertImage('./KSL243.jpg', './public/images/urunler/ksl243.webp');
}

main();
