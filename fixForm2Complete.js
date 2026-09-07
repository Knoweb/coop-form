const fs = require('fs');
const { execSync } = require('child_process');

// ===== FORM 2 =====
let form2 = fs.readFileSync('frontend/src/forms/form2.jsx', 'utf8');

// 1. Add Plus import
if (!form2.includes(', Plus }') && !form2.includes(',Plus }')) {
    form2 = form2.replace(
        /import \{ ([^}]+) \} from 'lucide-react';/,
        (m, icons) => `import { ${icons.trim()}, Plus } from 'lucide-react';`
    );
}

// 2. Check if form2 already has mock data
if (!form2.includes("V-201") && form2.includes('useState([])')) {
    const mockData2 = `[
    { id:1, date:'2026-09-01', description:'Office Supplies', voucherNo:'V-201', amountReceived: 10000, amountPaid:0, ledgerFolio:'LF-01', note:'Opening balance', analysis:{} },
    { id:2, date:'2026-09-02', description:'Transport Payment', voucherNo:'V-202', amountReceived:0, amountPaid:2500, ledgerFolio:'LF-02', note:'', analysis:{} },
    { id:3, date:'2026-09-03', description:'Stationery Purchase', voucherNo:'V-203', amountReceived:0, amountPaid:1800, ledgerFolio:'LF-03', note:'', analysis:{} }
  ]`;
    form2 = form2.replace('useState([])', `useState(${mockData2})`);
}

// 3. Fix handleSubmit to add locally
const hasLocalSubmit = form2.includes('setRecords(prev => [...prev,');
if (!hasLocalSubmit) {
    // Find and replace the handleSubmit
    form2 = form2.replace(
        /const handleSubmit = async \(e\) => \{[\s\S]*?console\.error\("Failed to submit record:", error\);\s*\}\s*\};/,
        `const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      date: formData.date, description: formData.description,
      voucherNo: formData.voucherNo,
      amountReceived: formData.amountReceived ? parseFloat(formData.amountReceived) : 0,
      amountPaid: formData.amountPaid ? parseFloat(formData.amountPaid) : 0,
      ledgerFolio: formData.ledgerFolio, note: formData.note || '', analysis: {}
    };
    setRecords(prev => [...prev, { ...payload, id: Date.now() }]);
    setFormData(INITIAL_FORM_STATE || Object.keys(formData).reduce((a,k)=>({...a,[k]:''}),{}));
    try { await fetch('http://localhost:8080/api/form2-records', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) }); }
    catch(e) { console.error("Backend unavailable:", e); }
  };`
    );
}

// 4. Make table cells editable (form2 uses processedRecords.map with index)
form2 = form2.replace(
    />\{record\.date\}<\/td>/g,
    '><input type="date" value={record.date || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],date:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>'
);
form2 = form2.replace(
    />\{record\.description\}<\/td>/g,
    '><input type="text" value={record.description || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],description:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>'
);
form2 = form2.replace(
    />\{record\.voucherNo\}<\/td>/g,
    '><input type="text" value={record.voucherNo || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],voucherNo:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1 text-center" /></td>'
);
form2 = form2.replace(
    />\{record\.note\}<\/td>/g,
    '><input type="text" value={record.note || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],note:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>'
);

// 5. Add Add Row button after last </table>
const lastTableIdx = form2.lastIndexOf('</table>');
if (lastTableIdx !== -1) {
    form2 = form2.substring(0, lastTableIdx + 8) + `
              <button onClick={() => setRecords(prev => [...prev, { id:Date.now(), date:'', description:'', voucherNo:'', amountReceived:'', amountPaid:'', ledgerFolio:'', note:'', analysis:{} }])} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                <Plus className="w-4 h-4" /> Add Row
              </button>` + form2.substring(lastTableIdx + 8);
}

fs.writeFileSync('frontend/src/forms/form2.jsx', form2);
console.log('form2.jsx done');
