import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

// Find patchright
const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const VIEWPORTS = [
  { name: "desktop", width: 1366, height: 768 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "small_mobile", width: 320, height: 720 }
];

const SECTIONS = [
  "inicio",
  "about",
  "tratamientos",
  "tecnologia",
  "multimedia",
  "ambientes",
  "equipo",
  "contacto"
];

const browser = await chromium.launch({ headless: true });

for (const vp of VIEWPORTS) {
  console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
  const ctxOrig = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const pageOrig = await ctxOrig.newPage();
  await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });

  const ctxReact = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const pageReact = await ctxReact.newPage();
  await pageReact.goto("http://localhost:4174", { waitUntil: "networkidle" });

  // Compare section metrics
  for (const sec of SECTIONS) {
    const boxOrig = await pageOrig.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        top: r.top + window.scrollY,
        height: r.height,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        backgroundColor: style.backgroundColor
      };
    }, sec);

    const boxReact = await pageReact.evaluate((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        top: r.top + window.scrollY,
        height: r.height,
        paddingTop: style.paddingTop,
        paddingBottom: style.paddingBottom,
        paddingLeft: style.paddingLeft,
        paddingRight: style.paddingRight,
        backgroundColor: style.backgroundColor
      };
    }, sec);

    console.log(`[${sec}] Orig: H=${boxOrig?.height?.toFixed(0)} P=${boxOrig?.paddingTop}/${boxOrig?.paddingBottom} | React: H=${boxReact?.height?.toFixed(0)} P=${boxReact?.paddingTop}/${boxReact?.paddingBottom}`);
  }

  // Check horizontal overflow
  const overflowOrig = await pageOrig.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  const overflowReact = await pageReact.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log(`Overflow: Orig=${overflowOrig}, React=${overflowReact}`);

  await ctxOrig.close();
  await ctxReact.close();
}

await browser.close();
