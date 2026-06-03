#!/usr/bin/env node
// Generates a static HTML file per article at /insights/<slug>/index.html.
// Reads ARTICLES from src/articles.jsx (single source of truth).
// Run: node scripts/build-articles.cjs

const fs = require("fs");
const path = require("path");

const CACHE_VER = "v=2026052D";
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
    return `<p>${renderInline(block)}</p>`;
  }).join("\n");
}

// Slug-based language detection: -en suffix means English version
const isEnglish = (slug) => slug.endsWith("-en");
const ptSlug = (slug) => isEnglish(slug) ? slug.slice(0, -3) : slug;
const enSlug = (slug) => isEnglish(slug) ? slug : `${slug}-en`;

// Build a Set of all known slugs once so we can detect siblings cheaply.
const ALL_SLUGS = new Set(ARTICLES.map(a => a.slug));

function renderHead(article) {
  const url = `${SITE_URL}/insights/${article.slug}/`;
  const isEn = isEnglish(article.slug);
  const lang = isEn ? "en" : "pt-BR";
  const ogLocale = isEn ? "en_US" : "pt_BR";
  // Hreflang: include alternate ONLY if the sibling actually exists
  const ptSibling = ptSlug(article.slug);
  const enSibling = enSlug(article.slug);
  const hasPT = ALL_SLUGS.has(ptSibling);
  const hasEN = ALL_SLUGS.has(enSibling);
  let hreflangTags = "";
  if (hasPT) hreflangTags += `\n<link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/insights/${ptSibling}/" />`;
  if (hasEN) hreflangTags += `\n<link rel="alternate" hreflang="en" href="${SITE_URL}/insights/${enSibling}/" />`;
  // x-default points to PT-BR (primary language for WIR's BR market)
  if (hasPT) hreflangTags += `\n<link rel="alternate" hreflang="x-default" href="${SITE_URL}/insights/${ptSibling}/" />`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.metaDesc,
    ...(article.image && { "image": article.image }),
    "datePublished": article.date,
    "author": { "@type": "Person", "name": article.author, "jobTitle": article.role },
    "publisher": {
      "@type": "Organization", "name": "WIR Innovation",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/assets/wir-logo-azul.svg` },
    },
    "mainEntityOfPage": url,
    "articleSection": article.cat,
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Insights & News", "item": `${SITE_URL}/insights/` },
      { "@type": "ListItem", "position": 3, "name": article.title, "item": url },
    ],
  };
  const fontsHref = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";
  return `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="theme-color" content="#7540AC" />
<title>${esc(article.title)} — WIR Innovation</title>
<meta name="description" content="${esc(article.metaDesc)}" />
<link rel="canonical" href="${url}" />${hreflangTags}

<meta property="og:type" content="article" />
<meta property="og:title" content="${esc(article.title)}" />
<meta property="og:description" content="${esc(article.metaDesc)}" />
<meta property="og:url" content="${url}" />
${article.image ? `<meta property="og:image" content="${article.image}" />` : ""}
<meta property="og:locale" content="${ogLocale}" />
<meta property="og:site_name" content="WIR Innovation" />
<meta property="article:author" content="${esc(article.author)}" />
<meta property="article:section" content="${esc(article.cat)}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${esc(article.title)}" />
<meta name="twitter:description" content="${esc(article.metaDesc)}" />
${article.image ? `<meta name="twitter:image" content="${article.image}" />` : ""}

<link rel="icon" type="image/svg+xml" href="/assets/wir-logo-azul.svg" />
<link rel="apple-touch-icon" href="/assets/wir-logo-azul.svg" />

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<noscript><link rel="stylesheet" href="${fontsHref}" /></noscript>
<script>(function(){if(typeof navigator!=='undefined'&&navigator.webdriver)return;var href=${JSON.stringify(fontsHref)};var inject=function(){var l=document.createElement('link');l.rel='stylesheet';l.href=href;document.head.appendChild(l);};if('requestIdleCallback' in window){requestIdleCallback(inject,{timeout:2000});}else{setTimeout(inject,0);}})();</script>

<link rel="stylesheet" href="/style.css?${CACHE_VER}" />
<link rel="stylesheet" href="/home.css?${CACHE_VER}" />
<link rel="stylesheet" href="/blog.css?${CACHE_VER}" />

<script type="application/ld+json">${JSON.stringify(schema)}</script>
<script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-1SW9TDZ9H2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-1SW9TDZ9H2', { anonymize_ip: true });
</script>

<script>document.documentElement.classList.add('js-ready');</script>`;
}

function renderNav() {
  return `<div class="ticker">
  <div class="ticker__track">
    <span class="ticker__item"><span class="ticker__dot"></span>Decisão em minutos · auditável · explicável</span>
    <span class="ticker__item"><span class="ticker__dot ticker__dot--p"></span>Straight-through processing como padrão</span>
    <span class="ticker__item"><span class="ticker__dot ticker__dot--b"></span>Plataforma de IA para seguros</span>
    <span class="ticker__item"><span class="ticker__dot ticker__dot--o"></span>Em conformidade com LGPD</span>
    <span class="ticker__item"><span class="ticker__dot"></span>Decisão em minutos · auditável · explicável</span>
    <span class="ticker__item"><span class="ticker__dot ticker__dot--p"></span>Straight-through processing como padrão</span>
  </div>
</div>
<nav class="nav">
  <div class="wrap nav__inner">
    <a href="/" class="nav__brand">
      <img src="/assets/wir-logo-azul.svg" alt="WIR Innovation" style="height:60px;width:auto;display:block" />
      <span class="nav__brand-sub">Innovation · AI Stack</span>
    </a>
    <div class="nav__links">
      <a href="/" class="nav__link">Início</a>
      <a href="/#about" class="nav__link">Sobre</a>
      <a href="/#solutions" class="nav__link">Produtos &amp; IA</a>
      <a href="/#protection" class="nav__link">Proteção de Dados</a>
      <a href="/insights/" class="nav__link nav__link--active">Insights &amp; News</a>
    </div>
    <a href="/#contact" class="nav__cta">
      <span class="dot"></span>
      Contato
      <span aria-hidden="true">→</span>
    </a>
  </div>
</nav>`;
}

function renderFooter() {
  return `<footer class="footer">
  <div class="wrap">
    <div class="footer__grid">
      <div>
        <img src="/assets/wir-logo-branco.svg" alt="WIR Innovation" style="height:64px;width:auto;display:block" />
        <p class="footer__brand-desc">A nova era do seguro é inteligência de dados, velocidade e escala. A WIR Innovation é a plataforma de IA que entrega essa estrutura dentro dos sistemas que você já opera.</p>
        <div class="footer__social">
          <a href="https://www.linkedin.com/company/wir-innovation/" target="_blank" rel="noopener noreferrer" class="footer__social-link">LinkedIn <span aria-hidden="true">↗</span></a>
          <a href="https://www.instagram.com/wirinnovation" target="_blank" rel="noopener noreferrer" class="footer__social-link">Instagram <span aria-hidden="true">↗</span></a>
          <a href="https://x.com/wirinnovationai" target="_blank" rel="noopener noreferrer" class="footer__social-link">X <span aria-hidden="true">↗</span></a>
        </div>
      </div>
      <div>
        <h4>Empresa</h4>
        <ul>
          <li><a href="/">Início</a></li>
          <li><a href="/#about">Sobre</a></li>
          <li><a href="/#solutions">Produtos &amp; IA</a></li>
          <li><a href="/#protection">Proteção de Dados</a></li>
          <li><a href="/insights/">Insights &amp; News</a></li>
          <li><a href="/#contact">Contato</a></li>
        </ul>
      </div>
      <div>
        <h4>Contato</h4>
        <ul>
          <li><a href="mailto:contato@wirinnovation.ai">contato@wirinnovation.ai</a></li>
          <li><a href="/#contact">Falar com a equipe</a></li>
        </ul>
      </div>
      <div>
        <h4>Sócios &amp; Holding</h4>
        <ul>
          <li><a href="/#about">Mahway · California</a></li>
          <li><a href="/#about">Avante · Brasil</a></li>
          <li><a href="/#about">Conselheiros estratégicos</a></li>
          <li><a href="/#about">Princípios</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bot">
      <span>© 2026 WIR Innovation</span>
      <span>wirinnovation.ai · Feito entre São Paulo e Silicon Valley</span>
    </div>
  </div>
</footer>`;
}

function renderWhatsAppFAB() {
  const num = "5511981757505";
  const text = encodeURIComponent("Olá Nicholas, vim pelo site da WIR Innovation. Gostaria de conversar sobre…");
  return `<a href="https://wa.me/${num}?text=${text}" target="_blank" rel="noopener noreferrer" class="wa-fab" aria-label="Falar com Nicholas no WhatsApp">
  <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
</a>`;
}

function renderArticleHTML(article) {
  const initials = article.author.split(" ").map(w => w[0]).slice(0, 2).join("");
  const bodyHTML = renderBody(article.body);
  const head = renderHead(article);
  const lang = isEnglish(article.slug) ? "en" : "pt-BR";

  return `<!doctype html>
<html lang="${lang}">
<head>
${head}
</head>
<body>
${renderNav()}

<main>
<article class="blarticle">
  <div class="wrap blarticle__wrap">
    <a class="blarticle__back" href="/insights/">
      <span aria-hidden="true">←</span> Voltar para Insights &amp; News
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
          <div class="blarticle__byline-time">${esc(article.date)} · ${esc(article.time)} de leitura</div>
        </div>
      </div>
    </header>

    <figure class="blarticle__hero-img" style="background: ${article.grad}; aspect-ratio: 16 / 9;">
      ${article.image ? `<img src="${article.image}" alt="${esc(article.imageAlt || article.title)}" width="1600" height="900" loading="eager" fetchpriority="high" />` : ""}
    </figure>

    <div class="blarticle__body">
${bodyHTML}
    </div>

    <footer class="blarticle__foot">
      <a class="btn btn--ghost" href="/insights/">
        <span aria-hidden="true">←</span> Outros Insights
      </a>
      <a class="btn btn--solid" href="/#contact">
        Falar com a equipe <span class="btn__arrow">→</span>
      </a>
    </footer>
  </div>
</article>
</main>

${renderFooter()}
${renderWhatsAppFAB()}
</body>
</html>`;
}

function renderInsightsIndex() {
  const cards = ARTICLES.map(a => `
    <a href="/insights/${a.slug}/" class="ix-card">
      <div class="ix-card__img" style="background:${a.grad};${a.image ? `background-image:linear-gradient(180deg,rgba(11,10,8,0.2),rgba(11,10,8,0.7)),url(${a.image});background-size:cover;background-position:center;` : ""}">
        <span class="ix-card__cat">${esc(a.cat)}</span>
      </div>
      <div class="ix-card__body">
        <div class="ix-card__meta">${esc(a.cat)} · ${esc(a.time)} · ${esc(a.date)}</div>
        <h2>${esc(a.title)}</h2>
        <p>${esc(a.sub)}</p>
        <div class="ix-card__by"><b>${esc(a.author)}</b> · ${esc(a.role)}</div>
      </div>
    </a>`).join("\n");

  const head = `<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Insights &amp; News — WIR Innovation</title>
<meta name="description" content="Ensaios, casos e notas técnicas do time da WIR sobre IA aplicada ao mercado segurador." />
<link rel="canonical" href="${SITE_URL}/insights/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Insights &amp; News — WIR Innovation" />
<meta property="og:description" content="Ensaios, casos e notas técnicas do time da WIR sobre IA aplicada ao mercado segurador." />
<meta property="og:url" content="${SITE_URL}/insights/" />
<link rel="icon" type="image/svg+xml" href="/assets/wir-logo-azul.svg" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/style.css?${CACHE_VER}" />
<link rel="stylesheet" href="/home.css?${CACHE_VER}" />
<link rel="stylesheet" href="/blog.css?${CACHE_VER}" />
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
.ix__grid { display:grid; grid-template-columns:repeat(3,1fr); gap:32px;}
.ix-card { display:flex; flex-direction:column; gap:14px; text-decoration:none; color:inherit; transition:transform .2s ease;}
.ix-card:hover { transform:translateY(-3px);}
.ix-card__img { aspect-ratio:16/10; border-radius:12px; position:relative; overflow:hidden;}
.ix-card__cat { position:absolute; top:14px; left:14px; padding:4px 10px; background:rgba(255,255,255,.92); border-radius:4px; font-family:var(--f-mono); font-size:10px; letter-spacing:.12em; text-transform:uppercase;}
.ix-card__meta { font-family:var(--f-mono); font-size:11px; letter-spacing:.04em; color:var(--ink-3); text-transform:uppercase;}
.ix-card__body h2 { font-family:var(--f-display); font-weight:500; font-size:22px; line-height:1.2; margin:8px 0 8px; letter-spacing:-0.005em;}
.ix-card__body p { font-size:14px; line-height:1.55; color:var(--ink-2);}
.ix-card__by { font-family:var(--f-mono); font-size:11px; letter-spacing:.04em; color:var(--ink-3); margin-top:6px;}
.ix-card__by b { color:var(--ink); font-weight:500;}
@media (max-width:980px){ .ix__grid { grid-template-columns:repeat(2,1fr);} }
@media (max-width:640px){ .ix__grid { grid-template-columns:1fr; gap:24px;} .ix { padding:48px 0;} }
</style>`;

  return `<!doctype html>
<html lang="pt-BR">
<head>
${head}
</head>
<body>
${renderNav()}
<main>
<section class="ix">
  <div class="wrap">
    <div class="ix__head">
      <div class="eyebrow">· Insights &amp; News</div>
      <h1>Insights sobre <em>IA, seguro</em> e decisão.</h1>
      <p>Ensaios, casos de uso e notas técnicas do time da WIR sobre como Inteligência Artificial está redesenhando a operação do mercado segurador.</p>
    </div>
    <div class="ix__grid">
${cards}
    </div>
  </div>
</section>
</main>
${renderFooter()}
${renderWhatsAppFAB()}
</body>
</html>`;
}

const insightsDir = path.join(process.cwd(), OUT_DIR);
fs.mkdirSync(insightsDir, { recursive: true });

ARTICLES.forEach(article => {
  const dir = path.join(insightsDir, article.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), renderArticleHTML(article), "utf8");
  console.log(`  ok ${OUT_DIR}/${article.slug}/index.html`);
});

fs.writeFileSync(path.join(insightsDir, "index.html"), renderInsightsIndex(), "utf8");
console.log(`  ok ${OUT_DIR}/index.html`);

console.log(`\nBuilt ${ARTICLES.length} static article pages + index.\n`);
