const fs = require('fs');
const content = fs.readFileSync('frontend/src/forms/form1.jsx', 'utf8');
// Show the full file length and find key positions
console.log('Total length:', content.length);
// Find table section
const tableIdx = content.indexOf('Table Section');
const processedMapIdx = content.indexOf('processedRecords.map');
const totalsRowIdx = content.indexOf('Total Row');
console.log('Table section at:', tableIdx);
console.log('processedRecords.map at:', processedMapIdx);
console.log('Total Row at:', totalsRowIdx);
// Show the table section  
console.log('\n--- Table section (first 1500 chars) ---');
console.log(content.substring(tableIdx, tableIdx + 1500));
