import { useState } from "react";
import { ArrowUpRightIcon } from "./Icons.jsx";
import { ProductPicture } from "./ProductMedia.jsx";
import { contactHref, runtimeConfig, siteContent } from "../data/siteContent.js";

export function ConversionCta() {
  const [message, setMessage] = useState("");
  const { product } = siteContent;
  const hasCheckout = Boolean(runtimeConfig.checkoutUrl);

  return (
    <section className="conversion-section section-anchor" id="checkout" aria-labelledby="checkout-title">
      <div className="content-width conversion-section__inner">
        <div className="conversion-section__copy">
          <p className="conversion-section__status" data-state={hasCheckout ? "ready" : "preview"}>
            {hasCheckout ? "Checkout link đã sẵn sàng" : "Bản preview · checkout chưa kết nối"}
          </p>
          <h2 id="checkout-title">Sẵn sàng học nhẹ đầu hơn?</h2>
          <p>{product.description}</p>
          <div className="conversion-section__price">
            <span>{product.name}</span>
            <strong>{product.priceLabel}</strong>
          </div>
          {hasCheckout ? (
            <a className="button button--primary button--light" href={runtimeConfig.checkoutUrl} target="_blank" rel="noreferrer">
              <span>Nhận bundle</span>
              <ArrowUpRightIcon size={17} />
            </a>
          ) : (
            <button
              className="button button--primary button--light"
              type="button"
              onClick={() => setMessage("Bản preview này chưa ghi nhận thanh toán, chưa tạo đơn hàng và chưa gửi email tải xuống.")}
            >
              <span>Nhận bundle</span>
              <span>{product.priceLabel}</span>
            </button>
          )}
          <p className="conversion-section__message" aria-live="polite">{message}</p>
          {contactHref ? (
            <a className="conversion-section__contact" href={contactHref}>
              Gửi email để nhận link mua hàng <ArrowUpRightIcon size={15} />
            </a>
          ) : (
            <p className="conversion-section__contact conversion-section__contact--muted">Email liên hệ sẽ hiển thị khi được cấu hình.</p>
          )}
        </div>
        <div className="conversion-section__media">
          <ProductPicture
            alt="Ảnh xem trước Study Success Bundle"
            sizes="(max-width: 760px) 88vw, 37vw"
          />
          <span className="conversion-section__media-note">Digital product / 2026</span>
        </div>
      </div>
      <p className="content-width conversion-section__fineprint">Đây là sản phẩm số. Không có sản phẩm vật lý được gửi đi. Giá hiển thị là giá của bundle trước khi checkout áp dụng điều kiện riêng.</p>
    </section>
  );
}
