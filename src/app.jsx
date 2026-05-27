/* ───────── App shell & routing ───────── */

import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Nav, Footer, WhatsappFab } from './shared.jsx';
import { HomePage } from './home.jsx'; // Home loads eagerly — it's the LCP path

// Secondary routes lazy-loaded — separated into their own JS chunks.
// User downloads them only when navigating away from home.
const SolutionsPage = lazy(() => import('./solutions.jsx').then(m => ({ default: m.SolutionsPage })));
const AboutPage = lazy(() => import('./about.jsx').then(m => ({ default: m.AboutPage })));
const BlogPage = lazy(() => import('./blog.jsx').then(m => ({ default: m.BlogPage })));
const ContactPage = lazy(() => import('./contact.jsx').then(m => ({ default: m.ContactPage })));
const DataProtectionPage = lazy(() => import('./data-protection.jsx').then(m => ({ default: m.DataProtectionPage })));

export function App() {
  const baseRoute = (h) => h.split("/")[0].split("#")[0];
  const [route, setRoute] = useState(() => {
    const h = (location.hash || "#home").replace("#","");
    const r = baseRoute(h);
    return ["home","solutions","about","blog","contact","protection"].includes(r) ? r : "home";
  });

  const go = (id, anchor) => {
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
          const el = document.getElementById(anchor);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          else window.scrollTo({ top: 0, behavior: "instant" });
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
      if (["home","solutions","about","blog","contact","protection"].includes(r)) setRoute(r);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Tweakable bindings (accentColor, titleWeight, sectionBg, watermark)
  useEffect(() => {
    const t = window.TWEAKS || {};
    if (t.accentColor) document.documentElement.style.setProperty("--wir-amber", t.accentColor);
    if (t.titleWeight) document.documentElement.style.setProperty("--title-weight", t.titleWeight);
  }, []);

  let Page = null;
  if (route === "home") Page = <HomePage go={go}/>;
  if (route === "solutions") Page = <SolutionsPage go={go}/>;
  if (route === "about") Page = <AboutPage go={go}/>;
  if (route === "blog") Page = <BlogPage go={go}/>;
  if (route === "contact") Page = <ContactPage go={go}/>;
  if (route === "protection") Page = <DataProtectionPage go={go}/>;

  return (
    <>
      <Nav route={route} go={go}/>
      <main key={route}>
        <Suspense fallback={<div style={{minHeight: '60vh'}}/>}>{Page}</Suspense>
      </main>
      <Footer go={go}/>
      <WhatsappFab/>
    </>
  );
}

