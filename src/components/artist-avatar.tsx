import type { Artist } from "@/lib/artists";

/**
 * Dairesel sanatçı avatarı. `artist.image` varsa onu, yoksa accent renginden
 * üretilen temiz, tonlu placeholder + emoji gösterir.
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
  const ringCls = ring ? "ring-1 ring-border shadow-sm" : "";

  if (artist.image) {
    return (
      <div className={`relative overflow-hidden rounded-full ${ringCls} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={artist.image} alt={artist.name} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative grid place-items-center overflow-hidden rounded-full ${ringCls} ${className}`}
      style={{ backgroundColor: `${artist.accent}1f` }}
      aria-label={artist.name}
    >
      <span className="select-none leading-none" style={{ fontSize: "1.5em" }}>
        {artist.emoji}
      </span>
    </div>
  );
}
