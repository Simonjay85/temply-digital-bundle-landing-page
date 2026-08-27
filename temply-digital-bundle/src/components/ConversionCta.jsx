import { useState } from "react";
import { ArrowUpRightIcon } from "./Icons.jsx";
import { EditorialArt } from "./EditorialArt.jsx";
import { contactHref, runtimeConfig, siteContent } from "../data/siteContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useGsapContext } from "../motion/useGsapContext.js";

export function ConversionCta() {
  const [message, setMessage] = useState("");
  const prefersReducedMotion = usePrefersReducedMotion();
  const { product } = siteContent;
  const ctaRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".cta__eyebrow, .cta__headline, .cta__details, .cta__art",
      { autoAlpha: 0, y: 46 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: ctaRef.current, start: "top 76%" },
      },
    );
    motion.to(".cta__art", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: ctaRef.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  }, [prefersReducedMotion]);

  const action = runtimeConfig.checkoutUrl ? (
    <a className="cta__action" id="cta-action" href={runtimeConfig.checkoutUrl} target="_blank" rel="noreferrer">
      <span>Nhận bundle</span>
      <strong>{product.priceLabel}</strong>
      <ArrowUpRightIcon size={18} />
    </a>
  ) : (
    <button className="cta__action" id="cta-action" type="button" onClick={() => setMessage("Bản preview này chưa ghi nhận thanh toán, chưa tạo đơn hàng và chưa gửi email tải xuống.")}>
      <span>Nhận bundle</span>
      <strong>{product.priceLabel}</strong>
      <ArrowUpRightIcon size={18} />
    </button>
  );

  return (
    <section className="cta section-anchor" id="checkout" aria-labelledby="checkout-title" ref={ctaRef}>
      <div className="content-width cta__topline">
        <span className="section-index section-index--light">08 / CLOSING CTA</span>
        <span>{runtimeConfig.checkoutUrl ? "Checkout link configured" : "Preview state · checkout chưa kết nối"}</span>
      </div>

      <div className="cta__center content-width">
        <span className="cta__eyebrow">Study Success Bundle / $12</span>
        <h2 id="checkout-title" className="cta__headline">
          <span>Sẵn sàng</span>
          <span><em>học nhẹ đầu hơn?</em></span>
        </h2>
        <div className="cta__details">
          <p>{product.description}</p>
          {action}
          <p className="cta__message" aria-live="polite">{message}</p>
          {contactHref ? (
            <a className="cta__contact" href={contactHref}>Gửi email để nhận link mua hàng <ArrowUpRightIcon size={14} /></a>
          ) : (
            <span className="cta__contact cta__contact--muted">Email liên hệ sẽ hiển thị khi được cấu hình.</span>
          )}
        </div>
        <div className="cta__art" aria-hidden="true">
          <EditorialArt variant="overview" alt="" loading="lazy" sizes="(max-width: 760px) 74vw, 22vw" caption="Temply / study success" />
        </div>
      </div>

      <p className="content-width cta__fineprint">Đây là sản phẩm số. Không có sản phẩm vật lý được gửi đi. Giá hiển thị là giá của bundle trước khi checkout áp dụng điều kiện riêng.</p>
    </section>
  );
}
