import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const pageOrig = await browser.newPage({ viewport: { width: 1366, height: 768 } });
await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });

const pageReact = await browser.newPage({ viewport: { width: 1366, height: 768 } });
await pageReact.goto("http://localhost:4174", { waitUntil: "networkidle" });

const selectors = [
  { name: "Navbar Header", orig: "header", react: "header" },
  { name: "Hero Section", orig: "#inicio", react: "#inicio" },
  { name: "About Section", orig: "#about", react: "#about" },
  { name: "Benefits Section", orig: "section:nth-of-type(3)", react: "section:nth-of-type(3)" },
  { name: "Treatments Section", orig: "#tratamientos", react: "#tratamientos" },
  { name: "Technology Section", orig: "#tecnologia", react: "#tecnologia" },
  { name: "Multimedia Section", orig: "#multimedia", react: "#multimedia" },
  { name: "Environments Section", orig: "#ambientes", react: "#ambientes" },
  { name: "Team Section", orig: "#equipo", react: "#equipo" },
  { name: "Contact Section", orig: "#contacto", react: "#contacto" },
  { name: "Footer", orig: "footer", react: "footer" },
  { name: "Floating Elements", orig: "#root > div > div.fixed", react: "#root > div > div.fixed" }
];

async function inspectElement(page, sel) {
  return await page.evaluate((s) => {
    const el = document.querySelector(s);
    if (!el) return null;
    const style = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    
    // find buttons
    const buttons = Array.from(el.querySelectorAll("button, a[href^='#'], a[href*='wa.me'], a.btn, a[class*='rounded']")).map(b => ({
      tag: b.tagName,
      text: b.innerText.trim().slice(0, 30),
      className: b.className,
      rect: { w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height) },
      style: {
        fontSize: window.getComputedStyle(b).fontSize,
        padding: `${window.getComputedStyle(b).paddingTop} ${window.getComputedStyle(b).paddingRight} ${window.getComputedStyle(b).paddingBottom} ${window.getComputedStyle(b).paddingLeft}`,
        bg: window.getComputedStyle(b).backgroundColor,
        borderRadius: window.getComputedStyle(b).borderRadius
      }
    }));

    // find images
    const images = Array.from(el.querySelectorAll("img")).map(img => ({
      src: img.getAttribute("src"),
      alt: img.getAttribute("alt"),
      className: img.className,
      rect: { w: Math.round(img.getBoundingClientRect().width), h: Math.round(img.getBoundingClientRect().height) },
      natural: { w: img.naturalWidth, h: img.naturalHeight },
      objectFit: window.getComputedStyle(img).objectFit
    }));

    // headings
    const headings = Array.from(el.querySelectorAll("h1, h2, h3")).map(h => ({
      tag: h.tagName,
      text: h.innerText.trim().slice(0, 40),
      font: `${window.getComputedStyle(h).fontSize} / ${window.getComputedStyle(h).fontWeight} / ${window.getComputedStyle(h).fontFamily.split(',')[0]}`,
      color: window.getComputedStyle(h).color
    }));

    return {
      tagName: el.tagName,
      id: el.id,
      className: el.className,
      rect: { w: Math.round(rect.width), h: Math.round(rect.height) },
      padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`,
      margin: `${style.marginTop} ${style.marginRight} ${style.marginBottom} ${style.marginLeft}`,
      bg: style.backgroundColor,
      buttons,
      images,
      headings
    };
  }, sel);
}

for (const sec of selectors) {
  console.log(`\n================================================================`);
  console.log(` AUDIT SECTION: ${sec.name}`);
  console.log(`================================================================`);
  const dataOrig = await inspectElement(pageOrig, sec.orig);
  const dataReact = await inspectElement(pageReact, sec.react);

  if (!dataOrig || !dataReact) {
    console.log(`MISSING: Orig=${!!dataOrig}, React=${!!dataReact}`);
    continue;
  }

  console.log(`Class:\n  ORIG:  ${dataOrig.className}\n  REACT: ${dataReact.className}`);
  console.log(`Dimension: ORIG=${dataOrig.rect.w}x${dataOrig.rect.h} | REACT=${dataReact.rect.w}x${dataReact.rect.h} (Diff H: ${dataReact.rect.h - dataOrig.rect.h}px)`);
  console.log(`Padding:   ORIG=${dataOrig.padding} | REACT=${dataReact.padding}`);

  // Compare images
  console.log(`-- IMAGES (Orig: ${dataOrig.images.length}, React: ${dataReact.images.length}) --`);
  const maxImg = Math.max(dataOrig.images.length, dataReact.images.length);
  for (let i = 0; i < maxImg; i++) {
    const o = dataOrig.images[i];
    const r = dataReact.images[i];
    if (o && r) {
      const matchSrc = o.src === r.src || o.src?.split('/').pop() === r.src?.split('/').pop();
      console.log(`  [${i}] Src match: ${matchSrc ? "YES" : "NO (" + o.src?.split('/').pop() + " vs " + r.src?.split('/').pop() + ")"} | Orig size: ${o.rect.w}x${o.rect.h} (${o.objectFit}) | React size: ${r.rect.w}x${r.rect.h} (${r.objectFit})`);
    } else if (o) {
      console.log(`  [${i}] ONLY IN ORIG: ${o.src}`);
    } else {
      console.log(`  [${i}] ONLY IN REACT: ${r.src}`);
    }
  }

  // Compare headings
  console.log(`-- HEADINGS (Orig: ${dataOrig.headings.length}, React: ${dataReact.headings.length}) --`);
  dataOrig.headings.forEach((h, i) => {
    const r = dataReact.headings[i];
    if (r) {
      console.log(`  [${i}] ${h.tag} "${h.text}" | Orig font: ${h.font} | React font: ${r.font}`);
    } else {
      console.log(`  [${i}] ${h.tag} "${h.text}" (Only in Orig)`);
    }
  });

  // Compare buttons
  console.log(`-- BUTTONS (Orig: ${dataOrig.buttons.length}, React: ${dataReact.buttons.length}) --`);
  const maxBtn = Math.max(dataOrig.buttons.length, dataReact.buttons.length);
  for (let i = 0; i < maxBtn; i++) {
    const o = dataOrig.buttons[i];
    const r = dataReact.buttons[i];
    if (o && r) {
      console.log(`  [${i}] "${o.text}" vs "${r.text}" | Orig pad: ${o.style.padding} (${o.rect.w}x${o.rect.h}) | React pad: ${r.style.padding} (${r.rect.w}x${r.rect.h})`);
    } else if (o) {
      console.log(`  [${i}] ONLY ORIG: "${o.text}"`);
    } else {
      console.log(`  [${i}] ONLY REACT: "${r.text}"`);
    }
  }
}

await browser.close();
