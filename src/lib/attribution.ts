/**
 * Pazarlama atfı (attribution) — web-first stratejinin veri sahipliği ayağı.
 * Ziyaretçinin geldiği kampanya/referans bilgisini yakalar ve saklar.
 * - first-touch: ilk gelişteki kaynak (asla üzerine yazılmaz)
 * - last-touch:  en son gelişteki kaynak (her ziyarette güncellenir)
 * Her form gönderimine / sipariş olayına iliştirilir.
 */

const KEY = "biletspace_attribution_v1";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

export interface Touch {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  ref?: string;
  landing?: string;
  referrer?: string;
  at?: string;
}

export interface Attribution {
  first?: Touch;
  last?: Touch;
}

function parseCurrent(): Touch | null {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const touch: Touch = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) touch[k] = v;
  }
  const ref = params.get("ref") || params.get("r");
  if (ref) touch.ref = ref;

  // Yalnızca anlamlı bir kaynak varsa kaydet
  const hasSource = Object.keys(touch).length > 0;
  if (!hasSource) return null;

  touch.landing = window.location.pathname;
  touch.referrer = document.referrer || undefined;
  touch.at = new Date().toISOString();
  return touch;
}

/** Sayfa yüklenince çağrılır (client). */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const current = parseCurrent();
  if (!current) return;
  try {
    const existing: Attribution = JSON.parse(localStorage.getItem(KEY) || "{}");
    const next: Attribution = {
      first: existing.first ?? current,
      last: current,
    };
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

/** Form/sipariş gönderiminde okunur. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}
