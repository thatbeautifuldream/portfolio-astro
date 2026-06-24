# Agent Instructions

## Self-Healing Feedback Loop

After making code changes, run the fastest loop that can catch and fix issues, in order:

1. `pnpm format` — apply project formatting (Prettier).
2. `pnpm check` — catch Astro and TypeScript diagnostics (`astro check`).
3. `pnpm build` — validate the static Astro build.

If any command fails, fix the reported issue and rerun the failed command before continuing. Do not hand off with a failing command.

Run `pnpm verify` before final handoff. It runs `format:check`, Astro diagnostics, and the production build — the same gate to keep `main` always green.

Keep pre-commit fast: it only runs `lint-staged` (Prettier on staged files). The heavier `check` + `build` validation lives in `pnpm verify` and CI.

## Project Notes

- Astro static site (no SSR adapter). Pages in `src/pages`, layout in `src/layouts/Layout.astro`.
- Content lives in collections defined in `src/content.config.ts`: `posts` (`src/content/posts/*.md`) and `gists` (`src/content/gist/*.mdx`). `src/content/` is excluded from Prettier — do not reformat authored content.
- SEO is centralized in `src/lib/seo.ts` (`siteConfig`, `sitePages`, structured-data builders). Sitemap priorities, `robots.txt`, `llms.txt`, and `llms-full.txt` all derive from it — update there, not in scattered files.
- Package manager is **pnpm**. Use `pnpm`, never `npm`/`npx`.
- Match the surrounding style: 2-space indentation, double quotes, semicolons. Prettier enforces this.
- Prefer small, targeted changes that reuse existing layout, content, and SEO patterns.

## Lighthouse Verification

Run `pnpm lighthouse` to audit **mobile + desktop** in one pass. It builds, serves `dist`, drives Lighthouse through its Node API for both form factors, and prints each category score plus every audit below 100%. Each form factor runs 3 times and the **median** run is reported so scores don't jitter between runs.

The work is split into three composable TypeScript modules (run directly via Node's type stripping, no build step):

- `scripts/serve-dist.ts` — exports `startServer()`, a static `dist` server that gzips responses and mirrors the `vercel.json` headers so the local run matches production. Run it directly (`node scripts/serve-dist.ts [port]`) to just serve.
- `scripts/lighthouse-runner.ts` — exports `withChrome`, `runOnce`, `runMedian`, `scores`, and `gapsByCategory`. Knows nothing about serving: give it any URL and a Chrome port and it audits it.
- `scripts/lighthouse.ts` — the CLI that composes the two (build → serve → audit → report).

- `pnpm lighthouse --no-build` — reuse the existing `dist` (skip the rebuild).
- `pnpm lighthouse --runs 5` — change how many runs the median is taken over (default 3; use 1 for a quick smoke test).
- `pnpm lighthouse --url https://milindmishra.com/` — audit production directly instead of the local build.
- `PUBLIC_DISABLE_ANALYTICS=true pnpm build` then `pnpm lighthouse --no-build` — measure the code's own ceiling with third-party analytics excluded.

Interpreting results:

- The local server is HTTP/1.1, so Lighthouse's lantern simulation over-penalizes **mobile** (inflated FCP/LCP vs production's HTTP/3). Trust **desktop** locally; use `--url` (or PageSpeed Insights) for the real mobile picture.
- `Analytics.astro` loads GA4 + Clarity only on first user interaction, so they stay out of the audit trace — don't "fix" this by eagerly loading them.
- Response headers (HSTS, CSP, X-Frame-Options, COOP, etc.) live in **`vercel.json`** — the site is on Vercel (Cloudflare only proxies the domain). A Cloudflare `public/_headers` file is ignored. Update `vercel.json`, and keep `scripts/serve-dist.ts`'s parser in sync if the header shape changes.
- **Fonts:** Inter is self-hosted as a variable woff2. Astro's local font provider serves woff2 files as-is (no subsetting), so the full files (~350KB each) would land on the critical path. `pnpm subset:fonts` (via `scripts/subset-fonts.ts`, harfbuzz-based) subsets them to the Latin range — keeping the `wght` axis — into `*.subset.woff2`, which `astro.config.mjs` points at (~106KB). Re-run it after replacing the Inter source files; keep the originals as the subset input. The Google-provider fonts (Google Sans Code, Libre Baskerville) are already auto-subsetted.
- Best-Practices is capped below 100 by Cloudflare's injected bot script (`/cdn-cgi/challenge-platform/...`, the `deprecations` audit) — that is a Cloudflare dashboard setting (Bot Fight Mode / JavaScript Detections), not a code issue. Don't chase it in the repo.
