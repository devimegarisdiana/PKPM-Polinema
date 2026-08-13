import { Request, Response, NextFunction } from "express";

// Extend express-session types
declare module "express-session" {
  interface SessionData {
    adminUser?: string;
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (!req.session?.adminUser) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

export function parseAdminCredentials(): Map<string, string> {
  const raw = process.env["ADMIN_CREDENTIALS"] ?? "";
  const map = new Map<string, string>();
  for (const pair of raw.split(",")) {
    const colonIdx = pair.indexOf(":");
    if (colonIdx < 1) continue;
    const user = pair.slice(0, colonIdx).trim();
    const pass = pair.slice(colonIdx + 1).trim();
    if (user && pass) map.set(user, pass);
  }
  return map;
}
