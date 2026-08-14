import { mysqlTable, text, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const umkmTable = mysqlTable("umkm", {
  id: int("id").autoincrement().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  sector: varchar("sector", { length: 100 }).notNull(),
  ownerName: varchar("owner_name", { length: 255 }).notNull(),
  location: text("location").notNull(),
  logoUrl: text("logo_url"),
  products: text("products"),
  joinedYear: int("joined_year"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertUmkmSchema = createInsertSchema(umkmTable).omit({ id: true, createdAt: true });
export type InsertUmkm = z.infer<typeof insertUmkmSchema>;
export type Umkm = typeof umkmTable.$inferSelect;
