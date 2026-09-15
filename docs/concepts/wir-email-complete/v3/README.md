# WIR — From email to next step

Local concept revision 3. Prior versions remain at `/v2/` and `/index-v1.html`.

## Open locally

http://127.0.0.1:4327/v3/

The existing local server on port 4327 serves this folder. The preview root now opens v3. To restart it, run from the repository:

```sh
/opt/homebrew/bin/python3 -m http.server 4327 --bind 127.0.0.1 --directory docs/concepts/wir-email-complete
```

## Creative direction

One recognizable request stays central. The headline stays fixed. A 12-second introduction opens the email, separates its information into three readable cards, identifies the missing cargo value and prepares a reply asking for it. The reply stays on screen after playback. It is explicitly ready for team review.

This is an illustrative transport-insurance request. No messages are sent, no genuine insurance decision is made and no measured performance claim is shown.

## Page flow

1. Fixed promise plus the animated email and one concrete outcome.
2. The same email accompanies four scroll steps: receive, understand, evaluate and route. Step buttons also navigate directly; the visual updates immediately with its explanation.
3. Six technical components are behind the optional Explore in detail disclosure. WebGL initializes only when opened and near the viewport.
4. Existing human judgment, solutions, implementation, founders and contact sections are preserved.

## Motion implementation

The new email scene uses browser-native CSS 3D perspective and transformed HTML planes, keeping email text selectable in the source and sharply rendered. The original Three.js WebGL model remains in the technical detail. This is an interactive website concept, not a rendered video file. Audio is not included.

`email-motion.js` contains the reusable email object and its pure motion states. `experience.js` controls the 12-second playback, scroll steps and reused detail/contact interactions. `experience.css` overrides only the revised concept layout; `base.css` retains the existing lower page.

## Validation

- esbuild bundle and JavaScript syntax pass.
- 1,001 motion samples remain finite and within bounds. Four story checkpoints produce the expected distinct states.
- Safari desktop: readable missing-information and prepared-reply states; navigation between steps; expandable technical section; risk component selection and WebGL rendering.
- 390 px layout inspected in an iframe.
- Chrome rendered the intro; console had no errors at inspection. Chrome window availability was intermittent, so final interaction checks used Safari.
- Local HTTP requests and referenced local assets checked.

The prototype is local-only. Existing production files and prior concepts are preserved.
