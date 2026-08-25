# Temply Studio — Study Success Bundle

Landing page React + Vite cho Study Success Bundle của Temply Studio. Trang dùng layout editorial lấy cảm hứng từ Azurio nhưng có palette, copy, sản phẩm, assets và interaction system riêng cho Temply.

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

- `src/data/siteContent.js` — brand, sản phẩm, navigation, sections, FAQs và runtime config.
- `src/components/` — header/menu, hero, showcase, feature rows, tabs, FAQ, CTA và footer.
- `src/styles/` — tokens, global rules, layout và component styling.
- `src/assets/temply-study-bundle-hero.png` — source product image có sẵn từ baseline.
- `src/assets/optimized/` — WebP responsive derivatives và JPEG fallback được dùng trong runtime.
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

Nếu không có `VITE_CHECKOUT_URL`, CTA hiển thị preview state và không thực hiện payment, order creation hoặc email delivery. Chỉ URL `http`/`https` hợp lệ mới được dùng.

`VITE_SITE_URL` chỉ được dùng khi domain đã được xác nhận. Khi có giá trị hợp lệ, build tạo `dist/client/sitemap.xml` và thêm `Sitemap` vào `robots.txt`; nếu thiếu, page vẫn chạy nhưng không tuyên bố public canonical/indexing readiness.

## Visual and content notes

The landing page contains no fabricated testimonials, ratings, customer counts, revenue claims, or provider guarantees. Decorative preview cards use generic labels such as “Tên của bạn” and are marked `aria-hidden`; they are not presented as real customer data.

The current checkout copy intentionally describes the delivery path as provider-dependent until the real checkout and file-delivery workflow are supplied.
