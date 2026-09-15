# WIR: AI scale for Brazil's insurance market

Date: September 14, 2026
Status: first strategy and design proposal for discussion. Not a released website.

Visual study: [Homepage concept, revised header](concepts/2026-09-14-wir-ai-scale-homepage-v2.png). Generation record: [brief and final edit prompt](concepts/2026-09-14-wir-ai-scale-prompts.md).

## Decision recorded

Cristian reports that today's discussion moved WIR's primary positioning from “camada de IA” to **“AI Scale Solution for Insurance Market”**, focused on Brazil. This instruction supersedes the old positioning for this redesign. Whether the English phrase is a fixed signature or strategic working language is still open.

The existing content engine's `company-facts.md` and both brand voice files still prescribe the old category. They have not been edited: they belong to the publishing pipeline outside this website. Their positioning sections need a coordinated update before new content is generated under the new strategy.

## Strategic interpretation

Lead with the operational capacity that WIR helps an insurance business develop. Explain AI, workflows, integrations and implementation as the means of delivering that capacity.

“Scale” needs a concrete meaning on the website:

| Dimension | Buyer question | Existing capability to explain | Evidence to collect |
| --- | --- | --- | --- |
| Distribution | Which opportunities deserve attention? | Smart Sales: portfolio context, prioritization and next actions | Qualified opportunities, follow-up and conversion, with a defined baseline |
| Underwriting | How can the team handle more work while maintaining its risk criteria? | Underwriter Intelligence: document processing, appetite-based evaluation and human escalation | Volume per underwriter, turnaround, rework and exceptions |
| Operational visibility | Where does work stall, and what should management do next? | Dashboards, analytics and reporting | Queue age, response times and bottlenecks |

These are proposed outcome categories, not new products or achieved performance claims. The public product scope remains anchored in the documented modules. A broader market ambition does not establish a claims, reinsurance or policy-administration product.

### Proposed message hierarchy

1. **Category:** AI solutions that help Brazil's insurance market scale.
2. **Business value:** more capacity to distribute, evaluate and manage insurance business.
3. **Mechanism:** workflow automation, intelligence aligned to the insurer's criteria, and operational visibility.
4. **Delivery:** scoped implementation, agreed measures of success, integration and continuing operation.
5. **Trust:** people with attributable insurance experience, an honestly described pilot, and documented controls.

Existing-system compatibility belongs in the explanation of implementation. It no longer needs to define the company in the headline.

### Copy proposal

All wording below is proposed, not approved final copy. PT-BR is the primary website language; the strategy document is in English.

| Role | Proposed copy |
| --- | --- |
| English category, polished option | **AI solutions to scale Brazil's insurance market.** |
| English short signature, if preserving “AI Scale” | **AI Scale Solutions for Insurance.** |
| PT-BR headline | **IA para escalar o mercado segurador.** |
| PT-BR support | A WIR conecta distribuição, subscrição e inteligência operacional para ajudar seguradoras e corretoras no Brasil a ampliar sua capacidade de operação. |
| Primary commercial action | Falar com a WIR |
| Exploration action | Explorar soluções |
| Operational chapter | Mais capacidade. Critério em cada decisão. |
| Delivery chapter | Da prioridade do negócio à operação. |

If the supplied English phrase is fixed, retain it verbatim as the signature. The Portuguese explanation can still make its meaning clear. Do not turn “AI Scale” into a named proprietary product without a separate naming decision.

## Creative direction: capacity in motion

The visual premise is an operation gaining capacity while retaining structure. A group of fine warm-colored streams resolves into three controlled, spacious paths representing distribution, underwriting and visibility. This is an expressive brand metaphor. A separate, clearly labeled workflow exhibit explains the actual mechanism.

Use the existing WIR mark intact, including the current “AI for insurance” descriptor. Do not alter the supplied SVG or copy Avante's globe, city arrival, logo treatment or narrative. Transfer Avante's level of composition, continuity and care.

### Visual system

- Navy `#0A0A2E` for the expressive opening; white `#F9FAFB` for reading; lavender `#D9D8FE` for secondary surfaces.
- Use the existing amber, coral, purple and blue gradient in the mark and the flow artwork. Keep body text solid and high contrast.
- Space Grotesk for decisive headings and body text; Instrument Serif for occasional emphasis; JetBrains Mono for small process labels. These families already belong to the web identity.
- Large, differentiated editorial compositions. Product sections should have room to explain a concrete workflow and outcome.
- Real founder photographs and existing approved assets. Experience logos must retain a visible team-background label.

### Motion proposal

- The first screen must explain WIR immediately, with both actions visible.
- Use a short flow expansion as the signature movement. Scrolling must remain native; do not require visitors to watch a film to navigate.
- On mobile, show a composed static crop or light animation without placing artwork behind essential text.
- Reduced motion and unavailable graphics must preserve the same text, links and workflow explanation.
- Do not animate fake live traffic, fabricated KPIs or fictional automated approvals.

The generated composition study is **not implemented UI, a product screenshot, or a validated responsive design**. Any generated text is subordinate to the reviewed copy table above. It shows only the first chapters; the architecture below covers the full website.

## Homepage architecture

| Chapter | What the visitor learns | Proposed composition / action |
| --- | --- | --- |
| 1. Scale | What WIR does and for whom | Immediate headline, Brazil context, signature flow; solutions and contact |
| 2. Capacity | What becomes easier to scale | Three editorial rows: distribution, underwriting, visibility |
| 3. The work | How a request moves toward a decision | Illustrative transport submission; intake, document reading, enrichment, risk evaluation, pricing, decision / escalation |
| 4. Solutions | Which capability fits the problem | Smart Sales and Underwriter Intelligence, supported by dashboards; status presented only when verified |
| 5. Implementation | What adopting WIR involves | Diagnosis and agreed scope, implementation and testing, continuous operation; actual responsibilities explained |
| 6. People and evidence | Why this team can do the work | Founders, attributable experience, accurately scoped POC, relevant earned media |
| 7. Thinking | How WIR understands insurance in Brazil | Existing relevant articles and interviews; direct links into Insights |
| 8. Conversation | How to evaluate a fit | One clear contact path; invite the visitor to describe their operational bottleneck |

The illustrative transport workflow must use fictional, visibly labeled data. Show both human escalation and other supported outcomes. Do not imply that every request automatically becomes a quote, or that the illustration is a live pilot interface.

## Full website and migration map

| Surface | Change | Preserve / verify |
| --- | --- | --- |
| Home (`src/home*.jsx`) | Replace the architectural category with a scale-led narrative; integrate outcome chapters | PT/EN/ES content, actual module scope, working navigation |
| Solutions (`src/solutions.jsx`) | Explain business problem, capability, workflow and implementation for each real module | Resolve production labels and roadmap names first |
| About (`src/about.jsx`) | Connect insurance experience to execution and delivery | Real biographies, photographs and attribution |
| Shared navigation and footer (`src/shared.jsx`) | Prioritize Solutions, How it works, About and Insights; consistent contact action | Language switching; retain data protection and market dashboard destinations |
| Contact (`src/contact.jsx`) | Organize around the operation's bottleneck and next conversation | Distinct saved / email-draft / error states; integration verification with mocks before any real submission |
| Data protection | Explain actual practices using reviewed evidence | No invented certifications or absolute security promises |
| Insights and manifesto (`src/articles.jsx`) | Reconcile company-defining copy with the new positioning | Keep existing slugs and useful technical explanations of AI layers; do not perform a blanket keyword replacement |
| Metadata and crawler copy (`index.html`, `en/index.html`, `es/index.html`) | Align titles, descriptions, social previews, structured data and fallback content | Locale-specific copy, canonical URLs and hreflang |
| Static article output and `llms.txt` | Regenerate from their sources after content reconciliation | Never hand-edit generated article HTML; keep article URLs |
| Content engine, separate project | Reconcile positioning in facts, voice guides and generation instructions | Needs a coordinated follow-up in that project's own scope |

Prefer the existing Vite/React architecture. A stack migration is not needed to evaluate or execute this visual direction.

## Execution sequence

1. Completed in this first pass: source review, preliminary diagnosis, reference research, message proposal, page map and initial visual study.
2. Discuss the proposed visual direction and category wording with Cristian; incorporate what “scale” means in the commercial offering.
3. Implement the shared visual foundation and home, then carry the same direction into solutions, about, contact and reading surfaces.
4. Reconcile all three locales and public metadata; check generated article and content-engine dependencies.
5. Validate build, navigation, responsive layout, keyboard interaction, reduced motion, links and lead states. Capture only measurements actually run.
6. Present the concrete local result for publication approval. No commit, push or production publication is authorized by this proposal.

## Decisions still to resolve

- Is the supplied English category verbatim brand language or a working strategic statement?
- Does the current commercial offer include broader services beyond the documented modules? Until clarified, scale refers to those documented capabilities.
- Which modules are commercially operating today, and which remain in pilot or development?
- Which current pilot outcomes may be published, with what scope and supporting evidence?

These gaps do not block design exploration. They do block presenting new capabilities or results as established facts.

## Source notes

- Current user instruction: primary authority for the positioning change.
- Local site: `src/home-opening.jsx`, `src/home.jsx`, `src/home-shift.jsx`, `src/home-how.jsx`, `src/solutions.jsx`, `src/shared.jsx`, `src/contact.jsx`, `src/styles/style.css` and locale shells.
- Existing scope and facts: `../wir-content-engine/knowledge-base/company-facts.md` and `brand-voice-pt.md`; their old positioning is superseded for this proposal.
- Existing visual tokens: `../wir-axa/wir-presentation-studio/brand/brand.json`; official logo: `public/assets/wir-logo.svg`.
- Avante direction: `../avante-website/docs/2026-09-14-full-website-creative-direction.md` and subsequent implementation notes.
- Detailed findings and external references: [Preliminary diagnosis](2026-09-14-website-diagnosis.md).
