import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildRobotsTxt, buildSitemapXml } from "../shared/site-config.js";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const outputDirectory = resolve(repositoryRoot, "dist");

await mkdir(outputDirectory, { recursive: true });
await Promise.all([
  writeFile(resolve(outputDirectory, "robots.txt"), buildRobotsTxt(), "utf8"),
  writeFile(resolve(outputDirectory, "sitemap.xml"), buildSitemapXml(), "utf8")
]);

console.log("Se generaron robots.txt y sitemap.xml desde shared/site-config.js.");
