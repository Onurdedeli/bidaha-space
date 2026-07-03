"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-provider";

function StarIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2l2.2 6.6L21 9l-5.4 4.1L17.6 20 12 16.2 6.4 20l2-6.9L3 9l6.8-.4z" />
    </svg>
  );
}

export function Navbar() {
  const { count } = useCart();
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
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        {/* wordmark */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <StarIcon className="h-5 w-5 text-accent" />
          <span className="font-display text-lg font-bold tracking-tight">StarLab</span>
        </Link>

        {/* arama */}
        <form onSubmit={search} className="hidden flex-1 justify-center md:flex">
          <div className="flex w-full max-w-md items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2">
            <span className="text-muted">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sanatçı, ürün ya da deneyim ara"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </div>
        </form>

        {/* sağ küme */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <button className="hidden text-sm font-medium text-muted hover:text-foreground sm:block">
            TR <span className="text-border">/</span> EN
          </button>
          <Link href="/hesabim" className="hidden text-sm font-medium text-foreground hover:text-muted sm:block">
            Giriş
          </Link>
          <Link
            href="/hesabim"
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-white hover:bg-brand-soft sm:block"
          >
            Üye Ol
          </Link>
          <Link
            href="/sepet"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border hover:bg-surface-2"
            aria-label="Sepet"
          >
            <span className="text-lg">🛒</span>
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-foreground">
                {count}
              </span>
            )}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-border md:hidden"
            aria-label="Menü"
          >
            ☰
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <form onSubmit={search} className="mb-3 flex items-center gap-2 rounded-full border border-border bg-surface-2 px-4 py-2">
            <span className="text-muted">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Sanatçı, ürün ya da deneyim ara"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            />
          </form>
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {[
              ["/magaza", "Mağaza"],
              ["/sanatcilar", "Sanatçılar"],
              ["/anlar", "Anlar"],
              ["/hesabim", "Giriş / Üye Ol"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-muted hover:bg-surface-2 hover:text-foreground"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
