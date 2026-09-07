const fs = require('fs');
const content = fs.readFileSync('frontend/src/forms/form2.jsx', 'utf8');
const mapIdx = content.indexOf('processedRecords.map');
console.log(content.substring(mapIdx, mapIdx + 2500));
