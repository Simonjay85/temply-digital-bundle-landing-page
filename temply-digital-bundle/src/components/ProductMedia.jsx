import heroSource from "../assets/optimized/temply-study-bundle-hero-1280.jpg";
import hero640 from "../assets/optimized/temply-study-bundle-hero-640.webp";
import hero960 from "../assets/optimized/temply-study-bundle-hero-960.webp";
import hero1280 from "../assets/optimized/temply-study-bundle-hero-1280.webp";

export function ProductPicture({ alt, className = "", loading = "lazy", sizes = "100vw", fetchPriority }) {
  return (
    <picture className={`product-picture ${className}`.trim()}>
      <source
        type="image/webp"
        srcSet={`${hero640} 640w, ${hero960} 960w, ${hero1280} 1280w`}
        sizes={sizes}
      />
      <img
        src={heroSource}
        alt={alt}
        width="1536"
        height="1024"
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
      />
    </picture>
  );
}

export function ProductStage({ variant = "hero", alt, caption }) {
  return (
    <div className={`product-stage product-stage--${variant}`}>
      <div className="product-stage__grid" aria-hidden="true" />
      <div className="product-stage__image">
        <ProductPicture
          alt={alt}
          loading={variant === "hero" ? "eager" : "lazy"}
          fetchPriority={variant === "hero" ? "high" : undefined}
          sizes={variant === "hero" ? "(max-width: 760px) 100vw, 57vw" : "(max-width: 760px) 88vw, 42vw"}
        />
      </div>
      {caption ? <p className="product-stage__caption">{caption}</p> : null}
    </div>
  );
}

const previewLines = {
  goals: ["Mục tiêu học kỳ", "Mốc 01 / Mốc 02 / Mốc 03", "Theo dõi điều giữ nhịp"],
  cv: ["Tên của bạn", "Học tập / Dự án / Hoạt động", "Chọn điều đáng nhớ nhất"],
  reflection: ["Tuần này đã đi qua", "Điều hiệu quả / Điều cần đổi", "Bước tiếp theo"],
};

export function AbstractPreview({ variant, title }) {
  const lines = previewLines[variant] || previewLines.goals;

  return (
    <div className={`abstract-preview abstract-preview--${variant}`} aria-hidden="true">
      <div className="abstract-preview__paper">
        <div className="abstract-preview__topline" />
        <span className="abstract-preview__title">{title}</span>
        <div className="abstract-preview__columns">
          <div>
            <span className="abstract-preview__circle" />
            <span className="abstract-preview__rule abstract-preview__rule--long" />
            <span className="abstract-preview__rule" />
            <span className="abstract-preview__rule" />
          </div>
          <div className="abstract-preview__list">
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </div>
        </div>
        <div className="abstract-preview__footer">
          <span />
          <span />
          <span />
        </div>
      </div>
      <span className="abstract-preview__tab">Editable file</span>
    </div>
  );
}

export function FeaturePreview({ variant }) {
  const labels = {
    route: ["Mục tiêu", "Ưu tiên", "Tuần này"],
    plan: ["Học kỳ", "Tuần 04", "Hôm nay"],
    rhythm: ["Đã làm", "Đang giữ", "Cần đổi"],
    profile: ["Môn học", "Dự án", "Hồ sơ"],
  };
  const items = labels[variant] || labels.route;

  return (
    <div className={`feature-preview feature-preview--${variant}`} aria-hidden="true">
      <div className="feature-preview__window">
        <div className="feature-preview__window-bar"><span /><span /><span /></div>
        <div className="feature-preview__window-heading">Study Success / {variant}</div>
        <div className="feature-preview__window-body">
          {items.map((item, index) => (
            <div className="feature-preview__item" key={item}>
              <span className="feature-preview__item-number">0{index + 1}</span>
              <span className="feature-preview__item-line">{item}</span>
              <span className="feature-preview__item-mark" />
            </div>
          ))}
        </div>
      </div>
      <span className="feature-preview__orb" />
      <span className="feature-preview__caption">{items[0]} / {items[items.length - 1]}</span>
    </div>
  );
}
