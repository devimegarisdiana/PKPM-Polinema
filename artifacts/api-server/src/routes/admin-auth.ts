import { Router, type IRouter } from "express";
import { parseAdminCredentials } from "../middleware/auth";

const router: IRouter = Router();

router.post("/admin/login", (req, res): void => {
  const { username, password } = req.body as { username?: string; password?: string };
  if (!username || !password) {
    res.status(400).json({ error: "Username dan password diperlukan" });
    return;
  }
  const creds = parseAdminCredentials();
  const storedPass = creds.get(username);
  if (!storedPass || storedPass !== password) {
    res.status(401).json({ error: "Username atau password salah" });
    return;
  }
  req.session.adminUser = username;
  res.json({ ok: true, user: username });
});

router.post("/admin/logout", (req, res): void => {
  req.session.destroy(() => {
    res.json({ ok: true });
  });
});

router.get("/admin/me", (req, res): void => {
  if (!req.session?.adminUser) {
    res.status(401).json({ error: "Not authenticated" });
    return;
  }
  res.json({ user: req.session.adminUser });
});

export default router;
