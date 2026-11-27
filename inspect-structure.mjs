import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });

async function inspect(url) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  const data = await page.evaluate(() => {
    const root = document.getElementById("root");
    const container = root.firstElementChild;
    const directChildren = Array.from(container.children).map(c => ({
      tag: c.tagName,
      id: c.id,
      className: c.className.slice(0, 80),
      textPreview: c.textContent.trim().slice(0, 40)
    }));
    return {
      containerClass: container ? container.className : null,
      directChildren
    };
  });
  await page.close();
  return data;
}

const orig = await inspect("http://localhost:4173");
const react = await inspect("http://localhost:4174");

console.log("ORIGINAL direct children:", JSON.stringify(orig, null, 2));
console.log("REACT direct children:", JSON.stringify(react, null, 2));

await browser.close();
