const fs = require('fs');

// ===== FORM 1 =====
// Keep existing form + mock data + submit logic
// Just: add Plus import, make table cells editable, add Add Row button
let form1 = fs.readFileSync('frontend/src/forms/form1.jsx', 'utf8');

// 1. Add mock data to initial state
const mockData = `[
    {
      id: 1,
      date: '2026-09-01',
      name: 'John Doe',
      description: 'Travel Expenses',
      voucherNo: 'V-101',
      amountReceived: 5000,
      amountPaid: 1500,
      ledgerFolio: 'LF-01',
      transport: 1500, stationery: 0, postage: 0, meals: 0, other: 0,
      analysis: { Transport: 1500, Stationery: '', Postage: '', Meals: '', Other: '' }
    },
    {
      id: 2,
      date: '2026-09-02',
      name: 'Jane Smith',
      description: 'Office Supplies',
      voucherNo: 'V-102',
      amountReceived: 0,
      amountPaid: 500,
      ledgerFolio: 'LF-02',
      transport: 0, stationery: 500, postage: 0, meals: 0, other: 0,
      analysis: { Transport: '', Stationery: 500, Postage: '', Meals: '', Other: '' }
    },
    {
      id: 3,
      date: '2026-09-03',
      name: 'Post Office',
      description: 'Stamps & Postage',
      voucherNo: 'V-103',
      amountReceived: 0,
      amountPaid: 200,
      ledgerFolio: 'LF-03',
      transport: 0, stationery: 0, postage: 200, meals: 0, other: 0,
      analysis: { Transport: '', Stationery: '', Postage: 200, Meals: '', Other: '' }
    },
    {
      id: 4,
      date: '2026-09-04',
      name: 'Local Cafe',
      description: 'Staff Lunch',
      voucherNo: 'V-104',
      amountReceived: 0,
      amountPaid: 1200,
      ledgerFolio: 'LF-04',
      transport: 0, stationery: 0, postage: 0, meals: 1200, other: 0,
      analysis: { Transport: '', Stationery: '', Postage: '', Meals: 1200, Other: '' }
    }
  ]`;

form1 = form1.replace('const [records, setRecords] = useState([]);', `const [records, setRecords] = useState(${mockData});`);

// 2. Add Plus import
form1 = form1.replace(
    "import { PlusCircle, FileText, DollarSign, Calendar, List, Tag, Save, LayoutList, User } from 'lucide-react';",
    "import { PlusCircle, FileText, DollarSign, Calendar, List, Tag, Save, LayoutList, User, Plus } from 'lucide-react';"
);

// 3. Fix handleSubmit to add locally (keep backend call too)
const newSubmit = `  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      date: formData.date,
      name: formData.name,
      description: formData.description,
      voucherNo: formData.voucherNo,
      amountReceived: formData.amountReceived ? parseFloat(formData.amountReceived) : null,
      amountPaid: formData.amountPaid ? parseFloat(formData.amountPaid) : null,
      ledgerFolio: formData.ledgerFolio,
      transport: formData.analysis.Transport ? parseFloat(formData.analysis.Transport) : null,
      stationery: formData.analysis.Stationery ? parseFloat(formData.analysis.Stationery) : null,
      postage: formData.analysis.Postage ? parseFloat(formData.analysis.Postage) : null,
      meals: formData.analysis.Meals ? parseFloat(formData.analysis.Meals) : null,
      other: formData.analysis.Other ? parseFloat(formData.analysis.Other) : null
    };
    // Add locally
    setRecords(prev => [...prev, {
      ...payload,
      id: Date.now(),
      analysis: {
        Transport: payload.transport || '',
        Stationery: payload.stationery || '',
        Postage: payload.postage || '',
        Meals: payload.meals || '',
        Other: payload.other || ''
      }
    }]);
    setFormData(INITIAL_FORM_STATE);
    // Try backend
    try {
      await fetch('http://localhost:8080/api/records', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (error) { console.error("Backend not available:", error); }
  };`;

form1 = form1.replace(
    /const handleSubmit = async \(e\) => \{[\s\S]*?console\.error\("Failed to submit record:", error\);\s*\}\s*\};/,
    newSubmit
);

// 4. Add Add Row button after </table>
form1 = form1.replace(
    '</table>',
    `</table>
              <button onClick={() => setRecords(prev => [...prev, { id: Date.now(), date:'', name:'', description:'', voucherNo:'', amountReceived:'', amountPaid:'', ledgerFolio:'', analysis:{ Transport:'', Stationery:'', Postage:'', Meals:'', Other:'' }}])} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                <Plus className="w-4 h-4" /> Add Row
              </button>`
);

// 5. Make table cells editable
form1 = form1.replace(
    />\{record\.date\}<\/td>/g,
    '><input type="date" value={record.date || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],date:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>'
);
form1 = form1.replace(
    />\{record\.name\}<\/td>/g,
    '><input type="text" value={record.name || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],name:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>'
);
form1 = form1.replace(
    />\{record\.description\}<\/td>/g,
    '><input type="text" value={record.description || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],description:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>'
);
form1 = form1.replace(
    /\{record\.voucherNo \|\| '-'\}/g,
    '<input type="text" value={record.voucherNo || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],voucherNo:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1 text-center" />'
);
form1 = form1.replace(
    /\{record\.received > 0 \? record\.received\.toFixed\(2\) : '-'\}/g,
    '<input type="number" value={record.amountReceived || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],amountReceived:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1 text-right" />'
);
form1 = form1.replace(
    /\{record\.paid > 0 \? record\.paid\.toFixed\(2\) : '-'\}/g,
    '<input type="number" value={record.amountPaid || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],amountPaid:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1 text-right" />'
);
form1 = form1.replace(
    /\{record\.ledgerFolio \|\| '-'\}/g,
    '<input type="text" value={record.ledgerFolio || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],ledgerFolio:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1 text-center" />'
);
form1 = form1.replace(
    /\{record\.analysis\[cat\.key\] \? parseFloat\(record\.analysis\[cat\.key\]\)\.toFixed\(2\) : '-'\}/g,
    '<input type="number" value={record.analysis?.[cat.key] || ""} onChange={(e) => { const r=[...records]; if(!r[idx].analysis) r[idx].analysis={}; r[idx].analysis[cat.key]=e.target.value; setRecords([...r]); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1 text-right" />'
);

fs.writeFileSync('frontend/src/forms/form1.jsx', form1);
console.log('form1.jsx done');
