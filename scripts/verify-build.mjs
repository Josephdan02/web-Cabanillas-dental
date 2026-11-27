import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { access, readFile, readdir } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
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
assert.match(home, /Dental Cabanillas \| Clínica Dental en Huánuco/);
assert.match(home, /rel="canonical"/);
assert.match(home, /href="\/styles\/index\.css"/);
assert.doesNotMatch(home, /\/(?:src\/site\/main\.jsx|assets\/index-)/);

const preview = await readFile(resolve(outputDirectory, "cms-preview/index.html"), "utf8");
assert.match(preview, /\/app-assets\/[^"]+\.css/);
assert.doesNotMatch(preview, /\/src\/cms-preview\/main\.jsx/);

for (const html of [home, preview]) {
  const scripts = [...html.matchAll(/src="(\/app-assets\/[^"]+\.js)"/g)];
  assert.ok(scripts.length, "Falta el JavaScript compilado de una página.");
  for (const [, script] of scripts) {
    await access(resolve(outputDirectory, script.slice(1)));
  }
}

for (const excluded of ["assets/uploads", ".git", "node_modules", "src"]) {
  await assert.rejects(access(resolve(outputDirectory, excluded)), { code: "ENOENT" });
}

console.log("Verificados la portada, la vista CMS y los archivos estáticos de dist/.");
