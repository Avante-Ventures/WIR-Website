import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';

/* ───────── Soluções · catalog editorial ───────── */

// Workflow Inteligente de Subscrição (SS + UI) — institutional flow
function SolWorkflow() {
  const stages = [
    { k:"01", t:"Application Intake",      d:"Entrada multicanal e validação automática · API · Portal · Upload · validação em tempo real.", c:"#3B82F6" },
    { k:"02", t:"AI Document Extraction",  d:"Leitura inteligente de documentos · extração automática de campos com alta precisão.",        c:"#7540AC" },
    { k:"03", t:"Business Intelligence",   d:"Enriquecimento e contexto do corretor · score · histórico de conversão · priorização.",       c:"#A44F98" },
    { k:"04", t:"Risk Assessment",         d:"Motor de risco e fraude · score de risco · probabilidade · decisão automatizada.",             c:"#EE7D48", tag:"SS" },
    { k:"05", t:"Pricing Engine",          d:"Precificação dinâmica · ajuste de risco · cálculo automático de prêmio · output instantâneo.", c:"#F8AD39", tag:"UI" },
    { k:"06", t:"Decision & Prioritization", d:"Orquestração final e fila do underwriter · SLA visível · review ou bind.",                  c:"#10B981" },
  ];
  return (
    <section className="solflow" data-reveal>
      <div className="wrap">
        <div className="solflow__head">
          <div className="eyebrow">· Workflow Inteligente de Subscrição</div>
          <h2 className="display solflow__title">
            <em>SS + UI</em> em operação.<br/>
            Seis estágios. Um único core.
          </h2>
          <p className="solflow__sub">A camada de IA que opera entre o portal de cotações e o seu core de apólice — sem substituir nenhum dos dois.</p>
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
          Workflow ativo · SS + UI cobrem do intake à decisão · XBA e SNB em desenvolvimento
        </div>
      </div>
    </section>
  );
}

function SolPricing({ go }) {
  const plans = [
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
  ];
  return (
    <section className="solprice" data-reveal>
      <div className="wrap">
        <div className="solprice__head">
          <div className="eyebrow">· Pricing</div>
          <h2 className="display solprice__title">Duas fases.<br/><em>Uma parceria de longo prazo.</em></h2>
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
            <div className="eyebrow eyebrow--onDark">· Próximo passo</div>
            <h2 className="display solclose__title">
              Sua equipe tem o<br/>
              <em>conhecimento.</em><br/>
              A WIR Innovation dá a<br/>
              <em>Plataforma de IA<br/>para ESCALAR.</em>
            </h2>
          </div>
          <div className="solclose__r">
            <p>Implementação da plataforma: automações, integrações, testes, ajustes go-live. Preço fechado, escopo claro, KPIs acordados antes de começar.</p>
            <div className="solclose__actions">
              <button className="btn btn--solid btn--onDark" onClick={() => go("contact")}>
                Entre em contato para saber mais <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionsPage({ go }) {
  useReveal();
  return (
    <>
      <ProductTabs go={go}/>
      <SolWorkflow/>
      <Shift/>
      <SolPricing go={go}/>
      <SolClosing go={go}/>
    </>
  );
}

