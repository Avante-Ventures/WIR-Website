#!/usr/bin/env node
// Generates a static HTML file per article at /insights/<slug>/index.html.
// Reads ARTICLES from src/articles.jsx (single source of truth).
// Run: node scripts/build-articles.cjs

const fs = require("fs");
const path = require("path");

const CACHE_VER = "v=2026091503";
const SITE_URL = "https://wirinnovation.ai";
const OUT_DIR = "public/insights"; // Vite copies public/* to dist/ root, so this lands at dist/insights/

// ---- Read + parse ARTICLES from articles.jsx ----
const src = fs.readFileSync("src/articles.jsx", "utf8");
const startMarker = "const ARTICLES = ";
const startIdx = src.indexOf(startMarker) + startMarker.length;

let depth = 0, arrStart = -1, arrEnd = -1;
for (let i = startIdx; i < src.length; i++) {
  if (src[i] === "[") { if (depth === 0) arrStart = i; depth++; }
  if (src[i] === "]") { depth--; if (depth === 0) { arrEnd = i + 1; break; } }
}
const ARTICLES = eval(src.slice(arrStart, arrEnd));

const esc = (s) => String(s)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#39;");

function renderInline(text) {
  const re = /(\*\*[^*]+\*\*|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  let out = "", lastIndex = 0, m;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) out += esc(text.slice(lastIndex, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      out += `<strong>${esc(tok.slice(2, -2))}</strong>`;
    } else if (tok.startsWith("![")) {
      const im = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(tok);
      out += `<img src="${esc(im[2])}" alt="${esc(im[1])}" />`;
    } else if (tok.startsWith("[")) {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      const isInternal = lm[2].startsWith("#blog/");
      const slug = isInternal ? lm[2].replace("#blog/", "") : null;
      const href = isInternal ? `/insights/${slug}/` : lm[2];
      const attrs = isInternal
        ? `class="blarticle__link-int"`
        : `class="blarticle__link-ext" target="_blank" rel="noopener noreferrer"`;
      out += `<a href="${esc(href)}" ${attrs}>${esc(lm[1])}</a>`;
    } else {
      out += `<em>${esc(tok.slice(1, -1))}</em>`;
    }
    lastIndex = m.index + tok.length;
  }
  if (lastIndex < text.length) out += esc(text.slice(lastIndex));
  return out;
}

function renderBody(body) {
  const blocks = body.trim().split(/\n\s*\n/).map(b => b.trim());
  return blocks.map(block => {
    if (block.startsWith("### ")) return `<h3>${renderInline(block.slice(4))}</h3>`;
    if (block.startsWith("> ")) return `<blockquote>${renderInline(block.slice(2))}</blockquote>`;
    if (/^\d+\.\s/.test(block)) {
      const items = block.split("\n").map(l => l.replace(/^\d+\.\s+/, "").trim()).filter(Boolean);
      return `<ol>\n${items.map(it => `  <li>${renderInline(it)}</li>`).join("\n")}\n</ol>`;
    }
    if (/^-\s/.test(block)) {
      const items = block.split("\n").map(l => l.replace(/^-\s+/, "").trim()).filter(Boolean);
      return `<ul>\n${items.map(it => `  <li>${renderInline(it)}</li>`).join("\n")}\n</ul>`;
    }
    if (block.startsWith("|")) {
      const rows = block.split("\n").map(r => r.trim()).filter(Boolean);
      if (rows.length >= 2 && /^\|[\s:|-]+\|$/.test(rows[1])) {
        const cells = r => r.replace(/^\|/, "").replace(/\|$/, "").split("|").map(c => renderInline(c.trim()));
        const head = cells(rows[0]);
        const body = rows.slice(2).map(cells);
        return `<div class="blarticle__tablewrap"><table class="blarticle__table">\n<thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead>\n<tbody>\n${body.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("\n")}\n</tbody>\n</table></div>`;
      }
    }
    return `<p>${renderInline(block)}</p>`;
  }).join("\n");
}

// Language detection, in priority order:
//   1. An explicit `lang: "en"` on the entry. English-native cluster pages carry no `-en`
//      suffix because they were never translations of a PT article, so the suffix rule
//      alone mislabels them as pt-BR (wrong <html lang>, PT chrome, wrong index).
//   2. Legacy fallback: a `-en` suffix marks the English translation of a PT article.
const EN_LANG_SLUGS = new Set(ARTICLES.filter(a => a.lang === "en").map(a => a.slug));
const hasEnSuffix = (slug) => slug.endsWith("-en");
const isEnglish = (slug) => EN_LANG_SLUGS.has(slug) || hasEnSuffix(slug);
// Sibling helpers stay purely suffix-based: they express the PT<->EN translation pairing,
// which only exists for `-en` articles. An English-native page has no PT sibling.
const ptSlug = (slug) => hasEnSuffix(slug) ? slug.slice(0, -3) : slug;
const enSlug = (slug) => hasEnSuffix(slug) ? slug : `${slug}-en`;

// Build a Set of all known slugs once so we can detect siblings cheaply.
const ALL_SLUGS = new Set(ARTICLES.map(a => a.slug));

// Translation pairing of an article, shared by the hreflang tags and the nav language link so
// the two can never disagree. A sibling only counts if it actually exists.
function siblings(article) {
  const isEn = isEnglish(article.slug);
  // An English-native page (lang:"en", no `-en` suffix) has no translation pair. Without this
  // guard ptSlug() returns the page itself, so it would advertise itself as its own pt-BR
  // alternate and x-default, telling Google an English page is the Brazilian one.
  // `alt: "<slug>"` declares the translation sibling explicitly. English-native pages carry no
  // `-en` suffix, so their PT counterpart cannot be derived from the slug and has to be named.
  const alt = article.alt && ALL_SLUGS.has(article.alt) ? article.alt : null;
  const standaloneEn = isEn && !hasEnSuffix(article.slug) && !alt;
  const ptSibling = alt ? (isEn ? alt : article.slug) : ptSlug(article.slug);
  const enSibling = alt ? (isEn ? article.slug : alt) : enSlug(article.slug);
  const hasPT = !standaloneEn && ALL_SLUGS.has(ptSibling);
  const hasEN = !standaloneEn && ALL_SLUGS.has(enSibling);
  return { isEn, ptSibling, enSibling, hasPT, hasEN };
}

function renderHead(article) {
  const url = `${SITE_URL}/insights/${article.slug}/`;
  // Optional canonical override: when an article declares `canonical: "<other-slug>"`,
  // it is a near-duplicate that defers all ranking signals to that page (fixes keyword
  // cannibalization). We point rel=canonical at the target and suppress this page's own
  // hreflang so it does not fight the canonical target's language cluster.
  const canonicalUrl = article.canonical ? `${SITE_URL}/insights/${article.canonical}/` : url;
  // Hreflang: include alternate ONLY if the sibling actually exists (see siblings()).
  const { isEn, ptSibling, enSibling, hasPT, hasEN } = siblings(article);
  const lang = isEn ? "en" : "pt-BR";
  const ogLocale = isEn ? "en_US" : "pt_BR";
  let hreflangTags = "";
  if (hasPT) hreflangTags += `\n<link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/insights/${ptSibling}/" />`;
  if (hasEN) hreflangTags += `\n<link rel="alternate" hreflang="en" href="${SITE_URL}/insights/${enSibling}/" />`;
  // x-default points to PT-BR (primary language for WIR's BR market)
  if (hasPT) hreflangTags += `\n<link rel="alternate" hreflang="x-default" href="${SITE_URL}/insights/${ptSibling}/" />`;
  if (article.canonical) hreflangTags = "";
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDesc,
    ...(article.image && { "image": article.image }),
    "datePublished": article.dateISO || article.date,
    "author": { "@type": "Person", "name": article.author, "jobTitle": article.role },
    "publisher": {
      "@type": "Organization", "name": "WIR Innovation",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/assets/wir-logo-512.png` },
    },
    "mainEntityOfPage": url,
    "articleSection": article.cat,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": isEnglish(article.slug) ? "Home" : "Início", "item": `${SITE_URL}${isEnglish(article.slug) ? "/en" : ""}/` },
      { "@type": "ListItem", "position": 2, "name": "Insights & News", "item": `${SITE_URL}${insightsHref(isEnglish(article.slug) ? "en" : "pt-BR")}` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": url },
    ],
  };
  // FAQPage schema — only when the article declares a `faq` array.
  // The same `faq` source renders as visible Q&A in the body, so schema
  // and on-page content always match (Google discards mismatched FAQ markup).
  const faqSchema = (Array.isArray(article.faq) && article.faq.length)
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "inLanguage": isEn ? "en" : "pt-BR",
        "mainEntity": article.faq.map(({ q, a }) => ({
          "@type": "Question",
          "name": q,
          "acceptedAnswer": { "@type": "Answer", "text": a },
        })),
      }
    : null;
  const fontsHref = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
  return `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="theme-color" content="#7540AC" />
<title>${esc(article.title)} · WIR Innovation</title>
<meta name="description" content="${esc(article.metaDesc)}" />
<link rel="canonical" href="${canonicalUrl}" />${hreflangTags}

<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(article.title)}" />
<meta property="og:description" content="${esc(article.metaDesc)}" />
<meta property="og:url" content="${url}" />
${article.image ? `<meta property="og:image" content="${SITE_URL}${article.image}" />` : ""}
<meta property="og:locale" content="${ogLocale}" />
<meta property="og:site_name" content="WIR Innovation" />
<meta property="article:author" content="${esc(article.author)}" />
<meta property="article:section" content="${esc(article.cat)}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(article.title)}" />
<meta name="twitter:description" content="${esc(article.metaDesc)}" />
${article.image ? `<meta name="twitter:image" content="${SITE_URL}${article.image}" />` : ""}

<link rel="icon" href="/assets/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<noscript><link rel="stylesheet" href="${fontsHref}" /></noscript>
<script>(function(){if(typeof navigator!=='undefined'&&navigator.webdriver)return;var href=${JSON.stringify(fontsHref)};var inject=function(){var l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.appendChild(l);};if('requestIdleCallback' in window){requestIdleCallback(inject,{timeout:2000});}else{setTimeout(inject,0);}})();</script>

<link rel="stylesheet" href="/style.css?${CACHE_VER}" />
<link rel="stylesheet" href="/home.css?${CACHE_VER}" />
<link rel="stylesheet" href="/blog.css?${CACHE_VER}" />
<link rel="stylesheet" href="/scale-site.css?${CACHE_VER}" />
<script defer src="/article-tools.js?${CACHE_VER}"></script>

<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>${faqSchema ? `\n<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : ""}

<script async src="https://www.googletagmanager.com/gtag/js?id=G-1SW9TDZ9H2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-1SW9TDZ9H2', { anonymize_ip: true });
</script>

<script>document.documentElement.classList.add('js-ready');</script>`;
}

// Per-language chrome strings for generated static pages (PT canonical, EN for -en articles)
const CHROME = {
  "pt-BR": {
    base: "",
    ticker: ["Decisão em minutos · auditável · explicável", "Straight-through processing como padrão", "Plataforma de IA para seguros", "Em conformidade com LGPD"],
    navHome: "Início", navAbout: "Sobre", navSolutions: "Produtos &amp; IA", navProtection: "Proteção de Dados", navCta: "Falar com a WIR", navManifesto: "Manifesto", manifestoHref: "/insights/manifesto/",
    footerDesc: "A nova era do seguro é inteligência de dados, velocidade e escala. A WIR Innovation é a plataforma de IA que entrega essa estrutura dentro dos sistemas que você já opera.",
    colCompany: "Empresa", colContact: "Contato", colHolding: "Sócios &amp; Holding",
    talkTeam: "Falar com a equipe",
    holdMahway: "Mahway · California", holdAvante: "Avante · Brasil", holdAdvisors: "Conselheiros estratégicos", holdPrinciples: "Princípios",
    footerBot: "wirinnovation.ai · Feito entre São Paulo e Silicon Valley",
    waText: "Olá Nicholas, vim pelo site da WIR Innovation. Gostaria de conversar sobre…",
    waAria: "Falar com Nicholas no WhatsApp",
    backTo: "Voltar para Insights &amp; News", moreInsights: "Outros Insights",
    readTime: "de leitura", faqTitle: "Perguntas frequentes",
    menuOpen: "Abrir menu", menuClose: "Fechar menu", langAria: "Idioma",
  },
  en: {
    base: "/en",
    ticker: ["Decisions in minutes · auditable · explainable", "Straight-through processing as the default", "AI platform for insurance", "LGPD-compliant"],
    navHome: "Home", navAbout: "About", navSolutions: "Products &amp; AI", navProtection: "Data Protection", navCta: "Talk to WIR", navManifesto: "Manifesto", manifestoHref: "/insights/manifesto-en/",
    footerDesc: "The new era of insurance is data intelligence, speed, and scale. WIR Innovation is the AI platform that delivers that structure inside the systems you already run.",
    colCompany: "Company", colContact: "Contact", colHolding: "Partners &amp; Holding",
    talkTeam: "Talk to the team",
    holdMahway: "Mahway · California", holdAvante: "Avante · Brazil", holdAdvisors: "Strategic advisors", holdPrinciples: "Principles",
    footerBot: "wirinnovation.ai · Built between São Paulo and Silicon Valley",
    waText: "Hello Nicholas, I found you through the WIR Innovation website. I'd like to talk about…",
    waAria: "Chat with Nicholas on WhatsApp",
    backTo: "Back to Insights &amp; News", moreInsights: "More Insights",
    readTime: "read", faqTitle: "Frequently asked questions",
    menuOpen: "Open menu", menuClose: "Close menu", langAria: "Language",
  },
};
const insightsHref = (lang) => lang === "en" ? "/en/insights/" : "/insights/";

const LANG_META = {
  "pt-BR": { code: "PT", name: "Português", hreflang: "pt-BR" },
  en: { code: "EN", name: "English", hreflang: "en" },
};

// Where the static nav's language link points: the page's real translation, or null when there
// is none (English-native pages, missing siblings, canonicalized near-duplicates), so a reader
// is never sent to a different page in the other language.
function navAlternate(article) {
  if (article.canonical) return null;
  const { isEn, ptSibling, enSibling, hasPT, hasEN } = siblings(article);
  const target = isEn ? (hasPT ? ptSibling : null) : (hasEN ? enSibling : null);
  if (!target || target === article.slug) return null;
  return { href: `/insights/${target}/`, ...LANG_META[isEn ? "pt-BR" : "en"] };
}

// Burger toggle for the static nav, same behaviour as the SPA Nav (src/shared.jsx): Escape and
// link clicks close it, body scroll locks while open, and `inert` keeps the closed menu out of
// the tab order.
const NAV_SCRIPT = "(function(){var b=document.querySelector('.nav__burger'),m=document.getElementById('nav-mobile-menu');if(!b||!m)return;var i=b.querySelector('.nav__burger-icon');function set(o){m.classList.toggle('is-open',o);i.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o?'true':'false');b.setAttribute('aria-label',b.getAttribute(o?'data-label-close':'data-label-open'));m.setAttribute('aria-hidden',o?'false':'true');if(o){m.removeAttribute('inert');}else{m.setAttribute('inert','');}document.body.style.overflow=o?'hidden':'';}b.addEventListener('click',function(){set(b.getAttribute('aria-expanded')!=='true');});document.addEventListener('keydown',function(e){if(e.key==='Escape'&&b.getAttribute('aria-expanded')==='true'){set(false);b.focus();}});m.addEventListener('click',function(e){if(e.target.closest('a'))set(false);});var mq=window.matchMedia('(min-width: 1121px)');if(mq.addEventListener)mq.addEventListener('change',function(e){if(e.matches)set(false);});})();";

// Static chrome nav, mirroring the SPA Nav in src/shared.jsx: ticker, desktop links, language
// link, CTA, burger and mobile menu. `alt` is the page's translation ({ href, code, name,
// hreflang }) or null, in which case no language link renders.
function renderNav(lang = "pt-BR", alt = null) {
  const c = CHROME[lang] || CHROME["pt-BR"];
  const cur = LANG_META[lang] || LANG_META["pt-BR"];
  const tickerItems = [...c.ticker, ...c.ticker]
    .map(t => `    <span class="ticker__item">${t}</span>`).join("\n");
  const links = (indent) => [
    `<a href="${c.base}/#solutions" class="nav__link">${lang === "en" ? "Solutions" : "Soluções"}</a>`,
    `<a href="${c.base}/#how" class="nav__link">${lang === "en" ? "How it works" : "Como funciona"}</a>`,
    `<a href="/dashboard/?lang=${lang === "en" ? "en" : "pt"}" class="nav__link nav__link--badge">Dashboard SUSEP ↗</a>`,
    `<a href="${c.base}/#about" class="nav__link">${lang === "en" ? "About WIR" : "Sobre a WIR"}</a>`,
    `<a href="${c.base}/#protection" class="nav__link">${c.navProtection}</a>`,
    `<a href="${insightsHref(lang)}" class="nav__link nav__link--active">Insights</a>`,
  ].map(l => indent + l).join("\n");
  const langLink = alt ? `
      <div class="nav__lang"><a class="nav__lang-btn" href="${alt.href}" hreflang="${alt.hreflang}" lang="${alt.hreflang}" aria-label="${alt.name}"><span class="nav__lang-code">${alt.code}</span></a></div>` : "";
  const mobileLangs = alt ? `
    <div class="nav__mobile-langs" role="group" aria-label="${c.langAria}">
      <span class="nav__mobile-lang is-active" aria-current="true"><span>${cur.name}</span><span class="nav__mobile-lang-code">${cur.code}</span></span>
      <a class="nav__mobile-lang" href="${alt.href}" hreflang="${alt.hreflang}" lang="${alt.hreflang}"><span>${alt.name}</span><span class="nav__mobile-lang-code">${alt.code}</span></a>
    </div>` : "";
  return `<a class="skip-link" href="#main">${lang === "en" ? "Skip to content" : "Ir para conteúdo"}</a>
<nav class="nav" aria-label="Primary">
  <div class="wrap nav__inner">
    <a href="${c.base}/" class="nav__brand">
      <img src="/assets/wir-logo.svg" alt="WIR Innovation" width="98" height="72" style="height:72px;width:auto;display:block" />
    </a>
    <div class="nav__links">
${links("      ")}
    </div>
    <div class="nav__right">${langLink}
      <a href="${c.base}/#contact" class="nav__cta">
        <span class="dot"></span>
        ${c.navCta}
        <span aria-hidden="true">→</span>
      </a>
      <button type="button" class="nav__burger" aria-label="${c.menuOpen}" aria-expanded="false" aria-controls="nav-mobile-menu" data-label-open="${c.menuOpen}" data-label-close="${c.menuClose}">
        <span class="nav__burger-icon" aria-hidden="true"><span></span><span></span><span></span></span>
      </button>
    </div>
  </div>
</nav>
<div id="nav-mobile-menu" class="nav__mobile" role="dialog" aria-modal="true" aria-label="Menu" aria-hidden="true" inert>
  <div class="nav__mobile-inner">
${links("    ")}
    <a href="${c.base}/#contact" class="nav__mobile-cta">
      <span class="dot"></span>
      ${c.navCta}
      <span aria-hidden="true">→</span>
    </a>${mobileLangs}
  </div>
</div>
<script>${NAV_SCRIPT}</script>`;
}

// Social icons: the same Simple Icons (CC0) paths as SocialIcon in src/shared.jsx, so the static
// footer matches the SPA footer (icon circles with accessible names, not text labels).
const SOCIAL_PATHS = {
  LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.064 2.063 2.063 0 112.063 2.064zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  Instagram: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  X: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
};
const socialIcon = (k) => `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="${SOCIAL_PATHS[k]}"/></svg>`;

function renderFooter(lang = "pt-BR") {
  const c = CHROME[lang] || CHROME["pt-BR"];
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <img src="/assets/wir-logo-branco.svg" alt="WIR Innovation" width="87" height="64" style="height:64px;width:auto;display:block" />
        <p class="footer__brand-desc">${c.footerDesc}</p>
        <div class="footer__social">
          <a href="https://www.linkedin.com/company/wir-innovation/" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="LinkedIn" title="LinkedIn">${socialIcon("LinkedIn")}</a>
          <a href="https://www.instagram.com/wirinnovation" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="Instagram" title="Instagram">${socialIcon("Instagram")}</a>
          <a href="https://x.com/wirinnovationai" target="_blank" rel="noopener noreferrer" class="footer__social-link" aria-label="X" title="X">${socialIcon("X")}</a>
        </div>
      </div>
      <div>
        <h4>${c.colCompany}</h4>
        <ul>
          <li><a href="${c.base}/">${c.navHome}</a></li>
          <li><a href="${c.base}/#about">${c.navAbout}</a></li>
          <li><a href="${c.base}/#solutions">${c.navSolutions}</a></li>
          <li><a href="${c.base}/#protection">${c.navProtection}</a></li>
          <li><a href="${insightsHref(lang)}">Insights &amp; News</a></li>
          <li><a href="${c.base}/#contact">${c.navCta}</a></li>
          <li><a href="/dashboard/?lang=${lang === "en" ? "en" : "pt"}">Dashboard SUSEP ↗</a></li>
          <li><a href="${c.manifestoHref}">${c.navManifesto}</a></li>
        </ul>
      </div>
      <div>
        <h4>${c.colContact}</h4>
        <ul>
          <li><a href="mailto:contato@wirinnovation.ai">contato@wirinnovation.ai</a></li>
          <li><a href="${c.base}/#contact">${c.talkTeam}</a></li>
        </ul>
      </div>
      <div>
        <h4>${c.colHolding}</h4>
        <ul>
          <li><a href="${c.base}/#about">${c.holdMahway}</a></li>
          <li><a href="${c.base}/#about">${c.holdAvante}</a></li>
          <li><a href="${c.base}/#about">${c.holdAdvisors}</a></li>
          <li><a href="${c.base}/#about">${c.holdPrinciples}</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bot">
      <span>© 2026 WIR Innovation</span>
      <span>${c.footerBot}</span>
    </div>
  </div>
</footer>`;
}

function renderWhatsAppFAB(lang = "pt-BR") {
  const c = CHROME[lang] || CHROME["pt-BR"];
  const num = "5511981757505";
  const text = encodeURIComponent(c.waText);
  return `<a href="https://wa.me/${num}?text=${text}" target="_blank" rel="noopener noreferrer" class="wa-fab" aria-label="${c.waAria}">
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
</a>`;
}

// Related insights — automated internal links so every article links (and is
// linked by) 4 siblings. Without this, deep articles only had the hub link +
// any manual body links, leaving low-authority pages "crawled: Never".
// Cyclic next-4 over the same-language list guarantees even coverage (no orphans).
function renderRelated(article) {
  const lang = isEnglish(article.slug) ? "en" : "pt-BR";
  const heading = lang === "en" ? "Related insights" : "Leituras relacionadas";
  // Exclude `linkOnly` entries (hand-authored static pages) from the related pool so
  // their presence in ARTICLES does not shift the cyclic sibling picks of real articles.
  const sameLang = ARTICLES.filter(a => isEnglish(a.slug) === isEnglish(article.slug) && !a.linkOnly);
  if (sameLang.length < 2) return "";
  const idx = sameLang.findIndex(a => a.slug === article.slug);
  const picks = [];
  for (let k = 1; k <= 4 && picks.length < sameLang.length - 1; k++) {
    picks.push(sameLang[(idx + k) % sameLang.length]);
  }
  const items = picks.map(a =>
    `      <li class="blarticle__related-item"><a href="/insights/${a.slug}/"><span class="blarticle__related-cat">${esc(a.cat)}</span> ${esc(a.title)}</a></li>`
  ).join("\n");
  return `
    <nav class="blarticle__related" aria-label="${heading}">
      <h3 class="blarticle__related-title">${heading}</h3>
      <ul class="blarticle__related-list">
${items}
      </ul>
    </nav>
`;
}

function renderArticleHTML(article) {
  const lang = isEnglish(article.slug) ? "en" : "pt-BR";
  const c = CHROME[lang] || CHROME["pt-BR"];
  const initials = article.author.split(" ").map(w => w[0]).slice(0, 2).join("");
  const bodyHTML = renderBody(article.body);
  const relatedHTML = renderRelated(article);
  // Visible FAQ block — single source with the FAQPage schema (see renderHead).
  const faqHTML = (Array.isArray(article.faq) && article.faq.length)
    ? `\n<section class="blarticle__faq" aria-label="${c.faqTitle}">
<h3>${c.faqTitle}</h3>
${article.faq.map(({ q, a }) => `<details class="blarticle__faq-item">
  <summary>${esc(q)}</summary>
  <p>${renderInline(a)}</p>
</details>`).join("\n")}
</section>`
    : "";
  const head = renderHead(article);

  return `<!doctype html>
<html lang="${lang}">
<head>
${head}
</head>
<body class="static-scale">
${renderNav(lang, navAlternate(article))}

<main id="main" tabindex="-1">
<article class="blarticle">
  <div class="wrap blarticle__wrap">
    <a class="blarticle__back" href="${insightsHref(lang)}">
      <span aria-hidden="true">←</span> ${c.backTo}
    </a>

    <header class="blarticle__head">
      <div class="eyebrow">· ${esc(article.cat)}</div>
      <h1 class="display blarticle__title">${esc(article.title)}</h1>
      <p class="blarticle__sub">${esc(article.sub)}</p>
      <div class="blarticle__byline">
        ${article.authorPhoto
          ? `<div class="blarticle__author-photo" style="background-image: url(${article.authorPhoto.startsWith("/") || /^https?:/.test(article.authorPhoto) ? article.authorPhoto : "/" + article.authorPhoto})" role="img" aria-label="${esc(article.author)}"></div>`
          : `<div class="blarticle__author-initials">${esc(initials)}</div>`}
        <div class="blarticle__byline-meta">
          <div class="blarticle__byline-author"><b>${esc(article.author)}</b> · ${esc(article.role)}</div>
          <div class="blarticle__byline-time">${esc(article.date)} · ${esc(article.time)} ${c.readTime}</div>
        </div>
      </div>
    </header>

    <figure class="blarticle__hero-img" style="background: ${article.grad}; aspect-ratio: 16 / 9;">
      ${article.image ? `<img src="${article.image}" alt="${esc(article.imageAlt || article.title)}" width="1600" height="900" loading="eager" fetchpriority="high" />` : ""}
    </figure>

    <div class="blarticle__body">
${bodyHTML}${faqHTML}
    </div>
${relatedHTML}
    <footer class="blarticle__foot">
      <a class="btn btn--ghost" href="${insightsHref(lang)}">
        <span aria-hidden="true">←</span> ${c.moreInsights}
      </a>
      <a class="btn btn--solid" href="${c.base}/#contact">
        ${c.talkTeam} <span class="btn__arrow">→</span>
      </a>
    </footer>
  </div>
</article>
</main>

${renderFooter(lang)}
${renderWhatsAppFAB(lang)}
</body>
</html>`;
}

function renderInsightsIndex(lang = "pt-BR") {
  const en = lang === "en";
  // PT index lists PT articles only; /en/insights/ lists the -en translations only.
  const list = ARTICLES.filter(a => isEnglish(a.slug) === en);
  const idx = {
    title: "Insights &amp; News · WIR Innovation",
    desc: en
      ? "Essays, cases and technical notes from the WIR team on AI applied to the insurance market."
      : "Ensaios, casos e notas técnicas do time da WIR sobre IA aplicada ao mercado segurador.",
    url: `${SITE_URL}${insightsHref(lang)}`,
    h1: en
      ? `Insights on <em>AI, insurance</em> and decisions.`
      : `Insights sobre <em>IA, seguro</em> e decisão.`,
    p: en
      ? "Essays, use cases and technical notes from the WIR team on how Artificial Intelligence is redesigning insurance operations."
      : "Ensaios, casos de uso e notas técnicas do time da WIR sobre como Inteligência Artificial está redesenhando a operação do mercado segurador.",
  };
  // Featured/destaque slot: an entry flagged `featured` (e.g. the WIR Index report)
  // renders as the large hero card at the top; the rest fill the grid below.
  const featured = list.find(a => a.featured);
  const gridList = featured ? list.filter(a => a !== featured) : list;
  const heroCard = featured ? `
    <a href="/insights/${featured.slug}/" class="ix-hero" data-category="${esc(featured.cat)}">
      <div class="ix-hero__img" style="background:${featured.grad};${featured.image ? `background-image:linear-gradient(180deg,rgba(11,10,8,0.15),rgba(11,10,8,0.6)),url(${featured.image});background-size:cover;background-position:center;` : ""}">
        <span class="ix-hero__badge">${en ? "Featured" : "Destaque"}</span>
      </div>
      <div class="ix-hero__body">
        <div class="ix-hero__meta">${esc(featured.cat)} · ${esc(featured.time)} · ${esc(featured.date)}</div>
        <h2>${esc(featured.title)}</h2>
        <p>${esc(featured.sub)}</p>
        <div class="ix-hero__by"><b>${esc(featured.author)}</b> · ${esc(featured.role)}</div>
        <div class="ix-read">${en ? "Read the story" : "Ler a matéria"}<span aria-hidden="true">↗</span></div>
      </div>
    </a>` : "";
  const cards = gridList.map(a => `
    <a href="/insights/${a.slug}/" class="ix-card" data-category="${esc(a.cat)}">
      <div class="ix-card__img" style="background:${a.grad};">
        ${a.image ? `<img src="${esc(a.image)}" alt="" width="1600" height="1000" loading="lazy" decoding="async">` : ''}
      </div>
      <div class="ix-card__body">
        <div class="ix-card__meta">${esc(a.cat)} · ${esc(a.time)} · ${esc(a.date)}</div>
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.sub)}</p>
        <div class="ix-card__by"><b>${esc(a.author)}</b> · ${esc(a.role)}</div>
        <div class="ix-read">${en ? "Read article" : "Ler artigo"}<span aria-hidden="true">↗</span></div>
      </div>
    </a>`).join("\n");

  const head = `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${idx.title}</title>
<meta name="description" content="${idx.desc}" />
<link rel="canonical" href="${idx.url}" />
<link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/insights/" />
<link rel="alternate" hreflang="en" href="${SITE_URL}/en/insights/" />
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/insights/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="${idx.title}" />
<meta property="og:description" content="${idx.desc}" />
<meta property="og:url" content="${idx.url}" />
<link rel="icon" href="/assets/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css?${CACHE_VER}" />
<link rel="stylesheet" href="/home.css?${CACHE_VER}" />
<link rel="stylesheet" href="/blog.css?${CACHE_VER}" />
<link rel="stylesheet" href="/scale-site.css?${CACHE_VER}" />
<script defer src="/article-tools.js?${CACHE_VER}"></script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-1SW9TDZ9H2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-1SW9TDZ9H2', { anonymize_ip: true });
</script>
<script>document.documentElement.classList.add('js-ready');</script>
<style>
.ix { padding:80px 0; background:var(--paper);}
.ix__head { max-width:760px; margin-bottom:48px;}
.ix__head h1 { font-size:clamp(40px,5vw,64px); line-height:1.05; letter-spacing:-0.015em; margin:16px 0 20px; }
.ix__head p { font-size:19px; color:var(--ink-2); line-height:1.5; max-width:600px;}
.ix-hero { display:grid; grid-template-columns:1.15fr 1fr; gap:36px; align-items:center; margin-bottom:56px; text-decoration:none; color:inherit; transition:transform .2s ease;}
.ix-hero:hover { transform:translateY(-3px);}
.ix-hero__img { aspect-ratio:16/9; border-radius:16px; position:relative; overflow:hidden;}
.ix-hero__badge { position:absolute; top:16px; right:16px; padding:5px 12px; background:var(--purple,#7540AC); color:#fff; border-radius:4px; font-family:var(--f-mono); font-size:10px; letter-spacing:.14em; text-transform:uppercase;}
.ix-hero__meta { font-family:var(--f-mono); font-size:11px; letter-spacing:.04em; color:var(--ink-3); text-transform:uppercase;}
.ix-hero__body h2 { font-family:var(--f-display); font-weight:500; font-size:clamp(28px,3.2vw,40px); line-height:1.12; margin:12px 0 12px; letter-spacing:-0.01em;}
.ix-hero__body p { font-size:16px; line-height:1.55; color:var(--ink-2); max-width:52ch;}
.ix-hero__by { font-family:var(--f-mono); font-size:11px; letter-spacing:.04em; color:var(--ink-3); margin-top:16px;}
.ix-hero__by b { color:var(--ink); font-weight:500;}
.ix__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px;}
.ix-card { display:flex; flex-direction:column; gap:14px; text-decoration:none; color:inherit; transition:transform .2s ease;}
.ix-card:hover { transform:translateY(-3px);}
.ix-card__img { aspect-ratio:16/10; border-radius:12px; position:relative; overflow:hidden;}
.ix-card__meta { font-family:var(--f-mono); font-size:11px; letter-spacing:.04em; color:var(--ink-3); text-transform:uppercase;}
.ix-card__body h2 { font-family:var(--f-display); font-weight:500; font-size:22px; line-height:1.2; margin:8px 0 8px; letter-spacing:-0.005em;}
.ix-card__body p { font-size:14px; line-height:1.55; color:var(--ink-2);}
.ix-card__by { font-family:var(--f-mono); font-size:11px; letter-spacing:.04em; color:var(--ink-3); margin-top:6px;}
.ix-card__by b { color:var(--ink); font-weight:500;}
@media (max-width:980px){ .ix__grid { grid-template-columns:repeat(2,1fr);} }
@media (max-width:820px){ .ix-hero { grid-template-columns:1fr; gap:20px; margin-bottom:40px;} }
@media (max-width:640px){ .ix__grid { grid-template-columns:1fr; gap:24px;} .ix { padding:48px 0;} }
</style>`;

  return `<!doctype html>
<html lang="${lang}">
<head>
${head}
</head>
<body class="static-scale">
${renderNav(lang, { href: en ? "/insights/" : "/en/insights/", ...LANG_META[en ? "pt-BR" : "en"] })}
<main id="main" tabindex="-1">
<section class="ix">
  <header class="ix-mast"><div class="wrap">
    <div class="ix-mast__line"><span>WIR / INSIGHTS &amp; NEWS</span><span>AI FOR INSURANCE</span></div>
    <div class="ix__head">
      <h1>${idx.h1}</h1>
      <p>${idx.p}</p>
    </div>
  </div></header>
  <div class="wrap">
    <div class="ix-library-head"><h2>${en ? "Explore the perspectives." : "Explore as perspectivas."}</h2><span>${en ? "KNOWLEDGE / IN CONTEXT" : "CONHECIMENTO / EM CONTEXTO"}</span></div>
    <form class="ix-tools" role="search" data-archive-tools>
      <label for="insight-search">${en ? "Search insights" : "Buscar insights"}<input id="insight-search" type="search" name="q" placeholder="${en ? "Topic, title or author" : "Tema, título ou autor"}" autocomplete="off"></label>
      <label for="insight-category">${en ? "Topic" : "Tema"}<select id="insight-category" name="category"><option value="">${en ? "All topics" : "Todos os temas"}</option>${[...new Set(list.map(a => a.cat))].sort().map(cat => `<option value="${esc(cat)}">${esc(cat)}</option>`).join('')}</select></label>
      <p class="ix-count" role="status" aria-live="polite"></p>
    </form>
${heroCard}
    <p class="ix-empty" hidden>${en ? "No matching articles. Try another search or topic." : "Nenhum artigo encontrado. Tente outra busca ou tema."}</p>
    <div class="ix__grid">
${cards}
    </div>
  </div>
</section>
</main>
${renderFooter(lang)}
${renderWhatsAppFAB(lang)}
</body>
</html>`;
}

// Static articles and React share the approved shell and visual tokens.
fs.copyFileSync('src/styles/style.css', 'public/style.css');
fs.writeFileSync('public/scale-site.css', fs.readFileSync('src/styles/site-scale.css', 'utf8') + '\n' + fs.readFileSync('src/styles/editorial-details.css', 'utf8'));
const latest = {};
for (const [key, en] of [['pt', false], ['en', true]]) {
  latest[key] = ARTICLES.filter(a => isEnglish(a.slug) === en && !a.linkOnly)
    .sort((a,b) => (b.dateISO || '').localeCompare(a.dateISO || '')).slice(0,3)
    .map(({slug,title,date,dateISO,image,time}) => ({slug,title,date,dateISO,image,time}));
}
fs.writeFileSync('src/home-insights.mjs', '// Generated by scripts/build-articles.cjs. Article bodies stay out of the home bundle.\nexport const HOME_INSIGHTS = ' + JSON.stringify(latest,null,2) + ';\n');

const insightsDir = path.join(process.cwd(), OUT_DIR);
fs.mkdirSync(insightsDir, { recursive: true });

// `linkOnly` articles are hand-authored static pages (e.g. the WIR Index report).
// They must appear in the Insights index and be cross-linked, but we must NOT
// generate a page for them — doing so would clobber the hand-authored file.
ARTICLES.filter(article => !article.linkOnly).forEach(article => {
  const dir = path.join(insightsDir, article.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderArticleHTML(article), "utf8");
  console.log(`  ok ${OUT_DIR}/${article.slug}/index.html`);
});

fs.writeFileSync(path.join(insightsDir, "index.html"), renderInsightsIndex("pt-BR"), "utf8");
console.log(`  ok ${OUT_DIR}/index.html (pt-BR)`);

// English archive at /en/insights/ — lists only the -en translations
const enInsightsDir = path.join(process.cwd(), "public", "en", "insights");
fs.mkdirSync(enInsightsDir, { recursive: true });
fs.writeFileSync(path.join(enInsightsDir, "index.html"), renderInsightsIndex("en"), "utf8");
console.log(`  ok public/en/insights/index.html (en)`);

console.log(`\nBuilt ${ARTICLES.length} static article pages + 2 indexes (pt-BR, en).\n`);
