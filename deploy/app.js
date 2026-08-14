// cPanel / Phusion Passenger entry point
// Loads environment from .env (if present), sets production defaults,
// then boots the compiled API server.

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// ── 1. Load .env (variables already set in the environment take priority) ──
try {
  const dotenv = require("dotenv");
  dotenv.config({ path: path.join(__dirname, ".env"), override: false });
} catch {
  // dotenv is an optional convenience; ignore if not installed
}

// ── 2. Force production mode ───────────────────────────────────────────────
if (!process.env["NODE_ENV"]) {
  process.env["NODE_ENV"] = "production";
}

// ── 3. Ensure PORT is set (Passenger may expose it via process.env already) ─
// If not present, default to 3000 as a Passenger-safe fallback.
if (!process.env["PORT"]) {
  process.env["PORT"] = "3000";
}

// ── 4. Boot the server ────────────────────────────────────────────────────
import("./index.mjs").catch((err) => {
  console.error("[app.js] Failed to start server:", err);
  process.exit(1);
});
