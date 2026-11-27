import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find the main App component or router or where hd, em, um, fm, gm are called
const mainFuncs = ['hd', 'em', 'um', 'fm', 'gm'];

for (const fn of mainFuncs) {
  // search for (0,V.jsx)(fn,
  const pattern = `jsx)(${fn}`;
  let pos = 0;
  while ((pos = code.indexOf(pattern, pos)) !== -1) {
    console.log(`Called ${fn} at ${pos}: ${code.slice(pos - 100, pos + 200)}`);
    pos += pattern.length;
  }
}
