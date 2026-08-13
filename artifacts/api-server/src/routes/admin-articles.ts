import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, articlesTable } from "@workspace/db";
import { requireAdmin } from "../middleware/auth";

const router: IRouter = Router();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

router.post("/admin/articles", requireAdmin, async (req, res): Promise<void> => {
  const { title, excerpt, content, category, author, imageUrl, videoUrl, mediaUrls, isFeatured, publishedAt } = req.body;
  if (!title || !content || !category || !author) {
    res.status(400).json({ error: "title, content, category, author diperlukan" });
    return;
  }
  const baseSlug = slugify(title);
  const slug = `${baseSlug}-${Date.now()}`;
  const [article] = await db.insert(articlesTable).values({
    title, slug, excerpt, content, category, author,
    imageUrl: imageUrl || null,
    videoUrl: videoUrl || null,
    mediaUrls: mediaUrls || [],
    isFeatured: isFeatured ?? false,
    publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
  }).returning();
  res.status(201).json(article);
});

router.put("/admin/articles/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  const { title, excerpt, content, category, author, imageUrl, videoUrl, mediaUrls, isFeatured, publishedAt } = req.body;
  const updates: Record<string, unknown> = {};
  if (title !== undefined) { updates.title = title; updates.slug = `${slugify(title)}-${id}`; }
  if (excerpt !== undefined) updates.excerpt = excerpt;
  if (content !== undefined) updates.content = content;
  if (category !== undefined) updates.category = category;
  if (author !== undefined) updates.author = author;
  if (imageUrl !== undefined) updates.imageUrl = imageUrl;
  if (videoUrl !== undefined) updates.videoUrl = videoUrl;
  if (mediaUrls !== undefined) updates.mediaUrls = mediaUrls;
  if (isFeatured !== undefined) updates.isFeatured = isFeatured;
  if (publishedAt !== undefined) updates.publishedAt = new Date(publishedAt);
  const [updated] = await db.update(articlesTable).set(updates).where(eq(articlesTable.id, id)).returning();
  if (!updated) { res.status(404).json({ error: "Not found" }); return; }
  res.json(updated);
});

router.delete("/admin/articles/:id", requireAdmin, async (req, res): Promise<void> => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) { res.status(400).json({ error: "Invalid id" }); return; }
  await db.delete(articlesTable).where(eq(articlesTable.id, id));
  res.json({ ok: true });
});

export default router;
