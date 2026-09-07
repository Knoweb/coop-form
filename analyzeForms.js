const fs = require('fs');

const forms = ['form5m.jsx', 'form6.jsx', 'form7.jsx', 'form7a.jsx', 'form8.jsx', 'form9a.jsx', 'form9b.jsx'];

forms.forEach(form => {
    const code = fs.readFileSync(`frontend/src/forms/${form}`, 'utf8');
    const tableDataMatch = code.match(/const tableData = \[\s*\{([\s\S]*?)\}/);
    if(tableDataMatch) {
        console.log(`\n--- ${form} columns ---`);
        const firstRow = tableDataMatch[1];
        const cols = firstRow.split(',').map(s => s.trim().split(':')[0]);
        console.log(cols.join(', '));
    }
});
