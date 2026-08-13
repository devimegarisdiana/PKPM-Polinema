import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, programsTable } from "@workspace/db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

router.post("/admin/programs", requireAdmin, async (req, res): Promise<void> => {
  const { title, description, category, imageUrl, startDate, endDate, status } = req.body;
  if (!title || !description || !category) {
    res.status(400).json({ error: "title, description, category diperlukan" });
    return;
  }
  const [program] = await db.insert(programsTable).values({
    title, description, category,
    imageUrl: imageUrl || null,
    startDate: startDate || null,
    endDate: endDate || null,
    status: status || "upcoming",
  }).returning();
  res.status(201).json(program);
});

router.put("/admin/programs/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const fields = ["title","description","category","imageUrl","startDate","endDate","status"] as const;
  const updates: Record<string, unknown> = {};
  for (const f of fields) if (req.body[f] !== undefined) updates[f] = req.body[f];
  const [updated] = await db.update(programsTable).set(updates).where(eq(programsTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

router.delete("/admin/programs/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(programsTable).where(eq(programsTable.id, id));
  res.json({ ok: true });
});

export default router;
