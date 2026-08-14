import { mysqlTable, text, int, timestamp, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const publicationsTable = mysqlTable("publications", {
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").notNull(),
  abstract: text("abstract"),
  type: varchar("type", { length: 20 }).notNull(), // 'journal' | 'conference' | 'book' | 'report'
  journalName: text("journal_name"),
  publishedYear: int("published_year").notNull(),
  doiUrl: text("doi_url"),
  pdfUrl: text("pdf_url"),
  coverImageUrl: text("cover_image_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPublicationSchema = createInsertSchema(publicationsTable).omit({ id: true, createdAt: true });
export type InsertPublication = z.infer<typeof insertPublicationSchema>;
export type Publication = typeof publicationsTable.$inferSelect;
