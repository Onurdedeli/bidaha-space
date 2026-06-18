import { products } from "./data";
import { artists } from "./artists";

export interface ProductSales {
  slug: string;
  name: string;
  artist: string;
  category: string;
  image: string;
  price: number;
  units: number;
  revenue: number;
}

export interface ArtistSales {
  slug: string;
  name: string;
  units: number;
  revenue: number;
  orders: number;
  products: ProductSales[];
  /** son 14 günlük gelir trendi (demo) */
  trend: number[];
}

export interface SalesSummary {
  totalRevenue: number;
  totalUnits: number;
  totalOrders: number;
  avgOrderValue: number;
  byArtist: ArtistSales[];
  topProducts: ProductSales[];
  source: "demo" | "db";
}

/** deterministik sözde-rastgele (slug'dan) — demo verisi her render'da aynı kalsın */
function seeded(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 1000) / 1000;
}

function buildProductSales(): ProductSales[] {
  return products.map((p) => {
    // reviewCount satış için makul bir vekil; deterministik bir çarpanla ölçekle
    const units = Math.round(p.reviewCount * (1.4 + seeded(p.slug) * 1.6));
    return {
      slug: p.slug,
      name: p.name,
      artist: p.artist,
      category: p.category,
      image: p.image,
      price: p.price,
      units,
      revenue: units * p.price,
    };
  });
}

/**
 * Satış özeti. DB bağlıyken gerçek sipariş kalemlerinden toplanır; aksi halde
 * deterministik demo verisi üretilir (panel tasarımı boş görünmesin diye).
 */
export function getSalesSummary(): SalesSummary {
  const ps = buildProductSales();

  const byArtist: ArtistSales[] = artists.map((a) => {
    const items = ps.filter((p) => p.artist === a.name);
    const units = items.reduce((s, p) => s + p.units, 0);
    const revenue = items.reduce((s, p) => s + p.revenue, 0);
    const base = seeded(a.slug);
    const trend = Array.from({ length: 14 }, (_, i) => {
      const wobble = seeded(`${a.slug}-${i}`);
      return Math.round((revenue / 14) * (0.6 + wobble * 0.9) * (1 + Math.sin(i / 2 + base * 6) * 0.2));
    });
    return {
      slug: a.slug,
      name: a.name,
      units,
      revenue,
      orders: Math.max(1, Math.round(units / (2.2 + base))),
      products: items.sort((x, y) => y.revenue - x.revenue),
      trend,
    };
  });

  const totalRevenue = byArtist.reduce((s, a) => s + a.revenue, 0);
  const totalUnits = byArtist.reduce((s, a) => s + a.units, 0);
  const totalOrders = byArtist.reduce((s, a) => s + a.orders, 0);

  return {
    totalRevenue,
    totalUnits,
    totalOrders,
    avgOrderValue: totalOrders ? Math.round(totalRevenue / totalOrders) : 0,
    byArtist: byArtist.sort((x, y) => y.revenue - x.revenue),
    topProducts: [...ps].sort((x, y) => y.revenue - x.revenue).slice(0, 8),
    source: "demo",
  };
}
