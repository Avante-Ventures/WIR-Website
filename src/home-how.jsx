/* ───────── Movement 05 · Workflow + 06 · Trust + 07 · Closing ───────── */

// ArchFlow — 3 pipelines + 1 feedback loop visíveis. Cada dot percorre exatamente
// a mesma curva renderizada no diagrama (via <mpath href="#pipe-X"/>).
function ArchFlow() {
  // Coordenadas das zonas (centro vertical de cada lane)
  // 5 zonas: INTAKE / WIR PLATFORM / AI ENGINE / OUTPUT / CORE
  // 3 lanes: TOP (y=130) / MID (y=210) / BOT (y=290)

  // 4 paths visíveis e idênticos aos dos dots:
  // pipe-top: E-mail → Load Balancer → Business Rules → Score → Webhook
  // pipe-mid: Portal → Postgres → WIR LLM → QC → Core de apólice
  // pipe-bot: API → Worker Pool → ML Model → Dashboard → Audit Log
  // pipe-feedback: Audit Log → curve down → INTAKE (continuous learning)
  const pipes = {
    top: "M 130,130 C 220,140 270,140 330,130 C 460,115 540,115 625,130 C 750,145 805,145 865,130 C 1000,115 1075,115 1130,130",
    mid: "M 130,210 C 220,210 280,210 330,210 C 480,210 545,210 625,210 C 760,210 815,210 865,210 C 985,210 1080,210 1130,210",
    bot: "M 130,290 C 220,280 270,280 330,290 C 460,305 540,305 625,290 C 750,275 805,275 865,290 C 1000,305 1075,305 1130,290",
    feedback: "M 1130,310 C 1000,355 600,375 300,360 C 150,348 80,295 130,210",
  };

  // Sub-node helper
  const SubNode = ({ x, y, w, h, label, sub, color, fill, opaque }) => (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="8"
        fill={opaque ? "#FAF6EE" : (fill || `${color}10`)}
        stroke={color} strokeWidth="1.4" strokeOpacity="0.55"/>
      <text x={x + w/2} y={y + (sub ? h/2 - 2 : h/2 + 4)} fill={color}
        fontSize="10.5" fontWeight="700" fontFamily="Inter, sans-serif" textAnchor="middle">
        {label}
      </text>
      {sub && (
        <text x={x + w/2} y={y + h/2 + 12} fill="#6A6458"
          fontSize="8" fontFamily="JetBrains Mono, monospace" textAnchor="middle">
          {sub}
        </text>
      )}
    </g>
  );

  return (
    <section className="archflow" data-reveal>
      <div className="wrap">
        <div className="archflow__head">
          <div className="eyebrow">· Arquitetura WIR · Fluxo ao vivo</div>
          <h2 className="archflow__title display">
            Podemos <em>automatizar toda a jornada</em> de negócio<br/>
            com uma camada de <em>Inteligência Artificial.</em>
          </h2>
          <p className="archflow__lede">
            Três pipelines paralelos atravessam a arquitetura — top track (e-mail/LB/regras/score/webhook), mid track (portal/db/LLM/QC/core) e bottom track (API/workers/ML/dashboard/audit) — e um loop inferior de <em>continuous learning</em> realimenta o modelo a cada decisão auditada.
          </p>
        </div>

        <div className="archflow__canvas">
          <svg viewBox="0 0 1240 400" className="archflow__svg" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="archGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#1C17FF"/>
                <stop offset="25%" stopColor="#7540AC"/>
                <stop offset="55%" stopColor="#A44F98"/>
                <stop offset="80%" stopColor="#EE7D48"/>
                <stop offset="100%" stopColor="#10B981"/>
              </linearGradient>
              <filter id="archGlow"><feGaussianBlur stdDeviation="6"/></filter>
              <filter id="archDotShadow"><feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3"/></filter>

              {/* Os mesmos paths usados pelo render visível e pelos animateMotion */}
              <path id="pipe-top"      d={pipes.top}/>
              <path id="pipe-mid"      d={pipes.mid}/>
              <path id="pipe-bot"      d={pipes.bot}/>
              <path id="pipe-feedback" d={pipes.feedback}/>
            </defs>

            {/* Zone separators */}
            {[230, 490, 770, 1030].map((x, i) => (
              <line key={i} x1={x} y1="20" x2={x} y2="395" stroke="rgba(11,10,8,.06)" strokeWidth="1" strokeDasharray="4 5"/>
            ))}

            {/* Zone labels (top) */}
            {[
              {x:130, l:"INTAKE",       c:"#1C17FF"},
              {x:360, l:"WIR PLATFORM", c:"#7540AC"},
              {x:620, l:"AI ENGINE",    c:"#A44F98"},
              {x:900, l:"OUTPUT",       c:"#EE7D48"},
              {x:1130,l:"CORE",         c:"#10B981"},
            ].map((z, i) => (
              <text key={i} x={z.x} y="16" fill={z.c} fontSize="11" fontWeight="800"
                fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing=".18em">
                {z.l}
              </text>
            ))}

            {/* Pipes visibles — render BEFORE nodes so nodes mask them */}
            <use href="#pipe-top"      stroke="url(#archGrad)" strokeWidth="2.5" fill="none"
              strokeDasharray="2 6" opacity="0.55"/>
            <use href="#pipe-mid"      stroke="url(#archGrad)" strokeWidth="2.5" fill="none"
              strokeDasharray="2 6" opacity="0.55"/>
            <use href="#pipe-bot"      stroke="url(#archGrad)" strokeWidth="2.5" fill="none"
              strokeDasharray="2 6" opacity="0.55"/>
            <use href="#pipe-feedback" stroke="#FE8B77" strokeWidth="2" fill="none"
              strokeDasharray="5 5" opacity="0.5"/>
            <text fill="#FE8B77" fontSize="9.5" fontWeight="700"
              fontFamily="JetBrains Mono, monospace" letterSpacing=".15em" opacity=".75">
              <textPath href="#pipe-feedback" startOffset="50%" textAnchor="middle">
                · CONTINUOUS LEARNING · MODEL FEEDBACK ·
              </textPath>
            </text>

            {/* INTAKE column — 3 nodes (centered on each lane) */}
            <SubNode x={75}  y={111} w={110} h={38} label="E-mail" sub="anexos · PDF"  color="#1C17FF" opaque/>
            <SubNode x={75}  y={191} w={110} h={38} label="Portal" sub="formulários"   color="#1C17FF" opaque/>
            <SubNode x={75}  y={271} w={110} h={38} label="API"    sub="3 endpoints"   color="#1C17FF" opaque/>

            {/* WIR PLATFORM column */}
            <SubNode x={275} y={111} w={110} h={38} label="Load Balancer" sub="Nginx · 2× inst"   color="#7540AC" opaque/>
            <SubNode x={275} y={191} w={110} h={38} label="Postgres"      sub="Primary · Replica" color="#7540AC" opaque/>

            {/* Worker Pool (cluster, replaces single bottom node — dots ride through center) */}
            <rect x="275" y="262" width="110" height="58" rx="10" fill="#FAF6EE"
              stroke="rgba(117,64,172,.5)" strokeWidth="1.4" strokeDasharray="4 4"/>
            <text x="330" y="276" fill="rgba(117,64,172,.7)" fontSize="8" fontWeight="800"
              fontFamily="Inter, sans-serif" textAnchor="middle" letterSpacing=".14em">WORKER POOL</text>
            <SubNode x={279} y={282} w={48} h={16} label="W-1" color="#7540AC"/>
            <SubNode x={333} y={282} w={48} h={16} label="W-2" color="#7540AC"/>
            <SubNode x={279} y={302} w={48} h={16} label="W-3" color="#7540AC"/>
            <SubNode x={333} y={302} w={48} h={16} label="W-N" color="#7540AC"/>

            {/* AI ENGINE column */}
            <SubNode x={565} y={111} w={120} h={38} label="Business Rules" sub="política risco" color="#A44F98" opaque/>
            <SubNode x={565} y={191} w={120} h={38} label="WIR LLM"        sub="NLP · Fraud · Risk"  color="#EE7D48" opaque/>
            <SubNode x={565} y={271} w={120} h={38} label="ML Model"       sub="POST /predict"       color="#EE7D48" opaque/>

            {/* OUTPUT column */}
            <SubNode x={845} y={111} w={110} h={38} label="Score"     sub="risk + price"      color="#F8AD39" opaque/>
            <SubNode x={845} y={191} w={110} h={38} label="QC"        sub="quality check"     color="#10B981" opaque/>
            <SubNode x={845} y={271} w={110} h={38} label="Dashboard" sub="real time"         color="#10B981" opaque/>

            {/* CORE column */}
            <SubNode x={1075} y={111} w={110} h={38} label="Webhook"      sub="signed payload"    color="#10B981" opaque/>
            <SubNode x={1075} y={191} w={110} h={38} label="Core apólice" sub="policy admin"      color="#10B981" opaque/>
            <SubNode x={1075} y={271} w={110} h={38} label="Audit Log"    sub="LGPD · imutável"   color="#7540AC" opaque/>

            {/* Animated dots — RIDE THE EXACT VISIBLE PIPES via mpath */}
            {/* Halos behind */}
            <circle r="18" fill="#F8AD39" opacity="0.22" filter="url(#archGlow)">
              <animateMotion dur="18s" repeatCount="indefinite" begin="0s">
                <mpath href="#pipe-top"/>
              </animateMotion>
            </circle>
            <circle r="18" fill="#A44F98" opacity="0.22" filter="url(#archGlow)">
              <animateMotion dur="16s" repeatCount="indefinite" begin="-4s">
                <mpath href="#pipe-mid"/>
              </animateMotion>
            </circle>
            <circle r="18" fill="#10B981" opacity="0.22" filter="url(#archGlow)">
              <animateMotion dur="19s" repeatCount="indefinite" begin="-8s">
                <mpath href="#pipe-bot"/>
              </animateMotion>
            </circle>
            <circle r="18" fill="#FE8B77" opacity="0.22" filter="url(#archGlow)">
              <animateMotion dur="22s" repeatCount="indefinite" begin="-10s">
                <mpath href="#pipe-feedback"/>
              </animateMotion>
            </circle>

            {/* Solid dots front */}
            <circle r="8" fill="#F8AD39" stroke="#FAF6EE" strokeWidth="2" filter="url(#archDotShadow)">
              <animateMotion dur="18s" repeatCount="indefinite" begin="0s">
                <mpath href="#pipe-top"/>
              </animateMotion>
            </circle>
            <circle r="8" fill="#A44F98" stroke="#FAF6EE" strokeWidth="2" filter="url(#archDotShadow)">
              <animateMotion dur="16s" repeatCount="indefinite" begin="-4s">
                <mpath href="#pipe-mid"/>
              </animateMotion>
            </circle>
            <circle r="8" fill="#10B981" stroke="#FAF6EE" strokeWidth="2" filter="url(#archDotShadow)">
              <animateMotion dur="19s" repeatCount="indefinite" begin="-8s">
                <mpath href="#pipe-bot"/>
              </animateMotion>
            </circle>
            <circle r="8" fill="#FE8B77" stroke="#FAF6EE" strokeWidth="2" filter="url(#archDotShadow)">
              <animateMotion dur="22s" repeatCount="indefinite" begin="-10s">
                <mpath href="#pipe-feedback"/>
              </animateMotion>
            </circle>
          </svg>
        </div>

        <div className="archflow__legend">
          <span className="archflow__pulse"/>
          <b>Fluxo ao vivo</b> · 3 pipelines paralelos + loop de aprendizado contínuo
        </div>
      </div>
    </section>
  );
}

function WorkflowSVG() {
  const ref = React.useRef(null);
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const end = vh * 0.2;
      const p = (start - r.top) / (start - end + r.height * 0.3);
      setProgress(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const steps = [
    { k:"01", t:"Coleta",       d:"E-mail, anexos, API — a WIR aceita o formato que você já usa.", c:"#1C17FF" },
    { k:"02", t:"Enriquecer",   d:"Cruza com múltiplas fontes externas: CNPJ, histórico do broker, exposição, crédito.", c:"#4D38C0" },
    { k:"03", t:"Pontuar",      d:"Motor ML multi-fator calibrado ao seu apetite e à sua manual de subscrição.", c:"#A44F98" },
    { k:"04", t:"Decidir",      d:"Cotação, recusa automática ou escalada para humano — sempre com explicação.", c:"#EE7D48" },
    { k:"05", t:"Subscrever",   d:"Escreve no seu core de apólice e devolve a trilha de auditoria completa.", c:"#F9B336" },
  ];
  const pathLen = 1200;
  return (
    <section className="wf" data-reveal ref={ref}>
      <div className="wrap wf__head">
        <div className="eyebrow">· 05 — Como funciona</div>
        <h2 className="wf__title display">Cinco passos.<br/><em>Um fluxo auditável.</em></h2>
        <p className="wf__sub">Cada decisão deixa uma trilha — modelo, versão, confiança, inputs, timestamp. Nada é caixa-preta.</p>
      </div>
      <div className="wf__canvas">
        <svg viewBox="0 0 1400 280" className="wf__svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="wfGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#1C17FF"/>
              <stop offset="0.35" stopColor="#A44F98"/>
              <stop offset="0.7" stopColor="#EE7D48"/>
              <stop offset="1" stopColor="#F9B336"/>
            </linearGradient>
          </defs>
          <path d="M 80 140 C 260 40, 420 240, 560 140 S 820 40, 980 140 S 1240 240, 1360 140"
            stroke="rgba(0,0,0,.08)" strokeWidth="2" fill="none"/>
          <path d="M 80 140 C 260 40, 420 240, 560 140 S 820 40, 980 140 S 1240 240, 1360 140"
            stroke="url(#wfGrad)" strokeWidth="3" fill="none"
            strokeDasharray={pathLen}
            strokeDashoffset={pathLen * (1 - progress)}
            style={{transition:"stroke-dashoffset 80ms linear"}}/>
          {steps.map((s,i) => {
            const x = 80 + (i * (1360-80)/4);
            const y = 140 + (i % 2 === 0 ? -100 : 100) * Math.sin((i/4)*Math.PI);
            const active = progress > (i / steps.length) * 0.9;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={active ? 14 : 8} fill={active ? s.c : "#fff"} stroke={s.c} strokeWidth="3"
                  style={{transition:"all .3s ease"}}/>
              </g>
            );
          })}
        </svg>
        <div className="wf__steps">
          {steps.map((s,i) => {
            const active = progress > (i / steps.length) * 0.9;
            return (
              <div key={i} className={"wf__step" + (active ? " is-on" : "")} style={{"--c": s.c}}>
                <div className="wf__step-k num">{s.k}</div>
                <div className="wf__step-t">{s.t}</div>
                <div className="wf__step-d">{s.d}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const stats = [
    { k:"Eficiência",            v:"40%",    l:"do tempo do underwriter gasto com tarefas administrativas.",         src:"Deloitte" },
    { k:"Transformação Digital", v:"70%",    l:"das seguradoras não executam inovação por limitação de TI.",         src:"BCG" },
    { k:"Velocidade",            v:"60%+",   l:"dos brokers escolhem seguradora pela velocidade de resposta.",       src:"Capgemini" },
    { k:"Foco em Negócios",      v:"20-30%", l:"do tempo corporativo perdido organizando dados não estruturados.",   src:"Gartner" },
  ];
  return (
    <section id="desafios" className="trust" data-reveal>
      <div className="wrap">
        <div className="eyebrow eyebrow--onDark">· Desafios do mercado</div>
        <div className="trust__top">
          <blockquote className="trust__quote display">
            "Mercado de Seguros e Danos cresce <em>dois dígitos ao ano</em>. Mas a estrutura das empresas não acompanha esta aceleração."
          </blockquote>
          <div className="trust__attrib">
            <div className="trust__avatar trust__avatar--photo" style={{backgroundImage:"url(assets/team/nicholas.jpg)"}}/>
            <div>
              <b>Nicholas Weiser</b>
              <span>CEO · Co-Founder · WIR Innovation</span>
            </div>
          </div>
        </div>
        <div className="trust__divider"/>
        <div className="trust__bot">
          <div className="trust__bot-k">Quatro forças que tornam o status quo insustentável</div>
          <div className="trust__stats">
            {stats.map((s,i) => (
              <div key={i} className="trust__stat">
                <div className="trust__stat-k">{s.k}</div>
                <div className="trust__stat-v display">{s.v}</div>
                <div className="trust__stat-l">{s.l}</div>
                <div className="trust__stat-s">Fonte · <b>{s.src}</b></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Closing({ go }) {
  return (
    <section className="closing" data-reveal>
      <div className="wrap">
        <div className="closing__top">
          <div className="eyebrow">· Próximo passo</div>
          <h2 className="display closing__title">
            Sua equipe tem o <em>conhecimento.</em><br/>
            A WIR dá a <em>plataforma de IA para escalar.</em>
          </h2>
          <div className="closing__actions">
            <button className="btn btn--solid" onClick={()=>go("contact")}>
              Falar com nossos sócios <span className="btn__arrow">→</span>
            </button>
            <button className="btn btn--ghost" onClick={()=>go("solutions")}>
              Explorar soluções <span className="btn__arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { WorkflowSVG, ArchFlow, Trust, Closing });
