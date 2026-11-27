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

await origPage.goto("http://localhost:4173", { waitUntil: "networkidle" });

const sections = await origPage.evaluate(() => {
  return Array.from(document.querySelectorAll("#root > *")).map(el => ({
    tag: el.tagName,
    id: el.id,
    className: el.className,
    children: Array.from(el.children).map(c => ({ tag: c.tagName, id: c.id, className: c.className })),
    textSnippet: el.innerText ? el.innerText.slice(0, 60).replace(/\n/g, " ") : ""
  }));
});

console.log("Original #root children:", JSON.stringify(sections, null, 2));

await browser.close();
