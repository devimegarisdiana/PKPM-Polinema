import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, programsTable } from "@workspace/db";
import {
  ListProgramsResponse,
  GetProgramResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

router.get("/programs", async (req, res): Promise<void> => {
  const programs = await db
    .select()
    .from(programsTable)
    .orderBy(desc(programsTable.createdAt));
  res.json(ListProgramsResponse.parse(toJson(programs)));
});

router.get("/programs/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid program id" });
    return;
  }

  const [program] = await db
    .select()
    .from(programsTable)
    .where(eq(programsTable.id, id));

  if (!program) {
    res.status(404).json({ error: "Program not found" });
    return;
  }
  res.json(GetProgramResponse.parse(toJson(program)));
});

export default router;
