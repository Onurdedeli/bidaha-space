"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-provider";

const NAV = [
  { href: "/magaza", label: "Mağaza" },
  { href: "/sanatcilar", label: "Sanatçılar" },
  { href: "/anlar", label: "Anlar" },
  { href: "/panel", label: "Sanatçı Paneli" },
];

export function Navbar({ authSlot }: { authSlot?: React.ReactNode }) {
  const { count } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  function search(e: React.FormEvent) {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/magaza?q=${encodeURIComponent(term)}` : "/magaza");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-accent text-white">
            ★
          </span>
          <span className="text-lg">
            SuperStar<span className="text-brand"> Lab</span>
          </span>
        </Link>

        {/* arama */}
        <form onSubmit={search} className="hidden flex-1 md:flex md:max-w-md">
          <div className="flex w-full items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2">
            <span className="text-muted">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sanatçı, tür, ürün ara…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        </form>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-surface-2 text-foreground" : "text-muted hover:text-foreground"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {authSlot}
          <Link
            href="/sepet"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-surface-2"
            aria-label="Sepet"
          >
            <span className="text-lg">🛒</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border lg:hidden"
            aria-label="Menü"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-3 lg:hidden">
          <form onSubmit={search} className="mb-3 flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2">
            <span className="text-muted">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ara…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
