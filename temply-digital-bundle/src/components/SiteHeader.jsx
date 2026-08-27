import { MenuIcon, MoonIcon, SunIcon } from "./Icons.jsx";
import { siteContent } from "../data/siteContent.js";

export function SiteHeader({
  activeSection,
  menuOpen,
  onMenuOpen,
  triggerRef,
  theme,
  onThemeToggle,
}) {
  const activeItem = siteContent.navItems.find((item) => item.id === activeSection) || {
    number: "END",
    label: "Footer",
  };
  const darkSection = activeSection === "benefits" || activeSection === "checkout" || activeSection === "media";

  return (
    <header className={`site-header${darkSection ? " is-dark" : ""}`} data-active-section={activeSection} data-menu-open={menuOpen}>
      <a className="site-header__brand" href="#home" aria-label="Temply Studio — trang chủ">
        <span className="site-header__mark" aria-hidden="true">T</span>
        <span className="site-header__brand-text">
          <strong>Temply</strong>
          <span>Studio</span>
        </span>
      </a>

      <div className="site-header__context" aria-live="polite">
        <span>{activeSection === "footer" ? "END" : `${activeItem.number} / 07`}</span>
        <span>{activeItem.label}</span>
      </div>

      <div className="site-header__actions">
        <a className="site-header__bundle-link" href="#checkout">Nhận bundle <span aria-hidden="true">↗</span></a>
        <button
          className="theme-toggle"
          type="button"
          aria-pressed={theme === "dark"}
          aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
          onClick={onThemeToggle}
        >
          <span>{theme === "dark" ? "Day" : "Night"}</span>
          {theme === "dark" ? <SunIcon size={15} /> : <MoonIcon size={15} />}
        </button>
        <button
          ref={triggerRef}
          className="menu-trigger"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={onMenuOpen}
        >
          <span className="menu-trigger__label">Menu</span>
          <MenuIcon size={36} />
        </button>
      </div>
    </header>
  );
}
