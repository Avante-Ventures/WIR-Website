# WIR website: preliminary diagnosis

Date: September 14, 2026
Scope: source-level positioning, content, information architecture and implementation review, plus a bounded review of public reference sites. This is not a completed visual, accessibility, security or performance audit.

Repository baseline: `9eab62e`; fetched `origin/main` matches the local commit. Eleven existing untracked article directories were present before this work and were left untouched.

## Core finding

The website has useful ingredients for the new positioning: insurance-specific workflows, founders with relevant experience, a commercial implementation model, named capabilities, multiple languages and a substantial Insights section. The redesign needs to make operational scale the organizing idea and distinguish the business promise from the technical mechanism.

## Prioritized findings

| ID | Priority | Observed evidence | Recommended action |
| --- | --- | --- | --- |
| WIR-01 | High | `home-opening.jsx` leads with an AI layer and a broad “new era” headline. The new instruction explicitly changes the primary positioning. | Put AI-enabled insurance scale and Brazil in the first screen; explain existing-system compatibility later. |
| WIR-02 | High | The content engine's facts and voice guides still mandate “camada de IA”. | Record today's decision and coordinate a source-level positioning update so future articles do not restore the old category. |
| WIR-03 | High | `home-shift.jsx` and `solutions.jsx` say two products run in production; canonical traction records a first POC. | Reconcile module availability with actual deployment status. These statements could describe different things; the review cannot establish which is current. |
| WIR-04 | High | The home compares minutes with six weeks and displays 24/7 coverage. No supporting measurement or availability commitment was found in the reviewed facts. | Remove from proposed copy until a scoped source supports the comparison or service commitment. |
| WIR-05 | High | “No IT project”, “no insurer IT” and “immediate transformation” sit alongside a documented 3–12 month implementation involving integration and testing. | Explain who performs the work and what the insurer contributes. Existing-system compatibility does not eliminate implementation. |
| WIR-06 | High | Site product lists include X-sell Brokers and SDR New Business in development, while the facts file says to name only Smart Sales, Underwriter Intelligence and dashboards. | Establish the approved roadmap scope; avoid carrying these names into the new concept by default. |
| WIR-07 | Medium | `home.jsx` dedicates a manifesto section to the AI-layer thesis; shared copy and locale descriptions repeat it. | Migrate the narrative across all surfaces, rather than changing only the hero. Keep technical integration language where useful. |
| WIR-08 | Medium | Root crawler fallback mentions claims, but the reviewed module list does not establish a claims product. | Align the public scope with approved capability evidence. Market coverage is not product availability. |
| WIR-09 | Medium | The home places broad benefit claims and a large team-experience band around its technical explanation. | Make the sequence outcome → mechanism → implementation → evidence easy to follow; retain clear experience attribution. |
| WIR-10 | Medium | Navigation has Home, About, Manifesto, Products & AI, Data Protection, Insights and an external Dashboard, plus contact and languages. | Give the commercial path more prominence; retain secondary destinations in contextual links and the footer. |
| WIR-11 | Medium | The facts file attributes four market statistics to institutions, but explicitly says they came from the website; original study citations are not supplied there. | Obtain original publications, dates and applicable populations before using those figures as redesigned hero or proof claims. No independent validation of those statistics was completed. |
| WIR-12 | Verify | Contact attempts storage, optionally fires a webhook, then falls back to opening an email draft; the source distinguishes submission modes. | Test each state with mocks. An opened email draft or an opaque webhook response does not prove message delivery. No live lead submission was performed. |
| WIR-13 | Verify | The root page exposed only a short fallback through text extraction. Application routes are hash-based; insights have generated static pages. | Review rendered content and crawler output by route and locale during implementation. Do not infer an indexing failure from this extraction alone. |
| WIR-14 | Low | README describes a no-build Babel site while `package.json` and `vite.config.js` define a Vite build with three locale entries. | Update the operational README alongside implementation so the next editor uses the correct workflow. |

Priority labels describe redesign dependencies, not production incident severity.

## Reference research

Reviewed September 14, 2026 using each company's own public website. These observations concern their published positioning and content structure; their product results were not independently audited. They are international category references, not a complete Brazilian competitor or market study.

| Reference | Observed pattern | Proposed lesson for WIR |
| --- | --- | --- |
| [Sixfold](https://www.sixfold.ai/) | Names underwriting as the job and connects its capabilities to visible customer testimony and case-study links. | Explain a recognizable insurance job and put evidence beside it. Do not borrow its customer claims or performance figures. |
| [Cytora](https://www.cytora.com/) | Connects risk intake, prioritization and decisions to operating capacity, with workflows organized by audience and transaction. | Make “scale” inspectable through a concrete workflow and operational outcome. |
| [mea Platform](https://www.meaplatform.com/) | Leads with insurance operations and links product areas to specific process tasks. | Connect the broad business promise to a bounded delivery scope. WIR's scope must come from its own evidence. |

Inference: “AI + scale” by itself will not distinguish WIR from these category narratives. A stronger combination is Brazilian insurance context, attributable operator experience, concrete use cases and a clear implementation model. This is a strategic hypothesis to evaluate, not proven competitive differentiation.

## What should survive the redesign

- Official logo and the existing WIR palette, with a deliberate shift toward navy, white and lavender surfaces in the proposed visual study.
- The actual product names and insurance-specific vocabulary.
- Real people, photographs, interviews, press coverage and experience attribution.
- Existing article URLs, locale support and content generators.
- The working distinction between product, market-data dashboard and editorial content.

## What this pass did not establish

- Current production performance, accessibility conformance or mobile layout quality.
- Live analytics, conversions, search demand or pipeline attribution.
- Contact delivery, production backend configuration or current commercial availability.
- Verification of legal compliance, security controls or certifications.
- Current status of the POC beyond the reviewed internal facts.

No application code, article sources, existing generated pages, shared brand sources or official logo files were changed in this strategy pass.

Next artifact: [AI scale direction and website plan](2026-09-14-ai-scale-direction.md).
