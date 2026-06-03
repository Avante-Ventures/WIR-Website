#!/usr/bin/env node
// Regenerates public/sitemap.xml from every page under public/insights/<slug>/.
// Static sites have no DB, so the sitemap was hand-maintained and went stale.
// Run: node scripts/build-sitemap.cjs   (also safe to call after build-articles.cjs)
const fs = require("fs");
const path = require("path");
const SITE = "https://wirinnovation.ai";
const INSIGHTS = path.join("public", "insights");
const today = new Date().toISOString().slice(0, 10);

const slugs = fs.readdirSync(INSIGHTS, { withFileTypes: true })
  .filter(d => d.isDirectory() && fs.existsSync(path.join(INSIGHTS, d.name, "index.html")))
  .map(d => d.name)
  .sort();

const urls = [
  { loc: `${SITE}/`, priority: "1.0", changefreq: "weekly" },
  { loc: `${SITE}/insights/`, priority: "0.9", changefreq: "weekly" },
  ...slugs.map(s => ({ loc: `${SITE}/insights/${s}/`, priority: "0.8" })),
];

const body = urls.map(u => {
  const cf = u.changefreq ? `<changefreq>${u.changefreq}</changefreq>` : "";
  return `  <url><loc>${u.loc}</loc><lastmod>${today}</lastmod>${cf}<priority>${u.priority}</priority></url>`;
}).join("\n");

fs.writeFileSync(path.join("public", "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
console.log(`sitemap.xml: ${urls.length} URLs (${slugs.length} insights)`);
