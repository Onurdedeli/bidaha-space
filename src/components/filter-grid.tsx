"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./cards";

interface Cat {
  value: string;
  label: string;
  emoji: string;
}

function Chips({
  cats,
  active,
  onPick,
}: {
  cats: Cat[];
  active: string;
  onPick: (v: string) => void;
}) {
  const all = [{ value: "all", label: "Tümü", emoji: "✨" }, ...cats];
  return (
    <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
      {all.map((c) => (
        <button
          key={c.value}
          onClick={() => onPick(c.value)}
          className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            active === c.value
              ? "border-brand bg-brand/10 text-brand"
              : "border-border text-muted hover:text-foreground"
          }`}
        >
          <span>{c.emoji}</span>
          {c.label}
        </button>
      ))}
    </div>
  );
}

export function ProductFilterGrid({ products, cats }: { products: Product[]; cats: Cat[] }) {
  const [active, setActive] = useState("all");
  const list = active === "all" ? products : products.filter((p) => p.category === active);
  return (
    <>
      <Chips cats={cats} active={active} onPick={setActive} />
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {list.length === 0 && <Empty />}
    </>
  );
}

function Empty() {
  return (
    <div className="rounded-[var(--radius-card)] border border-dashed border-border py-16 text-center text-muted">
      Bu kategoride henüz ürün yok. Yakında!
    </div>
  );
}
