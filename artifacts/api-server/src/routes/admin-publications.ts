import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, publicationsTable } from "@workspace/db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

router.post("/admin/publications", requireAdmin, async (req, res): Promise<void> => {
  const { title, authors, abstract, type, journalName, publishedYear, doiUrl, pdfUrl, coverImageUrl } = req.body;
  if (!title || !authors || !type || !publishedYear) {
    res.status(400).json({ error: "title, authors, type, publishedYear diperlukan" });
    return;
  }
  const [pub] = await db.insert(publicationsTable).values({
    title, authors,
    abstract: abstract || null,
    type,
    journalName: journalName || null,
    publishedYear: parseInt(publishedYear, 10),
    doiUrl: doiUrl || null,
    pdfUrl: pdfUrl || null,
    coverImageUrl: coverImageUrl || null,
  }).returning();
  res.status(201).json(pub);
});

router.put("/admin/publications/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const fields = ["title","authors","abstract","type","journalName","publishedYear","doiUrl","pdfUrl","coverImageUrl"] as const;
  const updates: Record<string, unknown> = {};
  for (const f of fields) if (req.body[f] !== undefined) updates[f] = req.body[f];
  if (updates.publishedYear) updates.publishedYear = parseInt(String(updates.publishedYear), 10);
  const [updated] = await db.update(publicationsTable).set(updates).where(eq(publicationsTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

router.delete("/admin/publications/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(publicationsTable).where(eq(publicationsTable.id, id));
  res.json({ ok: true });
});

export default router;
