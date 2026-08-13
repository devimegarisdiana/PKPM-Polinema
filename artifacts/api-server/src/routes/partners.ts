import { Router, type IRouter } from "express";
import { desc } from "drizzle-orm";
import { db, partnersTable } from "@workspace/db";
import {
  ListPartnersResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

router.get("/partners", async (req, res): Promise<void> => {
  const partners = await db
    .select()
    .from(partnersTable)
    .orderBy(desc(partnersTable.createdAt));
  res.json(ListPartnersResponse.parse(toJson(partners)));
});

export default router;
