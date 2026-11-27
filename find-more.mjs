import fs from 'fs';

const js = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find function declarations and see where Hero, Nosotros, Beneficios, Footer, Navbar are
// Let's search for "hero", "nosotros", "beneficios", "footer", "navbar"
for (const word of ['hero', 'nosotros', 'beneficios', 'footer', 'nav', 'Inicio', 'Dental Cabanillas']) {
  let idx = 0;
  let count = 0;
  while ((idx = js.indexOf(word, idx)) !== -1 && count < 5) {
    const fnStart = js.lastIndexOf('function ', idx);
    console.log(`Word "${word}" at ${idx}, fn at ${fnStart}:`, js.slice(fnStart, fnStart + 50));
    idx += word.length + 10;
    count++;
  }
}
