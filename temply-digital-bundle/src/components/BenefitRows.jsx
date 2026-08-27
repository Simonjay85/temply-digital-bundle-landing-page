import { useEffect, useRef, useState } from "react";
import { EditorialArt } from "./EditorialArt.jsx";
import { siteContent } from "../data/siteContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useGsapContext } from "../motion/useGsapContext.js";

export function BenefitRows() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rowRefs = useRef([]);
  const prefersReducedMotion = usePrefersReducedMotion();
  const benefitsRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".benefits__heading > *, .benefit-row",
      { autoAlpha: 0, y: 38 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: benefitsRef.current, start: "top 74%" },
      },
    );
    motion.fromTo(
      ".benefits__preview",
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: benefitsRef.current, start: "top 62%" },
      },
    );
  }, [prefersReducedMotion]);

  useEffect(() => {
    const rows = rowRefs.current.filter(Boolean);
    if (!rows.length || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * 0.42) - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.42));
        if (visible[0]) setActiveIndex(Number(visible[0].target.dataset.index));
      },
      { rootMargin: "-30% 0px -42% 0px", threshold: [0, 0.2, 0.8] },
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  const activeBenefit = siteContent.benefits[activeIndex];

  return (
    <section className="benefits section-anchor" id="benefits" aria-labelledby="benefits-title" ref={benefitsRef}>
      <div className="benefits__ghost" aria-hidden="true">
        <span>Direction</span><span>Plan</span><span>Rhythm</span><span>Present</span>
      </div>
      <div className="content-width benefits__heading">
        <div>
          <span className="section-index section-index--light">05 / SERVICES</span>
          <h2 id="benefits-title">Bốn cách<br /><em>giữ nhịp.</em></h2>
        </div>
        <p>Không hứa thay bạn học. Chỉ làm cho bước tiếp theo đủ rõ để bạn tự bắt đầu.</p>
      </div>

      <div className="content-width benefits__layout">
        <div className="benefits__rows" role="list" aria-label="Bốn cách dùng Study Success Bundle">
          {siteContent.benefits.map((benefit, index) => {
            const active = index === activeIndex;
            return (
              <article
                className={`benefit-row${active ? " is-active" : ""}`}
                data-index={index}
                key={benefit.number}
                ref={(element) => { rowRefs.current[index] = element; }}
                role="listitem"
              >
                <button
                  type="button"
                  className="benefit-row__button"
                  aria-pressed={active}
                  aria-controls="benefits-preview"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActiveIndex(index);
                  }}
                >
                  <span className="benefit-row__number">{benefit.number}</span>
                  <span className="benefit-row__title">{benefit.title}</span>
                  <span className="benefit-row__tags">{benefit.tags.join(" / ")}</span>
                  <span className="benefit-row__arrow" aria-hidden="true">↗</span>
                </button>
                <p>{benefit.description}</p>
                <div className="benefit-row__mobile-preview">
                  <EditorialArt variant={benefit.visual} alt={`Minh hoạ cho ${benefit.title}`} loading="lazy" sizes="88vw" />
                </div>
              </article>
            );
          })}
        </div>

        <aside className="benefits__preview" id="benefits-preview" aria-live="polite" aria-label={`Xem trước: ${activeBenefit.title}`}>
          <div className="benefits__preview-art" key={activeBenefit.visual}>
            <EditorialArt variant={activeBenefit.visual} alt={`Minh hoạ cho ${activeBenefit.title}`} loading="lazy" sizes="(max-width: 760px) 88vw, 38vw" />
          </div>
          <div className="benefits__preview-caption">
            <span>{activeBenefit.number} / {activeBenefit.title}</span>
            <span>{activeBenefit.tags.join(" · ")}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
