import { useState } from "react";
import { FeaturePreview } from "./ProductMedia.jsx";
import { siteContent } from "../data/siteContent.js";

export function FeatureRows() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = siteContent.benefits[activeIndex];

  return (
    <section className="feature-section section-anchor" id="benefits" aria-labelledby="benefits-title">
      <div className="content-width feature-section__intro">
        <p className="section-index section-index--light">03 / Lợi ích</p>
        <h2 id="benefits-title">Một nhịp học rõ hơn, từng bước một.</h2>
      </div>
      <div className="content-width feature-section__layout">
        <div className="feature-rows" role="list" aria-label="Bốn lợi ích chính">
          {siteContent.benefits.map((feature, index) => {
            const isActive = index === activeIndex;
            return (
              <article className={`feature-row${isActive ? " is-active" : ""}`} key={feature.number} role="listitem">
                <button
                  type="button"
                  className="feature-row__button"
                  aria-pressed={isActive}
                  aria-controls={`feature-preview-${feature.number}`}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onPointerEnter={(event) => {
                    if (event.pointerType === "mouse") setActiveIndex(index);
                  }}
                >
                  <span className="feature-row__number">{feature.number}</span>
                  <span className="feature-row__title">{feature.title}</span>
                  <span className="feature-row__mark" aria-hidden="true">↗</span>
                </button>
                <p>{feature.description}</p>
              </article>
            );
          })}
        </div>
        <div className="feature-section__preview" id={`feature-preview-${activeFeature.number}`} role="region" aria-label={`Xem trước: ${activeFeature.title}`}>
          <FeaturePreview variant={activeFeature.visual} />
          <p className="feature-section__preview-caption">{activeFeature.title}</p>
        </div>
      </div>
    </section>
  );
}
