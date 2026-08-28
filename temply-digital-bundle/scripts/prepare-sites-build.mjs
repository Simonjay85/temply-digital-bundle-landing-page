#!/usr/bin/env node
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const index = path.join(dist, "client", "index.html");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");

for (const file of [index, worker, hosting]) {
  if (!existsSync(file)) throw new Error("Missing Sites build input: " + file);
}

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

const siteUrl = String(process.env.VITE_SITE_URL || "").trim().replace(/\/+$/, "");
const pageVariant = String(process.env.VITE_PAGE_VARIANT || "etsy").trim().toLowerCase();
const agencyRoutes = [
  ["/work/", "Selected Work — DaisyLexi", "Explore DaisyLexi studio studies and live internal experiments across creative websites, campaign systems and digital product experiences."],
  ["/work/editorial-commerce/", "Editorial Commerce — DaisyLexi Studio Study", "A DaisyLexi studio study exploring editorial product storytelling, responsive composition and a clear commerce path."],
  ["/work/campaign-architecture/", "Campaign Architecture — DaisyLexi Studio Study", "A DaisyLexi studio study exploring paid-traffic landing architecture, visual pacing, message hierarchy and clear next actions."],
  ["/work/product-ecosystems/", "Product Ecosystems — DaisyLexi Studio Study", "A DaisyLexi studio study exploring interface systems, component rules, responsive states and creative development."],
  ["/services/", "Creative Services — DaisyLexi", "DaisyLexi works across innovative design, creative development, brand identity and campaign systems for internet-native businesses."],
  ["/services/innovative-design/", "Innovative Design — DaisyLexi", "Digital direction and interface design built around a clear visual idea, useful hierarchy and responsive behavior."],
  ["/services/creative-development/", "Creative Development — DaisyLexi", "Frontend implementation where responsiveness, interaction and performance are treated as part of the creative direction."],
  ["/services/brand-identity/", "Brand Identity — DaisyLexi", "Identity systems that connect positioning, verbal direction and a visual language ready for digital use."],
  ["/services/campaign-systems/", "Campaign Systems — DaisyLexi", "Campaign creative and landing architecture designed to connect paid attention with a clear next action."],
  ["/about/", "About DaisyLexi — Independent Creative Studio", "DaisyLexi is an independent creative studio focused on brand systems, digital experiences, campaign pages and creative development."],
  ["/contact/", "Start a Project — DaisyLexi", "Start a project conversation with DaisyLexi. Share what you are building, who it is for, what already exists and what should change after launch."],
];

function replaceAgencyRouteMeta(baseHtml, route, title, description, socialImage) {
  const canonical = /^https?:\/\/[^\s]+$/i.test(siteUrl) ? `${siteUrl}${route}` : route;
  const schema = JSON.stringify({ "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: canonical });
  return baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${socialImage}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<script id="daisylexi-webpage-schema" type="application\/ld\+json">.*?<\/script>/, `<script id="daisylexi-webpage-schema" type="application/ld+json">${schema}</script>`);
}

if (pageVariant === "agency") {
  const title = "DaisyLexi — Independent Creative Studio";
  const description = "DaisyLexi is an independent creative studio shaping brand systems, digital experiences, landing pages and creative operations for internet businesses.";
  const canonical = /^https?:\/\/[^\s]+$/i.test(siteUrl) ? `${siteUrl}/` : "";
  const socialImage = canonical ? `${canonical}agency-social.jpg` : "/agency-social.jpg";
  let html = readFileSync(index, "utf8");
  html = html
    .replace('<html lang="vi">', '<html lang="en">')
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, '<meta property="og:type" content="website" />')
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);

  const additions = [
    canonical ? `<link rel="canonical" href="${canonical}" />` : "",
    canonical ? `<meta property="og:url" content="${canonical}" />` : "",
    `<meta property="og:image" content="${socialImage}" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${socialImage}" />`,
    `<script id="daisylexi-webpage-schema" type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      ...(canonical ? { url: canonical } : {}),
    })}</script>`,
  ].filter(Boolean).join("\n    ");

  html = html.replace("</head>", `    ${additions}\n  </head>`);
  writeFileSync(index, html);

  for (const [route, routeTitle, routeDescription] of agencyRoutes) {
    const directory = path.join(dist, "client", route.replace(/^\/+|\/+$/g, ""));
    mkdirSync(directory, { recursive: true });
    writeFileSync(path.join(directory, "index.html"), replaceAgencyRouteMeta(html, route, routeTitle, routeDescription, socialImage));
  }
}

if (/^https?:\/\/[^\s]+$/i.test(siteUrl)) {
  const escapedSiteUrl = siteUrl.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const sitemapUrls = pageVariant === "agency"
    ? ["/", ...agencyRoutes.map(([route]) => route), "/etsy/"]
    : ["/"];
  writeFileSync(
    path.join(dist, "client", "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls.map((route) => `<url><loc>${escapedSiteUrl}${route}</loc></url>`).join("")}</urlset>\n`,
  );

  const robotsPath = path.join(dist, "client", "robots.txt");
  const robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8").trimEnd() : "User-agent: *\nAllow: /";
  writeFileSync(robotsPath, `${robots}\nSitemap: ${escapedSiteUrl}/sitemap.xml\n`);
}

console.log("Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json");
