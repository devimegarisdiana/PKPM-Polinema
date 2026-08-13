import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, umkmTable } from "@workspace/db";
import {
  ListUmkmResponse,
  GetUmkmResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

router.get("/umkm", async (req, res): Promise<void> => {
  const umkm = await db
    .select()
    .from(umkmTable)
    .orderBy(desc(umkmTable.createdAt));
  res.json(ListUmkmResponse.parse(toJson(umkm)));
});

router.get("/umkm/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid UMKM id" });
    return;
  }

  const [umkm] = await db
    .select()
    .from(umkmTable)
    .where(eq(umkmTable.id, id));

  if (!umkm) {
    res.status(404).json({ error: "UMKM not found" });
    return;
  }
  res.json(GetUmkmResponse.parse(toJson(umkm)));
});

export default router;
