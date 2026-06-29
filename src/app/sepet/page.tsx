"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { ItemImage } from "@/components/item-image";
import { Button, ButtonLink, Badge } from "@/components/ui";
import { formatTRY } from "@/lib/format";
import { createOrder } from "@/lib/actions";
import { getAttribution } from "@/lib/attribution";

export default function SepetPage() {
  const { lines, subtotal, setQty, remove, clear, keyOf, count, ready } = useCart();
  const [done, setDone] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [placing, startPlacing] = useTransition();

  const shipping = count > 0 ? 89 : 0;
  const total = subtotal + shipping;

  function checkout() {
    startPlacing(async () => {
      const res = await createOrder(lines, getAttribution());
      if (res.orderId) setOrderId(res.orderId);
      clear();
      setDone(true);
    });
  }

  if (!ready) {
    return <div className="mx-auto max-w-3xl px-4 py-20 text-center text-muted">Yükleniyor…</div>;
  }

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="text-6xl">🎉</div>
        <h1 className="mt-4 text-3xl font-extrabold">Siparişin alındı!</h1>
        {orderId && (
          <p className="mt-2 font-mono text-sm text-muted">Sipariş no: #{orderId.slice(0, 8)}</p>
        )}
        <p className="mt-3 text-muted">
          {orderId
            ? "Siparişin kaydedildi (durum: beklemede). Ödeme entegrasyonu eklendiğinde tahsilat burada yapılacak; ürünlerin kargoya verilir."
            : "Bu bir demo ödemesidir; gerçek bir tahsilat yapılmadı."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <ButtonLink href="/hesabim" variant="outline" size="lg">Siparişlerim</ButtonLink>
          <ButtonLink href="/" variant="accent" size="lg">Ana sayfaya dön</ButtonLink>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="mt-4 text-2xl font-bold">Sepetin boş</h1>
        <p className="mt-2 text-muted">Sevdiğin sanatçının merch&apos;ini keşfet.</p>
        <div className="mt-6 flex justify-center gap-3">
          <ButtonLink href="/magaza" variant="accent">Mağazaya git</ButtonLink>
          <ButtonLink href="/sanatcilar" variant="outline">Sanatçılar</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold tracking-tight">Sepet</h1>
        <button onClick={clear} className="text-sm text-muted hover:text-danger">
          Sepeti boşalt
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3">
          {lines.map((l) => {
            const key = keyOf(l);
            return (
              <div
                key={key}
                className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-4"
              >
                <ItemImage emoji={l.image} size="sm" className="h-24 w-24 shrink-0 rounded-xl" />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-xs font-medium text-brand-soft">{l.artist}</span>
                      <Link
                        href={`/magaza/${l.slug}`}
                        className="block font-semibold hover:underline"
                      >
                        {l.name}
                      </Link>
                    </div>
                    <Badge tone="muted">Ürün</Badge>
                  </div>

                  {l.options && (
                    <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted">
                      {Object.entries(l.options).map(([k, v]) => (
                        <span key={k} className="rounded-md bg-surface-2 px-2 py-0.5">
                          {k}: {v}
                        </span>
                      ))}
                    </div>
                  )}
                  {l.note && <p className="mt-1 text-xs text-muted">📝 {l.note}</p>}

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-full border border-border">
                      <button onClick={() => setQty(key, l.quantity - 1)} className="px-3 py-1 text-lg">−</button>
                      <span className="w-8 text-center text-sm font-semibold tabular-nums">{l.quantity}</span>
                      <button onClick={() => setQty(key, l.quantity + 1)} className="px-3 py-1 text-lg">+</button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold">{formatTRY(l.unitPrice * l.quantity)}</span>
                      <button
                        onClick={() => remove(key)}
                        className="text-sm text-muted hover:text-danger"
                        aria-label="Kaldır"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUMMARY */}
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6">
            <h2 className="text-lg font-bold">Özet</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Ara toplam" value={formatTRY(subtotal)} />
              <Row label="Kargo" value={shipping === 0 ? "Ücretsiz" : formatTRY(shipping)} />
              <div className="my-3 border-t border-border" />
              <Row label="Toplam" value={formatTRY(total)} strong />
            </dl>
            <Button onClick={checkout} variant="accent" size="lg" className="mt-5 w-full" disabled={placing}>
              {placing ? "İşleniyor…" : "Ödemeye geç"}
            </Button>
            <p className="mt-3 text-center text-xs text-muted">
              Abonelik yok — yalnızca aldığın için ödersin. Demo ödeme; tahsilat yapılmaz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className={strong ? "font-bold" : "text-muted"}>{label}</dt>
      <dd className={strong ? "text-lg font-bold" : "font-medium"}>{value}</dd>
    </div>
  );
}
