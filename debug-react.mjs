import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const reactPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await reactPage.goto("http://localhost:4174", { waitUntil: "networkidle" });

const html = await reactPage.evaluate(() => {
  return {
    rootHTML: document.getElementById("root")?.innerHTML?.slice(0, 500),
    bodyHTML: document.body.innerHTML?.slice(0, 500)
  };
});

console.log(html);

await browser.close();
