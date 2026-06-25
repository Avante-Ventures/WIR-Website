import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';
import { LANG } from './i18n.js';
import { ProductTabs, Shift } from './home-shift.jsx';

/* ───────── Soluções · catalog editorial ───────── */

const T = {
  pt: {
    solHeroEyebrow: "· Produtos & IA",
    solHeroTitle: <>Quatro produtos.<br/><em>Uma plataforma de inteligência.</em></>,
    solHeroLede: "Smart Sales e Underwriter Intelligence rodam hoje em produção. X-sell Brokers e SDR New Business estão em desenvolvimento. Tudo conecta ao seu core sem migração.",
    flowEyebrow: "· Workflow Inteligente de Subscrição",
    flowTitle: <><em>SS + UI</em> em operação.<br/>Seis estágios. Um único core.</>,
    flowSub: "A camada de IA que opera entre o portal de cotações e o seu core de apólice — sem substituir nenhum dos dois.",
    stages: [
      { k:"01", t:"Application Intake",      d:"Entrada multicanal e validação automática · API · Portal · Upload · validação em tempo real.", c:"#3D58D9" },
      { k:"02", t:"AI Document Extraction",  d:"Leitura inteligente de documentos · extração automática de campos com alta precisão.",        c:"#7540AC" },
      { k:"03", t:"Business Intelligence",   d:"Enriquecimento e contexto do corretor · score · histórico de conversão · priorização.",       c:"#AE46C0" },
      { k:"04", t:"Risk Assessment",         d:"Motor de risco e fraude · score de risco · probabilidade · decisão automatizada.",             c:"#FE8B77", tag:"SS" },
      { k:"05", t:"Pricing Engine",          d:"Precificação dinâmica · ajuste de risco · cálculo automático de prêmio · output instantâneo.", c:"#F8AD39", tag:"UI" },
      { k:"06", t:"Decision & Prioritization", d:"Orquestração final e fila do underwriter · SLA visível · review ou bind.",                  c:"#10B981" },
    ],
    flowLegend: "Workflow ativo · SS + UI cobrem do intake à decisão · XBA e SNB em desenvolvimento",
    priceEyebrow: "· Pricing",
    priceTitle: <>Duas fases.<br/><em>Uma parceria de longo prazo.</em></>,
    plans: [
      {
        k: "Implementação + SaaS",
        tag: "Setup único · 3 a 12 meses",
        price: "Projeto",
        desc: "Implementação da plataforma: automações, integrações, testes, ajustes go-live. Preço fechado, escopo claro, KPIs acordados antes de começar.",
        features: [
          "Reuniões de Discovery do processo — escolha do ramo de seguros",
          "Definição do escopo do projeto",
          "Acompanhamento das entregas",
          "Treinamento da plataforma",
          "Relatório executivo",
        ],
        cta: "Entre em contato para saber mais",
        hi: false,
      },
      {
        k: "Plataforma SaaS",
        tag: "Operação contínua · pós go-live",
        price: "Mensal por uso",
        desc: "Operação em produção depois do go-live. Modelo de cobrança ajustado a cada cliente.",
        features: [
          "Módulos ativos em produção",
          "Modelo de cobrança mensal",
          "Suporte dedicado",
          "Treinamentos",
          "Reuniões de acompanhamento",
        ],
        cta: "Entre em contato para saber mais",
        hi: true,
      },
    ],
    closeEyebrow: "· Próximo passo",
    closeTitle: <>Sua equipe tem o<br/><em>conhecimento.</em><br/>A WIR Innovation dá a<br/><em>Plataforma de IA<br/>para ESCALAR.</em></>,
    closeP: "Implementação da plataforma: automações, integrações, testes, ajustes go-live. Preço fechado, escopo claro, KPIs acordados antes de começar.",
    closeCta: "Entre em contato para saber mais",
  },
  en: {
    solHeroEyebrow: "· Products & AI",
    solHeroTitle: <>Four products.<br/><em>One intelligence platform.</em></>,
    solHeroLede: "Smart Sales and Underwriter Intelligence run in production today. X-sell Brokers and SDR New Business are in development. Everything connects to your core without migration.",
    flowEyebrow: "· Intelligent Underwriting Workflow",
    flowTitle: <><em>SS + UI</em> in operation.<br/>Six stages. One single core.</>,
    flowSub: "The AI layer that operates between your quoting portal and your policy core — without replacing either.",
    stages: [
      { k:"01", t:"Application Intake",      d:"Multichannel intake and automatic validation · API · Portal · Upload · real-time validation.", c:"#3D58D9" },
      { k:"02", t:"AI Document Extraction",  d:"Intelligent document reading · automatic field extraction with high precision.",               c:"#7540AC" },
      { k:"03", t:"Business Intelligence",   d:"Broker enrichment and context · score · conversion history · prioritization.",                 c:"#AE46C0" },
      { k:"04", t:"Risk Assessment",         d:"Risk & fraud engine · risk score · probability · automated decision.",                          c:"#FE8B77", tag:"SS" },
      { k:"05", t:"Pricing Engine",          d:"Dynamic pricing · risk adjustment · automatic premium calculation · instant output.",           c:"#F8AD39", tag:"UI" },
      { k:"06", t:"Decision & Prioritization", d:"Final orchestration and underwriter queue · visible SLA · review or bind.",                  c:"#10B981" },
    ],
    flowLegend: "Active workflow · SS + UI cover intake to decision · XBA and SNB in development",
    priceEyebrow: "· Pricing",
    priceTitle: <>Two phases.<br/><em>One long-term partnership.</em></>,
    plans: [
      {
        k: "Implementation + SaaS",
        tag: "One-time setup · 3 to 12 months",
        price: "Project",
        desc: "Platform implementation: automations, integrations, testing, go-live adjustments. Fixed price, clear scope, KPIs agreed before we start.",
        features: [
          "Process discovery sessions — choice of insurance line",
          "Project scope definition",
          "Delivery tracking",
          "Platform training",
          "Executive report",
        ],
        cta: "Get in touch to learn more",
        hi: false,
      },
      {
        k: "SaaS Platform",
        tag: "Continuous operation · post go-live",
        price: "Monthly · usage-based",
        desc: "Production operation after go-live. Billing model tailored to each client.",
        features: [
          "Active modules in production",
          "Monthly billing model",
          "Dedicated support",
          "Training",
          "Follow-up meetings",
        ],
        cta: "Get in touch to learn more",
        hi: true,
      },
    ],
    closeEyebrow: "· Next step",
    closeTitle: <>Your team has the<br/><em>knowledge.</em><br/>WIR Innovation provides the<br/><em>AI Platform<br/>to SCALE.</em></>,
    closeP: "Platform implementation: automations, integrations, testing, go-live adjustments. Fixed price, clear scope, KPIs agreed before we start.",
    closeCta: "Get in touch to learn more",
  },
  es: {
    solHeroEyebrow: "· Productos & IA",
    solHeroTitle: <>Cuatro productos.<br/><em>Una plataforma de inteligencia.</em></>,
    solHeroLede: "Smart Sales y Underwriter Intelligence corren en producción hoy. X-sell Brokers y SDR New Business están en desarrollo. Todo se conecta a tu core sin migración.",
    flowEyebrow: "· Workflow Inteligente de Suscripción",
    flowTitle: <><em>SS + UI</em> en operación.<br/>Seis etapas. Un único core.</>,
    flowSub: "La capa de IA que opera entre el portal de cotizaciones y tu core de pólizas — sin sustituir a ninguno de los dos.",
    stages: [
      { k:"01", t:"Application Intake",      d:"Entrada multicanal y validación automática · API · Portal · Upload · validación en tiempo real.", c:"#3D58D9" },
      { k:"02", t:"AI Document Extraction",  d:"Lectura inteligente de documentos · extracción automática de campos con alta precisión.",         c:"#7540AC" },
      { k:"03", t:"Business Intelligence",   d:"Enriquecimiento y contexto del corredor · score · historial de conversión · priorización.",       c:"#AE46C0" },
      { k:"04", t:"Risk Assessment",         d:"Motor de riesgo y fraude · score de riesgo · probabilidad · decisión automatizada.",              c:"#FE8B77", tag:"SS" },
      { k:"05", t:"Pricing Engine",          d:"Tarificación dinámica · ajuste de riesgo · cálculo automático de prima · output instantáneo.",    c:"#F8AD39", tag:"UI" },
      { k:"06", t:"Decision & Prioritization", d:"Orquestación final y cola del suscriptor · SLA visible · review o bind.",                       c:"#10B981" },
    ],
    flowLegend: "Workflow activo · SS + UI cubren del intake a la decisión · XBA y SNB en desarrollo",
    priceEyebrow: "· Pricing",
    priceTitle: <>Dos fases.<br/><em>Una alianza de largo plazo.</em></>,
    plans: [
      {
        k: "Implementación + SaaS",
        tag: "Setup único · 3 a 12 meses",
        price: "Proyecto",
        desc: "Implementación de la plataforma: automatizaciones, integraciones, pruebas, ajustes de go-live. Precio cerrado, alcance claro, KPIs acordados antes de empezar.",
        features: [
          "Reuniones de discovery del proceso — elección del ramo de seguros",
          "Definición del alcance del proyecto",
          "Seguimiento de las entregas",
          "Capacitación en la plataforma",
          "Reporte ejecutivo",
        ],
        cta: "Contáctanos para saber más",
        hi: false,
      },
      {
        k: "Plataforma SaaS",
        tag: "Operación continua · post go-live",
        price: "Mensual por uso",
        desc: "Operación en producción después del go-live. Modelo de cobro ajustado a cada cliente.",
        features: [
          "Módulos activos en producción",
          "Modelo de cobro mensual",
          "Soporte dedicado",
          "Capacitaciones",
          "Reuniones de seguimiento",
        ],
        cta: "Contáctanos para saber más",
        hi: true,
      },
    ],
    closeEyebrow: "· Próximo paso",
    closeTitle: <>Tu equipo tiene el<br/><em>conocimiento.</em><br/>WIR Innovation da la<br/><em>Plataforma de IA<br/>para ESCALAR.</em></>,
    closeP: "Implementación de la plataforma: automatizaciones, integraciones, pruebas, ajustes de go-live. Precio cerrado, alcance claro, KPIs acordados antes de empezar.",
    closeCta: "Contáctanos para saber más",
  },
}[LANG];

// Workflow Inteligente de Subscrição (SS + UI) — institutional flow
function SolWorkflow() {
  const stages = T.stages;
  return (
    <section className="solflow" data-reveal>
      <div className="wrap">
        <div className="solflow__head">
          <div className="eyebrow">{T.flowEyebrow}</div>
          <h2 className="display solflow__title">
            {T.flowTitle}
          </h2>
          <p className="solflow__sub">{T.flowSub}</p>
        </div>
        <div className="solflow__grid">
          {stages.map((s,i) => (
            <div key={i} className="solflow__stage" style={{"--c": s.c}}>
              <div className="solflow__stage-head">
                <span className="solflow__stage-k">{s.k}</span>
                {s.tag && <span className="solflow__stage-tag">{s.tag}</span>}
              </div>
              <div className="solflow__stage-t">{s.t}</div>
              <div className="solflow__stage-d">{s.d}</div>
              <div className="solflow__stage-arrow" aria-hidden>{i < stages.length - 1 ? "→" : "✓"}</div>
            </div>
          ))}
        </div>
        <div className="solflow__legend">
          <span className="solflow__legend-dot" style={{background:"#10B981"}}/>
          {T.flowLegend}
        </div>
      </div>
    </section>
  );
}

function SolPricing({ go }) {
  const plans = T.plans;
  return (
    <section className="solprice" data-reveal>
      <div className="wrap">
        <div className="solprice__head">
          <div className="eyebrow">{T.priceEyebrow}</div>
          <h2 className="display solprice__title">{T.priceTitle}</h2>
        </div>
        <div className="solprice__grid solprice__grid--2">
          {plans.map((p) => (
            <div key={p.k} className={"solprice__plan" + (p.hi ? " is-hi" : "")}>
              <div className="solprice__plan-tag">{p.tag}</div>
              <div className="solprice__plan-k display">{p.k}</div>
              <div className="solprice__plan-price display">{p.price}</div>
              <p className="solprice__plan-desc">{p.desc}</p>
              <ul>
                {p.features.map((f, j) => (
                  <li key={j}><span className="solprice__plan-bu"/>{f}</li>
                ))}
              </ul>
              <button className={"btn " + (p.hi ? "btn--solid" : "btn--ghost")}
                onClick={() => go("contact")}>
                {p.cta} <span className="btn__arrow">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SolClosing({ go }) {
  return (
    <section className="solclose" data-reveal>
      <div className="wrap">
        <div className="solclose__grid">
          <div>
            <div className="eyebrow eyebrow--onDark">{T.closeEyebrow}</div>
            <h2 className="display solclose__title">
              {T.closeTitle}
            </h2>
          </div>
          <div className="solclose__r">
            <p>{T.closeP}</p>
            <div className="solclose__actions">
              <button className="btn btn--solid btn--onDark" onClick={() => go("contact")}>
                {T.closeCta} <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SolHero() {
  return (
    <section className="solhero-page" data-reveal>
      <div className="wrap solhero-page__wrap">
        <div className="eyebrow">{T.solHeroEyebrow}</div>
        <h1 className="display solhero-page__title">{T.solHeroTitle}</h1>
        <p className="solhero-page__lede">{T.solHeroLede}</p>
      </div>
    </section>
  );
}

export function SolutionsPage({ go }) {
  useReveal();
  return (
    <>
      <SolHero/>
      <ProductTabs go={go}/>
      <SolWorkflow/>
      <Shift/>
      <SolPricing go={go}/>
      <SolClosing go={go}/>
    </>
  );
}
