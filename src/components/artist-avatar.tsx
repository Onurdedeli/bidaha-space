import type { Artist } from "@/lib/artists";

/**
 * Dairesel sanatçı avatarı. `artist.image` (örn. /artists/<slug>.jpg) varsa onu,
 * yoksa hue'dan üretilen pastel gradyan + emoji placeholder'ı gösterir.
 * Lisanslı görseller public/artists/ altına eklenince otomatik devreye girer.
 */
export function ArtistAvatar({
  artist,
  className = "",
  ring = true,
}: {
  artist: Artist;
  className?: string;
  ring?: boolean;
}) {
  const ringCls = ring ? "ring-2 ring-white shadow-md" : "";

  if (artist.image) {
    return (
      <div className={`relative overflow-hidden rounded-full ${ringCls} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={artist.image} alt={artist.name} className="h-full w-full object-cover" />
      </div>
    );
  }

  const h = artist.hue;
  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-full ${ringCls} ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 120% at 25% 10%, hsl(${h} 95% 86%), transparent 60%), linear-gradient(150deg, hsl(${h} 100% 90%), hsl(${(h + 45) % 360} 100% 85%))`,
      }}
      aria-label={artist.name}
    >
      <span className="select-none text-[1.6em] leading-none" style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }}>
        {artist.emoji}
      </span>
    </div>
  );
}
