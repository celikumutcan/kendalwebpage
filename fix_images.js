const fs = require('fs');
const path = require('path');

const tsFiles = [
    'src/data/news-tr.ts',
    'src/data/news-en.ts'
];

const publicDir = 'public';

function fixImagesInFile(filePath) {
    const absoluteFilePath = path.join(__dirname, filePath);
    if (!fs.existsSync(absoluteFilePath)) {
        console.error(`File not found: ${absoluteFilePath}`);
        return;
    }

    let content = fs.readFileSync(absoluteFilePath, 'utf-8');
    
    const imageRegex = /("\/images\/haberler\/[^"]+")|(\[IMAGE\]\/images\/haberler\/[^"\s]+)/g;
    
    let modified = false;
    
    content = content.replace(imageRegex, (match) => {
        let imagePath = '';
        let isQuote = match.startsWith('"');
        let isImageTag = match.startsWith('[IMAGE]');
        
        if (isQuote) {
            imagePath = match.substring(1, match.length - 1);
        } else if (isImageTag) {
            imagePath = match.substring(7);
        }
        
        let parsed = path.parse(imagePath);
        
        // If it's already .webp, just return
        if (parsed.ext.toLowerCase() === '.webp') {
            return match;
        }

        const absoluteImgPath = path.join(__dirname, publicDir, imagePath);
        
        let webpPathRelative = path.posix.join(parsed.dir, parsed.name + '.webp');
        let absoluteWebpPath = path.join(__dirname, publicDir, webpPathRelative);
        
        if (fs.existsSync(absoluteWebpPath)) {
            console.log(`Found .webp for: ${imagePath}`);
            modified = true;
            return isQuote ? `"${webpPathRelative}"` : `[IMAGE]${webpPathRelative}`;
        } else if (!fs.existsSync(absoluteImgPath)) {
             console.log(`COULD NOT FIND ANY VARIANT FOR: ${imagePath}`);
        }
        
        return match;
    });

    if (modified) {
        fs.writeFileSync(absoluteFilePath, content, 'utf-8');
        console.log(`Updated ${filePath}`);
    } else {
        console.log(`No changes needed in ${filePath}`);
    }
}

tsFiles.forEach(fixImagesInFile);
