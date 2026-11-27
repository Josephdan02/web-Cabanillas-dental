import fs from 'fs';

const origJs = fs.readFileSync('assets/index-DmrMvi00.js', 'utf8');

// Find the module where all assets/images/data are declared
// In index-DmrMvi00.js, search for the image imports
const imagesMatch = origJs.slice(0, 50000);
fs.writeFileSync('orig_head.js', imagesMatch);

// Let's find definitions of variables used in sections:
// like ud (nav links), ld (logo), etc.
console.log('Searching for ud, ld and other vars...');
const ldMatch = origJs.match(/([a-zA-Z0-9_$]+)="\/?assets\/logo[^"]*"/);
console.log('ld:', ldMatch ? ldMatch[0] : 'not found');

// Let's find all asset paths:
const assets = origJs.match(/"\/assets\/[^"]+"|assets\/[^"]+/g);
console.log('Unique assets:', new Set(assets));
