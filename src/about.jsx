import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';
import { LANG } from './i18n.js';

/* ───────── Sobre · ensayo editorial ───────── */

const T = {
  pt: {
    heroMeta: ["· Sobre a WIR Innovation", "· Plataforma de IA · Mercado segurador", "· Sócios e Conselheiros World Class"],
    heroEyebrow: "· WIR significa “Nós”",
    heroTitle: <>Construímos a <em>plataforma</em> que proporciona mais <em>eficiência</em> e permite <em>escalar operações em seguros.</em></>,
    heroLede: "Não somos apenas uma empresa de tecnologia. Somos uma empresa nativa em IA aplicada a negócios — fundada por sócios apaixonados por entregar resultados transformacionais ao mercado de seguros e saúde.",
    essayEyebrow: "· O ensaio",
    essayPullquote: <>"Não se resolve o seguro com <em>mais software</em>. Resolve-se com a <em>plataforma</em> certa."</>,
    essayParas: [
      { k: "A tese",     text: "O mercado de Seguros e Danos cresce dois dígitos ao ano — mas a estrutura das empresas não acompanha esta aceleração. Corretoras emitem PDFs. Underwriters rabiscam planilhas. Comitês se reúnem para decidir sobre riscos que o cliente já esqueceu. A fricção é tão grande que virou aceitável — e é exatamente essa normalização que cria espaço para uma nova camada de inteligência." },
      { k: "A decisão",  text: "Em 2026, depois de décadas operando dentro de seguradoras e corretoras Tier-1, decidimos parar de reclamar da infraestrutura e construir uma nova. Não um SaaS a mais. Não um chatbot. Uma plataforma de IA auditável que opera dentro dos sistemas que já existem e devolve, em minutos, o que antes levava semanas." },
      { k: "O método",   text: "Reunimos sócios C-Level de seguradoras e corretoras nacionais e internacionais, sócios de fundos de Private Equity e o ecossistema global de tecnologia da Mahway (California). Underwriters, atuários e engenheiros de ML lado a lado. A combinação é pouco comum no setor — é exatamente isso que permite construir produtos que funcionam em produção, não em slide." },
      { k: "A promessa", text: "Seguro é, no fim, um contrato sobre decisões difíceis tomadas sob pressão. O papel da WIR não é remover o humano do processo — é devolver ao humano o que só ele pode fazer: julgamento. Tudo o mais — intake, enriquecimento, scoring, subscrição — deve ser automático, auditável e rápido o suficiente para que a decisão chegue enquanto o cliente ainda está na linha." },
    ],
    timeEyebrow: "· Linha do tempo",
    timeTitle: <>Três momentos.<br/><em>Uma trajetória.</em></>,
    moments: [
      { k:"Origem",   y:"+ 30 anos",         t:"De experiência somada",
        d:"Sócios C-Level de seguradoras e corretoras Tier-1, fundos de Private Equity e Venture Builder global. A WIR não nasceu como um experimento — nasceu da experiência operacional acumulada." },
      { k:"Fundação", y:"2026",              t:"WIR é fundada · POC em execução",
        d:"Founders se unem entre São Paulo e Silicon Valley com Mahway (Venture Builder · California) e Avante (Venture Studio · Brasil). Primeiro POC com seguradora global no ramo de Transportes." },
      { k:"Ambição",  y:"+ Próxima década",  t:"A camada de IA do seguro brasileiro",
        d:"Construímos a plataforma de IA que o mercado segurador nunca teve — para que executar inovação não seja uma exceção, mas a operação padrão das seguradoras Tier-1 da região." },
    ],
    teamEyebrow: "· Sócios & Co-Founders",
    teamTitle: <>Construído <em>por dentro</em><br/>do setor.</>,
    advisorsEyebrow: "· Sócios & Conselheiros Estratégicos",
    advisorsNote: "Mahway (California, EUA) · Avante (Brasil)",
    founders: [
      { name:"Nicholas Weiser", role:"CEO · Co-Founder",
        photo:"/assets/team/nicholas.jpg", loc:"São Paulo · Silicon Valley",
        bullets:[
          "Empreendedor e investidor em 5 startups de sucesso",
          "27 anos de experiência em empresas nacionais e globais",
          "Acionista e Co-Fundador de seguradora com receita de R$ 1 bi em 4 anos",
          "Ex C-Level e acionista de corretoras, seguradora e InsurTech",
          "Liderou 4 reestruturações de corretoras nacionais e internacionais",
          "Especialista em inovação e estruturação de negócios complexos",
        ] },
      { name:"José Carlos de Paula", role:"CSO / COO · Co-Founder",
        photo:"/assets/team/jose-carlos.jpg", loc:"São Paulo",
        bullets:[
          "30 anos de experiência em Seguros e Saúde",
          "C-Level em Seguradoras e Operadoras de Saúde",
          "Liderou transformação digital na GNDI e Santander Corretora",
          "Atuou na consolidação de 35 M&As em Saúde",
          "CEO da Santander Corretora, C-Level do GNDI / Bain Capital e da Holding Athena Saúde / Pátria Investimentos",
          "Forte atuação em inovação e transformação de negócios",
        ] },
    ],
    partners: [
      { name:"Felipe Moraes", role:"Sócio & Co-Fundador Avante · Conselheiro WIR",
        photo:"/assets/team/felipe.jpg", group:"Avante",
        bullets:[
          "Ex-Managing Partner Innova Capital — Case Moville / iFood",
          "20+ anos em finanças, VC e mercados de capitais no Brasil",
          "R$ 1,6 bi em investimentos com EXITs de sucesso (Sigga, Accera, Tradeforce)",
          "Co-fundador e CEO da Bamboo DCM, plataforma AI-native de debt capital markets",
          "Investidor e Mentor na Endeavor",
        ] },
      { name:"Amanda Pinheiro", role:"Sócia & Co-Fundadora Avante",
        photo:"/assets/team/amanda.jpg", group:"Avante",
        bullets:[
          "14+ anos em gestão de fundos e mercados financeiros no Brasil",
          "Especialista em Private Equity e Venture Capital em empresas tech",
          "C-Level na Innova Capital e Unbox Capital",
          "Liderou R$ 2,6 bi em investimentos em mais de 20 empresas",
        ] },
      { name:"Jess Mah", role:"Sócia & Co-Founder · Mahway",
        photo:"/assets/team/jess.jpg", group:"Mahway",
        bullets:[
          "Forbes 30 Under 30 · Inc. Magazine Most Creative in Business",
          "Mais jovem mulher aceita no Y Combinator (2010)",
          "Fundou e escalou a indinero (fintech) por mais de 10 anos",
          "Graduada Harvard Business School Presidents' Program",
          "Portfólio Mahway: empresas avaliadas em centenas de milhões de USD",
        ] },
      { name:"Andrea Barrica", role:"Sócia & Co-Founder · Mahway",
        photo:"/assets/team/andrea.jpg", group:"Mahway",
        bullets:[
          "Ex-Venture Partner da 500 Startups (500 Global)",
          "Apoiou 100+ startups · ajudou a captar mais de USD 100M",
          "Co-fundadora da indinero (Y Combinator backed)",
          "Serial founder e investidora em fintech, insurtech e AI",
          "Referência global em estratégia de go-to-market para tech startups",
        ] },
    ],
    techEyebrow: "· Time TECH & IA",
    techTitle: <>Estrutura de engenharia<br/><em>World Class</em> desde o dia zero.</>,
    techSub: "A WIR opera com um time enxuto de engenharia núcleo no Brasil, sustentado pela infraestrutura global de Tech & IA da Mahway — a mesma que impulsiona algumas das maiores empresas de tecnologia do mundo.",
    techStats: [
      { v:"1 + 3", l:"CTO + 3 engenheiros núcleo",
        d:"Engenharia Brasil · arquitetura, ML aplicado, integrações com core de apólice e observabilidade em produção." },
      { v:"+ Mahway", l:"Pipeline global de talento",
        d:"Acesso direto a desenvolvedores, modelos de IA e práticas de ponta da Mahway (California, EUA) — escalamos o time de engenharia sem fricção de recrutamento local." },
      { v:"À prova do futuro", l:"Operação que evolui com o setor",
        d:"Modelos versionados, observabilidade contínua e arquitetura preparada para novas regulamentações e novos canais — sem refazer o stack." },
    ],
    techFoot: <>A combinação <b>WIR (expertise em seguros) + Avante (governança) + Mahway (Tech & IA global)</b> é o que nos posiciona em outro patamar — entregamos plataforma enterprise, segurança operacional e velocidade de startup nativa em IA, em um único parceiro.</>,
    partEyebrow: "· Sócios & Conselheiros Estratégicos",
    partTitle: <>A <em>holding</em> que potencializa<br/>a <em>WIR Innovation.</em></>,
    partSub: "A WIR não opera sozinha. Foi co-criada e é sustentada por uma estrutura de sócios, investidores e venture builder global que multiplica nossa capacidade de entrega ao cliente.",
    mahwayTag: "Tech & IA World Class · California, EUA",
    mahwayP: <>Venture Builder Mahway investidora da WIR, com a mesma infraestrutura de IA que impulsiona algumas das maiores empresas de tecnologia do mundo. Acesso direto aos melhores desenvolvedores, modelos de IA e práticas de ponta — escala global sem fricção. <b>Mahway co-funda, co-constrói e opera empresas de tecnologia de alto impacto lado a lado com os fundadores</b>, da ideia ao scale.</>,
    mahwayMeta: ["· Co-funding", "· Co-building", "· Talent pipeline", "· Go-to-market USA"],
    avanteTag: "Holding de IA Estratégica · Brasil",
    avanteP: <>A AVANTE é a <b>holding de IA co-fundadora da WIR</b>. Gerida por sócios com histórico comprovado em Venture Capital, Private Equity e mercado de capitais no Brasil, garante que a WIR cresça com segurança regulatória, compliance, previsibilidade financeira e capacidade de reinvestimento contínuo. Portfolio em InsurTech, legal claims e soluções service-driven AI-first.</>,
    avanteMeta: ["· Governança", "· Solidez financeira", "· Compliance regulatório", "· LatAm"],
    partFoot: <>O resultado para o cliente: <b>conhecimento profundo do mercado segurador, solidez financeira de longo prazo e nível World Class em tecnologia e IA</b> — em um único parceiro.</>,
    valsEyebrow: "· Princípios",
    valsTitle: <>Seis princípios.<br/><em>Nenhum negociável.</em></>,
    vals: [
      { k:"01", t:"Resultado antes de tecnologia",
        d:"Não vendemos IA — vendemos resultado de negócio. Cada produto da WIR é avaliado pelo impacto real que entrega ao P&L do cliente, não pela sofisticação técnica.", c:"#3222E9" },
      { k:"02", t:"Plataforma, não SaaS",
        d:"Um SaaS resolve uma feature. Uma plataforma sustenta uma operação inteira. A WIR foi desenhada para ser a camada de IA que escala com o cliente — durante anos, não trimestres.", c:"#AE46C0" },
      { k:"03", t:"Plug-and-play sem TI",
        d:"O cliente não troca o core, não enfrenta projeto pesado de TI, não migra dado. A WIR opera como camada de IA entre os sistemas que já existem — em semanas, não em anos.", c:"#FE8B77" },
      { k:"04", t:"Auditabilidade como fundação",
        d:"Nenhuma decisão sai sem trilha completa: modelo, versão, confiança, inputs, timestamp. LGPD-ready, exportável, imutável. Compliance não é feature — é a arquitetura.", c:"#F8AD39" },
      { k:"05", t:"Humano no comando do julgamento",
        d:"IA que decide risco crítico sem supervisão é problema. A WIR libera o underwriter para fazer o que só ele faz — analisar e subscrever risco — automatizando tudo o que vem antes.", c:"#7540AC" },
      { k:"06", t:"World Class por design",
        d:"Construímos com a infraestrutura global de IA da Mahway, governança financeira da Avante e expertise C-Level em seguros. O cliente recebe nível enterprise desde o dia um.", c:"#FE8B77" },
    ],
    faqEyebrow: "· Perguntas frequentes",
    faqTitle: <>O que as equipes de TI e risco <em>sempre perguntam.</em></>,
    faqs: [
      { q:"A WIR substitui meu core de apólices ou meu sistema atual?",
        a:"Não. A WIR é uma camada de IA que opera entre os seus canais de cotação e o seu core de apólice. Escutamos inputs, aplicamos modelos calibrados ao seu apetite, e devolvemos resultados estruturados via API/webhook ao seu sistema de registro. O core continua sendo o seu — a WIR adiciona a inteligência por cima." },
      { q:"Quanto tempo até a primeira operação em produção?",
        a:"O projeto de implementação leva de 3 a 12 meses dependendo de escopo, integração com seu core e maturidade do manual de subscrição. Trabalhamos com escopo, prazo e preço fechados antes de começar — sem free pilot, sem surprise billing." },
      { q:"Como funciona a supervisão humana e a trilha de auditoria?",
        a:"Toda decisão produzida pela WIR carrega: modelo usado, versão do modelo, score de confiança, inputs, output, timestamp. Quando configurado, casos fora do apetite ou de baixa confiança vão automaticamente para revisão humana. O log é imutável e exportável — LGPD-ready desde a concepção, com arquitetura preparada para ISO 27001 e padrões internacionais." },
      { q:"Vocês podem hospedar em private cloud ou on-premise?",
        a:"Sim. Operamos em SaaS multi-tenant (padrão), private cloud (AWS / Azure / GCP no ambiente do cliente) ou on-premise atrás do seu firewall. Deploy, observabilidade e secrets management ficam sob o seu controle quando necessário pelo regulatório." },
      { q:"Como vocês garantem qualidade técnica e capacidade de evolução?",
        a:"Engenharia núcleo no Brasil (CTO + 3 engineers), sustentada pelo pipeline global de talento e infraestrutura de IA da Mahway (California, EUA) — a mesma que impulsiona algumas das maiores empresas de tech do mundo. Modelos versionados, observabilidade contínua e arquitetura preparada para evoluir com o setor." },
      { q:"Como é estruturado o pricing?",
        a:"Duas fases. Implementação: projeto com escopo fechado, 3 a 12 meses, preço único acordado antes de começar. SaaS pós go-live: cobrança calibrada ao volume de decisões processadas, sem taxa fixa, sem surprise billing. Cada simulação é feita sobre os dados reais do cliente — não prometemos números genéricos." },
      { q:"Quais ramos de seguro vocês cobrem?",
        a:"SS e UI estão em produção para subscrição comercial — começamos por ramos onde a fricção operacional do underwriter é maior (Transportes, Riscos de Engenharia, P&C corporativo). XBA (cross-sell) e SNB (new business) estão em desenvolvimento. Não trabalhamos com seguro residencial massificado." },
    ],
    closeEyebrow: "· Vem construir",
    closeTitle: <>Estamos <em>contratando.</em></>,
    closeLede: "Engineering, ML, delivery e GTM. Posições remotas, SP, NYC e Silicon Valley. Se você já operou seguro por dentro ou construiu plataforma regulada em outro setor — temos cadeira aberta.",
    closeCv: "Enviar currículo",
    closeCvHref: "mailto:contato@wirinnovation.ai?subject=Interesse%20em%20carreira%20WIR%20Innovation&body=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20oportunidades%20na%20WIR%20Innovation.",
    closeTalk: "Falar com a equipe",
  },
  en: {
    heroMeta: ["· About WIR Innovation", "· AI platform · Insurance market", "· World-class partners & advisors"],
    heroEyebrow: "· WIR means “We”",
    heroTitle: <>We build the <em>platform</em> that delivers more <em>efficiency</em> and makes it possible to <em>scale insurance operations.</em></>,
    heroLede: "We're not just a technology company. We're an AI-native company applied to business — founded by partners passionate about delivering transformational results to the insurance and health markets.",
    essayEyebrow: "· The essay",
    essayPullquote: <>"You don't fix insurance with <em>more software</em>. You fix it with the right <em>platform</em>."</>,
    essayParas: [
      { k: "The thesis",   text: "The Property & Casualty market grows double digits a year — but companies' structures aren't keeping up. Brokerages email PDFs. Underwriters scribble on spreadsheets. Committees meet to decide on risks the client has already forgotten. The friction is so pervasive it became acceptable — and that normalization is exactly what creates room for a new intelligence layer." },
      { k: "The decision", text: "In 2026, after decades operating inside Tier-1 insurers and brokerages, we decided to stop complaining about the infrastructure and build a new one. Not yet another SaaS. Not a chatbot. An auditable AI platform that operates inside the systems that already exist and returns, in minutes, what used to take weeks." },
      { k: "The method",   text: "We brought together C-level partners from national and international insurers and brokerages, partners from Private Equity funds and Mahway's global technology ecosystem (California). Underwriters, actuaries and ML engineers side by side. That combination is rare in this industry — and it's exactly what lets us build products that work in production, not on a slide." },
      { k: "The promise",  text: "Insurance is, in the end, a contract about hard decisions made under pressure. WIR's role is not to remove the human from the process — it's to give the human back what only they can do: judgment. Everything else — intake, enrichment, scoring, underwriting — should be automatic, auditable and fast enough that the decision arrives while the client is still on the line." },
    ],
    timeEyebrow: "· Timeline",
    timeTitle: <>Three moments.<br/><em>One trajectory.</em></>,
    moments: [
      { k:"Origin",   y:"+ 30 years",       t:"Of combined experience",
        d:"C-level partners from Tier-1 insurers and brokerages, Private Equity funds and a global venture builder. WIR wasn't born as an experiment — it was born from accumulated operational experience." },
      { k:"Founding", y:"2026",             t:"WIR is founded · POC underway",
        d:"Founders join forces between São Paulo and Silicon Valley with Mahway (Venture Builder · California) and Avante (Venture Studio · Brazil). First POC with a global insurer in the Cargo & Transport line." },
      { k:"Ambition", y:"+ Next decade",    t:"The AI layer of Brazilian insurance",
        d:"We're building the AI platform the insurance market never had — so that executing innovation isn't an exception, but the standard operation of the region's Tier-1 insurers." },
    ],
    teamEyebrow: "· Partners & Co-Founders",
    teamTitle: <>Built <em>from inside</em><br/>the industry.</>,
    advisorsEyebrow: "· Partners & Strategic Advisors",
    advisorsNote: "Mahway (California, USA) · Avante (Brazil)",
    founders: [
      { name:"Nicholas Weiser", role:"CEO · Co-Founder",
        photo:"/assets/team/nicholas.jpg", loc:"São Paulo · Silicon Valley",
        bullets:[
          "Entrepreneur and investor in 5 successful startups",
          "27 years of experience in national and global companies",
          "Shareholder and co-founder of an insurer reaching R$ 1bn revenue in 4 years",
          "Former C-level and shareholder of brokerages, an insurer and an InsurTech",
          "Led 4 restructurings of national and international brokerages",
          "Specialist in innovation and structuring complex businesses",
        ] },
      { name:"José Carlos de Paula", role:"CSO / COO · Co-Founder",
        photo:"/assets/team/jose-carlos.jpg", loc:"São Paulo",
        bullets:[
          "30 years of experience in Insurance and Health",
          "C-level at insurers and health plan operators",
          "Led digital transformation at GNDI and Santander Corretora",
          "Worked on the consolidation of 35 M&As in Health",
          "CEO of Santander Corretora, C-level at GNDI / Bain Capital and at the Athena Saúde / Pátria Investimentos holding",
          "Strong track record in innovation and business transformation",
        ] },
    ],
    partners: [
      { name:"Felipe Moraes", role:"Partner & Co-Founder Avante · WIR Advisor",
        photo:"/assets/team/felipe.jpg", group:"Avante",
        bullets:[
          "Former Managing Partner at Innova Capital — Moville / iFood case",
          "20+ years in finance, VC and capital markets in Brazil",
          "R$ 1.6bn in investments with successful exits (Sigga, Accera, Tradeforce)",
          "Co-founder and CEO of Bamboo DCM, an AI-native debt capital markets platform",
          "Investor and Mentor at Endeavor",
        ] },
      { name:"Amanda Pinheiro", role:"Partner & Co-Founder Avante",
        photo:"/assets/team/amanda.jpg", group:"Avante",
        bullets:[
          "14+ years in fund management and financial markets in Brazil",
          "Specialist in Private Equity and Venture Capital in tech companies",
          "C-level at Innova Capital and Unbox Capital",
          "Led R$ 2.6bn in investments across 20+ companies",
        ] },
      { name:"Jess Mah", role:"Partner & Co-Founder · Mahway",
        photo:"/assets/team/jess.jpg", group:"Mahway",
        bullets:[
          "Forbes 30 Under 30 · Inc. Magazine Most Creative in Business",
          "Youngest woman accepted into Y Combinator (2010)",
          "Founded and scaled indinero (fintech) for over 10 years",
          "Graduate of Harvard Business School Presidents' Program",
          "Mahway portfolio: companies valued at hundreds of millions of USD",
        ] },
      { name:"Andrea Barrica", role:"Partner & Co-Founder · Mahway",
        photo:"/assets/team/andrea.jpg", group:"Mahway",
        bullets:[
          "Former Venture Partner at 500 Startups (500 Global)",
          "Backed 100+ startups · helped raise over USD 100M",
          "Co-founder of indinero (Y Combinator backed)",
          "Serial founder and investor in fintech, insurtech and AI",
          "Global reference in go-to-market strategy for tech startups",
        ] },
    ],
    techEyebrow: "· TECH & AI Team",
    techTitle: <><em>World Class</em> engineering<br/>from day zero.</>,
    techSub: "WIR runs a lean core engineering team in Brazil, backed by Mahway's global Tech & AI infrastructure — the same one powering some of the world's largest technology companies.",
    techStats: [
      { v:"1 + 3", l:"CTO + 3 core engineers",
        d:"Engineering Brazil · architecture, applied ML, policy-core integrations and production observability." },
      { v:"+ Mahway", l:"Global talent pipeline",
        d:"Direct access to Mahway's top developers, AI models and cutting-edge practices (California, USA) — we scale the engineering team without local recruiting friction." },
      { v:"Future-proof", l:"An operation that evolves with the industry",
        d:"Versioned models, continuous observability and an architecture ready for new regulations and new channels — without rebuilding the stack." },
    ],
    techFoot: <>The combination of <b>WIR (insurance expertise) + Avante (governance) + Mahway (global Tech & AI)</b> is what puts us on another level — enterprise platform, operational security and AI-native startup speed, in a single partner.</>,
    partEyebrow: "· Partners & Strategic Advisors",
    partTitle: <>The <em>holding</em> that powers<br/><em>WIR Innovation.</em></>,
    partSub: "WIR doesn't operate alone. It was co-created and is backed by a structure of partners, investors and a global venture builder that multiplies our capacity to deliver for the client.",
    mahwayTag: "World-class Tech & AI · California, USA",
    mahwayP: <>Mahway is a venture builder and investor in WIR, with the same AI infrastructure powering some of the world's largest technology companies. Direct access to top developers, AI models and cutting-edge practices — global scale without friction. <b>Mahway co-founds, co-builds and operates high-impact technology companies side by side with founders</b>, from idea to scale.</>,
    mahwayMeta: ["· Co-funding", "· Co-building", "· Talent pipeline", "· Go-to-market USA"],
    avanteTag: "Strategic AI Holding · Brazil",
    avanteP: <>AVANTE is the <b>AI holding company and co-founder of WIR</b>. Run by partners with a proven track record in Venture Capital, Private Equity and capital markets in Brazil, it ensures WIR grows with regulatory safety, compliance, financial predictability and continuous reinvestment capacity. Portfolio across InsurTech, legal claims and service-driven AI-first solutions.</>,
    avanteMeta: ["· Governance", "· Financial strength", "· Regulatory compliance", "· LatAm"],
    partFoot: <>The result for the client: <b>deep insurance-market knowledge, long-term financial strength and world-class technology and AI</b> — in a single partner.</>,
    valsEyebrow: "· Principles",
    valsTitle: <>Six principles.<br/><em>None negotiable.</em></>,
    vals: [
      { k:"01", t:"Outcomes before technology",
        d:"We don't sell AI — we sell business outcomes. Every WIR product is judged by the real impact it delivers to the client's P&L, not by technical sophistication.", c:"#3222E9" },
      { k:"02", t:"Platform, not SaaS",
        d:"A SaaS solves a feature. A platform sustains an entire operation. WIR was designed to be the AI layer that scales with the client — for years, not quarters.", c:"#AE46C0" },
      { k:"03", t:"Plug-and-play without IT",
        d:"The client doesn't replace the core, doesn't face a heavy IT project, doesn't migrate data. WIR operates as an AI layer between the systems that already exist — in weeks, not years.", c:"#FE8B77" },
      { k:"04", t:"Auditability as the foundation",
        d:"No decision ships without a complete trail: model, version, confidence, inputs, timestamp. LGPD-ready, exportable, immutable. Compliance isn't a feature — it's the architecture.", c:"#F8AD39" },
      { k:"05", t:"Humans in charge of judgment",
        d:"AI that decides critical risk without supervision is a problem. WIR frees underwriters to do what only they can — analyze and underwrite risk — automating everything that comes before.", c:"#7540AC" },
      { k:"06", t:"World Class by design",
        d:"We build on Mahway's global AI infrastructure, Avante's financial governance and C-level insurance expertise. The client gets enterprise grade from day one.", c:"#FE8B77" },
    ],
    faqEyebrow: "· Frequently asked questions",
    faqTitle: <>What IT and risk teams <em>always ask.</em></>,
    faqs: [
      { q:"Does WIR replace my policy core or my current system?",
        a:"No. WIR is an AI layer that operates between your quoting channels and your policy core. We listen to inputs, apply models calibrated to your appetite, and return structured results via API/webhook to your system of record. The core remains yours — WIR adds the intelligence on top." },
      { q:"How long until the first operation in production?",
        a:"The implementation project takes 3 to 12 months depending on scope, integration with your core and the maturity of your underwriting manual. We work with fixed scope, timeline and price agreed before we start — no free pilot, no surprise billing." },
      { q:"How do human oversight and the audit trail work?",
        a:"Every decision produced by WIR carries: model used, model version, confidence score, inputs, output, timestamp. When configured, out-of-appetite or low-confidence cases go automatically to human review. The log is immutable and exportable — LGPD-ready by design, with an architecture prepared for ISO 27001 and international standards." },
      { q:"Can you host in a private cloud or on-premise?",
        a:"Yes. We operate as multi-tenant SaaS (default), private cloud (AWS / Azure / GCP in the client's environment) or on-premise behind your firewall. Deploy, observability and secrets management stay under your control when regulation requires it." },
      { q:"How do you guarantee technical quality and the ability to evolve?",
        a:"Core engineering in Brazil (CTO + 3 engineers), backed by Mahway's global talent pipeline and AI infrastructure (California, USA) — the same one powering some of the world's largest tech companies. Versioned models, continuous observability and an architecture built to evolve with the industry." },
      { q:"How is pricing structured?",
        a:"Two phases. Implementation: fixed-scope project, 3 to 12 months, single price agreed before we start. SaaS after go-live: billing calibrated to the volume of decisions processed, no fixed fee, no surprise billing. Every simulation runs on the client's real data — we don't promise generic numbers." },
      { q:"Which insurance lines do you cover?",
        a:"SS and UI are in production for commercial underwriting — we start with lines where underwriter friction is highest (Cargo & Transport, Engineering Risks, corporate P&C). XBA (cross-sell) and SNB (new business) are in development. We don't work with mass-market homeowners insurance." },
    ],
    closeEyebrow: "· Come build",
    closeTitle: <>We're <em>hiring.</em></>,
    closeLede: "Engineering, ML, delivery and GTM. Remote roles, plus SP, NYC and Silicon Valley. If you've operated insurance from the inside or built a regulated platform in another industry — we have a seat open.",
    closeCv: "Send your résumé",
    closeCvHref: "mailto:contato@wirinnovation.ai?subject=Career%20interest%20%E2%80%94%20WIR%20Innovation&body=Hello%2C%20I%27d%20like%20to%20learn%20about%20opportunities%20at%20WIR%20Innovation.",
    closeTalk: "Talk to the team",
  },
  es: {
    heroMeta: ["· Sobre WIR Innovation", "· Plataforma de IA · Mercado asegurador", "· Socios y Consejeros World Class"],
    heroEyebrow: "· WIR significa “Nosotros”",
    heroTitle: <>Construimos la <em>plataforma</em> que aporta más <em>eficiencia</em> y permite <em>escalar operaciones en seguros.</em></>,
    heroLede: "No somos solo una empresa de tecnología. Somos una empresa nativa en IA aplicada a los negocios — fundada por socios apasionados por entregar resultados transformacionales al mercado de seguros y salud.",
    essayEyebrow: "· El ensayo",
    essayPullquote: <>"El seguro no se resuelve con <em>más software</em>. Se resuelve con la <em>plataforma</em> correcta."</>,
    essayParas: [
      { k: "La tesis",    text: "El mercado de Seguros de Daños crece dos dígitos al año — pero la estructura de las empresas no acompaña esta aceleración. Las corredoras emiten PDFs. Los suscriptores garabatean planillas. Los comités se reúnen para decidir sobre riesgos que el cliente ya olvidó. La fricción es tan grande que se volvió aceptable — y es exactamente esa normalización la que crea espacio para una nueva capa de inteligencia." },
      { k: "La decisión", text: "En 2026, después de décadas operando dentro de aseguradoras y corredoras Tier-1, decidimos dejar de quejarnos de la infraestructura y construir una nueva. No un SaaS más. No un chatbot. Una plataforma de IA auditable que opera dentro de los sistemas que ya existen y devuelve, en minutos, lo que antes tomaba semanas." },
      { k: "El método",   text: "Reunimos socios C-Level de aseguradoras y corredoras nacionales e internacionales, socios de fondos de Private Equity y el ecosistema global de tecnología de Mahway (California). Suscriptores, actuarios e ingenieros de ML lado a lado. La combinación es poco común en el sector — y es exactamente lo que permite construir productos que funcionan en producción, no en un slide." },
      { k: "La promesa",  text: "El seguro es, al final, un contrato sobre decisiones difíciles tomadas bajo presión. El papel de WIR no es sacar al humano del proceso — es devolverle al humano lo que solo él puede hacer: el juicio. Todo lo demás — intake, enriquecimiento, scoring, suscripción — debe ser automático, auditable y lo bastante rápido para que la decisión llegue mientras el cliente sigue en la línea." },
    ],
    timeEyebrow: "· Línea de tiempo",
    timeTitle: <>Tres momentos.<br/><em>Una trayectoria.</em></>,
    moments: [
      { k:"Origen",    y:"+ 30 años",          t:"De experiencia sumada",
        d:"Socios C-Level de aseguradoras y corredoras Tier-1, fondos de Private Equity y un Venture Builder global. WIR no nació como un experimento — nació de la experiencia operacional acumulada." },
      { k:"Fundación", y:"2026",               t:"WIR es fundada · POC en ejecución",
        d:"Los founders se unen entre São Paulo y Silicon Valley con Mahway (Venture Builder · California) y Avante (Venture Studio · Brasil). Primer POC con una aseguradora global en el ramo de Transporte." },
      { k:"Ambición",  y:"+ Próxima década",   t:"La capa de IA del seguro brasileño",
        d:"Construimos la plataforma de IA que el mercado asegurador nunca tuvo — para que ejecutar innovación no sea una excepción, sino la operación estándar de las aseguradoras Tier-1 de la región." },
    ],
    teamEyebrow: "· Socios & Co-Founders",
    teamTitle: <>Construido <em>desde dentro</em><br/>del sector.</>,
    advisorsEyebrow: "· Socios & Consejeros Estratégicos",
    advisorsNote: "Mahway (California, EE. UU.) · Avante (Brasil)",
    founders: [
      { name:"Nicholas Weiser", role:"CEO · Co-Founder",
        photo:"/assets/team/nicholas.jpg", loc:"São Paulo · Silicon Valley",
        bullets:[
          "Emprendedor e inversionista en 5 startups exitosas",
          "27 años de experiencia en empresas nacionales y globales",
          "Accionista y co-fundador de una aseguradora con ingresos de R$ 1.000 millones en 4 años",
          "Ex C-Level y accionista de corredoras, aseguradora e InsurTech",
          "Lideró 4 reestructuraciones de corredoras nacionales e internacionales",
          "Especialista en innovación y estructuración de negocios complejos",
        ] },
      { name:"José Carlos de Paula", role:"CSO / COO · Co-Founder",
        photo:"/assets/team/jose-carlos.jpg", loc:"São Paulo",
        bullets:[
          "30 años de experiencia en Seguros y Salud",
          "C-Level en aseguradoras y operadoras de salud",
          "Lideró la transformación digital en GNDI y Santander Corretora",
          "Participó en la consolidación de 35 M&As en Salud",
          "CEO de Santander Corretora, C-Level de GNDI / Bain Capital y del holding Athena Saúde / Pátria Investimentos",
          "Fuerte trayectoria en innovación y transformación de negocios",
        ] },
    ],
    partners: [
      { name:"Felipe Moraes", role:"Socio & Co-Fundador Avante · Consejero WIR",
        photo:"/assets/team/felipe.jpg", group:"Avante",
        bullets:[
          "Ex-Managing Partner de Innova Capital — caso Moville / iFood",
          "20+ años en finanzas, VC y mercados de capitales en Brasil",
          "R$ 1.600 millones en inversiones con exits exitosos (Sigga, Accera, Tradeforce)",
          "Co-fundador y CEO de Bamboo DCM, plataforma AI-native de debt capital markets",
          "Inversionista y Mentor en Endeavor",
        ] },
      { name:"Amanda Pinheiro", role:"Socia & Co-Fundadora Avante",
        photo:"/assets/team/amanda.jpg", group:"Avante",
        bullets:[
          "14+ años en gestión de fondos y mercados financieros en Brasil",
          "Especialista en Private Equity y Venture Capital en empresas tech",
          "C-Level en Innova Capital y Unbox Capital",
          "Lideró R$ 2.600 millones en inversiones en más de 20 empresas",
        ] },
      { name:"Jess Mah", role:"Socia & Co-Founder · Mahway",
        photo:"/assets/team/jess.jpg", group:"Mahway",
        bullets:[
          "Forbes 30 Under 30 · Inc. Magazine Most Creative in Business",
          "La mujer más joven aceptada en Y Combinator (2010)",
          "Fundó y escaló indinero (fintech) por más de 10 años",
          "Graduada del Harvard Business School Presidents' Program",
          "Portafolio Mahway: empresas valoradas en cientos de millones de USD",
        ] },
      { name:"Andrea Barrica", role:"Socia & Co-Founder · Mahway",
        photo:"/assets/team/andrea.jpg", group:"Mahway",
        bullets:[
          "Ex-Venture Partner de 500 Startups (500 Global)",
          "Apoyó a 100+ startups · ayudó a levantar más de USD 100M",
          "Co-fundadora de indinero (respaldada por Y Combinator)",
          "Serial founder e inversionista en fintech, insurtech e IA",
          "Referente global en estrategia de go-to-market para startups tech",
        ] },
    ],
    techEyebrow: "· Equipo TECH & IA",
    techTitle: <>Estructura de ingeniería<br/><em>World Class</em> desde el día cero.</>,
    techSub: "WIR opera con un equipo compacto de ingeniería núcleo en Brasil, sostenido por la infraestructura global de Tech & IA de Mahway — la misma que impulsa a algunas de las mayores empresas de tecnología del mundo.",
    techStats: [
      { v:"1 + 3", l:"CTO + 3 ingenieros núcleo",
        d:"Ingeniería Brasil · arquitectura, ML aplicado, integraciones con el core de pólizas y observabilidad en producción." },
      { v:"+ Mahway", l:"Pipeline global de talento",
        d:"Acceso directo a desarrolladores, modelos de IA y prácticas de punta de Mahway (California, EE. UU.) — escalamos el equipo de ingeniería sin fricción de reclutamiento local." },
      { v:"A prueba de futuro", l:"Operación que evoluciona con el sector",
        d:"Modelos versionados, observabilidad continua y arquitectura preparada para nuevas regulaciones y nuevos canales — sin rehacer el stack." },
    ],
    techFoot: <>La combinación <b>WIR (expertise en seguros) + Avante (gobernanza) + Mahway (Tech & IA global)</b> es lo que nos posiciona en otro nivel — entregamos plataforma enterprise, seguridad operacional y velocidad de startup nativa en IA, en un único socio.</>,
    partEyebrow: "· Socios & Consejeros Estratégicos",
    partTitle: <>El <em>holding</em> que potencia<br/>a <em>WIR Innovation.</em></>,
    partSub: "WIR no opera sola. Fue co-creada y está sostenida por una estructura de socios, inversionistas y un venture builder global que multiplica nuestra capacidad de entrega al cliente.",
    mahwayTag: "Tech & IA World Class · California, EE. UU.",
    mahwayP: <>El Venture Builder Mahway, inversionista de WIR, con la misma infraestructura de IA que impulsa a algunas de las mayores empresas de tecnología del mundo. Acceso directo a los mejores desarrolladores, modelos de IA y prácticas de punta — escala global sin fricción. <b>Mahway co-funda, co-construye y opera empresas de tecnología de alto impacto junto a los fundadores</b>, de la idea al scale.</>,
    mahwayMeta: ["· Co-funding", "· Co-building", "· Talent pipeline", "· Go-to-market USA"],
    avanteTag: "Holding de IA Estratégica · Brasil",
    avanteP: <>AVANTE es el <b>holding de IA co-fundador de WIR</b>. Dirigido por socios con historial comprobado en Venture Capital, Private Equity y mercado de capitales en Brasil, garantiza que WIR crezca con seguridad regulatoria, compliance, previsibilidad financiera y capacidad de reinversión continua. Portafolio en InsurTech, legal claims y soluciones service-driven AI-first.</>,
    avanteMeta: ["· Gobernanza", "· Solidez financiera", "· Compliance regulatorio", "· LatAm"],
    partFoot: <>El resultado para el cliente: <b>conocimiento profundo del mercado asegurador, solidez financiera de largo plazo y nivel World Class en tecnología e IA</b> — en un único socio.</>,
    valsEyebrow: "· Principios",
    valsTitle: <>Seis principios.<br/><em>Ninguno negociable.</em></>,
    vals: [
      { k:"01", t:"Resultado antes que tecnología",
        d:"No vendemos IA — vendemos resultados de negocio. Cada producto de WIR se evalúa por el impacto real que entrega al P&L del cliente, no por la sofisticación técnica.", c:"#3222E9" },
      { k:"02", t:"Plataforma, no SaaS",
        d:"Un SaaS resuelve una feature. Una plataforma sostiene una operación entera. WIR fue diseñada para ser la capa de IA que escala con el cliente — durante años, no trimestres.", c:"#AE46C0" },
      { k:"03", t:"Plug-and-play sin TI",
        d:"El cliente no cambia el core, no enfrenta proyectos pesados de TI, no migra datos. WIR opera como capa de IA entre los sistemas que ya existen — en semanas, no en años.", c:"#FE8B77" },
      { k:"04", t:"Auditabilidad como fundación",
        d:"Ninguna decisión sale sin traza completa: modelo, versión, confianza, inputs, timestamp. LGPD-ready, exportable, inmutable. Compliance no es una feature — es la arquitectura.", c:"#F8AD39" },
      { k:"05", t:"El humano al mando del juicio",
        d:"Una IA que decide riesgo crítico sin supervisión es un problema. WIR libera al suscriptor para hacer lo que solo él hace — analizar y suscribir riesgo — automatizando todo lo que viene antes.", c:"#7540AC" },
      { k:"06", t:"World Class por diseño",
        d:"Construimos con la infraestructura global de IA de Mahway, la gobernanza financiera de Avante y expertise C-Level en seguros. El cliente recibe nivel enterprise desde el día uno.", c:"#FE8B77" },
    ],
    faqEyebrow: "· Preguntas frecuentes",
    faqTitle: <>Lo que los equipos de TI y riesgo <em>siempre preguntan.</em></>,
    faqs: [
      { q:"¿WIR reemplaza mi core de pólizas o mi sistema actual?",
        a:"No. WIR es una capa de IA que opera entre tus canales de cotización y tu core de pólizas. Escuchamos inputs, aplicamos modelos calibrados a tu apetito y devolvemos resultados estructurados vía API/webhook a tu sistema de registro. El core sigue siendo tuyo — WIR agrega la inteligencia por encima." },
      { q:"¿Cuánto tiempo hasta la primera operación en producción?",
        a:"El proyecto de implementación toma de 3 a 12 meses según el alcance, la integración con tu core y la madurez del manual de suscripción. Trabajamos con alcance, plazo y precio cerrados antes de empezar — sin free pilot, sin surprise billing." },
      { q:"¿Cómo funcionan la supervisión humana y la traza de auditoría?",
        a:"Toda decisión producida por WIR lleva: modelo usado, versión del modelo, score de confianza, inputs, output, timestamp. Cuando se configura, los casos fuera de apetito o de baja confianza van automáticamente a revisión humana. El log es inmutable y exportable — LGPD-ready desde el diseño, con arquitectura preparada para ISO 27001 y estándares internacionales." },
      { q:"¿Pueden hospedar en private cloud u on-premise?",
        a:"Sí. Operamos en SaaS multi-tenant (estándar), private cloud (AWS / Azure / GCP en el ambiente del cliente) u on-premise detrás de tu firewall. Deploy, observabilidad y secrets management quedan bajo tu control cuando el marco regulatorio lo exige." },
      { q:"¿Cómo garantizan calidad técnica y capacidad de evolución?",
        a:"Ingeniería núcleo en Brasil (CTO + 3 ingenieros), sostenida por el pipeline global de talento y la infraestructura de IA de Mahway (California, EE. UU.) — la misma que impulsa a algunas de las mayores empresas tech del mundo. Modelos versionados, observabilidad continua y arquitectura preparada para evolucionar con el sector." },
      { q:"¿Cómo se estructura el pricing?",
        a:"Dos fases. Implementación: proyecto con alcance cerrado, 3 a 12 meses, precio único acordado antes de empezar. SaaS post go-live: cobro calibrado al volumen de decisiones procesadas, sin tarifa fija, sin surprise billing. Cada simulación se hace sobre los datos reales del cliente — no prometemos números genéricos." },
      { q:"¿Qué ramos de seguro cubren?",
        a:"SS y UI están en producción para suscripción comercial — empezamos por los ramos donde la fricción operativa del suscriptor es mayor (Transporte, Riesgos de Ingeniería, P&C corporativo). XBA (cross-sell) y SNB (new business) están en desarrollo. No trabajamos con seguro residencial masivo." },
    ],
    closeEyebrow: "· Ven a construir",
    closeTitle: <>Estamos <em>contratando.</em></>,
    closeLede: "Engineering, ML, delivery y GTM. Posiciones remotas, SP, NYC y Silicon Valley. Si ya operaste seguros desde dentro o construiste una plataforma regulada en otro sector — hay una silla con tu nombre.",
    closeCv: "Enviar CV",
    closeCvHref: "mailto:contato@wirinnovation.ai?subject=Inter%C3%A9s%20en%20carrera%20WIR%20Innovation&body=Hola%2C%20me%20gustar%C3%ADa%20saber%20sobre%20oportunidades%20en%20WIR%20Innovation.",
    closeTalk: "Hablar con el equipo",
  },
}[LANG];

function AboutHero() {
  return (
    <section className="abhero abhero--solo">
      <div className="wrap">
        <div className="abhero__meta">
          {T.heroMeta.map((m, i) => <span key={i}>{m}</span>)}
        </div>
        <div className="eyebrow">{T.heroEyebrow}</div>
        <h1 className="display abhero__title abhero__title--solo">
          {T.heroTitle}
        </h1>
        <p className="abhero__lede">
          {T.heroLede}
        </p>
      </div>
    </section>
  );
}

function AboutEssay() {
  const paragraphs = T.essayParas;
  return (
    <section className="abessay" data-reveal>
      <div className="wrap">
        <div className="abessay__grid">
          <div className="abessay__side">
            <div className="eyebrow">{T.essayEyebrow}</div>
            <div className="abessay__photo"
              style={{backgroundImage:"url(/assets/team/nicholas.jpg)"}}
              role="img" aria-label="Nicholas Weiser, CEO · Co-Founder"/>
            <div className="abessay__pullquote display">
              {T.essayPullquote}
            </div>
            <div className="abessay__attr">
              <b>Nicholas Weiser</b>
              <span>CEO · Co-Founder</span>
            </div>
          </div>
          <div className="abessay__content">
            {paragraphs.map((p,i) => (
              <div key={i} className="abessay__para">
                <div className="abessay__para-k">· 0{i+1} — {p.k}</div>
                <p className="abessay__para-t">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTimeline() {
  const moments = T.moments;
  return (
    <section className="abtime" data-reveal>
      <div className="wrap">
        <div className="abtime__head">
          <div className="eyebrow">{T.timeEyebrow}</div>
          <h2 className="display abtime__title">{T.timeTitle}</h2>
        </div>
        <div className="abtime__big">
          {moments.map((m,i) => (
            <div key={i} className="abtime__moment">
              <div className="abtime__moment-k">/0{i+1} · {m.k}</div>
              <div className="abtime__moment-y display">{m.y}</div>
              <div className="abtime__moment-t">{m.t}</div>
              <p className="abtime__moment-d">{m.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutTeam() {
  const founders = T.founders;
  const partners = T.partners;
  return (
    <section className="abteam" data-reveal>
      <div className="wrap">
        <div className="abteam__head">
          <div className="eyebrow">{T.teamEyebrow}</div>
          <h2 className="display abteam__title">{T.teamTitle}</h2>
        </div>

        {/* Founders WIR */}
        <div className="abteam__grid abteam__grid--2">
          {founders.map((f,i) => (
            <div key={i} className="abteam__card abteam__card--big">
              <div className="abteam__photo"
                style={{ backgroundImage: `url(${f.photo})`, backgroundSize: "cover", backgroundPosition: "center top" }}>
                <span className="abteam__photo-overlay"/>
              </div>
              <div className="abteam__body">
                <h3 className="abteam__name display">{f.name}</h3>
                <div className="abteam__role">{f.role}</div>
                <ul className="abteam__bullets">
                  {f.bullets.map((b,j) => <li key={j}><span className="abteam__bu"/>{b}</li>)}
                </ul>
                <div className="abteam__loc">· {f.loc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Sócios & Conselheiros estratégicos */}
        <div className="abteam__partners" id="conselheiros">
          <div className="abteam__partners-head">
            <span className="eyebrow">{T.advisorsEyebrow}</span>
            <span className="abteam__partners-note">{T.advisorsNote}</span>
          </div>
          <div className="abteam__partners-grid">
            {partners.map((p,i) => {
              const groupKey = p.group.toLowerCase();
              const isFirstOfGroup = partners.findIndex(x => x.group === p.group) === i;
              return (
                <div key={i}
                  id={isFirstOfGroup ? `${groupKey}-team` : undefined}
                  className={"abteam__partner abteam__partner--" + groupKey}>
                  <div className="abteam__partner-photo"
                    style={{ backgroundImage: `url(${p.photo})`, backgroundSize: "cover", backgroundPosition: "center top" }}/>
                  <div className="abteam__partner-body">
                    <div className="abteam__partner-group">{p.group}</div>
                    <div className="abteam__partner-name display">{p.name}</div>
                    <div className="abteam__partner-role">{p.role}</div>
                    <ul className="abteam__partner-bullets">
                      {p.bullets.map((b,j) => <li key={j}>{b}</li>)}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutTechIA() {
  return (
    <section className="abtech" data-reveal>
      <div className="wrap">
        <div className="abtech__head">
          <div className="eyebrow">{T.techEyebrow}</div>
          <h2 className="display abtech__title">
            {T.techTitle}
          </h2>
          <p className="abtech__sub">
            {T.techSub}
          </p>
        </div>

        <div className="abtech__stats">
          {T.techStats.map((s, i) => (
            <div key={i} className="abtech__stat">
              <div className="abtech__stat-v display">{s.v}</div>
              <div className="abtech__stat-l">{s.l}</div>
              <div className="abtech__stat-d">{s.d}</div>
            </div>
          ))}
        </div>

        <div className="abtech__foot">
          {T.techFoot}
        </div>
      </div>
    </section>
  );
}

function AboutPartners() {
  return (
    <section className="abpart" data-reveal>
      <div className="wrap">
        <div className="abpart__head">
          <div className="eyebrow eyebrow--onDark">{T.partEyebrow}</div>
          <h2 className="display abpart__title">{T.partTitle}</h2>
          <p className="abpart__sub">{T.partSub}</p>
        </div>
        <div className="abpart__grid">
          <div className="abpart__card">
            <div className="abpart__logo display">Mahway</div>
            <div className="abpart__tag">{T.mahwayTag}</div>
            <p>
              {T.mahwayP}
            </p>
            <div className="abpart__meta">
              {T.mahwayMeta.map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>
          <div className="abpart__card">
            <div className="abpart__logo display"><em>Avante</em></div>
            <div className="abpart__tag">{T.avanteTag}</div>
            <p>
              {T.avanteP}
            </p>
            <div className="abpart__meta">
              {T.avanteMeta.map((m, i) => <span key={i}>{m}</span>)}
            </div>
          </div>
        </div>
        <div className="abpart__foot">
          {T.partFoot}
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  const vals = T.vals;
  return (
    <section className="abvals" id="principios" data-reveal>
      <div className="wrap">
        <div className="abvals__head">
          <div className="eyebrow">{T.valsEyebrow}</div>
          <h2 className="display abvals__title">{T.valsTitle}</h2>
        </div>
        <div className="abvals__grid">
          {vals.map((v,i) => (
            <div key={i} className="abvals__cell" style={{"--c": v.c}}>
              <div className="abvals__k num">{v.k}</div>
              <div className="abvals__t display">{v.t}</div>
              <p className="abvals__d">{v.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutFAQ() {
  const qs = T.faqs;
  const [open, setOpen] = React.useState(0);
  return (
    <section className="abfaq" data-reveal>
      <div className="wrap">
        <div className="abfaq__head">
          <div className="eyebrow">{T.faqEyebrow}</div>
          <h2 className="display abfaq__title">{T.faqTitle}</h2>
        </div>
        <div className="abfaq__list">
          {qs.map((x, idx) => {
            const isOpen = open === idx;
            const aId = `abfaq-a-${idx}`;
            const qId = `abfaq-q-${idx}`;
            return (
              <div key={idx} className={"abfaq__item" + (isOpen ? " is-open" : "")}>
                <button type="button" className="abfaq__q"
                  id={qId}
                  aria-expanded={isOpen} aria-controls={aId}
                  onClick={()=>setOpen(isOpen ? -1 : idx)}>
                  <span className="abfaq__idx num">· {String(idx+1).padStart(2,"0")}</span>
                  <span className="abfaq__qt">{x.q}</span>
                  <span className="abfaq__chev" aria-hidden>{isOpen ? "−" : "+"}</span>
                </button>
                <div id={aId} role="region" aria-labelledby={qId}
                  className="abfaq__a" hidden={!isOpen}>
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

function AboutClose({ go }) {
  return (
    <section className="abclose" data-reveal>
      <div className="wrap">
        <div className="abclose__inner">
          <div className="eyebrow eyebrow--onDark">{T.closeEyebrow}</div>
          <h2 className="display abclose__title">
            {T.closeTitle}
          </h2>
          <p className="abclose__lede">
            {T.closeLede}
          </p>
          <div className="abclose__actions">
            <a className="btn btn--solid btn--onDark" href={T.closeCvHref}>
              {T.closeCv} <span className="btn__arrow">→</span>
            </a>
            <button className="btn btn--ghost btn--onDark" onClick={()=>go("contact")}>
              {T.closeTalk} <span className="btn__arrow">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPage({ go }) {
  useReveal();
  return (
    <>
      <AboutHero/>
      <AboutEssay/>
      <AboutTimeline/>
      <AboutPartners/>
      <AboutTeam/>
      <AboutTechIA/>
      <AboutValues/>
      <AboutFAQ/>
      <AboutClose go={go}/>
    </>
  );
}
