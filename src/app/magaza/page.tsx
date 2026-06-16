import type { Metadata } from "next";
import { products, PRODUCT_CATEGORIES } from "@/lib/data";
import { ProductFilterGrid } from "@/components/filter-grid";

export const metadata: Metadata = {
  title: "Mağaza",
  description: "Tişört, şapka, hoodie, poster ve aksesuar. Sanatçı onaylı, sınırlı üretim merch.",
};

export default function MagazaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Mağaza</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Sanatçı onaylı, sınırlı üretim merch. Türkiye&apos;den dünyaya kargo — üyelik ücreti yok,
          ürün başına ödersin.
        </p>
      </header>
      <ProductFilterGrid products={products} cats={PRODUCT_CATEGORIES} />
    </div>
  );
}
