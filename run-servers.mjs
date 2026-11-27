import { createStaticServer } from "./serve-helper.mjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const serverOrig = await createStaticServer(root, 4173);
const serverReact = await createStaticServer(path.join(root, "dist"), 4174);

console.log("Both servers ready: Original on 4173, React on 4174");
