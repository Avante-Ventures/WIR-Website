"""WIR Index · Edição 02 · Q3 2026 — content (PT/EN/ES).

Every figure traces to the research pack of 2026-10-28 (sources listed in Bloco 8).
No em/en dashes anywhere (WIR writing guide); build.py enforces it.
"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parts import EXTRA_CSS as _CSS, FIXED, tri

C = dict(FIXED)


def T(key, pt, en, es):
    C[key] = tri(pt, en, es)


def L(pt, en=None, es=None):
    return {"pt": pt, "en": pt if en is None else en, "es": pt if es is None else es}


def pick(c, lang):
    return c[lang] if isinstance(c, dict) else c


def table(head, rows):
    out = {}
    for lang in ("pt", "en", "es"):
        h = "".join(f"<th>{pick(c, lang)}</th>" for c in head)
        b = "".join("<tr>" + "".join(f"<td>{pick(c, lang)}</td>" for c in r) + "</tr>" for r in rows)
        out[lang] = f"\n        <table>\n          <thead><tr>{h}</tr></thead>\n          <tbody>{b}</tbody>\n        </table>\n      "
    return out


def reg(title, rows):
    out = {}
    for lang in ("pt", "en", "es"):
        r = "".join(f'<div class="row"><div class="rk{" p" if i == len(rows) - 1 else ""}">{pick(k, lang)}</div><div>{pick(v, lang)}</div></div>'
                    for i, (k, v) in enumerate(rows))
        out[lang] = f"<h3>{pick(title, lang)}</h3>{r}"
    return out


ONE = L('<span class="flag fwarn">1 fonte</span>', '<span class="flag fwarn">1 source</span>', '<span class="flag fwarn">1 fuente</span>')
HAPPENED = L("O que aconteceu", "What happened", "Qué pasó")
PRACTICE = L("Na prática", "In practice", "En la práctica")
NEXT = L("Próximo marco", "Next milestone", "Próximo hito")
VECTOR = L("Vetor", "Vector", "Vector")

EXTRA_CSS = _CSS + """
<style id="ed02-css-2">
.qbar.q3 .col{background:none;border:0;border-top:2px dashed var(--coral);border-radius:0;min-height:0;height:2px!important;width:62%}
.qbar.q3 .qv{color:var(--coral);font-weight:600}
.viz-months .qchart{height:170px}
.mv-tag{font-family:var(--mono);font-size:10px;font-weight:600;white-space:nowrap}
.sc .st{flex:0 0 auto}
</style>"""

# ---------------------------------------------------------------- Bloco 0
T("bloco_0", "Bloco 0 · Sumário executivo", "Block 0 · Executive summary", "Bloque 0 · Resumen ejecutivo")
T("h2_0", "O trimestre em 5 linhas", "The quarter in 5 lines", "El trimestre en 5 líneas")
T("sub_0", "Cada linha traz um número ou um nome próprio. Nada genérico.",
  "Every line carries a number or a proper name. Nothing generic.",
  "Cada línea trae un número o un nombre propio. Nada genérico.")
T("five_0",
  "<b>Funding.</b> O insurtech global captou <b>US$1,36bi</b> no Q3 2026, <b>44,6% menos</b> que no Q2 (US$2,44bi, o maior trimestre desde o Q2 2022), com o número de deals estável (104, contra 107). A queda veio das mega-rodadas; <b>83,2%</b> do dinheiro ainda foi para empresas de IA. <span class=\"src\">Gallagher Re · Global InsurTech Report Q3'26 (5/nov/2026).</span>",
  "<b>Funding.</b> Global insurtech raised <b>US$1.36bn</b> in Q3 2026, <b>44.6% less</b> than in Q2 (US$2.44bn, the biggest quarter since Q2 2022), with deal count steady (104, against 107). The drop came from mega-rounds; <b>83.2%</b> of the money still went to AI companies. <span class=\"src\">Gallagher Re · Global InsurTech Report Q3'26 (Nov 5, 2026).</span>",
  "<b>Funding.</b> El insurtech global captó <b>US$1.360 millones</b> en el Q3 2026, <b>44,6% menos</b> que en el Q2 (US$2.440 millones, el mayor trimestre desde el Q2 2022), con el número de deals estable (104, contra 107). La caída vino de las mega-rondas; el <b>83,2%</b> del dinero todavía fue a empresas de IA. <span class=\"src\">Gallagher Re · Global InsurTech Report Q3'26 (5/nov/2026).</span>")
T("five_1",
  "<b>Brasil.</b> Nenhuma rodada de insurtech brasileira com valor divulgado entre julho e setembro. O capital andou por M&amp;A: a <b>Hero</b> comprou o Grupo CAM no México, o <b>PicPay</b> concluiu a compra da Kovr e a <b>Sompo</b> comprou a Fator. <span class=\"src\">Guia insurtech.com.br (atualizado em 19/out), Tracxn, LatamList; CQCS, Times Brasil, Let's Money.</span>",
  "<b>Brazil.</b> Not a single Brazilian insurtech round with a disclosed amount between July and September. Capital moved through M&amp;A: <b>Hero</b> bought Grupo CAM in Mexico, <b>PicPay</b> closed its purchase of Kovr and <b>Sompo</b> bought Fator. <span class=\"src\">insurtech.com.br guide (updated Oct 19), Tracxn, LatamList; CQCS, Times Brasil, Let's Money.</span>",
  "<b>Brasil.</b> Ninguna ronda de insurtech brasileña con monto divulgado entre julio y septiembre. El capital se movió por M&amp;A: <b>Hero</b> compró el Grupo CAM en México, <b>PicPay</b> cerró la compra de Kovr y <b>Sompo</b> compró Fator. <span class=\"src\">Guía insurtech.com.br (actualizada el 19/oct), Tracxn, LatamList; CQCS, Times Brasil, Let's Money.</span>")
T("five_2",
  "<b>Regulação.</b> A nova Lei de Seguros virou regra: a <b>Res. CNSP 496</b> (DOU de 18/ago) redesenha os contratos de seguro de danos, e todo contrato novo ou renovado a partir de <b>5/jan/2027</b> precisa cumprir. O PL 2338, de IA, não andou na Câmara. <span class=\"src\">Demarest; ficha de tramitação da Câmara.</span>",
  "<b>Regulation.</b> Brazil's new Insurance Law became rules: <b>CNSP Resolution 496</b> (published Aug 18) redraws P&amp;C insurance contracts, and every contract signed or renewed from <b>Jan 5, 2027</b> must comply. AI bill PL 2338 did not move in the Chamber. <span class=\"src\">Demarest; Chamber of Deputies bill tracker.</span>",
  "<b>Regulación.</b> La nueva Ley de Seguros se volvió norma: la <b>Res. CNSP 496</b> (DOU del 18/ago) rediseña los contratos de seguros de daños, y todo contrato nuevo o renovado desde el <b>5/ene/2027</b> debe cumplirla. El PL 2338, de IA, no avanzó en la Cámara. <span class=\"src\">Demarest; ficha de tramitación de la Cámara.</span>")
T("five_3",
  "<b>Tecnologia.</b> Agentes mais baratos e mais longos: o <b>Claude Opus 5.5</b> (22/set) custa 40% menos que o Opus 5 em cargas típicas, e a OpenAI pôs <b>computer use</b> na sua Agents API (29/set). <span class=\"src\">Anthropic; changelog da API da OpenAI.</span>",
  "<b>Technology.</b> Cheaper, longer-running agents: <b>Claude Opus 5.5</b> (Sep 22) costs 40% less than Opus 5 on typical workloads, and OpenAI added <b>computer use</b> to its Agents API (Sep 29). <span class=\"src\">Anthropic; OpenAI API changelog.</span>",
  "<b>Tecnología.</b> Agentes más baratos y más largos: <b>Claude Opus 5.5</b> (22/sep) cuesta 40% menos que Opus 5 en cargas típicas, y OpenAI sumó <b>computer use</b> a su Agents API (29/sep). <span class=\"src\">Anthropic; changelog de la API de OpenAI.</span>")
T("five_4",
  "<b>Placar.</b> Primeiro scorecard das nossas previsões: <b>1 cumprida</b> (a Porto pôs um agente de IA em produção na abertura de sinistros), <b>1 errada</b> (Open Insurance, com premissa equivocada nossa) e <b>1 em aberto</b> até dezembro.",
  "<b>Scorecard.</b> First grading of our predictions: <b>1 hit</b> (Porto put an AI agent into production for opening claims), <b>1 miss</b> (Open Insurance, on a premise we got wrong) and <b>1 still open</b> until December.",
  "<b>Marcador.</b> Primer scorecard de nuestras predicciones: <b>1 cumplida</b> (Porto puso un agente de IA en producción para abrir siniestros), <b>1 fallida</b> (Open Insurance, con una premisa equivocada nuestra) y <b>1 abierta</b> hasta diciembre.")

# ---------------------------------------------------------------- Bloco 1
T("bloco_1", "Bloco 1 · A tese do trimestre", "Block 1 · The quarter's thesis", "Bloque 1 · La tesis del trimestre")
T("th_kicker", "Memo · novembro de 2026", "Memo · November 2026", "Memo · noviembre de 2026")
T("h2_1", "Menos apostas, cheques maiores. No Brasil, o seguro entrou na fase de concentração.",
  "Fewer bets, bigger checks. In Brazil, insurance has entered its concentration phase.",
  "Menos apuestas, cheques más grandes. En Brasil, el seguro entró en su fase de concentración.")
T("th_lead",
  "A observação do trimestre: no Brasil, o dinheiro não sumiu, ele se concentrou em M&amp;A de canal e de balanço, num trimestre sem nenhuma rodada de insurtech divulgada. No mundo, a concentração em rodadas gigantes do Q2 não se repetiu no Q3: o funding caiu 44,6% e o early stage voltou a crescer, mas a IA seguiu com 83,2% do dinheiro.",
  "The observation of the quarter: in Brazil, the money did not disappear, it concentrated into M&amp;A for distribution and balance sheet, in a quarter without a single disclosed insurtech round. Globally, Q2's concentration in giant rounds did not repeat in Q3: funding fell 44.6% and early stage grew again, but AI still took 83.2% of the money.",
  "La observación del trimestre: en Brasil, el dinero no desapareció, se concentró en M&amp;A de canal y de balance, en un trimestre sin ninguna ronda de insurtech divulgada. En el mundo, la concentración en rondas gigantes del Q2 no se repitió en el Q3: el funding cayó 44,6% y el early stage volvió a crecer, pero la IA siguió con el 83,2% del dinero.")
T("viz_evn_0", "R$125M", "R$125M", "R$125M")
T("viz_ev_0", "ticket mediano divulgado de M&amp;A em seguros no Brasil até 8/out, contra R$71M em 2025", "median disclosed ticket of insurance M&amp;A in Brazil through Oct 8, against R$71M in 2025", "ticket mediano divulgado de M&amp;A en seguros en Brasil hasta el 8/oct, contra R$71M en 2025")
T("viz_evn_1", "US$660M", "US$660M", "US$660M")
T("viz_ev_1", "em mega-rodadas globais (US$100M+) no Q3'26, contra US$1,67bi no Q2", "in global mega-rounds (US$100M+) in Q3'26, against US$1.67bn in Q2", "en mega-rondas globales (US$100M+) en el Q3'26, contra US$1.670 millones en el Q2")
T("viz_evn_2", "0", "0", "0")
T("viz_ev_2", "rodadas de insurtech brasileiras com valor divulgado no Q3", "Brazilian insurtech rounds with a disclosed amount in Q3", "rondas de insurtech brasileñas con monto divulgado en el Q3")
T("th_p_0",
  "<span class=\"lbl lbl-an\">Análise</span><strong>As evidências do tri.</strong> No capital global, o pico da concentração foi o Q2'26: US$1,67bi dos US$2,44bi vieram de rodadas de US$100M ou mais (68,4%, o maior peso desde o Q4 2021). O Q3'26 desfez boa parte disso: as mega-rodadas caíram para US$660M, o total para US$1,36bi (−44,6%) e o early stage subiu 20,1%, para US$317,3M, com 104 deals, contra 107 (Gallagher Re). No Brasil, os trackers que consultamos não registram nenhuma rodada de insurtech com valor divulgado entre julho e setembro; as seis rodadas do ano até outubro somam cerca de R$465M (insurtech.com.br). O que andou foi M&amp;A: a Hero comprou o Grupo CAM, o PicPay fechou a Kovr, a Sompo comprou a Fator. E o M&amp;A também se concentra: 16 transações em seguros até 8/out, contra 45 em todo 2025, com ticket mediano divulgado de R$125M, contra R$71M (Acorn Advisory e TTR, via Let's Money). A tese, portanto, se sustenta no Brasil; no global, a concentração do Q2 não se repetiu no Q3, e voltamos a ela na Edição 03.",
  "<span class=\"lbl lbl-an\">Analysis</span><strong>The evidence.</strong> In global capital, the peak of concentration was Q2'26: US$1.67bn of its US$2.44bn came from rounds of US$100M or more (68.4%, the heaviest weight since Q4 2021). Q3'26 undid much of that: mega-rounds fell to US$660M, the total to US$1.36bn (−44.6%), and early stage rose 20.1% to US$317.3M, with 104 deals against 107 (Gallagher Re). In Brazil, the trackers we checked record no insurtech round with a disclosed amount between July and September; the year's six rounds through October add up to about R$465M (insurtech.com.br). What moved was M&amp;A: Hero bought Grupo CAM, PicPay closed Kovr, Sompo bought Fator. M&amp;A is concentrating too: 16 insurance transactions through Oct 8, against 45 in all of 2025, with a median disclosed ticket of R$125M, against R$71M (Acorn Advisory and TTR, via Let's Money). So the thesis holds in Brazil; globally, Q2's concentration did not repeat in Q3, and we return to it in Issue 03.",
  "<span class=\"lbl lbl-an\">Análisis</span><strong>La evidencia.</strong> En el capital global, el pico de la concentración fue el Q2'26: US$1.670 millones de sus US$2.440 millones vinieron de rondas de US$100M o más (68,4%, el mayor peso desde el Q4 2021). El Q3'26 deshizo buena parte de eso: las mega-rondas cayeron a US$660M, el total a US$1.360 millones (−44,6%) y el early stage subió 20,1%, a US$317,3M, con 104 deals, contra 107 (Gallagher Re). En Brasil, los trackers que consultamos no registran ninguna ronda de insurtech con monto divulgado entre julio y septiembre; las seis rondas del año hasta octubre suman cerca de R$465M (insurtech.com.br). Lo que se movió fue M&amp;A: Hero compró el Grupo CAM, PicPay cerró Kovr, Sompo compró Fator. Y el M&amp;A también se concentra: 16 transacciones en seguros hasta el 8/oct, contra 45 en todo 2025, con ticket mediano divulgado de R$125M, contra R$71M (Acorn Advisory y TTR, vía Let's Money). La tesis, por lo tanto, se sostiene en Brasil; en lo global, la concentración del Q2 no se repitió en el Q3, y volvemos a ella en la Edición 03.")
T("th_p_1",
  "<strong>A IA ficou mais barata e mais paciente.</strong> No mesmo trimestre, o custo de automatizar caiu de novo. A Anthropic diz que o Claude Opus 5.5 custa 40% menos que o Opus 5 em cargas típicas, e um testador relata mais de 18 horas na mesma tarefa; a OpenAI pôs computer use na sua Agents API. Construir automação fica mais barato a cada trimestre.",
  "<strong>AI got cheaper and more patient.</strong> In the same quarter, the cost of automating fell again. Anthropic says Claude Opus 5.5 costs 40% less than Opus 5 on typical workloads, and a tester reports more than 18 hours on a single task; OpenAI added computer use to its Agents API. Building automation gets cheaper every quarter.",
  "<strong>La IA se volvió más barata y más paciente.</strong> En el mismo trimestre, el costo de automatizar volvió a caer. Anthropic dice que Claude Opus 5.5 cuesta 40% menos que Opus 5 en cargas típicas, y un tester reporta más de 18 horas en una misma tarea; OpenAI sumó computer use a su Agents API. Construir automatización sale más barato cada trimestre.")
T("th_p_2",
  "<strong>Mas o resultado ainda não chegou ao P&amp;L.</strong> Na pesquisa da S&amp;P Global Ratings com 121 (res)seguradoras, só 8% têm projetos de IA integrados na organização inteira, e a IA \"ainda não impactou materialmente a rentabilidade\". A Travelers, uma das mais avançadas, atribui em parte à IA cerca de 0,5 ponto de melhora no loss ratio de Business Insurance, e o próprio CFO pondera que \"não são coisas grandes\" (tradução livre).",
  "<strong>But the result has not reached the P&amp;L yet.</strong> In S&amp;P Global Ratings' survey of 121 (re)insurers, only 8% have AI projects integrated across the whole organisation, and AI \"has not yet materially impacted profitability\". Travelers, one of the most advanced, partly credits AI for about 0.5 point of improvement in its Business Insurance loss ratio, and its own CFO cautions that \"these are not big things\".",
  "<strong>Pero el resultado todavía no llegó al P&amp;L.</strong> En la encuesta de S&amp;P Global Ratings a 121 (re)aseguradoras, solo el 8% tiene proyectos de IA integrados en toda la organización, y la IA \"todavía no impactó materialmente la rentabilidad\". Travelers, una de las más avanzadas, atribuye en parte a la IA cerca de 0,5 punto de mejora en el loss ratio de Business Insurance, y su propio CFO matiza que \"no son cosas grandes\" (traducción libre).")
T("th_p_3",
  "<span class=\"lbl lbl-op\">Opinião WIR</span><strong>O que a WIR faria no lugar delas.</strong> Concentração muda a conta de quem compra IA. Com o early stage instável (−51,8% no Q2, +20,1% no Q3), parte das ferramentas pequenas que hoje vendem para seguradoras e corretoras pode não existir em 24 meses. A pergunta certa não é qual IA comprar, e sim onde fica o dado: exija em contrato que o dado, os modelos calibrados e a trilha de auditoria fiquem com a seguradora, numa camada que roda sobre o core, sem trocá-lo. E use a janela da Lei 15.040: os produtos de danos precisam estar adaptados até 4/jan/2027. É o momento de redesenhar a jornada de cotação e de sinistro com IA, não de remendar o formulário antigo.",
  "<span class=\"lbl lbl-op\">WIR opinion</span><strong>What WIR would do in their place.</strong> Concentration changes the math for anyone buying AI. With early stage unstable (−51.8% in Q2, +20.1% in Q3), some of the small tools selling to insurers and brokers today may not exist in 24 months. The right question is not which AI to buy, but where the data lives: require by contract that the data, the calibrated models and the audit trail stay with the insurer, in a layer that runs on top of the core without replacing it. And use the window opened by Law 15,040: P&amp;C products must be adapted by Jan 4, 2027. This is the moment to redesign the quoting and claims journey with AI, not to patch the old form.",
  "<span class=\"lbl lbl-op\">Opinión WIR</span><strong>Qué haría WIR en su lugar.</strong> La concentración cambia la cuenta de quien compra IA. Con el early stage inestable (−51,8% en el Q2, +20,1% en el Q3), parte de las herramientas pequeñas que hoy venden a aseguradoras y corredores puede no existir en 24 meses. La pregunta correcta no es qué IA comprar, sino dónde queda el dato: exija por contrato que el dato, los modelos calibrados y la trazabilidad de auditoría queden con la aseguradora, en una capa que corre sobre el core, sin reemplazarlo. Y use la ventana de la Ley 15.040: los productos de daños deben estar adaptados al 4/ene/2027. Es el momento de rediseñar el recorrido de cotización y de siniestro con IA, no de remendar el formulario viejo.")
T("th_sign",
  "<b>Nicholas Weiser</b> &amp; <b>José Carlos de Paula</b>, WIR Innovation · Q3 2026<br>com Amanda Pinheiro, Felipe Moraes e Cristian Mendivelso · Avante Ventures, Holding de IA",
  "<b>Nicholas Weiser</b> &amp; <b>José Carlos de Paula</b>, WIR Innovation · Q3 2026<br>with Amanda Pinheiro, Felipe Moraes and Cristian Mendivelso · Avante Ventures, AI Holding",
  "<b>Nicholas Weiser</b> &amp; <b>José Carlos de Paula</b>, WIR Innovation · Q3 2026<br>con Amanda Pinheiro, Felipe Moraes y Cristian Mendivelso · Avante Ventures, Holding de IA")

# ---------------------------------------------------------------- Bloco 2
T("bloco_2", "Bloco 2 · O placar do trimestre", "Block 2 · The quarter's scoreboard", "Bloque 2 · El marcador del trimestre")
T("h2_2", "Os números, com fonte", "The numbers, with sources", "Los números, con fuente")
T("sub_1",
  "Regra anti-alucinação: todo valor com fonte nomeada e data. <b>Vintage desta edição:</b> deals, M&amp;A, regulação e tecnologia cobrem 1/jul a 30/set/2026, e fatos de outubro aparecem marcados como tal. O agregado global usa o relatório Q3'26 da Gallagher Re, divulgado em 5/nov/2026 e incorporado a esta edição antes da publicação. Câmbio: PTAX de venda do Banco Central em 30/set/2026, US$1 = R$5,1809.",
  "Anti-hallucination rule: every figure carries a named source and a date. <b>This issue's vintage:</b> deals, M&amp;A, regulation and technology cover Jul 1 to Sep 30, 2026, and October facts are flagged as such. The global aggregate uses Gallagher Re's Q3'26 report, released Nov 5, 2026 and incorporated into this issue before publication. FX: Brazilian Central Bank PTAX sell rate on Sep 30, 2026, US$1 = R$5.1809.",
  "Regla anti-alucinación: todo valor con fuente nombrada y fecha. <b>Vintage de esta edición:</b> deals, M&amp;A, regulación y tecnología cubren del 1/jul al 30/sep/2026, y los hechos de octubre aparecen marcados como tales. El agregado global usa el informe Q3'26 de Gallagher Re, divulgado el 5/nov/2026 e incorporado a esta edición antes de la publicación. Tipo de cambio: PTAX de venta del Banco Central de Brasil el 30/sep/2026, US$1 = R$5,1809.")

T("pan_h3_0", "2.0 · O mercado sob o índice · Swiss Re sigma 2/2026", "2.0 · The market under the index · Swiss Re sigma 2/2026", "2.0 · El mercado bajo el índice · Swiss Re sigma 2/2026")
T("fn_0",
  "O funding de insurtech corre dentro de um mercado de <b>US$8,5 trilhões</b> em prêmios. E esse mercado desacelera: a Swiss Re projeta crescimento real de 1,3% em 2026, depois de 3,9% em 2025. Quando o crescimento orgânico some, eficiência vira a disputa.",
  "Insurtech funding runs inside a market of <b>US$8.5 trillion</b> in premiums. And that market is slowing: Swiss Re projects 1.3% real growth in 2026, after 3.9% in 2025. When organic growth fades, efficiency becomes the contest.",
  "El funding de insurtech corre dentro de un mercado de <b>US$8,5 billones</b> en primas. Y ese mercado se desacelera: Swiss Re proyecta un crecimiento real de 1,3% en 2026, después de 3,9% en 2025. Cuando el crecimiento orgánico desaparece, la eficiencia pasa a ser la disputa.")
T("stn_0", "US$8,48tri", "US$8.48tn", "US$8,48 bill.")
T("stl_0", "prêmios globais em 2025 (US$7,90tri em 2024)", "global premiums in 2025 (US$7.90tn in 2024)", "primas globales en 2025 (US$7,90 billones en 2024)")
T("stn_1", "+1,3%", "+1.3%", "+1,3%")
T("stl_1", "crescimento real projetado para 2026, depois de +3,9% em 2025; +1,6% em 2027", "projected real growth for 2026, after +3.9% in 2025; +1.6% in 2027", "crecimiento real proyectado para 2026, después de +3,9% en 2025; +1,6% en 2027")
T("stn_2", "US$81bi", "US$81bn", "US$81.000 M")
T("stl_2", "Brasil, 15º mercado do mundo (1,0% do total), −6,4% em dólar contra 2024", "Brazil, the world's 15th market (1.0% share), −6.4% in dollars vs 2024", "Brasil, 15º mercado del mundo (1,0% del total), −6,4% en dólares frente a 2024")
T("stn_3", "−16,6%", "−16.6%", "−16,6%")
T("stl_3", "prêmios de vida no Brasil em 2025, com a poupança mais fraca; a Swiss Re projeta +5,3% em 2026", "Brazil life premiums in 2025, on weaker savings business; Swiss Re projects +5.3% in 2026", "primas de vida en Brasil en 2025, con un ahorro más débil; Swiss Re proyecta +5,3% en 2026")
T("fn_1",
  "Fonte: <b>Swiss Re Institute · sigma 2/2026, World insurance in 2026</b> (jul/2026), tabela 8 e capítulo de vida. Volumes em dólar nominal; o crescimento projetado é real. Não é comparável com o Allianz Global Insurance Report usado na Edição 01, que mede em euro nominal.",
  "Source: <b>Swiss Re Institute · sigma 2/2026, World insurance in 2026</b> (Jul 2026), table 8 and the life chapter. Volumes in nominal dollars; projected growth is real. Not comparable with the Allianz Global Insurance Report used in Issue 01, which measures in nominal euros.",
  "Fuente: <b>Swiss Re Institute · sigma 2/2026, World insurance in 2026</b> (jul/2026), tabla 8 y capítulo de vida. Volúmenes en dólares nominales; el crecimiento proyectado es real. No es comparable con el Allianz Global Insurance Report usado en la Edición 01, que mide en euros nominales.")

T("pan_h3_1", "2.1 · Funding global de insurtech · série trimestral (US$ bi)", "2.1 · Global insurtech funding · quarterly series (US$ bn)", "2.1 · Funding global de insurtech · serie trimestral (US$ mil M)")
T("viz_ring_l", "para IA · Q3'26", "to AI · Q3'26", "para IA · Q3'26")
T("stn_4", "−44,6%", "−44.6%", "−44,6%")
T("stl_4", "QoQ · Q2'26 → Q3'26 (2,44 → 1,36)", "QoQ · Q2'26 → Q3'26 (2.44 → 1.36)", "QoQ · Q2'26 → Q3'26 (2,44 → 1,36)")
T("stn_5", "+34,7%", "+34.7%", "+34,7%")
T("stl_5", "YoY · Q3'25 → Q3'26 (1,01 → 1,36), cálculo WIR sobre a série", "YoY · Q3'25 → Q3'26 (1.01 → 1.36), WIR calculation on the series", "YoY · Q3'25 → Q3'26 (1,01 → 1,36), cálculo WIR sobre la serie")
T("stn_6", "104", "104", "104")
T("stl_6", "deals no Q3'26, contra 107 no Q2; 64,4% nos EUA, um recorde", "deals in Q3'26, against 107 in Q2; 64.4% in the US, a record", "deals en el Q3'26, contra 107 en el Q2; 64,4% en EE. UU., un récord")
T("stn_7", "+20,1%", "+20.1%", "+20,1%")
T("stl_7", "early stage no Q3'26 (US$317,3M), depois de −51,8% no Q2", "early stage in Q3'26 (US$317.3M), after −51.8% in Q2", "early stage en el Q3'26 (US$317,3M), después de −51,8% en el Q2")
T("fn_2",
  "<b>No detalhe (Q3'26):</b> as empresas de IA captaram <b>US$1,13bi em 72 deals</b> (83,2% do total); as mega-rodadas somaram US$660M, contra US$1,67bi no Q2, e explicam a maior parte da queda. As insurtechs dos EUA ficaram com 64,4% dos deals, um recorde. A própria Gallagher Re pondera que provavelmente é cedo para falar em reversão: o Q2 foi inflado por mega-rodadas, e o Q3 ainda fica acima da média trimestral desde 2023 (US$1,28bi). Fonte: <b>Gallagher Re · Global InsurTech Report Q3 2026</b> (5/nov/2026). <b>Q2'26, para comparação:</b> IA com US$2,42bi em 95 deals (99,1%), toda rodada acima de US$5M foi para IA, e o maior deal foi a ICEYE (US$520M, Série F) (Gallagher Re Q2'26, 6/ago/2026). <b>Nota de cálculo:</b> o −44,6% QoQ é o da Gallagher Re; com os valores arredondados da série acima, daria −44,3%. O YoY de +34,7% é cálculo WIR sobre a mesma série: o relatório não traz variação anual do total, e o +34,9% publicado pela Business Insurance não aparece nele. Para o Q2'26, a Gallagher Re reporta ticket médio de US$29,46M (segundo a BeInsure), que não é 2,44bi ÷ 107 (US$22,8M); a média parece considerar só deals com valor divulgado. O mesmo vale para os US$25,79M do Q1'26 citados na Edição 01 (1,55bi ÷ 68 = US$22,8M). <b>Série:</b> o Q4'25 usa o valor revisado (1,67; o relatório original dizia 1,68). A soma de 2025 (US$5,08bi) e a de Q1 a Q3'26 (US$5,43bi) batem com os totais anuais do relatório Q3 (US$5.082M e US$5.427M). <b>Sobre o CB Insights</b> (US$2,4bi, 107 deals, mediana de US$7,2M no ano): a contagem de deals é idêntica à da Gallagher Re, então não o tratamos como segunda fonte independente. <b>Q3 por outra metodologia:</b> a FinTech Global contou US$753,4M em 77 deals no Q3'26, queda de 58% sobre o Q2 pela sua própria régua. A direção coincide com a da Gallagher Re; os valores, não. Não fundir com a série acima.",
  "<b>In detail (Q3'26):</b> AI companies raised <b>US$1.13bn across 72 deals</b> (83.2% of the total); mega-rounds added up to US$660M, against US$1.67bn in Q2, and explain most of the drop. US insurtechs took 64.4% of deals, a record. Gallagher Re itself cautions that it is probably too early to call a reversal: Q2 was inflated by mega-rounds, and Q3 still sits above the quarterly average since 2023 (US$1.28bn). Source: <b>Gallagher Re · Global InsurTech Report Q3 2026</b> (Nov 5, 2026). <b>Q2'26, for comparison:</b> AI took US$2.42bn across 95 deals (99.1%), every round above US$5M went to AI, and the largest deal was ICEYE (US$520M, Series F) (Gallagher Re Q2'26, Aug 6, 2026). <b>Calculation note:</b> the −44.6% QoQ is Gallagher Re's; with the rounded values in the series above it would be −44.3%. The +34.7% YoY is a WIR calculation on the same series: the report gives no annual change for the total, and the +34.9% published by Business Insurance does not appear in it. For Q2'26, Gallagher Re reports an average ticket of US$29.46M (per BeInsure), which is not 2.44bn ÷ 107 (US$22.8M); the average appears to count only deals with a disclosed amount. The same applies to the US$25.79M for Q1'26 quoted in Issue 01 (1.55bn ÷ 68 = US$22.8M). <b>Series:</b> Q4'25 uses the restated value (1.67; the original report said 1.68). The 2025 sum (US$5.08bn) and the Q1 to Q3'26 sum (US$5.43bn) match the annual totals in the Q3 report (US$5,082M and US$5,427M). <b>On CB Insights</b> (US$2.4bn, 107 deals, US$7.2M median year to date): its deal count is identical to Gallagher Re's, so we do not treat it as an independent second source. <b>Q3 by another methodology:</b> FinTech Global counted US$753.4M across 77 deals in Q3'26, down 58% on Q2 by its own measure. The direction matches Gallagher Re's; the values do not. Do not merge with the series above.",
  "<b>En detalle (Q3'26):</b> las empresas de IA captaron <b>US$1.130 millones en 72 deals</b> (83,2% del total); las mega-rondas sumaron US$660M, contra US$1.670 millones en el Q2, y explican la mayor parte de la caída. Las insurtechs de EE. UU. se quedaron con el 64,4% de los deals, un récord. La propia Gallagher Re advierte que probablemente es pronto para hablar de reversión: el Q2 fue inflado por mega-rondas, y el Q3 todavía queda por encima del promedio trimestral desde 2023 (US$1.280 millones). Fuente: <b>Gallagher Re · Global InsurTech Report Q3 2026</b> (5/nov/2026). <b>Q2'26, para comparar:</b> la IA captó US$2.420 millones en 95 deals (99,1%), toda ronda de más de US$5M fue para IA y el mayor deal fue ICEYE (US$520M, Serie F) (Gallagher Re Q2'26, 6/ago/2026). <b>Nota de cálculo:</b> el −44,6% QoQ es el de Gallagher Re; con los valores redondeados de la serie de arriba, daría −44,3%. El YoY de +34,7% es cálculo WIR sobre la misma serie: el informe no trae variación anual del total, y el +34,9% publicado por Business Insurance no aparece en él. Para el Q2'26, Gallagher Re reporta un ticket promedio de US$29,46M (según BeInsure), que no es 2.440 ÷ 107 (US$22,8M); el promedio parece considerar solo deals con monto divulgado. Lo mismo vale para los US$25,79M del Q1'26 citados en la Edición 01 (1.550 ÷ 68 = US$22,8M). <b>Serie:</b> el Q4'25 usa el valor revisado (1,67; el informe original decía 1,68). La suma de 2025 (US$5.080 millones) y la del Q1 al Q3'26 (US$5.430 millones) coinciden con los totales anuales del informe Q3 (US$5.082 M y US$5.427 M). <b>Sobre CB Insights</b> (US$2.400 millones, 107 deals, mediana de US$7,2M en el año): su conteo de deals es idéntico al de Gallagher Re, así que no lo tratamos como segunda fuente independiente. <b>El Q3 con otra metodología:</b> FinTech Global contó US$753,4M en 77 deals en el Q3'26, caída de 58% sobre el Q2 según su propia regla. La dirección coincide con la de Gallagher Re; los valores, no. No mezclar con la serie de arriba.")

T("pan_h3_2", "2.2 · Capital no Brasil e na América Latina, jul-set/2026", "2.2 · Capital in Brazil and Latin America, Jul-Sep 2026", "2.2 · Capital en Brasil y América Latina, jul-sep/2026")
T("fn_3",
  "Nenhuma rodada de equity de insurtech com valor divulgado no Brasil, México, Colômbia, Chile, Argentina ou Peru entre 1/jul e 30/set, nas fontes consultadas. Rodadas pequenas sem valor divulgado podem ter ficado de fora. O que andou foi M&amp;A.",
  "No insurtech equity round with a disclosed amount in Brazil, Mexico, Colombia, Chile, Argentina or Peru between Jul 1 and Sep 30, in the sources checked. Small rounds without a disclosed amount may be missing. What moved was M&amp;A.",
  "Ninguna ronda de equity de insurtech con monto divulgado en Brasil, México, Colombia, Chile, Argentina o Perú entre el 1/jul y el 30/sep, en las fuentes consultadas. Rondas pequeñas sin monto divulgado pueden haber quedado fuera. Lo que se movió fue M&amp;A.")
T("viz_months_t", "Rodadas de insurtech no Brasil em 2026, por mês (R$ M)", "Brazilian insurtech rounds in 2026, by month (R$ M)", "Rondas de insurtech en Brasil en 2026, por mes (R$ M)")
for i, (pt, en, es) in enumerate([("jan", "Jan", "ene"), ("fev", "Feb", "feb"), ("mar", "Mar", "mar"), ("abr", "Apr", "abr"), ("mai", "May", "may"),
                                  ("jun", "Jun", "jun"), ("jul", "Jul", "jul"), ("ago", "Aug", "ago"), ("set", "Sep", "sep"), ("out", "Oct", "oct")]):
    T(f"mo_{i}", pt, en, es)
T("viz_months_n",
  "Q3 (jul-set) em tracejado: zero. Março: Azos R$125M, Bliss R$57M, Hero R$35M · abril: Segura R$45M · junho: TRAG R$2,5M · outubro: Alice, US$40M (cerca de R$200M pela fonte). Fonte: guia insurtech.com.br, atualizado em 19/out/2026 (6 rodadas, cerca de R$465M no ano).",
  "Q3 (Jul-Sep) dashed: zero. March: Azos R$125M, Bliss R$57M, Hero R$35M · April: Segura R$45M · June: TRAG R$2.5M · October: Alice, US$40M (about R$200M per the source). Source: insurtech.com.br guide, updated Oct 19, 2026 (6 rounds, about R$465M year to date).",
  "Q3 (jul-sep) punteado: cero. Marzo: Azos R$125M, Bliss R$57M, Hero R$35M · abril: Segura R$45M · junio: TRAG R$2,5M · octubre: Alice, US$40M (cerca de R$200M según la fuente). Fuente: guía insurtech.com.br, actualizada el 19/oct/2026 (6 rondas, cerca de R$465M en el año).")
C["tbl_0"] = table(
    [L("Empresa", "Company", "Empresa"), L("Movimento", "Move", "Movimiento"), L("Valor", "Amount", "Monto"), L("Quando", "When", "Cuándo"), L("Por que importa", "Why it matters", "Por qué importa")],
    [['<span class="co">Hero Seguros</span> 🇧🇷 → Grupo CAM 🇲🇽', L("Compra de 100%, a 1ª da Hero", "Buys 100%, Hero's first deal", "Compra del 100%, la 1ª de Hero"), L("não divulgado", "undisclosed", "no divulgado"), L("jul/2026", "Jul 2026", "jul/2026"),
      L("MGA brasileira compra o agente geral de vendas da Europ Assistance no México, com parte da rodada de R$35M de março.", "A Brazilian MGA buys Europ Assistance's general sales agent in Mexico, partly with its R$35M March round.", "Una MGA brasileña compra el agente general de ventas de Europ Assistance en México, en parte con su ronda de R$35M de marzo.")],
     ['<span class="co">PicPay</span> 🇧🇷 → Kovr', L("Compra concluída", "Purchase closed", "Compra cerrada"), L('<span class="val">~R$657,6M</span>', '<span class="val">~R$657.6M</span>', '<span class="val">~R$657,6M</span>'), L("3/ago/2026", "Aug 3, 2026", "3/ago/2026"),
      L("Fintech de base massiva compra seguradora, previdência e capitalização, mais 53% de uma corretora. Valor segundo registros na SEC.", "A mass-market fintech buys an insurer, pension and capitalisation arm, plus 53% of a brokerage. Price per SEC filings.", "Una fintech masiva compra aseguradora, previsión y capitalización, más el 53% de una corredora. Valor según registros ante la SEC.")],
     ['<span class="co">Sompo</span> 🇧🇷 → Fator Seguradora', L("Compra anunciada", "Purchase announced", "Compra anunciada"), L("não divulgado", "undisclosed", "no divulgado"), L("jul/2026", "Jul 2026", "jul/2026"),
      L("Incumbente compra seguradora menor: carteira e licença, não tecnologia.", "An incumbent buys a smaller insurer: book and licence, not technology.", "Un incumbente compra una aseguradora menor: cartera y licencia, no tecnología.")],
     [L('<span class="co">MDS Brasil</span> → BKS Corretora e BKS Re', '<span class="co">MDS Brasil</span> → BKS Corretora and BKS Re', '<span class="co">MDS Brasil</span> → BKS Corretora y BKS Re'), L("Compra", "Purchase", "Compra"), L("não divulgado", "undisclosed", "no divulgado"), L("8/set/2026", "Sep 8, 2026", "8/sep/2026"),
      {l: v + " " + ONE[l] for l, v in L("Consolidação da corretagem especializada.", "Consolidation of specialist brokerage.", "Consolidación del corretaje especializado.").items()}],
     ])
T("fn_4",
  "<b>Fora da janela, registrado:</b> em outubro, a <b>Alice</b> 🇧🇷 captou US$40M em Série D liderada pelo IFC (19/out), e a <b>CNP Assurances</b> fechou acordo para comprar a Prudential no Brasil e no México por US$4,03bi (20/out, fechamento previsto no 2º semestre de 2027). <b>Correção da Edição 01:</b> duas rodadas do Q2 ficaram de fora e entram aqui: <b>Sofía</b> 🇲🇽, US$21M liderada pela Kfund (7/mai), e <b>Braven</b> 🇨🇴, seed de US$4,6M liderada pela Collide Capital (16/jun).",
  "<b>Outside the window, on record:</b> in October, <b>Alice</b> 🇧🇷 raised a US$40M Series D led by IFC (Oct 19), and <b>CNP Assurances</b> agreed to buy Prudential's Brazil and Mexico businesses for US$4.03bn (Oct 20, closing expected in H2 2027). <b>Correction to Issue 01:</b> two Q2 rounds were missing and are added here: <b>Sofía</b> 🇲🇽, US$21M led by Kfund (May 7), and <b>Braven</b> 🇨🇴, a US$4.6M seed led by Collide Capital (Jun 16).",
  "<b>Fuera de la ventana, registrado:</b> en octubre, <b>Alice</b> 🇧🇷 captó US$40M en una Serie D liderada por IFC (19/oct), y <b>CNP Assurances</b> acordó comprar Prudential en Brasil y México por US$4.030 millones (20/oct, cierre previsto en el 2º semestre de 2027). <b>Corrección a la Edición 01:</b> dos rondas del Q2 quedaron fuera y entran aquí: <b>Sofía</b> 🇲🇽, US$21M liderada por Kfund (7/may), y <b>Braven</b> 🇨🇴, seed de US$4,6M liderada por Collide Capital (16/jun).")

T("pan_h3_3", "2.3 · Cinco deals globais do trimestre", "2.3 · Five global deals of the quarter", "2.3 · Cinco deals globales del trimestre")
C["tbl_1"] = table(
    [L("Empresa", "Company", "Empresa"), L("Valor · valuation", "Amount · valuation", "Monto · valuation"), L("Lead / investidores", "Lead / investors", "Lead / inversores"), L("Por que importa", "Why it matters", "Por qué importa")],
    [['<span class="co">Angle Health</span> 🇺🇸', L('<span class="val">US$200M · Série C · US$2,7bi</span>', '<span class="val">US$200M · Series C · US$2.7bn</span>', '<span class="val">US$200M · Serie C · US$2.700 M</span>'), "Vitruvian Partners",
      L("Plano de saúde para pequenas empresas; a rodada veio com oferta de US$400M a acionistas atuais (set/2026).", "Health plans for small businesses; the round came with a US$400M tender for existing shareholders (Sep 2026).", "Planes de salud para pequeñas empresas; la ronda vino con una oferta de US$400M a accionistas actuales (sep/2026).")],
     ['<span class="co">Thatch</span> 🇺🇸', L('<span class="val">US$108M · Série C · US$1bi</span>', '<span class="val">US$108M · Series C · US$1bn</span>', '<span class="val">US$108M · Serie C · US$1.000 M</span>'), "General Catalyst, Index, a16z",
      L("Benefícios de saúde individualizados (ICHRA) para empresas (15/set).", "Individual-coverage health benefits (ICHRA) for employers (Sep 15).", "Beneficios de salud individualizados (ICHRA) para empresas (15/sep).")],
     ['<span class="co">Faye</span> 🇺🇸', L('<span class="val">US$50M · Série C</span>', '<span class="val">US$50M · Series C</span>', '<span class="val">US$50M · Serie C</span>'), "Madrona",
      L("Seguro viagem; a meta da empresa é liquidar mais da metade dos sinistros de forma autônoma com IA (5/ago).", "Travel insurance; the company's target is to settle more than half of claims autonomously with AI (Aug 5).", "Seguro de viaje; la meta de la empresa es liquidar más de la mitad de los siniestros de forma autónoma con IA (5/ago).")],
     ['<span class="co">Luzern Risk</span> 🇺🇸', L('<span class="val">US$45M · Série B</span>', '<span class="val">US$45M · Series B</span>', '<span class="val">US$45M · Serie B</span>'), "Insight Partners",
      L("Formação e gestão de captives com IA (17/set).", "AI-native captive formation and management (Sep 17).", "Formación y gestión de cautivas con IA (17/sep).")],
     ['<span class="co">Outmarket AI</span> 🇺🇸', L('<span class="val">US$34,5M · Série B</span>', '<span class="val">US$34.5M · Series B</span>', '<span class="val">US$34,5M · Serie B</span>'), "SignalFire",
      L("IA para o back-office de agências e corretoras: a mesma categoria da tese brasileira de Segura e Bliss (28/set).", "AI for agency and brokerage back-office: the same category as the Brazilian thesis behind Segura and Bliss (Sep 28).", "IA para el back-office de agencias y corredurías: la misma categoría de la tesis brasileña de Segura y Bliss (28/sep).")],
     ])
T("fn_5",
  "<b>Critério:</b> maiores rodadas de equity primário em insurtech anunciadas entre 1/jul e 30/set. Ficam fora a Cover Genius (US$100M da Vista Credit Partners, um fundo de crédito) e a AGI (lançamento com cerca de US$70M comprometidos). Menção à parte: a <b>Corgi</b> foi a US$4bi de valuation numa extensão de Série B sem valor divulgado (Bloco 3).",
  "<b>Criteria:</b> the largest primary equity rounds in insurtech announced between Jul 1 and Sep 30. Excluded: Cover Genius (US$100M from Vista Credit Partners, a credit fund) and AGI (a launch with about US$70M committed). Separate mention: <b>Corgi</b> reached a US$4bn valuation in a Series B extension with no disclosed amount (Block 3).",
  "<b>Criterio:</b> las mayores rondas de equity primario en insurtech anunciadas entre el 1/jul y el 30/sep. Quedan fuera Cover Genius (US$100M de Vista Credit Partners, un fondo de crédito) y AGI (lanzamiento con cerca de US$70M comprometidos). Mención aparte: <b>Corgi</b> llegó a US$4.000 millones de valuation en una extensión de Serie B sin monto divulgado (Bloque 3).")

T("pan_h3_4", "2.4 · Investidores mais ativos", "2.4 · Most active investors", "2.4 · Inversores más activos")
T("pbody_0",
  "Sem rodadas divulgadas no Brasil no Q3, não há ranking do trimestre. No acumulado de 2026, a <b style=\"color:var(--ink)\">Kaszek</b> segue o centro gravitacional (Azos, Segura, Sofía e, em outubro, Alice); <b style=\"color:var(--ink)\">Kfund</b> (Bliss, Sofía) e <b style=\"color:var(--ink)\">a16z</b> (Segura, Handle) aparecem duas vezes cada. A novidade de outubro é capital de desenvolvimento: <b style=\"color:var(--ink)\">IFC</b>, DEG e FinnFund na Alice.",
  "With no disclosed rounds in Brazil in Q3, there is no ranking for the quarter. Year to date in 2026, <b style=\"color:var(--ink)\">Kaszek</b> remains the centre of gravity (Azos, Segura, Sofía and, in October, Alice); <b style=\"color:var(--ink)\">Kfund</b> (Bliss, Sofía) and <b style=\"color:var(--ink)\">a16z</b> (Segura, Handle) appear twice each. October's novelty is development capital: <b style=\"color:var(--ink)\">IFC</b>, DEG and FinnFund in Alice.",
  "Sin rondas divulgadas en Brasil en el Q3, no hay ranking del trimestre. En el acumulado de 2026, <b style=\"color:var(--ink)\">Kaszek</b> sigue siendo el centro de gravedad (Azos, Segura, Sofía y, en octubre, Alice); <b style=\"color:var(--ink)\">Kfund</b> (Bliss, Sofía) y <b style=\"color:var(--ink)\">a16z</b> (Segura, Handle) aparecen dos veces cada uno. La novedad de octubre es capital de desarrollo: <b style=\"color:var(--ink)\">IFC</b>, DEG y FinnFund en Alice.")
T("fn_6",
  "No global, as (res)seguradoras apoiaram 25 investimentos em tecnologia no Q3'26, menos da metade das 51 do Q3'25; no Q2 tinham sido 27 (e 32 no Q1), com a Mitsui Sumitomo Insurance Venture Capital como a mais ativa, com 7. Fonte: Gallagher Re · Global InsurTech Report Q3 2026; Q2'26 via Reinsurance News.",
  "Globally, (re)insurers backed 25 technology investments in Q3'26, less than half the 51 of Q3'25; in Q2 they had made 27 (and 32 in Q1), with Mitsui Sumitomo Insurance Venture Capital the most active, with 7. Source: Gallagher Re · Global InsurTech Report Q3 2026; Q2'26 via Reinsurance News.",
  "En lo global, las (re)aseguradoras respaldaron 25 inversiones en tecnología en el Q3'26, menos de la mitad de las 51 del Q3'25; en el Q2 habían sido 27 (y 32 en el Q1), con Mitsui Sumitomo Insurance Venture Capital como la más activa, con 7. Fuente: Gallagher Re · Global InsurTech Report Q3 2026; Q2'26 vía Reinsurance News.")

# ---------------------------------------------------------------- Bloco 3
T("bloco_3", "Bloco 3 · Empresas em destaque", "Block 3 · Companies in focus", "Bloque 3 · Empresas destacadas")
T("h2_3", "Três empresas que definem o trimestre", "Three companies that define the quarter", "Tres empresas que definen el trimestre")
T("sub_2",
  "Estrutura fixa: o que faz · o que aconteceu no trimestre · por que importa · o que observar. Critério: uma global, uma do Brasil e uma de categoria nova, escolhidas pelo movimento no trimestre, com ao menos duas fontes.",
  "Fixed structure: what it does · what happened in the quarter · why it matters · what to watch. Criteria: one global, one from Brazil and one from a new category, chosen for their move in the quarter, with at least two sources.",
  "Estructura fija: qué hace · qué pasó en el trimestre · por qué importa · qué observar. Criterio: una global, una de Brasil y una de categoría nueva, elegidas por su movimiento en el trimestre, con al menos dos fuentes.")
DT = [L("O que faz", "What it does", "Qué hace"), L("No trimestre", "In the quarter", "En el trimestre"), L("Por que importa", "Why it matters", "Por qué importa"), L("O que observar", "What to watch", "Qué observar")]
PROFILES = [
    ("Corgi", L("Global"), L("🇺🇸 carrier IA-nativa · valuation US$4bi", "🇺🇸 AI-native carrier · US$4bn valuation", "🇺🇸 carrier IA-nativa · valuation US$4.000 M"), [
        L("Seguradora full-stack IA-nativa para startups (D&amp;O, E&amp;O, cyber), com subscrição e sinistros automatizados.",
          "A full-stack AI-native insurer for startups (D&amp;O, E&amp;O, cyber), with automated underwriting and claims.",
          "Aseguradora full-stack IA-nativa para startups (D&amp;O, E&amp;O, cyber), con suscripción y siniestros automatizados."),
        L("Extensão da Série B a valuation de US$4bi (22/jul), contra US$2,6bi em maio, sem valor divulgado. Um Form D registra US$40,7M vendidos a 11 investidores.",
          "A Series B extension at a US$4bn valuation (Jul 22), up from US$2.6bn in May, with no disclosed amount. A Form D records US$40.7M sold to 11 investors.",
          "Extensión de la Serie B a una valuation de US$4.000 millones (22/jul), contra US$2.600 millones en mayo, sin monto divulgado. Un Form D registra US$40,7M vendidos a 11 inversores."),
        L("Segunda reprecificação em dois meses: o mercado continua pagando prêmio por carrier construída sobre dado de subscrição.",
          "A second repricing in two months: the market keeps paying a premium for a carrier built on underwriting data.",
          "Segunda revaluación en dos meses: el mercado sigue pagando una prima por una carrier construida sobre dato de suscripción."),
        L("Na Edição 01 dissemos: sinistralidade. Ainda não há dado público. Sem ele, o valuation é aposta, não prova.",
          "In Issue 01 we said: loss ratio. There is still no public data. Without it, the valuation is a bet, not proof.",
          "En la Edición 01 dijimos: siniestralidad. Todavía no hay dato público. Sin él, la valuation es apuesta, no prueba.")]),
    ("Hero Seguros", L("Brasil", "Brazil", "Brasil"), L("🇧🇷 MGA · primeira aquisição", "🇧🇷 MGA · first acquisition", "🇧🇷 MGA · primera adquisición"), [
        L("MGA B2B2C de seguro viagem e proteção financeira, distribuída por parceiros.",
          "A B2B2C MGA for travel insurance and financial protection, distributed through partners.",
          "MGA B2B2C de seguro de viaje y protección financiera, distribuida por socios."),
        L("Comprou 100% do Grupo CAM, agente geral de vendas da Europ Assistance no México (jul/2026). Parte da rodada de R$35M de março pagou a compra. A Hero já opera em Brasil, Argentina, Uruguai e Chile, e soma México, Colômbia, Honduras e Costa Rica.",
          "Bought 100% of Grupo CAM, Europ Assistance's general sales agent in Mexico (Jul 2026). Part of its R$35M March round paid for it. Hero already operates in Brazil, Argentina, Uruguay and Chile, and adds Mexico, Colombia, Honduras and Costa Rica.",
          "Compró el 100% del Grupo CAM, agente general de ventas de Europ Assistance en México (jul/2026). Parte de la ronda de R$35M de marzo pagó la compra. Hero ya opera en Brasil, Argentina, Uruguay y Chile, y suma México, Colombia, Honduras y Costa Rica."),
        L("Num trimestre sem rodadas, uma insurtech brasileira usou capital para comprar canal fora do país. É o padrão do tri em miniatura.",
          "In a quarter without rounds, a Brazilian insurtech used capital to buy distribution abroad. It is the quarter's pattern in miniature.",
          "En un trimestre sin rondas, una insurtech brasileña usó capital para comprar canal fuera del país. Es el patrón del trimestre en miniatura."),
        L("Integração e margem: se o modelo de MGA escala sob outro regulador sem perder eficiência.",
          "Integration and margin: whether the MGA model scales under another regulator without losing efficiency.",
          "Integración y margen: si el modelo de MGA escala bajo otro regulador sin perder eficiencia.")]),
    ("AIUC", L("Categoria nova", "New category", "Categoría nueva"), L("🇺🇸 seguro e certificação para agentes de IA · US$40M", "🇺🇸 insurance and certification for AI agents · US$40M", "🇺🇸 seguro y certificación para agentes de IA · US$40M"), [
        L("Cria um padrão de certificação (AIUC-1) e seguro para empresas que colocam agentes de IA em produção.",
          "Builds a certification standard (AIUC-1) and insurance for companies that put AI agents into production.",
          "Crea un estándar de certificación (AIUC-1) y seguro para empresas que ponen agentes de IA en producción."),
        L("Série A de US$40M liderada pela Ribbit Capital (15/set), US$55M no total; clientes citados incluem Cursor, Lovable, Harvey e ElevenLabs. Em outubro, AICPA e AIUC anunciaram uma oferta conjunta de SOC 2 com AIUC-1.",
          "A US$40M Series A led by Ribbit Capital (Sep 15), US$55M in total; named customers include Cursor, Lovable, Harvey and ElevenLabs. In October, the AICPA and AIUC announced a joint SOC 2 plus AIUC-1 offering.",
          "Serie A de US$40M liderada por Ribbit Capital (15/sep), US$55M en total; clientes citados incluyen Cursor, Lovable, Harvey y ElevenLabs. En octubre, AICPA y AIUC anunciaron una oferta conjunta de SOC 2 con AIUC-1."),
        L("Risco de IA começa a ter preço. Para seguradoras, é nova linha de receita e, ao mesmo tempo, exposição silenciosa nas apólices de cyber e tecnologia.",
          "AI risk is starting to get a price. For insurers it is a new revenue line and, at the same time, a silent exposure in cyber and technology policies.",
          "El riesgo de IA empieza a tener precio. Para las aseguradoras es una nueva línea de ingresos y, a la vez, una exposición silenciosa en las pólizas de cyber y tecnología."),
        L("Quem põe capacidade atrás desse risco, e se as exclusões de IA avançam nas apólices gerais: o CEO da Chubb já espera \"esclarecimentos de cobertura e, por fim, exclusões\" (21/out, tradução livre).",
          "Who puts capacity behind this risk, and whether AI exclusions spread in general policies: Chubb's CEO already expects \"a combination of coverage clarifications, ultimately exclusions\" (Oct 21).",
          "Quién pone capacidad detrás de este riesgo, y si las exclusiones de IA avanzan en las pólizas generales: el CEO de Chubb ya espera \"aclaraciones de cobertura y, al final, exclusiones\" (21/oct, traducción libre).")]),
]
for i, (name, tag, meta, dds) in enumerate(PROFILES):
    C[f"pf_tag_{i}"] = tag
    C[f"pf_meta_{i}"] = meta
    for j in range(4):
        C[f"pf_dt_{i * 4 + j}"] = DT[j]
        C[f"pf_dd_{i * 4 + j}"] = dds[j]

T("h3_watch", "Watch list · rotaciona por edição", "Watch list · rotates every issue", "Watch list · rota en cada edición")
EQ = '<span class="mv-tag mv-eq">= mantém</span>'
EQd = L(EQ, '<span class="mv-tag mv-eq">= stays</span>', '<span class="mv-tag mv-eq">= se mantiene</span>')
IN = L('<span class="mv-tag mv-new">+ entra</span>', '<span class="mv-tag mv-new">+ joins</span>', '<span class="mv-tag mv-new">+ entra</span>')
OUT = L('<span class="mv-tag mv-out">− sai</span>', '<span class="mv-tag mv-out">− leaves</span>', '<span class="mv-tag mv-out">− sale</span>')
C["tbl_2"] = table(
    [L("Empresa", "Company", "Empresa"), "Geo", L("Movimento", "Move", "Movimiento"), L("Por que está na lista", "Why it's on the list", "Por qué está en la lista")],
    [['<span class="co">Segura</span>', "🇧🇷", EQd, L("A assistente Helena entra no ConectaCor, do Sincor-SP, com alcance de quase 11 mil corretores (out/2026).", "Its Helena assistant goes into Sincor-SP's ConectaCor, reaching almost 11,000 brokers (Oct 2026).", "La asistente Helena entra en ConectaCor, de Sincor-SP, con alcance de casi 11 mil corredores (oct/2026).")],
     ['<span class="co">Bliss</span>', "🇧🇷", EQd, L("Assistente de back-office \"Fátima\"; cotação e emissão em 3 a 4 minutos, segundo a empresa (jul/2026).", "\"Fátima\" back-office assistant; quote and issuance in 3 to 4 minutes, per the company (Jul 2026).", "Asistente de back-office \"Fátima\"; cotización y emisión en 3 a 4 minutos, según la empresa (jul/2026).")],
     ['<span class="co">Handle</span>', "🇲🇽", EQd, L("Sem notícia pública no trimestre; segue o par mais direto da WIR em computer use para corretor.", "No public news in the quarter; still WIR's most direct peer in computer use for brokers.", "Sin noticia pública en el trimestre; sigue siendo el par más directo de WIR en computer use para corredores.")],
     ['<span class="co">Brick</span>', "🇧🇷", EQd, L("Parceria com a allseg (set/2026); automação do lado da seguradora.", "Partnership with allseg (Sep 2026); insurer-side automation.", "Alianza con allseg (sep/2026); automatización del lado de la aseguradora.")],
     ['<span class="co">Avla</span>', "🇧🇷/🇨🇱", EQd, L("Plano de investir US$150M num novo braço de resseguro em 12 a 18 meses, com capital dos sócios e caixa próprio (Exame e CQCS, out/2026).", "Plans to put US$150M into a new reinsurance arm over 12 to 18 months, funded by shareholders and its own cash (Exame and CQCS, Oct 2026).", "Plan de invertir US$150M en un nuevo brazo de reaseguro en 12 a 18 meses, con capital de los socios y caja propia (Exame y CQCS, oct/2026).")],
     ['<span class="co">180 Seguros</span>', "🇧🇷", IN, L("Sinalizou uma Série B de pelo menos US$50M; principal candidata a cumprir a Previsão 01.", "Has signalled a Series B of at least US$50M; the leading candidate to fulfil Prediction 01.", "Señaló una Serie B de al menos US$50M; principal candidata a cumplir la Predicción 01.")],
     ['<span class="co">Outmarket AI</span>', "🇺🇸", IN, L("US$34,5M em Série B (SignalFire, set/2026) para IA no back-office de agências e corretoras.", "US$34.5M Series B (SignalFire, Sep 2026) for AI in agency and brokerage back-office.", "US$34,5M en Serie B (SignalFire, sep/2026) para IA en el back-office de agencias y corredurías.")],
     ['<span class="co">Braven</span>', "🇨🇴", IN, L("Infraestrutura de agentes de IA para seguradoras, corretoras e MGAs; seed de US$4,6M (jun/2026). A Colômbia entra no radar.", "AI agent infrastructure for insurers, brokers and MGAs; US$4.6M seed (Jun 2026). Colombia enters the radar.", "Infraestructura de agentes de IA para aseguradoras, corredores y MGAs; seed de US$4,6M (jun/2026). Colombia entra en el radar.")],
     ['<span class="co">Akur8</span> · <span class="co">Sixfold</span>', "🇫🇷 · 🇺🇸", OUT, L("Rotação: sem movimento público verificado no trimestre.", "Rotation: no verified public move in the quarter.", "Rotación: sin movimiento público verificado en el trimestre.")],
     ])

# ---------------------------------------------------------------- Bloco 4
T("bloco_4", "Bloco 4 · Radar regulatório &amp; estrutural", "Block 4 · Regulatory &amp; structural radar", "Bloque 4 · Radar regulatorio &amp; estructural")
T("h2_4", "O que muda a decisão do C-level", "What changes the C-suite's decision", "Lo que cambia la decisión del C-level")
T("sub_3",
  "Regulatório traduzido para linguagem de decisão. Formato fixo: o que aconteceu, o que significa na prática, prazo ou próximo marco. Nesta edição, a regulação de IA ganha espaço próprio, no Brasil e lá fora.",
  "Regulation translated into decision language. Fixed format: what happened, what it means in practice, deadline or next milestone. In this issue, AI regulation gets its own space, in Brazil and abroad.",
  "Regulación traducida a lenguaje de decisión. Formato fijo: qué pasó, qué significa en la práctica, plazo o próximo hito. En esta edición, la regulación de IA gana su propio espacio, en Brasil y afuera.")
C["reg_0"] = reg(L("Nova Lei de Seguros vira regra: Res. CNSP 496", "The new Insurance Law becomes rules: CNSP Resolution 496", "La nueva Ley de Seguros se vuelve norma: Res. CNSP 496"), [
    (HAPPENED, L("Publicada em 18/ago/2026, regulamenta a Lei 15.040/2024 para os contratos de seguro de danos, revoga a Res. CNSP 407/2021 (grandes riscos) e permite regulação e liquidação de sinistro em até 120 dias em sete grupos de ramos. <span class=\"src\">Demarest (25/ago/2026).</span>",
                 "Published on Aug 18, 2026, it implements Law 15,040/2024 for P&amp;C insurance contracts, repeals CNSP Resolution 407/2021 (large risks) and allows claims adjustment and settlement of up to 120 days in seven groups of lines. <span class=\"src\">Demarest (Aug 25, 2026).</span>",
                 "Publicada el 18/ago/2026, reglamenta la Ley 15.040/2024 para los contratos de seguros de daños, deroga la Res. CNSP 407/2021 (grandes riesgos) y permite el ajuste y la liquidación de siniestros en hasta 120 días en siete grupos de ramos. <span class=\"src\">Demarest (25/ago/2026).</span>")),
    (PRACTICE, L("Clausulados, produtos e prazos de sinistro precisam ser refeitos em menos de cinco meses. Quem tem regra de negócio presa em sistema legado vai sentir o prazo.",
                 "Policy wordings, products and claims deadlines must be redone in under five months. Anyone with business rules locked in a legacy system will feel the deadline.",
                 "Condicionados, productos y plazos de siniestro deben rehacerse en menos de cinco meses. Quien tenga reglas de negocio atrapadas en un sistema legado va a sentir el plazo.")),
    (NEXT, L("Produtos registrados adaptados até 4/jan/2027; todo contrato novo ou renovado cumpre a partir de 5/jan/2027.",
             "Registered products adapted by Jan 4, 2027; every contract signed or renewed complies from Jan 5, 2027.",
             "Productos registrados adaptados al 4/ene/2027; todo contrato nuevo o renovado cumple desde el 5/ene/2027.")),
])
C["reg_1"] = reg(L("Open Insurance: da construção para a revisão", "Open Insurance: from build-out to review", "Open Insurance: de la construcción a la revisión"), [
    (HAPPENED, L("A SUSEP prorrogou por um ano o grupo de trabalho de revisão do OPIN (Portaria 8.575, publicada em 24/ago) e manteve a revisão como prioridade P1 no Plano de Regulação (Res. Susep 91). Em 23/out abriu as Consultas Públicas 12 e 13/2026: governança permanente e novos critérios de participação obrigatória. <span class=\"src\">OPIN Brasil, CQCS, insurtech.com.br.</span>",
                 "SUSEP extended the OPIN review working group by one year (Portaria 8,575, published Aug 24) and kept the review as a P1 priority in its Regulation Plan (Susep Resolution 91). On Oct 23 it opened Public Consultations 12 and 13/2026: permanent governance and new criteria for mandatory participation. <span class=\"src\">OPIN Brasil, CQCS, insurtech.com.br.</span>",
                 "La SUSEP prorrogó por un año el grupo de trabajo de revisión del OPIN (Portaria 8.575, publicada el 24/ago) y mantuvo la revisión como prioridad P1 en su Plan de Regulación (Res. Susep 91). El 23/oct abrió las Consultas Públicas 12 y 13/2026: gobernanza permanente y nuevos criterios de participación obligatoria. <span class=\"src\">OPIN Brasil, CQCS, insurtech.com.br.</span>")),
    (PRACTICE, L("A CNseg resume o problema: \"O cliente, ou potencial cliente, simplesmente não aderiu ao Open Insurance\" (Revista Apólice, set/2026). Não vale apostar a estratégia de 2027 em fluxo de dados via OPIN.",
                 "CNseg sums up the problem: \"the customer, or potential customer, simply did not adopt Open Insurance\" (Revista Apólice, Sep 2026). Do not bet the 2027 strategy on data flows through OPIN.",
                 "La CNseg resume el problema: \"el cliente, o cliente potencial, simplemente no adhirió al Open Insurance\" (Revista Apólice, sep/2026, traducción libre). No conviene apostar la estrategia de 2027 a flujos de datos vía OPIN.")),
    (NEXT, L("O prazo de contribuições às duas consultas estava previsto para o início de novembro; o próximo marco são as resoluções finais.", "The comment period on both consultations was set to close in early November; the next milestone is the final resolutions.", "El plazo de contribuciones a ambas consultas estaba previsto para inicios de noviembre; el próximo hito son las resoluciones finales.")),
])
C["reg_2"] = reg(L("IA no Brasil: sem lei, regulação por sandbox", "AI in Brazil: no law, regulation by sandbox", "IA en Brasil: sin ley, regulación por sandbox"), [
    (HAPPENED, L("O PL 2338/2023 segue na Comissão Especial da Câmara aguardando o parecer do relator, Dep. Aguinaldo Ribeiro; não houve parecer nem votação no Q3. Sem lei, a ANPD avança pelo sandbox: o primeiro sandbox regulatório de IA, com três empresas até dez/2026, publicou o 1º relatório parcial em 2/jul, e em 2/set a agência anunciou um centro de IA próprio e uma segunda edição para 2027. O Plano de Regulação da SUSEP revisado em agosto não tem item de IA. <span class=\"src\">Câmara dos Deputados (27/out); Tozzini Freire (21/ago); Convergência Digital (2/set); Res. Susep 91.</span>",
                 "PL 2338/2023 remains in the Chamber's Special Committee awaiting the rapporteur's report, by Deputy Aguinaldo Ribeiro; there was no report and no vote in Q3. Without a law, the ANPD (data protection authority) moves through its sandbox: the first AI regulatory sandbox, with three companies until Dec 2026, published its first partial report on Jul 2, and on Sep 2 the agency announced its own AI centre and a second edition for 2027. SUSEP's Regulation Plan, revised in August, has no AI item. <span class=\"src\">Chamber of Deputies (Oct 27); Tozzini Freire (Aug 21); Convergência Digital (Sep 2); Susep Resolution 91.</span>",
                 "El PL 2338/2023 sigue en la Comisión Especial de la Cámara esperando el dictamen del relator, Dip. Aguinaldo Ribeiro; no hubo dictamen ni votación en el Q3. Sin ley, la ANPD avanza por el sandbox: el primer sandbox regulatorio de IA, con tres empresas hasta dic/2026, publicó su 1er informe parcial el 2/jul, y el 2/sep la agencia anunció un centro de IA propio y una segunda edición para 2027. El Plan de Regulación de la SUSEP revisado en agosto no tiene ítem de IA. <span class=\"src\">Cámara de Diputados (27/oct); Tozzini Freire (21/ago); Convergência Digital (2/sep); Res. Susep 91.</span>")),
    (PRACTICE, L("Em 2026, a governança de IA nas seguradoras continua ancorada na LGPD e nas regras gerais de controles internos. Quem documentar decisão, explicabilidade e trilha de auditoria agora chega pronto a qualquer texto final.",
                 "In 2026, AI governance at insurers stays anchored in the LGPD and in general internal-controls rules. Whoever documents decisions, explainability and audit trail now will be ready for any final text.",
                 "En 2026, la gobernanza de IA en las aseguradoras sigue anclada en la LGPD y en las reglas generales de controles internos. Quien documente decisiones, explicabilidad y trazabilidad ahora llega listo a cualquier texto final.")),
    (NEXT, L("Sem data. É a nossa Previsão 06 (Bloco 7).", "No date. It is our Prediction 06 (Block 7).", "Sin fecha. Es nuestra Predicción 06 (Bloque 7).")),
])
C["reg_3"] = reg(L("IA lá fora: Europa adia, EUA avançam por boletim", "AI abroad: Europe delays, the US advances by bulletin", "IA afuera: Europa posterga, EE.UU. avanza por boletín"), [
    (HAPPENED, L("O Digital Omnibus entrou em vigor em 27/jul e adiou para 2/dez/2027 as obrigações de alto risco do AI Act, inclusive precificação e avaliação de risco em seguro de vida e saúde; desde 2/ago valem as regras de transparência e a fiscalização de modelos de uso geral. Nos EUA, 29 jurisdições já adotaram o boletim de IA da NAIC (Mississippi e Carolina do Sul no Q3), e a NAIC pôs em consulta um framework para fornecedores de dados e modelos. <span class=\"src\">Comissão Europeia; NAIC (8/out).</span>",
                 "The Digital Omnibus entered into force on Jul 27 and moved the AI Act's high-risk obligations to Dec 2, 2027, including risk assessment and pricing in life and health insurance; since Aug 2, transparency rules and enforcement on general-purpose models apply. In the US, 29 jurisdictions have adopted the NAIC AI bulletin (Mississippi and South Carolina in Q3), and the NAIC exposed a framework for third-party data and model vendors. <span class=\"src\">European Commission; NAIC (Oct 8).</span>",
                 "El Digital Omnibus entró en vigor el 27/jul y postergó al 2/dic/2027 las obligaciones de alto riesgo del AI Act, incluida la tarificación y la evaluación de riesgo en seguros de vida y salud; desde el 2/ago rigen las reglas de transparencia y la fiscalización de modelos de uso general. En EE.UU., 29 jurisdicciones ya adoptaron el boletín de IA de la NAIC (Mississippi y Carolina del Sur en el Q3), y la NAIC puso en consulta un framework para proveedores de datos y modelos. <span class=\"src\">Comisión Europea; NAIC (8/oct).</span>")),
    (PRACTICE, L("Grupos globais com operação no Brasil ganham 16 meses na Europa, mas o regulador americano já olha para o fornecedor do modelo, não só para a seguradora.",
                 "Global groups operating in Brazil gain 16 months in Europe, but the US regulator is already looking at the model vendor, not only the insurer.",
                 "Los grupos globales con operación en Brasil ganan 16 meses en Europa, pero el regulador estadounidense ya mira al proveedor del modelo, no solo a la aseguradora.")),
    (NEXT, L("NAIC volta ao tema em 16/nov/2026; alto risco do AI Act em 2/dez/2027.", "The NAIC returns to it on Nov 16, 2026; AI Act high-risk on Dec 2, 2027.", "La NAIC vuelve al tema el 16/nov/2026; alto riesgo del AI Act el 2/dic/2027.")),
])
C["reg_4"] = reg(L("Corretagem e consolidação: menos deals, tickets maiores", "Brokerage and consolidation: fewer deals, bigger tickets", "Corretaje y consolidación: menos deals, tickets más grandes"), [
    (HAPPENED, {l: v + " " + ONE[l] for l, v in L(
        "A Res. CNSP 493 (17/jul) consolida 13 normas sobre corretores e autorreguladoras e vigora 180 dias após a publicação. No M&amp;A, a KPMG contou 7 operações em seguros no 1º semestre, contra 13 um ano antes; a Acorn e a TTR, 16 até 8/out, contra 45 em todo 2025. <span class=\"src\">Monitor Mercantil (Res. 493); CQCS citando Valor; Let's Money.</span>",
        "CNSP Resolution 493 (Jul 17) consolidates 13 rules on brokers and self-regulatory bodies and takes effect 180 days after publication. In M&amp;A, KPMG counted 7 insurance deals in H1, against 13 a year earlier; Acorn and TTR, 16 through Oct 8, against 45 in all of 2025. <span class=\"src\">Monitor Mercantil (Res. 493); CQCS citing Valor; Let's Money.</span>",
        "La Res. CNSP 493 (17/jul) consolida 13 normas sobre corredores y autorreguladoras y rige 180 días después de su publicación. En M&amp;A, KPMG contó 7 operaciones en seguros en el 1er semestre, contra 13 un año antes; Acorn y TTR, 16 hasta el 8/oct, contra 45 en todo 2025. <span class=\"src\">Monitor Mercantil (Res. 493); CQCS citando a Valor; Let's Money.</span>").items()}),
    (PRACTICE, L("O canal está sendo comprado por quem tem balanço: PicPay, Sompo, MDS e, em outubro, a CNP, que vai pagar US$4,03bi pela Prudential no Brasil e no México.",
                 "Distribution is being bought by whoever has a balance sheet: PicPay, Sompo, MDS and, in October, CNP, which will pay US$4.03bn for Prudential in Brazil and Mexico.",
                 "El canal lo está comprando quien tiene balance: PicPay, Sompo, MDS y, en octubre, CNP, que pagará US$4.030 millones por Prudential en Brasil y México.")),
    (NEXT, L("Regras de corretagem em vigor no início de 2027; fechamento CNP e Prudential previsto no 2º semestre de 2027.", "Brokerage rules in force in early 2027; CNP and Prudential closing expected in H2 2027.", "Reglas de corretaje vigentes a inicios de 2027; cierre de CNP y Prudential previsto en el 2º semestre de 2027.")),
])
C["reg_5"] = reg(L("STF: PIS/Cofins fora do rendimento das reservas técnicas", "Supreme Court: no PIS/Cofins on technical-reserve income", "STF: PIS/Cofins fuera del rendimiento de las reservas técnicas"), [
    (HAPPENED, L("Por 6 a 4, o STF decidiu que os rendimentos da aplicação das reservas técnicas não integram o faturamento sujeito a PIS e Cofins (RE 1479774, Tema 1.309, 2/set/2026). <span class=\"src\">STF.</span>",
                 "By 6 to 4, Brazil's Supreme Court ruled that income from investing technical reserves is not part of the revenue subject to PIS and Cofins (RE 1479774, Theme 1,309, Sep 2, 2026). <span class=\"src\">STF.</span>",
                 "Por 6 a 4, el STF decidió que los rendimientos de la inversión de las reservas técnicas no integran la facturación sujeta a PIS y Cofins (RE 1479774, Tema 1.309, 2/sep/2026). <span class=\"src\">STF.</span>")),
    (PRACTICE, L("Alívio no resultado financeiro das seguradoras, num ano em que o crescimento real dos prêmios desacelera.", "Relief for insurers' financial results, in a year when real premium growth is slowing.", "Alivio en el resultado financiero de las aseguradoras, en un año en que el crecimiento real de las primas se desacelera.")),
    (VECTOR, L("Acompanhar o efeito nas demonstrações das seguradoras listadas.", "Watch the effect on listed insurers' financial statements.", "Seguir el efecto en los estados financieros de las aseguradoras listadas.")),
])
T("fn_7",
  "<b>Colômbia</b> entra no radar nesta edição. A Superintendencia Financiera adiou para 1/jan/2028 o novo regime de reservas técnicas e a IFRS 17 (Circular Externa 006/2026); as seguradoras tinham até 31/ago/2026 para entregar o plano de implementação, e 2027 vira ano de transição. Não encontramos regra ou sandbox de IA da SFC voltados a seguradoras. <span class=\"src\">INCP (mai/2026).</span> <span class=\"flag fwarn\">1 fonte</span>",
  "<b>Colombia</b> enters the radar in this issue. The Superintendencia Financiera postponed the new technical-reserves regime and IFRS 17 to Jan 1, 2028 (External Circular 006/2026); insurers had until Aug 31, 2026 to file their implementation plan, and 2027 becomes a transition year. We found no AI rule or sandbox from the SFC aimed at insurers. <span class=\"src\">INCP (May 2026).</span> <span class=\"flag fwarn\">1 source</span>",
  "<b>Colombia</b> entra en el radar en esta edición. La Superintendencia Financiera postergó al 1/ene/2028 el nuevo régimen de reservas técnicas y la NIIF 17 (Circular Externa 006/2026); las aseguradoras tenían hasta el 31/ago/2026 para entregar su plan de implementación, y 2027 pasa a ser año de transición. No encontramos una regla o sandbox de IA de la SFC dirigidos a aseguradoras. <span class=\"src\">INCP (may/2026).</span> <span class=\"flag fwarn\">1 fuente</span>")

# ---------------------------------------------------------------- Bloco 5
T("bloco_5", "Bloco 5 · O framework proprietário", "Block 5 · The proprietary framework", "Bloque 5 · El framework propietario")
T("h2_5", "WIR AI Adoption Index", "WIR AI Adoption Index", "WIR AI Adoption Index")
T("sub_4",
  "A peça que só a WIR publica, repetida toda edição. Posiciona players com operação no Brasil por <b>profundidade de automação</b> (eixo X) e <b>linhas de negócio cobertas por IA</b> (eixo Y), a partir de sinais públicos. Nesta edição publicamos, pela primeira vez, a rubrica de cada eixo e a nota de cada ponto.",
  "The piece only WIR publishes, repeated every issue. It positions players operating in Brazil by <b>automation depth</b> (X axis) and <b>lines of business covered by AI</b> (Y axis), based on public signals. In this issue we publish, for the first time, the rubric for each axis and the score for each point.",
  "La pieza que solo WIR publica, repetida en cada edición. Ubica a players con operación en Brasil por <b>profundidad de automatización</b> (eje X) y <b>líneas de negocio cubiertas por IA</b> (eje Y), a partir de señales públicas. En esta edición publicamos, por primera vez, la rúbrica de cada eje y la nota de cada punto.")
T("q_yaxis", "↑ Mais linhas de negócio cobertas por IA", "↑ More lines of business covered by AI", "↑ Más líneas de negocio cubiertas por IA")
T("q_xlow", "Automação rasa", "Shallow automation", "Automatización superficial")
T("q_xhigh", "Automação profunda (agêntica) →", "Deep (agentic) automation →", "Automatización profunda (agéntica) →")
T("q_zone", "LÍDERES DE ADOÇÃO", "ADOPTION LEADERS", "LÍDERES DE ADOPCIÓN")
QL = [("Incumbente tradicional A", "Traditional incumbent A", "Incumbente tradicional A"), ("Incumbente tradicional B", "Traditional incumbent B", "Incumbente tradicional B"),
      ("Grande grupo bancário-seguro", "Large bank-insurer group", "Gran grupo bancario-seguros"), ("Neoseguradora auto", "Auto neo-insurer", "Neoaseguradora auto"),
      ("Azos (MGA vida)", "Azos (life MGA)", "Azos (MGA vida)"), ("Corretoras tradicionais", "Traditional brokerages", "Corredurías tradicionales"), ("Player IA-nativo", "AI-native player", "Player IA-nativo")]
for i, (pt, en, es) in enumerate(QL):
    T(f"ql_{i}", pt, en, es)
T("h3_rubric", "Rubrica · níveis de 0 a 4", "Rubric · levels 0 to 4", "Rúbrica · niveles de 0 a 4")
C["tbl_3"] = table(
    [L("Nível", "Level", "Nivel"), L("Eixo X · profundidade de automação", "X axis · automation depth", "Eje X · profundidad de automatización"), L("Eixo Y · linhas cobertas por IA", "Y axis · lines covered by AI", "Eje Y · líneas cubiertas por IA")],
    [["0", L("Sem uso público de IA na operação", "No public use of AI in operations", "Sin uso público de IA en la operación"), L("Nenhuma linha", "No line", "Ninguna línea")],
     ["1", L("Assistente ou copiloto: sugere, o humano executa", "Assistant or copilot: suggests, a human executes", "Asistente o copiloto: sugiere, el humano ejecuta"), L("Uma linha ou um processo isolado", "One line or one isolated process", "Una línea o un proceso aislado")],
     ["2", L("Automação de etapas (leitura, triagem, roteamento), com decisão humana", "Step automation (reading, triage, routing), with human decision", "Automatización de etapas (lectura, triaje, ruteo), con decisión humana"), L("Duas a três linhas", "Two to three lines", "Dos a tres líneas")],
     ["3", L("Decisão automática em parte do fluxo, com supervisão humana", "Automated decision in part of the flow, with human supervision", "Decisión automática en parte del flujo, con supervisión humana"), L("A maioria das linhas core", "Most core lines", "La mayoría de las líneas core")],
     ["4", L("Agentes executam fluxos ponta a ponta em produção, com trilha de auditoria", "Agents run end-to-end flows in production, with an audit trail", "Agentes ejecutan flujos de punta a punta en producción, con trazabilidad de auditoría"), L("Todas as linhas core e a distribuição", "All core lines plus distribution", "Todas las líneas core y la distribución")],
     ])
T("h3_pos", "Posições desta edição", "Positions in this issue", "Posiciones de esta edición")
CONF_M = L('<span class="conf c-md">Média</span>', '<span class="conf c-md">Medium</span>', '<span class="conf c-md">Media</span>')
CONF_R = L('<span class="conf c-lo">Restrita</span>', '<span class="conf c-lo">Restricted</span>', '<span class="conf c-lo">Restringida</span>')
NOSIG = L("Sem sinal público novo de automação", "No new public automation signal", "Sin señal pública nueva de automatización")
NDA = L("Base sob NDA", "Basis under NDA", "Base bajo NDA")
POS = [  # label, x, y, confidence, Q3 note
    (L("Incumbente tradicional A", "Traditional incumbent A", "Incumbente tradicional A"), "0,6", "2,7", CONF_R, NDA),
    (L("Incumbente tradicional B", "Traditional incumbent B", "Incumbente tradicional B"), "0,9", "3,1", CONF_R, NDA),
    (L("Grande grupo bancário-seguro", "Large bank-insurer group", "Gran grupo bancario-seguros"), "1,6", "2,4", CONF_R, NDA),
    (L("Neoseguradora auto", "Auto neo-insurer", "Neoaseguradora auto"), "1,2", "1,2", CONF_R, NDA),
    (L("Corretoras tradicionais", "Traditional brokerages", "Corredurías tradicionales"), "1,8", "0,7", CONF_M,
     L("Assistente Helena chega a quase 11 mil corretores via ConectaCor (out/2026): é nível 1 da rubrica e não move o ponto", "Helena assistant reaches almost 11,000 brokers via ConectaCor (Oct 2026): rubric level 1, does not move the point", "La asistente Helena llega a casi 11 mil corredores vía ConectaCor (oct/2026): es nivel 1 de la rúbrica y no mueve el punto")),
    ("Justos", "2,5", "1,7", CONF_M, NOSIG),
    ("Azos", "2,8", "2,7", CONF_M, NOSIG),
    ("180 Seguros", "3,1", "3,1", CONF_M, NOSIG),
    ("Darwin", "3,4", "2,2", CONF_M, NOSIG),
    (L("Player IA-nativo", "AI-native player", "Player IA-nativo"), "3,7", "3,3", CONF_R, NDA),
]
C["tbl_4"] = table(
    [L("Player", "Player", "Player"), "X", "Y", L("Confiança", "Confidence", "Confianza"), L("vs Ed. 01", "vs Issue 01", "vs Ed. 01"), L("Sinal no Q3", "Q3 signal", "Señal en el Q3")],
    [[p[0], p[1], p[2], p[3], "=", p[4]] for p in POS])
T("fn_8",
  "<b>Como ler:</b> X e Y vão de 0 a 4 pela rubrica acima. As notas, com uma casa decimal, reproduzem a posição no gráfico; a incerteza real é de cerca de meio nível. <b>Confiança:</b> alta, com dois ou mais sinais públicos independentes em 12 meses; média, com um; restrita, quando a base é sob NDA e o nome não é publicado. <b>Nesta edição, nenhum ponto se moveu:</b> nenhum sinal público novo cruzou um nível da rubrica, o que conversa com a pesquisa da S&amp;P (8% com IA integrada). É a primeira versão da rubrica; críticas são bem-vindas (veja Governança).",
  "<b>How to read it:</b> X and Y run from 0 to 4 on the rubric above. Scores, to one decimal, reproduce the position on the chart; real uncertainty is about half a level. <b>Confidence:</b> high, with two or more independent public signals in 12 months; medium, with one; restricted, when the basis is under NDA and the name is not published. <b>In this issue, no point moved:</b> no new public signal crossed a rubric level, which matches the S&amp;P survey (8% with integrated AI). This is the first version of the rubric; criticism is welcome (see Governance).",
  "<b>Cómo leerlo:</b> X e Y van de 0 a 4 según la rúbrica de arriba. Las notas, con un decimal, reproducen la posición en el gráfico; la incertidumbre real es de cerca de medio nivel. <b>Confianza:</b> alta, con dos o más señales públicas independientes en 12 meses; media, con una; restringida, cuando la base está bajo NDA y el nombre no se publica. <b>En esta edición ningún punto se movió:</b> ninguna señal pública nueva cruzó un nivel de la rúbrica, lo que coincide con la encuesta de S&amp;P (8% con IA integrada). Es la primera versión de la rúbrica; las críticas son bienvenidas (ver Gobernanza).")

# ---------------------------------------------------------------- Bloco 6
T("bloco_6", "Bloco 6 · Insights WIR", "Block 6 · WIR Insights", "Bloque 6 · Insights WIR")
T("h2_6", "A fronteira da IA, traduzida para seguros", "The AI frontier, translated for insurance", "La frontera de la IA, traducida a seguros")
T("sub_5", "Não é sobre a WIR: é a WIR mostrando como pensa. Zero jargão sem tradução; toda afirmação técnica com fonte; pelo menos um item cético.",
  "It is not about WIR: it is WIR showing how it thinks. No untranslated jargon; every technical claim sourced; at least one sceptical item.",
  "No se trata de WIR: es WIR mostrando cómo piensa. Cero jerga sin traducir; toda afirmación técnica con fuente; al menos un ítem escéptico.")
T("in_n_0", "6.1 · O avanço do trimestre", "6.1 · The breakthrough of the quarter", "6.1 · El avance del trimestre")
T("in_h3_0", "Agentes que trabalham por horas, a custo menor", "Agents that work for hours, at lower cost", "Agentes que trabajan por horas, a menor costo")
T("in_p_0",
  "Em setembro, a <b>Anthropic</b> lançou o Claude Opus 5.5 (22/set), que segundo a empresa custa 40% menos que o Opus 5 em cargas típicas, e o Sonnet 5.5 (28/set). A <b>OpenAI</b> lançou o GPT-6 Astra (3/set) e pôs computer use na Agents API (29/set). O <b>Google</b> anunciou o Gemini 4 Argon (30/set). O que muda: o custo por tarefa cai e o horizonte de trabalho de um agente passa de minutos para horas; um testador do Opus 5.5 relata mais de 18 horas na mesma tarefa. <span class=\"src\">Anthropic newsroom; changelog da API da OpenAI; blog do Google (set/2026).</span>",
  "In September, <b>Anthropic</b> launched Claude Opus 5.5 (Sep 22), which the company says costs 40% less than Opus 5 on typical workloads, and Sonnet 5.5 (Sep 28). <b>OpenAI</b> launched GPT-6 Astra (Sep 3) and added computer use to its Agents API (Sep 29). <b>Google</b> announced Gemini 4 Argon (Sep 30). What changes: cost per task falls and an agent's working horizon moves from minutes to hours; an Opus 5.5 tester reports more than 18 hours on a single task. <span class=\"src\">Anthropic newsroom; OpenAI API changelog; Google blog (Sep 2026).</span>",
  "En septiembre, <b>Anthropic</b> lanzó Claude Opus 5.5 (22/sep), que según la empresa cuesta 40% menos que Opus 5 en cargas típicas, y Sonnet 5.5 (28/sep). <b>OpenAI</b> lanzó GPT-6 Astra (3/sep) y sumó computer use a su Agents API (29/sep). <b>Google</b> anunció Gemini 4 Argon (30/sep). Qué cambia: el costo por tarea cae y el horizonte de trabajo de un agente pasa de minutos a horas; un tester de Opus 5.5 reporta más de 18 horas en una misma tarea. <span class=\"src\">Anthropic newsroom; changelog de la API de OpenAI; blog de Google (sep/2026).</span>")
T("in_n_1", "6.2 · Ponte para seguros", "6.2 · Bridge to insurance", "6.2 · Puente hacia seguros")
T("in_h3_1", "Onde isso vira margem, e onde ainda não", "Where this becomes margin, and where not yet", "Dónde esto se vuelve margen, y dónde todavía no")
T("viz_ins_n", "US$80-160 bi", "US$80-160bn", "US$80.000-160.000 M")
T("viz_ins_l", "economia potencial com IA contra fraude no P&amp;C global até 2032 (Deloitte, faixa)", "potential savings from AI against fraud in global P&amp;C by 2032 (Deloitte, range)", "ahorro potencial con IA contra fraude en el P&amp;C global hasta 2032 (Deloitte, rango)")
T("in_p_1",
  "O ganho já aparece em produção onde o fluxo é repetitivo e o dado é rico. A <b>Porto</b> pôs um agente no WhatsApp que já automatiza 70% das aberturas de sinistro de roubo e furto de veículos. A <b>Travelers</b> usa IA no processamento straight-through de sinistros. A chinesa <b>Cheche</b> reporta +30% de eficiência no fluxo de liquidação com um agente de sinistros em operação. A leitura da WIR: o ganho durável está no <b>dado</b> que cada interação captura, não na automação em si.<br><br>A <b>Deloitte</b> estima que analytics de fraude com IA pode poupar ao P&amp;C global entre US$80 bi e US$160 bi até 2032; corrigimos aqui a Edição 01, que citou só o teto da faixa. E o risco de IA vira mercado: a <b>AIUC</b>, que certifica e segura agentes de IA, captou US$40M numa Série A liderada pela Ribbit (15/set).",
  "The gain already shows up in production where the flow is repetitive and the data is rich. <b>Porto</b> put an agent on WhatsApp that already automates 70% of the openings of vehicle theft claims. <b>Travelers</b> uses AI in straight-through claims processing. China's <b>Cheche</b> reports +30% settlement workflow efficiency with a claims agent in operation. WIR's reading: the durable gain lies in the <b>data</b> each interaction captures, not in the automation itself.<br><br><b>Deloitte</b> estimates that AI fraud analytics could save global P&amp;C between US$80bn and US$160bn by 2032; we correct Issue 01 here, which quoted only the top of the range. And AI risk is becoming a market: <b>AIUC</b>, which certifies and insures AI agents, raised a US$40M Series A led by Ribbit (Sep 15).",
  "La ganancia ya aparece en producción donde el flujo es repetitivo y el dato es rico. <b>Porto</b> puso un agente en WhatsApp que ya automatiza el 70% de las aperturas de siniestros por robo y hurto de vehículos. <b>Travelers</b> usa IA en el procesamiento straight-through de siniestros. La china <b>Cheche</b> reporta +30% de eficiencia en el flujo de liquidación con un agente de siniestros en operación. La lectura de WIR: la ganancia durable está en el <b>dato</b> que cada interacción captura, no en la automatización en sí.<br><br><b>Deloitte</b> estima que la analítica de fraude con IA puede ahorrar al P&amp;C global entre US$80.000 y US$160.000 millones hasta 2032; corregimos aquí la Edición 01, que citó solo el techo del rango. Y el riesgo de IA se vuelve mercado: <b>AIUC</b>, que certifica y asegura agentes de IA, captó US$40M en una Serie A liderada por Ribbit (15/sep).")
T("in_n_2", "6.3 · Radar tech", "6.3 · Tech radar", "6.3 · Radar tech")
REL = L('<span class="verd v-rel">relevante</span>', '<span class="verd v-rel">relevant</span>', '<span class="verd v-rel">relevante</span>')
OBS = L('<span class="verd v-obs">observar</span>', '<span class="verd v-obs">watch</span>', '<span class="verd v-obs">observar</span>')
CET = L('<span class="verd v-cet">cético</span>', '<span class="verd v-cet">sceptical</span>', '<span class="verd v-cet">escéptico</span>')
RADAR = [
    (L("Claude Opus 5.5 e Sonnet 5.5: agentes de horas a custo menor (set/26)", "Claude Opus 5.5 and Sonnet 5.5: hour-long agents at lower cost (Sep 26)", "Claude Opus 5.5 y Sonnet 5.5: agentes de horas a menor costo (sep/26)"), REL),
    (L("OpenAI: computer use na Agents API (29/set) e GPT-6 Astra (3/set)", "OpenAI: computer use in the Agents API (Sep 29) and GPT-6 Astra (Sep 3)", "OpenAI: computer use en la Agents API (29/sep) y GPT-6 Astra (3/sep)"), REL),
    (L("Gemini 4 Argon: anunciado em 30/set, na API desde 13/out", "Gemini 4 Argon: announced Sep 30, in the API since Oct 13", "Gemini 4 Argon: anunciado el 30/sep, en la API desde el 13/oct"), OBS),
    (L("Data centers de IA viram risco segurável: prêmios projetados de US$10,6bi para US$24,2bi até 2030 (Swiss Re, citado pela Gallagher Re)", "AI data centres become an insurable risk: premiums projected from US$10.6bn to US$24.2bn by 2030 (Swiss Re, cited by Gallagher Re)", "Los data centers de IA se vuelven riesgo asegurable: primas proyectadas de US$10.600 a US$24.200 millones hasta 2030 (Swiss Re, citado por Gallagher Re)"), REL),
    (L("Meta Muse: agente de consumo que preenche formulários e compra sozinho (8/set)", "Meta Muse: a consumer agent that fills forms and buys on its own (Sep 8)", "Meta Muse: agente de consumo que llena formularios y compra solo (8/sep)"), OBS),
    (L("S&amp;P (22/set): só 8% das (res)seguradoras têm IA integrada; sem impacto material na rentabilidade", "S&amp;P (Sep 22): only 8% of (re)insurers have integrated AI; no material impact on profitability", "S&amp;P (22/sep): solo el 8% de las (re)aseguradoras tiene IA integrada; sin impacto material en la rentabilidad"), CET),
    (L("KPMG (29/set): só 11% das seguradoras veem o ROI da IA com muita clareza", "KPMG (Sep 29): only 11% of insurers see AI's ROI very clearly", "KPMG (29/sep): solo el 11% de las aseguradoras ve el ROI de la IA con mucha claridad"), CET),
]
for i, (txt, verd) in enumerate(RADAR):
    C[f"rad_{i}"] = {l: f"<span>{txt[l]}</span>{verd[l]}" for l in ("pt", "en", "es")}
T("fn_9",
  "<b>Item cético:</b> o system card do GPT-6 Astra, da própria OpenAI (3/set), mostra que, em testes de ambiente de trabalho sem política de confirmação, o GPT-5.6 Sol fez transações não autorizadas em 38% dos casos, contra 6,8% do Astra. Agente em sinistro ou cotação precisa de alçada, confirmação e trilha de auditoria desde o primeiro dia.",
  "<b>Sceptical item:</b> OpenAI's own GPT-6 Astra system card (Sep 3) shows that, in work-environment tests without a confirmation policy, GPT-5.6 Sol made unauthorised transactions in 38% of cases, against 6.8% for Astra. An agent in claims or quoting needs authority limits, confirmation and an audit trail from day one.",
  "<b>Ítem escéptico:</b> el system card de GPT-6 Astra, de la propia OpenAI (3/sep), muestra que, en pruebas de entorno de trabajo sin política de confirmación, GPT-5.6 Sol hizo transacciones no autorizadas en el 38% de los casos, contra 6,8% de Astra. Un agente en siniestros o cotización necesita límites de autoridad, confirmación y trazabilidad desde el primer día.")

# ---------------------------------------------------------------- Bloco 7
T("bloco_7", "Bloco 7 · Scorecard &amp; previsões", "Block 7 · Scorecard &amp; predictions", "Bloque 7 · Scorecard &amp; predicciones")
T("h2_7", "Conferimos as nossas apostas", "We grade our own bets", "Revisamos nuestras apuestas")
T("sub_6",
  "Prometido na Edição 01: o scorecard começa agora. Cada previsão tem critério objetivo e prazo; acerto e erro ficam publicados, inclusive quando a culpa é nossa.",
  "Promised in Issue 01: the scorecard starts now. Every prediction has an objective test and a deadline; hits and misses stay published, including when the fault is ours.",
  "Prometido en la Edición 01: el scorecard empieza ahora. Cada predicción tiene criterio objetivo y plazo; aciertos y errores quedan publicados, incluso cuando la culpa es nuestra.")
T("sc_tally",
  "<span><b>Placar da Edição 01:</b></span><span class=\"st st-ok\">✓ 1 cumprida</span><span class=\"st st-no\">✗ 1 errada</span><span class=\"st st-open\">1 em aberto</span>",
  "<span><b>Issue 01 scorecard:</b></span><span class=\"st st-ok\">✓ 1 hit</span><span class=\"st st-no\">✗ 1 miss</span><span class=\"st st-open\">1 open</span>",
  "<span><b>Marcador de la Edición 01:</b></span><span class=\"st st-ok\">✓ 1 cumplida</span><span class=\"st st-no\">✗ 1 fallida</span><span class=\"st st-open\">1 abierta</span>")


def card(n, deadline, status_cls, status, claim, evidence):
    return f'<div class="sc-top"><span class="sc-n">{n} · {deadline}</span><span class="st {status_cls}">{status}</span></div><p>{claim}</p><div class="sc-ev">{evidence}</div>'


C["sc_0"] = {
    "pt": card("Previsão 01", "vence 31/dez/2026", "st-open", "Em aberto", "Uma insurtech B2B brasileira anuncia Série B acima de US$30M até o fim do Q4 2026.",
               "<b>Até 28/out:</b> nenhum anúncio. O caso mais próximo é a Alice (US$40M, Série D, 19/out), mas ela é operadora de saúde e vende para empresas, não para seguradoras ou corretoras: não conta. A candidata mais visível é a 180 Seguros, que sinalizou uma Série B de pelo menos US$50M. Pela PTAX de 30/set, o corte equivale a cerca de R$155M."),
    "en": card("Prediction 01", "due Dec 31, 2026", "st-open", "Open", "A Brazilian B2B insurtech announces a Series B above US$30M by the end of Q4 2026.",
               "<b>As of Oct 28:</b> no announcement. The closest case is Alice (US$40M, Series D, Oct 19), but it is a health plan operator selling to employers, not to insurers or brokers: it does not count. The most visible candidate is 180 Seguros, which has signalled a Series B of at least US$50M. At the Sep 30 PTAX, the bar equals about R$155M."),
    "es": card("Predicción 01", "vence 31/dic/2026", "st-open", "Abierta", "Una insurtech B2B brasileña anuncia una Serie B de más de US$30M antes del fin del Q4 2026.",
               "<b>Al 28/oct:</b> ningún anuncio. El caso más cercano es Alice (US$40M, Serie D, 19/oct), pero es una operadora de salud que vende a empresas, no a aseguradoras ni corredores: no cuenta. La candidata más visible es 180 Seguros, que señaló una Serie B de al menos US$50M. Con la PTAX del 30/sep, el corte equivale a cerca de R$155M."),
}
C["sc_1"] = {
    "pt": card("Previsão 02", "vence 31/dez/2026", "st-ok", "✓ Cumprida", "Ao menos uma seguradora Tier-1 no Brasil coloca um agente de IA em produção em sinistros ou cotação (não piloto).",
               "<b>Cumprida.</b> A Porto lançou um agente conversacional no WhatsApp que já automatiza 70% das aberturas de sinistro de roubo e furto de veículos, disponível em todo o Brasil, com CSAT acima de 80% (Revista Apólice e Revista Cobertura, 1/out/2026). <b>Ressalva:</b> o agente abre o sinistro, não decide; e a Mapfre já operava abertura de sinistro com IA generativa no WhatsApp em Auto desde 2025. A previsão era menos ousada do que parecia."),
    "en": card("Prediction 02", "due Dec 31, 2026", "st-ok", "✓ Hit", "At least one Tier-1 insurer in Brazil puts an AI agent into production in claims or quoting (not a pilot).",
               "<b>Hit.</b> Porto launched a conversational agent on WhatsApp that already automates 70% of the openings of vehicle theft claims, available across Brazil, with CSAT above 80% (Revista Apólice and Revista Cobertura, Oct 1, 2026). <b>Caveat:</b> the agent opens the claim, it does not decide it; and Mapfre had been opening Auto claims with generative AI on WhatsApp since 2025. The prediction was less bold than it looked."),
    "es": card("Predicción 02", "vence 31/dic/2026", "st-ok", "✓ Cumplida", "Al menos una aseguradora Tier-1 en Brasil pone un agente de IA en producción en siniestros o cotización (no piloto).",
               "<b>Cumplida.</b> Porto lanzó un agente conversacional en WhatsApp que ya automatiza el 70% de las aperturas de siniestros por robo y hurto de vehículos, disponible en todo Brasil, con CSAT superior al 80% (Revista Apólice y Revista Cobertura, 1/oct/2026). <b>Salvedad:</b> el agente abre el siniestro, no lo decide; y Mapfre ya abría siniestros de Auto con IA generativa en WhatsApp desde 2025. La predicción era menos audaz de lo que parecía."),
}
C["sc_2"] = {
    "pt": card("Previsão 03", "venceu 30/set/2026", "st-no", "✗ Errada", "A SUSEP publica avanço concreto do Open Insurance (Fase 3) até set/2026.",
               "<b>Errada, e com erro nosso na premissa.</b> A Fase 3 já tinha sido concluída em 2025 (Revista Apólice, set/2026). Entre março e setembro, a SUSEP fez uma tomada de subsídios, e o único ato normativo foi a Portaria 8.575, que prorrogou por mais um ano o grupo de trabalho de revisão do OPIN. As primeiras minutas concretas, as Consultas Públicas 12 e 13/2026, saíram no DOU em 23/out, 23 dias depois do prazo."),
    "en": card("Prediction 03", "expired Sep 30, 2026", "st-no", "✗ Miss", "SUSEP publishes concrete progress on Open Insurance (Phase 3) by Sep 2026.",
               "<b>Missed, with an error of ours in the premise.</b> Phase 3 had already been completed in 2025 (Revista Apólice, Sep 2026). Between March and September, SUSEP ran a call for input, and the only normative act was Portaria 8,575, which extended the OPIN review working group by another year. The first concrete drafts, Public Consultations 12 and 13/2026, appeared in the Official Gazette on Oct 23, 23 days after the deadline."),
    "es": card("Predicción 03", "venció 30/sep/2026", "st-no", "✗ Fallida", "La SUSEP publica un avance concreto del Open Insurance (Fase 3) a sep/2026.",
               "<b>Fallida, y con un error nuestro en la premisa.</b> La Fase 3 ya se había concluido en 2025 (Revista Apólice, sep/2026). Entre marzo y septiembre, la SUSEP hizo una consulta de insumos, y el único acto normativo fue la Portaria 8.575, que prorrogó por un año más el grupo de trabajo de revisión del OPIN. Los primeros borradores concretos, las Consultas Públicas 12 y 13/2026, salieron en el DOU el 23/oct, 23 días después del plazo."),
}
T("h3_new", "Três apostas novas, com prazo", "Three new bets, with deadlines", "Tres apuestas nuevas, con plazo")
T("pr_p_0", "Pelo menos uma insurtech ou MGA brasileira passa ao controle de uma seguradora, corretora, banco ou fintech até 31/mar/2027.",
  "At least one Brazilian insurtech or MGA comes under the control of an insurer, broker, bank or fintech by Mar 31, 2027.",
  "Al menos una insurtech o MGA brasileña pasa al control de una aseguradora, corredora, banco o fintech antes del 31/mar/2027.")
T("pr_crit_0", "<b>Verificação:</b> anúncio de aquisição de controle confirmado em ao menos duas fontes.", "<b>Test:</b> announcement of a controlling acquisition confirmed in at least two sources.", "<b>Verificación:</b> anuncio de adquisición de control confirmado en al menos dos fuentes.")
T("pr_p_1", "A SUSEP publica a resolução final de governança permanente do Open Insurance, fruto da Consulta Pública 12/2026, até 30/jun/2027.",
  "SUSEP publishes the final resolution on Open Insurance's permanent governance, resulting from Public Consultation 12/2026, by Jun 30, 2027.",
  "La SUSEP publica la resolución final de gobernanza permanente del Open Insurance, fruto de la Consulta Pública 12/2026, antes del 30/jun/2027.")
T("pr_crit_1", "<b>Verificação:</b> resolução publicada no DOU.", "<b>Test:</b> resolution published in the Official Gazette (DOU).", "<b>Verificación:</b> resolución publicada en el DOU.")
T("pr_p_2", "O PL 2338, de IA, não é aprovado pelo Plenário da Câmara até 31/mar/2027.",
  "AI bill PL 2338 is not approved by the full Chamber of Deputies by Mar 31, 2027.",
  "El PL 2338, de IA, no es aprobado por el Pleno de la Cámara antes del 31/mar/2027.")
T("pr_crit_2", "<b>Verificação:</b> ficha de tramitação do PL 2338/2023 na Câmara.", "<b>Test:</b> the Chamber's tracking page for PL 2338/2023.", "<b>Verificación:</b> ficha de tramitación del PL 2338/2023 en la Cámara.")
T("fn_10",
  "As previsões novas são numeradas em sequência (04 a 06) e serão conferidas a partir da Edição 03. A Previsão 01 continua valendo até 31/dez/2026.",
  "New predictions are numbered in sequence (04 to 06) and will be graded from Issue 03 onwards. Prediction 01 remains live until Dec 31, 2026.",
  "Las predicciones nuevas se numeran en secuencia (04 a 06) y se revisarán a partir de la Edición 03. La Predicción 01 sigue vigente hasta el 31/dic/2026.")

# ---------------------------------------------------------------- Fontes, governança, disclosure
T("bloco_8", "Fontes &amp; verificação", "Sources &amp; verification", "Fuentes &amp; verificación")
T("h2_8", "Confira você mesmo", "Check it yourself", "Compruébalo tú mismo")
T("sub_7", "Transparência é método. Todo número deste índice tem fonte pública: clique e verifique na origem.",
  "Transparency is method. Every number in this index has a public source: click and verify it at the origin.",
  "La transparencia es método. Todo número de este índice tiene fuente pública: haz clic y verifícalo en el origen.")
SRC_CATS = [
    (L("Mercado global &amp; funding", "Global market &amp; funding", "Mercado global &amp; funding"), [
        ("Gallagher Re · Global InsurTech Report Q3 2026 (PDF)", "https://www.ajg.com/gallagherre/-/media/files/gallagher/gallagherre/news-and-insights/2026/november/global-insurtech-report-q3-2026.pdf"),
        ("Reinsurance News · Gallagher Re Q3'26", "https://www.reinsurancene.ws/global-insurtech-funding-fell-44-6-to-1-36bn-in-q326-gallagher-re/"),
        ("Business Insurance · Gallagher Re Q3'26", "https://www.businessinsurance.com/q3-global-insurtech-funding-drops-44-6-gallagher-re/"),
        ("ProgramBusiness · Gallagher Re Q3'26", "https://programbusiness.com/news/global-insurtech-funding-falls-44-6-in-third-quarter-gallagher-re-reports/"),
        ("Gallagher Re · Global InsurTech Report Q2 2026", "https://www.ajg.com/gallagherre/news-and-insights/global-insurtech-report-q2-2026/"),
        ("Reinsurance News · Gallagher Re Q2'26", "https://www.reinsurancene.ws/insurtech-funding-hits-four-year-high-as-ai-firms-capture-99-of-investment-gallagher-re/"),
        ("Insurance Business · Gallagher Re Q2'26", "https://www.insurancebusinessmag.com/reinsurance/news/breaking-news/ai-takes-99-1-of-insurtech-funding-as-data-centre-risk-mounts-gallagher-re-finds-585180.aspx"),
        ("CB Insights · State of Insurtech Q2'26", "https://www.cbinsights.com/research/report/insurtech-trends-q2-2026/"),
        ("InsurTech Analyst (FinTech Global) · Q3 2026", "https://insurtechanalyst.com/2026/10/06/india-emerged-as-one-of-the-top-insurtech-hubs-in-q3-as-deal-activity-grew-13-qoq/"),
        ("Swiss Re Institute · sigma 2/2026 (PDF)", "https://www.swissre.com/dam/jcr:409c0f6b-ae4a-4de3-aec1-9864abb3fa62/2026-07-sri-world-insurance-sigma.2026-07-08-12-37-18.pdf"),
    ]),
    (L("Deals globais &amp; seguro para IA", "Global deals &amp; insurance for AI", "Deals globales &amp; seguro para IA"), [
        ("Angle Health · Coverager", "https://coverager.com/angle-health-raises-200-million/"),
        ("Thatch · FinTech Global", "https://fintech.global/2026/09/16/thatch-raises-108m-at-1bn-valuation-for-health-benefits/"),
        ("Faye · Skift", "https://skift.com/2026/08/05/faye-raises-50-million-bets-on-ai-to-get-travel-insurance-claims-paid-in-minutes/"),
        ("Luzern Risk · FinTech Global", "https://fintech.global/2026/09/18/luzern-risk-raises-45m-series-b-led-by-insight-partners/"),
        ("Outmarket AI · TechCrunch", "https://techcrunch.com/2026/09/28/insuretech-outmarket-raises-34-5m-just-months-after-prior-round/"),
        ("Corgi US$4bi · FinTech Global", "https://fintech.global/2026/07/24/corgis-valuation-soars-to-4bn-in-new-series-b-extension/"),
        ("AIUC US$40M · TechCrunch", "https://techcrunch.com/2026/09/15/early-anthropic-hire-former-metr-coo-have-found-a-way-to-rein-in-rogue-ai-agents/"),
    ]),
    (L("Brasil &amp; América Latina", "Brazil &amp; Latin America", "Brasil &amp; América Latina"), [
        ("insurtech.com.br · investimentos em 2026", "https://www.insurtech.com.br/guia/investimentos-em-insurtech-em-2026/"),
        ("Hero e Grupo CAM · CQCS", "https://cqcs.com.br/noticia/hero-seguros-acelera-expansao-na-america-latina-com-aquisicao-do-grupo-cam-no-mexico/"),
        ("PicPay e Kovr · Times Brasil", "https://timesbrasil.com.br/empresas-e-negocios/picpay-conclui-aquisicao-da-kovr-e-reforca-operacao-de-seguros/"),
        ("M&amp;A em seguros 2026 · Let's Money", "https://www.letsmoney.com.br/noticias/ma-seguros-2026-ticket-mediano-acorn-advisory/"),
        ("KPMG, M&amp;A 1º semestre · CQCS", "https://cqcs.com.br/noticia/fusoes-e-aquisicoes-ganham-forca-no-setor-de-seguros-apos-queda-nas-operacoes/"),
        ("MDS e BKS · Exame", "https://exame.com/insight/mds-brasil-compra-corretora-que-domina-seguros-de-carros-fortes/p"),
        ("Alice US$40M · insurtech.com.br", "https://www.insurtech.com.br/seguros/alice-capta-us-40-milhoes-em-serie-d-liderada-pelo-ifc-e-acelera-aposta-em-operacao-nativa-em-ia/"),
        ("CNP e Prudential · O Brasilianista", "https://obrasilianista.com.br/2026/10/26/economia/quem-fica-com-os-seguros-brasileiros"),
        ("Sofía US$21M · DPL News", "https://dplnews.com/sofia-levanta-21-mdd/"),
        ("Braven US$4,6M · LatamList", "https://latamlist.com/braven-raises-4-6m-seed-round-to-expand-ai-insurance-infrastructure-platform/"),
    ]),
    (L("Regulatório", "Regulation", "Regulatorio"), [
        ("Res. CNSP 496 · Demarest", "https://www.demarest.com.br/en/susep-publica-resolucao-cnsp-no-496-2026-sobre-contratos-de-seguros-de-danos/"),
        ("Res. Susep 91 · Legismap", "https://legismap.com.br/leis-e-normas/resolucao-susep-n-091-de-18-08-2026"),
        ("Portaria Susep 8.575 · OPIN Brasil", "https://opinbrasil.com.br/cidadao/noticias/portaria-susep-n-8-575-de-7-de-agosto-de-2026"),
        ("Consultas Públicas 12 e 13/2026 · insurtech.com.br", "https://www.insurtech.com.br/seguros/susep-abre-duas-consultas-publicas-para-definir-a-governanca-definitiva-do-open-insurance-e-ajustar-a-resolucao-cnsp-415-2021/"),
        ("OPIN, promessa ou realidade · Revista Apólice", "https://revistaapolice.com.br/2026/09/opin-promessa-ou-realidade/"),
        ("PL 2338/2023 · Câmara dos Deputados", "https://www.camara.leg.br/proposicoesWeb/fichadetramitacao?idProposicao=2487262"),
        ("AI Act · Comissão Europeia", "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai"),
        ("NAIC · AI Model Bulletin (mapa, PDF)", "https://content.naic.org/sites/default/files/legal-adoption-map-ai-model-bulletin.pdf"),
        ("STF · PIS/Cofins e reservas técnicas", "https://noticias.stf.jus.br/postsnoticias/pis-cofins-nao-incidem-sobre-rendimentos-de-reservas-tecnicas-de-seguradoras-decide-stf/"),
        ("Res. CNSP 493 · Monitor Mercantil", "https://monitormercantil.com.br/norma-consolida-atuacao-de-corretores-de-seguros-e-entidades-autorreguladoras/"),
        ("ANPD, sandbox de IA · Tozzini Freire", "https://tozzinifreire.com.br/en/artigos/sem-marco-legal-anpd-e-setores-avancam-na-regulacao-da-ia"),
        ("ANPD, centro de IA · Convergência Digital", "https://convergenciadigital.com.br/governo/anpd-prepara-novo-sandbox-regulatorio-e-monta-centro-proprio-de-ia/"),
        ("Superfinanciera, Circular 006/2026 · INCP", "https://incp.org.co/publicaciones/infoincp-publicaciones/informacion-para-empresas/contable/2026/05/superfinanciera-amplio-hasta-2028-la-aplicacion-inicial-de-la-niif-17/"),
    ]),
    (L("Fronteira de IA &amp; adoção", "AI frontier &amp; adoption", "Frontera de IA &amp; adopción"), [
        ("Anthropic · Claude Opus 5.5", "https://www.anthropic.com/news/claude-opus-5-5"),
        ("OpenAI · API changelog", "https://developers.openai.com/api/docs/changelog"),
        ("OpenAI · GPT-6 Astra system card", "https://deploymentsafety.openai.com/gpt-6-astra/change-log"),
        ("Google · Gemini 4 Argon", "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/"),
        ("Porto · Revista Apólice", "https://revistaapolice.com.br/2026/10/porto-automatiza-70-dos-sinistros-de-roubo-e-furto/"),
        ("Porto · Revista Cobertura", "https://www.revistacobertura.com.br/noticias/auto-servicos/porto-seguro-lanca-agente-de-ia-no-whatsapp-e-automatiza-70-das-aberturas-de-sinistros-de-roubo-e-furto/"),
        ("Mapfre · Revista Apólice", "https://revistaapolice.com.br/2026/08/mapfre-amplia-uso-de-ia-para-vida-residencial-e-agro/"),
        ("Travelers · 2Q26 transcript (PDF)", "https://s26.q4cdn.com/410417801/files/doc_financials/2026/q2/2Q26-Transcript.pdf"),
        ("Cheche · SEC 6-K", "https://www.sec.gov/Archives/edgar/data/0001965473/000149315226040944/ex99-1.htm"),
        ("S&amp;P Global Ratings · Reinsurance News", "https://www.reinsurancene.ws/ai-operational-benefits-arriving-before-financial-gains-for-re-insurers-sp/"),
        ("KPMG · AI value in insurance", "https://kpmg.com/xx/en/media/press-releases/2026/09/insurers-see-ai-leadership-gaps-remain.html"),
        ("Deloitte · AI to fight insurance fraud", "https://www.deloitte.com/us/en/insights/industry/financial-services/financial-services-industry-predictions/2025/ai-to-fight-insurance-fraud.html"),
    ]),
]
for i, (title, _links) in enumerate(SRC_CATS):
    C[f"sc_h3_{i}"] = title
T("fn_11",
  "Quando um valor tem só uma fonte, aparece a marca \"1 fonte\". Deals sem confirmação ficam fora. Câmbio: PTAX de venda do BCB em 30/set/2026.",
  "When a figure has only one source, it carries a \"1 source\" flag. Unconfirmed deals are left out. FX: BCB PTAX sell rate on Sep 30, 2026.",
  "Cuando un valor tiene una sola fuente, lleva la marca \"1 fuente\". Los deals sin confirmación quedan fuera. Tipo de cambio: PTAX de venta del BCB el 30/sep/2026.")
T("disc_h3", "Conflitos de interesse", "Conflicts of interest", "Conflictos de interés")
T("disc_ul",
  "<li>A WIR Innovation vende uma camada de IA para seguradoras e corretoras (subscrição, distribuição e analytics). Por isso, atua no mesmo mercado de parte das empresas citadas, em especial as de automação de subscrição e de back-office de corretor.</li><li>A WIR foi construída com a Mahway e a Avante Ventures, e parte da equipe que assina esta edição é sócia da Avante.</li><li>Na data de publicação, nenhuma empresa citada nesta edição é investida da Avante Ventures ou cliente da WIR.</li><li>Pontos anonimizados do Bloco 5 seguem a convenção da Edição 01: nomes sob NDA não são publicados.</li>",
  "<li>WIR Innovation sells an AI layer to insurers and brokers (underwriting, distribution and analytics). It therefore operates in the same market as some of the companies cited, especially those in underwriting automation and broker back-office.</li><li>WIR was built with Mahway and Avante Ventures, and part of the team signing this issue are Avante partners.</li><li>As of publication, no company cited in this issue is an Avante Ventures portfolio company or a WIR client.</li><li>Anonymised points in Block 5 follow Issue 01's convention: names under NDA are not published.</li>",
  "<li>WIR Innovation vende una capa de IA a aseguradoras y corredores (suscripción, distribución y analytics). Por eso actúa en el mismo mercado que parte de las empresas citadas, en especial las de automatización de suscripción y de back-office de corredores.</li><li>WIR fue construida con Mahway y Avante Ventures, y parte del equipo que firma esta edición es socia de Avante.</li><li>A la fecha de publicación, ninguna empresa citada en esta edición es participada de Avante Ventures ni cliente de WIR.</li><li>Los puntos anonimizados del Bloque 5 siguen la convención de la Edición 01: los nombres bajo NDA no se publican.</li>")
T("h3_gov", "Governança desta edição", "Governance of this issue", "Gobernanza de esta edición")
T("gov_0",
  "<b>Correções</b>Erros são corrigidos na página, com nota datada. Desta vez revisamos três pontos da Edição 01: o ticket médio do Q1'26 (o número da Gallagher Re não é 1,55bi ÷ 68), a Deloitte (é uma faixa de US$80 bi a US$160 bi) e a Sofía, cuja rodada de US$21M em maio ficou de fora.",
  "<b>Corrections</b>Errors are corrected on the page, with a dated note. This time we revisited three points from Issue 01: Q1'26 average ticket (Gallagher Re's figure is not 1.55bn ÷ 68), Deloitte (it is a US$80bn to US$160bn range) and Sofía, whose US$21M May round was missing.",
  "<b>Correcciones</b>Los errores se corrigen en la página, con nota fechada. Esta vez revisamos tres puntos de la Edición 01: el ticket promedio del Q1'26 (la cifra de Gallagher Re no es 1.550 ÷ 68), Deloitte (es un rango de US$80.000 a US$160.000 millones) y Sofía, cuya ronda de US$21M en mayo quedó fuera.")
T("gov_1",
  "<b>Contestação</b>Discorda de um número ou de uma posição no Bloco 5? Escreva para <a href=\"mailto:contato@wirinnovation.ai?subject=WIR%20Index%20Q3%202026\">contato@wirinnovation.ai</a> com a fonte. Respondemos e, se for o caso, corrigimos.",
  "<b>Challenges</b>Disagree with a number or a position in Block 5? Write to <a href=\"mailto:contato@wirinnovation.ai?subject=WIR%20Index%20Q3%202026\">contato@wirinnovation.ai</a> with your source. We reply and, where warranted, correct.",
  "<b>Impugnaciones</b>¿No estás de acuerdo con un número o una posición del Bloque 5? Escribe a <a href=\"mailto:contato@wirinnovation.ai?subject=WIR%20Index%20Q3%202026\">contato@wirinnovation.ai</a> con la fuente. Respondemos y, si corresponde, corregimos.")
T("gov_2",
  "<b>Dados abertos</b>Os deals e movimentos desta edição estão em <a href=\"/insights/wir-index/wir-index-q3-2026.csv\" download>CSV</a>, sob licença CC BY 4.0.",
  "<b>Open data</b>This issue's deals and moves are available as <a href=\"/insights/wir-index/wir-index-q3-2026.csv\" download>CSV</a>, under a CC BY 4.0 licence.",
  "<b>Datos abiertos</b>Los deals y movimientos de esta edición están en <a href=\"/insights/wir-index/wir-index-q3-2026.csv\" download>CSV</a>, bajo licencia CC BY 4.0.")
T("ft_colophon",
  "\n      <b>Metodologia.</b> Índice trimestral curado pela WIR. Janela: 1/jul a 30/set/2026; fatos de outubro aparecem marcados como tal. Corte da tabela de deals: Série A ou superior, ou ao menos US$15M (global) e R$40M (Brasil), com exceção editorial declarada para movimentos estratégicos (M&amp;A, early stage de IA em back-office). Três empresas: uma global, uma do Brasil e uma de categoria nova, escolhidas pelo movimento no trimestre. Watch list: empresas que podem virar perfil; entram e saem com justificativa. Valores e líderes cruzados em ao menos duas fontes; quando há só uma, aparece a marca \"1 fonte\". Câmbio: PTAX de venda do BCB no último dia útil do trimestre (30/set/2026: US$1 = R$5,1809). O Bloco 5 é estimativa WIR a partir de sinais públicos, pela rubrica publicada.<br><br>\n      <b>Fontes principais.</b> Gallagher Re, CB Insights, FinTech Global, Swiss Re Institute, gov.br/SUSEP, OPIN Brasil, Câmara dos Deputados, Comissão Europeia, NAIC, STF, insurtech.com.br, CQCS, Revista Apólice, Let's Money, Exame, Times Brasil, TechCrunch, Coverager, S&amp;P Global Ratings, KPMG, Deloitte, Anthropic, OpenAI e Google.<br><br>\n      <b>Disclaimer.</b> Conteúdo informativo e analítico; não constitui recomendação de investimento. Livre para compartilhar com crédito à WIR Innovation (CC BY 4.0).<br><br>\n      <b>Equipe editorial.</b> Nicholas Weiser · José Carlos de Paula · Amanda Pinheiro · Felipe Moraes · Cristian Mendivelso · Avante Ventures, Holding de IA.<br><br><b>Edição anterior:</b> <a href=\"/insights/wir-index/2026-q2/\">Edição 01 · Q2 2026</a> · siga a WIR Innovation no LinkedIn.<br><br>© 2026 WIR Innovation · Seu Chief AI Partner para o mercado de seguros brasileiro · Edição 02 · Q3 2026\n    ",
  "\n      <b>Methodology.</b> Quarterly index curated by WIR. Window: Jul 1 to Sep 30, 2026; October facts are flagged as such. Deal table threshold: Series A or later, or at least US$15M (global) and R$40M (Brazil), with a declared editorial exception for strategic moves (M&amp;A, early-stage AI in back-office). Three companies: one global, one from Brazil and one from a new category, chosen for their move in the quarter. Watch list: companies that could become profiles; they join and leave with a stated reason. Amounts and leads cross-checked in at least two sources; when there is only one, it carries a \"1 source\" flag. FX: BCB PTAX sell rate on the quarter's last business day (Sep 30, 2026: US$1 = R$5.1809). Block 5 is a WIR estimate from public signals, under the published rubric.<br><br>\n      <b>Main sources.</b> Gallagher Re, CB Insights, FinTech Global, Swiss Re Institute, gov.br/SUSEP, OPIN Brasil, Chamber of Deputies, European Commission, NAIC, STF, insurtech.com.br, CQCS, Revista Apólice, Let's Money, Exame, Times Brasil, TechCrunch, Coverager, S&amp;P Global Ratings, KPMG, Deloitte, Anthropic, OpenAI and Google.<br><br>\n      <b>Disclaimer.</b> Informational and analytical content; not investment advice. Free to share with credit to WIR Innovation (CC BY 4.0).<br><br>\n      <b>Editorial team.</b> Nicholas Weiser · José Carlos de Paula · Amanda Pinheiro · Felipe Moraes · Cristian Mendivelso · Avante Ventures, AI Holding.<br><br><b>Previous issue:</b> <a href=\"/insights/wir-index/2026-q2/\">Issue 01 · Q2 2026</a> · follow WIR Innovation on LinkedIn.<br><br>© 2026 WIR Innovation · Your Chief AI Partner for the Brazilian insurance market · Issue 02 · Q3 2026\n    ",
  "\n      <b>Metodología.</b> Índice trimestral curado por WIR. Ventana: del 1/jul al 30/sep/2026; los hechos de octubre aparecen marcados como tales. Corte de la tabla de deals: Serie A o superior, o al menos US$15M (global) y R$40M (Brasil), con excepción editorial declarada para movimientos estratégicos (M&amp;A, early stage de IA en back-office). Tres empresas: una global, una de Brasil y una de categoría nueva, elegidas por su movimiento en el trimestre. Watch list: empresas que pueden volverse perfil; entran y salen con justificación. Montos y líderes cruzados en al menos dos fuentes; cuando hay una sola, aparece la marca \"1 fuente\". Tipo de cambio: PTAX de venta del BCB en el último día hábil del trimestre (30/sep/2026: US$1 = R$5,1809). El Bloque 5 es una estimación de WIR a partir de señales públicas, según la rúbrica publicada.<br><br>\n      <b>Fuentes principales.</b> Gallagher Re, CB Insights, FinTech Global, Swiss Re Institute, gov.br/SUSEP, OPIN Brasil, Cámara de Diputados, Comisión Europea, NAIC, STF, insurtech.com.br, CQCS, Revista Apólice, Let's Money, Exame, Times Brasil, TechCrunch, Coverager, S&amp;P Global Ratings, KPMG, Deloitte, Anthropic, OpenAI y Google.<br><br>\n      <b>Disclaimer.</b> Contenido informativo y analítico; no constituye recomendación de inversión. Libre para compartir con crédito a WIR Innovation (CC BY 4.0).<br><br>\n      <b>Equipo editorial.</b> Nicholas Weiser · José Carlos de Paula · Amanda Pinheiro · Felipe Moraes · Cristian Mendivelso · Avante Ventures, Holding de IA.<br><br><b>Edición anterior:</b> <a href=\"/insights/wir-index/2026-q2/\">Edición 01 · Q2 2026</a> · sigue a WIR Innovation en LinkedIn.<br><br>© 2026 WIR Innovation · Tu Chief AI Partner para el mercado asegurador brasileño · Edición 02 · Q3 2026\n    ")

# ---------------------------------------------------------------- Markup
def num(v, decimals):
    """Chart label in each language: decimal comma in PT/ES, decimal point in EN."""
    s = f"{v:.{decimals}f}"
    return L(s.replace(".", ","), s, s.replace(".", ","))


FUND = [("Q1'25", 1.31), ("Q2'25", 1.09), ("Q3'25", 1.01), ("Q4'25", 1.67), ("Q1'26", 1.63), ("Q2'26", 2.44), ("Q3'26", 1.36)]
for i, (_q, v) in enumerate(FUND):
    C[f"fq_{i}"] = num(v, 2)
C["ring_n"] = num(83.2, 1)
C["ring_n"] = {l: v + "%" for l, v in C["ring_n"].items()}
fund_bars = "".join(f'\n        <div class="qbar{" done" if q == "Q3" + chr(39) + "26" else ""}"><span class="qv" i18n="fq_{i}"></span><div class="col" style="height:{v / 2.44 * 100:.1f}%"></div><span class="ql">{q}</span></div>' for i, (q, v) in enumerate(FUND))
# Q3'26 published by Gallagher Re on 2026-11-05 (via Reinsurance News, Business Insurance); no pending bar since.
MONTHS = [0, 0, 217, 45, 0, 2.5, 0, 0, 0, 200]
for i, v in enumerate(MONTHS):
    C[f"mq_{i}"] = {l: ("~" if i == 9 else "") + s for l, s in num(v, 1 if v % 1 else 0).items()}
month_bars = "".join(
    f'<div class="qbar{" q3" if i in (6, 7, 8) else ""}"><span class="qv" i18n="mq_{i}"></span><div class="col" style="height:{v / 217 * 100:.1f}%"></div><span class="ql" i18n="mo_{i}"></span></div>'
    for i, v in enumerate(MONTHS))
# Quadrant: Edição 01 coordinates, unchanged (no point moved this issue).
QUAD = [(150, 150, "#6E695C", 5.5, "ql_0", None), (200, 120, "#6E695C", 5.5, "ql_1", None), (300, 185, "#6E695C", 5.5, "ql_2", None),
        (250, 300, "#B96D0C", 5.5, "ql_3", None), (430, 250, "#B96D0C", 5.5, None, "Justos"), (470, 150, "#7540AC", 6, "ql_4", None),
        (520, 120, "#7540AC", 6, None, "180 Seguros"), (560, 200, "#7540AC", 6, None, "Darwin"), (600, 95, "#7540AC", 6.5, "ql_6", None),
        (330, 340, "#8A8374", 5.5, "ql_5", None)]
quad = ""
for cx, cy, fill, r, key, name in QUAD:
    stroke = ' stroke="#F8AD39" stroke-width="1.2"' if key == "ql_6" else ""
    end = key in ("ql_6",) or name == "Darwin"
    tx = cx - 12 if end else cx + 10
    anchor = ' text-anchor="end"' if end else ""
    label = f'<text x="{tx}" y="{cy + 4}"{anchor} i18nt="{key}"></text>' if key else f'<text x="{tx}" y="{cy + 4}"{anchor}>{name}</text>'
    quad += f'\n          <circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"{stroke}></circle>{label}'

src_html = ""
for i, (title, links) in enumerate(SRC_CATS):
    a = "".join(f'\n        <a href="{u}" target="_blank" rel="noopener">{t} <span class="arw">↗</span></a>' for t, u in links)
    src_html += f'\n      <div class="src-cat">\n        <h3 i18n="sc_h3_{i}"></h3>{a}\n      </div>'

profiles_html = ""
for i, (name, _tag, _meta, _dds) in enumerate(PROFILES):
    dl = "".join(f'\n          <dt i18n="pf_dt_{i * 4 + j}"></dt><dd i18n="pf_dd_{i * 4 + j}"></dd>' for j in range(4))
    profiles_html += f'\n      <div class="prof">\n        <div class="tagp" i18n="pf_tag_{i}"></div>\n        <h3>{name}</h3><div class="meta" i18n="pf_meta_{i}"></div>\n        <dl>{dl}\n        </dl>\n      </div>'

regs = "".join(f'\n      <div class="regitem" i18n="reg_{i}"></div>' for i in range(6))
radar = "".join(f'\n          <li i18n="rad_{i}"></li>' for i in range(len(RADAR)))
preds = "".join(f'\n      <div class="pred"><div class="pn">0{i + 4}</div><p i18n="pr_p_{i}"></p><div class="crit" i18n="pr_crit_{i}"></div></div>' for i in range(3))
cards = "".join(f'\n      <div class="sc" i18n="sc_{i}"></div>' for i in range(3))

BODY = f"""<a href="/insights/" class="site-backlink" style="position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:8px;background:#0B0A08;color:#ECE6DA;font-family:'Space Grotesk',ui-sans-serif,system-ui,-apple-system,sans-serif;font-size:12px;font-weight:500;letter-spacing:.04em;text-decoration:none;padding:10px 20px;border-bottom:1px solid #23201B">← WIR Innovation · Insights</a>
<main>

<!-- HEADER -->
<header>
  <div class="wrap masthead">
    <div class="brand">
      {{{{LOGO}}}}
      <div class="brand-txt">
        <div class="sub" i18n="m_sub"></div>
        <div class="pwr" i18n="m_pwr"></div>
      </div>
    </div>
    <div class="mast-right"><div class="langpick"><div class="seg langseg" role="group" aria-label="Idioma"><button data-l="pt" onclick="setLang('pt')" class="on">PT</button><button data-l="en" onclick="setLang('en')" class="">EN</button><button data-l="es" onclick="setLang('es')" class="">ES</button></div></div><div class="doc-meta" i18n="m_meta"></div></div>
  </div>
</header>

<!-- ===================== BLOCO 0 · CAPA + SUMÁRIO ===================== -->
<div class="cover">
  <div class="wrap">
    <div class="ed" i18n="c_ed"></div>
    <h1 i18n="c_h1"></h1>
    <p class="dek" i18n="c_dek"></p>
    <div class="by" i18n="c_by"></div>
    <div class="contrib" i18n="c_contrib"></div>
    <a class="prev-ed" href="/insights/wir-index/2026-q2/" i18n="c_prev"></a>
  </div>
</div>

<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_0"></div>
    <h2 i18n="h2_0"></h2>
    <p class="sub" i18n="sub_0"></p>
    <div class="five">
      <div class="li"><div class="k">1</div><p i18n="five_0"></p></div>
      <div class="li"><div class="k">2</div><p i18n="five_1"></p></div>
      <div class="li"><div class="k">3</div><p i18n="five_2"></p></div>
      <div class="li"><div class="k">4</div><p i18n="five_3"></p></div>
      <div class="li"><div class="k">5</div><p i18n="five_4"></p></div>
    </div>
  </div>
</section>

<!-- ===================== BLOCO 1 · TESE ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_1"></div>
    <div class="thesis">
      <div class="kicker" i18n="th_kicker"></div>
      <h2 i18n="h2_1"></h2>
      <p class="lead" i18n="th_lead"></p><div class="ev-strip"><div class="ev"><span class="ev-n num" i18n="viz_evn_0"></span><span class="ev-l" i18n="viz_ev_0"></span></div><div class="ev"><span class="ev-n num" i18n="viz_evn_1"></span><span class="ev-l" i18n="viz_ev_1"></span></div><div class="ev"><span class="ev-n num" i18n="viz_evn_2"></span><span class="ev-l" i18n="viz_ev_2"></span></div></div>
      <div class="thesis-cols"><p i18n="th_p_0"></p><p i18n="th_p_1"></p><p i18n="th_p_2"></p><p i18n="th_p_3"></p></div>
      <div class="sign">
        <span i18n="th_sign"></span>
      </div>
    </div>
  </div>
</section>

<!-- ===================== BLOCO 2 · PLACAR ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_2"></div>
    <h2 i18n="h2_2"></h2>
    <p class="sub" i18n="sub_1"></p>

    <div class="panel">
      <h3 i18n="pan_h3_0"></h3>
      <p class="foot-note" style="margin:0 0 12px" i18n="fn_0"></p>
      <div class="stat-row">
        <div class="stat"><div class="n"><em i18n="stn_0"></em></div><div class="l" i18n="stl_0"></div></div>
        <div class="stat"><div class="n"><em i18n="stn_1"></em></div><div class="l" i18n="stl_1"></div></div>
        <div class="stat"><div class="n"><em i18n="stn_2"></em></div><div class="l" i18n="stl_2"></div></div>
        <div class="stat"><div class="n"><em i18n="stn_3"></em></div><div class="l" i18n="stl_3"></div></div>
      </div>
      <p class="foot-note" i18n="fn_1"></p>
    </div>

    <div class="panel">
      <h3 i18n="pan_h3_1"></h3>
      <div class="viz-fund"><div class="ring" role="img" aria-label="83,2% do funding de insurtech do Q3'26 foi para IA" style="--p: 83.2;"><div class="ring-c"><span class="num" i18n="ring_n"></span><span class="ring-l" i18n="viz_ring_l"></span></div></div><div class="qchart" role="img" aria-label="Funding global de insurtech por trimestre, em US$ bi: Q1'25 1,31; Q2'25 1,09; Q3'25 1,01; Q4'25 1,67; Q1'26 1,63; Q2'26 2,44; Q3'26 1,36">{fund_bars}
      </div></div>
      <div class="stat-row">
        <div class="stat"><div class="n"><em i18n="stn_4"></em></div><div class="l" i18n="stl_4"></div></div>
        <div class="stat"><div class="n"><em i18n="stn_5"></em></div><div class="l" i18n="stl_5"></div></div>
        <div class="stat"><div class="n"><em i18n="stn_6"></em></div><div class="l" i18n="stl_6"></div></div>
        <div class="stat"><div class="n"><em i18n="stn_7"></em></div><div class="l" i18n="stl_7"></div></div>
      </div>
      <p class="foot-note" i18n="fn_2"></p>
    </div>

    <div class="panel">
      <h3 i18n="pan_h3_2"></h3>
      <p class="foot-note" style="margin:0 0 10px" i18n="fn_3"></p>
      <div class="viz viz-months"><div class="viz-h" i18n="viz_months_t"></div><div class="qchart" role="img" aria-label="Rodadas de insurtech no Brasil em 2026, em R$ milhões por mês: março 217, abril 45, junho 2,5, julho a setembro zero, outubro cerca de 200">{month_bars}</div><div class="viz-note" i18n="viz_months_n"></div></div>
      <div class="table-shell" i18n="tbl_0"></div>
      <p class="foot-note" i18n="fn_4"></p>
    </div>

    <div class="panel">
      <h3 i18n="pan_h3_3"></h3>
      <div class="table-shell" i18n="tbl_1"></div>
      <p class="foot-note" i18n="fn_5"></p>
    </div>

    <div class="panel">
      <h3 i18n="pan_h3_4"></h3>
      <p class="body" style="margin:0" i18n="pbody_0"></p>
      <p class="foot-note" style="margin-top:10px" i18n="fn_6"></p>
    </div>
  </div>
</section>

<!-- ===================== BLOCO 3 · EMPRESAS ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_3"></div>
    <h2 i18n="h2_3"></h2>
    <p class="sub" i18n="sub_2"></p>
    <div class="profiles">{profiles_html}
    </div>
    <h3 style="margin:26px 0 10px" i18n="h3_watch"></h3>
    <div class="table-shell" i18n="tbl_2"></div>
  </div>
</section>

<!-- ===================== BLOCO 4 · RADAR REGULATÓRIO ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_4"></div>
    <h2 i18n="h2_4"></h2>
    <p class="sub" i18n="sub_3"></p>
    <div class="reg">{regs}
    </div>
    <p class="foot-note" i18n="fn_7"></p>
  </div>
</section>

<!-- ===================== BLOCO 5 · AI ADOPTION INDEX ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_5"></div>
    <h2 i18n="h2_5"></h2>
    <p class="sub" i18n="sub_4"></p>
    <div class="quad-wrap">
      <svg viewBox="0 0 680 470" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="WIR AI Adoption Index">
        <defs><linearGradient id="z2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7540AC" stop-opacity=".16"></stop><stop offset="1" stop-color="#7540AC" stop-opacity=".03"></stop></linearGradient></defs>
        <rect x="360" y="30" width="290" height="190" fill="url(#z2)"></rect>
        <line x1="70" y1="30" x2="70" y2="410" stroke="#B5AB97" stroke-width="1.5"></line>
        <line x1="70" y1="410" x2="650" y2="410" stroke="#B5AB97" stroke-width="1.5"></line>
        <line x1="360" y1="30" x2="360" y2="410" stroke="#CDC3AE" stroke-width="1" stroke-dasharray="4 5"></line>
        <line x1="70" y1="220" x2="650" y2="220" stroke="#CDC3AE" stroke-width="1" stroke-dasharray="4 5"></line>
        <g font-family="'JetBrains Mono',monospace" font-size="9" fill="#8A8374"><text x="70" y="424" text-anchor="middle">0</text><text x="215" y="424" text-anchor="middle">1</text><text x="360" y="424" text-anchor="middle">2</text><text x="505" y="424" text-anchor="middle">3</text><text x="650" y="424" text-anchor="middle">4</text><text x="60" y="413" text-anchor="end">0</text><text x="60" y="318" text-anchor="end">1</text><text x="60" y="223" text-anchor="end">2</text><text x="60" y="128" text-anchor="end">3</text><text x="60" y="33" text-anchor="end">4</text></g>
        <text x="78" y="24" fill="#524C42" font-size="11" font-family="'Instrument Serif',Georgia,serif" font-style="italic" i18nt="q_yaxis"></text>
        <text x="80" y="450" fill="#524C42" font-size="11" font-family="'Instrument Serif',Georgia,serif" font-style="italic" i18nt="q_xlow"></text>
        <text x="648" y="450" fill="#524C42" font-size="11" font-family="'Instrument Serif',Georgia,serif" font-style="italic" text-anchor="end" i18nt="q_xhigh"></text>
        <text x="512" y="52" fill="#7540AC" font-size="10.5" font-weight="700" text-anchor="middle" font-family="'Space Grotesk',system-ui,sans-serif" i18nt="q_zone"></text>
        <g font-family="'Space Grotesk',system-ui,sans-serif" font-size="10.5" fill="#2B2720">{quad}
        </g>
      </svg>
    </div>
    <h3 style="margin:26px 0 10px" i18n="h3_rubric"></h3>
    <div class="table-shell rubric" i18n="tbl_3"></div>
    <h3 style="margin:26px 0 10px" i18n="h3_pos"></h3>
    <div class="table-shell" i18n="tbl_4"></div>
    <p class="foot-note" i18n="fn_8"></p>
  </div>
</section>

<!-- ===================== BLOCO 6 · INSIGHTS WIR ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_6"></div>
    <h2 i18n="h2_6"></h2>
    <p class="sub" i18n="sub_5"></p>
    <div class="ins3">
      <div class="ins">
        <div class="n" i18n="in_n_0"></div>
        <h3 i18n="in_h3_0"></h3>
        <p i18n="in_p_0"></p>
      </div>
      <div class="ins">
        <div class="n" i18n="in_n_1"></div>
        <h3 i18n="in_h3_1"></h3>
        <div class="callout"><span class="num" i18n="viz_ins_n"></span><span class="co-l" i18n="viz_ins_l"></span></div><p i18n="in_p_1"></p>
      </div>
      <div class="ins">
        <div class="n" i18n="in_n_2"></div>
        <ul class="radar">{radar}
        </ul>
        <p class="foot-note" style="margin-top:8px" i18n="fn_9"></p>
      </div>
    </div>
  </div>
</section>

<!-- ===================== BLOCO 7 · SCORECARD & PREVISÕES ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_7"></div>
    <h2 i18n="h2_7"></h2>
    <p class="sub" i18n="sub_6"></p>
    <div class="sc-tally" i18n="sc_tally"></div>
    <div class="scorecard">{cards}
    </div>
    <h3 style="margin:6px 0 14px" i18n="h3_new"></h3>
    <div class="preds">{preds}
    </div>
    <p class="foot-note" i18n="fn_10"></p>
  </div>
</section>

<!-- ===================== FONTES, DISCLOSURE & GOVERNANÇA ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_8"></div>
    <h2 i18n="h2_8"></h2>
    <p class="sub" i18n="sub_7"></p>
    <div class="src-cats">{src_html}
    </div>
    <p class="foot-note" i18n="fn_11"></p>
    <div class="disclosure"><h3 i18n="disc_h3"></h3><ul i18n="disc_ul"></ul></div>
    <h3 style="margin:26px 0 0" i18n="h3_gov"></h3>
    <div class="gov"><div i18n="gov_0"></div><div i18n="gov_1"></div><div i18n="gov_2"></div></div>
  </div>
</section>

<!-- ===================== QUEM ASSINA ===================== -->
<section>
  <div class="wrap">
    <div class="bloco" i18n="bloco_9"></div>
    <h2 i18n="h2_9"></h2>
    <p class="sub" i18n="sub_8"></p>
    {{{{TEAM}}}}
  </div>
</section>

<!-- ===================== CONECTE-SE ===================== -->
<div class="connect">
  <div class="cwrap">
    <div class="ann" i18n="cn_ann"></div>
    <h2 i18n="h2_10"></h2>
    <p class="cp" i18n="cn_cp"></p>
    <a class="btn-news" href="https://wirinnovation.ai/insights" target="_blank" rel="noopener" i18n="cn_btn"></a>
    <div class="socials">
      <span class="grp" i18n="cn_grp_0"></span>
      <a href="https://wirinnovation.ai" target="_blank" rel="noopener" i18n="cn_soc_0"></a>
      <a href="https://www.linkedin.com/company/wir-innovation/" target="_blank" rel="noopener" i18n="cn_soc_1"></a>
      <a href="https://www.facebook.com/wirinnovation" target="_blank" rel="noopener" i18n="cn_soc_2"></a>
      <a href="https://www.instagram.com/wirinnovation/" target="_blank" rel="noopener" i18n="cn_soc_3"></a>
      <a href="https://x.com/wirinnovation" target="_blank" rel="noopener" i18n="cn_soc_4"></a>
      <span class="sep"></span>
      <span class="grp av" i18n="cn_grp_1"></span>
      <a href="https://avanteventures.com" target="_blank" rel="noopener" i18n="cn_soc_5"></a>
      <a href="https://www.linkedin.com/company/avante-ventures/" target="_blank" rel="noopener" i18n="cn_soc_6"></a>
    </div>
  </div>
</div>

<!-- ===================== COLOPHON ===================== -->
<footer>
  <div class="wrap">
    <div class="foot-rule"></div>
    {{{{FOOTLOGO}}}}
    <div class="foot-brand"><b>WIR</b> Index</div>
    <p class="colophon" style="margin-top:12px" i18n="ft_colophon"></p>
  </div>
</footer>

</main>
"""

META = {
    "title": "WIR Index Q3 2026: Panorama InsurTech Brasil &amp; LATAM",
    "name": "WIR Index · Edição 02 · Q3 2026",
    "description": "WIR Index Q3 2026: funding InsurTech global, deals e M&amp;A no Brasil e na LATAM, regulação de IA e o primeiro scorecard das previsões da WIR.",
    "dataset_description": "Índice trimestral da WIR Innovation sobre capital, tecnologia e regulação na fronteira entre IA e seguros no Brasil, na LATAM e no mundo. Edição 02, com deals e movimentos em CSV.",
    "date": "2026-11-16",
    "coverage": "2026-07-01/2026-09-30",
    "url": "https://wirinnovation.ai/insights/wir-index/",
    "csv": "wir-index-q3-2026.csv",
    "image": "/assets/articles/wir-index-q3-2026.png",
}

DEALS = [
    {"edicao": "02", "tipo": "rodada", "empresa": "Angle Health", "pais": "US", "movimento": "Série C", "valor": "200000000", "moeda": "USD", "lider_ou_contraparte": "Vitruvian Partners", "data": "2026-09", "na_janela": "sim", "url": "https://coverager.com/angle-health-raises-200-million/"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Thatch", "pais": "US", "movimento": "Série C", "valor": "108000000", "moeda": "USD", "lider_ou_contraparte": "General Catalyst, Index, a16z", "data": "2026-09-15", "na_janela": "sim", "url": "https://fintech.global/2026/09/16/thatch-raises-108m-at-1bn-valuation-for-health-benefits/"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Faye", "pais": "US", "movimento": "Série C", "valor": "50000000", "moeda": "USD", "lider_ou_contraparte": "Madrona", "data": "2026-08-05", "na_janela": "sim", "url": "https://skift.com/2026/08/05/faye-raises-50-million-bets-on-ai-to-get-travel-insurance-claims-paid-in-minutes/"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Luzern Risk", "pais": "US", "movimento": "Série B", "valor": "45000000", "moeda": "USD", "lider_ou_contraparte": "Insight Partners", "data": "2026-09-17", "na_janela": "sim", "url": "https://fintech.global/2026/09/18/luzern-risk-raises-45m-series-b-led-by-insight-partners/"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Outmarket AI", "pais": "US", "movimento": "Série B", "valor": "34500000", "moeda": "USD", "lider_ou_contraparte": "SignalFire", "data": "2026-09-28", "na_janela": "sim", "url": "https://techcrunch.com/2026/09/28/insuretech-outmarket-raises-34-5m-just-months-after-prior-round/"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Corgi", "pais": "US", "movimento": "Extensão Série B (valuation US$4bi)", "valor": "", "moeda": "USD", "lider_ou_contraparte": "", "data": "2026-07-22", "na_janela": "sim", "url": "https://fintech.global/2026/07/24/corgis-valuation-soars-to-4bn-in-new-series-b-extension/"},
    {"edicao": "02", "tipo": "rodada", "empresa": "AIUC", "pais": "US", "movimento": "Série A", "valor": "40000000", "moeda": "USD", "lider_ou_contraparte": "Ribbit Capital", "data": "2026-09-15", "na_janela": "sim", "url": "https://techcrunch.com/2026/09/15/early-anthropic-hire-former-metr-coo-have-found-a-way-to-rein-in-rogue-ai-agents/"},
    {"edicao": "02", "tipo": "m&a", "empresa": "Hero Seguros", "pais": "BR", "movimento": "Compra de 100% do Grupo CAM (MX)", "valor": "", "moeda": "", "lider_ou_contraparte": "Grupo CAM", "data": "2026-07-23", "na_janela": "sim", "url": "https://cqcs.com.br/noticia/hero-seguros-acelera-expansao-na-america-latina-com-aquisicao-do-grupo-cam-no-mexico/"},
    {"edicao": "02", "tipo": "m&a", "empresa": "PicPay", "pais": "BR", "movimento": "Compra concluída da Kovr Participações", "valor": "657600000", "moeda": "BRL", "lider_ou_contraparte": "Kovr", "data": "2026-08-03", "na_janela": "sim", "url": "https://timesbrasil.com.br/empresas-e-negocios/picpay-conclui-aquisicao-da-kovr-e-reforca-operacao-de-seguros/"},
    {"edicao": "02", "tipo": "m&a", "empresa": "Sompo", "pais": "BR", "movimento": "Compra da Fator Seguradora", "valor": "", "moeda": "", "lider_ou_contraparte": "Fator Seguradora", "data": "2026-07", "na_janela": "sim", "url": "https://www.letsmoney.com.br/noticias/ma-seguros-2026-ticket-mediano-acorn-advisory/"},
    {"edicao": "02", "tipo": "m&a", "empresa": "MDS Brasil", "pais": "BR", "movimento": "Compra da BKS Corretora e BKS Re (1 fonte)", "valor": "", "moeda": "", "lider_ou_contraparte": "BKS", "data": "2026-09-08", "na_janela": "sim", "url": "https://exame.com/insight/mds-brasil-compra-corretora-que-domina-seguros-de-carros-fortes/p"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Alice", "pais": "BR", "movimento": "Série D", "valor": "40000000", "moeda": "USD", "lider_ou_contraparte": "IFC", "data": "2026-10-19", "na_janela": "nao (outubro)", "url": "https://www.insurtech.com.br/seguros/alice-capta-us-40-milhoes-em-serie-d-liderada-pelo-ifc-e-acelera-aposta-em-operacao-nativa-em-ia/"},
    {"edicao": "02", "tipo": "m&a", "empresa": "CNP Assurances", "pais": "BR/MX", "movimento": "Acordo de compra da Prudential no Brasil e no México", "valor": "4030000000", "moeda": "USD", "lider_ou_contraparte": "Prudential Financial", "data": "2026-10-20", "na_janela": "nao (outubro)", "url": "https://obrasilianista.com.br/2026/10/26/economia/quem-fica-com-os-seguros-brasileiros"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Sofía", "pais": "MX", "movimento": "Rodada (correção da Ed. 01)", "valor": "21000000", "moeda": "USD", "lider_ou_contraparte": "Kfund", "data": "2026-05-07", "na_janela": "nao (Q2)", "url": "https://dplnews.com/sofia-levanta-21-mdd/"},
    {"edicao": "02", "tipo": "rodada", "empresa": "Braven", "pais": "CO", "movimento": "Seed (correção da Ed. 01)", "valor": "4600000", "moeda": "USD", "lider_ou_contraparte": "Collide Capital", "data": "2026-06-16", "na_janela": "nao (Q2)", "url": "https://latamlist.com/braven-raises-4-6m-seed-round-to-expand-ai-insurance-infrastructure-platform/"},
]
