#!/usr/bin/env bash
# =============================================================================
# Build & Package Script – PKPM Website for cPanel Jagoan Hosting
# =============================================================================
# Usage: bash deploy/build-deploy.sh
#
# Output: deploy/pkpm-deploy.zip
#   ├── app.js          (cPanel Node.js entry point)
#   ├── package.json    (production deps only)
#   ├── .htaccess       (Passenger / Apache config)
#   ├── .env.example    (environment variable reference)
#   └── dist/
#       ├── index.mjs   (compiled API server)
#       ├── *.mjs       (pino worker threads, etc.)
#       └── public/     (compiled frontend – Vite output)
# =============================================================================

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEPLOY_DIR="$ROOT/deploy"
STAGING="$DEPLOY_DIR/staging"
ZIPFILE="$DEPLOY_DIR/pkpm-deploy.zip"

echo ""
echo "══════════════════════════════════════════════"
echo "  PKPM – Build for cPanel Jagoan Hosting"
echo "══════════════════════════════════════════════"
echo ""

# ── 1. Install workspace deps ─────────────────────────────────────────────────
echo "▶ Installing workspace dependencies..."
cd "$ROOT"
pnpm install --frozen-lockfile

# ── 2. Build API server ───────────────────────────────────────────────────────
echo ""
echo "▶ Building API server (esbuild)..."
cd "$ROOT/artifacts/api-server"
NODE_ENV=production pnpm run build

# ── 3. Build frontend ─────────────────────────────────────────────────────────
echo ""
echo "▶ Building frontend (Vite)..."
cd "$ROOT/artifacts/pkpm-web"
# BASE_PATH=/ means API calls go to /api on the same domain
PORT=3000 BASE_PATH=/ NODE_ENV=production pnpm run build

# ── 4. Assemble staging directory ─────────────────────────────────────────────
echo ""
echo "▶ Assembling staging directory..."
rm -rf "$STAGING"
mkdir -p "$STAGING/dist"

# Copy compiled server
cp -r "$ROOT/artifacts/api-server/dist/." "$STAGING/dist/"

# Copy compiled frontend into dist/public/ so the server can serve it
mkdir -p "$STAGING/dist/public"
cp -r "$ROOT/artifacts/pkpm-web/dist/public/." "$STAGING/dist/public/"

# Copy cPanel entry point and config files
cp "$DEPLOY_DIR/app.js"           "$STAGING/app.js"
cp "$DEPLOY_DIR/package-deploy.json" "$STAGING/package.json"
cp "$DEPLOY_DIR/cpanel.htaccess"  "$STAGING/.htaccess"
cp "$DEPLOY_DIR/env.example"      "$STAGING/.env.example"

# ── 5. Create ZIP ─────────────────────────────────────────────────────────────
echo ""
echo "▶ Creating ZIP archive..."
rm -f "$ZIPFILE"
cd "$STAGING"
zip -r "$ZIPFILE" . --exclude "*.DS_Store"

echo ""
echo "══════════════════════════════════════════════"
echo "  ✓ Done! Deploy package: deploy/pkpm-deploy.zip"
echo "══════════════════════════════════════════════"
echo ""
echo "Next: follow the instructions in deploy/README.md"
echo ""
