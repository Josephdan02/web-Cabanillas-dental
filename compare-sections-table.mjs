import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const origPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const reactPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await origPage.goto("http://localhost:4173", { waitUntil: "networkidle" });
await reactPage.goto("http://localhost:4174", { waitUntil: "networkidle" });

const getStructure = async (page) => {
  return await page.evaluate(() => {
    const rootChild = document.querySelector("#root > div");
    if (!rootChild) return [];
    return Array.from(rootChild.children).map((el, i) => ({
      index: i,
      tag: el.tagName,
      id: el.id,
      className: el.className,
      rect: {
        width: Math.round(el.getBoundingClientRect().width),
        height: Math.round(el.getBoundingClientRect().height),
        top: Math.round(el.getBoundingClientRect().top + window.scrollY)
      },
      textSnippet: el.innerText ? el.innerText.slice(0, 40).replace(/\n/g, " ") : ""
    }));
  });
};

const orig = await getStructure(origPage);
const react = await getStructure(reactPage);

console.log("=== ORIGINAL SECTIONS ===");
console.table(orig);

console.log("=== REACT SECTIONS ===");
console.table(react);

await browser.close();
