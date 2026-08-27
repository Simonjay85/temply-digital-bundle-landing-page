import { useLayoutEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap.js";

async function waitForMedia() {
  if (typeof document === "undefined") return;

  if (document.fonts?.ready) {
    await document.fonts.ready;
  }

  const images = [...document.images].filter((image) => !image.complete);
  if (images.length) {
    await Promise.all(
      images.map(
        (image) =>
          new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          }),
      ),
    );
  }
}

export function MotionProvider({ children, reducedMotion }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion) return undefined;

    const finePointer = window.matchMedia?.("(pointer: fine)").matches;
    const desktopViewport = window.matchMedia?.("(min-width: 900px)").matches;
    const shouldUseLenis = Boolean(finePointer && desktopViewport);
    let lenis;
    let tickerHandler;

    if (shouldUseLenis) {
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.085,
        smoothWheel: true,
        syncTouch: false,
      });

      lenis.on("scroll", ScrollTrigger.update);
      tickerHandler = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(tickerHandler);
      window.__templyLenis = lenis;
    }

    let cancelled = false;
    const refresh = () => {
      if (!cancelled) ScrollTrigger.refresh();
    };

    const settleLayout = async () => {
      await waitForMedia();
      requestAnimationFrame(() => requestAnimationFrame(refresh));
    };

    settleLayout();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      cancelled = true;
      window.removeEventListener("load", refresh);
      if (tickerHandler) gsap.ticker.remove(tickerHandler);
      lenis?.off("scroll", ScrollTrigger.update);
      lenis?.destroy();
      if (window.__templyLenis === lenis) delete window.__templyLenis;
    };
  }, [reducedMotion]);

  return <div className="site-shell" ref={rootRef}>{children}</div>;
}
