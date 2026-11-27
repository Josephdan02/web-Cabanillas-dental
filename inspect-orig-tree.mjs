import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const pageOrig = await browser.newPage();
await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });

const tree = await pageOrig.evaluate(() => {
  function summarize(el, depth = 0) {
    if (depth > 3) return null;
    const res = {
      tag: el.tagName,
      id: el.id || undefined,
      class: el.className || undefined,
    };
    if (el.children && el.children.length > 0) {
      res.children = Array.from(el.children).map(c => summarize(c, depth + 1)).filter(Boolean);
    }
    return res;
  }
  return summarize(document.getElementById("root"));
});

console.log(JSON.stringify(tree, null, 2));
await browser.close();
