interface Props {
  emoji: string;
  className?: string;
  /** emoji size class */
  size?: "sm" | "md" | "lg";
  label?: string;
  /** sanatçı accent rengi (hex) — çok hafif tonlu zemin */
  accent?: string;
  /** gerçek görsel (public/...) — verilirse emoji yerine kullanılır */
  src?: string;
}

const sizeMap = {
  sm: "text-4xl sm:text-5xl",
  md: "text-6xl sm:text-7xl",
  lg: "text-7xl sm:text-8xl",
} as const;

/**
 * Ürün kapağı: sanatçı accent renginin çok hafif düz tonunda zemin + ortada emoji.
 * Beyaz-öncelikli tasarıma uygun, gradyansız. `src` verilince gerçek görsel gösterilir.
 */
export function ItemImage({ emoji, className = "", size = "md", label, accent = "#16131b", src }: Props) {
  if (src) {
    return (
      <div className={`relative overflow-hidden bg-surface-2 ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        {label && (
          <span className="absolute bottom-2 left-2 z-10 rounded-md bg-black/55 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white/90 backdrop-blur">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ backgroundColor: `${accent}14` }}
      aria-hidden
    >
      <span className={`select-none ${sizeMap[size]}`}>{emoji}</span>
      {label && (
        <span className="absolute bottom-2 left-2 z-10 rounded-md bg-foreground/70 px-2 py-0.5 text-[10px] font-medium tracking-wide text-white backdrop-blur">
          {label}
        </span>
      )}
    </div>
  );
}
