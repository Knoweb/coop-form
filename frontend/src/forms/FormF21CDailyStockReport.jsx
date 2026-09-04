import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle, FileText, LayoutGrid } from 'lucide-react';

export default function FormF21CDailyStockReport() {
  const [records, setRecords] = useState([]);
  
  // Headers for the columns
  const [headers, setHeaders] = useState({
    item1Name: 'සුදු ඩීසල්',
    item2Name: 'මෝටර් පෙට්‍රල්',
    item3Name: 'භූමිතෙල්',
    item4Name: 'Item 4',
    item5Name: 'Item 5',
  });

  const descriptionsMap = {
    'ලැබීම්': [
      '1. මුලින්',
      '2. ගෙන එනලද',
      '3. එකතුව (1+2)',
      '4. ආරම්භක ශේෂය',
      '5. අදාල දිනට ශේෂය',
    ],
    'නිකුත් කිරීම': [
      '1. දිනකදී විකුණූ',
      '2. දිනට ශේෂ',
      '3. දිනකදී සම්පූර්ණ අලෙවියට',
      '4. එකතුව දිනට',
      '5. භාර දීම',
      '6. එකතුව',
    ],
    'අවසාන ශේෂය': [
      '1. දිනට අවසාන භෞතික ශේෂය',
      '2. දිනට ආරම්භක බිල්පත් අංකය',
      '3. දිනට නිකුත් කළ ප්‍රමාණය',
    ]
  };

  const [formData, setFormData] = useState({
    reportDate: '',
    rowCategory: 'ලැබීම්',
    rowDescription: '1. මුලින්',
    refNo: '',
    item1Qty: 0, item1Value: 0,
    item2Qty: 0, item2Value: 0,
    item3Qty: 0, item3Value: 0,
    item4Qty: 0, item4Value: 0,
    item5Qty: 0, item5Value: 0,
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-f21c');
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: type === 'number' ? Number(value) : value };
      
      // Auto update description if category changes
      if (name === 'rowCategory') {
         updated.rowDescription = descriptionsMap[value][0];
      }
      return updated;
    });
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaders(prev => ({ ...prev, [name]: value }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    const grandTotalValue = 
      (parseFloat(formData.item1Value) || 0) +
      (parseFloat(formData.item2Value) || 0) +
      (parseFloat(formData.item3Value) || 0) +
      (parseFloat(formData.item4Value) || 0) +
      (parseFloat(formData.item5Value) || 0);

    const payload = {
      ...formData,
      ...headers,
      grandTotalValue
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-f21c', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchRecords();
        setFormData(prev => ({
          ...prev,
          refNo: '',
          item1Qty: 0, item1Value: 0,
          item2Qty: 0, item2Value: 0,
          item3Qty: 0, item3Value: 0,
          item4Qty: 0, item4Value: 0,
          item5Qty: 0, item5Value: 0,
        }));
      } else {
        alert('Failed to save record.');
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
    }
  };

  // Group records by category for rendering
  const groupedRecords = useMemo(() => {
    const groups = {
      'ලැබීම්': [],
      'නිකුත් කිරීම': [],
      'අවසාන ශේෂය': []
    };
    records.forEach(r => {
      if (groups[r.rowCategory]) {
        groups[r.rowCategory].push(r);
      } else {
        groups[r.rowCategory] = [r];
      }
    });
    return groups;
  }, [records]);

  return (
    <div className="max-w-[95rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <LayoutGrid className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">දිනකට ඉදිරි බඩු තොග වාර්තාව</h2>
              <p className="text-slate-400 text-sm">Daily Forward Stock Report (Form F 21 C)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6 space-y-6">
          
          {/* Top Form Controls */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
             <div className="md:col-span-2 space-y-4">
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                    <input type="date" name="reportDate" value={formData.reportDate} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                 </div>
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ප්‍රවර්ගය (Category)</label>
                    <select name="rowCategory" value={formData.rowCategory} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                        {Object.keys(descriptionsMap).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">විස්තර (Description)</label>
                    <select name="rowDescription" value={formData.rowDescription} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                        {descriptionsMap[formData.rowCategory]?.map(desc => (
                            <option key={desc} value={desc}>{desc}</option>
                        ))}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">අදාල අංකය (Ref No)</label>
                    <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                 </div>
             </div>

             <div className="md:col-span-4 bg-white p-4 rounded-xl border border-indigo-100 shadow-inner">
                 <h4 className="text-sm font-bold text-slate-700 mb-4 border-b pb-2">Commodities Matrix Entry</h4>
                 <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map(num => (
                        <div key={num} className="flex items-center gap-4">
                            <input type="text" name={`item${num}Name`} value={headers[`item${num}Name`]} onChange={handleHeaderChange} className="w-1/3 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder={`Item ${num}`} />
                            <div className="w-1/3 flex items-center">
                                <span className="text-xs text-slate-500 mr-2 w-16">ප්‍රමාණය</span>
                                <input type="number" step="0.01" name={`item${num}Qty`} value={formData[`item${num}Qty`]} onChange={handleChange} className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div className="w-1/3 flex items-center">
                                <span className="text-xs text-slate-500 mr-2 w-16">වටිනාකම</span>
                                <input type="number" step="0.01" name={`item${num}Value`} value={formData[`item${num}Value`]} onChange={handleChange} className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                    ))}
                 </div>
             </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm font-medium">
              <PlusCircle className="w-5 h-5" />
              <span>Add to Matrix</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Daily Forward Stock Matrix</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-slate-600 font-medium">
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">විස්තර<br/>(Description)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">අදාල අංකය<br/>(Ref No)</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 text-center bg-indigo-50/50">{headers.item1Name}</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 text-center bg-indigo-50/50">{headers.item2Name}</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 text-center bg-indigo-50/50">{headers.item3Name}</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 text-center bg-indigo-50/50">{headers.item4Name}</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 text-center bg-indigo-50/50">{headers.item5Name}</th>
                <th className="px-3 py-2 align-bottom text-right font-bold text-emerald-700" rowSpan="2">මුළු එකතුව වටිනාකම<br/>(Grand Total)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 text-right">ප්‍රමාණය</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">වටිනාකම</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">ප්‍රමාණය</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">වටිනාකම</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">ප්‍රමාණය</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">වටිනාකම</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">ප්‍රමාණය</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">වටිනාකම</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">ප්‍රමාණය</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right">වටිනාකම</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              
              {Object.entries(groupedRecords).map(([category, catRecords]) => (
                <React.Fragment key={category}>
                  {catRecords.length > 0 && (
                     <tr className="bg-slate-100/50">
                        <td colSpan="13" className="px-3 py-2 font-bold text-slate-700 border-b border-slate-200">{category}</td>
                     </tr>
                  )}
                  {catRecords.map((record, index) => (
                    <tr key={record.id || index} className="hover:bg-slate-50 transition-colors text-slate-800">
                      <td className="px-3 py-2 border-r border-slate-100 font-medium">{record.rowDescription}</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-slate-500">{record.refNo}</td>
                      
                      <td className="px-3 py-2 border-r border-slate-100 text-right">{record.item1Qty?.toFixed(2) || '-'}</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-slate-600">{record.item1Value?.toFixed(2) || '-'}</td>
                      
                      <td className="px-3 py-2 border-r border-slate-100 text-right">{record.item2Qty?.toFixed(2) || '-'}</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-slate-600">{record.item2Value?.toFixed(2) || '-'}</td>
                      
                      <td className="px-3 py-2 border-r border-slate-100 text-right">{record.item3Qty?.toFixed(2) || '-'}</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-slate-600">{record.item3Value?.toFixed(2) || '-'}</td>
                      
                      <td className="px-3 py-2 border-r border-slate-100 text-right">{record.item4Qty?.toFixed(2) || '-'}</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-slate-600">{record.item4Value?.toFixed(2) || '-'}</td>
                      
                      <td className="px-3 py-2 border-r border-slate-100 text-right">{record.item5Qty?.toFixed(2) || '-'}</td>
                      <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-slate-600">{record.item5Value?.toFixed(2) || '-'}</td>
                      
                      <td className="px-3 py-2 text-right font-bold text-emerald-700 bg-emerald-50/30">
                        {record.grandTotalValue?.toFixed(2) || '0.00'}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}

              {records.length === 0 && (
                <tr>
                  <td colSpan="13" className="px-4 py-8 text-center text-slate-500">
                    No matrix records found. Select a category and add a row.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
