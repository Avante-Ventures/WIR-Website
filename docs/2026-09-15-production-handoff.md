# WIR — approved production handoff

## Status

The complete website and existing SUSEP dashboard are published. Cristian approved the visual direction, authorized merge/push/publication, requested the final refinements, and explicitly expressed satisfaction with the result. This is the current baseline; do not restart from the rejected explorations.

| Project | Repository | Latest application release | Production |
| --- | --- | --- | --- |
| Website | `Avante-Ventures/WIR-Website` | `f4b003d` on `main` | https://wirinnovation.ai/ |
| SUSEP dashboard | `Avante-Ventures/wir-susep-dashboard` | `02d7c77` on `main` | https://dashboard.wirinnovation.ai/ |

Documentation-only commits may follow these application commits. No new product dashboards were commissioned. The existing public SUSEP market dashboard is the agreed scope.

## Design decisions to preserve

Nicholas selected A's white navigation and navy luminous-ribbon hero, C's dark three-column capabilities, and E's lavender implementation section. The visual vocabulary is navy, blue/lavender, selective amber, translucent glass, luminous threads, large sans-serif headings and italic serif emphasis. The official logo and real founder photography stay in use.

The story is simple: work arrives through email; information connects; the organization gains capacity across distribution, underwriting and visibility. The headline **“IA para escalar o mercado segurador.”** remains immediately readable. Text and controls are HTML, not baked into the film.

The eight-second silent opening runs once per session: incoming mail at 0–2 seconds, convergence at 2–5, three ribbons at 5–8. It has pause/replay, offscreen and hidden-tab suspension, teardown on navigation, and a final-poster fallback for reduced motion, rejected playback or media failure. Navigation and scrolling remain available.

Cristian rejected the small hero eyebrow **“AI Scale Solutions · Brasil/Brazil”** because it looked too AI-generated. It was removed in every language in `f4b003d`. Do not reintroduce it. This is a targeted hero decision, not a request to remove the approved central headline or rewrite positioning throughout the site.

## Published pages and behavior

| Area | Route | Current treatment |
| --- | --- | --- |
| Home | `/` | Film, dark capabilities, lavender implementation, team, recent insights and contact close |
| Solutions | `/#solutions` | Three glass forms, illustrated capability cards, product panels and visibility section |
| 01 — Distribution | `/#solutions#stack-tab-SS` | Smart Sales tab, dedicated illustration and numbered benefits |
| 02 — Underwriting | `/#solutions#stack-tab-UI` | Underwriter Intelligence tab, dedicated illustration and numbered benefits |
| 03 — Visibility | `/#solutions#operational-intelligence` | Analytics illustration and public SUSEP entry |
| How it works | `/#how` | Receive/Connect/Act keyboard-accessible explorer and complete implementation journey |
| About | `/#about` | Real founders, WIR/we statement, advisors, partners, values and FAQs |
| Data Protection | `/#protection` | Dark shield opening; PT manifesto with a twelve-section index |
| Contact | `/#contact` | Existing form and backend contract; timeout and failure handling |
| Insights | `/insights/`, `/en/insights/` | Editorial archive, featured story, search/filter/count/empty state |
| Article | `/insights/<slug>/` | Static reader, heading index, progress and related reading |
| Market dashboard | `/dashboard/?lang=pt` | Redirect to the separate SUSEP deployment; language preserved |

PT, EN and ES use `/`, `/en/` and `/es/`. Spanish Insights explicitly opens the Portuguese archive. The shared menu has no ticker; Dashboard SUSEP is amber, and Data Protection is present in desktop/mobile React and static article navigation. Existing partner and principle deep links remain valid.

Smart Sales and Underwriter Intelligence retain their existing production status; X-sell Brokers and SDR New Business retain their development status. Decorative diagrams are conceptual illustrations, not screenshots or claims about measured results.

### Content boundaries

- The Portuguese security manifesto was authored by Luiz. Its twelve sections and assertions remain unchanged. Obtain his sign-off before altering those assertions.
- EN/ES Protection pages retain their prior editorial content pending approved translations of the PT manifesto. Visual consistency does not imply that all language versions contain the same security statements.
- Do not invent customers, results, certifications, delivery commitments or other commercial claims.
- Contact/newsletter requests keep the existing Supabase contract. No real messages or subscriptions were submitted during validation.
- Dashboard JSON, calculations and ETL were preserved. The redesign did not refresh the existing June 2026 data snapshot.

## Implementation map

| Source | Responsibility |
| --- | --- |
| `src/home-opening.jsx` | Film lifecycle, headline, CTAs and translated scene labels |
| `src/home.jsx` | Home sections and entry points to solutions |
| `src/styles/hero-film.css`, `src/styles/home-scale.css` | Approved opening and home composition |
| `src/experience-pages.jsx`, `src/styles/experience-pages.css` | Solutions, How and About experiences |
| `src/solution-art.jsx` | Shared editable SVG capability illustrations |
| `src/home-shift.jsx` | Product tabs, existing product copy and statuses |
| `src/data-protection.jsx` | Protection hero, language-specific content and manifesto index |
| `src/styles/editorial-details.css` | Product details, Protection and Insights refinement |
| `src/styles/site-scale.css` | Shared public-page theme |
| `src/app.jsx`, `src/shared.jsx`, `src/i18n.js` | Routing, shell, navigation and language |
| `src/articles.jsx` | Article source of truth |
| `scripts/build-articles.cjs` | Static articles, archive, shared styles and latest-home metadata |
| `public/article-tools.js` | Archive filtering, article TOC, reading progress and menu keyboard handling |
| `public/report-scale.css` | Theme for the preserved hand-authored WIR Index report |
| `src/form-transport.mjs` | Existing form transport with a 15-second timeout |
| `scripts/articles-dev.mjs` | Correct local static article directory routing |
| `scripts/dashboard-dev.mjs` | Local access to the sibling dashboard's public files only |
| `../wir-susep-dashboard/assets/scale-dashboard.css` | Dashboard visual theme |

The article generator copies `src/styles/style.css` to `public/style.css` and combines `site-scale.css` with `editorial-details.css` into `public/scale-site.css`. It also generates `src/home-insights.mjs` from the latest available article metadata. Do not maintain these outputs manually. Refresh the generator's cache version when shipping shared static asset changes.

The archive comprises 150 generated article pages plus the preserved hand-authored report. Earlier work fixed 28 stale references and checks more than 3,700 internal article links/assets. The former large article-body bundle is no longer downloaded by the home.

## Assets, costs and archives

Production film and posters are in `public/assets/scale/`:

- `intro-desktop.mp4`: 1920×1080, eight seconds, approximately 1.7 MiB.
- `intro-mobile.mp4`: 960×720, eight seconds, approximately 542 KiB; a deliberate crop of the same master.
- `hero-final.jpg` and `hero-mobile.jpg`: optimized static fallbacks.

[Media sources](media/wir-scale/) contain three keyframes, prompts, the original master, generation record, contact sheet and a local review page. One Higgsfield Seedance 2.0 video generation used **72 credits**. The three still frames used image generation; exact ChatGPT credit usage is not exposed. No additional paid image/video generations were used for the complete-site expansion or later refinements.

Rejected email concepts v1–v3 and alternative design directions stay under `docs/concepts/`. The [exploration memory](2026-09-14-exploration-memory.md) records the rejection and context. Previous home sources remain in `docs/media/wir-scale/`; the pre-expansion archive is `docs/archive/2026-09-15-before-full-site.tar.gz`. Preserve these as history, not active design specifications.

## Local workflow and validation

Use the existing Vite process when available. Otherwise run `npm run dev -- --host 127.0.0.1` and open http://127.0.0.1:3000/. The [responsive review](full-site-review.html) offers 390px and 1280px frames and a page selector. Example: `/docs/full-site-review.html?page=%2F%23protection`. These review files are local-only and excluded from production.

```sh
npm run build
npm test
```

For React-only edits that should not regenerate unrelated articles, use `npx vite build`. For generator or shared static CSS edits, run the full build so committed outputs match their sources. Tests that inspect the dashboard require the sibling checkout and explicitly skip without it.

Latest validation evidence:

- Full build passed after editorial refinement; **30 tests passed** across film playback/lifecycle, page renders, manifesto destinations, How flow keyboard interaction, article search/TOC/links, dashboard loading/retry/locale/theme and simulated form transport.
- The final hero-label deletion passed `npx vite build` and production bundle verification. The full suite was not rerun for that one-line text removal.
- Approved PT manifesto and product description/status blocks were compared byte-for-byte with the previous release and were unchanged.
- Safari desktop and 390px reviews covered the renewed pages. Searching Insights for Nicholas returned five matches and updated the shareable query string.
- Fixed a legacy entrance animation that could leave a product panel invisible, and a Protection CSS specificity conflict found during visual review.
- Production responses for the home, PT/EN archive, article and shared stylesheet were verified. The latest home bundle after the label removal was `/assets/main-oE9UGDMO.js`.
- Exceptional film states were exercised with lifecycle doubles. This is not a claim of exhaustive physical iOS/Android testing. End-to-end real lead delivery was not tested because no messages were sent.

## Deployment

Check `git status` first and preserve other contributors' work. Commit/push/publication require Cristian's authorization; this record confirms the completed release rather than granting permission for unrelated future releases.

The correct Vercel scope is **`cristian-2293s-projects`**:

| Project | Vercel project ID |
| --- | --- |
| `wir-website` | `prj_7o3W0cLVkTKXaT10E4Ib0jelo5Vz` |
| `wir-susep-dashboard` | `prj_XelXFvSkO5MlUDUMyil19EbToD1y` |

Both use organization `team_c1MqRUFlXbosQdcutUBLC4YP`. Verify the local `.vercel/project.json` before deployment. The similarly named old `cristian-mendivelsos-projects` team has a stale/orphan website project and must not be used. Never print credentials; `.env.local` and `.vercel/` remain ignored.

After relevant checks and authorized Git integration, deploy from the corresponding repository:

```sh
vercel deploy --prod --scope cristian-2293s-projects --yes
```

Do not rely on a Git webhook or an old deployment's redeploy button as proof that the current source is live. Confirm the new deployment is ready and aliased to the intended domain, then verify production assets against the local build.

Website `vercel.json` explicitly selects Vite, `npm run build`, and output `dist`. The previous generic project preset could publish `public/` incorrectly. Preserve the explicit `/dashboard/` redirect in addition to `/dashboard/:path*`; the wildcard alone failed to cover the trailing-slash entry. Verify `?lang=` survives the redirect.

Website `.vercelignore` excludes docs, tests, agent instructions, node modules and environment files. Dashboard exclusions also keep ETL and private operational files out of the deployment. Website changes do not deploy the sibling dashboard. The navigation uses `dashboard.wirinnovation.ai`; the unused legacy `insights.wirinnovation.ai` alias had a DNS issue during release review and is not a substitute destination.

## Release history

| Commit | Delivered change |
| --- | --- |
| `f4f2034` | Complete approved site and cinematic opening |
| `699a334` | Explicit Vite production output configuration |
| `2480e36` | Dashboard trailing-slash redirect |
| `e807f7b` | Data Protection in every shared menu |
| `6a3862c` | Solution details, Protection and Insights visual refinement |
| `f4b003d` | Removed the AI Scale Solutions country label from the hero |
| Dashboard `02d7c77` | SUSEP visual/interaction alignment without changing data or calculations |

The historical delivery records are linked in the [documentation index](README.md). Their earlier local-only status and smaller test counts describe intermediate checkpoints, not remaining work.
