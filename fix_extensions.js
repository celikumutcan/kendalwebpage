const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src', 'data');
const publicDir = path.join(__dirname, 'public');

const filesToUpdate = ['news-tr.ts', 'news-en.ts', 'news-ru.ts', 'news-ar.ts', 'news-es.ts', 'news-fr.ts', 'news-de.ts'];

filesToUpdate.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Find all /images/haberler/ paths
  const regex = /\/images\/haberler\/([^"'\)]+)\.([a-zA-Z0-9]+)/g;
  
  content = content.replace(regex, (match, p1, ext) => {
    const originalPath = path.join(publicDir, 'images', 'haberler', `${p1}.${ext}`);
    
    if (fs.existsSync(originalPath)) {
      return match; // File exists as is
    }

    // Try finding the file with a different extension
    const dir = path.join(publicDir, 'images', 'haberler', path.dirname(p1));
    if (!fs.existsSync(dir)) return match;

    const baseName = path.basename(p1);
    const filesInDir = fs.readdirSync(dir);
    
    for (const f of filesInDir) {
      if (f.startsWith(baseName + '.') && f !== `${baseName}.${ext}`) {
        console.log(`Updated in ${file}: ${p1}.${ext} -> ${f}`);
        return `/images/haberler/${path.dirname(p1)}/${f}`.replace(/\\/g, '/');
      }
    }

    return match;
  });

  fs.writeFileSync(filePath, content, 'utf-8');
});

console.log('Update complete.');
