import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "./Icons.jsx";
import { EditorialArt } from "./EditorialArt.jsx";
import { siteContent } from "../data/siteContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useGsapContext } from "../motion/useGsapContext.js";

export function PrincipleSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePrinciple = siteContent.principles[activeIndex];
  const prefersReducedMotion = usePrefersReducedMotion();
  const principlesRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".principles__heading, .principles__stage, .principles__copy",
      { autoAlpha: 0, y: 42 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: { trigger: principlesRef.current, start: "top 76%" },
      },
    );
  }, [prefersReducedMotion]);

  const move = (direction) => {
    setActiveIndex((current) => (current + direction + siteContent.principles.length) % siteContent.principles.length);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      move(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      move(1);
    }
  };

  return (
    <section className="principles section-anchor" id="principles" aria-labelledby="principles-title" ref={principlesRef} onKeyDown={handleKeyDown}>
      <div className="content-width principles__heading">
        <span className="section-index">06 / PROOF</span>
        <h2 id="principles-title">Điều Temply<br /><em>tin tưởng.</em></h2>
      </div>

      <div className="content-width principles__layout">
        <div className="principles__stage" aria-live="polite">
          <div className="principles__stage-topline">
            <span>Temply principles</span>
            <span>{activePrinciple.number} / 03</span>
          </div>
          <div className="principles__art" key={activePrinciple.visual}>
            <EditorialArt variant={activePrinciple.visual} alt="" loading="lazy" sizes="(max-width: 760px) 90vw, 48vw" caption="Product philosophy / Temply Studio" />
          </div>
        </div>

        <div className="principles__copy" tabIndex="0" aria-label="Điều khiển phần điều Temply tin tưởng">
          <p className="principles__copy-label">Các nguyên tắc của sản phẩm, không phải lời chứng thực của khách hàng.</p>
          <p className="principles__body">{activePrinciple.body}</p>
          <h3>{activePrinciple.title}</h3>
          <div className="principles__controls">
            <button type="button" aria-label="Nguyên tắc trước" onClick={() => move(-1)}><ArrowLeftIcon size={18} /></button>
            <div className="principles__dots" role="tablist" aria-label="Chọn nguyên tắc">
              {siteContent.principles.map((principle, index) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Xem nguyên tắc ${principle.number}`}
                  className={index === activeIndex ? "is-active" : ""}
                  key={principle.number}
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{principle.number}</span>
                </button>
              ))}
            </div>
            <button type="button" aria-label="Nguyên tắc tiếp theo" onClick={() => move(1)}><ArrowRightIcon size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
