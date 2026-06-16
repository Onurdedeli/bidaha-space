/**
 * Kanonik site URL'i. Domain netleşince (örn. bidaha.space) Vercel'de
 * NEXT_PUBLIC_SITE_URL env'i ayarlanır; aksi halde production alias'a düşer.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://biletspace.vercel.app")
).replace(/\/$/, "");

export const SITE_NAME = "Bidahaspace";
export const SITE_DESCRIPTION =
  "Türk müziğinde sanatçı ve hayranı buluşturan pazar yeri. Merch, sanatçıyla başbaşa deneyimler, kişiye özel mesajlar ve topluluk — an bazlı, gerçek bağ.";
