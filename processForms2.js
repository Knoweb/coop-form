const fs = require('fs');

function convertForm(filename, arrayName, emptyRowObject) {
    let content = fs.readFileSync(filename, 'utf8');

    if (!content.includes('Plus ')) {
        content = content.replace(/(import {[^}]+)( } from 'lucide-react';)/, '$1, Plus$2');
    }

    const regexArray = new RegExp(`const ${arrayName} = \\s*\\[([\\s\\S]*?)\\];`);
    const match = content.match(regexArray);
    
    if (match) {
        const initialState = `[\n${match[1]}\n    ]`;
        
        const stateLogic = `
    const [${arrayName}, set${arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}] = useState(${initialState});

    const handleTableChange = (index, field, value) => {
        const newData = [...${arrayName}];
        newData[index][field] = value;
        set${arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}(newData);
    };

    const addRow = () => {
        set${arrayName.charAt(0).toUpperCase() + arrayName.slice(1)}([...${arrayName}, ${emptyRowObject}]);
    };
`;
        content = content.replace(regexArray, stateLogic);
        
        const buttonHtml = `
                <button onClick={addRow} className="mt-4 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                    <Plus className="w-4 h-4" /> Add Row
                </button>
        `;
        content = content.replace('</table>', '</table>' + buttonHtml);

        // Form 8 & 7a specific replace because their properties are inside {} 
        content = content.replace(/\{row\.([a-zA-Z0-9_]+)\}/g, (match, prop) => {
            if(prop === 'id' || prop === 'name' || prop === 'vNo' || prop === 'cNo' || prop === 'desc') {
                 return `<input type="text" value={row.${prop} || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, '${prop}', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-center px-1" />`;
            }
            return `<input type="text" value={row.${prop} || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, '${prop}', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" />`;
        });
        
        // Also map uses `(row) =>` instead of `(row, idx) =>` so let's fix that
        content = content.replace(/\(row\) => \(/g, '(row, idx) => (');

        fs.writeFileSync(filename, content);
        console.log(`${filename} updated successfully.`);
    } else {
        console.log(`Array ${arrayName} not found in ${filename}`);
    }
}

convertForm('frontend/src/forms/form8.jsx', 'rows', '{ id: rows.length + 1, vNo: "", cNo: "", desc: "", lf1: "", b1: "", "400.00": "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" }');
convertForm('frontend/src/forms/form7a.jsx', 'rows', '{ id: rows.length + 1, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" }');

