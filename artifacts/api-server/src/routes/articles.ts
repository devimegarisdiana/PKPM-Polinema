import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";
import {
  ListArticlesQueryParams,
  ListArticlesResponse,
  ListFeaturedArticlesResponse,
  ListRecentArticlesQueryParams,
  ListRecentArticlesResponse,
  GetArticleResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// Convert Date objects to ISO strings for Zod validation
function toJson<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

router.get("/articles/featured", async (req, res): Promise<void> => {
  const articles = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.isFeatured, true))
    .orderBy(desc(articlesTable.publishedAt))
    .limit(5);
  res.json(ListFeaturedArticlesResponse.parse(toJson(articles)));
});

router.get("/articles/recent", async (req, res): Promise<void> => {
  const params = ListRecentArticlesQueryParams.safeParse(req.query);
  const limit = params.success && params.data.limit ? Number(params.data.limit) : 6;
  const articles = await db
    .select()
    .from(articlesTable)
    .orderBy(desc(articlesTable.publishedAt))
    .limit(limit);
  res.json(ListRecentArticlesResponse.parse(toJson(articles)));
});

router.get("/articles", async (req, res): Promise<void> => {
  const params = ListArticlesQueryParams.safeParse(req.query);
  const category = params.success ? params.data.category : undefined;
  const page = params.success && params.data.page ? Number(params.data.page) : 1;
  const limit = params.success && params.data.limit ? Number(params.data.limit) : 12;
  const offset = (page - 1) * limit;

  let query = db.select().from(articlesTable).$dynamic();
  if (category) {
    query = query.where(eq(articlesTable.category, category));
  }
  const articles = await query
    .orderBy(desc(articlesTable.publishedAt))
    .limit(limit)
    .offset(offset);
  res.json(ListArticlesResponse.parse(toJson(articles)));
});

router.get("/articles/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const id = parseInt(raw, 10);
  if (isNaN(id)) {
    res.status(400).json({ error: "Invalid article id" });
    return;
  }

  const [article] = await db
    .select()
    .from(articlesTable)
    .where(eq(articlesTable.id, id));

  if (!article) {
    res.status(404).json({ error: "Article not found" });
    return;
  }
  res.json(GetArticleResponse.parse(toJson(article)));
});

export default router;
