const fs = require('fs');
const content = fs.readFileSync('frontend/src/forms/form5b.jsx', 'utf8');
console.log('Length:', content.length);
// Find the table/preview section
const previewIdx = content.indexOf('Preview');
const tableIdx = content.indexOf('<tbody>');
const mapIdx = content.indexOf('.map(');
console.log('Preview at:', previewIdx);
console.log('tbody at:', tableIdx);
console.log('map at:', mapIdx);
// Show the table/map section
if (tableIdx > -1) {
    console.log('\n--- tbody section ---');
    console.log(content.substring(tableIdx, tableIdx + 1200));
}
