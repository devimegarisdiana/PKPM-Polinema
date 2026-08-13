import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, partnersTable } from "@workspace/db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

router.post("/admin/partners", requireAdmin, async (req, res): Promise<void> => {
  const { name, description, type, logoUrl, website, location } = req.body;
  if (!name || !type) {
    res.status(400).json({ error: "name, type diperlukan" });
    return;
  }
  const [partner] = await db.insert(partnersTable).values({
    name, type,
    description: description || null,
    logoUrl: logoUrl || null,
    website: website || null,
    location: location || null,
  }).returning();
  res.status(201).json(partner);
});

router.put("/admin/partners/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const fields = ["name","description","type","logoUrl","website","location"] as const;
  const updates: Record<string, unknown> = {};
  for (const f of fields) if (req.body[f] !== undefined) updates[f] = req.body[f];
  const [updated] = await db.update(partnersTable).set(updates).where(eq(partnersTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

router.delete("/admin/partners/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(partnersTable).where(eq(partnersTable.id, id));
  res.json({ ok: true });
});

export default router;
