import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const origSections = await page.evaluate(() => {
  const root = document.getElementById("root");
  const container = root.firstElementChild;
  return Array.from(container.children).map((c, idx) => ({
    index: idx,
    tag: c.tagName,
    id: c.id,
    className: c.className,
    headingText: c.querySelector("h1, h2, h3") ? c.querySelector("h1, h2, h3").textContent.trim() : null
  }));
});

console.log("Original sections breakdown:", JSON.stringify(origSections, null, 2));
await browser.close();
