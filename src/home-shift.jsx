import React, { useState, useEffect, useRef, useMemo } from 'react';

/* ───────── Movement 03 · The Shift + 04 · The Stack ───────── */

export function Shift() {
  // Dores vs Soluções — slide institucional, mapeado a SS/UI/em-dev
  const rows = [
    { dor:"E-mails de cotações desorganizados",       sol:"Estruturação e leitura automática de submissões",  prod:"SS",       status:"prod" },
    { dor:"Falta de priorização comercial",            sol:"Classificação por apetite e rentabilidade",         prod:"SS",       status:"prod" },
    { dor:"Underwriter fazendo operação manual",       sol:"Eliminação completa das tarefas manuais",           prod:"UI",       status:"prod" },
    { dor:"Pipeline invisível para gestão",            sol:"Dashboard estratégico em tempo real",               prod:"UI",       status:"prod" },
    { dor:"Riscos fora do apetite processados",        sol:"Recusa automática inteligente",                     prod:"SS / UI", status:"prod" },
    { dor:"TI sobrecarregada e sem orçamento",         sol:"Plataforma 100% externa — sem TI",                  prod:"SS / UI", status:"prod" },
  ];
  return (
    <section className="shift" data-reveal>
      <div className="wrap shift__head">
        <div className="eyebrow">· Dores vs. Soluções</div>
        <h2 className="shift__title display">
          O problema estrutural.<br/><em>A resposta da WIR.</em>
        </h2>
        <p className="shift__sub">Cada dor que observamos dentro das operações de subscrição mapeia diretamente para uma capacidade da plataforma — sem trocar o core, sem projeto pesado de TI.</p>
      </div>
      <div className="wrap">
        <div className="dvs">
          <div className="dvs__head">
            <div className="dvs__head-l">Antes · Problema estrutural</div>
            <div className="dvs__head-c"></div>
            <div className="dvs__head-r">Solução WIR</div>
            <div className="dvs__head-p">Produto</div>
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
          <span className="dvs__legend-txt">Novos produtos em desenvolvimento</span>
        </div>
      </div>
    </section>
  );
}

export function ProductTabs({ go }) {
  const prods = [
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
  ];
  const [active, setActive] = React.useState(0);
  const p = prods[active];
  return (
    <section className="stack" data-reveal>
      <div className="wrap">
        <div className="stack__head">
          <h2 className="stack__title display">Quatro produtos. <em>Soluções de IA unificada.</em></h2>
          <p className="stack__sub">Inteligência plug-and-play que se conecta aos sistemas existentes. Sem migração, apenas transformação imediata. Possibilitando escalar o seu negócio.</p>
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
                Explorar {p.k} <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

