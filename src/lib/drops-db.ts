import { eq, asc } from "drizzle-orm";
import { db } from "./db";
import { drops as dropsTable, type DropRow } from "./db/schema";
import { drops as staticDrops, type Drop } from "./drops";

function toUi(row: DropRow): Drop {
  return {
    id: row.id,
    title: row.title,
    artist: row.artist,
    context: row.context,
    emoji: row.emoji,
    endsAt: row.endsAt.toISOString(),
    href: row.href,
    kind: (row.kind as Drop["kind"]) ?? "ozel",
    total: row.total,
    claimed: row.claimed,
  };
}

/**
 * Yayında olan drop'lar (home + /anlar için).
 * DB yoksa veya tablo boşsa statik demo verisine düşer — böylece seed öncesi de dolu görünür.
 */
export async function getActiveDrops(): Promise<Drop[]> {
  if (!db) return staticDrops;
  try {
    const rows = await db
      .select()
      .from(dropsTable)
      .where(eq(dropsTable.published, true))
      .orderBy(asc(dropsTable.endsAt));
    return rows.length ? rows.map(toUi) : staticDrops;
  } catch {
    return staticDrops;
  }
}

/** Admin listesi — yayında olmayanlar dahil tüm satırlar. */
export async function getAllDrops(): Promise<DropRow[]> {
  if (!db) return [];
  return db.select().from(dropsTable).orderBy(asc(dropsTable.endsAt));
}
