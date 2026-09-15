# WIR Innovation website

The approved public WIR website: a cinematic email-to-ribbon opening, complete PT/EN/ES site, editorial archive and access to the existing SUSEP market dashboard.

- **Production:** https://wirinnovation.ai/
- **Dashboard:** https://dashboard.wirinnovation.ai/
- **Start here:** [Current state and operating guide](docs/2026-09-15-production-handoff.md)
- **Design, implementation and archives:** [Documentation index](docs/README.md)

## Local development

React 18 and Vite 6 build the website. The browser does not compile JSX.

```sh
npm install
npm run dev -- --host 127.0.0.1
```

Open http://127.0.0.1:3000/ or the [responsive review](http://127.0.0.1:3000/docs/full-site-review.html). Reuse an existing Vite server before starting another. Local dashboard review requires the sibling `../wir-susep-dashboard` checkout; no second server is necessary.

## Build and validation

```sh
npm run build
npm test
```

`npm run build` generates the article pages and shared static styles, then builds the PT, EN and ES Vite entries into `dist/`. For a React-only change that should not regenerate articles, use `npx vite build`. Dashboard tests explicitly skip when the sibling repository is missing.

Article bodies live in `src/articles.jsx`; generated `public/insights/*/index.html` files are not an editing surface. Preserve the separate hand-authored WIR Index report.

## Publication

Both repositories use `main`. The website and dashboard are separate Vercel projects. Do not assume a Git push publishes the site: the verified release path uses the Vercel CLI with scope `cristian-2293s-projects`. See the [deployment procedure and traps](docs/2026-09-15-production-handoff.md#deployment).

Commit, push and publication require Cristian's authorization. The September 15 release and its requested refinements were explicitly authorized and published; this README does not authorize unrelated future releases. Keep credentials in ignored `.env.local` and never add them to documentation.
