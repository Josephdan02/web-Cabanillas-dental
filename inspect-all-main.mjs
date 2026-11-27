import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const pageOrig = await browser.newPage({ viewport: { width: 1366, height: 768 } });
const pageReact = await browser.newPage({ viewport: { width: 1366, height: 768 } });

await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });
await pageReact.goto("http://localhost:4174", { waitUntil: "networkidle" });
await pageOrig.waitForTimeout(500);
await pageReact.waitForTimeout(500);

const origSections = await pageOrig.evaluate(() => {
  return Array.from(document.querySelectorAll("body > #root > div > main > *")).map((el, i) => ({
    idx: i,
    tag: el.tagName,
    id: el.id,
    className: el.className,
    childCount: el.children.length
  }));
});

const reactSections = await pageReact.evaluate(() => {
  return Array.from(document.querySelectorAll("#main-content > *")).map((el, i) => ({
    idx: i,
    tag: el.tagName,
    id: el.id,
    className: el.className,
    childCount: el.children.length
  }));
});

console.log("ORIGINAL SECTIONS IN MAIN:");
console.log(JSON.stringify(origSections, null, 2));

console.log("REACT SECTIONS IN MAIN:");
console.log(JSON.stringify(reactSections, null, 2));

await browser.close();
