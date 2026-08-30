# cPanel Canlıya Alma Planı — Kendal Webpage

Bu dosya 2026-08-30 tarihinde yapılan inceleme ve hazırlıkların özeti. Amaç: proje ~1 ay sonra canlıya alınırken, yeni bir Claude session'ına sadece bu dosya okutulduğunda tüm bağlamı (neyin neden yapıldığını) anlaması. Ayrıntılı kod/mimari bilgisi için `CLAUDE.md`'ye bakılabilir; bu dosya sadece **canlıya alma sürecine** odaklanıyor.

## Arka plan / hedef

- Şu anki canlı site (`kendalelektrik.com.tr`) eski bir **OpenCart (PHP) sitesi**. Bu proje (Next.js, statik export) onun **yerine tamamen geçecek**.
- Hedef: `k2.kendalelektrik.com.tr`, `vanti.kendalelektrik.com.tr`, `global.kendalelektrik.com.tr` subdomain'lerinin, kod içindeki marka mikro-sitelerini (`src/app/brand/[brandName]/`) sunması.
- 2026-08-30 itibarıyla bu 3 subdomain cPanel'de **henüz oluşturulmadı** — sıfırdan kurulacak.

## Yapılan tespitler (gerçek `next build` ile doğrulandı, varsayım değil)

1. Proje `output: "export"` ile tam statik export olarak build ediliyor (`next.config.ts`). cPanel'de çalışan bir Node/Next sunucu **yok** — Apache sadece statik dosya sunuyor.
2. `src/proxy.ts` (Next'in middleware'i), subdomain hostname'ine bakıp `/brand/{marka}/...`'e yönlendirme mantığını içeriyor, **ama statik export'ta hiç çalışmıyor**. Gerçek `next build` çıktısı bunu doğruluyor: `⚠ Statically exporting a Next.js application via next export disables API routes and middleware.` Bu yüzden subdomain yönlendirmesi **Apache/.htaccess seviyesinde** yapılmak zorunda — bunu zaten yaptık (aşağıda).
3. Build çıktısı (`out/`) tek bir paylaşılan `_next` klasörü kullanıyor (~4.3MB), marka başına ayrı kopya yok. **Subdomain'lerin document root'u ana site ile AYNI klasör olmalı** — ayrı bir alt klasöre point edilirse CSS/JS/resimler 404 verir. `out/brand/k2/`, `out/brand/vanti/`, `out/brand/global/` altında zaten markaya özel tam sayfa ağaçları (ürünler dahil) hazır duruyor, sadece doğru yere yönlendirilmeleri gerekiyor.
4. Kullanıcının paylaştığı eski OpenCart `.htaccess`'i incelendi. Tamamen PHP/OpenCart'a özel kurallar içeriyordu (REST admin API rewrite'ları, `index.php?route=...` routing, summernote/ckeditor redirect'leri, eski tema demo sayfa redirect'leri). Bunların hiçbiri yeni statik siteyle ilgili değil, hepsi kaldırıldı.
5. **Kritik risk bulundu ve önlendi:** eski `.htaccess`'teki `<FilesMatch>` kuralı `robots.txt` hariç **tüm `.txt` dosyalarını** engelliyordu. Yeni Next.js build'i `out/` içinde **24.968 adet `.txt` dosyası** üretiyor (App Router'ın sayfa geçişlerinde kullandığı iç veri dosyaları, örn. `__next._tree.txt`). Bu kural taşınsaydı, site içi sayfa geçişleri (client-side navigation) sessizce bozulurdu. Bu kural yeni dosyaya **alınmadı**.
6. Eski `.htaccess`'te ana domain `www.kendalelektrik.com.tr`'ye zorunlu yönlendiriliyordu. Bu, projenin kendi `robots.ts` dosyasındaki varsayımla (`https://www.kendalelektrik.com.tr/sitemap.xml`) zaten tutarlı — yeni dosyada da korundu, ama **sadece ana domain için** (subdomain'leri etkilemiyor, aksi halde k2/vanti/global'e giren biri anında www'ye atılıp marka sayfası hiç açılmazdı).

## Yapılan değişiklikler (kod tarafı, repo'da — zaten commit edilmeye hazır)

- ✅ `src/components/brand/shared/DealerMapInner.tsx`: Bayi haritasında hariç tutulan iller listesi güncellendi — **Tunceli çıktı, Ardahan eklendi** (toplam yine 77 il, "77 İlde Yetkili Bayimiz Var" metni doğru kalıyor). Ardahan seçimi bana bırakılmıştı, coğrafi/pazar profili benzer bir il olduğu için seçildi — farklı bir il istenirse tek satırlık değişiklik.
- ✅ `public/.htaccess`: Eski OpenCart'a özel her şey temizlendi, yerine kondu:
  - HTTPS zorunlu kılma (tüm host'lar için)
  - Ana domain için www zorunlu kılma (subdomain'ler hariç tutuluyor)
  - k2./vanti./global. subdomain'lerini `/brand/{marka}/...`'e yönlendiren mod_rewrite kuralları (paylaşılan `_next`/`images`/pdf dosyaları rewrite'tan muaf tutularak)
  - Next'in ürettiği özel `404.html`'in gösterilmesi için `ErrorDocument 404 /404.html` (öncesinde yoktu, eklendi)
  - Güvenlik başlıkları (CSP, HSTS, X-Frame-Options vb.) — eskisiyle birebir aynı, değiştirilmedi
  - LiteSpeed cache bloğu ve cPanel'in kendi otomatik yönettiği PHP handler bloğu (`# php -- BEGIN cPanel-generated handler...`) dokunulmadan korundu

## Canlıya alırken yapılması gerekenler (checklist)

1. `NODE_ENV=production npm run build` çalıştır — **`NEXT_PUBLIC_BUILD_MODE=ghpages` SET ETME**, bu cPanel/kök dizin build'i olmalı. Çıktı `out/` klasöründe oluşur.
2. `out/` klasörünün **tüm içeriğini** cPanel'deki ana domain document root'una yükle (eski OpenCart dosyalarının yerine — eski dosyaları önce yedekleyip sonra silmek/taşımak güvenli olur).
3. cPanel'de **Subdomains** bölümünden `k2`, `vanti`, `global` subdomain'lerini oluştur.
   - Her birinin document root'unu ana site ile **AYNI klasöre** ayarla (örn. `public_html`) — **ayrı bir alt klasör açma**, aksi halde subdomain'ler `_next`/`images` dosyalarını bulamaz.
4. Her 3 subdomain için de SSL sertifikası (cPanel AutoSSL) alındığından emin ol — `.htaccess`'teki HTTPS zorunlu kılma kuralı, SSL kurulmamış bir subdomain'i erişilemez hale getirebilir.
5. Yükleme bitince test et:
   - `https://www.kendalelektrik.com.tr` ana site açılıyor mu
   - `https://k2.kendalelektrik.com.tr`, `https://vanti.kendalelektrik.com.tr`, `https://global.kendalelektrik.com.tr` kendi marka sayfalarını gösteriyor mu
   - Her subdomain'de en az bir ürün detay sayfası açılıp resim/CSS'in düzgün yüklendiğini kontrol et (document root'un doğru ayarlandığının en somut kanıtı budur)
   - `https://kendalelektrik.com.tr` (www'suz) → `https://www.kendalelektrik.com.tr`'ye yönleniyor mu
   - Sitede birkaç sayfa arası gezinip (menüden tıklayarak) geçişlerin bozulmadığını doğrula (madde 5'teki `.txt` riskiyle ilgili)

## Hâlâ açık / teyit edilmemiş noktalar

- cPanel'deki ana domainin eski `.htaccess`'inde bahsi geçmeyen, farklı bir subdomain'e (mail, webmail, b2b, sanalpos gibi) özel bir kural olup olmadığı tam teyit edilmedi. Bu subdomain'lerin muhtemelen kendi ayrı document root'ları vardır ve bizim `.htaccess` değişikliğimizden etkilenmemeleri gerekir — yine de canlıya almadan önce hızlıca kontrol edilmesi iyi olur.
- `src/proxy.ts` hâlâ repo'da duruyor; statik export'ta zararsız/inert olduğu için silinmesi şart değil, ama isterse temizlik amacıyla kaldırılabilir (fonksiyonel bir engel oluşturmuyor).
