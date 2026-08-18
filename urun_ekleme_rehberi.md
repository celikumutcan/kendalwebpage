# Kendal Webpage - Yeni Ürün Ekleme Rehberi

Merhaba Gelecekteki Antigravity Temsilcisi (Agent)! 🤖 

Ben senin dünkü versiyonunum. Kullanıcıyla (Umutcan) yoğun bir ürün girişi maratonundan çıktık. Bu projede ürün ekleme ve düzenleme işlemlerinin **çok net ve kesin kuralları** var. Kullanıcı sana ham JSON verisi veya resimler attığında tam olarak aşağıdaki adımları izlemeni bekliyor:

---

## 1. Yeni Ürün Ekleme (JSON Geldiğinde)

Kullanıcı sana yeni ürünlerin olduğu bir JSON bloğu atacak. Şunları **mutlaka** yapmalısın:

- **Özellikleri Birleştirme:** Kullanıcının JSON'ında `Özellik 1`, `Özellik 2`, `Garanti`, `Ekstra Özellik` gibi dağınık anahtarlar olabilir. Bunların **tamamını** `Özellik` (İngilizce ise `Feature`) adı altında, aralarına `" / "` koyarak birleştirmelisin. (Örn: `"Kompakt Driver Özelliği / Yerli Üretim / 5 Yıl Garanti"`).
- **Renk Sıcaklığı (CCT) Ayrımı:** JSON'daki `Renk Sıcaklığı` alanını attributes listesinden **çıkar** ve ürünün root dizinindeki `variantOptions.light` alanına string olarak yaz (Örn: `"Günışığı (3000K), Ararenk (4000K), Beyaz (6500K)"`).
- **Bağımsız Ürünler (Çok Önemli!):** Eğer kullanıcı sana aynı base modele sahip ama boyutları farklı (Örn: KDL4140_30x30, KDL4140_60x60) ayrı JSON'lar atarsa, bunların **`model` değerini kesinlikle kendi `id` değerleriyle aynı yap** (Yani `model: "KDL4140_60X60"`). Aksi takdirde Next.js bunları tek ürünün varyantları sanıp butonlarla birbirine bağlıyor ve ayrı sayfalar oluşmuyor! Kullanıcı bunu ASLA istemiyor.
- Tüm ürünleri Node.js script'i yazıp `src/data/products.json` dosyasına ekle.

## 2. Fotoğraf Yükleme ve İşleme

Kullanıcı "Fotoğrafları yükledim" dediğinde yapman gerekenler:
- Çalışma dizininde (root klasör) `Get-ChildItem -Filter "*.jpg"` komutu ile yeni yüklenen fotoğrafları bul. (Fotoğrafların ismi bazen büyük, bazen küçük harfli olabilir).
- Node.js ve `sharp` kütüphanesini kullanarak bu fotoğrafları **kesinlikle şu ayarlarla işleyip taşı:**
  - Hedef Klasör: `public/images/urunler/`
  - Boyutlandırma: `width: 800, height: 800, fit: 'inside', withoutEnlargement: true`
  - Format: `.webp`, `quality: 80`
  - İsimlendirme: Orijinal ismin tamamı küçük harfe çevrilmiş hali (`kdl050.webp`).
- İşlem bitince ana klasördeki eski `.jpg` orijinal dosyalarını **sil**.

## 3. Eski Linkler (Legacy Slugs) ve Yönlendirmeler

Kullanıcı "şu link de çalışsın" diyerek sana bir URL attığında (Örn: `/gdl425-40w-backlight-60*60`):
- `slug-map.json` dosyasını kullanarak bu eski linkleri yeni ürünün `id`'sine eşle.
- **Dikkat:** Bazen linkler Türkçe karakterler yüzünden URL encode edilmiş olarak gelir (`%C3%BC` gibi). Linki `decodeURIComponent` ile çöz ve **hem çözülmüş halini hem de ham URL encoded halini** `slug-map.json`'a ekle.
- **Çöp Temizliği:** Eski slug'ların işaret ettiği, eski sistemden kalmış ID'lere sahip (Örn: `4263`, `4264`) ürünler `products.json` içinde kalmış olabilir. Yönlendirme yaparken eski ürünün numarasını tespit edip `products.json`'dan tamamen **SİL**.

## 4. Temizlik ve Otomasyon

- Çalıştırmak için kök dizinde (root) `add_...js` gibi node scriptleri üretiyoruz. **İşin bitince bu JS dosyalarını root klasöründe çöp olarak bırakma, sil.** (Örn: Kodun en sonuna `fs.unlinkSync(__filename)` ekleyebilirsin).
- Yeni ürün eklendikten sonra eğer IDE hata veriyor veya sitede yansımıyorsa, Next.js'in meşhur cache sorunudur. Terminalde `Remove-Item -Recurse -Force .next` çalıştırıp sunucuyu yeniden başlatmasını söyle.

**Özet:** İşlemleri sessizce, hızlıca node.js scriptleriyle yap, JSON'ı temizle, WEBP'yi bas, eski slugları yönlendir ve arkanda çöp bırakma! Kolay gelsin. 🚀
