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
