const fs = require('fs');

// ===== FORM 3 =====
let form3 = fs.readFileSync('frontend/src/forms/form3.jsx', 'utf8');

// 1. Add Plus import
if (!form3.includes(', Plus }') && !form3.includes(',Plus }')) {
    form3 = form3.replace(
        /import \{ ([^}]+) \} from 'lucide-react';/,
        (m, icons) => `import { ${icons.trim()}, Plus } from 'lucide-react';`
    );
}

// 2. Make the displayRecords table cells editable
form3 = form3.replace(
    />\{rec\.date\}<\/td>/g,
    '><input type="date" value={rec.date || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],date:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm text-center px-1" /></td>'
);
form3 = form3.replace(
    />\{rec\.description\}<\/td>/g,
    '><input type="text" value={rec.description || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],description:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm px-1" /></td>'
);
form3 = form3.replace(
    />\{rec\.billNo\}<\/td>/g,
    '><input type="text" value={rec.billNo || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],billNo:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm text-center px-1" /></td>'
);
form3 = form3.replace(
    />\{rec\.rs\}<\/td>/g,
    '><input type="number" value={rec.rs || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],rs:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 font-mono text-lg text-right px-1" /></td>'
);
form3 = form3.replace(
    />\{rec\.cts\}<\/td>/g,
    '><input type="number" value={rec.cts || ""} onChange={(e) => { const r=[...records]; r[idx]={...r[idx],cts:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 font-mono text-lg text-center px-1" /></td>'
);

// 3. Add Add Row button (find the last </table> in the preview section)
const lastTableIdx = form3.lastIndexOf('</table>');
if (lastTableIdx !== -1) {
    form3 = form3.substring(0, lastTableIdx + 8) + `
              <button onClick={() => { const r=[...records]; r.push({ date:"", description:"", billNo:"", rs:"", cts:"" }); setRecords(r); }} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                <Plus className="w-4 h-4" /> Add Row
              </button>` + form3.substring(lastTableIdx + 8);
}

fs.writeFileSync('frontend/src/forms/form3.jsx', form3);
console.log('form3.jsx done');
