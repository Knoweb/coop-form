const fs = require('fs');
const content = fs.readFileSync('frontend/src/forms/form3.jsx', 'utf8');
// Check if Input Form Section was removed or still exists
const hasInputSection = content.includes('Input Form Section');
const hasPreviewSection = content.includes('Preview Section');
const hasClearForm = content.includes('Clear Form');
const hasDisplayRecordsMap = content.includes('displayRecords.map');
console.log('Has Input Form Section:', hasInputSection);
console.log('Has Preview Section:', hasPreviewSection);
console.log('Has Clear Form button:', hasClearForm);
console.log('Has displayRecords.map:', hasDisplayRecordsMap);

// Find what sections exist
const returnIndex = content.indexOf('return (');
const jsxPart = content.substring(returnIndex);
// Find all {/* */ } comments
const commentMatches = jsxPart.match(/\{\/\*[^*]*\*\/\}/g);
console.log('\nJSX Comments found:', commentMatches);
