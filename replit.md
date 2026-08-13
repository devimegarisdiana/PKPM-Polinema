# Pusat Kajian Pemberdayaan Masyarakat Polinema

Website pusat informasi untuk Pusat Kajian Pemberdayaan Masyarakat, UMKM, dan Ekonomi Kreatif Polinema. Portal berita dan informasi riset dengan dukungan foto dan video di setiap artikel.

## Run & Operate

- `pnpm --filter @workspace/pkpm-web run dev` — run the frontend (served at `/`)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, served at `/api`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite, Tailwind CSS, wouter, TanStack Query, framer-motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (v3), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/pkpm-web/src/pages/` — all page components (Home, Profile, Berita, Program, UMKM, Publikasi, Mitra, Galeri, Kontak)
- `artifacts/api-server/src/routes/` — API route files (articles, gallery, programs, umkm, publications, partners, stats)
- `lib/db/src/schema/` — Drizzle table definitions
- `lib/api-spec/openapi.yaml` — OpenAPI contract (source of truth for all API shapes)
- `lib/api-client-react/src/generated/` — auto-generated React Query hooks (do not edit)
- `lib/api-zod/src/generated/` — auto-generated Zod schemas for server validation (do not edit)

## Architecture decisions

- Date objects from Drizzle are serialized to ISO strings via `JSON.parse(JSON.stringify(data))` before Zod validation — this is because OpenAPI spec defines timestamps as `string` type, which generates `zod.string()` validators, but Drizzle returns JS Date objects.
- Integer fields in OpenAPI spec use `type: number` (not `type: integer`) to avoid Orval generating `zod.int()` which is Zod v4 syntax not available in Zod v3.
- All article content supports HTML body, embedded image URLs, and video URLs (YouTube iframe or HTML5 video).

## Product

- **Homepage** (`/`) — hero with featured articles, stats counter, recent news, programs
- **Profil** (`/profil`) — about the institution, vision/mission, focus areas
- **Berita** (`/berita`, `/berita/:id`) — news/articles listing with category filter and full article detail with photo/video support
- **Program** (`/program`, `/program/:id`) — programs and activities with status badges
- **UMKM** (`/umkm`, `/umkm/:id`) — SME partner listings
- **Publikasi** (`/publikasi`, `/publikasi/:id`) — research publications
- **Mitra** (`/mitra`) — institutional partners grid
- **Galeri** (`/galeri`) — photo and video gallery with type filter
- **Kontak** (`/kontak`) — contact information and form

## User preferences

- Blue color scheme (deep institutional blue with gold accent)
- Portal-style design similar to suaragong.com
- Articles must support embedded photos and videos
- No emojis in UI

## Gotchas

- After OpenAPI spec changes, always run codegen: `pnpm --filter @workspace/api-spec run codegen`
- After DB schema changes, run: `pnpm --filter @workspace/db run push`
- Do NOT use `type: integer` in openapi.yaml — use `type: number` instead (Zod v3 compatibility)
- Always use `toJson()` helper in route handlers before Zod `.parse()` to handle Date serialization

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
