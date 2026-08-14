---
name: MySQL migration
description: App migrated from PostgreSQL (Replit) to MySQL/MariaDB (Jagoan Hosting cPanel). Key decisions and gotchas.
---

## Rule
Never use PostgreSQL-specific SQL syntax in Drizzle `sql` template literals. MySQL does not support `::int`, `::text`, etc. Use plain `count(*)` instead of `count(*)::int`.

**Why:** The app was originally built on Replit PostgreSQL, then migrated to MySQL for cPanel hosting. PostgreSQL cast syntax breaks silently on MySQL.

**How to apply:** Any raw `sql\`...\`` template — use standard SQL only. For count queries use `sql<number>\`count(*)\`` without cast.

## Hosting details
- Provider: Jagoan Hosting (jagoanhosting.com)
- DB type: MariaDB 10.6.27
- Server IP: 101.50.1.94
- DB name: pusatris_pkpm_db
- DB user: pusatris_pkpm
- Remote MySQL: enabled (% wildcard)

## Migration path taken
1. Schema files: all changed from `pgTable` → `mysqlTable`; `text().array()` → `json()` for array columns
2. `lib/db/src/index.ts`: switched from `drizzle-orm/node-postgres` + `pg` to `drizzle-orm/mysql2` + `mysql2/promise`
3. `lib/db/drizzle.config.ts`: `dialect: "postgresql"` → `dialect: "mysql"`
4. `lib/db/package.json`: removed `pg`, `@types/pg`; added `mysql2`
5. Stats route: removed `::int` PostgreSQL cast syntax
6. Tables created via `drizzle-kit push` against remote MySQL

## DATABASE_URL format
`mysql://pusatris_pkpm:PASSWORD@101.50.1.94:3306/pusatris_pkpm_db`
Stored in Replit Secrets as `DATABASE_URL`.
