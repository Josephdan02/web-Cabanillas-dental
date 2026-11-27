import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

const comps = [
  { name: 'Navbar', fn: 'function dd(' },
  { name: 'Hero', fn: 'function hd(' },
  { name: 'About', fn: 'function em(' },
  { name: 'Benefits', fn: 'function rm(' },
  { name: 'Treatments', fn: 'function am(' },
  { name: 'Tech', fn: 'function um(' },
  { name: 'Multimedia', fn: 'function fm(' },
  { name: 'Environments', fn: 'function pm(' },
  { name: 'Team', fn: 'function hm(' },
  { name: 'Contact', fn: 'function gm(' },
  { name: 'Footer', fn: 'function _m(' },
  { name: 'Floating', fn: 'function ym(' }
];

for (let i = 0; i < comps.length; i++) {
  const c = comps[i];
  const start = code.lastIndexOf(c.fn);
  // find next top-level function or return
  // or next component's start
  let end;
  if (i < comps.length - 1) {
    // next component start or intermediate helper
    // let's inspect where the next component or next function starts
    const nextFn = comps[i + 1].fn;
    const nextStart = code.lastIndexOf(nextFn);
    end = nextStart;
  } else {
    end = code.indexOf('function bm(', start);
    if (end === -1) end = start + 5000;
  }
  const chunk = code.slice(start, end);
  fs.writeFileSync(`orig_${c.name}.js`, chunk);
  console.log(`Wrote orig_${c.name}.js (${chunk.length} bytes)`);
}
