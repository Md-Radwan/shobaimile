# ShobaiMile

Social development events platform (Bangla-facing, `Plus_Jakarta_Sans` font, title "ShobaiMile"). Single Next.js app, no monorepo, no CI.

## Stack & config quirks
- Next.js 16.4.5 (App Router, `src/app/`) + React 19.3. **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`).
- Dev and build run on **Turbopack**. Tailwind v4 has no config file: `globals.css` does `@import "tailwindcss"` and `next.config.ts` wires the `@tailwindcss/turbopack` loader. Style with Tailwind v4 syntax (`@theme`, etc.).
- **Fonts**: base body font is `Plus_Jakarta_Sans` (applied as `className` on `<html>` in `layout.tsx`), but `font-sans` / `font-heading` resolve to **Geist** (`geist.variable` → `--font-sans`). Page content is Bangla — don't replace metadata text like `ShobaiMile || ছোট উদ্যোগ, বড় পরিবর্তন`.
- **Two component libraries coexist**:
  - `src/components/ui/*` are shadcn-generated primitives (style `base-nova` in `components.json`) built on `@base-ui/react`. Add new ones with `npx shadcn@latest add <component>` (aliases like `@/components/ui` are in `components.json`).
  - `@heroui/react` is imported directly in 5 files: `GallerySection`, `AuthLinks`, `sign-in/page`, `sign-up/page`, `upcoming-events/page`.
- Both themes are imported in `globals.css`: `@import "@heroui/styles"` and `@import "shadcn/tailwind.css"`. create-next-app's default theme is commented out there — don't re-import it.
- `cn` is the **npm package `"cn"`** (re-exported by `@/lib/utils`); shadcn components import `from "cn"` directly. It is not the usual clsx + tailwind-merge helper.
- Toasts: `layout.tsx` renders a global `<ToastContainer />`, and `create-event` and `manage-events` each render another one (each also imports `react-toastify/dist/ReactToastify.css`). If you touch toasts, consolidate the containers — don't add a fourth.

## Event data flow (backend is NOT in this repo)
- There is **no event CRUD backend in this repo**. `src/app/create-event/page.tsx` POSTs to a **separate API server on `http://localhost:4000`** (`/create-event`). That server lives elsewhere — ask before assuming you can change backend behavior.
- Pages calling `localhost:4000`: `/upcoming-events` (list), `/upcoming-events/[id]` (details, fetched with `cache: "no-store"`), `manage-events` (list + PUT `update-event/${id}` + DELETE `delete-event/${id}`). `joined-events` remains a placeholder shell.
- `/upcoming-events/[id]/page.tsx` is a server component whose `params` is typed `Promise<{ id: string }>` (Next.js 16) — `await params`, don't destructure it as a plain object or you'll reintroduce TS7031.
- `manage-events` is `"use client"` and enforces ownership **client-side** by comparing `event.email` to `session?.user?.email`; signed-out users get a "must be signed in" message. There is **no middleware anywhere** — a comment in `upcoming-events/page.tsx` claims `/create-event` is middleware-protected, but it isn't; `create-event` blocks unsigned-in submits itself with a toast.
- `create-event` requires a signed-in session (`useSession`) and attaches the creator's `email` to the POST body so the backend can validate ownership — don't remove that field.
- `create-event` redirects to `/` on success. The navbar is inconsistent: the desktop "Upcoming Events" link goes to `/upcoming-events`, the mobile menu labels `/` as "Upcoming Events", and `/` is the marketing landing page (Hero/Feature/Gallery/Newsletter) with **no event list**. Check the Navbar before assuming any redirect target.
- EventCard's "View Event" links to `/upcoming-events/${event._id}`; the details page's Join Event button links to `/joined-events`.

## Auth (better-auth + MongoDB)
Three pieces to keep in sync:
- Server session: `src/lib/auth.ts` (`betterAuth` + `mongodbAdapter` from `better-auth/adapters/mongodb`, direct `MongoClient` on `MONGODB_URI`, db `shobaimile`, google/github social providers)
- Route handler: `src/app/api/auth/[...all]/route.ts`
- Client: `src/lib/auth-client.ts` (`better-auth/react`)

- Required env (`.env` present and gitignored — do not delete or rewrite): `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL=http://localhost:3000`, `MONGODB_URI`, plus `BETTER_AUTH_GOOGLE_CLIENT_ID/SECRET` and `BETTER_AUTH_GITHUB_CLIENT_ID/SECRET` for the social login buttons.
- The `@better-auth/mongo-adapter` package in deps is only referenced by a commented-out block — the live code uses `better-auth/adapters/mongodb`.
- Known wart: `auth-client.ts` calls `createAuthClient` twice; all app code imports the named exports (`signIn`, `signUp`, `signOut`, `useSession`) from the **second** instance. The exported `authClient` (first instance) hardcodes `baseURL: "http://localhost:3000"` but is currently unused. Don't add a third client.

## Commands
- `npm run dev` — dev server (Turbopack). `npm run build` / `npm start`. `npm run lint` runs bare `eslint` (flat config: `eslint-config-next` core-web-vitals + typescript preset).
- **No test runner and no `typecheck` script.** Verify types with `npx tsc --noEmit` — it currently passes.
- **`npm run lint` currently exits 1 with 2 pre-existing errors** — `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` (plus 3 unused-var warnings). Those files aren't yours to fix; confirm your own files are clean instead of chasing them.
- Pre-commit cross-check: `npx tsc --noEmit` + `npm run lint` (expecting only the errors above).

## Known state
- `src/components/RequireAuth.tsx` is **entirely commented out** and imported nowhere — pages guard with `useSession` directly. If a private-route guard is needed, unwrap its commented implementation; don't assume the import works.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
