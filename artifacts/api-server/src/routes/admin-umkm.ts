import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, umkmTable } from "@workspace/db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

router.post("/admin/umkm", requireAdmin, async (req, res): Promise<void> => {
  const { name, description, sector, ownerName, location, logoUrl, products, joinedYear } = req.body;
  if (!name || !description || !sector || !ownerName || !location) {
    res.status(400).json({ error: "name, description, sector, ownerName, location diperlukan" });
    return;
  }
  const [umkm] = await db.insert(umkmTable).values({
    name, description, sector, ownerName, location,
    logoUrl: logoUrl || null,
    products: products || null,
    joinedYear: joinedYear ? parseInt(joinedYear, 10) : null,
  }).returning();
  res.status(201).json(umkm);
});

router.put("/admin/umkm/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const fields = ["name","description","sector","ownerName","location","logoUrl","products","joinedYear"] as const;
  const updates: Record<string, unknown> = {};
  for (const f of fields) if (req.body[f] !== undefined) updates[f] = req.body[f];
  const [updated] = await db.update(umkmTable).set(updates).where(eq(umkmTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

router.delete("/admin/umkm/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(umkmTable).where(eq(umkmTable.id, id));
  res.json({ ok: true });
});

export default router;
