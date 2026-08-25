import { useState } from "react";

const terms = [
  "Planner",
  "Goal Map",
  "Habit Tracker",
  "Academic CV",
  "Weekly Dashboard",
  "Reflection",
  "Editable Files",
  "Digital Access",
];

export function ProductMarquee() {
  const [paused, setPaused] = useState(false);
  const repeatedTerms = [...terms, ...terms];

  return (
    <section className={`product-marquee${paused ? " is-paused" : ""}`} aria-label="Các thành phần trong bundle">
      <div className="product-marquee__track">
        {repeatedTerms.map((term, index) => (
          <span key={`${term}-${index}`}>
            {term}
            <b aria-hidden="true">/</b>
          </span>
        ))}
      </div>
      <button
        className="product-marquee__control"
        type="button"
        aria-pressed={paused}
        onClick={() => setPaused((value) => !value)}
      >
        {paused ? "Tiếp tục chuyển động" : "Tạm dừng chuyển động"}
      </button>
    </section>
  );
}
