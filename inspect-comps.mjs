import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

const comps = ['dd', 'hd', 'em', 'rm', 'am', 'um', 'fm', 'pm', 'hm', 'gm', '_m', 'ym'];

for (const name of comps) {
  // find where function name( is defined near the end
  let pos = code.lastIndexOf(`function ${name}(`);
  console.log(`=== Component ${name} at pos ${pos} ===`);
  console.log(code.slice(pos, pos + 400));
}
