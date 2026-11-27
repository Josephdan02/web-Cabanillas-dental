import fs from 'fs';

const origAbout = fs.readFileSync('orig-AboutSection.js', 'utf8');
console.log('ORIG ABOUT:');
console.log(origAbout.slice(0, 3000));
