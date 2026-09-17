# WIR website — current project memory

Read [the production handoff](docs/2026-09-15-production-handoff.md) and [documentation index](docs/README.md) before continuing. They supersede the local-only status in older delivery checkpoints.

## Approved direction

Cristian and Nicholas approved the complete site and existing SUSEP dashboard. Cristian subsequently said he loves the result and requested full documentation. Preserve the published design and continue with focused refinements.

- Nicholas's composition: A's white header and navy luminous-ribbon hero, C's dark illustrated capabilities, E's lavender implementation journey.
- Eight-second film: recognizable incoming emails become amber threads, then three blue/lavender ribbons. Stable HTML headline and CTAs; silent, once per session, accessible pause/replay and static fallback.
- Strong sculptural internal pages and readable editorial layouts. Real founder photos and official logo.
- Home headline: “IA para escalar o mercado segurador.” The eyebrow **“AI Scale Solutions · Brasil/Brazil” was explicitly removed** because Cristian felt it looked too AI-generated. Do not restore it. This decision concerns the hero label, not all existing positioning text.
- Solutions 01–03 mean distribution / Smart Sales, underwriting / Underwriter Intelligence, and visibility / dashboards and analytics.
- Dashboard scope is the **existing SUSEP market dashboard only**. Its menu link stays amber; Protection stays in shared React, static and mobile navigation.
- Rejected email prototypes v1–v3 remain archived. Do not confuse them with the approved email-origin film.

## Source and preservation rules

- React/Vite website here; separate dashboard checkout at `../wir-susep-dashboard`.
- Article source: `src/articles.jsx`. Update the generator and source styles, never generated article HTML directly. Keep the hand-authored WIR Index report.
- **No Markdown syntax is ever shown to a reader.** Published articles must never display `**`, `*`, `#`–`######`, `> `, `- ` / `1. ` list markers, backticks or `|` pipes as text.
  - Article `body` strings use markdown-lite only. Each kind goes in its own blank-line block: `### ` subheads, `- ` / `1. ` lists, `> ` quotes and `|` tables. Inside blocks, use only `**bold**`, `*italic*`, `` `code` `` and `[links](…)`.
  - The two parsers must stay in sync: `splitBlock` in `src/articles.jsx` and in `scripts/build-articles.cjs`.
  - After any content or parser change, check the generated `public/insights/*/index.html`, not only the source.
  - Background: on 2026-09-17, lists glued to a paragraph printed as one paragraph with literal dashes.
- PT Protection uses Luiz's approved twelve-section manifesto. Do not change its assertions without his sign-off. Existing EN/ES editorial versions remain until approved translations exist.
- Preserve product production/development statuses, dashboard data/calculations/ETL, real team identities, languages and contact contracts. Add no invented metrics or commitments.
- Reuse media and editable SVG/CSS. The only recorded Higgsfield video generation cost 72 credits; later refinements used no paid generation.
- Check `git status` before edits; preserve concurrent work. Do not start an extra dev server if port 3000 already serves this project.

## Release state and authorization

Website application release: `f4b003d` on `main`, published at https://wirinnovation.ai/. Dashboard release: `02d7c77`, published at https://dashboard.wirinnovation.ai/.

Cristian explicitly authorized merge, push and production publication of this release and requested refinements. The work was committed, pushed and published. Earlier local-only checkpoints are historical; they do not describe a pending deployment. Authorization must still be established for unrelated future releases, and this file grants none by itself.

Use the verified Vercel team `cristian-2293s-projects`; the old `cristian-mendivelsos-projects` link is stale. Git auto-deployment is not a reliable completion signal. Follow the handoff's deploy procedure and verify the live bundle.
