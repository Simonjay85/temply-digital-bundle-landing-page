import { ArrowUpIcon } from "./Icons.jsx";
import { contactHref, runtimeConfig, siteContent } from "../data/siteContent.js";

export function SiteFooter({ prefersReducedMotion = false }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="content-width site-footer__top">
        <div>
          <h2>Temply Studio</h2>
          <p>Digital templates cho những cách học có chủ đích hơn.</p>
        </div>
        <button className="back-to-top" type="button" onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })}>
          <span>Về đầu trang</span>
          <ArrowUpIcon size={17} />
        </button>
      </div>
      <div className="content-width site-footer__directory">
        <nav aria-label="Điều hướng cuối trang">
          {siteContent.footerLinks.map((link) => <a href={`#${link.id}`} key={link.id}>{link.label}</a>)}
        </nav>
        <div className="site-footer__contact">
          {contactHref ? <a href={contactHref}>{runtimeConfig.contactEmail}</a> : <span>Email liên hệ chưa cấu hình</span>}
          <span>© {year} {siteContent.brand}</span>
        </div>
      </div>
    </footer>
  );
}
