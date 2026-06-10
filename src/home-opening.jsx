import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LANG } from './i18n.js';

/* ───────── Movement 01 · Opening + 02 · Proof ───────── */

const T = {
  pt: {
    dflowStages: ["COLETA", "ENRIQ.", "SCORE", "DECISÃO", "SUBSCRIÇÃO"],
    dflowTitle: "Fluxo de decisão",
    dflowTitleV: "wir.produtos",
    dflowLive: "ao vivo",
    dflowSources: ["e-mail", "anexos", "API"],
    dflowOutputs: ["cotação", "trilha"],
    dflowLoop: "· ciclo de aprendizado contínuo · machine learning ·",
    dflowFoot: ["Dados", "Produtos WIR", "Decisão auditável"],
    dflowAria: "Fluxo de decisão",
    mastDate: "ABR 2026",
    mastTheme: "INTELIGÊNCIA ARTIFICIAL · SEGUROS",
    mastRoute: "SÃO PAULO ⟶ SILICON VALLEY",
    kicker: "Plataforma em produção · decisão 24/7",
    heroTitle: <>A nova era do seguro é<br/><em>inteligência de dados</em>,<br/>velocidade e escala.</>,
    heroLede: "A WIR entrega uma camada de IA com analytics e dashboards real time, sem substituir os sistemas atuais.",
    ctaTalk: "Falar com a equipe",
    ctaSee: "Ver a plataforma",
    heroCaption: "· Como a WIR transforma dados em decisões",
    proofEyebrow: "· Análise de possibilidades de retorno sobre o investimento",
    proofTitle: "6 indicadores estratégicos de resultado",
    indicators: [
      { sign:"+", w:"Eficiência",   l:"Escalar volume de cotações",
        c:"Possibilidade de crescer exponencialmente o volume de cotações." },
      { sign:"+", w:"Faturamento",  l:"Mais cotações geram mais negócios fechados",
        c:"O retorno mais rápido aos corretores gera mais possibilidades de negócios e repiques, além do aumento do volume de cotações por mês." },
      { sign:"−", w:"DA · Custos",  l:"Aumento de margem · Lucratividade",
        c:"Com o aumento das cotações sem necessidade de crescer o headcount na mesma proporção, traz uma redução da Despesa Administrativa e possível aumento de margem." },
      { sign:"+", w:"Inteligência", l:"Dashboards, Analytics e Relatórios real time",
        c:"Analisar de forma pró-ativa os negócios em andamento e o pipeline para focar nos fechamentos." },
      { sign:"+", w:"AI First",     l:"Pioneiros em automação com IA",
        c:"Quem sai na frente com soluções tecnológicas consegue liderar e atrair os melhores resultados, com avaliação de risco e assertividade na precificação superiores aos concorrentes." },
      { sign:"+", w:"Escalar",      l:"Futuro das seguradoras",
        c:"Possibilidade de escalar os negócios devido às automações e à evolução da inteligência artificial." },
    ],
  },
  en: {
    dflowStages: ["INTAKE", "ENRICH", "SCORE", "DECISION", "UNDERWRITE"],
    dflowTitle: "Decision flow",
    dflowTitleV: "wir.products",
    dflowLive: "live",
    dflowSources: ["email", "files", "API"],
    dflowOutputs: ["quote", "trail"],
    dflowLoop: "· continuous learning loop · machine learning ·",
    dflowFoot: ["Data", "WIR Products", "Auditable decision"],
    dflowAria: "Decision flow",
    mastDate: "APR 2026",
    mastTheme: "ARTIFICIAL INTELLIGENCE · INSURANCE",
    mastRoute: "SÃO PAULO ⟶ SILICON VALLEY",
    kicker: "Platform in production · 24/7 decisioning",
    heroTitle: <>The new era of insurance is<br/><em>data intelligence</em>,<br/>speed and scale.</>,
    heroLede: "WIR delivers an AI layer with real-time analytics and dashboards — without replacing your current systems.",
    ctaTalk: "Talk to the team",
    ctaSee: "See the platform",
    heroCaption: "· How WIR turns data into decisions",
    proofEyebrow: "· Return-on-investment outlook",
    proofTitle: "6 strategic outcome indicators",
    indicators: [
      { sign:"+", w:"Efficiency",   l:"Scale quoting volume",
        c:"The ability to grow quoting volume exponentially." },
      { sign:"+", w:"Revenue",      l:"More quotes turn into more closed business",
        c:"Faster turnaround to brokers creates more business opportunities and repeat requests, on top of a higher monthly quoting volume." },
      { sign:"−", w:"Admin · Costs", l:"Margin expansion · Profitability",
        c:"Quoting volume grows without growing headcount at the same rate — reducing administrative expense and opening room for margin expansion." },
      { sign:"+", w:"Intelligence", l:"Real-time dashboards, analytics and reporting",
        c:"Proactively analyze live deals and the pipeline to focus on closings." },
      { sign:"+", w:"AI First",     l:"Pioneers in AI-driven automation",
        c:"Moving first with technology means leading the market — with risk assessment and pricing accuracy ahead of competitors." },
      { sign:"+", w:"Scale",        l:"The future of insurance carriers",
        c:"The ability to scale the business on automation and the ongoing evolution of artificial intelligence." },
    ],
  },
  es: {
    dflowStages: ["CAPTURA", "ENRIQ.", "SCORE", "DECISIÓN", "SUSCRIPCIÓN"],
    dflowTitle: "Flujo de decisión",
    dflowTitleV: "wir.productos",
    dflowLive: "en vivo",
    dflowSources: ["correo", "anexos", "API"],
    dflowOutputs: ["cotiz.", "trazas"],
    dflowLoop: "· ciclo de aprendizaje continuo · machine learning ·",
    dflowFoot: ["Datos", "Productos WIR", "Decisión auditable"],
    dflowAria: "Flujo de decisión",
    mastDate: "ABR 2026",
    mastTheme: "INTELIGENCIA ARTIFICIAL · SEGUROS",
    mastRoute: "SÃO PAULO ⟶ SILICON VALLEY",
    kicker: "Plataforma en producción · decisión 24/7",
    heroTitle: <>La nueva era del seguro es<br/><em>inteligencia de datos</em>,<br/>velocidad y escala.</>,
    heroLede: "WIR entrega una capa de IA con analytics y dashboards en tiempo real, sin sustituir los sistemas actuales.",
    ctaTalk: "Hablar con el equipo",
    ctaSee: "Ver la plataforma",
    heroCaption: "· Cómo WIR transforma datos en decisiones",
    proofEyebrow: "· Análisis de posibilidades de retorno sobre la inversión",
    proofTitle: "6 indicadores estratégicos de resultado",
    indicators: [
      { sign:"+", w:"Eficiencia",   l:"Escalar el volumen de cotizaciones",
        c:"Posibilidad de crecer exponencialmente el volumen de cotizaciones." },
      { sign:"+", w:"Facturación",  l:"Más cotizaciones generan más negocios cerrados",
        c:"Responder más rápido a los corredores genera más oportunidades de negocio y recompras, además del aumento del volumen mensual de cotizaciones." },
      { sign:"−", w:"GA · Costos",  l:"Aumento de margen · Rentabilidad",
        c:"Al aumentar las cotizaciones sin crecer el headcount en la misma proporción, se reduce el gasto administrativo y se abre espacio para mejorar el margen." },
      { sign:"+", w:"Inteligencia", l:"Dashboards, analytics y reportes en tiempo real",
        c:"Analizar de forma proactiva los negocios en curso y el pipeline para enfocarse en los cierres." },
      { sign:"+", w:"AI First",     l:"Pioneros en automatización con IA",
        c:"Quien se adelanta con soluciones tecnológicas logra liderar y atraer los mejores resultados, con evaluación de riesgo y precisión en la tarificación superiores a la competencia." },
      { sign:"+", w:"Escalar",      l:"El futuro de las aseguradoras",
        c:"Posibilidad de escalar el negocio gracias a las automatizaciones y la evolución de la inteligencia artificial." },
    ],
  },
}[LANG];

// DecisionFlow — network pipeline visualization showing how data becomes decisions
function DecisionFlow() {
  const [pulse, setPulse] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 5), 2400);
    return () => clearInterval(id);
  }, []);

  const stages = T.dflowStages.map(k => ({ k }));

  return (
    <div className="dflow" aria-label={T.dflowAria}>
      <div className="dflow__head">
        <div className="dflow__title">
          <span className="dflow__title-k">{T.dflowTitle}</span>
          <span className="dflow__title-v">{T.dflowTitleV}</span>
        </div>
        <div className="dflow__status">
          <span className="dflow__dot"/>
          {T.dflowLive}
        </div>
      </div>

      <svg className="dflow__svg" viewBox="-30 0 510 340" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id="dflowPath" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7540AC" stopOpacity="0.15"/>
            <stop offset="50%" stopColor="#7540AC" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#F8AD39" stopOpacity="0.6"/>
          </linearGradient>
          <radialGradient id="dflowNode" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FE8B77" stopOpacity="1"/>
            <stop offset="100%" stopColor="#7540AC" stopOpacity="1"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
        </defs>

        {/* Source nodes (left, 3 stacked) — labels with breathing room */}
        {[{y:80,l:T.dflowSources[0]},{y:170,l:T.dflowSources[1]},{y:260,l:T.dflowSources[2]}].map((s,i) => (
          <g key={i}>
            <circle cx="60" cy={s.y} r="8" fill="#E9E3D7" stroke="#7540AC" strokeWidth="1.5"/>
            <text x="22" y={s.y + 4} fill="#6A6458" fontSize="11"
              fontFamily="JetBrains Mono, monospace" textAnchor="end" letterSpacing="0.5"
              fontWeight="500">
              {s.l}
            </text>
            {/* path from source to central spine */}
            <path d={`M68 ${s.y} Q 110 ${s.y}, 140 170`}
              stroke="url(#dflowPath)" strokeWidth="1.5" fill="none"/>
          </g>
        ))}

        {/* Central pipeline spine */}
        <line x1="140" y1="170" x2="395" y2="170" stroke="#7540AC" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="3 4"/>

        {/* Processing stages on spine — wider spacing, no sub label to prevent overlap */}
        {stages.map((s, i) => {
          const x = 150 + i * 60;
          const active = pulse === i;
          return (
            <g key={i}>
              <circle cx={x} cy="170" r={active ? 13 : 9}
                fill={active ? "url(#dflowNode)" : "#0B0A08"}
                stroke={active ? "#F8AD39" : "#7540AC"}
                strokeWidth={active ? 2 : 1.5}
                filter={active ? "url(#glow)" : undefined}
                style={{transition: "all .4s ease"}}/>
              <text x={x} y={i % 2 === 0 ? 145 : 200} fill={active ? "#0B0A08" : "#6A6458"}
                fontSize="9.5" fontFamily="JetBrains Mono, monospace"
                textAnchor="middle" letterSpacing="0.8"
                fontWeight={active ? "700" : "500"}
                style={{transition: "fill .3s"}}>
                {s.k}
              </text>
            </g>
          );
        })}

        {/* Output branches (right side, 2) */}
        <path d="M395 170 Q 435 170, 445 80" stroke="url(#dflowPath)" strokeWidth="1.5" fill="none"/>
        <path d="M395 170 Q 435 170, 445 260" stroke="url(#dflowPath)" strokeWidth="1.5" fill="none"/>

        {[{y:80,l:T.dflowOutputs[0],c:"#F8AD39"},{y:260,l:T.dflowOutputs[1],c:"#7540AC"}].map((o,i) => (
          <g key={i}>
            <rect x="425" y={o.y - 12} width="48" height="24" rx="5"
              fill={o.c} fillOpacity="0.15"
              stroke={o.c} strokeWidth="1"/>
            <text x="449" y={o.y + 4} fill={o.c}
              fontSize="9" fontFamily="JetBrains Mono, monospace"
              textAnchor="middle" letterSpacing="0.5" fontWeight="600">
              {o.l}
            </text>
          </g>
        ))}

        {/* Learning feedback loop (curved arc at bottom) */}
        <path d="M 450 270 Q 250 320, 50 260"
          stroke="#FE8B77" strokeWidth="1" strokeDasharray="4 4" fill="none" strokeOpacity="0.4"/>
        <text x="250" y="310" fill="#FE8B77"
          fontSize="9" fontFamily="JetBrains Mono, monospace"
          textAnchor="middle" letterSpacing="1.5" fillOpacity="0.75">
          {T.dflowLoop}
        </text>
      </svg>

      <div className="dflow__foot">
        <span>{T.dflowFoot[0]}</span>
        <span className="dflow__arrow">→</span>
        <span>{T.dflowFoot[1]}</span>
        <span className="dflow__arrow">→</span>
        <span>{T.dflowFoot[2]}</span>
      </div>
    </div>
  );
}

export function Opening({ go }) {
  return (
    <section className="opening">
      <div className="wrap">
        {/* Edition masthead */}
        <div className="opening__mast">
          <div className="opening__mast-L">
            <span>{T.mastDate}</span>
            <span>{T.mastTheme}</span>
          </div>
          <div className="opening__mast-R">
            <span>{T.mastRoute}</span>
          </div>
        </div>

        {/* Hero grid */}
        <div className="opening__hero">
          <div className="opening__hero-L">
            <div className="opening__kicker">
              <span className="opening__kicker-dot"/>
              <span>{T.kicker}</span>
            </div>
            <h1 className="display opening__title opening__title--long">
              {T.heroTitle}
            </h1>
            <p className="opening__lede">
              {T.heroLede}
            </p>
            <div className="opening__actions">
              <button className="btn btn--solid" onClick={()=>go("contact")}>
                {T.ctaTalk} <span className="btn__arrow">→</span>
              </button>
              <button className="btn btn--ghost" onClick={()=>go("solutions")}>
                {T.ctaSee} <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
          <div className="opening__hero-R">
            <div className="opening__caption">{T.heroCaption}</div>
            <DecisionFlow/>
          </div>
        </div>

      </div>
    </section>
  );
}

export function Proof() {
  const indicators = T.indicators;
  return (
    <section className="proof" data-reveal>
      <div className="wrap">
        <div className="proof__head">
          <div className="eyebrow">{T.proofEyebrow}</div>
          <h2 className="proof__title display">{T.proofTitle}</h2>
        </div>
        <div className="proof__grid proof__grid--6">
          {indicators.map((x,i) => (
            <div key={i} className="proof__cell">
              <div className="proof__word display">
                <span className="proof__sign">{x.sign}</span> {x.w}
              </div>
              <div className="proof__label">{x.l}</div>
              <div className="proof__caption">{x.c}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
