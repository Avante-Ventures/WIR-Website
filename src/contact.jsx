import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';
import { LANG, LANG_BASE } from './i18n.js';

/* ───────── Contato · humano + steps ───────── */

const T = {
  pt: {
    svAddr: "California · EUA",
    heroMeta: ["· Falar com nossos sócios", "· Resposta em até 24h úteis", "· Conversa estratégica · não comercial"],
    heroEyebrow: "· Próxima conversa",
    heroTitle: <>Vamos conversar<br/>sobre como <em>escalar<br/>o seu negócio?</em></>,
    heroLede: "Cada seguradora opera diferente. Em uma conversa de 30 min com nossos sócios, calibramos o que faz sentido para a sua realidade — volume, custo atual, apetite e estrutura — e desenhamos juntos se um projeto de implementação se justifica.",
    foundersNote: "Você vai falar com um de nós.",
    interests: [
      { k:"SS", t:"Smart Sales",               d:"Distribuição + lead scoring",  c:"#1C17FF" },
      { k:"UI", t:"Underwriter Intelligence",  d:"Subscrição inteligente",       c:"#A44F98" },
    ],
    roles: ["C-level (CEO / COO / CIO)","Head de Subscrição","Head de TI / Arquitetura","Head de Distribuição","Gerente de produto","Consultor / advisory","Outro"],
    sizes: ["MGA (até R$ 200M prêmio)","Seguradora média (R$ 200M – R$ 2B)","Tier-1 (R$ 2B+)","Resseguradora","Corretora corporativa","Outro"],
    steps: ["Interesse","Contexto","Você"],
    formEyebrow: "· Preencha em 2 minutos",
    step0Title: <>Por qual produto <em>você começaria?</em></>,
    step1Title: <>Conte um pouco do <em>contexto.</em></>,
    step2Title: <>Como te <em>chamamos?</em></>,
    fRole: "Seu papel na empresa", fSelect: "Selecione…",
    fCompany: "Nome da empresa", fCompanyPh: "Ex: Mahway Seguros",
    fSize: "Porte",
    fName: "Nome completo", fNamePh: "Ana Paula Silva",
    fEmail: "E-mail corporativo", fEmailPh: "ana@empresa.com",
    fPhone: "Telefone · opcional", fPhonePh: "(11) 99999-9999",
    fNotes: "O que está acontecendo aí? · opcional",
    fNotesPh: "Qual é o problema concreto de hoje? (ex: levamos 6 semanas para cotar comercial…)",
    navBack: "Voltar", navStep: (n) => `Passo ${n} de 3`,
    navReady: "pronto para avançar", navIncomplete: "complete os campos obrigatórios",
    navContinue: "Continuar", navSending: "Enviando…", navSubmit: "Enviar pedido",
    nameFallback: "pessoal",
    doneOkEyebrow: "· Recebido",
    doneOkTitle: (n) => <>Obrigado, <em>{n}.</em></>,
    doneOkBody1: <>Recebemos sua mensagem. Nossa equipe responde em até <b>24h úteis</b> com 2 ou 3 horários para conversar com nossos sócios.</>,
    doneOkBody2: (link) => <>Se precisar adiantar algo, escreva para {link} citando a Ref abaixo.</>,
    doneMailEyebrow: "· Confirme o envio",
    doneMailTitle: (n) => <>Quase lá, <em>{n}.</em></>,
    doneMailBody1: <>Seu cliente de e-mail abriu uma mensagem pré-preenchida para <b>nicholas@wirinnovation.ai</b>. <b>Confirme o envio</b> e respondemos em até 24h úteis com 2 ou 3 horários.</>,
    doneMailBody2: (link) => <>Caso o e-mail não tenha aberto, escreva direto para {link}.</>,
    doneErrEyebrow: "· Ops, falha no envio",
    doneErrTitle: <>Não conseguimos enviar.</>,
    doneErrBody: (link) => <>O envio automático falhou. Por favor escreva direto para {link} citando a Ref abaixo — respondemos em até 24h úteis.</>,
    mailtoSubject: (name, company) => `[WIR · novo contato] ${name} · ${company}`,
    mailtoBody: (d, interestLabel) =>
`Nome: ${d.name}
E-mail: ${d.email}
Telefone: ${d.phone || "—"}

Empresa: ${d.company}
Porte: ${d.size}
Papel: ${d.role}

Interesse: ${interestLabel} (${d.interest})

Contexto:
${d.notes || "(sem contexto adicional)"}

—
Enviado pelo formulário do site wirinnovation.ai`,
    waText: "Olá Nicholas, vim pelo site da WIR Innovation. Gostaria de conversar sobre…",
    waK: "· WhatsApp direto",
    waT: <>Falar agora<br/><em>com Nicholas.</em></>,
    waD: "Resposta rápida pelo celular do nosso CEO. Para quem prefere conversa imediata em vez de formulário.",
    waCta: "Abrir conversa",
    newsK: "· Newsletter",
    newsT: <>Receba o que <em>publicamos.</em></>,
    newsD: "Análises sobre IA aplicada ao setor segurador. Sem spam, sem agenda comercial — só o que produzimos de conteúdo.",
    newsDone: "✓ Inscrição recebida. Você receberá os próximos Insights.",
    newsPh: "seu@email.com", newsAria: "Seu e-mail",
    newsBtn: "Inscrever", newsSending: "Enviando…",
    newsMailtoBody: "Inscreva-me na newsletter da WIR Innovation.\n\nE-mail: ",
    socialEyebrow: "· Outros canais",
    socialTitle: <>Acompanhe a WIR<br/><em>nas nossas redes.</em></>,
  },
  en: {
    svAddr: "California · USA",
    heroMeta: ["· Talk to our partners", "· Reply within 24 business hours", "· Strategic conversation · not a sales call"],
    heroEyebrow: "· Next conversation",
    heroTitle: <>Shall we talk<br/>about how to <em>scale<br/>your business?</em></>,
    heroLede: "Every insurer operates differently. In a 30-minute conversation with our partners, we calibrate what makes sense for your reality — volume, current cost, appetite and structure — and design together whether an implementation project is justified.",
    foundersNote: "You'll talk to one of us.",
    interests: [
      { k:"SS", t:"Smart Sales",              d:"Distribution + lead scoring",  c:"#1C17FF" },
      { k:"UI", t:"Underwriter Intelligence", d:"Intelligent underwriting",     c:"#A44F98" },
    ],
    roles: ["C-level (CEO / COO / CIO)","Head of Underwriting","Head of IT / Architecture","Head of Distribution","Product manager","Consultant / advisory","Other"],
    sizes: ["MGA (up to R$ 200M premium)","Mid-size insurer (R$ 200M – R$ 2B)","Tier-1 (R$ 2B+)","Reinsurer","Corporate brokerage","Other"],
    steps: ["Interest","Context","You"],
    formEyebrow: "· Takes 2 minutes",
    step0Title: <>Which product would <em>you start with?</em></>,
    step1Title: <>Tell us a bit of <em>context.</em></>,
    step2Title: <>How should we <em>reach you?</em></>,
    fRole: "Your role at the company", fSelect: "Select…",
    fCompany: "Company name", fCompanyPh: "E.g.: Mahway Insurance",
    fSize: "Size",
    fName: "Full name", fNamePh: "Ana Paula Silva",
    fEmail: "Work email", fEmailPh: "ana@company.com",
    fPhone: "Phone · optional", fPhonePh: "+55 11 99999-9999",
    fNotes: "What's going on over there? · optional",
    fNotesPh: "What's the concrete problem today? (e.g.: commercial quotes take us 6 weeks…)",
    navBack: "Back", navStep: (n) => `Step ${n} of 3`,
    navReady: "ready to continue", navIncomplete: "complete the required fields",
    navContinue: "Continue", navSending: "Sending…", navSubmit: "Send request",
    nameFallback: "there",
    doneOkEyebrow: "· Received",
    doneOkTitle: (n) => <>Thank you, <em>{n}.</em></>,
    doneOkBody1: <>We've received your message. Our team replies within <b>24 business hours</b> with 2–3 time slots to talk with our partners.</>,
    doneOkBody2: (link) => <>If you need to move faster, write to {link} quoting the Ref below.</>,
    doneMailEyebrow: "· Confirm the send",
    doneMailTitle: (n) => <>Almost there, <em>{n}.</em></>,
    doneMailBody1: <>Your email client opened a pre-filled message to <b>nicholas@wirinnovation.ai</b>. <b>Confirm the send</b> and we'll reply within 24 business hours with 2–3 time slots.</>,
    doneMailBody2: (link) => <>If the email didn't open, write directly to {link}.</>,
    doneErrEyebrow: "· Oops, send failed",
    doneErrTitle: <>We couldn't send it.</>,
    doneErrBody: (link) => <>The automatic submission failed. Please write directly to {link} quoting the Ref below — we reply within 24 business hours.</>,
    mailtoSubject: (name, company) => `[WIR · new contact] ${name} · ${company}`,
    mailtoBody: (d, interestLabel) =>
`Name: ${d.name}
Email: ${d.email}
Phone: ${d.phone || "—"}

Company: ${d.company}
Size: ${d.size}
Role: ${d.role}

Interest: ${interestLabel} (${d.interest})

Context:
${d.notes || "(no additional context)"}

—
Sent from the wirinnovation.ai website form`,
    waText: "Hello Nicholas, I found you through the WIR Innovation website. I'd like to talk about…",
    waK: "· Direct WhatsApp",
    waT: <>Talk now<br/><em>with Nicholas.</em></>,
    waD: "Fast replies from our CEO's phone. For those who prefer an immediate conversation over a form.",
    waCta: "Open chat",
    newsK: "· Newsletter",
    newsT: <>Get what we <em>publish.</em></>,
    newsD: "Analysis on AI applied to the insurance industry. No spam, no sales agenda — just the content we produce.",
    newsDone: "✓ Subscription received. You'll get the next Insights.",
    newsPh: "you@email.com", newsAria: "Your email",
    newsBtn: "Subscribe", newsSending: "Sending…",
    newsMailtoBody: "Subscribe me to the WIR Innovation newsletter.\n\nEmail: ",
    socialEyebrow: "· Other channels",
    socialTitle: <>Follow WIR<br/><em>on our channels.</em></>,
  },
  es: {
    svAddr: "California · EE. UU.",
    heroMeta: ["· Hablar con nuestros socios", "· Respuesta en máximo 24h hábiles", "· Conversación estratégica · no comercial"],
    heroEyebrow: "· Próxima conversación",
    heroTitle: <>¿Hablamos<br/>sobre cómo <em>escalar<br/>tu negocio?</em></>,
    heroLede: "Cada aseguradora opera diferente. En una conversación de 30 min con nuestros socios, calibramos qué tiene sentido para tu realidad — volumen, costo actual, apetito y estructura — y diseñamos juntos si un proyecto de implementación se justifica.",
    foundersNote: "Vas a hablar con uno de nosotros.",
    interests: [
      { k:"SS", t:"Smart Sales",              d:"Distribución + lead scoring",  c:"#1C17FF" },
      { k:"UI", t:"Underwriter Intelligence", d:"Suscripción inteligente",      c:"#A44F98" },
    ],
    roles: ["C-level (CEO / COO / CIO)","Head de Suscripción","Head de TI / Arquitectura","Head de Distribución","Gerente de producto","Consultor / advisory","Otro"],
    sizes: ["MGA (hasta R$ 200M de prima)","Aseguradora mediana (R$ 200M – R$ 2B)","Tier-1 (R$ 2B+)","Reaseguradora","Corredora corporativa","Otro"],
    steps: ["Interés","Contexto","Tú"],
    formEyebrow: "· Complétalo en 2 minutos",
    step0Title: <>¿Por cuál producto <em>empezarías?</em></>,
    step1Title: <>Cuéntanos un poco del <em>contexto.</em></>,
    step2Title: <>¿Cómo te <em>contactamos?</em></>,
    fRole: "Tu rol en la empresa", fSelect: "Selecciona…",
    fCompany: "Nombre de la empresa", fCompanyPh: "Ej: Mahway Seguros",
    fSize: "Tamaño",
    fName: "Nombre completo", fNamePh: "Ana Paula Silva",
    fEmail: "Email corporativo", fEmailPh: "ana@empresa.com",
    fPhone: "Teléfono · opcional", fPhonePh: "+57 300 999 9999",
    fNotes: "¿Qué está pasando allá? · opcional",
    fNotesPh: "¿Cuál es el problema concreto hoy? (ej: tardamos 6 semanas en cotizar comercial…)",
    navBack: "Volver", navStep: (n) => `Paso ${n} de 3`,
    navReady: "listo para avanzar", navIncomplete: "completa los campos obligatorios",
    navContinue: "Continuar", navSending: "Enviando…", navSubmit: "Enviar solicitud",
    nameFallback: "equipo",
    doneOkEyebrow: "· Recibido",
    doneOkTitle: (n) => <>Gracias, <em>{n}.</em></>,
    doneOkBody1: <>Recibimos tu mensaje. Nuestro equipo responde dentro de las <b>24h hábiles</b> con 2 o 3 horarios para conversar con nuestros socios.</>,
    doneOkBody2: (link) => <>Si necesitas adelantar algo, escribe a {link} citando la Ref de abajo.</>,
    doneMailEyebrow: "· Confirma el envío",
    doneMailTitle: (n) => <>Casi listo, <em>{n}.</em></>,
    doneMailBody1: <>Tu cliente de correo abrió un mensaje pre-llenado para <b>nicholas@wirinnovation.ai</b>. <b>Confirma el envío</b> y respondemos dentro de las 24h hábiles con 2 o 3 horarios.</>,
    doneMailBody2: (link) => <>Si el correo no se abrió, escribe directo a {link}.</>,
    doneErrEyebrow: "· Ups, falló el envío",
    doneErrTitle: <>No pudimos enviarlo.</>,
    doneErrBody: (link) => <>El envío automático falló. Por favor escribe directo a {link} citando la Ref de abajo — respondemos dentro de las 24h hábiles.</>,
    mailtoSubject: (name, company) => `[WIR · nuevo contacto] ${name} · ${company}`,
    mailtoBody: (d, interestLabel) =>
`Nombre: ${d.name}
Email: ${d.email}
Teléfono: ${d.phone || "—"}

Empresa: ${d.company}
Tamaño: ${d.size}
Rol: ${d.role}

Interés: ${interestLabel} (${d.interest})

Contexto:
${d.notes || "(sin contexto adicional)"}

—
Enviado desde el formulario del sitio wirinnovation.ai`,
    waText: "Hola Nicholas, llegué por el sitio de WIR Innovation. Me gustaría conversar sobre…",
    waK: "· WhatsApp directo",
    waT: <>Hablar ahora<br/><em>con Nicholas.</em></>,
    waD: "Respuesta rápida desde el celular de nuestro CEO. Para quien prefiere una conversación inmediata en vez de un formulario.",
    waCta: "Abrir conversación",
    newsK: "· Newsletter",
    newsT: <>Recibe lo que <em>publicamos.</em></>,
    newsD: "Análisis sobre IA aplicada al sector asegurador. Sin spam, sin agenda comercial — solo el contenido que producimos.",
    newsDone: "✓ Suscripción recibida. Recibirás los próximos Insights.",
    newsPh: "tu@email.com", newsAria: "Tu email",
    newsBtn: "Suscribirme", newsSending: "Enviando…",
    newsMailtoBody: "Suscríbeme al newsletter de WIR Innovation.\n\nEmail: ",
    socialEyebrow: "· Otros canales",
    socialTitle: <>Sigue a WIR<br/><em>en nuestras redes.</em></>,
  },
}[LANG];

const NICHOLAS_MAILTO = (
  <a href="mailto:nicholas@wirinnovation.ai" style={{color: "var(--wir-purple)", textDecoration: "underline"}}>nicholas@wirinnovation.ai</a>
);

function ContactClocks() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const offices = [
    { city:"São Paulo",      tz:"America/Sao_Paulo",     addr:"Av. Faria Lima, 3500 · 18º" },
    { city:"Silicon Valley", tz:"America/Los_Angeles",   addr:T.svAddr                     },
  ];
  const fmt = (tz) => {
    try {
      return new Intl.DateTimeFormat("pt-BR", { timeZone: tz, hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false }).format(now);
    } catch { return "--:--:--"; }
  };
  return (
    <div className="ctclocks">
      {offices.map((o,i) => (
        <div key={i} className="ctclock">
          <div className="ctclock__city">{o.city}</div>
          <div className="ctclock__time num">{fmt(o.tz)}</div>
          <div className="ctclock__addr">{o.addr}</div>
        </div>
      ))}
    </div>
  );
}

function ContactHero() {
  return (
    <section className="cthero">
      <div className="wrap">
        <div className="cthero__meta">
          {T.heroMeta.map((m, i) => <span key={i}>{m}</span>)}
        </div>
        <div className="cthero__grid">
          <div>
            <div className="eyebrow">{T.heroEyebrow}</div>
            <h1 className="display cthero__title">
              {T.heroTitle}
            </h1>
            <p className="cthero__lede">
              {T.heroLede}
            </p>
            <div className="cthero__founders">
              <div className="cthero__founder">
                <div className="cthero__founder-photo" style={{backgroundImage:"url(/assets/team/nicholas.jpg)"}}/>
                <div className="cthero__founder-body">
                  <div className="cthero__founder-name">
                    <b>Nicholas Weiser</b>
                    <a href="https://www.linkedin.com/in/nicholas-weiser/" target="_blank" rel="noopener noreferrer"
                       className="cthero__founder-li" aria-label="Nicholas Weiser · LinkedIn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                      </svg>
                    </a>
                  </div>
                  <span>CEO · Co-Founder</span>
                </div>
              </div>
              <div className="cthero__founder">
                <div className="cthero__founder-photo" style={{backgroundImage:"url(/assets/team/jose-carlos.jpg)"}}/>
                <div className="cthero__founder-body">
                  <div className="cthero__founder-name">
                    <b>José Carlos de Paula</b>
                    <a href="https://www.linkedin.com/in/jose-carlos-de-paula-14407b7a/" target="_blank" rel="noopener noreferrer"
                       className="cthero__founder-li" aria-label="José Carlos de Paula · LinkedIn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                      </svg>
                    </a>
                  </div>
                  <span>CSO · Co-Founder</span>
                </div>
              </div>
              <div className="cthero__founders-note">{T.foundersNote}</div>
            </div>
          </div>
          <ContactClocks/>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [step, setStep] = React.useState(0);
  const [data, setData] = React.useState({
    interest: "", role: "", company: "", size: "",
    name: "", email: "", phone: "", notes: "",
  });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const interests = T.interests;
  const roles = T.roles;
  const sizes = T.sizes;

  const canNext = () => {
    if (step === 0) return !!data.interest;
    if (step === 1) return !!data.role && !!data.company && !!data.size;
    if (step === 2) return !!data.name && !!data.email;
    return false;
  };

  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState(null);
  const [submitMode, setSubmitMode] = React.useState(null); // "supabase" | "mailto" | "error"
  const [submitRef, setSubmitRef]   = React.useState(null);
  const [honey, setHoney] = React.useState(""); // anti-bot honeypot — humans never fill this

  // Submit pipeline (in order):
  //   1) POST to Supabase REST API (durable storage, queryable later)
  //   2) Fire-and-forget POST to notifyWebhook (Slack/n8n/Make for instant alerts)
  //   3) If both fail, open mailto fallback so the lead still reaches us
  // This guarantees zero lost leads in any failure mode.
  const handleSubmit = async () => {
    if (submitting) return;
    // Honeypot trip: bot detected, silently fake-success without sending anything
    if (honey) {
      setSubmitMode("supabase");
      setSubmitRef("FILTERED");
      setSubmitted(true);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);

    const interestLabel = (interests.find(x => x.k === data.interest) || {}).t || data.interest;
    const payload = {
      name:           data.name,
      email:          data.email,
      phone:          data.phone || null,
      company:        data.company,
      company_size:   data.size,
      role:           data.role,
      interest_code:  data.interest,
      interest_label: interestLabel,
      notes:          data.notes || null,
      source:         "website",
      page:           `${LANG_BASE}/contact`,
      user_agent:     navigator.userAgent,
      submitted_at:   new Date().toISOString(),
    };

    const cfg = window.WIR_CONFIG || {};
    let supabaseOk = false;

    // Step 1 · Supabase REST insert
    if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
      try {
        const res = await fetch(`${cfg.supabaseUrl}/rest/v1/${cfg.leadsTable || "leads"}`, {
          method: "POST",
          headers: {
            "Content-Type":  "application/json",
            "apikey":        cfg.supabaseAnonKey,
            "Authorization": `Bearer ${cfg.supabaseAnonKey}`,
            "Prefer":        "return=minimal",
          },
          body: JSON.stringify(payload),
        });
        supabaseOk = res.ok;
        if (!res.ok) console.warn("Supabase lead insert failed", res.status, await res.text());
      } catch (e) {
        console.warn("Supabase lead insert threw", e);
      }
    }

    // Step 2 · Webhook (fire and forget — automation: Slack/n8n/Make/Zapier)
    if (cfg.notifyWebhook) {
      fetch(cfg.notifyWebhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "no-cors", // tolerate cross-origin webhooks (Slack, Make, etc.)
      }).catch(() => {});
    }

    // Step 3 · mailto fallback if Supabase didn't accept the insert
    let mailtoTriggered = false;
    if (!supabaseOk) {
      const subject = T.mailtoSubject(data.name, data.company);
      const body = T.mailtoBody(data, interestLabel);
      try {
        window.location.href = `mailto:nicholas@wirinnovation.ai?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        mailtoTriggered = true;
      } catch (e) {
        console.warn("mailto fallback failed", e);
      }
    }

    // Generate stable ref number (one per submission)
    const ref = (typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, "").slice(0, 8)
      : Math.random().toString(36).slice(2, 10)
    ).toUpperCase();

    setSubmitRef(ref);
    setSubmitMode(supabaseOk ? "supabase" : (mailtoTriggered ? "mailto" : "error"));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    const firstName = data.name.split(" ")[0] || T.nameFallback;
    let eyebrow, title, body;

    if (submitMode === "supabase") {
      eyebrow = T.doneOkEyebrow;
      title   = T.doneOkTitle(firstName);
      body    = (
        <>
          <p className="ctform__done-lede">{T.doneOkBody1}</p>
          <p className="ctform__done-lede" style={{marginTop: 16}}>{T.doneOkBody2(NICHOLAS_MAILTO)}</p>
        </>
      );
    } else if (submitMode === "mailto") {
      eyebrow = T.doneMailEyebrow;
      title   = T.doneMailTitle(firstName);
      body    = (
        <>
          <p className="ctform__done-lede">{T.doneMailBody1}</p>
          <p className="ctform__done-lede" style={{marginTop: 16}}>{T.doneMailBody2(NICHOLAS_MAILTO)}</p>
        </>
      );
    } else {
      eyebrow = T.doneErrEyebrow;
      title   = T.doneErrTitle;
      body    = (
        <>
          <p className="ctform__done-lede">{T.doneErrBody(NICHOLAS_MAILTO)}</p>
        </>
      );
    }

    return (
      <section className="ctform" data-reveal>
        <div className="wrap">
          <div className="ctform__done">
            <div className="eyebrow">{eyebrow}</div>
            <h2 className="display ctform__done-title">{title}</h2>
            {body}
            <div className="ctform__done-ref num">· Ref #{submitRef}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="ctform" data-reveal>
      <div className="wrap">
        {/* Honeypot — humans never see/fill this; bots auto-fill all inputs */}
        <input type="text" name="company_url" tabIndex="-1" autoComplete="off"
          value={honey} onChange={(e) => setHoney(e.target.value)}
          aria-hidden="true"
          style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}/>
        <div className="ctform__head">
          <div className="eyebrow">{T.formEyebrow}</div>
          <div className="ctform__steps">
            {T.steps.map((s,i) => (
              <div key={i} className={"ctform__step" + (i === step ? " is-active" : "") + (i < step ? " is-done" : "")}>
                <span className="num">0{i+1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {step === 0 && (
          <div className="ctform__panel">
            <h2 className="display ctform__panel-title">{T.step0Title}</h2>
            <div className="ctform__options">
              {interests.map(x => (
                <button key={x.k}
                  className={"ctform__opt" + (data.interest === x.k ? " is-sel" : "")}
                  onClick={()=>update("interest", x.k)}
                  style={{"--c": x.c}}>
                  <span className="ctform__opt-k display">{x.k === "explore" ? "···" : x.k}</span>
                  <span className="ctform__opt-t">{x.t}</span>
                  <span className="ctform__opt-d">{x.d}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="ctform__panel">
            <h2 className="display ctform__panel-title">{T.step1Title}</h2>
            <div className="ctform__fields">
              <label className="ctform__field">
                <span>{T.fRole}</span>
                <select value={data.role} onChange={(e)=>update("role", e.target.value)}>
                  <option value="">{T.fSelect}</option>
                  {roles.map(r => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label className="ctform__field">
                <span>{T.fCompany}</span>
                <input type="text" value={data.company} onChange={(e)=>update("company", e.target.value)} placeholder={T.fCompanyPh}/>
              </label>
              <label className="ctform__field ctform__field--full">
                <span>{T.fSize}</span>
                <div className="ctform__chips">
                  {sizes.map(s => (
                    <button key={s} type="button"
                      className={"ctform__chip" + (data.size === s ? " is-sel" : "")}
                      onClick={()=>update("size", s)}>{s}</button>
                  ))}
                </div>
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="ctform__panel">
            <h2 className="display ctform__panel-title">{T.step2Title}</h2>
            <div className="ctform__fields">
              <label className="ctform__field">
                <span>{T.fName}</span>
                <input type="text" value={data.name} onChange={(e)=>update("name", e.target.value)} placeholder={T.fNamePh}/>
              </label>
              <label className="ctform__field">
                <span>{T.fEmail}</span>
                <input type="email" value={data.email} onChange={(e)=>update("email", e.target.value)} placeholder={T.fEmailPh}/>
              </label>
              <label className="ctform__field">
                <span>{T.fPhone}</span>
                <input type="tel" value={data.phone} onChange={(e)=>update("phone", e.target.value)} placeholder={T.fPhonePh}/>
              </label>
              <label className="ctform__field ctform__field--full">
                <span>{T.fNotes}</span>
                <textarea rows="4" value={data.notes} onChange={(e)=>update("notes", e.target.value)}
                  placeholder={T.fNotesPh}/>
              </label>
            </div>
          </div>
        )}

        <div className="ctform__nav">
          <button className="btn btn--ghost"
            onClick={()=>setStep(s => Math.max(0, s-1))}
            disabled={step === 0}>
            <span className="btn__arrow">←</span> {T.navBack}
          </button>
          <div className="ctform__nav-meta">{T.navStep(step+1)} · {canNext() ? T.navReady : T.navIncomplete}</div>
          {step < 2 ? (
            <button className="btn btn--solid" disabled={!canNext()} onClick={()=>setStep(s => s+1)}>
              {T.navContinue} <span className="btn__arrow">→</span>
            </button>
          ) : (
            <button className="btn btn--solid" disabled={!canNext() || submitting} onClick={handleSubmit}>
              {submitting ? T.navSending : T.navSubmit} <span className="btn__arrow">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ContactQuickChannels() {
  const [email, setEmail] = React.useState("");
  const [honey, setHoney] = React.useState(""); // anti-bot honeypot
  const [newsState, setNewsState] = React.useState("idle"); // idle | sending | done | error
  const waNumber = "5511981757505"; // Nicholas Weiser · BR
  const waText = encodeURIComponent(T.waText);
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitNewsletter = async (e) => {
    e.preventDefault();
    if (honey) return; // bot trap
    if (!validEmail) return;
    setNewsState("sending");

    const cfg = window.WIR_CONFIG || {};
    const payload = { email, source: "website", page: `${LANG_BASE}/contact`, submitted_at: new Date().toISOString() };
    let ok = false;

    if (cfg.supabaseUrl && cfg.supabaseAnonKey) {
      try {
        const res = await fetch(`${cfg.supabaseUrl}/rest/v1/${cfg.newsletterTable || "newsletter_subs"}`, {
          method: "POST",
          headers: {
            "Content-Type":  "application/json",
            "apikey":        cfg.supabaseAnonKey,
            "Authorization": `Bearer ${cfg.supabaseAnonKey}`,
            "Prefer":        "return=minimal",
          },
          body: JSON.stringify(payload),
        });
        // 201 = created · 409 = duplicate email (already subscribed) — both count as success
        ok = res.ok || res.status === 409;
      } catch (err) {
        console.warn("Newsletter insert failed", err);
      }
    }

    if (ok) {
      setNewsState("done");
      setEmail("");
    } else {
      // Fallback to mailto so signup still reaches us
      const href = `mailto:nicholas@wirinnovation.ai?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent(T.newsMailtoBody + email)}`;
      window.location.href = href;
      setNewsState("error");
    }
  };

  return (
    <section className="ctquick">
      <div className="wrap">
        <div className="ctquick__grid">
          <a className="ctquick__card ctquick__card--wa" href={waHref} target="_blank" rel="noopener noreferrer">
            <div className="ctquick__k">{T.waK}</div>
            <div className="ctquick__t display">{T.waT}</div>
            <div className="ctquick__d">{T.waD}</div>
            <span className="ctquick__cta">{T.waCta} <span className="btn__arrow">→</span></span>
          </a>
          <form className="ctquick__card ctquick__card--news" onSubmit={submitNewsletter}>
            <input type="text" name="company_url" tabIndex="-1" autoComplete="off"
              value={honey} onChange={(e) => setHoney(e.target.value)}
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}/>
            <div className="ctquick__k">{T.newsK}</div>
            <div className="ctquick__t display">{T.newsT}</div>
            <div className="ctquick__d">{T.newsD}</div>
            {newsState === "done" ? (
              <div className="ctquick__news-done">
                {T.newsDone}
              </div>
            ) : (
              <div className="ctquick__form">
                <input type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={T.newsPh} aria-label={T.newsAria}
                  disabled={newsState === "sending"}/>
                <button type="submit" className="ctquick__news-btn" disabled={!validEmail || newsState === "sending"}>
                  {newsState === "sending" ? T.newsSending : T.newsBtn} <span className="btn__arrow">→</span>
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactSocial() {
  const channels = [
    { k:"LinkedIn",  v:"@wir-innovation",          href:"https://www.linkedin.com/company/wir-innovation/" },
    { k:"Instagram", v:"@wirinnovation",           href:"https://www.instagram.com/wirinnovation" },
    { k:"X",         v:"@wirinnovationai",         href:"https://x.com/wirinnovationai" },
    { k:"E-mail",    v:"nicholas@wirinnovation.ai", href:"mailto:nicholas@wirinnovation.ai" },
  ];
  return (
    <section className="ctsocial" data-reveal>
      <div className="wrap">
        <div className="ctsocial__head">
          <div className="eyebrow">{T.socialEyebrow}</div>
          <h2 className="display ctsocial__title">{T.socialTitle}</h2>
        </div>
        <div className="ctsocial__grid">
          {channels.map((c,i) => (
            <a key={i} className="ctsocial__card" href={c.href} target="_blank" rel="noopener noreferrer">
              <div className="ctsocial__k">· {c.k}</div>
              <div className="ctsocial__v display">{c.v}</div>
              <span className="ctsocial__arrow" aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactPage() {
  useReveal();
  return (
    <>
      <ContactHero/>
      <ContactQuickChannels/>
      <ContactForm/>
      <ContactSocial/>
    </>
  );
}
