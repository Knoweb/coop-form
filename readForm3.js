const fs = require('fs');
console.log(fs.readFileSync('frontend/src/forms/form3.jsx', 'utf8').substring(0, 1000));
