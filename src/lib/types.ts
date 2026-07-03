export type ProductCategory =
  | "tshirt"
  | "hoodie"
  | "sapka"
  | "set"
  | "vinyl"
  | "photocard"
  | "lightstick"
  | "poster"
  | "pin"
  | "aksesuar";

export type ExperienceCategory = "yemek" | "mesaj" | "backstage" | "ders" | "gorusme";

export interface ProductVariant {
  /** e.g. size or color */
  label: string;
  value: string;
  /** stock count; 0 = tükendi */
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  type: "product";
  name: string;
  category: ProductCategory;
  artist: string;
  price: number;
  compareAtPrice?: number;
  currency: "TRY";
  image: string;
  /** gerçek ürün görseli (public/...) — varsa emoji yerine gösterilir */
  photo?: string;
  gallery?: string[];
  badge?: string;
  description: string;
  /** size options */
  sizes?: ProductVariant[];
  /** color options */
  colors?: ProductVariant[];
  /** model/baskı tasarımı seçenekleri (hiper-kişiselleştirme) */
  models?: ProductVariant[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export interface Experience {
  id: string;
  slug: string;
  type: "experience";
  name: string;
  category: ExperienceCategory;
  artist: string;
  price: number;
  currency: "TRY";
  image: string;
  badge?: string;
  /** short tagline */
  tagline: string;
  description: string;
  /** ne dahil */
  includes: string[];
  /** süre, ör. "60 dk" */
  duration: string;
  /** teslim/gerçekleşme şekli */
  delivery: string;
  /** kontenjan / kalan slot */
  slotsLeft: number;
  location?: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export type CatalogItem = Product | Experience;

export interface CartLine {
  itemId: string;
  type: "product" | "experience";
  slug: string;
  name: string;
  artist: string;
  image: string;
  unitPrice: number;
  quantity: number;
  /** chosen variant labels, e.g. { Beden: "L", Renk: "Siyah" } */
  options?: Record<string, string>;
  /** experience: alıcı / personalizasyon notu */
  note?: string;
}
