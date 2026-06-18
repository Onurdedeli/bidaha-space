import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatTRY } from "@/lib/format";
import { ItemImage } from "./item-image";
import { Badge, Stars } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/magaza/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/5"
    >
      <div className="relative aspect-square">
        <ItemImage seed={product.slug} emoji={product.image} size="lg" className="h-full w-full" />
        {product.badge && (
          <div className="absolute left-3 top-3">
            <Badge tone="accent">{product.badge}</Badge>
          </div>
        )}
        {product.compareAtPrice && (
          <div className="absolute right-3 top-3">
            <Badge tone="danger">İndirim</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-xs font-semibold text-brand-soft">{product.artist}</span>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-brand-soft">
          {product.name}
        </h3>
        <Stars rating={product.rating} count={product.reviewCount} />
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatTRY(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted line-through">{formatTRY(product.compareAtPrice)}</span>
            )}
          </div>
          <span className="rounded-full bg-foreground px-3.5 py-1.5 text-xs font-semibold text-white transition-colors group-hover:bg-brand">
            İncele
          </span>
        </div>
      </div>
    </Link>
  );
}
