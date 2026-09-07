const fs = require('fs');

// Function to convert static table to dynamic editable table
function convertForm(filename, arrayName, emptyRowObject) {
    let content = fs.readFileSync(filename, 'utf8');

    // 1. Add Plus icon import if missing
    if (!content.includes('Plus ')) {
        content = content.replace(/(import {[^}]+)( } from 'lucide-react';)/, '$1, Plus$2');
    }

    // 2. Replace static array with useState
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
        
        // 3. Inject Add Row button after </table>
        const buttonHtml = `
                <button onClick={addRow} className="mt-4 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                    <Plus className="w-4 h-4" /> Add Row
                </button>
        `;
        content = content.replace('</table>', '</table>' + buttonHtml);

        // 4. Make all <td> inside map() use inputs
        // This is tricky using regex, we have to carefully wrap {row.prop} with <input>
        // Find the map block
        // We will just replace `{row.prop}` with `<input type="text" value={row.prop || ''} onChange={(e) => handleTableChange(idx, 'prop', e.target.value)} className="w-full bg-transparent outline-none focus:bg-white text-inherit font-inherit text-center px-1" />`
        
        content = content.replace(/\{row\.([a-zA-Z0-9_]+)\}/g, (match, prop) => {
            return `<input type="text" value={row.${prop} || ''} onChange={(e) => handleTableChange(idx, '${prop}', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-center px-1" />`;
        });
        
        // Also handle cases like `{row.qty || "1"}` if they exist
        content = content.replace(/\{row\.([a-zA-Z0-9_]+)\s*\|\|\s*["']([^"']+)["']\}/g, (match, prop, def) => {
            return `<input type="text" value={row.${prop} || "${def}"} onChange={(e) => handleTableChange(idx, '${prop}', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-center px-1" />`;
        });

        fs.writeFileSync(filename, content);
        console.log(`${filename} updated successfully.`);
    } else {
        console.log(`Array ${arrayName} not found in ${filename}`);
    }
}

convertForm('frontend/src/forms/form5m.jsx', 'tableData', '{ memberNo: "", qty: "", valRs: "", valCts: "", adv: "", fert: "", loan: "", int: "" }');
convertForm('frontend/src/forms/form6.jsx', 'tableData', '{ chqDate: "", chqNo: "", payee: "", maxRs: "", maxCts: "", amtRs: "", amtCts: "", invNo: "" }');

