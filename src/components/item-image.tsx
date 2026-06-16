import { hueFromSeed } from "@/lib/format";

interface Props {
  seed: string;
  emoji: string;
  className?: string;
  /** emoji size class */
  size?: "sm" | "md" | "lg";
  label?: string;
}

const sizeMap = {
  sm: "text-4xl sm:text-5xl",
  md: "text-6xl sm:text-7xl",
  lg: "text-7xl sm:text-8xl",
} as const;

/**
 * Afilli jeneratif kapak: triadik canlı palet + dönen aurora + üç parlak orb +
 * ışık süpürme + neon emoji glow + grain/nokta doku + vignette. Harici görsel yok,
 * slug'dan deterministik. Her ürün/deneyim için canlı, enerjik, tutarlı bir kapak.
 */
export function ItemImage({ seed, emoji, className = "", size = "md", label }: Props) {
  // Triadik palet — üç canlı renk
  const h1 = hueFromSeed(seed);
  const h2 = (h1 + 130) % 360;
  const h3 = (h1 + 250) % 360;

  const base = {
    backgroundColor: `hsl(${h1} 55% 7%)`,
    backgroundImage: `
      radial-gradient(120% 115% at 6% -5%, hsl(${h1} 90% 32% / 0.95), transparent 52%),
      radial-gradient(115% 115% at 102% 105%, hsl(${h3} 90% 30% / 0.92), transparent 52%),
      radial-gradient(90% 90% at 95% 0%, hsl(${h2} 92% 30% / 0.7), transparent 50%),
      linear-gradient(150deg, hsl(${h1} 75% 11%), hsl(${h2} 70% 7%))
    `,
  };

  return (
    <div
      style={base}
      className={`group/art relative isolate flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      {/* parlak orb'lar (triadik) */}
      <div
        className="art-orb pointer-events-none absolute -left-[18%] -top-[22%] h-[80%] w-[80%] rounded-full blur-xl"
        style={{ background: `radial-gradient(circle, hsl(${h1} 100% 60% / 0.85), transparent 62%)` }}
      />
      <div
        className="art-orb pointer-events-none absolute -bottom-[28%] -right-[14%] h-[85%] w-[85%] rounded-full blur-xl"
        style={{ background: `radial-gradient(circle, hsl(${h3} 100% 58% / 0.8), transparent 60%)`, animationDelay: "-4s" }}
      />

      {/* nokta deseni */}
      <div
        className="art-sparkle pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: `radial-gradient(hsl(0 0% 100% / 0.85) 1px, transparent 1.5px)`,
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(120% 120% at 50% 40%, black 30%, transparent 72%)",
          WebkitMaskImage: "radial-gradient(120% 120% at 50% 40%, black 30%, transparent 72%)",
        }}
      />

      {/* grain */}
      <div className="art-grain pointer-events-none absolute inset-0 opacity-[0.1] mix-blend-overlay" />

      {/* emoji arkası halo */}
      <div
        className="art-halo pointer-events-none absolute h-[60%] w-[60%] rounded-full blur-xl"
        style={{ background: `radial-gradient(circle, hsl(${h2} 100% 72% / 0.65), transparent 70%)` }}
      />

      {/* emoji — neon renkli glow */}
      <span
        className={`art-emoji relative z-10 select-none ${sizeMap[size]}`}
        style={{
          filter: `
            drop-shadow(0 0 26px hsl(${h2} 100% 62% / 0.55))
            drop-shadow(0 14px 26px hsl(${h1} 80% 4% / 0.75))
            drop-shadow(0 2px 6px hsl(0 0% 0% / 0.5))`,
        }}
      >
        {emoji}
      </span>

      {/* periyodik ışık süpürme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="art-shine absolute -inset-y-4 left-0 w-1/3"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.22), transparent)",
          }}
        />
      </div>

      {/* cam üst-kenar parıltısı + vignette */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/30" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ boxShadow: "inset 0 0 70px 12px rgba(0,0,0,0.5)" }}
      />

      {label && (
        <span className="absolute bottom-2 left-2 z-10 rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/85 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
