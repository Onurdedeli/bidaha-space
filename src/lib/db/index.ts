import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

/**
 * DB client. DATABASE_URL yoksa `null` döner — bu sayede DB provision
 * edilmeden de uygulama çalışır ve build kırılmaz (subscribe route loglamaya düşer).
 * Neon bağlanınca otomatik devreye girer.
 */
const url = process.env.DATABASE_URL;

export const db = url ? drizzle(neon(url), { schema }) : null;

export const isDbReady = !!url;

export { schema };
