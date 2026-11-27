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

const origInfo = await page.evaluate(() => {
  const root = document.getElementById("root");
  return {
    rootHTML: root.outerHTML.slice(0, 500),
    topLevelChildren: Array.from(root.children).map(c => ({
      tag: c.tagName,
      id: c.id,
      className: c.className
    }))
  };
});

console.log("Original info:", JSON.stringify(origInfo, null, 2));

await browser.close();
