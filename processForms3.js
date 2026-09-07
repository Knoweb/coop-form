const fs = require('fs');

const forms = ['form1.jsx', 'form2.jsx', 'form3.jsx', 'form4.jsx'];

forms.forEach(form => {
    let content = fs.readFileSync(`frontend/src/forms/${form}`, 'utf8');

    // 1. Remove the Form Section (from <!-- Form Section --> or similar up to <!-- Table Section -->)
    if (form === 'form1.jsx' || form === 'form2.jsx') {
        content = content.replace(/\{\/\* Form Section \*\/\}[\s\S]*?\{\/\* Table Section \*\/\}/, '{/* Table Section */}');
        
        // Remove handleSubmit function completely as we don't need it
        content = content.replace(/const handleSubmit = async \(e\) => \{[\s\S]*?\}\s*catch\s*\(error\)\s*\{[\s\S]*?\}\s*\};\s*/, '');
    } else if (form === 'form3.jsx' || form === 'form4.jsx') {
        // Form 3 and 4 have 'Input Form Section'
        content = content.replace(/\{\/\* Input Form Section \*\/\}[\s\S]*?\{\/\* Preview Section \*\/\}/, '{/* Preview Section */}');
        content = content.replace(/const handleSubmit = \(\) => \{[\s\S]*?\};\s*/, '');
    }

    // 2. Add handleTableChange and addRow functions if missing
    if (!content.includes('handleTableChange')) {
        const stateLogic = `
    const handleTableChange = (index, field, value) => {
        const newRecords = [...records];
        newRecords[index][field] = value;
        setRecords(newRecords);
    };

    const addRow = () => {
        setRecords([...records, {}]); // Append empty object, fields will be created dynamically on input
    };
`;
        content = content.replace(/const \[records, setRecords\] = useState\([\s\S]*?\);/, match => match + stateLogic);
    }
    
    // Add Plus icon import if missing
    if (!content.includes('Plus ')) {
        content = content.replace(/(import {[^}]+)( } from 'lucide-react';)/, '$1, Plus$2');
    }

    // 3. Form 1 and 2: Convert cells to inputs
    if (form === 'form1.jsx') {
        // Find processedRecords.map inside tbody
        content = content.replace(/processedRecords\.map\(\(record, idx\) => \([\s\S]*?<\/tr>/, match => {
            return match
                .replace(/>\{record\.date\}<\/td>/g, '><input type="date" value={record.date || ""} onChange={(e) => handleTableChange(idx, "date", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1" /></td>')
                .replace(/>\{record\.name\}<\/td>/g, '><input type="text" value={record.name || ""} onChange={(e) => handleTableChange(idx, "name", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1" /></td>')
                .replace(/>\{record\.description\}<\/td>/g, '><input type="text" value={record.description || ""} onChange={(e) => handleTableChange(idx, "description", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1" /></td>')
                .replace(/>\{record\.voucherNo \|\| '-'\}/g, '><input type="text" value={record.voucherNo || ""} onChange={(e) => handleTableChange(idx, "voucherNo", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center" />')
                .replace(/>\{record\.received > 0 \? record\.received\.toFixed\(2\) : '-'\}/g, '><input type="number" value={record.amountReceived || ""} onChange={(e) => handleTableChange(idx, "amountReceived", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-right font-semibold" />')
                .replace(/>\{record\.paid > 0 \? record\.paid\.toFixed\(2\) : '-'\}/g, '><input type="number" value={record.amountPaid || ""} onChange={(e) => handleTableChange(idx, "amountPaid", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-right font-semibold" />')
                .replace(/>\{record\.ledgerFolio \|\| '-'\}/g, '><input type="text" value={record.ledgerFolio || ""} onChange={(e) => handleTableChange(idx, "ledgerFolio", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center" />')
                .replace(/\{record\.analysis\[cat\.key\] \? parseFloat\(record\.analysis\[cat\.key\]\)\.toFixed\(2\) : '-'\}/g, '<input type="number" value={record.analysis?.[cat.key] || ""} onChange={(e) => { const newRecords = [...records]; if(!newRecords[idx].analysis) newRecords[idx].analysis = {}; newRecords[idx].analysis[cat.key] = e.target.value; setRecords(newRecords); }} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-right" />');
        });
    }

    if (form === 'form2.jsx') {
        content = content.replace(/processedRecords\.map\(\(record, idx\) => \([\s\S]*?<\/tr>/, match => {
            return match
                .replace(/>\{record\.date\}<\/td>/g, '><input type="date" value={record.date || ""} onChange={(e) => handleTableChange(idx, "date", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1" /></td>')
                .replace(/>\{record\.referenceNo \|\| '-'\}/g, '><input type="text" value={record.referenceNo || ""} onChange={(e) => handleTableChange(idx, "referenceNo", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center" />')
                .replace(/>\{record\.payee\}<\/td>/g, '><input type="text" value={record.payee || ""} onChange={(e) => handleTableChange(idx, "payee", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1" /></td>')
                .replace(/>\{record\.description\}<\/td>/g, '><input type="text" value={record.description || ""} onChange={(e) => handleTableChange(idx, "description", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1" /></td>')
                .replace(/>\{record\.chequeNo \|\| '-'\}/g, '><input type="text" value={record.chequeNo || ""} onChange={(e) => handleTableChange(idx, "chequeNo", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center" />')
                .replace(/>\{record\.amountPaid > 0 \? record\.amountPaid\.toFixed\(2\) : '-'\}/g, '><input type="number" value={record.amountPaid || ""} onChange={(e) => handleTableChange(idx, "amountPaid", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-right font-semibold" />')
                .replace(/>\{record\.discount > 0 \? record\.discount\.toFixed\(2\) : '-'\}/g, '><input type="number" value={record.discount || ""} onChange={(e) => handleTableChange(idx, "discount", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-right font-semibold" />')
                .replace(/>\{record\.ledgerFolio \|\| '-'\}/g, '><input type="text" value={record.ledgerFolio || ""} onChange={(e) => handleTableChange(idx, "ledgerFolio", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center" />')
                .replace(/\{record\.analysis\[cat\.key\] \? parseFloat\(record\.analysis\[cat\.key\]\)\.toFixed\(2\) : '-'\}/g, '<input type="number" value={record.analysis?.[cat.key] || ""} onChange={(e) => { const newRecords = [...records]; if(!newRecords[idx].analysis) newRecords[idx].analysis = {}; newRecords[idx].analysis[cat.key] = e.target.value; setRecords(newRecords); }} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-right" />');
        });
    }

    if (form === 'form3.jsx' || form === 'form4.jsx') {
        content = content.replace(/displayRecords\.map\(\(rec, idx\) => \([\s\S]*?<\/tr>/, match => {
            return match
                .replace(/>\{rec\.date\}<\/td>/g, '><input type="date" value={rec.date || ""} onChange={(e) => handleTableChange(idx, "date", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center font-inherit" /></td>')
                .replace(/>\{rec\.description\}<\/td>/g, '><input type="text" value={rec.description || ""} onChange={(e) => handleTableChange(idx, "description", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 font-inherit" /></td>')
                .replace(/>\{rec\.billNo\}<\/td>/g, '><input type="text" value={rec.billNo || ""} onChange={(e) => handleTableChange(idx, "billNo", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center font-inherit" /></td>')
                .replace(/>\{rec\.rs\}<\/td>/g, '><input type="number" value={rec.rs || ""} onChange={(e) => handleTableChange(idx, "rs", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-right font-inherit" /></td>')
                .replace(/>\{rec\.cts\}<\/td>/g, '><input type="number" value={rec.cts || ""} onChange={(e) => handleTableChange(idx, "cts", e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 px-1 text-center font-inherit" /></td>');
        });
    }

    // Add the Add Row button below the table
    if (!content.includes('> Add Row</button>')) {
        const buttonHtml = `
                <button onClick={addRow} className="mt-4 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                    <Plus className="w-4 h-4" /> Add Row
                </button>
        `;
        content = content.replace('</table>', '</table>' + buttonHtml);
    }

    fs.writeFileSync(`frontend/src/forms/${form}`, content);
    console.log(`${form} updated successfully.`);
});

