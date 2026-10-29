# Verse Engine by Ctruh — frontend

Marketing site + Studio web app, built from `../verse-engine-handoff/build_prompt.md`.
**Frontend only, with dummy data.** No backend, auth or real API calls.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Next.js 16 (App Router) · TypeScript · plain CSS with design tokens (`app/globals.css`) · GSAP ScrollTrigger + Lenis ·
Metropolis (brand typeface, via `@fontsource/metropolis`).

## Routes
`/` · `/plugins` · `/plugins/[blender|unity|unreal]` · `/developers` · `/docs/[slug]` (`/docs` redirects) · `/explore` · `/pricing` (`#enterprise`) · `/about` · `/signin` ·
`/studio` · `/studio/analytics?scene=sc-…` · `/studio/webhooks` · `/studio/keys` · `/studio/new` → `/studio/new/review` → `/studio/new/share`

## Where things live
- `lib/data.ts` — all marketing copy/data constants. `lib/api/mock.ts` — Studio sample data + typed shapes (`lib/api/types.ts`); swap for real fetches later.
- `lib/links.ts` — every external / placeholder URL and the route table.
- `components/landing/*` — the 8 chapters + prologue/epilogue. `components/ui/*` — Odometer, Marquee, TiltCard, Tabs, Accordion, CopyButton, BarChart, StatusPill.
- `components/pages/*`, `components/studio/*` — page views.

## Themes
Dark is the default; light via `data-theme="light"` on `<html>` (toggle in the footer / Studio sidebar, persisted, respects `prefers-color-scheme`).
Palette: `#0077FF`, `#001B99`, `#FFFFFF`, `#E8F1FF`, `#070B1F` (+ alpha), from the design hand-off. Typeface: Metropolis.
`.force-dark` pins always-dark surfaces (film, device frames, viewer panes); `.band` is a saturated cobalt band.

## Placeholders still open (also marked `[PLACEHOLDER]` in the UI/code)
Studio + viewer recordings · library thumbnails · challenge/template/plug-in/API/SDK URLs (`lib/links.ts`) · auth provider (sign-in currently just continues to Studio) ·
Docs content (MDX) · Explore posts (CMS) · founding story/team photo · claims and numbers to confirm (see the build prompt §10).

## Known design/AA conflict
White text on the brand blue `#0077FF` is 4.14:1 (AA needs 4.5:1 for small text). The design source uses exactly that pairing, so it is kept.
If AA is a hard gate, set `--cta-text: #070b1f` in `app/globals.css` (4.7:1) — one variable changes every blue fill.
