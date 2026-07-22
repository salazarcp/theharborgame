# Harbor Visibility Tracker

Bu dosya yaşayan kontrol listesidir. Her cuma güncellenir. Durum değerleri: `TODO`, `IN PROGRESS`, `BLOCKED`, `DONE`.

## A. Teknik ve ölçüm

| ID | İş | Sorumlu | Durum | Tamamlanma kanıtı |
|---|---|---|---|---|
| T-01 | Oyun adını yalnız Harbor olarak tekilleştir | Site | IN PROGRESS | Canlı kaynaklarda yanlış ad varyantı yok |
| T-02 | 2026 çıkış penceresi, gün/ay yok | Site + Steam | IN PROGRESS | Site/Steam/facts aynı |
| T-03 | Steam açık, Epic planlı/page pending bilgisini eşitle | Site | IN PROGRESS | EN/TR release ve facts doğrulandı |
| T-04 | GA4 `G-XMBR4ENVMK` entegrasyonu | Site | IN PROGRESS | Kabul sonrası Realtime page_view |
| T-05 | Consent-first yükleme | Site | IN PROGRESS | Kabul öncesi `gtag/js` isteği yok |
| T-04A | `prime-ecd60` GA4 mülkünün Harbor’a ayrıldığını doğrula/yeniden adlandır | CastilvaGames | TODO | Başka Firebase verisiyle karışmadığı doğrulandı |
| T-06 | `steam_store_click` | Site | IN PROGRESS | GA4 DebugView event |
| T-07 | `trailer_click` ve `discord_click` | Site | IN PROGRESS | GA4 DebugView event |
| T-08 | Newsletter `sign_up` | Site | IN PROGRESS | Yalnız başarılı API yanıtında event |
| T-09 | GA4 key event ayarları | CastilvaGames | TODO | Steam click + sign_up key event |
| T-10 | GSC 10 canonical URL kontrolü | CastilvaGames | TODO | URL Inspection ekran kaydı |
| T-11 | Steamworks wishlist baz çizgisi | CastilvaGames | TODO | Tarihli CSV/screenshot |
| T-12 | Ana fragman VideoObject | Site | IN PROGRESS | Rich Results/schema doğrulama |
| T-13 | Steam klipleri için 4 watch page | Site + Video | TODO | 4 canonical URL + VideoObject |
| T-14 | Video sitemap | Site | TODO | GSC gönderildi |

## B. Entity ve içerik

| ID | İş | Sorumlu | Durum | Bağımlılık |
|---|---|---|---|---|
| E-01 | Ana descriptor: competitive post-apocalyptic open-world survival | Tüm kanallar | IN PROGRESS | Yayın sonrası doğrulama |
| E-02 | 1–2–2 hafıza kancasını kullan | Editorial | TODO | Steam News #1 |
| E-03 | Steam App ID 2714930 şeması | Site | IN PROGRESS | Build doğrulama |
| E-04 | Steam kısa/uzun açıklama uyumu | CastilvaGames | TODO | Steamworks erişimi |
| E-05 | Epic resmi ürün URL’si | CastilvaGames | BLOCKED | Epic sayfası yayınlanmalı |
| E-06 | Press kit creator paketini genişlet | Editorial | TODO | Klip master dosyaları |
| E-07 | Gerçek geliştirici byline/biyografi | CastilvaGames | TODO | Yayınlanabilir isimler |
| E-08 | Aylık facts changelog | Editorial | TODO | İlk dev note |

## C. Steam News yayın kuyruğu

| # | Başlık | Ana sayfa | Klip | Durum |
|---:|---|---|---|---|
| 1 | What Is Harbor? One Safe Zone. Two Critical Resources. | `/gameplay/` | 45 sn identity | DRAFT READY |
| 2 | Inside Harbor: The Only Safe Zone in the Wasteland | `/gameplay/#safe-zone-economy` | Harbor Bar | TODO |
| 3 | Clean Blood and Fuel: The Economy of Survival | `/gameplay/#resources` | Resource loop | TODO |
| 4 | Building for Survival: Workbenches and Three Upgrade Tiers | `/gameplay/#building-crafting` | Building | TODO |
| 5 | A Tour of Harbor’s Wasteland | Ana sayfa/new map | Map locations | TODO |
| 6 | Blackrail and the War Truck: Moving Resource Targets | `/gameplay/#vehicles-objectives` | Moving targets | TODO |
| 7 | Harbor PC Requirements and the 2026 Release Window | `/release/` | PC/release | TODO |
| 8 | How Community Feedback Will Shape Harbor | Steam EA FAQ + site | Dev diary | TODO |

## D. Earned media ve creator

| ID | İş | Durum | Hedef |
|---|---|---|---|
| P-01 | 25 yayın/creator listesi | TODO | 10 survival, 5 PvP, 5 indie PC, 5 TR |
| P-02 | 3 pitch varyantı | TODO | Creator / basın / Türkçe |
| P-03 | 5 micro-exclusive teklif | TODO | 5 kişiselleştirilmiş paket |
| P-04 | Bağımsız kaynak sayısı | TODO | 12 haftada ≥5 alakalı domain |
| P-05 | Yanlış bilgi düzeltme logu | TODO | İsim/tarih/platform hataları |

## E. Haftalık scorecard

| Hafta | GSC tıklama | GSC gösterim | Indexed / 10 | AI cevap payı | ChatGPT | Perplexity | Gemini | Claude | Google AI | Steam clicks | Newsletter | Wishlist delta | Bağımsız citation |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| Baseline | — | — | — | 20/209 (%10) | 3/40 | 3/40 | 4/40 | 0/9 | 10/80 | — | — | — | — |
| W1 | | | | | | | | | | | | | |
| W2 | | | | | | | | | | | | | |
| W3 | | | | | | | | | | | | | |
| W4 | | | | | | | | | | | | | |
| W6 | | | | | | | | | | | | | |
| W8 | | | | | | | | | | | | | |
| W10 | | | | | | | | | | | | | |
| W12 | | | | | | | | | | | | | |

Not: “Google AI” sütunu AI Overviews + AI Mode toplamıdır; ayrıntı ham raporda ayrı tutulur.

## F. Yayın öncesi kontrol

- [ ] Başlıkta oyun adı Harbor mı?
- [ ] CastilvaGames doğru yazılmış mı?
- [ ] Release yalnız 2026 mı; gün/ay uydurulmuş mu?
- [ ] Steam App ID/link doğru mu?
- [ ] Epic linki yalnız gerçek ürün URL’si varsa mı kullanılmış?
- [ ] İlk paragraf soruyu doğrudan cevaplıyor mu?
- [ ] Bilinen ve açıklanmayan bilgiler ayrılmış mı?
- [ ] Görsellerin hakları CastilvaGames’e ait mi ve alt metni var mı?
- [ ] En az bir özgün bilgi/kanıt var mı?
- [ ] Site linkinde standart UTM var mı?
- [ ] Steam CTA ve ölçüm kontrol edildi mi?
- [ ] Mad Max/Rust/DayZ/SCUM ile bağlantı veya üstünlük iddiası yok mu?
- [ ] Vehicle combat genel vaat yapılmamış mı?
- [ ] Yayın sonrası URL, tarih, GA4 ve Steamworks kanıtı tracker’a işlendi mi?
