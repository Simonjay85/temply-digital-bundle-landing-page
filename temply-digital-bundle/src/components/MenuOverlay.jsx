import { useEffect, useRef } from "react";
import { MenuIcon, MoonIcon, SunIcon } from "./Icons.jsx";
import { contactHref, siteContent } from "../data/siteContent.js";
import { useBodyLock } from "../hooks/useBodyLock.js";

export function MenuOverlay({
  open,
  onClose,
  triggerRef,
  activeSection,
  theme,
  onThemeToggle,
}) {
  const closeRef = useRef(null);
  const panelRef = useRef(null);
  const wasOpenRef = useRef(false);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return undefined;

    closeRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = [...panelRef.current.querySelectorAll("a[href], button:not([disabled])")];
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, open]);

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true;
      return;
    }
    if (wasOpenRef.current && triggerRef.current) triggerRef.current.focus();
  }, [open, triggerRef]);

  if (!open) return null;

  return (
    <div className="menu-overlay" id="site-menu" role="dialog" aria-modal="true" aria-label="Điều hướng Temply Studio">
      <div className="menu-overlay__panel" ref={panelRef}>
        <div className="menu-overlay__top">
          <a className="menu-overlay__brand" href="#home" onClick={onClose} aria-label="Temply Studio — trang chủ">
            <span className="site-header__mark" aria-hidden="true">T</span>
            <span><strong>Temply</strong> Studio</span>
          </a>
          <div className="menu-overlay__controls">
            <button
              className="theme-toggle theme-toggle--menu"
              type="button"
              aria-pressed={theme === "dark"}
              aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
              onClick={onThemeToggle}
            >
              <span>{theme === "dark" ? "Day" : "Night"}</span>
              {theme === "dark" ? <SunIcon size={15} /> : <MoonIcon size={15} />}
            </button>
            <button ref={closeRef} className="menu-overlay__close" type="button" onClick={onClose}>
              <span>Close</span>
              <MenuIcon size={30} />
            </button>
          </div>
        </div>

        <div className="menu-overlay__body">
          <div className="menu-overlay__intro">
            <span>Temply Studio</span>
            <p>Study Success Bundle — một hệ thống số cho việc học, theo dõi và trình bày.</p>
          </div>
          <nav className="menu-overlay__nav" aria-label="Các phần trên trang">
            {siteContent.navItems.map((item) => (
              <a
                className={activeSection === item.id ? "is-current" : ""}
                href={`#${item.id}`}
                aria-current={activeSection === item.id ? "location" : undefined}
                key={item.id}
                onClick={onClose}
              >
                <span className="menu-overlay__number">/ {item.number}</span>
                <span>{item.label}</span>
                <span className="menu-overlay__arrow" aria-hidden="true">↗</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="menu-overlay__footer">
          <div>
            <span>Liên hệ</span>
            {contactHref ? <a href={contactHref}>{contactHref.replace("mailto:", "")}</a> : <span>Email sẽ hiển thị khi được cấu hình.</span>}
          </div>
          <span className="menu-overlay__hint">Menu / {siteContent.navItems.length} sections</span>
        </div>
      </div>
    </div>
  );
}
