import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

const ids = [
  'inicio',
  'about',
  'tratamientos',
  'tecnologia',
  'ambientes',
  'multimedia',
  'equipo',
  'contacto'
];

for (const id of ids) {
  const pattern = `id:\`${id}\``;
  const idx = code.indexOf(pattern);
  console.log(`=== ID: ${id} at index ${idx} ===`);
  if (idx !== -1) {
    // Print around this position
    const start = Math.max(0, idx - 200);
    const end = Math.min(code.length, idx + 400);
    console.log(code.slice(start, end));
  }
}
