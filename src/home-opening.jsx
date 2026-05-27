import React, { useState, useEffect, useRef, useMemo } from 'react';

/* ───────── Movement 01 · Opening + 02 · Proof ───────── */

// DecisionFlow — network pipeline visualization showing how data becomes decisions
function DecisionFlow() {
  const [pulse, setPulse] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setPulse(p => (p + 1) % 5), 2400);
    return () => clearInterval(id);
  }, []);

  const stages = [
    { k: "COLETA"     },
    { k: "ENRIQ."     },
    { k: "SCORE"      },
    { k: "DECISÃO"    },
    { k: "SUBSCRIÇÃO" },
  ];

  return (
    <div className="dflow" aria-label="Fluxo de decisão">
      <div className="dflow__head">
        <div className="dflow__title">
          <span className="dflow__title-k">Fluxo de decisão</span>
          <span className="dflow__title-v">wir.produtos</span>
        </div>
        <div className="dflow__status">
          <span className="dflow__dot"/>
          ao vivo
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
        {[{y:80,l:"e-mail"},{y:170,l:"anexos"},{y:260,l:"API"}].map((s,i) => (
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

        {[{y:80,l:"cotação",c:"#F8AD39"},{y:260,l:"trilha",c:"#7540AC"}].map((o,i) => (
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
          · ciclo de aprendizado contínuo · machine learning ·
        </text>
      </svg>

      <div className="dflow__foot">
        <span>Dados</span>
        <span className="dflow__arrow">→</span>
        <span>Produtos WIR</span>
        <span className="dflow__arrow">→</span>
        <span>Decisão auditável</span>
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
            <span>ABR 2026</span>
            <span>INTELIGÊNCIA ARTIFICIAL · SEGUROS</span>
          </div>
          <div className="opening__mast-R">
            <span>SÃO PAULO ⟶ SILICON VALLEY</span>
          </div>
        </div>

        {/* Hero grid */}
        <div className="opening__hero">
          <div className="opening__hero-L">
            <div className="opening__kicker">
              <span className="opening__kicker-dot"/>
              <span>Plataforma em produção · decisão 24/7</span>
            </div>
            <h1 className="display opening__title opening__title--long">
              A nova era do seguro é<br/>
              <em>inteligência de dados</em>,<br/>
              velocidade e escala.
            </h1>
            <p className="opening__lede">
              A WIR entrega uma camada de IA com analytics e dashboards real time, sem substituir os sistemas atuais.
            </p>
            <div className="opening__actions">
              <button className="btn btn--solid" onClick={()=>go("contact")}>
                Falar com a equipe <span className="btn__arrow">→</span>
              </button>
              <button className="btn btn--ghost" onClick={()=>go("solutions")}>
                Ver a plataforma <span className="btn__arrow">→</span>
              </button>
            </div>
          </div>
          <div className="opening__hero-R">
            <div className="opening__caption">· Como a WIR transforma dados em decisões</div>
            <DecisionFlow/>
          </div>
        </div>

      </div>
    </section>
  );
}

export function Proof() {
  const indicators = [
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
  ];
  return (
    <section className="proof" data-reveal>
      <div className="wrap">
        <div className="proof__head">
          <div className="eyebrow">· Análise de possibilidades de retorno sobre o investimento</div>
          <h2 className="proof__title display">6 indicadores estratégicos de resultado</h2>
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

