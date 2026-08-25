import { ArrowDownIcon, ArrowUpRightIcon } from "./Icons.jsx";
import { ProductStage } from "./ProductMedia.jsx";
import { siteContent } from "../data/siteContent.js";

export function Hero({ onPrimaryAction }) {
  const { hero, product } = siteContent;

  return (
    <section className="hero section-anchor" id="home" aria-labelledby="hero-title">
      <div className="hero__content">
        <p className="hero__label">{hero.label}</p>
        <h1 id="hero-title">
          <span>{hero.title[0]}</span>
          <span className="hero__title-accent">{hero.title[1]}</span>
        </h1>
        <p className="hero__description">{hero.description}</p>
        <div className="hero__actions">
          <button className="button button--primary" type="button" onClick={onPrimaryAction}>
            <span>Nhận bundle</span>
            <span>{product.priceLabel}</span>
          </button>
          <a className="text-link" href="#bundle">
            <span>Xem bên trong</span>
            <ArrowUpRightIcon size={17} />
          </a>
        </div>
        <p className="hero__microcopy">{hero.microcopy}</p>
      </div>
      <div className="hero__media">
        <ProductStage
          variant="hero"
          alt="Bộ Study Success Bundle gồm planner, tracker và các trang template học tập trên bàn làm việc"
          caption="Study Success Bundle / 01"
        />
        <a className="scroll-cue" href="#statement" aria-label="Cuộn đến phần giới thiệu">
          <span>Scroll</span>
          <ArrowDownIcon size={18} />
        </a>
      </div>
    </section>
  );
}
