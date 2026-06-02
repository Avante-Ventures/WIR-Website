import React, { useState, useEffect, useRef, useMemo } from 'react';

/* Insights & News — articles + reader */

export const ARTICLES = [
  {
    slug: "automatizar-cotacao-seguros",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Como automatizar a cotação de seguros com uma camada de IA",
    sub: "Guia para automatizar a cotação de seguros com IA. Leitura de submissões, scoring de risco, precificação e SLA visível ao corretor, sobre o core atual.",
    author: "WIR Innovation", role: "Equipe",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para automatizar a cotação de seguros com IA. Leitura de submissões, scoring de risco, precificação e SLA visível ao corretor, sobre o core atual.",
    body: `### O que é automatizar a cotação de seguros com uma camada de IA

Saber como automatizar a cotação de seguros com IA significa colocar uma camada de inteligência sobre os sistemas que a seguradora já usa, para receber a submissão do corretor, ler e estruturar os dados, pontuar o risco e devolver uma cotação ajustada ao apetite, uma recusa ou um encaminhamento para o subscritor, tudo em tempo real. Essa camada não troca o core nem exige migração. Ela lê e escreve no sistema de apólices por API, então a seguradora mantém sua fonte de verdade e ganha velocidade na resposta.

No mercado brasileiro de Seguros e Danos (P&C), a cotação ainda costuma ser um revezamento manual entre corretor e seguradora. A submissão chega por e-mail, WhatsApp, portal ou planilha, alguém redigita os dados no core, pede documentos faltantes e só então o subscritor avalia apetite, precifica o prêmio e devolve uma resposta. Cada passagem de mão adiciona latência e abre espaço para decisões inconsistentes. Quem deveria ler este guia é o C-level da seguradora, o líder de subscrição, o head de produto e inovação e o corretor que sente na ponta o custo da resposta lenta.

A pressão é estrutural. Segundo a Deloitte, o subscritor gasta 40% do tempo em tarefas administrativas em vez de julgamento de risco. Pela Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta. O mercado de Seguros e Danos cresce dois dígitos ao ano, mas a estrutura das companhias não acompanha essa aceleração, e a cotação manual é onde o gargalo aparece primeiro. Quando o risco é commoditizado, como auto, patrimonial e RC, o corretor coloca o negócio com a seguradora que responde primeiro e com clareza.

### Como funciona a cotação automatizada de ponta a ponta

A cotação automatizada transforma o revezamento manual em uma única passagem em tempo real, e a esteira tem seis etapas encadeadas. Primeiro vem a entrada multicanal com validação automática: o corretor submete pelo canal que já usa, API para parceiros de alto volume e portal ou upload para os demais, e a camada aceita e-mail, anexos e planilha sem que o corretor mude nada na forma de pedir cotação. Em seguida vem a leitura inteligente de documentos, em que modelos de Machine Learning extraem os campos estruturados a partir de submissões não estruturadas, com alta precisão, eliminando a redigitação que consome o tempo do subscritor.

A terceira etapa é o enriquecimento e o contexto do corretor. A camada cruza fontes externas como CNPJ, histórico do corretor, exposição e crédito, e gera score, histórico de conversão e priorização, transformando o contexto do corretor em sinal e não em texto livre. Na quarta etapa entra o motor de risco e fraude, um modelo de ML multifator calibrado ao apetite e ao manual de subscrição, que produz score de risco, probabilidade e decisão automatizada, sinalizando inconsistências e anomalias antes da precificação.

A quinta etapa é a precificação dinâmica, com cálculo do prêmio ajustado ao risco e saída instantânea, refletindo o apetite da companhia e não uma tabela genérica. A sexta etapa é a decisão e priorização: a camada devolve uma cotação, uma recusa automática ou um encaminhamento para um humano nos casos que realmente pedem julgamento, sempre com explicação. Ela escreve de volta no core da apólice e retorna a trilha de auditoria completa, com SLA visível e fila do subscritor. O resultado concreto para o corretor é uma resposta rápida e transparente, e esse SLA visível é a alavanca de conversão.

### Como implantar a camada externa de IA na cotação

A implantação acontece sem migração de core e segue um caminho claro. O primeiro passo é o escopo: escolher um ou dois ramos de Danos de alto volume onde a lentidão perde negócio, como auto, patrimonial e RC, e definir o SLA-alvo que o corretor vai enxergar. O segundo passo é a integração com o core existente, conectando a camada ao sistema de apólices por API para leitura de dados de referência e escrita da cotação estruturada e precificada, além do canal de entrada do corretor, sem substituir o sistema de registro.

O terceiro passo é a calibração ao manual de subscrição e ao apetite de risco, codificando as regras, a política de aceitação e a lógica de precificação da própria seguradora. O modelo é afinado à experiência de sinistro e à política de subscrição da companhia, nunca a um benchmark genérico. Em seguida vem o teste em modo sombra contra submissões históricas e ao vivo, comparando cotações, recusas e encaminhamentos às decisões dos subscritores para ajustar os limiares. Depois o go-live começa com cotação automática para a faixa claramente dentro do apetite, recusa automática para a faixa claramente fora e encaminhamento do meio para o subscritor, expandindo as faixas automáticas conforme a confiança cresce.

A operação contínua monitora taxa de acerto, conversão, sinistralidade do negócio cotado automaticamente e SLA, com recalibração à medida que apetite e experiência de sinistro mudam. Na WIR, a fase de setup roda de 3 a 12 meses, com escopo claro, integrações, testes e ajustes de go-live, e a operação contínua entra depois do go-live com cobrança mensal ajustada por cliente. Esse caminho permite que o time de subscrição realoque tempo da leitura administrativa para os casos encaminhados que pedem julgamento humano.

### Governança, explicabilidade e LGPD

Decisões automatizadas de cotação no Brasil estão sob a proteção de dados e a supervisão do seguro ao mesmo tempo, então a governança não é opcional. Pela Lei nº 13.709/2018, a LGPD, os dados pessoais usados na cotação precisam de base legal, minimização e proteção, e o titular tem o direito de pedir revisão de decisões tomadas unicamente com base em tratamento automatizado, o que é diretamente relevante para recusas e precificação automáticas. A seguradora precisa conseguir explicar a base de um resultado automatizado de cotação.

Por isso cada decisão registra os insumos, a versão do modelo e as regras que dispararam, de modo que um subscritor, um auditor ou o regulador consigam reconstruir por que uma dada cotação, recusa ou encaminhamento aconteceu. É essa trilha de auditoria que torna a camada defensável. Os dados de submissão, enriquecimento e decisão são criptografados em trânsito e em repouso, em cada etapa. E o modelo é o apetite de risco da seguradora expresso em código, com o líder de subscrição podendo ver e ajustar a política que o motor aplica.

O contexto regulatório reforça essa exigência. A Lei nº 15.040/2024, o novo Marco Legal dos Seguros, está em vigor e sendo regulamentada pela SUSEP ao longo de 2026 para os ramos de danos, elevando o nível de clareza e boa-fé na fase de contrato e de cotação, conforme o noticiário do setor reportado pelo [feed do CQCS](https://cqcs.com.br/feed/) em 2026. Vale a pena ler também a página de inteligência de mercado da WIR em [inteligência de seguros](https://wirinnovation.ai) para entender como esses sinais regulatórios mudam a operação de subscrição.

### Como a WIR automatiza a cotação

A WIR é a camada de IA do seguro, uma plataforma de IA externa que automatiza a jornada de cotação e subscrição sobre os sistemas que a seguradora já usa, nunca no lugar deles. Por ser 100% externa, ela não exige carga no TI da seguradora nem migração de core. O módulo Underwriter Intelligence automatiza a jornada de cotação segundo a política de aceitação da seguradora, com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição e análise preditiva de conversão por produto, risco e corretor, para que o subscritor analise risco e foque em desenvolvimento de negócio.

O módulo Smart Sales atua na inteligência de distribuição, mapeando a carteira por cliente e produto, pontuando upsell e a próxima melhor ação e operando campanhas multicanal com trilha de atribuição, de modo que penetração e retenção cresçam juntas. Há ainda dashboards, analytics e relatórios em tempo real, com visão proativa dos negócios em andamento e do pipeline. Toda decisão da WIR é explicável e retorna trilha de auditoria completa, com dados criptografados em cada etapa e conformidade com a LGPD.

A WIR nasceu da experiência operacional acumulada e foi construída com a Mahway, Venture Builder na Califórnia, e a Avante, Venture Studio no Brasil. A única tração pública hoje é uma primeira POC em execução com uma seguradora global no ramo de Transporte. A WIR não é seguradora, corretora nem MGA, e não carrega risco: ela automatiza a jornada de cotação e subscrição conforme a política de risco de cada seguradora. Para mapear a jornada de cotação da sua companhia, vale agendar uma conversa pelo site da [WIR](https://wirinnovation.ai).

### Perguntas frequentes

**Quanto mais rápido a cotação automatizada responde ao corretor?**

A cotação automatizada devolve cotação, recusa ou encaminhamento em tempo real, no lugar do revezamento manual por e-mail, WhatsApp ou planilha. Isso é decisivo porque, pela Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta. A camada da WIR lê a submissão, pontua o risco com Machine Learning calibrado ao apetite e expõe um SLA que o corretor enxerga, transformando a resposta rápida em alavanca de conversão.

**A automação da cotação substitui o core da seguradora?**

Não. A WIR é uma camada de IA externa que opera sobre os sistemas atuais, nunca no lugar deles. Por ser 100% externa, não exige migração de core nem carga no TI da seguradora. Ela lê dados de referência e escreve a cotação estruturada e precificada no sistema de apólices por API, então a seguradora mantém sua fonte de verdade e ganha velocidade na resposta ao corretor.

**Como a cotação automática respeita o manual de subscrição?**

O motor de risco é calibrado ao apetite e ao manual de subscrição de cada seguradora, codificando suas regras, política de aceitação e lógica de precificação. O modelo é afinado à experiência de sinistro da companhia, nunca a um benchmark genérico. O líder de subscrição pode ver e ajustar a política que o motor aplica, e cada decisão registra os insumos, a versão do modelo e as regras que dispararam, com trilha de auditoria completa.

**O corretor enxerga o status e o SLA da cotação?**

Sim. A camada devolve a decisão com SLA visível e fila do subscritor, então o corretor acompanha o status da cotação de ponta a ponta. Cada resposta vem com explicação, seja uma cotação, uma recusa automática ou um encaminhamento para julgamento humano. Esse SLA visível é a alavanca de conversão, porque dá ao corretor uma resposta rápida e transparente sobre onde o negócio está.

**A cotação automatizada funciona com os canais de entrada que já usamos?**

Sim. A entrada é multicanal com validação automática, aceitando e-mail, anexos, planilha, portal, upload e API para parceiros de alto volume, sem que o corretor mude a forma de pedir cotação. A leitura inteligente de documentos extrai os campos estruturados a partir de submissões não estruturadas com Machine Learning, eliminando a redigitação que consome o tempo do subscritor antes de pontuar o risco e precificar.`
  },
  {
    slug: "automatizar-subscricao-seguro-transporte",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Como automatizar a subscrição de seguro de transporte com IA",
    sub: "Guia para seguradoras automatizarem a subscrição do seguro de transporte com uma camada de IA externa, calibrada ao apetite, sobre os sistemas atuais. Fale com a WIR.",
    author: "WIR Innovation", role: "Equipe",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para seguradoras automatizarem a subscrição do seguro de transporte com uma camada de IA externa, calibrada ao apetite, sobre os sistemas atuais. Fale com a WIR.",
    body: `### O que é automatizar a subscrição de transporte com uma camada de IA

Automatizar subscrição de seguro de transporte com IA significa colocar uma camada de inteligência externa sobre os sistemas que a seguradora já usa para ler a submissão, enriquecer o contexto da carga e da rota, pontuar o risco e propor o prêmio conforme o apetite da própria seguradora, sem trocar o core. A camada lê o que chega pelo corretor, normaliza os dados, calcula um score de risco calibrado ao manual de subscrição de transporte e devolve ao subscritor um arquivo pronto para decisão. Quem deve considerar essa abordagem é a seguradora que opera o ramo de transportes e quer ganhar velocidade e consistência na cotação sem assumir um projeto de migração de sistema.

O transporte é uma das linhas mais técnicas dentro de Seguros e Danos (P&C) no Brasil, e é também uma das mais pesadas em trabalho administrativo. A submissão de um risco de cargas chega como uma mistura de e-mail do corretor, propostas em PDF, planilhas de frota, planos de gerenciamento de risco e histórico de sinistralidade. O subscritor gasta boa parte do tempo lendo e redigitando esse material antes de aplicar julgamento. Pesquisa da Deloitte indica que o subscritor dedica 40% do tempo a tarefas administrativas, e é exatamente esse tempo que a automação devolve para a análise de risco. O ramo cresce dois dígitos ao ano dentro do bloco de Seguros e Danos, segundo o panorama de mercado que a WIR acompanha.

O ponto central do desenho é que a inteligência roda como uma camada de IA externa, sobre o core e os sistemas de apólice existentes, e não no lugar deles. A seguradora mantém seu sistema de registro e adiciona uma camada de decisão com IA por cima. Esse é o desenho que torna a automação viável para incumbentes cujo maior bloqueador de inovação é o legado, e segundo a BCG 70% das seguradoras deixam de executar inovação por limitações de TI.

### Como funciona a jornada automatizada no seguro de transporte

A jornada automatizada aplica as mesmas etapas que o subscritor já segue no ramo de transportes, mas a camada de IA absorve a carga repetitiva e entrega ao humano apenas o que exige julgamento. A esteira tem seis estágios encadeados. Primeiro, o intake multicanal recebe a submissão no formato que a seguradora já usa, seja API, portal ou upload de e-mail, anexos e planilhas. Em seguida, a leitura inteligente de documentos extrai com alta precisão os campos que um subscritor de transporte precisa: tipo e valor da mercadoria, valor máximo por embarque, rotas, plano de gerenciamento de risco, perfil do transportador e histórico de sinistros.

No terceiro estágio entra o enriquecimento e o contexto. A camada cruza fontes externas e internas relevantes para o risco de cargas, como exposição de roubo por rota, geografia, histórico do transportador já em base e acumulação contra a carteira existente, e normaliza o contexto trazido pelo corretor em dados consistentes. O quarto estágio é o motor de risco e fraude, um modelo de Machine Learning multifator calibrado ao apetite e ao manual de subscrição, que produz score, probabilidade e decisão para aquela carga, rota e operação específicas. Uma carga de alta atratividade de roubo em corredor crítico com gerenciamento de risco fraco pontua diferente da mesma carga em rota controlada com escolta e rastreamento.

O quinto estágio é o pricing dinâmico, que calcula o prêmio ajustado ao risco com saída instantânea, incluindo agravos e cláusulas atreladas às exigências de gerenciamento de risco. Por fim, vem a decisão e priorização: riscos limpos e dentro do apetite podem ser cotados ou decididos automaticamente, enquanto riscos de fronteira ou fora do apetite são roteados ao subscritor humano com o arquivo completo e a justificativa, sempre com explicação. A camada escreve de volta no core de apólice e devolve a trilha de auditoria, com SLA visível e fila de subscrição. Os contornos de mercado citados aqui aparecem com mais detalhe na nossa página de inteligência de seguros.

### Como implantar a camada externa de IA no transporte

A implantação começa pelo escopo. A seguradora define quais coberturas e quais perfis de transporte entram primeiro, por exemplo RCTR-C, que é a responsabilidade do transportador rodoviário, e RCF-DC, que estende a cobertura ao desaparecimento de carga, onde rota e gerenciamento de risco dominam a precificação. A partir daí, a integração se conecta ao core e aos sistemas de apólice existentes por API, sem migração e sem que a seguradora precise conduzir um projeto de TI próprio. A camada é 100% externa e não adiciona carga ao time de tecnologia da seguradora.

O passo decisivo é a calibração ao manual de subscrição de transporte. As regras de apetite para tipos de carga, valor máximo por embarque, rotas aceitas e controles de gerenciamento de risco exigidos são codificadas para que o score e a decisão automática reflitam o apetite declarado da seguradora, e não um modelo genérico. Os agravos e cláusulas mapeiam para os mesmos limites e condições que a equipe de subscrição usa hoje. Apenas riscos claramente dentro do apetite seguem por decisão automática, e todo o resto é escalado com contexto, que é como a seguradora mantém controle da cauda.

Depois da calibração vêm os testes e o go-live. O setup é um trabalho de implementação por preço fixo, escopo claro e KPIs acordados antes do início, e roda de 3 a 12 meses entre automações, integrações, testes e ajustes de entrada em produção. Após o go-live, começa a operação contínua, com faturamento mensal ajustado ao perfil de cada seguradora. Como a sinistralidade e os padrões de roubo mudam, o apetite e o scoring são re-tunados de forma contínua, já que o risco de transporte se move com a dinâmica de roubo nas rodovias.

### Governança, explicabilidade e LGPD

Automatizar uma decisão de subscrição no Brasil acontece dentro de dois regimes. O primeiro é a LGPD, a Lei Geral de Proteção de Dados (Lei 13.709/2018), cujo artigo 20 dá ao titular o direito de pedir revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses, incluindo perfis. Para o scoring de seguros, isso significa que a subscrição automatizada precisa ser explicável e revisável, e a seguradora deve conseguir demonstrar a base de cada decisão, com a Autoridade Nacional de Proteção de Dados (ANPD) como autoridade nacional. O segundo é a supervisão da SUSEP, que fiscaliza o mercado de P&C, a adequação de precificação, reservas e tratamento ao consumidor, e mantém a base pública de estatísticas de prêmios e sinistros.

O requisito prático para qualquer camada de IA de subscrição no Brasil é, portanto, auditabilidade e explicabilidade. Cada score, preço e decisão automática deve ser rastreável até os insumos e até o apetite codificado da seguradora, para que ela responda tanto a um pedido de revisão do cliente sob a LGPD quanto a uma questão do regulador sob a SUSEP. Toda decisão da camada é explicável e retorna uma trilha de auditoria completa, e os dados são criptografados em cada etapa e tratados em conformidade com a LGPD. Isso é um requisito de desenho, não um recurso opcional.

A governança também sustenta a confiança do subscritor. A automação só ganha essa confiança quando o modelo decide do jeito que a seguradora já decide, e não a partir de um template genérico. Por isso a calibração ao manual de subscrição e a recalibração contínua à medida que a sinistralidade se move são parte do mesmo desenho de governança que torna a decisão automática defensável diante de um cliente ou de um regulador.

### Como a WIR automatiza a subscrição de transporte

A WIR é a camada de IA do seguro. Sobre os sistemas que a seguradora já usa, nunca no lugar deles. No ramo de transportes, isso significa uma camada de inteligência externa que lê a submissão do corretor, enriquece o contexto de carga e rota, pontua o risco com Machine Learning calibrado ao apetite e ao manual de subscrição da seguradora, propõe o prêmio e devolve a decisão com trilha de auditoria. A WIR não é seguradora, corretora nem MGA, e não carrega risco. Ela automatiza a jornada de cotação e subscrição conforme a política de aceitação da própria seguradora.

Dois módulos sustentam essa operação. O Underwriter Intelligence automatiza a jornada de cotação conforme a política de risco, com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor, de modo que o subscritor passe a analisar risco e focar em desenvolvimento de negócio. O Smart Sales atua na inteligência de distribuição, mapeando carteira por cliente e produto, pontuando próxima melhor ação e rodando campanhas multicanal com trilha de atribuição. Isso conecta diretamente ao ramo de transportes, onde o corretor coloca o risco de cargas onde recebe uma cotação rápida e consistente, e onde a velocidade de resposta é um fator primário de conversão. Segundo a Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta.

A tração pública da WIR relevante para esta página é uma POC em execução com uma seguradora global no ramo de Transporte. É uma prova de conceito em andamento, descrita de forma conservadora, e não um cliente assinado nem um cliente nomeado. A WIR nasceu de experiência operacional acumulada, construída com a Mahway, Venture Builder na Califórnia, e a Avante, Venture Studio no Brasil. Toda decisão da plataforma é explicável e auditável, com dados criptografados em cada etapa e em conformidade com a LGPD. Para ver onde a IA gera mais valor na jornada de subscrição de transporte da sua seguradora, fale com a WIR.

### Perguntas frequentes

**A automação considera rota, carga e exposição do transporte?**

Sim, a camada de IA pontua cada submissão por carga, rota e exposição específicas. Ela cruza fontes como atratividade de roubo por rota, geografia, histórico do transportador e acumulação contra a carteira existente. Uma carga de alta atratividade em corredor crítico com gerenciamento de risco fraco pontua diferente da mesma carga em rota controlada com escolta e rastreamento, sempre calibrada ao manual de subscrição da seguradora.

**A camada de IA substitui o core no ramo de transporte?**

Não. A WIR é uma camada de IA externa sobre os sistemas que a seguradora já usa, nunca no lugar deles. A integração se conecta ao core e aos sistemas de apólice por API, sem migração e sem projeto de TI próprio. A camada é 100% externa, não adiciona carga ao time de tecnologia e escreve de volta no core com trilha de auditoria. Segundo a BCG, 70% das seguradoras deixam de inovar por limitações de TI.

**Como o modelo é calibrado ao manual de subscrição de transporte?**

O modelo é calibrado codificando as regras de apetite da seguradora para o ramo. Tipos de carga, valor máximo por embarque, rotas aceitas e controles de gerenciamento de risco exigidos são mapeados para que o score e a decisão automática reflitam o apetite declarado, e não um modelo genérico. Apenas riscos claramente dentro do apetite seguem por decisão automática. O resto é escalado ao subscritor humano com contexto, e o scoring é re-tunado de forma contínua conforme a sinistralidade muda.

**As decisões no transporte são explicáveis e auditáveis?**

Sim. Toda decisão da camada de IA é explicável e retorna uma trilha de auditoria completa. Cada score, preço e decisão automática é rastreável até os insumos e até o apetite codificado da seguradora, que assim responde a um pedido de revisão sob a LGPD e a uma questão da SUSEP. Os dados são criptografados em cada etapa e tratados em conformidade com a LGPD. Isso é um requisito de desenho, não um recurso opcional.

**A WIR já tem experiência no ramo de transporte?**

A tração pública da WIR no ramo é uma POC em execução com uma seguradora global em Transporte. É uma prova de conceito em andamento, não um cliente assinado nem nomeado. A WIR não é seguradora, corretora nem MGA, e não carrega risco. Ela nasceu de experiência operacional acumulada, construída com a Mahway, Venture Builder na Califórnia, e a Avante, Venture Studio no Brasil, e automatiza a jornada conforme a política de aceitação da própria seguradora.`
  },
  {
    slug: "automatizar-subscricao-seguros",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Como automatizar a subscrição de seguros com uma camada de IA",
    sub: "Guia para seguradoras automatizarem a jornada de cotação e subscrição com uma camada de IA externa, sobre os sistemas atuais, sem trocar o core. Veja as etapas.",
    author: "WIR Innovation", role: "Equipe",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para seguradoras automatizarem a jornada de cotação e subscrição com uma camada de IA externa, sobre os sistemas atuais, sem trocar o core. Veja as etapas.",
    body: `### O que é automatizar a subscrição com uma camada de IA

Aprender como automatizar a subscrição de seguros com IA significa colocar uma camada de inteligência externa sobre os sistemas que a seguradora já usa, para converter submissões soltas e multicanais em decisões de cotação estruturadas, pontuadas e explicáveis. Essa camada lê a submissão, extrai os campos, pontua o risco contra o apetite da seguradora e devolve uma recomendação de cotação, recusa ou escalonamento, enquanto o core segue como sistema de registro. Ela não troca o core nem exige uma migração de TI.

O destinatário típico é o líder de subscrição, o head de produto ou inovação e o C-level de seguradora que quer ganhar SLA e consistência sem reescrever o sistema de apólices. Hoje, no Seguros e Danos (P&C) brasileiro, o caminho da submissão do corretor até a cotação fechada ainda é manual, e é nesse ponto que se perdem prazo, padronização e capacidade do subscritor. As propostas chegam por e-mail, WhatsApp, portal, PDF e planilha, e o subscritor redigita os dados antes de qualquer análise de risco começar.

A pressão é estrutural. O mercado de Seguros e Danos cresce dois dígitos ao ano, mas a estrutura das companhias não acompanha essa aceleração. Segundo a Deloitte, 40% do tempo do subscritor é gasto em tarefas administrativas, e a Gartner aponta que empresas perdem de 20% a 30% do tempo corporativo organizando dados não estruturados. Um mercado que se expande mais rápido do que os times conseguem contratar precisa automatizar a camada administrativa da subscrição para proteger prazo, consistência e margem. A WIR opera exatamente nessa camada, como a camada de IA do seguro, sobre os sistemas que a seguradora já usa, nunca no lugar deles.

### Como funciona a jornada de subscrição automatizada

A jornada automatizada substitui a esteira manual por um fluxo de seis etapas, preservando uma trilha de auditoria em cada passo. A primeira etapa é o intake multicanal com validação automática. A camada recebe submissões por API, portal e upload, no formato que a seguradora já usa, e registra cada uma com identificador único, horário, canal e corretor de origem. Esse registro é o primeiro ponto da trilha de auditoria.

Na segunda etapa entra a leitura inteligente de documentos. Modelos de Machine Learning e de leitura documental extraem os campos de propostas, laudos, planilhas patrimoniais e manifestos de carga, e normalizam tudo no dicionário de dados da seguradora. A confiança de extração é registrada, de modo que campos de baixa confiança seguem para revisão humana. A terceira etapa é o enriquecimento do corretor e a contextualização. A camada cruza fontes externas como CNPJ, histórico do corretor, exposição e crédito, pontua a qualidade do canal e a completude da submissão, e dispara um pedido automático de informação ao corretor quando faltam dados, em vez de deixar o caso parado em silêncio.

A quarta etapa é o motor de risco e fraude, um modelo de Machine Learning multifator calibrado ao apetite e ao manual de subscrição. Ele gera score de risco e probabilidade, e em paralelo sinaliza inconsistências, valores incompatíveis e documentos duplicados ou manipulados. A quinta etapa é o pricing dinâmico, com cálculo do prêmio ajustado ao risco dentro das faixas e dos limites de alçada que o time de subscrição definiu, refletindo ramo e exposição. A sexta etapa é a decisão e priorização: cada risco volta como cotação, recusa automática ou escalonamento para um humano, sempre com explicação. Os casos simples e dentro do apetite são cotados de forma automática, e os riscos complexos ou de alto valor vão para o subscritor com o arquivo estruturado e o raciocínio do modelo anexados. A decisão é escrita de volta no core de apólices e a trilha de auditoria é devolvida, com SLA visível e fila de subscrição.

### Como implantar a camada externa de IA

A implantação é um rollout em etapas que mantém o core intacto e reduz o risco de adoção. O começo é o escopo. A seguradora escolhe um ou dois ramos e um canal de submissão para iniciar, por exemplo Patrimonial PME ou Transportes carga, e define o SLA-alvo, a meta de processamento direto e as métricas de sucesso, como tempo de cotação e horas de subscritor economizadas. Em seguida vem a integração com o core, via API, para ler submissões e escrever as decisões estruturadas de volta. O core permanece como sistema de registro para emissão e reporte regulatório, e nenhuma migração de apólices históricas é necessária para começar.

O passo decisivo é a calibração ao manual de subscrição e ao apetite de risco. As regras próprias da seguradora, os limites de alçada, o apetite e as exclusões são codificados na camada de scoring e de pricing, e o modelo é ajustado no histórico de sinistros daquela companhia. Assim, as decisões refletem a política da seguradora, não uma média de mercado. Depois entra o teste, com a camada rodando em modo paralelo contra submissões reais, comparando a recomendação da máquina com a decisão do subscritor, medindo concordância, falsos positivos de fraude e precisão de extração, e ajustando os limiares antes de qualquer decisão automática entrar no ar.

O go-live começa pela cotação automática de riscos de baixa complexidade e dentro do apetite, com escalonamento humano para o restante, e a faixa de processamento direto se expande à medida que a confiança aumenta. Por fim, a operação contínua monitora o drift do modelo, recalibra conforme a experiência de sinistros e as mudanças de apetite, e realimenta o modelo com as decisões em que o subscritor sobrescreveu a recomendação. Por ser uma camada externa, sem migração de core, a implantação se mede em semanas a meses de integração e calibração. Na WIR, o setup ocorre em um período de 3 a 12 meses, com escopo claro e KPIs acordados antes do início.

### Governança, explicabilidade e LGPD

A subscrição automatizada no Brasil opera dentro das expectativas de proteção de dados e de supervisão, e isso exige que toda decisão automatizada seja explicável e auditável. Cada cotação, recusa ou escalonamento carrega as razões por trás dele: quais campos, quais fatores de risco e quais regras de apetite levaram ao resultado. O subscritor e o auditor precisam conseguir reconstruir qualquer decisão, porque um score de caixa-preta não é aceitável para uma decisão regulada. Por isso, cada etapa do intake à decisão é registrada com horário, entradas, versão do modelo e desfecho, formando a trilha de auditoria completa.

A LGPD, a Lei Geral de Proteção de Dados (Lei 13.709/2018), atravessa todo o desenho. Submissões de seguro contêm dados pessoais e, às vezes, sensíveis, então a camada processa apenas o necessário, com base legal e respeito aos direitos do titular. As disposições da LGPD sobre decisão automatizada dão ao titular o direito de pedir revisão, o que torna a explicabilidade um requisito de conformidade, e não um detalhe opcional. Os dados são criptografados em trânsito e em repouso, em cada etapa, com controles de acesso e segregação ponta a ponta. Como o modelo codifica o manual de subscrição e o apetite da própria seguradora, as decisões permanecem coerentes com a política declarada e sustentam a auditabilidade esperada das entidades supervisionadas pela SUSEP. Você pode aprofundar o cenário regulatório e de dados no texto da lei publicado pelo [Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e nas orientações da [ANPD](https://www.gov.br/anpd/pt-br).

### Como a WIR automatiza a subscrição

A WIR é a camada de IA do seguro, uma camada de inteligência externa que se conecta por API, portal e upload sobre o core, a precificação e a administração de apólices que a seguradora já roda. Ela não substitui esses sistemas e não impõe carga ao TI da seguradora, porque é 100% externa e não exige migração de core. A WIR também não é seguradora, corretora nem MGA, e não carrega risco. Ela automatiza a jornada de cotação e subscrição segundo a política de aceitação de risco da própria companhia, com Machine Learning calibrado ao apetite de risco e ao manual de subscrição.

O produto se concretiza em módulos definidos. O Underwriter Intelligence automatiza a jornada de cotação conforme a política de risco, com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor, liberando o subscritor para a análise de risco e o desenvolvimento de negócio. O Smart Sales atua na inteligência de distribuição, mapeando a carteira por cliente e produto, pontuando upsell e próxima melhor ação, e operando campanhas multicanais com trilha de atribuição. Há ainda os dashboards, analytics e relatórios em tempo real, com visão proativa dos negócios em andamento e do pipeline. Você pode comparar esse desenho com o panorama de [inteligência de mercado em seguros](/guias-automacao/inteligencia-seguros) para situar onde a automação gera mais valor.

Toda decisão da WIR é explicável e devolve trilha de auditoria completa, com dados criptografados em cada etapa e aderência à LGPD. A WIR nasceu de experiência operacional acumulada, construída com a Mahway, Venture Builder na Califórnia, e a Avante, Venture Studio no Brasil. A tração pública atual é uma primeira POC em execução com uma seguradora global no ramo de Transporte. Para mapear a jornada de subscrição da sua seguradora e onde a automação com IA gera mais valor, [fale com a WIR](https://wirinnovation.ai).

### Perguntas frequentes

**A camada de IA da WIR substitui o core da seguradora?**

Não. A WIR é uma camada de IA externa que opera sobre os sistemas que a seguradora já usa, nunca no lugar deles. O core permanece como sistema de registro para emissão e reporte regulatório. A camada lê as submissões por API, portal e upload, pontua o risco e escreve as decisões estruturadas de volta no core. Por ser 100% externa, não há migração de apólices históricas nem carga sobre o sistema de apólices.

**Quanto tempo leva para implantar a automação da subscrição?**

Na WIR, o setup ocorre em um período de 3 a 12 meses, com escopo claro e KPIs acordados antes do início. Por ser uma camada externa, sem migração de core, a implantação se mede em semanas a meses de integração e calibração. O rollout começa pelo escopo de um ou dois ramos e um canal, passa pela calibração ao manual de subscrição, roda em modo paralelo para teste e então entra em go-live por faixa de complexidade.

**Como o modelo de IA é calibrado ao apetite de risco da seguradora?**

O modelo é calibrado codificando as regras próprias da seguradora, os limites de alçada, o apetite e as exclusões na camada de scoring e de pricing. Ele é ajustado no histórico de sinistros daquela companhia, de modo que as decisões refletem a política da seguradora, não uma média de mercado. O motor de risco é um modelo de Machine Learning multifator calibrado ao apetite e ao manual de subscrição, que gera score de risco e probabilidade.

**As decisões automatizadas são auditáveis e aderentes à LGPD?**

Sim. Toda decisão da WIR é explicável e devolve trilha de auditoria completa, com dados criptografados em cada etapa e aderência à LGPD, a Lei 13.709/2018. Cada cotação, recusa ou escalonamento carrega as razões por trás dele: quais campos, quais fatores de risco e quais regras de apetite levaram ao resultado. Cada etapa é registrada com horário, entradas, versão do modelo e desfecho, sustentando a auditabilidade esperada das entidades supervisionadas pela SUSEP.

**A seguradora precisa de um projeto de TI para começar?**

Não. A WIR é 100% externa e não impõe carga ao TI da seguradora, porque não exige migração de core. A integração ocorre via API para ler submissões e escrever as decisões de volta, e nenhuma migração de apólices históricas é necessária para começar. O core segue como sistema de registro, enquanto a camada de IA assume a jornada de cotação e subscrição segundo a política de aceitação de risco da própria companhia.`
  },
  {
    slug: "decisoes-subscricao-auditaveis",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Decisões de subscrição auditáveis com uma camada de IA",
    sub: "Como manter cada decisão de subscrição automatizada explicável e auditável com uma camada de IA externa, calibrada ao manual de subscrição e aderente à LGPD.",
    author: "WIR Innovation", role: "Equipe",
    time: "11 min", date: "02 · Jun · 2026",
    metaDesc: "Como manter cada decisão de subscrição automatizada explicável e auditável com uma camada de IA externa, calibrada ao manual de subscrição e aderente à LGPD.",
    body: `### O que são decisões de subscrição auditáveis com uma camada de IA

Decisões de subscrição auditáveis com IA são recomendações automatizadas de cotação, recusa ou escalonamento em que cada decisão chega acompanhada da explicação que a produziu e de uma trilha de auditoria completa, escrita de volta junto com a própria decisão. Quem deveria considerá-las são líderes de subscrição, heads de produto e inovação e C-level de seguradora em Seguros e Danos (P&C) que querem automatizar a esteira de cotação sem perder o controle sobre o porquê de cada risco aceito, recusado ou agravado.

A objeção mais honesta dos líderes de subscrição é direta: não dá para colocar um modelo entre a política de risco e uma apólice emitida sem auditar cada decisão que esse modelo toma. O processo manual parece controlável, mas costuma ser pouco auditável na prática. O racional do subscritor vive em caixas de e-mail e na memória das pessoas, não em um registro estruturado e consultável. Uma camada de IA bem implementada não cria o problema de auditoria. Pela primeira vez, ela dá à seguradora um histórico decisão a decisão. A WIR opera exatamente como essa camada de IA do seguro, sobre os sistemas que a seguradora já usa, nunca no lugar deles.

### Como cada decisão gera explicação e trilha de auditoria

A esteira automatizada de subscrição segue seis etapas, e o princípio que governa todas é que nada acontece com uma submissão sem ficar registrado. Primeiro vem o intake multicanal com validação automática, recebendo a submissão por API, portal ou upload no formato que a seguradora já usa, registrando canal de origem, data e hora, identidade do corretor e o documento bruto. Em seguida, a leitura inteligente de documentos extrai campos de PDFs, planilhas e formulários com Machine Learning, guardando os campos extraídos, seus escores de confiança, o vínculo com o trecho de origem no documento e a versão do modelo de extração.

A terceira etapa é o enriquecimento e o contexto do corretor, em que campos ausentes são sinalizados e cruzados com fontes externas como CNPJ, histórico do corretor, exposição e crédito, registrando o que faltava, o que foi enriquecido e de onde veio. Depois entra o motor de risco e fraude, um modelo de Machine Learning multifatorial calibrado ao apetite e ao manual de subscrição, que escreve as features usadas, seus valores, a versão do modelo, o escore resultante e a contribuição de cada feature para esse escore. A quinta etapa é o pricing dinâmico, que calcula o prêmio ajustado ao risco e registra os fatores de tarifação, a taxa base, agravos e descontos e a regra que produziu cada componente.

A sexta etapa é a decisão e priorização: cotar, recusar de forma automática ou escalar para um humano, sempre com explicação. O registro guarda a ação recomendada, o limiar e a regra que a dispararam, se houve decisão automática ou escalonamento, e a ação final do subscritor com o motivo de qualquer override. A escolha de projeto decisiva para a auditoria é que a trilha completa é escrita de volta junto com a decisão, anexada à cotação, para que um revisor reconstrua todo o caminho da submissão bruta até a ação final. O motor não é descrito como infalível. O mecanismo é a rastreabilidade somada ao escalonamento humano em casos de baixa confiança ou fora do apetite, não a previsão perfeita.

### Como implantar a explicabilidade como camada externa

Uma camada externa de IA fica sobre o core, a administração de apólices e os sistemas de pricing que a seguradora já tem. Ela lê e estrutura a submissão, faz o scoring do risco, aplica as regras da seguradora e devolve ao core uma recomendação estruturada e auditável. O core continua emitindo a apólice e segue sendo o sistema de registro. Não há migração de core, não há um projeto de TI que o time da seguradora precise tocar, e a apólice emitida continua sob o sistema atual. Por ser externa e por escrever suas decisões como registros estruturados, cada recomendação é inspecionável de forma independente sem mexer no modelo de dados do core.

A implantação segue uma sequência contida e auditável. O primeiro passo é o escopo, escolhendo um ou dois ramos onde o volume de submissões e a dor de SLA são maiores, como patrimonial ou um ramo de transporte e carga, e definindo o que significa decisão automática e o que significa escalonamento em cada ramo. Em seguida vem a integração com o core via API, para que recomendações e registros de auditoria fluam para o sistema de registro existente. Depois, a calibração ao manual de subscrição e ao apetite de risco codifica as regras, limiares, exclusões e a política de aceitação da própria seguradora, e é aqui que se definem os limiares de escalonamento para que riscos limítrofes ou fora do apetite sempre vão a um humano.

As três últimas fases sustentam a governança ao longo do tempo. O modo sombra roda a camada em paralelo contra submissões históricas e ao vivo, comparando as recomendações às decisões dos subscritores antes de influenciar qualquer coisa, o que valida a calibração e produz o primeiro conjunto de dados de auditoria. O go-live acontece com humano no circuito, começando com a camada recomendando e o subscritor confirmando, ampliando a faixa de decisão automática apenas conforme a confiança e a evidência de auditoria se acumulam. Por fim, a operação contínua monitora drift, revisa escalonamentos e recalibra conforme o manual e o apetite mudam, e cada recalibração é versionada e auditável. Na WIR, a fase de setup roda de 3 a 12 meses, com escopo claro e KPIs acordados antes do início.

### Governança, explicabilidade e LGPD

A governança de uma camada de IA externa se apoia em três pilares: explicabilidade por decisão, a trilha de auditoria escrita de volta e a calibração à política de risco da própria seguradora, tudo sob LGPD e supervisão da SUSEP. Cada recomendação carrega as razões que a produziram, ou seja, quais features moveram o escore de risco, qual regra disparou a cotação, a recusa ou o escalonamento, e quais fatores de tarifação definiram o prêmio. O objetivo é que um subscritor, um auditor ou um regulador leia um único registro de decisão e entenda o racional sem precisar reverter uma caixa-preta.

A explicabilidade não é um item desejável, é um requisito por causa da LGPD. A Lei nº 13.709/2018 governa os dados pessoais dentro das submissões de subscrição. O artigo 20 dá ao titular o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses, e o controlador deve, quando solicitado e observados o segredo comercial e industrial, fornecer informações claras e adequadas sobre os critérios e procedimentos usados. Para a seguradora, isso significa que um proponente recusado ou agravado pode perguntar o porquê, e a seguradora precisa conseguir explicar. O princípio de segurança, nos artigos 6 e 46, exige medidas técnicas e administrativas que protejam os dados, o que na prática significa criptografia em trânsito e em repouso, controle de acesso e log em cada etapa, do intake à escrita da decisão. A Autoridade Nacional de Proteção de Dados supervisiona a conformidade com a LGPD. O texto integral da lei está disponível no [portal do Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), e a orientação regulatória, no site da [ANPD](https://www.gov.br/anpd/pt-br).

Para cada decisão, a camada escreve de volta, anexada à cotação, as entradas e suas fontes, a confiança da extração de documentos, as versões de modelo e de regra, as features e suas contribuições, os componentes de preço, a ação recomendada, o status de escalonamento e a ação humana final com o motivo de qualquer override. Esse registro é imutável e consultável, e os dados ficam criptografados em cada etapa. É o que transforma um genérico o modelo decidiu em um registro completo que mostra por que o modelo recomendou aquilo, qual regra se aplicou e quem confirmou. O modelo é calibrado ao manual de subscrição e ao apetite da própria seguradora, não a um benchmark externo, e os limiares de decisão automática versus escalonamento são definidos pela seguradora. A governança permanece com a seguradora. Nunca se promete uma decisão infalível, porque o mecanismo é explicabilidade somada a escalonamento somada a uma trilha de auditoria completa, de modo que eventuais erros sejam rastreáveis e revisáveis. A [SUSEP](https://www.gov.br/susep) supervisiona conduta de mercado, solvência e tratamento ao consumidor em P&C e espera que as seguradoras retenham registros que justifiquem decisões de subscrição e pricing, e uma camada que escreve um registro estruturado e explicável por decisão fortalece a posição da seguradora em uma inspeção ou em uma disputa de ouvidoria.

### Como a WIR torna as decisões de subscrição auditáveis

A WIR é a camada de IA do seguro, uma plataforma de IA externa que automatiza a esteira de cotação e subscrição sobre os sistemas que a seguradora já usa, nunca no lugar deles. Ela é 100% externa, sem carga no TI da seguradora e sem migração de core, e não é seguradora, corretora nem MGA, ou seja, não carrega risco. O módulo Underwriter Intelligence automatiza a jornada de cotação conforme a política de aceitação da seguradora, com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição e análise preditiva de conversão por produto, risco e corretor, liberando o subscritor para analisar risco e desenvolver negócio. O módulo Smart Sales mapeia a carteira por cliente e produto, faz o scoring de upsell e próxima melhor ação e roda campanhas multicanal com trilha de atribuição. Dashboards, analytics e relatórios em tempo real dão visão proativa dos negócios em andamento.

O contexto de mercado sustenta a urgência. O mercado de Seguros e Danos no Brasil cresce dois dígitos ao ano, mas a estrutura das companhias não acompanha essa aceleração, o que pressiona diretamente a capacidade de subscrição. Os subscritores gastam 40% do tempo em tarefas administrativas, segundo a Deloitte, e 70% das seguradoras não executam inovação por limitações de TI, segundo a BCG. Do lado da distribuição, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta, segundo a Capgemini, enquanto as empresas perdem de 20% a 30% do tempo organizando dados não estruturados, segundo a Gartner. Esses números explicam por que document automation e scoring calibrado pagam o investimento. Para aprofundar o panorama, veja a [inteligência de mercado em seguros da WIR](https://wirinnovation.ai).

A única tração pública da WIR hoje é uma POC em execução com uma seguradora global no ramo de Transporte. A WIR nasceu de experiência operacional acumulada, construída com a Mahway, uma Venture Builder na Califórnia, e a Avante, uma Venture Studio no Brasil. Cada decisão que a plataforma produz é explicável, auditável e retorna trilha de auditoria completa, com dados criptografados em cada etapa e aderência à LGPD. Para mapear como manter cada decisão de subscrição explicável e auditável na sua operação, [fale com a WIR](https://wirinnovation.ai).

### Perguntas frequentes

**Cada decisão automatizada vem com explicação?**

Sim. Cada recomendação de cotação, recusa ou escalonamento chega com as razões que a produziram. O registro mostra quais features moveram o escore de risco, qual regra disparou a ação e quais fatores de tarifação definiram o prêmio. Um subscritor, auditor ou regulador lê um único registro de decisão e entende o racional sem reverter uma caixa-preta. A WIR opera como camada de IA externa, calibrada ao manual de subscrição da própria seguradora.

**A trilha de auditoria é completa e exportável?**

Sim. Para cada decisão, a WIR escreve de volta, anexada à cotação, um registro imutável e consultável. Ele guarda as entradas e suas fontes, a confiança da extração de documentos, as versões de modelo e de regra, as features e suas contribuições, os componentes de preço, a ação recomendada, o status de escalonamento e a ação humana final com o motivo de qualquer override. Um revisor reconstrói todo o caminho da submissão bruta até a ação final.

**Como o modelo se mantém calibrado ao manual de subscrição?**

O Machine Learning é calibrado ao apetite e ao manual de subscrição da própria seguradora, nunca a um benchmark externo. A calibração codifica regras, limiares, exclusões e a política de aceitação, e define os limiares de escalonamento. Antes do go-live, o modo sombra roda em paralelo contra submissões históricas e ao vivo, comparando recomendações às decisões dos subscritores. Cada recalibração é versionada e auditável conforme o manual e o apetite mudam.

**Os dados ficam criptografados e aderentes à LGPD?**

Sim. Os dados ficam criptografados em trânsito e em repouso, em cada etapa, com controle de acesso e log do intake à escrita da decisão. A camada da WIR é aderente à LGPD, sob supervisão da ANPD e da SUSEP. O artigo 20 garante ao titular o direito de revisão de decisões automatizadas, e a explicabilidade por decisão permite que a seguradora explique qualquer recusa ou agravo solicitado.

**A IA pode escalar a decisão para um subscritor humano?**

Sim. A sexta etapa da esteira decide cotar, recusar de forma automática ou escalar para um humano, sempre com explicação. Os limiares de escalonamento são definidos pela seguradora, de modo que riscos limítrofes, de baixa confiança ou fora do apetite sempre vão a um subscritor. O mecanismo é rastreabilidade somada a escalonamento humano, não previsão perfeita. O go-live começa com a WIR recomendando e o subscritor confirmando.`
  },
  {
    slug: "enriquecimento-corretor-priorizacao",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Enriquecimento e priorização de corretores com uma camada de IA",
    sub: "Guia para seguradoras enriquecerem e priorizarem corretores com uma camada de IA externa: score, CNPJ, histórico de conversão e exposição. Veja como, sem trocar o core.",
    author: "WIR Innovation", role: "Equipe",
    time: "11 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para seguradoras enriquecerem e priorizarem corretores com uma camada de IA externa: score, CNPJ, histórico de conversão e exposição. Veja como, sem trocar o core.",
    body: `### O que é enriquecimento de corretores com uma camada de IA

O enriquecimento e priorização de corretores com IA é o estágio da esteira de subscrição em que uma camada de IA externa resolve a identidade do corretor, cruza o histórico de conversão e a exposição, valida o CNPJ e devolve ao subscritor um score e uma prioridade antes que ele gaste tempo na cotação. No mercado brasileiro de Seguros e Danos (P&C), o canal corretor é a rota dominante de distribuição, mas na hora de cotar a seguradora costuma saber quase nada sobre quem enviou a submissão. O subscritor vê um nome, um CNPJ e um risco para precificar. Não vê, na mesma tela e no mesmo segundo, o contexto que decide se aquela submissão merece atenção rápida e profunda.

Sem esse contexto, a triagem vira ordem de chegada. O corretor que historicamente fecha as cotações que pede e o corretor que enche a fila com submissões que nunca convertem recebem o mesmo tratamento. A seguradora também não enxerga, em tempo real, quanto de exposição um único corretor já concentra em determinado ramo ou região, então limites de acumulação e apetite de risco entram tarde, no manual, ou depois do fato. Validações externas como situação cadastral do CNPJ, padrão de sinistralidade e sinais de crédito ficam para depois, quando ficam. O resultado é um SLA lento e inconsistente, e a velocidade de resposta é justamente a variável que mais define onde o corretor coloca o negócio.

Esse guia é para o líder de subscrição, o head de produto ou inovação e o C-level de seguradora que querem priorizar os corretores certos sem tocar no core. A WIR é a camada de IA do seguro. Sobre os sistemas que a seguradora já usa, nunca no lugar deles. A camada lê a submissão, enriquece o corretor cruzando fontes externas e internas, e escreve de volta um contexto e uma prioridade no fluxo de cotação que já existe. Você pode aprofundar o pano de fundo de mercado no nosso material de [inteligência de seguros](https://wirinnovation.ai). Todo cruzamento de dados aqui descrito é aderente à LGPD, com dados criptografados em cada etapa e decisões explicáveis e auditáveis.

### Como o score e o histórico de conversão do corretor entram na jornada

O enriquecimento não é um produto isolado. Ele é uma etapa de uma esteira de subscrição automatizada com seis estágios. Primeiro vem o intake multicanal com validação automática, que captura submissões de e-mail, portal, upload e API em um único pipeline estruturado, no formato que a seguradora já usa. Em seguida vem a leitura inteligente de documentos, em que Machine Learning extrai e estrutura os dados de risco de PDFs, planilhas e formulários, eliminando a redigitação. O terceiro estágio é o enriquecimento e contexto do corretor, foco deste guia. Depois entra o motor de risco e fraude, um modelo multifator calibrado ao apetite e ao manual de subscrição. Na sequência vem o pricing dinâmico, com cálculo do prêmio ajustado ao risco enriquecido. Por fim, a decisão e priorização, que cota, recusa automaticamente ou escala para um humano, sempre com explicação e trilha de auditoria.

Dentro do estágio de enriquecimento, a camada responde a uma única pergunta antes de o subscritor gastar tempo: quanto, e com que velocidade, esta submissão merece atenção. Ela faz isso construindo o contexto que o subscritor montaria à mão. A identidade e validação começam pelo CNPJ, com a camada resolvendo o cadastro da corretora, checando situação ativa e regular e validando a contraparte, o que bloqueia submissões de entidades irregulares ou dormentes. O histórico do corretor vem dos próprios sistemas da seguradora: quantas submissões, quantas fechadas, em quais ramos e com qual experiência de sinistro. Esse é o track record de conversão. A exposição e acumulação mostram quanto aquele corretor já concentra com a seguradora, por ramo e região, para que limites de acumulação e apetite de risco sejam aplicados no intake, não depois da emissão. Sinais de crédito sobre a corretora completam o quadro onde financiamento de prêmio ou risco de pagamento importa.

O elemento preditivo amarra tudo. Um modelo estima a probabilidade de aquela submissão específica converter, condicionada ao produto (ramo), ao perfil de risco e ao comportamento histórico do corretor. Um corretor com CNPJ válido e alta conversão, enviando uma submissão dentro do apetite da seguradora, é sinalizado para atenção rápida e profunda. Um padrão de baixa conversão entra na fila de acordo. A saída é um score do corretor e um sinal de probabilidade de conversão anexados à submissão, mais uma prioridade recomendada. O subscritor parte do contexto em vez de uma tela em branco, e o sistema de cotação pode rotear sozinho. Na WIR, essa lógica vive no módulo Underwriter Intelligence, com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor.

### Como implantar o enriquecimento como camada externa

Adicionar o enriquecimento como camada externa segue um caminho contido, não um programa de core. Ele é aditivo: a seguradora mantém seu sistema de apólices, seja ele Guidewire, mainframe ou desenvolvido em casa, e mantém suas regras de subscrição. A camada de IA lê as submissões e escreve de volta o contexto enriquecido e um score de prioridade por integração, nunca por migração. Essa distinção importa para o público, porque limitações de TI e de core são o bloqueio mais citado à modernização da subscrição nas seguradoras brasileiras.

O caminho tem seis passos em ordem. Primeiro, o escopo: escolher os ramos e segmentos de corretor onde a dor de triagem e o volume são maiores em Seguros e Danos, e definir o que prioridade significa para o SLA daquela seguradora. Segundo, a integração com o core: conectar por API, portal ou upload aos sistemas de cotação e apólice que já existem, sem migração. Terceiro, a calibração ao manual de subscrição e ao apetite de risco, ajustando os modelos de scoring e conversão ao manual da seguradora, ao apetite por ramo e região, e aos limites de acumulação, respeitando as regras existentes em vez de inventar novas. Quarto, o teste contra submissões históricas: o score previu a conversão, a priorização melhorou o SLA nas submissões que importavam, as checagens de CNPJ e exposição estavam corretas. Quinto, o go-live nos ramos escopados, com o subscritor no circuito, score visível e sobrescrevível. Sexto, a operação contínua, com os modelos retreinando sobre novos desfechos de conversão e sinistro à medida que o apetite muda.

Na WIR, esse trabalho se divide em duas fases comerciais. O setup é uma fase única de implantação que roda de 3 a 12 meses e cobre automações, integrações, testes e ajustes de go-live, com escopo claro e KPIs acordados antes do início. Depois vem a operação contínua, em produção após o go-live, com modelo de cobrança ajustado por cliente e faturamento mensal. A WIR é 100% externa, sem carga no TI da seguradora e sem migração de core. A única tração pública até aqui é uma POC em execução com uma seguradora global no ramo de Transporte.

### Governança, explicabilidade e LGPD

Cruzar fontes externas para pontuar um corretor é tratamento de dados pessoais e de contraparte, então é governado por construção. Toda decisão de priorização e scoring é explicável: quais fatores elevaram ou reduziram o score do corretor, por que a submissão foi priorizada ou despriorizada. A supervisão da SUSEP sobre o mercado de P&C e a boa governança de subscrição esperam que decisões automatizadas sejam reconstruíveis e auditáveis, com trilha por decisão. A camada de enriquecimento fortalece a governança em vez de enfraquecê-la. No lugar de checagens manuais ad hoc sem registro, cada validação de CNPJ, checagem de exposição e score fica logado e explicável.

A LGPD, a Lei Geral de Proteção de Dados (Lei 13.709/2018), governa o tratamento de dados pessoais, exige base legal e dá ao titular o direito de revisão de decisões tomadas unicamente por tratamento automatizado, conforme o texto publicado pelo [Planalto](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm). Cruzar CNPJ, histórico do corretor, exposição e crédito precisa repousar sobre base legal válida, ser minimizado ao que a decisão de subscrição exige e manter um caminho de revisão humana. Você pode confirmar o frame regulatório da supervisão de mercado no portal da [SUSEP](https://www.gov.br/susep/pt-br).

Na prática, isso se traduz em três compromissos que a WIR mantém em cada etapa. Os dados são criptografados em trânsito e em repouso, com acesso controlado. O enriquecimento puxa apenas os campos que a decisão de scoring requer, em linha com a minimização exigida pela LGPD. E toda decisão retorna uma trilha de auditoria completa, explicável e sobrescrevível pelo subscritor, nunca infalível e nunca uma promessa de resultado. É assim que o cruzamento de dados externos vira um ativo de governança, e não um risco.

### Como a WIR enriquece e prioriza corretores

A WIR é a camada de IA do seguro, uma plataforma de IA para seguradoras e corretores no Brasil, em Seguros e Danos (P&C). Ela é uma camada de inteligência que opera sobre os sistemas atuais da seguradora e automatiza a jornada de cotação e subscrição segundo a política de aceitação de risco da própria seguradora. No estágio de enriquecimento, ela resolve e valida o CNPJ da corretora, puxa o histórico de conversão dos sistemas internos, lê a exposição por ramo e região e incorpora sinais de crédito, devolvendo um score do corretor e uma prioridade anexados à submissão. Tudo calibrado ao apetite de risco e ao manual de subscrição daquela seguradora, nunca a uma regra genérica.

Dois módulos carregam essa entrega. O Underwriter Intelligence automatiza a jornada de cotação conforme a política de risco da seguradora, com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor, para que o subscritor analise risco em vez de remontar contexto. O Smart Sales é a inteligência de distribuição: mapeia a carteira por cliente e produto, pontua upsell e próxima melhor ação, e roda campanhas multicanal com trilha de atribuição, de modo que penetração e retenção crescem juntas. Somam-se a esses os dashboards, analytics e relatórios em tempo real, com visão proativa dos negócios em andamento e do pipeline.

O contexto de mercado sustenta a urgência. O mercado de Seguros e Danos cresce dois dígitos ao ano, mas a estrutura das empresas não acompanha essa aceleração. Segundo a Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta, e segundo a Deloitte o subscritor gasta 40% do tempo em tarefas administrativas. A BCG aponta que 70% das seguradoras não executam inovação por limitações de TI, e a Gartner estima que de 20% a 30% do tempo corporativo se perde organizando dados não estruturados. Enriquecimento e priorização atacam exatamente esse ponto: deixam a seguradora responder mais rápido às submissões com maior chance de conversão, dos corretores que mais importam, sem tocar no core. A única tração pública da WIR até aqui é uma POC em execução com uma seguradora global no ramo de Transporte. Toda decisão é explicável, auditável, aderente à LGPD e com dados criptografados em cada etapa. Para ver isso na sua operação, [fale com a WIR](https://wirinnovation.ai).

### Perguntas frequentes

**Quais fontes externas a camada cruza para contextualizar o corretor?**

A camada cruza situação cadastral do CNPJ, histórico do corretor, exposição por ramo e região, e sinais de crédito da corretora. Esses dados externos se somam aos sistemas internos da seguradora para construir o contexto que o subscritor montaria à mão. Na WIR, cada validação fica logada, com dados criptografados em trânsito e em repouso, puxando apenas os campos que a decisão de scoring requer, em linha com a minimização exigida pela LGPD.

**Como o histórico de conversão influencia a priorização?**

O histórico de conversão estima a probabilidade de aquela submissão converter, condicionada ao ramo, ao perfil de risco e ao comportamento do corretor. Um corretor com CNPJ válido e alta conversão, dentro do apetite, é sinalizado para atenção rápida e profunda. Um padrão de baixa conversão entra na fila de acordo. No módulo Underwriter Intelligence, essa análise preditiva por produto, risco e corretor anexa um score e uma prioridade à submissão, calibrados ao apetite da seguradora.

**O enriquecimento substitui o CRM da seguradora?**

Não. A WIR é uma camada de IA externa sobre os sistemas atuais, nunca no lugar deles. Ela lê a submissão, enriquece o corretor cruzando fontes externas e internas, e escreve de volta um contexto e uma prioridade no fluxo de cotação que já existe. A integração é por API, portal ou upload, sem migração de core. A WIR é 100% externa, sem carga no TI da seguradora, e mantém as regras de subscrição existentes intactas.

**O cruzamento de dados é aderente à LGPD?**

Sim. Todo cruzamento de CNPJ, histórico, exposição e crédito repousa sobre base legal válida e é minimizado ao que a decisão de subscrição exige. A LGPD, Lei 13.709/2018, dá ao titular o direito de revisão de decisões automatizadas, então a WIR mantém revisão humana no circuito. Os dados são criptografados em trânsito e em repouso, com acesso controlado, e toda decisão retorna uma trilha de auditoria completa, explicável e sobrescrevível pelo subscritor.

**Como a priorização acelera a resposta ao corretor?**

A priorização transforma a triagem por ordem de chegada em atenção dirigida pelas submissões com maior chance de conversão, dos corretores que mais importam. Segundo a Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta. Com o score e a prioridade anexados à submissão, o sistema de cotação pode rotear sozinho e o subscritor parte do contexto em vez de uma tela em branco, encurtando o SLA sem tocar no core.`
  },
  {
    slug: "integrar-camada-ia-core-seguros",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Como integrar uma camada de IA ao core da seguradora sem migração",
    sub: "Guia para seguradoras integrarem uma camada de IA externa ao core atual, sem migração e sem projeto de TI próprio, com go-live em meses. Veja como.",
    author: "WIR Innovation", role: "Equipe",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para seguradoras integrarem uma camada de IA externa ao core atual, sem migração e sem projeto de TI próprio, com go-live em meses. Veja como.",
    body: `### O que é integrar uma camada de IA externa ao core

Integrar camada de IA ao core da seguradora sem migração significa colocar uma inteligência sobre o sistema de apólices que a seguradora já usa, sem trocar esse sistema e sem rodar nenhum projeto de migração de dados. A camada de IA é 100% externa. Ela não substitui o sistema legado e não pede que o time de TI da seguradora construa, hospede ou mantenha os modelos. Quem deve considerar esse modelo são líderes de subscrição, heads de produto e inovação e o C-level de seguradoras de Seguros e Danos (P&C) que querem automatizar a esteira de cotação e subscrição sem abrir um programa de troca de core.

A diferença em relação ao caminho tradicional é clara. Um projeto de modernização ou troca do sistema de apólices é um programa longo, caro e de alto risco, que disputa a mesma capacidade de TI que todas as outras prioridades. A camada de IA externa é o padrão oposto. O core fica onde está, a inteligência entra na frente dele e a conexão acontece por API. Isso importa muito no Brasil, onde grande parte das seguradoras incumbentes opera sobre sistemas legados nos quais qualquer mudança compete por capacidade de TI escassa. Segundo a BCG, 70% das seguradoras não executam suas iniciativas de inovação por limitações de TI, e é exatamente essa restrição que o modelo de camada externa foi desenhado para contornar. A WIR é a camada de IA do seguro, sobre os sistemas que a seguradora já usa, nunca no lugar deles.

### Como a camada lê e escreve de volta no core

A camada de IA externa funciona como uma porta de entrada única para qualquer submissão e como uma ponte de volta para o sistema de apólices. Ela recebe a cotação no formato que a seguradora já trabalha, estrutura e pontua o risco, e devolve o resultado para o core através das APIs do próprio core ou de um adaptador de integração. O sistema de registro continua sendo o core. A camada é a inteligência que opera sobre ele.

A esteira percorre seis etapas em ordem. Primeiro, o intake multicanal com validação automática, em que submissões chegam por API, portal ou upload de documento e são normalizadas em um único objeto estruturado, sem coleta manual. Em seguida, a leitura inteligente de documentos, em que o Machine Learning extrai os campos relevantes de PDFs e imagens não estruturados, como propostas, apólices, laudos, faturas e conhecimentos de transporte, eliminando a redigitação. Depois vem o enriquecimento do corretor e o contexto, com cruzamento de fontes externas como CNPJ, histórico do corretor, exposição e crédito, mais o score de completude da submissão. A quarta etapa é o motor de risco e fraude, um modelo de Machine Learning multifator calibrado ao apetite de risco e ao manual de subscrição, que produz score de risco, probabilidade e decisão automatizada. A quinta é o pricing dinâmico, com cálculo de prêmio ajustado ao risco e resultado instantâneo. Por fim, a decisão e priorização, que recomenda cotar, recusar de forma automática ou escalar para um subscritor humano, sempre com explicação. É nessa última etapa que a camada escreve a decisão de volta no core de apólices e retorna a trilha de auditoria, com SLA visível e fila do subscritor.

O efeito líquido é que o tempo do subscritor migra do trabalho administrativo para os riscos que de fato precisam de julgamento humano, o SLA ao corretor cai e as decisões de risco ficam consistentes em toda a carteira.

### Como implantar a integração sem migração de core

A implantação segue um caminho objetivo e não exige troca do sistema legado. Começa pelo escopo, em que a seguradora escolhe os ramos e tipos de submissão a automatizar primeiro, define as regras de apetite, a meta de SLA e as métricas de sucesso. Depois vem a integração com o core, conectando a camada ao sistema de apólices existente por API ou por um adaptador de integração. A camada lê as submissões e escreve resultados estruturados, scores e decisões de volta no core. Não há migração de dados e o core permanece o sistema de registro. A integração é um projeto de API com escopo definido, não uma reconstrução de plataforma.

A terceira etapa é a calibração ao manual de subscrição e ao apetite de risco, configurando o motor de Machine Learning e as regras contra o manual, os dados históricos de sinistro e o apetite da própria seguradora. O modelo reflete a política da seguradora, não uma genérica. Em seguida vem o teste em modo paralelo, comparando as leituras, scores e decisões da camada com os desfechos reais dos subscritores, ajustando os limiares até que a precisão e a taxa de straight-through atinjam as metas combinadas. O go-live liga a camada para os ramos escolhidos, com riscos limpos fluindo direto e casos de borda escalando para subscritores. Por fim, a operação contínua mantém a camada rodando como serviço externo, sem que o TI da seguradora a mantenha, com modelos monitorados e recalibrados conforme a carteira e o apetite evoluem.

O setup roda de 3 a 12 meses, com escopo claro, preço fixo e KPIs acordados antes do início. Como não há migração de core, a janela é medida em meses, não nos prazos de um programa de troca de sistema. Depois do go-live, a operação contínua entra em produção com modelo de cobrança ajustado por cliente e faturamento mensal.

### Governança, explicabilidade e LGPD

Automatizar decisões de subscrição em um mercado regulado impõe três não negociáveis, e a camada de IA externa é construída em torno deles. O primeiro é a explicabilidade e a auditabilidade. Toda decisão automatizada, da leitura ao score, ao preço e ao desfecho de cotar, recusar ou escalar, é explicável e deixa uma trilha de auditoria completa com os insumos, o score, a regra aplicada e a saída. Isso protege a seguradora em cenários de supervisão e disputa e mantém um humano capaz de revisar qualquer decisão. A SUSEP supervisiona o mercado de P&C e espera que as seguradoras governem suas práticas de precificação e aceitação, como detalha o portal da SUSEP.

O segundo é a conformidade com a LGPD, a Lei Geral de Proteção de Dados (Lei 13.709/2018). Submissões de seguro contêm dados pessoais e, por vezes, sensíveis. A camada processa esses dados sobre base legal válida, com minimização, e dá suporte aos direitos do titular, incluindo a revisão de decisões tomadas de forma automatizada, conforme orientam a ANPD e a LGPD. Os dados ficam criptografados em trânsito e em repouso em cada etapa. O terceiro é a calibração à política de risco da própria seguradora. O modelo não é uma caixa preta imposta de fora. Ele é calibrado ao manual de subscrição, aos dados históricos e ao apetite de risco, de modo que a decisão automatizada é a política da seguradora aplicada de forma consistente e defensável diante do regulador e do comitê de subscrição. Como a camada é externa e escreve de volta no core em vez de substituí-lo, a seguradora mantém intactos seus controles, sua auditoria e seu perímetro de governança de dados.

### Como a WIR integra a camada de IA ao core

A WIR é a camada de IA do seguro, uma plataforma de IA externa que opera sobre os sistemas que a seguradora já usa, nunca no lugar deles. Ela não é seguradora, corretora nem MGA, e não carrega risco. O papel da WIR é automatizar a esteira de cotação e subscrição segundo a política de aceitação da própria seguradora, integrando por API, portal ou upload e escrevendo a decisão de volta no core de apólices com a trilha de auditoria.

Na prática, a WIR entrega isso por dois módulos. O Underwriter Intelligence automatiza a jornada de cotação conforme a política de risco da seguradora, para que os subscritores analisem risco e foquem em desenvolvimento de negócio, com scoring de Machine Learning em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor. O Smart Sales atua na inteligência de distribuição, mapeando a carteira por cliente e produto, pontuando upsell e próxima melhor ação e rodando campanhas multicanal com trilha de atribuição. Dashboards, Analytics e Relatórios em tempo real dão a visão proativa dos negócios em andamento e do pipeline. A tração pública da WIR hoje é uma POC em execução com uma seguradora global no ramo de Transporte. Toda decisão automatizada da WIR é explicável, auditável e em conformidade com a LGPD, com dados criptografados em cada etapa. Para mapear a integração na sua operação, fale com a WIR.

### Perguntas frequentes

**A integração exige migração ou troca do core?**

Não. A integração não exige migração nem troca do core. A camada de IA é externa e conecta ao sistema de apólices atual por API ou por um adaptador de integração. O core permanece o sistema de registro e continua onde está, sem reconstrução de plataforma e sem programa de troca de sistema. A WIR opera sobre os sistemas que a seguradora já usa, nunca no lugar deles, lendo submissões e escrevendo resultados de volta no core.

**A camada de IA gera carga para a equipe de TI?**

Não. A camada de IA é 100% externa e não pede que o TI da seguradora construa, hospede ou mantenha os modelos. A WIR roda como serviço externo, com modelos monitorados e recalibrados conforme a carteira evolui. Isso responde à restrição apontada pela BCG, em que 70% das seguradoras não executam suas iniciativas de inovação por limitações de TI. Para o TI, o trabalho se resume à conexão por API, não a um programa de manutenção de plataforma.

**A camada escreve a decisão de volta no core de apólices?**

Sim. A camada escreve a decisão de volta no core de apólices e retorna a trilha de auditoria completa. Ela recebe a submissão no formato que a seguradora já usa, estrutura e pontua o risco, e devolve score, regra aplicada, preço e o desfecho de cotar, recusar de forma automática ou escalar para um subscritor humano. O core segue como sistema de registro. Na WIR, toda decisão automatizada é explicável, auditável e em conformidade com a LGPD.

**Quanto tempo leva o setup da integração?**

O setup da integração roda de 3 a 12 meses, com escopo claro, preço fixo e KPIs acordados antes do início. Como não há migração de core, a janela é medida em meses, não nos prazos de um programa de troca de sistema. O caminho cobre escopo, integração por API, calibração ao manual de subscrição e ao apetite de risco, teste em modo paralelo e go-live para os ramos escolhidos.

**Como fica a operação contínua depois do go-live?**

Depois do go-live, a operação contínua mantém a camada rodando como serviço externo, sem que o TI da seguradora a mantenha. Os modelos de Machine Learning são monitorados e recalibrados conforme a carteira e o apetite de risco evoluem, e o faturamento é mensal, com modelo de cobrança ajustado por cliente. A WIR continua escrevendo decisões explicáveis e auditáveis de volta no core, em conformidade com a LGPD e com dados criptografados em cada etapa.`
  },
  {
    slug: "leitura-inteligente-submissoes-seguro",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Leitura inteligente de submissões de seguro com uma camada de IA",
    sub: "Guia para seguradoras automatizarem a leitura de submissões e a extração de dados de cotação com uma camada de IA externa, sobre os sistemas atuais. Veja como.",
    author: "WIR Innovation", role: "Equipe",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para seguradoras automatizarem a leitura de submissões e a extração de dados de cotação com uma camada de IA externa, sobre os sistemas atuais. Veja como.",
    body: `### O que é leitura inteligente de submissões com uma camada de IA

A leitura inteligente de submissões de seguro com IA é a extração automática de campos a partir de e-mails, anexos e uploads de cotação, com validação e estruturação dos dados antes que qualquer cotação chegue à mesa de subscrição. Em vez de uma pessoa abrir cada proposta, encontrar a importância segurada, o CNPJ, o endereço de risco e a vigência, e digitar tudo no core ou no motor de cálculo, uma camada de IA externa interpreta o documento, atribui um nível de confiança a cada valor e entrega um objeto de submissão limpo e pronto para a esteira. Quem deve considerar isso é a seguradora de Seguros e Danos (P&C) que perde velocidade e capacidade na entrada manual de dados.

O ponto de partida de qualquer jornada de subscrição é o intake, e ele quase nunca chega como dado estruturado. Chega como corpo de e-mail, formulário em PDF, documento escaneado, planilha, carta do corretor, certificado, apólice anterior e relação de sinistros. A Gartner estima que o tempo corporativo perdido organizando dados não estruturados fica na faixa de 20-30%, tempo que sai da análise de risco e vai para a digitação e a reconciliação manual. Esse é exatamente o trabalho que a leitura inteligente remove da rotina do subscritor.

### Como a extração e validação automática de dados funciona

A leitura inteligente é extração baseada em Machine Learning, não casamento de template. A pergunta deixa de ser "qual caractere está nesta região de pixel" e passa a ser "qual é o CNPJ do segurado, qual é a importância segurada, qual cobertura foi solicitada, qual o endereço de risco", e o modelo encontra esses valores onde quer que apareçam, mesmo em layouts que nunca viu naquele formato exato. É essa independência de layout que diferencia a camada de IA das ondas anteriores de tecnologia. O OCR tradicional é preso a template e quebra quando o formulário muda ou o scan vem torto. O RPA roteiriza cliques sobre uma tela fixa e quebra quando o portal ou o campo de origem muda. Ambos tratavam a leitura como transcrição mecânica, quando o problema real é interpretação em português, com vocabulário de seguro.

A camada lê todos os canais como uma única esteira de entrada. O intake é multicanal: API, portal, upload, e-mail com anexos. A leitura inteligente extrai os campos de submissões com alta precisão, e cada valor extraído vem acompanhado de um nível de confiança. Campos de alta confiança seguem direto. Campos de baixa confiança são roteados para uma checagem humana rápida. É isso que torna o processamento direto seguro, porque a máquina sabe o que não sabe.

A validação automática acontece antes de a submissão avançar para o pricing. A camada verifica completude, ou seja, se os campos obrigatórios daquele ramo estão presentes, verifica formato como CNPJ, CEP, datas e moeda, e verifica consistência interna, conferindo se a importância segurada bate entre os documentos. Itens faltantes ou conflitantes voltam para enriquecimento com o corretor. Só os campos genuinamente ambíguos chegam a uma pessoa, o que inverte o modelo do OCR, em que humanos conferiam tudo. A leitura inteligente é a segunda etapa de uma esteira mais ampla, que segue com enriquecimento do corretor e contexto, motor de risco e fraude calibrado ao apetite, pricing dinâmico e, por fim, decisão com prioridade. Quando a entrada chega limpa e estruturada, cada etapa seguinte herda dados confiáveis em vez de herdar a bagunça.

### Como implantar a leitura inteligente como camada externa

A leitura inteligente entra como camada de IA externa, sobre os sistemas que a seguradora já usa, nunca no lugar deles. A camada não substitui o sistema de apólices, o motor de cálculo nem a stack legada. Ela ingere as submissões dos canais, produz dados validados e estruturados, e devolve esses dados ao core, à mesa de subscrição ou ao motor de cálculo via API ou arquivo. Não há migração de core. A seguradora que estava travada pelo custo e pelo prazo de uma troca de core consegue automatizar o intake mantendo o sistema de registro intacto. Esse é um ponto material, já que a BCG aponta que 70% das seguradoras não executam inovação por limitações de TI. Um modelo de sobreposição contorna esse bloqueio sem apostar a companhia em um programa de core de vários anos.

O caminho de implantação tem etapas claras. Primeiro, define-se o escopo e os canais de entrada. Em seguida, integra-se a camada ao core e ao motor de cálculo, calibra-se a leitura ao vocabulário e às regras de cada ramo, testa-se com submissões reais e ajusta-se antes do go-live. Depois do go-live, a operação segue contínua, com a leitura sendo refinada conforme novos formatos de corretor aparecem. O setup roda de 3 a 12 meses, com escopo fixo e KPIs acordados antes do início, e a operação contínua tem faturamento mensal ajustado por cliente. Como a entrada limpa é a precondição da cotação rápida, automatizar bem essa etapa é o que destrava a velocidade de resposta, e a Capgemini observa que 60%+ dos corretores escolhem a seguradora pela velocidade de resposta. Para o contexto de mercado, vale acompanhar a página de inteligência de seguros da WIR.

### Governança, explicabilidade e LGPD

Automatizar o intake toca dados pessoais e corporativos, então a governança vem embutida no mecanismo, não como um adendo. A camada registra cada extração, cada nível de confiança, cada resultado de validação e cada intervenção humana. O score de confiança não é só um recurso de precisão. É um recurso de governança, porque permite à seguradora provar quais valores foram extraídos pela máquina com alta certeza e quais foram conferidos por uma pessoa. Toda decisão automatizada é explicável e retorna uma trilha de auditoria completa, o que a torna defensável diante de auditoria interna e da SUSEP.

A aderência à LGPD é parte do desenho. A submissão costuma conter dados pessoais como nome, CPF e endereço, e a Lei Geral de Proteção de Dados, Lei 13.709 de 2018, exige base legal, minimização de dados e segurança no tratamento. Decisões automatizadas que afetam pessoas carregam direito de revisão, então o desenho mantém uma pessoa no circuito onde a decisão afeta indivíduos. Os dados são criptografados em cada etapa. A camada não toma o lugar do julgamento de risco da seguradora. Ela estrutura a entrada, evidencia a procedência de cada campo e devolve uma trilha que a área técnica e o regulador conseguem auditar. A autoridade supervisora de dados é a ANPD, e a SUSEP supervisiona o mercado de Seguros e Danos, o registro de produtos e a conduta.

### Como a WIR automatiza a leitura de submissões

A WIR é a camada de IA do seguro, uma plataforma de IA externa que automatiza a jornada de cotação e subscrição sobre os sistemas que a seguradora já usa. Na etapa de leitura inteligente, a WIR ingere o intake multicanal por API, portal, upload e e-mail com anexos, faz a extração automática de campos com alta precisão e roteia para validação por completude, formato e consistência antes de a submissão seguir. O Machine Learning é calibrado ao apetite de risco e ao manual de subscrição de cada seguradora, e cada decisão é explicável, auditável e retorna trilha completa, com dados criptografados em cada etapa e aderentes à LGPD.

Os módulos da WIR sustentam essa esteira de ponta a ponta. O Underwriter Intelligence automatiza a jornada de cotação conforme a política de risco da seguradora, com scoring de risco em tempo real, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor. O Smart Sales atua na inteligência de distribuição, mapeando portfólio por cliente e produto e priorizando a próxima melhor ação. Dashboards e relatórios em tempo real dão visão proativa do pipeline. A WIR não é seguradora, corretora nem MGA, e não carrega risco. Ela automatiza a jornada conforme a política de aceitação de cada seguradora. Fundada em 2025, construída com a Mahway e a Avante, a WIR tem como tração pública uma POC em execução com uma seguradora global no ramo de Transporte. Para mapear como aplicar a leitura inteligente na sua operação, fale com a WIR.

### Perguntas frequentes

**A leitura inteligente lê e-mails e anexos de cotação?**

Sim. A leitura inteligente extrai campos de e-mails, anexos em PDF, planilhas, uploads e chamadas de API como uma única esteira de entrada. O intake é multicanal, então a camada de IA da WIR interpreta o documento, encontra a importância segurada, o CNPJ, o endereço de risco e a vigência onde quer que apareçam, atribui um nível de confiança a cada valor e devolve um objeto de submissão limpo, pronto para a esteira de subscrição.

**Qual a diferença entre essa camada de IA e OCR tradicional?**

A camada de IA usa Machine Learning para interpretar o documento, enquanto o OCR tradicional é preso a template e transcreve pixels. O OCR quebra quando o formulário muda ou o scan vem torto. A leitura da WIR pergunta qual é o CNPJ ou a cobertura solicitada e encontra esses valores em layouts nunca vistos, com vocabulário de seguro em português. Cada campo vem com nível de confiança, então só os ambíguos chegam a uma pessoa.

**Os dados extraídos são validados antes de seguir na jornada?**

Sim. A validação automática acontece antes de a submissão avançar para o pricing. A camada verifica completude dos campos obrigatórios do ramo, formato de CNPJ, CEP, datas e moeda, e consistência interna, conferindo se a importância segurada bate entre os documentos. Itens faltantes ou conflitantes voltam para enriquecimento com o corretor. Quando a entrada chega limpa, cada etapa seguinte da esteira herda dados confiáveis em vez de herdar a bagunça.

**A extração automática é aderente à LGPD?**

Sim. A aderência à LGPD, Lei 13.709 de 2018, é parte do desenho, com base legal, minimização de dados e segurança no tratamento. Os dados são criptografados em cada etapa. Decisões automatizadas que afetam pessoas carregam direito de revisão, então uma pessoa fica no circuito onde a decisão afeta indivíduos. A camada da WIR registra cada extração, nível de confiança e validação, devolvendo trilha auditável diante de auditoria interna, da SUSEP e da ANPD.

**Precisa trocar o core para ler submissões com IA?**

Não. A WIR entra como camada de IA externa, sobre os sistemas que a seguradora já usa, nunca no lugar deles. Não há migração de core. A camada ingere as submissões, produz dados validados e devolve ao sistema de apólices ou ao motor de cálculo via API ou arquivo. Isso contorna o bloqueio que a BCG aponta, em que 70% das seguradoras não executam inovação por limitações de TI, sem apostar a companhia em um programa de core de vários anos.`
  },
  {
    slug: "motor-risco-fraude-seguros",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Motor de risco e fraude para seguradoras com uma camada de IA",
    sub: "Como uma camada de IA externa pontua risco e tria fraude na subscrição, calibrada ao apetite e ao manual, sem trocar o core. Fale com a WIR.",
    author: "WIR Innovation", role: "Equipe",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "Como uma camada de IA externa pontua risco e tria fraude na subscrição, calibrada ao apetite e ao manual, sem trocar o core. Fale com a WIR.",
    body: `### O que é um motor de risco e fraude com uma camada de IA

Um motor de risco e fraude para seguradoras com IA é uma etapa de decisão dentro da jornada de subscrição que lê cada submissão, pontua o risco e sinaliza indícios de fraude antes da decisão final do subscritor. Ele não detém a apólice nem assume o lugar do core da seguradora. É uma camada de IA externa que recebe a cotação, processa os dados e devolve um veredito estruturado, formado por um score de risco, uma probabilidade e uma decisão automatizada recomendada. Líderes de subscrição, heads de produto e times de inovação consideram esse tipo de motor quando o scoring manual ficou inconsistente e a fraude só aparece no momento do sinistro, quando custa mais caro.

Dois problemas estruturais explicam o interesse por esse mecanismo. O scoring manual varia de subscritor para subscritor, e os critérios raramente ficam documentados decisão a decisão. Ao mesmo tempo, os sinais de fraude estão espalhados em fontes externas que o subscritor não tem tempo de cruzar na velocidade da cotação. O resultado é uma perda que escapa na aceitação e só fica visível depois. O mercado brasileiro de Seguros e Danos (P&C) cresce dois dígitos ao ano, e a própria expansão amplia a base de prêmio e a superfície de fraude ao mesmo tempo. Um motor calibrado eleva a taxa de detecção e a consistência da seleção, mas não elimina a fraude, e nunca deve ser descrito como infalível.

### Como o scoring de risco e a triagem de fraude funcionam

O motor opera como um estágio entre a entrada da submissão e a decisão do subscritor, sem nunca tomar para si a apólice. A administração da apólice, a contabilização do prêmio e o registro oficial continuam no core da seguradora. A sequência tem cinco momentos encadeados. Primeiro, a entrada da submissão, quando o motor recebe a cotação e os documentos pelo canal do corretor ou pelo portal da seguradora. Em seguida, a extração e o enriquecimento, com leitura inteligente dos documentos e busca de sinais externos. Depois, o scoring multifator de Machine Learning, que pesa fatores de risco e indicadores de fraude em conjunto, calibrado ao manual de subscrição e ao apetite de risco para aquele ramo. Na sequência, a saída, com um score de risco, uma probabilidade e uma decisão automatizada recomendada, que pode ser aprovação automática, encaminhamento ao subscritor, recusa ou marcação para análise de fraude. Por fim, o roteamento, em que casos limpos e de baixo risco seguem por decisão automática e casos ambíguos ou de alta exposição vão para uma pessoa, com a evidência de apoio anexada.

A palavra decisiva é calibração. Um modelo de fraude genérico não é o mesmo que um modelo ajustado ao apetite, às regras do manual e ao histórico de perdas de cada seguradora por ramo. É a calibração que permite ao mesmo motor ser conservador onde a seguradora quer crescer com cautela e mais permissivo onde quer volume. O motor codifica o manual, não passa por cima dele.

O modelo é multifator por desenho. Regras de sinal único, como uma lista negra ou um limite rígido, são frágeis e fáceis de burlar. Uma abordagem multifator de Machine Learning combina muitos sinais fracos, como situação do CNPJ, histórico do corretor, concentração de exposição, comportamento de crédito e inconsistências documentais, em um único score. O ganho sobre o scoring manual vem justamente do cruzamento de dados que o subscritor não consegue checar à mão na velocidade da cotação. A validação de CNPJ e CPF confirma que a entidade proponente existe, está ativa e bate com a atividade declarada, e um CNPJ recém-aberto em uma cobertura de alto valor é um indício clássico. O histórico do corretor revela padrões por canal de origem, qualidade da submissão e clusters de casos suspeitos. A exposição e a acumulação mostram se o risco se sobrepõe a uma exposição existente que romperia limites de acumulação ou de apetite. Os sinais de crédito entram como um fator entre muitos, nunca como base única de decisão, e a consistência documental cruza a submissão com os dados extraídos para revelar contradições. Esse cruzamento também é uma vantagem de distribuição, porque o corretor escolhe a seguradora em parte pela velocidade de resposta, e uma decisão consistente e defensável em segundos melhora a conversão sem abrir mão da disciplina de seleção. Toda decisão de risco e fraude é explicável e retorna uma trilha de auditoria completa, com dados criptografados em cada etapa e em conformidade com a LGPD.

### Como implantar o motor de risco como camada externa

A implantação não é uma migração de core nem um projeto de TI que a seguradora precisa tocar. O motor é uma camada de IA cem por cento externa, sobre os sistemas que a seguradora já usa. O caminho começa pelo escopo, com a definição dos ramos, dos canais e das regras do manual de subscrição que entram primeiro. Em seguida vem a integração com o core existente pelo formato que a seguradora já utiliza, seja API, portal ou upload, sem trocar o sistema de apólices. O passo central é a calibração, em que o modelo é ajustado ao manual de subscrição, ao apetite de risco e ao histórico de perdas por ramo, para que as saídas reflitam a política de aceitação da própria seguradora e não um benchmark genérico. Depois vêm os testes, com casos históricos e novos, a entrada em produção controlada e a operação contínua, em que o modelo segue calibrado e auditado ao longo do tempo.

O cronograma de setup roda de 3 a 12 meses, com escopo claro e KPIs acordados antes do início, e depois passa à operação contínua em produção. Como a camada é externa, a área de TI da seguradora não carrega um projeto de substituição de sistema. A escolha pela camada externa, em vez de um core novo, mantém o registro oficial e a contabilização de prêmio onde já estão e adiciona a inteligência por cima, o que reduz o risco de execução e o tempo até o primeiro valor.

### Governança, explicabilidade e LGPD

Uma decisão automatizada de subscrição e de fraude no Brasil não pode ser uma caixa preta. A explicabilidade vem por decisão, e cada score e recomendação carrega os fatores que o moveram, quais sinais empurraram o score para cima e quais para baixo, de modo que o subscritor possa revisar, sobrepor e justificar o resultado. Isso é necessário na prática, porque o subscritor não confia em um score sem explicação, e é relevante do ponto de vista legal. A trilha de auditoria é completa, e cada decisão fica reconstruível, com o registro de quais dados foram lidos, qual versão do modelo rodou, qual foi a saída e quem revisou ou sobrepôs. Esse registro sustenta a governança interna e a supervisão de conduta em P&C, e protege a seguradora se um caso recusado ou marcado for contestado.

Na proteção de dados, a LGPD, a Lei 13.709 de 2018, é diretamente relevante. O artigo 20 dá ao titular o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais que afetem seus interesses, incluindo decisões destinadas a definir perfis. Na prática, para um motor de risco e fraude, isso reforça três pontos: manter um caminho de revisão humana para resultados automatizados adversos, registrar a base de cada decisão e ser capaz de informar os critérios usados. Uma camada de IA externa que produz decisões explicáveis e registradas, roteia casos adversos ou ambíguos para uma pessoa e mantém os dados criptografados em cada etapa está alinhada a esse arranjo. A honestidade da proposta está em decisões melhores, mais rápidas, mais consistentes e auditáveis, com humanos retidos para casos adversos e de alta exposição. O cenário de mercado pode ser aprofundado na página de [inteligência para seguros](https://wirinnovation.ai/guias-automacao/inteligencia-seguros).

### Como a WIR opera o motor de risco e fraude

A WIR é a camada de IA do seguro, uma plataforma de IA para seguradoras e corretores no Brasil que opera o motor de risco e fraude como um estágio da jornada de cotação e subscrição, sobre os sistemas que a seguradora já usa, nunca no lugar deles. O motor faz parte de um fluxo de seis etapas: entrada multicanal com validação automática, leitura inteligente de documentos, enriquecimento e contexto do corretor, o motor de risco e fraude com modelo multifator de Machine Learning calibrado ao apetite e ao manual, precificação dinâmica e, por fim, a decisão e a priorização, que devolve cotação, recusa automática ou escalada para uma pessoa, sempre com explicação, escrevendo de volta no core da apólice e retornando a trilha de auditoria.

Na prática, o motor vive dentro do módulo Underwriter Intelligence, que automatiza a jornada de cotação conforme a política de risco da seguradora, com scoring de Machine Learning em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor. O módulo Smart Sales cuida da inteligência de distribuição, mapeando carteira por cliente e produto e priorizando a próxima melhor ação. A WIR não é seguradora, corretora nem MGA, e não carrega risco. A única tração pública é uma POC em execução com uma seguradora global no ramo de Transporte. Para ver o mecanismo aplicado ao apetite da seguradora, [fale com a WIR](https://wirinnovation.ai). A camada de IA do seguro. Sobre os sistemas que a seguradora já usa, nunca no lugar deles.

### Perguntas frequentes

**Como o score de risco é calibrado ao manual de subscrição?**

O score é calibrado ajustando o modelo de Machine Learning às regras do manual, ao apetite de risco e ao histórico de perdas por ramo de cada seguradora. Essa calibração codifica o manual, não passa por cima dele, permitindo que o mesmo motor seja conservador onde a seguradora quer crescer com cautela e mais permissivo onde busca volume. As saídas refletem a política de aceitação da própria seguradora, não um benchmark genérico, e seguem calibradas e auditadas ao longo da operação contínua.

**Quais fontes externas o motor cruza para avaliar o risco?**

O motor cruza situação do CNPJ, validação de CNPJ e CPF, histórico do corretor, concentração e acumulação de exposição, sinais de crédito e inconsistências documentais. O modelo multifator de Machine Learning combina esses sinais fracos em um único score, revelando indícios que o subscritor não consegue checar à mão na velocidade da cotação. Um CNPJ recém-aberto em cobertura de alto valor é um indício clássico. Os sinais de crédito entram como um fator entre muitos, nunca como base única de decisão.

**Cada decisão de risco e fraude é explicável e auditável?**

Sim. Toda decisão é explicável e retorna uma trilha de auditoria completa. Cada score e recomendação carrega os fatores que o moveram, quais sinais empurraram o score para cima e quais para baixo, de modo que o subscritor possa revisar, sobrepor e justificar o resultado. O registro reconstrói quais dados foram lidos, qual versão do modelo rodou, qual foi a saída e quem revisou. Os dados ficam criptografados em cada etapa, em conformidade com a LGPD. A decisão é defensável, nunca infalível.

**O motor de risco substitui a equipe de subscrição?**

Não. O motor é uma etapa de decisão que aumenta o time de subscrição, nunca o substitui. Casos limpos e de baixo risco seguem por decisão automática, e casos ambíguos ou de alta exposição são roteados para uma pessoa, com a evidência de apoio anexada. O subscritor revisa, sobrepõe e justifica cada resultado. O motor eleva a taxa de detecção e a consistência da seleção, mas não elimina a fraude e nunca deve ser descrito como infalível.

**Em quanto tempo o motor entra em produção na seguradora?**

O setup roda de 3 a 12 meses, com escopo claro e KPIs acordados antes do início, e depois passa à operação contínua em produção. Como a WIR é uma camada de IA cem por cento externa, sobre os sistemas que a seguradora já usa, não há migração de core nem projeto de TI que o time precise tocar. A integração ocorre pelo formato que a seguradora já utiliza, seja API, portal ou upload, o que reduz o risco de execução e o tempo até o primeiro valor.`
  },
  {
    slug: "precificacao-dinamica-seguros",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Precificação dinâmica de seguros com uma camada de IA",
    sub: "Como seguradoras automatizam a precificação dinâmica de seguros com IA, prêmio ajustado a risco em tempo real sobre os sistemas atuais. Veja como funciona.",
    author: "WIR Innovation", role: "Equipe",
    time: "12 min", date: "02 · Jun · 2026",
    metaDesc: "Como seguradoras automatizam a precificação dinâmica de seguros com IA, prêmio ajustado a risco em tempo real sobre os sistemas atuais. Veja como funciona.",
    body: `### O que é precificação dinâmica de seguros com uma camada de IA

A precificação dinâmica de seguros com IA é o cálculo do prêmio em tempo real a partir de um score de risco multifator do risco individual, em vez de uma leitura sobre tabela de tarifação fixa. Em vez de aplicar uma tarifa estática que envelhece entre uma revisão e outra, o prêmio passa a refletir a exposição específica daquele risco e se ajusta conforme os dados e o apetite mudam. Quem deveria considerar isso são as seguradoras de Seguros e Danos (P&C), em especial líderes de subscrição, heads de produto e de inovação, e os corretores que dependem de uma cotação firme para fechar.

O ponto que precisa ficar claro desde o início é o limite. A camada de IA não carrega risco e não é atuária. A base técnica de tarifação, as hipóteses de sinistralidade e a estrutura de tarifa continuam com o time atuarial da seguradora. O que a camada de IA faz é aplicar essa lógica de precificação a cada cotação individual, automaticamente e em tempo real, calibrada ao manual de subscrição e ao apetite de risco da própria seguradora. Ela é uma camada de inteligência externa, que opera sobre o sistema core e os sistemas atuariais existentes sem substituir nenhum deles. O core segue como sistema de registro. A conexão acontece por API, por um portal de cotação ou por upload de documentos.

O contraste é com a troca completa do core, um programa de vários anos, de risco alto, que limitações de TI e de sistemas legados costumam travar. A camada externa evita isso porque é aditiva e reversível. Ela consome os dados que a seguradora já produz e devolve uma saída estruturada que os sistemas dela já entendem. A WIR, a camada de IA do seguro, atua exatamente nesse formato. Sobre os sistemas que a seguradora já usa, nunca no lugar deles.

### Como o prêmio ajustado a risco é calculado em tempo real

A precificação dinâmica é uma etapa de uma esteira conectada, alimentada pelas etapas anteriores e alimentando a decisão seguinte. A esteira tem seis estágios. Primeiro vem o intake multicanal, em que a submissão chega por API, portal do corretor, e-mail ou documento enviado, e a camada normaliza todos os canais em uma submissão estruturada única, sem redigitação. Em seguida vem a leitura inteligente de documentos, em que modelos de Machine Learning extraem o segurado, o objeto em risco, a localização, a ocupação, a importância segurada e o histórico de sinistros a partir de PDFs e planilhas não estruturados, convertendo tudo em campos que o motor consegue usar.

O terceiro estágio é o enriquecimento e o scoring do corretor, em que a submissão é cruzada com dados internos e externos, como risco por localização, exposição por CEP, setor, sinistros anteriores e checagens de compliance, e recebe um score de qualidade e completude. O quarto estágio é o motor de risco e fraude, um modelo de Machine Learning multifator que gera o score de risco do risco individual combinando a submissão estruturada, os dados de enriquecimento e os padrões históricos de sinistralidade da seguradora, com os sinais de fraude e anomalia pontuados na mesma passagem.

O quinto estágio é a precificação dinâmica, o foco deste guia. O prêmio é derivado do score de risco, não lido de uma tabela fixa. Mecanicamente, o score alimenta uma função de precificação que os atuários da seguradora definem. O prêmio técnico vem do core atuarial ou das tabelas de tarifa que o time atuarial possui, e a camada de IA aplica o ajuste multifator a essa base técnica em tempo real, segundo o manual de subscrição. A precificação é multifator porque dezenas de variáveis correlacionadas, como objeto, localização, ocupação, importância segurada, franquia, escopo de cobertura, histórico de sinistros e setor, influenciam o prêmio ao mesmo tempo, o que uma tabela estática não faz. Ela é calibrada ao apetite, então riscos fora do apetite são agravados, referidos ou recusados, em vez de entrarem na carteira silenciosamente. Ela é em tempo real, com o prêmio calculado no mesmo fluxo da cotação. E ela é consistente, porque o mesmo perfil de risco gera o mesmo prêmio toda vez, removendo a variância de um subscritor para outro. As alavancas comerciais que a seguradora permite, como comissão, faixas de desconto e agravamentos, ficam limitadas pela própria política, de modo que nada é precificado fora do manual.

O sexto estágio é a decisão e a priorização com trilha de auditoria. A camada roteia a cotação. Riscos limpos, dentro do apetite e dentro da alçada seguem direto. Casos que pedem julgamento humano vão para o subscritor com o score, o prêmio calculado e os fatores que contribuíram. Toda cotação carrega uma trilha de auditoria completa dos dados usados, da versão do modelo, dos fatores que dirigiram o score e o preço, e do caminho da decisão. O resultado é um prêmio ajustado ao risco que reflete a exposição real do risco individual, calculado automaticamente, enquanto a base de tarifação atuarial e o risco em si permanecem inteiramente com a seguradora. Para entender onde a precificação se encaixa na esteira completa, vale ver também o guia de [inteligência de subscrição da WIR](https://wirinnovation.ai).

### Como implantar a precificação dinâmica como camada externa

A implantação segue uma sequência prática que não toca no core. O primeiro passo é o escopo e a seleção do ramo. A seguradora escolhe um ramo onde a dor de precificação é maior e o volume justifica a automação, como um ramo de alta frequência ou um ramo de especialidade de alto atrito como o patrimonial, e define a jornada a automatizar e a meta de SLA. O segundo passo é a integração com os sistemas atuais, em que a camada se conecta ao core e ao canal do corretor por API, portal ou upload. O core continua como sistema de registro. Os dados entram, e cotações precificadas e decisões estruturadas voltam. Não há migração.

O terceiro passo é a calibração ao manual de subscrição e ao apetite de risco. As regras de aceitação, os limites de apetite, as alçadas, os gatilhos de referência e as alavancas de precificação são codificados. A base técnica de tarifação vem do time atuarial, e a camada é calibrada para aplicá-la. É esse passo que faz da cotação precificada a política da própria seguradora expressa automaticamente, em vez de uma caixa preta. O quarto passo é o teste e o back-test, com o modelo rodando contra submissões históricas e resultados conhecidos. Os prêmios calculados são comparados com a tabela atual e com as perdas realizadas, e o modelo é ajustado até a precificação ficar consistente, dentro do apetite e explicável.

O quinto passo é o go-live controlado. Começa em modo sombra ou assistido, em que a camada precifica e o subscritor confirma, e a alçada de processamento direto se expande conforme a confiança cresce, mantendo a referência humana para riscos fora do apetite e de alto valor. O sexto passo é a operação e o monitoramento contínuos, acompanhando a acuracidade da precificação, a sinistralidade por segmento, a conversão e o SLA, o drift do modelo e as taxas de exceção, com recalibração à medida que a experiência de sinistros e o apetite evoluem. Na prática, o setup da plataforma roda em 3 a 12 meses, com escopo claro e KPIs acordados antes do início, e a operação contínua vem depois do go-live. A precificação passa a ser uma função viva, em vez de uma atualização periódica de tabela.

### Governança, explicabilidade e LGPD

A precificação automatizada no Brasil precisa ser explicável, auditável e em conformidade, e essas exigências moldam como a camada é construída. Cada cotação precificada tem de ser rastreável até os fatores que a produziram, ou seja, quais dados, quais direcionadores do score de risco, qual agravamento ou desconto e qual versão do modelo. Um preço de caixa preta que o subscritor ou o auditor não consegue reconstruir não é aceitável para um prêmio técnico regulado, então a camada precisa expor os fatores que contribuíram para cada cotação. Cada cotação carrega uma trilha de auditoria completa com entradas, fontes de enriquecimento, score, prêmio calculado, caminho da decisão, carimbos de tempo e a versão da política aplicada, o que sustenta a auditoria interna, a supervisão da SUSEP e a resolução de disputas.

A precificação de seguros usa dados pessoais, e por isso entra a LGPD, a Lei nº 13.709 de 2018. A lei exige uma base legal para o tratamento, limitação de finalidade e direitos do titular. O artigo 20 dá ao titular o direito de solicitar a revisão de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses, o que se aplica diretamente à subscrição e à precificação automatizadas. É exatamente por isso que a explicabilidade e um caminho de referência humana são projetados desde o início, não acoplados depois. Os dados de submissão, de enriquecimento e as cotações precificadas são criptografados em trânsito e em repouso, em cada etapa da jornada. A governança se ancora no fato de que o modelo aplica o manual de subscrição e a base atuarial da própria seguradora. A seguradora continua responsável pelo preço e pelo risco. A camada de IA torna essa política mais rápida e mais consistente, e a mantém explicável. Você pode conferir o texto completo da [Lei Geral de Proteção de Dados no portal do Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e as orientações da [Autoridade Nacional de Proteção de Dados](https://www.gov.br/anpd/pt-br).

### Como a WIR automatiza a precificação dinâmica

A WIR é a camada de IA do seguro, uma plataforma de IA que automatiza a jornada de cotação e subscrição sobre os sistemas que a seguradora já usa, sem migração de core e sem carga no TI. Na precificação dinâmica, a WIR aplica o ajuste multifator à base técnica que o time atuarial define, com Machine Learning calibrado ao apetite de risco e ao manual de subscrição, e devolve o prêmio ajustado ao risco de forma instantânea. O módulo Underwriter Intelligence automatiza a jornada de cotação segundo a política de aceitação da seguradora, com scoring de risco em tempo real, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor, de modo que o subscritor analisa risco e foca em desenvolvimento de negócio. O módulo Smart Sales atua na inteligência de distribuição, mapeando a carteira por cliente e produto, pontuando upsell e a próxima melhor ação, com campanhas multicanal e trilha de atribuição.

Toda decisão da WIR é explicável e retorna uma trilha de auditoria completa, com os dados criptografados em cada etapa e em conformidade com a LGPD. A WIR não carrega risco e não é seguradora, corretora ou MGA. Ela automatiza a etapa de precificação segundo a política da própria seguradora, e a base de tarifação atuarial permanece com o time da seguradora. Como contexto de mercado, o Seguros e Danos cresce dois dígitos ao ano, enquanto a estrutura das empresas não acompanha essa aceleração. Subscritores gastam 40% do tempo em tarefas administrativas, segundo a Deloitte. 70% das seguradoras não executam inovação por limitações de TI, segundo o BCG, o que reforça o valor de uma camada externa que não exige migração. Os corretores que escolhem a seguradora pela velocidade de resposta somam 60%+, segundo a Capgemini, e empresas perdem 20-30% do tempo organizando dados não estruturados, segundo o Gartner. A tração pública da WIR hoje é uma POC em execução com uma seguradora global no ramo de Transporte. Para mapear onde a precificação dinâmica ajusta o prêmio ao risco na sua operação, vale [falar com a WIR](https://wirinnovation.ai).

### Perguntas frequentes

**Como o prêmio é calculado a partir do score de risco?**

O prêmio é derivado de um score de risco multifator que alimenta a função de precificação que os atuários da seguradora definem. O prêmio técnico vem do core atuarial ou das tabelas de tarifa que o time atuarial possui, e a camada de IA aplica o ajuste em tempo real, segundo o manual de subscrição. Dezenas de variáveis correlacionadas, como objeto, localização, ocupação, importância segurada e histórico de sinistros, influenciam o cálculo ao mesmo tempo.

**A precificação dinâmica substitui o atuarial da seguradora?**

Não. A camada de IA não substitui o atuarial e não carrega risco, ela automatiza a etapa de precificação sobre os sistemas atuais. A base técnica de tarifação, as hipóteses de sinistralidade e a estrutura de tarifa continuam com o time atuarial. A WIR aplica essa lógica a cada cotação individual, automaticamente e em tempo real, calibrada ao apetite de risco da própria seguradora. A WIR não é seguradora, corretora ou MGA.

**O preço gerado pela IA é explicável e auditável?**

Sim. Cada cotação precificada é rastreável até os fatores que a produziram, com trilha de auditoria completa. A trilha registra as entradas, as fontes de enriquecimento, o score, o prêmio calculado, o caminho da decisão, os carimbos de tempo e a versão da política aplicada. Isso sustenta a auditoria interna, a supervisão da SUSEP e a resolução de disputas. Os dados são criptografados em cada etapa e o tratamento segue a LGPD.

**A precificação fica calibrada ao apetite de risco da seguradora?**

Sim. A precificação é calibrada ao apetite de risco e ao manual de subscrição da própria seguradora. As regras de aceitação, os limites de apetite, as alçadas, os gatilhos de referência e as alavancas de precificação são codificados, então riscos fora do apetite são agravados, referidos ou recusados, em vez de entrarem na carteira silenciosamente. As alavancas comerciais permitidas, como comissão e faixas de desconto, ficam limitadas pela própria política, de modo que nada é precificado fora do manual.

**Em quanto tempo a precificação dinâmica entra em produção?**

O setup da plataforma roda em 3 a 12 meses, com escopo claro e KPIs acordados antes do início. A sequência não toca no core: escopo do ramo, integração por API ou portal, calibração ao manual de subscrição, teste e back-test contra submissões históricas, e go-live controlado em modo sombra. A alçada de processamento direto se expande conforme a confiança cresce, e a operação contínua com monitoramento vem depois do go-live.`
  },
  {
    slug: "processar-email-cotacao-automatico",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Como processar e-mails de cotação de seguro automaticamente com IA",
    sub: "Como uma camada de IA externa lê e-mails e anexos de cotação, extrai e valida os dados e alimenta a subscrição em Seguros e Danos, sem trocar o core.",
    author: "WIR Innovation", role: "Equipe",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "Como uma camada de IA externa lê e-mails e anexos de cotação, extrai e valida os dados e alimenta a subscrição em Seguros e Danos, sem trocar o core.",
    body: `### O que é processar e-mails de cotação com uma camada de IA

Processar e-mail de cotação de seguro automaticamente com IA significa colocar uma camada de inteligência sobre a caixa de entrada que a seguradora já usa, para que ela leia cada mensagem, abra os anexos e transforme tudo em dado estruturado antes que uma pessoa precise digitar qualquer campo. Em Seguros e Danos, a maior parte das cotações de risco não massificado ainda chega como texto livre no corpo do e-mail, com os dados reais escondidos em anexos: uma proposta preenchida, uma planilha de locais segurados ou de frota, uma apólice anterior, fotos e PDFs de valores em risco. Nada chega pronto. Alguém do time de operações abre cada mensagem, baixa os anexos, interpreta formatos inconsistentes e redigita os campos no sistema de cotação antes que o subscritor sequer olhe para o risco.

Essa etapa de entrada é onde tempo, precisão e relacionamento com o corretor se perdem. Cada campo digitado à mão é uma chance de transpor um CNPJ, errar uma importância segurada ou esquecer um local, e o erro descoberto depois força retrabalho e nova cotação. O subscritor acaba gastando boa parte do dia em triagem, cobrança de documentos faltantes e digitação, em vez de seleção e precificação de risco. Estudos de mercado estimam que empresas perdem de 20% a 30% do tempo apenas organizando dados não estruturados, segundo a Gartner, e é exatamente esse tempo que a camada de IA recupera ao ler o e-mail por você. A WIR, a camada de IA do seguro, atua sobre os sistemas que a seguradora já usa, nunca no lugar deles.

### Como o e-mail vira dado estruturado na jornada

A jornada automatizada começa na captura multicanal. A camada de IA se conecta à caixa de cotações que a seguradora já publica, e também a portais e feeds de API, e captura cada submissão no momento em que chega. Para cada mensagem ela puxa o corpo do e-mail, a identidade do remetente e do corretor e todos os anexos, sejam PDF, DOCX, planilha, imagem ou documento digitalizado. Nada espera uma pessoa abrir. A submissão é registrada, datada e enfileirada na hora, e é isso que torna possível um SLA rápido para o corretor que escolhe a seguradora pela velocidade de resposta.

A segunda etapa é o coração do caso de uso: a leitura inteligente de documentos. A leitura em linguagem natural extrai a intenção e os dados que vêm no texto, como o ramo, o segurado, as coberturas pedidas, datas e instruções especiais escritas em prosa. Em paralelo, o Document AI, com OCR para arquivos digitalizados e em imagem, lê propostas, planilhas, apólices anteriores e relações de itens, independentemente do layout que o corretor enviou. A camada então mapeia o que leu para o modelo de dados de subscrição: CNPJ e CPF, atividade, endereços e locais, importância segurada por item, ocupação e construção para patrimonial, frota e uso para automóvel, histórico de sinistros e as coberturas e limites solicitados.

Antes de seguir, cada campo extraído é validado. A camada confere formatos e dígitos verificadores, checa a consistência interna para ver se as somas fecham e os locais estão completos, faz cruzamentos com dados de referência e verifica a completude contra o que o ramo exige. Campos ausentes ou de baixa confiança são sinalizados para revisão humana ou para uma cobrança automática ao corretor, em vez de passar dado ruim adiante em silêncio. O resultado é um registro de cotação limpo e estruturado, com cada campo rastreável até o documento e a posição exata de onde veio, pronto para alimentar a esteira pelas integrações existentes. A partir daí, as etapas seguintes seguem o fluxo: enriquecimento da submissão com dados externos e internos, motor de risco que pontua contra o apetite e o manual de subscrição, precificação com a própria lógica de rating da seguradora e a decisão final, sempre com trilha de auditoria. O subscritor passa a começar de dado limpo, não da caixa de entrada.

### Como implantar a captura de e-mails como camada externa

A implantação começa por escopo estreito. O caminho mais seguro é escolher um ramo de alto volume com entrada dolorosa, como Patrimonial, Auto frota ou Transporte, e definir os campos-alvo, as regras de validação e o que conta como boa extração. Escopo estreito prova valor rápido e reduz o risco do programa, porque a seguradora valida o mecanismo em uma linha antes de escalar para as demais. Em seguida, a camada é apontada para a caixa de cotações existente e para os canais de portal e API, a princípio em modo de leitura, sem novo endereço e sem qualquer mudança de comportamento para o corretor.

A integração com o core vem depois. O time mapeia a saída estruturada para os campos de cotação e de core e combina o handoff por API, por entrega de arquivo ou por automação na própria tela existente. O core permanece o sistema de registro, e a camada de IA apenas entrega dado validado para a jornada que a seguradora já roda. A WIR é 100% externa, sem carga no TI da seguradora e sem migração de core, e por isso remove o medo de tocar no sistema legado que costuma travar a modernização da subscrição.

O go-live é progressivo. As submissões são testadas em modo sombra contra e-mails históricos e ao vivo, a equipe mede a acurácia de extração e a taxa de captura da validação campo a campo e calibra o que for preciso, mantendo humanos no circuito nos casos de baixa confiança. Começa-se processando automaticamente as submissões limpas e de alta confiança e roteando o resto para pessoas, e a faixa automática se amplia conforme a acurácia se confirma. O ciclo de setup da WIR roda de 3 a 12 meses, com escopo claro e KPIs acordados antes do início, e depois entra a operação contínua, que monitora qualidade de extração, novos formatos de documento e o retorno dos corretores, melhorando conforme vê mais do tráfego real da seguradora.

### Governança, explicabilidade e LGPD

Processamento automático só é seguro quando cada campo extraído é validado e os valores de baixa confiança são sinalizados em vez de confiados cegamente. A presença de humanos no circuito sobre exceções faz parte do desenho, não é um plano B. Cada campo extraído deve rastrear até o documento e a posição exata de origem, e cada classificação adiante deve expor seus motivadores. É isso que permite à seguradora defender uma decisão automatizada diante de um auditor ou da SUSEP, que supervisiona o mercado de Seguros e Danos e espera que as seguradoras saibam explicar e documentar como avaliam e precificam riscos.

As submissões carregam dados pessoais e comerciais, então a camada criptografa os dados em trânsito e em repouso ao longo da captura, da leitura e do handoff. A LGPD, a Lei nº 13.709 de 2018, governa os dados pessoais dentro dessas submissões, como CPF e dados de contato. O processamento precisa repousar sobre uma base legal válida, seguir limitação de finalidade e minimização e respeitar os direitos do titular. Para decisões automatizadas, a LGPD dá ao titular o direito de pedir revisão de decisões tomadas unicamente com base em tratamento automatizado, e é justamente por isso que explicabilidade e um caminho com revisão humana importam para a cotação automática. Com a WIR, toda decisão é explicável, retorna trilha de auditoria completa e mantém os dados criptografados em cada etapa, em aderência à LGPD.

### Como a WIR processa e-mails de cotação

A WIR é a camada de IA do seguro, uma plataforma de IA externa que automatiza a jornada de cotação e subscrição sobre os canais que a seguradora já usa, sejam e-mail, portal ou API, e sobre o core existente. Ela não substitui a caixa de entrada nem o sistema de registro: lê a submissão, estrutura e valida o dado e devolve tudo para a jornada que a seguradora já roda, sempre com explicação e trilha de auditoria. O módulo Underwriter Intelligence automatiza a jornada de cotação conforme a política de aceitação da seguradora, com scoring de risco em Machine Learning calibrado ao apetite, roteamento automático por apetite e exposição e análise preditiva de conversão por produto, risco e corretor, para que o subscritor analise risco e foque em desenvolvimento de negócio. O módulo Smart Sales mapeia a carteira por cliente e produto, pontua próximas melhores ações e roda campanhas com trilha de atribuição, enquanto dashboards e relatórios em tempo real dão visão proativa do pipeline.

A WIR nasceu de experiência operacional acumulada, construída com a Mahway, Venture Builder na Califórnia, e a Avante, Venture Studio no Brasil. A única tração pública hoje é uma POC em execução com uma seguradora global no ramo de Transporte, e a WIR não é seguradora, corretora nem MGA, ou seja, não carrega risco. Para a seguradora que quer transformar a caixa de cotações em dado estruturado sem trocar o core, o ponto de partida é mapear o ramo de maior volume e calibrar a extração e a validação ao manual de subscrição. A camada de IA do seguro, sobre os sistemas que a seguradora já usa, nunca no lugar deles.

### Perguntas frequentes

**A camada de IA lê o corpo do e-mail e os anexos de cotação?**

Sim. A camada de IA lê o corpo do e-mail e abre todos os anexos, como PDF, DOCX, planilha e documentos digitalizados. A leitura em linguagem natural extrai a intenção e os dados escritos no texto, enquanto o Document AI com OCR lê propostas, planilhas e apólices anteriores, independentemente do layout. Tudo isso é mapeado para o modelo de dados de subscrição, com cada campo rastreável até o documento e a posição de onde veio.

**Precisamos trocar nosso e-mail ou core para usar isso?**

Não. A WIR é 100% externa e não substitui a caixa de entrada nem o core, que permanece o sistema de registro. A camada de IA se conecta à caixa de cotações, ao portal e à API que a seguradora já usa, a princípio em modo de leitura, sem novo endereço e sem mudança para o corretor. Sem carga no TI e sem migração de core, o ciclo de setup roda de 3 a 12 meses.

**Os dados extraídos do e-mail são validados antes de seguir?**

Sim. Antes de seguir, cada campo extraído é validado quanto a formato, dígitos verificadores, consistência interna e completude contra o que o ramo exige. Campos ausentes ou de baixa confiança são sinalizados para revisão humana ou cobrança automática ao corretor, em vez de passar dado ruim adiante. O resultado é um registro de cotação limpo e estruturado, com cada campo rastreável até o documento de origem, pronto para alimentar a esteira de subscrição.

**O processamento de e-mails é aderente à LGPD?**

Sim. Com a WIR, o processamento é aderente à LGPD, a Lei nº 13.709 de 2018, e os dados são criptografados em trânsito e em repouso na captura, na leitura e no handoff. O tratamento repousa sobre base legal válida, com limitação de finalidade e minimização. Toda decisão é explicável e retorna trilha de auditoria completa, e o titular pode pedir revisão de decisões tomadas unicamente de forma automatizada.`
  },
  {
    slug: "proxima-melhor-acao-seguradoras",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Próxima melhor ação para seguradoras com uma camada de IA",
    sub: "Como seguradoras automatizam a próxima melhor ação e o upsell com uma camada de IA externa, sobre os sistemas atuais. Mapeie a carteira e prove atribuição.",
    author: "WIR Innovation", role: "Equipe",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "Como seguradoras automatizam a próxima melhor ação e o upsell com uma camada de IA externa, sobre os sistemas atuais. Mapeie a carteira e prove atribuição.",
    body: `### O que é próxima melhor ação para seguradoras com uma camada de IA

A próxima melhor ação para seguradoras com IA é a prática de pontuar, conta a conta, qual produto deve ser oferecido a qual cliente, por qual corretor e em qual momento, usando uma camada de IA externa que lê os sistemas atuais da seguradora sem substituí-los. Em vez de listas de renovação e contato por intuição, a inteligência de distribuição transforma a carteira em um mapa pontuado de oportunidades de upsell e cross-sell. Quem deveria considerar isso é o líder comercial ou de distribuição que olha para o livro de negócios e enxerga um pipeline invisível.

O problema é estrutural no Seguros e Danos (P&C) brasileiro, distribuído majoritariamente por corretores independentes. Os sistemas de apólice guardam contratos por ramo e por data de renovação, não por conta ou domicílio. Um mesmo segurado pode ter auto com um corretor, patrimonial com outro e nenhuma cobertura de vida ou responsabilidade, e nada na pilha de sistemas mostra esse espaço em branco. A penetração de cross-sell fica baixa justamente porque a oportunidade é invisível no nível da conta.

Há ainda dois agravantes. Não existe um score sobre a próxima ação, então o time comercial trata a conta de maior propensão e a conta morta com a mesma campanha genérica. E não existe trilha de atribuição, então quando uma cotação converte a seguradora muitas vezes não sabe qual sinal disparou a oferta, qual corretor agiu nem qual canal fechou. Sem atribuição, a função de distribuição não consegue provar o que funciona, calibrar nem defender orçamento. A pressão por penetração cresce porque o custo de aquisição sobe e a concorrência de InsurTechs empurra a seguradora a extrair mais valor do livro que já possui.

### Como o score de upsell e próxima melhor ação funciona

A camada de IA opera em três movimentos encadeados. Primeiro vem o mapeamento da carteira no eixo cliente por produto. A camada unifica registros fragmentados em uma visão única de conta, resolve o mesmo segurado entre ramos e entre corretores, normaliza a taxonomia de produtos e monta a matriz que expõe o espaço em branco. O resultado é um mapa, conta por conta, do que está contratado, do que falta e de quais corretores tocam a relação. É também onde problemas de qualidade de dado, como CPF e CNPJ duplicados ou códigos de corretor inconsistentes, são reconciliados.

Em seguida vem a pontuação. Sobre esse mapa, modelos de Machine Learning pontuam cada conta por propensão de upsell e ranqueiam a próxima melhor ação. O score é calibrado ao apetite de risco e à economia de produto da seguradora, de modo que a ação recomendada respeita as regras de subscrição e a margem, não apenas a propensão. A próxima melhor ação responde a uma pergunta sequenciada. Não basta saber que existe oportunidade. É preciso saber qual ação única, para esta conta e por qual corretor, tem o maior valor esperado agora. É a mesma disciplina de scoring usada na jornada de subscrição automatizada, aplicada ao lado da distribuição.

Por fim, as ações pontuadas viram campanhas multicanal com trilha de atribuição. Cada ação é roteada para o canal certo, seja a lista de tarefas do corretor, a fila do time comercial, a abordagem digital direta ou canais parceiros, e cada passo é registrado. A trilha de atribuição grava qual sinal gerou a recomendação, qual corretor ou canal agiu, qual contato precedeu a cotação e qual fechou a venda. Como a camada raciocina no nível da conta, o mesmo motor que impulsiona o cross-sell também fortalece a retenção. Uma conta com mais produtos na mesma seguradora é estruturalmente mais aderente, e o timing da próxima ação, agindo antes da renovação ou de um evento de vida ou de negócio, eleva tanto a taxa de renovação quanto os produtos por conta. Penetração e retenção não são programas separados. São duas leituras da mesma inteligência de conta.

### Como implantar a inteligência de distribuição como camada externa

A implantação segue um caminho que mantém o programa de baixo risco e reversível. Começa pelo escopo, escolhendo os ramos e livros onde o espaço em branco é maior e o dado é mais limpo, tipicamente auto e patrimonial, onde a sobreposição de contas é alta. A métrica de sucesso é definida no início, seja produtos por conta, conversão de cross-sell ou retenção em contas multiproduto. Depois vem a integração com o CRM e o core, por API ou extração programada, em modo de leitura primeiro. Não há escrita de volta no core. As recomendações fluem para os canais e para a camada de atividades do CRM, nunca para as tabelas de contrato do sistema de registro.

A calibração ajusta o scoring ao manual de subscrição, ao apetite de risco e à margem por produto, ramo a ramo, para que as ações recomendadas sejam vendáveis e subscritíveis. Em seguida vêm os testes, com backtest dos scores contra conversões históricas e um grupo de controle, de modo que a trilha de atribuição prove ganho incremental e não apenas correlação. O go-live libera listas priorizadas e gatilhos de campanha para um conjunto piloto de corretores e times comerciais, com humanos no circuito em cada ação recomendada. Na operação contínua, o retorno dos resultados retreina os modelos, o mapa de cliente por produto é atualizado em cadência regular e o programa se expande para mais ramos conforme a confiança cresce.

A diferença em relação à troca de sistemas é o ponto inteiro. Uma migração de core ou de CRM numa seguradora brasileira é um programa de vários anos e alto risco que congela a inovação enquanto roda. A camada externa deixa o sistema de registro intocado, conecta por integração e não por migração, e é reversível. Se a camada é desligada, o core continua operando exatamente como antes. Na prática da WIR, o setup roda de 3 a 12 meses, com escopo claro e KPIs acordados antes de começar, seguido de operação contínua em produção.

### Governança, trilha de atribuição e LGPD

Um scoring automatizado que influencia ofertas comerciais precisa ser explicável e auditável. Cada score de próxima melhor ação deve ser rastreável aos seus direcionadores, ou seja, quais variáveis empurraram a propensão para cima, para que os times comercial e de compliance justifiquem por que uma conta foi priorizada. Scoring opaco é um risco de governança e de confiança, e a camada de IA precisa retornar essa explicação por padrão.

A mesma trilha de atribuição que prova a efetividade das campanhas serve como registro de auditoria. Ela documenta quem foi contatado, com que base, por qual canal e com qual resultado, o que sustenta tanto a revisão de desempenho quanto a defensabilidade regulatória. Esse é o enquadramento de governança da inteligência de distribuição, com decisões explicáveis, auditáveis e dados criptografados em cada etapa.

No Brasil, a Lei Geral de Proteção de Dados, a Lei nº 13.709 de 2018, governa o dado pessoal processado no mapeamento e na pontuação da carteira. A camada deve operar sobre base legal válida, honrar os direitos do titular, minimizar o dado ao que o scoring exige e registrar o tratamento. O Artigo 20 da LGPD dá ao titular o direito de solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado, razão pela qual o humano no circuito e a explicabilidade não são opcionais no scoring comercial automatizado. A ANPD, Autoridade Nacional de Proteção de Dados, é a autoridade supervisora. Veja o texto integral da LGPD no [portal do Planalto](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) e a atuação da [ANPD](https://www.gov.br/anpd/pt-br). A [SUSEP](https://www.gov.br/susep) supervisiona o mercado de P&C e avança uma agenda de dados abertos com o Sistema de Seguros Aberto, o que eleva a expectativa de uso controlado e auditável do dado de seguro.

### Como a WIR automatiza a próxima melhor ação com Smart Sales

A WIR é a camada de IA do seguro. Sobre os sistemas que a seguradora já usa, nunca no lugar deles. É uma plataforma de IA externa que se conecta ao CRM e ao core da seguradora para automatizar a jornada de cotação e subscrição conforme a política de aceitação de risco da própria seguradora. A WIR não é seguradora, corretora nem MGA, e não carrega risco. Ela orquestra inteligência sobre os sistemas existentes e devolve recomendações aos canais que o time comercial e os corretores já usam.

O módulo Smart Sales é a inteligência de distribuição que materializa a próxima melhor ação. Ele mapeia a carteira no eixo cliente por produto, pontua o upsell e a próxima melhor ação, e roda campanhas multicanal com trilha de atribuição, de forma que penetração e retenção crescem juntas. O Machine Learning é calibrado ao apetite de risco e ao manual de subscrição, e cada decisão é explicável e retorna trilha de auditoria completa, com dados criptografados em cada etapa e em conformidade com a LGPD. Ao lado dele, o Underwriter Intelligence automatiza a jornada de cotação para que o subscritor analise risco e foque em desenvolvimento de negócio, enquanto dashboards e relatórios em tempo real dão visão proativa do pipeline.

O contexto de mercado sustenta a urgência. O Seguros e Danos cresce dois dígitos ao ano, mas a estrutura das empresas não acompanha essa aceleração. Segundo a Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta, e segundo o BCG, 70% das seguradoras não executam inovação por limitações de TI. É exatamente esse impasse que uma camada externa resolve, transformando o pipeline invisível em uma operação pontuada, atribuída e multicanal sobre os sistemas que a seguradora já roda. A WIR mantém uma POC em execução com uma seguradora global no ramo de Transporte, sua única tração pública até aqui. Para ver onde o Smart Sales prioriza contas e corretores na sua operação, [fale com a WIR](https://wirinnovation.ai).

### Perguntas frequentes

**Como o score de próxima melhor ação é calculado?**

O score é calculado por modelos de Machine Learning que pontuam cada conta por propensão de upsell e ranqueiam a ação de maior valor esperado. A camada de IA primeiro mapeia a carteira no eixo cliente por produto, expondo o espaço em branco conta a conta. Sobre esse mapa, o scoring é calibrado ao apetite de risco e ao manual de subscrição da seguradora, de modo que a ação recomendada respeita as regras de aceitação e a margem, não apenas a propensão.

**A inteligência de distribuição substitui o CRM da seguradora?**

Não. A inteligência de distribuição é uma camada de IA externa que opera sobre o CRM e o core que a seguradora já usa, nunca no lugar deles. A integração roda por API ou extração programada, em modo de leitura primeiro, sem escrita de volta nas tabelas de contrato. As recomendações fluem para os canais e para a camada de atividades do CRM. Se a camada é desligada, o core continua operando exatamente como antes.

**As campanhas multicanal têm trilha de atribuição?**

Sim. Cada ação pontuada é roteada para o canal certo e cada passo é registrado em uma trilha de atribuição. A trilha grava qual sinal gerou a recomendação, qual corretor ou canal agiu, qual contato precedeu a cotação e qual fechou a venda. Isso permite à função de distribuição provar ganho incremental, calibrar campanhas e defender orçamento. A mesma trilha serve como registro de auditoria, com dados criptografados em cada etapa e em conformidade com a LGPD.

**Como penetração e retenção crescem juntas com essa camada?**

Crescem juntas porque a camada raciocina no nível da conta, e o mesmo motor que impulsiona o cross-sell fortalece a retenção. Uma conta com mais produtos na mesma seguradora é estruturalmente mais aderente. O timing da próxima ação, agindo antes da renovação ou de um evento de vida ou de negócio, eleva tanto a taxa de renovação quanto os produtos por conta. Penetração e retenção deixam de ser programas separados e viram duas leituras da mesma inteligência de conta.

**Em quanto tempo o Smart Sales entra em produção?**

Na prática da WIR, o setup roda de 3 a 12 meses, com escopo claro e KPIs acordados antes de começar, seguido de operação contínua em produção. O caminho mantém o programa de baixo risco e reversível, começando pelos ramos onde o espaço em branco é maior e o dado é mais limpo, tipicamente auto e patrimonial. A integração por leitura, a calibração ao manual de subscrição e o backtest contra conversões históricas precedem o go-live com humanos no circuito.`
  },
  {
    slug: "reduzir-tempo-resposta-cotacao-corretor",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Como reduzir o tempo de resposta de cotação para o corretor com IA",
    sub: "Guia para a seguradora reduzir o tempo de resposta de cotação ao corretor com uma camada de IA externa e SLA visível, sobre os sistemas atuais. Veja como.",
    author: "WIR Innovation", role: "Equipe",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para a seguradora reduzir o tempo de resposta de cotação ao corretor com uma camada de IA externa e SLA visível, sobre os sistemas atuais. Veja como.",
    body: `### O que reduz o tempo de resposta de cotação com uma camada de IA

Para reduzir tempo de resposta de cotação para o corretor com IA, a seguradora automatiza as etapas da jornada onde os minutos e as horas vazam, do intake da submissão até a devolução da decisão, com uma camada de IA externa que opera sobre o core atual. Quem deve considerar esse caminho é o líder de subscrição, o head de produto ou inovação e a área comercial que perde negócio para a seguradora que responde primeiro. A definição é direta. Não se trata de prometer um prazo fixo, e sim de tirar o trabalho administrativo da frente do subscritor para que a resposta chegue ao corretor mais rápido e de forma consistente.

A velocidade importa porque o corretor controla a distribuição e leva o mesmo risco a várias seguradoras ao mesmo tempo. Segundo a Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta. A leitura prática é clara. Comprar IA não comprime o prazo por si só. A inteligência precisa estar conectada exatamente às etapas em que o tempo é perdido, e o ganho de velocidade precisa ficar visível para o corretor na forma de um SLA.

O mercado brasileiro de Seguros e Danos cresce dois dígitos ao ano, e o volume de submissões em patrimonial, auto e demais ramos cresce mais rápido do que o quadro de subscrição. A jornada manual limita quantas cotações um time devolve por dia, o que estrangula a capacidade da seguradora de competir em velocidade. A camada de IA da WIR atua nesse ponto. Ela é a camada de IA do seguro, sobre os sistemas que a seguradora já usa, nunca no lugar deles, e eleva o throughput sem trocar o core e sem adicionar subscritores.

### Onde a jornada automatizada comprime o tempo de resposta

A jornada manual perde tempo em cada handoff, e é por isso que mapear etapa a etapa importa mais do que falar de agilidade no genérico. As submissões chegam por e-mail, WhatsApp, portais de corretor, formulários em PDF e planilhas, sem estrutura fixa, e alguém precisa achar, abrir e triar cada uma antes de a subscrição começar. Em seguida vem a redigitação manual de históricos de apólice, laudos de vistoria, schedules de ativos e documentos de CNPJ, um passo lento que ainda introduz erros. Submissões incompletas disparam idas e vindas com o corretor, e cada rodada custa horas ou dias enquanto uma concorrente já pode ter devolvido um número.

A esteira automatizada da WIR ataca cada uma dessas perdas em seis etapas. Primeiro, o intake multicanal captura a submissão por API, portal ou upload no formato que a seguradora já usa, em uma fila estruturada, sem triagem humana para começar o relógio. Depois, a leitura inteligente de documentos extrai os campos de PDFs, laudos e documentos financeiros, removendo a redigitação e seus erros. Na sequência, o enriquecimento cruza fontes externas como CNPJ, histórico do corretor, exposição e crédito, de modo que o subscritor recebe um quadro completo e comparável em vez de perseguir campos faltantes.

As três etapas finais entregam a decisão. O motor de risco e fraude aplica um modelo de Machine Learning calibrado ao apetite de risco e ao manual de subscrição da seguradora, com score, probabilidade e sinais de fraude, aplicando as mesmas regras a todos os casos. A precificação dinâmica calcula o prêmio ajustado ao risco com a lógica de rating da própria seguradora. Por fim, a decisão devolve cotação, recusa automática ou escalonamento para um subscritor sênior, prioriza riscos simples para cotação imediata e roteia os riscos genuinamente complexos para o julgamento humano. O efeito líquido é que o tempo do subscritor migra de buscas administrativas e redigitação para o julgamento sobre riscos complexos, e o corretor recebe a resposta mais rápido.

### Como implantar a camada externa para acelerar a resposta

A implantação acontece sem tocar no core, e essa é a resposta para a seguradora que pergunta como acelerar sem trocar o sistema de registro. Uma troca de core é um programa de vários anos e alto risco. A abordagem de camada externa é aditiva. A seguradora mantém o seu sistema de registro e ganha uma camada de inteligência que comprime o tempo entre a chegada da submissão e a resposta ao corretor. Vale lembrar que 70% das seguradoras não executam inovação por limitações de TI, segundo o BCG, e o modelo externo existe justamente para remover essa barreira, já que a WIR é 100% externa e não pesa no TI da seguradora.

O caminho começa pelo escopo. A seguradora escolhe um ou dois ramos de alto volume, como patrimonial ou auto frota, onde a lentidão na cotação visivelmente custa negócio, e define o SLA que quer tornar visível ao corretor. Em seguida, conecta a camada de IA ao sistema de cotação e de apólice por API, portal ou upload, mantendo o core como sistema de registro. A calibração ajusta os modelos de scoring e de pricing às regras da própria seguradora, e não a um template genérico, o que mantém as decisões consistentes e dentro do apetite. Depois, a seguradora testa a esteira automatizada em paralelo à manual, compara decisões e prazos e ajusta os limiares entre cotação automática e escalonamento.

O go-live publica a janela de resposta aos corretores para que a vantagem de velocidade se converta em volume roteado. A operação contínua monitora desempenho do modelo, drift e qualidade da decisão, e recalibra à medida que o apetite e a experiência de sinistros mudam. Na WIR, o setup roda de 3 a 12 meses, com escopo claro e KPIs acordados antes do início, seguido da operação contínua em produção após o go-live. Não há migração de core e não há um projeto de TI que o time da seguradora precise rodar.

### Governança, explicabilidade e LGPD

Resposta mais rápida não pode significar decisão opaca. Toda cotação, recusa ou escalonamento automatizado carrega as razões e os dados por trás da decisão, de forma que subscrição, auditoria e a supervisão da SUSEP consigam reconstruir por que cada decisão foi tomada. Essa trilha de auditoria completa é também o que permite à seguradora confiar no modelo o suficiente para cotar automaticamente. Na camada de IA da WIR, cada decisão é explicável e retorna a trilha de auditoria completa, escrita de volta no core de apólice.

As submissões de seguro carregam dados pessoais e, por vezes, sensíveis, então a camada precisa estar conforme a LGPD, a Lei 13.709/2018, mantendo os dados criptografados em trânsito e em repouso e tratando apenas o necessário. Decisões automatizadas que afetam uma pessoa acionam as provisões da LGPD sobre decisão automatizada, incluindo o direito de solicitar revisão, conforme orientações da Autoridade Nacional de Proteção de Dados. A calibração ao manual de subscrição e ao apetite garante que mais rápido nunca signifique fora do apetite, e o subscritor humano mantém autoridade sobre os riscos complexos escalonados.

A SUSEP supervisiona o mercado de Seguros e Danos e espera práticas de subscrição e precificação sólidas e documentáveis. Uma jornada automatizada e explicável apoia essa supervisão em vez de complicá-la, porque cada decisão fica registrada e reconstruível. Na WIR, os dados são criptografados em cada etapa e as decisões permanecem auditáveis por construção, e não como um recurso adicionado depois.

### Como a WIR acelera a resposta ao corretor

A WIR é a camada de IA do seguro, uma plataforma de IA externa que automatiza a jornada de cotação e subscrição sobre os sistemas que a seguradora já usa, nunca no lugar deles. O papel é concreto. A camada ingere a submissão, lê e estrutura os documentos, faz scoring e precificação calibrados ao apetite de risco e ao manual de subscrição da seguradora, e devolve a decisão ao core com a trilha de auditoria. A WIR não é seguradora, corretora nem MGA, e não carrega risco. Ela automatiza a jornada conforme a política de aceitação da própria seguradora.

Dois módulos sustentam o ganho de velocidade ao corretor. O Underwriter Intelligence automatiza a jornada de cotação com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor, de modo que o subscritor analisa risco e foca em desenvolvimento de negócio. O Smart Sales mapeia a carteira por cliente e produto, faz scoring de upsell e próxima melhor ação e roda campanhas multicanal com trilha de atribuição. Os dashboards e relatórios em tempo real dão a visão proativa dos negócios em andamento e do pipeline, incluindo o SLA visível e a fila de subscrição que o corretor enxerga.

A tração pública da WIR hoje é uma POC em execução com uma seguradora global no ramo de Transporte. A WIR nasceu da experiência operacional acumulada do time, construída com a Mahway, Venture Builder na Califórnia, e a Avante, Venture Studio no Brasil. Para a seguradora que perde negócio porque responde depois da concorrente, o caminho é direto. Automatizar as etapas onde o tempo vaza, manter cada decisão explicável e auditável sob a LGPD, e tornar o SLA visível para que a velocidade se converta em volume roteado pelo corretor.

### Perguntas frequentes

**Por que a velocidade de resposta influencia a escolha do corretor?**

Porque o corretor controla a distribuição e leva o mesmo risco a várias seguradoras ao mesmo tempo. Segundo a Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta. Quem devolve um número primeiro tende a captar o negócio. A WIR automatiza as etapas onde o tempo vaza, do intake à decisão, com uma camada de IA externa, para que a resposta chegue mais rápido e de forma consistente, com o ganho visível no SLA.

**Onde a jornada manual perde mais tempo?**

Em cada handoff. Submissões chegam sem estrutura por e-mail, portais e PDFs, e alguém precisa achar, abrir e triar cada uma antes de a subscrição começar. A redigitação manual de históricos, laudos e documentos de CNPJ é lenta e introduz erros, e submissões incompletas disparam idas e vindas com o corretor. A esteira da WIR ataca essas perdas com intake multicanal, leitura inteligente de documentos e enriquecimento, liberando o subscritor para o julgamento sobre riscos complexos.

**O corretor enxerga o SLA da cotação?**

Sim. A seguradora define o SLA que quer tornar visível e publica a janela de resposta aos corretores no go-live. Tornar a velocidade visível é o que converte a vantagem de tempo em volume roteado pelo corretor. Os dashboards e relatórios em tempo real da WIR dão a visão dos negócios em andamento, incluindo o SLA visível e a fila de subscrição que o corretor enxerga. O ganho de velocidade precisa ficar visível, não apenas existir internamente.

**Acelerar a resposta exige trocar o core?**

Não. A WIR é uma camada de IA externa, 100% externa, que opera sobre os sistemas atuais e nunca no lugar deles. Uma troca de core é um programa de vários anos e alto risco. A abordagem de camada externa é aditiva. Segundo o BCG, 70% das seguradoras não executam inovação por limitações de TI, e o modelo externo existe justamente para remover essa barreira, conectando-se ao sistema de cotação e de apólice por API, portal ou upload, sem peso no TI.

**A resposta mais rápida mantém a decisão explicável e auditável?**

Sim. Toda cotação, recusa ou escalonamento automatizado carrega as razões e os dados por trás da decisão, escritos de volta no core de apólice. Cada decisão é explicável e retorna a trilha de auditoria completa, de modo que subscrição, auditoria e a supervisão da SUSEP consigam reconstruir por que cada decisão foi tomada. A camada está conforme a LGPD, com dados criptografados em cada etapa, e o subscritor humano mantém autoridade sobre os riscos complexos escalonados.`
  },
  {
    slug: "roteamento-automatico-subscricao",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Roteamento automático de subscrição com uma camada de IA",
    sub: "Guia para seguradoras automatizarem o roteamento de submissões por apetite e exposição, com fila do subscritor e SLA visível, sobre os sistemas atuais.",
    author: "WIR Innovation", role: "Equipe",
    time: "11 min", date: "02 · Jun · 2026",
    metaDesc: "Guia para seguradoras automatizarem o roteamento de submissões por apetite e exposição, com fila do subscritor e SLA visível, sobre os sistemas atuais.",
    body: `### O que é roteamento automático de subscrição com uma camada de IA

O roteamento automático de subscrição de seguros com IA é o estágio de decisão e priorização que recebe cada submissão de proposta, avalia se o risco está dentro do apetite e da banda de exposição da seguradora e encaminha o caso pelo caminho certo, sem que ninguém precise triar manualmente. Em Seguros e Danos (P&C), toda proposta que chega pelo canal do corretor precisa ser triada antes de qualquer precificação: o risco está dentro do apetite, a qual ramo e a qual alçada de subscrição pertence, qual subscritor deve assumi-lo e qual é a urgência. Quando essa triagem é manual, casos vão para o subscritor errado, exposições grandes recebem o mesmo tratamento de uma renovação simples e o corretor não consegue prever se a cotação volta em uma hora ou em três dias.

Esse texto é para a líder de subscrição, o head de produto e inovação e o corretor que querem uma triagem consistente e um SLA previsível. A camada de IA externa resolve isso encaixando-se sobre os sistemas que a seguradora já usa. Ela lê a submissão, faz o scoring de risco e apetite e produz uma recomendação de roteamento e decisão, devolvendo o resultado ao subscritor e ao sistema de registro. A WIR opera exatamente nessa posição, como a camada de IA do seguro, e calibra o roteamento ao manual de subscrição e ao apetite de risco de cada seguradora. Toda decisão é explicável, auditável, em conformidade com a LGPD e com dados criptografados em cada etapa.

### Como o roteamento por apetite e exposição funciona

O roteamento automático é o sexto estágio de uma esteira de subscrição automatizada, e ele só funciona porque os cinco estágios anteriores entregam uma submissão limpa e estruturada. A esteira começa pela captura multicanal, em que as propostas entram por API, portal ou upload de PDF e e-mail, no formato que a seguradora e seus corretores já usam, cada uma registrada com um timestamp que inicia o relógio do SLA. Em seguida vem a leitura inteligente de documentos, com extração automática de campos das propostas, planilhas de valores e históricos de sinistro, o que elimina a redigitação que consome o tempo do subscritor. Depois a submissão é enriquecida e pontuada com dados externos e internos, como validação de CNPJ e CPF, histórico de apólices e exposição, e passa pelo motor de risco e fraude, um modelo de Machine Learning calibrado ao apetite que avalia o risco contra a experiência de perda da seguradora e sinaliza anomalias. Por fim, o risco é precificado dentro dos parâmetros que a seguradora define, e então chega o estágio de decisão.

A decisão por apetite e exposição pontua cada submissão em dois eixos: se ela está dentro do apetite de risco definido para aquele ramo e em qual banda de exposição e alçada ela cai, considerando importância segurada, tamanho de linha e acúmulo. A combinação determina o caminho. Um risco claramente dentro do apetite e abaixo dos limites de cotação automática segue por uma via. Um risco dentro do apetite mas acima de uma banda de alçada é roteado ao subscritor sênior correto. Um risco fora do apetite vai para recusa ou referência.

Disso saem três desfechos, cada um com uma justificativa registrada. A submissão limpa, dentro do apetite e da exposição e sem sinais de fraude, recebe cotação automática, uma via rápida para o corretor. A submissão claramente fora do apetite ou que bate em uma regra de recusa recebe recusa automática, devolvida com o motivo, de modo que o corretor recebe um não rápido e consistente em vez de silêncio. A submissão limítrofe, com exposição acima de uma alçada, dado faltante ou sinal de anomalia, é escalada para um humano, com todo o contexto anexado.

Os casos escalados caem em uma fila priorizada do subscritor, não em uma caixa de entrada indiferenciada. A prioridade é calculada a partir de fatores como exposição, probabilidade de conversão, urgência de vencimento, valor do corretor e tempo já decorrido contra o SLA. O subscritor certo vê os casos certos no topo, com a justificativa da IA e os dados já extraídos à frente. Cada submissão carrega um relógio de SLA visível desde a captura, e cada roteamento e decisão fica registrado com seus insumos, a justificativa do modelo e a ação humana tomada, produzindo uma trilha de auditoria completa.

### Como implantar o roteamento como camada externa

A implantação segue um caminho pragmático e de baixo risco para o core, porque a camada de IA integra-se aos sistemas atuais em vez de substituí-los. O primeiro passo é o escopo: escolher um ramo e um canal para começar, por exemplo patrimonial empresarial pelo portal do corretor, e definir nesse recorte as regras de apetite, as regras de recusa, as bandas de alçada e as metas de SLA. Em seguida vem a integração com o core, conectando a captura por API, portal ou upload e a escrita de volta no sistema de registro de apólices. Não há mudança no core. A camada lê e devolve, e a seguradora decide o que é escrito automaticamente e o que aguarda confirmação humana.

O passo decisivo é a calibração ao manual de subscrição e ao apetite de risco. Os modelos de roteamento e scoring são calibrados ao manual, ao apetite e ao histórico de perdas da própria seguradora, não a um template genérico, e os limiares de cotar, recusar ou escalar são definidos pela política de risco da seguradora. Antes de qualquer ação automática ir para fora, a camada roda em modo sombra sobre submissões reais, comparando seu roteamento e suas decisões com as escolhas dos subscritores, e os limiares são ajustados. O go-live é escalonado: liga-se a cotação automática primeiro na banda mais segura, mantendo a escalação conservadora, e amplia-se o envelope à medida que a evidência de auditoria se acumula. Na operação contínua, monitora-se a acurácia do roteamento, a aderência ao SLA e o drift do modelo, e os overrides dos subscritores realimentam o treinamento. O setup leva de 3 a 12 meses, com escopo claro e KPIs acordados antes do início, e a operação contínua segue após o go-live com faturamento mensal.

### Governança, explicabilidade e LGPD

Toda decisão de roteamento que a camada produz precisa ser explicável e auditável, e no frame brasileiro isso não é opcional. Cada cotação, recusa ou escalação carrega os insumos e a justificativa que a geraram, de forma que o time de subscrição consegue reconstruir por que qualquer caso seguiu o caminho que seguiu. Isso sustenta tanto a governança interna quanto as expectativas de supervisão da SUSEP sobre subscrição sólida e documentada, e responde à pergunta de por que um caso foi roteado ou recusado daquela maneira.

As submissões de seguro carregam dados pessoais e por vezes sensíveis, então o tratamento se apoia em base legal, com minimização e limitação de finalidade. O Artigo 20 da LGPD, a Lei 13.709 de 2018, dá ao titular o direito de solicitar revisão de decisões tomadas unicamente por tratamento automatizado que afetem seus interesses, e é exatamente por isso que uma decisão automatizada de subscrição e roteamento precisa de justificativa documentada e de um caminho de revisão humana, com a ANPD como autoridade supervisora. Os dados são criptografados em trânsito e em repouso em todas as etapas, da captura à escrita de volta. O modelo não impõe uma visão de risco externa: ele codifica o apetite e o manual da seguradora, que permanece a dona do risco e a autoridade de decisão sobre os casos referidos. A escalação para um humano é, antes de tudo, uma característica de governança, porque casos limítrofes e de alta exposição sempre chegam a uma pessoa. Para entender como esse contexto se traduz em volume e pressão de capacidade no mercado, vale acompanhar a leitura de inteligência de seguros publicada pela WIR.

### Como a WIR automatiza o roteamento e a fila do subscritor

A WIR é a camada de IA do seguro. Sobre os sistemas que a seguradora já usa, nunca no lugar deles. Ela não migra o core e nunca atua no lugar dele, não é seguradora, corretora ou MGA, e não carrega risco. O que ela faz é executar o estágio de decisão e priorização da esteira automatizada: o roteamento automático por apetite e exposição, a decisão de cotar, recusar automaticamente ou escalar para um humano, a fila priorizada do subscritor com SLA visível e a trilha de auditoria completa, tudo sobre o core existente e calibrado ao manual de subscrição e ao apetite de risco da seguradora.

Dois módulos sustentam esse trabalho. O Underwriter Intelligence automatiza a jornada de cotação conforme a política de risco da seguradora, com scoring de risco em tempo real por Machine Learning calibrado ao apetite, roteamento automático por apetite e exposição e análise preditiva de conversão por produto, risco e corretor, liberando o subscritor para analisar risco e desenvolver negócio. O Smart Sales mapeia a carteira por cliente e produto, pontua o próximo melhor passo e roda campanhas multicanal com trilha de atribuição, de modo que penetração e retenção crescem juntas. Dashboards, analytics e relatórios em tempo real dão a visão proativa dos negócios em andamento.

O contexto de mercado explica por que isso importa agora. O mercado de Seguros e Danos cresce dois dígitos ao ano, mas a estrutura das companhias não acompanha essa aceleração. Subscritores gastam 40% do tempo em tarefas administrativas, segundo a Deloitte, e 60%+ dos corretores escolhem a seguradora pela velocidade de resposta, segundo a Capgemini, o que faz do SLA na devolução da cotação uma alavanca direta sobre volume. Ao mesmo tempo, 70% das seguradoras não executam inovação por limitações de TI, segundo o BCG, e times corporativos perdem de 20-30% do tempo organizando dados não estruturados, segundo a Gartner. É por isso que a abordagem de camada externa ressoa: ela entrega a automação sem o programa de core. A tração pública atual da WIR é uma POC em execução com uma seguradora global no ramo de Transporte. Toda decisão de roteamento permanece explicável, auditável, em conformidade com a LGPD e com dados criptografados em cada etapa. Para ver o roteamento em ação, vale conversar com a WIR em wirinnovation.ai.

### Perguntas frequentes

**Como a submissão é roteada por apetite e exposição?**

Cada submissão é pontuada em dois eixos: se está dentro do apetite de risco do ramo e em qual banda de exposição e alçada ela cai. Essa combinação define o caminho. Um risco dentro do apetite e abaixo dos limites segue para cotação automática, um risco acima de uma banda de alçada vai ao subscritor sênior correto e um risco fora do apetite segue para recusa ou referência. A WIR calibra esse roteamento ao manual de subscrição da seguradora, com cada decisão explicável e auditável.

**Quando o sistema cota, declina ou escala para um humano?**

O sistema cota quando a submissão está limpa, dentro do apetite e da exposição e sem sinais de fraude. Declina automaticamente quando o caso está claramente fora do apetite ou bate em uma regra de recusa, devolvendo o motivo ao corretor. Escala para um humano os casos limítrofes, com exposição acima de uma alçada, dado faltante ou anomalia, sempre com todo o contexto anexado. Os limiares de cotar, recusar ou escalar são definidos pela política de risco da própria seguradora.

**O subscritor enxerga a fila e o SLA de cada caso?**

Sim. Os casos escalados caem em uma fila priorizada do subscritor, não em uma caixa de entrada indiferenciada. A prioridade considera exposição, probabilidade de conversão, urgência de vencimento, valor do corretor e tempo decorrido contra o SLA. O subscritor certo vê os casos certos no topo, com a justificativa da IA e os dados já extraídos à frente. Cada submissão carrega um relógio de SLA visível desde a captura, e a camada Underwriter Intelligence da WIR sustenta essa fila sobre o core existente.

**O roteamento automático respeita o manual de subscrição?**

Sim. Os modelos de roteamento e scoring são calibrados ao manual, ao apetite e ao histórico de perdas da própria seguradora, nunca a um template genérico. A WIR não impõe uma visão de risco externa: ela codifica o apetite da seguradora, que permanece a dona do risco e a autoridade de decisão sobre os casos referidos. Antes de qualquer ação automática, a camada roda em modo sombra sobre submissões reais, comparando seu roteamento com as escolhas dos subscritores, e os limiares são ajustados. Cada decisão fica explicável e auditável.

**Em quanto tempo o roteamento entra em produção?**

O setup leva de 3 a 12 meses, com escopo claro e KPIs acordados antes do início. A implantação começa por um ramo e um canal, integra a captura e a escrita de volta ao core sem migração, calibra os modelos ao manual e roda em modo sombra antes do go-live. Liga-se a cotação automática primeiro na banda mais segura e amplia-se o envelope conforme a evidência de auditoria se acumula. A operação contínua segue após o go-live, com faturamento mensal.`
  },
  {
    slug: "automatizar-cotacao-seguros-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "How to automate insurance quoting with an AI layer",
    sub: "A practical guide to automating insurance quoting with an external AI layer that reads submissions, scores risk, prices, and returns a broker-visible SLA. No core migration.",
    author: "WIR Innovation", role: "Team",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "A practical guide to automating insurance quoting with an external AI layer that reads submissions, scores risk, prices, and returns a broker-visible SLA. No core migration.",
    body: `### What it means to automate insurance quoting with an AI layer

How to automate insurance quoting with AI comes down to one architectural choice: place an external AI layer on top of the systems the insurer already runs, and let it read each submission, structure it, score the risk, and return a priced quote, a decline, or an escalation in real time. In Brazilian Seguros e Danos (P&C), the cotação (quotation) journey is still largely a manual relay between corretor (broker) and seguradora (insurer). A submission arrives by e-mail, broker portal, or spreadsheet, an assistant re-keys it into the policy core, documents are chased, and only then does a subscritor (underwriter) assess appetite and price the prêmio (premium). Every handoff adds latency and room for inconsistent decisions.

The reader who should consider this is the underwriting lead or innovation head watching capacity erode as submission volume climbs. Underwriters in Brazil spend roughly 40% of their time on administrative tasks rather than risk judgment, according to Deloitte, and corporate teams lose another 20% to 30% organizing unstructured data, according to Gartner. Automating the cotação journey means encoding the carrier's own underwriting manual and risk appetite into a calibrated engine, so the routine decisions are returned instantly and the underwriter's time is reserved for the cases that genuinely need human judgment. This is augmentation of underwriting capacity, not a change to the system of record. WIR is the AI layer of insurance built for exactly this: an external intelligence layer that automates quoting on top of existing systems, never in their place.

### How end-to-end automated quoting works

The automated cotação flow turns the manual relay into a single real-time pass with six stages. First comes multichannel intake. The corretor submits through whatever channel they already use, an API for high-volume partners or a portal and upload for everyone else, and the layer accepts e-mail, PDF, image, and spreadsheet without asking the broker to change a thing. Second is intelligent document reading, where Machine Learning and document-understanding models extract structured fields from unstructured submissions: the insured object, location, coverages requested, declared values, prior claims, and broker notes. This is the step that removes the re-keying that consumes underwriter time.

Third is broker enrichment and scoring. The layer cross-references external and historical context, such as CNPJ data, the corretor's conversion history, exposure, and prior relationship, and turns the broker's context into a signal rather than free text. Fourth is the risk and fraud engine, a multi-factor ML model calibrated to the insurer's loss experience and risk appetite that produces a risk score and flags anomalies such as inconsistent values, duplicate submissions, or mismatched documents before pricing. Fifth is dynamic pricing, where the prêmio is computed from the risk score and the carrier's own pricing rules rather than a generic table.

The sixth stage is decision and prioritization with a full audit trail. The layer returns one of three outcomes in real time: a risk-adjusted quote, an automatic decline, or an escalation to a human underwriter for the cases that need judgment. Every decision records which data, which model version, and which rule fired, and the priced cotação is written back to the policy core. For the corretor, the visible result is a quote, decline, or in-review status returned fast, with a transparent SLA. That visible SLA is the conversion lever, because brokers choose an insurer by response speed: 60%+ place the risk with the carrier that answers first and clearly, according to Capgemini.

### How to deploy the external AI layer for quoting

Deploying the layer does not require a core migration, and an insurer can roll it out in a defined sequence. The carrier first scopes one or two high-volume Danos lines where slow response loses deals, such as auto, patrimonial, or civil liability, and defines the target SLA the broker will see. Next comes integration with the existing core: the layer connects by API to read reference data and to write a structured, priced, decisioned cotação back, while the broker intake channel is added as an API or portal. The policy system keeps its source of truth, so nothing is ripped out.

Calibration is the step that makes the engine the carrier's own. The insurer's rules, risk appetite, and pricing logic are encoded so the ML model is tuned to the carrier's loss experience and underwriting policy, not a generic benchmark. The layer then runs in shadow mode against historical and live submissions, and its quotes, declines, and escalations are compared to the underwriters' decisions so thresholds can be tuned before anything is automated. At go-live, the carrier starts by auto-quoting the clearly-in-appetite band, auto-declining the clearly-out band, and escalating the middle, then widens the automated bands as confidence grows. In continuous operation, the team monitors hit rate, conversion, loss ratio on auto-quoted business, and SLA, and recalibrates as appetite and loss experience change. As an external layer, the implementation runs as a fixed-scope setup of 3 to 12 months with KPIs agreed before start, followed by continuous production operation, with no load placed on the insurer's IT team to run a migration.

### Governance, explainability, and LGPD

Automated cotação decisions in Brazil sit under both data-protection law and insurance supervision, so governance is built into the layer rather than bolted on. Under the LGPD (Lei nº 13.709/2018), personal data used in quoting must have a lawful basis, be minimized, and be protected, and data subjects have the right to request review of decisions taken solely on automated processing. That right is directly relevant to automated declines and pricing, so the insurer must be able to explain the basis of any automated outcome. This is why every decision the layer returns records the inputs, the model version, and the rules that fired, so an underwriter, an auditor, or a regulator can reconstruct exactly why a given quote, decline, or escalation happened.

Two further commitments hold the framework together. Submission data, enrichment, and decisions are encrypted in transit and at rest, at every step. And the model stays calibrated to the insurer's own risk policy, which means the underwriting lead can see and adjust the appetite the engine enforces rather than trust a black box. The regulatory backdrop reinforces this: Brazil's new insurance contract framework, Lei nº 15.040/2024, is being regulated by SUSEP through 2026 and raises the bar for clarity and good faith in the contract and quotation phase, as reported by the insurance news outlet CQCS in 2026. Transparent, auditable, explainable decisions are what make automated quoting defensible under both regimes.

### How WIR automates quoting

WIR Innovation is the AI layer of insurance in Brazil, and it automates the quoting journey as an external intelligence layer on top of the insurer's existing core and policy administration systems. It is 100% external, with no core migration and no load on the insurer's IT, and it is not an insurer, a broker, or an MGA, so it never carries risk. Its Underwriter Intelligence module runs the quotation journey per the carrier's risk-acceptance policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on risk analysis and business development. The Smart Sales module maps the portfolio by client and product, scores upsell and next-best-action, and runs multi-channel campaigns with an attribution trail, while real-time dashboards give a proactive view of in-flight deals and pipeline.

Every decision WIR returns is explainable, writes back to the policy core with a complete audit trail, and runs under the LGPD with data encrypted at every step, which is the same governance frame described above. The Seguros e Danos market grows double digits per year, yet 70% of insurers do not execute innovation because of IT limitations, according to BCG, which is precisely the constraint an external layer is designed to remove. WIR's first traction is a POC in execution with a global insurer in the Transport line, a deliberately conservative starting point rather than a broad claim. The AI layer for insurance. On top of the systems the insurer already runs, never in their place. To see how the cotação journey maps onto your lines and where the SLA gain sits, the place to start is a conversation with WIR.

### Frequently asked questions

**How much faster does automated quoting respond to the broker?**

Automated quoting returns a quote, decline, or in-review status in real time instead of hours or days of manual relay. The gain is decisive for distribution, because brokers choose an insurer by response speed: 60%+ place the risk with the carrier that answers first and clearly, according to Capgemini. WIR's AI layer reads the submission, scores risk, prices, and returns the outcome with a broker-visible SLA, on top of the insurer's existing systems.

**Does quoting automation replace the insurer's core?**

No. WIR is an external AI layer on top of the insurer's existing core and policy systems, never a replacement and never a migration. It connects by API to read reference data and to write back a structured, priced, decisioned quote, while the policy system keeps its source of truth. WIR is 100% external, places no load on the insurer's IT, and is not an insurer, broker, or MGA, so it never carries risk.

**How does automatic quoting respect the underwriting manual?**

The engine is calibrated to the insurer's own underwriting manual and risk appetite before any decision is automated. WIR encodes the carrier's rules and pricing logic, runs in shadow mode against historical and live submissions, and tunes thresholds against underwriters' decisions. At go-live the carrier auto-quotes the clearly-in-appetite band, auto-declines the clearly-out band, and escalates the middle to a human, widening the automated bands as confidence grows.

**Does the broker see the status and SLA of the quote?**

Yes. The broker sees a quote, decline, or in-review status returned fast, with a transparent SLA. That visible SLA is the conversion lever, since 60%+ of brokers place the risk with the carrier that answers first and clearly, according to Capgemini. WIR returns each outcome through whatever channel the broker already uses, with real-time dashboards giving the underwriting team a proactive view of in-flight deals and pipeline.

**Does automated quoting work with the intake channels we already use?**

Yes. WIR accepts e-mail, PDF, image, and spreadsheet through the channels the broker already uses, an API for high-volume partners or a portal and upload for everyone else. Its intelligent document reading extracts structured fields from unstructured submissions, removing the re-keying that consumes underwriter time. Brazilian underwriters spend roughly 40% of their time on administrative tasks rather than risk judgment, according to Deloitte, the constraint this intake step is built to remove.`
  },
  {
    slug: "automatizar-subscricao-seguro-transporte-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "How to automate transport insurance underwriting with AI",
    sub: "How insurers automate transport (cargo) underwriting with an external AI layer that reads submissions, scores route and cargo risk, and prices to appetite, no core migration.",
    author: "WIR Innovation", role: "Team",
    time: "8 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers automate transport (cargo) underwriting with an external AI layer that reads submissions, scores route and cargo risk, and prices to appetite, no core migration.",
    body: `### What it means to automate transport underwriting with an AI layer

To automate transport insurance underwriting with AI is to place an external AI layer on top of the insurer's existing systems that reads each cargo submission, enriches it, scores route and cargo risk, proposes a premium, and either decides clean risks or escalates the rest to a human underwriter, all calibrated to the insurer's own risk appetite and underwriting manual. The core stays in place. The intelligence sits above it. This matters most in the Transport line (ramo transportes), where the same cargo on two different routes is effectively two different risks, and where a submission arrives as a mix of broker email, PDF proposals, fleet spreadsheets, risk-management plans, and prior loss runs.

The Transport line is one of the oldest and most technical lines inside Brazilian Seguros e Danos (P&C, property and casualty), and it grows because the economy moves on trucks. Underwriting here is administratively heavy by nature. Roughly 40% of an underwriter's time goes to administrative tasks rather than risk decisioning, according to Deloitte, which is precisely the load an AI layer is built to reclaim. The reader who should care is the underwriting (subscrição) lead, the product and innovation head, the C-level deciding whether automation is feasible without an IT project, and the broker (corretor) who wins cargo business on response speed.

### How the automated journey works in transport insurance

The automated journey follows the same logic a Transport underwriter already uses, but the AI layer carries the repetitive load and hands the human a decision-ready file. It runs in six stages. First comes multichannel intake with automatic validation, where the submission enters in the format the insurer already receives, through email, attachments, upload, or API, with no change to how brokers submit. Second is intelligent document reading, where Machine Learning extracts the structured fields a Transport underwriter needs from unstructured documents: cargo type and declared values, the routes and highways involved, the risk-management plan, carrier data, and loss history.

Third is broker enrichment and context, where the submission is cross-referenced against external and internal sources such as carrier history already on file, route exposure, accumulation against the existing book, and broker conversion history. Fourth is the risk and fraud engine, a multi-factor ML model that produces a risk score for the specific cargo, route, and operation. High-theft cargo on a high-theft corridor with weak risk management scores very differently from the same cargo on a controlled route with escort (escolta) and tracking. Fifth is dynamic pricing, where the layer calculates a risk-adjusted premium (prêmio) and conditions consistent with the insurer's pricing logic and the Transport underwriting manual, including loadings tied to risk-management requirements. Sixth is decision and prioritization: clean, in-appetite risks can be quoted or straight-through processed, out-of-appetite risks are declined or routed to a human underwriter with the full enriched file and the rationale, and the result writes back to the policy core with a complete audit trail.

### How to deploy the external AI layer in transport

Deployment is structured so the insurer never runs an IT project and never migrates its core. WIR is 100% external, an AI layer on top of the systems the insurer already operates, with no load on the insurer's IT team. The work begins by scoping the Transport journey as it exists today, mapping how submissions arrive, which coverages are written, and where underwriters lose time. From there the layer integrates with the existing core and policy systems through the channels the insurer already uses, so the system of record stays exactly where it is.

The decisive step is calibration. The model is tuned to the insurer's own underwriting manual for Transport, not to a generic template. Risk-appetite rules for cargo types, maximum value per shipment, accepted routes, and required risk-management controls are encoded so the score and any automated decision reflect the insurer's stated appetite. Manual-driven loadings, escort thresholds, and value limits map to the same conditions the underwriting team applies today. This setup phase is a one-time engagement that runs 3 to 12 months, with fixed scope and KPIs agreed before start, followed by continuous operation in production after go-live. Because Transport risk moves with highway theft dynamics, the appetite and scoring are recalibrated over time rather than left static.

### Governance, explainability, and LGPD

Automating an underwriting decision in Brazil sits inside two regimes, and governance is a design requirement, not an optional feature. Under the LGPD (Lei Geral de Proteção de Dados, Lei 13.709/2018), Article 20 gives the data subject the right to request review of decisions taken solely on automated processing, which means an automated underwriting decision must be explainable and reviewable. The national authority is the [ANPD](https://www.gov.br/anpd/pt-br). Separately, [SUSEP](https://www.gov.br/susep/pt-br) supervises the P&C market, including pricing adequacy and conduct, so automated pricing must remain technically justifiable.

The practical requirement that follows is auditability. Every automated score, price, and decision must be traceable to its inputs and to the insurer's encoded appetite, so the insurer can answer both a customer review request under the LGPD and a regulator question under SUSEP. The AI layer is built for exactly this. Every decision is explainable and returns a full audit trail, data is encrypted at every step, and the layer logs its rationale per decision. The insurer keeps control of the tail because only clearly in-appetite risks are decided automatically, and everything borderline or outside appetite is escalated with context to a human underwriter. This is the difference between automating data work and automating decisions the insurer cannot explain.

### How WIR automates transport underwriting

WIR is the AI layer for insurance, an external intelligence platform that automates the quotation and underwriting journey on top of the insurer's existing systems, calibrated to the insurer's risk appetite and underwriting manual. In the Transport line this means the WIR layer reads the cargo submission, enriches it, scores route and cargo risk, proposes pricing, and decides or escalates, while the insurer's core remains the system of record. WIR is not an insurer, a broker, or an MGA, and it does not carry risk. It automates the journey; the insurer's appetite governs what gets bound versus escalated. The AI layer for insurance. On top of the systems the insurer already runs, never in their place.

Two modules carry this work. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on the risks that need judgment. Smart Sales adds distribution intelligence, mapping the portfolio and scoring next-best-action, which matters because 60%+ of brokers choose an insurer by response speed, according to Capgemini. Real-time dashboards give a proactive view of in-flight deals. WIR's relevant public traction for this line is a first POC in execution with a global insurer in the Transport line. It is a proof of concept in progress, stated conservatively, not a signed client and not a named customer. Every automated decision remains explainable, auditable, LGPD compliant, and encrypted at every step.

### Frequently asked questions

**Does automation account for route, cargo, and transport exposure?**

Yes. The risk and fraud engine scores the specific cargo, route, and operation together, because the same cargo on two routes is effectively two different risks. A multi-factor Machine Learning model weighs cargo type, declared value, the highways involved, the risk-management plan, escort and tracking, and accumulation against the existing book. High-theft cargo on a high-theft corridor with weak controls scores very differently from the same cargo on a controlled route.

**Does the AI layer replace the core in the transport line?**

No. WIR is 100% external, an AI layer on top of the systems the insurer already runs, never in their place. The core stays the system of record. The layer integrates through the channels the insurer already uses, with no IT project and no migration. It reads the submission, enriches, scores, prices, and decides or escalates, then writes the result back to the policy core with a full audit trail.

**How is the model calibrated to the transport underwriting manual?**

The model is tuned to the insurer's own Transport underwriting manual, not a generic template. Risk-appetite rules for cargo types, maximum value per shipment, accepted routes, and required risk-management controls are encoded, so the score and any automated decision reflect the insurer's stated appetite. Manual-driven loadings, escort thresholds, and value limits map to the same conditions the team applies today. Because highway theft dynamics shift, the appetite and scoring are recalibrated over time.

**Are transport decisions explainable and auditable?**

Yes. Every automated score, price, and decision is explainable and returns a full audit trail traceable to its inputs and the insurer's encoded appetite. This lets the insurer answer a customer review request under the LGPD, Article 20, and a SUSEP question on pricing adequacy. Data is encrypted at every step. Only clearly in-appetite risks are decided automatically. Everything borderline or outside appetite is escalated to a human underwriter with full context.

**Does WIR have experience in the transport line?**

WIR's relevant public traction for this line is a first POC in execution with a global insurer in the Transport line. It is a proof of concept in progress, stated conservatively, not a signed client and not a named customer. WIR is the AI layer for insurance, and the Transport line is where it automates the cargo quotation and underwriting journey, calibrated to the insurer's risk appetite and underwriting manual.`
  },
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
    slug: "decisoes-subscricao-auditaveis-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Auditable underwriting decisions with an AI layer",
    sub: "How insurers keep every automated underwriting decision explainable and auditable with an external AI layer, calibrated to risk policy and LGPD compliant.",
    author: "WIR Innovation", role: "Team",
    time: "11 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers keep every automated underwriting decision explainable and auditable with an external AI layer, calibrated to risk policy and LGPD compliant.",
    body: `### What auditable underwriting decisions with an AI layer means

Auditable underwriting decisions with AI are automated subscrição (underwriting) decisions where every quote, decline, or escalation returns the full reasoning behind it, written back to the quote as a structured, inspectable record. This matters to any insurer in Brazilian Seguros e Danos (P&C, property and casualty) that wants to automate the quotation journey without losing the ability to reconstruct why a given risk was priced, refused, or surcharged. The mechanism is explainability plus a complete audit trail, calibrated to the insurer's own risk policy, not a promise of perfect prediction.

The reason this is the central objection from underwriting leaders is simple. The manual journey is itself poorly auditable. A submission can arrive by e-mail, broker portal, spreadsheet, PDF, or messaging app, and underwriters re-key data, chase brokers for missing information, and apply judgment that varies between people and between days. When a decision is later questioned by an auditor, a regulator, an ombudsman (ouvidoria), or the corretor (broker), the rationale usually lives in inboxes and memory rather than in a structured, queryable form. An external AI layer does not introduce the audit gap. Done correctly, it is the first time the insurer holds a decision by decision record of the entire underwriting journey.

WIR is the AI layer of insurance built for exactly this posture. It sits on top of the insurer's existing core and pricing systems, reads and structures each submission, scores the risk against the insurer's models, and returns a recommendation together with the reasons that produced it. It never replaces the core and never carries risk. The point of an auditable layer is that an underwriter, an auditor, or a regulator can read one record and follow the path from raw submission to final action.

### How each decision produces an explanation and audit trail

Nothing happens to a submission that is not recorded. The journey runs in six stages, and each stage emits audit artifacts rather than only an output, so the trail is built continuously instead of reconstructed after the fact.

The journey begins with multichannel intake. A submission arrives by API, broker portal, or upload in the format the insurer already uses, and the layer records the source channel, the timestamp, a hash of the raw document, and the broker identity. Intelligent document reading follows, where unstructured PDFs, spreadsheets, and forms are read and structured by Machine Learning extraction, and the layer logs each extracted field with its confidence score, a link back to the source location in the original document, and the model version used. Broker enrichment and scoring come next, flagging and filling missing fields and scoring the submission for completeness, while recording what was missing, what was enriched, and from which source.

The risk and fraud engine then scores the risk against the insurer's models and fraud signals, and this is where explainability does most of its work. The record captures the features used and their values, the model version, the resulting score, and the contribution of each feature to that score. Dynamic pricing calculates a risk-adjusted premium (prêmio) against the rate tables and risk appetite, writing back the rating factors applied, the base rate, the loadings and discounts, the final premium, and the rule that produced each component. Finally the decision and prioritization stage recommends an action calibrated to the underwriting manual, recording whether it auto-decided or escalated to a human, the threshold and rule that triggered the action, and the human's final action with any override reason.

The design choice that makes the decision auditable is that this full trail is written back together with the decision and attached to the quote. The record is immutable and queryable, which turns the model decided into here is exactly why the model recommended this, what rule applied, and who confirmed it. Borderline or out of appetite risks escalate to a human rather than being forced through. WIR never describes the engine as infallible or perfectly accurate. The mechanism is traceability and human escalation on low confidence cases, not flawless prediction.

### How to deploy explainability as an external layer

Deploying the layer is a contained, auditable sequence rather than a core migration. The insurer keeps its core and its underwriting manual, and the layer is calibrated to that manual instead of imposing a generic model. WIR's commercial model treats this as a fixed-scope Setup that runs 3 to 12 months, covering automations, integrations, tests, and go-live adjustments, with KPIs agreed before the work starts, followed by continuous operation after go-live.

The sequence starts by scoping one or two lines (ramos) where submission volume and SLA pain are highest, commonly patrimonial (property) or a transport and cargo line, and defining what auto-decide versus escalate means for each ramo. Integration with the core comes next, connecting by API so recommendations and audit records flow into the existing system of record while the core stays authoritative. There is no data migration and no IT project the insurer's own team has to run. Calibration to the underwriting manual and risk appetite then encodes the insurer's rules, thresholds, exclusions, and appetite into the layer, and this is where escalation thresholds are set so borderline or out of appetite risks always reach a human.

Before the layer influences anything, it runs in shadow mode against historical and live submissions, comparing its recommendations to underwriter decisions. This validates the calibration and produces the first audit dataset. Go-live then starts with the layer recommending and humans confirming, widening the auto-decide band only as confidence and audit evidence accumulate. From there the layer runs in continuous operation, monitoring drift, reviewing escalations, and recalibrating as the manual and appetite change, with every recalibration itself versioned and auditable. Because the layer is external and writes structured records back, every recommendation stays independently inspectable without touching the core's data model.

### Governance, explainability, and LGPD

Governance rests on three pillars: an explanation on each decision, the audit trail written back, and calibration to the insurer's own risk policy, all under LGPD and SUSEP supervision. Every recommendation carries which features drove the risk score, which rule triggered the quote, decline, or escalation, and which rating factors set the premium, so a single decision record can be read and understood without reverse engineering a black box. This is a hard requirement rather than a refinement, because Brazil's Lei Geral de Proteção de Dados, the [Lei nº 13.709/2018 (LGPD)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm), governs the personal data inside underwriting submissions.

Two LGPD anchors apply directly. Under the right to review of automated decisions, the data subject can request review of decisions taken solely on automated processing that affect their interests, and the controller must, when requested and subject to commercial and industrial secrecy, give clear and adequate information about the criteria and procedures used. In practice this means a declined or surcharged applicant can ask why, and an explainable, auditable layer is what makes that answer possible. The LGPD security principle requires technical and administrative measures to protect personal data, which here means encryption in transit and at rest, access control, and logging at every step from intake through decision write-back. The [Autoridade Nacional de Proteção de Dados (ANPD)](https://www.gov.br/anpd/pt-br) supervises LGPD compliance and has issued guidance relevant to automated processing and security incidents.

The audit trail is what operationalizes this. For every decision the layer writes back, attached to the quote, the inputs and their source, the document extraction confidence, the model and rule versions, the features and their contributions, the price components, the recommended action, the escalation status, and the final human action with any override reason. The record is immutable and queryable, and data is encrypted at every step. Calibration keeps governance with the insurer. The model is calibrated to the insurer's own underwriting manual and risk appetite, the insurer sets the auto-decision and escalation thresholds, and the layer enforces that policy consistently while recording every application of it. None of this promises infallible decisions. It makes errors traceable and reviewable rather than claiming to eliminate them.

This posture also strengthens the insurer in front of its supervisor. [SUSEP](https://www.gov.br/susep) supervises P&C market conduct, solvency, and consumer treatment, and expects insurers to retain records that justify underwriting and pricing decisions. A layer that writes a structured, explainable record for every decision reinforces, rather than weakens, the insurer's position in a SUSEP inspection or an ouvidoria dispute. Read more about the Brazilian P&C market in the WIR [insurance market intelligence guide](https://wirinnovation.ai).

### How WIR makes underwriting decisions auditable

WIR is the AI layer of insurance, an external AI platform that sits on top of the insurer's existing systems and automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy. It is 100% external, with no core migration and no load on the insurer's IT. Its Machine Learning is calibrated to the insurer's risk appetite and underwriting manual, every decision is explainable and returns a full audit trail, and data is encrypted at every step and LGPD compliant. WIR is not an insurer, a broker, or an MGA, and it does not carry risk.

Two modules carry this in production. Underwriter Intelligence automates the quotation journey per the insurer's risk policy so underwriters spend their time on risk analysis and business development, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker. Smart Sales is the distribution intelligence module, mapping the portfolio by client and product, scoring upsell and next best action, and running multi-channel campaigns with an attribution trail so penetration and retention grow together. Real-time dashboards give a proactive view of in-flight deals and the underwriter queue.

Founded in 2025 by a team united between São Paulo and Silicon Valley and built with Mahway and Avante, WIR is in execution on its first POC with a global insurer in the Transport line. That is the only traction WIR claims here. The Brazilian Seguros e Danos market grows double digits per year while company structure does not keep pace, which is the pressure an explainable, auditable layer is built to relieve. The mechanism is consistent: the AI layer for insurance, on top of the systems the insurer already runs, never in their place, with every automated decision explainable, auditable, encrypted at every step, and LGPD compliant.

### Frequently asked questions

**Does every automated decision come with an explanation?**

Yes. Every quote, decline, or escalation returns the features, rules, and rating factors that produced it, written back to the quote. WIR sits as an external AI layer on top of the insurer's core, so each decision record shows which features drove the risk score, which rule triggered the action, and which factors set the premium. This is explainability by design, not a promise of perfect prediction.

**Is the audit trail complete and exportable?**

Yes. WIR writes back a complete, immutable, and queryable record for every decision, attached to the quote. The trail captures inputs and their source, document extraction confidence, model and rule versions, feature contributions, price components, the recommended action, escalation status, and the final human action with any override reason. Because the layer is external and writes structured records, each decision stays independently inspectable for auditors, regulators, and the ouvidoria without touching the core.

**How does the model stay calibrated to the underwriting manual?**

WIR's Machine Learning is calibrated to the insurer's own underwriting manual and risk appetite, not a generic model. During the fixed-scope Setup of 3 to 12 months, the insurer's rules, thresholds, exclusions, and appetite are encoded into the layer, then validated in shadow mode against historical and live submissions. The insurer sets the auto-decide and escalation thresholds, and every recalibration is itself versioned and auditable as the manual changes.

**Is data encrypted and LGPD compliant?**

Yes. Data is encrypted in transit and at rest at every step, with access control and logging from intake through decision write-back, fully LGPD compliant. This supports the LGPD right to review of automated decisions, so a declined or surcharged applicant can ask why and receive clear information about the criteria used. WIR is an external AI layer that never carries risk and never replaces the insurer's core.

**Can the AI escalate the decision to a human underwriter?**

Yes. Borderline or out-of-appetite risks escalate to a human underwriter rather than being forced through. The insurer sets the escalation thresholds during calibration, and the layer records whether it auto-decided or escalated, the rule that triggered it, and the underwriter's final action with any override reason. WIR never describes its engine as infallible. The mechanism is human escalation on low-confidence cases plus a full audit trail.`
  },
  {
    slug: "enriquecimento-corretor-priorizacao-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Broker enrichment and prioritization with an AI layer",
    sub: "How insurers enrich and prioritize brokers with an external AI layer: broker scoring, CNPJ, conversion history, and exposure, without replacing the core. See how.",
    author: "WIR Innovation", role: "Team",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers enrich and prioritize brokers with an external AI layer: broker scoring, CNPJ, conversion history, and exposure, without replacing the core. See how.",
    body: `### What broker enrichment with an AI layer means

Broker enrichment and prioritization with AI is the practice of resolving, scoring, and ranking each broker submission the moment it arrives, so the insurer responds fastest to the cases most likely to bind. In the Brazilian Seguros e Danos (P&C) market, the corretor (broker) is the dominant route to market, yet at the instant of quotation the insurer usually knows almost nothing about the broker who sent the submission. The underwriter sees a name, a CNPJ (company tax ID) or a registration code, and a risk to price, but not the context that decides whether this case deserves fast, deep attention. This guide is written for underwriting (subscrição) and distribution leads, and for innovation heads, who want to prioritize the right brokers without changing their core systems.

An external AI layer closes that gap. It sits on top of the insurer's existing core, policy, and quotation systems, reads each submission whatever channel it came from, enriches the broker, scores the case, and returns a prioritization decision with the reasoning attached. Nothing is replaced and no core migration is involved. The layer is additive, writing enriched context and a priority score back into the flow the insurer already runs. WIR is the AI layer of insurance built for exactly this work, calibrated to each insurer's own risk appetite and underwriting manual.

The reason this matters is structural. Brokers reward response speed above almost anything else, and 60%+ of brokers choose an insurer by response speed, according to Capgemini. When triage is manual and broker-blind, the broker who deserves a two-hour answer and the broker who deserves a deprioritized answer are treated the same, and the insurer loses placement to whoever quotes faster and more reliably. Because enrichment cross-references external and internal sources, every CNPJ check, history lookup, exposure read, and credit signal runs inside a framework that is LGPD compliant, encrypted at every step, explainable, and auditable.

### How broker score and conversion history enter the journey

Broker enrichment is one stage in an automated underwriting journey with six steps that run in sequence. First, multichannel intake captures submissions from email, broker portal, upload, and API into one structured pipeline. Second, intelligent document reading uses Machine Learning to extract and structure the risk data from PDFs, spreadsheets, and forms, removing the re-keying. Third comes broker enrichment and scoring, the focus of this guide. Fourth, a risk and fraud ML engine scores the structured risk against the insurer's appetite and against fraud and loss patterns. Fifth, dynamic pricing sets the premium (prêmio) to the enriched, scored risk and to the underwriting manual. Sixth, the decision and prioritization step quotes, declines, or escalates, with an audit trail and an SLA-aware priority.

Inside the enrichment stage, the layer answers one question before the underwriter spends any time: how much, and how fast, is this submission worth. It builds the broker context an underwriter would otherwise assemble by hand. Identity and validation resolve the brokerage's CNPJ, confirm active and regular status, and validate the counterparty, which blocks submissions from irregular or dormant entities. Broker history draws on the insurer's own systems to show how many submissions this broker sent, how many bound, in which lines of business (ramos), and with what loss experience, which is the real conversion track record. Exposure and accumulation show how much exposure this broker already concentrates with the insurer by ramo and region, so accumulation limits and risk appetite are applied at intake rather than after binding. Credit signals add financial-standing context where premium financing or payment risk matters.

The model then estimates the probability that this specific submission converts, conditioned on the product, the risk profile, and the broker's historical binding behavior. A broker with a valid CNPJ and a strong conversion record, sending a case inside the insurer's appetite, is flagged for fast, deep attention. A low-conversion pattern is queued accordingly. The output is a broker score and a conversion-likelihood signal attached to the submission, plus a recommended priority, so the underwriter starts from context instead of a blank screen and the quotation system can route automatically. The mechanism reflects WIR's own platform flow, where broker enrichment feeds the risk engine, the pricing step, and the final decision.

### How to deploy enrichment as an external layer

Adding broker enrichment as an external layer follows a contained path, not a core program. It begins with scope: the insurer picks the lines and broker segments where triage pain and volume are highest in Seguros e Danos, and defines what priority means for its own service-level targets. Next comes integration with the core, connecting by API, portal, or upload to the existing quotation and policy systems. The layer reads submissions and writes enriched broker context and a priority score back into the existing flow. This is integration, not migration, which matters because 70% of insurers do not execute innovation due to IT limitations, according to BCG.

Calibration follows. The scoring and conversion models are tuned to the insurer's underwriting manual, its appetite by ramo and region, and its accumulation limits, so the enrichment respects existing rules and does not invent new ones. Testing then validates the models against historical submissions, checking whether the score predicted conversion, whether prioritization improved response time on the cases that mattered, and whether the CNPJ and exposure checks were correct. Go-live rolls the layer out on the scoped lines with the underwriter in the loop and the score visible and overridable. Continuous operation keeps the models retraining on new conversion and loss outcomes, with thresholds adjusting as the insurer's appetite changes.

With WIR, this work runs as a defined setup that takes three to twelve months, with a clear scope and KPIs agreed before start, followed by a continuous operation phase after go-live. The reason an external layer is realistic here is that underwriters already lose 40% of their time to administrative tasks, according to Deloitte, and 20% to 30% of corporate time is lost organizing unstructured data, according to Gartner. Removing manual broker triage returns that time to risk judgment without an IT program the insurer's team has to run.

### Governance, explainability, and LGPD

Cross-referencing external sources to score a broker is personal-data and counterparty-data processing, so it is governed by design. Every prioritization and scoring decision is explainable, showing which factors raised or lowered the broker score and why the submission was prioritized or deprioritized. Good underwriting governance and SUSEP supervision of the P&C market both expect automated decisions to be reconstructable and auditable, with a trail per decision, and the enrichment layer returns exactly that. Instead of ad-hoc manual checks that leave no record, every CNPJ validation, exposure check, and score is logged.

The legal frame is Brazil's Lei Geral de Proteção de Dados, the LGPD (Lei 13.709/2018), which governs the processing of personal data, sets a legal-basis requirement, and gives data subjects the right to review of decisions taken solely on automated processing, as set out in the [LGPD text on planalto.gov.br](http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm). Cross-referencing CNPJ, broker history, exposure, and credit must rest on a valid legal basis, be minimized to what the underwriting decision needs, and keep a human-review path. Data is encrypted in transit and at rest, access is controlled, and the enrichment pulls only the fields the scoring decision requires.

This is the posture WIR holds across its platform. Decisions are explainable and return a full audit trail, data is encrypted at every step and LGPD compliant, and the underwriter stays in the loop with the score visible and overridable. The enrichment layer strengthens governance rather than weakening it, turning a previously invisible manual process into one that is recorded, minimized, and auditable end to end. For wider market context on Brazilian P&C, see WIR's insurance market intelligence guide.

### How WIR enriches and prioritizes brokers

WIR is the AI layer of insurance in Brazil, an external AI platform that sits on top of the systems the insurer already runs and automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy. For broker enrichment specifically, WIR ingests each submission through API, portal, or upload, resolves and enriches the broker by cross-referencing external and internal sources, including CNPJ status, the insurer's own broker and conversion history, exposure data, and credit signals, and returns a broker score with a recommended priority. The work is delivered through two modules. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker. Smart Sales adds distribution intelligence, mapping the portfolio by client and product and scoring next-best-action so penetration and retention grow together. Real-time dashboards keep in-flight deals and pipeline visible.

WIR is 100% external, with no load on the insurer's IT and no core migration. It is the AI layer for insurance, on top of the systems the insurer already runs, never in their place. WIR is not an insurer, a broker, or an MGA, and it does not carry risk. It automates the journey calibrated to each insurer's risk appetite and underwriting manual, and every decision is explainable, auditable, encrypted at every step, and LGPD compliant. WIR Innovation was founded in 2025 and built with Mahway, a Venture Builder in California, and Avante, a Venture Studio in Brazil. Its first POC is in execution with a global insurer in the Transport line, and that is the only public traction point. To see how broker enrichment and prioritization would work at a specific insurer, the next step is a working conversation with the WIR team.

### Frequently asked questions

**Which external sources does the layer cross-reference for the broker?**

The layer cross-references CNPJ status, broker and conversion history, exposure and accumulation data, and credit signals to contextualize each submission. WIR resolves the brokerage's CNPJ, confirms active and regular status, draws conversion track record from the insurer's own systems, and reads exposure by ramo and region. Every cross-reference runs inside an LGPD-compliant, encrypted framework, minimized to the fields the underwriting decision requires, with a full audit trail per check.

**How does conversion history influence prioritization?**

Conversion history estimates how likely a specific submission is to bind, so high-converting brokers inside appetite are flagged for fast, deep attention. WIR draws on the insurer's own systems to show how many submissions a broker sent, how many bound, in which ramos, and with what loss experience. Underwriter Intelligence conditions a conversion-likelihood signal on product, risk profile, and the broker's historical binding behavior, then attaches a recommended priority to the case.

**Does enrichment replace the insurer's CRM?**

No. Enrichment never replaces the insurer's CRM or core. WIR is an external AI layer on top of the systems the insurer already runs, reading submissions by API, portal, or upload and writing enriched broker context and a priority score back into the existing flow. This is integration, not migration, which matters because 70% of insurers do not execute innovation due to IT limitations, according to BCG. WIR carries no risk and adds no load on the insurer's IT.

**Is the data cross-referencing LGPD compliant?**

Yes. Cross-referencing CNPJ, broker history, exposure, and credit rests on a valid legal basis under Brazil's LGPD, with data encrypted in transit and at rest. WIR minimizes processing to the fields the scoring decision requires, controls access, and keeps a human-review path so decisions are not taken solely by automation. Every validation and score is logged, making the broker enrichment explainable and auditable rather than an ad-hoc manual check that leaves no record.

**How does prioritization speed up the response to the broker?**

Prioritization scores and ranks each submission at intake, so underwriters start from context and the quotation system routes the highest-value cases first. This matters because 60%+ of brokers choose an insurer by response speed, according to Capgemini. WIR returns a broker score and a recommended priority with the reasoning attached, replacing manual, broker-blind triage. Underwriters recover time, given that they already lose 40% of it to administrative tasks, according to Deloitte, and direct it to the cases most likely to bind.`
  },
  {
    slug: "integrar-camada-ia-core-seguros-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "How to integrate an AI layer with the insurance core without migration",
    sub: "How to integrate an AI layer with the insurance core without migration: 100% external, reads and writes via API, no IT load, and go-live in months.",
    author: "WIR Innovation", role: "Team",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "How to integrate an AI layer with the insurance core without migration: 100% external, reads and writes via API, no IT load, and go-live in months.",
    body: `### What integrating an external AI layer with the core means

To integrate an AI layer with the insurance core without migration is to add an intelligence layer on top of the policy systems the insurer already runs, connecting through an API so the layer reads submissions and writes results back, with no migration of the legacy core. This is the model WIR operates as the AI layer of insurance in Brazil. It is built for insurer C-level, underwriting (subscrição) leads, and product or innovation heads who want to automate the quotation and underwriting journey without launching a multi-year core program.

The distinction matters because the alternative is a core modernization or core-replacement project, a multi-year capital program that freezes the roadmap and consumes scarce IT capacity. An external layer is the opposite pattern. The insurer keeps its current policy administration system exactly as it is, adds intelligence in front of it, and integrates through standard interfaces rather than a platform rebuild.

This is precisely the constraint Brazilian insurers feel most. According to BCG, 70% of insurers do not execute their innovation initiatives because of IT limitations, since every change competes for the same scarce engineering capacity against a legacy core. The external-layer model is the direct answer to that constraint. It is innovation that does not require IT to touch the core. For more on the Brazilian Seguros e Danos (P&C, property and casualty) market context, see WIR's market intelligence guide at https://wirinnovation.ai.

### How the layer reads from and writes back to the core

The external AI layer automates the full quotation and underwriting journey in six stages while keeping the human underwriter on the decisions that need judgment. It begins with multichannel intake and automatic validation. Submissions enter through the formats the insurer already uses, API, underwriter portal, or document upload, and the layer normalizes every channel into one structured submission. There is no manual collection step before an analyst can work the request.

Next comes intelligent document reading. Machine Learning extracts the relevant fields from unstructured PDFs and images, from propostas and apólices to laudos, faturas, and conhecimentos de transporte (bills of lading), so the re-keying step disappears and low-confidence reads are flagged for review. The third stage is broker enrichment and context. The layer scores the corretor (broker) and channel, pulls conversion history, and cross-references external sources such as CNPJ, exposure, and credit so triage is consistent rather than ad hoc.

The fourth stage is the risk and fraud engine, a multi-factor ML model calibrated to the insurer's risk appetite (apetite de risco) and underwriting manual that returns a risk score, a probability, and an automated decision while flagging anomaly signals. Stage five is dynamic pricing, a risk-adjusted premium (prêmio) calculation produced instantly and aligned to the insurer's own pricing rules. The sixth stage is decision and prioritization. The layer recommends a quote, an automatic decline, or escalation to a human underwriter, always with an explanation. Clean, in-appetite risks flow straight through. Borderline and complex risks are routed to underwriters with the analysis already done.

The write-back is the point that distinguishes integration from replacement. At the decision stage the layer writes the structured result, the score, the price indication, and the decision back into the policy core through the core's APIs or an integration adapter, and returns the full audit trail. The system of record stays the core. WIR is the intelligence on top of it, never in its place.

### How to deploy the integration without a core migration

Rolling out the layer follows a scoped sequence rather than a migration. The first step is scope. The insurer picks the lines of business (ramos) and submission types to automate first, typically a high-volume P&C ramo with a clear underwriting manual, and defines the in-appetite rules, the SLA target, and the success metrics. The second step is integration with the existing core. The layer connects via API or an integration adapter so it reads submissions and writes structured results, scores, and decisions back to the core. There is no data migration and no parallel-run of a replacement system. Integration is a scoped API project, not a platform rebuild, and the core remains the system of record throughout.

The third step is calibration to the insurer's own policy. The ML engine and the rules engine are configured against the insurer's manual de subscrição, historical loss data, and risk appetite, so the model reflects the insurer's policy rather than a generic benchmark. The fourth step is testing in shadow mode. The layer runs in parallel against real recent submissions, and its reads, scores, and decisions are compared to the underwriters' actual outcomes until accuracy and the straight-through rate meet the agreed targets. The fifth step is go-live for the chosen ramos, with clean risks flowing straight through and edge cases escalating to underwriters.

Because there is no core migration, this setup runs 3 to 12 months as a one-time implementation with a fixed price, a clear scope, and KPIs agreed before start, rather than the multi-year timeline of a core-replacement program. After go-live the layer keeps running as continuous operation, an external service the insurer's IT does not have to build, host, or maintain. Models are monitored and recalibrated as the book and the risk appetite evolve, and new ramos and submission types are added incrementally. The integration surface stays small and standard, which is what keeps the load off the insurer's IT team.

### Governance, explainability, and LGPD

Automating underwriting decisions in a regulated market raises three non-negotiables, and the external-layer model is designed around all three. The first is explainability and auditability. Every automated decision, whether a read, a score, a price, or a quote, decline, or escalation, is explainable and leaves an audit trail recording which inputs, which score, which rule, and which output produced it. This protects the insurer in supervision and dispute scenarios and keeps a human able to review any decision. SUSEP, the insurance regulator, supervises the P&C market and expects insurers to govern their pricing and acceptance practices, as set out on the regulator's site at https://www.gov.br/susep/pt-br.

The second is data protection under the LGPD, the Lei Geral de Proteção de Dados (Lei 13.709 of 2018). Insurance submissions carry personal and sometimes sensitive data, so the layer processes it on a valid legal basis, with data minimization, and supports data-subject rights including review of decisions taken on an automated basis. Data stays encrypted in transit and at rest at every step, as framed by the ANPD at https://www.gov.br/anpd/pt-br. The third is calibration to the insurer's own risk policy. The model is not a black box imposed from outside. It is configured to the insurer's underwriting manual, historical data, and risk appetite, so the automated decision is the insurer's policy applied consistently and is defensible to both the regulator and the underwriting committee.

Because the layer is external and writes back to the core rather than replacing it, the insurer keeps its existing controls, its audit perimeter, and its data-governance boundary intact. Nothing about the core's compliance posture is disturbed by adding intelligence in front of it.

### How WIR integrates the AI layer with the core

WIR is the AI layer for insurance. On top of the systems the insurer already runs, never in their place. It is 100% external, with no load on the insurer's IT and no core migration, and it automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy. The integration is the mechanism described above. WIR ingests submissions through API, portal, or upload, structures and scores them with Machine Learning calibrated to the insurer's appetite and underwriting manual, and writes the decision back into the policy core with a full audit trail.

Two modules carry the work. Underwriter Intelligence automates the quotation journey so underwriters analyze risk and focus on business development, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker. Smart Sales is the distribution intelligence layer, mapping the portfolio by client and product, scoring upsell and next-best-action, and running multi-channel campaigns with an attribution trail so penetration and retention grow together. Real-time dashboards and analytics give a proactive view of in-flight deals and pipeline. WIR is not an insurer, a broker, or an MGA, and it does not carry risk. It automates the journey on the insurer's behalf, and every decision it returns is explainable, auditable, LGPD compliant, and encrypted at every step.

WIR was founded in 2025, with founders united between São Paulo and Silicon Valley, and built with Mahway, a Venture Builder in California, and Avante, a Venture Studio in Brazil. Its first public traction is a POC in execution with a global insurer in the Transport line. Insurers and brokers evaluating how to integrate an AI layer with their core without a migration can map the path with WIR at https://wirinnovation.ai.

### Frequently asked questions

**Does the integration require a core migration or replacement?**

No. WIR is an external AI layer on top of the systems the insurer already runs, never in their place. The core stays as it is and remains the system of record. There is no data migration and no parallel-run of a replacement system. Integration is a scoped API project, not a platform rebuild. The layer connects through the core's APIs or an integration adapter so it reads submissions and writes structured results back to the existing core.

**Does the AI layer create load for the IT team?**

No. WIR is 100% external, with no load on the insurer's IT team. The integration surface stays small and standard, a connection via API or an integration adapter rather than a platform rebuild. After go-live, the layer runs as a continuous external service the IT team does not have to build, host, or maintain. Models are monitored and recalibrated by WIR as the book and risk appetite evolve, keeping engineering capacity free for other work.

**Does the layer write the decision back to the policy core?**

Yes. At the decision stage the layer writes the structured result back into the policy core through the core's APIs or an integration adapter. It returns the risk score, the price indication, the decision, and a full audit trail. This write-back is what distinguishes integration from replacement. The system of record stays the insurer's core. WIR is the explainable, auditable intelligence on top of it, never in its place, and every decision is LGPD compliant and encrypted at every step.

**How long does the integration setup take?**

Setup runs 3 to 12 months as a one-time implementation, with a fixed price, a clear scope, and KPIs agreed before start. The sequence covers scope of the chosen lines of business, API integration with the existing core, calibration to the insurer's underwriting manual and risk appetite, testing in shadow mode against real submissions, and go-live. Because there is no core migration, this avoids the multi-year timeline of a core-replacement program.

**What does continuous operation look like after go-live?**

After go-live the layer keeps running as continuous operation, an external service in production. Clean, in-appetite risks flow straight through, while borderline and complex risks route to underwriters with the analysis already done. WIR monitors and recalibrates the Machine Learning models as the book and risk appetite evolve, and new lines of business and submission types are added incrementally. Billing is monthly, adjusted per client, and every decision stays explainable, auditable, and LGPD compliant.`
  },
  {
    slug: "leitura-inteligente-submissoes-seguro-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Intelligent document reading for insurance submissions with an AI layer",
    sub: "How insurers automate intelligent document reading for submissions with an external AI layer on top of existing systems, no core migration. See how it works.",
    author: "WIR Innovation", role: "Team",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers automate intelligent document reading for submissions with an external AI layer on top of existing systems, no core migration. See how it works.",
    body: `### What intelligent document reading with an AI layer means

Intelligent document reading for insurance submissions is Machine Learning based extraction that reads a submissão (submission) wherever it arrives, an e-mail body, a PDF proposal form, a scanned certificate, a spreadsheet, or a broker cover note, and returns the fields an underwriter needs as clean, validated, structured data. It is the first stage of the automated quotation and underwriting (subscrição) journey, and it belongs to any P&C (Seguros e Danos) insurer whose intake still depends on people reading and rekeying documents by hand. The reader who should care most is the underwriting lead or innovation head tired of slow, inconsistent intake that burns underwriting capacity on data entry.

The problem is concrete. Before anyone can price a risk, a person has to find the relevant values across heterogeneous documents, key them into the core or the rating engine, and reconcile contradictions between files. Gartner has estimated that corporate teams lose 20 to 30 percent of their time organizing unstructured data rather than doing analytical work, and intake is exactly where that loss lands in insurance. WIR is an external AI layer that automates this reading on top of the systems the insurer already runs, so the submission reaches the underwriting desk already structured and triaged. The intelligence is calibrated to the insurer's own risk appetite and underwriting manual, never a generic black box.

### How automatic data extraction and validation works

Most insurers have tried to fix intake before, usually with traditional OCR and RPA, and both under-delivered for the same reason. Classic OCR turns pixels into characters but does not understand the document. It is template bound, so it works only when a field sits in the same place on the same form every time, which is the opposite of P&C reality where every broker, every line of business (ramo), and every insured sends a different layout. RPA scripts the clicks a human would make, so it breaks the moment a portal, a form, or an upstream field changes. Both treated reading as mechanical transcription when the real task is interpretation.

Intelligent document reading asks what a value means rather than which character sits in a pixel region. It identifies the insured's CNPJ, the sum insured (importância segurada), the requested coverage, the vigência, and the risk address wherever they appear, across formats it has never seen in that exact layout. Three properties separate it from the older tools. First, layout independence, since models trained on insurance documents generalize across forms, e-mails, certificates, and spreadsheets, so a new broker template does not need a new rule. Second, a confidence score per field, so high-confidence values flow straight through while low-confidence ones route to a person for a quick check. Third, validation, where each value is checked for completeness against the requirements of that ramo, for format on fields like CNPJ, CEP, dates, and currency, and for consistency across documents.

The intake is also multichannel, because a real insurer receives submissions by e-mail, broker portal upload, and partner API at the same time. WIR reads the message and every attachment as one submission, validates the extracted data, and flags missing or conflicting items for broker enrichment before pricing. Only the genuinely ambiguous fields reach a human, which inverts the OCR model where people checked everything. The output is not raw text. It is a structured, validated submission object that the rest of the journey can consume, and clean intake is what makes the downstream stages, broker enrichment, risk and fraud scoring, dynamic pricing, and the final decision, fast and consistent.

### How to deploy intelligent reading as an external layer

Deployment does not require a core migration, and that is the central architectural point for a Brazilian insurer. The AI layer sits on top of existing systems. It ingests submissions from the channels above, produces structured validated data, and pushes that data into the policy core, the underwriting workbench, or the rating engine through APIs or files. The system of record stays intact. This matters because IT limitations are one of the most cited blockers to insurance innovation. BCG has found that 70% of insurers do not execute innovation because of IT constraints, and an overlay model lets an insurer modernize intake without betting the company on a multi-year core program.

The implementation runs as a defined project, not an open-ended IT effort the insurer's team has to staff. Setup is a one-time phase of 3 to 12 months that covers scope, integration with the existing core, calibration to the underwriting manual and risk appetite, testing, and go-live adjustments, with a fixed price, a clear scope, and KPIs agreed before the work starts. After go-live the layer moves to continuous operation in production, with a billing model adjusted per client. Throughout, WIR remains 100% external, with no load on the insurer's IT and no replacement of the core. The reason to automate intake first is commercial as much as technical. Capgemini reports that 60%+ of brokers (corretores) choose an insurer by response speed, and slow manual intake directly costs conversion and shelf space with distribution.

### Governance, explainability, and LGPD

Automating intake touches personal and corporate data, so governance is part of the design, not an afterthought. Under the LGPD (Lei Geral de Proteção de Dados, Lei 13.709/2018), submission data often contains personal data such as names, CPF, and addresses, so the layer must process it on a lawful basis, with data minimization and security, and must keep a human in the loop where an automated decision affects a person. Data is encrypted at every step and processed in line with LGPD, and the ANPD is the supervisory authority. SUSEP supervises the P&C market, so automated reading and downstream underwriting must stay consistent with the registered product terms and the underwriting manual.

Explainability is where the confidence score stops being only an accuracy feature and becomes a governance mechanism. Every extraction, every confidence level, every validation outcome, and every human override is logged, so the insurer can prove which values were machine-extracted with high precision and which were checked by a person. Decisions are explainable and return a full audit trail, never presented as infallible. That provenance is what makes automated intake defensible to internal audit and to the regulator, because each field's certainty and origin are recorded rather than hidden. For the wider market backdrop the insurer can review the [WIR insurance market intelligence](https://wirinnovation.ai) coverage of where automation moves the needle in Brazilian P&C.

### How WIR automates submission reading

WIR is the AI layer for insurance. On top of the systems the insurer already runs, never in their place. It automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy, with Machine Learning calibrated to the risk appetite and the underwriting manual. Intelligent document reading is the second stage of a six-stage flow that begins with multichannel intake and automatic validation, then reads the documents, then enriches with broker context and scoring, then runs a multi-factor risk and fraud engine, then prices the risk, and finally returns a decision, a quote, an automatic decline, or escalation to a human, always with an explanation written back to the policy core alongside the audit trail.

Two modules carry the work. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time ML scoring, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on risk judgment and business development rather than rekeying. Smart Sales maps the portfolio across client and product, scores upsell and next-best-action, and runs multi-channel campaigns with an attribution trail. Real-time dashboards give a proactive view of in-flight deals and pipeline. WIR Innovation was founded in 2025 from accumulated operational experience, built with Mahway, a Venture Builder in California, and Avante, a Venture Studio in Brazil. Its first POC is in execution with a global insurer in the Transport line. To see how submission reading would map to a specific insurer, [talk to WIR](https://wirinnovation.ai).

### Frequently asked questions

**Does intelligent reading parse quote e-mails and attachments?**

Yes. Intelligent document reading treats the e-mail body and every attachment as one submission, extracting fields wherever they arrive. It reads PDF proposal forms, scanned certificates, spreadsheets, and broker cover notes across layouts it has never seen in that exact form. WIR ingests submissions from e-mail, broker portal upload, and partner API at the same time, then validates the data and flags missing or conflicting items for broker enrichment before pricing.

**How does this AI layer differ from traditional OCR?**

It asks what a value means, not which character sits in a pixel region. Traditional OCR is template bound and breaks when a layout changes, which is the opposite of P&C reality. WIR's Machine Learning generalizes across forms, certificates, and spreadsheets, attaches a confidence score per field, and validates each value. High-confidence values flow straight through, while low-confidence ones route to a person for a quick check.

**Is extracted data validated before it moves through the journey?**

Yes. Every value is checked for completeness against that ramo's requirements, for format on fields like CNPJ, CEP, dates, and currency, and for consistency across documents. Only genuinely ambiguous fields reach a human, which inverts the OCR model where people checked everything. The output is a structured, validated submission object that downstream stages, broker enrichment, risk and fraud scoring, dynamic pricing, and the final decision, can consume cleanly.

**Is automatic extraction LGPD compliant?**

Yes. Submission data is processed in line with the LGPD, encrypted at every step, with data minimization and a human in the loop where an automated decision affects a person. Every extraction, confidence level, validation outcome, and human override is logged, so the insurer can prove which values were machine-extracted with high precision and which a person checked. Decisions are explainable and return a full audit trail, never presented as infallible.

**Do we need to replace the core to read submissions with AI?**

No. WIR is an external AI layer that sits on top of existing systems, with no core migration. It ingests submissions, produces structured validated data, and pushes that into the policy core, underwriting workbench, or rating engine through APIs or files. The system of record stays intact. BCG found that 70% of insurers do not execute innovation because of IT constraints, and an overlay model removes that blocker.`
  },
  {
    slug: "motor-risco-fraude-seguros-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Insurance risk and fraud engine with an AI layer",
    sub: "How an external AI layer scores risk and flags fraud inside underwriting, calibrated to appetite and manual, with a full audit trail and no core migration. Talk to WIR.",
    author: "WIR Innovation", role: "Team",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "How an external AI layer scores risk and flags fraud inside underwriting, calibrated to appetite and manual, with a full audit trail and no core migration. Talk to WIR.",
    body: `### What a risk and fraud engine with an AI layer means

An insurance risk and fraud engine with AI is an external intelligence layer that scores each submission and flags suspected fraud as a stage of the underwriting (subscrição) journey, calibrated to the insurer's risk appetite and underwriting manual. It reads the quote request, weighs many factors with a Machine Learning model, and returns a risk score, a probability, and a recommended automated decision, while the insurer's core systems stay in place. This is for an underwriting lead, a product or innovation head, or a broker (corretor) team that wants faster and more consistent risk selection without a core migration.

The engine sits between submission intake and the underwriter's final call, and it never owns the policy. Policy administration, premium (prêmio) booking, and the official record continue to run on the systems the insurer already operates. WIR is the AI layer for insurance in Brazil, on top of the systems the insurer already runs, never in their place. The honest claim is sharper here than a sales promise. A calibrated model raises detection rates, consistency, and speed, but no engine eliminates fraud, and adverse or high-exposure cases stay with a human. Every output is explainable and returns a full audit trail, with data encrypted at every step and handled under LGPD.

### How risk scoring and fraud triage work

The stage runs as a sequence rather than a single black-box step. First, the engine takes in the quote request and supporting documents from the broker channel or the insurer portal, across the formats the insurer already uses such as e-mail, attachments, or an API. Next, it reads those documents and extracts the relevant fields automatically, then enriches the case by cross-referencing external sources. After that, a multi-factor ML model weighs risk factors and fraud indicators together, calibrated to the underwriting manual and the risk appetite for that line of business (ramo). The model then produces a risk score, a probability, and a recommended decision such as auto-approve, refer to an underwriter, decline, or flag for fraud review. Finally, clean low-risk cases can be auto-decided to free underwriter time, while ambiguous or high-exposure cases are routed to a human with the supporting evidence attached.

The decisive word is calibrated. A generic fraud model is not the same as one tuned to a specific insurer's appetite, manual rules, and historical loss patterns per ramo. Calibration lets the same engine stay conservative on a line where the insurer wants to grow cautiously and more permissive where it wants volume. The engine encodes the manual, it does not overrule it. The model is multi-factor by design because single-signal rules, like a static blacklist or a hard threshold, are brittle and easy to game. Combining many weaker signals into one score raises detection on novel patterns that no single rule would catch.

The lift over manual scoring comes from data the underwriter cannot check by hand at quote speed. The engine validates CNPJ and CPF status to confirm the proposing entity exists, is active, and matches the declared activity, since a recently opened or irregular CNPJ on a high-value cover is a classic flag. It reads broker history to surface submission quality, historical loss ratio, and clusters of suspicious cases concentrated in one channel. It checks exposure and accumulation to see whether the risk overlaps existing cover on the same insured, address, or fleet. It uses credit and financial behavior as one factor among many, never as a sole decision basis, and it cross-checks the declarations against the extracted document data to surface contradictions. This is also a distribution advantage, because brokers choose insurers partly on response speed, and a consistent, defensible decision in seconds rather than days improves conversion while keeping risk selection disciplined.

### How to deploy the risk engine as an external layer

Deployment is an integration, not a system migration, and the insurer's IT team does not have to run a rebuild. The engine connects on top of the existing core through the channels already in use, so policy administration and premium booking continue without interruption. The work is scoping the lines and use cases, integrating with the current systems, calibrating the model to the underwriting manual and risk appetite, testing against real historical submissions, going live, and then operating continuously. WIR structures this as a one-time setup that runs 3 to 12 months, with a fixed price, a clear scope, and KPIs agreed before the work starts, followed by continuous operation after go-live with a billing model adjusted per client.

Calibration is the part that determines value, and it happens with the insurer, not in isolation. The model is tuned to the manual rules, the appetite per ramo, and the historical loss patterns the insurer has already seen, so the outputs reflect that insurer's own selection policy rather than a benchmark borrowed from someone else. Testing against past cases shows where the score agrees with prior underwriter decisions and where it diverges, which is exactly the conversation that builds trust before any case is auto-decided. Because the layer is external, the insurer keeps full control of the core and can widen the lines covered over time without a second migration.

### Governance, explainability, and LGPD

An automated underwriting and fraud decision in Brazil cannot be a black box, and two requirements drive the design. Each risk score and recommendation carries the factors that drove it, which signals pushed the score up and which pushed it down, so an underwriter can review, override, and justify the outcome. This is operationally necessary, because underwriters will not trust an unexplained score, and it is legally relevant. Alongside it, every decision is reconstructable through a complete audit trail that records what data was read, which model version ran, what the output was, and who reviewed or overrode it. That trail supports internal governance and SUSEP supervision of P&C conduct, and it protects the insurer if a declined or flagged case is later contested.

On data protection, the LGPD (Lei Geral de Proteção de Dados, Lei 13.709/2018) is directly relevant. Article 20 gives the data subject the right to request review of decisions taken solely on the basis of automated processing of personal data that affect their interests, including decisions intended to define profiles. In practice this reinforces three things for a risk and fraud engine. Keep a human-review path for adverse automated outcomes, log the basis of each decision, and be able to provide information about the criteria used. An external AI layer that produces explainable, logged decisions and routes adverse or ambiguous cases to a human is aligned with this framework, with personal and credit data used only as part of a transparent, multi-factor process, encrypted at every step. You can read the [full LGPD text on automated decisions at Planalto](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) and reference the [ANPD, the national data protection authority](https://www.gov.br/anpd/pt-br).

### How WIR operates the risk and fraud engine

WIR is the AI layer for insurance in Brazil, an external platform that automates the quotation and underwriting journey on top of the insurer's existing systems, calibrated to that insurer's risk appetite and underwriting manual. The risk and fraud engine is the fourth stage of a six-stage flow that moves from multichannel intake and automatic validation, to intelligent document reading, to broker enrichment and context, to the multi-factor ML risk and fraud engine, to dynamic risk-adjusted pricing, and finally to decision and prioritization. At decision time the platform issues a quote, an automatic decline, or an escalation to a human, always with an explanation, writes the result back to the policy core, and returns the audit trail with a visible SLA and an underwriter queue.

Two modules carry this in production. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on ambiguous and high-value cases rather than cross-referencing. Smart Sales adds distribution intelligence, mapping the portfolio by client and product, scoring next-best-action, and running multi-channel campaigns with an attribution trail. Real-time dashboards give a proactive view of in-flight deals and pipeline.

The context behind this is a market that grows double digits per year while company structure does not keep pace. Underwriters spend 40% of their time on administrative tasks, according to Deloitte, and 70% of insurers do not execute innovation because of IT limitations, according to BCG. 60%+ of brokers choose an insurer by response speed, according to Capgemini, and corporates lose 20% to 30% of their time organizing unstructured data, according to Gartner. WIR was founded in 2025, built with Mahway and Avante, and its first POC is in execution with a global insurer in the Transport line. To map how your insurer could score risk and triage fraud with a calibrated AI layer, [talk to WIR](https://wirinnovation.ai).

### Frequently asked questions

**How is the risk score calibrated to the underwriting manual?**

The score is tuned to the insurer's own manual rules, risk appetite per line of business, and historical loss patterns, so outputs reflect that insurer's selection policy. WIR calibrates the multi-factor Machine Learning model with the insurer during setup, then tests it against real historical submissions to show where it agrees with prior underwriter decisions and where it diverges. The engine encodes the manual, it does not overrule it, staying conservative or permissive per ramo as the appetite dictates.

**Which external sources does the engine cross-reference?**

The engine validates CNPJ and CPF status, reads broker history, checks exposure and accumulation, and uses credit and financial behavior as one factor among many. It cross-checks the declarations against the extracted document data to surface contradictions, like a recently opened CNPJ on a high-value cover. Credit data is never a sole decision basis. This lift comes from data an underwriter cannot verify by hand at quote speed, combined into one calibrated risk score.

**Is every risk and fraud decision explainable and auditable?**

Yes. Each risk score and recommendation carries the factors that drove it, which signals pushed the score up and which pushed it down, so an underwriter can review, override, and justify the outcome. Every decision is reconstructable through a complete audit trail recording what data was read, which model version ran, the output, and who reviewed it. That trail supports internal governance and SUSEP supervision, and aligns with LGPD Article 20 on automated decisions.

**Does the risk engine replace the underwriting team?**

No. The engine augments underwriters, it never replaces the team. Clean low-risk cases can be auto-decided to free underwriter time, while ambiguous or high-exposure cases route to a human with supporting evidence attached. A calibrated model raises detection, consistency, and speed, but no engine eliminates fraud and adverse cases stay with a person. WIR's Underwriter Intelligence module lets underwriters spend their time on ambiguous and high-value cases rather than cross-referencing data.

**How long until the engine goes into production?**

WIR structures deployment as a one-time setup that runs 3 to 12 months, with a fixed price, clear scope, and KPIs agreed before the work starts. The work is scoping lines and use cases, integrating with current systems, calibrating to the manual and appetite, testing against historical submissions, then going live. This is an integration on top of the existing core, not a system migration, so policy administration and premium booking continue without interruption.`
  },
  {
    slug: "precificacao-dinamica-seguros-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Dynamic insurance pricing with an AI layer",
    sub: "How insurers automate real-time, risk-adjusted P&C pricing with an external AI layer on top of the core, calibrated to appetite and auditable under LGPD. See how.",
    author: "WIR Innovation", role: "Team",
    time: "12 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers automate real-time, risk-adjusted P&C pricing with an external AI layer on top of the core, calibrated to appetite and auditable under LGPD. See how.",
    body: `### What dynamic insurance pricing with an AI layer means

Dynamic insurance pricing with AI is the practice of calculating the premium (prêmio) in real time from a multi-factor risk score for the individual risk, rather than reading it off a fixed rate table. The premium reflects the specific exposure of each case and updates as data, loss experience, and risk appetite (apetite de risco) change. For Brazilian Seguros e Danos (P&C) insurers, this matters most in commercial and specialty lines (ramos) such as property, engineering, transport, and liability, where each risk is assessed individually and a single static table cannot capture the spread of exposures.

The buyer for this is an underwriting (subscrição) lead, a product head, or an innovation team deciding whether to automate the pricing stage of the quotation and underwriting journey. The shift they are weighing is from periodic table updates, applied by hand and prone to underwriter-to-underwriter variance, toward a priced quote that comes back firm and risk-adjusted in the moment the broker (corretor) submits it.

An external AI layer makes this possible without touching the actuarial core. It sits on top of the insurer's existing core system and actuarial engine, connects by API, quotation portal, or document upload, structures the incoming submission, scores the risk, applies the insurer's own pricing logic to that score, and writes the decision back with a full audit trail. The actuarial team still owns the rating basis and the technical premium. The layer automates how that policy is applied to each quote, calibrated to the insurer's underwriting manual (manual de subscrição). This is the WIR posture, the AI layer for insurance, on top of the systems the insurer already runs, never in their place. It does not carry risk and it is not an actuary.

### How the risk-adjusted premium is calculated in real time

Dynamic pricing is one stage in a connected sequence, fed by the stages before it and feeding the decision after it. The journey runs in six stages. First, multichannel intake normalizes every submission that arrives by API, broker portal, email, or uploaded document into a single structured record, so nothing has to be re-keyed. Second, intelligent document reading uses Machine Learning and document AI to extract the insured data, the object at risk, location, occupancy, values at risk (importância segurada), and prior loss history from unstructured PDFs and spreadsheets. Third, broker enrichment and scoring adds external and internal context such as location exposure, sector, prior claims, and compliance checks, and produces a completeness score so incomplete submissions are flagged or auto-completed.

The fourth stage is the risk and fraud Machine Learning engine, which produces a multi-factor risk score for the individual risk by combining the structured submission, the enrichment data, and the insurer's historical loss patterns, scoring fraud and anomaly signals in the same pass. The fifth stage is dynamic pricing itself, and it is the focus of this guide.

Here the premium is derived from the risk score, not read off a fixed table. The technical premium, the prêmio puro or technical rate, comes from the actuarial core or the rating tables the actuarial team owns. The AI layer applies the multi-factor adjustment to that technical base in real time, per the insurer's underwriting manual. Pricing is multi-factor, because dozens of correlated variables such as object, location, occupancy, values at risk, deductible (franquia), coverage scope, loss history, and sector influence the premium at once, which a static table cannot do. Pricing is calibrated to risk appetite, so risks outside appetite are loaded, referred, or declined rather than priced into the book silently. Pricing is real time, so the broker receives a firm, risk-adjusted number in the moment instead of waiting for manual rating. Pricing is consistent, because the same risk profile yields the same premium every time, removing underwriter-to-underwriter variance. The layer can express the premium with the commercial levers the insurer allows, such as commission, discount bands, and loadings, all bounded by the insurer's own policy so nothing is priced outside the manual.

The sixth stage is decision and prioritization with an audit trail. The layer routes the quote straight-through for clean, in-appetite, in-authority risks, and refers cases that need human judgment to an underwriter with the score, the priced premium, and the contributing factors attached. Every quote carries a full audit trail of the data used, the model version, the factors that drove the score and the price, and the decision path. The result is a premium that reflects the true exposure of the individual risk, calculated automatically, while the actuarial rating basis and the risk itself remain entirely with the insurer.

### How to deploy dynamic pricing as an external layer

Deploying dynamic pricing as an external AI layer is additive and reversible. It consumes data the insurer already produces and returns structured output the insurer's systems already understand, so there is no core migration and no IT project for the insurer's team to run. The contrast is with swapping a core insurance system, a multi-year, high-risk program that IT and legacy-system limitations frequently block. According to BCG, 70% of insurers do not execute innovation precisely because of IT limitations, which is the reason an external layer matters here.

A practical sequence runs in six steps. The first is scope and line selection: pick a starting ramo where pricing pain is highest and volume justifies automation, often a high-frequency line such as auto or a high-friction specialty line such as property, then define the journey to automate and the SLA target. The second is integration with the core, connecting the layer to the core and the broker channel by API, portal, or upload, where the core stays the system of record, data flows in, and structured priced quotes and decisions flow back. The third is calibration to the underwriting manual and risk appetite, encoding the insurer's underwriting rules, appetite boundaries, authority limits, referral triggers, and pricing levers. The technical rating basis comes from the actuarial team, and the layer is calibrated to apply it, which is what makes the priced quote the insurer's own policy expressed automatically rather than a black box.

The fourth step is testing and back-testing, running the model against historical submissions and known outcomes, comparing priced premiums against the existing table and against realized losses, and tuning until pricing is consistent, in-appetite, and explainable. The fifth is a controlled go-live, starting in a shadow or assisted mode where the layer prices and the underwriter confirms, then expanding straight-through authority as confidence builds while keeping human referral for out-of-appetite and high-value risks. The sixth is continuous operation and monitoring of pricing accuracy, loss ratio by segment, conversion and SLA, model drift, and exception rates, recalibrating as loss experience and appetite evolve. Setup runs 3 to 12 months as a fixed-scope implementation with KPIs agreed before start, after which the platform moves into continuous operation. Throughout, the actuarial core is never touched and the insurer runs no IT project of its own.

### Governance, explainability, and LGPD

Automated pricing in Brazil must be explainable, auditable, and compliant, and those requirements shape how the layer is built rather than being added afterward. Every premium has to be traceable to the factors that produced it, which data, which risk-score drivers, which loading or discount, and which model version. A price an underwriter or auditor cannot reconstruct is not acceptable for a regulated technical premium, so the layer surfaces the contributing factors for each quote. Each quote also carries a full audit trail of inputs, enrichment sources, score, priced premium, decision path, timestamps, and the policy version applied, which supports internal audit, SUSEP supervision, and dispute resolution.

LGPD (Lei Geral de Proteção de Dados, Lei nº 13.709/2018) governs the personal data that pricing uses. It requires a lawful basis for processing, purpose limitation, and data-subject rights, and its Article 20 gives the data subject the right to request review of decisions taken solely on the basis of automated processing that affect their interests, which applies directly to automated underwriting and pricing. This is exactly why explainability and a human-referral path are designed in. The full text of the law is available from the official Planalto source, and the data-protection authority publishes guidance through the ANPD portal. SUSEP supervises conduct in the insurance market through its official channel.

Submission data, enrichment data, and priced quotes are encrypted in transit and at rest, because the layer handles sensitive personal and risk data across the whole journey. Governance is ultimately anchored in one fact: the model applies the insurer's own underwriting manual and actuarial rating basis. The insurer remains accountable for the price and the risk, and the layer makes that policy faster and more consistent while keeping it explainable and auditable. Dynamic pricing does not replace the actuarial core. It automates the application of it.

### How WIR automates dynamic pricing

WIR Innovation is the AI layer for insurance, an external AI platform that automates the quotation and underwriting journey on top of the insurer's existing systems in Brazil. It is 100% external, with no load on the insurer's IT and no core migration, and its Machine Learning is calibrated to each insurer's risk appetite and underwriting manual. WIR is not an insurer, a broker, or an MGA, and it does not carry risk. It automates the pricing step per the insurer's own risk-acceptance policy, and the actuarial team keeps the rating basis and the technical premium.

Two modules carry most of the pricing work. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on risk analysis and business development rather than manual rating. Smart Sales is distribution intelligence that maps the portfolio by client and product, scores upsell and next-best-action, and runs multi-channel campaigns with an attribution trail, so penetration and retention grow together. Real-time dashboards and analytics give a proactive view of in-flight deals and the pipeline. In WIR's six-stage platform flow, dynamic pricing produces the risk-adjusted premium as an instant output, then the decision stage returns a quote, an automatic decline, or an escalation to a human, always with an explanation, writing back to the policy core with a full audit trail.

The competitive context is concrete. The Seguros e Danos market grows double digits per year, while company structure does not keep pace with that acceleration. Deloitte finds underwriters spend 40% of their time on administrative tasks, Capgemini reports that 60%+ of brokers choose an insurer by response speed, and Gartner estimates corporate teams lose 20-30% of their time organizing unstructured data. Real-time, risk-adjusted pricing addresses each of those pressures directly. WIR's only public traction at this stage is a first POC in execution with a global insurer in the Transport line. Every decision the platform makes is explainable and returns a full audit trail, and data is encrypted at every step and LGPD compliant. The AI layer for insurance. On top of the systems the insurer already runs, never in their place. To see where it fits, the team can map the pricing journey through a conversation with WIR.

### Frequently asked questions

**How is the premium calculated from the risk score?**

The premium is derived from a multi-factor risk score, not read off a fixed table. WIR's risk and fraud Machine Learning engine scores the individual risk by combining the structured submission, enrichment data, and historical loss patterns. The AI layer then applies the insurer's own technical premium and pricing logic to that score in real time, calibrated to the underwriting manual. Dozens of correlated variables, such as object, location, occupancy, values at risk, and loss history, influence the premium at once.

**Does dynamic pricing replace the insurer's actuarial core?**

No. Dynamic pricing does not replace the actuarial core. It automates the application of it. WIR is an external AI layer on top of the insurer's existing systems, with no core migration and no IT project for the insurer to run. The actuarial team still owns the rating basis and the technical premium. The layer applies that policy to each quote in real time, calibrated to risk appetite. WIR is not an insurer, broker, or MGA, and it does not carry risk.

**Is the AI-generated price explainable and auditable?**

Yes. Every priced quote is explainable and carries a full audit trail. WIR surfaces the contributing factors behind each premium, which data, which risk-score drivers, which loading or discount, and which model version produced it. A price an underwriter or auditor cannot reconstruct is not acceptable for a regulated technical premium. The trail supports internal audit, SUSEP supervision, and dispute resolution, and it underpins the LGPD Article 20 right to request review of an automated decision. Data is encrypted at every step.

**Is pricing kept calibrated to the insurer's risk appetite?**

Yes. WIR's Machine Learning is calibrated to each insurer's risk appetite and underwriting manual. Risks outside appetite are loaded, referred, or declined rather than priced into the book silently. The Underwriter Intelligence module applies real-time scoring calibrated to appetite, with automatic routing by appetite and exposure. Commercial levers such as commission, discount bands, and loadings stay bounded by the insurer's own policy, so nothing is priced outside the manual. The insurer remains accountable for the price and the risk.

**How long until dynamic pricing goes into production?**

Setup runs 3 to 12 months as a fixed-scope implementation, with KPIs agreed before start, after which the platform moves into continuous operation. The sequence covers line selection, integration by API or portal, calibration to the underwriting manual, back-testing against historical submissions and realized losses, and a controlled go-live in shadow or assisted mode. Straight-through authority expands as confidence builds, while human referral stays for out-of-appetite and high-value risks. The actuarial core is never touched.`
  },
  {
    slug: "processar-email-cotacao-automatico-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "How to automatically process insurance quote e-mails with AI",
    sub: "How an external AI layer reads insurance quote e-mails and attachments, extracts and validates the data, and feeds P&C underwriting without replacing the core.",
    author: "WIR Innovation", role: "Team",
    time: "10 min", date: "02 · Jun · 2026",
    metaDesc: "How an external AI layer reads insurance quote e-mails and attachments, extracts and validates the data, and feeds P&C underwriting without replacing the core.",
    body: `### What it means to process quote e-mails with an AI layer

To automatically process insurance quote e-mails with AI means putting an external intelligence layer over the mailbox the insurer already publishes, so the layer reads each inbound message, opens its attachments, extracts the risk fields, validates them, and hands clean structured data to the existing quotation and underwriting flow. In Brazilian Seguros e Danos (P&C), the quotation journey for mid-market and corporate risks still begins in an inbox. A corretor (broker) sends a cotação (quote request) as free text, with the real data buried in a proposta, a spreadsheet of locations or fleet schedules, a prior apólice (policy), or a scanned PDF. Nothing arrives as structured data.

That intake stage is where time and accuracy leak. Someone in underwriting operations opens each message, downloads the attachments, interprets inconsistent layouts, and re-keys the fields into the core before a subscritor (underwriter) can even look at the risk. Manual re-keying is slow and prone to transposing a CNPJ or mis-entering an importância segurada (sum insured), and every error found later forces re-work and re-quoting.

The reader who should consider this is an underwriting lead or innovation head whose team is drowning in inbox submissions. The cost is structural, not cosmetic. Capgemini reports that 60%+ of brokers choose an insurer by response speed, so a quote that comes back in hours while a competitor answers in minutes simply loses the business. Gartner estimates that corporates lose 20-30% of their time organizing unstructured data, and an insurance submission inbox is exactly that problem at scale. WIR is the AI layer for insurance, and this guide stays on the intake and reading stages, where the e-mail becomes structured data.

### How an e-mail becomes structured data in the journey

The journey runs in six stages, but the work specific to e-mail lives in the first two. Stage one is multichannel intake. The AI layer connects to the insurer's existing quote mailbox, and to any portal or API channels, and captures every inbound submission automatically. For each message it pulls the e-mail body, the sender and broker identity, and all attachments, whether PDF, DOCX, XLSX, images, or scanned documents. Nothing waits for a human to open it. The submission is logged, time-stamped, and queued the moment it arrives, which is what makes a fast SLA possible in the first place.

Stage two is intelligent document reading, and it is the core of this use case. The layer first reads the e-mail body in natural language to extract intent and any inline data, such as the ramo (line of business), the segurado (insured), the requested coverages, dates, and special instructions written in prose. It then reads every attachment with document AI, including OCR for scanned and image-based files, so it can interpret proposals, spreadsheets, prior policies, and schedules regardless of layout. From that reading it maps the content to the underwriting data model: CNPJ and CPF, activity code, addresses and locations, importância segurada per item, occupancy and construction for property, fleet and use for auto, claims history, and the coverages and limits requested.

Validation is the step that makes automation safe. Each field is checked for format and check-digit, for internal consistency so that sums reconcile and locations are complete, against reference data, and for completeness against what the ramo requires. Missing or low-confidence fields are flagged for review or for an automated follow-up to the broker, rather than passing bad data downstream. The result is a clean, structured submission record where every extracted field traces back to the exact source document and position it came from. The later stages then enrich the submission with external and internal context, score it against the insurer's risk appetite and underwriting manual, price it with the insurer's own rating logic, and either issue a quote or route the case to a subscritor with a full audit trail. At the end of stage two, an e-mail that arrived as prose plus a PDF is a validated, structured quote, and the underwriter starts from clean data instead of from an inbox.

### How to deploy e-mail capture as an external layer

Deployment is an integration, not a migration. The first move is to scope a single high-volume line of business with painful intake, commonly Patrimonial, Auto frota, or Transporte, and to define the target fields, the validation rules, and what good extraction looks like for that ramo. Narrow scope proves value fast and de-risks the program, because the insurer can see results on one line before scaling to others. The second move is to connect the channels. The layer points at the existing quote inbox, and at any portal or API feeds, read-only at first. Brokers keep sending to the same address they always have, with no new portal and no behavior change.

Integration with the core comes next. The structured output is mapped to the insurer's quotation and core fields, and the handoff is agreed as an API call, a controlled file drop, or RPA into the existing screen. The core stays the system of record, and the layer feeds it. Before go-live, the insurer runs historical and live e-mails through the layer in shadow mode, measures extraction accuracy and validation catch-rate per field, and tunes the model while keeping humans in the loop on low-confidence cases. Go-live is progressive: the insurer starts by auto-processing the clean, high-confidence submissions and routing the rest to people, then widens the automatic band as accuracy proves out. After go-live the layer is operated continuously, monitoring extraction quality, model drift, new document formats, and broker feedback, and it improves as it sees more of the insurer's real traffic.

A full setup runs 3 to 12 months, with fixed scope and KPIs agreed before the work starts, followed by continuous operation in production after go-live. None of this is a core program. The insurer modernizes the intake and reading experience without touching policy administration or the rating engine, which removes the number-one objection underwriting teams raise against automating the journey.

### Governance, explainability, and LGPD

Automated processing is only defensible when governance is built into the design rather than added later. Validation of extracted data is the foundation: every field is checked, and low-confidence values are flagged rather than trusted, with a human-in-the-loop path on exceptions. Explainability is the second pillar. Each extracted field traces back to the exact source document and position it came from, and each downstream classification exposes its drivers, which is what lets an insurer explain and document an automated decision to an auditor or to SUSEP. SUSEP supervises the Brazilian P&C market and expects insurers to be able to show how risks are assessed and priced.

Data protection runs through every step. Submissions carry personal and commercial data, so the layer encrypts data in transit and at rest across intake, reading, and handoff. Processing is governed by Brazil's Lei Geral de Proteção de Dados, the LGPD, which is set out in the [Lei nº 13.709/2018](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm) and supervised by the [ANPD](https://www.gov.br/anpd). Processing must rest on a valid legal basis and follow purpose limitation and data minimization. For automated decisions specifically, the LGPD gives the data subject the right to request review of decisions taken solely on automated processing, which is exactly why an explainable, auditable layer with a human-in-the-loop path matters for automated quoting. Every WIR decision is explainable, returns a full audit trail, and runs on data that is encrypted at every step and LGPD compliant.

### How WIR processes quote e-mails

WIR is the AI layer of insurance in Brazil. It sits on top of the systems the insurer already runs, never in their place. For quote e-mails, this means WIR listens to the insurer's existing mailbox and channels, reads the body and every attachment with intelligent document reading, extracts the fields with high precision, validates them, and feeds the structured result into the existing quotation and underwriting flow. There is no new address for brokers, no core migration, and no IT project the insurer's team has to run. The core stays the system of record, and WIR writes back the structured submission and the audit trail.

Two modules carry the work. Underwriter Intelligence automates the quotation journey per the insurer's own risk policy, with real-time Machine Learning scoring calibrated to the insurer's risk appetite and underwriting manual, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on risk selection instead of triage and data entry. Smart Sales adds distribution intelligence, mapping the portfolio by client and product, scoring upsell and next-best-action, and running multi-channel campaigns with an attribution trail. Real-time dashboards give a proactive view of in-flight deals and the underwriter queue. BCG finds that 70% of insurers do not execute innovation because of IT limitations, and an external layer is built precisely to remove that blocker.

WIR was founded in 2025, built with Mahway, a Venture Builder in California, and Avante, a Venture Studio in Brazil. Its first POC is in execution with a global insurer in the Transport line, and that is the only traction WIR claims today. The AI layer for insurance. On top of the systems the insurer already runs, never in their place. To map how this would read your insurer's quote inbox, the next step is a working conversation with the WIR team.

### Frequently asked questions

**Does the AI layer read the e-mail body and quote attachments?**

Yes. The AI layer reads the e-mail body in natural language and every attachment with intelligent document reading, including OCR for scanned files. It interprets proposals, spreadsheets, prior policies, and schedules regardless of layout, then maps the content to the underwriting data model: CNPJ, activity, locations, sum insured, coverages, and limits. WIR extracts these fields with high precision and feeds the structured result into the existing quotation flow, never replacing the mailbox.

**Do we need to change our e-mail or core to use this?**

No. Deployment is an integration, not a migration. WIR points at the existing quote inbox and at any portal or API feeds, read-only at first, so brokers keep sending to the same address with no behavior change. The structured output maps to the insurer's quotation and core fields by API call, controlled file drop, or RPA. The core stays the system of record. BCG finds 70% of insurers do not execute innovation because of IT limitations.

**Is data extracted from the e-mail validated before it moves on?**

Yes. Validation is the step that makes automation safe. Each extracted field is checked for format and check-digit, for internal consistency so sums reconcile, against reference data, and for completeness against what the line of business requires. Missing or low-confidence fields are flagged for human review or an automated follow-up to the broker, rather than passing bad data downstream. The result is a clean, structured submission where every field traces back to its source document.

**Is e-mail processing LGPD compliant?**

Yes. Processing is governed by Brazil's Lei Geral de Proteção de Dados and rests on a valid legal basis, purpose limitation, and data minimization. Submissions carry personal and commercial data, so WIR encrypts data in transit and at rest across intake, reading, and handoff. Every decision is explainable and returns a full audit trail, and each extracted field traces to its exact source, which lets an insurer document an automated decision to an auditor or to SUSEP.`
  },
  {
    slug: "proxima-melhor-acao-seguradoras-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Next-best-action for insurers with an AI layer",
    sub: "How insurers automate next-best-action and upsell scoring with an external AI layer on top of existing systems, no core replacement. See how Smart Sales works.",
    author: "WIR Innovation", role: "Team",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers automate next-best-action and upsell scoring with an external AI layer on top of existing systems, no core replacement. See how Smart Sales works.",
    body: `### What next-best-action for insurers with an AI layer means

Next-best-action for insurers with AI is a distribution capability that reads an insurer's existing portfolio, scores which client should be offered which product next and through which corretor (broker), and routes that action to the channels the commercial team already uses. It runs as an external AI layer on top of the insurer's current CRM and policy systems, so it reads from them without replacing them. The reader who should care is the distribution or commercial lead who knows there is white space in the book but cannot see it at the account level.

The problem this solves is the invisible pipeline. Brazilian Seguros e Danos (P&C) distribution runs overwhelmingly through independent brokers, and the book an insurer holds is in practice a federation of broker relationships, legacy policy records, and CRM fields that were never built to answer one question: which account, with which broker, deserves which offer next, and why. Policy systems store contracts by ramo (line of business) and renewal date, not by household or commercial account, so a single insured may hold auto with one broker, property with another, and no life or liability cover at all, while nothing in the stack surfaces that gap. Without an explicit score on the next action, commercial teams fall back on renewal lists and gut feel, and the highest-propensity account gets the same generic outreach as a dead one. The pressure to fix this is real because the Seguros e Danos market grows double digits per year, which means even small penetration gains are material. WIR is the AI layer for insurance built for exactly this account-level intelligence.

### How upsell and next-best-action scoring works

The work happens in four stages, layered on top of the systems the insurer already runs. First comes portfolio mapping across client and product. The layer ingests portfolio, policy, claims, and CRM data through APIs or scheduled extracts, resolves the same insured across ramos and across brokers, normalizes the product taxonomy, and builds a client by product matrix that exposes the white space. This is also where duplicate CPF or CNPJ records and inconsistent broker codes get reconciled, since the score is only as good as the map underneath it.

Second, Machine Learning models score each account for upsell propensity and rank the next-best-action. The score is calibrated to the insurer's risk appetite and underwriting manual, so the recommended action respects underwriting rules and product margin, not propensity alone. Next-best-action answers a sequenced question, not only whether an opportunity exists but which single action, for this account, through which broker, carries the highest expected value now. This is the same scoring discipline used on the automated underwriting journey, applied to the distribution side.

Third, scored actions become multi-channel campaigns. Each recommendation is routed to the right place, a broker task list, a commercial team queue, direct digital outreach, or a partner channel, and every step is logged. The attribution trail records which signal generated the recommendation, which broker or channel acted, which touch preceded the quotation, and which one closed the sale. Fourth, penetration and retention grow together rather than as separate programs. An account that holds more products with the insurer is structurally stickier, and acting before renewal or at a life or business event lifts both renewal rates and products per account. Penetration and retention are two readouts of the same account-level engine.

### How to deploy distribution intelligence as an external layer

Deployment is an integration, not a migration. The layer leaves the system of record untouched, the CRM stays the CRM and the policy system stays the policy system, and it connects through APIs or scheduled extracts rather than a full platform rebuild. That stance matters in a market where roughly 70% of insurers do not execute innovation because of IT limitations, according to BCG. An external layer sidesteps that constraint because nothing in the core has to change for it to run, and if the layer is switched off the core continues to operate exactly as before.

The path runs in clear steps. The insurer first scopes the lines and books where white space is largest and data is cleanest, typically auto plus patrimonial, where account overlap is high, and fixes the success metric up front, whether that is products per account, cross-sell conversion, or retention on multi-product accounts. Integration comes next, read-only ingestion from the policy core and CRM, with recommendations flowing to the channels and to the CRM activity layer rather than back into the contract tables of the system of record. Then comes calibration, tuning the scoring to the underwriting manual, risk appetite, and margin per ramo so the recommended actions are sellable and underwritable. Testing follows, backtesting scores against historical conversions and running a champion challenger or holdout group so the attribution trail can prove incremental lift rather than correlation. Go-live releases prioritized lists and campaign triggers to a pilot set of brokers and commercial teams with humans kept in the loop, and continuous operation retrains the models on outcomes, monitors for drift, and expands to more ramos as confidence grows. With WIR, this setup runs 3 to 12 months as a fixed-scope engagement with KPIs agreed before it starts, followed by a continuous operation phase after go-live.

### Governance, attribution trail, and LGPD

Automated scoring that influences commercial offers has to be explainable and auditable, and in Brazil that is a regulatory expectation, not a preference. Each next-best-action score should be traceable to its drivers, the features that pushed propensity up, so commercial and compliance teams can justify why an account was prioritized. Opaque scoring is both a governance risk and a trust risk, which is why the layer is built to explain its decisions rather than to hide them.

The attribution trail does double duty here. The same log that proves campaign effectiveness serves as the audit record of who was contacted, on what basis, through which channel, and with what result, which supports both performance review and regulatory defensibility. All of this sits under Brazil's Lei Geral de Proteção de Dados, the LGPD, which governs the personal data processed in portfolio mapping and scoring. The layer must operate on a valid legal basis, honor data-subject rights, minimize data to what the scoring needs, and log its processing, and the LGPD gives data subjects the right to request review of decisions made solely on automated processing, which is why human-in-the-loop and explainability are not optional for automated commercial scoring. The full text of the law is available from the official Brazilian government source. Every decision is explainable and returns a full audit trail, and data is encrypted at every step.

### How WIR automates next-best-action with Smart Sales

WIR delivers this through Smart Sales, its distribution-intelligence module, and as an external AI layer it sits on top of the insurer's existing systems and never replaces the core. Smart Sales maps the portfolio across client and product, scores upsell and next-best-action with Machine Learning calibrated to the insurer's risk appetite and underwriting manual, and runs multi-channel campaigns with an attribution trail, so penetration and retention grow together. It prioritizes accounts and brokers rather than becoming the place where policies are issued or where the customer record lives, which is the distinction that keeps the program low-risk and reversible. The AI layer for insurance, on top of the systems the insurer already runs, never in their place.

Smart Sales runs alongside Underwriter Intelligence, which automates the quotation journey per the insurer's risk policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, plus real-time dashboards over the in-flight pipeline. WIR is an InsurTech and the AI layer of insurance in Brazil, not an insurer, broker, or MGA, and it does not carry risk. Its first traction is a POC in execution with a global insurer in the Transport line, and every figure here on the Brazilian market comes from named sources rather than from WIR's own book. To see where next-best-action would prioritize accounts and brokers in your portfolio, book a conversation with the WIR team at wirinnovation.ai.

### Frequently asked questions

**How is the next-best-action score calculated?**

Machine Learning models score each account for upsell propensity and rank the single highest-value action, calibrated to the insurer's risk appetite and underwriting manual. Before scoring, the layer maps the portfolio across client and product, resolving the same insured across lines of business and brokers. The score respects underwriting rules and product margin, not propensity alone, and every recommendation is explainable and traceable to the drivers that pushed propensity up.

**Does distribution intelligence replace the insurer's CRM?**

No. Distribution intelligence runs as an external AI layer on top of the existing CRM and policy systems, reading from them without replacing them. WIR's Smart Sales prioritizes accounts and brokers rather than becoming the place where policies are issued or the customer record lives. Deployment is an integration through APIs or scheduled extracts, not a migration. If the layer is switched off, the core continues to operate exactly as before, which keeps the program low-risk and reversible.

**Do the multi-channel campaigns have an attribution trail?**

Yes. Each scored action routes to a broker task list, commercial queue, digital outreach, or partner channel, and every step is logged in an attribution trail. The trail records which signal generated the recommendation, which broker or channel acted, which touch preceded the quotation, and which one closed the sale. That same log doubles as the audit record of who was contacted and on what basis, supporting both performance review and regulatory defensibility under the LGPD.

**How do penetration and retention grow together with this layer?**

An account that holds more products with the insurer is structurally stickier, so penetration and retention are two readouts of the same account-level engine. Smart Sales acts before renewal or at a life or business event, which lifts both products per account and renewal rates rather than running them as separate programs. Because Brazil's Seguros e Danos market grows double digits per year, even small penetration gains on existing accounts are material.

**How long until Smart Sales goes into production?**

With WIR, setup runs 3 to 12 months as a fixed-scope engagement with KPIs agreed before it starts, followed by a continuous operation phase after go-live. The path covers scoping the lines with the largest white space, read-only integration with the core and CRM, calibration to the underwriting manual, backtesting against historical conversions, and a piloted go-live with humans kept in the loop. Models then retrain on outcomes and expand to more lines as confidence grows.`
  },
  {
    slug: "reduzir-tempo-resposta-cotacao-corretor-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "How to reduce quote response time for brokers with AI",
    sub: "How insurers reduce quote response time for brokers with an external AI layer and a visible SLA, on top of existing systems, never replacing the core.",
    author: "WIR Innovation", role: "Team",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers reduce quote response time for brokers with an external AI layer and a visible SLA, on top of existing systems, never replacing the core.",
    body: `### What reduces quote response time with an AI layer

To reduce quote response time for brokers with AI, a Brazilian P&C insurer (Seguros e Danos) does not rebuild its core. It adds an external AI layer on top of the systems it already runs, and that layer compresses the time between the moment a submission arrives and the moment the corretor (broker) gets an answer. The mechanism matters more than any promise. A quote returned while the broker is still in-flow tends to convert. A quote returned a day later arrives after a competing carrier has already shown its number.

Response speed is a primary commercial lever in this market, not a back-office nicety. According to [Capgemini's World Insurance Report](https://www.capgemini.com/insights/research-library/world-property-and-casualty-insurance-report/), 60%+ of brokers choose an insurer by response speed. The corretor controls distribution in Brazilian P&C and routinely shops the same risk to several carriers, so the one that returns a clean, consistent cotação (quote) first earns a structural advantage on attention rather than price. A visible service level on the response window compounds this. When a broker knows an insurer reliably answers within a stated window, more submissions route to it by default.

The case for an external layer rather than a core migration is straightforward. Deloitte finds underwriters spend 40% of their time on administrative tasks, time that an AI layer can return to risk judgment. BCG reports that 70% of insurers do not execute innovation because of IT limitations, which is exactly the constraint an additive layer removes, since it carries no load on the insurer's IT and requires no system migration. WIR is the AI layer for insurance. On top of the systems the insurer already runs, never in their place.

### Where the automated journey compresses response time

The manual quotation journey leaks time at every handoff, and an automated journey closes each leak in sequence. The flow runs in six stages. First, multichannel intake with automatic validation captures submissions from email, broker portal, API, or upload into one structured queue, so no human triage has to start the clock. Second, intelligent document reading uses Machine Learning to extract structured fields from PDFs, inspection (vistoria) reports, asset schedules, and financial documents, which removes the slow re-keying step and the errors that bounce a case back later.

The middle of the journey is where senior underwriter time is usually consumed by lookups instead of judgment. Third, broker enrichment and context cross-references external and historical sources, CNPJ, broker history, exposure, and credit, then scores the submission so the underwriter sees a complete, comparable picture rather than chasing missing fields. Fourth, a risk and fraud engine, a multi-factor ML model calibrated to the insurer's risk appetite and underwriting manual, produces a risk score and probability and flags fraud signals, applying the same rules consistently across every case.

The closing stages turn analysis into a fast, recorded answer. Fifth, dynamic pricing calculates the risk-adjusted premium (prêmio) with the insurer's own rating logic, loadings, and discounts, with instant output. Sixth, decision and prioritization returns a quote, an automatic decline, or an escalation to a human, always with an explanation, writing back to the policy core and returning the audit trail. Straightforward risks move to instant quoting while genuinely complex ones route to senior underwriters with a visible SLA and an underwriter queue. The net effect lifts throughput without adding headcount, which matters in a market that, per company context, grows double digits per year while underwriting capacity does not keep pace.

### How to deploy the external layer to speed up the response

Deployment is additive, so the insurer keeps its system of record and gains an intelligence layer over it. A practical sequence starts with scope. The insurer picks one or two high-volume lines, patrimonial or auto frota, where slow quote turnaround visibly costs broker business, and defines the response window it wants to make visible. Next comes integration with the existing core through API, portal, or upload, with the quoting and policy system staying the source of truth. Deployment is purely additive. The insurer keeps its system of record and gains an intelligence layer over it, with no core migration and no IT project its own team has to run.

Calibration is what makes the speed gain safe. The scoring and pricing models are tuned to the insurer's own underwriting manual and risk appetite, not a generic template, so faster never means off-appetite. The insurer then tests in parallel, running the automated journey alongside the manual one to compare decisions and turnaround and to tune the thresholds for auto-quote versus escalation. Go-live publishes the response window to brokers so the speed advantage converts into routed volume, and continuous operation monitors model performance, drift, and decision quality, recalibrating as appetite and loss experience change.

Timelines are concrete rather than open-ended. Setup runs 3 to 12 months and covers automations, integrations, tests, and go-live adjustments at a fixed price with KPIs agreed before the work starts. After go-live, continuous operation runs the platform in production under a billing model adjusted per client. For market context that frames the case for this kind of build, see WIR's [insurance intelligence](https://wirinnovation.ai) coverage of the Brazilian Seguros e Danos market.

### Governance, explainability, and LGPD

Faster decisions cannot mean opaque decisions. Every automated quote, decline, or escalation carries the reasons and the data behind it, and the platform returns a complete audit trail. That trail is what lets underwriting, audit, and SUSEP supervision reconstruct why a decision was made, and it is also what lets the insurer trust the model enough to auto-quote in the first place. Human underwriters keep authority over escalated complex risks, so automation widens capacity without removing judgment from the cases that need it.

The data posture is built for Brazilian regulation. Insurance submissions carry personal and sometimes sensitive data, so the layer keeps data encrypted at every step, in transit and at rest, processes only what is necessary, and supports data-subject rights under the [LGPD (Lei 13.709/2018)](https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm). Automated decisions that affect a person engage the law's provisions on automated decision-making, including the right to request review, in line with [ANPD](https://www.gov.br/anpd/pt-br) guidance. Because the model encodes the insurer's own risk policy, an explainable automated journey supports [SUSEP](https://www.gov.br/susep/pt-br) supervision rather than complicating it.

### How WIR speeds up the response to brokers

WIR is an external AI layer that sits on top of the insurer's existing core, policy, and quoting systems and automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy. It is 100% external, with no load on the insurer's IT and no core migration, and it is not an insurer, broker, or MGA, so it never carries risk. Its Machine Learning is calibrated to each insurer's risk appetite and underwriting manual, and every decision is explainable, returns a full audit trail, and is LGPD compliant with data encrypted at every step.

Two modules do the work the broker feels. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on risk analysis and business development. Smart Sales adds distribution intelligence, mapping the portfolio by client and product, scoring upsell and next-best-action, and running multi-channel campaigns with an attribution trail. Real-time dashboards give a proactive view of in-flight deals and the pipeline, and the visible SLA gives the corretor a reliable answer to the question of when the quote arrives.

WIR's first traction is a POC in execution with a global insurer in the Transport line. The positioning holds across every engagement. WIR is the AI layer for insurance, on top of the systems the insurer already runs, never in their place, and the outcome it targets is the one the Capgemini figure points to. When the insurer answers faster and more consistently, it becomes the carrier brokers route to first.

### Frequently asked questions

**Why does response speed influence the broker's choice?**

Response speed is a primary commercial lever because the broker controls distribution and shops the same risk to several carriers. According to Capgemini, 60%+ of brokers choose an insurer by response speed. The corretor routinely sends the same submission to multiple carriers, so the insurer that returns a clean, consistent cotação first earns a structural advantage on attention rather than price. A quote returned while the broker is still in-flow tends to convert.

**Where does the manual journey lose the most time?**

The manual journey leaks time at every handoff, most heavily in re-keying documents and in senior underwriters doing lookups instead of judgment. Deloitte finds underwriters spend 40% of their time on administrative tasks. An AI layer closes each leak in sequence, reading PDFs, inspection reports, and schedules automatically, then cross-referencing CNPJ, broker history, exposure, and credit, so the underwriter sees a complete, comparable picture rather than chasing missing fields.

**Does the broker see the quote SLA?**

Yes. The automated journey publishes a visible service level on the response window, so the broker knows when a quote arrives. When an insurer reliably answers within a stated window, more submissions route to it by default. Straightforward risks move to instant quoting while genuinely complex ones escalate to senior underwriters with a visible SLA and an underwriter queue. Real-time dashboards give a proactive view of in-flight deals and the pipeline.

**Does speeding up the response require replacing the core?**

No. WIR is an external AI layer on top of the insurer's existing core, policy, and quoting systems, never a replacement. Deployment is purely additive, with no core migration and no IT project the insurer's team has to run. BCG reports 70% of insurers do not execute innovation because of IT limitations, which is exactly the constraint an additive layer removes since it carries no load on the insurer's IT. Setup runs 3 to 12 months.

**Does a faster response keep the decision explainable and auditable?**

Yes. Faster decisions do not mean opaque ones. Every automated quote, decline, or escalation carries the reasons and the data behind it, and the platform returns a complete audit trail. That trail lets underwriting, audit, and SUSEP supervision reconstruct why a decision was made. The Machine Learning is calibrated to the insurer's risk appetite and underwriting manual, data is encrypted at every step and LGPD compliant, and human underwriters keep authority over escalated complex risks.`
  },
  {
    slug: "roteamento-automatico-subscricao-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Automatic underwriting routing with an AI layer",
    sub: "How insurers automate submission triage with an external AI layer that routes by appetite and exposure, prioritizes the underwriter queue, and keeps a visible SLA.",
    author: "WIR Innovation", role: "Team",
    time: "12 min", date: "02 · Jun · 2026",
    metaDesc: "How insurers automate submission triage with an external AI layer that routes by appetite and exposure, prioritizes the underwriter queue, and keeps a visible SLA.",
    body: `### What automatic underwriting routing with an AI layer means

Automatic underwriting routing with AI is the stage where an external AI layer reads each incoming submission, scores it against the insurer's risk appetite and exposure bands, and sends it down the right path automatically: an instant quote, an automatic decline, or escalation to the right human subscritor (underwriter). It sits on top of the insurer's existing core and policy systems and connects through integration, so the core stays exactly where it is. This guide is written for the underwriting lead or innovation head who wants triage to be consistent and fast without running a core migration.

In Seguros e Danos (P&C), every case that arrives from the corretor (broker) channel has to be triaged before any pricing happens. Is the risk inside appetite, which ramo (line of business) and which authority level does it belong to, who should own it, and how urgent is it. When that triage is manual, the same failure modes recur. Cases land in the wrong queue and have to be re-routed, adding days. Work is picked up roughly first-in-first-out rather than by exposure or win probability, so high-value business waits behind noise. The corretor cannot tell whether a quote will come back in an hour or in three days. And two underwriters can read the same case and reach different appetite calls, which is both a conversion problem and a governance problem.

This matters in Brazil because volume keeps climbing. The Seguros e Danos market grows double digits per year, but company structure does not keep pace with that acceleration, so triage becomes a real bottleneck in the highest-volume lines. The pressure is well documented. Deloitte finds that underwriters spend 40% of their time on administrative tasks rather than risk judgment, and according to BCG, 70% of insurers do not execute innovation because of IT limitations. Automatic routing is the decision-and-prioritization stage that turns that pressure into consistent, auditable throughput, and it is exactly what WIR delivers as the AI layer of insurance.

### How routing by appetite and exposure works

Automatic routing is the final stage of a longer automated subscrição (underwriting) journey, and it only works because the stages before it have already structured the case. The pipeline runs in six stages. First, multichannel intake captures submissions from API, portal, and upload in whatever format the insurer and its corretores already use, registering each one with a timestamp that starts the SLA clock. Second, intelligent document reading extracts structured fields from proposals, schedules of values, and prior loss runs, which removes the re-keying that consumes underwriter time. Third, broker enrichment adds context and a score by cross-referencing external and internal sources such as CNPJ validation, prior policy history, and exposure data. Fourth, a risk and fraud engine, a multi-factor Machine Learning model calibrated to appetite and the underwriting manual, produces a risk score and flags anomalies. Fifth, dynamic pricing calculates a risk-adjusted premium (prêmio) within the parameters the insurer defines.

The sixth stage is decision and prioritization, and it is where the AI layer earns its place. Each submission is scored on two axes at once. The first axis asks whether the risk is inside the defined risk appetite (apetite de risco) for that ramo. The second axis asks where it falls in the exposure and authority band, meaning sum insured, line size, and accumulation. The combination of those two axes determines the path. A risk clearly inside appetite and inside the auto-quote thresholds takes the fast lane. A risk inside appetite but above an authority band goes to the correct senior underwriter. A risk outside appetite goes to decline or referral. Every routing decision carries the inputs and the rationale that produced it.

From that scoring, the layer returns one of three outcomes, each with a written reason. A clean submission that is inside appetite, inside exposure thresholds, and free of fraud flags can receive a quote automatically, which is the fast lane the corretor wants. A case that is clearly outside appetite or hits a hard knockout rule is declined and returned with the reason, so the corretor gets a fast and consistent no instead of silence. A borderline case, one above an authority band, missing data, or carrying a fraud signal, is escalated to a human with all the extracted data and the AI rationale attached.

Escalated cases do not land in an undifferentiated inbox. They enter a prioritized underwriter queue, where priority is computed from factors such as exposure, the win-probability score, expiry urgency, broker value, and the time already elapsed against the SLA. The right underwriter sees the right cases at the top, with context already in front of them. Every submission also carries a visible SLA timer from the moment of intake, so the underwriting team, and where exposed the corretor, can see exactly where a case stands. The net effect is consistency, because the same logic applies to every submission, plus speed for clean business and capacity spent where judgment is actually needed.

### How to deploy routing as an external layer

Deploying automatic routing as an external AI layer is a scoped, incremental program, not a core replacement and not a multi-year system overhaul. The contrast is the point. A core replacement is a high-risk, multi-year program that touches the system of record. An external AI layer reuses the existing stack, integrates rather than replaces, and can go live on a defined slice first. With WIR the setup runs 3 to 12 months as a one-time implementation with a fixed price, clear scope, and KPIs agreed before the work starts. Continuous operation follows after go-live, with a billing model adjusted per client.

A pragmatic rollout starts narrow. The first step is scope. Pick one ramo and one channel to begin with, for example patrimonial empresarial through the broker portal, and define the appetite rules, knockout rules, authority bands, and SLA targets that apply. The second step is integration with the core. Connect intake through API, portal, or upload, and connect the write-back to the policy system of record, deciding what is written automatically and what waits for human confirmation. There is no core change. The layer reads and returns.

The third step is the decisive one: calibration to the underwriting manual and risk appetite. The routing and scoring models are tuned to the insurer's own manual, appetite, and historical loss data, never to a generic template, and the thresholds for quote, decline, and escalation are set by the insurer's own risk policy. The fourth step is testing in shadow mode, running the layer in parallel on live submissions and comparing its routing against the underwriters' calls before any automated action goes external. The fifth step is a staged go-live, turning on straight-through processing for the safest band first and widening the auto-quote envelope as audit evidence accumulates. The sixth step is continuous operation, monitoring routing accuracy, false-escalation and false-auto rates, SLA adherence, and model drift, with underwriter overrides feeding back as a training signal. Brazil's structural reason to favor this path is plain. Because 70% of insurers cite IT limitations as the blocker to innovation, the external-layer approach delivers the automation without the core program, and our market-intelligence guide on inteligencia-seguros covers that backdrop in more depth.

### Governance, explainability, and LGPD

Every routing and decision the layer makes is explainable and returns a full audit trail, and in the Brazilian frame that is not optional. Each quote, decline, or escalation carries the inputs and the rationale that produced it, so the underwriting team can reconstruct exactly why any case took the path it did. That documented rationale supports both internal governance and the supervision expectations of SUSEP, the supervisor of the private insurance market, around sound and documented underwriting. The audit trail is what separates an auditable decision from a black box.

The data framing follows LGPD, the Lei Geral de Proteção de Dados, Lei 13.709/2018. Insurance submissions carry personal and sometimes sensitive data, so the layer processes it on a lawful basis with data minimization, purpose limitation, and security. Article 20 of the LGPD gives the data subject the right to request review of decisions taken solely on automated processing that affect their interests, which is precisely why an automated routing or underwriting decision needs a documented rationale and a human-review path. The ANPD, the Autoridade Nacional de Proteção de Dados, is the supervisory authority. Data is encrypted at every step, in transit and at rest, across intake, reading, scoring, and write-back.

The model does not impose an external risk view. It encodes the insurer's own appetite and manual, so the insurer remains the risk owner and the decision authority on every referred case. Escalation to a human is a governance feature, not only an operational one, because borderline and high-exposure cases always reach a person. WIR is not an insurer, a broker, or an MGA, and it does not carry risk. It automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy, with decisions that are explainable, auditable, LGPD compliant, and encrypted at every step.

### How WIR automates routing and the underwriter queue

WIR is the AI layer for insurance. On top of the systems the insurer already runs, never in their place. It is an external AI layer for insurers and brokers in Brazil that performs the decision-and-prioritization stage described above, calibrated to each insurer's risk appetite and underwriting manual, and it is 100% external with no load on the insurer's IT and no core migration. Two product modules do the work. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time Machine Learning scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time on risk judgment and business development rather than triage. Smart Sales is the distribution-side counterpart that maps the portfolio by client and product, scores upsell and next-best-action, and runs multi-channel campaigns with an attribution trail.

In practice, the layer ingests each submission, reads and structures it, scores it against appetite and exposure, and returns a quote, an automatic decline, or an escalation to a human, always with an explanation. It writes the result back to the policy core and returns the audit trail, while a visible SLA and a prioritized underwriter queue keep the team focused on the cases that need judgment. Real-time dashboards, analytics, and reports give a proactive view of in-flight deals and the pipeline. The intelligence is calibrated to the insurer's own underwriting manual, and every automated decision is explainable, auditable, LGPD compliant, and encrypted at every step.

WIR's first public traction is a POC in execution with a global insurer in the Transport line, and the company is conservative about claiming more than that. The reason the external-layer approach resonates is structural. Deloitte puts underwriter time lost to administrative work at 40%, BCG puts insurers blocked from innovation by IT limitations at 70%, Capgemini finds that 60%+ of brokers choose an insurer by response speed, and Gartner estimates that 20-30% of corporate time is lost organizing unstructured data. Automatic routing with a visible SLA is how an insurer answers all four pressures at once. To map how this would prioritize your own underwriter queue, book a conversation with WIR at https://wirinnovation.ai.

### Frequently asked questions

**How is a submission routed by appetite and exposure?**

Each submission is scored on two axes at once: whether the risk sits inside the insurer's defined risk appetite, and where it falls in the exposure and authority band. WIR's Underwriter Intelligence reads and structures the case, scores it with Machine Learning calibrated to the underwriting manual, then sends it down the matching path. A risk inside appetite and inside auto-quote thresholds takes the fast lane, while higher exposure routes to the right senior underwriter, each decision carrying its inputs and rationale.

**When does the system quote, decline, or escalate to a human?**

The layer returns one of three outcomes, each with a written reason. A clean submission inside appetite, inside exposure thresholds, and free of fraud flags can receive a quote automatically. A case clearly outside appetite or hitting a hard knockout rule is declined and returned with the reason. A borderline case, above an authority band, missing data, or carrying a fraud signal, is escalated to a human with all extracted data and the rationale attached. The insurer remains the risk owner on every referred case.

**Does the underwriter see the queue and SLA for each case?**

Yes. Escalated cases enter a prioritized underwriter queue rather than an undifferentiated inbox, with priority computed from exposure, win-probability score, expiry urgency, broker value, and time elapsed against the SLA. The right underwriter sees the right cases at the top, context already in front of them. Every submission also carries a visible SLA timer from the moment of intake, so the team, and where exposed the broker, can see exactly where a case stands.

**Does automatic routing respect the underwriting manual?**

Yes. The routing and scoring models are calibrated to the insurer's own underwriting manual, risk appetite, and historical loss data, never to a generic template. The thresholds for quote, decline, and escalation are set by the insurer's own risk policy, so WIR encodes the insurer's risk view rather than imposing an external one. WIR is not an insurer, broker, or MGA and carries no risk. Every decision is explainable, auditable, LGPD compliant, and encrypted at every step.

**How long until routing goes into production?**

With WIR, setup runs 3 to 12 months as a one-time implementation with fixed price, clear scope, and KPIs agreed before the work starts. The path is incremental: scope one line and channel, integrate with the existing core through API, portal, or upload, calibrate to the underwriting manual, then test in shadow mode before a staged go-live. There is no core migration. Continuous operation follows after go-live, with a billing model adjusted per client.`
  },
  {
    slug: "inteligencia-de-subscricao-brasil",
    cat: "Artigo", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "A inteligência de subscrição no mercado de seguros brasileiro",
    sub: "Leitura da inteligência de subscrição e da adoção de IA no mercado de Seguros e Danos no Brasil: estado, drivers, fraude, pricing e onde a WIR se posiciona.",
    author: "WIR Innovation", role: "Equipe",
    time: "9 min", date: "02 · Jun · 2026",
    metaDesc: "Leitura da inteligência de subscrição e da adoção de IA no mercado de Seguros e Danos no Brasil: estado, drivers, fraude, pricing e onde a WIR se posiciona.",
    body: `### A leitura do mercado em uma frase

A inteligência de subscrição de seguros no Brasil é a aplicação de IA e Machine Learning à jornada de cotação e subscrição, calibrada ao apetite de risco e ao manual de subscrição de cada seguradora. O mercado de Seguros e Danos (P&C) cresce em dois dígitos por ano, mas a estrutura operacional das seguradoras não acompanha essa aceleração. O resultado é uma lacuna de capacidade: mais riscos para avaliar por subscritor, com velocidade e qualidade em tensão. É exatamente nessa lacuna que a inteligência de subscrição com IA entra, automatizando o trabalho administrativo e liberando o julgamento humano para os riscos que realmente o exigem.

### Estado do mercado de Seguros e Danos

O Brasil opera o maior mercado de seguros da América Latina e um dos maiores entre as economias emergentes. O setor é regulado pela SUSEP, supervisora federal dos seguros privados, e representado pela CNseg, com a FenSeg cobrindo a federação de Seguros Gerais. O segmento de Seguros e Danos (P&C) reúne automóvel, patrimonial, rural, transportes, riscos de engenharia, linhas financeiras e responsabilidade civil.

Em magnitude, o prêmio de Danos e Responsabilidades está na ordem de R$ 120 bilhões ao ano, segundo o reporte da CNseg e da FenSeg, sendo um dos recortes que mais cresceram nos últimos anos. Automóvel segue como a maior linha por prêmio, seguido de patrimonial, com a SUSEP publicando os dados de prêmio e sinistro por ramo em seus painéis estatísticos. A penetração de seguros no Brasil ainda é baixa frente a mercados maduros, o que sustenta o espaço estrutural de crescimento descrito pelo Swiss Re Institute.

O ponto prático para quem decide é que o prêmio cresce mais rápido do que as seguradoras conseguem escalar equipe de subscrição e capacidade de back-office. A receita aumenta, mas a leitura de documentos, a avaliação de risco e a aplicação do manual ainda rodam, em boa parte, em fluxos manuais.

### O que está pressionando a subscrição

Quatro pressões estruturais convergem sobre a função de subscrição no Brasil, e elas vêm com números confirmados. A primeira é o peso administrativo dentro do próprio dia do subscritor: segundo a Deloitte, 40% do tempo do subscritor é consumido por tarefas administrativas, e não por análise de risco. Cada minuto gasto reconciliando e redigitando dados é um minuto que não vai para o julgamento que diferencia uma boa carteira.

A segunda pressão é o gargalo de tecnologia. Segundo o BCG, 70% das seguradoras não executam inovação por limitação de TI. O core legado e os sistemas de apólice travam projetos antes mesmo de eles começarem, o que explica por que tantas iniciativas de modernização paralisam na fase de integração.

A terceira é a velocidade de resposta exigida pela distribuição. O canal corretor concentra a maior parte do prêmio de P&C, e segundo a Capgemini, 60%+ dos corretores escolhem a seguradora pela velocidade de resposta. O tempo de cotação é, portanto, uma alavanca direta de conversão: cotação lenta ou inconsistente perde negócio no ponto de venda.

A quarta é a fragmentação de dados. Submissões de corretores chegam em formatos heterogêneos, e-mail, PDF e planilha, e segundo o Gartner, de 20-30% do tempo corporativo se perde organizando dados não estruturados. Some-se a isso a pressão de fraude e seleção adversa, que elevam o custo de sinistro, e o avanço do Open Insurance da SUSEP, que busca padronizar e abrir os dados do setor para reduzir essa fragmentação ao longo do tempo.

### Risco, fraude e a virada da IA

A defesa da inteligência de subscrição é, antes de tudo, um caso de controle de risco e qualidade, não apenas de velocidade. As linhas de P&C, automóvel em particular, são sensíveis a oscilações de sinistralidade puxadas por frequência de sinistro, furto, inflação de custo de reparo e defasagem de pricing. Subscrição lenta ou inconsistente e preço desatualizado abrem o descompasso entre prêmio e risco, e a SUSEP mostra como a sinistralidade varia de forma relevante entre os ramos.

A IA e o Machine Learning entram nessa esteira em pontos concretos. A leitura inteligente de documentos extrai, normaliza e valida os dados da submissão, cortando a redigitação manual que consome o tempo do subscritor no intake. Modelos de scoring avaliam cada submissão contra o apetite e as regras de subscrição da seguradora, sinalizando o que está claramente dentro do apetite, claramente fora, ou no limite. A detecção de fraude e anomalias surge ainda na submissão, antes da emissão, reduzindo seleção adversa. E o roteamento de decisão envia o risco simples e dentro do apetite para cotação automática, enquanto o risco complexo vai ao subscritor certo com os dados pré-montados.

O ponto sóbrio é que a IA traz seu próprio ônus de governança. Decisões automatizadas em seguros precisam ser explicáveis e auditáveis. Sob a LGPD (Lei 13.709/2018), o titular tem direito a solicitar revisão de decisões tomadas unicamente por tratamento automatizado, e o tratamento de dados pessoais exige base legal e transparência, conforme orienta a ANPD. Por isso o desenho responsável é um modelo auditável, com trilha de decisão completa, calibrado a uma política de subscrição documentada, e não uma caixa-preta. A supervisão da SUSEP e a governança da própria seguradora exigem decisões rastreáveis e justificáveis.

### Onde a WIR se posiciona

A WIR é a camada de IA do seguro. Sobre os sistemas que a seguradora já usa, nunca no lugar deles. Trata-se de uma camada de inteligência externa que se conecta ao core e ao sistema de apólice existentes e automatiza a jornada de cotação e subscrição segundo a política de aceitação da própria seguradora, com Machine Learning calibrado ao apetite de risco e ao manual de subscrição. A WIR é 100% externa, sem carga no TI da seguradora e sem migração de core. Ela não é seguradora, corretora nem MGA, e não carrega risco.

Na prática, isso se materializa em produtos definidos. O Underwriter Intelligence automatiza a jornada de cotação de acordo com a política de risco da seguradora, com scoring de risco em tempo real calibrado ao apetite, roteamento automático por apetite e exposição, e análise preditiva de conversão por produto, risco e corretor, para que o subscritor concentre o tempo na análise de risco e no desenvolvimento de negócio. O Smart Sales atua na inteligência de distribuição, mapeia a carteira por cliente e produto, prioriza próxima melhor ação e roda campanhas multicanal com trilha de atribuição. E os dashboards, analytics e relatórios em tempo real dão visão proativa do pipeline e dos negócios em andamento. Para um panorama mais amplo dos módulos, a WIR mantém seus guias de automação.

Toda decisão da WIR é explicável e retorna trilha de auditoria completa, com dados criptografados em cada etapa e em conformidade com a LGPD. A tração pública da WIR, neste momento, é uma POC em execução com uma seguradora global no ramo de Transporte. Seguradoras e corretores que queiram avaliar o encaixe podem falar com a equipe da WIR.

### Perspectiva

A adoção de inteligência de subscrição de seguros no Brasil tende a sair de provas de conceito isoladas para uso em produção em ramos específicos, começando onde o dado é mais estruturado e o ganho de velocidade é mais claro, como automóvel, patrimonial mais simples e transporte. O movimento deve ser ramo a ramo, e não uma transformação de uma vez só.

A arquitetura dominante para as seguradoras estabelecidas tende a ser a de camadas de inteligência externas integradas aos sistemas atuais, dado o custo e o risco de uma migração de core. Isso reduz a barreira para quem está travado por TI legada. À medida que o Open Insurance da SUSEP amadurece, o dado padronizado e portável diminui a fragmentação que hoje atrasa a subscrição, melhorando os insumos dos modelos e abrindo espaço para um scoring mais rico e mais rápido.

Em paralelo, explicabilidade, auditabilidade e controles de decisão automatizada alinhados à LGPD deixam de ser diferencial e passam a ser requisito de entrada. E a pressão por velocidade na distribuição deve continuar subindo conforme canais digitais e embutidos se expandem, o que mantém a demanda por cotação mais rápida e mais consistente. Inteligência de subscrição, nesse cenário, é tanto investimento em eficiência quanto em competitividade de distribuição.

### Perguntas frequentes

**O que é inteligência de subscrição no mercado de seguros?**

É a aplicação de IA e Machine Learning à jornada de cotação e subscrição, calibrada ao apetite de risco e ao manual de cada seguradora. Na prática, a leitura inteligente de documentos extrai e valida dados da submissão, modelos de scoring avaliam cada risco contra a política de aceitação, e o roteamento de decisão separa o que é cotação automática do que vai ao subscritor. O objetivo é controle de risco e qualidade, não apenas velocidade.

**Como a IA está mudando a cotação e a subscrição no Brasil?**

A IA automatiza o trabalho administrativo e libera o julgamento humano para os riscos que de fato o exigem. Segundo a Deloitte, 40% do tempo do subscritor é consumido por tarefas administrativas, não por análise de risco. Modelos de scoring sinalizam o que está dentro do apetite, fora, ou no limite, a detecção de fraude age ainda na submissão, e o roteamento envia o risco simples para cotação automática e o complexo ao subscritor certo.

**Por que a estrutura das seguradoras não acompanha o crescimento do mercado?**

Porque o prêmio de Seguros e Danos cresce em dois dígitos por ano, mais rápido do que as seguradoras escalam equipe de subscrição e back-office. Soma-se o gargalo de TI: segundo o BCG, 70% das seguradoras não executam inovação por limitação de tecnologia, com o core legado travando projetos na fase de integração. A leitura de documentos e a aplicação do manual ainda rodam, em boa parte, em fluxos manuais, criando uma lacuna de capacidade.

**Como a WIR se posiciona no mercado de seguros brasileiro?**

A WIR é a camada de IA do seguro, uma camada de inteligência externa sobre os sistemas que a seguradora já usa, nunca no lugar deles. Ela se conecta ao core e ao sistema de apólice existentes e automatiza a cotação e a subscrição segundo a política da própria seguradora, com Machine Learning calibrado ao apetite. É 100% externa, sem migração de core. A tração pública atual é uma POC em execução com uma seguradora global no ramo de Transporte.

**A WIR é uma seguradora ou uma corretora?**

Nenhuma das duas. A WIR é a camada de IA externa para seguradoras e corretores, não é seguradora, corretora nem MGA, e não carrega risco. Ela automatiza a jornada de cotação e subscrição segundo a política de aceitação da própria seguradora, com produtos como Underwriter Intelligence e Smart Sales. Toda decisão é explicável, retorna trilha de auditoria completa e está em conformidade com a LGPD, com dados criptografados em cada etapa.`
  },
  {
    slug: "inteligencia-de-subscricao-brasil-en",
    cat: "Article", grad: "linear-gradient(135deg,#3222E9,#7540AC)",
    title: "Underwriting intelligence in the Brazilian insurance market",
    sub: "How AI and Machine Learning reshape P&C underwriting in Brazil: market state, drivers, fraud, pricing, and the external AI layer over legacy core systems.",
    author: "WIR Innovation", role: "Team",
    time: "8 min", date: "02 · Jun · 2026",
    metaDesc: "How AI and Machine Learning reshape P&C underwriting in Brazil: market state, drivers, fraud, pricing, and the external AI layer over legacy core systems.",
    body: `### The market in one read

Insurance underwriting intelligence in Brazil is the application of AI and Machine Learning to the quotation-to-decision journey, calibrated to each insurer's own risk appetite and underwriting manual. The driver is structural. Brazil is the largest insurance market in Latin America, the Seguros e Danos (P&C) segment grows at double digits per year, and underwriting capacity is not keeping pace. The competitive question for insurers is no longer whether to automate subscrição (underwriting), but how to do it on top of the systems they already run, with decisions that stay explainable and auditable.

### State of the P&C insurance market

Brazil runs the largest insurance market in Latin America and one of the larger emerging markets globally. The sector is supervised by SUSEP, the federal authority for private insurance, and represented by CNseg, with FenSeg covering the property and casualty federation. Sector revenue has been growing at double-digit rates and outpacing GDP, according to CNseg reporting for recent years.

The Seguros e Danos (P&C) perimeter covers auto (automóvel), property (patrimonial), rural, transport (transportes), engineering risks, financial lines, and liability. Premium volume in this segment runs on the order of R$ 120 billion annually, roughly USD 22 billion, though insurers should treat that magnitude as an approximate order of size rather than a fixed figure and check the current number against FenSeg and CNseg statistics. Auto remains the single largest line by premium, followed by property, with line-level premium and claims data published through SUSEP statistical dashboards. Insurance penetration in Brazil remains low against mature markets, which is the source of the structural growth runway and, at the same time, the operational strain on the underwriting function that has to absorb the new volume.

### What is pressuring underwriting

Premium is growing faster than insurers can scale underwriting headcount and back-office capacity. Submission volume rises while document review and risk assessment still run on substantially manual workflows. The constraint is rarely appetite. It is qualified human time to apply that appetite consistently across every submission, and experienced underwriters and pricing actuaries are scarce and expensive.

The numbers behind that strain are concrete. Underwriters spend around 40% of their time on administrative tasks rather than risk judgment, according to Deloitte. About 70% of insurers do not execute on innovation because of IT limitations, according to BCG, which is why a core rebuild is so rarely the chosen path. On the data side, organizations lose 20-30% of working time organizing unstructured data, according to Gartner, and broker submissions are exactly that, arriving as heterogeneous PDFs, spreadsheets, and emails.

Distribution adds the final pressure. Insurance in Brazil is heavily intermediated through brokers (corretores), and more than 60% of brokers choose an insurer by response speed, according to Capgemini. Brokers route business to whichever insurer quotes fast and consistently, so time-to-quote is a direct conversion lever. Slow or inconsistent quoting loses business at the point of sale. Digital channels, embedded insurance, and a growing field of InsurTechs keep compressing the response times brokers and clients expect.

### Risk, fraud, and the AI shift

The case for underwriting intelligence is a quality and risk-control case, not only a speed case. Where AI and Machine Learning enter the subscrição workflow is specific. Document AI and large language models read and normalize broker submissions at intake, cutting the manual re-keying that consumes underwriter time. ML models then score each submission against the insurer's defined appetite and underwriting rules, flagging risks that are clearly in-appetite, clearly out, or borderline. This is calibration to the insurer's own policy, not a generic external score.

Fraud and anomaly detection move the control point earlier. Models surface inconsistencies associated with misrepresentation at submission, before binding, which reduces adverse selection and the leakage that comes from catching problems only at the claim stage. ML also supports more granular premium (prêmio) pricing within the actuarial and regulatory frame, and it routes low-complexity in-appetite risks to straight-through quoting while sending complex risks to the right underwriter with the data pre-assembled. The effect is higher speed and more consistent decisions across underwriters, branches, and brokers.

The governance burden is real, and the responsible design answers it directly. Automated decisions in insurance must be explainable and auditable. Under the LGPD (Lei Geral de Proteção de Dados, Law 13.709/2018), data subjects have rights regarding decisions made solely on automated processing, and processing must carry a lawful basis and transparency, as set out by the ANPD and the full text of the law. The credible model is therefore an auditable one with a full decision trail, calibrated to a documented underwriting policy, under SUSEP supervision. AI does not replace the underwriter. It removes administrative load so human judgment concentrates on the risks that need it.

### Where WIR fits

WIR is the AI layer for insurance. It is an external AI intelligence layer that sits on top of the insurer's existing core and policy-admin systems and automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy. WIR never replaces the core, it runs no core migration, and it places no load on the insurer's IT team. The signature framing holds throughout. The AI layer for insurance. On top of the systems the insurer already runs, never in their place.

The products are concrete. Underwriter Intelligence automates the quotation journey per the insurer's risk policy, with real-time ML scoring calibrated to appetite, automatic routing by appetite and exposure, and predictive conversion analysis by product, risk, and broker, so underwriters spend their time analyzing risk and developing business. Smart Sales maps the portfolio across client and product, scores upsell and next-best-action, and runs multi-channel campaigns with an attribution trail, so penetration and retention grow together. Real-time dashboards and analytics give a proactive view of in-flight deals and pipeline. Every decision is explainable and returns a full audit trail, the data is LGPD compliant and encrypted at every step, and the Machine Learning is calibrated to each insurer's risk appetite and underwriting manual rather than to a generic score. WIR is not an insurer, a broker, or an MGA, and it carries no risk. Its only public traction is a POC in execution with a global insurer in the Transport line. Readers can compare this approach against a core rebuild in the WIR underwriting automation guides or start a conversation with the WIR team.

### Outlook

Adoption is moving from isolated proofs of concept toward production use in specific lines, starting where data is more structured and the speed payoff is clearest, such as auto, simpler property, and transport. Expect line-by-line rollout rather than a single large transformation. Given the cost and risk of core migrations, and the share of insurers blocked by legacy IT, the dominant architecture for incumbents will be external intelligence layers integrated with the core they already operate.

Two forces will shape the next few years. As SUSEP's Open Insurance framework matures, standardized and portable data should reduce the fragmentation that slows underwriting today and improve model inputs, as described in the SUSEP Open Insurance materials. In parallel, explainability, auditability, and LGPD-aligned controls on automated decisions are becoming table stakes rather than differentiators. Broker expectations on response speed will keep rising as digital and embedded channels expand, which makes underwriting intelligence a distribution-competitiveness investment, not only an efficiency one. None of this guarantees an outcome. It points to where the operational pressure and the regulatory frame are pushing the Brazilian P&C market.

### Frequently asked questions

**What is underwriting intelligence in the insurance market?**

Underwriting intelligence is the application of AI and Machine Learning to the quotation-to-decision journey, calibrated to an insurer's own risk appetite and underwriting manual. It reads broker submissions at intake, scores each risk against defined appetite and rules, and routes decisions consistently. The goal is not a generic external score. It is faster, more consistent decisions with a full audit trail, so underwriters concentrate human judgment on the risks that need it.

**How is AI changing quotation and underwriting in Brazil?**

AI is moving Brazilian quotation and underwriting from manual document review toward calibrated, auditable decisions on the systems insurers already run. Document AI and large language models normalize broker submissions at intake, cutting re-keying. Machine Learning then scores each risk against appetite, flags in-appetite, out, or borderline cases, surfaces fraud signals before binding, and routes low-complexity risks to straight-through quoting. Underwriters spend an estimated 40% of their time on administrative tasks, according to Deloitte, which is the load AI removes.

**Why does insurer structure not keep pace with market growth?**

Premium grows faster than insurers can scale underwriting headcount and back-office capacity, so structure lags. Brazil's P&C segment grows at double digits per year, while submission volume rises and review stays substantially manual. Experienced underwriters and pricing actuaries are scarce and expensive. Around 70% of insurers do not execute on innovation because of IT limitations, according to BCG, so a core rebuild is rarely viable, and an external AI layer absorbs the new volume instead.

**How does WIR position itself in the Brazilian insurance market?**

WIR positions itself as the AI layer for insurance, an external intelligence layer on top of the insurer's existing core and policy-admin systems. It automates the quotation and underwriting journey per the insurer's own risk policy, never replacing the core and running no migration. Underwriter Intelligence scores risk in real time, calibrated to appetite, and Smart Sales drives distribution. Every decision is explainable, returns a full audit trail, and is LGPD compliant.

**Is WIR an insurer or a broker?**

WIR is neither an insurer nor a broker, and it is not an MGA. WIR is the external AI layer for insurers and brokers, sitting on top of the systems they already run and carrying no risk. It automates the quotation and underwriting journey according to the insurer's own risk-acceptance policy. The Machine Learning is calibrated to each insurer's appetite and underwriting manual, and every decision is explainable, auditable, and LGPD compliant.`
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

