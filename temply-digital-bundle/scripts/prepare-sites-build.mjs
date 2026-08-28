#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
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
// Some macOS/iCloud-backed workspaces expose readable placeholder files that
// intermittently fail copyFileSync with EDEADLK ("Resource deadlock avoided").
// Reading the bytes and writing them into dist is equivalent for these small
// text build inputs and keeps packaging deterministic across local filesystems.
writeFileSync(path.join(dist, "server", "index.js"), readFileSync(worker));
writeFileSync(path.join(dist, ".openai", "hosting.json"), readFileSync(hosting));

const siteUrl = String(process.env.VITE_SITE_URL || "https://daisylexi.com").trim().replace(/\/+$/, "");
const pageVariant = String(process.env.VITE_PAGE_VARIANT || "agency").trim().toLowerCase();

if (pageVariant === "agency") {
  const title = "DaisyLexi — Performance Marketing, SEO & AI Growth Systems";
  const description = "DaisyLexi builds performance marketing, SEO, conversion, e-commerce and AI automation systems for digital businesses.";
  const contactEmail = String(process.env.VITE_CONTACT_EMAIL || "hello@daisylexi.com").trim();
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
      "@type": "ProfessionalService",
      name: title,
      description,
      email: contactEmail,
      areaServed: "Worldwide",
      serviceType: ["Performance Marketing", "SEO", "Conversion Rate Optimization", "E-Commerce Growth", "AI Automation"],
      ...(canonical ? { url: canonical } : {}),
    })}</script>`,
  ].filter(Boolean).join("\n    ");

  html = html.replace("</head>", `    ${additions}\n  </head>`);
  writeFileSync(index, html);
}

if (/^https?:\/\/[^\s]+$/i.test(siteUrl)) {
  const escapedSiteUrl = siteUrl.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  writeFileSync(
    path.join(dist, "client", "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escapedSiteUrl}/</loc></url></urlset>\n`,
  );

  const robotsPath = path.join(dist, "client", "robots.txt");
  const robots = existsSync(robotsPath) ? readFileSync(robotsPath, "utf8").trimEnd() : "User-agent: *\nAllow: /";
  writeFileSync(robotsPath, `${robots}\nSitemap: ${escapedSiteUrl}/sitemap.xml\n`);
}

console.log("Prepared Sites build: dist/server/index.js and dist/.openai/hosting.json");
