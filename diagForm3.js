const fs = require('fs');
// Read the full form3 content and find the return statement + JSX
const content = fs.readFileSync('frontend/src/forms/form3.jsx', 'utf8');
const returnIndex = content.indexOf('return (');
console.log('Return statement at index:', returnIndex);
console.log('\n--- First 500 chars of JSX ---');
console.log(content.substring(returnIndex, returnIndex + 500));
