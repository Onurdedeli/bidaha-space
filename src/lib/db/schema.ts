import {
  pgTable,
  text,
  boolean,
  timestamp,
  jsonb,
  uuid,
  integer,
  index,
  uniqueIndex,
} from "drizzle-orm/pg-core";

/**
 * Aboneler — web-first stratejinin "veri sahipliği" ayağının kalıcı deposu.
 * E-posta benzersiz; tekrar gönderimde son-değme atfı ve sayaç güncellenir.
 */
export const subscribers = pgTable(
  "subscribers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    source: text("source").notNull().default("unknown"),
    consent: boolean("consent").notNull().default(false),
    attribution: jsonb("attribution"),
    userId: text("user_id"),
    signupCount: text("signup_count").notNull().default("1"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("subscribers_source_idx").on(t.source)],
);

/** Takip / topluluk üyeliği — giriş yapan kullanıcıyı sanatçıya bağlar. */
export const follows = pgTable(
  "follows",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull(),
    artistSlug: text("artist_slug").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("follows_user_artist_idx").on(t.userId, t.artistSlug)],
);

/** An bazlı drop'lar — admin panelinden yönetilir, kodda sabit değil. */
export const drops = pgTable("drops", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  artist: text("artist").notNull(),
  context: text("context").notNull().default(""),
  emoji: text("emoji").notNull().default("🎵"),
  endsAt: timestamp("ends_at", { withTimezone: true }).notNull(),
  href: text("href").notNull().default("/anlar"),
  kind: text("kind").notNull().default("ozel"), // konser | cikis | ozel
  total: integer("total").notNull().default(100),
  claimed: integer("claimed").notNull().default(0),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Siparişler. userId null olabilir (misafir checkout). */
export const orders = pgTable(
  "orders",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id"),
    email: text("email"),
    status: text("status").notNull().default("pending"), // pending | paid | cancelled
    subtotal: integer("subtotal").notNull(),
    shipping: integer("shipping").notNull().default(0),
    total: integer("total").notNull(),
    currency: text("currency").notNull().default("TRY"),
    attribution: jsonb("attribution"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("orders_user_idx").on(t.userId)],
);

export const orderItems = pgTable("order_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  orderId: uuid("order_id")
    .notNull()
    .references(() => orders.id, { onDelete: "cascade" }),
  itemId: text("item_id").notNull(),
  itemType: text("item_type").notNull(), // product | experience
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  artist: text("artist").notNull(),
  unitPrice: integer("unit_price").notNull(),
  quantity: integer("quantity").notNull().default(1),
  options: jsonb("options"),
  note: text("note"),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type NewSubscriber = typeof subscribers.$inferInsert;
export type Follow = typeof follows.$inferSelect;
export type DropRow = typeof drops.$inferSelect;
export type NewDrop = typeof drops.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type OrderItem = typeof orderItems.$inferSelect;
