import fs from 'fs';
import path from 'path';

const PDF_DIR = path.join(process.cwd(), 'public', 'urun-bilgi-formlari');
const SUFFIX = ' Ürün Bilgi Formu.pdf';

let cachedEntries: { code: string; file: string }[] | null = null;

function loadEntries() {
  if (cachedEntries) return cachedEntries;

  if (!fs.existsSync(PDF_DIR)) {
    cachedEntries = [];
    return cachedEntries;
  }

  const files = fs
    .readdirSync(PDF_DIR)
    .filter((f) => f.toLowerCase().endsWith('.pdf'));

  cachedEntries = files
    .map((file) => ({
      file,
      code: file.toLowerCase().endsWith(SUFFIX.toLowerCase())
        ? file.slice(0, -SUFFIX.length)
        : file.replace(/\.pdf$/i, ''),
    }))
    .sort((a, b) => b.code.length - a.code.length);

  return cachedEntries;
}

export function getProductPdfFile(
  model: string,
  nameTr: string,
): string | null {
  const entries = loadEntries();
  if (entries.length === 0) return null;

  const haystackModel = (model || '').toUpperCase();
  const haystackName = (nameTr || '').toUpperCase();

  const match = entries.find((e) => {
    const code = e.code.toUpperCase();
    return haystackModel.includes(code) || haystackName.includes(code);
  });

  return match ? match.file : null;
}
