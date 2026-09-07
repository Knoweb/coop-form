const fs = require('fs');

// =================== FORM 1 ===================
let form1 = fs.readFileSync('frontend/src/forms/form1.jsx', 'utf8');

// 1. Add Plus to import
form1 = form1.replace(
    "import { PlusCircle, FileText, DollarSign, Calendar, List, Tag, Save, LayoutList, User } from 'lucide-react';",
    "import { PlusCircle, FileText, DollarSign, Calendar, List, Tag, Save, LayoutList, User, Plus } from 'lucide-react';"
);

// 2. Remove the Form Section (keep Table Section)
form1 = form1.replace(
    /\{\/\* Form Section \*\/\}[\s\S]*?\{\/\* Table Section \*\/\}/,
    '{/* Table Section */}'
);

// 3. Add handleTableChange + addRow after the useState declarations
// Insert after the totals calculation block, before the return
const addRowLogic = `
  const handleTableChange = (index, field, value) => {
    const newRecs = [...records];
    if (!newRecs[index].analysis) newRecs[index].analysis = {};
    if (['Transport','Stationery','Postage','Meals','Other'].includes(field)) {
      newRecs[index].analysis[field] = value;
    } else {
      newRecs[index][field] = value;
      if (field === 'amountReceived') newRecs[index].amountReceived = value;
      if (field === 'amountPaid') newRecs[index].amountPaid = value;
    }
    setRecords(newRecs);
  };

  const addRow = () => {
    setRecords(prev => [...prev, {
      id: Date.now(),
      date: '', name: '', description: '', voucherNo: '',
      amountReceived: '', amountPaid: '', ledgerFolio: '',
      analysis: { Transport: '', Stationery: '', Postage: '', Meals: '', Other: '' }
    }]);
  };

`;

form1 = form1.replace('  return (', addRowLogic + '  return (');

// 4. Replace static cell content with inputs
form1 = form1.replace(
    /\{record\.date\}/g,
    '<input type="date" value={record.date || ""} onChange={(e) => handleTableChange(idx, "date", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1" />'
);
form1 = form1.replace(
    />\{record\.name\}<\/td>/g,
    '><input type="text" value={record.name || ""} onChange={(e) => handleTableChange(idx, "name", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1" /></td>'
);
form1 = form1.replace(
    />\{record\.description\}<\/td>/g,
    '><input type="text" value={record.description || ""} onChange={(e) => handleTableChange(idx, "description", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1" /></td>'
);
form1 = form1.replace(
    /\{record\.voucherNo \|\| '-'\}/g,
    '<input type="text" value={record.voucherNo || ""} onChange={(e) => handleTableChange(idx, "voucherNo", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-center" />'
);
form1 = form1.replace(
    /\{record\.received > 0 \? record\.received\.toFixed\(2\) : '-'\}/g,
    '<input type="number" value={record.amountReceived || ""} onChange={(e) => handleTableChange(idx, "amountReceived", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-right" />'
);
form1 = form1.replace(
    /\{record\.paid > 0 \? record\.paid\.toFixed\(2\) : '-'\}/g,
    '<input type="number" value={record.amountPaid || ""} onChange={(e) => handleTableChange(idx, "amountPaid", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-right" />'
);
form1 = form1.replace(
    /\{record\.ledgerFolio \|\| '-'\}/g,
    '<input type="text" value={record.ledgerFolio || ""} onChange={(e) => handleTableChange(idx, "ledgerFolio", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-center" />'
);
form1 = form1.replace(
    /\{record\.analysis\[cat\.key\] \? parseFloat\(record\.analysis\[cat\.key\]\)\.toFixed\(2\) : '-'\}/g,
    '<input type="number" value={record.analysis?.[cat.key] || ""} onChange={(e) => handleTableChange(idx, cat.key, e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-xs px-1 text-right" />'
);

// The balance field is calculated, leave it as computed (toFixed)  
// But balance.toFixed(2) inside a <td> — keep it read-only showing computed value
// Nothing to replace there since it uses record.balance.toFixed(2) which is from processedRecords

// 5. Add Add Row button before the closing </div> of the table container
form1 = form1.replace(
    '</table>',
    `</table>
              <button onClick={addRow} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                <Plus className="w-4 h-4" /> Add Row
              </button>`
);

// 6. Remove unused handleSubmit & fetchRecords that will cause errors
form1 = form1.replace(/const fetchRecords = async \(\) => \{[\s\S]*?\};\s*\n\s*useEffect/, 'const fetchRecords = () => {};\n  useEffect');

fs.writeFileSync('frontend/src/forms/form1.jsx', form1);
console.log('form1.jsx updated');
