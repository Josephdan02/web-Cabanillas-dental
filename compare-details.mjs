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

async function compareSectionDetails(id, selector) {
  const ctxOrig = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const pageOrig = await ctxOrig.newPage();
  await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });

  const ctxReact = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const pageReact = await ctxReact.newPage();
  await pageReact.goto("http://localhost:4174", { waitUntil: "networkidle" });

  console.log(`\n=================== DETAIL COMPARISON: #${id} ===================`);

  const dumpOrig = await pageOrig.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    return {
      innerHTML: el.innerHTML.slice(0, 500),
      text: el.innerText.slice(0, 300),
      images: Array.from(el.querySelectorAll("img")).map(i => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt"), w: i.clientWidth, h: i.clientHeight })),
      headings: Array.from(el.querySelectorAll("h1, h2, h3, h4")).map(h => ({
        tag: h.tagName,
        text: h.innerText.trim(),
        color: window.getComputedStyle(h).color,
        font: window.getComputedStyle(h).font,
        weight: window.getComputedStyle(h).fontWeight,
        size: window.getComputedStyle(h).fontSize
      })),
      buttons: Array.from(el.querySelectorAll("button, a.btn, a[href^='#'], a[href*='wa.me']")).map(b => ({
        tag: b.tagName,
        text: b.innerText.trim(),
        href: b.getAttribute("href"),
        class: b.className
      }))
    };
  }, selector);

  const dumpReact = await pageReact.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    return {
      innerHTML: el.innerHTML.slice(0, 500),
      text: el.innerText.slice(0, 300),
      images: Array.from(el.querySelectorAll("img")).map(i => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt"), w: i.clientWidth, h: i.clientHeight })),
      headings: Array.from(el.querySelectorAll("h1, h2, h3, h4")).map(h => ({
        tag: h.tagName,
        text: h.innerText.trim(),
        color: window.getComputedStyle(h).color,
        font: window.getComputedStyle(h).font,
        weight: window.getComputedStyle(h).fontWeight,
        size: window.getComputedStyle(h).fontSize
      })),
      buttons: Array.from(el.querySelectorAll("button, a.btn, a[href^='#'], a[href*='wa.me']")).map(b => ({
        tag: b.tagName,
        text: b.innerText.trim(),
        href: b.getAttribute("href"),
        class: b.className
      }))
    };
  }, selector);

  console.log("HEADINGS ORIG:", JSON.stringify(dumpOrig?.headings, null, 2));
  console.log("HEADINGS REACT:", JSON.stringify(dumpReact?.headings, null, 2));
  console.log("IMAGES ORIG:", JSON.stringify(dumpOrig?.images, null, 2));
  console.log("IMAGES REACT:", JSON.stringify(dumpReact?.images, null, 2));
  console.log("BUTTONS ORIG count:", dumpOrig?.buttons?.length, dumpOrig?.buttons?.map(b => b.text));
  console.log("BUTTONS REACT count:", dumpReact?.buttons?.length, dumpReact?.buttons?.map(b => b.text));

  await ctxOrig.close();
  await ctxReact.close();
}

for (const sec of ["tratamientos", "ambientes", "equipo", "multimedia", "tecnologia", "contacto", "footer"]) {
  await compareSectionDetails(sec, sec === "footer" ? "footer" : `#${sec}`);
}

await browser.close();
