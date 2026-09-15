import React from 'react';
import { Opening } from './home-opening.jsx';
import { LANG, INSIGHTS_HREF, INSIGHTS_HREFLANG } from './i18n.js';
import { HOME_INSIGHTS } from './home-insights.mjs';
import './styles/home-scale.css';

const T = {
  pt: {
    capacityKicker: '01 / Capacidade para crescer', capacityTitle: <>Mais capacidade.<br/>Critério em cada decisão.</>,
    capacityNote: <>A IA organiza o trabalho.<br/>A experiência da equipe<br/>orienta a operação.</>,
    names: ['Distribuição', 'Subscrição', 'Visibilidade'],
    benefits: [
      ['Mais oportunidades com o cliente certo.', 'Jornada comercial mais eficiente.', 'Integração com o ecossistema da operação.'],
      ['Avaliação de risco mais precisa.', 'Critérios consistentes e auditáveis.', 'Suporte à decisão com IA e dados.'],
      ['Visão integrada da operação.', 'Acompanhamento de processos em tempo real.', 'Mais clareza para priorizar o que importa.'],
    ],
    solution: 'Conhecer a solução', visibility: 'Explorar inteligência operacional',
    processKicker: '02 / Do planejamento ao impacto', processTitle: <>Da prioridade<br/>do negócio<br/>à <em>operação.</em></>,
    processNote: 'Uma jornada em parceria para gerar valor real',
    steps: [ ['Diagnóstico', 'Entendemos seus desafios, objetivos e contexto operacional.'], ['Implementação', 'Configuramos a solução com o seu time, de forma ágil e estruturada.'], ['Operação', 'Acompanhamos a evolução e apoiamos o uso contínuo para gerar impacto.'] ],
    teamKicker: '03 / Quem está ao seu lado', teamTitle: <>Conhecimento do setor.<br/><em>Visão de futuro.</em></>,
    teamNote: 'Experiência em seguros, negócios e tecnologia para conectar as prioridades da sua operação às possibilidades da IA.',
    teamLink: 'Conheça a WIR', founder: 'Cofundador',
    bios: ['Empreendedor e executivo com trajetória em seguradoras, corretoras e InsurTechs.', 'Executivo com experiência em seguros, saúde e transformação de negócios.'],
    insightsKicker: '04 / Insights', insightsTitle: <>O mercado em movimento.<br/><em>Perspectivas para decidir.</em></>,
    archive: 'Todos os insights', read: 'Ler artigo',
    closeKicker: 'O próximo passo começa com uma conversa', closeTitle: <>Vamos ampliar a capacidade<br/>da sua <em>operação?</em></>, closeNote: 'Conte o que é prioridade para o seu negócio. Vamos explorar como a WIR pode ajudar.', contact: 'Falar com a WIR',
  },
  en: {
    capacityKicker: '01 / Capacity to grow', capacityTitle: <>More capacity.<br/>Judgment in every decision.</>,
    capacityNote: <>AI organizes the work.<br/>Your team’s experience<br/>guides the operation.</>,
    names: ['Distribution', 'Underwriting', 'Visibility'],
    benefits: [ ['More opportunities with the right customer.', 'A more efficient sales journey.', 'Integration with your operational ecosystem.'], ['More precise risk assessment.', 'Consistent, auditable criteria.', 'Decision support with AI and data.'], ['An integrated view of your operation.', 'Real-time process monitoring.', 'More clarity to prioritize what matters.'] ],
    solution: 'Explore the solution', visibility: 'Explore operational intelligence',
    processKicker: '02 / From planning to impact', processTitle: <>From business<br/>priorities<br/>to <em>operation.</em></>, processNote: 'A shared journey to create real value',
    steps: [ ['Diagnosis', 'We understand your challenges, goals, and operational context.'], ['Implementation', 'We configure the solution with your team through a structured, agile process.'], ['Operation', 'We follow progress and support ongoing use to create impact.'] ],
    teamKicker: '03 / The people beside you', teamTitle: <>Industry knowledge.<br/><em>A vision for what’s next.</em></>, teamNote: 'Experience in insurance, business, and technology to connect your operational priorities with the possibilities of AI.',
    teamLink: 'Meet WIR', founder: 'Co-Founder', bios: ['Entrepreneur and executive with experience in insurers, brokerages, and InsurTechs.', 'Executive with experience in insurance, healthcare, and business transformation.'],
    insightsKicker: '04 / Insights', insightsTitle: <>A market in motion.<br/><em>Perspectives for decisions.</em></>, archive: 'All insights', read: 'Read article',
    closeKicker: 'The next step starts with a conversation', closeTitle: <>Let’s build more capacity<br/>for your <em>operation.</em></>, closeNote: 'Tell us what matters most to your business. Let’s explore how WIR can help.', contact: 'Talk to WIR',
  },
  es: {
    capacityKicker: '01 / Capacidad para crecer', capacityTitle: <>Más capacidad.<br/>Criterio en cada decisión.</>, capacityNote: <>La IA organiza el trabajo.<br/>La experiencia del equipo<br/>orienta la operación.</>,
    names: ['Distribución', 'Suscripción', 'Visibilidad'],
    benefits: [ ['Más oportunidades con el cliente adecuado.', 'Un recorrido comercial más eficiente.', 'Integración con el ecosistema de la operación.'], ['Evaluación de riesgo más precisa.', 'Criterios consistentes y auditables.', 'Apoyo a la decisión con IA y datos.'], ['Visión integrada de la operación.', 'Seguimiento de procesos en tiempo real.', 'Más claridad para priorizar lo que importa.'] ],
    solution: 'Conocer la solución', visibility: 'Explorar inteligencia operativa',
    processKicker: '02 / De la planificación al impacto', processTitle: <>De la prioridad<br/>del negocio<br/>a la <em>operación.</em></>, processNote: 'Un camino en conjunto para generar valor real',
    steps: [ ['Diagnóstico', 'Entendemos tus desafíos, objetivos y contexto operativo.'], ['Implementación', 'Configuramos la solución con tu equipo, de forma ágil y estructurada.'], ['Operación', 'Acompañamos la evolución y apoyamos el uso continuo para generar impacto.'] ],
    teamKicker: '03 / Quién está a tu lado', teamTitle: <>Conocimiento del sector.<br/><em>Visión de futuro.</em></>, teamNote: 'Experiencia en seguros, negocios y tecnología para conectar las prioridades de tu operación con las posibilidades de la IA.',
    teamLink: 'Conoce WIR', founder: 'Cofundador', bios: ['Emprendedor y ejecutivo con trayectoria en aseguradoras, corredoras e InsurTechs.', 'Ejecutivo con experiencia en seguros, salud y transformación de negocios.'],
    insightsKicker: '04 / Insights', insightsTitle: <>El mercado en movimiento.<br/><em>Perspectivas para decidir.</em></>, archive: 'Ver archivo en portugués', read: 'Leer artículo',
    archiveNote: 'Nuestros artículos están disponibles en portugués e inglés. Explora el archivo en portugués.',
    closeKicker: 'El próximo paso empieza con una conversación', closeTitle: <>Ampliemos la capacidad<br/>de tu <em>operación.</em></>, closeNote: 'Cuéntanos qué es prioridad para tu negocio. Exploremos cómo WIR puede ayudarte.', contact: 'Hablar con WIR',
  },
}[LANG];

const products = ['Smart Sales', 'Underwriter Intelligence', 'Dashboards e analytics'];
const targets = ['stack-tab-SS', 'stack-tab-UI', 'operational-intelligence'];
function RouteLink({ go, route = 'solutions', anchor, className = 'scale-link', children }) {
  return <a className={className} href={'#' + route + (anchor ? '#' + anchor : '')} onClick={e => { e.preventDefault(); go(route, anchor); }}>{children}<span aria-hidden="true">→</span></a>;
}

// Editable SVG illustrations: layered reach, connected criteria, visible operations.
function CapabilityArt({ index }) {
  const id = 'scale-art-' + index;
  return <svg className="scale-capability__art" viewBox="0 0 210 230" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={id} x1="20" y1="30" x2="180" y2="200" gradientUnits="userSpaceOnUse"><stop stopColor="var(--wir-lavender)" stopOpacity=".25"/><stop offset="1" stopColor="var(--wir-blue)" stopOpacity=".06"/></linearGradient>
      <linearGradient id={id + '-line'} x1="20" y1="180" x2="190" y2="60" gradientUnits="userSpaceOnUse"><stop stopColor="var(--scale-blue)"/><stop offset="1" stopColor="var(--wir-amber)"/></linearGradient>
    </defs>
    {index === 0 ? <>
      {[0, 1, 2].map(i => <path className="scale-art-layer" key={i} d={'M24 ' + (61 + i * 25) + ' 105 ' + (23 + i * 25) + ' 187 ' + (61 + i * 25) + ' 105 ' + (102 + i * 25) + 'Z'} fill={'url(#' + id + ')'} stroke="var(--wir-lavender)" strokeWidth="1"/>)}
      <path className="scale-art-path" d="M40 208 87 181 123 145 174 145" stroke={'url(#' + id + '-line)'} strokeWidth="1.5"/>
      <circle cx="40" cy="208" r="4" fill="var(--scale-blue)" stroke="var(--wir-lavender)"/><circle cx="87" cy="181" r="4" fill="var(--wir-coral)" stroke="var(--wir-lavender)"/><rect x="169" y="140" width="9" height="9" fill="var(--wir-amber)" stroke="var(--wir-lavender)"/>
    </> : index === 1 ? <>
      <path className="scale-art-layer" d="M79 28 158 69 158 202 79 161Z" fill={'url(#' + id + ')'} stroke="var(--scale-blue)"/>
      <path className="scale-art-layer" d="M49 48 126 89 126 222 49 181Z" fill={'url(#' + id + ')'} stroke="var(--wir-lavender)"/>
      {[98, 132, 166].map((y, i) => <g key={y}><path className="scale-art-path" d={'M20 ' + y + 'H87V' + (98 + i * 37) + 'H177'} stroke={'url(#' + id + '-line)'} strokeWidth="1.2"/><rect x="17" y={y - 3} width="6" height="6" fill="var(--scale-rule)" stroke="var(--wir-lavender)"/><circle cx="87" cy={y} r="3" fill="var(--wir-lavender)"/><circle cx="177" cy={98 + i * 37} r="3" fill="var(--wir-amber)"/></g>)}
    </> : <>
      {[3, 2, 1, 0].map(i => <rect className="scale-art-layer" key={i} x={24 + i * 12} y={75 - i * 12} width="123" height="123" rx="8" fill={'url(#' + id + ')'} stroke="var(--wir-lavender)" strokeOpacity={1 - i * .18}/>)}
      <path d="M25 94H146" stroke="var(--wir-lavender)" strokeOpacity=".4"/>
      <circle cx="130" cy="85" r="2" fill="var(--wir-lavender)"/><circle cx="139" cy="85" r="2" fill="var(--wir-lavender)"/>
      {[30, 49, 71, 57, 89].map((h, i) => <rect className="scale-art-bar" key={i} x={44 + i * 17} y={179 - h} width="9" height={h} fill={'url(#' + id + '-line)'} style={{'--bar-delay': i * 70 + 'ms'}}/>)}
      <path className="scale-art-path" d="M150 133H197m-7-4 7 4-7 4M164 164H192m-7-4 7 4-7 4" stroke={'url(#' + id + '-line)'}/>
    </>}
  </svg>;
}
function StepIcon({ index }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    {index === 0 ? <><circle cx="13" cy="13" r="8"/><path d="m19 19 9 9"/></> : index === 1 ? <><path d="M6 8h20M6 16h20M6 24h20"/><circle cx="12" cy="8" r="3" fill="var(--wir-lavender)"/><circle cx="21" cy="16" r="3" fill="var(--wir-lavender)"/><circle cx="10" cy="24" r="3" fill="var(--wir-lavender)"/></> : <><path strokeWidth="3" d="M8 26V17m8 9V10m8 16V4"/></>}
  </svg>;
}

export function HomePage({ go }) {
  return <div className="scale-home">
    <Opening go={go}/>
    <section id="home-capabilities" className="scale-capabilities" aria-labelledby="capacity-title">
      <div className="scale-wrap">
        <p className="scale-kicker">{T.capacityKicker}</p>
        <div className="scale-section-head"><h2 id="capacity-title">{T.capacityTitle}</h2><p>{T.capacityNote}</p></div>
        <div className="scale-capability-grid">
          {T.names.map((name, i) => <article className="scale-capability" key={name}>
            <span className="scale-capability__number">0{i + 1}</span>
            <h3>{name}</h3><p className="scale-capability__product">{i === 2 && LANG !== 'pt' ? 'Dashboards & analytics' : products[i]}</p>
            <div className="scale-capability__body"><CapabilityArt index={i}/><ul>{T.benefits[i].map(b => <li key={b}>{b}</li>)}</ul></div>
            <RouteLink go={go} anchor={targets[i]}>{i === 2 ? T.visibility : T.solution}</RouteLink>
          </article>)}
        </div>
      </div>
    </section>
    <section id="home-implementation" className="scale-process" aria-labelledby="process-title">
      <div className="scale-wrap">
        <div className="scale-process__top"><p className="scale-kicker">{T.processKicker}</p><p className="scale-process__note">{T.processNote}</p></div>
        <div className="scale-process__grid"><h2 id="process-title">{T.processTitle}</h2>
          <ol>{T.steps.map(([title, text], i) => <li key={title}><div className="scale-step-icon"><StepIcon index={i}/></div>{i < 2 && <span className="scale-step-arrow" aria-hidden="true">⟶</span>}<h3>{title}</h3><p>{text}</p></li>)}</ol>
        </div>
      </div>
    </section>
    <section className="scale-team" aria-labelledby="team-title">
      <div className="scale-wrap scale-team__grid"><div className="scale-team__intro"><p className="scale-kicker">{T.teamKicker}</p><h2 id="team-title">{T.teamTitle}</h2><p>{T.teamNote}</p><RouteLink go={go} route="about">{T.teamLink}</RouteLink></div>
        <div className="scale-founders">{['Nicholas Weiser', 'José Carlos de Paula'].map((name, i) => <article className="scale-founder" key={name}>
          <div className="scale-founder__photo"><img src={'/assets/team/' + (i ? 'jose-carlos' : 'nicholas') + '.jpg'} alt={name} loading="lazy" width="500" height="600"/></div>
          <h3>{name}</h3><span>{i ? 'CSO' : 'CEO'} · {T.founder}</span><p>{T.bios[i]}</p>
        </article>)}</div>
      </div>
    </section>
    <section className="scale-insights" aria-labelledby="insights-title"><div className="scale-wrap">
      <p className="scale-kicker">{T.insightsKicker}</p><div className="scale-section-head"><h2 id="insights-title">{T.insightsTitle}</h2><a className="scale-link" href={INSIGHTS_HREF} hrefLang={INSIGHTS_HREFLANG}>{T.archive}<span aria-hidden="true">↗</span></a></div>
      {LANG === 'es' ? <div className="scale-insights__archive"><span aria-hidden="true">PT / EN</span><p>{T.archiveNote}</p><a className="scale-button scale-button--navy" href={INSIGHTS_HREF} hrefLang="pt-BR">{T.archive}<span aria-hidden="true">↗</span></a></div> : <div className="scale-insights__grid">{HOME_INSIGHTS[LANG].map(article => <article className="scale-article" key={article.slug}>
        <a href={'/insights/' + article.slug + '/'} hrefLang={LANG === 'pt' ? 'pt-BR' : 'en'}><div className="scale-article__image"><img src={article.image} alt="" width="600" height="400" loading="lazy"/></div><div className="scale-article__meta"><time dateTime={article.dateISO}>{article.date}</time><span>{article.time}</span></div><h3>{article.title}</h3><span className="scale-link">{T.read}<span aria-hidden="true">↗</span></span></a>
      </article>)}</div>}
    </div></section>
    <section className="scale-contact" aria-labelledby="contact-title"><div className="scale-wrap"><p className="scale-kicker">{T.closeKicker}</p><h2 id="contact-title">{T.closeTitle}</h2><p className="scale-contact__note">{T.closeNote}</p><RouteLink go={go} route="contact" className="scale-button scale-button--light">{T.contact}</RouteLink></div></section>
  </div>;
}
