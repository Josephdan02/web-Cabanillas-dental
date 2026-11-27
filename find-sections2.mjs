import fs from 'fs';

const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

const terms = [
  'inicio', 'about', 'nosotros', 'tratamientos', 'tecnologia',
  'multimedia', 'ambientes', 'equipo', 'contacto', 'footer', 'nav', 'whatsapp'
];

for (const t of terms) {
  let pos = 0;
  const matches = [];
  while ((pos = code.indexOf(t, pos)) !== -1) {
    // Check if it's near id:`...` or id:"..."
    const snippet = code.slice(Math.max(0, pos - 15), Math.min(code.length, pos + 25));
    if (snippet.includes('id:') || snippet.includes('id=')) {
      matches.push({ pos, snippet });
    }
    pos += t.length;
  }
  console.log(`Term: ${t}, id matches:`, matches);
}
