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

const origFixed = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll("*"));
  return all
    .filter(el => {
      const pos = window.getComputedStyle(el).position;
      return pos === "fixed" || pos === "sticky";
    })
    .map(el => ({
      tagName: el.tagName,
      id: el.id,
      className: el.className,
      text: el.textContent.trim().slice(0, 60),
      html: el.outerHTML.slice(0, 200)
    }));
});

console.log("Original fixed/sticky elements:", JSON.stringify(origFixed, null, 2));
await browser.close();
