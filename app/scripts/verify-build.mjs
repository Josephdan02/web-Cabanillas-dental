import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access, readFile, readdir, stat } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const outputDirectory = resolve(repositoryRoot, "dist");
const directoryTrees = [
  "admin",
  "content",
  "assistant",
  "enhancements",
  "assets",
  "videos",
  "video-posters"
];
const rootFiles = ["favicon.svg", "icons.svg", "robots.txt", "sitemap.xml"];
const expectedJsonFiles = [
  "content/clinic.json",
  "content/treatments.json",
  "content/professionals.json",
  "content/gallery.json",
  "content/assistant-faqs.json"
];
const excludedDirectories = new Set([".git", "node_modules", "dist"]);

async function listFiles(directory, relativePrefix = "") {
  const results = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const relativePath = relativePrefix
      ? `${relativePrefix}/${entry.name}`
      : entry.name;

    if (excludedDirectories.has(entry.name)) continue;
    if (relativePath === "uploads" || relativePath.startsWith("uploads/")) continue;

    const absolutePath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      results.push(...await listFiles(absolutePath, relativePath));
    } else if (entry.isFile()) {
      results.push(relativePath);
    }
  }

  return results.sort();
}

async function digest(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  return hash.digest("hex");
}

async function assertSameFile(source, destination) {
  await access(destination);
  assert.equal(
    await digest(destination),
    await digest(source),
    `El archivo se alteró al copiarlo: ${relative(repositoryRoot, source)}`
  );
}

async function assertSameTree(relativeDirectory) {
  const sourceDirectory = resolve(repositoryRoot, relativeDirectory);
  const destinationDirectory = resolve(outputDirectory, relativeDirectory);
  const sourceFiles = await listFiles(sourceDirectory);
  const destinationFiles = await listFiles(destinationDirectory);

  assert.deepEqual(
    destinationFiles,
    sourceFiles,
    `Los archivos de ${relativeDirectory}/ no coinciden con el origen.`
  );

  for (const file of sourceFiles) {
    await assertSameFile(
      resolve(sourceDirectory, file),
      resolve(destinationDirectory, file)
    );
  }
}

for (const directory of directoryTrees) {
  const directoryInfo = await stat(resolve(outputDirectory, directory));
  assert.ok(directoryInfo.isDirectory(), `Falta dist/${directory}/.`);
  await assertSameTree(directory);
  console.log(`OK dist/${directory}/: archivos conservados sin cambios.`);
}

for (const file of rootFiles) {
  const source = resolve(repositoryRoot, file);
  try {
    await access(source);
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }
  await assertSameFile(source, resolve(outputDirectory, file));
  console.log(`OK dist/${file}: conservado sin cambios.`);
}

for (const file of expectedJsonFiles) {
  await access(resolve(outputDirectory, file));
  console.log(`OK dist/${file}`);
}

const generatedHtml = await readFile(resolve(outputDirectory, "index.html"), "utf8");
assert.match(generatedHtml, /Dental Cabanillas \| Clínica Dental en Huánuco/);
assert.match(generatedHtml, /\/app-assets\/index-[^"]+\.js/);
assert.match(generatedHtml, /\/app-assets\/index-[^"]+\.css/);
assert.match(generatedHtml, /name="description"/);
assert.notEqual(
  await digest(resolve(outputDirectory, "index.html")),
  await digest(resolve(repositoryRoot, "index.html")),
  "dist/index.html no debe ser el HTML original."
);

for (const excluded of [".git", "node_modules", "dist"]) {
  try {
    await access(resolve(outputDirectory, excluded));
    assert.fail(`No se debe copiar ${excluded}/ dentro de dist/.`);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

try {
  await access(resolve(outputDirectory, "assets/uploads"));
  assert.fail("assets/uploads/ no debe copiarse a dist/.");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

console.log("OK dist/index.html corresponde a la nueva aplicación.");
console.log("OK JSON, módulos del asistente, medios y recursos SEO.");
console.log("OK assets/uploads/, .git, node_modules y dist excluidos.");
