# WIR: Email to Scale — Complete Concept

Date: September 14, 2026
Status: interactive design proposal for Cristian's review. No publication or production implementation approval is implied.

## Confirmed direction

Cristian selected email traffic as the starting point for the creative exploration: his customers work through email, so the story should begin there. He requested the complete concept and a view of how it would look before making further decisions. This replaces the earlier paper-document hero metaphor. It does not change the underlying capability to process email attachments.

## Concept

**Email to Scale.** Familiar work arrives through email; WIR connects context, criteria and action so an insurance operation can gain capacity. The website leads with AI scale for insurance, then makes that promise tangible through recognizable email objects.

The three luminous routes express distribution, underwriting and visibility as parallel business capabilities. They are a brand metaphor, not three sequential product stages. The generated art has a shared open routing structure with three outlets; its geometry is conceptual.

### Message hierarchy

1. Category: AI Scale Solutions for Insurance, Brazil.
2. Promise: IA para escalar o mercado segurador.
3. Mechanism: Dos e-mails à próxima decisão.
4. Capabilities: Smart Sales, Underwriter Intelligence, dashboards and analytics.
5. Adoption: discovery, scoped integration, validation, and ongoing operation.
6. Conversion: describe the operational bottleneck and start a conversation.

An optional alternative headline is available through the host's design controls: O trabalho chega por e-mail. A escala, com IA. The default preserves the existing AI Scale positioning.

## Review surfaces

- Full homepage: hero; recognizable email intake; three expandable capability rows; integrations; implementation; founders; Insights; closing conversation CTA; footer.
- Solutions: three interactive capability tabs with specific scope and contact paths.
- How it works: six underwriting stages in the documented order, including human escalation.
- About: thesis, actual founder photos, origins and operating principles.
- Insights: three existing article titles and conceptual reading introductions, with links to the matching existing article paths. The complete editorial archive is not copied into the concept.
- Contact: local validation and local preview only. The page explicitly states that data is not sent.
- Intro: four selectable camera beats and an eight-second playback study.
- Privacy: a clearly identified placeholder for the existing official policy during implementation; not a new legal policy.

Website copy is PT-BR, consistent with existing WIR brand context. Documentation is English. EN and ES are future implementation work.

## Art direction

- Deep navy: #0A0D2C.
- Lavender: #D6D4FF; light chapter surface #E7E5FF.
- Warm accent: #FFA23E.
- Reading surface: #F7F7FC.
- Space Grotesk with selective Instrument Serif italic emphasis.
- Official white WIR SVG on navy, official blue SVG in the footer.
- Transparent email envelopes and compact conversation tiles, controlled depth and luminous paths.
- Editorial divisions and expandable rows; no invented dashboards, client logos or numerical results.

## Intro direction: eight seconds

| Beat | Camera and visual action | Message |
| --- | --- | --- |
| 00–02 | Travel among arriving emails at different depths. | Work arrives through email. |
| 02–04 | Approach the open routing structure; trajectories begin to converge. | Context connects the work. |
| 04–06 | Reveal organized parallel paths. | The operation gains direction. |
| 06–08 | Pull back into the homepage hero composition. | Capacity grows with structure. |

The current motion study uses a generated still image with camera transforms, short signal transitions and selectable beats. It is not a rendered 3D video and does not contain independently animated 3D email objects. A production film would animate those objects and the camera, maintain continuity between shots, and end on the final hero pose. Sound, if commissioned, should be restrained spatial pulses with no autoplay audio on the website.

The hero headline and CTAs remain available during the initial movement. The intro runs once and settles. Reduced-motion preference disables transitions and motion. On mobile, artwork sits below copy and CTAs.

## Files

- Inline review source: [wir-email-concept.html](wir-email-concept.html).
- Generated hero master: [hero-email-flow.png](hero-email-flow.png).
- Embedded web image: [hero-email-flow.jpg](hero-email-flow.jpg).
- Founder preview derivatives: nicholas-preview.jpg and jose-carlos-preview.jpg, from existing official site assets.
- Earlier C2 comparison remains at ../2026-09-14-wir-c2-email-orchestration.png.

All project-bound deliverables are inside this folder. No production source, existing articles, existing concepts, or publishing configuration was overwritten. Browser QA wrappers live in /tmp only and are disposable.

## Scope and evidence

The module descriptions and ordered underwriting flow follow ../wir-content-engine/knowledge-base/company-facts.md. The user's AI Scale direction supersedes the old positioning in that source. Do not infer universal mail-provider integrations, automatic quote approval for every request, commercial availability, client counts or achieved performance. Those are not established by this design.

## Validation

- JavaScript syntax check through Node.
- Fragment size below the 1 MB visualization limit; embedded hero, logos and photos; no runtime API calls.
- Chrome visual inspection of desktop homepage, solutions, contact, and mobile homepage/solutions at a 390px iframe width.
- Verified navigation to Solutions and How it works, product-tab change, mobile menu, and local contact preview using fictional example.com data.
- Verified intro playback starts; selectable camera beats are available.
- Corrected the header to use the official white logo after visual QA.
- Corrected the local form action to work inside the sandbox without form submission permissions.
- Production build not run: only concept assets and review content were created; the application source is unchanged.

## Review decisions

The remaining decisions are the headline emphasis, visual density and the desired pacing of the intro. The review source also offers optional artwork intensity and motion controls through the host when supported.

## Image generation

Tool: built-in ImageGen. The C2 homepage concept was used as a style reference. Final prompt:

```text
Use case: stylized-concept.
Asset type: cinematic 3D homepage hero background for WIR, 1536x1024 landscape.
Input image is a STYLE REFERENCE ONLY: extract the premium navy, lavender, cobalt and warm amber email choreography from the C2 website concept. Do NOT reproduce a website screenshot.
Create a spectacular meticulously composed 3D scene of digital email traffic becoming organized operational streams. Many elegant transparent glass email envelopes and a few tiny email-thread tiles approach from different depths in space, follow fine luminous curving paths and resolve into three spacious organized parallel routes. These are PARALLEL branches, never three sequential gates: communicate coordination and growing capacity. One restrained central open architectural glass structure refracts the moving signals and separates their paths. Email glyphs unambiguously recognizable, like elegant digital UI objects rendered in glass, not paper letters.
Composition: left 40 percent is near-empty quiet deep navy #080d29 negative space, the scene occupies the right 60 percent. The art extends off the right edge with confident crop; cinematic camera low and slightly oblique, medium focal length, near envelopes softly defocused, far envelopes tiny, crisp central structure with caustic edges. Dark navy atmospheric background, blue/lavender glass, one amber current, exceptional controlled lighting and tangible optical depth. Art direction: a high-end motion design studio's launch film for insurance intelligence. Restrained and expensive, not cyberpunk, busy sci-fi or wallpaper.
NO text, letters, labels, logos, navigation, buttons, webpage, borders, watermarks, statistics, document stacks, PDF sheets, file folders, Gmail logo, Outlook logo, globes, robots or brains. No broad ribbons obscuring the email objects. Deliver only the pristine 3D art, edge to edge.
```

