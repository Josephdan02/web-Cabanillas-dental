import fs from 'fs';

const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find all functions returning section or common elements
const sections = ['inicio', 'about', 'tratamientos', 'tecnologia', 'multimedia', 'ambientes', 'equipo', 'contacto'];

for (const id of sections) {
  const idx = code.indexOf(`id:\`${id}\``);
  if (idx !== -1) {
    // Look backwards for function start
    const fnIdx = code.lastIndexOf('function ', idx);
    const fnName = code.slice(fnIdx + 9, code.indexOf('(', fnIdx));
    console.log(`Section "${id}" is in function: ${fnName} at pos ${fnIdx}`);
  } else {
    console.log(`Section "${id}" NOT found with id:\`${id}\``);
  }
}
