import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

// Find patchright
const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1366, height: 768 } });
await page.goto("http://localhost:4173", { waitUntil: "networkidle" });

const sections = ["#inicio", "#about", "#tratamientos", "#tecnologia", "#multimedia", "#ambientes", "#equipo", "#contacto", "footer"];

for (const sec of sections) {
  const outer = await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    // return outer HTML truncated or clean structure
    return {
      tag: el.tagName,
      id: el.id,
      className: el.className,
      htmlSnippet: el.outerHTML.slice(0, 2000)
    };
  }, sec);
  console.log(`\n=================== ${sec} ===================`);
  console.log("Class:", outer?.className);
  console.log("Snippet:", outer?.htmlSnippet.slice(0, 1000));
}

await browser.close();
