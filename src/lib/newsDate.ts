const trMonths: { [key: string]: number } = {
  ocak: 0,
  şubat: 1,
  mart: 2,
  nisan: 3,
  mayıs: 4,
  haziran: 5,
  temmuz: 6,
  ağustos: 7,
  eylül: 8,
  ekim: 9,
  kasım: 10,
  aralık: 11,
};

const enMonths: { [key: string]: number } = {
  january: 0,
  jan: 0,
  february: 1,
  feb: 1,
  march: 2,
  mar: 2,
  april: 3,
  apr: 3,
  may: 4,
  june: 5,
  jun: 5,
  july: 6,
  jul: 6,
  august: 7,
  aug: 7,
  september: 8,
  sep: 8,
  sept: 8,
  october: 9,
  oct: 9,
  november: 10,
  nov: 10,
  december: 11,
  dec: 11,
};

export function parseNewsDate(dateStr: string): number {
  const cleaned = dateStr.trim();

  const enMatch = cleaned.match(
    /^([A-Za-zçğıöşüÇĞİÖŞÜ]+)\s+(\d{1,2}),\s*(\d{4})$/,
  );
  if (enMatch) {
    const month = enMonths[enMatch[1].toLowerCase()];
    if (month !== undefined) {
      return Date.UTC(
        parseInt(enMatch[3], 10),
        month,
        parseInt(enMatch[2], 10),
      );
    }
  }

  const parts = cleaned.split(/\s+/);
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const monthName = parts[1].toLowerCase();
    const month = trMonths[monthName] ?? enMonths[monthName];
    const year = parseInt(parts[2], 10);
    if (!isNaN(day) && month !== undefined && !isNaN(year)) {
      return Date.UTC(year, month, day);
    }
  } else if (parts.length === 2) {
    const monthName = parts[0].toLowerCase();
    const month = trMonths[monthName] ?? enMonths[monthName];
    const year = parseInt(parts[1], 10);
    if (month !== undefined && !isNaN(year)) {
      return Date.UTC(year, month, 1);
    }
  }

  return 0;
}
