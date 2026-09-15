# WIR — Inside the flow

Local interactive concept, September 14, 2026. Supersedes the static email composition while preserving it at `../index-v1.html`. Nothing is deployed.

## Open

http://127.0.0.1:4327/v2/

If the local server has stopped, run from the repository:

```sh
/opt/homebrew/bin/python3 -m http.server 4327 --bind 127.0.0.1 --directory docs/concepts/wir-email-complete
```

## Story

A transport quote request becomes the protagonist. Its information opens into the six functions of an underwriting operation, reaches a decision route, and joins an organized stream of requests. The message: WIR helps an insurer expand operational capacity while preserving its criteria and human judgment.

| Time | Story beat | 3D action |
| --- | --- | --- |
| 0–4 s | Work arrives through email | Envelopes move independently through space |
| 4–8 s | One request gains focus | Camera approaches the protagonist envelope |
| 8–12 s | Information becomes structured | Envelope opens; information tokens emerge |
| 12–16 s | Criteria shape the next step | Six components and their connections appear |
| 16–20 s | Exceptions need judgment | Quote, decline and human-review paths separate |
| 20–24 s | Capacity expands | Camera reveals organized parallel email flows |

## Explore

- Hero: play, pause, replay, timeline and six chapter controls.
- Email case: complete information, missing information and risk exception scenarios.
- Component workbench: rotate the model, select components, separate/reassemble with the slider and reset the overview. Each component explains its input, action and output.
- Remaining page: human judgment, distribution/subscription/visibility solutions, implementation, founders and contact.
- Contact form: native validation and local confirmation only; no request is sent or stored.

## Implementation

Actual WebGL geometry, camera transitions, procedural materials, bloom and moving email objects using Three.js. This is a working browser concept, not an exported video or a finished cinematic asset. It has no audio track. Brand copy is PT-BR; supporting documentation is English.

`scene.js` owns the geometry and rendering; `model.js` owns story/camera/component data; `experience.js` owns playback and interaction; `experience.css` owns layout. The browser loads the self-contained `experience.bundle.js`, built with esbuild using the existing Three.js installation in the sibling Avante website. No additional package installation was needed.

Google Fonts requires connectivity. Local logos and founder photographs are reused from the project. The only raster hero is an explicitly identified WebGL fallback. This is a conceptual representation of the canonical WIR workflow, not a claim that each geometric piece corresponds to a separately sold product.

## Validation

- Standalone esbuild bundle: passed.
- JavaScript syntax: passed.
- Pure model checks: six chapters/components, finite interpolated camera positions across 1,001 samples, exact camera endpoints, greater separation when expanded.
- Native Chrome desktop: WebGL hero rendering and chapter transitions; component selection with camera change; slider reunification; overview control.
- 390 px preview: responsive layout, complete/missing/exception state transitions.
- Contact: required-field validation and local-only confirmation verified.
- Chrome console: zero messages after tested interactions.

Production source, article output, commits and deployment are untouched.
