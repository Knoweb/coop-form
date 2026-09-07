const fs = require('fs');

// =================== FORM 2 ===================
let form2 = fs.readFileSync('frontend/src/forms/form2.jsx', 'utf8');

// 1. Add Plus to import
form2 = form2.replace(
    /import \{ ([^}]+) \} from 'lucide-react';/,
    (m, icons) => {
        if (!icons.includes('Plus')) {
            return `import { ${icons}, Plus } from 'lucide-react';`;
        }
        return m;
    }
);

// 2. Remove the Form Section block
form2 = form2.replace(
    /\{\/\* Form Section \*\/\}[\s\S]*?\{\/\* Table Section \*\/\}/,
    '{/* Table Section */}'
);

// 3. Add handleTableChange + addRow
const addRowLogic = `
  const handleTableChange = (index, field, value) => {
    const newRecs = [...records];
    if (!newRecs[index]) newRecs[index] = {};
    if (!newRecs[index].analysis) newRecs[index].analysis = {};
    if (newRecs[index].analysis.hasOwnProperty !== undefined && Object.keys(newRecs[index].analysis || {}).length > 0 || ['Cash','Cheque','Transfer','Other'].includes(field)) {
      newRecs[index].analysis[field] = value;
    } else {
      newRecs[index][field] = value;
    }
    setRecords(newRecs);
  };

  const handleCellChange = (index, field, value) => {
    const newRecs = [...records];
    if (!newRecs[index]) newRecs[index] = {};
    newRecs[index][field] = value;
    setRecords(newRecs);
  };

  const addRow = () => {
    setRecords(prev => [...prev, {
      id: Date.now(),
      date: '', description: '', voucherNo: '',
      amountReceived: '', amountPaid: '', ledgerFolio: '',
      note: '', analysis: {}
    }]);
  };

`;

form2 = form2.replace('  return (', addRowLogic + '  return (');

// 4. Replace cells with inputs - form2 has more complex structure with rParts/pParts
// Replace {record.date}
form2 = form2.replace(
    />\{record\.date\}<\/td>/g,
    '><input type="date" value={record.date || ""} onChange={(e) => handleCellChange(index, "date", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1" /></td>'
);
form2 = form2.replace(
    />\{record\.description\}<\/td>/g,
    '><input type="text" value={record.description || ""} onChange={(e) => handleCellChange(index, "description", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1" /></td>'
);
form2 = form2.replace(
    />\{record\.voucherNo\}<\/td>/g,
    '><input type="text" value={record.voucherNo || ""} onChange={(e) => handleCellChange(index, "voucherNo", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-center" /></td>'
);
form2 = form2.replace(
    />\{record\.note\}<\/td>/g,
    '><input type="text" value={record.note || ""} onChange={(e) => handleCellChange(index, "note", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1" /></td>'
);

// Replace split cell rendering for received/paid with simple inputs
// rParts[0] and rParts[1] are calculated from record.received
// Replace those td blocks with single input
form2 = form2.replace(
    /<td className="px-1 py-2 text-xs leading-tight font-medium text-emerald-600 border border-slate-300 text-right">\{rParts\[0\]\}<\/td>\s*<td className="px-1 py-2 text-\[10px\] leading-tight font-medium text-emerald-600 border border-slate-300 text-center">\{rParts\[1\]\}<\/td>/,
    '<td colSpan="2" className="px-1 py-2 border border-slate-300"><input type="number" value={record.amountReceived || ""} onChange={(e) => handleCellChange(index, "amountReceived", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-right text-emerald-600" /></td>'
);
form2 = form2.replace(
    /<td className="px-1 py-2 text-xs leading-tight font-medium text-rose-600 border border-slate-300 text-right">\{pParts\[0\]\}<\/td>\s*<td className="px-1 py-2 text-\[10px\] leading-tight font-medium text-rose-600 border border-slate-300 text-center">\{pParts\[1\]\}<\/td>/,
    '<td colSpan="2" className="px-1 py-2 border border-slate-300"><input type="number" value={record.amountPaid || ""} onChange={(e) => handleCellChange(index, "amountPaid", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-right text-rose-600" /></td>'
);
// Analysis category cells
form2 = form2.replace(
    /\{record\.analysis && record\.analysis\[cat\] \? parseFloat\(record\.analysis\[cat\]\)\.toFixed\(2\) : ''\}/g,
    '<input type="number" value={(record.analysis && record.analysis[cat]) || ""} onChange={(e) => { const newRecs = [...records]; if(!newRecs[index].analysis) newRecs[index].analysis = {}; newRecs[index].analysis[cat] = e.target.value; setRecords(newRecs); }} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-right" />'
);

// 5. Add Add Row button
form2 = form2.replace(
    '</table>',
    `</table>
              <button onClick={addRow} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                <Plus className="w-4 h-4" /> Add Row
              </button>`
);

fs.writeFileSync('frontend/src/forms/form2.jsx', form2);
console.log('form2.jsx updated');
