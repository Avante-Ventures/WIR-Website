import React, { useState, useEffect, useRef, useMemo } from 'react';

/* Insights & News — articles + reader */

export const ARTICLES = [
  {
    slug: "automatizar-subscricao-seguros-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "How to automate insurance underwriting with an AI layer",
    sub: "A practical guide to automate insurance underwriting with an external AI layer on top of your core. The 6-stage flow, deployment path, governance, and LGPD.",
    author: "WIR Innovation", role: "Team",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "A practical guide to automate insurance underwriting with an external AI layer on top of your core. The 6-stage flow, deployment path, governance, and LGPD.",
    body: `### What it means to automate underwriting with an AI layer

How to automate insurance underwriting with AI starts with one architectural choice: place an external AI layer on top of the systems the insurer already runs, instead of rebuilding the core. WIR is the AI layer for insurance in Brazil. It reads broker submissions, structures them, scores the risk against the insurer's own appetite, prices within set authority, and returns an explainable decision, while the core remains the system of record for binding, issuance, and regulatory reporting.

In Brazilian Seguros e Danos (P&C), the path from a broker submission to a bound quote is still largely manual, and that is where service levels, consistency, and underwriter capacity leak away. Submissions arrive by email, broker portal, PDF, and spreadsheet, so the subscritor (underwriter) re-keys data before any risk judgment begins. Two underwriters can price the same risk differently when the manual lives in human memory rather than in a calibrated scoring layer. The cost shows up as slow turnaround, lost conversion, and pricing drift.

The reader who benefits from this is the underwriting or subscrição (underwriting) lead, the product or innovation head, and the broker (corretor) channel that chooses insurers by response speed. The pressure is structural. The Brazilian Seguros e Danos market grows double digits per year, while company structure does not keep pace with that acceleration, so headcount alone cannot absorb the volume. Deloitte finds that underwriters spend 40% of their time on administrative tasks rather than risk judgment, which is precisely the layer an external AI engine is built to remove. This guide explains the mechanism, the deployment, and the governance that make automation defensible. Where a market claim appears, see WIR's insurance market intelligence for the underlying context.

### How the automated underwriting journey works

The automated journey replaces the manual one with a six-stage flow that preserves an audit record at every step. It is worth describing in sequence, because each stage removes a specific failure in the manual process.

The first stage is multichannel intake with automatic validation. The layer ingests submissions through the formats the insurer already uses, whether API, portal, or direct upload of email and attachments. Each submission is registered with its own identifier, timestamp, channel, and source broker, which creates the first audit record before any analysis runs. The second stage is intelligent document reading. Machine Learning and document-AI extract fields from propostas, schedules, laudos, and financials with high precision, then normalize them into the insurer's data dictionary, so cargo manifests, property schedules, and fleet lists no longer demand manual re-keying.

The third stage is broker enrichment and context. The layer cross-references external and historical sources such as CNPJ records, broker conversion history, exposure, and credit, then scores submission completeness and prioritizes the work. An incomplete submission triggers an automated request for information back to the corretor instead of stalling in silence. The fourth stage is the risk and fraud engine, a multi-factor ML model calibrated to the insurer's appetite and underwriting manual. It produces a risk score and probability, runs a parallel check for anomalies and manipulated documents, and reaches an automated decision tuned to that insurer's loss data rather than a generic benchmark.

The fifth stage is dynamic pricing. The layer calculates a risk-adjusted premium (prêmio) using the insurer's own rating logic, instantly and within the authority bands the underwriting team defines, so pricing reflects the line of business (ramo), the exposure, and the risk grade. The sixth stage is decision and prioritization. Each risk returns as a quote, an automatic decline, or an escalation to a human, always with the explanation attached, then writes back to the policy core and returns the audit trail with a visible service level and underwriter queue. Stages one and two remove re-keying, stages three and four remove inconsistent judgment, stage five removes pricing drift, and stage six puts underwriter time only where human judgment adds value.

### How to deploy the external AI layer

Deployment is a staged rollout that keeps the core untouched and de-risks adoption, which matters in a market where BCG reports that 70% of insurers do not execute innovation because of IT limitations. The starting point is scope. The insurer chooses one or two lines (ramos) and a submission channel to begin, for example SME Patrimonial or Transportes cargo, and defines the target service level, the straight-through-processing goal, and the metrics that count, such as quote turnaround and underwriter hours saved.

Integration comes next. WIR connects through API to read submissions and write structured decisions back, while the core stays the system of record for binding, issuance, and regulatory reporting. No migration of historical policies is required to begin, because this is an external AI layer, not a system migration and not an IT project the insurer's team has to run. Calibration follows. The insurer's authority limits, exclusions, appetite, and underwriting manual are encoded into the scoring and pricing layer, and the model is tuned on the insurer's loss history so decisions reflect that insurer's policy rather than a market average.

Testing runs the layer in shadow mode against live submissions, comparing machine recommendations to underwriter decisions and measuring agreement, false-positive fraud flags, and extraction accuracy before any automated decision goes live. Go-live then starts narrow, with auto-quote for low-complexity, in-appetite risks and human-in-the-loop escalation for the rest, expanding the straight-through band as confidence builds. Continuous operation closes the loop, monitoring model drift, recalibrating to new loss experience, and feeding underwriter overrides back into the model. Setup runs 3 to 12 months with a fixed price, a clear scope, and KPIs agreed before the work starts, followed by continuous operation in production after go-live.

### Governance, explainability, and LGPD

Automated underwriting in Brazil operates inside data-protection and supervisory expectations, so every automated decision has to be explainable and auditable rather than a black-box score. Each quote, decline, or escalation carries the reasons behind it, meaning the fields, the risk factors, and the appetite rules that drove the outcome, so an underwriter or an auditor can reconstruct any decision after the fact. Every stage from intake to decision is logged with timestamp, inputs, model version, and outcome, and the platform returns a complete audit trail.

LGPD, the Lei Geral de Proteção de Dados (Lei 13.709/2018), governs this directly. Insurance submissions contain personal and sometimes sensitive data, so the layer processes only what is necessary, on a lawful basis, with data-subject rights respected. LGPD's provisions on automated decision-making give the data subject the right to request review, which turns explainability from a nice-to-have into a compliance requirement. Data is encrypted at every step, in transit and at rest, with access controls and segregation so submission data stays protected end to end.

Calibration is what keeps governance honest. Because the model encodes the insurer's own underwriting manual and risk appetite, its decisions stay consistent with the insurer's stated policy, which supports the auditability that SUSEP-supervised entities are expected to maintain. The published frame in the LGPD full text and the ANPD guidance both point the same way. An automated decision is acceptable when it is explainable, auditable, and lawful, and that is the standard an external AI layer has to meet to operate in Brazilian insurance.

### How WIR automates underwriting

WIR is the AI layer for insurance. On top of the systems the insurer already runs, never in their place. It is a 100% external intelligence layer that automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy, with Machine Learning calibrated to the insurer's risk appetite and underwriting manual. It does not replace the core, does not carry risk, and is not an insurer, a broker, or an MGA. The intelligence sits on top, and the insurer's core stays the system of record.

Two modules carry the work. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, so underwriters analyze risk and focus on business development rather than re-keying, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis across product, risk, and broker. Smart Sales handles distribution intelligence, mapping the portfolio by client and product, scoring upsell and next-best-action, and running multi-channel campaigns with an attribution trail, so penetration and retention grow together. Real-time dashboards and analytics give a proactive view of in-flight deals and the pipeline.

The traction is deliberately conservative. WIR has a first POC in execution with a global insurer in the Transport line, and nothing beyond that is claimed. Every decision the platform returns is explainable and carries a full audit trail, data is encrypted at every step and LGPD compliant, and the model stays calibrated to each insurer's underwriting policy rather than a generic benchmark. Capgemini finds that 60%+ of brokers choose an insurer by response speed, and Gartner estimates that companies lose 20-30% of their time organizing unstructured data, which is the time an external AI layer gives back to the underwriting team. To see where automation creates the most value in a specific underwriting journey, book a conversation with WIR.

### Frequently asked questions

**Does WIR's AI layer replace the insurer's core?**

No. WIR is a 100% external AI layer that sits on top of the systems the insurer already runs. It reads broker submissions, scores risk against the insurer's own appetite, prices within set authority, and returns an explainable decision. The core stays the system of record for binding, issuance, and regulatory reporting. WIR does not carry risk and is not an insurer, broker, or MGA. The intelligence sits on top, never in the core's place.

**How long does it take to deploy underwriting automation?**

Setup runs 3 to 12 months, with a fixed price, a clear scope, and KPIs agreed before the work starts. Continuous operation in production follows go-live. The rollout is staged: the insurer scopes one or two lines and a channel, WIR integrates by API, the model is calibrated, the layer runs in shadow mode, then go-live starts narrow with auto-quote for low-complexity, in-appetite risks. No migration of historical policies is required to begin.

**How is the AI model calibrated to the insurer's risk appetite?**

WIR encodes the insurer's authority limits, exclusions, appetite, and underwriting manual into the scoring and pricing layer, then tunes the Machine Learning model on the insurer's own loss history. Decisions reflect that insurer's stated policy rather than a market average. The risk and fraud engine produces a score and probability calibrated to appetite, dynamic pricing uses the insurer's own rating logic, and underwriter overrides feed back into the model during continuous operation to keep it aligned.

**Are automated decisions auditable and LGPD compliant?**

Yes. Every quote, decline, or escalation carries the reasons behind it, the fields, risk factors, and appetite rules that drove the outcome, so an underwriter or auditor can reconstruct any decision. Every stage from intake to decision is logged with timestamp, inputs, model version, and outcome, and the platform returns a complete audit trail. Data is encrypted in transit and at rest, processed on a lawful basis, and LGPD compliant, with data-subject rights respected, including the right to request review.

**Does the insurer need an IT project to get started?**

No. WIR is an external AI layer, not a system migration and not an IT project the insurer's team has to run. It connects through API to read submissions and write structured decisions back, while the core stays untouched as the system of record. No migration of historical policies is required to begin. This matters because BCG reports that 70% of insurers do not execute innovation due to IT limitations, the exact barrier an external layer removes.`
  },
  {
    slug: "o-underwriter-nao-morre",
    cat: "Ensaio", hero: true, grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Underwriter analisando documentos em mesa de trabalho",
    title: "O underwriter não morre. O modelo operacional dele, sim.",
    sub: "Por que a próxima década do seguro vai ser definida pela divisão entre quem tem infraestrutura de decisão e quem ainda mora em planilha.",
    author: "Nicholas Weiser", role: "CEO · Co-Founder",
    authorPhoto: "assets/team/nicholas.jpg",
    time: "12 min", date: "18 · Abr · 2026",
    metaDesc: "A IA não substitui underwriters — substitui os 80% do trabalho que não é underwriting. Como o setor segurador brasileiro vai se dividir.",
    body: `Há um debate que consome conferências, painéis e LinkedIn no setor segurador brasileiro: a IA vai substituir o underwriter?

A resposta é não.

A pergunta é errada.

A IA não substitui o underwriter. A IA substitui os 80% do trabalho do underwriter que não é underwriting — o intake manual de submissões, a extração repetitiva de dados de PDFs, o ping-pong com corretora pedindo a mesma informação três vezes, a planilha rabiscada em paralelo, o e-mail de "qual é a apólice mãe?" enviado às 19h da terça-feira.

E é exatamente por isso que o setor vai se dividir em dois: as seguradoras que reorganizaram a operação em torno desse princípio, e as que ainda estão tentando fazer 47 cotações por dia com o mesmo time, no mesmo Excel, com o mesmo CRM de 2014.

> A IA não substitui o underwriter. A IA substitui os 80% do trabalho dele que não é underwriting.

### A pergunta errada

A discussão pública sobre IA e seguros costuma colapsar em uma falsa dicotomia: ou a tecnologia "automatiza o underwriter" e ele perde o emprego, ou a tecnologia "ajuda o underwriter" e tudo continua igual com um copiloto ao lado.

Underwriting de risco corporativo — o tipo de operação que define o P&L de uma seguradora Tier-1 — é uma atividade composta por dezenas de subtarefas. Em Transportes, P&C industrial, Riscos de Engenharia ou D&O, a decisão final de aceitar ou recusar um risco — *aquela* decisão, a que tem peso, julgamento, intuição calibrada por anos de carteira — representa entre 10% e 20% do tempo do underwriter sênior.

Os outros 80% são execução. E execução é exatamente o que máquina faz melhor que humano, há décadas, em qualquer indústria comparável.

A pergunta correta, então, não é "a IA substitui o underwriter?". É: *se a IA absorver os 80% que não é decisão, qual é o novo modelo operacional?*

### Um dia na vida de um underwriter Tier-1

Para entender o que está em jogo, vale descrever o dia real de um underwriter sênior em uma seguradora Tier-1 brasileira em 2026.

Ele chega às 8h. Tem 47 e-mails na caixa: 23 são submissões novas de corretoras parceiras, 12 são pedidos de revisão, 8 são follow-ups de risco em análise, 4 são notas internas sobre carteira ou apetite atualizado.

Para abrir uma única submissão, ele precisa: descompactar o anexo (raramente um único PDF — costuma ser um zip com 11 arquivos), abrir o portal da seguradora, criar um cadastro, copiar manualmente nome do segurado, CNPJ, faturamento, atividade, endereço, dados do corretor. Cruzar com o sistema antifraude. Cruzar com a base interna de sinistralidade. Pedir, por e-mail, ao corretor, o questionário de risco que veio incompleto. Esperar.

No meio disso, atender à reunião de pipeline com diretoria às 10h, voltar pra mesa, encontrar mais 6 submissões na fila, perceber que uma das que ele estava analisando esfriou — corretor já foi pra concorrente que cotou em 4h — e seguir.

Às 18h, ele cotou três riscos. Tem 12 na fila. A diretoria pergunta por que o ciclo de cotação está em 11 dias quando o concorrente cota em 5.

Em entrevistas com underwriters seniores em mais de uma dúzia de seguradoras e corretoras corporativas brasileiras, a resposta é consistente: 15% julgamento, 85% operação. O mercado segurador brasileiro fechou 2024 com prêmios de R$ 415 bilhões segundo a [CNseg](https://cnseg.org.br) — e ainda assim o ciclo médio de cotação corporativa em Tier-1 está acima de 7 dias úteis.

### O que a IA realmente substitui

A IA não vem para fazer julgamento de risco. Ela vem para devolver ao underwriter o tempo que hoje é consumido por execução.

**Intake automático.** A submissão chega por e-mail, portal, API ou upload. O sistema descompacta o anexo, extrai os campos relevantes e estrutura tudo em schema normalizado.

**Enriquecimento contextual.** Antes de chegar ao underwriter, o caso já foi cruzado com a base interna de sinistralidade, com fontes externas de risco, com o histórico de submissões anteriores do corretor, com o apetite atual da carteira.

**Pré-classificação por apetite.** O risco é marcado como "dentro do apetite", "no limite" ou "fora" — recusa automática, com justificativa auditável, devolvida ao corretor em minutos.

**Sugestão de pricing.** Para casos dentro do apetite, o motor sugere uma cotação calibrada ao livro — não para substituir o underwriter, mas para ele *começar a análise* a partir de um número defensável.

**Decisão e auditoria.** O underwriter abre o caso e vê: dados estruturados, score de risco, sugestão de pricing, alertas, casos similares no histórico, decisão sugerida. Cada decisão fica gravada com modelo, versão, inputs, output, timestamp, justificativa.

O resultado: o mesmo underwriter que cotava 3 riscos por dia agora pode processar 15 a 20, com qualidade maior. E mais importante: o underwriter passa o dia *fazendo underwriting*. Não tarefa-pinga.

### A matemática

Em operações reais que acompanhamos no setor durante 2025 e 2026, o padrão se repete. Throughput por underwriter aumenta entre 4× e 7×. O lead time da cotação cai entre 70% e 90%. A taxa de conversão sobe entre 15% e 35%. O loss ratio fica estável ou marginalmente melhor. O custo de DA por apólice emitida cai entre 40% e 60%.

Uma corretora que processava 800 cotações por mês com 6 underwriters passa a processar 3.000 com os mesmos 6 — sem aumentar headcount, sem reescrever o core, sem renegociar resseguro. O detalhe está descrito no [estudo de caso da implementação Mahway](#blog/caso-implementacao-mahway).

### A divergência de capacidade

Em mercados onde a infraestrutura está madura, o efeito sobre o ranking competitivo é brutal. Operações como [Lemonade](https://www.lemonade.com), [Federato](https://www.federato.ai) e seguradoras Tier-1 norte-americanas com infra de decisão ganham RFPs que seguradoras sem infra nem sabiam estar disponíveis: o corretor precisa de cotação em 2 horas para fechar com um cliente que já está com a concorrência na linha. Quem tem infra responde. Quem não tem, perde a deal antes mesmo de saber que existia.

O Brasil ainda está cedo nessa curva — mas só ainda. Em 2027 e 2028, a diferença entre quem se moveu e quem não se moveu vai aparecer em três lugares: na conta de resultado, no ranking de receita, e na composição dos times.

### Implicações

**Recrutamento muda.** A pirâmide tradicional de underwriting deixa de fazer sentido. Quem tem a infra precisa menos de júnior e mais de seniores capazes de decidir com mais autonomia. A função de "underwriter operacional" some. A função de "underwriter de orquestração" surge.

**Compliance vira fundação, não fricção.** Quando cada decisão é gravada com modelo, versão, inputs e timestamp, a auditoria deixa de ser uma operação separada. Ela é a operação. LGPD, ISO 27001 — não são frameworks que rodam em paralelo. Eles *são* a forma como a plataforma opera. Esse ponto está desenvolvido em [A falsa dicotomia entre velocidade e compliance](#blog/falsa-dicotomia-velocidade-compliance).

**A pergunta executiva muda.** Diretorias que ainda discutem "vamos adotar IA" estão fazendo a pergunta errada. A correta é: *estamos reorganizando o modelo operacional em torno da capacidade que a IA libera?*

### Sobre o que vem

A WIR Innovation foi fundada exatamente sobre essa tese: o futuro do seguro não é menos humano. É menos operacional. A camada de IA que construímos opera *entre* os canais de cotação e o core de apólice — não substitui nenhum dos dois — e devolve ao underwriter o tempo, o contexto e a auditabilidade necessários para fazer aquilo que ele sempre fez melhor: decidir.

O underwriter não morre.

O modelo operacional dele, sim.

### Referências e leituras

- [CNseg — Confederação Nacional das Seguradoras](https://cnseg.org.br) · dados macro do mercado segurador BR
- [BCG Insurance Industry Reports](https://www.bcg.com/industries/insurance) · análises globais
- [Federato](https://www.federato.ai) · plataforma de underwriting moderna (US)
- [Lemonade](https://www.lemonade.com) · insurtech de varejo automatizada
- [Caso de implementação WIR + Mahway](#blog/caso-implementacao-mahway) · números reais de uma operação
- [A falsa dicotomia entre velocidade e compliance](#blog/falsa-dicotomia-velocidade-compliance) · por que escolher entre os dois é arquitetura ruim`,
  },

  {
    slug: "explicabilidade-alem-de-shap",
    cat: "Técnico", grad: "linear-gradient(135deg,#7540AC,#FE8B77)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Visualização abstrata de camadas de dados e analytics",
    title: "Explicabilidade que vai além do SHAP",
    sub: "Por que a ferramenta favorita de explicabilidade do data scientist não chega para responder ao regulador. As 4 camadas que tornam uma decisão de seguro defensável.",
    author: "Head of AI", role: "ML · WIR Innovation",
    time: "9 min", date: "12 · Abr · 2026",
    metaDesc: "SHAP explica modelos tabulares — mas decisões de seguro hoje são híbridas (LLM + rules + retrieval). Por que SHAP não basta e o que substitui.",
    body: `Em quase toda conversa técnica sobre IA aplicada a seguros, alguém menciona SHAP. Em quase toda apresentação para diretoria de risco, há um slide com SHAP values. Em quase todo paper acadêmico sobre fairness em ML financeiro, [SHAP](https://arxiv.org/abs/1705.07874) é a ferramenta default.

SHAP é uma boa ferramenta. Para o que ela faz.

O problema é que o que ela faz cobre só uma fatia pequena do que uma decisão real de seguro envolve em 2026.

### O que SHAP realmente explica

SHAP (proposto por [Lundberg & Lee em 2017](https://arxiv.org/abs/1705.07874), e LIME por [Ribeiro et al em 2016](https://arxiv.org/abs/1602.04938)) responde uma pergunta específica: dado um modelo de machine learning treinado em dados tabulares, qual foi a contribuição de cada feature para o output de uma predição individual?

É uma pergunta excelente para o cenário em que SHAP foi desenhado: você tem um random forest, um XGBoost, ou uma rede neural, alimentados por uma tabela de features estruturadas, produzindo um score numérico. SHAP te diz: "o CNPJ ativo contribuiu +0.12 para o score, a sinistralidade declarada contribuiu -0.08".

Para uma decisão de crédito tabular, isso resolve. Para uma decisão de seguro corporativo em 2026, é insuficiente — porque a decisão deixou de ser tabular.

### Por que decisão de seguro deixou de ser tabular

Uma submissão de risco corporativo hoje passa por uma cadeia de transformações antes de chegar ao modelo final.

Primeiro, o input chega como PDF, e-mail ou planilha. Um sistema de extração precisa converter isso em campos. SHAP não cobre essa etapa.

Depois, esses campos são enriquecidos com retrieval — busca semântica em bases internas e externas. SHAP não cobre essa etapa.

Em seguida, o caso é classificado por apetite — frequentemente com uma combinação de regras hard-coded e modelo ML. SHAP cobre o ML, mas não as regras nem a lógica de combinação.

Finalmente, um pricing engine produz output — às vezes um número, às vezes uma frase explicativa para o subscritor. Quando o explicativo é gerado por LLM, SHAP não cobre.

A consequência: você pode ter SHAP perfeito no modelo de scoring final e ainda assim ser incapaz de explicar ao regulador *por que* essa submissão específica recebeu essa decisão específica.

> Auditabilidade nativa é arquitetura. Não é feature. Você não a adiciona depois — você a constrói antes.

### As 4 camadas de explicabilidade real

A arquitetura que adotamos na WIR tem quatro camadas. SHAP, quando aplicável, vive na camada 3.

**Camada 1: Input logging com versionamento.** Toda submissão entra no sistema com um snapshot imutável: arquivos originais, hashes, timestamps, canal de origem, identidade do remetente. Antes de qualquer transformação. Esse snapshot é o ponto de partida da trilha.

**Camada 2: Provenance da extração e enriquecimento.** Cada campo extraído carrega metadata: qual ferramenta extraiu, qual versão, qual confiança. Cada enriquecimento carrega: qual fonte foi consultada, qual versão da resposta, qual timestamp.

**Camada 3: Decisão modelo + regras com SHAP onde couber.** Aqui SHAP pode entrar — mas só para a parte do pipeline que é ML tabular. Para regras hard-coded, registramos a regra disparada, sua versão, e os campos que a satisfizeram. Para LLM-as-judge, registramos o prompt, modelo, versão, temperatura, e a justificativa textual.

**Camada 4: Decision Q&A.** A camada que falta na maioria das implementações: a interface que permite a um auditor fazer uma pergunta em linguagem natural sobre uma decisão específica e receber resposta apoiada nas três camadas anteriores. "Por que esse caso foi recusado?" — resposta: "Porque a regra R-014 disparou. A regra foi atualizada em 12/03/2026. O CNAE foi extraído com confiança 0.97 a partir da página 2."

### Por que isso importa fora da sala de TI

**Resseguro.** Resseguradoras europeias e norte-americanas já estão exigindo trilha completa para subscrição automatizada acima de certos limites. SHAP isolado não atende.

**Susep e LGPD.** A [LGPD (Lei 13.709/2018)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) garante ao titular do dado o direito de obter explicação sobre decisões automatizadas que o afetam. As [comunicações da SUSEP](https://www.gov.br/susep) sobre IA em subscrição estão evoluindo na mesma direção. Operações que dependem de SHAP isolado vão precisar refazer arquitetura quando a fiscalização chegar.

**Diretoria.** Quando o CFO pergunta por que a sinistralidade aumentou 1.2 pontos no trimestre, a resposta com auditabilidade nativa é uma query, não uma investigação de semanas.

### O que isso muda no roadmap

Auditabilidade nativa é arquitetura. Não é feature. Você não a adiciona depois — você a constrói antes, e ela vira o ambiente em que tudo o mais opera. Tentar adicionar trilha completa a um sistema que foi construído sem ela é, em geral, mais caro do que reescrever.

SHAP fica. Mas como uma das ferramentas, não como a resposta. A discussão completa sobre como LLMs e motores de regras se complementam está em [LLMs não substituem motores de regras](#blog/llms-vs-motores-de-regras), e o monitoramento contínuo desses sistemas em produção em [Observabilidade de agentes](#blog/observabilidade-de-agentes).

### Referências e leituras

- [Lundberg & Lee 2017 — A Unified Approach to Interpreting Model Predictions (SHAP)](https://arxiv.org/abs/1705.07874)
- [Ribeiro et al 2016 — "Why Should I Trust You?" (LIME)](https://arxiv.org/abs/1602.04938)
- [LGPD — Lei 13.709/2018](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [SUSEP — comunicações regulatórias](https://www.gov.br/susep)
- [ISO/IEC 27001 — Sistema de Gestão de Segurança da Informação](https://www.iso.org/standard/27001)
- [LLMs vs motores de regras — arquitetura híbrida](#blog/llms-vs-motores-de-regras)
- [Observabilidade de agentes em produção](#blog/observabilidade-de-agentes)`,
  },

  {
    slug: "caso-implementacao-mahway",
    cat: "Caso", grad: "linear-gradient(135deg,#FE8B77,#F8AD39)",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Gráficos de crescimento e métricas de negócio",
    title: "Como uma seguradora portfólio Mahway reduziu seu ciclo de cotação em ordens de grandeza",
    sub: "Estudo de caso da primeira implementação completa da stack WIR. O que funcionou, o que não funcionou, e os números reais.",
    author: "Head of Delivery", role: "Delivery · WIR Innovation",
    time: "7 min", date: "05 · Abr · 2026",
    metaDesc: "Antes: 11 dias de ciclo, 800 cotações/mês, 6 underwriters no limite. Depois: 2h, 3.000 cotações/mês, mesmos 6. O que aconteceu no meio.",
    body: `Casos de uso publicados no setor de seguros costumam ser desonestos. Os números são apresentados sem contexto, o "antes" é caricaturado, e os problemas que apareceram no meio do projeto somem do narrativo final.

Esse texto é o oposto disso. É uma descrição honesta do primeiro caso de implementação completa da stack WIR em uma operação portfólio [Mahway](https://mahway.com) — incluindo as três coisas que não funcionaram de primeira e as duas que tivemos que abandonar.

### O ponto de partida

A operação tinha 6 underwriters seniores cobrindo Transportes, Riscos de Engenharia e P&C corporativo médio. Ciclo de cotação médio: 11 dias. Volume mensal: ~800 submissões. Conversão: 19%.

A queixa interna não era falta de competência técnica. Era throughput. O time recusava casos no apetite porque não tinha tempo de cotar — e o que cotava, cotava tarde demais para concorrer com seguradoras que haviam começado a investir em automação dois anos antes.

A diretoria havia tentado três coisas antes: contratar mais um underwriter (bottleneck virou onboarding), implementar um portal (corretoras não usaram), comprar uma ferramenta de OCR (extraiu campos, não decidiu nada).

Nenhuma resolveu, porque nenhuma atacou o que era um problema de modelo operacional, não de capacidade. O contexto desse problema estrutural é a tese central de [O underwriter não morre](#blog/o-underwriter-nao-morre).

### A intervenção

**Fase 1 (semanas 1-6): Intake estruturado.** O primeiro módulo recebeu submissões pelos canais existentes, descompactou anexos, extraiu campos com camada híbrida de OCR + LLM e estruturou em schema normalizado. Sem decidir nada — só preparou. Resultado: o tempo de "submissão chega" → "underwriter tem dados estruturados na mesa" caiu de 4 horas para 6 minutos.

**Fase 2 (semanas 5-12): Enriquecimento e classificação por apetite.** Em paralelo, ligamos o motor de regras de apetite e o módulo de enriquecimento. Cada submissão passou a chegar pré-classificada em três fluxos: dentro do apetite, borda, ou fora.

**Fase 3 (semanas 11-18): Pricing assistido e auditoria.** Sugestão de pricing calibrada ao livro histórico, e a infraestrutura de logging que registra cada decisão com modelo, versão, inputs, output, timestamp e justificativa — exatamente a arquitetura descrita em [Explicabilidade que vai além do SHAP](#blog/explicabilidade-alem-de-shap).

### O que funcionou

Resultados na semana 18, comparados à baseline. Ciclo de cotação: 11 dias → 2 horas. Volume processado: 800 → 3.000/mês. Headcount: 6 (mesmo time). Conversão: 19% → 26%. Loss ratio: 64% → 61%. NPS dos corretores: 31 → 67.

> A IA isolada não teria movido a agulha — porque o gargalo não era extração de PDF, era operação fragmentada.

O número mais subestimado é o NPS de corretores. A operação não comunicou tecnologia para fora. O que corretores perceberam foi: a seguradora respondia rápido, em formato útil, com explicação quando recusava. Em 6 meses, três corretoras top-30 realocaram volume para frente da fila.

### O que não funcionou de primeira

**Sugestão de pricing virou "preço final" para UWs juniores.** Cotações saíam no número exato sugerido pelo motor — sem ajuste. Os UWs tratavam o número como autoridade. Correção: UX (mais explícito que era sugestão) + treinamento + processo (forçar registro de "ajuste ou aceite" antes do submit).

**Recusa automática gerou complaint do canal.** Recusas vinham com justificativa técnica precisa, em linguagem que soava fria para corretora. Tivemos que adicionar camada de geração de copy — mesma justificativa, em português comercial.

**Override sem registro de motivo.** Versão inicial deixava UW pular a sugestão sem registrar por quê. Em 6 semanas, perdemos sinal sobre quando o modelo estava certo e sendo ignorado vs quando estava errado e sendo corrigido. Forçar campo obrigatório de "motivo do override" resolveu — e virou base para retreinar.

### O que tivemos que abandonar

**Chat com o corretor para completar dados faltantes.** Tecnicamente funcionou. Operacionalmente, corretores acharam invasivo. Voltamos para fluxo humano de cobrança.

**Sugestão de cross-sell na cotação.** Conversão real: 0.4%. Cross-sell em seguro corporativo é construído na relação corretor-cliente, não no momento da cotação. Removemos.

### O que importa para quem está pensando

A leitura clássica desse caso seria "implementar IA = ganhar 4× throughput". Está errada. A leitura correta é: redesenhar o modelo operacional, com IA como infraestrutura, ganhou 4× throughput. A IA isolada não teria movido a agulha — porque o gargalo não era extração de PDF, era operação fragmentada.

Para qualquer operação considerando o caminho similar: o primeiro investimento não é em modelo. É em logging, schema unificado e política de aceitação versionada.

### Referências e leituras

- [Mahway](https://mahway.com) · venture builder Tech & IA (California, EUA)
- [O underwriter não morre — a tese estrutural](#blog/o-underwriter-nao-morre)
- [Explicabilidade que vai além do SHAP — a arquitetura de auditoria usada nesta implementação](#blog/explicabilidade-alem-de-shap)
- [Por que MGAs são a ponta da lança da IA em seguro](#blog/mgas-ponta-da-lanca)`,
  },

  {
    slug: "mgas-ponta-da-lanca",
    cat: "Mercado", grad: "linear-gradient(135deg,#F8AD39,#3222E9)",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Equipe de startup trabalhando em escritório moderno",
    title: "Por que MGAs são a ponta da lança da IA em seguro",
    sub: "Estrutura enxuta, apetite próprio e fome de capacidade. A combinação que faz MGAs adotarem IA mais rápido que Tier-1 — e por que essa vantagem é estrutural.",
    author: "José Carlos de Paula", role: "CSO · Co-Founder",
    authorPhoto: "assets/team/jose-carlos.jpg",
    time: "8 min", date: "28 · Mar · 2026",
    metaDesc: "MGAs adotam IA mais rápido que seguradoras Tier-1 por razões estruturais, não acidentais. As 4 vantagens que mudam quem define a curva de adoção.",
    body: `Em 2024, dei uma palestra para uma plateia de executivos de seguradoras Tier-1 em São Paulo sobre adoção de IA no setor. Uma das primeiras perguntas foi: "vocês estão vendo movimento nas grandes seguradoras?". A resposta honesta era: pouco. O movimento real estava acontecendo em outro lugar — nas MGAs.

Em 2026, virou padrão claro. As primeiras operações brasileiras saindo de POC e entrando em produção com IA aplicada à subscrição não são as Tier-1 — são MGAs e corretoras corporativas que se converteram em quase-MGAs. O mesmo padrão é descrito em análises do [Insurance Journal](https://www.insurancejournal.com) sobre o mercado norte-americano e refletido nos dados que a [SUSEP](https://www.gov.br/susep) e a [CNseg](https://cnseg.org.br) publicam sobre crescimento de MGA no Brasil.

### O que faz uma MGA estruturalmente diferente

Uma MGA, no modelo brasileiro, opera com três características que a distinguem da seguradora tradicional. Tem apetite próprio — pode definir, em larga medida, qual risco aceita ou não, dentro do framework do resseguro. Tem operação enxuta — costuma ter de 5 a 50 pessoas no total. E tem incentivo direto sobre throughput — cada decisão a mais é receita marginal direta, sem o ruído organizacional de uma seguradora de 2.000 funcionários.

> A vantagem competitiva da MGA não está no produto — está na arquitetura organizacional que faz adoção rápida ser default.

### As quatro vantagens estruturais

**Velocidade de decisão organizacional.** Em uma Tier-1, decidir adotar uma plataforma nova passa por: comitê de TI, comitê de risco, comitê de compliance, comitê executivo, conselho. São 6 a 18 meses entre "vamos avaliar" e "vamos contratar". Em uma MGA, a mesma decisão é tomada em uma reunião de 2 horas. Isso não é desorganização — é design.

**Política de aceitação codificada de fato.** A política de apetite de uma Tier-1 está distribuída entre PDF de manual, conhecimento tácito de UWs seniores, exceções históricas e regras informais. Codificar tudo é projeto de 6 a 12 meses. Em uma MGA típica, a política está em uma planilha de 30 linhas que três pessoas conhecem de cor — codificar em motor de regras é projeto de 4 semanas.

**Distribuição mais homogênea.** Tier-1 vendem por dezenas de canais com submissões em formatos diferentes. MGAs costumam ter 2 a 5 canais bem definidos com formato padronizado por contrato. Reduz a complexidade de extração em ordem de grandeza.

**Pressão estrutural sobre capacidade.** Uma Tier-1 pode optar por não escalar. Uma MGA não pode. Cada apólice a mais que ela emite no mês, no limite do apetite, é receita marginal direta.

### O que isso significa para a curva brasileira

As primeiras 50 a 100 operações brasileiras com IA em produção, escalando volume relevante, vão ser MGAs e quase-MGAs. Não Tier-1.

Tier-1 vão chegar lá — mas em ondas. Primeiro, observam (já estão observando). Depois, criam células internas de inovação (já está acontecendo em algumas). Depois, sofisticam essas células em unidades de produção. A janela entre "MGA escala IA" e "Tier-1 escala IA" no Brasil deve ser de 24 a 48 meses.

Nessa janela, as MGAs ganham market share desproporcional em segmentos onde competem com Tier-1: P&C corporativo médio, Transportes nacionais, Riscos de Engenharia. Não porque a MGA tem produto melhor — porque tem ciclo melhor.

### A pergunta para quem é Tier-1

A reação típica de um executivo Tier-1 lendo isso é: "ok, mas nossa estrutura é o que é". Verdade parcial.

Não é replicável estruturalmente. Mas é replicável em isolamento. Uma Tier-1 que cria uma sub-operação dedicada — equipe pequena, política codificada, canal único, autoridade de decisão concentrada — pode operar com a mesma velocidade adaptativa de uma MGA. Várias Tier-1 globais já fizeram isso.

A pergunta real é: vamos criar essa célula com prioridade executiva, ou vamos esperar até que as MGAs tenham capturado share suficiente para forçar a decisão? A relação entre essa decisão e a discussão de compliance está em [A falsa dicotomia entre velocidade e compliance](#blog/falsa-dicotomia-velocidade-compliance).

### A pergunta para quem é MGA

A vantagem estrutural não é eterna. Ela existe enquanto a MGA mantém o que a torna MGA — operação enxuta, política codificada, decisão concentrada. Operações de MGA que crescem rápido e replicam complexidade de Tier-1 perdem essa vantagem em 18 a 24 meses sem perceber.

A vantagem competitiva da MGA não está no produto — está na arquitetura organizacional que faz adoção rápida ser default.

### Referências e leituras

- [CNseg — Confederação Nacional das Seguradoras](https://cnseg.org.br) · dados de mercado BR
- [SUSEP — Superintendência de Seguros Privados](https://www.gov.br/susep) · regulação setorial
- [Insurance Journal — análises sobre MGA](https://www.insurancejournal.com)
- [A falsa dicotomia entre velocidade e compliance](#blog/falsa-dicotomia-velocidade-compliance)
- [O underwriter não morre — a tese de modelo operacional](#blog/o-underwriter-nao-morre)`,
  },

  {
    slug: "llms-vs-motores-de-regras",
    cat: "Técnico", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Circuitos e arquitetura computacional abstrata",
    title: "LLMs não substituem motores de regras — eles os complementam",
    sub: "A arquitetura híbrida da WIR. Quando LLM decide, quando rule engine decide, e como os dois conversam em decisões críticas.",
    author: "Head of AI", role: "ML · WIR Innovation",
    time: "10 min", date: "22 · Mar · 2026",
    metaDesc: "A divisão simplista de 'LLM substitui regras' é tecnicamente errada. A arquitetura híbrida que decide riscos críticos no setor segurador.",
    body: `Há duas posições populares no debate sobre IA em decisões críticas e ambas estão erradas.

A primeira: "LLM resolve tudo, motor de regras é coisa do passado". Quem defende essa posição costuma ter mais experiência em chatbot do que em produção financeira.

A segunda: "LLM é caixa-preta, decisão crítica continua sendo motor de regras". Quem defende essa posição costuma estar tentando vender exatamente um motor de regras (geralmente em torno de [Drools](https://www.drools.org) ou similar).

A realidade técnica em produção real é mais sutil. Decisões automatizadas que escalam sem explodir compliance e sem perder qualidade são, quase sempre, híbridas.

### Onde LLMs ganham, onde regras ganham

LLMs são dominantes onde o input é não-estruturado e o universo de variações é amplo: extrair campos de PDFs com layouts diferentes (problema endereçado por modelos como [LayoutLM da Microsoft](https://arxiv.org/abs/1912.13318)), normalizar atividades econômicas descritas em texto livre, classificar tom de e-mail. Tarefas onde o problema é "interpretação".

Regras são dominantes onde a decisão precisa ser determinística, auditável linha-a-linha e responder a política versionada: aplicar limites de exposição, validar combinações proibidas, calcular fatores de pricing. Tarefas onde o problema é "enforcement".

Misturar essas responsabilidades produz dois tipos de falha. LLMs aplicando regras quebram em casos que estão fora da distribuição de treino sem aviso. Motores de regras interpretando texto produzem combinações explosivas de regex que falham silenciosamente.

A arquitetura híbrida começa com uma pergunta: para cada decisão atômica no pipeline, isso é interpretação ou enforcement?

### Exemplo: submissão de risco P&C industrial

Chega um e-mail de uma corretora corporativa Tier-1, com 9 anexos: questionário, três cotações antigas, layout do parque industrial, fotos do galpão, certificado de inspeção, balanço, proposta.

**Etapa 1 — Extração (LLM).** O sistema descompacta, identifica cada anexo, extrai campos, normaliza atividade econômica ("fabricação de embalagens metálicas para alimentos" → CNAE 2592-6/01) e estrutura em schema. LLM faz porque cada documento é semi-estruturado.

**Etapa 2 — Validação de extração (Regras).** Antes de prosseguir, motor de regras valida invariantes: CNPJ tem 14 dígitos válidos? CNAE existe na tabela oficial? Faturamento é compatível com o porte? Divergência é flagada para revisão.

**Etapa 3 — Enriquecimento (Híbrido).** Cruza CNPJ com bases. Consulta é determinística (regras). Interpretação dos resultados — classificar processos judiciais como "operacional" vs "regulatório" vs "fraude" — usa LLM.

**Etapa 4 — Classificação por apetite (Regras + LLM).** Regras aplicam critérios duros: CNAE está em exclusão? Região tem suspensão? Faturamento ultrapassa limite? Se qualquer regra hard dispara, decisão é determinística e não passamos pelo LLM. Se o caso é borderline, LLM-as-judge avalia o contexto e produz recomendação textual + score (técnica relacionada ao [Constitutional AI da Anthropic](https://arxiv.org/abs/2212.08073), em que o LLM é treinado para seguir critérios explícitos).

**Etapa 5 — Pricing (Modelo ML + Regras).** Motor de pricing tabular sugere prêmio. Regras aplicam ajustes determinísticos: fatores regulatórios, comissão, IOF, mínimo técnico.

**Etapa 6 — Geração de output (LLM).** Caso é apresentado ao underwriter com dados estruturados, score, decomposição, alertas, casos similares e justificativa textual coerente — gerada por LLM, mas restrita a inputs verificáveis das etapas anteriores.

### A regra de ouro

Em todo o pipeline, há uma regra que não negociamos: o LLM nunca é o decisor final em uma decisão que afeta o livro. Ele extrai, classifica, recomenda, gera explicação. A decisão final, quando automática, é tomada por motor de regras com apoio do score do modelo tabular calibrado. Quando manual, é tomada pelo underwriter com o contexto preparado pelos dois.

> LLMs interpretam. Regras enforçam. Modelos tabulares scoream. A decisão crítica é tomada pelo conjunto.

LLMs em produção, mesmo os melhores, têm uma cauda de comportamento inesperado em casos fora da distribuição. Para a maioria das aplicações, gerenciável. Para decisões financeiras com efeito em loss ratio e exposição regulatória, inaceitável como primeira linha.

Isso não diminui o LLM. Pelo contrário — ele faz o trabalho que regras não conseguem (interpretação) e libera regras para fazer o que elas fazem melhor (enforcement).

### O erro mais comum

Em conversas com equipes de IA em seguradoras, o padrão de erro mais frequente é: time monta pipeline integralmente baseado em LLM, demonstra POC bonito com 10 casos cuidadosamente escolhidos, sobe para staging, escala para 5.000 casos, descobre que 2% têm comportamento esquisito, tenta corrigir com prompt engineering, vê regression em casos que antes funcionavam, e termina o trimestre com sistema mais frágil que o manual que substituiu.

A correção não é "voltar para regras". É reconhecer onde cada tecnologia tem força e desenhar a divisão de trabalho desde o começo. A auditoria desse pipeline híbrido — qual modelo decidiu, em qual versão, com quais inputs — é o tema de [Explicabilidade que vai além do SHAP](#blog/explicabilidade-alem-de-shap), e seu monitoramento contínuo está em [Observabilidade de agentes](#blog/observabilidade-de-agentes).

LLMs interpretam. Regras enforçam. Modelos tabulares scoream. A decisão crítica é tomada pelo conjunto — não pelo componente mais novo.

### Referências e leituras

- [Xu et al. — LayoutLM (Microsoft Research)](https://arxiv.org/abs/1912.13318) · parsing layout-aware de documentos
- [Bai et al. — Constitutional AI (Anthropic)](https://arxiv.org/abs/2212.08073) · LLM com critérios explícitos
- [Drools](https://www.drools.org) · motor de regras open-source
- [Explicabilidade que vai além do SHAP](#blog/explicabilidade-alem-de-shap) · auditoria de pipelines híbridos
- [Observabilidade de agentes em produção](#blog/observabilidade-de-agentes) · monitoramento contínuo`,
  },

  {
    slug: "falsa-dicotomia-velocidade-compliance",
    cat: "Ensaio", grad: "linear-gradient(135deg,#AE46C0,#F8AD39)",
    image: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Arquitetura moderna em equilíbrio simétrico",
    title: "A falsa dicotomia entre velocidade e compliance",
    sub: "A indústria insiste em \"ou rápido OU em compliance\". Isso é arquitetura ruim, não trade-off real. Como auditabilidade nativa elimina a escolha.",
    author: "Nicholas Weiser", role: "CEO · Co-Founder",
    authorPhoto: "assets/team/nicholas.jpg",
    time: "7 min", date: "15 · Mar · 2026",
    metaDesc: "A escolha entre 'rápido ou em compliance' no setor segurador é falsa. Por que ela existe — e a arquitetura que a elimina.",
    body: `Em quase toda conversa que tenho com diretoria de seguradora sobre adoção de IA, em algum momento aparece a frase: "tudo isso é ótimo, mas a gente não pode comprometer compliance por velocidade". A frase é dita com convicção, como se descrevesse um trade-off real.

Não descreve.

A escolha entre velocidade e compliance é um artefato de arquitetura, não uma lei física. Ela existe quando a operação foi desenhada com compliance como camada externa — algo que se adiciona depois para satisfazer regulador, auditor, área jurídica. Quando compliance é arquitetura nativa, a escolha desaparece.

> A escolha verdadeira não é entre velocidade e compliance. É entre arquitetura que paga juros e arquitetura que rende.

### De onde vem a frase

A geração executiva que hoje lidera as Tier-1 brasileiras viveu o trauma da implementação inicial do compliance regulatório financeiro nos anos 2000. Foi caro, lento e burocrático — e gerou uma associação que durou: compliance é peso. Mais compliance é mais peso. Velocidade requer aliviar o peso.

Essa associação fazia sentido na arquitetura que existia. Sistemas core dos anos 2000 não tinham logging estruturado, não tinham versionamento de modelos, não tinham trilha de auditoria por decisão. Compliance, naquele mundo, era fricção.

Em 2026, é diferente. Sistemas modernos registram trilha completa por desenho — não como overhead, mas como subproduto natural da operação. Cada decisão produz log estruturado porque o sistema precisa daquele log para depurar, retreinar e escalar. Compliance vira o ambiente em que tudo acontece.

A frase "não posso comprometer compliance por velocidade" é, em 2026, sintoma de continuar pensando dentro da arquitetura velha.

### O que muda quando compliance é nativa

**Primeira: o tempo de resposta a auditoria cai em ordens de grandeza.** Em arquitetura legacy, responder a uma pergunta de auditor sobre uma decisão de 9 meses atrás envolve recuperar e-mails, decifrar planilhas, entrevistar quem fez. Leva semanas. Em arquitetura nativa, é uma query: qual modelo, qual versão, quais inputs, qual output. Leva minutos.

**Segunda: o custo unitário de compliance não escala com volume.** Em legacy, dobrar volume de decisões automáticas costuma dobrar o custo de compliance. Em nativa, custo é predominantemente fixo (a infraestrutura de logging) e marginal por decisão é próximo de zero.

**Terceira: a relação com o regulador muda.** Em legacy, o regulador é entidade que produz fricção. Em nativa, o regulador é cliente da trilha de auditoria — pode pedir o que quiser e receber rápido, em formato que ele consegue avaliar.

### A pergunta executiva certa

Diretorias que ainda discutem se vão "comprometer compliance pela velocidade" estão fazendo a pergunta errada. A correta é: a arquitetura que estamos construindo trata compliance como camada nativa ou como camada externa?

Se nativa, velocidade e compliance crescem juntas.

Se externa, brigam.

A diferença é decisão de arquitetura tomada na primeira semana do projeto. Times que tratam logging estruturado, versionamento e provenance como prioridade de fundação produzem operações que escalam sem comprometer compliance. Times que tratam essas coisas como detalhe de implementação produzem operações que travam na primeira fiscalização. Esse detalhe arquitetural está descrito em [Explicabilidade que vai além do SHAP](#blog/explicabilidade-alem-de-shap).

### Por que isso importa hoje

A regulamentação infralegal de IA em decisões automatizadas no Brasil ainda está sendo definida. A [LGPD (Lei 13.709/2018)](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) garante direitos de explicação. As [orientações da ANPD](https://www.gov.br/anpd) sobre tratamento de dados em decisões automatizadas continuam evoluindo. E a [SUSEP](https://www.gov.br/susep) tem comunicações sinalizando expectativa crescente sobre auditabilidade de modelos em subscrição.

Operações construindo arquitetura com compliance nativa hoje vão acordar em 2027 ou 2028 e descobrir que cumpriram a regulamentação nova sem precisar refatorar. Operações com compliance externa vão acordar e descobrir que precisam reconstruir o que já está em produção — e o custo de fazer isso depois é múltiplas vezes maior.

A escolha verdadeira não é entre velocidade e compliance. É entre arquitetura que paga juros e arquitetura que rende.

### Referências e leituras

- [LGPD — Lei 13.709/2018](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm)
- [ANPD — Autoridade Nacional de Proteção de Dados](https://www.gov.br/anpd) · orientações regulatórias
- [SUSEP — comunicações sobre IA em seguros](https://www.gov.br/susep)
- [Explicabilidade que vai além do SHAP — a arquitetura que torna isso possível](#blog/explicabilidade-alem-de-shap)
- [O custo invisível do straight-through processing mal feito](#blog/custo-invisivel-stp-mal-feito)`,
  },

  {
    slug: "custo-invisivel-stp-mal-feito",
    cat: "Mercado", grad: "linear-gradient(135deg,#7540AC,#3222E9)",
    image: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Iceberg com porção oculta sob a água — risco invisível",
    title: "O custo invisível do straight-through processing mal feito",
    sub: "STP sem auditabilidade cria risco regulatório, reputacional e de carteira. Checklist de 9 itens para verificar antes de escalar.",
    author: "José Carlos de Paula", role: "CSO · Co-Founder",
    authorPhoto: "assets/team/jose-carlos.jpg",
    time: "8 min", date: "08 · Mar · 2026",
    metaDesc: "Straight-through processing sem auditabilidade nativa é bomba-relógio regulatória. Checklist de 9 itens para validar antes de escalar volume.",
    body: `Straight-through processing — STP — virou termo de venda no setor. Toda apresentação promete STP. Toda diretoria coloca STP em deck de transformação digital.

Muito do que se chama de STP no mercado brasileiro hoje é, tecnicamente, automação parcial sem trilha de auditoria. Funciona. Escala um pouco. E acumula risco invisível ao longo do tempo, até que o risco aparece — em fiscalização, em sinistro inesperado, em RFP de resseguro perdido.

> STP feito direito é vantagem competitiva durável. STP feito mal é dívida operacional acumulando juros silenciosos.

### O que STP exige de verdade

STP significa que uma transação atravessa o pipeline do início ao fim sem intervenção humana. Para que esse fluxo seja sustentável em produção, ele precisa cumprir três condições silenciosas que costumam ser ignoradas no projeto inicial.

A primeira: cada decisão automática precisa ser rastreável até o input específico que a determinou. Não basta saber que o modelo aceitou. É preciso saber qual versão, com quais features, com qual confiança, contra qual política, em qual timestamp.

A segunda: o limite entre "decisão automática" e "decisão escalada" precisa ser explícito, versionado e justificado.

A terceira: os outputs do STP precisam ser comparáveis ao que decisão humana teria produzido — pelo menos amostralmente. Sem essa calibração contínua, drift do modelo aparece em loss ratio antes de aparecer em qualquer indicador operacional.

### Os custos invisíveis

**Custo regulatório.** Quando SUSEP pede explicação sobre uma decisão automatizada de 8 meses atrás, a operação sem trilha entrega resposta vaga ou pede prazo. Em ambos os casos, queima credibilidade.

**Custo reputacional com canal.** Recusas automáticas sem explicação clara causam atrito. A queixa #1 sobre seguradoras automatizadas é "não consigo explicar para meu cliente por que foi recusado".

**Custo de loss ratio invisível.** Drift de modelo em STP sem monitoramento aparece em sinistralidade — com lag. Sem trilha completa, a análise causal é praticamente impossível.

**Custo de resseguro.** Resseguradoras europeias e norte-americanas como [Munich Re](https://www.munichre.com) e [Swiss Re](https://www.swissre.com/institute) começaram a pedir documentação detalhada sobre auditabilidade de pricing automatizado. Operações sem entregar enfrentam: reset do tratado em condições piores, exclusão de segmentos, ou substituição por estruturas mais caras.

### Checklist: 9 itens antes de escalar

1. Cada decisão automática gera log estruturado com modelo, versão, inputs, output, score, timestamp e ID único. Imutável.
2. Versionamento de política está em vigor. Cada mudança é registrada com autor, motivo, data, impacto esperado. Versões anteriores podem ser recuperadas e simuladas.
3. Limite entre auto e human está explícito. Critério documentado para quando passar pelo humano. Versionado.
4. Override humano está habilitado e registrado. Quando humano altera ou rejeita, sistema registra: o quê, por quem, com qual motivo (campo obrigatório), em qual timestamp.
5. Drift detection está em produção. Sistema monitora distribuição das features, dos outputs, e divergência entre auto e validação humana.
6. Loss ratio segmentado por automação. Book mensurável separado por nível de envolvimento humano: 100% automático, parcial, integralmente humano.
7. Recusa automática gera copy aceitável. Justificativa em linguagem comercial — não código de erro.
8. Existe revisão amostral periódica. Fração das decisões automáticas (1% a 5%) revisada por humano após o fato, para validar concordância.
9. Plano de rollback está documentado e testado. Reverter a versão anterior em horas — não em dias.

### O que isso significa para diretoria

A pergunta executiva não é "vamos fazer STP?". É "o STP que estamos construindo cumpre os 9 itens?". Se sim, escalar é caminho de receita. Se não, escalar é caminho de risco invisível que aparece tarde.

A relação entre essa disciplina arquitetural e a velocidade de operação está em [A falsa dicotomia entre velocidade e compliance](#blog/falsa-dicotomia-velocidade-compliance). E o monitoramento contínuo dessa qualidade está em [Observabilidade de agentes](#blog/observabilidade-de-agentes).

STP feito direito é vantagem competitiva durável. STP feito mal é dívida operacional acumulando juros silenciosos.

### Referências e leituras

- [Munich Re — publicações sobre IA e resseguro](https://www.munichre.com)
- [Swiss Re Institute — research sobre InsurTech](https://www.swissre.com/institute)
- [SUSEP — comunicações regulatórias](https://www.gov.br/susep)
- [A falsa dicotomia entre velocidade e compliance](#blog/falsa-dicotomia-velocidade-compliance)
- [Observabilidade de agentes em produção](#blog/observabilidade-de-agentes)`,
  },

  {
    slug: "tres-formatos-pdf-quebravam",
    cat: "Caso", grad: "linear-gradient(135deg,#F8AD39,#FE8B77)",
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?w=1600&q=80&auto=format&fit=crop",
    imageAlt: "Pilha de documentos e papelada de seguros",
    title: "Três formatos de PDF que quebravam submissões — e como resolvemos",
    sub: "Do OCR ingênuo ao parsing semântico. Os PDFs específicos que destruíam extrações até a virada técnica.",
    author: "Head of AI", role: "ML · WIR Innovation",
    time: "6 min", date: "01 · Mar · 2026",
    metaDesc: "PDFs de submissão são heterogêneos. OCR comum extrai 60% dos campos. Parsing semântico resolve os casos onde OCR quebra — com exemplos concretos.",
    body: `PDF é o formato favorito da indústria de seguros e o pesadelo favorito de qualquer engenheiro tentando automatizar extração no setor. Cada corretora tem o seu padrão. Cada cliente final tem o seu jeito de preencher o questionário.

Quando começamos a operação de extração da WIR, o pipeline naive — [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) + regex pós-processamento + LLM para campos não estruturados — funcionava em algo como 60% dos casos. O dado importante é o complemento: 40% das submissões tinham algum campo crítico extraído incorretamente, ou não extraído.

> Pipeline robusto valida coerência, dispara revisão quando dados não passam sanity check e nunca propaga incerteza como verdade.

Esse texto descreve três formatos específicos que quebravam o pipeline naive, qual era o modo de falha, e qual foi a virada técnica.

### Formato 1: PDF escaneado de questionário antigo

**O caso:** corretoras tradicionais imprimem o questionário, pedem ao cliente que preencha à mão, escaneiam e enviam como PDF. O resultado é um PDF cujo conteúdo é, na prática, uma imagem.

**O modo de falha:** OCR comum lê a maior parte do texto impresso, mas falha consistentemente nos campos preenchidos à mão. CNPJ, faturamento, nome do segurado — saem com 30% a 50% de taxa de erro. Pior: quando o OCR confundia "1" com "I" em um CNPJ, o pipeline downstream assumia o CNPJ como string válida e seguia, gerando enriquecimento contra entidade errada.

**A virada técnica:** abandonamos a leitura linear e adotamos pipeline de duas camadas. Primeira: detecção da região do documento (form layout detection) que identifica onde estão os campos preenchidos. Segunda: modelo treinado especificamente para handwriting OCR, com pós-processamento contextual via LLM que valida coerência entre campos relacionados. Quando o CNPJ extraído não passa no dígito verificador, é flagado para revisão.

**Resultado:** taxa de erro em campos críticos caiu de ~40% para abaixo de 3%.

### Formato 2: Tabela multi-coluna em layout complexo

**O caso:** questionários de risco industrial apresentam tabelas com 5 a 20 colunas que se estendem por múltiplas páginas. PDF não tem conceito nativo de "essa tabela continua na próxima página".

**O modo de falha:** OCR linear lê linha por linha, sem entender estrutura. Quando uma tabela quebra de página, a primeira linha da página seguinte é lida sem o cabeçalho, e o pipeline associa valores às colunas erradas. Em uma submissão real, um equipamento de R$ 2.4M na página 3 foi associado a "ano de fabricação" porque o OCR pegou só o valor da segunda coluna sem o cabeçalho.

**A virada técnica:** trocamos OCR puro por modelo layout-aware (família [LayoutLM da Microsoft](https://github.com/microsoft/unilm)), que entende estrutura visual — onde está o cabeçalho, onde estão as colunas, qual valor pertence a qual campo, mesmo entre páginas. Para validação, LLM pós-processa checando coerência: faturamento consistente com porte, valores compatíveis com atividade.

**Resultado:** taxa de erro em extração de tabelas multi-página caiu de ~25% para menos de 2%.

### Formato 3: PDF protegido ou com camada de assinatura digital

**O caso:** clientes corporativos em segmentos regulados exigem questionário com assinatura digital [ICP-Brasil](https://www.gov.br/iti) padrão. O PDF resultante tem camada criptográfica que, dependendo de como foi gerada, bloqueia OCR e até copy-paste.

**O modo de falha:** o pipeline simplesmente não conseguia abrir esses PDFs. Voltavam para fila manual, criando gargalo silencioso — em uma operação que recebia 800 submissões/mês, ~8% caíam nesse modo.

**A virada técnica:** fluxo de detecção de proteção que identifica o tipo aplicado e segue caminho específico. Para assinatura ICP-Brasil padrão, a camada de texto está acessível atrás da assinatura — basta ler com biblioteca correta. Para PDFs com password de leitura, automação que pede senha ao corretor de origem. Para PDFs que bloqueiam extração de texto mas não imagem, render para imagem + pipeline OCR + layout-aware.

**Resultado:** fila manual por "PDF não processável" caiu de 8% para abaixo de 0.5%.

### O que isso significa

Três aprendizados consolidados.

Primeiro: pipeline de extração bem feito não é uma ferramenta — é uma cadeia. OCR é uma camada. Layout-aware é outra. Validação semântica via LLM é outra. Cada camada cobre os casos onde a anterior quebra.

Segundo: o valor está no long tail. Os 60% de PDFs simples que qualquer ferramenta resolve não são onde a tecnologia diferencia. A diferença está no 40% restante.

Terceiro: validação importa mais que extração. O custo de uma extração errada propagada é maior que o custo de uma extração que falha visivelmente. Pipeline robusto valida coerência, dispara revisão quando dados não passam sanity check e nunca propaga incerteza como verdade. Esse princípio se conecta diretamente à arquitetura de auditoria descrita em [Explicabilidade que vai além do SHAP](#blog/explicabilidade-alem-de-shap).

### Referências e leituras

- [LayoutLM family — Microsoft Research GitHub](https://github.com/microsoft/unilm) · parsing layout-aware
- [Tesseract OCR](https://github.com/tesseract-ocr/tesseract) · OCR open-source clássico
- [ICP-Brasil — Instituto Nacional de Tecnologia da Informação](https://www.gov.br/iti)
- [Explicabilidade que vai além do SHAP — auditoria de pipelines](#blog/explicabilidade-alem-de-shap)
- [Caso de implementação WIR + Mahway — onde isso virou produção](#blog/caso-implementacao-mahway)`,
  },

  {
    slug: "observabilidade-de-agentes",
    cat: "Técnico", grad: "linear-gradient(135deg,#3222E9,#FE8B77)",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&auto=format&fit=crop&sat=-100",
    imageAlt: "Múltiplas telas com dashboards de monitoramento",
    title: "Observabilidade de agentes: o que monitorar em produção",
    sub: "Latência, precisão, drift, custo por decisão, divergência humano-vs-modelo. O dashboard mínimo que toda seguradora deveria exigir antes de escalar IA.",
    author: "Head of AI", role: "ML · WIR Innovation",
    time: "9 min", date: "22 · Fev · 2026",
    metaDesc: "Sistemas de IA em produção precisam de monitoramento específico — não basta logging genérico. As 6 métricas que separam sistema robusto de frágil.",
    body: `Equipes que sobem o primeiro modelo de IA para produção em uma seguradora costumam montar um dashboard inicial focado nas métricas que aprenderam a importar durante desenvolvimento: acurácia no test set, AUC, F1.

Esse dashboard funciona durante o primeiro mês. Depois, ele para de ser útil.

As perguntas que importam quando você tem IA decidindo riscos reais não são "qual a acurácia no test set". São perguntas operacionais sobre comportamento ao longo do tempo, sobre divergência entre o que o modelo decide e o que humano decidiria, e sobre custo por unidade de valor entregue. É exatamente o tipo de problema que ferramentas como [Arize AI](https://arize.com), [Fiddler](https://www.fiddler.ai), [WhyLabs](https://whylabs.ai) e [Evidently AI](https://www.evidentlyai.com) atacam — cada uma com ângulos um pouco diferentes.

> Construir observabilidade é caro. Não revisar a observabilidade que se construiu é mais caro.

### Por que observabilidade de IA é diferente

Sistemas tradicionais têm comportamento determinístico — quando funcionam, funcionam igual; quando quebram, quebram de jeito reproduzível. Observabilidade clássica (logs, métricas, traces) lida bem com isso.

Sistemas de IA têm camada adicional: comportamento estatístico. Eles podem estar funcionando perfeitamente em termos de software — sem erros, latência boa, throughput estável — e ainda estar produzindo decisões progressivamente piores ao longo do tempo. Essa degradação não dispara alerta em monitoramento clássico. Aparece em loss ratio meses depois.

### As 6 métricas do dashboard mínimo

**1. Latência por tipo de decisão (p50, p95, p99).** Não basta latência média. Para decisões automatizadas que afetam experiência de canal, p99 importa tanto quanto p50 — porque é o caso de uma submissão em 100 que demora 12 segundos que vira complaint do corretor. Quebra por tipo: extração, classificação, scoring, geração.

**2. Taxa de override humano.** A fração de decisões automáticas alteradas pelo underwriter. É o termômetro mais direto de qualidade do modelo em produção. Override tendendo para baixo significa concordância crescente. Tendendo para cima significa que algo está mudando — drift de dados, drift de política, ou modelo errando onde antes acertava.

**3. Distribuição de features e drift detection.** Para cada feature relevante, monitore distribuição (média, std, percentis) ao longo do tempo. Compare com a distribuição de treino. Quando diverge significativamente, o modelo está operando fora do que viu — ainda funciona, mas com confiança decrescente. [Evidently AI](https://www.evidentlyai.com) tem boa documentação aberta sobre os testes estatísticos típicos (KS, PSI, Wasserstein).

**4. Custo por decisão.** Inclui chamadas de API LLM, infraestrutura de inferência, retrieval de bases externas. Em sistemas híbridos, custo por decisão pode variar 10× entre tipos de caso. Sem essa métrica, custo total balona sem explicação.

**5. Loss ratio segmentado por automação.** Book observável separado por nível de envolvimento humano: 100% automático, parcialmente automático, integralmente humano. Diferenças significativas sinalizam algo — qualidade do modelo, viés de seleção, ou diferença de produto.

**6. Divergência humano-vs-modelo amostral.** Fração das decisões automáticas (1% a 5%) submetida a revisão humana cega após o fato. Calcula-se a concordância. Em sistemas saudáveis, tende a 80%-90%, com discordância concentrada em casos genuinamente ambíguos.

### O que NÃO basta

**Acurácia no test set.** Útil durante desenvolvimento. Em produção, a única acurácia que importa é a operacional, medida pela divergência humano-vs-modelo amostral.

**AUC, F1.** Métricas de modelo, não de sistema. Importantes para troubleshooting; insuficientes para monitoramento contínuo.

**Volume e throughput.** Importante para capacity planning. Não diz nada sobre qualidade.

**Confidence score isolado.** Útil para roteamento, não como métrica de saúde. Modelo overconfident ou underconfident tem distribuição enviesada.

### Cadência de revisão

Diário, alerta-driven: latência, custo, drift de features.

Semanal, equipe técnica: taxa de override, divergência humano-vs-modelo.

Mensal, executivo: loss ratio segmentado, custo total, comparação modelo-vs-humano agregada.

Trimestral, auditoria estendida: simulações contrafactuais, revisão de overrides com motivo livre, análise de viés por segmento.

### Onde a maioria trava

O ponto de trava mais comum não é técnico — é organizacional. O dashboard existe ou pode ser construído com esforço razoável. O que falta é dono claro e cadência.

Operações onde "alguém da TI olha o dashboard quando há queixa" não capturam drift. Operações onde a equipe de subscrição vê o dashboard junto com a equipe de modelo, semanalmente, em reunião curta, capturam.

A trilha completa que alimenta esse dashboard é a mesma descrita em [Explicabilidade que vai além do SHAP](#blog/explicabilidade-alem-de-shap), e a divisão entre LLM e regras que precisa ser monitorada em separado está em [LLMs não substituem motores de regras](#blog/llms-vs-motores-de-regras).

Construir observabilidade é caro. Não revisar a observabilidade que se construiu é mais caro — é pagar pela infraestrutura sem extrair o sinal.

### Referências e leituras

- [Arize AI](https://arize.com) · ML observability platform
- [Fiddler AI](https://www.fiddler.ai) · model monitoring + explainability
- [WhyLabs](https://whylabs.ai) · open-source data and ML monitoring
- [Evidently AI](https://www.evidentlyai.com) · ML monitoring open-source
- [Explicabilidade que vai além do SHAP](#blog/explicabilidade-alem-de-shap) · arquitetura de auditoria
- [LLMs não substituem motores de regras](#blog/llms-vs-motores-de-regras) · arquitetura híbrida que precisa ser monitorada`,
  },
];

// Markdown-lite parser: paragraphs, ### subheads, **bold**, *italic*, [text](url), > quote, 1./- lists
function parseBody(text) {
  return text.trim().split(/\n\s*\n/).map(block => {
    const t = block.trim();
    if (t.startsWith("### ")) return { type: "h3", text: t.slice(4) };
    if (t.startsWith("> ")) return { type: "quote", text: t.slice(2) };
    if (/^\d+\.\s/.test(t)) {
      const items = t.split("\n").map(l => l.replace(/^\d+\.\s+/, "").trim()).filter(Boolean);
      return { type: "ol", items };
    }
    if (/^-\s/.test(t)) {
      const items = t.split("\n").map(l => l.replace(/^-\s+/, "").trim()).filter(Boolean);
      return { type: "ul", items };
    }
    return { type: "p", text: t };
  });
}

function renderInline(text) {
  const parts = [];
  // Order matters: bold first, then italic, then images, then links
  const re = /(\*\*[^*]+\*\*|!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|\*[^*]+\*)/g;
  let last = 0, m, key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const tok = m[0];
    if (tok.startsWith("**")) {
      parts.push(React.createElement("strong", { key: key++ }, tok.slice(2, -2)));
    } else if (tok.startsWith("![")) {
      const im = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(tok);
      if (im) parts.push(React.createElement("img", { key: key++, src: im[2], alt: im[1] }));
    } else if (tok.startsWith("[")) {
      const lm = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(tok);
      if (lm) {
        const isInternal = lm[2].startsWith("#blog");
        parts.push(React.createElement("a", {
          key: key++,
          href: lm[2],
          target: isInternal ? undefined : "_blank",
          rel: isInternal ? undefined : "noopener noreferrer",
          className: isInternal ? "blarticle__link-int" : "blarticle__link-ext",
        }, lm[1]));
      }
    } else {
      parts.push(React.createElement("em", { key: key++ }, tok.slice(1, -1)));
    }
    last = m.index + tok.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function ArticleAuthorAvatar({ article }) {
  if (article.authorPhoto) {
    return React.createElement("div", {
      className: "blarticle__author-photo",
      style: { backgroundImage: `url(${article.authorPhoto})` },
      role: "img",
      "aria-label": article.author,
    });
  }
  const initials = article.author.split(" ").map(w => w[0]).slice(0, 2).join("");
  return React.createElement("div", { className: "blarticle__author-initials" }, initials);
}

export function BlogArticle({ article, go }) {
  const blocks = parseBody(article.body);

  React.useEffect(() => {
    const prevTitle = document.title;
    const descMeta = document.querySelector('meta[name="description"]');
    const prevDesc = descMeta ? descMeta.getAttribute("content") : "";

    document.title = `${article.title} — WIR Innovation`;
    if (descMeta) descMeta.setAttribute("content", article.metaDesc);

    const id = "wir-article-jsonld";
    let s = document.getElementById(id);
    if (!s) { s = document.createElement("script"); s.type = "application/ld+json"; s.id = id; document.head.appendChild(s); }
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.metaDesc,
      image: article.image || undefined,
      datePublished: article.date,
      author: { "@type": "Person", name: article.author, jobTitle: article.role },
      publisher: { "@type": "Organization", name: "WIR Innovation",
        logo: { "@type": "ImageObject", url: "https://wirinnovation.ai/assets/wir-logo-azul.svg" } },
      mainEntityOfPage: `https://wirinnovation.ai/#blog/${article.slug}`,
      articleSection: article.cat,
    });

    window.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      document.title = prevTitle;
      if (descMeta && prevDesc) descMeta.setAttribute("content", prevDesc);
      const s2 = document.getElementById(id);
      if (s2) s2.remove();
    };
  }, [article.slug]);

  return (
    <article className="blarticle">
      <div className="wrap blarticle__wrap">
        <button className="blarticle__back" onClick={() => go("blog")}>
          <span aria-hidden>←</span> Voltar para Insights & News
        </button>

        <header className="blarticle__head">
          <div className="eyebrow">· {article.cat}</div>
          <h1 className="display blarticle__title">{article.title}</h1>
          <p className="blarticle__sub">{article.sub}</p>
          <div className="blarticle__byline">
            <ArticleAuthorAvatar article={article}/>
            <div className="blarticle__byline-meta">
              <div className="blarticle__byline-author"><b>{article.author}</b> · {article.role}</div>
              <div className="blarticle__byline-time">{article.date} · {article.time} de leitura</div>
            </div>
          </div>
        </header>

        {/* Hero image with gradient fallback */}
        <figure className="blarticle__hero-img" style={{ background: article.grad }}>
          {article.image && (
            <img src={article.image} alt={article.imageAlt || article.title}
              loading="eager"
              onError={(e) => { e.target.style.display = "none"; }}/>
          )}
        </figure>

        <div className="blarticle__body">
          {blocks.map((b, i) => {
            if (b.type === "h3") return <h3 key={i}>{renderInline(b.text)}</h3>;
            if (b.type === "quote") return <blockquote key={i}>{renderInline(b.text)}</blockquote>;
            if (b.type === "ol") return <ol key={i}>{b.items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}</ol>;
            if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{renderInline(it)}</li>)}</ul>;
            return <p key={i}>{renderInline(b.text)}</p>;
          })}
        </div>

        <footer className="blarticle__foot">
          <button className="btn btn--ghost" onClick={() => go("blog")}>
            <span aria-hidden>←</span> Outros Insights
          </button>
          <button className="btn btn--solid" onClick={() => go("contact")}>
            Falar com a equipe <span className="btn__arrow">→</span>
          </button>
        </footer>
      </div>
    </article>
  );
}

