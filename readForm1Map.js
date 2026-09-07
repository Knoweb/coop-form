const fs = require('fs');
const content = fs.readFileSync('frontend/src/forms/form1.jsx', 'utf8');
// Show the area around processedRecords.map  
const mapIdx = content.indexOf('processedRecords.map');
console.log(content.substring(mapIdx, mapIdx + 1500));
