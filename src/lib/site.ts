/**
 * Kanonik site URL'i. Production'da Vercel'de NEXT_PUBLIC_SITE_URL = https://www.superstar.co
 * ayarlanır; aksi halde Vercel production alias'ına düşer.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://www.superstar.co")
).replace(/\/$/, "");

export const SITE_NAME = "SuperStar Lab";
export const SITE_DESCRIPTION =
  "Sanatçı, hayran ve üretim arasındaki köprü. Sevdiğin sanatçının lisanslı merch'ini seç, kişiselleştir, satın al — sanatçılar satışlarını panelden yönetir.";
