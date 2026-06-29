"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { HeroSlide } from "@/lib/home";

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = scroller.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / (el.scrollWidth / slides.length));
    setActive(Math.min(slides.length - 1, Math.max(0, idx)));
  }

  function goTo(i: number) {
    const el = scroller.current;
    if (!el) return;
    el.scrollTo({ left: (el.scrollWidth / slides.length) * i, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1"
      >
        {slides.map((s) => (
          <Link
            key={s.artistSlug}
            href={`/sanatci/${s.artistSlug}`}
            className="group relative flex min-w-[85%] snap-start flex-col justify-end overflow-hidden rounded-3xl p-7 sm:min-w-[60%] lg:min-w-[46%]"
            style={{ height: 320, backgroundColor: s.accent }}
          >
            {/* sanatçı fotoğrafı */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/artists/${s.artistSlug}.jpg`}
              alt={s.artist}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* accent + koyu gradyan overlay (metin okunurluğu) */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(180deg, ${s.accent}55 0%, transparent 35%, rgba(22,19,27,0.35) 60%, rgba(22,19,27,0.88) 100%)`,
              }}
            />

            <div className="relative">
              <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-foreground">
                {s.tag}
              </span>
              <h3 className="font-display text-3xl font-bold leading-tight text-white drop-shadow sm:text-4xl">
                {s.artist}
              </h3>
              <p className="mt-1 text-sm text-white/90 drop-shadow">{s.collectionTitle}</p>
              <span className="mt-5 inline-flex w-fit items-center gap-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-foreground transition-transform group-hover:translate-x-0.5">
                Koleksiyonu Gör →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* dots */}
      <div className="mt-4 flex justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.artistSlug}
            onClick={() => goTo(i)}
            aria-label={`${i + 1}. banner`}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-foreground" : "w-2 bg-border"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
