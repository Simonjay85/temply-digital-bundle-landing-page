import { useState } from "react";
import { ArrowUpRightIcon } from "./Icons.jsx";
import { siteContent } from "../data/siteContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useGsapContext } from "../motion/useGsapContext.js";

export function FeaturedEditorial() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const editorialRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".editorial__heading > *, .editorial-item",
      { autoAlpha: 0, y: 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.75,
        ease: "power3.out",
        stagger: 0.09,
        scrollTrigger: { trigger: editorialRef.current, start: "top 78%" },
      },
    );
  }, [prefersReducedMotion]);

  return (
    <section className="editorial section-anchor" id="editorial" aria-labelledby="editorial-title" ref={editorialRef}>
      <div className="content-width editorial__heading">
        <div>
          <span className="section-index">07 / FEATURED NOTES</span>
          <h2 id="editorial-title">Ghi chú để<br /><em>học nhẹ đầu hơn.</em></h2>
        </div>
        <p>Ba gợi ý ngắn lấy trực tiếp từ cách bundle được dùng: chọn việc, đặt vào tuần, rồi xem lại.</p>
      </div>

      <div className="content-width editorial__list">
        {siteContent.editorialNotes.map((note, index) => {
          const active = activeIndex === index;
          return (
            <article className={`editorial-item${active ? " is-active" : ""}`} key={note.number} onMouseEnter={() => setActiveIndex(index)}>
              <button type="button" className="editorial-item__button" aria-expanded={active} onClick={() => setActiveIndex(active ? -1 : index)}>
                <span className="editorial-item__number">{note.number}</span>
                <span className="editorial-item__type">{note.type}</span>
                <span className="editorial-item__title">{note.title}</span>
                <span className="editorial-item__arrow" aria-hidden="true"><ArrowUpRightIcon size={18} /></span>
              </button>
              <div className="editorial-item__body" aria-hidden={!active}>
                <p>{note.body}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
