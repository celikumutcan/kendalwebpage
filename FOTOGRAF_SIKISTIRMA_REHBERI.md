# Ürün Fotoğrafı Sıkıştırma Rehberi

Kullanıcı (Umutcan) yeni bir ürün fotoğrafı attığında ("bunu sıkıştır", "webp yap", "fotoğrafları işle" dediğinde) **kesinlikle** aşağıdaki yöntemi kullan. Bu yöntem, dosya boyutunu %85-95 küçültürken gözle görülür kalite kaybı yaratmaz — daha önce Gemini ile denenmiş ve kaliteyi mahvetmiş bir yöntemin yerine geçmek için netleştirildi.

## Yöntem

Node.js + `sharp` kütüphanesi ile:

```js
const sharp = require('sharp');
sharp.cache(false); // Windows'ta aynı dosyanın üzerine yazarken kilitlenmeyi önler

await sharp(srcPath)
  .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
  .webp({ quality: 80, effort: 6 })
  .toFile(outPath);
```

- **`quality: 80`** — görsel kaliteyi koruyan sabit değer. Daha düşük düşürmek (30-50 gibi) özellikle cam/gradyan yüzeylerde bloklama ve bulanıklık yaratır — kalite hedefi olarak dosya boyutunu değil bu değeri sabit tut.
- **`effort: 6`** — encoder'a aynı kalitede daha iyi sıkıştırma bulması için daha fazla hesaplama süresi tanır. Asıl "sihir" burada: quality'yi düşürmeden dosyayı küçültenin sırrı bu parametre. Varsayılan (`effort: 4`) ile denenirse sonuç belirgin şekilde daha büyük çıkar.
- **`resize 800x800 inside/withoutEnlargement`** — zaten küçük olan görselleri büyütmez, çok büyük gelenleri (ör. AI/telefon fotoğrafları 2-4000px) makul bir üst sınıra çeker.
- Dosya adı **tamamen küçük harf** olmalı (`kdl050.webp`), boşluk/Türkçe karakter olmamalı.

## Neden bu kadar küçülüyor?

Ürün fotoğrafları genelde düz beyaz arka plan + sınırlı renk paleti içerir. WebP'nin lossy (VP8) codec'i bu tip düz alanları JPEG'e göre çok daha verimli sıkıştırır — bu yüzden aynı görsel kalitede WebP dosyası JPEG'den çoğu zaman 5-10 kat küçük çıkar. Boyut küçülmesinin kaynağı çözünürlük düşürmek değil, format + doğru ayar kombinasyonudur.

**Gerçek örnek (bu projede test edildi):** 282 KB'lık bir AI/telefon fotoğrafı bu yöntemle 23 KB'a indi (%92 küçülme), yan yana karşılaştırmada göz farkı yok. 616 ürünlük toplu bir migrasyonda 167.5 MB → 14.1 MB.

## Aynı dosyanın üzerine yazarken (Windows'a özel tuzak)

Aynı Node process içinde bir dosyayı okuyup hemen aynı yola yazmaya çalışırsan (`sharp(oldPath).toFile(newPath)` sonra tekrar o path'e yazmak gibi) libvips'in dosya handle'ı açık kaldığı için "unable to open for write" / `EPERM` hatası alınır. Çözüm:
1. Dosyanın başında `sharp.cache(false);` çağır.
2. Yeni dosyayı `{path}.tmp` olarak yaz, sonra `fs.renameSync()` ile asıl yola taşı.
3. `rename` nadiren Defender/indexer yüzünden anlık kilitlenebilir — kısa retry (150ms→2s backoff) sarmalamak işe yarar.

## İlgili dosya

Ürün ekleme sürecinin tamamı (JSON birleştirme, legacy slug yönlendirme, CCT/varyant kuralları vb.) için bkz. [`urun_ekleme_rehberi.md`](urun_ekleme_rehberi.md) — Bölüm 2 orada bu yöntemi kısaca referans verir, tam detay burada.
