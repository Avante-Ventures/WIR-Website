/* ───────────────────────────────────────────
   Shared: Logo, Nav, Footer, Ticker, helpers
   ─────────────────────────────────────────── */

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { LANG, INSIGHTS_HREF, MANIFESTO_HREF } from './i18n.js';

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
      { id: "manifesto", label: "Manifesto", href: MANIFESTO_HREF }, // cornerstone static page
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
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    skipLink: "Pular para o conteúdo principal",
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
      { id: "manifesto", label: "Manifesto", href: MANIFESTO_HREF }, // cornerstone static page
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
    menuOpen: "Open menu",
    menuClose: "Close menu",
    skipLink: "Skip to main content",
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
      { id: "manifesto", label: "Manifiesto", href: MANIFESTO_HREF }, // cornerstone static page
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
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    skipLink: "Saltar al contenido principal",
  },
}[LANG];

// Official WIR logo — uses brandbook SVG with proper gradient
// (absolute /assets paths so the same bundle works from /, /en/ and /es/)
// In nav, defaults to 32px (was 80px — out of lockup proportion);
// callers can pass an explicit `small` for an even tighter use case.
export function Wordmark({ small, variant, h }) {
  const height = h != null ? h : (small ? 44 : 80);
  const src = variant === "white" ? "/assets/wir-logo-branco.svg" : "/assets/wir-logo-azul.svg";
  return (
    <img src={src} alt="WIR Innovation" style={{ height: height + "px", width: "auto", display: "block" }} />
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

// PT · EN · ES — dropdown switcher (menu pattern, keyboard nav, focus restore)
function LangSwitcher() {
  const langs = [
    { k: "pt", label: "PT", flag: "🇧🇷", base: "" },
    { k: "en", label: "EN", flag: "🇺🇸", base: "/en" },
    { k: "es", label: "ES", flag: "🇪🇸", base: "/es" },
  ];
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(0);
  const ref = useRef(null);
  const btnRef = useRef(null);
  const itemRefs = useRef([]);
  const current = langs.find(l => l.k === LANG) || langs[0];

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  useEffect(() => {
    if (open && itemRefs.current[focusIdx]) itemRefs.current[focusIdx].focus();
  }, [open, focusIdx]);

  const choose = (l) => {
    setOpen(false);
    if (LANG !== l.k) location.href = `${l.base}/${location.hash}`;
  };

  const onMenuKey = (e) => {
    if (e.key === "Escape")     { e.preventDefault(); setOpen(false); btnRef.current && btnRef.current.focus(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); setFocusIdx(i => (i + 1) % langs.length); }
    else if (e.key === "ArrowUp")   { e.preventDefault(); setFocusIdx(i => (i - 1 + langs.length) % langs.length); }
    else if (e.key === "Home")      { e.preventDefault(); setFocusIdx(0); }
    else if (e.key === "End")       { e.preventDefault(); setFocusIdx(langs.length - 1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); choose(langs[focusIdx]); }
  };

  const openMenu = () => {
    const idx = Math.max(0, langs.findIndex(l => l.k === LANG));
    setFocusIdx(idx);
    setOpen(true);
  };

  return (
    <div className={"nav__lang" + (open ? " is-open" : "")} ref={ref}>
      <button type="button" className="nav__lang-btn"
        ref={btnRef}
        aria-haspopup="menu" aria-expanded={open} aria-label={T.langAria}
        onClick={() => open ? setOpen(false) : openMenu()}
        onKeyDown={(e) => {
          if ((e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") && !open) {
            e.preventDefault(); openMenu();
          }
        }}>
        <span className="nav__lang-flag" aria-hidden>{current.flag}</span>
        <span className="nav__lang-code">{current.label}</span>
        <span className="nav__lang-caret" aria-hidden>▾</span>
      </button>
      {open && (
        <ul className="nav__lang-menu" role="menu" aria-label={T.langAria} onKeyDown={onMenuKey}>
          {langs.map((l, i) => (
            <li key={l.k} role="none">
              <a href={`${l.base}/`}
                ref={el => itemRefs.current[i] = el}
                role="menuitem"
                tabIndex={focusIdx === i ? 0 : -1}
                aria-current={LANG === l.k ? "true" : undefined}
                className={"nav__lang-opt" + (LANG === l.k ? " is-active" : "")}
                onClick={(e) => { e.preventDefault(); choose(l); }}>
                <span className="nav__lang-flag" aria-hidden>{l.flag}</span>
                <span className="nav__lang-code">{l.label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Nav({ route, go }) {
  const links = T.navLinks;
  const [menuOpen, setMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [route]);

  // Lock body scroll when mobile menu open + Escape to close
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const navItem = (l, onClick) => (
    l.href ? (
      <a key={l.id} href={l.href}
        className={"nav__link" + (route===l.id ? " nav__link--active": "")}
        aria-current={route===l.id ? "page" : undefined}>
        {l.label}
      </a>
    ) : (
      <a key={l.id} href={"#"+l.id}
        onClick={(e)=>{e.preventDefault(); onClick && onClick(); go(l.id)}}
        className={"nav__link" + (route===l.id ? " nav__link--active": "")}
        aria-current={route===l.id ? "page" : undefined}>
        {l.label}
      </a>
    )
  );

  return (
    <>
      <Ticker />
      <nav className="nav" aria-label="Primary">
        <div className="wrap nav__inner">
          <a href="#home" onClick={(e)=>{e.preventDefault();go("home")}} className="nav__brand" aria-label="WIR — Home">
            <Wordmark h={56}/>
          </a>
          <div className="nav__links">
            {links.map(l => navItem(l))}
          </div>
          <div className="nav__right">
            <LangSwitcher/>
            <a href="#contact" onClick={(e)=>{e.preventDefault();go("contact")}} className="nav__cta">
              <span className="dot"/>
              {T.navCta}
              <span aria-hidden>→</span>
            </a>
            <button type="button" className="nav__burger"
              aria-label={menuOpen ? T.menuClose : T.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="nav-mobile-menu"
              onClick={() => setMenuOpen(o => !o)}>
              <span className={"nav__burger-icon" + (menuOpen ? " is-open" : "")} aria-hidden>
                <span/><span/><span/>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu — visible only ≤760px (CSS) */}
      <div id="nav-mobile-menu" className={"nav__mobile" + (menuOpen ? " is-open" : "")}
        role="dialog" aria-modal="true" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        <div className="nav__mobile-inner">
          {links.map(l => navItem(l, () => setMenuOpen(false)))}
          <a href="#contact" className="nav__mobile-cta"
            onClick={(e)=>{e.preventDefault(); setMenuOpen(false); go("contact")}}>
            <span className="dot"/>
            {T.navCta}
            <span aria-hidden>→</span>
          </a>
          <div className="nav__mobile-langs" role="group" aria-label={T.langAria}>
            {[
              { k: "pt", label: "Português", flag: "🇧🇷", base: "" },
              { k: "en", label: "English",   flag: "🇺🇸", base: "/en" },
              { k: "es", label: "Español",   flag: "🇪🇸", base: "/es" },
            ].map(l => (
              <a key={l.k}
                href={`${l.base}/`}
                className={"nav__mobile-lang" + (LANG === l.k ? " is-active" : "")}
                aria-current={LANG === l.k ? "true" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  if (LANG !== l.k) location.href = `${l.base}/${location.hash}`;
                }}>
                <span className="nav__mobile-lang-flag" aria-hidden>{l.flag}</span>
                <span>{l.label}</span>
                <span className="nav__mobile-lang-code">{l.k.toUpperCase()}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Inline brand SVGs — avoids adding react-icons as a dependency.
// Paths from Simple Icons (CC0). Color inherits via currentColor.
const SocialIcon = ({ k }) => {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };
  if (k === "LinkedIn") return (
    <svg {...common}><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.601 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.064 2.063 2.063 0 112.063 2.064zm1.778 13.019H3.555V9h3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
  );
  if (k === "Instagram") return (
    <svg {...common}><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
  );
  if (k === "X") return (
    <svg {...common}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
  );
  return null;
};

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
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="footer__social-link" aria-label={s.k} title={s.k}>
                  <SocialIcon k={s.k}/>
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

// Floating WhatsApp button — visible on every page except /contact, bottom-right
// Reveals after 600px of scroll so it doesn't compete with the hero CTA.
export function WhatsappFab({ route }) {
  if (route === "contact") return null;
  const num = "5511981757505"; // Nicholas Weiser · BR
  const url = typeof window !== "undefined" ? window.location.pathname + window.location.hash : "";
  const text = encodeURIComponent(`${T.waText}${url ? `\n${url}` : ""}`);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a href={`https://wa.me/${num}?text=${text}`}
       target="_blank" rel="noopener noreferrer"
       className={"wa-fab" + (show ? " is-visible" : "")}
       aria-label={T.waAria}>
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

// Skip link — first focusable element. Renders into the App.
export function SkipLink() {
  return (
    <a href="#main" className="skip-link">{T.skipLink}</a>
  );
}

/* Reveal-on-scroll — fires slightly before viewport so titles don't land already-revealed */
export function useReveal() {
  useEffect(() => {
    if (typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("is-revealed"));
      return;
    }
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); } });
    }, { threshold: 0, rootMargin: "0px 0px -15% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}
