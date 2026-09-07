const fs = require('fs');
const forms = ['form8.jsx', 'form9a.jsx', 'form9b.jsx', 'form7a.jsx', 'form7.jsx'];

forms.forEach(form => {
    try {
        const code = fs.readFileSync(`frontend/src/forms/${form}`, 'utf8');
        const tableDataMatch = code.match(/const (rows|tableData) = \[\s*\{([\s\S]*?)\}/);
        if(tableDataMatch) {
            console.log(`\n--- ${form} [${tableDataMatch[1]}] ---`);
            const firstRow = tableDataMatch[2];
            const cols = firstRow.split(',').map(s => s.trim().split(':')[0].trim().replace(/['"]/g, ''));
            console.log(cols.join(', '));
        } else {
            console.log(`\n--- ${form} --- No array found`);
        }
    } catch(e) {
        console.log(`Error reading ${form}`);
    }
});
