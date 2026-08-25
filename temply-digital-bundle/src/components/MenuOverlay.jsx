import { useEffect, useRef } from "react";
import { useBodyLock } from "../hooks/useBodyLock.js";
import { runtimeConfig, siteContent } from "../data/siteContent.js";

export function MenuOverlay({ open, onClose, triggerRef, activeSection }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const animationFrame = window.requestAnimationFrame(() => closeRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll(
        "a[href], button:not([disabled]), [tabindex]:not([tabindex=\"-1\"])",
      );
      if (!focusable?.length) return;

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
    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("keydown", handleKeyDown);
      if (previouslyFocused instanceof HTMLElement && previouslyFocused !== document.body) {
        previouslyFocused.focus();
      } else {
        triggerRef.current?.focus();
      }
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      id="site-menu"
      className="menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="site-menu-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="menu-overlay__panel" ref={dialogRef}>
        <div className="menu-overlay__top">
          <p id="site-menu-title" className="menu-overlay__brand">Temply Studio</p>
          <button ref={closeRef} className="menu-overlay__close" type="button" onClick={onClose}>
            <span>Đóng</span>
            <span className="menu-overlay__close-icon" aria-hidden="true">×</span>
          </button>
        </div>
        <nav className="menu-overlay__nav" aria-label="Điều hướng chính">
          {siteContent.navItems.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              className={activeSection === item.id ? "is-current" : ""}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={onClose}
            >
              <span className="menu-overlay__number">{item.number}</span>
              <span>{item.label}</span>
              <span className="menu-overlay__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </nav>
        <div className="menu-overlay__footer">
          <p>{siteContent.product.description}</p>
          {runtimeConfig.contactEmail ? <a href={`mailto:${runtimeConfig.contactEmail}`}>{runtimeConfig.contactEmail}</a> : <span>Digital product · {siteContent.product.priceLabel}</span>}
        </div>
      </div>
    </div>
  );
}
