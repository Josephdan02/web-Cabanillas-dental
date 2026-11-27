import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });

async function auditSection(sectionSelectorOrig, sectionSelectorReact, name) {
  const pageOrig = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageReact = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });
  await pageReact.goto("http://localhost:4174", { waitUntil: "networkidle" });
  await pageOrig.waitForTimeout(500);
  await pageReact.waitForTimeout(500);

  const origData = await pageOrig.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const images = Array.from(el.querySelectorAll("img")).map(img => ({
      src: img.getAttribute("src"),
      alt: img.alt,
      width: img.offsetWidth,
      height: img.offsetHeight
    }));
    const buttons = Array.from(el.querySelectorAll("button, a")).map(b => ({
      text: b.textContent.trim().replace(/\s+/g, ' '),
      tag: b.tagName,
      href: b.getAttribute("href"),
      className: b.className
    }));
    return {
      tagName: el.tagName,
      className: el.className,
      rect: { width: rect.width, height: rect.height, top: rect.top },
      bg: style.backgroundColor,
      color: style.color,
      padding: style.padding,
      imageCount: images.length,
      images,
      buttonsCount: buttons.length,
      buttons
    };
  }, sectionSelectorOrig);

  const reactData = await pageReact.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const images = Array.from(el.querySelectorAll("img")).map(img => ({
      src: img.getAttribute("src"),
      alt: img.alt,
      width: img.offsetWidth,
      height: img.offsetHeight
    }));
    const buttons = Array.from(el.querySelectorAll("button, a")).map(b => ({
      text: b.textContent.trim().replace(/\s+/g, ' '),
      tag: b.tagName,
      href: b.getAttribute("href"),
      className: b.className
    }));
    return {
      tagName: el.tagName,
      className: el.className,
      rect: { width: rect.width, height: rect.height, top: rect.top },
      bg: style.backgroundColor,
      color: style.color,
      padding: style.padding,
      imageCount: images.length,
      images,
      buttonsCount: buttons.length,
      buttons
    };
  }, sectionSelectorReact);

  await pageOrig.close();
  await pageReact.close();

  return { name, origData, reactData };
}

const sections = [
  { name: "Navbar/Header", orig: "header", react: "header" },
  { name: "Hero", orig: "#inicio", react: "#inicio" },
  { name: "About / Nosotros", orig: "#about", react: "#about" },
  { name: "Benefits", orig: "section:nth-of-type(3)", react: ".benefits-section" },
  { name: "Tratamientos", orig: "#tratamientos", react: "#tratamientos" },
  { name: "Tecnologia", orig: "#tecnologia", react: "#tecnologia" },
  { name: "Multimedia / Videos", orig: "#multimedia", react: "#multimedia" },
  { name: "Ambientes", orig: "#ambientes", react: "#ambientes" },
  { name: "Equipo", orig: "#equipo", react: "#equipo" },
  { name: "Contacto", orig: "#contacto", react: "#contacto" },
  { name: "Footer", orig: "footer", react: "footer" },
  { name: "Floating Elements", orig: "#root > div > div:last-child", react: ".floating-buttons, .fixed.bottom-6" }
];

for (const s of sections) {
  const res = await auditSection(s.orig, s.react, s.name);
  console.log(`=== Section: ${s.name} ===`);
  if (!res.origData) console.log("  ORIGINAL: NOT FOUND with selector " + s.orig);
  if (!res.reactData) console.log("  REACT: NOT FOUND with selector " + s.react);
  if (res.origData && res.reactData) {
    console.log(`  Height: Orig=${res.origData.rect.height}px, React=${res.reactData.rect.height}px (Diff: ${Math.round(res.reactData.rect.height - res.origData.rect.height)}px)`);
    console.log(`  Padding: Orig=${res.origData.padding} | React=${res.reactData.padding}`);
    console.log(`  Images: Orig=${res.origData.imageCount} | React=${res.reactData.imageCount}`);
    if (res.origData.imageCount !== res.reactData.imageCount) {
      console.log("   Orig images:", res.origData.images.map(i => i.src));
      console.log("   React images:", res.reactData.images.map(i => i.src));
    }
    console.log(`  Buttons/Links: Orig=${res.origData.buttonsCount} | React=${res.reactData.buttonsCount}`);
  }
}

await browser.close();
