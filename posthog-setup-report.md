# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into this Astro (SSG) portfolio site. A new `src/components/posthog.astro` snippet component was created and imported into the root `src/layouts/Layout.astro`, ensuring PostHog initializes on every page. Nine events covering all key visitor actions were instrumented across five pages and the IframeDialog component using `window.posthog?.capture()` calls in `is:inline` script blocks — the correct pattern for static Astro. Environment variables (`PUBLIC_POSTHOG_PROJECT_TOKEN`, `PUBLIC_POSTHOG_HOST`) are set in `.env` and referenced via `define:vars` in the snippet. The `posthog-js` package was installed as a runtime dependency.

| Event name               | Description                                                                                                      | File                                |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `dialog_opened`          | User opens an iframe dialog (book time, resume, or other) — captures `dialog_id` and `dialog_src` as properties. | `src/components/IframeDialog.astro` |
| `project_clicked`        | User clicks a project link in the selected work list on the home page.                                           | `src/pages/index.astro`             |
| `quick_nav_link_clicked` | User clicks one of the quick navigation links in the "Where I'm headed" section.                                 | `src/pages/index.astro`             |
| `blog_post_clicked`      | User clicks through to read a blog post from the blog index page.                                                | `src/pages/blog/index.astro`        |
| `talk_clicked`           | User clicks the "View talk" link for a conference talk.                                                          | `src/pages/talks.astro`             |
| `contribution_clicked`   | User clicks an open source contribution link.                                                                    | `src/pages/talks.astro`             |
| `contact_link_clicked`   | User clicks a social or professional contact link (GitHub, LinkedIn, X).                                         | `src/pages/contact.astro`           |
| `email_clicked`          | User clicks the email mailto link.                                                                               | `src/pages/contact.astro`           |
| `nav_cta_clicked`        | Covered by `dialog_opened` with `dialog_id: "book-nav"` from IframeDialog.                                       | `src/components/IframeDialog.astro` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/489014/dashboard/1769927)
- [CTA Dialog Opens (wizard)](https://us.posthog.com/project/489014/insights/NZ4AGYod)
- [Project Clicks by Name (wizard)](https://us.posthog.com/project/489014/insights/bb0BGRDI)
- [Blog Post Click-throughs (wizard)](https://us.posthog.com/project/489014/insights/Td0Q0z2P)
- [Contact & Outreach Clicks (wizard)](https://us.posthog.com/project/489014/insights/NyIb8bWX)
- [Talks & Contributions Engagement (wizard)](https://us.posthog.com/project/489014/insights/06HPjl2o)

## Verify before merging

- [ ] Run a full production build (`pnpm build`) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `PUBLIC_POSTHOG_PROJECT_TOKEN` and `PUBLIC_POSTHOG_HOST` to `.env.example` and any onboarding scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
