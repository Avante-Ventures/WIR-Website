/* ───────── App shell & routing ───────── */

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Nav, Footer, WhatsappFab, SkipLink } from './shared.jsx';
import { LANG } from './i18n.js';
import { HomePage } from './home.jsx'; // Home loads eagerly — it's the LCP path

// Secondary routes lazy-loaded — separated into their own JS chunks.
// User downloads them only when navigating away from home.
const SolutionsPage = lazy(() => import('./solutions.jsx').then(m => ({ default: m.SolutionsPage })));
const HowPage = lazy(() => import('./experience-pages.jsx').then(m => ({ default: m.HowPage })));
const AboutPage = lazy(() => import('./about.jsx').then(m => ({ default: m.AboutPage })));
const BlogPage = lazy(() => import('./insights-route.jsx').then(m => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./contact.jsx').then(m => ({ default: m.ContactPage })));
const DataProtectionPage = lazy(() => import('./data-protection.jsx').then(m => ({ default: m.DataProtectionPage })));

export function App() {
  const anchorWait = useRef(null);
  const scrollToAnchor = (anchor) => {
    anchorWait.current?.();
    const scroll = () => {
      const el = document.getElementById(anchor);
      if (!el) return false;
      el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
      return true;
    };
    if (scroll()) return;
    const observer = new MutationObserver(() => { if (scroll()) anchorWait.current?.(); });
    const timeout = setTimeout(() => anchorWait.current?.(), 4000);
    anchorWait.current = () => { observer.disconnect(); clearTimeout(timeout); anchorWait.current = null; };
    observer.observe(document.getElementById('main'), { childList: true, subtree: true });
  };
  useEffect(() => () => anchorWait.current?.(), []);
  const baseRoute = (h) => h.split("/")[0].split("#")[0];
  const [route, setRoute] = useState(() => {
    const h = (location.hash || "#home").replace("#","");
    const r = baseRoute(h);
    return ["home","solutions","how","about","blog","contact","protection"].includes(r) ? r : "home";
  });

  const go = (id, anchor) => {
    anchorWait.current?.();
    setRoute(id);
    const newHash = "#" + id + (anchor ? "#" + anchor : "");
    // location.hash assignment fires hashchange (replaceState does not).
    // We need hashchange so BlogPage's slug listener clears when navigating away from articles.
    if (location.hash !== newHash) {
      location.hash = newHash;
    }
    if (anchor) {
      // Wait for React to mount the new route, then scroll to the anchor.
      // Double RAF guarantees the new <main> is painted before getElementById.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToAnchor(anchor);
        });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  useEffect(() => {
    const onHash = () => {
      const h = (location.hash || "#home").replace("#","");
      const r = baseRoute(h);
      if (["home","solutions","how","about","blog","contact","protection"].includes(r)) {
        setRoute(r);
        const anchor = h.split('#')[1];
        requestAnimationFrame(() => { if (anchor) scrollToAnchor(anchor); else window.scrollTo({top:0,behavior:'instant'}); });
      }
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  useEffect(() => {
    const titles = {
      pt: {home:'IA para escalar o mercado segurador',solutions:'Soluções',how:'Como funciona',about:'Sobre a WIR',blog:'Insights',contact:'Falar com a WIR',protection:'Proteção de Dados'},
      en: {home:'AI to scale the insurance market',solutions:'Solutions',how:'How it works',about:'About WIR',blog:'Insights',contact:'Talk to WIR',protection:'Data Protection'},
      es: {home:'IA para escalar el mercado asegurador',solutions:'Soluciones',how:'Cómo funciona',about:'Sobre WIR',blog:'Insights',contact:'Hablar con WIR',protection:'Protección de Datos'},
    };
    document.title = `${titles[LANG][route]} · WIR Innovation`;
  }, [route]);

  // Tweakable bindings (accentColor, titleWeight, sectionBg, watermark)
  useEffect(() => {
    const t = window.TWEAKS || {};
    if (t.accentColor) document.documentElement.style.setProperty("--wir-amber", t.accentColor);
    if (t.titleWeight) document.documentElement.style.setProperty("--title-weight", t.titleWeight);
  }, []);

  let Page = null;
  if (route === "home") Page = <HomePage go={go}/>;
  if (route === "solutions") Page = <SolutionsPage go={go}/>;
  if (route === "how") Page = <HowPage go={go}/>;
  if (route === "about") Page = <AboutPage go={go}/>;
  if (route === "blog") Page = <BlogPage go={go}/>;
  if (route === "contact") Page = <ContactPage go={go}/>;
  if (route === "protection") Page = <DataProtectionPage go={go}/>;

  return (
    <>
      <SkipLink/>
      <Nav route={route} go={go}/>
      <main id="main" data-page={route} tabIndex={-1} key={route}>
        <Suspense fallback={<div style={{minHeight: '60vh'}}/>}>{Page}</Suspense>
      </main>
      <Footer go={go}/>
      <WhatsappFab route={route}/>
    </>
  );
}
