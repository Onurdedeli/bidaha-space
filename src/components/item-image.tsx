import { hueFromSeed } from "@/lib/format";

interface Props {
  seed: string;
  emoji: string;
  className?: string;
  /** emoji size class */
  size?: "sm" | "md" | "lg";
  label?: string;
  /** gerçek görsel (public/...) — verilirse emoji yerine kullanılır */
  src?: string;
}

const sizeMap = {
  sm: "text-4xl sm:text-5xl",
  md: "text-6xl sm:text-7xl",
  lg: "text-7xl sm:text-8xl",
} as const;

/**
 * Açık/pastel jeneratif ürün kapağı: slug'dan deterministik pastel gradyan +
 * yumuşak orb + emoji. Harici görsel bağımlılığı yok. `src` verilince gerçek
 * görsel gösterilir.
 */
export function ItemImage({ seed, emoji, className = "", size = "md", label, src }: Props) {
  const h1 = hueFromSeed(seed);
  const h2 = (h1 + 40) % 360;

  if (src) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" className="h-full w-full object-cover" />
        {label && (
          <span className="absolute bottom-2 left-2 z-10 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur">
            {label}
          </span>
        )}
      </div>
    );
  }

  const base = {
    backgroundColor: `hsl(${h1} 90% 95%)`,
    backgroundImage: `
      radial-gradient(120% 110% at 8% -10%, hsl(${h1} 95% 88%), transparent 55%),
      radial-gradient(110% 110% at 100% 110%, hsl(${h2} 95% 86%), transparent 55%),
      linear-gradient(150deg, hsl(${h1} 100% 96%), hsl(${h2} 100% 93%))
    `,
  };

  return (
    <div
      style={base}
      className={`group/art relative isolate flex items-center justify-center overflow-hidden ${className}`}
      aria-hidden
    >
      {/* yumuşak halo */}
      <div
        className="art-halo pointer-events-none absolute h-[62%] w-[62%] rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, hsl(${h2} 100% 80% / 0.7), transparent 70%)` }}
      />

      {/* emoji */}
      <span
        className={`art-emoji relative z-10 select-none ${sizeMap[size]}`}
        style={{ filter: `drop-shadow(0 8px 14px hsl(${h1} 60% 40% / 0.25))` }}
      >
        {emoji}
      </span>

      {/* periyodik ışık süpürme */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="art-shine absolute -inset-y-4 left-0 w-1/3"
          style={{ background: "linear-gradient(90deg, transparent, hsl(0 0% 100% / 0.55), transparent)" }}
        />
      </div>

      {label && (
        <span className="absolute bottom-2 left-2 z-10 rounded-md bg-black/45 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
