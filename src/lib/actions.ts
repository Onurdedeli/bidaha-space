"use server";

import { revalidatePath } from "next/cache";
import { and, eq, desc } from "drizzle-orm";
import { db } from "./db";
import { follows, drops, orders, orderItems } from "./db/schema";
import { getUserId, getUserEmail, isAdmin } from "./auth";
import type { CartLine } from "./types";

/* ----------------------------- Takip / topluluk ----------------------------- */

export async function toggleFollow(artistSlug: string): Promise<{ following: boolean; error?: string }> {
  const userId = await getUserId();
  if (!userId) return { following: false, error: "auth_required" };
  if (!db) return { following: false, error: "no_db" };

  const existing = await db
    .select({ id: follows.id })
    .from(follows)
    .where(and(eq(follows.userId, userId), eq(follows.artistSlug, artistSlug)))
    .limit(1);

  if (existing.length) {
    await db.delete(follows).where(eq(follows.id, existing[0].id));
    revalidatePath(`/sanatci/${artistSlug}`);
    return { following: false };
  }
  await db.insert(follows).values({ userId, artistSlug });
  revalidatePath(`/sanatci/${artistSlug}`);
  return { following: true };
}

export async function getMyFollows(): Promise<string[]> {
  const userId = await getUserId();
  if (!userId || !db) return [];
  const rows = await db
    .select({ slug: follows.artistSlug })
    .from(follows)
    .where(eq(follows.userId, userId));
  return rows.map((r) => r.slug);
}

export async function isFollowing(artistSlug: string): Promise<boolean> {
  const userId = await getUserId();
  if (!userId || !db) return false;
  const rows = await db
    .select({ id: follows.id })
    .from(follows)
    .where(and(eq(follows.userId, userId), eq(follows.artistSlug, artistSlug)))
    .limit(1);
  return rows.length > 0;
}

/* --------------------------------- Drops (admin) --------------------------------- */

export interface DropInput {
  title: string;
  artist: string;
  context: string;
  emoji: string;
  endsAt: string; // ISO
  href: string;
  kind: string;
  total: number;
  claimed: number;
  published: boolean;
}

export async function createDrop(input: DropInput) {
  if (!(await isAdmin())) return { error: "forbidden" };
  if (!db) return { error: "no_db" };
  await db.insert(drops).values({ ...input, endsAt: new Date(input.endsAt) });
  revalidatePath("/admin");
  revalidatePath("/anlar");
  revalidatePath("/");
  return { ok: true };
}

export async function updateDrop(id: string, input: Partial<DropInput>) {
  if (!(await isAdmin())) return { error: "forbidden" };
  if (!db) return { error: "no_db" };
  const patch: Record<string, unknown> = { ...input };
  if (input.endsAt) patch.endsAt = new Date(input.endsAt);
  await db.update(drops).set(patch).where(eq(drops.id, id));
  revalidatePath("/admin");
  revalidatePath("/anlar");
  revalidatePath("/");
  return { ok: true };
}

export async function deleteDrop(id: string) {
  if (!(await isAdmin())) return { error: "forbidden" };
  if (!db) return { error: "no_db" };
  await db.delete(drops).where(eq(drops.id, id));
  revalidatePath("/admin");
  revalidatePath("/anlar");
  revalidatePath("/");
  return { ok: true };
}

export async function seedDrops() {
  if (!(await isAdmin())) return { error: "forbidden" };
  if (!db) return { error: "no_db" };
  const existing = await db.select({ id: drops.id }).from(drops).limit(1);
  if (existing.length) return { ok: true, skipped: true };
  const { drops: seed } = await import("./drops");
  await db.insert(drops).values(
    seed.map((d) => ({
      title: d.title,
      artist: d.artist,
      context: d.context,
      emoji: d.emoji,
      endsAt: new Date(d.endsAt),
      href: d.href,
      kind: d.kind,
      total: d.total,
      claimed: d.claimed,
      published: true,
    })),
  );
  revalidatePath("/admin");
  revalidatePath("/anlar");
  revalidatePath("/");
  return { ok: true };
}

/* --------------------------------- Siparişler --------------------------------- */

export async function createOrder(
  lines: CartLine[],
  attribution: unknown,
): Promise<{ ok?: boolean; orderId?: string; error?: string }> {
  if (!lines.length) return { error: "empty_cart" };
  if (!db) return { error: "no_db" };

  const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  const shipping = lines.some((l) => l.type === "product") ? 89 : 0;
  const total = subtotal + shipping;

  const userId = await getUserId();
  const email = await getUserEmail();

  const [order] = await db
    .insert(orders)
    .values({
      userId,
      email,
      status: "pending",
      subtotal,
      shipping,
      total,
      attribution: (attribution ?? null) as object | null,
    })
    .returning({ id: orders.id });

  await db.insert(orderItems).values(
    lines.map((l) => ({
      orderId: order.id,
      itemId: l.itemId,
      itemType: l.type,
      slug: l.slug,
      name: l.name,
      artist: l.artist,
      unitPrice: l.unitPrice,
      quantity: l.quantity,
      options: (l.options ?? null) as object | null,
      note: l.note ?? null,
    })),
  );

  revalidatePath("/hesabim");
  return { ok: true, orderId: order.id };
}

export async function getMyOrders() {
  const userId = await getUserId();
  if (!userId || !db) return [];
  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt))
    .limit(20);
  return rows;
}
