import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Let's see bm function in detail
let bmPos = code.indexOf('function bm(');
console.log(code.slice(bmPos, bmPos + 2500));
