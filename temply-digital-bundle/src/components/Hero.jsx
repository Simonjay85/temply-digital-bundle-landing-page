import { useEffect } from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./Icons.jsx";
import { EditorialArt } from "./EditorialArt.jsx";
import { ProductPicture } from "./ProductMedia.jsx";
import { runtimeConfig, siteContent } from "../data/siteContent.js";
import { gsap } from "../motion/gsap.js";
import { useGsapContext } from "../motion/useGsapContext.js";

function HeroAction({ onPrimaryAction, product }) {
  if (runtimeConfig.checkoutUrl) {
    return (
      <a className="hero-action" href={runtimeConfig.checkoutUrl} target="_blank" rel="noreferrer">
        <span>Nhận bundle</span>
        <strong>{product.priceLabel}</strong>
        <ArrowUpRightIcon size={17} />
      </a>
    );
  }

  return (
    <button className="hero-action" type="button" onClick={onPrimaryAction}>
      <span>Nhận bundle</span>
      <strong>{product.priceLabel}</strong>
      <ArrowUpRightIcon size={17} />
    </button>
  );
}

export function Hero({ onPrimaryAction, prefersReducedMotion }) {
  const { hero, product } = siteContent;
  const heroRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".hero__line-inner",
      { yPercent: 112 },
      { yPercent: 0, duration: 1.15, ease: "power4.out", stagger: 0.1, delay: 0.12 },
    );
    motion.fromTo(
      ".hero__eyebrow, .hero__support, .hero__bottomline",
      { autoAlpha: 0, y: 22 },
      { autoAlpha: 1, y: 0, duration: 0.72, ease: "power3.out", stagger: 0.08, delay: 0.48 },
    );
    motion.fromTo(
      ".hero__folio",
      { autoAlpha: 0, y: 38, scale: 0.94 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 1.05, ease: "power3.out", stagger: 0.12, delay: 0.38 },
    );
    motion.fromTo(
      ".hero__backdrop",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.2, ease: "power2.out", delay: 0.2 },
    );

    motion.to(".hero__backdrop img", {
      yPercent: -8,
      scale: 1.05,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    motion.to(".hero__folio--left", {
      yPercent: -14,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    motion.to(".hero__folio--right", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const root = heroRef.current;
    if (!root || prefersReducedMotion || !window.matchMedia?.("(pointer: fine)").matches) return undefined;

    const backdrop = root.querySelector(".hero__backdrop");
    const leftFolio = root.querySelector(".hero__folio--left");
    const rightFolio = root.querySelector(".hero__folio--right");
    if (!backdrop || !leftFolio || !rightFolio) return undefined;

    const moveBackdropX = gsap.quickTo(backdrop, "x", { duration: 0.75, ease: "power3.out" });
    const moveBackdropY = gsap.quickTo(backdrop, "y", { duration: 0.75, ease: "power3.out" });
    const moveLeftX = gsap.quickTo(leftFolio, "x", { duration: 0.9, ease: "power3.out" });
    const moveRightX = gsap.quickTo(rightFolio, "x", { duration: 0.9, ease: "power3.out" });

    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 16;
      const y = (event.clientY / window.innerHeight - 0.5) * 10;
      moveBackdropX(x * 0.35);
      moveBackdropY(y * 0.25);
      moveLeftX(x * -0.6);
      moveRightX(x * 0.45);
    };
    const reset = () => {
      moveBackdropX(0);
      moveBackdropY(0);
      moveLeftX(0);
      moveRightX(0);
    };

    root.addEventListener("pointermove", handlePointerMove, { passive: true });
    root.addEventListener("pointerleave", reset, { passive: true });
    return () => {
      root.removeEventListener("pointermove", handlePointerMove);
      root.removeEventListener("pointerleave", reset);
    };
  }, [heroRef, prefersReducedMotion]);

  return (
    <section className="hero section-anchor" id="home" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero__topline content-width">
        <span>01 / 07</span>
        <span>{hero.eyebrow}</span>
        <span>Scroll to explore ↓</span>
      </div>

      <div className="hero__backdrop" aria-hidden="true">
        <ProductPicture
          alt=""
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 760px) 100vw, 78vw"
        />
      </div>
      <div className="hero__folio hero__folio--left" aria-hidden="true">
        <EditorialArt variant="goals" alt="" loading="eager" sizes="24vw" caption="02 / GOAL MAP" />
      </div>
      <div className="hero__folio hero__folio--right" aria-hidden="true">
        <EditorialArt variant="cv" alt="" loading="lazy" sizes="20vw" caption="03 / ACADEMIC CV" />
      </div>

      <div className="hero__center content-width">
        <p className="hero__eyebrow section-index">{hero.eyebrow}</p>
        <h1 id="hero-title">
          <span className="hero__line">
            <span className="hero__line-mask"><span className="hero__line-inner">{hero.title[0]} {hero.title[1]}</span></span>
          </span>
          <span className="hero__line hero__line--muted">
            <span className="hero__line-mask"><span className="hero__line-inner">{hero.title[2]} {hero.title[3]}</span></span>
          </span>
        </h1>
        <div className="hero__support">
          <span>{hero.supportingLabel}</span>
          <span className="hero__support-rule" aria-hidden="true" />
          <span>Editable files / 01 system</span>
        </div>
      </div>

      <div className="hero__bottomline content-width">
        <p>{hero.description}</p>
        <div className="hero__actions">
          <HeroAction onPrimaryAction={onPrimaryAction} product={product} />
          <a className="hero__explore" href="#bundle">
            <span>Xem bên trong</span>
            <ArrowDownIcon size={16} />
          </a>
        </div>
        <p className="hero__microcopy">{hero.microcopy}</p>
      </div>
    </section>
  );
}
