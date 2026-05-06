/* ───────────────────────────────────────────
   Shared: Logo, Nav, Footer, Ticker, helpers
   ─────────────────────────────────────────── */

const { useEffect, useState, useRef, useMemo } = React;

// Official WIR logo — uses brandbook SVG with proper gradient
function Wordmark({ small, variant }) {
  const h = small ? 44 : 64;
  const src = variant === "white" ? "assets/wir-logo-branco.svg" : "assets/wir-logo-azul.svg";
  return (
    <img src={src} alt="WIR Innovation" style={{ height: h + "px", width: "auto", display: "block" }} />
  );
}

function Ticker() {
  const items = [
    { d: "a", t: "Decisão em minutos · auditável · explicável" },
    { d: "p", t: "Straight-through processing como padrão" },
    { d: "b", t: "Plataforma de IA para seguros" },
    { d: "o", t: "Em conformidade com LGPD" },
  ];
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

function Nav({ route, go }) {
  const links = [
    { id: "home", label: "Início" },
    { id: "about", label: "Sobre" },
    { id: "solutions", label: "Produtos & IA" },
    { id: "protection", label: "Proteção de Dados" },
    { id: "blog", label: "Insights & News", href: "/insights/" }, // real static page
  ];
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
          <a href="#contact" onClick={(e)=>{e.preventDefault();go("contact")}} className="nav__cta">
            <span className="dot"/>
            Contato
            <span aria-hidden>→</span>
          </a>
        </div>
      </nav>
    </>
  );
}

function Footer({ go }) {
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
            <p className="footer__brand-desc">A nova era do seguro é inteligência de dados, velocidade e escala. A WIR Innovation é a plataforma de IA que entrega essa estrutura dentro dos sistemas que você já opera.</p>
            <div className="footer__social">
              {socials.map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="footer__social-link">
                  {s.k} <span aria-hidden>↗</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4>Empresa</h4>
            <ul>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("home")}}>Início</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("about")}}>Sobre</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("solutions")}}>Produtos & IA</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("protection")}}>Proteção de Dados</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("blog")}}>Insights & News</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("contact")}}>Contato</a></li>
            </ul>
          </div>
          <div>
            <h4>Contato</h4>
            <ul>
              <li><a href="mailto:contato@wirinnovation.ai">contato@wirinnovation.ai</a></li>
              <li><a href="#" onClick={(e)=>{e.preventDefault();go("contact")}}>Falar com a equipe</a></li>
            </ul>
          </div>
          <div>
            <h4>Sócios & Holding</h4>
            <ul>
              <li><a href="#about#mahway-team"  onClick={(e)=>{e.preventDefault();go("about", "mahway-team")}}>Mahway · California</a></li>
              <li><a href="#about#avante-team"  onClick={(e)=>{e.preventDefault();go("about", "avante-team")}}>Avante · Brasil</a></li>
              <li><a href="#about#conselheiros" onClick={(e)=>{e.preventDefault();go("about", "conselheiros")}}>Conselheiros estratégicos</a></li>
              <li><a href="#about#principios"   onClick={(e)=>{e.preventDefault();go("about", "principios")}}>Princípios</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bot">
          <span>© 2026 WIR Innovation</span>
          <span>wirinnovation.ai · Feito entre São Paulo e Silicon Valley</span>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp button — visible on every page, bottom-right
function WhatsappFab() {
  const num = "5511981757505"; // Nicholas Weiser · BR
  const text = encodeURIComponent("Olá Nicholas, vim pelo site da WIR Innovation. Gostaria de conversar sobre…");
  return (
    <a href={`https://wa.me/${num}?text=${text}`}
       target="_blank" rel="noopener noreferrer"
       className="wa-fab"
       aria-label="Falar com Nicholas no WhatsApp">
      <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

/* Reveal-on-scroll */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-revealed"); io.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

Object.assign(window, { Wordmark, Nav, Footer, Ticker, WhatsappFab, useReveal });
