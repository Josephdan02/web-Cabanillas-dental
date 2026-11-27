import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find all occurrences of id:" or id:' or id:`
const regex = /id:["'`][a-zA-Z0-9_-]+["'`]/g;
let m;
const ids = new Set();
while ((m = regex.exec(code)) !== null) {
  ids.add(m[0]);
}
console.log('IDs found in bundle:', Array.from(ids));
