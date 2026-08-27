import { useState } from "react";
import { ArrowDownIcon } from "./Icons.jsx";
import { siteContent } from "../data/siteContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";

export function MultiMarquee() {
  const [paused, setPaused] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const terms = siteContent.marqueeTerms;

  return (
    <section className={`marquee-section section-anchor${paused || prefersReducedMotion ? " is-paused" : ""}`} id="marquee" aria-labelledby="marquee-title">
      <div className="content-width marquee-section__header">
        <span className="section-index section-index--light">04 / CATEGORY FIELD</span>
        <h2 id="marquee-title">Những thứ<br /><em>giữ nhịp.</em></h2>
        <button className="marquee-toggle" type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
          <span>{paused ? "Play" : "Pause"}</span>
          <ArrowDownIcon size={15} />
        </button>
      </div>
      <div className="marquee-section__field" aria-label="Các thành phần của bundle">
        {[0, 1, 2, 3, 4].map((rowIndex) => (
          <div className={`marquee-line marquee-line--${rowIndex % 2 ? "reverse" : "forward"}`} key={rowIndex}>
            <div className="marquee-line__track">
              {[...terms, ...terms].map((term, index) => (
                <span key={`${rowIndex}-${term}-${index}`}>
                  {term}<i aria-hidden="true"> / </i>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="content-width marquee-section__footer">
        <span>Planner / Weekly dashboard / Goal map / Habit tracker / Academic CV / Reflection / Editable files / Digital download</span>
        <span>Hover pause · Reduced motion ready</span>
      </div>
    </section>
  );
}
