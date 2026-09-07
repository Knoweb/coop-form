const fs = require('fs');
const content = fs.readFileSync('frontend/src/forms/form5b.jsx', 'utf8');
// Show the full tbody section to understand hardcoded rows
const tableIdx = content.indexOf('<tbody>');
console.log(content.substring(tableIdx, tableIdx + 3000));
