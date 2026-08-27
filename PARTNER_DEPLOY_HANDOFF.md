# Partner Deploy Handoff

Ngày triển khai: 2026-08-26
Project: `temply-digital-bundle`
Branch: `feat/azurio-inspired-rebuild`
Starting commit: `20183753f7fe9acfe111efa970ab27230cf6fb7b`

## 1. Tình trạng hiện tại

Bản landing page editorial rebuild đã được build và đưa live lên VPS host alias `templystudio` tại service `daisyflow.service`.

- App directory: `/opt/daisyflow`
- Static root: `/opt/daisyflow/dist/client`
- Local origin: `127.0.0.1:3210`
- Public domain: [https://daisylexi.com/](https://daisylexi.com/)
- `https://www.daisylexi.com/` redirect 301 về canonical domain.
- Service state sau deploy: `active`
- Runtime command: `node deploy/static-server.mjs`
- Nginx proxy: `127.0.0.1:3210`

## 2. Deploy record

Deploy ID: `20260826-024920`

Trước khi activate, bản cũ được copy vào:

```text
/home/ubuntu/daisylexi-deploy-20260826-024920/previous-client
/home/ubuntu/daisylexi-deploy-20260826-024920/previous-client-runtime
/home/ubuntu/daisylexi-deploy-20260826-024920/package.json
```

Stage directory được rsync trước khi đổi runtime:

```text
/home/ubuntu/daisylexi-stage-20260826-024920
```

Sau khi read-back stage hash trùng local build, stage được move vào `/opt/daisyflow/dist/client` và service được restart. Backup là bản copy recoverable; chưa có file nào bị xoá.

## 3. Build/test trước deploy

Chạy từ `temply-digital-bundle/`:

```bash
VITE_SITE_URL=https://daisylexi.com npm run build
npm run test:sites
```

Đã pass:

- `npm run build`
- `npm run test:sites` — 4/4 tests
- `dist/client/index.html`
- `dist/server/index.js`
- `dist/.openai/hosting.json`

Local browser QA screenshots:

- `qa/desktop-1440.png` — 1440 × 900
- `qa/tablet-768.png` — 768 × 1024
- `qa/mobile-390.png` — 390 × 844

## 4. Public verification sau deploy

Fresh cache-busting requests đã xác nhận:

- `https://daisylexi.com/?fresh=20260826024920` trả HTTP 200, HTTPS, `Cache-Control: no-cache`, title `Study Success Bundle — Temply Studio`.
- `/assets/index-CBfzPLph.js` trả HTTP 200 và `/assets/temply-study-system-wide-Dq1FyUc9.webp` trả HTTP 200 `image/webp`.
- `/flow/step-two?source=qa-20260826` fallback về app shell và vẫn có title mới.
- `/robots.txt` có `Sitemap: https://daisylexi.com/sitemap.xml`.
- `/sitemap.xml` có canonical `https://daisylexi.com/`.
- Fresh in-app browser trên public domain: title mới, 9 sections, 15 images, zero horizontal overflow, canonical đúng, không có text `Azurio Template`.
- Live menu: dialog mở, body scroll khóa, focus vào nút Đóng, 7 links; đóng xong focus trở lại nút Menu.

Các checks trên chứng minh public origin đang phục vụ bản rebuild. Chúng không chứng minh checkout/payment, email delivery, analytics hoặc search indexing.

## 5. Runtime configuration và boundary

Current public build không có `VITE_CHECKOUT_URL` và `VITE_CONTACT_EMAIL`:

- CTA đang hiển thị `Bản preview · checkout chưa kết nối`.
- Nhấn CTA chỉ hiện thông báo không ghi nhận payment/order và không gửi email tải xuống.
- Không có secret, token, password, cookie, webhook secret hoặc private key nào được ghi vào source/handoff.

Để bật checkout, cần cấu hình URL thật qua secret/config manager rồi rebuild/deploy; không hardcode vào Markdown hoặc Git.

## 6. Rollback an toàn

Nếu cần rollback bản deploy này, giữ service dừng trong lúc swap directory và dùng bản copy:

```bash
sudo systemctl stop daisyflow.service
sudo mv /opt/daisyflow/dist/client /home/ubuntu/daisylexi-deploy-20260826-024920/failed-client
sudo cp -a /home/ubuntu/daisylexi-deploy-20260826-024920/previous-client /opt/daisyflow/dist/client
sudo systemctl start daisyflow.service
```

Chỉ chạy rollback khi đã xác định đúng target và có người chịu trách nhiệm xác nhận. Các backup paths ở trên không chứa credentials.
