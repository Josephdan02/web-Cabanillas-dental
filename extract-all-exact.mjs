import fs from 'fs';

const origJs = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find all component functions and their definitions
// In bm():
// children:[(0,V.jsx)(dd,{}),(0,V.jsx)(hd,{}),(0,V.jsx)(em,{}),(0,V.jsx)(rm,{}),(0,V.jsx)(am,{}),(0,V.jsx)(um,{}),(0,V.jsx)(fm,{}),(0,V.jsx)(pm,{}),(0,V.jsx)(hm,{}),(0,V.jsx)(gm,{}),(0,V.jsx)(_m,{}),(0,V.jsx)(ym,{})]

// Let's locate the full code for:
// dd: navbar
// hd: hero
// em: about
// rm: benefits
// am: treatments
// um: technology
// fm: multimedia
// pm: ambientes
// hm: team
// gm: contact
// _m: footer
// ym: floating

// Also find any helper functions/components used by them!
// e.g. cm (used in um), etc.

console.log('Finding all component positions...');
const names = ['dd', 'hd', 'em', 'rm', 'am', 'um', 'fm', 'pm', 'hm', 'gm', '_m', 'ym'];

for (const name of names) {
  const p1 = origJs.indexOf(`function ${name}(`);
  console.log(`Function ${name}: ${p1}`);
}
