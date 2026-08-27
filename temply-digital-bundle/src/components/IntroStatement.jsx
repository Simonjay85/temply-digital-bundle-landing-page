import { EditorialArt } from "./EditorialArt.jsx";
import { siteContent } from "../data/siteContent.js";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion.js";
import { useGsapContext } from "../motion/useGsapContext.js";

function SplitWords({ text }) {
  return text.split(" ").map((word, index) => (
    <span className="intro__word" key={`${word}-${index}`}>
      <span className="intro__word-inner">{word}</span>{index < text.split(" ").length - 1 ? " " : ""}
    </span>
  ));
}

export function IntroStatement() {
  const { statement } = siteContent;
  const prefersReducedMotion = usePrefersReducedMotion();
  const introRef = useGsapContext((motion, ScrollTrigger) => {
    if (prefersReducedMotion) return;

    motion.fromTo(
      ".intro__word-inner",
      { yPercent: 108, opacity: 0.3 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.035,
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 72%",
          end: "top 25%",
          scrub: 0.6,
        },
      },
    );
    motion.fromTo(
      ".intro__body, .intro__gallery",
      { autoAlpha: 0, y: 36 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: introRef.current, start: "top 58%" },
      },
    );
  }, [prefersReducedMotion]);

  return (
    <section className="intro section-anchor" id="intro" aria-labelledby="intro-title" ref={introRef}>
      <div className="content-width intro__header">
        <span className="section-index">{statement.label}</span>
        <span className="intro__header-note">Một hệ thống số · dùng theo nhịp thật</span>
      </div>

      <div className="content-width intro__content">
        <h2 id="intro-title" className="intro__statement">
          <SplitWords text={statement.title} />
        </h2>
        <div className="intro__body">
          <span className="intro__body-index">[ 01 ]</span>
          <p>{statement.body}</p>
        </div>
      </div>

      <div className="content-width intro__gallery" aria-label="Các trang trong Study Success Bundle">
        <figure className="intro__gallery-item intro__gallery-item--small">
          <EditorialArt variant="planner" alt="Các trang planner và weekly dashboard" caption="01 / PLAN" />
        </figure>
        <figure className="intro__gallery-item intro__gallery-item--large">
          <EditorialArt variant="reflection" alt="Các trang reflection và review" caption="04 / REVIEW" />
        </figure>
      </div>
    </section>
  );
}
