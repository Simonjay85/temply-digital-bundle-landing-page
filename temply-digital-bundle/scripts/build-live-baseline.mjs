#!/usr/bin/env node
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const baseline = path.join(root, "live-baseline");
const dist = path.join(root, "dist");
const worker = path.join(root, "worker", "index.js");
const hosting = path.join(root, ".openai", "hosting.json");
const baselineIndex = path.join(baseline, "index.html");

for (const file of [baselineIndex, worker, hosting]) {
  if (!existsSync(file)) {
    throw new Error(`Missing canonical DaisyLexi build input: ${file}`);
  }
}

const html = readFileSync(baselineIndex, "utf8");
if (!html.includes("DaisyLexi — Performance Marketing, SEO & AI Growth Systems")) {
  throw new Error("Refusing to build: live-baseline/index.html is not the approved DaisyLexi baseline.");
}
if (html.includes("Study Success Bundle — Temply Studio")) {
  throw new Error("Refusing to build: legacy Temply Studio markup was detected in the DaisyLexi baseline.");
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(path.join(dist, "client"), { recursive: true });
cpSync(baseline, path.join(dist, "client"), { recursive: true });

mkdirSync(path.join(dist, "server"), { recursive: true });
mkdirSync(path.join(dist, ".openai"), { recursive: true });
copyFileSync(worker, path.join(dist, "server", "index.js"));
copyFileSync(hosting, path.join(dist, ".openai", "hosting.json"));

console.log("Built canonical DaisyLexi baseline into dist/client.");
