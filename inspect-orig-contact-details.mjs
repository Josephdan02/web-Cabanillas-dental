import { readdirSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import { createRequire } from "node:module";

const base = join(homedir(), ".vscode/extensions");
const ext = readdirSync(base).filter(d => d.startsWith("danielsanmedium.dscodegpt-")).pop();
const patchrightPath = join(base, ext, "standalone/node_modules/patchright");
const { chromium } = createRequire(import.meta.url)(patchrightPath);

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:4173", { waitUntil: "networkidle" });

const origContact = await page.evaluate(() => {
  const div = document.querySelector(".fixed.bottom-6.right-6");
  const dcbMenu = document.querySelector("#dcb-ui-menu-root");
  return {
    contactButtonWrapper: div ? div.outerHTML : null,
    dcbMenu: dcbMenu ? dcbMenu.outerHTML : null
  };
});

console.log("Original Contact Element:", origContact.contactButtonWrapper);
console.log("Original Menu Root:", origContact.dcbMenu);
await browser.close();
