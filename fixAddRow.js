const fs = require('fs');

['form1.jsx', 'form2.jsx'].forEach(form => {
    let content = fs.readFileSync(`frontend/src/forms/${form}`, 'utf8');
    content = content.replace(/setRecords\(\[\.\.\.records, \{\}\]\);/, 'setRecords([...records, { analysis: {} }]);');
    fs.writeFileSync(`frontend/src/forms/${form}`, content);
});

console.log("Form 1 and 2 addRow fixed.");
