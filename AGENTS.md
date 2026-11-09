# ShobaiMile

Social development events platform (Bangla-facing, `Plus_Jakarta_Sans` font, title "ShobaiMile"). Single Next.js app, no monorepo.

## Stack & config quirks
- Next.js 16.4.5 (App Router, `src/app/`) + React 19. **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`).
- Dev and build run on **Turbopack**. Tailwind v4 is set up without a config file: `globals.css` does `@import "tailwindcss"` and `next.config.ts` wires the `@tailwindcss/turbopack` loader. Style with Tailwind v4 syntax (`@theme`, etc.).
- **Fonts**: base body font is `Plus_Jakarta_Sans` (applied as `className` on `<html>` in `layout.tsx`), but the `font-sans` / `font-heading` utilities resolve to **Geist** (`geist.variable` → `--font-sans`). Set loads via Google Fonts in `layout.tsx`; page content is Bangla — don't replace metadata text like `ShobaiMile || ছোট উদ্যোগ, বড় পরিবর্তন`.
- **Two component libraries coexist**:
  - `src/components/ui/*` are shadcn-generated primitives (style `base-nova` in `components.json`) built on `@base-ui/react`. Add new ones with `npx shadcn@latest add <component>` (aliases in `components.json`, e.g. `@/components/ui`).
  - `@heroui/react` is used in exactly one place (`src/components/GallerySection.tsx`).
- Both themes are imported in `globals.css`: `@import "@heroui/styles"` and `@import "shadcn/tailwind.css"`. Don't re-import create-next-app's default theme (it's commented out in `globals.css`).

## Event data flow (not in this repo)
- There is **no event CRUD backend in this repo**. `src/app/create-event/page.tsx` POSTs to a **separate API server on `http://localhost:4000`** (`/create-event`). That server isn't here — look elsewhere or ask before assuming you can change backend behavior.
- `manage-events` and `joined-events` pages are placeholder shells so far.

## Auth (better-auth + MongoDB)
Three pieces to keep in sync:
- Server session: `src/lib/auth.ts` (`betterAuth` + `@better-auth/mongo-adapter`, direct `MongoClient` on `MONGODB_URI`)
- Route handler: `src/app/api/auth/[...all]/route.ts`
- Client: `src/lib/auth-client.ts` (`better-auth/react`)

- Required env (`.env`, already present — do not delete or rewrite it): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL=http://localhost:3000`, `MONGODB_URI`.
- `authClient`'s `baseURL` is hardcoded to `http://localhost:3000` — change it if the port changes.
- Known wart: `auth-client.ts` creates the client twice and exports actions from the second instance; use the existing exports (`signIn`, `signUp`, `signOut`, `useSession`) instead of adding another `createAuthClient`.

## Commands
- `npm run dev` — dev server (Turbopack). `npm run build` / `npm start`. `npm run lint` runs bare `eslint` (flat config, `eslint-config-next` + TypeScript preset).
- There is **no test runner or `typecheck` script**. To verify types before commit: `npx tsc --noEmit`.
- Only verified cross-check before commit: `npm run lint` + `npx tsc --noEmit`.

## Known broken state
- `src/components/RequireAuth.tsx` is **entirely commented out**, so `npx tsc --noEmit` fails out of the box with 2 errors (`joined-events/page.tsx` and `manage-events/page.tsx` import it). Unwrap the commented implementation if the private-route guard is needed; don't assume the import works.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
