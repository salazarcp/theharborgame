# Harbor SEO + GEO + Steam Görünürlük Yol Haritası

Son güncelleme: 22 Temmuz 2026
Odak: `theharborgame.com`, Steam App `2714930`, ardından Epic Games Store
Çıkış penceresi: yalnızca **2026**; kesin gün veya ay kullanılmayacak.

## 1. Stratejik karar

Harbor için her kanalda kullanılacak ana konumlandırma:

> **Harbor, CastilvaGames’in Windows PC için geliştirdiği rekabetçi post-apocalyptic açık dünya survival oyunudur. Dünyadaki tek güvenli bölge Harbor’dır; Clean Blood ve Fuel iki kritik kaynaktır. Online PvP, co-op, crafting, building ve ticaret aynı kıtlık ekonomisinde buluşur.**

Kısa İngilizce tanım:

> **Harbor is CastilvaGames’ competitive post-apocalyptic open-world survival game for Windows PC, built around one safe zone, scarce resources, online PvP, co-op, building, and trading.**

Hafıza kancası: **1–2–2**

- 1 güvenli bölge: Harbor
- 2 kritik kaynak: Clean Blood ve Fuel
- 2 hareketli kaynak hedefi: War Truck ve Blackrail

Bu yapı Harbor’ı yalnızca “bir başka survival oyunu” olmaktan çıkarıp insanların ve AI sistemlerinin tekrar edebileceği özgün, kanıtlanabilir bir cümleye dönüştürür.

### Marka sınırları

- Oyunun adı yalnızca **Harbor**.
- Geliştirici ve yayıncı: **CastilvaGames**.
- Kesin ay veya gün yok; yalnızca **2026**.
- Platform: **Windows PC**.
- Steam sayfası açık ve Early Access listeliyor.
- Epic Games Store çıkışı planlı; halka açık ürün URL’si gelene kadar mağaza bağlantısı verilmeyecek.
- “Mad Max evreni” denmeyecek. Harbor özgün bir IP’dir. Yalnızca tarafsız tür karşılaştırmalarında “Mad Max-style wasteland atmosphere” benzeri, bağlantı olmadığını açıkça belirten ifadeler kullanılabilir.
- Vehicle combat genel bir ana vaat yapılmayacak. War Rig ile ilgili kapsam hazır olduğunda ayrıca anlatılabilir; mevcut roadmap bu konuya girmez.

## 2. Neden Search Console tek başına yetmez?

| Sistem | Ölçtüğü şey | Ölçemediği ana boşluk |
|---|---|---|
| Google Search Console | Google indeks durumu, sorgular, gösterimler, tıklamalar | ChatGPT/Perplexity/Claude yönlendirmeleri, Steam CTA dönüşümü |
| GA4 | Site oturumları, referrer/UTM, Steam–fragman–Discord–bülten tıklamaları | Steam içindeki gerçek wishlist sayısı |
| Steamworks | Wishlist, takipçi, mağaza dönüşümü, trafik kaynakları | Site içi davranış ve AI yönlendirmelerinin ayrıntısı |
| Harbor AI radar | AI cevaplarında görünme ve kaynak payı | Gerçek satış/wishlist sonucu |

Doğru karar dört kaynağı birlikte okumaktır. Kuzey yıldızı “sıralama” değil, **nitelikli wishlist büyümesi** olmalıdır.

## 3. Mevcut baz çizgi

Yerel görünürlük raporundaki 209 geçerli kontrolde Harbor 20 kez görünmüş: yaklaşık **%10 cevap payı**.

| Kanal | Harbor görünümü | Baz oran |
|---|---:|---:|
| ChatGPT | 3 / 40 | %7,5 |
| Perplexity | 3 / 40 | %7,5 |
| Gemini | 4 / 40 | %10 |
| Claude | 0 / 9 | %0 |
| Google AI Overviews | 5 / 40 | %12,5 |
| Google AI Mode | 5 / 40 | %12,5 |

İlk 12 hafta için hedefler garanti değil, operasyon eşikleridir:

- Toplam AI cevap payını %10’dan en az %25’e taşımak.
- Hiçbir izlenen sağlayıcıda Harbor’ı %0’da bırakmamak.
- Harbor’a kaynak veren en az 5 bağımsız, alakalı alan adı kazanmak.
- 8 gerçek Steam News gönderisi, 8 kısa video/klip ve en az 4 site devlog/watch sayfası yayınlamak.
- 10 ana EN/TR URL’nin tamamını indekslenmiş durumda tutmak.
- Her içerik kampanyasında ölçülebilir Steam tıklaması üretmek.

## 4. Citation flywheel

Her konu tek bir kanalda bırakılmayacak:

1. `theharborgame.com` üzerinde doğrudan cevap ve kanıtlı ana kaynak.
2. Aynı konunun Steam News duyurusu.
3. 30–90 saniyelik YouTube videosu veya Short.
4. Basın/creator paketi ve özgün ekran görüntüleri.
5. Gerçek topluluk konuşması veya bağımsız editoryal kaynak.
6. AI radarında aynı sorgunun yeniden ölçülmesi.
7. GA4 + Steamworks sonuçlarına göre içerik yenilemesi.

AI görünürlüğünde asıl sıçrama yalnızca daha fazla sayfa açmaktan değil, aynı doğru bilginin birbirinden bağımsız güvenilir yüzeylerde doğrulanmasından gelir.

## 5. Ölçüm sözlüğü

GA4 mülkü: `G-XMBR4ENVMK`

### Temel event’ler

| Event | Anlamı | Key event adayı |
|---|---|---|
| `steam_store_click` | Siteden resmi Steam App 2714930 sayfasına çıkış | Evet |
| `trailer_click` | Resmi fragmana çıkış | Hayır |
| `discord_click` | Discord topluluğuna çıkış | İkincil |
| `sign_up` / method=`newsletter` | Bülten kaydı | Evet |
| `epic_store_click` | Epic ürün URL’si yayınlandıktan sonra tıklama | Daha sonra |

### UTM standardı

Biçim:

`utm_source={kanal}&utm_medium={format}&utm_campaign={tema_yil}&utm_content={varlik}`

Örnekler:

- Steam News → site: `?utm_source=steam&utm_medium=community&utm_campaign=harbor_identity_2026&utm_content=news_01`
- YouTube → site: `?utm_source=youtube&utm_medium=video&utm_campaign=harbor_safe_zone_2026&utm_content=short_01`
- Creator → site: `?utm_source={creator}&utm_medium=creator&utm_campaign=harbor_preview_2026&utm_content={video_id}`
- Basın → site: `?utm_source={publication}&utm_medium=earned_media&utm_campaign=harbor_press_2026`

Her link küçük harfle, ASCII ve sabit isimlerle üretilmeli. Aynı kampanya farklı yazımlarla bölünmemeli.

## 6. 12 haftalık uygulama planı

### Hafta 0 — Temel doğruluk ve ölçüm

Teslimler:

- Tüm canlı metinlerde oyunun adını Harbor olarak tekilleştir.
- 2026 çıkış penceresini gün/ay vermeden sabitle.
- Steam açık / Epic planlı–URL bekleniyor durumunu EN/TR sayfalarda ve makine okunur kaynaklarda eşitle.
- Steam App ID 2714930 kimliğini VideoGame şemasına ekle.
- Ana fragman için doğrulanmış `VideoObject` ekle.
- GA4’ü izin gelmeden script/çerez yüklemeyecek biçimde kur.
- Steam, fragman, Discord ve bülten event’lerini ekle.
- Gizlilik politikasını analitik ölçüm için güncelle.

Tamamlanma kanıtı:

- Production build ve SEO doğrulayıcı geçer.
- İlk ziyarette GA script’i yoktur.
- Kabulden sonra GA script’i yüklenir ve `page_view` gönderilir.
- Reddetmede script yüklenmez.
- Canlı `/`, `/tr/`, `/release/`, `/tr/cikis/`, `harbor-facts.json` ve `llms.txt` doğru metni gösterir.

### Hafta 1 — Ölçüm doğrulama ve baz çizgi

- GA4 Realtime/DebugView’da event’leri tek tek doğrula.
- `steam_store_click` ve `sign_up` event’lerini GA4 Key Event olarak işaretle.
- GSC’de domain property, sitemap ve 10 canonical URL’nin durumunu kaydet.
- Steamworks’ten günlük wishlist, takipçi, mağaza ziyareti ve kaynak baz çizgisini dışa aktar.
- Ekip/IP iç trafiğini GA4’te filtrelemek için ofis/test kaynaklarını belirle.
- Haftalık scorecard’ın ilk satırını doldur.

Başarı koşulu: site tıklaması ile Steamworks wishlist değişiminin aynı tarih ekseninde görülebilmesi.

- Ölçüm kimliğinin bağlı olduğu mevcut `prime-ecd60` mülkünün yalnız Harbor için kullanılacağını doğrula; başka Firebase uygulaması kullanıyorsa ayrı `Harbor — theharborgame.com` mülkü aç ve kimliği değiştir.
### Hafta 2 — Steam entity ve mağaza sayfası

- Steam kısa açıklamasını ana konumlandırmayla hizala.
- İlk iki görünür cümlede “competitive post-apocalyptic open-world survival” ve 1–2–2 kancasını kullan.
- Tag sırasını gerçek oyun odağına göre kontrol et: Open World Survival Craft, Survival, Multiplayer, Online PvP, Online Co-op, FPS, Building.
- Geliştirici/yayıncı adını her yerde CastilvaGames yap.
- Web sitesi, Discord, YouTube ve basın kiti bağlantılarını doğrula.
- 2026 dışında kesin tarih olmadığını tekrar kontrol et.
- Steam görsellerindeki kısa metinleri ve videoları site/YouTube yeniden kullanım envanterine al.

Başarı koşulu: Steam, site ve şema ilk 200 kelimede aynı varlığı ve aynı vaatleri anlatır.

### Hafta 3 — Steam News başlangıcı

- News #1: **What Is Harbor? One Safe Zone. Two Critical Resources.**
- News #2: **Inside Harbor: The Only Safe Zone in the Wasteland.**
- Her haber için İngilizce ana metin, mümkünse Türkçe yerelleştirme, 3–6 görsel ve 30–90 saniyelik klip.
- Her gönderiden canonical site sayfasına UTM’li bağlantı.
- Haber yayın günü aynı konunun YouTube klibini ve Discord duyurusunu yayınla.

Başarı koşulu: iki Steam News, iki video varlığı ve kaynakları ayrıştırılan GA4 trafik kaydı.

### Hafta 4 — Video arama yüzeyi

- Steam sayfasındaki kısa videoların özgün master dosyalarını topla; Steam CDN’den kopyalamak yerine sahibi olunan dosyaları kullan.
- Her klip için ayrı, videonun ana içerik olduğu site watch sayfası oluştur.
- Her sayfaya özgün başlık, transkript, 100–250 kelimelik bağlam, thumbnail, `VideoObject`, duration ve uploadDate ekle.
- Video sitemap oluştur ve GSC’ye gönder.
- Aynı varlıkları YouTube’a açıklayıcı başlık, bölüm ve canonical site linkiyle yükle.

Başarı koşulu: en az 4 doğrulanabilir video watch sayfası ve Google video indeksleme raporunda keşif.

### Hafta 5 — Konu otoritesi: kıtlık ve ekonomi

- News #3: **Clean Blood and Fuel: The Economy of Survival.**
- Site ana kaynağı: kaynakların bilinen işlevleri, bilinmeyen sayısal değerleri uydurmadan.
- 45–60 saniyelik “two critical resources” klibi.
- Basın paketine konu özeti, 5 doğrulanmış madde, 3 ekran görüntüsü ve geliştirici alıntısı ekle.
- “Harbor resources”, “Clean Blood Harbor”, “Fuel Harbor game” sorgularını radara ekle.

### Hafta 6 — Building ve dünya kanıtı

- News #4: **Building for Survival: Workbenches and Three Upgrade Tiers.**
- News #5: **A Tour of Harbor’s Wasteland.**
- Site üzerinde Harbor Bar, Citadel, Diesel Ring, Bullet Quarry, Greenwound, Blackmire ve Rulers of the Harbor için açıklanmış bilgilerden konum dizini.
- Her varlık için özgün görsel alt metni ve basın kredisi.
- İç linkleri gameplay, release ve press sayfalarına bağla.

Başarı koşulu: generic survival sorgularının yanında Harbor’a özgü entity sorgularının artması.

### Hafta 7 — Creator ve basın kanıt paketi

- 25 öncelikli creator/yayın listesi: survival, open world, PvP, indie PC, Turkish gaming.
- Herkese aynı spam mail yerine üç segmentli, kişiselleştirilmiş pitch.
- Tek bağlantıda: 50/100 kelimelik açıklama, logo, 10 screenshot, 4 kısa klip, PC gereksinimleri, Steam App ID, iletişim.
- Beş creator’a küçük “micro-exclusive”: bir konumun yeni görseli, kısa geliştirici notu veya erken soru-cevap.
- Alınan haberlerde yanlış isim/tarih/platform kontrolü yap; gerektiğinde nazik düzeltme iste.

Başarı koşulu: en az 5 nitelikli yanıt ve 2 bağımsız yayın/creator referansı.

### Hafta 8 — Topluluk ve gerçek konuşma

- News #6: **Blackrail and the War Truck: Moving Resource Targets.**
- Discord’da tek bir net soru: oyuncular Harbor’da ilk hangi riski almak ister?
- Reddit’te yalnızca topluluk kurallarına uygun, geliştirici kimliği açık, tartışmaya değer yapım notları paylaş.
- Sahte hesap, oy, yorum, backlink satın alma veya astroturf kesinlikle yok.
- Gelen gerçek soruları FAQ ve sonraki Steam News konularına dönüştür.

Başarı koşulu: bağlantı bırakılan paylaşım sayısı değil; cevap, kaydetme, takip ve nitelikli soru sayısı.

### Hafta 9 — Yerelleştirme ve entity tutarlılığı

- EN/TR ana içerikleri güncelle; Almanca, Fransızca, İspanyolca için yalnızca kaliteli insan kontrolü varsa yüksek niyetli landing sayfaları değerlendir.
- Otomatik çeviriyle onlarca ince sayfa üretme.
- Her dilde Harbor adı, CastilvaGames, Steam App ID, 2026 ve platform bilgilerinin aynı olduğunu doğrula.
- Türkçe creator ve basın kampanyasını ayrı yürüt.

### Hafta 10 — Bilgi kazanımı ve özgün kaynak

- News #7: **Harbor PC Requirements and the 2026 Release Window.**
- “Developer Notes” formatı başlat: bir tasarım kararını, nedeni ve değişebilecek alanları açıklayan özgün birinci taraf yazı.
- Kopyalanabilir “Harbor facts” kutusu ve güncelleme geçmişi yayınla.
- Basın/AI sistemlerinin alıntılayabileceği kısa geliştirici cümleleri hazırla.
- Steam’den kopyalanmış commodity metin yerine yalnızca CastilvaGames’in açıklayabileceği bilgi ekle.

### Hafta 11 — Dönüşüm optimizasyonu

- Hero’daki iki değer önerisini A/B değil, sıralı dönem testiyle karşılaştır; trafik düşükse yanlış kesinlik üretme.
- Steam CTA tıklama oranını cihaz, dil, landing page ve trafik kaynağına göre incele.
- En yüksek nitelikli sayfalarda CTA’yı görünür ama tasarımı bozmayan konuma getir.
- Newsletter doğrulama oranını ölç; yalnızca form submit’i başarı sayma.
- Steamworks wishlist dönüşümünü aynı dönem GA tıklamalarıyla birlikte değerlendir.

### Hafta 12 — Yeniden ölçüm ve ikinci döngü

- News #8: **How Community Feedback Will Shape Harbor.**
- 209+ sorguluk radarın aynı sorgu setini yeniden çalıştır.
- Sağlayıcı bazında cevap payı, kaynak alan adı, yanlış bilgi ve rakip karşılaştırmasını çıkar.
- GSC son 28 gün / önceki 28 gün; GA4 trafik ve key event; Steamworks wishlist eğrisini birleştir.
- Kazanan üç tema için ikinci içerik döngüsü; sonuç üretmeyen yüzeyleri durdur.
- Epic ürün sayfası açıksa resmi URL’yi site, JSON-LD, facts, llms, sitemap ve GA event sınıflandırmasına ekle.

## 7. Raporda olmayan ama fark yaratacak taktikler

### 7.1 Entity collision savunması

“Harbor” jenerik bir kelime olduğu için yalnız ad yetmez. Her kritik kaynakta şu üçlü birlikte bulunmalı:

- Harbor
- CastilvaGames
- Steam App ID 2714930

Bu, AI sistemlerinin Harbor’ı başka oyunlar, liman terimi veya yanlış ad varyantlarıyla birleştirmesini azaltır.

### 7.2 Citable proof blocks

Her makalede alıntılanabilir bir kutu:

- Doğrudan 40–80 kelimelik cevap
- “Known / not announced” ayrımı
- Son doğrulama tarihi
- Steam ve resmi site kaynağı
- Bir özgün görsel

Bu kutular insan editörün ve AI sisteminin doğru bölümü seçmesini kolaylaştırır.

### 7.3 Information gain

AI ve arama sonuçlarında Steam açıklamasını yeniden yazmak yeterli değildir. CastilvaGames’in benzersiz kaynağı olabileceği içerikler:

- Bir sistemin neden tasarlandığı
- Önce/sonra görseli
- Konum tasarım notu
- Gerçek geliştirme kısıtı
- Topluluk geri bildirimiyle değişen karar
- Açıklanmış mekaniğin sınırları ve henüz açıklanmayanlar

### 7.4 Creator micro-exclusive

Tek bir büyük “press blast” yerine küçük ama gerçek münhasırlıklar daha fazla bağımsız kaynak üretir. Her creator’a aynı build yerine farklı bir konum görseli, kısa tasarım notu veya yanıt paketi verilebilir. Bilgi gerçek ve tekrar kullanılabilir olmalı.

### 7.5 Query-gap loop

Her hafta AI radarı ve GSC’den şu dört boşluk seçilir:

- Harbor’ın hiç görünmediği yüksek niyetli sorgu
- Harbor’ın görünüp yanlış anlatıldığı sorgu
- Harbor’ın kaynak olarak değil yalnız ad olarak geçtiği sorgu
- Rakibin yalnız bağımsız kaynak avantajıyla kazandığı sorgu

Her boşluk için bir sayfa açmak yerine en uygun mevcut sayfa güncellenir; yalnız yeni arama niyeti varsa yeni sayfa üretilir.

### 7.6 Update velocity

Ayda bir büyük site güncellemesi yerine, doğrulanabilir küçük güncellemeler düzenli yayınlanır. Güncelleme tarihi gerçekten içerik değiştiğinde değiştirilir. Sahte “freshness” kullanılmaz.

## 8. Yapılmayacaklar

- Anahtar kelime doldurma ve görünmez metin
- Yüzlerce düşük kaliteli programatik landing page
- Uydurma çıkış ayı, fiyat, oyuncu sayısı, inceleme veya ödül
- Satın alınmış backlink, sahte Reddit konuşması, sahte Steam yorumu
- Rakip marka ile bağlantı varmış gibi “Mad Max universe” kullanımı
- Her videoyu aynı metinle farklı URL’de çoğaltma
- `llms.txt` dosyasını tek başına bir sıralama faktörü gibi görme
- AI crawler’lara açık olup kullanıcıya zayıf içerik sunma

## 9. 12 hafta sonrasında

`castilva.com` ikinci aşamada yalnız kurumsal entity güçlendirmesi için kullanılmalı:

- CastilvaGames organizasyon sayfası
- Harbor proje kartı ve canonical site/Steam bağlantısı
- Ekip ve gerçek uzmanlık bilgileri
- Basın iletişimi

İki domain aynı içerikleri kopyalamamalı. Harbor’ın derin içeriği `theharborgame.com` üzerinde kalmalı; `castilva.com` geliştirici kimliğini doğrulayan kurumsal kaynak olmalı.
