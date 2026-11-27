import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

mkdirSync("screenshots", { recursive: true });

const SECTIONS = [
  { id: "inicio", name: "01_hero" },
  { id: "about", name: "02_about" },
  { id: "tratamientos", name: "04_tratamientos" },
  { id: "tecnologia", name: "05_tecnologia" },
  { id: "multimedia", name: "06_multimedia" },
  { id: "ambientes", name: "07_ambientes" },
  { id: "equipo", name: "08_equipo" },
  { id: "contacto", name: "09_contacto" }
];

const browser = await chromium.launch({ headless: true });

async function capture(url, prefix, vp) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
  const page = ctx.newPage ? await ctx.newPage() : (await ctx.pages())[0];
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1000); // allow animations/fonts to settle

  // Full page
  await page.screenshot({ path: `screenshots/${prefix}_${vp.name}_full.png`, fullPage: true });

  // Each section
  for (const sec of SECTIONS) {
    const el = await page.$(`#${sec.id}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      await el.screenshot({ path: `screenshots/${prefix}_${vp.name}_${sec.name}.png` });
    }
  }

  // Footer & navbar
  const footer = await page.$("footer");
  if (footer) {
    await footer.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await footer.screenshot({ path: `screenshots/${prefix}_${vp.name}_10_footer.png` });
  }

  const header = await page.$("header");
  if (header) {
    await header.screenshot({ path: `screenshots/${prefix}_${vp.name}_11_navbar.png` });
  }

  await ctx.close();
}

console.log("Capturing desktop (1366x768)...");
await capture("http://localhost:4173", "orig", { name: "desktop", width: 1366, height: 768 });
await capture("http://localhost:4174", "react", { name: "desktop", width: 1366, height: 768 });

console.log("Capturing mobile (390x844)...");
await capture("http://localhost:4173", "orig", { name: "mobile", width: 390, height: 844 });
await capture("http://localhost:4174", "react", { name: "mobile", width: 390, height: 844 });

await browser.close();
console.log("Screenshots captured successfully!");
