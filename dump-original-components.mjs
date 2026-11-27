import fs from 'fs';

const js = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Function names and their approximate positions
const fns = [
  { name: 'Navbar (dd)', start: 325199, end: 329207 },
  { name: 'Hero (hd)', start: 329207, end: 335000 },
  { name: 'Nosotros (em)', start: 431909, end: 435265 },
  { name: 'Beneficios (rm)', start: 435265, end: 440411 },
  { name: 'Tratamientos (am)', start: 440411, end: 452461 },
  { name: 'Tecnología (um)', start: 452461, end: 459048 },
  { name: 'Multimedia (fm)', start: 459048, end: 464455 },
  { name: 'Ambientes (pm)', start: 464455, end: 468495 },
  { name: 'Equipo (hm)', start: 468495, end: 476442 },
  { name: 'Contacto (gm)', start: 476442, end: 482428 },
  { name: 'Footer (_m)', start: 482428, end: 485823 },
  { name: 'Floating (ym)', start: 485823, end: 490000 },
];

for (const fn of fns) {
  fs.writeFileSync(`temp_${fn.name.split(' ')[0]}.js`, js.slice(fn.start, fn.end));
}

console.log('Saved component snippets');
