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
const origPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const reactPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await origPage.goto("http://localhost:4173", { waitUntil: "networkidle" });
await reactPage.goto("http://localhost:4174", { waitUntil: "networkidle" });

const sections = [
  "navbar",
  "hero",
  "nosotros",
  "beneficios",
  "tratamientos",
  "ambientes",
  "equipo",
  "tecnologia",
  "multimedia",
  "contacto",
  "footer"
];

for (const sec of sections) {
  console.log(`\n================= SECTION: ${sec} =================`);
  const selector = sec === "navbar" ? "nav, header" : sec === "footer" ? "footer, #footer" : `#${sec}`;

  const origData = await origPage.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      tag: el.tagName,
      className: el.className,
      rect: { width: rect.width, height: rect.height, top: rect.top },
      padding: style.padding,
      margin: style.margin,
      bg: style.backgroundColor,
      bgImage: style.backgroundImage?.slice(0, 50),
      color: style.color,
      fontFamily: style.fontFamily
    };
  }, selector);

  const reactData = await reactPage.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    return {
      tag: el.tagName,
      className: el.className,
      rect: { width: rect.width, height: rect.height, top: rect.top },
      padding: style.padding,
      margin: style.margin,
      bg: style.backgroundColor,
      bgImage: style.backgroundImage?.slice(0, 50),
      color: style.color,
      fontFamily: style.fontFamily
    };
  }, selector);

  console.log("ORIG:", JSON.stringify(origData));
  console.log("REACT:", JSON.stringify(reactData));
}

await browser.close();
