# Rebuild Report — Temply Studio Study Success Bundle

Ngày: 2026-08-26  
Branch: `feat/azurio-inspired-rebuild`  
Starting commit: `1a073a91b2c34b914ea0c8c000137191f44d5612`

## Tóm tắt

Đã thay thế landing page prototype cũ bằng một trang React + Vite componentized, data-driven cho Temply Studio Study Success Bundle. Visual direction sử dụng editorial hierarchy, split hero, numbered navigation, long-form rhythm, dark feature band, interactive rows và closing CTA theo tinh thần của Azurio creative-agency reference, nhưng toàn bộ product copy, palette, logo mark, local assets và interaction behavior được xây mới cho Temply.

## Đã triển khai

- Hero bất đối xứng với H1 tiếng Việt, product stage, responsive picture sources và CTA anchor.
- Full-screen accessible menu với focus trap, Escape close, restore focus và active section state.
- Intro statement, 4-card bundle showcase, pauseable product marquee, interactive benefits rows.
- Keyboard-operable how-it-works tabs với roving focus và Arrow-key navigation.
- Proof section dùng claims có thể kiểm tra từ nội dung sản phẩm; không thêm review/rating/count giả.
- FAQ accordion có `aria-expanded`, `aria-controls`, stable IDs và trạng thái mở một mục.
- Checkout CTA có hai trạng thái rõ ràng: configured external checkout link hoặc preview không ghi nhận payment/order/email.
- Footer navigation, optional contact email, skip link, reduced-motion handling và responsive CSS.
- SEO metadata, canonical, Open Graph/Twitter tags và Product JSON-LD; availability chỉ xuất hiện khi checkout URL được cấu hình.
- Favicon, app icon, robots base file và conditional sitemap generation.

## Assets

- Giữ source image `src/assets/temply-study-bundle-hero.png` từ baseline vì đây là product visual evidence hiện có.
- Tạo các derivative tối ưu bằng `cwebp`/ImageMagick:
  - `src/assets/optimized/temply-study-bundle-hero-640.webp`
  - `src/assets/optimized/temply-study-bundle-hero-960.webp`
  - `src/assets/optimized/temply-study-bundle-hero-1280.webp`
  - `src/assets/optimized/temply-study-bundle-hero-1280.jpg`
- Không gọi image generation cho rebuild này; việc dùng product image có sẵn giữ cho visual không vượt quá bằng chứng sản phẩm thực tế.
- Screenshot/implementation artifacts cũ được chuyển vào `archive/pre-azurio/` để tránh nhầm với QA evidence hiện tại.

## Sites packaging

`worker/index.js`, `.openai/hosting.json` và `tests/sites-worker.test.mjs` giữ nguyên behavior hiện có. `scripts/prepare-sites-build.mjs` vẫn copy worker/hosting outputs và bổ sung sitemap/robots line chỉ khi `VITE_SITE_URL` hợp lệ.

Expected outputs:

```text
dist/client/index.html
dist/server/index.js
dist/.openai/hosting.json
```

## Verification

- `npm install` — completed.
- `npm run build` — passed; expected client/server/Sites artifacts created.
- `npm run test:sites` — passed 4/4 in the focused worker/static packaging suite.
- Local production preview — used for browser QA rather than relying on an unverified public deployment.
- Required screenshots — `qa/desktop-1440.png`, `qa/tablet-768.png`, `qa/mobile-390.png`.
- Browser checks — menu dialog/focus restoration, FAQ disclosure, preview CTA message, feature selection, how-it-works tab selection, nested frontend fallback, console errors, responsive overflow and reduced-motion state.

## Remaining external inputs

The repository does not prove a public deployment, live payment processing, webhook/order creation, download-email delivery, domain/DNS, legal/refund policy, or search indexing. Before production handoff, the partner must provide and verify the real checkout URL, delivery workflow, contact/legal content, public site URL, and final licensed product assets.
