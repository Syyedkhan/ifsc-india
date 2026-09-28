const fs = require('fs');
const path = require('path');

const BANK_FOLDER = './by-bank';
const OUTPUT = './micr-index.json';

const micrIndex = {};

const files = fs.readdirSync(BANK_FOLDER)
  .filter(f => f.endsWith('.json'));

console.log(`Found ${files.length} bank files`);

for (const file of files) {

  const filePath = path.join(BANK_FOLDER, file);

  const data = JSON.parse(
    fs.readFileSync(filePath, 'utf8')
  );

  for (const ifsc in data) {

    const micr = data[ifsc].MICR;

    if (micr && micr !== '' && micr !== '-') {
      micrIndex[micr] = ifsc;
    }

  }

}

fs.writeFileSync(
  OUTPUT,
  JSON.stringify(micrIndex, null, 2)
);

console.log(
  `✅ Generated ${Object.keys(micrIndex).length} MICR entries`
);