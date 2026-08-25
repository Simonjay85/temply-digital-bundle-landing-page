import { useEffect, useState } from "react";

export function SiteHeader({ activeSection, menuOpen, onMenuOpen, triggerRef }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <a className="site-header__brand" href="#home" aria-label="Temply Studio — Trang chủ">
        <span className="site-header__mark" aria-hidden="true">T</span>
        <span>Temply Studio</span>
      </a>
      <p className="site-header__context">Study Success Bundle / $12</p>
      <button
        ref={triggerRef}
        className="menu-trigger"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-menu"
        aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
        onClick={onMenuOpen}
      >
        <span className="menu-trigger__label">Menu</span>
        <span className="menu-trigger__icon" aria-hidden="true">
          <span />
          <span />
        </span>
      </button>
      <span className="site-header__current" aria-live="polite">
        {activeSection === "home" ? "01" : activeSection === "bundle" ? "02" : activeSection === "benefits" ? "03" : activeSection === "how" ? "04" : activeSection === "faq" ? "05" : activeSection === "checkout" ? "06" : ""}
      </span>
    </header>
  );
}
