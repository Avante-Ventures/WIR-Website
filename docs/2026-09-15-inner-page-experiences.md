# Sculptural internal page redesign

> Historical implementation checkpoint. The site was subsequently approved and published. For current status, routes, tests and deployment instructions, read the [production handoff](2026-09-15-production-handoff.md).

Cristian requested that Solutions, How it works and About WIR match the visual impact of the approved home, with SUSEP visibly differentiated in the menu.

- Solutions: navy hero with three translucent glass panels and amber-to-lavender light paths; lavender capability rows; existing product tabs and statuses; layered analytics illustration; SUSEP and implementation entry points.
- How it works: dedicated `#how` route in PT/EN/ES, incoming email sculpture, keyboard-accessible Receive/Connect/Act explorer, three complete implementation stages, human expertise section and contact close.
- About: real founder portraits over the luminous navy composition, large WIR/we statement, founders and advisors, partners, values, FAQs and contact close. Existing partner/principle anchors remain.
- Navigation: amber Dashboard SUSEP link in all three React languages, mobile menu and static PT/EN article headers. How it works links to its own page. Original home implementation anchors remain available.
- Mobile: title, sculpture, supporting copy, then actions; no hidden reading dependency or continuous animation. Reduced-motion support is retained.

Implementation: `src/experience-pages.jsx`, `src/styles/experience-pages.css`, plus surgical route, template and existing page wiring. Illustrations are editable SVG/CSS; photos are existing official assets. No paid media generation, commit, push or deployment.

Validation: production build passes; 27 tests pass, including rendering all three pages in PT/EN/ES with one H1 and valid anchors, and flow click/keyboard transitions. Native Safari visual review covered desktop Solutions/About and mobile How it works. Static article navigation regenerated. Existing home and dashboard tests pass.

Review:
- http://127.0.0.1:3000/#solutions
- http://127.0.0.1:3000/#how
- http://127.0.0.1:3000/#about
- http://127.0.0.1:3000/docs/full-site-review.html
