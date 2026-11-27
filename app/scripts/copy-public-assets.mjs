import { cp, copyFile, mkdir, stat } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const outputDirectory = resolve(repositoryRoot, "dist");
const publicDirectories = [
  "admin",
  "content",
  "assistant",
  "enhancements",
  "assets",
  "videos",
  "video-posters"
];
const publicRootFiles = ["favicon.svg", "icons.svg", "robots.txt", "sitemap.xml"];

function shouldCopy(sourcePath) {
  const relativePath = relative(repositoryRoot, sourcePath)
    .split(sep)
    .join("/");
  const segments = relativePath.split("/");

  if (segments.some((segment) => [".git", "node_modules", "dist"].includes(segment))) {
    return false;
  }

  return relativePath !== "assets/uploads" &&
    !relativePath.startsWith("assets/uploads/");
}

await mkdir(outputDirectory, { recursive: true });

for (const directory of publicDirectories) {
  const source = resolve(repositoryRoot, directory);
  const destination = resolve(outputDirectory, directory);

  try {
    await stat(source);
  } catch (error) {
    throw new Error(`Falta el directorio público requerido: ${directory}`, { cause: error });
  }

  await cp(source, destination, {
    recursive: true,
    filter: shouldCopy
  });
}

for (const file of publicRootFiles) {
  const source = resolve(repositoryRoot, file);

  try {
    const fileInfo = await stat(source);
    if (!fileInfo.isFile()) continue;
    await mkdir(dirname(resolve(outputDirectory, file)), { recursive: true });
    await copyFile(source, resolve(outputDirectory, file));
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
}

console.log("Se copiaron los recursos públicos requeridos a dist/.");
