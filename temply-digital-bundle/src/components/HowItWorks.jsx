import { useRef, useState } from "react";
import { siteContent } from "../data/siteContent.js";
import { FeaturePreview } from "./ProductMedia.jsx";

export function HowItWorks() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef([]);
  const activeStep = siteContent.steps[activeIndex];

  const selectStep = (nextIndex, shouldFocus = false) => {
    setActiveIndex(nextIndex);
    if (shouldFocus) window.requestAnimationFrame(() => tabRefs.current[nextIndex]?.focus());
  };

  return (
    <section className="how-section section-anchor" id="how" aria-labelledby="how-title">
      <div className="content-width how-section__heading">
        <div>
          <p className="section-index">04 / Cách sử dụng</p>
          <h2 id="how-title">Bắt đầu từ điều gần nhất.</h2>
        </div>
        <p>Không cần dùng hết mọi trang ngay lập tức. Hãy mở đúng mẫu cho bước bạn đang đứng.</p>
      </div>
      <div className="content-width how-section__layout">
        <div className="how-steps" role="tablist" aria-label="Các bước sử dụng bundle">
          {siteContent.steps.map((step, index) => {
            const selected = index === activeIndex;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="how-step-panel"
                tabIndex={selected ? 0 : -1}
                className={`how-step${selected ? " is-selected" : ""}`}
                key={step.number}
                ref={(element) => { tabRefs.current[index] = element; }}
                onClick={() => selectStep(index)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    selectStep((index + 1) % siteContent.steps.length, true);
                  }
                  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    event.preventDefault();
                    selectStep((index - 1 + siteContent.steps.length) % siteContent.steps.length, true);
                  }
                }}
              >
                <span className="how-step__number">{step.number}</span>
                <span className="how-step__title">{step.title}</span>
                <span className="how-step__indicator" aria-hidden="true">↗</span>
                <span className="how-step__description">{step.description}</span>
              </button>
            );
          })}
        </div>
        <div className="how-panel" id="how-step-panel" role="tabpanel" tabIndex="0" aria-label={activeStep.title}>
          <FeaturePreview variant={activeStep.visual === "receive" ? "route" : activeStep.visual === "choose" ? "plan" : activeStep.visual === "customize" ? "profile" : "rhythm"} />
          <div className="how-panel__caption">
            <span>{activeStep.number}</span>
            <p>{activeStep.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
