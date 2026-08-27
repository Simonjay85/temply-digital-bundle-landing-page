import { useRef, useState } from "react";
import { ArrowDownIcon, ArrowUpRightIcon } from "./Icons.jsx";
import { EditorialArt } from "./EditorialArt.jsx";
import { siteContent } from "../data/siteContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useGsapContext } from "../motion/useGsapContext.js";

export function WorksShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const previewRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const worksRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".works__heading > *, .works__stage, .works-item",
      { autoAlpha: 0, y: 42 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.85,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: worksRef.current, start: "top 76%" },
      },
    );
    motion.fromTo(
      ".works__visual-frame",
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: worksRef.current, start: "top 68%" },
      },
    );
  }, [prefersReducedMotion]);

  const activeItem = siteContent.showcase[activeIndex];

  const selectItem = (index) => setActiveIndex(index);

  const handlePointerMove = (event) => {
    if (event.pointerType === "touch" || !previewRef.current) return;
    previewRef.current.style.transform = `translate3d(${event.clientX + 22}px, ${event.clientY + 18}px, 0)`;
    previewRef.current.classList.add("is-visible");
    setCursorVisible(true);
  };

  const handlePointerLeave = () => {
    previewRef.current?.classList.remove("is-visible");
    setCursorVisible(false);
  };

  return (
    <section className="works section-anchor" id="bundle" aria-labelledby="bundle-title" ref={worksRef}>
      <div className="content-width works__heading">
        <div>
          <span className="section-index">03 / WORKS</span>
          <h2 id="bundle-title">Bên trong<br /><em>bundle.</em></h2>
        </div>
        <div className="works__heading-copy">
          <p>Mỗi phần trong Study Success Bundle có một vai trò rõ ràng. Chọn một trang để bắt đầu, rồi để cả hệ thống đi cùng bạn.</p>
          <span className="works__count">04 modules / one system</span>
        </div>
      </div>

      <div className="content-width works__layout">
        <div className="works__stage" id="works-preview" aria-live="polite">
          <div className="works__stage-topline">
            <span>{activeItem.number} / 04</span>
            <span>{activeItem.tags.join(" · ")}</span>
          </div>
          <div className="works__visual-frame" key={activeItem.visual}>
            <EditorialArt variant={activeItem.visual} alt={activeItem.alt} loading="lazy" sizes="(max-width: 760px) 92vw, 45vw" />
          </div>
          <div className="works__stage-caption">
            <span>{activeItem.title}</span>
            <span>Study Success Bundle / Temply Studio</span>
          </div>
        </div>

        <div className="works__list" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
          {siteContent.showcase.map((item, index) => {
            const active = index === activeIndex;
            return (
              <article className={`works-item${active ? " is-active" : ""}`} key={item.number}>
                <button
                  className="works-item__button"
                  type="button"
                  aria-pressed={active}
                  aria-controls="works-preview"
                  onClick={() => selectItem(index)}
                  onFocus={() => selectItem(index)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") selectItem(index);
                  }}
                >
                  <span className="works-item__number">{item.number}</span>
                  <span className="works-item__title">{item.title}</span>
                  <span className="works-item__arrow" aria-hidden="true">↗</span>
                </button>
                <div className="works-item__meta">
                  <span>{item.tags.join(" / ")}</span>
                  <p>{item.description}</p>
                </div>
                <div className="works-item__mobile-media">
                  <EditorialArt variant={item.visual} alt={item.alt} loading="lazy" sizes="92vw" />
                </div>
              </article>
            );
          })}
          <a className="works__cta" href="#checkout">
            <span>Xem toàn bộ bundle</span>
            <ArrowUpRightIcon size={18} />
          </a>
        </div>
      </div>

      <div className={`works-cursor-preview${cursorVisible ? " is-visible" : ""}`} ref={previewRef} aria-hidden="true">
        <EditorialArt variant={activeItem.visual} alt="" loading="lazy" sizes="180px" />
        <span>{activeItem.number} / {activeItem.tags[0]}</span>
      </div>

      <a className="section-scroll-link content-width" href="#marquee">
        <span>Continue / category field</span>
        <ArrowDownIcon size={16} />
      </a>
    </section>
  );
}
