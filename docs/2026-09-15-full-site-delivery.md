# Approved scale design — complete public site

> Historical implementation checkpoint. The site was subsequently approved and published. For current status, routes, tests and deployment instructions, read the [production handoff](2026-09-15-production-handoff.md).

## Scope and authorization

Cristian confirmed the home approval and expanded scope to all public pages, articles, and the existing SUSEP dashboard. He explicitly selected the existing SUSEP dashboard, excluding new Smart Sales or underwriting product dashboards. No publication, commit, or push was requested or performed.

## Local review

- Site: http://127.0.0.1:3000/
- Responsive review: http://127.0.0.1:3000/docs/full-site-review.html
- Articles: http://127.0.0.1:3000/insights/
- English articles: http://127.0.0.1:3000/en/insights/
- Dashboard: http://127.0.0.1:3000/dashboard/?lang=pt

The existing Vite process serves both projects locally. `scripts/dashboard-dev.mjs` serves only the sibling dashboard's public assets, entrypoint and published JSON. No additional server is required. A future website deployment redirects `/dashboard/` to the existing dashboard domain; dashboard changes must be deployed separately when authorized.

## Implemented

- Extended the approved typography, navy, blue and lavender composition to solutions, about, contact, data protection, article templates, archive and shared footer.
- Added a dedicated visibility section and clear public-market dashboard entry, separate from the description of client operational analytics.
- Preserved real founders, existing product statuses, legal copy, routes, languages and commercial content. Reused the approved home film and media.
- Updated 150 generated article pages and PT/EN indexes. Preserved the hand-authored WIR Index report and applied a separate theme stylesheet.
- Search supports accent-insensitive words, category filtering, result counts, empty states and shareable query parameters. Article pages have an optional heading index and reading progress. Archive thumbnails load lazily.
- Fixed 28 stale article references and added regression coverage for local article links and assets.
- Latest home insights now derive from the article source during generation. Legacy hash blog routes redirect to static articles; the former 1.8 MB article bundle is no longer downloaded.
- Removed the ticker from generated navigation. Aligned mobile menus, keyboard handling, footer links and translated navigation. Fixed initial deep links into lazy routes and page titles.
- Content remains visible even when intersection observers are delayed; entrance effects cannot hide the page.
- Contact and newsletter share the existing Supabase request contract with a 15-second timeout. Existing error, duplicate subscription and email fallback behaviors remain.
- Dashboard retains the data JSON, calculations, ETL, chart palettes and chart panel surfaces. Added approved shell styling, persistent locale, translated number formatting, localized loading/error/retry, safe language/theme interaction before data arrives, and locale-aware return links.
- Vendored the same Chart.js 4.4.1 release, verified against its previous SHA-384 integrity, with its MIT license. Charts no longer depend on a runtime CDN download.

## Validation

- `npm run build`: article generation and Vite production build pass, without the old oversized blog chunk warning.
- `npm test`: 17 passing tests, covering existing film playback, article search/TOC/links, dashboard loading/recovery and simulated form transport. Dashboard tests require the sibling checkout and explicitly skip if absent.
- More than 3,700 local article links and assets resolve.
- Local HTTP checks: PT/EN/ES entries, article archives/readers/report, dashboard assets/data and review page return 200. Private dashboard paths return 404.
- Supabase contact/newsletter endpoints respond HTTP 200 to read-only HEAD requests with `limit=0`. No leads, subscriptions, webhooks or messages were submitted. Actual production delivery was not exercised.
- Native Safari review: desktop About/Insights; mobile solutions, dashboard, menu and contact validation/step progression. Existing film tests remain green.
- Both working trees pass `git diff --check`.

## Preservation and operating notes

- Pre-expansion source and articles: `docs/archive/2026-09-15-before-full-site.tar.gz`.
- Earlier concept archives and cinematic source files are unchanged.
- No new image/video generation or paid service calls for this expansion.
- Dashboard data is the existing June 2026 snapshot; no ETL, source refresh or monthly automation was run.
- The dashboard repository remains `../wir-susep-dashboard`. Its JSON and ETL are unchanged.
