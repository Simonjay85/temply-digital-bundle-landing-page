#!/usr/bin/env node
import fs from "node:fs";
import { chromium } from "playwright";

const liveBase = "https://daisylexi.com";
const localBase = String(process.env.QA_LOCAL_URL || "http://127.0.0.1:4173").replace(/\/+$/, "");
const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const screenshotDir = "/tmp/daisylexi-compare";

fs.rmSync(screenshotDir, { recursive: true, force: true });
fs.mkdirSync(screenshotDir, { recursive: true });

const sitemap = await (await fetch(`${liveBase}/sitemap.xml`)).text();
const routes = [
  ...new Set(
    [...sitemap.matchAll(/<loc>https:\/\/daisylexi\.com([^<]*)<\/loc>/g)].map((match) => match[1] || "/"),
  ),
];
const failures = [];

await Promise.all(
  routes.flatMap((route) => [liveBase, localBase].map(async (base) => {
    try {
      const response = await fetch(`${base}${route}`, { redirect: "follow" });
      if (response.status !== 200) failures.push(`${base}${route} returned ${response.status}`);
    } catch (error) {
      failures.push(`${base}${route} fetch failed: ${error instanceof Error ? error.message : String(error)}`);
    }
  })),
);

const browser = await chromium.launch(
  fs.existsSync(chromePath) ? { headless: true, executablePath: chromePath } : { headless: true },
);

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "1366", width: 1366, height: 768 },
  { name: "1024", width: 1024, height: 768 },
  { name: "768", width: 768, height: 1024 },
  { name: "390", width: 390, height: 844 },
];

for (const viewport of viewports) {
  const results = {};
  for (const [label, base] of [["live", liveBase], ["local", localBase]]) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const browserErrors = [];
    const badResponses = [];
    page.on("console", (message) => {
      if (message.type() === "error") browserErrors.push(message.text());
    });
    page.on("pageerror", (error) => browserErrors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`);
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(`${base}/`, { waitUntil: "domcontentloaded", timeout: 25000 });
    await page.waitForTimeout(650);
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    await page.waitForTimeout(180);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(180);
    const health = await page.evaluate(() => ({
      title: document.title,
      h1: [...document.querySelectorAll("h1")].map((node) => (node.textContent || "").trim().replace(/\s+/g, " ")),
      text: (document.body.innerText || "").replace(/\s+/g, " ").trim(),
      scrollWidth: document.documentElement.scrollWidth,
      viewportWidth: innerWidth,
      height: document.documentElement.scrollHeight,
      sections: document.querySelectorAll("main section").length,
      links: document.querySelectorAll("a").length,
      forms: document.forms.length,
    }));
    results[label] = { http: response?.status() || 0, browserErrors, badResponses, ...health };
    if (viewport.name === "1440" || viewport.name === "390") {
      await page.screenshot({ path: `${screenshotDir}/${label}-${viewport.name}-top.png` });
      await page.screenshot({ path: `${screenshotDir}/${label}-${viewport.name}-full.png`, fullPage: true });
    }
    await context.close();
  }

  for (const field of ["title", "h1", "text", "scrollWidth", "height", "sections", "links", "forms"]) {
    if (JSON.stringify(results.live[field]) !== JSON.stringify(results.local[field])) {
      failures.push(`homepage ${viewport.name} field ${field} differs`);
    }
  }
  for (const label of ["live", "local"]) {
    const result = results[label];
    if (result.http !== 200) failures.push(`homepage ${viewport.name} ${label} returned ${result.http}`);
    if (result.scrollWidth > result.viewportWidth + 1) failures.push(`homepage ${viewport.name} ${label} has horizontal overflow`);
    if (result.browserErrors.length) failures.push(`homepage ${viewport.name} ${label} has ${result.browserErrors.length} browser errors`);
    if (result.badResponses.length) failures.push(`homepage ${viewport.name} ${label} has ${result.badResponses.length} bad responses`);
  }
}

await browser.close();
console.log(`sitemap_routes=${routes.length}`);
console.log(`homepage_viewports=${viewports.length}`);
console.log(`failures=${failures.length}`);
if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log("LIVE_PARITY=PASS");
