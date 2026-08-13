import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, galleryTable } from "@workspace/db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

router.post("/admin/gallery", requireAdmin, async (req, res): Promise<void> => {
  const { title, description, type, url, thumbnailUrl, category } = req.body;
  if (!title || !type || !url) {
    res.status(400).json({ error: "title, type, url diperlukan" });
    return;
  }
  const [item] = await db.insert(galleryTable).values({
    title, type, url,
    description: description || null,
    thumbnailUrl: thumbnailUrl || null,
    category: category || null,
  }).returning();
  res.status(201).json(item);
});

router.put("/admin/gallery/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const fields = ["title","description","type","url","thumbnailUrl","category"] as const;
  const updates: Record<string, unknown> = {};
  for (const f of fields) if (req.body[f] !== undefined) updates[f] = req.body[f];
  const [updated] = await db.update(galleryTable).set(updates).where(eq(galleryTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

router.delete("/admin/gallery/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(galleryTable).where(eq(galleryTable.id, id));
  res.json({ ok: true });
});

export default router;
