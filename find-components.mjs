import fs from 'fs';

const js = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find all component function names rendered in main App:
// Let's find where App or main layout is
const mainSections = ['nosotros', 'beneficios', 'tratamientos', 'tecnologia', 'multimedia', 'ambientes', 'equipo', 'contacto'];

for (const sec of mainSections) {
  let idx = 0;
  while ((idx = js.indexOf(`id:\`${sec}\``, idx)) !== -1) {
    console.log(`Found section id:${sec} at index ${idx}`);
    // find surrounding function
    const fnStart = js.lastIndexOf('function ', idx);
    console.log(`  Function starts at ${fnStart}, snippet:`, js.slice(fnStart, fnStart + 40));
    idx += sec.length + 10;
  }
}
