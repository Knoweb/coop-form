const fs = require('fs');
// Read form2 to understand its structure
const content = fs.readFileSync('frontend/src/forms/form2.jsx', 'utf8');
console.log('Form2 length:', content.length);
const mapIdx = content.indexOf('processedRecords.map');
console.log('processedRecords.map at:', mapIdx);
if (mapIdx > 0) {
    console.log(content.substring(mapIdx, mapIdx + 1200));
}
