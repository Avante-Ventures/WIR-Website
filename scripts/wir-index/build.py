"""Build the current WIR Index edition at public/insights/wir-index/index.html.

    python3 scripts/wir-index/build.py

Reuses from Edição 01 (the archived copy): fonts + CSS, team photos and the i18n engine.
content.py supplies META, C (key -> {pt, en, es}), BODY and DEALS; edit content, never the
generated HTML. Before starting a new edition, archive the current page the way Edição 01
went to /insights/wir-index/2026-q2/.

BODY markup convention: an empty element carrying i18n="key" is filled with the PT text
and gets data-i18n="key"; i18nt="key" does the same for SVG <text> (textContent swap).
The build refuses missing or duplicated keys and em/en dashes (WIR writing guide).
"""
import csv, importlib.util, json, os, re, sys

sys.dont_write_bytecode = True
HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(os.path.dirname(HERE))
SHELL = f"{REPO}/public/insights/wir-index/2026-q2/index.html"
OUT_HTML = f"{REPO}/public/insights/wir-index/index.html"

spec = importlib.util.spec_from_file_location("content", f"{HERE}/content.py")
content = importlib.util.module_from_spec(spec)
spec.loader.exec_module(content)
META, C, BODY, DEALS = content.META, content.C, content.BODY, content.DEALS

shell = open(SHELL, encoding="utf-8").read()


def between(s, start, end, inclusive=True):
    i = s.index(start)
    j = s.index(end, i) + len(end)
    return s[i:j] if inclusive else s[i + len(start):j - len(end)]


def balanced_div(s, start):
    """Return the <div ...> starting at `start` through its matching </div>."""
    i = s.index(start)
    depth, k = 0, i
    for m in re.finditer(r"<div\b|</div>", s[i:]):
        depth += 1 if m.group(0) == "<div" else -1
        if depth == 0:
            return s[i:i + m.end()]
    raise ValueError(start)


STYLES = between(shell, '<link rel="preconnect" href="https://fonts.googleapis.com">',
                 '<link rel="stylesheet" href="/report-scale.css">')
# Edição 01 inlines the retired "Innovation" lockup; use the site's current "AI for insurance" files.
LOGO = '<img class="logo-mark" src="/assets/wir-logo.svg" alt="WIR Innovation" width="62" height="46">'
FOOTLOGO = '<img class="foot-logo" src="/assets/wir-logo-branco.svg" alt="WIR Innovation" width="54" height="40">'
TEAM = balanced_div(shell, '<div class="team-grid">')
SCRIPT = between(shell, "<script>\nfunction applyLang", "</script>")
# Honour ?lang=pt|en|es so EN/ES surfaces (home, /en/insights/) open this edition in their language.
# Edição 01 stays as published; only the generated edition gets the URL parameter.
_INIT = '(function(){var s=null;try{s=localStorage.getItem("wirLang");}catch(e){}'
if SCRIPT.count(_INIT) != 1:
    sys.exit("language init not found in the Edição 01 script")
SCRIPT = SCRIPT.replace(_INIT, '(function(){var s=null;try{s=new URLSearchParams(location.search).get("lang");}catch(e){}if(!s){try{s=localStorage.getItem("wirLang");}catch(e){}}')
Q2_I18N = json.loads(re.search(r"window\.I18N=(\{.*?\});?</script>", shell, re.S).group(1))

# Team bios: reuse Edição 01 translations unless content.py overrides the key.
for k in Q2_I18N["pt"]:
    if (k.startswith("tc_") or k.startswith("cn_") or k in ("m_sub", "m_pwr")) and k not in C:
        C[k] = {l: Q2_I18N[l][k] for l in ("pt", "en", "es")}

body = BODY.replace("{{LOGO}}", LOGO).replace("{{FOOTLOGO}}", FOOTLOGO).replace("{{TEAM}}", TEAM)

used = []


def fill(m, text_only=False):
    tag, pre, key, post = m.group(1), m.group(2), m.group(3), m.group(4)
    if key not in C:
        sys.exit(f"missing key in C: {key}")
    used.append(key)
    attr = f' data-i18n="{key}"' + (' data-i18n-text="1"' if text_only else "")
    return f"<{tag}{pre}{attr}{post}>{C[key]['pt']}</{tag}>"


body = re.sub(r'<(\w+)([^<>]*?)\si18nt="(\w+)"([^<>]*)></\1>', lambda m: fill(m, True), body)
body = re.sub(r'<(\w+)([^<>]*?)\si18n="(\w+)"([^<>]*)></\1>', fill, body)

# Team grid already carries data-i18n attributes from Edição 01.
used += re.findall(r'data-i18n="(tc_\w+)"', TEAM)
leftover = re.findall(r'\si18nt?="(\w+)"', body)
if leftover:
    sys.exit(f"unfilled i18n slots (non-empty template element?): {leftover}")
dupes = sorted({k for k in used if used.count(k) > 1})
if dupes:
    sys.exit(f"keys used twice: {dupes}")
unused = sorted(set(C) - set(used))
if unused:
    print("warning, unused keys:", unused)

problems = []
for k in used:
    for l in ("pt", "en", "es"):
        v = C[k].get(l, "")
        if not v.strip():
            problems.append(f"{k}.{l} empty")
        if "—" in v or "–" in v:
            problems.append(f"{k}.{l} has an em/en dash")
for label, s in (("BODY", BODY), ("META", json.dumps(META, ensure_ascii=False))):
    if "—" in s or "–" in s:
        problems.append(f"{label} has an em/en dash")
if problems:
    sys.exit("content problems:\n  " + "\n  ".join(problems))

i18n = {l: {k: C[k][l] for k in used} for l in ("pt", "en", "es")}

M = META
url = M["url"]
head = f"""<!DOCTYPE html>
<html lang="pt-BR"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{M['title']} | WIR Innovation</title>
<meta name="description" content="{M['description']}" />
<meta name="theme-color" content="#7540AC" />
<link rel="canonical" href="{url}" />
<link rel="alternate" hreflang="pt-BR" href="{url}" />
<link rel="alternate" hreflang="x-default" href="{url}" />
<link rel="prev" href="https://wirinnovation.ai/insights/wir-index/2026-q2/" />

<meta property="og:type" content="article" />
<meta property="og:title" content="{M['title']}" />
<meta property="og:description" content="{M['description']}" />
<meta property="og:url" content="{url}" />
<meta property="og:image" content="https://wirinnovation.ai{M['image']}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="WIR Innovation" />
<meta property="article:author" content="WIR Innovation" />
<meta property="article:section" content="Mercado" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="{M['title']}" />
<meta name="twitter:description" content="{M['description']}" />
<meta name="twitter:image" content="https://wirinnovation.ai{M['image']}" />
<meta name="twitter:image:width" content="1200" />
<meta name="twitter:image:height" content="630" />

<link rel="icon" href="/assets/favicon.ico" sizes="48x48" />
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />

<script async src="https://www.googletagmanager.com/gtag/js?id=G-1SW9TDZ9H2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){{dataLayer.push(arguments);}}
  gtag('js', new Date());
  gtag('config', 'G-1SW9TDZ9H2', {{ anonymize_ip: true }});
</script>
"""

org = {"@type": "Organization", "name": "WIR Innovation", "url": "https://wirinnovation.ai"}
report = {"@context": "https://schema.org", "@type": "Report", "headline": M["title"], "name": M["name"],
          "description": M["description"], "inLanguage": "pt-BR", "datePublished": M["date"],
          "image": f"https://wirinnovation.ai{M['image']}", "url": url, "mainEntityOfPage": url,
          "author": org, "publisher": {**org, "logo": {"@type": "ImageObject", "url": "https://wirinnovation.ai/assets/wir-logo-512.png"}},
          "articleSection": "Mercado", "isAccessibleForFree": True,
          "isPartOf": {"@type": "CreativeWorkSeries", "name": "WIR Index", "url": url}}
dataset = {"@context": "https://schema.org", "@type": "Dataset", "name": M["name"], "description": M["dataset_description"],
           "inLanguage": "pt-BR", "datePublished": M["date"], "temporalCoverage": M["coverage"], "url": url,
           "isAccessibleForFree": True, "license": "https://creativecommons.org/licenses/by/4.0/",
           "creator": org, "publisher": org,
           "distribution": [{"@type": "DataDownload", "encodingFormat": "text/csv",
                             "contentUrl": f"https://wirinnovation.ai/insights/wir-index/{M['csv']}"}]}
organization = re.search(r'<script type="application/ld\+json">(\{"@context":"https://schema.org","@type":"Organization".*?)</script>', shell).group(1)
head += "\n".join(f'<script type="application/ld+json">{x}</script>' for x in
                  (json.dumps(report, ensure_ascii=False), organization, json.dumps(dataset, ensure_ascii=False)))
head += "\n" + STYLES + "\n" + content.EXTRA_CSS + "\n</head>\n"

page = (head + "<body>\n" + body + "\n<script>window.I18N=" + json.dumps(i18n, ensure_ascii=False) + ";</script>\n"
        + SCRIPT + "\n</body></html>\n")
open(OUT_HTML, "w", encoding="utf-8").write(page)

with open(f"{REPO}/public/insights/wir-index/{M['csv']}", "w", encoding="utf-8", newline="") as fh:
    w = csv.DictWriter(fh, fieldnames=list(DEALS[0].keys()))
    w.writeheader()
    w.writerows(DEALS)

print(f"ok: {OUT_HTML} ({len(page):,} bytes, {len(used)} keys x 3 langs, {len(DEALS)} deal rows)")
