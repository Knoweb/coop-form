const fs = require('fs');

// Verify all 4 forms have Plus import
['form1.jsx','form2.jsx','form3.jsx','form4.jsx'].forEach(form => {
    const content = fs.readFileSync(`frontend/src/forms/${form}`, 'utf8');
    const firstImport = content.split('\n').slice(0,3).join('\n');
    const hasPlus = content.substring(0, 200).includes('Plus');
    console.log(`${form} has Plus: ${hasPlus}`);
});
