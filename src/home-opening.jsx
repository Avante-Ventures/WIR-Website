import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LANG } from './i18n.js';

// (useLiveCounter removed — see Sesión 3 swarm: the fake counter undermined credibility.
// Hero metrics are now defensible static observations about the WIR thesis.)

/* ───────── Movement 01 · Opening + 02 · Proof ───────── */

const T = {
  pt: {
    dflowStages: ["INTAKE", "ENRICH", "SCORE", "DECISION"],
    dflowTitle: "Fluxo de decisão",
    dflowTitleV: "wir.flow",
    dflowLive: "ao vivo",
    dflowInput: { k: "INPUT", v: "e-mail · anexos · API" },
    dflowOutput: { k: "OUTPUT", v: "cotação + trilha" },
    dflowAudit: "audit trail · continuous learning",
    dflowAria: "Fluxo de decisão",
    heroTitle: <>A nova era do seguro é<br/><em>inteligência de dados</em>,<br/>velocidade e escala.</>,
    heroLede: "Camada de IA que pluga no seu core de apólices e devolve cotação em minutos — sem trocar o core, sem projeto de TI.",
    ctaTalk: "Falar com nossos sócios",
    ctaSee: "Ver a plataforma →",
    ctaMicrocopy: "Resposta de um sócio em 24h · conversa de 30 min · sem pitch comercial.",
    // Defensible static metrics — observation about the WIR thesis, not a fake live counter.
    liveStickers: [
      { value: "1",        label: "Piloto em produção", note: "Seguradora Tier-1 · LATAM" },
      { value: "minutos",  label: "Tempo de decisão",   note: "vs. 6 semanas legadas" },
      { value: "24/7",     label: "Cobertura",          note: "Sem TI da seguradora" },
    ],
    proofCta: "Quer ver isso na sua operação? · Falar com nossos sócios →",
    proofEyebrow: "· Tese de retorno",
    proofTitle: "O retorno operacional, em 6 vetores",
    indicators: [
      { sign:"+", w:"Eficiência",   l:"Escalar volume de cotações",
        c:"Volume de cotações cresce sem crescer headcount na mesma proporção." },
      { sign:"+", w:"Faturamento",  l:"Mais cotações, mais negócios fechados",
        c:"Resposta mais rápida ao corretor gera repiques e fechamentos adicionais." },
      { sign:"−", w:"DA · Custos",  l:"Margem expandida",
        c:"Despesa Administrativa cai quando o intake é automático." },
      { sign:"+", w:"Inteligência", l:"Dashboards em tempo real",
        c:"Análise pró-ativa do pipeline e foco nos fechamentos." },
      { sign:"+", w:"AI First",     l:"Pioneirismo na automação",
        c:"Quem se adianta lidera — risk assessment e pricing acima dos concorrentes." },
      { sign:"+", w:"Escalar",      l:"Futuro das seguradoras",
        c:"Escalar o negócio sobre automação e evolução da IA." },
    ],
  },
  en: {
    dflowStages: ["INTAKE", "ENRICH", "SCORE", "DECISION"],
    dflowTitle: "Decision flow",
    dflowTitleV: "wir.flow",
    dflowLive: "live",
    dflowInput: { k: "INPUT", v: "email · files · API" },
    dflowOutput: { k: "OUTPUT", v: "quote + trail" },
    dflowAudit: "audit trail · continuous learning",
    dflowAria: "Decision flow",
    heroTitle: <>The new era of insurance is<br/><em>data intelligence</em>,<br/>speed and scale.</>,
    heroLede: "An AI layer that plugs into your policy core and returns a quote in minutes — no core replacement, no IT project.",
    ctaTalk: "Talk to our partners",
    ctaSee: "See the platform →",
    ctaMicrocopy: "Reply from a partner within 24h · 30-minute call · no sales pitch.",
    liveStickers: [
      { value: "1",       label: "Pilot in production", note: "Tier-1 LATAM insurer" },
      { value: "minutes", label: "Decision time",       note: "vs. 6 legacy weeks" },
      { value: "24/7",    label: "Coverage",            note: "Without insurer IT" },
    ],
    proofCta: "Want to see this in your operation? · Talk to our partners →",
    proofEyebrow: "· Return thesis",
    proofTitle: "Operational return, in 6 vectors",
    indicators: [
      { sign:"+", w:"Efficiency",   l:"Scale quoting volume",
        c:"Volume grows without growing headcount at the same rate." },
      { sign:"+", w:"Revenue",      l:"More quotes, more closed business",
        c:"Faster broker turnaround creates additional closings and repeat asks." },
      { sign:"−", w:"Admin · Costs", l:"Margin expanded",
        c:"Administrative expense drops when intake is automatic." },
      { sign:"+", w:"Intelligence", l:"Real-time dashboards",
        c:"Proactive pipeline analysis to focus on closings." },
      { sign:"+", w:"AI First",     l:"Automation pioneer",
        c:"Moving first leads — risk assessment and pricing ahead of competitors." },
      { sign:"+", w:"Scale",        l:"Carriers' future",
        c:"Scale the business on automation and AI evolution." },
    ],
  },
  es: {
    dflowStages: ["CAPTURA", "ENRIQ.", "SCORE", "DECISIÓN"],
    dflowTitle: "Flujo de decisión",
    dflowTitleV: "wir.flow",
    dflowLive: "en vivo",
    dflowInput: { k: "INPUT", v: "correo · anexos · API" },
    dflowOutput: { k: "OUTPUT", v: "cotización + traza" },
    dflowAudit: "audit trail · continuous learning",
    dflowAria: "Flujo de decisión",
    heroTitle: <>La nueva era del seguro es<br/><em>inteligencia de datos</em>,<br/>velocidad y escala.</>,
    heroLede: "Capa de IA que se enchufa a tu core de pólizas y devuelve cotización en minutos — sin reemplazar el core, sin proyecto de TI.",
    ctaTalk: "Hablar con nuestros socios",
    ctaSee: "Ver la plataforma →",
    ctaMicrocopy: "Respuesta de un socio en 24h · llamada de 30 min · sin pitch comercial.",
    liveStickers: [
      { value: "1",        label: "Piloto en producción", note: "Aseguradora Tier-1 · LATAM" },
      { value: "minutos",  label: "Tiempo de decisión",   note: "vs. 6 semanas heredadas" },
      { value: "24/7",     label: "Cobertura",            note: "Sin TI de la aseguradora" },
    ],
    proofCta: "¿Quieres ver esto en tu operación? · Hablar con nuestros socios →",
    proofEyebrow: "· Tesis de retorno",
    proofTitle: "El retorno operacional, en 6 vectores",
    indicators: [
      { sign:"+", w:"Eficiencia",   l:"Escalar volumen de cotizaciones",
        c:"El volumen crece sin crecer headcount en la misma proporción." },
      { sign:"+", w:"Facturación",  l:"Más cotizaciones, más cierres",
        c:"Respuesta más rápida al corredor genera repiques y cierres extra." },
      { sign:"−", w:"GA · Costos",  l:"Margen expandido",
        c:"Gasto administrativo cae cuando el intake es automático." },
      { sign:"+", w:"Inteligencia", l:"Dashboards en tiempo real",
        c:"Análisis proactivo del pipeline, foco en cierres." },
      { sign:"+", w:"AI First",     l:"Pionerismo en automatización",
        c:"Quien se adelanta lidera — risk y pricing por encima de la competencia." },
      { sign:"+", w:"Escalar",      l:"Futuro de las aseguradoras",
        c:"Escalar el negocio sobre automatización y evolución de la IA." },
    ],
  },
}[LANG];

// DecisionFlow — schematic pipeline (Stripe-style), VERTICAL layout for hero right column.
// Chips stacked top-to-bottom, gradient-stroke connectors between them, mono labels.
// Palette runs amber TOP → blue BOTTOM, matching the WIR logo direction.
function DecisionFlow() {
  const [pulse, setPulse] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 4), 2400);
    return () => clearInterval(id);
  }, []);

  const stages = T.dflowStages;
  // Vertical compact layout — viewBox 0 0 360 380
  // INPUT chip · 4 single-line stage chips · OUTPUT chip · audit return on right
  const chipW = 280, chipH = 42, stageH = 36;
  const chipX = (360 - chipW) / 2; // 40
  const inputY = 18;
  const stageStartY = inputY + chipH + 14;
  const stageGap = 6;
  const stageY = (i) => stageStartY + i * (stageH + stageGap);
  const outputY = stageY(stages.length - 1) + stageH + 14;
  // Active stage palette progression (amber → coral → magenta → purple → blue)
  const stageColors = ["#F8AD39", "#FE8B77", "#AE46C0", "#7540AC"];

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

      <svg className="dflow__svg" viewBox={`0 0 360 ${outputY + chipH + 18}`} xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          {/* Main flow gradient — amber TOP → blue BOTTOM (matches logo direction, vertical) */}
          <linearGradient id="dflowMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#F8AD39"/>
            <stop offset="25%"  stopColor="#FE8B77"/>
            <stop offset="50%"  stopColor="#AE46C0"/>
            <stop offset="75%"  stopColor="#7540AC"/>
            <stop offset="100%" stopColor="#3222E9"/>
          </linearGradient>
        </defs>

        {/* INPUT chip (top) — 2-line compact */}
        <g>
          <rect x={chipX} y={inputY} width={chipW} height={chipH} rx="6"
            fill="#FAF6EE" stroke="#0B0A08" strokeOpacity="0.25" strokeWidth="1"/>
          <text x={chipX + 14} y={inputY + 17} fill="#524C42" fontSize="9"
            fontFamily="JetBrains Mono, monospace" letterSpacing="1.8" fontWeight="600">
            {T.dflowInput.k}
          </text>
          <text x={chipX + 14} y={inputY + 33} fill="#0B0A08" fontSize="11"
            fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fontWeight="500">
            {T.dflowInput.v}
          </text>
        </g>

        {/* Vertical connector: INPUT → first stage */}
        <line x1="180" y1={inputY + chipH} x2="180" y2={stageStartY}
          stroke="url(#dflowMain)" strokeWidth="1.5"/>

        {/* 4 stage chips — single line, compact */}
        {stages.map((k, i) => {
          const y = stageY(i);
          const active = pulse === i;
          const color = stageColors[i];
          return (
            <g key={k}>
              <rect x={chipX} y={y} width={chipW} height={stageH} rx="6"
                fill="#FAF6EE"
                stroke={active ? color : "#0B0A08"}
                strokeOpacity={active ? 1 : 0.22}
                strokeWidth={active ? 1.4 : 1}
                style={{transition: "all .3s ease"}}/>
              <text x={chipX + 14} y={y + 16} fill="#6E695C" fontSize="8"
                fontFamily="JetBrains Mono, monospace"
                letterSpacing="1.6" fontWeight="600">
                0{i+1}
              </text>
              <text x={chipX + 14} y={y + 28} fill={active ? "#0B0A08" : "#2B2720"}
                fontSize="13" fontFamily="JetBrains Mono, monospace"
                letterSpacing="0.5" fontWeight="600"
                style={{transition: "fill .3s"}}>
                {k}
              </text>
              {/* Vertical connector to next stage */}
              {i < stages.length - 1 && (
                <line x1="180" y1={y + stageH} x2="180" y2={y + stageH + stageGap}
                  stroke="url(#dflowMain)" strokeWidth="1.5"/>
              )}
              {/* Active state — color bar on left */}
              {active && (
                <rect x={chipX} y={y} width="2" height={stageH} fill={color}/>
              )}
            </g>
          );
        })}

        {/* Vertical connector: last stage → OUTPUT */}
        <line x1="180" y1={stageY(stages.length - 1) + stageH} x2="180" y2={outputY}
          stroke="url(#dflowMain)" strokeWidth="1.5"/>

        {/* OUTPUT chip (bottom) — 2-line compact */}
        <g>
          <rect x={chipX} y={outputY} width={chipW} height={chipH} rx="6"
            fill="#FAF6EE" stroke="#3222E9" strokeOpacity="0.5" strokeWidth="1"/>
          <text x={chipX + 14} y={outputY + 17} fill="#3222E9" fontSize="9"
            fontFamily="JetBrains Mono, monospace" letterSpacing="1.8" fontWeight="600">
            {T.dflowOutput.k}
          </text>
          <text x={chipX + 14} y={outputY + 33} fill="#0B0A08" fontSize="11"
            fontFamily="JetBrains Mono, monospace" letterSpacing="0.4" fontWeight="500">
            {T.dflowOutput.v}
          </text>
        </g>
      </svg>
    </div>
  );
}

// Static hero metrics — no chrome, no label, no off-brand pulse.
function HeroMetrics() {
  return (
    <div className="livestrip">
      <div className="livestrip__cells">
        {T.liveStickers.map((s, i) => (
          <div key={i} className="livestrip__cell">
            <div className="livestrip__v">{s.value}</div>
            <div className="livestrip__l">{s.label}</div>
            {s.note && <div className="livestrip__n">{s.note}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Opening({ go }) {
  return (
    <section className="opening bg-editorial bg-editorial--tr">
      <div className="wrap">
        {/* 2-column hero — H1 left, DecisionFlow right (vertical schematic), pushed lower */}
        <div className="opening__hero">
          <div className="opening__hero-L">
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
              <a className="opening__textlink" href="#solutions"
                onClick={(e)=>{e.preventDefault(); go("solutions")}}>
                {T.ctaSee}
              </a>
            </div>
            {T.ctaMicrocopy && (
              <p className="opening__microcopy">{T.ctaMicrocopy}</p>
            )}
            <HeroMetrics/>
          </div>
          <div className="opening__hero-R">
            <DecisionFlow/>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Proof({ go }) {
  const indicators = T.indicators;
  return (
    <section className="proof bg-editorial bg-editorial--tl" data-reveal>
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
        {go && T.proofCta && (
          <a href="#contact" className="proof__cta"
            onClick={(e)=>{e.preventDefault(); go("contact")}}>
            {T.proofCta}
          </a>
        )}
      </div>
    </section>
  );
}
