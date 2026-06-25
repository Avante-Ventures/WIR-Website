import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';
import { LANG } from './i18n.js';

/* ───────── Movement 05 · Workflow + 06 · Trust + 07 · Closing ───────── */

const T = {
  pt: {
    archEyebrow: "· Arquitetura WIR",
    archTitle: <>Automatizamos toda a jornada<br/>com uma camada de <em>Inteligência Artificial.</em></>,
    archLede: <>Cinco agentes em cadeia · um fluxo único · <em>continuous learning</em> realimentando o modelo a cada decisão auditada.</>,
    archInput:  { k: "INPUT",  v: "Submissão de risco",   sub: "e-mail · portal · API · OCR" },
    archOutput: { k: "OUTPUT", v: "Decisão auditável",    sub: "cotação · bind · refer" },
    archMemory: "MEMORY",
    archAudit:  { name: "Audit Agent", fn: "Trilha LGPD · feedback ao modelo" },
    archAgents: [
      { name: "Intake",   fn: "Lê submissão",       toolUp: "OCR · NER",       toolDown: "Email parser" },
      { name: "Enrich",   fn: "Adiciona contexto",  toolUp: "Broker DB",       toolDown: "CNAE · CNPJ" },
      { name: "Risk",     fn: "Score risco × preço", toolUp: "LLM · WIR",      toolDown: "ML model" },
      { name: "Decision", fn: "Bind · refer · recusa", toolUp: "Policy engine", toolDown: "Sandbox" },
    ],
    archAuditLabel: "↻ AUDIT LOG · CONTINUOUS LEARNING",
    archLegend: <><b>Pipeline ao vivo</b> · 4 agentes + audit · loop contínuo</>,
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
    closeTalk: "Iniciar agora",
    closeExplore: "Explorar soluções",
  },
  en: {
    archEyebrow: "· WIR Architecture",
    archTitle: <>We automate the entire journey<br/>with a layer of <em>Artificial Intelligence.</em></>,
    archLede: <>Five agents in a chain · one unified flow · <em>continuous learning</em> feeding every audited decision back into the model.</>,
    archInput:  { k: "INPUT",  v: "Risk submission",      sub: "email · portal · API · OCR" },
    archOutput: { k: "OUTPUT", v: "Auditable decision",   sub: "quote · bind · refer" },
    archMemory: "MEMORY",
    archAudit:  { name: "Audit Agent", fn: "LGPD trail · model feedback" },
    archAgents: [
      { name: "Intake",   fn: "Reads submission",   toolUp: "OCR · NER",       toolDown: "Email parser" },
      { name: "Enrich",   fn: "Adds context",       toolUp: "Broker DB",       toolDown: "CNAE · CNPJ" },
      { name: "Risk",     fn: "Risk × price score", toolUp: "LLM · WIR",       toolDown: "ML model" },
      { name: "Decision", fn: "Bind · refer · decline", toolUp: "Policy engine", toolDown: "Sandbox" },
    ],
    archAuditLabel: "↻ AUDIT LOG · CONTINUOUS LEARNING",
    archLegend: <><b>Live pipeline</b> · 4 agents + audit · continuous loop</>,
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
    closeTalk: "Start now",
    closeExplore: "Explore solutions",
  },
  es: {
    archEyebrow: "· Arquitectura WIR",
    archTitle: <>Automatizamos todo el recorrido<br/>con una capa de <em>Inteligencia Artificial.</em></>,
    archLede: <>Cinco agentes en cadena · un flujo único · <em>continuous learning</em> realimenta el modelo con cada decisión auditada.</>,
    archInput:  { k: "INPUT",  v: "Submission de riesgo", sub: "correo · portal · API · OCR" },
    archOutput: { k: "OUTPUT", v: "Decisión auditable",   sub: "cotización · bind · refer" },
    archMemory: "MEMORY",
    archAudit:  { name: "Audit Agent", fn: "Traza LGPD · feedback al modelo" },
    archAgents: [
      { name: "Intake",   fn: "Lee submission",     toolUp: "OCR · NER",       toolDown: "Email parser" },
      { name: "Enrich",   fn: "Agrega contexto",    toolUp: "Broker DB",       toolDown: "CNAE · CNPJ" },
      { name: "Risk",     fn: "Score riesgo × precio", toolUp: "LLM · WIR",   toolDown: "ML model" },
      { name: "Decision", fn: "Bind · refer · declinar", toolUp: "Policy engine", toolDown: "Sandbox" },
    ],
    archAuditLabel: "↻ AUDIT LOG · CONTINUOUS LEARNING",
    archLegend: <><b>Pipeline en vivo</b> · 4 agentes + audit · loop continuo</>,
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
    closeTalk: "Empezar ahora",
    closeExplore: "Explorar soluciones",
  },
}[LANG];

// ArchFlow — schematic architecture (Stripe-style). 5 zones × 3 subnodes stacked,
// single horizontal main flow through zone centers, straight continuous-learning return below.
// Palette: amber LEFT → blue RIGHT (matches logo direction).
export function ArchFlow() {
  // Agent orchestration graph — INPUT → 4 hexagonal agents (each with tools above & below)
  // → OUTPUT. Memory hub at top feeds context; Audit Agent at bottom receives feedback
  // from every agent (continuous learning loop). Arrowheads explicit on every connection.
  const PALETTE = ["#F8AD39", "#FE8B77", "#AE46C0", "#7540AC"];
  const agents = T.archAgents;

  // ── Layout (viewBox 1280 × 580) ─────────────────────────────────────────
  const VB_W = 1280, VB_H = 580;
  const HUB_W = 160, HUB_H = 88;
  const HUB_L_X = 20, HUB_R_X = VB_W - 20 - HUB_W;
  const MAIN_Y = 290;
  const AGENT_R = 44;
  const TOOL_W = 110, TOOL_H = 32;
  const TOOL_UP_Y = 140, TOOL_DOWN_Y = 410;
  // 4 agents evenly spread between hubs
  const START = HUB_L_X + HUB_W + 70;
  const END   = HUB_R_X - 70;
  const GAP   = (END - START) / 3;
  const agentX = (i) => START + i * GAP;
  // Memory hub (top center)
  const MEM_CX = VB_W / 2, MEM_CY = 50, MEM_R = 30;
  // Audit hub (bottom center)
  const AUDIT_CX = VB_W / 2, AUDIT_CY = 510, AUDIT_R = 40;

  // Hex path centered at (cx,cy) with radius r — flat-top
  const hex = (cx, cy, r) => {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = (Math.PI / 3) * i - Math.PI / 2;
      pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    }
    return `M${pts[0]} L${pts.slice(1).join(" L")} Z`;
  };

  return (
    <section className="archflow bg-editorial bg-editorial--cr" data-reveal>
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
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="archflow__svg" preserveAspectRatio="xMidYMid meet" aria-label="WIR agent orchestration graph">
            <defs>
              <linearGradient id="agentFlow" x1="0" x2="1">
                <stop offset="0%"   stopColor="#F8AD39"/>
                <stop offset="33%"  stopColor="#FE8B77"/>
                <stop offset="66%"  stopColor="#AE46C0"/>
                <stop offset="100%" stopColor="#3222E9"/>
              </linearGradient>
              <filter id="agentShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.16"/>
              </filter>
              {/* Arrowhead markers — inherit stroke color via context-stroke */}
              <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5"
                markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,1 L9,5 L0,9 Z" fill="context-stroke"/>
              </marker>
              <marker id="arrSmall" viewBox="0 0 10 10" refX="8" refY="5"
                markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                <path d="M0,2 L8,5 L0,8 Z" fill="context-stroke"/>
              </marker>
              {/* Main forward path: INPUT → agents → OUTPUT */}
              <path id="agentPipe" d={`M ${HUB_L_X + HUB_W} ${MAIN_Y} L ${HUB_R_X} ${MAIN_Y}`}/>
              {/* Audit return curve: AUDIT_CX, AUDIT_CY → memory (curves left then up) */}
              <path id="auditReturn"
                d={`M ${AUDIT_CX - AUDIT_R - 10} ${AUDIT_CY} C 200 ${AUDIT_CY}, 80 300, ${HUB_L_X + HUB_W/2} ${MAIN_Y + HUB_H/2 + 10}`}/>
            </defs>

            {/* ════ FORWARD CONNECTIONS ════ */}
            {/* INPUT → first agent */}
            <line x1={HUB_L_X + HUB_W} y1={MAIN_Y} x2={agentX(0) - AGENT_R} y2={MAIN_Y}
              stroke="url(#agentFlow)" strokeWidth="2" markerEnd="url(#arr)"/>
            {/* Between agents */}
            {agents.slice(0, -1).map((_, i) => (
              <line key={i}
                x1={agentX(i) + AGENT_R} y1={MAIN_Y}
                x2={agentX(i+1) - AGENT_R} y2={MAIN_Y}
                stroke="url(#agentFlow)" strokeWidth="2" markerEnd="url(#arr)"/>
            ))}
            {/* Last agent → OUTPUT */}
            <line x1={agentX(3) + AGENT_R} y1={MAIN_Y} x2={HUB_R_X} y2={MAIN_Y}
              stroke="url(#agentFlow)" strokeWidth="2" markerEnd="url(#arr)"/>

            {/* ════ INPUT hub — 3-line: label / what / how ════ */}
            <rect x={HUB_L_X} y={MAIN_Y - HUB_H/2} width={HUB_W} height={HUB_H} rx="12"
              fill="#FAF6EE" stroke="#0B0A08" strokeOpacity="0.22" strokeWidth="1.3"
              filter="url(#agentShadow)"/>
            {/* Top accent bar */}
            <rect x={HUB_L_X} y={MAIN_Y - HUB_H/2} width={HUB_W} height="3" rx="3"
              fill="#0B0A08" opacity="0.7"/>
            {/* Line 1 — mono uppercase label */}
            <text x={HUB_L_X + HUB_W/2} y={MAIN_Y - HUB_H/2 + 20} fill="#524C42" fontSize="9"
              fontFamily="JetBrains Mono, monospace" textAnchor="middle"
              letterSpacing="2.4" fontWeight="700">{T.archInput.k}</text>
            {/* Line 2 — sans bold "what" */}
            <text x={HUB_L_X + HUB_W/2} y={MAIN_Y + 4} fill="#0B0A08" fontSize="13"
              fontFamily="Space Grotesk, Inter Tight, sans-serif" textAnchor="middle"
              fontWeight="600" letterSpacing="-0.005em">{T.archInput.v}</text>
            {/* Line 3 — mono small "how" (channels) */}
            <text x={HUB_L_X + HUB_W/2} y={MAIN_Y + HUB_H/2 - 12} fill="#6E695C" fontSize="9"
              fontFamily="JetBrains Mono, monospace" textAnchor="middle"
              letterSpacing="0.3" fontWeight="500">{T.archInput.sub}</text>

            {/* ════ OUTPUT hub — 3-line: label / what / how ════ */}
            <rect x={HUB_R_X} y={MAIN_Y - HUB_H/2} width={HUB_W} height={HUB_H} rx="12"
              fill="#FAF6EE" stroke="#3222E9" strokeOpacity="0.55" strokeWidth="1.3"
              filter="url(#agentShadow)"/>
            {/* Top accent bar in brand blue */}
            <rect x={HUB_R_X} y={MAIN_Y - HUB_H/2} width={HUB_W} height="3" rx="3"
              fill="#3222E9" opacity="0.9"/>
            <text x={HUB_R_X + HUB_W/2} y={MAIN_Y - HUB_H/2 + 20} fill="#3222E9" fontSize="9"
              fontFamily="JetBrains Mono, monospace" textAnchor="middle"
              letterSpacing="2.4" fontWeight="700">{T.archOutput.k}</text>
            <text x={HUB_R_X + HUB_W/2} y={MAIN_Y + 4} fill="#0B0A08" fontSize="13"
              fontFamily="Space Grotesk, Inter Tight, sans-serif" textAnchor="middle"
              fontWeight="600" letterSpacing="-0.005em">{T.archOutput.v}</text>
            <text x={HUB_R_X + HUB_W/2} y={MAIN_Y + HUB_H/2 - 12} fill="#6E695C" fontSize="9"
              fontFamily="JetBrains Mono, monospace" textAnchor="middle"
              letterSpacing="0.3" fontWeight="500">{T.archOutput.sub}</text>

            {/* ════ MEMORY hub (top center, smaller, neutral) ════ */}
            <circle cx={MEM_CX} cy={MEM_CY} r={MEM_R} fill="#FAF6EE" stroke="#7540AC"
              strokeWidth="1.5" strokeOpacity="0.55" filter="url(#agentShadow)"/>
            <text x={MEM_CX} y={MEM_CY + 4} fill="#7540AC" fontSize="10"
              fontFamily="JetBrains Mono, monospace" textAnchor="middle"
              letterSpacing="1.8" fontWeight="700">{T.archMemory}</text>
            {/* Memory → each agent (curved purple lines down) */}
            {agents.map((_, i) => (
              <path key={`mem${i}`}
                d={`M ${MEM_CX} ${MEM_CY + MEM_R}
                    C ${MEM_CX} ${MEM_CY + 90},
                      ${agentX(i)} ${TOOL_UP_Y - 40},
                      ${agentX(i)} ${TOOL_UP_Y - 8}`}
                stroke="#7540AC" strokeWidth="1" strokeOpacity="0.25" fill="none"
                strokeDasharray="3 5"/>
            ))}

            {/* ════ AGENTS + their tools ════ */}
            {agents.map((a, i) => {
              const cx = agentX(i);
              const color = PALETTE[i];
              const upX = cx - TOOL_W/2, upY = TOOL_UP_Y - TOOL_H/2;
              const downX = cx - TOOL_W/2, downY = TOOL_DOWN_Y - TOOL_H/2;
              return (
                <g key={a.name}>
                  {/* Tool UP rect */}
                  <rect x={upX} y={upY} width={TOOL_W} height={TOOL_H} rx="6"
                    fill="#FAF6EE" stroke={color} strokeOpacity="0.35" strokeWidth="1"/>
                  <text x={cx} y={upY + TOOL_H/2 + 4} fill="#0B0A08" fontSize="10"
                    fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                    letterSpacing="0.3" fontWeight="500">{a.toolUp}</text>
                  {/* Tool UP → agent line (down arrow) */}
                  <line x1={cx} y1={upY + TOOL_H} x2={cx} y2={MAIN_Y - AGENT_R}
                    stroke={color} strokeWidth="1.2" strokeOpacity="0.55"
                    markerEnd="url(#arrSmall)"/>

                  {/* Tool DOWN rect */}
                  <rect x={downX} y={downY} width={TOOL_W} height={TOOL_H} rx="6"
                    fill="#FAF6EE" stroke={color} strokeOpacity="0.35" strokeWidth="1"/>
                  <text x={cx} y={downY + TOOL_H/2 + 4} fill="#0B0A08" fontSize="10"
                    fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                    letterSpacing="0.3" fontWeight="500">{a.toolDown}</text>
                  {/* Agent → tool DOWN line (down arrow) */}
                  <line x1={cx} y1={MAIN_Y + AGENT_R} x2={cx} y2={downY}
                    stroke={color} strokeWidth="1.2" strokeOpacity="0.55"
                    markerEnd="url(#arrSmall)"/>

                  {/* Agent hex — soft inner fill + brand stroke + drop shadow */}
                  <path d={hex(cx, MAIN_Y, AGENT_R)} fill={color} fillOpacity="0.08"/>
                  <path d={hex(cx, MAIN_Y, AGENT_R)} fill="#FAF6EE" stroke={color}
                    strokeWidth="2" strokeOpacity="0.9" filter="url(#agentShadow)"/>
                  {/* Agent code A01-A04 */}
                  <text x={cx} y={MAIN_Y - 10} fill={color} fontSize="9"
                    fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                    letterSpacing="2" fontWeight="700">A0{i+1}</text>
                  {/* Agent icon glyph */}
                  <text x={cx} y={MAIN_Y + 6} fill={color} fontSize="18"
                    textAnchor="middle" style={{userSelect:"none"}}>⬢</text>
                  {/* Agent name */}
                  <text x={cx} y={MAIN_Y + 20} fill="#0B0A08" fontSize="11"
                    fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                    fontWeight="700" letterSpacing="0.4">{a.name}</text>

                  {/* Feedback connector from agent → Audit Agent (curved coral dashed with arrow) */}
                  <path
                    d={`M ${cx} ${TOOL_DOWN_Y + TOOL_H/2 + 4}
                        C ${cx} ${AUDIT_CY - 60},
                          ${AUDIT_CX} ${AUDIT_CY - 30},
                          ${AUDIT_CX + (cx < AUDIT_CX ? -AUDIT_R : AUDIT_R) * 0.7} ${AUDIT_CY - AUDIT_R + 8}`}
                    stroke="#FE8B77" strokeWidth="1" strokeDasharray="3 5" opacity="0.35"
                    fill="none" markerEnd="url(#arrSmall)"/>

                  {/* Agent caption (function description, below the hex) */}
                  <text x={cx} y={MAIN_Y + AGENT_R + 18} fill="#524C42" fontSize="10"
                    fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                    letterSpacing="0.2">{a.fn}</text>
                </g>
              );
            })}

            {/* ════ AUDIT AGENT (bottom center, coral) ════ */}
            <g>
              <path d={hex(AUDIT_CX, AUDIT_CY, AUDIT_R)} fill="#FE8B77" fillOpacity="0.1"/>
              <path d={hex(AUDIT_CX, AUDIT_CY, AUDIT_R)} fill="#FAF6EE" stroke="#FE8B77"
                strokeWidth="2" strokeOpacity="0.9" filter="url(#agentShadow)"/>
              <text x={AUDIT_CX} y={AUDIT_CY - 8} fill="#FE8B77" fontSize="9"
                fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                letterSpacing="2" fontWeight="700">A05</text>
              <text x={AUDIT_CX} y={AUDIT_CY + 10} fill="#FE8B77" fontSize="18"
                textAnchor="middle">⬢</text>
              <text x={AUDIT_CX} y={AUDIT_CY + AUDIT_R + 18} fill="#0B0A08" fontSize="11"
                fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                fontWeight="700" letterSpacing="0.4">{T.archAudit.name}</text>
              <text x={AUDIT_CX} y={AUDIT_CY + AUDIT_R + 34} fill="#524C42" fontSize="10"
                fontFamily="JetBrains Mono, monospace" textAnchor="middle"
                letterSpacing="0.2">{T.archAudit.fn}</text>
            </g>

            {/* ════ AUDIT return loop → curve up-left back to memory/input area ════ */}
            <use href="#auditReturn" stroke="#FE8B77" strokeWidth="1.2"
              strokeDasharray="4 6" opacity="0.4" fill="none" markerEnd="url(#arr)"/>
            <text fill="#6E695C" fontSize="9"
              fontFamily="JetBrains Mono, monospace" letterSpacing="2.2" fontWeight="500">
              <textPath href="#auditReturn" startOffset="40%" textAnchor="middle">
                {T.archAuditLabel}
              </textPath>
            </text>

            {/* ════ Animated data packets travelling forward through the pipeline ════ */}
            <circle r="5" fill="#F8AD39" stroke="#FAF6EE" strokeWidth="1.5" filter="url(#agentShadow)">
              <animateMotion dur="14s" repeatCount="indefinite" begin="0s">
                <mpath href="#agentPipe"/>
              </animateMotion>
            </circle>
            <circle r="5" fill="#AE46C0" stroke="#FAF6EE" strokeWidth="1.5" filter="url(#agentShadow)">
              <animateMotion dur="14s" repeatCount="indefinite" begin="-4.7s">
                <mpath href="#agentPipe"/>
              </animateMotion>
            </circle>
            <circle r="5" fill="#3222E9" stroke="#FAF6EE" strokeWidth="1.5" filter="url(#agentShadow)">
              <animateMotion dur="14s" repeatCount="indefinite" begin="-9.3s">
                <mpath href="#agentPipe"/>
              </animateMotion>
            </circle>
            {/* Return packet travelling the audit feedback curve */}
            <circle r="4" fill="#FE8B77" stroke="#FAF6EE" strokeWidth="1.2" opacity="0.85">
              <animateMotion dur="20s" repeatCount="indefinite" begin="-8s">
                <mpath href="#auditReturn"/>
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
              {T.closeExplore}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
