import { runtimeConfig, siteContent } from "../data/siteContent.js";
import heroPreview from "../assets/optimized/temply-study-bundle-hero-1280.webp";

const upsertMeta = (attribute, value, content) => {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${value}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
};

export function applySeoMeta() {
  if (typeof document === "undefined") return;

  const canonicalUrl = runtimeConfig.siteUrl
    ? `${runtimeConfig.siteUrl}/`
    : window.location.href.split("#")[0];
  const imageUrl = runtimeConfig.siteUrl
    ? new URL(heroPreview, `${runtimeConfig.siteUrl}/`).toString()
    : heroPreview;

  document.documentElement.lang = "vi";
  document.title = siteContent.meta.title;
  upsertMeta("name", "description", siteContent.meta.description);
  upsertMeta("property", "og:title", siteContent.meta.title);
  upsertMeta("property", "og:description", siteContent.meta.description);
  upsertMeta("property", "og:type", "product");
  upsertMeta("property", "og:url", canonicalUrl);
  upsertMeta("property", "og:image", imageUrl);
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", siteContent.meta.title);
  upsertMeta("name", "twitter:description", siteContent.meta.description);
  upsertMeta("name", "twitter:image", imageUrl);
  upsertLink("canonical", canonicalUrl);

  const existingSchema = document.getElementById("temply-product-schema");
  existingSchema?.remove();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: siteContent.product.name,
    description: siteContent.product.description,
    url: canonicalUrl,
    brand: { "@type": "Brand", name: siteContent.brand },
    offers: {
      "@type": "Offer",
      price: siteContent.product.price.toFixed(2),
      priceCurrency: siteContent.product.currency,
      url: canonicalUrl,
      ...(runtimeConfig.checkoutUrl
        ? { availability: "https://schema.org/InStock" }
        : {}),
    },
  };

  const schemaScript = document.createElement("script");
  schemaScript.id = "temply-product-schema";
  schemaScript.type = "application/ld+json";
  schemaScript.textContent = JSON.stringify(productSchema);
  document.head.appendChild(schemaScript);
}
