import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
await page.goto("http://localhost:4173", { waitUntil: "networkidle" });

const menuRoot = await page.evaluate(() => {
  const root = document.getElementById("dcb-ui-menu-root");
  if (!root) return null;
  return {
    innerHTML: root.innerHTML,
    outerHTML: root.outerHTML
  };
});

console.log("Menu root in Orig:", menuRoot?.outerHTML?.slice(0, 1000));

await browser.close();
