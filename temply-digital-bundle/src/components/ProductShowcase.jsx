import { AbstractPreview, ProductPicture } from "./ProductMedia.jsx";
import { ArrowUpRightIcon } from "./Icons.jsx";
import { siteContent } from "../data/siteContent.js";

function ShowcaseVisual({ item }) {
  if (item.visual === "planner") {
    return (
      <div className="showcase-visual showcase-visual--planner">
        <ProductPicture
          alt="Planner và các trang dashboard trong Study Success Bundle"
          sizes="(max-width: 760px) 100vw, 49vw"
        />
        <span className="showcase-visual__stamp">01 / semester</span>
      </div>
    );
  }

  return (
    <div className={`showcase-visual showcase-visual--${item.visual}`}>
      <AbstractPreview variant={item.visual} title={item.title} />
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section className="showcase-section section-anchor" id="bundle" aria-labelledby="bundle-title">
      <div className="content-width showcase-section__heading">
        <div>
          <p className="section-index">02 / Bên trong bundle</p>
          <h2 id="bundle-title">Những trang biến ý định thành việc có thể làm.</h2>
        </div>
        <p>
          Mỗi phần trong Study Success Bundle có một vai trò rõ ràng. Chọn một trang để bắt đầu, rồi để cả hệ thống đi cùng bạn.
        </p>
      </div>
      <div className="content-width showcase-grid">
        {siteContent.showcase.map((item) => (
          <article className={`showcase-card showcase-card--${item.visual}`} key={item.number}>
            <ShowcaseVisual item={item} />
            <div className="showcase-card__copy">
              <div className="showcase-card__meta">
                <span>{item.number}</span>
                <span className="showcase-card__tags">{item.tags.join(" · ")}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <a className="inline-arrow" href="#checkout">
                <span>Xem giá và cách nhận</span>
                <ArrowUpRightIcon size={16} />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
