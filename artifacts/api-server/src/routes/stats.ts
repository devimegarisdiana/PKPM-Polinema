import { Router, type IRouter } from "express";
import { db, articlesTable, programsTable, umkmTable, partnersTable, publicationsTable, galleryTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { GetStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (req, res): Promise<void> => {
  const [articles] = await db.select({ count: sql<number>`count(*)::int` }).from(articlesTable);
  const [programs] = await db.select({ count: sql<number>`count(*)::int` }).from(programsTable);
  const [umkm] = await db.select({ count: sql<number>`count(*)::int` }).from(umkmTable);
  const [partners] = await db.select({ count: sql<number>`count(*)::int` }).from(partnersTable);
  const [publications] = await db.select({ count: sql<number>`count(*)::int` }).from(publicationsTable);
  const [gallery] = await db.select({ count: sql<number>`count(*)::int` }).from(galleryTable);

  res.json(GetStatsResponse.parse({
    totalArticles: articles?.count ?? 0,
    totalPrograms: programs?.count ?? 0,
    totalUmkm: umkm?.count ?? 0,
    totalPartners: partners?.count ?? 0,
    totalPublications: publications?.count ?? 0,
    totalGallery: gallery?.count ?? 0,
  }));
});

export default router;
