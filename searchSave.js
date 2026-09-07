const fs = require('fs');
const files = [
  'Form15C.jsx',
  'Form16AStoreLedger.jsx',
  'Form16BGoodsReceipt.jsx',
  'Form16DDailyPurchases.jsx',
  'Form17SpoilagePriceChange.jsx',
  'Form19GoodsReturn.jsx' // Note: the user mentioned 18, but it might not exist. I'll search the directory for anything with 18.
];

const allFiles = fs.readdirSync('frontend/src/forms').filter(f => f.startsWith('Form') || f.startsWith('form'));

allFiles.forEach(file => {
    if (file.toLowerCase().includes('15c') || 
        file.toLowerCase().includes('16a') || 
        file.toLowerCase().includes('16b') || 
        file.toLowerCase().includes('16d') || 
        file.toLowerCase().includes('17') || 
        file.toLowerCase().includes('18') || 
        file.toLowerCase().includes('19')) {
        const content = fs.readFileSync(`frontend/src/forms/${file}`, 'utf8');
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes('Save') && lines[i].includes('<button')) {
                console.log(`${file}:${i+1} : ${lines[i].trim()}`);
            }
        }
    }
});
