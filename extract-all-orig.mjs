import fs from 'fs';

const js = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Let's dump dd (325199), hd (329207), em (431909), next function after em (probably benefits), am (440411), um (452461), fm (459048), pm (464455), hm (468495), gm (476442), _m (482428)
const fns = [
  { name: 'Navbar_or_Floating', pos: 325199 },
  { name: 'HeroSection', pos: 329207 },
  { name: 'AboutSection', pos: 431909 },
  { name: 'TreatmentsSection', pos: 440411 },
  { name: 'TechSection', pos: 452461 },
  { name: 'MultimediaSection', pos: 459048 },
  { name: 'AmbientesSection', pos: 464455 },
  { name: 'TeamSection', pos: 468495 },
  { name: 'ContactSection', pos: 476442 },
  { name: 'FooterSection', pos: 482428 },
];

for (let i = 0; i < fns.length; i++) {
  const item = fns[i];
  const nextPos = (i < fns.length - 1 && fns[i + 1].pos > item.pos) ? fns[i + 1].pos : item.pos + 12000;
  // find actual end or next function
  fs.writeFileSync(`orig-${item.name}.js`, js.slice(item.pos, nextPos));
  console.log(`Saved orig-${item.name}.js (length: ${nextPos - item.pos})`);
}

// Let's find benefits: between 431909 and 440411
const between = js.slice(431909, 440411);
const fnsBetween = [];
let fIdx = 0;
while ((fIdx = between.indexOf('function ', fIdx)) !== -1) {
  fnsBetween.push({ idx: 431909 + fIdx, snippet: between.slice(fIdx, fIdx + 40) });
  fIdx += 10;
}
console.log('Functions between about and treatments:', fnsBetween);
if (fnsBetween.length > 1) {
  fs.writeFileSync('orig-BenefitsSection.js', js.slice(fnsBetween[1].idx, 440411));
  console.log('Saved orig-BenefitsSection.js');
}
