import Link from "next/link";
import type { Product, Experience } from "@/lib/types";
import { formatTRY } from "@/lib/format";
import { ItemImage } from "./item-image";
import { Badge, Stars } from "./ui";

export function ProductCard({ product }: { product: Product }) {
  const soldOut =
    product.sizes?.every((s) => s.stock === 0) ?? false;
  return (
    <Link
      href={`/magaza/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-all hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5"
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
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium text-brand-soft">{product.artist}</span>
        <h3 className="line-clamp-2 font-semibold leading-snug group-hover:text-brand-soft">
          {product.name}
        </h3>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatTRY(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-muted line-through">{formatTRY(product.compareAtPrice)}</span>
            )}
          </div>
          <Stars rating={product.rating} />
        </div>
      </div>
    </Link>
  );
}

export function ExperienceCard({ experience }: { experience: Experience }) {
  const scarce = experience.slotsLeft <= 3;
  return (
    <Link
      href={`/deneyimler/${experience.slug}`}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface transition-all hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="relative aspect-[4/3]">
        <ItemImage seed={experience.slug} emoji={experience.image} size="lg" className="h-full w-full" />
        <div className="absolute left-3 top-3 flex gap-2">
          {experience.badge && <Badge tone="brand">{experience.badge}</Badge>}
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <Badge tone="muted">⏱ {experience.duration}</Badge>
          {scarce && <Badge tone="danger">Son {experience.slotsLeft} kontenjan</Badge>}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-medium text-accent">{experience.artist}</span>
        <h3 className="font-semibold leading-snug group-hover:text-accent">{experience.name}</h3>
        <p className="line-clamp-2 text-sm text-muted">{experience.tagline}</p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-lg font-bold">{formatTRY(experience.price)}</span>
          <Stars rating={experience.rating} count={experience.reviewCount} />
        </div>
      </div>
    </Link>
  );
}
