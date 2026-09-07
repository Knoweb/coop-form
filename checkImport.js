const fs = require('fs');
const content = fs.readFileSync('frontend/src/forms/form2.jsx', 'utf8');
const firstLine = content.split('\n').slice(0, 3).join('\n');
console.log('First 3 lines:\n', firstLine);
