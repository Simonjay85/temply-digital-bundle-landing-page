import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "./gsap.js";

export function useGsapContext(setup, dependencies = []) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return undefined;

    const context = gsap.context(() => {
      setup(gsap, ScrollTrigger);
    }, rootRef);

    return () => context.revert();
  }, dependencies);

  return rootRef;
}
