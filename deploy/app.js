/**
 * cPanel Node.js Selector entry point (Phusion Passenger).
 *
 * Environment variables are loaded from two sources (first wins):
 *   1. Variables set in cPanel → Node.js Selector → Environment Variables
 *      (recommended – no file needed on disk)
 *   2. A .env file in this directory (requires `npm install` to pull dotenv)
 *
 * If running manually outside cPanel, set PORT yourself:
 *   PORT=3000 node app.js
 */

import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// Load .env file if present — variables already set in the environment take
// priority (dotenv never overwrites existing env vars).
try {
  const dotenv = require("dotenv");
  dotenv.config();
} catch {
  // dotenv not installed — rely on cPanel Selector environment variables
}

// Set NODE_ENV to production so the API server serves the built frontend
process.env.NODE_ENV = "production";

// Passenger may omit PORT if it uses a Unix socket instead.
// Provide a sensible default so the app still starts during local testing.
if (!process.env.PORT) {
  process.env.PORT = "3000";
}

// Dynamic import works for both ESM bundles and CJS environments
import("./dist/index.mjs").catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
