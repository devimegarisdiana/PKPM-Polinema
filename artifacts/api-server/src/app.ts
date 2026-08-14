import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Trust the local reverse proxy (Phusion Passenger / Nginx / etc.) so that
// Express correctly reads X-Forwarded-Proto and treats HTTPS requests as
// secure. Required for session cookies with `secure: true` to be sent.
if (process.env["NODE_ENV"] === "production") {
  app.set("trust proxy", 1);
}

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env["SESSION_SECRET"] ?? "pkpm-fallback-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env["NODE_ENV"] === "production", // true in production behind HTTPS proxy
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    },
  }),
);

app.use("/api", router);

// In production, serve the built frontend from the 'public' directory that
// sits next to this compiled server file (dist/index.mjs → dist/public/).
// The build-deploy script copies the Vite output there before packaging.
if (process.env["NODE_ENV"] === "production") {
  const publicDir = path.resolve(__dirname, "public");
  app.use(express.static(publicDir));
  // Fallback: serve index.html for all non-API routes (SPA client-side routing).
  // Express 5 requires path-to-regexp v8 syntax; bare "*" is rejected — use "/{*splat}".
  app.get("/{*splat}", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

export default app;
