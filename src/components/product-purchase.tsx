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
  const [model, setModel] = useState<string | null>(product.models?.[0]?.value ?? null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const needsSize = !!product.sizes?.length;
  const needsColor = !!product.colors?.length;
  const needsModel = !!product.models?.length;
  const canAdd = (!needsSize || size) && (!needsColor || color) && (!needsModel || model);

  function buildLine() {
    const options: Record<string, string> = {};
    if (model) options["Model"] = model;
    if (color) options["Renk"] = color;
    if (size) options["Beden"] = size;
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

  const missing = [
    needsModel && !model ? "model" : "",
    needsColor && !color ? "renk" : "",
    needsSize && !size ? "beden" : "",
  ].filter(Boolean);

  return (
    <div className="space-y-5">
      {needsModel && (
        <Selector
          title="Model · baskı tasarımı"
          step={1}
          options={product.models!.map((m) => ({ value: m.value, disabled: m.stock === 0 }))}
          selected={model}
          onSelect={setModel}
        />
      )}
      {needsColor && (
        <Selector
          title="Renk"
          step={needsModel ? 2 : 1}
          options={product.colors!.map((c) => ({ value: c.value, disabled: c.stock === 0 }))}
          selected={color}
          onSelect={setColor}
        />
      )}
      {needsSize && (
        <Selector
          title="Beden"
          step={(needsModel ? 1 : 0) + (needsColor ? 1 : 0) + 1}
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
      {!canAdd && missing.length > 0 && (
        <p className="text-xs text-muted">Devam etmek için {missing.join(", ")} seç.</p>
      )}
    </div>
  );
}

function Selector({
  title,
  step,
  options,
  selected,
  onSelect,
}: {
  title: string;
  step?: number;
  options: { value: string; disabled?: boolean }[];
  selected: string | null;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-sm font-medium text-muted">
        {step != null && (
          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand/10 text-[11px] font-bold text-brand">
            {step}
          </span>
        )}
        {title}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o.value}
            disabled={o.disabled}
            onClick={() => onSelect(o.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected === o.value
                ? "border-brand bg-brand/10 text-brand"
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
