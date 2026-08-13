import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const umkmTable = pgTable("umkm", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  sector: text("sector").notNull(),
  ownerName: text("owner_name").notNull(),
  location: text("location").notNull(),
  logoUrl: text("logo_url"),
  products: text("products"),
  joinedYear: integer("joined_year"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertUmkmSchema = createInsertSchema(umkmTable).omit({ id: true, createdAt: true });
export type InsertUmkm = z.infer<typeof insertUmkmSchema>;
export type Umkm = typeof umkmTable.$inferSelect;
