# Design QA — Temply Studio Study Success Bundle

## Comparison target

The visual direction was compared against the provided [Azurio Creative Agency reference](https://azuris-nextjs.vercel.app/index-creative-agency). The rebuild matches the reference at the level of design grammar—oversized editorial typography, warm off-white canvas, dark transition bands, full-screen navigation, numbered section rhythm, asymmetrical image gallery, marquee, sticky feature presentation and oversized closing CTA—while remaining an original Temply Studio page.

No Azurio source code, logos, fonts, images, copy, sample projects, testimonials or tracking/payment claims were copied. Temply's Vietnamese product promise, $12 price, product naming and preview checkout boundary remain the source of truth.

## Current visual system

- **Typography:** locally bundled IBM Plex Sans for the large display system, UI and body copy, with IBM Plex Serif used as a restrained italic editorial accent.
- **Palette:** warm off-white canvas, near-black ink, coral product accent, acid highlight, muted grey editorial text and a dark feature/CTA band.
- **Layout:** full-viewport hero with layered product imagery; A Few Words statement; staggered four-item bundle gallery; pauseable marquee; dark interactive benefits rows; keyboard-operable flow tabs; honest proof/notes; FAQ; closing conversion section and typographic footer.
- **Motion:** hero image cursor trail on fine pointers, reveal-on-scroll, hover image scale, menu transition, marquee, accordion easing and smooth anchor scrolling. The cursor trail and marquee are disabled for touch/reduced-motion contexts, and the `data-motion="reduced"` runtime state makes reveal content immediately visible.
- **Assets:** existing Temply product image plus three original locally stored editorial product still lifes generated for this page. Runtime imports use WebP derivatives; PNG sources remain in `src/assets/generated/` for future editing.

## Required screenshot evidence

Captured after the final local production build:

- `qa/desktop-1440.png` — 1440 × 900 CSS px.
- `qa/tablet-768.png` — 768 × 1024 CSS px.
- `qa/mobile-390.png` — 390 × 844 CSS px.

These images prove the local rendered layout only. They do not prove domain routing, checkout processing, email delivery or search indexing.

## Interaction and accessibility checks

- `lang="vi"`, skip link, semantic `header`/`main`/`footer`, one H1 and ordered headings are present.
- Header menu opens an accessible full-screen `dialog`, traps Tab focus, closes on Escape, closes on navigation, locks body scroll and returns focus to the trigger.
- Theme switch persists `light`/`dark` in local storage and updates the document theme color.
- Feature rows use buttons with `aria-pressed`; the preview region updates from the selected row.
- How-it-works controls use the tab pattern, roving `tabIndex`, `aria-selected`, `aria-controls` and Arrow-key navigation with focus transfer.
- FAQ buttons expose `aria-expanded` and `aria-controls`; one answer is open at a time.
- Primary CTA scrolls to `#checkout`. Without a valid checkout URL, the CTA announces that no payment/order/email action occurs. With `VITE_CHECKOUT_URL`, it becomes a real external link.
- Real product imagery has descriptive Vietnamese alt text; decorative preview layers and cursor-trail images are empty-alt/hidden from assistive technology.
- Local Playwright checks reported zero console errors and zero horizontal overflow at 390 and 1440 widths.

## Verification record

Run from `temply-digital-bundle/`:

```bash
npm install
npm run build
npm run test:sites
```

The final build must contain:

- `dist/client/index.html`
- `dist/server/index.js`
- `dist/.openai/hosting.json`

Fresh browser checks covered 1440 × 900, 768 × 1024 and 390 × 844 viewports, menu/focus behavior, theme switching, FAQ disclosure, benefit selection, marquee pause, preview CTA messaging, responsive overflow and browser console output.

## Live verification

Deploy ID `20260826-024920` is live at [https://daisylexi.com/](https://daisylexi.com/). Fresh public browser/curl verification confirmed the new title, canonical, generated assets, route fallback, mobile/desktop render, zero horizontal overflow and zero console errors. The local screenshots above remain the source of visual QA evidence; public verification is recorded in the deployment handoff.

## Open items

- Supply a real checkout URL and delivery workflow before changing the CTA out of preview state.
- Confirm final licensed product-gallery assets, refund/legal copy, contact email and analytics requirements.
