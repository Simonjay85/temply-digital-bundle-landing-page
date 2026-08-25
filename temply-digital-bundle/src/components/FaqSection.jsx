import { useId, useState } from "react";
import { PlusIcon } from "./Icons.jsx";
import { siteContent } from "../data/siteContent.js";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId().replace(/:/g, "");

  return (
    <section className="faq-section section-anchor" id="faq" aria-labelledby="faq-title">
      <div className="content-width faq-section__layout">
        <div className="faq-section__heading">
          <p className="section-index">05 / FAQ</p>
          <h2 id="faq-title">Trước khi bạn bắt đầu.</h2>
          <p>Những câu trả lời ngắn để bạn biết bundle này phù hợp với mình ở đâu.</p>
        </div>
        <div className="faq-list">
          {siteContent.faqItems.map((item, index) => {
            const open = openIndex === index;
            const answerId = `${baseId}-answer-${index}`;
            return (
              <article className={`faq-item${open ? " is-open" : ""}`} key={item.question}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={answerId}
                    onClick={() => setOpenIndex(open ? -1 : index)}
                  >
                    <span>{item.question}</span>
                    <PlusIcon size={20} open={open} />
                  </button>
                </h3>
                <div className="faq-item__answer" id={answerId} aria-hidden={!open}>
                  <div>
                    <p>{item.answer}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
