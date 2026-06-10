/* ───────────────────────────────────────────
   Shared: Logo, Nav, Footer, Ticker, helpers
   ─────────────────────────────────────────── */

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { LANG, INSIGHTS_HREF } from './i18n.js';

const T = {
  pt: {
    ticker: [
      { d: "a", t: "Decisão em minutos · auditável · explicável" },
      { d: "p", t: "Straight-through processing como padrão" },
      { d: "b", t: "Plataforma de IA para seguros" },
      { d: "o", t: "Em conformidade com LGPD" },
    ],
    navLinks: [
      { id: "home", label: "Início" },
      { id: "about", label: "Sobre" },
      { id: "solutions", label: "Produtos & IA" },
      { id: "protection", label: "Proteção de Dados" },
      { id: "blog", label: "Insights & News", href: INSIGHTS_HREF }, // real static page
    ],
    navCta: "Contato",
    footerDesc: "A nova era do seguro é inteligência de dados, velocidade e escala. A WIR Innovation é a plataforma de IA que entrega essa estrutura dentro dos sistemas que você já opera.",
    colCompany: "Empresa",
    colContact: "Contato",
    colHolding: "Sócios & Holding",
    linkHome: "Início", linkAbout: "Sobre", linkSolutions: "Produtos & IA",
    linkProtection: "Proteção de Dados", linkBlog: "Insights & News", linkContact: "Contato",
    talkTeam: "Falar com a equipe",
    holdingLinks: { mahway: "Mahway · California", avante: "Avante · Brasil", advisors: "Conselheiros estratégicos", principles: "Princípios" },
    footerBot: "wirinnovation.ai · Feito entre São Paulo e Silicon Valley",
    waText: "Olá Nicholas, vim pelo site da WIR Innovation. Gostaria de conversar sobre…",
    waAria: "Falar com Nicholas no WhatsApp",
    langAria: "Idioma",
  },
  en: {
    ticker: [
      { d: "a", t: "Decisions in minutes · auditable · explainable" },
      { d: "p", t: "Straight-through processing as the default" },
      { d: "b", t: "AI platform for insurance" },
      { d: "o", t: "LGPD-compliant" },
    ],
    navLinks: [
      { id: "home", label: "Home" },
      { id: "about", label: "About" },
      { id: "solutions", label: "Products & AI" },
      { id: "protection", label: "Data Protection" },
      { id: "blog", label: "Insights & News", href: INSIGHTS_HREF },
    ],
    navCta: "Contact",
    footerDesc: "The new era of insurance is data intelligence, speed, and scale. WIR Innovation is the AI platform that delivers that structure inside the systems you already run.",
    colCompany: "Company",
    colContact: "Contact",
    colHolding: "Partners & Holding",
    linkHome: "Home", linkAbout: "About", linkSolutions: "Products & AI",
    linkProtection: "Data Protection", linkBlog: "Insights & News", linkContact: "Contact",
    talkTeam: "Talk to the team",
    holdingLinks: { mahway: "Mahway · California", avante: "Avante · Brazil", advisors: "Strategic advisors", principles: "Principles" },
    footerBot: "wirinnovation.ai · Built between São Paulo and Silicon Valley",
    waText: "Hello Nicholas, I found you through the WIR Innovation website. I'd like to talk about…",
    waAria: "Chat with Nicholas on WhatsApp",
    langAria: "Language",
  },
  es: {
    ticker: [
      { d: "a", t: "Decisión en minutos · auditable · explicable" },
      { d: "p", t: "Straight-through processing como estándar" },
      { d: "b", t: "Plataforma de IA para seguros" },
      { d: "o", t: "Conforme a la LGPD" },
    ],
    navLinks: [
      { id: "home", label: "Inicio" },
      { id: "about", label: "Nosotros" },
      { id: "solutions", label: "Productos & IA" },
      { id: "protection", label: "Protección de Datos" },
      { id: "blog", label: "Insights & News", href: INSIGHTS_HREF },
    ],
    navCta: "Contacto",
    footerDesc: "La nueva era del seguro es inteligencia de datos, velocidad y escala. WIR Innovation es la plataforma de IA que entrega esa estructura dentro de los sistemas que ya operas.",
    colCompany: "Empresa",
    colContact: "Contacto",
    colHolding: "Socios & Holding",
    linkHome: "Inicio", linkAbout: "Nosotros", linkSolutions: "Productos & IA",
    linkProtection: "Protección de Datos", linkBlog: "Insights & News", linkContact: "Contacto",
    talkTeam: "Hablar con el equipo",
    holdingLinks: { mahway: "Mahway · California", avante: "Avante · Brasil", advisors: "Consejeros estratégicos", principles: "Principios" },
    footerBot: "wirinnovation.ai · Hecho entre São Paulo y Silicon Valley",
    waText: "Hola Nicholas, llegué por el sitio de WIR Innovation. Me gustaría conversar sobre…",
    waAria: "Hablar con Nicholas por WhatsApp",
    langAria: "Idioma",
  },
}[LANG];

// Official WIR logo — uses brandbook SVG with proper gradient
// (absolute /assets paths so the same bundle works from /, /en/ and /es/)
export function Wordmark({ small, variant }) {
  const h = small ? 60 : 80;
  const src = variant === "white" ? "/assets/wir-logo-branco.svg" : "/assets/wir-logo-azul.svg";
  return (
    <img src={src} alt="WIR Innovation" style={{ height: h + "px", width: "auto", display: "block" }} />
  );
}

export function Ticker() {
  const items = T.ticker;
  const dotClass = (d) => "ticker__dot" + (d === "b" ? " ticker__dot--b" : d === "p" ? " ticker__dot--p" : d === "o" ? " ticker__dot--o" : "");
  return (
    <div className="ticker">
      <div className="ticker__track">
        {[...items, ...items].map((it, i) => (
          <span key={i} className="ticker__item">
            <span className={dotClass(it.d)}/>
            {it.t}
          </span>
        ))}
      </div>
    </div>
  );
}

// PT · EN · ES — switches language tree preserving the current hash route
function LangSwitcher() {
  const langs = [
    { k: "pt", label: "PT", base: "" },
    { k: "en", label: "EN", base: "/en" },
    { k: "es", label: "ES", base: "/es" },
  ];
  return (
    <div className="nav__lang" role="group" aria-label={T.langAria}>
      {langs.map(l => (
        <a key={l.k}
          href={`${l.base}/`}
          className={"nav__lang-opt" + (LANG === l.k ? " is-active" : "")}
          onClick={(e) => {
            e.preventDefault();
            if (LANG !== l.k) location.href = `${l.base}/${location.hash}`;
          }}>
          {l.label}
        </a>
      ))}
    </div>
  );
}

export function Nav({ route, go }) {
  const links = T.navLinks;
  return (
    <>
      <Ticker />
      <nav className="nav">
        <div className="wrap nav__inner">
          <a href="#home" onClick={(e)=>{e.preventDefault();go("home")}} className="nav__brand">
            <Wordmark/>
            <span className="nav__brand-sub">Innovation · AI Stack</span>
          </a>
          <div className="nav__links">
            {links.map(l => (
              l.href ? (
                <a key={l.id} href={l.href}
                  className={"nav__link" + (route===l.id ? " nav__link--active": "")}>
                  {l.label}
                </a>
              ) : (
                <a key={l.id} href={"#"+l.id} onClick={(e)=>{e.preventDefault();go(l.id)}}
                  className={"nav__link" + (route===l.id ? " nav__link--active": "")}>
                  {l.label}
                </a>
              )
            ))}
          </div>
          <div className="nav__right">
            <LangSwitcher/>
            <a href="#contact" onClick={(e)=>{e.preventDefault();go("contact")}} className="nav__cta">
              <span className="dot"/>
              {T.navCta}
              <span aria-hidden>→</span>
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}

export function Footer({ go }) {
  const socials = [
    { k:"LinkedIn",  href:"https://www.linkedin.com/company/wir-innovation/" },
    { k:"Instagram", href:"https://www.instagram.com/wirinnovation" },
    { k:"X",         href:"https://x.com/wirinnovationai" },
  ];
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Wordmark variant="white"/>
            <p className="footer__brand-desc">{T.footerDesc}</p>
            <div className="footer__social">
              {socials.map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer__social-link">
                  {s.k} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>{T.colCompany}</h4>
            <ul>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("home")}}>{T.linkHome}</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("about")}}>{T.linkAbout}</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("solutions")}}>{T.linkSolutions}</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("protection")}}>{T.linkProtection}</a></li>
              <li><a href={INSIGHTS_HREF}>{T.linkBlog}</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("contact")}}>{T.linkContact}</a></li>
            </ul>
          </div>
          <div>
            <h4>{T.colContact}</h4>
            <ul>
              <li><a href="mailto:contato@wirinnovation.ai">contato@wirinnovation.ai</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("contact")}}>{T.talkTeam}</a></li>
            </ul>
          </div>
          <div>
            <h4>{T.colHolding}</h4>
            <ul>
              <li><a href="#about#mahway-team"  onClick={(e)=>{e.preventDefault();go("about", "mahway-team")}}>{T.holdingLinks.mahway}</a></li>
              <li><a href="#about#avante-team"  onClick={(e)=>{e.preventDefault();go("about", "avante-team")}}>{T.holdingLinks.avante}</a></li>
              <li><a href="#about#conselheiros" onClick={(e)=>{e.preventDefault();go("about", "conselheiros")}}>{T.holdingLinks.advisors}</a></li>
              <li><a href="#about#principios"   onClick={(e)=>{e.preventDefault();go("about", "principios")}}>{T.holdingLinks.principles}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bot">
          <span>© 2026 WIR Innovation</span>
          <span>{T.footerBot}</span>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp button — visible on every page, bottom-right
export function WhatsappFab() {
  const num = "5511981757505"; // Nicholas Weiser · BR
  const text = encodeURIComponent(T.waText);
  return (
    <a href={`https://wa.me/${num}?text=${text}`}
       target="_blank" rel="noopener noreferrer"
       className="wa-fab"
       aria-label={T.waAria}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

/* Reveal-on-scroll */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}
