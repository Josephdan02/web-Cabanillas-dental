import fs from 'fs';

const js = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');
const fns = ['dd', 'hd', 'em', 'rm', 'am', 'um', 'fm', 'pm', 'hm', 'gm', '_m', 'ym'];

for (const fn of fns) {
  const target = `function ${fn}(`;
  const idx = js.lastIndexOf(target);
  if (idx !== -1) {
    console.log(`=== ${fn} at ${idx} ===`);
    console.log(js.slice(idx, idx + 350));
    console.log('\n--------------------\n');
  }
}
