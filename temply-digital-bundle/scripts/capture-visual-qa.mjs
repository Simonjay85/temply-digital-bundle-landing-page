#!/usr/bin/env node
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const localUrl = String(process.env.QA_LOCAL_URL || "http://127.0.0.1:4173/").trim();
const referenceUrl = String(process.env.QA_REFERENCE_URL || "https://azuris-nextjs.vercel.app/index-creative-agency").trim();
const outputDir = path.join(root, "qa", "implementation");
const comparisonPath = path.join(root, "qa", "comparison-1440.html");
const chromePath = process.env.PLAYWRIGHT_EXECUTABLE_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const viewports = [
  { name: "desktop-1440", width: 1440, height: 900 },
  { name: "desktop-1920", width: 1920, height: 1080 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "mobile-390", width: 390, height: 844 },
  { name: "mobile-360", width: 360, height: 800 },
];

const localTargets = {
  "desktop-1440": [
    ["top", null],
    ["intro", "#intro"],
    ["works", "#bundle"],
    ["services", "#benefits"],
    ["principles", "#principles"],
    ["editorial", "#editorial"],
    ["cta", "#checkout"],
    ["media", "#media"],
    ["footer", "#footer"],
  ],
  "desktop-1920": [["top", null], ["full", "__full__"]],
  "laptop-1024": [["top", null], ["full", "__full__"]],
  "tablet-768": [["top", null], ["full", "__full__"]],
  "mobile-390": [
    ["top", null],
    ["works", "#bundle"],
    ["services", "#benefits"],
    ["principles", "#principles"],
    ["editorial", "#editorial"],
    ["cta", "#checkout"],
    ["footer", "#footer"],
  ],
  "mobile-360": [["top", null], ["full", "__full__"]],
};

function failWithHelpfulError(error) {
  const detail = error instanceof Error ? error.message : String(error);
  throw new Error(
    "Visual QA capture failed for " + localUrl +
    ". Start the production preview first (npm run preview -- --host 127.0.0.1), then rerun npm run qa:capture. Browser detail: " + detail,
  );
}

async function waitForStablePage(page) {
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    const pendingImages = [...document.images].filter((image) => !image.complete).map((image) => (
      new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      })
    ));
    await Promise.race([
      Promise.all(pendingImages),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
  });
  await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight, left: 0, behavior: "instant" }));
  await page.waitForTimeout(120);
  await page.evaluate(() => window.scrollTo({ top: 0, left: 0, behavior: "instant" }));
  await page.evaluate(async () => {
    const pendingImages = [...document.images].filter((image) => !image.complete).map((image) => (
      new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      })
    ));
    await Promise.race([
      Promise.all(pendingImages),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
  });
  await page.waitForTimeout(180);
}

async function assertPageHealth(page, label) {
  const health = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    viewport: window.innerWidth,
    title: document.title,
    bodyText: document.body.innerText.slice(0, 120),
  }));
  if (health.width > health.viewport + 1) {
    throw new Error(label + " has horizontal overflow: " + health.width + "px document width vs " + health.viewport + "px viewport");
  }
  return health;
}

async function scrollToSection(page, selector) {
  await page.evaluate((targetSelector) => {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "instant" });
  }, selector);
  await page.waitForTimeout(420);
  await page.evaluate((targetSelector) => {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(0, top), left: 0, behavior: "instant" });
    document.activeElement?.blur();
  }, selector);
  await page.waitForTimeout(180);
}

async function captureViewport(browser, viewport) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  try {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(localUrl, { waitUntil: "domcontentloaded", timeout: 20000 });
    await waitForStablePage(page);
    const health = await assertPageHealth(page, viewport.name);
    await page.screenshot({ path: path.join(outputDir, viewport.name + "-full.png"), fullPage: true });

    for (const [suffix, selector] of localTargets[viewport.name] || []) {
      if (suffix === "full") continue;
      if (selector) {
        const exists = await page.locator(selector).count();
        if (!exists) throw new Error(viewport.name + " capture target " + selector + " is missing");
        await scrollToSection(page, selector);
      } else {
        await page.evaluate(() => {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
          document.activeElement?.blur();
        });
        await page.waitForTimeout(120);
      }
      await page.screenshot({ path: path.join(outputDir, viewport.name + "-" + suffix + ".png") });
    }

    return { viewport, health, consoleErrors };
  } finally {
    await context.close();
  }
}

function comparisonMarkup() {
  const rows = [
    ["Hero", "reference-desktop-top.png", "desktop-1440-top.png"],
    ["Works", "reference-desktop-works.png", "desktop-1440-works.png"],
    ["Services", "reference-desktop-services.png", "desktop-1440-services.png"],
    ["Footer / full rhythm", "reference-desktop-footer.png", "desktop-1440-footer.png"],
    ["Full page", "reference-desktop-full.png", "desktop-1440-full.png"],
    ["Mobile hero", "reference-mobile-top.png", "mobile-390-top.png"],
    ["Mobile full page", "reference-mobile-full.png", "mobile-390-full.png"],
  ];
  const sections = rows.map((row) => (
    "<section><h2>" + row[0] + "</h2><div class=\"pair\">" +
    "<figure><img src=\"./reference/" + row[1] + "\" alt=\"" + row[0] + " reference\" /><figcaption>Reference / " + row[1] + "</figcaption></figure>" +
    "<figure><img src=\"./implementation/" + row[2] + "\" alt=\"" + row[0] + " implementation\" /><figcaption>Implementation / " + row[2] + "</figcaption></figure>" +
    "</div></section>"
  )).join("\n");
  return [
    "<!doctype html>",
    "<html lang=\"en\"><head><meta charset=\"utf-8\" />",
    "<title>Temply / Azurio visual comparison</title>",
    "<style>:root{color-scheme:dark;font-family:Arial,sans-serif;background:#111;color:#f1ede8}body{margin:0;padding:32px}h1{font-size:36px;font-weight:500;letter-spacing:-.06em}p{color:#aaa}section{margin:48px 0}h2{font-size:18px;font-weight:500}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}figure{margin:0}figcaption{padding:8px 0;color:#aaa;font:12px monospace}img{display:block;width:100%;height:auto;background:#222}</style>",
    "</head><body><h1>Temply / Azurio reference-locked visual comparison</h1>",
    "<p>Reference: " + referenceUrl + "<br />Implementation: " + localUrl + "<br />Implementation capture mode: reduced motion for deterministic screenshots.</p>",
    sections,
    "</body></html>",
  ].join("\n");
}

async function main() {
  mkdirSync(outputDir, { recursive: true });
  const browser = await chromium.launch(
    existsSync(chromePath) ? { headless: true, executablePath: chromePath } : { headless: true },
  );

  const results = [];
  try {
    for (const viewport of viewports) {
      results.push(await captureViewport(browser, viewport));
      console.log("Captured " + viewport.name + " at " + viewport.width + "x" + viewport.height);
    }
  } catch (error) {
    await browser.close();
    failWithHelpfulError(error);
  }
  await browser.close();

  writeFileSync(comparisonPath, comparisonMarkup());
  const errors = results.flatMap((result) => result.consoleErrors.map((message) => result.viewport.name + ": " + message));
  console.log("Wrote " + comparisonPath);
  console.log("QA summary: " + results.length + " viewports, " + errors.length + " console errors");
  if (errors.length) {
    for (const error of errors) console.error(error);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.stack || error.message : error);
  process.exitCode = 1;
});
