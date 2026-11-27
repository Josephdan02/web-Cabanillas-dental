import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { normalizeClinic, normalizeTreatments, normalizeVideos } from "../shared/content-schema.js";
import { buildRobotsTxt, buildSitemapXml, SITE_CANONICAL_URL } from "../shared/site-config.js";
import { buildSeoModel } from "../shared/seo.js";
import { cmsDirectories, isPublishedAsset } from "./static-assets.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = resolve(repositoryRoot, "dist");

async function digest(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex");
}

async function checkStaticFiles(sourceDirectory, destinationDirectory, prefix = "") {
  for (const entry of await readdir(sourceDirectory, { withFileTypes: true })) {
    const relativePath = prefix + entry.name;
    if (!isPublishedAsset(relativePath)) continue;

    const source = resolve(sourceDirectory, entry.name);
    const destination = resolve(destinationDirectory, entry.name);
    if (entry.isDirectory()) {
      await checkStaticFiles(source, destination, relativePath + "/");
    } else {
      assert.equal(await digest(destination), await digest(source), relativePath);
    }
  }
}

await checkStaticFiles(resolve(repositoryRoot, "public"), outputDirectory);
for (const directory of cmsDirectories) {
  await checkStaticFiles(
    resolve(repositoryRoot, directory),
    resolve(outputDirectory, directory),
    directory + "/",
  );
}

const home = await readFile(resolve(outputDirectory, "index.html"), "utf8");
assert.match(home, /rel="canonical"/);
assert.match(home, /href="\/styles\/index\.css"/);
assert.doesNotMatch(home, /\/(?:src\/site\/main\.jsx|assets\/index-)/);

// Los metadatos iniciales deben reflejar el contenido vigente del CMS.
const clinic = normalizeClinic(
  JSON.parse(await readFile(resolve(repositoryRoot, "content/clinic.json"), "utf8"))
).value;
const treatments = normalizeTreatments(
  JSON.parse(await readFile(resolve(repositoryRoot, "content/treatments.json"), "utf8"))
).items;
const videos = normalizeVideos(
  JSON.parse(await readFile(resolve(repositoryRoot, "content/videos.json"), "utf8"))
).items;
const expectedTitle = clinic.seo.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
assert.match(home, new RegExp(`<title>${expectedTitle}</title>`));
assert.match(home, /property="og:title"/);
assert.match(home, /name="twitter:card"/);
assert.match(home, /application\/ld\+json/);
assert.equal(home.match(/<link\s+[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1], SITE_CANONICAL_URL);
assert.equal(home.match(/<meta\s+[^>]*property="og:url"[^>]*content="([^"]+)"/i)?.[1], SITE_CANONICAL_URL);
const sourceHtml = await readFile(resolve(repositoryRoot, "index.html"), "utf8");
assert.doesNotMatch(sourceHtml, /(?:https?:)?\/\/dentalcabanillas\.com/i, "El dominio no debe duplicarse en index.html fuente.");
const jsonLdMatch = home.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
assert.ok(jsonLdMatch, "Falta el JSON-LD del HTML inicial.");
const jsonLd = JSON.parse(jsonLdMatch[1]);
const seoModel = buildSeoModel(clinic, treatments);
assert.equal(jsonLd.url, SITE_CANONICAL_URL, "El JSON-LD debe usar el dominio técnico central.");
assert.equal(jsonLd["@id"], `${SITE_CANONICAL_URL}#clinic`);
assert.equal(jsonLd.image, seoModel.ogImage, "La imagen JSON-LD debe coincidir con Open Graph.");
assert.equal(jsonLd.logo, seoModel.logo, "El logo JSON-LD debe derivarse del modelo SEO.");
assert.equal(home.match(/<meta\s+[^>]*property="og:image"[^>]*content="([^"]+)"/i)?.[1], seoModel.ogImage);
assert.equal(home.match(/<meta\s+[^>]*property="og:image:secure_url"[^>]*content="([^"]+)"/i)?.[1], seoModel.ogImage);
assert.equal(home.match(/<meta\s+[^>]*name="twitter:image"[^>]*content="([^"]+)"/i)?.[1], seoModel.ogImage);

if (treatments.length === 0) {
  assert.doesNotMatch(home, /"hasOfferCatalog"/, "No debe publicarse un catálogo de tratamientos vacío.");
} else {
  // Todos los tratamientos publicados en el JSON aparecen en los datos estructurados.
  const published = (jsonLd.hasOfferCatalog?.itemListElement || []).map((entry) => entry.itemOffered.name);
  assert.deepEqual(published, treatments.map((item) => item.name));
}

for (const required of [
  "content/clinic.json",
  "content/treatments.json",
  "content/professionals.json",
  "content/gallery.json",
  "content/videos.json",
  "content/assistant-faqs.json",
  "admin/index.html",
  "admin/config.yml",
  "shared/content-schema.js",
  "shared/seo.js",
  "assistant/assistant.js",
  "assistant/content-loader.js",
  "assistant/clinic-data.js"
]) {
  await access(resolve(outputDirectory, required));
}

for (const video of videos) {
  for (const assetPath of [video.videoUrl, video.thumbnail]) {
    if (assetPath.startsWith("/")) {
      await access(resolve(outputDirectory, assetPath.slice(1)));
    }
  }
}

const sitemap = await readFile(resolve(outputDirectory, "sitemap.xml"), "utf8");
assert.equal(sitemap, buildSitemapXml(), "El sitemap debe generarse desde la configuración única de dominio.");
assert.ok(sitemap.includes(`<loc>${SITE_CANONICAL_URL}</loc>`));
assert.doesNotMatch(sitemap, /admin|cms-preview/);

const robots = await readFile(resolve(outputDirectory, "robots.txt"), "utf8");
assert.equal(robots, buildRobotsTxt(), "robots.txt debe generarse desde la configuración única de dominio.");
assert.match(robots, /Disallow: \/admin\//);
assert.match(robots, /Disallow: \/cms-preview\//);

const preview = await readFile(resolve(outputDirectory, "cms-preview/index.html"), "utf8");
assert.match(preview, /\/app-assets\/[^"]+\.css/);
assert.match(preview, /noindex/i);
assert.doesNotMatch(preview, /\/src\/cms-preview\/main\.jsx/);

const admin = await readFile(resolve(outputDirectory, "admin/index.html"), "utf8");
assert.match(admin, /noindex/i);

for (const html of [home, preview]) {
  const scripts = [...html.matchAll(/src="(\/app-assets\/[^"]+\.js)"/g)];
  assert.ok(scripts.length, "Falta el JavaScript compilado de una página.");
  for (const [, script] of scripts) {
    await access(resolve(outputDirectory, script.slice(1)));
  }
}

// El HTML inicial debe conservar el punto de montaje de la SPA y su script:
// sin esto la página devuelve 200 pero React nunca arranca.
assert.match(home, /<div id="root"><\/div>/, "Falta el contenedor #root de la portada.");
assert.match(home, /<script type="module"[^>]*src="\/app-assets\/site-[^"]+\.js"/, "Falta el bundle de la portada.");

for (const excluded of ["assets/uploads", ".git", "node_modules", "src"]) {
  await assert.rejects(access(resolve(outputDirectory, excluded)), { code: "ENOENT" });
}

console.log("Verificados la portada, la vista CMS y los archivos estáticos de dist/.");
