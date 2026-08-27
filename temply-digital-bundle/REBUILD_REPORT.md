# Rebuild Report — Temply Studio Study Success Bundle

Ngày: 2026-08-26  
Branch: `feat/azurio-inspired-rebuild`  
Starting commit: `20183753f7fe9acfe111efa970ab27230cf6fb7b`

## Tóm tắt

Đã thay thế landing page prototype cũ bằng một trang React + Vite componentized, data-driven cho Temply Studio Study Success Bundle. Visual direction được kiểm tra với Azurio Creative Agency reference và tái tạo ở cấp độ layout/motion grammar: hero toàn màn hình, typography oversized, full-screen menu, numbered long-form sections, staggered gallery, marquee, dark feature band, interactive rows, proof/notes, FAQ, closing CTA và footer. Không copy Azurio code, branding, assets, fonts hay proprietary content.

Product identity và boundary trung thực được giữ nguyên: Temply Studio, Study Success Bundle, tiếng Việt, giá `$12`, không fabricated testimonials/ratings/counts và checkout vẫn preview khi chưa có `VITE_CHECKOUT_URL`.

## Thay đổi chính

- Rebuilt `src/App.jsx` với theme persistence, reduced-motion state, reveal observer, active-section state và menu orchestration.
- Reworked `SiteHeader`/`MenuOverlay` thành header editorial sticky + full-screen accessible dialog; có Light/Night toggle, Escape, focus trap và focus return.
- Rebuilt hero với display typography, layered product still lifes, original cursor trail trên fine pointers và mobile-safe fallback.
- Rebuilt statement, bundle gallery, product marquee, interactive benefits, keyboard tabs flow, honest proof/editorial notes, FAQ, preview-aware conversion CTA và footer.
- Centralized content in `src/data/siteContent.js`, including showcase items, benefit tags, notes, FAQs and runtime config.
- Replaced old warm split-layout CSS with tokenized editorial system in `src/styles/tokens.css`, `globals.css`, `layout.css`, `components.css`.
- Added WebP runtime derivatives for three original editorial still lifes under `src/assets/generated/`; retained PNG sources for future editing.
- Updated `design-qa.md`, `README.md` and this report; deployment-critical Sites files remain intact.

## Generated assets

The page uses three original product still lifes generated for Temply and stored locally:

- `src/assets/generated/temply-study-system-wide.webp` — overhead study system with planner, goal map and notebooks.
- `src/assets/generated/temply-goal-map-still-life.webp` — goal map / tracker still life.
- `src/assets/generated/temply-academic-stack.webp` — academic planner and CV-oriented stack.

PNG source files remain alongside the WebP derivatives. The existing optimized Temply hero image remains the primary product evidence and is loaded with responsive picture sources.

## Build and tests

Executed from `temply-digital-bundle/`:

```bash
VITE_SITE_URL=https://daisylexi.com npm run build
npm run test:sites
```

Expected/verified Sites outputs:

- `dist/client/index.html`
- `dist/server/index.js`
- `dist/.openai/hosting.json`

The focused Sites suite passed all 4 tests: static asset handling, HTML fallback, API/write fallback guard and required build outputs.

## Browser QA

Local production preview was inspected at:

- 1440 × 900 desktop;
- 1024 × 768 and 768 × 1024 responsive checks;
- 390 × 844 mobile.

Verified interactions:

- menu opens, locks body scroll, traps focus, closes with Escape and returns focus to the trigger;
- theme toggle switches document theme and persists the preference;
- feature row selection updates its preview;
- how-it-works tabs use Arrow-key navigation and focus transfer;
- FAQ uses one-open-item disclosure with `aria-expanded`/`aria-controls`;
- marquee pause control works;
- preview CTA explains that it does not record payment, create an order or send a download email;
- no horizontal overflow and no browser console errors in the focused Playwright run.

Fresh evidence files:

- `qa/desktop-1440.png`
- `qa/tablet-768.png`
- `qa/mobile-390.png`

## Deployment verification

The build was deployed to the existing VPS static-server runtime under deploy ID `20260826-024920`. The service is `active`, the remote `dist/client/index.html` hash matches the local build, and fresh public checks passed for:

- `https://daisylexi.com/` HTTP 200 and the new Temply title;
- `www` to canonical redirect;
- hashed JS/CSS and generated WebP assets;
- extensionless frontend fallback route;
- `robots.txt` and `sitemap.xml`;
- live desktop/mobile browser render, zero horizontal overflow and zero console errors.

A valid checkout URL, delivery workflow, contact email, legal/refund copy, analytics identifier and final licensed product assets remain business inputs; none are fabricated or stored in source.
