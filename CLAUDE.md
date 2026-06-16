# Biletspace — Merch & Deneyim Pazarı

Türk müziğinde **sanatçı–hayran bağını** merch + deneyim + topluluk üzerinden kuran, çok-sanatçılı
pazar yeri. Konsepti: **Cameo + Weverse'ün küçük, abonelik-paywall'suz, Türkiye merkezli ama
global'e açık** versiyonu. Sıradan e-ticaret değil — **an bazlı** (konser/çıkış pencereleri
etrafında) çalışır; duygusal bağ ve aidiyet satar.

## Çekirdek prensipler
- **Abonelik / paywall yok** — topluluğa katılım ücretsiz; ödeme yalnızca ürün/deneyim başına.
- **An bazlı** — `Anlar` (drop'lar) konser ve çıkış pencerelerinde açılır, geri sayımla kapanır.
- **İki tür katalog** — fiziksel merch (tişört, şapka, hoodie, aksesuar, poster) + deneyimler
  (sanatçıyla yemek, kişiye özel video mesaj, backstage, birebir ders, görüntülü görüşme).
- **Türkiye merkezli, global'e açık** — TRY fiyatlandırma, Türkiye + global kargo dili.

## Teknoloji
Next.js 16 (App Router, Turbopack) · React 19 · TypeScript · Tailwind CSS v4 (tema `globals.css`).
Katalog statik mock (`src/lib`). Sepet & topluluk üyeliği `localStorage`.
**DB:** Neon Postgres + Drizzle ORM (`src/lib/db`). **Auth:** Clerk. **Analytics:** Vercel Analytics.

### Env-gated pattern (önemli)
DB ve auth **anahtar yoksa devre dışı kalır, site yine de çalışır/build olur**:
- `DATABASE_URL` yoksa → `src/lib/db` `null` döner, `/api/subscribe` loglamaya düşer (`persisted:false`).
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` yoksa → `authEnabled=false`; ClerkProvider/middleware/UserButton devre dışı, `/hesabim` bilgi sayfası gösterir.
Anahtarlar Vercel'e eklenince ikisi de otomatik devreye girer. Env şablonu: `.env.example`.

### Veri & pazarlama katmanı (web-first)
- Atıf: `src/lib/attribution.ts` + `AttributionTracker` — UTM/`ref` first+last touch, `localStorage`.
- E-posta: `EmailCapture` → `/api/subscribe` (atıf + KVKK onayı; DB'ye upsert).
- KVKK: `CookieConsent` banner. SEO: `sitemap.ts`, `robots.ts`, dinamik `opengraph-image.tsx`.

## Provisioning (DB + Auth'u açmak)
1. **Neon:** Vercel Dashboard → Storage/Marketplace → Neon, projeye bağla (DATABASE_URL otomatik eklenir).
   Veya `npx vercel integration add neon --scope onur-s-projects1` (tarayıcı OAuth).
2. **Clerk:** Vercel Marketplace → Clerk (anahtarlar otomatik eklenir) veya clerk.com'dan alıp `vercel env add`.
3. Lokale çek + tabloyu oluştur: `vercel env pull .env.local && npm run db:push`
4. Redeploy: `npx vercel deploy --prod --scope onur-s-projects1`
Migration SQL: `drizzle/0000_*.sql` (drizzle-kit ile üretildi).

## Çalıştırma
```bash
npm run dev     # http://localhost:3000
npm run build   # üretim derlemesi (SSG)
```

## Yapı
```
src/lib/         types.ts, data.ts (ürün+deneyim), artists.ts, drops.ts, format.ts
src/components/  cart-provider (localStorage sepet), cards, navbar, footer, countdown,
                 product-purchase, experience-booking, join-community, item-image, filter-grid, ui
src/app/         / (ana), /magaza[/slug], /deneyimler[/slug], /sanatcilar, /sanatci/[slug],
                 /anlar, /sepet
```

## Görseller
Harici görsel bağımlılığı yok. `ItemImage` slug'dan deterministik gradyan + emoji üretir.
Gerçek görsellere geçilince `next/image` + `remotePatterns` eklenmeli.

## Sıradaki adımlar (öneri)
Gerçek auth (Clerk), DB (Neon Postgres — Vercel Marketplace), ödeme (iyzico/Stripe),
sanatçı paneli, drop'lar için gerçek konser takvimi entegrasyonu, çoklu dil (TR/EN) & kur.
