#!/usr/bin/env python3
"""WIR Innovation — IndexNow weekly ping.
Reads the live sitemap and notifies IndexNow (Bing, Yandex, + consumers) to (re)crawl every URL.
Free, no GSC needed. Picks up new articles automatically each run.
Run: python3 scripts/indexnow-ping.py
"""
import json, re, sys, urllib.request

HOST = "wirinnovation.ai"
KEY = "b951f27826ff4512b50dce16f593594b"
KEY_LOCATION = f"https://{HOST}/{KEY}.txt"
SITEMAP = f"https://{HOST}/sitemap.xml"
ENDPOINTS = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
]

def fetch_urls():
    req = urllib.request.Request(SITEMAP, headers={"User-Agent": "wir-indexnow/1.0"})
    xml = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")
    urls = re.findall(r"<loc>\s*(https://[^<\s]+)\s*</loc>", xml)
    # de-dupe, keep order, only our host
    seen, out = set(), []
    for u in urls:
        if u.startswith(f"https://{HOST}") and u not in seen:
            seen.add(u); out.append(u)
    return out

def main():
    try:
        urls = fetch_urls()
    except Exception as e:
        print(f"[indexnow] could not read sitemap: {e}", file=sys.stderr); sys.exit(1)
    if not urls:
        print("[indexnow] no urls found in sitemap", file=sys.stderr); sys.exit(1)
    payload = json.dumps({
        "host": HOST, "key": KEY, "keyLocation": KEY_LOCATION, "urlList": urls
    }).encode()
    ok = 0
    for ep in ENDPOINTS:
        req = urllib.request.Request(ep, data=payload,
            headers={"Content-Type": "application/json; charset=utf-8"})
        try:
            r = urllib.request.urlopen(req, timeout=25)
            print(f"[indexnow] {ep} -> HTTP {r.status} ({len(urls)} urls)")
            if r.status in (200, 202): ok += 1
        except Exception as e:
            print(f"[indexnow] {ep} -> ERROR {e}", file=sys.stderr)
    print(f"[indexnow] done: {ok}/{len(ENDPOINTS)} endpoints accepted, {len(urls)} urls")
    sys.exit(0 if ok else 2)

if __name__ == "__main__":
    main()
