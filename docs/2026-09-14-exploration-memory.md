# WIR redesign — archived exploration and fresh start

Recorded September 14, 2026. **Status: rejected creative direction; preserved for possible selective reuse.**

**New direction received:** Cristian subsequently reported Nicholas's selection of A's header/hero, C's capabilities section, and E's implementation section. Read the [current selection](2026-09-14-nicholas-selected-direction.md) before continuing. This supersedes the instruction below to wait for a new brief; the email-led rejection and historical feedback remain in force.

## Latest decision

Cristian said he did not like the latest result, wants to take a different direction, and asked to save this work in memory before starting again. He requested notification when ready, not another concept yet.

- Start the next creative exploration from a blank brief informed by his next message.
- Do not keep iterating on the email-led direction without a new instruction.
- Preserve all images, source files and working prototypes.
- Reuse individual pieces only if they fit the new brief. Their existence does not imply approval.
- Earlier next-step instructions in the recovery/strategy documents are historical, not the active plan.

## Feedback history

| Exploration | What was delivered | User response |
| --- | --- | --- |
| Initial directions | AI Scale homepage images and five directions A–E | Explored options; eventually asked to develop the email metaphor |
| Email v1 | Full-page concept with raster artwork and camera-like motion | About 2/10: missing story, actual 3D intro and component breakdown |
| Email v2 | 24-second WebGL journey; six explorable geometric components; three email scenarios | About 4/10: closer to the intent, but difficult to understand and too slow to communicate |
| Email v3 | Fixed headline, 12-second CSS 3D email opening, one missing-information outcome, four scroll steps, optional technical model | Explicitly disliked; requested a different direction and a fresh start |

Do not infer a specific reason for the final rejection beyond what he stated. The proposal was approved for execution before v3, but the resulting design was subsequently rejected.

## Preserved assets

All paths below are relative to this document.

- Initial homepage studies: `concepts/2026-09-14-wir-ai-scale-homepage.png` and `concepts/2026-09-14-wir-ai-scale-homepage-v2.png`.
- Five directions and their images: `concepts/2026-09-14-wir-five-directions.md` and `concepts/2026-09-14-wir-{a,b,c,d,e}-*.png`.
- Email direction image and notes: `concepts/2026-09-14-wir-c2-email-orchestration.{png,md}`.
- V1 standalone page: `concepts/wir-email-complete/index-v1.html`; inline source: `wir-email-concept.html` in that folder.
- V1 concept/story notes: `concepts/wir-email-complete/concept.md`.
- Generated email artwork: `concepts/wir-email-complete/hero-email-flow.{png,jpg}`.
- V2 WebGL experience: `concepts/wir-email-complete/v2/index.html`, with source files and README alongside it.
- V3 simplified experience: `concepts/wir-email-complete/v3/index.html`, with source files and README alongside it.
- Original diagnosis/strategy: `2026-09-14-website-diagnosis.md`, `2026-09-14-ai-scale-direction.md`, `2026-09-14-session-recovery.md`.
- Exact asset inventory with SHA-256 hashes: `concepts/2026-09-14-exploration-manifest.json`.

## Potential reusable parts, not approved designs

- Official WIR logos and founder photographs.
- V2's lazy WebGL component viewer, object selection and separation control.
- V3's reusable HTML email planes, 3D transforms and bounded motion-state function.
- Playback, reduced-motion handling, responsive structure and local-only contact interaction.
- Verified brand/product context and canonical underwriting workflow, subject to the new brief.

The email metaphor, headlines, palette treatment, geometry, page structure and intro timings are all open to replacement. Do not impose this exploration on the next direction.

## Recover a prototype later

Run from the repository:

```sh
/opt/homebrew/bin/python3 -m http.server 4327 --bind 127.0.0.1 --directory docs/concepts/wir-email-complete
```

Then open `/index-v1.html`, `/v2/` or `/v3/` at `http://127.0.0.1:4327`. The preview root points to v3 for historical convenience; this does not mean it is the accepted design. Stop the local server when finished.

## Boundaries

These are local, uncommitted artifacts. No production site change, commit, push or publication was performed. Existing untracked article output belongs to other work and remains untouched. Claude's shared memory index is read-only; this checkpoint lives in the project and is discoverable through its AGENTS.md.
