export function scrollToId(id, prefersReducedMotion = false) {
  const target = document.getElementById(id);
  if (!target) return;

  target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
}
