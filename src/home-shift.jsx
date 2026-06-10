import React, { useState, useEffect, useRef, useMemo } from 'react';
import { LANG } from './i18n.js';

/* ───────── Movement 03 · The Shift + 04 · The Stack ───────── */

const T = {
  pt: {
    shiftEyebrow: "· Dores vs. Soluções",
    shiftTitle: <>O problema estrutural.<br/><em>A resposta da WIR.</em></>,
    shiftSub: "Cada dor que observamos dentro das operações de subscrição mapeia diretamente para uma capacidade da plataforma — sem trocar o core, sem projeto pesado de TI.",
    shiftHeadL: "Antes · Problema estrutural",
    shiftHeadR: "Solução WIR",
    shiftHeadP: "Produto",
    shiftRows: [
      { dor:"E-mails de cotações desorganizados",   sol:"Estruturação e leitura automática de submissões", prod:"SS",      status:"prod" },
      { dor:"Falta de priorização comercial",        sol:"Classificação por apetite e rentabilidade",        prod:"SS",      status:"prod" },
      { dor:"Underwriter fazendo operação manual",   sol:"Eliminação completa das tarefas manuais",          prod:"UI",      status:"prod" },
      { dor:"Pipeline invisível para gestão",        sol:"Dashboard estratégico em tempo real",              prod:"UI",      status:"prod" },
      { dor:"Riscos fora do apetite processados",    sol:"Recusa automática inteligente",                    prod:"SS / UI", status:"prod" },
      { dor:"TI sobrecarregada e sem orçamento",     sol:"Plataforma 100% externa — sem TI",                 prod:"SS / UI", status:"prod" },
    ],
    shiftLegend: "Novos produtos em desenvolvimento",
    stackTitle: <>Quatro produtos. <em>Soluções de IA unificada.</em></>,
    stackSub: "Inteligência plug-and-play que se conecta aos sistemas existentes. Sem migração, apenas transformação imediata. Possibilitando escalar o seu negócio.",
    stackCta: "Explorar",
    prods: [
      { k:"SS", c:"#1C17FF", status:"prod", title:"Smart Sales", tag:"Inteligência de distribuição",
        lede:"Uma camada de IA com inteligência de distribuição, workflow, priorização, Dashboards, analytics e insights de negócio.",
        bullets:["Scoring em tempo real com Machine Learning calibrado ao apetite","Roteamento automático por apetite × exposure","Análise preditiva de conversão por produto × risco × corretor"],
        m:[{v:"Real-time", l:"Scoring"},{v:"Calibrado", l:"Ao apetite"},{v:"Always-on", l:"Pipeline"}] },
      { k:"UI", c:"#A44F98", status:"prod", title:"Underwriter Intelligence", tag:"Subscrição inteligente",
        lede:"Inteligência que automatiza a jornada da cotação, conforme política de riscos da seguradora, permitindo que os subscritores analisem riscos e foquem no desenvolvimento de negócios.",
        bullets:["Interpreta os dados e gera uma cotação de forma automática","Utiliza a política de aceitação de riscos com Inteligência em Machine Learning","Dados encriptografados em cada etapa e em compliance com a LGPD"],
        m:[{v:"Minutos", l:"Decisão"},{v:"Multi-fator", l:"Motor"},{v:"Auditável", l:"Todos os dados"}] },
      { k:"XBA", c:"#EE7D48", status:"dev", title:"X-sell Brokers", tag:"Automação de cross-sell",
        lede:"Analisa portfólios, identifica oportunidades e dispara campanhas — penetração e retenção crescem juntas.",
        bullets:["Mapeamento de portfólio cliente × produtos","Scoring de upsell × next-best-action","Campanhas multi-canal com trilha de atribuição"],
        m:[{v:"+Upsell", l:"Penetração"},{v:"−Churn", l:"Retenção"},{v:"Multi", l:"Canais"}] },
      { k:"SNB", c:"#F9B336", status:"dev", title:"SDR New Business", tag:"Venda inteligente",
        lede:"Qualifica prospects, dispara outreach multicanal e agenda reuniões de alto valor.",
        bullets:["Priorização por fit de produto","Sequências automáticas email · LinkedIn · voice","Agendamento inteligente com scoring de intenção"],
        m:[{v:"Qualif.", l:"Reuniões"},{v:"−CAC", l:"Aquisição"},{v:"+Pipe", l:"Gerado"}] },
    ],
  },
  en: {
    shiftEyebrow: "· Pains vs. Solutions",
    shiftTitle: <>The structural problem.<br/><em>The WIR answer.</em></>,
    shiftSub: "Every pain we observe inside underwriting operations maps directly to a platform capability — no core replacement, no heavy IT project.",
    shiftHeadL: "Before · Structural problem",
    shiftHeadR: "WIR solution",
    shiftHeadP: "Product",
    shiftRows: [
      { dor:"Disorganized quote request emails",     sol:"Automatic structuring and reading of submissions", prod:"SS",      status:"prod" },
      { dor:"No commercial prioritization",          sol:"Classification by appetite and profitability",     prod:"SS",      status:"prod" },
      { dor:"Underwriters doing manual operations",  sol:"Complete elimination of manual tasks",             prod:"UI",      status:"prod" },
      { dor:"Pipeline invisible to management",      sol:"Strategic real-time dashboard",                    prod:"UI",      status:"prod" },
      { dor:"Out-of-appetite risks being processed", sol:"Intelligent automatic declination",                prod:"SS / UI", status:"prod" },
      { dor:"IT overloaded and out of budget",       sol:"100% external platform — no IT required",          prod:"SS / UI", status:"prod" },
    ],
    shiftLegend: "New products in development",
    stackTitle: <>Four products. <em>Unified AI solutions.</em></>,
    stackSub: "Plug-and-play intelligence that connects to your existing systems. No migration — just immediate transformation, built to scale your business.",
    stackCta: "Explore",
    prods: [
      { k:"SS", c:"#1C17FF", status:"prod", title:"Smart Sales", tag:"Distribution intelligence",
        lede:"An AI layer with distribution intelligence, workflow, prioritization, dashboards, analytics and business insights.",
        bullets:["Real-time scoring with Machine Learning calibrated to your appetite","Automatic routing by appetite × exposure","Predictive conversion analysis by product × risk × broker"],
        m:[{v:"Real-time", l:"Scoring"},{v:"Calibrated", l:"To appetite"},{v:"Always-on", l:"Pipeline"}] },
      { k:"UI", c:"#A44F98", status:"prod", title:"Underwriter Intelligence", tag:"Intelligent underwriting",
        lede:"Intelligence that automates the quoting journey according to the insurer's risk policy — freeing underwriters to analyze risk and focus on business development.",
        bullets:["Interprets the data and generates a quote automatically","Applies your risk acceptance policy with Machine Learning intelligence","Data encrypted at every step, in compliance with LGPD"],
        m:[{v:"Minutes", l:"Decision"},{v:"Multi-factor", l:"Engine"},{v:"Auditable", l:"All data"}] },
      { k:"XBA", c:"#EE7D48", status:"dev", title:"X-sell Brokers", tag:"Cross-sell automation",
        lede:"Analyzes portfolios, spots opportunities and triggers campaigns — penetration and retention grow together.",
        bullets:["Client × product portfolio mapping","Upsell scoring × next-best-action","Multi-channel campaigns with attribution trail"],
        m:[{v:"+Upsell", l:"Penetration"},{v:"−Churn", l:"Retention"},{v:"Multi", l:"Channels"}] },
      { k:"SNB", c:"#F9B336", status:"dev", title:"SDR New Business", tag:"Intelligent sales",
        lede:"Qualifies prospects, runs multi-channel outreach and books high-value meetings.",
        bullets:["Prioritization by product fit","Automated sequences: email · LinkedIn · voice","Smart scheduling with intent scoring"],
        m:[{v:"Qualified", l:"Meetings"},{v:"−CAC", l:"Acquisition"},{v:"+Pipe", l:"Generated"}] },
    ],
  },
  es: {
    shiftEyebrow: "· Dolores vs. Soluciones",
    shiftTitle: <>El problema estructural.<br/><em>La respuesta de WIR.</em></>,
    shiftSub: "Cada dolor que observamos dentro de las operaciones de suscripción mapea directamente a una capacidad de la plataforma — sin cambiar el core, sin proyectos pesados de TI.",
    shiftHeadL: "Antes · Problema estructural",
    shiftHeadR: "Solución WIR",
    shiftHeadP: "Producto",
    shiftRows: [
      { dor:"Correos de cotización desorganizados",    sol:"Estructuración y lectura automática de solicitudes", prod:"SS",      status:"prod" },
      { dor:"Falta de priorización comercial",          sol:"Clasificación por apetito y rentabilidad",            prod:"SS",      status:"prod" },
      { dor:"Suscriptores haciendo operación manual",   sol:"Eliminación completa de las tareas manuales",         prod:"UI",      status:"prod" },
      { dor:"Pipeline invisible para la gerencia",      sol:"Dashboard estratégico en tiempo real",                prod:"UI",      status:"prod" },
      { dor:"Riesgos fuera del apetito procesados",     sol:"Declinación automática inteligente",                  prod:"SS / UI", status:"prod" },
      { dor:"TI sobrecargada y sin presupuesto",        sol:"Plataforma 100% externa — sin TI",                    prod:"SS / UI", status:"prod" },
    ],
    shiftLegend: "Nuevos productos en desarrollo",
    stackTitle: <>Cuatro productos. <em>Soluciones de IA unificada.</em></>,
    stackSub: "Inteligencia plug-and-play que se conecta a los sistemas existentes. Sin migración, solo transformación inmediata. Permitiendo escalar tu negocio.",
    stackCta: "Explorar",
    prods: [
      { k:"SS", c:"#1C17FF", status:"prod", title:"Smart Sales", tag:"Inteligencia de distribución",
        lede:"Una capa de IA con inteligencia de distribución, workflow, priorización, dashboards, analytics e insights de negocio.",
        bullets:["Scoring en tiempo real con Machine Learning calibrado al apetito","Ruteo automático por apetito × exposición","Análisis predictivo de conversión por producto × riesgo × corredor"],
        m:[{v:"Real-time", l:"Scoring"},{v:"Calibrado", l:"Al apetito"},{v:"Always-on", l:"Pipeline"}] },
      { k:"UI", c:"#A44F98", status:"prod", title:"Underwriter Intelligence", tag:"Suscripción inteligente",
        lede:"Inteligencia que automatiza el recorrido de la cotización según la política de riesgos de la aseguradora, permitiendo que los suscriptores analicen riesgos y se enfoquen en el desarrollo de negocios.",
        bullets:["Interpreta los datos y genera una cotización de forma automática","Aplica la política de aceptación de riesgos con inteligencia de Machine Learning","Datos encriptados en cada etapa y en compliance con la LGPD"],
        m:[{v:"Minutos", l:"Decisión"},{v:"Multifactor", l:"Motor"},{v:"Auditable", l:"Todos los datos"}] },
      { k:"XBA", c:"#EE7D48", status:"dev", title:"X-sell Brokers", tag:"Automatización de cross-sell",
        lede:"Analiza portafolios, identifica oportunidades y dispara campañas — penetración y retención crecen juntas.",
        bullets:["Mapeo de portafolio cliente × productos","Scoring de upsell × next-best-action","Campañas multicanal con traza de atribución"],
        m:[{v:"+Upsell", l:"Penetración"},{v:"−Churn", l:"Retención"},{v:"Multi", l:"Canales"}] },
      { k:"SNB", c:"#F9B336", status:"dev", title:"SDR New Business", tag:"Venta inteligente",
        lede:"Califica prospectos, dispara outreach multicanal y agenda reuniones de alto valor.",
        bullets:["Priorización por fit de producto","Secuencias automáticas email · LinkedIn · voice","Agendamiento inteligente con scoring de intención"],
        m:[{v:"Calif.", l:"Reuniones"},{v:"−CAC", l:"Adquisición"},{v:"+Pipe", l:"Generado"}] },
    ],
  },
}[LANG];

export function Shift() {
  // Dores vs Soluções — slide institucional, mapeado a SS/UI/em-dev
  const rows = T.shiftRows;
  return (
    <section className="shift" data-reveal>
      <div className="wrap shift__head">
        <div className="eyebrow">{T.shiftEyebrow}</div>
        <h2 className="shift__title display">
          {T.shiftTitle}
        </h2>
        <p className="shift__sub">{T.shiftSub}</p>
      </div>
      <div className="wrap">
        <div className="dvs">
          <div className="dvs__head">
            <div className="dvs__head-l">{T.shiftHeadL}</div>
            <div className="dvs__head-c"></div>
            <div className="dvs__head-r">{T.shiftHeadR}</div>
            <div className="dvs__head-p">{T.shiftHeadP}</div>
          </div>
          {rows.map((r,i) => (
            <div key={i} className="dvs__row">
              <div className="dvs__dor">
                <span className="dvs__x" aria-hidden>✕</span>
                {r.dor}
              </div>
              <div className="dvs__arrow" aria-hidden>→</div>
              <div className="dvs__sol">
                <span className="dvs__check" aria-hidden>✓</span>
                {r.sol}
              </div>
              <div className="dvs__prod">{r.prod}</div>
            </div>
          ))}
        </div>
        <div className="dvs__legend">
          <span className="dvs__pill dvs__pill--dev">XBA</span>
          <span className="dvs__pill dvs__pill--dev">SNB</span>
          <span className="dvs__legend-txt">{T.shiftLegend}</span>
        </div>
      </div>
    </section>
  );
}

export function ProductTabs({ go }) {
  const prods = T.prods;
  const [active, setActive] = React.useState(0);
  const p = prods[active];
  return (
    <section className="stack" data-reveal>
      <div className="wrap">
        <div className="stack__head">
          <h2 className="stack__title display">{T.stackTitle}</h2>
          <p className="stack__sub">{T.stackSub}</p>
        </div>

        <div className="stack__layout">
          {/* TOP — Horizontal agent tabs */}
          <div className="stack__tabs stack__tabs--row">
            {prods.map((x,i) => (
              <button key={x.k}
                className={"stack__tab" + (i === active ? " is-active" : "")}
                data-status={x.status}
                onClick={()=>setActive(i)}
                style={{"--c": x.c}}>
                <span className="stack__tab-k">{x.k}</span>
                <span className="stack__tab-l">{x.title}</span>
                <span className="stack__tab-tag">{x.tag}</span>
              </button>
            ))}
          </div>

          {/* BELOW — Active agent detail, full width */}
          <div className="stack__panel" style={{"--pc": p.c}} key={p.k}>
            <div className="stack__panel-head">
              <span className="stack__panel-code">{p.k}</span>
              <span className="stack__tag">{p.tag}</span>
            </div>
            <div className="stack__panel-body">
              <div className="stack__panel-lhs">
                <h3 className="display stack__panel-title">{p.title}</h3>
                <p className="stack__panel-lede">{p.lede}</p>
              </div>
              <ul className="stack__bullets">
                {p.bullets.map((b,j) => <li key={j}><span className="stack__bu"/>{b}</li>)}
              </ul>
            </div>
            <div className="stack__panel-bot">
              <div className="stack__m">
                {p.m.map((x,j) => (
                  <div key={j} className="stack__m-cell">
                    <b>{x.v}</b>
                    <span>{x.l}</span>
                  </div>
                ))}
              </div>
              <button className="btn btn--ghost stack__cta" onClick={()=>go("solutions")}>
                {T.stackCta} {p.k} <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
