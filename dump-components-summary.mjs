import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// In App: children:[(0,V.jsx)(dd,{}),(0,V.jsx)(hd,{}),(0,V.jsx)(em,{}),(0,V.jsx)(rm,{}),(0,V.jsx)(am,{}),(0,V.jsx)(um,{}),(0,V.jsx)(fm,{}),(0,V.jsx)(pm,{}),(0,V.jsx)(hm,{}),(0,V.jsx)(gm,{}),(0,V.jsx)(_m,{}),(0,V.jsx)(ym,{})]
const componentNames = ['dd', 'hd', 'em', 'rm', 'am', 'um', 'fm', 'pm', 'hm', 'gm', '_m', 'ym'];

for (const name of componentNames) {
  // Find function name( or function name (
  const decl = `function ${name}(`;
  const idx = code.indexOf(decl);
  if (idx !== -1) {
    // get 1200 characters from function declaration
    console.log(`\n================== FUNCTION ${name} (at ${idx}) ==================`);
    console.log(code.slice(idx, idx + 1500));
  } else {
    console.log(`Function ${name} not found!`);
  }
}
