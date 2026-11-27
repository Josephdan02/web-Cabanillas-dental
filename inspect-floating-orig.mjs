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

const floatings = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll("body > *"));
  return all.map(el => ({
    tag: el.tagName,
    id: el.id,
    className: el.className,
    style: el.getAttribute("style"),
    pos: window.getComputedStyle(el).position,
    zIndex: window.getComputedStyle(el).zIndex
  })).filter(x => x.pos === "fixed" || x.pos === "absolute" || x.tag === "A" || x.tag === "BUTTON" || x.id.includes("btn") || x.className.includes("float") || x.className.includes("chat"));
});

console.log("Floating / Fixed elements in Root of DOM (Orig):", floatings);

const allWa = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("a[href*='wa.me'], a[href*='whatsapp']")).map(a => ({
    href: a.href,
    className: a.className,
    parent: a.parentElement?.tagName + "." + a.parentElement?.className,
    pos: window.getComputedStyle(a).position,
    text: a.innerText.trim(),
    html: a.outerHTML.slice(0, 300)
  }));
});
console.log("WhatsApp links in Orig:", allWa);

await browser.close();
