import { useGsapContext } from "../motion/useGsapContext.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { ArrowUpRightIcon } from "./Icons.jsx";
import { contactHref, runtimeConfig, siteContent } from "../data/siteContent.js";

const ecosystemLinks = [
  { number: "01", label: "Bên trong bundle", id: "bundle" },
  { number: "02", label: "Những cách dùng", id: "benefits" },
  { number: "03", label: "Điều Temply tin", id: "principles" },
  { number: "04", label: "Ghi chú học tập", id: "editorial" },
  { number: "05", label: "Nhận bundle", id: "checkout" },
];

export function SiteFooter() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const currentYear = new Date().getFullYear();
  const footerRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".footer__group, .footer__ecosystem-link, .footer__back-to-top",
      { autoAlpha: 0, y: 34 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: footerRef.current, start: "top 82%" },
      },
    );
  }, [prefersReducedMotion]);

  return (
    <footer className="site-footer section-anchor" id="footer" ref={footerRef}>
      <div className="content-width footer__grid">
        <div className="footer__group footer__discover">
          <span className="footer__label">/ Khám phá</span>
          <nav aria-label="Điều hướng chân trang">
            {siteContent.footerLinks.map((link) => (
              <a className="footer__link" href={`#${link.id}`} key={link.id}>
                <span>{link.label}</span>
                <ArrowUpRightIcon size={15} />
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__stack">
          <div className="footer__group">
            <span className="footer__label">/ Liên hệ</span>
            {contactHref ? (
              <a className="footer__contact" href={contactHref}>{runtimeConfig.contactEmail}<ArrowUpRightIcon size={15} /></a>
            ) : (
              <p className="footer__contact footer__contact--pending">Email sẽ hiển thị khi được cấu hình.</p>
            )}
          </div>

          <div className="footer__group">
            <span className="footer__label">/ Thông tin</span>
            <a className="footer__info-link" href="#checkout">{siteContent.product.name}<ArrowUpRightIcon size={15} /></a>
            <a className="footer__info-link" href="#editorial">Ghi chú học tập<ArrowUpRightIcon size={15} /></a>
          </div>
        </div>

        <div className="footer__group footer__ecosystem">
          <span className="footer__label">/ Hệ nội dung</span>
          <div className="footer__ecosystem-list">
            {ecosystemLinks.map((link) => (
              <a className="footer__ecosystem-link" href={`#${link.id}`} key={link.id}>
                <span className="footer__ecosystem-number">[{link.number}]</span>
                <span>{link.label}</span>
                <ArrowUpRightIcon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="content-width footer__brand-signoff" aria-label="Thương hiệu Temply Studio">
        <p>Temply Studio</p>
      </div>

      <div className="content-width footer__back-to-top">
        <a href="#home">Về đầu trang <ArrowUpRightIcon size={17} /></a>
      </div>

      <div className="content-width footer__legal">
        <span>{siteContent.footer.copyright}</span>
        <span>© {currentYear}</span>
        <span>{runtimeConfig.siteUrl || "Local preview"}</span>
      </div>
    </footer>
  );
}
