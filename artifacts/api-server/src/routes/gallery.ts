import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, galleryTable } from "@workspace/db";
import {
  ListGalleryQueryParams,
  ListGalleryResponse,
  GetGalleryItemResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

router.get("/gallery", async (req, res): Promise<void> => {
  const params = ListGalleryQueryParams.safeParse(req.query);
  const type = params.success ? params.data.type : undefined;

  let query = db.select().from(galleryTable).$dynamic();
  if (type) {
    query = query.where(eq(galleryTable.type, type));
  }
  const items = await query.orderBy(desc(galleryTable.createdAt));
  res.json(ListGalleryResponse.parse(toJson(items)));
});

router.get("/gallery/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid gallery item id" });
    return;
  }

  const [item] = await db
    .select()
    .from(galleryTable)
    .where(eq(galleryTable.id, id));

  if (!item) {
    res.status(404).json({ error: "Gallery item not found" });
    return;
  }
  res.json(GetGalleryItemResponse.parse(toJson(item)));
});

export default router;
