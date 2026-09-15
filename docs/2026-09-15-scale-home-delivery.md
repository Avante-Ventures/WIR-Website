# WIR scale home — local delivery

## Approved direction

Cristian requested the complete home plus an eight-second cinematic opening, using Nicholas's selection: A's luminous ribbon hero, C's dark capabilities, E's lavender implementation journey. The central headline remains visible from the first frame. Emails are the origin of the connected flow; earlier email prototypes remain archived.

## Open locally

- Website: http://127.0.0.1:3000/
- English: http://127.0.0.1:3000/en/
- Spanish: http://127.0.0.1:3000/es/
- Desktop/mobile review and media: http://127.0.0.1:3000/docs/media/wir-scale/review.html
- Mobile review: http://127.0.0.1:3000/docs/media/wir-scale/review.html?mobile

The Vite server is running locally for review. Restart with `npm run dev -- --host 127.0.0.1` if needed. The intro plays once per browser session; use its replay control for another viewing. Nothing was committed, pushed, or deployed.

## Implementation

- `src/home-opening.jsx`: HTML headline, copy, CTAs and localized labels; cinematic media with pause/resume/replay; session handling, visibility suspension and cleanup.
- `src/home.jsx`: three illustrated capabilities, lavender implementation, real founder photos, localized Insights and contact section.
- `src/styles/hero-film.css`, `src/styles/home-scale.css`: responsive composition and brief SVG hover movement; reduced-motion support.
- Shared navigation: white official-logo header, ticker removed, functioning mobile menu at 760–960px as well as smaller widths, preserved language switcher and footer destinations.
- Capability links activate the correct existing product tab. Router waits for lazy pages before scrolling to an anchor.
- `src/home-insights.mjs`: lightweight metadata for the latest three available PT and EN articles as of this change. Spanish explicitly points to the Portuguese archive. Refresh this snapshot when featuring newer articles; article bodies are not part of the home bundle.
- Homepage metadata aligned in PT/EN/ES. Existing internal content and contact interfaces remain in place.

## Media and cost

Folder: [media/wir-scale](media/wir-scale/).

- [Arrival frame](media/wir-scale/01-arrival.png)
- [Connection frame](media/wir-scale/02-connection.png)
- [Final frame](media/wir-scale/03-final.png)
- [Original 1080p master](media/wir-scale/master.mp4)
- [Prompts and image-generation mode](media/wir-scale/prompts.md)
- [Generated-film contact sheet](media/wir-scale/qa/film-contact-sheet.jpg)

Production assets: `public/assets/scale/intro-desktop.mp4` (1920×1080, 8s, ~1.7 MiB), `intro-mobile.mp4` (960×720, 8s, ~542 KiB), and optimized JPEG posters (~141/69 KiB).

Three reference-driven stills were generated with built-in imagegen. One video generation used Higgsfield Seedance 2.0, silent 1080p. Higgsfield balance changed from 601.37 to 529.37 credits: **72 credits used**. No video variants were purchased. ChatGPT credit usage is not exposed by the tools, so no exact total is asserted.

Mobile uses a separate 4:3 export: x=480 through x=1920 of the 1080p master, resized to 960×720. This keeps all envelopes, the convergence and three ribbon branches visible beneath the HTML headline. It is a deliberate reframe of the same continuous film, not a second generation.

## Verification

- `node --test tests/hero-playback.test.mjs tests/opening-lifecycle.test.mjs`: **10 passed**. Tests exercise the real component effect with browser/media doubles: first visit, session return, explicit pause, offscreen/hidden pause, replay, slow load, rejected autoplay, media error, reduced motion, storage denial and teardown. Article paths and images resolve locally.
- `npx vite build`: passed. Existing large lazy blog-chunk warning remains; article regeneration was not run.
- Desktop hero, dark capabilities and lavender implementation inspected in Safari; desktop hero also inspected in Chrome.
- Mobile composition inspected at 390px through a same-origin review iframe; the email/ribbon visual remains separate from the headline and actions.
- Mobile menu opens/closes; the implementation navigation updates the correct home anchor. English underwriting link selects the existing Underwriter Intelligence tab.
- PT/EN article paths and ES Portuguese archive indication checked. Contact CTA opens the existing form; product selection and transition to the context step checked without entering personal information or submitting a message.
- Decoded video contact sheet confirms visible envelopes, gradual thread/ribbon transformation, and the three-branch final frame. MP4s contain no audio and use fast-start metadata.
- Native automation frequently leaves Safari's document hidden, so continuous playback timing and exceptional loading conditions were covered by the lifecycle tests rather than claimed as exhaustive real-device tests. Physical iOS/Android testing remains advisable before publication.

## Preservation

Earlier concept images and rejected prototypes remain in `docs/concepts/`. The previous home source was also copied into `docs/media/wir-scale/previous-home.jsx` and `previous-home-opening.jsx` before replacement. Pre-existing untracked article directories were untouched.
