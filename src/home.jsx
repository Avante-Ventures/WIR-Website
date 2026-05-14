/* ───────── Home · assembler ───────── */

// Sócios & Conselheiros + Experiência no setor
function TrustBar() {
  // 5×2 grid with composite top-cells in cols 1 & 2:
  //   Col 1 top: Bain Capital + Notredame Intermédica (both in same cell)
  //   Col 2 top: Pátria + Athena Saúde (both in same cell)
  //   Col 5 top: Hapvida · NotreDame combined logo
  // Bottom row: Aon, Gallagher, JLT, Lockton, VIS — all single logos.
  const cells = [
    // Row 1
    { composite: [
        { src: "assets/logos/bain-capital.png",          alt: "Bain Capital" },
        { src: "assets/logos/notredame-intermedica.png", alt: "Notredame Intermédica" },
      ] },
    { composite: [
        { src: "assets/logos/patria.png",       alt: "Pátria Investimentos" },
        { src: "assets/logos/athena-saude.svg", alt: "Athena Saúde" },
      ] },
    { src: "assets/logos/ezze.png",      alt: "EZZE" },
    { src: "assets/logos/santander.png", alt: "Santander Seguros", sub: "seguros" },
    { src: "assets/logos/hapvida-notredame.png", alt: "Hapvida · NotreDame Intermédica" },
    // Row 2
    { src: "assets/logos/aon.png",       alt: "Aon" },
    { src: "assets/logos/gallagher.png", alt: "Gallagher" },
    { src: "assets/logos/jlt.png",       alt: "JLT" },
    { src: "assets/logos/lockton.png",   alt: "Lockton" },
    { src: "assets/logos/vis.png",       alt: "VIS" },
  ];

  const renderItem = (it, key) => (
    <span key={key} className="trustbar__logo-img">
      <img src={it.src} alt={it.alt} title={it.alt}/>
      {it.sub && <span className="trustbar__logo-sub">{it.sub}</span>}
    </span>
  );
  return (
    <section className="trustbar" data-reveal>
      <div className="wrap">
        <div className="trustbar__head">
          <div>
            <div className="eyebrow">· Fundadores, Sócios & Conselheiros Estratégicos</div>
            <h2 className="trustbar__title display">
              Décadas no setor. <em>Solidez Financeira.</em><br/>
              <em>World Class</em> em IA.
            </h2>
          </div>
          <p className="trustbar__note">
            A experiência de décadas como sócios e C-Level de seguradoras e corretoras nacionais e internacionais, somada ao expertise de sócios de fundos de Private Equity e Venture Builder internacional, proporciona aos nossos clientes um conhecimento profundo do mercado segurador, solidez financeira de longo prazo e nível World Class em tecnologia e Inteligência Artificial.
          </p>
        </div>

        <div className="trustbar__experience">
          <div className="eyebrow trustbar__experience-kicker">· Experiência no setor</div>
          <div className="trustbar__grid">
            <div className="trustbar__track">
              {/* Duplicate cells for seamless infinite marquee */}
              {[...cells, ...cells].map((c, i) => (
                <div key={i} className={"trustbar__cell" + (c.composite ? " trustbar__cell--composite" : "")}
                  aria-hidden={i >= cells.length ? "true" : undefined}>
                  {c.composite
                    ? c.composite.map((it, j) => renderItem(it, j))
                    : renderItem(c, 0)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ go }) {
  useReveal();
  return (
    <>
      <Opening go={go}/>
      <TrustBar/>
      <Trust/>
      <ProductTabs go={go}/>
      <ArchFlow/>
      <Proof/>
      <Closing go={go}/>
    </>
  );
}

Object.assign(window, { HomePage });
