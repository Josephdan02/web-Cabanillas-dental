import { readdirSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

mkdirSync("screenshots/comparison", { recursive: true });

const browser = await chromium.launch({ headless: true });

async function takeSectionScreenshots(sections, prefix = "initial") {
  const pageOrig = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pageReact = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await pageOrig.goto("http://localhost:4173", { waitUntil: "networkidle" });
  await pageReact.goto("http://localhost:4174", { waitUntil: "networkidle" });
  await pageOrig.waitForTimeout(800);
  await pageReact.waitForTimeout(800);

  // Full page screenshots
  await pageOrig.screenshot({ path: `screenshots/comparison/${prefix}_orig_full.png`, fullPage: true });
  await pageReact.screenshot({ path: `screenshots/comparison/${prefix}_react_full.png`, fullPage: true });

  for (const s of sections) {
    try {
      const elOrig = await pageOrig.$(s.orig);
      const elReact = await pageReact.$(s.react);
      if (elOrig) {
        await elOrig.screenshot({ path: `screenshots/comparison/${prefix}_orig_${s.id}.png` });
      }
      if (elReact) {
        await elReact.screenshot({ path: `screenshots/comparison/${prefix}_react_${s.id}.png` });
      }
      console.log(`Captured ${s.id}`);
    } catch (err) {
      console.error(`Error capturing ${s.id}:`, err.message);
    }
  }

  await pageOrig.close();
  await pageReact.close();
}

const sectionList = [
  { id: "header", orig: "header", react: "header" },
  { id: "hero", orig: "#inicio", react: "#inicio" },
  { id: "about", orig: "#about", react: "#about" },
  { id: "benefits", orig: "section:nth-of-type(3)", react: "section:nth-of-type(3)" },
  { id: "treatments", orig: "#tratamientos", react: "#tratamientos" },
  { id: "technology", orig: "#tecnologia", react: "#tecnologia" },
  { id: "multimedia", orig: "#multimedia", react: "#multimedia" },
  { id: "environments", orig: "#ambientes", react: "#ambientes" },
  { id: "team", orig: "#equipo", react: "#equipo" },
  { id: "contact", orig: "#contacto", react: "#contacto" },
  { id: "footer", orig: "footer", react: "footer" }
];

await takeSectionScreenshots(sectionList, "audit");
await browser.close();
console.log("Screenshots captured successfully!");
