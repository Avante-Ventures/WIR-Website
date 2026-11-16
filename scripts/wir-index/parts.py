"""Research-independent pieces of Edição 02: extra CSS and fixed copy (PT/EN/ES)."""

EXTRA_CSS = """<style id="ed02-css">
.vintage{display:inline-block;margin-top:6px;font-family:var(--mono);font-size:9.5px;letter-spacing:.06em;color:var(--purple);background:rgba(117,64,172,.10);border:1px solid rgba(117,64,172,.28);border-radius:999px;padding:3px 9px}
.prev-ed{display:inline-flex;gap:8px;align-items:center;margin-top:18px;font-family:var(--mono);font-size:11px;letter-spacing:.04em;color:var(--purple);text-decoration:none;border-bottom:1px solid rgba(117,64,172,.35);padding-bottom:2px}
.prev-ed:hover{border-bottom-color:var(--purple)}
.lbl{display:inline-block;font-family:var(--mono);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border-radius:999px;padding:2px 8px;margin-right:6px;vertical-align:2px}
.lbl-an{background:rgba(11,10,8,.07);color:var(--ink-3)}
.lbl-op{background:rgba(224,96,63,.13);color:var(--coral)}
.scorecard{display:grid;grid-template-columns:1fr;gap:12px;margin-bottom:34px}
@media(min-width:900px){.scorecard{grid-template-columns:1fr 1fr 1fr}}
.sc{background:var(--paper-2);border:1px solid var(--line);border-radius:12px;padding:20px 22px;display:flex;flex-direction:column;gap:10px}
.sc .sc-top{display:flex;justify-content:space-between;align-items:center;gap:10px}
.sc .sc-n{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-4);font-weight:600}
.sc p{font-size:13px;color:var(--ink);line-height:1.5}
.sc .sc-ev{font-size:11.5px;color:var(--ink-3);line-height:1.55;border-top:1px solid var(--line);padding-top:10px}
.st{font-family:var(--mono);font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border-radius:999px;padding:4px 10px;white-space:nowrap}
.st-ok{background:rgba(31,143,98,.13);color:var(--ok)}
.st-no{background:rgba(194,59,46,.12);color:var(--danger)}
.st-part{background:rgba(185,109,12,.14);color:var(--amber)}
.st-open{background:rgba(117,64,172,.12);color:var(--purple)}
.sc-tally{display:flex;flex-wrap:wrap;gap:8px 18px;align-items:center;font-size:12px;color:var(--ink-3);margin:-18px 0 18px}
.sc-tally b{color:var(--ink);font-weight:600}
.disclosure{background:var(--paper-2);border:1px solid var(--line);border-left:3px solid var(--coral);border-radius:0 12px 12px 0;padding:20px 24px;margin-top:22px;max-width:86ch}
.disclosure h3{font-size:14px;margin-bottom:10px}
.disclosure ul{margin:0;padding-left:18px;display:grid;gap:6px}
.disclosure li{font-size:12.5px;color:var(--ink-2);line-height:1.55}
.rubric{margin-top:18px}
.rubric td,.rubric th{vertical-align:top}
.mv{font-family:var(--mono);font-size:10px;font-weight:600;white-space:nowrap}
.mv-up{color:var(--ok)} .mv-eq{color:var(--ink-4)} .mv-new{color:var(--purple)} .mv-out{color:var(--danger)}
.conf{font-family:var(--mono);font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;border-radius:999px;padding:2px 7px;white-space:nowrap}
.c-hi{background:rgba(31,143,98,.12);color:var(--ok)} .c-md{background:rgba(185,109,12,.14);color:var(--amber)} .c-lo{background:rgba(194,59,46,.10);color:var(--danger)}
.gov{display:grid;gap:12px;margin-top:20px}
@media(min-width:900px){.gov{grid-template-columns:1fr 1fr 1fr}}
.gov div{background:var(--paper-2);border:1px solid var(--line);border-radius:12px;padding:16px 18px;font-size:12.5px;color:var(--ink-2);line-height:1.55}
.gov b{display:block;font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--purple);margin-bottom:6px}
.gov a{color:var(--purple)}
.qbar.done .col{background:var(--purple)}
</style>"""


def tri(pt, en, es):
    return {"pt": pt, "en": en, "es": es}


FIXED = {
    "m_meta": tri(
        '\n      <span class="tag">WIR Index · Trimestral</span><br>\n      Publicação pública · compartilhável<br>\n      Edição 02 · Q3 2026 · publicado nov/2026<br>\n      <span class="vintage">Dados até 30/set/2026 · funding global: Q3\'26 (Gallagher Re, 5/nov)</span>\n    ',
        '\n      <span class="tag">WIR Index · Quarterly</span><br>\n      Public edition · shareable<br>\n      Issue 02 · Q3 2026 · published Nov/2026<br>\n      <span class="vintage">Data through Sep 30, 2026 · global funding: Q3\'26 (Gallagher Re, Nov 5)</span>\n    ',
        '\n      <span class="tag">WIR Index · Trimestral</span><br>\n      Publicación pública · compartible<br>\n      Edición 02 · Q3 2026 · publicado nov/2026<br>\n      <span class="vintage">Datos al 30/sep/2026 · funding global: Q3\'26 (Gallagher Re, 5/nov)</span>\n    '),
    "c_ed": tri("WIR Index · Edição 02 · 3º trimestre de 2026",
                "WIR Index · Issue 02 · Q3 2026",
                "WIR Index · Edición 02 · 3er trimestre de 2026"),
    "c_h1": tri('A nova era do seguro é <span class="accent">inteligência de dados, velocidade e escala</span>.',
                'The new era of insurance is <span class="accent">data intelligence, speed and scale</span>.',
                'La nueva era del seguro es <span class="accent">inteligencia de datos, velocidad y escala</span>.'),
    "c_dek": tri("O índice trimestral da WIR sobre capital, tecnologia e regulação na fronteira entre IA e seguros, no Brasil, na América Latina e no mundo. Leitura de decisão para C-level, não para compliance. Nesta edição, pela primeira vez, conferimos as nossas próprias previsões.",
                 "WIR's quarterly index on capital, technology and regulation at the frontier of AI and insurance, in Brazil, Latin America and the world. Decision reading for the C-suite, not for compliance. In this issue, for the first time, we grade our own predictions.",
                 "El índice trimestral de WIR sobre capital, tecnología y regulación en la frontera entre IA y seguros, en Brasil, América Latina y el mundo. Lectura de decisión para el C-level, no para compliance. En esta edición, por primera vez, evaluamos nuestras propias predicciones."),
    "c_by": tri('<span><b>Criado por</b> <b>Nicholas Weiser</b> &amp; <b>José Carlos de Paula</b> · WIR Innovation</span>',
                '<span><b>Created by</b> <b>Nicholas Weiser</b> &amp; <b>José Carlos de Paula</b> · WIR Innovation</span>',
                '<span><b>Creado por</b> <b>Nicholas Weiser</b> &amp; <b>José Carlos de Paula</b> · WIR Innovation</span>'),
    "c_contrib": tri('<b>Amanda Pinheiro</b>, <b>Felipe Moraes</b> e <b>Cristian Mendivelso</b> · <span class="aff">Avante Ventures, Holding de IA</span>',
                     '<b>Amanda Pinheiro</b>, <b>Felipe Moraes</b> and <b>Cristian Mendivelso</b> · <span class="aff">Avante Ventures, AI Holding</span>',
                     '<b>Amanda Pinheiro</b>, <b>Felipe Moraes</b> y <b>Cristian Mendivelso</b> · <span class="aff">Avante Ventures, Holding de IA</span>'),
    "c_prev": tri("Edição 01 · Q2 2026 · leia o arquivo →", "Issue 01 · Q2 2026 · read the archive →", "Edición 01 · Q2 2026 · lee el archivo →"),
    # Team: facts reconciled with ~/Claude/projects/avante/TEAM-FACTS.md (framing kept).
    "tc_role_2": tri("Strategic Partner, Avante", "Strategic Partner, Avante", "Strategic Partner, Avante"),
    "tc_li_10": tri("Fundador da Bamboo DCM (crédito privado)", "Founder of Bamboo DCM (private credit)", "Fundador de Bamboo DCM (crédito privado)"),
    "tc_li_14": tri("US$500M+ sob gestão", "US$500M+ under management", "US$500M+ bajo gestión"),
    "tc_li_15": tri("Lidera IA e engenharia aplicada na Avante, Holding de IA", "Leads AI and applied engineering at Avante, AI Holding", "Lidera IA e ingeniería aplicada en Avante, Holding de IA"),
    "h2_10": tri("A nova era do seguro é sobre inteligência de dados, velocidade e escala.",
                 "The new era of insurance is about data intelligence, speed and scale.",
                 "La nueva era del seguro se trata de inteligencia de datos, velocidad y escala."),
    "bloco_9": tri("Quem assina esta edição", "Who signs this issue", "Quién firma esta edición"),
    "h2_9": tri("A equipe por trás do WIR Index", "The team behind the WIR Index", "El equipo detrás del WIR Index"),
    "sub_8": tri("WIR Innovation, powered by Avante Ventures · San Francisco · São Paulo",
                 "WIR Innovation, powered by Avante Ventures · San Francisco · São Paulo",
                 "WIR Innovation, powered by Avante Ventures · San Francisco · São Paulo"),
}
