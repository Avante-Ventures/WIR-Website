import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useReveal } from './shared.jsx';

/* ───────── Sobre · ensayo editorial ───────── */

function AboutHero() {
  return (
    <section className="abhero abhero--solo">
      <div className="wrap">
        <div className="abhero__meta">
          <span>· Sobre a WIR Innovation</span>
          <span>· Plataforma de IA · Mercado segurador</span>
          <span>· Sócios e Conselheiros World Class</span>
        </div>
        <div className="eyebrow">· WIR significa "Nós"</div>
        <h1 className="display abhero__title abhero__title--solo">
          Construímos a <em>plataforma</em> que proporciona mais <em>eficiência</em> e permite <em>escalar operações em seguros.</em>
        </h1>
        <p className="abhero__lede">
          Não somos apenas uma empresa de tecnologia. Somos uma empresa nativa em IA aplicada a negócios — fundada por sócios apaixonados por entregar resultados transformacionais ao mercado de seguros e saúde.
        </p>
      </div>
    </section>
  );
}

function AboutEssay() {
  const paragraphs = [
    { k: "A tese",     text: "O mercado de Seguros e Danos cresce dois dígitos ao ano — mas a estrutura das empresas não acompanha esta aceleração. Corretoras emitem PDFs. Underwriters rabiscam planilhas. Comitês se reúnem para decidir sobre riscos que o cliente já esqueceu. A fricção é tão grande que virou aceitável — e é exatamente essa normalização que cria espaço para uma nova camada de inteligência." },
    { k: "A decisão",  text: "Em 2026, depois de décadas operando dentro de seguradoras e corretoras Tier-1, decidimos parar de reclamar da infraestrutura e construir uma nova. Não um SaaS a mais. Não um chatbot. Uma plataforma de IA auditável que opera dentro dos sistemas que já existem e devolve, em minutos, o que antes levava semanas." },
    { k: "O método",   text: "Reunimos sócios C-Level de seguradoras e corretoras nacionais e internacionais, sócios de fundos de Private Equity e o ecossistema global de tecnologia da Mahway (California). Underwriters, atuários e engenheiros de ML lado a lado. A combinação é pouco comum no setor — é exatamente isso que permite construir produtos que funcionam em produção, não em slide." },
    { k: "A promessa", text: "Seguro é, no fim, um contrato sobre decisões difíceis tomadas sob pressão. O papel da WIR não é remover o humano do processo — é devolver ao humano o que só ele pode fazer: julgamento. Tudo o mais — intake, enriquecimento, scoring, subscrição — deve ser automático, auditável e rápido o suficiente para que a decisão chegue enquanto o cliente ainda está na linha." },
  ];
  return (
    <section className="abessay" data-reveal>
      <div className="wrap">
        <div className="abessay__grid">
          <div className="abessay__side">
            <div className="eyebrow">· O ensaio</div>
            <div className="abessay__photo"
              style={{backgroundImage:"url(assets/team/nicholas.jpg)"}}
              role="img" aria-label="Nicholas Weiser, CEO · Co-Founder"/>
            <div className="abessay__pullquote display">
              "Não se resolve o seguro com <em>mais software</em>. Resolve-se com a <em>plataforma</em> certa."
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
  const moments = [
    { k:"Origem",   y:"+ 30 anos",         t:"De experiência somada",
      d:"Sócios C-Level de seguradoras e corretoras Tier-1, fundos de Private Equity e Venture Builder global. A WIR não nasceu como um experimento — nasceu da experiência operacional acumulada." },
    { k:"Fundação", y:"2026",              t:"WIR é fundada · POC em execução",
      d:"Founders se unem entre São Paulo e Silicon Valley com Mahway (Venture Builder · California) e Avante (Venture Studio · Brasil). Primeiro POC com seguradora global no ramo de Transportes." },
    { k:"Ambição",  y:"+ Próxima década",  t:"A camada de IA do seguro brasileiro",
      d:"Construímos a plataforma de IA que o mercado segurador nunca teve — para que executar inovação não seja uma exceção, mas a operação padrão das seguradoras Tier-1 da região." },
  ];
  return (
    <section className="abtime" data-reveal>
      <div className="wrap">
        <div className="abtime__head">
          <div className="eyebrow">· Linha do tempo</div>
          <h2 className="display abtime__title">Três momentos.<br/><em>Uma trajetória.</em></h2>
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
  const founders = [
    { name:"Nicholas Weiser", role:"CEO · Co-Founder",
      photo:"assets/team/nicholas.jpg", loc:"São Paulo · Silicon Valley",
      bullets:[
        "Empreendedor e investidor em 5 startups de sucesso",
        "27 anos de experiência em empresas nacionais e globais",
        "Acionista e Co-Fundador de seguradora com receita de R$ 1 bi em 4 anos",
        "Ex C-Level e acionista de corretoras, seguradora e InsurTech",
        "Liderou 4 reestruturações de corretoras nacionais e internacionais",
        "Especialista em inovação e estruturação de negócios complexos",
      ] },
    { name:"José Carlos de Paula", role:"CSO / COO · Co-Founder",
      photo:"assets/team/jose-carlos.jpg", loc:"São Paulo",
      bullets:[
        "30 anos de experiência em Seguros e Saúde",
        "C-Level em Seguradoras e Operadoras de Saúde",
        "Liderou transformação digital na GNDI e Santander Corretora",
        "Atuou na consolidação de 35 M&As em Saúde",
        "CEO da Santander Corretora, C-Level do GNDI / Bain Capital e da Holding Athena Saúde / Pátria Investimentos",
        "Forte atuação em inovação e transformação de negócios",
      ] },
  ];
  const partners = [
    { name:"Felipe Moraes", role:"Sócio & Co-Fundador Avante · Conselheiro WIR",
      photo:"assets/team/felipe.jpg", group:"Avante",
      bullets:[
        "Ex-Managing Partner Innova Capital — Case Moville / iFood",
        "20+ anos em finanças, VC e mercados de capitais no Brasil",
        "R$ 1,6 bi em investimentos com EXITs de sucesso (Sigga, Accera, Tradeforce)",
        "Co-fundador e CEO da Bambo DCM, plataforma AI-native de debt capital markets",
        "Investidor e Mentor na Endeavor",
      ] },
    { name:"Amanda Pinheiro", role:"Sócia & Co-Fundadora Avante",
      photo:"assets/team/amanda.jpg", group:"Avante",
      bullets:[
        "14+ anos em gestão de fundos e mercados financeiros no Brasil",
        "Especialista em Private Equity e Venture Capital em empresas tech",
        "C-Level na Innova Capital e Unbox Capital",
        "Liderou R$ 2,6 bi em investimentos em mais de 20 empresas",
      ] },
    { name:"Jess Mah", role:"Sócia & Co-Founder · Mahway",
      photo:"assets/team/jess.jpg", group:"Mahway",
      bullets:[
        "Forbes 30 Under 30 · Inc. Magazine Most Creative in Business",
        "Mais jovem mulher aceita no Y Combinator (2010)",
        "Fundou e escalou a inDinero (fintech) por mais de 10 anos",
        "Graduada Harvard Business School Presidents' Program",
        "Portfólio Mahway: empresas avaliadas em centenas de milhões de USD",
      ] },
    { name:"Andrea Barrica", role:"Sócia & Co-Founder · Mahway",
      photo:"assets/team/andrea.jpg", group:"Mahway",
      bullets:[
        "Ex-Venture Partner da 500 Startups (500 Global)",
        "Apoiou 100+ startups · ajudou a captar mais de USD 100M",
        "Co-fundadora da inDinero (Y Combinator backed)",
        "Serial founder e investidora em fintech, insurtech e AI",
        "Referência global em estratégia de go-to-market para tech startups",
      ] },
  ];
  return (
    <section className="abteam" data-reveal>
      <div className="wrap">
        <div className="abteam__head">
          <div className="eyebrow">· Sócios & Co-Founders</div>
          <h2 className="display abteam__title">Construído <em>por dentro</em><br/>do setor.</h2>
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
                <div className="abteam__name display">{f.name}</div>
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
            <span className="eyebrow">· Sócios & Conselheiros Estratégicos</span>
            <span className="abteam__partners-note">Mahway (California, EUA) · Avante (Brasil)</span>
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
          <div className="eyebrow">· Time TECH & IA</div>
          <h2 className="display abtech__title">
            Estrutura de engenharia<br/>
            <em>World Class</em> desde o dia zero.
          </h2>
          <p className="abtech__sub">
            A WIR opera com um time enxuto de engenharia núcleo no Brasil, sustentado pela infraestrutura global de Tech & IA da Mahway — a mesma que impulsiona algumas das maiores empresas de tecnologia do mundo.
          </p>
        </div>

        <div className="abtech__stats">
          <div className="abtech__stat">
            <div className="abtech__stat-v display">1 + 3</div>
            <div className="abtech__stat-l">CTO + 3 engenheiros núcleo</div>
            <div className="abtech__stat-d">Engenharia Brasil · arquitetura, ML aplicado, integrações com core de apólice e observabilidade em produção.</div>
          </div>
          <div className="abtech__stat">
            <div className="abtech__stat-v display">+ Mahway</div>
            <div className="abtech__stat-l">Pipeline global de talento</div>
            <div className="abtech__stat-d">Acesso direto a desenvolvedores, modelos de IA e práticas de ponta da Mahway (California, EUA) — escalamos o time de engenharia sem fricção de recrutamento local.</div>
          </div>
          <div className="abtech__stat">
            <div className="abtech__stat-v display">À prova do futuro</div>
            <div className="abtech__stat-l">Operação que evolui com o setor</div>
            <div className="abtech__stat-d">Modelos versionados, observabilidade contínua e arquitetura preparada para novas regulamentações e novos canais — sem refazer o stack.</div>
          </div>
        </div>

        <div className="abtech__foot">
          A combinação <b>WIR (expertise em seguros) + Avante (governança) + Mahway (Tech & IA global)</b> é o que nos posiciona em outro patamar — entregamos plataforma enterprise, segurança operacional e velocidade de startup nativa em IA, em um único parceiro.
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
          <div className="eyebrow eyebrow--onDark">· Sócios & Conselheiros Estratégicos</div>
          <h2 className="display abpart__title">A <em>holding</em> que potencializa<br/>a <em>WIR Innovation.</em></h2>
          <p className="abpart__sub">A WIR não opera sozinha. Foi co-criada e é sustentada por uma estrutura de sócios, investidores e venture builder global que multiplica nossa capacidade de entrega ao cliente.</p>
        </div>
        <div className="abpart__grid">
          <div className="abpart__card">
            <div className="abpart__logo display">Mahway</div>
            <div className="abpart__tag">Tech & IA World Class · California, EUA</div>
            <p>
              Venture Builder Mahway investidora da WIR, com a mesma infraestrutura de IA que impulsiona algumas das maiores empresas de tecnologia do mundo. Acesso direto aos melhores desenvolvedores, modelos de IA e práticas de ponta — escala global sem fricção. <b>Mahway co-funda, co-constrói e opera empresas de tecnologia de alto impacto lado a lado com os fundadores</b>, da ideia ao scale.
            </p>
            <div className="abpart__meta">
              <span>· Co-funding</span>
              <span>· Co-building</span>
              <span>· Talent pipeline</span>
              <span>· Go-to-market USA</span>
            </div>
          </div>
          <div className="abpart__card">
            <div className="abpart__logo display"><em>Avante</em></div>
            <div className="abpart__tag">Holding de IA Estratégica · Brasil</div>
            <p>
              A AVANTE é a <b>holding de IA co-fundadora da WIR</b>. Gerida por sócios com histórico comprovado em Venture Capital, Private Equity e mercado de capitais no Brasil, garante que a WIR cresça com segurança regulatória, compliance, previsibilidade financeira e capacidade de reinvestimento contínuo. Portfolio em InsurTech, legal claims e soluções service-driven AI-first.
            </p>
            <div className="abpart__meta">
              <span>· Governança</span>
              <span>· Solidez financeira</span>
              <span>· Compliance regulatório</span>
              <span>· LatAm</span>
            </div>
          </div>
        </div>
        <div className="abpart__foot">
          O resultado para o cliente: <b>conhecimento profundo do mercado segurador, solidez financeira de longo prazo e nível World Class em tecnologia e IA</b> — em um único parceiro.
        </div>
      </div>
    </section>
  );
}

function AboutValues() {
  const vals = [
    { k:"01", t:"Resultado antes de tecnologia",
      d:"Não vendemos IA — vendemos resultado de negócio. Cada produto da WIR é avaliado pelo impacto real que entrega ao P&L do cliente, não pela sofisticação técnica.", c:"#1C17FF" },
    { k:"02", t:"Plataforma, não SaaS",
      d:"Um SaaS resolve uma feature. Uma plataforma sustenta uma operação inteira. A WIR foi desenhada para ser a camada de IA que escala com o cliente — durante anos, não trimestres.", c:"#A44F98" },
    { k:"03", t:"Plug-and-play sem TI",
      d:"O cliente não troca o core, não enfrenta projeto pesado de TI, não migra dado. A WIR opera como camada de IA entre os sistemas que já existem — em semanas, não em anos.", c:"#EE7D48" },
    { k:"04", t:"Auditabilidade como fundação",
      d:"Nenhuma decisão sai sem trilha completa: modelo, versão, confiança, inputs, timestamp. LGPD-ready, exportável, imutável. Compliance não é feature — é a arquitetura.", c:"#F9B336" },
    { k:"05", t:"Humano no comando do julgamento",
      d:"IA que decide risco crítico sem supervisão é problema. A WIR libera o underwriter para fazer o que só ele faz — analisar e subscrever risco — automatizando tudo o que vem antes.", c:"#4D38C0" },
    { k:"06", t:"World Class por design",
      d:"Construímos com a infraestrutura global de IA da Mahway, governança financeira da Avante e expertise C-Level em seguros. O cliente recebe nível enterprise desde o dia um.", c:"#C25F7E" },
  ];
  return (
    <section className="abvals" id="principios" data-reveal>
      <div className="wrap">
        <div className="abvals__head">
          <div className="eyebrow">· Princípios</div>
          <h2 className="display abvals__title">Seis princípios.<br/><em>Nenhum negociável.</em></h2>
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
  const qs = [
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
      a:"Duas fases. Implementação: projeto com escopo fechado, 3 a 12 meses, preço único acordado antes de começar. SaaS pós go-live: cobrança calibrada ao volume de decisões processadas, sem taxa fixa, sem surprise billing. Cada simulação é feita sobre os dados reais do cliente — não promemos números genéricos." },
    { q:"Quais ramos de seguro vocês cobrem?",
      a:"SS e UI estão em produção para subscrição comercial — começamos por ramos onde a fricção operacional do underwriter é maior (Transportes, Riscos de Engenharia, P&C corporativo). XBA (cross-sell) e SNB (new business) estão em desenvolvimento. Não trabalhamos com seguro residencial massificado." },
  ];
  const [open, setOpen] = React.useState(0);
  return (
    <section className="abfaq" data-reveal>
      <div className="wrap">
        <div className="abfaq__head">
          <div className="eyebrow">· Perguntas frequentes</div>
          <h2 className="display abfaq__title">O que as equipes de TI e risco <em>sempre perguntam.</em></h2>
        </div>
        <div className="abfaq__list">
          {qs.map((x, idx) => {
            const isOpen = open === idx;
            return (
              <div key={idx} className={"abfaq__item" + (isOpen ? " is-open" : "")}>
                <button className="abfaq__q" onClick={()=>setOpen(isOpen ? -1 : idx)}>
                  <span className="abfaq__idx num">· {String(idx+1).padStart(2,"0")}</span>
                  <span className="abfaq__qt">{x.q}</span>
                  <span className="abfaq__chev" aria-hidden>{isOpen ? "−" : "+"}</span>
                </button>
                <div className="abfaq__a" style={{maxHeight: isOpen ? 400 : 0}}>
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
          <div className="eyebrow eyebrow--onDark">· Vem construir</div>
          <h2 className="display abclose__title">
            Estamos <em>contratando.</em>
          </h2>
          <p className="abclose__lede">
            Engineering, ML, delivery e GTM. Posições remotas, SP, NYC e Silicon Valley. Se você já operou seguro por dentro ou construiu plataforma regulada em outro setor — temos cadeira aberta.
          </p>
          <div className="abclose__actions">
            <a className="btn btn--solid btn--onDark" href="mailto:contato@wirinnovation.ai?subject=Interesse%20em%20carreira%20WIR%20Innovation&body=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20oportunidades%20na%20WIR%20Innovation.">
              Enviar currículo <span className="btn__arrow">→</span>
            </a>
            <button className="btn btn--ghost btn--onDark" onClick={()=>go("contact")}>
              Falar com a equipe <span className="btn__arrow">→</span>
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

