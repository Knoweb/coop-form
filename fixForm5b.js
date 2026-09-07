const fs = require('fs');
let content = fs.readFileSync('frontend/src/forms/form5b.jsx', 'utf8');

// 1. Add Plus import if missing
if (!content.includes(', Plus }') && !content.includes(',Plus }')) {
    content = content.replace(
        /import \{ ([^}]+) \} from 'lucide-react';/,
        (m, icons) => `import { ${icons.trim()}, Plus } from 'lucide-react';`
    );
}

// 2. Replace the hardcoded tbody with a dynamic state-based one
// First, add tableRows state after useState declarations
const tableRowsState = `
  const [tableRows, setTableRows] = useState([
    { date: '2026-09-06', description: 'ප්‍රධාන ගිණුමට මාරු කිරීම', account: 'A/C 102', rs: '50000', cts: '00' },
    { date: '2026-09-06', description: 'සුබසාධක අරමුදලට මාරු කිරීම', account: 'A/C 450', rs: '15000', cts: '00' },
    { date: '', description: '', account: '', rs: '', cts: '' }
  ]);

  const handleRowChange = (idx, field, value) => {
    const newRows = [...tableRows];
    newRows[idx][field] = value;
    setTableRows(newRows);
  };

  const addTableRow = () => {
    setTableRows(prev => [...prev, { date: '', description: '', account: '', rs: '', cts: '' }]);
  };

`;

// Insert state after the first useState block (find the handleInputChange line)
content = content.replace('  const handleInputChange', tableRowsState + '  const handleInputChange');

// 3. Replace the static tbody with dynamic one
const staticTbody = `<tbody>
              <tr className="h-12">
                <td className="border border-slate-900 p-2 text-center text-sm">2026-09-06</td>
                <td className="border border-slate-900 p-2 text-sm">ප්‍රධාන ගිණුමට මාරු කිරීම</td>
                <td className="border border-slate-900 p-2 text-center text-sm">A/C 102</td>
                <td className="border border-slate-900 p-2 text-right w-24 font-mono text-sm border-r-0">50000</td>
                <td className="border border-slate-900 p-2 text-center w-12 font-mono text-sm border-l-0">00</td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2 text-center text-sm">2026-09-06</td>
                <td className="border border-slate-900 p-2 text-sm">සුබසාධක අරමුදලට මාරු කිරීම</td>
                <td className="border border-slate-900 p-2 text-center text-sm">A/C 450</td>
                <td className="border border-slate-900 p-2 text-right w-24 font-mono text-sm border-r-0">15000</td>
                <td className="border border-slate-900 p-2 text-center w-12 font-mono text-sm border-l-0">00</td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2 border-r-0"></td>
                <td className="border border-slate-900 p-2 border-l-0"></td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2 border-r-0"></td>
                <td className="border border-slate-900 p-2 border-l-0"></td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2 border-r-0"></td>
                <td className="border border-slate-900 p-2 border-l-0"></td>
              </tr>
            </tbody>`;

const dynamicTbody = `<tbody>
              {tableRows.map((row, idx) => (
                <tr key={idx} className="h-12">
                  <td className="border border-slate-900 p-1 text-center text-sm">
                    <input type="date" value={row.date || ''} onChange={(e) => handleRowChange(idx, 'date', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm text-center px-1" />
                  </td>
                  <td className="border border-slate-900 p-1 text-sm">
                    <input type="text" value={row.description || ''} onChange={(e) => handleRowChange(idx, 'description', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm px-1" />
                  </td>
                  <td className="border border-slate-900 p-1 text-center text-sm">
                    <input type="text" value={row.account || ''} onChange={(e) => handleRowChange(idx, 'account', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 text-sm text-center px-1" />
                  </td>
                  <td className="border border-slate-900 p-1 text-right w-24 font-mono text-sm border-r-0">
                    <input type="number" value={row.rs || ''} onChange={(e) => handleRowChange(idx, 'rs', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 font-mono text-sm text-right px-1" />
                  </td>
                  <td className="border border-slate-900 p-1 text-center w-12 font-mono text-sm border-l-0">
                    <input type="number" value={row.cts || ''} onChange={(e) => handleRowChange(idx, 'cts', e.target.value)} className="w-full bg-transparent outline-none focus:bg-blue-50 font-mono text-sm text-center px-1" />
                  </td>
                </tr>
              ))}
            </tbody>`;

content = content.replace(staticTbody, dynamicTbody);

// 4. Add Add Row button after </table>
content = content.replace(
    `          </table>

          {/* Footer Signatures */}`,
    `          </table>
          <button onClick={addTableRow} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
            <Plus className="w-4 h-4" /> Add Row
          </button>

          {/* Footer Signatures */}`
);

fs.writeFileSync('frontend/src/forms/form5b.jsx', content);
console.log('form5b.jsx updated successfully');
