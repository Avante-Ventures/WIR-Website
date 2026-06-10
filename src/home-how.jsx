import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';
import { LANG } from './i18n.js';

/* ───────── Movement 05 · Workflow + 06 · Trust + 07 · Closing ───────── */

const T = {
  pt: {
    archEyebrow: "· Arquitetura WIR · Fluxo ao vivo",
    archTitle: <>Podemos <em>automatizar toda a jornada</em> de negócio<br/>com uma camada de <em>Inteligência Artificial.</em></>,
    archLede: <>Três pipelines paralelos atravessam a arquitetura — top track (e-mail/LB/regras/score/webhook), mid track (portal/db/LLM/QC/core) e bottom track (API/workers/ML/dashboard/audit) — e um loop inferior de <em>continuous learning</em> realimenta o modelo a cada decisão auditada.</>,
    subEmail: "anexos · PDF", subPortal: "formulários", subRules: "política risco",
    labelCore: "Core apólice", subAudit: "LGPD · imutável",
    archLegend: <><b>Fluxo ao vivo</b> · 3 pipelines paralelos + loop de aprendizado contínuo</>,
    trustEyebrow: "· Desafios do mercado",
    trustQuote: <>"Mercado de Seguros e Danos cresce <em>dois dígitos ao ano</em>. Mas a estrutura das empresas não acompanha esta aceleração."</>,
    trustBotK: "Quatro forças que tornam o status quo insustentável",
    trustSrc: "Fonte",
    stats: [
      { k:"Eficiência",            v:"40%",    l:"do tempo do underwriter gasto com tarefas administrativas.",         src:"Deloitte" },
      { k:"Transformação Digital", v:"70%",    l:"das seguradoras não executam inovação por limitação de TI.",         src:"BCG" },
      { k:"Velocidade",            v:"60%+",   l:"dos brokers escolhem seguradora pela velocidade de resposta.",       src:"Capgemini" },
      { k:"Foco em Negócios",      v:"20-30%", l:"do tempo corporativo perdido organizando dados não estruturados.",   src:"Gartner" },
    ],
    closeEyebrow: "· Próximo passo",
    closeTitle: <>Sua equipe tem o <em>conhecimento.</em><br/>A WIR dá a <em>plataforma de IA para escalar.</em></>,
    closeTalk: "Falar com nossos sócios",
    closeExplore: "Explorar soluções",
  },
  en: {
    archEyebrow: "· WIR Architecture · Live flow",
    archTitle: <>We can <em>automate the entire business journey</em><br/>with a layer of <em>Artificial Intelligence.</em></>,
    archLede: <>Three parallel pipelines run through the architecture — top track (email/LB/rules/score/webhook), mid track (portal/db/LLM/QC/core) and bottom track (API/workers/ML/dashboard/audit) — and a bottom <em>continuous learning</em> loop feeds every audited decision back into the model.</>,
    subEmail: "attachments · PDF", subPortal: "forms", subRules: "risk policy",
    labelCore: "Policy core", subAudit: "LGPD · immutable",
    archLegend: <><b>Live flow</b> · 3 parallel pipelines + continuous learning loop</>,
    trustEyebrow: "· Market challenges",
    trustQuote: <>"The Property & Casualty market grows <em>double digits a year</em>. But companies' structures aren't keeping up with that acceleration."</>,
    trustBotK: "Four forces making the status quo unsustainable",
    trustSrc: "Source",
    stats: [
      { k:"Efficiency",             v:"40%",    l:"of underwriter time goes to administrative tasks.",            src:"Deloitte" },
      { k:"Digital Transformation", v:"70%",    l:"of insurers can't execute innovation due to IT constraints.",  src:"BCG" },
      { k:"Speed",                  v:"60%+",   l:"of brokers choose an insurer based on response speed.",        src:"Capgemini" },
      { k:"Business Focus",         v:"20-30%", l:"of corporate time is lost organizing unstructured data.",      src:"Gartner" },
    ],
    closeEyebrow: "· Next step",
    closeTitle: <>Your team has the <em>knowledge.</em><br/>WIR provides the <em>AI platform to scale.</em></>,
    closeTalk: "Talk to our partners",
    closeExplore: "Explore solutions",
  },
  es: {
    archEyebrow: "· Arquitectura WIR · Flujo en vivo",
    archTitle: <>Podemos <em>automatizar todo el recorrido</em> del negocio<br/>con una capa de <em>Inteligencia Artificial.</em></>,
    archLede: <>Tres pipelines paralelos atraviesan la arquitectura — top track (email/LB/reglas/score/webhook), mid track (portal/db/LLM/QC/core) y bottom track (API/workers/ML/dashboard/audit) — y un loop inferior de <em>continuous learning</em> realimenta el modelo con cada decisión auditada.</>,
    subEmail: "adjuntos · PDF", subPortal: "formularios", subRules: "política de riesgo",
    labelCore: "Core pólizas", subAudit: "LGPD · inmutable",
    archLegend: <><b>Flujo en vivo</b> · 3 pipelines paralelos + loop de aprendizaje continuo</>,
    trustEyebrow: "· Desafíos del mercado",
    trustQuote: <>"El mercado de Seguros de Daños crece <em>dos dígitos al año</em>. Pero la estructura de las empresas no acompaña esta aceleración."</>,
    trustBotK: "Cuatro fuerzas que vuelven insostenible el status quo",
    trustSrc: "Fuente",
    stats: [
      { k:"Eficiencia",              v:"40%",    l:"del tiempo del suscriptor se gasta en tareas administrativas.",        src:"Deloitte" },
      { k:"Transformación Digital",  v:"70%",    l:"de las aseguradoras no ejecutan innovación por limitaciones de TI.",   src:"BCG" },
      { k:"Velocidad",               v:"60%+",   l:"de los corredores eligen aseguradora por la velocidad de respuesta.",  src:"Capgemini" },
      { k:"Foco en Negocios",        v:"20-30%", l:"del tiempo corporativo se pierde organizando datos no estructurados.", src:"Gartner" },
    ],
    closeEyebrow: "· Próximo paso",
    closeTitle: <>Tu equipo tiene el <em>conocimiento.</em><br/>WIR da la <em>plataforma de IA para escalar.</em></>,
    closeTalk: "Hablar con nuestros socios",
    closeExplore: "Explorar soluciones",
  },
}[LANG];

// ArchFlow — 3 pipelines + 1 feedback loop visíveis. Cada dot percorre exatamente
// a mesma curva renderizada no diagrama (via <mpath href="#pipe-X"/>).
export function ArchFlow() {
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
          <div className="eyebrow">{T.archEyebrow}</div>
          <h2 className="archflow__title display">
            {T.archTitle}
          </h2>
          <p className="archflow__lede">
            {T.archLede}
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
            <SubNode x={75}  y={111} w={110} h={38} label="E-mail" sub={T.subEmail}   color="#1C17FF" opaque/>
            <SubNode x={75}  y={191} w={110} h={38} label="Portal" sub={T.subPortal}  color="#1C17FF" opaque/>
            <SubNode x={75}  y={271} w={110} h={38} label="API"    sub="3 endpoints"  color="#1C17FF" opaque/>

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
            <SubNode x={565} y={111} w={120} h={38} label="Business Rules" sub={T.subRules} color="#A44F98" opaque/>
            <SubNode x={565} y={191} w={120} h={38} label="WIR LLM"        sub="NLP · Fraud · Risk"  color="#EE7D48" opaque/>
            <SubNode x={565} y={271} w={120} h={38} label="ML Model"       sub="POST /predict"       color="#EE7D48" opaque/>

            {/* OUTPUT column */}
            <SubNode x={845} y={111} w={110} h={38} label="Score"     sub="risk + price"      color="#F8AD39" opaque/>
            <SubNode x={845} y={191} w={110} h={38} label="QC"        sub="quality check"     color="#10B981" opaque/>
            <SubNode x={845} y={271} w={110} h={38} label="Dashboard" sub="real time"         color="#10B981" opaque/>

            {/* CORE column */}
            <SubNode x={1075} y={111} w={110} h={38} label="Webhook"       sub="signed payload"    color="#10B981" opaque/>
            <SubNode x={1075} y={191} w={110} h={38} label={T.labelCore}   sub="policy admin"      color="#10B981" opaque/>
            <SubNode x={1075} y={271} w={110} h={38} label="Audit Log"     sub={T.subAudit}        color="#7540AC" opaque/>

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
          {T.archLegend}
        </div>
      </div>
    </section>
  );
}

export function Trust() {
  const stats = T.stats;
  return (
    <section id="desafios" className="trust" data-reveal>
      <div className="wrap">
        <div className="eyebrow eyebrow--onDark">{T.trustEyebrow}</div>
        <div className="trust__top">
          <blockquote className="trust__quote display">
            {T.trustQuote}
          </blockquote>
          <div className="trust__attrib">
            <div className="trust__avatar trust__avatar--photo" style={{backgroundImage:"url(/assets/team/nicholas.jpg)"}}/>
            <div>
              <b>Nicholas Weiser</b>
              <span>CEO · Co-Founder · WIR Innovation</span>
            </div>
          </div>
        </div>
        <div className="trust__divider"/>
        <div className="trust__bot">
          <div className="trust__bot-k">{T.trustBotK}</div>
          <div className="trust__stats">
            {stats.map((s,i) => (
              <div key={i} className="trust__stat">
                <div className="trust__stat-k">{s.k}</div>
                <div className="trust__stat-v display">{s.v}</div>
                <div className="trust__stat-l">{s.l}</div>
                <div className="trust__stat-s">{T.trustSrc} · <b>{s.src}</b></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Closing({ go }) {
  return (
    <section className="closing" data-reveal>
      <div className="wrap">
        <div className="closing__top">
          <div className="eyebrow">{T.closeEyebrow}</div>
          <h2 className="display closing__title">
            {T.closeTitle}
          </h2>
          <div className="closing__actions">
            <button className="btn btn--solid" onClick={()=>go("contact")}>
              {T.closeTalk} <span className="btn__arrow">→</span>
            </button>
            <button className="btn btn--ghost" onClick={()=>go("solutions")}>
              {T.closeExplore} <span className="btn__arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
