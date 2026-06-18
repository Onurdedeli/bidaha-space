"use client";

import { useMemo, useState } from "react";
import type { SalesSummary } from "@/lib/sales";
import { formatTRY, formatCount } from "@/lib/format";

export function PanelDashboard({ summary }: { summary: SalesSummary }) {
  const [artist, setArtist] = useState<string>("all");

  const view = useMemo(() => {
    if (artist === "all") {
      return {
        revenue: summary.totalRevenue,
        units: summary.totalUnits,
        orders: summary.totalOrders,
        aov: summary.avgOrderValue,
        products: summary.topProducts,
        trend: sumTrends(summary.byArtist.map((a) => a.trend)),
      };
    }
    const a = summary.byArtist.find((x) => x.slug === artist)!;
    return {
      revenue: a.revenue,
      units: a.units,
      orders: a.orders,
      aov: a.orders ? Math.round(a.revenue / a.orders) : 0,
      products: a.products,
      trend: a.trend,
    };
  }, [artist, summary]);

  return (
    <div className="space-y-6">
      {/* sanatçı sekmeleri */}
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        <Tab active={artist === "all"} onClick={() => setArtist("all")} label="Tüm sanatçılar" />
        {summary.byArtist.map((a) => (
          <Tab key={a.slug} active={artist === a.slug} onClick={() => setArtist(a.slug)} label={a.name} />
        ))}
      </div>

      {/* KPI'lar */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi label="Toplam gelir" value={formatTRY(view.revenue)} icon="💰" />
        <Kpi label="Sipariş" value={formatCount(view.orders)} icon="🧾" />
        <Kpi label="Satılan adet" value={formatCount(view.units)} icon="📦" />
        <Kpi label="Ort. sepet" value={formatTRY(view.aov)} icon="📈" />
      </div>

      {/* gelir trendi */}
      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold">Gelir trendi · son 14 gün</h3>
          <span className="text-xs text-muted">demo</span>
        </div>
        <TrendBars data={view.trend} />
      </div>

      {/* ürün performansı */}
      <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
        <h3 className="mb-4 text-sm font-bold">Ürün performansı</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted">
                <th className="py-2 pr-3 font-semibold">Ürün</th>
                <th className="py-2 px-3 font-semibold">Sanatçı</th>
                <th className="py-2 px-3 text-right font-semibold">Adet</th>
                <th className="py-2 pl-3 text-right font-semibold">Gelir</th>
              </tr>
            </thead>
            <tbody>
              {view.products.map((p) => (
                <tr key={p.slug} className="border-b border-border/60 last:border-0">
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-surface-2 text-lg">
                        {p.image}
                      </span>
                      <span className="font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 text-muted">{p.artist}</td>
                  <td className="px-3 text-right tabular-nums">{formatCount(p.units)}</td>
                  <td className="pl-3 text-right font-semibold tabular-nums">{formatTRY(p.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function sumTrends(trends: number[][]): number[] {
  if (!trends.length) return [];
  return trends[0].map((_, i) => trends.reduce((s, t) => s + (t[i] ?? 0), 0));
}

function Tab({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active ? "border-brand bg-brand/10 text-brand" : "border-border text-muted hover:text-foreground"
      }`}
    >
      {label}
    </button>
  );
}

function Kpi({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted">{label}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="mt-2 text-2xl font-extrabold tracking-tight">{value}</div>
    </div>
  );
}

function TrendBars({ data }: { data: number[] }) {
  const max = Math.max(1, ...data);
  return (
    <div className="flex h-32 items-end gap-1.5">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 rounded-t bg-gradient-to-t from-brand to-accent transition-all"
          style={{ height: `${Math.max(6, (v / max) * 100)}%` }}
          title={formatTRY(v)}
        />
      ))}
    </div>
  );
}
