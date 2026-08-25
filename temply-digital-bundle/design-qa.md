# Design QA — Temply Studio Study Success Bundle

## Comparison target

The visual direction was informed by the provided Azurio creative-agency reference: [azuris-nextjs.vercel.app/index-creative-agency](https://azuris-nextjs.vercel.app/index-creative-agency). The implementation uses the reference's editorial traits—large serif statements, numbered navigation, long-form section rhythm, dark feature band, interactive rows, and a decisive closing CTA—while keeping the Temply Studio product, Vietnamese copy, and locally stored product image original.

No source-site images, logos, fonts, copy, testimonials, statistics, or checkout claims were copied. The baseline screenshots from the earlier prototype are retained under `archive/pre-azurio/` for history only and are not treated as the current source of truth.

## Current visual system

- **Typography:** local IBM Plex Serif for display statements and IBM Plex Sans for navigation, metadata, body copy, and controls. No remote font request is required.
- **Palette:** warm off-white canvas, near-black ink, cobalt navigation/feature band, coral product accent, and sage product stage. The palette is intentionally Temply-specific rather than a reproduction of the reference site's branding.
- **Layout:** asymmetrical split hero; product-led responsive mobile opening; numbered long-form sections; four-card bundle showcase; dark interactive benefits rows; keyboard-operable how-it-works tabs; FAQ accordion; dark conversion section and footer.
- **Motion:** image/preview hover movement, menu entry, marquee, accordion easing, and smooth anchor scrolling. `prefers-reduced-motion` and the runtime `data-motion="reduced"` state disable the non-essential movement and transition delays.
- **Assets:** the baseline Temply product image remains at `src/assets/temply-study-bundle-hero.png`; responsive WebP derivatives and a JPEG fallback are in `src/assets/optimized/`. No new AI-generated imagery was introduced for this rebuild because the existing product image is the most truthful visual evidence available.

## Required screenshot evidence

The following screenshots are captured from the local production preview after the final build:

- `qa/desktop-1440.png` — 1440 × 900 CSS px.
- `qa/tablet-768.png` — 768 × 1024 CSS px.
- `qa/mobile-390.png` — 390 × 844 CSS px.

The screenshots are visual QA evidence for the local build. They do not prove public hosting, checkout processing, email delivery, or search indexing.

## Interaction and accessibility checks

- Skip link targets `#main-content`.
- Header menu opens an accessible `dialog`, traps focus, closes on Escape, and restores focus to the trigger.
- Menu links use real section IDs and close the overlay before scrolling.
- Feature rows are keyboard-focusable selections with `aria-pressed`; their preview region updates from the selected row.
- How-it-works controls use the tab pattern with roving `tabIndex`, `aria-selected`, and Arrow-key navigation.
- FAQ questions expose `aria-expanded` and `aria-controls`, with one answer open at a time.
- The primary CTA scrolls to `#checkout` in preview mode. When `VITE_CHECKOUT_URL` is valid, it becomes an external checkout link.
- Preview mode states clearly that it does not record payment, create an order, or send a download email.
- Decorative CSS previews are `aria-hidden`; the real product image has descriptive Vietnamese alt text and responsive `srcset`/`sizes`.
- Document language, title, description, Open Graph/Twitter metadata, canonical URL, and Product JSON-LD are applied. Public canonical/sitemap URLs are only generated when `VITE_SITE_URL` is configured.

## Verification record

Run from `temply-digital-bundle/`:

```bash
npm install
npm run build
npm run test:sites
```

Expected output after the build:

- `dist/client/index.html`
- `dist/server/index.js`
- `dist/.openai/hosting.json`

The final report records the exact command results and the preview-only boundary. A configured checkout URL and public site URL were tested as build-time configuration paths, but no real payment provider, domain, or download delivery is claimed by this repository.

## Open items

- Supply the real checkout URL before enabling the purchase link in production.
- Confirm the delivery mechanism, refund/legal copy, and final licensed product-gallery assets with the product owner.
- Deploy through the partner's OpenAI Sites account and verify the public URL, HTTPS, assets, frontend fallback route, and mobile rendering from a fresh browser session.
