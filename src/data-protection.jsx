import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';
import { LANG } from './i18n.js';

/* ───────── Proteção de Dados · Segurança & Compliance ───────── */

const T = {
  pt: {
    shieldNetwork: "NETWORK · TLS 1.3 · WAF",
    shieldApp:     "APPLICATION · OAuth 2.0 · MFA",
    shieldData:    "DATA · AES-256 · BYOK",
    shieldAuditR:  "AUDIT · LGPD · IMUTÁVEL",
    shieldLive: "ao vivo · monitorado",
    mastDate: "ABR 2026",
    mastTheme: "SEGURANÇA & COMPLIANCE",
    mastPill: "LGPD-ready · auditável",
    kicker: "Defesa em profundidade · 4 camadas",
    heroTitle: <>Segurança e<br/><em>compliance</em><br/>como fundação.</>,
    heroLede: "A WIR Innovation foi desenhada desde a arquitetura para operar dentro dos requisitos regulatórios do mercado segurador. Cada decisão deixa trilha auditável; cada dado é encriptado em trânsito e em repouso; cada ambiente é segregado por cliente.",
    heroCtaIt: <>Falar com TI &amp; Compliance</>,
    heroCtaWp: "Solicitar whitepaper",
    wpHref: "mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20Innovation%20-%20Arquitetura%20de%20Seguran%C3%A7a",
    heroCaption: "· 4 camadas de defesa em profundidade",
    apprEyebrow: "· Princípios",
    apprPullquote: <>"Compliance não é um <em>relatório</em>. É a <em>arquitetura</em> operando."</>,
    apprAttrB: "Engenharia WIR",
    apprAttrS: "Time de Plataforma · 2026",
    apprParas: [
      { k: "Defesa em profundidade",
        text: "Não confiamos em uma única barreira. A plataforma opera em 4 camadas independentes — rede (TLS 1.3 + WAF), aplicação (OAuth 2.0 + rate limiting), dados (AES-256 + segregação por cliente) e auditoria (log imutável + decisão rastreável). Quebrar uma camada não compromete as outras." },
      { k: "Auditável por design",
        text: "Toda decisão da plataforma — score de risco, recomendação de pricing, recusa automática — carrega assinatura digital e trilha completa: modelo, versão, inputs, output, timestamp. Compliance não é um relatório que rodamos no fim do mês — é o sistema operando." },
      { k: "Soberania de dados",
        text: "Dados pessoais brasileiros ficam em território nacional (AWS São Paulo / GCP São Paulo). O cliente decide sobre criptografia, retenção e direito ao esquecimento. Sem cross-border data flows. Sem terceiros no caminho." },
      { k: "Pronto para evoluir",
        text: "LGPD em conformidade hoje. ISO 27001 com arquitetura pronta — gap analysis concluído, evolução contínua. Frameworks adicionais (HIPAA, padrões internacionais) alinhados conforme cliente. Não é um SaaS genérico que se adapta — é uma plataforma desenhada para o regulado desde a fundação." },
    ],
    pillEyebrow: "· Os pilares",
    pillTitle: <>Seis pilares.<br/><em>Uma plataforma segura.</em></>,
    pillSub: "Cada camada é projetada para operar de forma independente — quebrar uma não compromete as outras. Arquitetura defense-in-depth como padrão, não como upgrade.",
    cards: [
      { icon: "lock",     k: "LGPD nativa",          color: "#3222E9",
        d: "Conformidade com a Lei Geral de Proteção de Dados desde a arquitetura. Dados processados e armazenados em território nacional.",
        bullets: ["DPO contratado", "ROPA atualizado", "Direitos do titular implementados", "Notificação ANPD em ≤ 48h"] },
      { icon: "shield",   k: "Infraestrutura cloud",  color: "#7540AC",
        d: "AWS / GCP em São Paulo, com criptografia em trânsito (TLS 1.3) e em repouso (AES-256). Ambientes segregados por cliente.",
        bullets: ["VPC isolada por tenant", "WAF + DDoS protection", "Multi-AZ failover", "RTO ≤ 30 min"] },
      { icon: "key",      k: "API segura",            color: "#AE46C0",
        d: "Autenticação via OAuth 2.0 / API Key. Rate limiting, logging completo e webhook com assinatura digital HMAC-SHA256.",
        bullets: ["mTLS opcional", "Rotação de keys 90 dias", "Replay protection", "Audit log retido 5 anos"] },
      { icon: "brain",    k: "Modelo auditável",      color: "#FE8B77",
        d: "Cada decisão de ML registrada com inputs, score, confiança, versão do modelo e timestamp. Trail de auditoria completo e exportável.",
        bullets: ["Model Registry versionado", "Drift detection contínuo", "Bias monitoring trimestral", "Explainability por decisão"] },
      { icon: "people",   k: "Acesso por princípio",  color: "#F8AD39",
        d: "Modelo least privilege com SSO corporativo. Acessos auditados, MFA obrigatório, just-in-time elevation para operações sensíveis.",
        bullets: ["RBAC granular", "MFA obrigatório", "Session recording", "Quarterly access review"] },
      { icon: "clock",    k: "Observabilidade",       color: "#10B981",
        d: "DataDog + Sentry + logs centralizados. Alertas de SLA e segurança em tempo real. Incident response com SLA documentado.",
        bullets: ["P1 ack ≤ 15 min", "Status page público", "Postmortem com RCA", "Annual pentest"] },
    ],
    stackK: "· Stack técnico",
    compEyebrow: <>· Certificações &amp; alinhamentos</>,
    compTitle: <>Construído para os <em>frameworks</em> que o mercado exige.</>,
    compItems: [
      { k: "LGPD",      v: "Conforme",     d: "Proteção de dados pessoais (BR) — DPO, ROPA, direitos do titular implementados.", color: "#3222E9", state: "ok" },
      { k: "ISO 27001", v: "Em processo",  d: "Sistema de Gestão de Segurança da Informação — gap analysis concluído Q1.",          color: "#AE46C0", state: "wip" },
      { k: "HIPAA",     v: "Alinhado",     d: "Privacidade em saúde (US) — controles equivalentes aplicáveis ao ramo saúde.",       color: "#FE8B77", state: "ok" },
    ],
    faqEyebrow: "· Perguntas frequentes",
    faqTitle: <>O que <em>TI e Compliance</em> sempre perguntam.</>,
    faqs: [
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
    ],
    closeEyebrow: "· Próximo passo",
    closeTitle: <>Quer revisar a <em>arquitetura</em><br/>com seu time de TI &amp;<br/><em>Compliance?</em></>,
    closeP: "Reunião técnica de 60–90 min com nossa engenharia de plataforma. Walk-through da arquitetura, controles, modelo de ameaças e roadmap de certificações. Whitepaper enviado antes da call.",
    closeCtaTeam: "Falar com a equipe técnica",
    closeCtaWp: "Solicitar whitepaper",
    closeWpHref: "mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20-%20Arquitetura%20de%20Seguran%C3%A7a",
  },
  en: {
    shieldNetwork: "NETWORK · TLS 1.3 · WAF",
    shieldApp:     "APPLICATION · OAuth 2.0 · MFA",
    shieldData:    "DATA · AES-256 · BYOK",
    shieldAuditR:  "AUDIT · LGPD · IMMUTABLE",
    shieldLive: "live · monitored",
    mastDate: "APR 2026",
    mastTheme: "SECURITY & COMPLIANCE",
    mastPill: "LGPD-ready · auditable",
    kicker: "Defense in depth · 4 layers",
    heroTitle: <>Security and<br/><em>compliance</em><br/>as the foundation.</>,
    heroLede: "WIR Innovation was designed from the architecture up to operate within the regulatory requirements of the insurance market. Every decision leaves an auditable trail; every piece of data is encrypted in transit and at rest; every environment is segregated per client.",
    heroCtaIt: <>Talk to IT &amp; Compliance</>,
    heroCtaWp: "Request whitepaper",
    wpHref: "mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20Innovation%20-%20Security%20Architecture",
    heroCaption: "· 4 layers of defense in depth",
    apprEyebrow: "· Principles",
    apprPullquote: <>"Compliance isn't a <em>report</em>. It's the <em>architecture</em> operating."</>,
    apprAttrB: "WIR Engineering",
    apprAttrS: "Platform Team · 2026",
    apprParas: [
      { k: "Defense in depth",
        text: "We don't rely on a single barrier. The platform operates across 4 independent layers — network (TLS 1.3 + WAF), application (OAuth 2.0 + rate limiting), data (AES-256 + per-client segregation) and audit (immutable log + traceable decisions). Breaking one layer doesn't compromise the others." },
      { k: "Auditable by design",
        text: "Every platform decision — risk score, pricing recommendation, automatic declination — carries a digital signature and a complete trail: model, version, inputs, output, timestamp. Compliance isn't a report we run at the end of the month — it's the system operating." },
      { k: "Data sovereignty",
        text: "Brazilian personal data stays on national territory (AWS São Paulo / GCP São Paulo). The client decides on encryption, retention and the right to be forgotten. No cross-border data flows. No third parties in the path." },
      { k: "Ready to evolve",
        text: "LGPD-compliant today. ISO 27001 architecture-ready — gap analysis complete, continuous evolution. Additional frameworks (HIPAA, international standards) aligned per client. This isn't a generic SaaS adapting — it's a platform designed for regulated industries from the foundation." },
    ],
    pillEyebrow: "· The pillars",
    pillTitle: <>Six pillars.<br/><em>One secure platform.</em></>,
    pillSub: "Each layer is designed to operate independently — breaking one doesn't compromise the others. Defense-in-depth architecture as the default, not as an upgrade.",
    cards: [
      { icon: "lock",     k: "Native LGPD",            color: "#3222E9",
        d: "Compliance with Brazil's data protection law (LGPD) from the architecture up. Data processed and stored on national territory.",
        bullets: ["DPO appointed", "ROPA up to date", "Data subject rights implemented", "ANPD notification in ≤ 48h"] },
      { icon: "shield",   k: "Cloud infrastructure",   color: "#7540AC",
        d: "AWS / GCP in São Paulo, with encryption in transit (TLS 1.3) and at rest (AES-256). Per-client segregated environments.",
        bullets: ["Isolated VPC per tenant", "WAF + DDoS protection", "Multi-AZ failover", "RTO ≤ 30 min"] },
      { icon: "key",      k: "Secure API",             color: "#AE46C0",
        d: "Authentication via OAuth 2.0 / API Key. Rate limiting, full logging and webhooks signed with HMAC-SHA256.",
        bullets: ["Optional mTLS", "90-day key rotation", "Replay protection", "Audit log retained 5 years"] },
      { icon: "brain",    k: "Auditable model",        color: "#FE8B77",
        d: "Every ML decision logged with inputs, score, confidence, model version and timestamp. Complete, exportable audit trail.",
        bullets: ["Versioned Model Registry", "Continuous drift detection", "Quarterly bias monitoring", "Per-decision explainability"] },
      { icon: "people",   k: "Least-privilege access", color: "#F8AD39",
        d: "Least-privilege model with corporate SSO. Audited access, mandatory MFA, just-in-time elevation for sensitive operations.",
        bullets: ["Granular RBAC", "Mandatory MFA", "Session recording", "Quarterly access review"] },
      { icon: "clock",    k: "Observability",          color: "#10B981",
        d: "DataDog + Sentry + centralized logs. Real-time SLA and security alerts. Incident response with documented SLA.",
        bullets: ["P1 ack ≤ 15 min", "Public status page", "Postmortem with RCA", "Annual pentest"] },
    ],
    stackK: "· Tech stack",
    compEyebrow: <>· Certifications &amp; alignments</>,
    compTitle: <>Built for the <em>frameworks</em> the market demands.</>,
    compItems: [
      { k: "LGPD",      v: "Compliant",    d: "Personal data protection (BR) — DPO, ROPA, data subject rights implemented.",      color: "#3222E9", state: "ok" },
      { k: "ISO 27001", v: "In progress",  d: "Information Security Management System — gap analysis completed Q1.",               color: "#AE46C0", state: "wip" },
      { k: "HIPAA",     v: "Aligned",      d: "Health privacy (US) — equivalent controls applicable to the health line.",          color: "#FE8B77", state: "ok" },
    ],
    faqEyebrow: "· Frequently asked questions",
    faqTitle: <>What <em>IT and Compliance</em> always ask.</>,
    faqs: [
      { q: "Where is Brazilian personal data stored?",
        a: "On national territory — AWS São Paulo (sa-east-1) or GCP São Paulo (southamerica-east1), with AES-256 encryption at rest. There is no cross-border data flow. Clients can opt for private cloud or on-premise under stricter regulatory requirements." },
      { q: "How does the audit trail work for each decision?",
        a: "Every decision (score, recommendation, declination) is logged with: model + version used, complete inputs, output, confidence score, timestamp, user/system identifier. The log is immutable (write-once) and exportable as JSON / CSV / Parquet. Default retention is 5 years, configurable." },
      { q: "Who has access to client data inside WIR?",
        a: "Least-privilege access — only credentialed operators, with MFA, corporate SSO and session recording. Sensitive operations require just-in-time elevation approved by a second operator. Access is audited quarterly. Clients receive an access report on demand." },
      { q: "How does incident notification work?",
        a: "P1 SLA: ack in ≤ 15 min, initial client communication in ≤ 1h, postmortem with root cause analysis in ≤ 7 days. ANPD/regulator notification in ≤ 48h per LGPD. Public status page for downtime." },
      { q: "Can the ML model be audited directly?",
        a: "Yes. The Model Registry exposes versions, training datasets, drift metrics and quarterly bias reports. Any decision can be reproduced by the client with the same inputs and version. Explainability available per sample or set. SHAP values + feature importance per decision on demand." },
      { q: "What happens if WIR is acquired or shuts down?",
        a: "The contract includes a continuity clause: client data is returned in structured format within ≤ 30 days, with a full copy of the models trained on your appetite. Optional source-code escrow of the platform for Tier-1 clients." },
    ],
    closeEyebrow: "· Next step",
    closeTitle: <>Want to review the <em>architecture</em><br/>with your IT &amp;<br/><em>Compliance</em> team?</>,
    closeP: "A 60–90 min technical session with our platform engineering. Architecture walk-through, controls, threat model and certification roadmap. Whitepaper sent before the call.",
    closeCtaTeam: "Talk to the technical team",
    closeCtaWp: "Request whitepaper",
    closeWpHref: "mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20-%20Security%20Architecture",
  },
  es: {
    shieldNetwork: "NETWORK · TLS 1.3 · WAF",
    shieldApp:     "APPLICATION · OAuth 2.0 · MFA",
    shieldData:    "DATA · AES-256 · BYOK",
    shieldAuditR:  "AUDIT · LGPD · INMUTABLE",
    shieldLive: "en vivo · monitoreado",
    mastDate: "ABR 2026",
    mastTheme: "SEGURIDAD & COMPLIANCE",
    mastPill: "LGPD-ready · auditable",
    kicker: "Defensa en profundidad · 4 capas",
    heroTitle: <>Seguridad y<br/><em>compliance</em><br/>como fundación.</>,
    heroLede: "WIR Innovation fue diseñada desde la arquitectura para operar dentro de los requisitos regulatorios del mercado asegurador. Cada decisión deja una traza auditable; cada dato se encripta en tránsito y en reposo; cada ambiente está segregado por cliente.",
    heroCtaIt: <>Hablar con TI &amp; Compliance</>,
    heroCtaWp: "Solicitar whitepaper",
    wpHref: "mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20Innovation%20-%20Arquitectura%20de%20Seguridad",
    heroCaption: "· 4 capas de defensa en profundidad",
    apprEyebrow: "· Principios",
    apprPullquote: <>"Compliance no es un <em>reporte</em>. Es la <em>arquitectura</em> operando."</>,
    apprAttrB: "Ingeniería WIR",
    apprAttrS: "Equipo de Plataforma · 2026",
    apprParas: [
      { k: "Defensa en profundidad",
        text: "No confiamos en una sola barrera. La plataforma opera en 4 capas independientes — red (TLS 1.3 + WAF), aplicación (OAuth 2.0 + rate limiting), datos (AES-256 + segregación por cliente) y auditoría (log inmutable + decisión trazable). Romper una capa no compromete las otras." },
      { k: "Auditable por diseño",
        text: "Toda decisión de la plataforma — score de riesgo, recomendación de pricing, declinación automática — lleva firma digital y traza completa: modelo, versión, inputs, output, timestamp. Compliance no es un reporte que corremos a fin de mes — es el sistema operando." },
      { k: "Soberanía de datos",
        text: "Los datos personales brasileños permanecen en territorio nacional (AWS São Paulo / GCP São Paulo). El cliente decide sobre criptografía, retención y derecho al olvido. Sin cross-border data flows. Sin terceros en el camino." },
      { k: "Listo para evolucionar",
        text: "LGPD en cumplimiento hoy. ISO 27001 con arquitectura lista — gap analysis concluido, evolución continua. Frameworks adicionales (HIPAA, estándares internacionales) alineados según el cliente. No es un SaaS genérico que se adapta — es una plataforma diseñada para lo regulado desde la fundación." },
    ],
    pillEyebrow: "· Los pilares",
    pillTitle: <>Seis pilares.<br/><em>Una plataforma segura.</em></>,
    pillSub: "Cada capa está diseñada para operar de forma independiente — romper una no compromete las otras. Arquitectura defense-in-depth como estándar, no como upgrade.",
    cards: [
      { icon: "lock",     k: "LGPD nativa",            color: "#3222E9",
        d: "Conformidad con la ley brasileña de protección de datos (LGPD) desde la arquitectura. Datos procesados y almacenados en territorio nacional.",
        bullets: ["DPO contratado", "ROPA actualizado", "Derechos del titular implementados", "Notificación ANPD en ≤ 48h"] },
      { icon: "shield",   k: "Infraestructura cloud",  color: "#7540AC",
        d: "AWS / GCP en São Paulo, con criptografía en tránsito (TLS 1.3) y en reposo (AES-256). Ambientes segregados por cliente.",
        bullets: ["VPC aislada por tenant", "WAF + protección DDoS", "Failover Multi-AZ", "RTO ≤ 30 min"] },
      { icon: "key",      k: "API segura",             color: "#AE46C0",
        d: "Autenticación vía OAuth 2.0 / API Key. Rate limiting, logging completo y webhooks con firma digital HMAC-SHA256.",
        bullets: ["mTLS opcional", "Rotación de keys cada 90 días", "Replay protection", "Audit log retenido 5 años"] },
      { icon: "brain",    k: "Modelo auditable",       color: "#FE8B77",
        d: "Cada decisión de ML registrada con inputs, score, confianza, versión del modelo y timestamp. Traza de auditoría completa y exportable.",
        bullets: ["Model Registry versionado", "Drift detection continuo", "Monitoreo de sesgo trimestral", "Explainability por decisión"] },
      { icon: "people",   k: "Acceso por principio",   color: "#F8AD39",
        d: "Modelo least privilege con SSO corporativo. Accesos auditados, MFA obligatorio, just-in-time elevation para operaciones sensibles.",
        bullets: ["RBAC granular", "MFA obligatorio", "Session recording", "Revisión trimestral de accesos"] },
      { icon: "clock",    k: "Observabilidad",         color: "#10B981",
        d: "DataDog + Sentry + logs centralizados. Alertas de SLA y seguridad en tiempo real. Incident response con SLA documentado.",
        bullets: ["P1 ack ≤ 15 min", "Status page pública", "Postmortem con RCA", "Pentest anual"] },
    ],
    stackK: "· Stack técnico",
    compEyebrow: <>· Certificaciones &amp; alineamientos</>,
    compTitle: <>Construido para los <em>frameworks</em> que el mercado exige.</>,
    compItems: [
      { k: "LGPD",      v: "Conforme",     d: "Protección de datos personales (BR) — DPO, ROPA, derechos del titular implementados.", color: "#3222E9", state: "ok" },
      { k: "ISO 27001", v: "En proceso",   d: "Sistema de Gestión de Seguridad de la Información — gap analysis concluido Q1.",         color: "#AE46C0", state: "wip" },
      { k: "HIPAA",     v: "Alineado",     d: "Privacidad en salud (US) — controles equivalentes aplicables al ramo salud.",            color: "#FE8B77", state: "ok" },
    ],
    faqEyebrow: "· Preguntas frecuentes",
    faqTitle: <>Lo que <em>TI y Compliance</em> siempre preguntan.</>,
    faqs: [
      { q: "¿Dónde se almacenan los datos personales brasileños?",
        a: "En territorio nacional — AWS São Paulo (sa-east-1) o GCP São Paulo (southamerica-east1), con criptografía AES-256 en reposo. No hay cross-border data flow. El cliente puede optar por private cloud u on-premise ante requisitos regulatorios más estrictos." },
      { q: "¿Cómo funciona la traza de auditoría de cada decisión?",
        a: "Cada decisión (score, recomendación, declinación) se registra con: modelo + versión usados, inputs completos, output, score de confianza, timestamp, identificador del usuario/sistema. El log es inmutable (write-once) y exportable en formatos JSON / CSV / Parquet. Retención estándar de 5 años, configurable." },
      { q: "¿Quién tiene acceso a los datos del cliente dentro de WIR?",
        a: "Acceso por principio least privilege — solo operadores acreditados, con MFA, SSO corporativo y session recording. Las operaciones sensibles exigen just-in-time elevation con aprobación de un segundo operador. Accesos auditados trimestralmente. El cliente recibe reporte de accesos bajo demanda." },
      { q: "¿Cómo funciona la notificación de incidentes?",
        a: "SLA P1: ack en ≤ 15 min, comunicación inicial al cliente en ≤ 1h, postmortem con root cause analysis en ≤ 7 días. Notificación ANPD/regulador en ≤ 48h conforme a la LGPD. Status page pública para downtime." },
      { q: "¿Es posible auditar el modelo de ML directamente?",
        a: "Sí. El Model Registry expone versiones, datasets de entrenamiento, métricas de drift y sesgo por trimestre. Cada decisión puede ser reproducida por el cliente con los mismos inputs y versión. Explainability disponible por muestra o conjunto. SHAP values + feature importance por decisión bajo demanda." },
      { q: "¿Qué pasa si WIR es adquirida o cierra operaciones?",
        a: "El contrato incluye cláusula de continuidad: los datos del cliente se devuelven en formato estructurado en ≤ 30 días, con copia íntegra del código de los modelos entrenados bajo tu apetito. Escrow opcional del código fuente de la plataforma para clientes Tier-1." },
    ],
    closeEyebrow: "· Próximo paso",
    closeTitle: <>¿Quieres revisar la <em>arquitectura</em><br/>con tu equipo de TI &amp;<br/><em>Compliance?</em></>,
    closeP: "Reunión técnica de 60–90 min con nuestra ingeniería de plataforma. Walk-through de la arquitectura, controles, modelo de amenazas y roadmap de certificaciones. Whitepaper enviado antes de la call.",
    closeCtaTeam: "Hablar con el equipo técnico",
    closeCtaWp: "Solicitar whitepaper",
    closeWpHref: "mailto:contato@wirinnovation.ai?subject=Whitepaper%20WIR%20-%20Arquitectura%20de%20Seguridad",
  },
}[LANG];

// SecurityShield — defense-in-depth atom diagram. Smaller central WIR core (hex)
// with 4 orbital security layers that ROTATE at different speeds + directions.
// Curved textPath labels stay anchored to static paths (legible). Live core dot pulses.
function SecurityShield() {
  const CX = 200, CY = 200;
  // 4 layer radii (outer → inner) + rotation config per layer
  const LAYERS = [
    { r: 180, label: T.shieldNetwork || "NETWORK · TLS 1.3 · WAF",       color: "#3222E9", spinDur: 80, spinDir: 1  },
    { r: 145, label: T.shieldApp     || "APPLICATION · OAuth 2.0 · MFA", color: "#7540AC", spinDur: 60, spinDir: -1 },
    { r: 110, label: T.shieldData    || "DATA · AES-256 · BYOK",         color: "#AE46C0", spinDur: 45, spinDir: 1  },
    { r:  75, label: T.shieldAuditR  || "AUDIT · LGPD · IMMUTABLE",      color: "#FE8B77", spinDur: 30, spinDir: -1 },
  ];

  // Cardinal data-point dots per layer (N, E, S, W) — these ROTATE with the ring group
  const ringDots = (r, color, offset = 0) =>
    [0, 90, 180, 270].map((deg, i) => {
      const a = ((deg + offset) * Math.PI) / 180;
      return (
        <circle key={i}
          cx={CX + r * Math.cos(a)}
          cy={CY + r * Math.sin(a)}
          r="3.5"
          fill={color}
          stroke="#FAF6EE"
          strokeWidth="1.5"/>
      );
    });

  return (
    <div className="dphero__shield">
      <svg viewBox="0 0 400 400" className="dphero__shield-svg" aria-hidden>
        <defs>
          <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#F8AD39"/>
            <stop offset="50%"  stopColor="#AE46C0"/>
            <stop offset="100%" stopColor="#3222E9"/>
          </linearGradient>
          <radialGradient id="shieldBg" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%"   stopColor="rgba(117,64,172,0.08)"/>
            <stop offset="60%"  stopColor="rgba(117,64,172,0.02)"/>
            <stop offset="100%" stopColor="rgba(117,64,172,0)"/>
          </radialGradient>
          <filter id="shieldShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.18"/>
          </filter>
          {/* Static text-anchor paths — labels follow the ring TOP arc, never rotate */}
          {LAYERS.map((L, i) => (
            <path key={i} id={`ring-${i}`}
              d={`M ${CX - L.r} ${CY} A ${L.r} ${L.r} 0 0 1 ${CX + L.r} ${CY}`}/>
          ))}
        </defs>

        {/* Soft radial background fill */}
        <circle cx={CX} cy={CY} r="195" fill="url(#shieldBg)"/>

        {/* 4 concentric layer rings — each <g> rotates around center independently */}
        {LAYERS.map((L, i) => (
          <g key={i}>
            <animateTransform attributeName="transform" attributeType="XML"
              type="rotate"
              from={`0 ${CX} ${CY}`}
              to={`${360 * L.spinDir} ${CX} ${CY}`}
              dur={`${L.spinDur}s`}
              repeatCount="indefinite"/>
            {/* Ring stroke */}
            <circle cx={CX} cy={CY} r={L.r}
              fill="none" stroke={L.color}
              strokeWidth={1 + i * 0.2}
              strokeOpacity={0.3 + i * 0.12}
              strokeDasharray={i === LAYERS.length - 1 ? "0" : `${3 + i} ${5 + i}`}/>
            {/* Cardinal data dots — rotate with the ring */}
            {ringDots(L.r, L.color, i * 22)}
          </g>
        ))}

        {/* Curved labels — STATIC (sit outside rotating groups, anchored to defs paths) */}
        {LAYERS.map((L, i) => (
          <text key={`lbl-${i}`} fill={L.color} fontSize="9.5" fontWeight="700"
            fontFamily="JetBrains Mono, monospace" letterSpacing=".22em">
            <textPath href={`#ring-${i}`} startOffset="50%" textAnchor="middle">
              · {L.label} ·
            </textPath>
          </text>
        ))}

        {/* Connecting hairlines from core to outer ring — static */}
        {[45, 135, 225, 315].map((deg, i) => {
          const a = (deg * Math.PI) / 180;
          const innerR = 28, outerR = LAYERS[0].r - 8;
          return (
            <line key={i}
              x1={CX + innerR * Math.cos(a)} y1={CY + innerR * Math.sin(a)}
              x2={CX + outerR * Math.cos(a)} y2={CY + outerR * Math.sin(a)}
              stroke="#7540AC" strokeWidth="0.8" strokeDasharray="2 4" opacity="0.15"/>
          );
        })}

        {/* Central WIR core hex — SMALLER (radius 36 → 26), still branded */}
        <g transform={`translate(${CX} ${CY})`}>
          {/* Hex outer — radius reduced from 36 to 26 */}
          <path d="M0,-26 L22.5,-13 L22.5,13 L0,26 L-22.5,13 L-22.5,-13 Z"
            fill="url(#shieldGrad)" stroke="#FAF6EE" strokeWidth="1.6"
            filter="url(#shieldShadow)"/>
          {/* Inner shield glyph — reduced proportionally */}
          <path d="M0,-13 L-10,-7 L-10,3 C-10,10 -6,15 0,18 C6,15 10,10 10,3 L10,-7 Z"
            fill="#FAF6EE" fillOpacity="0.94"/>
          {/* Check mark — smaller */}
          <path d="M-4.5,0 L-1,5 L5,-4" fill="none" stroke="#0B0A08"
            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </g>

        {/* Center label below core */}
        <text x={CX} y={CY + 44} textAnchor="middle" fill="#0B0A08"
          fontSize="10" fontWeight="700" letterSpacing=".24em"
          fontFamily="JetBrains Mono, monospace">
          WIR · CORE
        </text>

        {/* Live indicator — pulsing dot with halo */}
        <g transform={`translate(${CX} ${CY + 62})`}>
          <circle r="9" fill="#10B981" opacity="0.15">
            <animate attributeName="r" values="5;12;5" dur="2.4s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.25;0.05;0.25" dur="2.4s" repeatCount="indefinite"/>
          </circle>
          <circle r="3.5" fill="#10B981">
            <animate attributeName="opacity" values="0.65;1;0.65" dur="2s" repeatCount="indefinite"/>
          </circle>
        </g>
        <text x={CX} y={CY + 82} textAnchor="middle" fill="#0B0A08"
          fontSize="9" fontWeight="600" letterSpacing=".22em"
          fontFamily="JetBrains Mono, monospace">
          {T.shieldLive}
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
            <span>{T.mastDate}</span>
            <span>{T.mastTheme}</span>
          </div>
          <div className="dphero__mast-R">
            <span className="dphero__mast-pill"><span className="dphero__mast-dot"/> {T.mastPill}</span>
          </div>
        </div>

        <div className="dphero__grid">
          <div className="dphero__L">
            <div className="opening__kicker">
              <span className="opening__kicker-dot"/>
              <span>{T.kicker}</span>
            </div>
            <h1 className="display dphero__title">
              {T.heroTitle}
            </h1>
            <p className="dphero__lede">
              {T.heroLede}
            </p>
            <div className="dphero__actions">
              <button className="btn btn--solid" onClick={() => go("contact")}>
                {T.heroCtaIt} <span className="btn__arrow">→</span>
              </button>
              <a className="btn btn--ghost" href={T.wpHref}>
                {T.heroCtaWp} <span className="btn__arrow">→</span>
              </a>
            </div>
          </div>
          <div className="dphero__R">
            <div className="dphero__caption">{T.heroCaption}</div>
            <SecurityShield/>
          </div>
        </div>
      </div>
    </section>
  );
}

function DPApproach() {
  const paragraphs = T.apprParas;
  return (
    <section className="dpessay" data-reveal>
      <div className="wrap">
        <div className="dpessay__grid">
          <div className="dpessay__side">
            <div className="eyebrow">{T.apprEyebrow}</div>
            <div className="dpessay__pullquote display">
              {T.apprPullquote}
            </div>
            <div className="dpessay__attr">
              <b>{T.apprAttrB}</b>
              <span>{T.apprAttrS}</span>
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
  const cards = T.cards;

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
          <div className="eyebrow">{T.pillEyebrow}</div>
          <h2 className="display dppillars__title">{T.pillTitle}</h2>
          <p className="dppillars__sub">{T.pillSub}</p>
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
          <span className="dppillars__stack-k">{T.stackK}</span>
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
  const items = T.compItems;
  return (
    <section className="dpcomp" data-reveal>
      <div className="wrap">
        <div className="dpcomp__head">
          <div className="eyebrow">{T.compEyebrow}</div>
          <h2 className="display dpcomp__title">{T.compTitle}</h2>
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
  const qs = T.faqs;
  const [open, setOpen] = React.useState(0);
  return (
    <section className="dpfaq" data-reveal>
      <div className="wrap">
        <div className="dpfaq__head">
          <div className="eyebrow">{T.faqEyebrow}</div>
          <h2 className="display dpfaq__title">{T.faqTitle}</h2>
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
            <div className="eyebrow eyebrow--onDark">{T.closeEyebrow}</div>
            <h2 className="display dpclose__title">
              {T.closeTitle}
            </h2>
          </div>
          <div className="dpclose__r">
            <p>{T.closeP}</p>
            <div className="dpclose__actions">
              <button className="btn btn--solid btn--onDark" onClick={() => go("contact")}>
                {T.closeCtaTeam} <span className="btn__arrow">→</span>
              </button>
              <a className="btn btn--ghost btn--onDark" href={T.closeWpHref}>
                {T.closeCtaWp} <span className="btn__arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Security Manifesto · client-facing (PT-BR only)
   Content authored by Luiz. Do not edit affirmations without his sign-off.
═══════════════════════════════════════════════════════════════ */

const MANIFESTO_SECTIONS = [
  {
    id: "compromisso",
    num: "01",
    title: "Nosso compromisso com a segurança",
    body: (
      <>
        <p>A WIR desenvolve software de cálculo de risco e precificação para seguradoras. Entendemos que operamos com dados sensíveis e em um setor regulado e, por isso, tratamos a segurança da informação e a proteção de dados como parte central do nosso produto, e não como um item acessório.</p>
        <p>Este documento descreve, de forma resumida, as práticas de segurança que adotamos para proteger os dados e as operações dos nossos clientes. Podemos complementá-lo com evidências, respostas a questionários de segurança e documentação contratual mediante solicitação.</p>
      </>
    ),
  },
  {
    id: "operador",
    num: "02",
    title: "Nosso papel: operador de dados",
    body: (
      <>
        <p>No tratamento de dados pessoais, a WIR atua como <strong>operador</strong>, processando dados exclusivamente por conta e ordem do cliente (a controladora), conforme as finalidades e instruções definidas em contrato.</p>
        <ul className="dpm__list">
          <li>Firmamos um <strong>Acordo de Tratamento de Dados (DPA)</strong> que define finalidade, instruções, medidas de segurança, subcontratados e a devolução ou eliminação dos dados ao término da relação.</li>
          <li>Tratamos os dados do cliente <strong>somente</strong> para as finalidades contratadas. Não utilizamos os dados de um cliente para outras finalidades sem autorização contratual expressa.</li>
          <li>Apoiamos o cliente no cumprimento das suas obrigações regulatórias (LGPD e requisitos aplicáveis do setor de seguros).</li>
        </ul>
      </>
    ),
  },
  {
    id: "governanca",
    num: "03",
    title: "Governança e programa de segurança",
    body: (
      <>
        <p>Mantemos um programa de segurança da informação com políticas formais que orientam o desenvolvimento, a operação e o acesso aos sistemas.</p>
        <ul className="dpm__list">
          <li>Nossas práticas são orientadas por referências reconhecidas de mercado, como SOC 2.</li>
          <li>Revisamos periodicamente políticas, acessos e riscos.</li>
          <li>Responsabilidades de segurança e de proteção de dados são formalmente atribuídas na organização.</li>
        </ul>
      </>
    ),
  },
  {
    id: "protecao-dados",
    num: "04",
    title: "Proteção e privacidade dos dados",
    body: (
      <ul className="dpm__list">
        <li><strong>Criptografia:</strong> dados são protegidos por criptografia em trânsito (TLS) e em repouso (padrão AES-256).</li>
        <li><strong>Gestão de chaves:</strong> as chaves criptográficas são gerenciadas de forma segura.</li>
        <li><strong>Residência de dados:</strong> todos os dados dos clientes são armazenados no Brasil, com redundância e backup por 30 dias.</li>
        <li><strong>Minimização:</strong> coletamos e retemos apenas os dados necessários às finalidades contratadas.</li>
        <li><strong>Retenção e eliminação:</strong> dados são retidos conforme o contrato e eliminados de forma segura ao término da relação ou mediante solicitação legítima.</li>
        <li><strong>Ambientes segregados:</strong> dados de produção não são utilizados em ambientes de desenvolvimento ou de treinamento de modelos; nesses ambientes usamos dados anonimizados ou sintéticos.</li>
      </ul>
    ),
  },
  {
    id: "isolamento",
    num: "05",
    title: "Isolamento entre clientes",
    body: (
      <p>A arquitetura da plataforma garante o <strong>isolamento lógico entre os dados de diferentes clientes</strong>. Controles de autorização asseguram que os dados de um cliente não sejam acessíveis a outros clientes.</p>
    ),
  },
  {
    id: "infraestrutura",
    num: "06",
    title: "Infraestrutura e hospedagem",
    body: (
      <ul className="dpm__list">
        <li>Nossa infraestrutura é operada na AWS, maior e mais seguro provedor de nuvem, com certificações de segurança internacionalmente aceitas.</li>
        <li>Utilizamos serviços gerenciados com redundância e alta disponibilidade.</li>
        <li>Aplicamos hardening, gestão de vulnerabilidades e atualização contínua dos componentes.</li>
        <li>Segredos e credenciais são armazenados em cofres seguros e nunca em código-fonte.</li>
      </ul>
    ),
  },
  {
    id: "acesso",
    num: "07",
    title: "Controle de acesso",
    body: (
      <ul className="dpm__list">
        <li><strong>Autenticação multifator (MFA)</strong> obrigatória para acessos administrativos e a sistemas que tratam dados de clientes.</li>
        <li><strong>Menor privilégio:</strong> cada colaborador possui apenas o acesso necessário à sua função.</li>
        <li>O acesso da nossa equipe a dados de clientes é <strong>restrito, controlado e registrado</strong>, e ocorre apenas quando necessário para operação, suporte ou obrigação contratual.</li>
        <li>Acessos são revisados periodicamente e revogados imediatamente em desligamentos.</li>
      </ul>
    ),
  },
  {
    id: "sdlc",
    num: "08",
    title: "Segurança no desenvolvimento (SDLC)",
    body: (
      <ul className="dpm__list">
        <li>Adotamos um ciclo de desenvolvimento seguro, com <strong>revisão de código</strong> antes da entrada em produção.</li>
        <li>O pipeline inclui análise automatizada de código, de dependências e de segredos.</li>
        <li>Mantemos rastreabilidade dos componentes de software utilizados.</li>
        <li>As interfaces (APIs) aplicam validação de entradas e controles contra abuso.</li>
      </ul>
    ),
  },
  {
    id: "governanca-ia",
    num: "09",
    title: "Governança e transparência dos modelos de IA",
    body: (
      <>
        <p>Como nosso produto calcula risco e preço por meio de modelos, tratamos a governança desses modelos como parte da segurança e da conformidade do cliente:</p>
        <ul className="dpm__list">
          <li><strong>Uso de dados:</strong> utilizamos os dados do cliente apenas conforme o contrato. Não combinamos dados de diferentes clientes para treinar modelos compartilhados sem autorização expressa.</li>
          <li><strong>Explicabilidade:</strong> a plataforma oferece meios de justificar como um determinado risco resultou em determinado preço, apoiando o cliente no atendimento a exigências regulatórias e ao direito de revisão de decisões automatizadas (art. 20 da LGPD).</li>
          <li><strong>Trilha de auditoria:</strong> cada precificação é registrada (dados de entrada, versão do modelo e resultado), permitindo auditoria pelo cliente.</li>
          <li><strong>Controle de versões e aprovação:</strong> modelos são versionados e passam por aprovação antes de entrar em produção.</li>
          <li><strong>Testes de robustez e de viés:</strong> avaliamos os modelos quanto a estabilidade e a vieses indevidos.</li>
          <li><strong>Continuidade:</strong> mecanismos de contingência garantem a operação de precificação mesmo diante de indisponibilidade de um modelo.</li>
        </ul>
      </>
    ),
  },
  {
    id: "incidentes",
    num: "10",
    title: "Monitoramento e resposta a incidentes",
    body: (
      <ul className="dpm__list">
        <li>Mantemos registros (logs) centralizados e monitoramento de eventos de segurança relevantes.</li>
        <li>Dispomos de um <strong>plano de resposta a incidentes</strong> documentado.</li>
        <li>Em caso de incidente de segurança envolvendo dados do cliente, <strong>notificamos o cliente dentro do prazo previsto em contrato</strong>, com as informações necessárias para que ele cumpra suas obrigações regulatórias.</li>
      </ul>
    ),
  },
  {
    id: "continuidade",
    num: "11",
    title: "Continuidade e disponibilidade",
    body: (
      <ul className="dpm__list">
        <li>Realizamos <strong>backups regularmente</strong>, protegidos e testados periodicamente.</li>
        <li>Nossa infraestrutura é projetada com redundância para sustentar os níveis de disponibilidade acordados.</li>
        <li>Mantemos objetivos definidos de recuperação (RTO/RPO) e um plano de continuidade.</li>
      </ul>
    ),
  },
  {
    id: "conformidade",
    num: "12",
    title: "Conformidade",
    body: (
      <ul className="dpm__list">
        <li>Realizamos testes de intrusão (pentest) por empresa independente com periodicidade anual.</li>
        <li>Respondemos a <strong>questionários de segurança</strong> (ex.: SIG, CAIQ ou o modelo do cliente) e disponibilizamos documentação de apoio.</li>
        <li>Oferecemos <strong>direito de auditoria</strong> conforme previsto em contrato, incluindo o fornecimento de relatórios e evidências equivalentes.</li>
        <li>Mantemos apólice de seguro de responsabilidade cibernética.</li>
      </ul>
    ),
  },
];

function DPManifesto() {
  return (
    <section className="dpm bg-editorial bg-editorial--tr">
      <div className="wrap dpm__wrap">
        <header className="dpm__hero" data-reveal>
          <div className="dpm__pill">
            <span className="dpm__pill-dot" aria-hidden/>
            Documento voltado a clientes e parceiros
          </div>
          <div className="eyebrow dpm__eyebrow">· Security Manifesto</div>
          <h2 className="display dpm__title">As práticas que protegem<br/><em>os dados e as operações</em><br/>dos nossos clientes.</h2>
          <div className="dpm__meta">
            <span>Versão 1.0</span>
            <span aria-hidden>·</span>
            <span>Julho / 2026</span>
          </div>
        </header>

        <div className="dpm__content">
          {MANIFESTO_SECTIONS.map((s) => (
            <section key={s.id} id={s.id} className="dpm__sec" data-reveal>
              <div className="dpm__sec-num">{s.num}</div>
              <h3 className="dpm__sec-title display">{s.title}</h3>
              <div className="dpm__sec-body">{s.body}</div>
            </section>
          ))}
        </div>

        <p className="dpm__foot-note">
          Este documento é fornecido a título informativo. As práticas aqui descritas podem evoluir; obrigações específicas são definidas nos instrumentos contratuais firmados entre as partes.
        </p>
      </div>
    </section>
  );
}

export function DataProtectionPage({ go }) {
  useReveal();
  // PT-BR: manifesto de Luiz (aprovado). EN/ES: manter conteúdo editorial atual
  // até termos versões aprovadas nesses idiomas.
  if (LANG === "pt") {
    return (
      <>
        <DPHero go={go}/>
        <DPManifesto/>
        <DPClose go={go}/>
      </>
    );
  }
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
