const fs = require('fs');

// For Form 3 and 4, the approach is:
// 1. Remove the {/* Input Form Section */} block entirely
// 2. Replace the displayRecords.map cells with inputs
// 3. Add the handleTableChange function
// 4. Add Add Row button

function processForm3or4(filename) {
    let content = fs.readFileSync(filename, 'utf8');

    // Add Plus import
    content = content.replace(
        /import \{ ([^}]+) \} from 'lucide-react';/,
        (m, icons) => {
            if (!icons.includes('Plus')) {
                return `import { ${icons}, Plus } from 'lucide-react';`;
            }
            return m;
        }
    );

    // Remove the Input Form Section
    // It starts with {/* Input Form Section */} and ends before {/* Form Container */} or {/* Preview Section */}
    content = content.replace(
        /\{\/\* Input Form Section \*\/\}[\s\S]*?(?=\{\/\* Form Container|{\/\* Preview)/,
        ''
    );

    // Add handleTableChange + addRow before return
    const tableChangeLogic = `
  const handleTableChange = (index, field, value) => {
    const newRecs = [...records];
    newRecs[index][field] = value;
    setRecords(newRecs);
  };

  const addRow = () => {
    setRecords(prev => [...prev, { date: "", description: "", billNo: "", rs: "", cts: "" }]);
  };

`;
    content = content.replace('  return (', tableChangeLogic + '  return (');

    // Replace displayRecords.map cells with inputs
    content = content.replace(
        />\{rec\.date\}<\/td>/g,
        '><input type="date" value={rec.date || ""} onChange={(e) => handleTableChange(idx, "date", e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm text-center px-1" /></td>'
    );
    content = content.replace(
        />\{rec\.description\}<\/td>/g,
        '><input type="text" value={rec.description || ""} onChange={(e) => handleTableChange(idx, "description", e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm px-1" /></td>'
    );
    content = content.replace(
        />\{rec\.billNo\}<\/td>/g,
        '><input type="text" value={rec.billNo || ""} onChange={(e) => handleTableChange(idx, "billNo", e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm text-center px-1" /></td>'
    );
    content = content.replace(
        />\{rec\.rs\}<\/td>/g,
        '><input type="number" value={rec.rs || ""} onChange={(e) => handleTableChange(idx, "rs", e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 font-mono font-bold text-lg text-right px-1" /></td>'
    );
    content = content.replace(
        />\{rec\.cts\}<\/td>/g,
        '><input type="number" value={rec.cts || ""} onChange={(e) => handleTableChange(idx, "cts", e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 font-mono font-bold text-lg text-center px-1" /></td>'
    );

    // Remove the duplicate old addRecord function (since we have handleTableChange now)
    // Keep the existing addRecord as addRow reference  
    content = content.replace(
        /const addRecord = \(\) => \{[\s\S]*?\};\s*\n/,
        ''
    );
    content = content.replace(
        /const removeRecord = \(index\) => \{[\s\S]*?\};\s*\n/,
        ''
    );
    
    // Replace addRecord button with addRow
    content = content.replace('onClick={addRecord}', 'onClick={addRow}');

    // Add Add Row button
    content = content.replace(
        '</table>',
        `</table>
              <button onClick={addRow} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                <Plus className="w-4 h-4" /> Add Row
              </button>`
    );

    fs.writeFileSync(filename, content);
    console.log(`${filename} updated.`);
}

processForm3or4('frontend/src/forms/form3.jsx');
processForm3or4('frontend/src/forms/form4.jsx');
