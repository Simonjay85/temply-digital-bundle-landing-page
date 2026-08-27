import { useCallback, useEffect, useRef, useState } from "react";
import { BenefitRows } from "./components/BenefitRows.jsx";
import { ConversionCta } from "./components/ConversionCta.jsx";
import { FeaturedEditorial } from "./components/FeaturedEditorial.jsx";
import { Hero } from "./components/Hero.jsx";
import { IntroStatement } from "./components/IntroStatement.jsx";
import { MediaStrip } from "./components/MediaStrip.jsx";
import { MenuOverlay } from "./components/MenuOverlay.jsx";
import { MultiMarquee } from "./components/MultiMarquee.jsx";
import { PageLoader } from "./components/PageLoader.jsx";
import { PrincipleSlider } from "./components/PrincipleSlider.jsx";
import { SiteFooter } from "./components/SiteFooter.jsx";
import { SiteHeader } from "./components/SiteHeader.jsx";
import { WorksShowcase } from "./components/WorksShowcase.jsx";
import { MotionProvider } from "./motion/MotionProvider.jsx";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { siteContent } from "./data/siteContent.js";
import { applySeoMeta } from "./utils/seo.js";
import { scrollToId } from "./utils/scroll.js";

const sectionIds = [...siteContent.navItems.map((item) => item.id), "footer"];

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("temply-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const menuTriggerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    document.documentElement.dataset.motion = prefersReducedMotion ? "reduced" : "full";
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("temply-theme", theme);
    document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", theme === "dark" ? "#101010" : "#eeebea");
  }, [theme]);

  useEffect(() => {
    applySeoMeta();
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handlePrimaryAction = useCallback(() => {
    scrollToId("checkout", prefersReducedMotion);
  }, [prefersReducedMotion]);
  const toggleTheme = useCallback(() => {
    setTheme((value) => (value === "dark" ? "light" : "dark"));
  }, []);

  return (
    <MotionProvider reducedMotion={prefersReducedMotion}>
      <PageLoader />
      <a className="skip-link" href="#main-content">Bỏ qua phần điều hướng</a>
      <SiteHeader
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuOpen={openMenu}
        triggerRef={menuTriggerRef}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <MenuOverlay
        open={menuOpen}
        onClose={closeMenu}
        triggerRef={menuTriggerRef}
        activeSection={activeSection}
        theme={theme}
        onThemeToggle={toggleTheme}
      />
      <main id="main-content">
        <Hero onPrimaryAction={handlePrimaryAction} prefersReducedMotion={prefersReducedMotion} />
        <IntroStatement />
        <WorksShowcase />
        <MultiMarquee />
        <BenefitRows />
        <PrincipleSlider />
        <FeaturedEditorial />
        <ConversionCta />
        <MediaStrip />
      </main>
      <SiteFooter />
    </MotionProvider>
  );
}
