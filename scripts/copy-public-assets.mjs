import { cp } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { cmsDirectories, isPublishedAsset } from "./static-assets.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = resolve(repositoryRoot, "dist");

for (const directory of cmsDirectories) {
  await cp(resolve(repositoryRoot, directory), resolve(outputDirectory, directory), {
    recursive: true,
    filter: (source) => isPublishedAsset(relative(repositoryRoot, source).split(sep).join("/")),
  });
}

console.log("Se copiaron los recursos y el contenido del CMS a dist/.");
