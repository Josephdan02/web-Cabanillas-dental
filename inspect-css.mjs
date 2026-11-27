import { readFileSync } from "fs";

const origCss = readFileSync("assets/index-hSQERdm5.css", "utf8");
const reactCss = readFileSync("app/src/styles/global.css", "utf8");
console.log("Orig CSS length:", origCss.length);
console.log("React CSS length:", reactCss.length);

const fontFamilies = [...origCss.matchAll(/font-family:[^;}]+/g)].map(m => m[0]);
console.log("Unique font-families in Orig CSS:", [...new Set(fontFamilies)]);

const colors = [...origCss.matchAll(/--color-[^:]+:[^;}]+/g)].map(m => m[0]);
console.log("Color vars in Orig CSS:", [...new Set(colors)].slice(0, 20));
