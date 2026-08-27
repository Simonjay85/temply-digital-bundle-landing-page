export function scrollToId(id, prefersReducedMotion = false) {
  const target = document.getElementById(id);
  if (!target) return;

  if (!prefersReducedMotion && window.__templyLenis) {
    window.__templyLenis.scrollTo(target, { offset: -24, duration: 0.9 });
    return;
  }

  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}
