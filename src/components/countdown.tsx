"use client";

import { useEffect, useState } from "react";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  const s = Math.floor(ms / 1000);
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
    done: ms === 0,
  };
}

export function Countdown({ endsAt, compact = false }: { endsAt: string; compact?: boolean }) {
  const target = new Date(endsAt).getTime();
  // null until mounted — avoids SSR/client hydration mismatch on the live clock.
  const [t, setT] = useState<ReturnType<typeof diff> | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!t) {
    return (
      <span className={compact ? "font-mono text-sm font-semibold text-accent" : "text-sm text-muted"}>
        {compact ? "--:--:--" : "Yükleniyor…"}
      </span>
    );
  }

  if (t.done) {
    return <span className="text-sm font-semibold text-danger">Pencere kapandı</span>;
  }

  if (compact) {
    return (
      <span className="font-mono text-sm font-semibold tabular-nums text-accent">
        {t.d > 0 && `${t.d}g `}
        {String(t.h).padStart(2, "0")}:{String(t.m).padStart(2, "0")}:{String(t.s).padStart(2, "0")}
      </span>
    );
  }

  const cells: [number, string][] = [
    [t.d, "gün"],
    [t.h, "saat"],
    [t.m, "dk"],
    [t.s, "sn"],
  ];

  return (
    <div className="flex gap-2">
      {cells.map(([v, label]) => (
        <div
          key={label}
          className="flex min-w-14 flex-col items-center rounded-xl border border-border bg-surface-2 px-2 py-1.5"
        >
          <span className="font-mono text-xl font-bold tabular-nums">{String(v).padStart(2, "0")}</span>
          <span className="text-[10px] uppercase tracking-wide text-muted">{label}</span>
        </div>
      ))}
    </div>
  );
}
