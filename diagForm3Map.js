const fs = require('fs');

// Read form3 and form4 to understand the structure
const f3 = fs.readFileSync('frontend/src/forms/form3.jsx', 'utf8');
// Find displayRecords.map section
const mapIdx = f3.indexOf('displayRecords.map');
const inputSectionIdx = f3.indexOf('Input Form Section');
console.log('Form3 - Input Section at:', inputSectionIdx);
console.log('Form3 - displayRecords.map at:', mapIdx);
if (mapIdx > -1) {
    console.log('\n--- displayRecords.map section ---');
    console.log(f3.substring(mapIdx, mapIdx + 800));
}
