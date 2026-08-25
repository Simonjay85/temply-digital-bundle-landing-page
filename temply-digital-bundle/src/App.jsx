import { useCallback, useEffect, useRef, useState } from "react";
import { ConversionCta } from "./components/ConversionCta.jsx";
import { FaqSection } from "./components/FaqSection.jsx";
import { FeatureRows } from "./components/FeatureRows.jsx";
import { Hero } from "./components/Hero.jsx";
import { HowItWorks } from "./components/HowItWorks.jsx";
import { IntroStatement } from "./components/IntroStatement.jsx";
import { MenuOverlay } from "./components/MenuOverlay.jsx";
import { ProductMarquee } from "./components/ProductMarquee.jsx";
import { ProductShowcase } from "./components/ProductShowcase.jsx";
import { ProofSection } from "./components/ProofSection.jsx";
import { SiteFooter } from "./components/SiteFooter.jsx";
import { SiteHeader } from "./components/SiteHeader.jsx";
import { useActiveSection } from "./hooks/useActiveSection.js";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion.js";
import { siteContent } from "./data/siteContent.js";
import { applySeoMeta } from "./utils/seo.js";
import { scrollToId } from "./utils/scroll.js";

const sectionIds = siteContent.navItems.map((item) => item.id);

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuTriggerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeSection = useActiveSection(sectionIds);

  useEffect(() => {
    document.documentElement.dataset.motion = prefersReducedMotion ? "reduced" : "full";
  }, [prefersReducedMotion]);

  useEffect(() => {
    applySeoMeta();
  }, []);

  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const handlePrimaryAction = useCallback(() => {
    scrollToId("checkout", prefersReducedMotion);
  }, [prefersReducedMotion]);

  return (
    <>
      <a className="skip-link" href="#main-content">Bỏ qua phần điều hướng</a>
      <SiteHeader
        activeSection={activeSection}
        menuOpen={menuOpen}
        onMenuOpen={openMenu}
        triggerRef={menuTriggerRef}
      />
      <MenuOverlay
        open={menuOpen}
        onClose={closeMenu}
        triggerRef={menuTriggerRef}
        activeSection={activeSection}
      />
      <main id="main-content">
        <Hero onPrimaryAction={handlePrimaryAction} />
        <IntroStatement />
        <ProductShowcase />
        <ProductMarquee />
        <FeatureRows />
        <HowItWorks />
        <ProofSection />
        <FaqSection />
        <ConversionCta />
      </main>
      <SiteFooter prefersReducedMotion={prefersReducedMotion} />
    </>
  );
}
