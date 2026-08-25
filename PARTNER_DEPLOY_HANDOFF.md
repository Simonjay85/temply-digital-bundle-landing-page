# Partner Deploy Handoff

Ngày bàn giao: 2026-08-15

## 1. Project

- Tên app: `temply-digital-bundle`
- Thư mục app: `temply-digital-bundle/`
- Loại project: React + Vite frontend, đã có cấu hình đóng gói cho OpenAI Sites
- Domain dự kiến: `daisylexi.com` (việc nối domain/DNS hoặc quản trị Shopify là bước riêng, không nằm trong repo này)

## 2. Tình trạng đã kiểm tra

- `npm run build`: đã tạo thành công các file Sites cần thiết:
  - `dist/client/index.html`
  - `dist/server/index.js`
  - `dist/.openai/hosting.json`
- `npm run test:sites`: `4 passed, 0 failed`
- `temply-digital-bundle/.openai/hosting.json` hiện không khai báo binding `d1` hoặc `r2`.
- Form checkout hiện là demo frontend; chưa xử lý thanh toán thật và chưa gửi email thật.

## 3. Cách chạy lại trên máy partner

Từ thư mục `temply-digital-bundle/`:

```bash
npm install
npm run build
npm run test:sites
```

Sau build, dùng đúng thư mục `temply-digital-bundle/` làm source cho quy trình OpenAI Sites của tài khoản partner.

## 4. Credential và đăng nhập

Không ghi username, password, API key, cookie, token hoặc private key vào file Markdown này.

Repo đã được kiểm tra và không có file `.env`, thông tin đăng nhập, hay cấu hình FTP/SSH/Shopify để trích xuất. Partner cần đăng nhập bằng tài khoản của họ trong password manager hoặc dùng cơ chế mời cộng tác viên của nền tảng quản trị domain/hosting.

Nếu cần gắn `daisylexi.com` sau khi app được deploy, partner cần xác định đúng nơi domain đang được quản lý rồi thực hiện riêng:

1. Đăng nhập nền tảng hosting/Sites bằng tài khoản được cấp quyền.
2. Deploy project `temply-digital-bundle/`.
3. Thêm domain trong nền tảng hosting theo hướng dẫn của nền tảng.
4. Cập nhật DNS tại nhà cung cấp domain nếu nền tảng yêu cầu.
5. Kiểm tra HTTPS và mở trang public bằng cửa sổ ẩn danh.

Không gửi password qua Git, Slack, email thường hoặc file `.md`. Nếu bắt buộc phải chuyển quyền truy cập, tạo tài khoản/collaborator riêng cho partner và thu hồi quyền sau khi deploy xong.

## 5. Lưu ý khi nghiệm thu

- Build/test xanh chỉ chứng minh source đóng gói đúng; chưa chứng minh domain public đã trỏ đúng.
- Sau deploy cần đọc lại URL public, kiểm tra asset, các route frontend và responsive mobile.
- Form hiện hiển thị thông báo demo; cần tích hợp payment/email backend riêng trước khi coi là checkout production.
