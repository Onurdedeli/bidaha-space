"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatTRY } from "@/lib/format";
import { getArtistByName } from "@/lib/artists";
import { ItemImage } from "./item-image";
import { Stars } from "./ui";
import { useCart } from "./cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const accent = getArtistByName(product.artist)?.accent ?? "#16131b";

  const needsChoice =
    !!product.sizes?.length || !!product.colors?.length || !!product.models?.length;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    if (needsChoice) {
      router.push(`/magaza/${product.slug}`);
      return;
    }
    add({
      itemId: product.id,
      type: "product",
      slug: product.slug,
      name: product.name,
      artist: product.artist,
      image: product.image,
      unitPrice: product.price,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Link
      href={`/magaza/${product.slug}`}
      className="card-hover group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="relative aspect-square">
        <ItemImage emoji={product.image} accent={accent} src={product.photo} size="lg" className="h-full w-full" />
        {/* accent nokta */}
        <span
          className="absolute left-3 top-3 h-2.5 w-2.5 rounded-full ring-2 ring-white"
          style={{ backgroundColor: accent }}
          aria-hidden
        />
        {product.badge && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: accent }}>
          {product.artist}
        </span>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
          {product.name}
        </h3>
        <Stars rating={product.rating} count={product.reviewCount} />

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold">{formatTRY(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted line-through">{formatTRY(product.compareAtPrice)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="shrink-0 rounded-full bg-foreground px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-brand-soft"
          >
            {added ? "✓ Eklendi" : "Sepete Ekle"}
          </button>
        </div>
      </div>
    </Link>
  );
}
