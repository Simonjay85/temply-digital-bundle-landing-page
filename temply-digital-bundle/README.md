# Temply Studio — Study Success Bundle

Landing page React + Vite cho Study Success Bundle của Temply Studio. Trang dùng editorial composition lấy cảm hứng từ nhịp của Azurio Creative Agency nhưng giữ palette, copy, product evidence, assets và interaction system riêng cho Temply.

## Chạy local

```bash
npm install
npm run dev
```

Để kiểm tra bản production đã build:

```bash
npm run build
npm run preview -- --host 0.0.0.0
```

## Scripts

- `npm run dev` — Vite development server.
- `npm run build` — build client và chuẩn bị Sites artifacts.
- `npm run preview` — serve `dist/client/` locally.
- `npm run test:sites` — kiểm tra static assets, frontend fallback và các file Sites bắt buộc.

Build phải tạo được:

```text
dist/client/index.html
dist/server/index.js
dist/.openai/hosting.json
```

## Nội dung và cấu trúc

- `src/data/siteContent.js` — brand, sản phẩm, navigation, sections, FAQs, editorial notes và runtime config.
- `src/components/` — header/menu, hero, showcase, marquee, feature rows, flow tabs, proof, FAQ, CTA và footer.
- `src/styles/` — visual tokens, global rules, layout và component styling.
- `src/assets/optimized/` — responsive WebP/JPEG derivatives của product image hiện có.
- `src/assets/generated/` — original editorial still lifes; runtime dùng WebP, PNG source được giữ để chỉnh sửa lại khi cần.
- `public/` — favicon, app icon và robots base file.
- `archive/pre-azurio/` — screenshot/implementation artifacts cũ, không được import vào runtime.
- `qa/` — screenshot QA cho desktop, tablet và mobile.

## Runtime configuration

Tạo `.env.local` hoặc cấu hình env ở nền tảng deploy; không commit secret:

```text
VITE_CHECKOUT_URL=https://checkout.example.com/your-product
VITE_SITE_URL=https://your-public-domain.example
VITE_CONTACT_EMAIL=hello@example.com
```

Nếu không có `VITE_CHECKOUT_URL`, CTA hiển thị trạng thái preview và không thực hiện payment, order creation hoặc email delivery. Chỉ URL `http`/`https` hợp lệ mới được dùng.

`VITE_SITE_URL` được dùng cho canonical, Open Graph URL/image, Product JSON-LD, sitemap và dòng `Sitemap` trong `robots.txt`. Khi thiếu, page vẫn chạy nhưng không tuyên bố public canonical/indexing readiness.

`VITE_CONTACT_EMAIL` chỉ hiển thị link email khi giá trị có định dạng email hợp lệ.

## Sites packaging

Không sửa hoặc xoá `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs` hay `tests/sites-worker.test.mjs` nếu không có yêu cầu riêng. Worker giữ frontend fallback cho route HTML nhưng không biến API/write request thành app shell.

## Deployment verification

Sau khi deploy, kiểm tra tách biệt:

1. origin/service trả đúng build hash và title mới;
2. public HTTPS domain trả đúng HTML mới với cache-busting request;
3. asset, menu, anchor, FAQ, theme và responsive browser render;
4. checkout/provider read-back chỉ khi đã cấu hình URL thật.

Build xanh không tự chứng minh domain, checkout, email delivery, DNS/SSL hoặc search indexing.

## Content boundary

Trang không chứa fabricated testimonials, ratings, customer counts, revenue claims, provider guarantees hoặc Azurio proprietary content. `$12` là giá hiển thị của sản phẩm; điều kiện thuế/refund/delivery của provider cần được xác nhận riêng.
