import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';

/* ───────── Contato · humano + steps ───────── */

function ContactClocks() {
  const [now, setNow] = React.useState(new Date());
  React.useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const offices = [
    { city:"São Paulo",      tz:"America/Sao_Paulo",     addr:"Av. Faria Lima, 3500 · 18º" },
    { city:"Silicon Valley", tz:"America/Los_Angeles",   addr:"California · EUA"           },
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
          <span>· Falar com nossos sócios</span>
          <span>· Resposta em até 24h úteis</span>
          <span>· Conversa estratégica · não comercial</span>
        </div>
        <div className="cthero__grid">
          <div>
            <div className="eyebrow">· Próxima conversa</div>
            <h1 className="display cthero__title">
              Vamos conversar<br/>
              sobre como <em>escalar<br/>
              o seu negócio?</em>
            </h1>
            <p className="cthero__lede">
              Cada seguradora opera diferente. Em uma conversa de 30 min com nossos sócios, calibramos o que faz sentido para a sua realidade — volume, custo atual, apetite e estrutura — e desenhamos juntos se um projeto de implementação se justifica.
            </p>
            <div className="cthero__founders">
              <div className="cthero__founder">
                <div className="cthero__founder-photo" style={{backgroundImage:"url(assets/team/nicholas.jpg)"}}/>
                <div className="cthero__founder-body">
                  <div className="cthero__founder-name">
                    <b>Nicholas Weiser</b>
                    <a href="https://www.linkedin.com/in/nicholas-weiser/" target="_blank" rel="noopener noreferrer"
                       className="cthero__founder-li" aria-label="Nicholas Weiser no LinkedIn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                      </svg>
                    </a>
                  </div>
                  <span>CEO · Co-Founder</span>
                </div>
              </div>
              <div className="cthero__founder">
                <div className="cthero__founder-photo" style={{backgroundImage:"url(assets/team/jose-carlos.jpg)"}}/>
                <div className="cthero__founder-body">
                  <div className="cthero__founder-name">
                    <b>José Carlos de Paula</b>
                    <a href="https://www.linkedin.com/in/jose-carlos-de-paula-14407b7a/" target="_blank" rel="noopener noreferrer"
                       className="cthero__founder-li" aria-label="José Carlos de Paula no LinkedIn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 110-4.13 2.07 2.07 0 010 4.13zm1.78 13.02H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/>
                      </svg>
                    </a>
                  </div>
                  <span>CSO · Co-Founder</span>
                </div>
              </div>
              <div className="cthero__founders-note">Você vai falar com um de nós.</div>
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

  const interests = [
    { k:"SS", t:"Smart Sales",          d:"Distribuição + lead scoring",   c:"#1C17FF" },
    { k:"UI",  t:"Underwriter Intelligence", d:"Subscrição inteligente",       c:"#A44F98" },
  ];
  const roles = [
    "C-level (CEO / COO / CIO)",
    "Head de Subscrição",
    "Head de TI / Arquitetura",
    "Head de Distribuição",
    "Gerente de produto",
    "Consultor / advisory",
    "Outro",
  ];
  const sizes = [
    "MGA (até R$ 200M prêmio)",
    "Seguradora média (R$ 200M – R$ 2B)",
    "Tier-1 (R$ 2B+)",
    "Resseguradora",
    "Corretora corporativa",
    "Outro",
  ];

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
      page:           "/contact",
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
      const subject = `[WIR · novo contato] ${data.name} · ${data.company}`;
      const body =
`Nome: ${data.name}
E-mail: ${data.email}
Telefone: ${data.phone || "—"}

Empresa: ${data.company}
Porte: ${data.size}
Papel: ${data.role}

Interesse: ${interestLabel} (${data.interest})

Contexto:
${data.notes || "(sem contexto adicional)"}

—
Enviado pelo formulário do site wirinnovation.ai`;
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
    const firstName = data.name.split(" ")[0] || "pessoal";
    let eyebrow, title, body;

    if (submitMode === "supabase") {
      eyebrow = "· Recebido";
      title   = <>Obrigado, <em>{firstName}.</em></>;
      body    = (
        <>
          <p className="ctform__done-lede">
            Recebemos sua mensagem. Nossa equipe responde em até <b>24h úteis</b> com 2 ou 3 horários para conversar com nossos sócios.
          </p>
          <p className="ctform__done-lede" style={{marginTop: 16}}>
            Se precisar adiantar algo, escreva para <a href="mailto:nicholas@wirinnovation.ai" style={{color: "var(--wir-purple)", textDecoration: "underline"}}>nicholas@wirinnovation.ai</a> citando a Ref abaixo.
          </p>
        </>
      );
    } else if (submitMode === "mailto") {
      eyebrow = "· Confirme o envio";
      title   = <>Quase lá, <em>{firstName}.</em></>;
      body    = (
        <>
          <p className="ctform__done-lede">
            Seu cliente de e-mail abriu uma mensagem pré-preenchida para <b>nicholas@wirinnovation.ai</b>. <b>Confirme o envio</b> e respondemos em até 24h úteis com 2 ou 3 horários.
          </p>
          <p className="ctform__done-lede" style={{marginTop: 16}}>
            Caso o e-mail não tenha aberto, escreva direto para <a href="mailto:nicholas@wirinnovation.ai" style={{color: "var(--wir-purple)", textDecoration: "underline"}}>nicholas@wirinnovation.ai</a>.
          </p>
        </>
      );
    } else {
      eyebrow = "· Ops, falha no envio";
      title   = <>Não conseguimos enviar.</>;
      body    = (
        <>
          <p className="ctform__done-lede">
            O envio automático falhou. Por favor escreva direto para <a href="mailto:nicholas@wirinnovation.ai" style={{color: "var(--wir-purple)", textDecoration: "underline"}}>nicholas@wirinnovation.ai</a> citando a Ref abaixo — respondemos em até 24h úteis.
          </p>
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
          <div className="eyebrow">· Preencha em 2 minutos</div>
          <div className="ctform__steps">
            {["Interesse","Contexto","Você"].map((s,i) => (
              <div key={i} className={"ctform__step" + (i === step ? " is-active" : "") + (i < step ? " is-done" : "")}>
                <span className="num">0{i+1}</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {step === 0 && (
          <div className="ctform__panel">
            <h2 className="display ctform__panel-title">Por qual produto <em>você começaria?</em></h2>
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
            <h2 className="display ctform__panel-title">Conte um pouco do <em>contexto.</em></h2>
            <div className="ctform__fields">
              <label className="ctform__field">
                <span>Seu papel na empresa</span>
                <select value={data.role} onChange={(e)=>update("role", e.target.value)}>
                  <option value="">Selecione…</option>
                  {roles.map(r => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label className="ctform__field">
                <span>Nome da empresa</span>
                <input type="text" value={data.company} onChange={(e)=>update("company", e.target.value)} placeholder="Ex: Mahway Seguros"/>
              </label>
              <label className="ctform__field ctform__field--full">
                <span>Porte</span>
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
            <h2 className="display ctform__panel-title">Como te <em>chamamos?</em></h2>
            <div className="ctform__fields">
              <label className="ctform__field">
                <span>Nome completo</span>
                <input type="text" value={data.name} onChange={(e)=>update("name", e.target.value)} placeholder="Ana Paula Silva"/>
              </label>
              <label className="ctform__field">
                <span>E-mail corporativo</span>
                <input type="email" value={data.email} onChange={(e)=>update("email", e.target.value)} placeholder="ana@empresa.com"/>
              </label>
              <label className="ctform__field">
                <span>Telefone · opcional</span>
                <input type="tel" value={data.phone} onChange={(e)=>update("phone", e.target.value)} placeholder="(11) 99999-9999"/>
              </label>
              <label className="ctform__field ctform__field--full">
                <span>O que está acontecendo aí? · opcional</span>
                <textarea rows="4" value={data.notes} onChange={(e)=>update("notes", e.target.value)}
                  placeholder="Qual é o problema concreto de hoje? (ex: levamos 6 semanas para cotar comercial…)"/>
              </label>
            </div>
          </div>
        )}

        <div className="ctform__nav">
          <button className="btn btn--ghost"
            onClick={()=>setStep(s => Math.max(0, s-1))}
            disabled={step === 0}>
            <span className="btn__arrow">←</span> Voltar
          </button>
          <div className="ctform__nav-meta">Passo {step+1} de 3 · {canNext() ? "pronto para avançar" : "complete os campos obrigatórios"}</div>
          {step < 2 ? (
            <button className="btn btn--solid" disabled={!canNext()} onClick={()=>setStep(s => s+1)}>
              Continuar <span className="btn__arrow">→</span>
            </button>
          ) : (
            <button className="btn btn--solid" disabled={!canNext() || submitting} onClick={handleSubmit}>
              {submitting ? "Enviando…" : "Enviar pedido"} <span className="btn__arrow">→</span>
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
  const waText = encodeURIComponent("Olá Nicholas, vim pelo site da WIR Innovation. Gostaria de conversar sobre…");
  const waHref = `https://wa.me/${waNumber}?text=${waText}`;

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const submitNewsletter = async (e) => {
    e.preventDefault();
    if (honey) return; // bot trap
    if (!validEmail) return;
    setNewsState("sending");

    const cfg = window.WIR_CONFIG || {};
    const payload = { email, source: "website", page: "/contact", submitted_at: new Date().toISOString() };
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
      const href = `mailto:nicholas@wirinnovation.ai?subject=${encodeURIComponent("Newsletter signup")}&body=${encodeURIComponent("Inscreva-me na newsletter da WIR Innovation.\n\nE-mail: " + email)}`;
      window.location.href = href;
      setNewsState("error");
    }
  };

  return (
    <section className="ctquick">
      <div className="wrap">
        <div className="ctquick__grid">
          <a className="ctquick__card ctquick__card--wa" href={waHref} target="_blank" rel="noopener noreferrer">
            <div className="ctquick__k">· WhatsApp direto</div>
            <div className="ctquick__t display">Falar agora<br/><em>com Nicholas.</em></div>
            <div className="ctquick__d">Resposta rápida pelo celular do nosso CEO. Para quem prefere conversa imediata em vez de formulário.</div>
            <span className="ctquick__cta">Abrir conversa <span className="btn__arrow">→</span></span>
          </a>
          <form className="ctquick__card ctquick__card--news" onSubmit={submitNewsletter}>
            <input type="text" name="company_url" tabIndex="-1" autoComplete="off"
              value={honey} onChange={(e) => setHoney(e.target.value)}
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0, pointerEvents: "none" }}/>
            <div className="ctquick__k">· Newsletter</div>
            <div className="ctquick__t display">Receba o que <em>publicamos.</em></div>
            <div className="ctquick__d">Análises sobre IA aplicada ao setor segurador. Sem spam, sem agenda comercial — só o que produzimos de conteúdo.</div>
            {newsState === "done" ? (
              <div className="ctquick__news-done">
                ✓ Inscrição recebida. Você receberá os próximos Insights.
              </div>
            ) : (
              <div className="ctquick__form">
                <input type="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com" aria-label="Seu e-mail"
                  disabled={newsState === "sending"}/>
                <button type="submit" className="ctquick__news-btn" disabled={!validEmail || newsState === "sending"}>
                  {newsState === "sending" ? "Enviando…" : "Inscrever"} <span className="btn__arrow">→</span>
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
          <div className="eyebrow">· Outros canais</div>
          <h2 className="display ctsocial__title">Acompanhe a WIR<br/><em>nas nossas redes.</em></h2>
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

