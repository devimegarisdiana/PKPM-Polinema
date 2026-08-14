import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "node:fs";
import { Router, type IRouter } from "express";
import multer from "multer";
import { requireAdmin } from "../middleware/auth";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve uploads directory relative to the api-server artifact root.
// dev:  __dirname = src/routes  → go up 2 levels
// prod: __dirname = dist/       → go up 1 level
function findUploadsDir(): string {
  const base =
    process.env["NODE_ENV"] === "production"
      ? path.resolve(__dirname, "..", "uploads")
      : path.resolve(__dirname, "..", "..", "uploads");
  fs.mkdirSync(base, { recursive: true });
  return base;
}

const UPLOADS_DIR = findUploadsDir();

// ── Magic-byte signatures for types we accept ──────────────────────────────
// Each entry maps to { extension, mime }. SVG is intentionally excluded because
// SVG files can contain executable JavaScript and cause stored XSS.
type FileKind = { ext: string; mime: string };

function detectFileKind(buf: Buffer): FileKind | null {
  // JPEG: FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff)
    return { ext: ".jpg", mime: "image/jpeg" };
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)
    return { ext: ".png", mime: "image/png" };
  // GIF: GIF87a or GIF89a
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46)
    return { ext: ".gif", mime: "image/gif" };
  // WebP: RIFF????WEBP
  if (
    buf[0] === 0x52 && buf[1] === 0x49 && buf[2] === 0x46 && buf[3] === 0x46 &&
    buf[8] === 0x57 && buf[9] === 0x45 && buf[10] === 0x42 && buf[11] === 0x50
  )
    return { ext: ".webp", mime: "image/webp" };
  // PDF: %PDF
  if (buf[0] === 0x25 && buf[1] === 0x50 && buf[2] === 0x44 && buf[3] === 0x46)
    return { ext: ".pdf", mime: "application/pdf" };
  return null;
}

// ── Multer storage ─────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOADS_DIR),
  filename: (_req, _file, cb) => {
    // Use a temp name; we rename after magic-byte validation to enforce the
    // correct extension regardless of what the client sent.
    const temp = `tmp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    cb(null, temp);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (_req, _file, cb) => {
    // Accept everything here; we validate by magic bytes after the write.
    cb(null, true);
  },
});

// ── Route ──────────────────────────────────────────────────────────────────
const router: IRouter = Router();

router.post(
  "/admin/upload",
  requireAdmin,
  upload.single("file"),
  (req, res): void => {
    if (!req.file) {
      res.status(400).json({ error: "Tidak ada file yang diunggah" });
      return;
    }

    const tempPath = req.file.path;

    // Read first 12 bytes to cover all our magic-byte checks.
    let headerBuf: Buffer;
    try {
      const fd = fs.openSync(tempPath, "r");
      headerBuf = Buffer.alloc(12);
      fs.readSync(fd, headerBuf, 0, 12, 0);
      fs.closeSync(fd);
    } catch {
      fs.unlinkSync(tempPath);
      res.status(500).json({ error: "Gagal membaca file yang diunggah" });
      return;
    }

    const kind = detectFileKind(headerBuf);
    if (!kind) {
      fs.unlinkSync(tempPath);
      res
        .status(415)
        .json({ error: "Tipe file tidak didukung. Gunakan gambar (JPG, PNG, GIF, WebP) atau PDF." });
      return;
    }

    // Rename temp file to its validated name with the correct extension.
    const finalName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${kind.ext}`;
    const finalPath = path.join(UPLOADS_DIR, finalName);
    try {
      fs.renameSync(tempPath, finalPath);
    } catch {
      fs.unlinkSync(tempPath);
      res.status(500).json({ error: "Gagal menyimpan file" });
      return;
    }

    // Return a URL the browser can use. /uploads/ is served as static files
    // by the Express app (and proxied to the API server in dev via Vite).
    const url = `/uploads/${finalName}`;
    res.json({ ok: true, url, filename: finalName });
  }
);

export default router;
export { UPLOADS_DIR };
