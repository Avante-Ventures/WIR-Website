# WIR AI scale concept: generation record

Tool: built-in image generation, reference-guided concept generation followed by one focused header edit.

Purpose: a static composition study for discussing the new positioning. Not website implementation or a product screenshot.

Official reference: `../../public/assets/wir-logo.svg` relative to this document (rasterized to a temporary PNG for the generation tool). The actual SVG was not modified.

Selected output: [Homepage concept v2](2026-09-14-wir-ai-scale-homepage-v2.png). The initial image is retained separately as the first iteration.

Visual review: headline and product names are readable; the revised header restores readable dark navigation on a light surface. The main composition and three outcome paths remain intact. The study covers the opening chapters only; no responsive or interactive behavior has been tested. The simplified lower workflow includes proposed generated microcopy, not new product claims.

## Initial brief summary

A tall homepage composition with the official WIR logo, a light navigation header, a deep-navy opening and the headline “IA para escalar o mercado segurador.” Warm-colored fibers resolve into three spacious blue and lavender ribbons labeled Distribuição, Subscrição and Visibilidade. White and lavender editorial chapters introduce operational capacity, Smart Sales, Underwriter Intelligence and dashboards, followed by a simplified illustrative workflow. Existing WIR colors and web typography; no invented performance metrics, client logos or product screens.

## Final edit prompt (verbatim)

```text
Edit only the top navigation header of image 1, the WIR website concept. The top approximately 100 px / 7 percent must have a SOLID white #F9FAFB background, not a dark gradient, so that all navigation is readable. Preserve the existing logo at the left with exact design and proportions; image 2 is its official reference. Make navigation links solid dark navy #0A0A2E: Soluções, Como funciona, Sobre a WIR, Insights. Make the top right Falar com a WIR button solid navy with white text and visible arrow. Maintain layout and spacing. Everything BELOW the header must remain exactly the same: headline, colorful ribbons, buttons, all chapters, colors, typography, texts and composition. Do not change any lower content. Single finished tall website composition.
```

## Implementation boundaries

- The logo in the generated image is a visual reference. Implementation must use the actual repository SVG.
- The lower process graphic is a simplified illustrative teaser, not the complete six-stage canonical workflow.
- Generated microcopy is proposed only; use the reviewed strategy document when implementing.
- Static artwork cannot verify navigation, mobile responsiveness, performance or accessibility.
