import heroSource from "../assets/optimized/temply-study-bundle-hero-1280.jpg";
import hero640 from "../assets/optimized/temply-study-bundle-hero-640.webp";
import hero960 from "../assets/optimized/temply-study-bundle-hero-960.webp";
import hero1280 from "../assets/optimized/temply-study-bundle-hero-1280.webp";
import systemWide from "../assets/generated/temply-study-system-wide.webp";
import goalMap from "../assets/generated/temply-goal-map-still-life.webp";
import academicStack from "../assets/generated/temply-academic-stack.webp";

export const editorialAssets = {
  hero: hero1280,
  heroSource,
  systemWide,
  goalMap,
  academicStack,
};

export function ProductPicture({
  alt,
  className = "",
  loading = "lazy",
  sizes = "100vw",
  fetchPriority,
}) {
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

export function EditorialImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes = "100vw",
  width = 1536,
  height = 1024,
}) {
  return (
    <img
      className={`editorial-image ${className}`.trim()}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      sizes={sizes}
      decoding="async"
    />
  );
}
