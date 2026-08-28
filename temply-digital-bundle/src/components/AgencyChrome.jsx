import { useEffect, useMemo, useRef } from "react";

const mainNav = [
  ["Work", "/work/"],
  ["Services", "/services/"],
  ["About", "/about/"],
];

const overlayNav = [
  ["01", "Home", "/"],
  ["02", "Work", "/work/"],
  ["03", "Services", "/services/"],
  ["04", "About", "/about/"],
  ["05", "Contact", "/contact/"],
];

const capabilityNav = [
  ["01", "Performance", "/services/performance-marketing/"],
  ["02", "SEO", "/services/seo-growth-systems/"],
  ["03", "Conversion", "/services/landing-pages-conversion/"],
  ["04", "Analytics", "/services/analytics-measurement/"],
  ["05", "AI Operations", "/services/ai-growth-operations/"],
];

const contactEmail = String(import.meta.env.VITE_CONTACT_EMAIL || "hello@daisylexi.com").trim();
const contactHref = `mailto:${contactEmail}`;

function normalizePath(value = "/") {
  const clean = String(value || "/").split("?")[0].split("#")[0].replace(/\/+$/, "");
  return clean || "/";
}

function isCurrentPath(currentPath, href) {
  const current = normalizePath(currentPath);
  const target = normalizePath(href);
  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

export function Arrow() {
  return <span className="dl-arrow" aria-hidden="true">↗</span>;
}

export function AgencyHeader({ currentPath = "/", menuOpen = false, onMenuOpen, triggerRef }) {
  return (
    <header className="dl-header">
      <a href="/" className="dl-logo" aria-label="DaisyLexi home">DaisyLexi<span>®</span></a>
      <nav className="dl-header__nav" aria-label="Primary navigation">
        {mainNav.map(([label, href]) => (
          <a className={isCurrentPath(currentPath, href) ? "is-active" : ""} href={href} aria-current={isCurrentPath(currentPath, href) ? "page" : undefined} key={href}>
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="dl-header__actions">
        <span className="dl-header__status" aria-label="DaisyLexi is available for selected growth systems projects"><i />Selected projects</span>
        <a className="dl-header__contact" href="/contact/">Start a Project <Arrow /></a>
        <button ref={triggerRef} className="dl-menu-trigger" onClick={onMenuOpen} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="daisylexi-menu">
          <span>Menu</span><i /><i />
        </button>
      </div>
    </header>
  );
}

export function CapabilityRail({ currentPath = "/", home = false }) {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || !window.matchMedia?.("(max-width: 760px)").matches) return undefined;

    const active = track.querySelector("a.is-active");
    const nextLeft = active
      ? Math.max(0, active.offsetLeft - ((track.clientWidth - active.clientWidth) / 2))
      : 0;
    const frame = window.requestAnimationFrame(() => track.scrollTo({ left: nextLeft, behavior: "auto" }));
    return () => window.cancelAnimationFrame(frame);
  }, [currentPath]);

  return (
    <nav className={`dl-capability-rail ${home ? "dl-capability-rail--home" : ""}`} aria-label="DaisyLexi core capabilities">
      <span className="dl-capability-rail__label">Five connected systems</span>
      <div className="dl-capability-rail__track" ref={trackRef}>
        {capabilityNav.map(([index, label, href]) => (
          <a className={isCurrentPath(currentPath, href) ? "is-active" : ""} href={href} aria-current={isCurrentPath(currentPath, href) ? "page" : undefined} key={href}>
            <span>{index}</span><strong>{label}</strong><i aria-hidden="true" />
          </a>
        ))}
      </div>
    </nav>
  );
}

export function AgencyMenu({ open = false, onClose, currentPath = "/", triggerRef }) {
  const menuRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;
    const menu = menuRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => [...(menu?.querySelectorAll(focusableSelector) || [])]
      .filter((element) => element.getAttribute("aria-hidden") !== "true" && element.getClientRects().length > 0);

    document.body.style.overflow = "hidden";
    const focusClose = () => closeRef.current?.focus({ preventScroll: true });
    focusClose();
    const focusFrame = window.requestAnimationFrame(() => window.requestAnimationFrame(focusClose));
    const focusTimer = window.setTimeout(focusClose, 120);

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose?.();
        return;
      }
      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !menu?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      const restoreTarget = triggerRef?.current || previouslyFocused;
      if (restoreTarget instanceof HTMLElement && document.contains(restoreTarget)) restoreTarget.focus();
    };
  }, [open, onClose, triggerRef]);

  return (
    <div ref={menuRef} id="daisylexi-menu" className={`dl-menu ${open ? "is-open" : ""}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-label="Site navigation">
      <div className="dl-menu__top">
        <a href="/" onClick={onClose}>DaisyLexi®</a>
        <button ref={closeRef} onClick={onClose}>Close <span aria-hidden="true">×</span></button>
      </div>
      <div className="dl-menu__intro">
        <span>/ Connected growth systems</span>
        <p>Performance, search, conversion, measurement and AI operations — designed to learn as one system.</p>
      </div>
      <nav aria-label="Full navigation">
        {overlayNav.map(([index, item, href]) => (
          <a className={isCurrentPath(currentPath, href) ? "is-active" : ""} key={item} href={href} onClick={onClose} aria-current={isCurrentPath(currentPath, href) ? "page" : undefined}>
            <span>/ {index}</span><strong>{item}</strong><Arrow />
          </a>
        ))}
      </nav>
      <div className="dl-menu__systems" aria-label="Capability shortcuts">
        {capabilityNav.map(([index, label, href]) => <a href={href} onClick={onClose} key={href}><span>{index}</span>{label}</a>)}
      </div>
      <div className="dl-menu__foot"><a href={contactHref}>{contactEmail}</a><span>Independent growth systems studio</span></div>
    </div>
  );
}

export function AgencyFooter() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <footer className="dl-footer">
      <div className="dl-footer__brand">
        <a href="/">DaisyLexi®</a>
        <p>Independent growth systems studio connecting performance marketing, SEO, conversion, analytics and AI operations.</p>
        <a className="dl-footer__availability" href="/contact/"><i />Available for selected projects <Arrow /></a>
      </div>
      <div className="dl-footer__links"><span>Explore</span><a href="/work/">Work</a><a href="/services/">Services</a><a href="/about/">About</a><a href="/contact/">Contact</a></div>
      <div className="dl-footer__links"><span>Systems</span>{capabilityNav.map(([, label, href]) => <a href={href} key={href}>{label}</a>)}</div>
      <div className="dl-footer__links"><span>Connect</span><a href={contactHref}>{contactEmail}</a><a href="/contact/">Start a project ↗</a></div>
      <div className="dl-footer__bottom"><span>© {year} DaisyLexi</span><span>Performance · SEO · Conversion · Analytics · AI</span><a href="#top">Back to top ↑</a></div>
    </footer>
  );
}
