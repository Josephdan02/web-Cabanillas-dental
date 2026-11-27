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

async function fullAudit() {
  const ctxOrig = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const pageOrig = await ctxOrig.newPage();
  await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });

  const ctxReact = await browser.newContext({ viewport: { width: 1366, height: 768 } });
  const pageReact = await ctxReact.newPage();
  await pageReact.goto("http://localhost:4174", { waitUntil: "networkidle" });

  const sections = [
    { name: "Navbar", origSel: "header", reactSel: "header" },
    { name: "Hero", origSel: "#inicio", reactSel: "#inicio" },
    { name: "Nosotros / About", origSel: "#about", reactSel: "#about" },
    { name: "Tratamientos", origSel: "#tratamientos", reactSel: "#tratamientos" },
    { name: "Tecnologia", origSel: "#tecnologia", reactSel: "#tecnologia" },
    { name: "Multimedia", origSel: "#multimedia", reactSel: "#multimedia" },
    { name: "Ambientes", origSel: "#ambientes", reactSel: "#ambientes" },
    { name: "Equipo", origSel: "#equipo", reactSel: "#equipo" },
    { name: "Contacto", origSel: "#contacto", reactSel: "#contacto" },
    { name: "Footer", origSel: "footer", reactSel: "footer" },
    { name: "Floating WhatsApp", origSel: ".floating-contact, a[href*='wa.me']", reactSel: ".floating-contact, a[href*='wa.me']" },
    { name: "Assistant", origSel: "#chat-toggle-btn, #asistente-dental-btn, .chat-widget", reactSel: "#chat-toggle-btn, #asistente-dental-btn, .chat-widget" }
  ];

  for (const sec of sections) {
    const origData = await pageOrig.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        exists: true,
        tag: el.tagName,
        classes: el.className,
        rect: { width: Math.round(rect.width), height: Math.round(rect.height), top: Math.round(rect.top) },
        styles: {
          padding: style.padding,
          margin: style.margin,
          background: style.backgroundColor,
          color: style.color,
          display: style.display
        },
        imgCount: el.querySelectorAll("img").length,
        imgs: Array.from(el.querySelectorAll("img")).map(i => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt") })),
        buttonCount: el.querySelectorAll("button, a.btn").length,
        buttons: Array.from(el.querySelectorAll("button, a.btn")).map(b => b.innerText.trim())
      };
    }, sec.origSel);

    const reactData = await pageReact.evaluate((s) => {
      const el = document.querySelector(s);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        exists: true,
        tag: el.tagName,
        classes: el.className,
        rect: { width: Math.round(rect.width), height: Math.round(rect.height), top: Math.round(rect.top) },
        styles: {
          padding: style.padding,
          margin: style.margin,
          background: style.backgroundColor,
          color: style.color,
          display: style.display
        },
        imgCount: el.querySelectorAll("img").length,
        imgs: Array.from(el.querySelectorAll("img")).map(i => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt") })),
        buttonCount: el.querySelectorAll("button, a.btn").length,
        buttons: Array.from(el.querySelectorAll("button, a.btn")).map(b => b.innerText.trim())
      };
    }, sec.reactSel);

    console.log(`\n=================== ${sec.name} ===================`);
    console.log(`Orig Exists: ${!!origData}, React Exists: ${!!reactData}`);
    if (origData && reactData) {
      console.log(`Dimensions - Orig: ${origData.rect.width}x${origData.rect.height} | React: ${reactData.rect.width}x${reactData.rect.height}`);
      console.log(`Padding - Orig: ${origData.styles.padding} | React: ${reactData.styles.padding}`);
      console.log(`Bg - Orig: ${origData.styles.background} | React: ${reactData.styles.background}`);
      console.log(`Images - Orig (${origData.imgCount}): ${JSON.stringify(origData.imgs)}`);
      console.log(`Images - React (${reactData.imgCount}): ${JSON.stringify(reactData.imgs)}`);
      console.log(`Buttons - Orig (${origData.buttonCount}): ${JSON.stringify(origData.buttons)}`);
      console.log(`Buttons - React (${reactData.buttonCount}): ${JSON.stringify(reactData.buttons)}`);
    }
  }

  await ctxOrig.close();
  await ctxReact.close();
}

await fullAudit();
await browser.close();
