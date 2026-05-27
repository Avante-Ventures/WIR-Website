import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';

/* ───────── Proteção de Dados · Segurança & Compliance ───────── */

// SecurityShield — visual SVG: concentric rings representing defense in depth
function SecurityShield() {
  return (
    <div className="dphero__shield">
      <svg viewBox="0 0 360 360" className="dphero__shield-svg" aria-hidden>
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7540AC"/>
            <stop offset="100%" stopColor="#F8AD39"/>
          </linearGradient>
          <radialGradient id="shieldFill" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="rgba(117,64,172,0.06)"/>
            <stop offset="100%" stopColor="rgba(117,64,172,0)"/>
          </radialGradient>
        </defs>

        {/* Background fill */}
        <circle cx="180" cy="180" r="170" fill="url(#shieldFill)"/>

        {/* Outer ring — Network layer */}
        <circle cx="180" cy="180" r="160" fill="none" stroke="#1C17FF" strokeWidth="1" strokeOpacity="0.35" strokeDasharray="2 6"/>
        <text x="180" y="34" textAnchor="middle" fill="#1C17FF" fontSize="9.5" fontWeight="700" letterSpacing=".18em" fontFamily="JetBrains Mono, monospace">
          · NETWORK · TLS 1.3 ·
        </text>

        {/* Application layer */}
        <circle cx="180" cy="180" r="125" fill="none" stroke="#7540AC" strokeWidth="1.2" strokeOpacity="0.4" strokeDasharray="3 5"/>
        <text x="180" y="68" textAnchor="middle" fill="#7540AC" fontSize="9" fontWeight="700" letterSpacing=".18em" fontFamily="JetBrains Mono, monospace">
          · APPLICATION · OAuth 2.0 ·
        </text>

        {/* Data layer */}
        <circle cx="180" cy="180" r="90" fill="none" stroke="#A44F98" strokeWidth="1.4" strokeOpacity="0.5" strokeDasharray="4 4"/>
        <text x="180" y="103" textAnchor="middle" fill="#A44F98" fontSize="9" fontWeight="700" letterSpacing=".18em" fontFamily="JetBrains Mono, monospace">
          · DATA · AES-256 ·
        </text>

        {/* Audit core */}
        <circle cx="180" cy="180" r="55" fill="rgba(238,125,72,0.06)" stroke="#EE7D48" strokeWidth="1.6" strokeOpacity="0.7"/>

        {/* Center shield icon */}
        <g transform="translate(180, 180)">
          <path d="M 0 -28 L -22 -16 L -22 8 C -22 22, -12 32, 0 38 C 12 32, 22 22, 22 8 L 22 -16 Z"
            fill="url(#shieldGrad)" fillOpacity="0.9" stroke="#FAF6EE" strokeWidth="1.5"/>
          <path d="M -10 0 L -3 8 L 12 -8" fill="none" stroke="#FAF6EE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        {/* Center label */}
        <text x="180" y="248" textAnchor="middle" fill="#EE7D48" fontSize="9.5" fontWeight="800" letterSpacing=".18em" fontFamily="JetBrains Mono, monospace">
          · AUDIT TRAIL · IMUTÁVEL ·
        </text>

        {/* Rotating tick marks (decoration) */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const x1 = 180 + Math.cos(deg * Math.PI / 180) * 158;
          const y1 = 180 + Math.sin(deg * Math.PI / 180) * 158;
          const x2 = 180 + Math.cos(deg * Math.PI / 180) * 168;
          const y2 = 180 + Math.sin(deg * Math.PI / 180) * 168;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#7540AC" strokeWidth="1.5" opacity=".5"/>;
        })}

        {/* Pulsing dot in audit core (live indicator) */}
        <circle cx="180" cy="296" r="4" fill="#10B981">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
        </circle>
        <text x="180" y="316" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="700" letterSpacing=".15em" fontFamily="JetBrains Mono, monospace">
          ao vivo · monitorado
        </text>
      </svg>
    </div>
  );
}

function DPHero({ go }) {
  return (
    <section className="dphero">
      <div className="wrap">
        <div className="dphero__mast">
          <div className="dphero__mast-L">
            <span>ABR 2026</span>
            <span>SEGURANÇA & COMPLIANCE</span>
          </div>
          <div className="dphero__mast-R">
            <span className="dphero__mast-pill"><span className="dphero__mast-dot"/> LGPD-ready · auditável</span>
          </div>
        </div>

        <div className="dphero__grid">
          <div className="dphero__L">
            <div className="opening__kicker">
              <span className="opening__kicker-dot"/>
              <span>Defesa em profundidade · 4 camadas</span>
            </div>
            <h1 className="display dphero__title">
              Segurança e<br/>
              <em>compliance</em><br/>
              como fundação.
            </h1>
            <p className="dphero__lede">
              A WIR Innovation foi desenhada desde a arquitetura para operar dentro dos requisitos regulatórios do mercado segurador. Cada decisão deixa trilha auditável; cada dado é encriptado em trânsito e em repouso; cada ambiente é segregado por cliente.
            </p>
            <div className="dphero__actions">
              <button className="btn btn--solid" onClick={() => go("contact")}>
                Falar com TI &amp; Compliance <span className="btn__arrow">→</span>
              </button>
              <a className="btn btn--ghost" href="mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20Innovation%20-%20Arquitetura%20de%20Seguran%C3%A7a">
                Solicitar whitepaper <span className="btn__arrow">→</span>
              </a>
            </div>
          </div>
          <div className="dphero__R">
            <div className="dphero__caption">· 4 camadas de defesa em profundidade</div>
            <SecurityShield/>
          </div>
        </div>
      </div>
    </section>
  );
}

function DPApproach() {
  const paragraphs = [
    { k: "Defesa em profundidade",
      text: "Não confiamos em uma única barreira. A plataforma opera em 4 camadas independentes — rede (TLS 1.3 + WAF), aplicação (OAuth 2.0 + rate limiting), dados (AES-256 + segregação por cliente) e auditoria (log imutável + decisão rastreável). Quebrar uma camada não compromete as outras." },
    { k: "Auditável por design",
      text: "Toda decisão da plataforma — score de risco, recomendação de pricing, recusa automática — carrega assinatura digital e trilha completa: modelo, versão, inputs, output, timestamp. Compliance não é um relatório que rodamos no fim do mês — é o sistema operando." },
    { k: "Soberania de dados",
      text: "Dados pessoais brasileiros ficam em território nacional (AWS São Paulo / GCP São Paulo). O cliente decide sobre criptografia, retenção e direito ao esquecimento. Sem cross-border data flows. Sem terceiros no caminho." },
    { k: "Pronto para evoluir",
      text: "LGPD em conformidade hoje. ISO 27001 com arquitetura pronta — gap analysis concluído, evolução contínua. Frameworks adicionais (HIPAA, padrões internacionais) alinhados conforme cliente. Não é um SaaS genérico que se adapta — é uma plataforma desenhada para o regulado desde a fundação." },
  ];
  return (
    <section className="dpessay" data-reveal>
      <div className="wrap">
        <div className="dpessay__grid">
          <div className="dpessay__side">
            <div className="eyebrow">· Princípios</div>
            <div className="dpessay__pullquote display">
              "Compliance não é um <em>relatório</em>. É a <em>arquitetura</em> operando."
            </div>
            <div className="dpessay__attr">
              <b>Engenharia WIR</b>
              <span>Time de Plataforma · 2026</span>
            </div>
          </div>
          <div className="dpessay__content">
            {paragraphs.map((p, i) => (
              <div key={i} className="dpessay__para">
                <div className="dpessay__para-k">· 0{i+1} — {p.k}</div>
                <p className="dpessay__para-t">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DPPillars() {
  const cards = [
    { icon: "lock",     k: "LGPD nativa",          color: "#1C17FF",
      d: "Conformidade com a Lei Geral de Proteção de Dados desde a arquitetura. Dados processados e armazenados em território nacional.",
      bullets: ["DPO contratado", "ROPA atualizado", "Direitos do titular implementados", "Notificação ANPD em ≤ 48h"] },
    { icon: "shield",   k: "Infraestrutura cloud",  color: "#7540AC",
      d: "AWS / GCP em São Paulo, com criptografia em trânsito (TLS 1.3) e em repouso (AES-256). Ambientes segregados por cliente.",
      bullets: ["VPC isolada por tenant", "WAF + DDoS protection", "Multi-AZ failover", "RTO ≤ 30 min"] },
    { icon: "key",      k: "API segura",            color: "#A44F98",
      d: "Autenticação via OAuth 2.0 / API Key. Rate limiting, logging completo e webhook com assinatura digital HMAC-SHA256.",
      bullets: ["mTLS opcional", "Rotação de keys 90 dias", "Replay protection", "Audit log retido 5 anos"] },
    { icon: "brain",    k: "Modelo auditável",      color: "#EE7D48",
      d: "Cada decisão de ML registrada com inputs, score, confiança, versão do modelo e timestamp. Trail de auditoria completo e exportável.",
      bullets: ["Model Registry versionado", "Drift detection contínuo", "Bias monitoring trimestral", "Explainability por decisão"] },
    { icon: "people",   k: "Acesso por princípio",  color: "#F8AD39",
      d: "Modelo least privilege com SSO corporativo. Acessos auditados, MFA obrigatório, just-in-time elevation para operações sensíveis.",
      bullets: ["RBAC granular", "MFA obrigatório", "Session recording", "Quarterly access review"] },
    { icon: "clock",    k: "Observabilidade",       color: "#10B981",
      d: "DataDog + Sentry + logs centralizados. Alertas de SLA e segurança em tempo real. Incident response com SLA documentado.",
      bullets: ["P1 ack ≤ 15 min", "Status page público", "Postmortem com RCA", "Annual pentest"] },
  ];

  const Icon = ({ name, color }) => {
    const props = { width:"24", height:"24", viewBox:"0 0 24 24", fill:"none", stroke:color, strokeWidth:"1.6", "aria-hidden":true };
    if (name === "lock")   return <svg {...props}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>;
    if (name === "shield") return <svg {...props}><path d="M12 2L4 5v7c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V5l-8-3z"/><path d="M9 12l2 2 4-4"/></svg>;
    if (name === "key")    return <svg {...props}><circle cx="8" cy="15" r="4"/><path d="M11 12l9-9M16 7l3 3M14 9l3 3"/></svg>;
    if (name === "brain")  return <svg {...props}><path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3v3a3 3 0 0 0 3 3v1a3 3 0 0 0 3 3M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3v1a3 3 0 0 1-3 3"/></svg>;
    if (name === "people") return <svg {...props}><circle cx="9" cy="8" r="3"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><circle cx="17" cy="8" r="2.5"/><path d="M21 21v-1.5a3 3 0 0 0-2-2.8"/></svg>;
    return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
  };

  return (
    <section className="dppillars" data-reveal>
      <div className="wrap">
        <div className="dppillars__head">
          <div className="eyebrow">· Os pilares</div>
          <h2 className="display dppillars__title">Seis pilares.<br/><em>Uma plataforma segura.</em></h2>
          <p className="dppillars__sub">Cada camada é projetada para operar de forma independente — quebrar uma não compromete as outras. Arquitetura defense-in-depth como padrão, não como upgrade.</p>
        </div>
        <div className="dppillars__grid">
          {cards.map((c, i) => (
            <div key={i} className="dppillars__card" style={{"--c": c.color}}>
              <div className="dppillars__icon"><Icon name={c.icon} color={c.color}/></div>
              <div className="dppillars__k">{c.k}</div>
              <p className="dppillars__d">{c.d}</p>
              <ul className="dppillars__bullets">
                {c.bullets.map((b, j) => <li key={j}><span className="dppillars__bu" style={{background:c.color}}/>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="dppillars__stack">
          <span className="dppillars__stack-k">· Stack técnico</span>
          <div className="dppillars__stack-row">
            <b>Docker + K8s</b>
            <span>·</span>
            <b>CI/CD GitHub Actions</b>
            <span>·</span>
            <b>DataDog observability</b>
            <span>·</span>
            <b>Auth0 identity</b>
            <span>·</span>
            <b>HashiCorp Vault</b>
            <span>·</span>
            <b>Sentry error tracking</b>
          </div>
        </div>
      </div>
    </section>
  );
}

function DPCompliance() {
  const items = [
    { k: "LGPD",    v: "Conforme",          d: "Proteção de dados pessoais (BR) — DPO, ROPA, direitos do titular implementados.", color: "#1C17FF", state: "ok" },
    { k: "ISO 27001", v: "Em processo",     d: "Sistema de Gestão de Segurança da Informação — gap analysis concluído Q1.",          color: "#A44F98", state: "wip" },
    { k: "HIPAA",   v: "Alinhado",          d: "Privacidade em saúde (US) — controles equivalentes aplicáveis ao ramo saúde.",       color: "#EE7D48", state: "ok" },
  ];
  return (
    <section className="dpcomp" data-reveal>
      <div className="wrap">
        <div className="dpcomp__head">
          <div className="eyebrow">· Certificações &amp; alinhamentos</div>
          <h2 className="display dpcomp__title">Construído para os <em>frameworks</em> que o mercado exige.</h2>
        </div>
        <div className="dpcomp__grid">
          {items.map((b, i) => (
            <div key={i} className="dpcomp__cell" style={{"--c": b.color}}>
              <div className="dpcomp__cell-top">
                <div className="dpcomp__k">{b.k}</div>
                <span className={"dpcomp__state dpcomp__state--" + b.state}>
                  {b.state === "ok" ? "✓" : "◐"}
                </span>
              </div>
              <div className="dpcomp__v display"><em>{b.v}</em></div>
              <div className="dpcomp__d">{b.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DPFAQ() {
  const qs = [
    { q: "Onde os dados pessoais brasileiros ficam armazenados?",
      a: "Em território nacional — AWS São Paulo (sa-east-1) ou GCP São Paulo (southamerica-east1), com criptografia AES-256 em repouso. Não há cross-border data flow. O cliente pode optar por private cloud ou on-premise no caso de requisitos regulatórios mais rígidos." },
    { q: "Como funciona a trilha de auditoria de cada decisão?",
      a: "Cada decisão (score, recomendação, recusa) é registrada com: modelo + versão usados, inputs completos, output, score de confiança, timestamp, identificador do usuário/sistema. O log é imutável (write-once) e exportável em formatos JSON / CSV / Parquet. Retenção padrão 5 anos, configurável." },
    { q: "Quem tem acesso aos dados do cliente dentro da WIR?",
      a: "Acesso por princípio least privilege — apenas operadores credenciados, com MFA, SSO corporativo e session recording. Operações sensíveis exigem just-in-time elevation com aprovação de segundo operador. Acessos auditados trimestralmente. Cliente recebe relatório de acessos sob demanda." },
    { q: "Como funciona a notificação de incidente?",
      a: "SLA P1: ack em ≤ 15 min, comunicação inicial ao cliente em ≤ 1h, postmortem com root cause analysis em ≤ 7 dias. Notificação ANPD/regulador em ≤ 48h conforme LGPD. Status page pública para downtime." },
    { q: "É possível auditar o modelo de ML diretamente?",
      a: "Sim. O Model Registry expõe versões, datasets de treino, métricas de drift e bias por trimestre. Cada decisão pode ser reproduzida pelo cliente com os mesmos inputs e versão. Explainability disponível para amostra ou conjunto. SHAP values + feature importance por decisão sob demanda." },
    { q: "O que acontece se a WIR for adquirida ou encerrar operação?",
      a: "Contrato inclui cláusula de continuidade: dados do cliente são retornados em formato estruturado em ≤ 30 dias, com cópia integral do código de modelos treinados sob seu apetite. Escrow opcional do código-fonte da plataforma para clientes Tier-1." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="dpfaq" data-reveal>
      <div className="wrap">
        <div className="dpfaq__head">
          <div className="eyebrow">· Perguntas frequentes</div>
          <h2 className="display dpfaq__title">O que <em>TI e Compliance</em> sempre perguntam.</h2>
        </div>
        <div className="dpfaq__list">
          {qs.map((x, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className={"dpfaq__item" + (isOpen ? " is-open" : "")}>
                <button className="dpfaq__q" onClick={() => setOpen(isOpen ? -1 : idx)}>
                  <span className="dpfaq__idx">· {String(idx + 1).padStart(2, "0")}</span>
                  <span className="dpfaq__qt">{x.q}</span>
                  <span className="dpfaq__chev" aria-hidden>{isOpen ? "−" : "+"}</span>
                </button>
                <div className="dpfaq__a" style={{ maxHeight: isOpen ? 500 : 0 }}>
                  <p>{x.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DPClose({ go }) {
  return (
    <section className="dpclose" data-reveal>
      <div className="wrap">
        <div className="dpclose__grid">
          <div>
            <div className="eyebrow eyebrow--onDark">· Próximo passo</div>
            <h2 className="display dpclose__title">
              Quer revisar a <em>arquitetura</em><br/>
              com seu time de TI &amp;<br/>
              <em>Compliance?</em>
            </h2>
          </div>
          <div className="dpclose__r">
            <p>Reunião técnica de 60–90 min com nossa engenharia de plataforma. Walk-through da arquitetura, controles, modelo de ameaças e roadmap de certificações. Whitepaper enviado antes da call.</p>
            <div className="dpclose__actions">
              <button className="btn btn--solid btn--onDark" onClick={() => go("contact")}>
                Falar com a equipe técnica <span className="btn__arrow">→</span>
              </button>
              <a className="btn btn--ghost btn--onDark" href="mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20-%20Arquitetura%20de%20Seguran%C3%A7a">
                Solicitar whitepaper <span className="btn__arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function DataProtectionPage({ go }) {
  useReveal();
  return (
    <>
      <DPHero go={go}/>
      <DPApproach/>
      <DPPillars/>
      <DPCompliance/>
      <DPFAQ/>
      <DPClose go={go}/>
    </>
  );
}

