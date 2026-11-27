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
await page.goto("http://localhost:4174", { waitUntil: "networkidle" });
await page.waitForTimeout(1000);

const reactSections = await page.evaluate(() => {
  const main = document.getElementById("main-content");
  return Array.from(main.children).map((c, idx) => ({
    index: idx,
    tag: c.tagName,
    id: c.id,
    className: c.className,
    headingText: c.querySelector("h1, h2, h3") ? c.querySelector("h1, h2, h3").textContent.trim() : null
  }));
});

console.log("React sections breakdown:", JSON.stringify(reactSections, null, 2));
await browser.close();
