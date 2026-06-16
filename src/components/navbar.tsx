"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "./cart-provider";

const NAV = [
  { href: "/magaza", label: "Mağaza" },
  { href: "/deneyimler", label: "Deneyimler" },
  { href: "/sanatcilar", label: "Sanatçılar" },
  { href: "/anlar", label: "Anlar" },
];

export function Navbar({ authSlot }: { authSlot?: React.ReactNode }) {
  const { count } = useCart();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand text-white">B</span>
          <span className="text-lg">
            bidaha<span className="text-accent">space</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
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
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-black">
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
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
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
      )}
    </header>
  );
}
