import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find navbar function: dd at 145612 was some react-dom internal or something? Let's check where dd is defined before 488185
// In App: (0,V.jsx)(dd,{})
// Let's search backwards from 488185 for function dd
let lastFuncDd = code.lastIndexOf('function dd(', 488185);
console.log('function dd index:', lastFuncDd);
if (lastFuncDd !== -1) {
  console.log(code.slice(lastFuncDd, lastFuncDd + 1000));
} else {
  // maybe const dd = or dd=
  let pos = code.indexOf('dd=');
  console.log('dd= at:', pos);
}
