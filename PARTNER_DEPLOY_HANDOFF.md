# Partner Deploy Handoff

Ngày bàn giao: 2026-08-26

## 1. Project

- Tên app: `temply-digital-bundle`
- Thư mục app: `temply-digital-bundle/`
- Loại project: React + Vite frontend, có cấu hình đóng gói cho OpenAI Sites
- Branch triển khai hiện tại: `feat/azurio-inspired-rebuild`
- Domain public: chưa được cấu hình hoặc xác minh trong repository này

## 2. Tình trạng đã kiểm tra cục bộ

- `npm install`: hoàn tất.
- `npm run build`: tạo thành công:
  - `dist/client/index.html`
  - `dist/server/index.js`
  - `dist/.openai/hosting.json`
- `npm run test:sites`: test worker/static fallback đã pass.
- `.openai/hosting.json` hiện không khai báo binding `d1` hoặc `r2`.
- Local production preview đã được dùng cho browser QA ở desktop, tablet và mobile.
- Các screenshot QA nằm trong `temply-digital-bundle/qa/`.

Build/test xanh chỉ chứng minh source và Sites packaging hoạt động cục bộ. Nó không chứng minh app đã deploy, domain đã trỏ, checkout đã nhận tiền, email đã gửi file, hoặc trang đã được index.

## 3. Runtime configuration

Các biến môi trường hợp lệ:

```text
VITE_CHECKOUT_URL=https://checkout.example.com/your-product
VITE_SITE_URL=https://your-public-domain.example
VITE_CONTACT_EMAIL=hello@example.com
```

- `VITE_CHECKOUT_URL`: khi có URL `http`/`https` hợp lệ, CTA chuyển thành link checkout mở tab mới. Khi thiếu, trang giữ trạng thái `Bản preview · checkout chưa kết nối` và không ghi nhận thanh toán.
- `VITE_SITE_URL`: dùng cho canonical, Open Graph URL/image, Product JSON-LD, sitemap và dòng `Sitemap` trong `robots.txt`. Không nên đặt domain giả khi chưa sở hữu hoặc chưa xác minh domain đó.
- `VITE_CONTACT_EMAIL`: chỉ hiển thị link email khi giá trị có định dạng email hợp lệ.

Không commit giá trị production, token, API key, cookie, password, webhook secret hoặc private key vào repository.

## 4. Cách build và kiểm tra

Từ thư mục `temply-digital-bundle/`:

```bash
npm install
npm run build
npm run test:sites
```

Để kiểm tra preview cục bộ sau build:

```bash
npm run preview -- --host 0.0.0.0
```

Sau build, dùng đúng thư mục `temply-digital-bundle/` làm source cho quy trình OpenAI Sites của tài khoản partner. Không upload `node_modules/`, `.playwright-cli/`, hoặc các screenshot archive nếu quy trình chỉ cần source/build output.

## 5. Credential và deploy

Không có credential, tài khoản thanh toán, domain, DNS, FTP/SSH, Shopify config hoặc provider secret nào được lưu hay trích xuất từ repo này. Partner cần đăng nhập bằng tài khoản của họ trong password manager hoặc cơ chế mời cộng tác viên của nền tảng quản trị.

Quy trình bàn giao an toàn:

1. Xác nhận checkout URL, phương thức giao file, refund/legal copy và contact email với chủ sản phẩm.
2. Thiết lập các biến môi trường bằng secret/config manager của nền tảng, không ghi vào Markdown hoặc Git.
3. Chạy `npm run build` và `npm run test:sites` trong môi trường partner.
4. Deploy project `temply-digital-bundle/` qua OpenAI Sites.
5. Mở URL public bằng fresh browser session; kiểm tra HTTPS, asset, hash route fallback, responsive layout, menu, FAQ và CTA.
6. Chỉ sau khi provider read-back xác nhận, đổi trạng thái từ preview sang checkout sẵn sàng.

## 6. Acceptance boundaries

- `VITE_CHECKOUT_URL` không đồng nghĩa với payment/webhook/delivery đã được chứng minh; cần thử nghiệm provider thật ở môi trường được ủy quyền.
- Giá `$12` là nội dung sản phẩm hiển thị trong page; điều kiện/thuế/refund của provider cần được xác nhận riêng.
- Product image và CSS previews là visual evidence cho landing page, không phải bằng chứng về toàn bộ file bundle hoặc quyền sử dụng thương mại.
- Sitemap/canonical là readiness kỹ thuật; không phải bằng chứng Google đã crawl hoặc index.
- Không gửi password qua Git, Slack, email thường hoặc file `.md`. Dùng quyền collaborator riêng và thu hồi sau khi hoàn tất.
