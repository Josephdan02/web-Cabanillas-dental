import fs from 'fs';
const code = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find boundaries of functions
const list = [
  { name: 'Navbar (dd)', start: 325199 },
  { name: 'Hero (hd)', start: 329207 },
  { name: 'About (em)', start: 431909 },
  { name: 'Benefits (rm)', start: 435265 },
  { name: 'Treatments (am)', start: 440411 },
  { name: 'Tech (um)', start: 452461 },
  { name: 'Multimedia (fm)', start: 459048 },
  { name: 'Environments (pm)', start: 464455 },
  { name: 'Team (hm)', start: 468495 },
  { name: 'Contact (gm)', start: 476442 },
  { name: 'Footer (_m)', start: 482428 },
  { name: 'Floating (ym)', start: 485823 },
];

for (let i = 0; i < list.length; i++) {
  const item = list[i];
  const nextStart = i < list.length - 1 ? list[i+1].start : 490000;
  const body = code.slice(item.start, nextStart);
  fs.writeFileSync(`extracted_${item.name.replace(/[^a-zA-Z]/g, '_')}.js`, body);
  console.log(`Saved ${item.name}, len: ${body.length}`);
}
