import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, PRODUCT_CATEGORIES } from "@/lib/data";
import { getArtistByName } from "@/lib/artists";
import { ItemImage } from "@/components/item-image";
import { ProductPurchase } from "@/components/product-purchase";
import { ProductCard } from "@/components/cards";
import { Badge, Stars, Section } from "@/components/ui";
import { formatTRY } from "@/lib/format";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return { title: "Ürün bulunamadı" };
  return { title: p.name, description: p.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const cat = PRODUCT_CATEGORIES.find((c) => c.value === product.category);
  const artist = getArtistByName(product.artist);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
        <Link href="/magaza" className="hover:text-foreground">Mağaza</Link>
        <span>/</span>
        <span className="text-foreground">{cat?.label}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <ItemImage
            emoji={product.image}
            accent={artist?.accent}
            src={product.photo}
            size="lg"
            className="aspect-square w-full rounded-[var(--radius-card)] border border-border"
          />
          <div className="grid grid-cols-4 gap-3">
            {["✨", "📦", "🚚", "↩️"].map((e, i) => (
              <div
                key={i}
                className="grid aspect-square place-items-center rounded-xl border border-border bg-surface text-2xl"
              >
                {e}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2">
            {artist ? (
              <Link href={`/sanatci/${artist.slug}`} className="text-sm font-semibold text-brand-soft hover:underline">
                {product.artist}
              </Link>
            ) : (
              <span className="text-sm font-semibold text-brand-soft">{product.artist}</span>
            )}
            {product.badge && <Badge tone="accent">{product.badge}</Badge>}
          </div>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{product.name}</h1>
          <div className="mt-3 flex items-center gap-4">
            <Stars rating={product.rating} count={product.reviewCount} />
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatTRY(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-lg text-muted line-through">{formatTRY(product.compareAtPrice)}</span>
            )}
          </div>

          <p className="mt-5 text-muted">{product.description}</p>

          <div className="mt-7">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-7 grid grid-cols-3 gap-3 text-center text-xs text-muted">
            <Perk icon="🚚" text="Türkiye geneli + global kargo" />
            <Perk icon="↩️" text="14 gün iade" />
            <Perk icon="✅" text="Sanatçı onaylı orijinal" />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <Section title="Benzer ürünler">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Perk({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-3">
      <div className="text-lg">{icon}</div>
      <div className="mt-1">{text}</div>
    </div>
  );
}
