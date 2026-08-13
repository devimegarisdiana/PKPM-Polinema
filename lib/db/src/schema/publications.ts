import { pgTable, text, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const publicationsTable = pgTable("publications", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  abstract: text("abstract"),
  type: text("type").notNull(), // 'journal' | 'conference' | 'book' | 'report'
  journalName: text("journal_name"),
  publishedYear: integer("published_year").notNull(),
  doiUrl: text("doi_url"),
  pdfUrl: text("pdf_url"),
  coverImageUrl: text("cover_image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPublicationSchema = createInsertSchema(publicationsTable).omit({ id: true, createdAt: true });
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Publication = typeof publicationsTable.$inferSelect;
