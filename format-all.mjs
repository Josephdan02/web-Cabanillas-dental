import fs from 'fs';

const files = [
  'component_Navbar.js',
  'component_Hero.js',
  'component_About.js',
  'component_Benefits.js',
  'component_Treatments.js',
  'component_Tech.js',
  'component_Multimedia.js',
  'component_Ambientes.js',
  'component_Team.js',
  'component_Contact.js',
  'component_Footer.js',
  'component_Floating.js'
];

for (const f of files) {
  if (!fs.existsSync(f)) continue;
  let code = fs.readFileSync(f, 'utf8');
  // Simple beautify
  let indent = 0;
  let out = '';
  for (let i = 0; i < code.length; i++) {
    const ch = code[i];
    if (ch === '{' || ch === '[') {
      indent++;
      out += ch + '\n' + '  '.repeat(indent);
    } else if (ch === '}' || ch === ']') {
      indent = Math.max(0, indent - 1);
      out += '\n' + '  '.repeat(indent) + ch;
    } else if (ch === ';') {
      out += ch + '\n' + '  '.repeat(indent);
    } else if (ch === ',' && indent > 0) {
      out += ch + '\n' + '  '.repeat(indent);
    } else {
      out += ch;
    }
  }
  fs.writeFileSync(f.replace('.js', '.formatted.js'), out);
}
console.log('Formatted components written.');
