import React, { useState, useEffect } from 'react';
import { Save, LayoutGrid } from 'lucide-react';

const INITIAL_MATRIX = [
  { category: 'ලැබීම්', description: '1. මුලින්' },
  { category: 'ලැබීම්', description: '2. ගෙන එන ලද' },
  { category: 'ලැබීම්', description: '3. එකතුව (1+2)' },
  { category: 'ලැබීම්', description: '4. ආරම්භක ශේෂය (පොතේ තිබූ)' },
  { category: 'ලැබීම්', description: '5. අදට මුළු එකතුව' },
  { category: 'නිකුත් කිරීම', description: '1. දිනට නිකුත්' },
  { category: 'නිකුත් කිරීම', description: '2. දිනට ශේෂය' },
  { category: 'නිකුත් කිරීම', description: '3. දිනට සම්පූර්ණ අලෙවියට' },
  { category: 'නිකුත් කිරීම', description: '4. එකතුව දිනට' },
  { category: 'නිකුත් කිරීම', description: '5. භාර දීම' },
  { category: 'නිකුත් කිරීම', description: '6. එකතුව' },
  { category: 'අවසාන ශේෂය', description: '1. දිනට අවසාන මීටර අංකය' },
  { category: 'අවසාන ශේෂය', description: '2. දිනට ආරම්භක මීටර අංකය' },
  { category: 'අවසාන ශේෂය', description: '3. දිනට නිකුත් කළ ප්‍රමාණය' },
];

const generateEmptyMatrix = () => INITIAL_MATRIX.map(row => ({
  ...row,
  refNo: '',
  item1Qty: 0, item1Value: 0,
  item2Qty: 0, item2Value: 0,
  item3Qty: 0, item3Value: 0,
  item4Qty: 0, item4Value: 0,
  item5Qty: 0, item5Value: 0,
}));

export default function FormF21CDailyStockReport() {
  const [reportDate, setReportDate] = useState('');

  const [headers, setHeaders] = useState({
    item1Name: 'සුදු ඩීසල්',
    item2Name: 'මෝටර් පෙට්‍රල්',
    item3Name: 'භූමිතෙල්',
    item4Name: 'Item 4',
    item5Name: 'Item 5',
  });

  const [capacities, setCapacities] = useState({
    item1Capacity: '',
    item2Capacity: '',
    item3Capacity: '',
    item4Capacity: '',
    item5Capacity: '',
  });

  const [matrixData, setMatrixData] = useState(generateEmptyMatrix());

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaders(prev => ({ ...prev, [name]: value }));
  };

  const handleCapacityChange = (e) => {
    const { name, value } = e.target;
    setCapacities(prev => ({ ...prev, [name]: value }));
  };

  const handleCellChange = (rowIndex, field, value) => {
    const updated = [...matrixData];
    // if field contains Qty or Value, cast to Number
    updated[rowIndex][field] = field.includes('Qty') || field.includes('Value') ? Number(value) : value;
    setMatrixData(updated);
  };

  const handleSaveReport = async () => {
    if (!reportDate) {
      alert("Please select a date.");
      return;
    }

    const payload = matrixData.map(row => {
      const grandTotalValue =
        (row.item1Value || 0) +
        (row.item2Value || 0) +
        (row.item3Value || 0) +
        (row.item4Value || 0) +
        (row.item5Value || 0);

      return {
        reportDate,
        rowCategory: row.category,
        rowDescription: row.description,
        refNo: row.refNo,

        item1Name: headers.item1Name, item1Capacity: capacities.item1Capacity, item1Qty: row.item1Qty, item1Value: row.item1Value,
        item2Name: headers.item2Name, item2Capacity: capacities.item2Capacity, item2Qty: row.item2Qty, item2Value: row.item2Value,
        item3Name: headers.item3Name, item3Capacity: capacities.item3Capacity, item3Qty: row.item3Qty, item3Value: row.item3Value,
        item4Name: headers.item4Name, item4Capacity: capacities.item4Capacity, item4Qty: row.item4Qty, item4Value: row.item4Value,
        item5Name: headers.item5Name, item5Capacity: capacities.item5Capacity, item5Qty: row.item5Qty, item5Value: row.item5Value,

        grandTotalValue
      };
    });

    try {
      const res = await fetch('http://localhost:8080/api/form-f21c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Daily Report Saved Successfully!');
        setMatrixData(generateEmptyMatrix());
        setReportDate('');
      } else {
        alert('Failed to save report.');
      }
    } catch (error) {
      console.error('Error saving report:', error);
      alert('Error saving report.');
    }
  };

  return (
    <div className="max-w-[120rem] mx-auto space-y-6">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <LayoutGrid className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">දිනකට ඉතිරි බඩු තොග වාර්තාව</h2>
              <p className="text-slate-400 text-sm">Daily Forward Stock Report (Form F 21 C)</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <div className="mb-4 flex items-center space-x-4">
            <label className="text-sm font-semibold text-slate-700">දිනය (Date):</label>
            <input type="date" value={reportDate} onChange={(e) => setReportDate(e.target.value)} className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
          </div>

          <table className="w-full text-xs text-left whitespace-nowrap border-collapse">
            <thead className="text-slate-600 font-medium">

              {/* Dynamic Headers & Capacities */}
              <tr className="bg-slate-50 border-b border-slate-200">
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200"></th>
                {[1, 2, 3, 4, 5].map(num => (
                  <th key={`hdr-${num}`} colSpan="2" className="px-2 py-2 border-r border-slate-200 text-center bg-indigo-50/50">
                    <input type="text" name={`item${num}Name`} value={headers[`item${num}Name`]} onChange={handleHeaderChange} className="w-full bg-transparent text-center font-bold text-indigo-800 outline-none border-b border-indigo-200 mb-1" />
                    <div className="flex items-center justify-center text-[10px]">
                      <span className="text-slate-500 mr-1 font-normal">ධාරිතාව:</span>
                      <input type="text" name={`item${num}Capacity`} value={capacities[`item${num}Capacity`]} onChange={handleCapacityChange} className="w-16 bg-transparent text-center font-normal text-slate-600 outline-none border-b border-dashed border-slate-300" placeholder="-" />
                    </div>
                  </th>
                ))}
                <th className="px-3 py-2 border-slate-200 bg-emerald-50"></th>
              </tr>

              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 align-bottom w-64">විස්තර<br />(Description)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom w-24">අදාල අංකය<br />(Ref No)</th>

                {[1, 2, 3, 4, 5].map(num => (
                  <React.Fragment key={`subcol-${num}`}>
                    <th className="px-3 py-2 border-r border-slate-200 text-right w-24">ප්‍රමාණය<br />(Qty)</th>
                    <th className="px-3 py-2 border-r border-slate-200 text-right w-28">වටිනාකම<br />(Value)</th>
                  </React.Fragment>
                ))}

                <th className="px-3 py-2 align-bottom text-right font-bold text-emerald-700 w-32">මුළු එකතුව<br />(Total)</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {matrixData.map((row, rowIndex) => {

                // Render Category Group Headers
                const isFirstInCategory = rowIndex === 0 || matrixData[rowIndex - 1].category !== row.category;

                return (
                  <React.Fragment key={rowIndex}>
                    {isFirstInCategory && (
                      <tr className="bg-slate-200/50">
                        <td colSpan="13" className="px-3 py-1.5 font-bold text-slate-800 border-b border-slate-300">{row.category}</td>
                      </tr>
                    )}
                    <tr className="hover:bg-slate-50 transition-colors text-slate-800 focus-within:bg-indigo-50/30">
                      <td className="px-3 py-2 border-r border-slate-200 font-medium whitespace-normal leading-tight">{row.description}</td>
                      <td className="border-r border-slate-200 p-0">
                        <input type="text" value={row.refNo} onChange={(e) => handleCellChange(rowIndex, 'refNo', e.target.value)} className="w-full h-full bg-transparent outline-none px-3 py-2 text-slate-600 focus:bg-white" />
                      </td>

                      {[1, 2, 3, 4, 5].map(num => (
                        <React.Fragment key={`cell-${num}`}>
                          <td className="border-r border-slate-200 p-0">
                            <input type="number" step="0.01" value={row[`item${num}Qty`] || ''} onChange={(e) => handleCellChange(rowIndex, `item${num}Qty`, e.target.value)} className="w-full h-full bg-transparent outline-none px-3 py-2 text-right focus:bg-white" placeholder="0.00" />
                          </td>
                          <td className="border-r border-slate-200 p-0">
                            <input type="number" step="0.01" value={row[`item${num}Value`] || ''} onChange={(e) => handleCellChange(rowIndex, `item${num}Value`, e.target.value)} className="w-full h-full bg-transparent outline-none px-3 py-2 text-right focus:bg-white font-medium text-slate-600" placeholder="0.00" />
                          </td>
                        </React.Fragment>
                      ))}

                      <td className="px-3 py-2 text-right font-bold text-emerald-700 bg-emerald-50/30">
                        {((row.item1Value || 0) + (row.item2Value || 0) + (row.item3Value || 0) + (row.item4Value || 0) + (row.item5Value || 0)).toFixed(2)}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button onClick={handleSaveReport} className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl transition-all shadow-md font-bold text-sm">
            <Save className="w-5 h-5" />
            <span>Save Daily Report (දෛනික වාර්තාව සුරකින්න)</span>
          </button>
        </div>

      </div>
    </div>
  );
}
