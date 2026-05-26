#!/usr/bin/env node
// IndexNow ping — submits sitemap URLs to Bing/Yandex/Naver via api.indexnow.org.
// Why: ChatGPT Search, Copilot, and Perplexity all use Bing as a backbone — without
// fast Bing indexing, ~70% of LLM citation paths are blocked.
// Run: node scripts/indexnow.mjs

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HOST = "wirinnovation.ai";
const SITEMAP_PATH = path.join(ROOT, "sitemap.xml");
const KEY_FILE = path.join(ROOT, ".indexnow-key");

if (!fs.existsSync(KEY_FILE)) {
  console.error(`✗ Missing ${KEY_FILE}. Create it with a 32-char hex key (must match the public <key>.txt file).`);
  process.exit(1);
}
const KEY = fs.readFileSync(KEY_FILE, "utf8").trim();
if (!/^[a-f0-9]{32}$/i.test(KEY)) {
  console.error("✗ Key in .indexnow-key must be 32-char hex.");
  process.exit(1);
}

const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

// Parse sitemap.xml for URL list
const sitemap = fs.readFileSync(SITEMAP_PATH, "utf8");
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
if (urlList.length === 0) {
  console.error("✗ No <loc> URLs found in sitemap.xml");
  process.exit(1);
}

console.log(`→ Pinging IndexNow with ${urlList.length} URLs for ${HOST}`);
console.log(`  Key location: ${KEY_LOCATION}`);

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
};

const res = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`← ${res.status} ${res.statusText}`);
const text = await res.text();
if (text) console.log(text);

// 200 = accepted, 202 = accepted async, 422 = key/host mismatch, 403 = key file missing
if (res.status >= 200 && res.status < 300) {
  console.log(`✓ Submitted. Expect Bing/Yandex re-crawl within 48-72h.`);
  process.exit(0);
} else {
  console.error(`✗ IndexNow returned non-success. Common causes: ${KEY_LOCATION} not yet deployed, or key mismatch.`);
  process.exit(1);
}
