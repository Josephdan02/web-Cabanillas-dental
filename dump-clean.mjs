import fs from 'fs';

const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Function markers
const markers = [
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

for (const m of markers) {
  const start = code.lastIndexOf(m.fn);
  // find matching closing brace or next function
  const nextFn = code.indexOf('function ', start + m.fn.length);
  const chunk = code.slice(start, nextFn !== -1 ? nextFn : start + 10000);
  fs.writeFileSync(`component_${m.name}.js`, chunk);
  console.log(`Saved component_${m.name}.js (${chunk.length} chars)`);
}
