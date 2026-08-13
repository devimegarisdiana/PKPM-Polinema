import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, publicationsTable } from "@workspace/db";
import {
  ListPublicationsResponse,
  GetPublicationResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

router.get("/publications", async (req, res): Promise<void> => {
  const publications = await db
    .select()
    .from(publicationsTable)
    .orderBy(desc(publicationsTable.publishedYear));
  res.json(ListPublicationsResponse.parse(toJson(publications)));
});

router.get("/publications/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid publication id" });
    return;
  }

  const [publication] = await db
    .select()
    .from(publicationsTable)
    .where(eq(publicationsTable.id, id));

  if (!publication) {
    res.status(404).json({ error: "Publication not found" });
    return;
  }
  res.json(GetPublicationResponse.parse(toJson(publication)));
});

export default router;
