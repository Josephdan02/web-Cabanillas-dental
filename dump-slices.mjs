import fs from 'fs';

const origJs = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

const slices = [
  { name: 'Navbar_dd', start: 145612, end: 149000 },
  { name: 'Hero_hd', start: 329207, end: 334000 },
  { name: 'About_em', start: 431909, end: 435265 },
  { name: 'Benefits_rm', start: 435265, end: 440411 },
  { name: 'Treatments_am', start: 440411, end: 452461 },
  { name: 'Technology_um', start: 452461, end: 459048 },
  { name: 'Multimedia_fm', start: 459048, end: 464455 },
  { name: 'Ambientes_pm', start: 464455, end: 468495 },
  { name: 'Team_hm', start: 468495, end: 476442 },
  { name: 'Contact_gm', start: 476442, end: 482428 },
  { name: 'Footer__m', start: 482428, end: 485823 },
  { name: 'Floating_ym', start: 485823, end: 488000 }
];

for (const s of slices) {
  fs.writeFileSync(`extracted_${s.name}.js`, origJs.slice(s.start, s.end));
}
console.log('Saved all slices');
