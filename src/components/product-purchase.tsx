"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { useCart } from "./cart-provider";
import { Button } from "./ui";
import { formatTRY } from "@/lib/format";

export function ProductPurchase({ product }: { product: Product }) {
  const { add } = useCart();
  const router = useRouter();
  const [size, setSize] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(product.colors?.[0]?.value ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const needsSize = !!product.sizes?.length;
  const needsColor = !!product.colors?.length;
  const canAdd = (!needsSize || size) && (!needsColor || color);

  function buildLine() {
    const options: Record<string, string> = {};
    if (size) options["Beden"] = size;
    if (color) options["Renk"] = color;
    return {
      itemId: product.id,
      type: "product" as const,
      slug: product.slug,
      name: product.name,
      artist: product.artist,
      image: product.image,
      unitPrice: product.price,
      quantity: qty,
      options: Object.keys(options).length ? options : undefined,
    };
  }

  function handleAdd() {
    if (!canAdd) return;
    add(buildLine());
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  function handleBuyNow() {
    if (!canAdd) return;
    add(buildLine());
    router.push("/sepet");
  }

  return (
    <div className="space-y-5">
      {needsColor && (
        <Selector
          title="Renk"
          options={product.colors!.map((c) => ({ value: c.value, disabled: c.stock === 0 }))}
          selected={color}
          onSelect={setColor}
        />
      )}
      {needsSize && (
        <Selector
          title="Beden"
          options={product.sizes!.map((s) => ({ value: s.value, disabled: s.stock === 0 }))}
          selected={size}
          onSelect={setSize}
        />
      )}

      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-muted">Adet</span>
        <div className="flex items-center rounded-full border border-border">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1.5 text-lg">
            −
          </button>
          <span className="w-8 text-center font-semibold tabular-nums">{qty}</span>
          <button onClick={() => setQty((q) => Math.min(10, q + 1))} className="px-3 py-1.5 text-lg">
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleAdd} variant="outline" size="lg" disabled={!canAdd} className="flex-1">
          {added ? "✓ Sepete eklendi" : "Sepete ekle"}
        </Button>
        <Button onClick={handleBuyNow} variant="accent" size="lg" disabled={!canAdd} className="flex-1">
          Hemen al · {formatTRY(product.price * qty)}
        </Button>
      </div>
      {!canAdd && (
        <p className="text-xs text-muted">
          Devam etmek için {needsColor && !color ? "renk" : ""}
          {needsColor && !color && needsSize && !size ? " ve " : ""}
          {needsSize && !size ? "beden" : ""} seç.
        </p>
      )}
    </div>
  );
}

function Selector({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: { value: string; disabled?: boolean }[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-muted">{title}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            disabled={o.disabled}
            onClick={() => onSelect(o.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected === o.value
                ? "border-brand bg-brand/15 text-brand-soft"
                : "border-border hover:border-foreground/40"
            } ${o.disabled ? "cursor-not-allowed opacity-40 line-through" : ""}`}
          >
            {o.value}
          </button>
        ))}
      </div>
    </div>
  );
}
