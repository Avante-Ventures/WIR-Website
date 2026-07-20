#!/usr/bin/env node
// Regenerates public/sitemap.xml from every page under public/insights/<slug>/.
// Static sites have no DB, so the sitemap was hand-maintained and went stale.
// Run: node scripts/build-sitemap.cjs   (also safe to call after build-articles.cjs)
const fs = require("fs");
const path = require("path");
const SITE = "https://wirinnovation.ai";
const INSIGHTS = path.join("public", "insights");
const today = new Date().toISOString().slice(0, 10);

// Slugs that declare `canonical: "<other>"` are near-duplicates that defer to another page.
// They must NOT appear in the sitemap (Google: list only canonical URLs).
let canonicalizedAway = new Set();
try {
  const asrc = fs.readFileSync("src/articles.jsx", "utf8");
  const m = "const ARTICLES = ";
  const startIdx = asrc.indexOf(m) + m.length;
  let depth = 0, aStart = -1, aEnd = -1;
  for (let i = startIdx; i < asrc.length; i++) {
    if (asrc[i] === "[") { if (depth === 0) aStart = i; depth++; }
    if (asrc[i] === "]") { depth--; if (depth === 0) { aEnd = i + 1; break; } }
  }
  // eval is safe here: build-time only, over the project's own checked-in src/articles.jsx
  // (trusted source, no untrusted input); mirrors the exact parser in build-articles.cjs
  // because the JSX module cannot be require()'d.
  const ARTICLES = eval(asrc.slice(aStart, aEnd));
  canonicalizedAway = new Set(ARTICLES.filter(a => a.canonical).map(a => a.slug));
} catch (e) { console.warn("sitemap: could not read canonicalized slugs:", e.message); }

const slugs = fs.readdirSync(INSIGHTS, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(INSIGHTS, d.name, "index.html")))
  .map(d => d.name)
  .filter(s => !canonicalizedAway.has(s))
  .sort();

const urls = [
  { loc: `${SITE}/`, priority: "1.0", changefreq: "weekly" },
  { loc: `${SITE}/en/`, priority: "0.9", changefreq: "weekly" },
  { loc: `${SITE}/es/`, priority: "0.9", changefreq: "weekly" },
  { loc: `${SITE}/insights/`, priority: "0.9", changefreq: "weekly" },
  { loc: `${SITE}/en/insights/`, priority: "0.8", changefreq: "weekly" },
  ...slugs.map(s => ({ loc: `${SITE}/insights/${s}/`, priority: "0.8" })),
];

const body = urls.map(u => {
  const cf = u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : "";
  return `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod>${cf}<priority>${u.priority}</priority></url>`;
}).join("\n");

fs.writeFileSync(path.join("public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(`sitemap.xml: ${urls.length} URLs (${slugs.length} insights)`);
