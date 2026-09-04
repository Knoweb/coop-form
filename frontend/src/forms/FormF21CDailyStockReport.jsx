import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function FormF21CDailyStockReport() {
  const [records, setRecords] = useState([]);
  
  const [formData, setFormData] = useState({
    reportDate: '',
    category: 'ලැබීම්',
    description: '',
    refNo: '',
    
    item1Name: '',
    item2Name: '',
    item3Name: '',
    item4Name: '',
    item5Name: '',
    
    item1Qty: 0,
    item1Value: 0,
    item2Qty: 0,
    item2Value: 0,
    item3Qty: 0,
    item3Value: 0,
    item4Qty: 0,
    item4Value: 0,
    item5Qty: 0,
    item5Value: 0,
    
    grandTotalValue: 0
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
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    // AUTO-CALCULATE GRAND TOTAL BEFORE POSTING
    const grandTotalValue = 
      (formData.item1Value || 0) + 
      (formData.item2Value || 0) + 
      (formData.item3Value || 0) + 
      (formData.item4Value || 0) + 
      (formData.item5Value || 0);

    const payload = { 
      ...formData,
      grandTotalValue
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-f21c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchRecords();
        // Carry over header info to save time
        setFormData({
          reportDate: formData.reportDate,
          category: formData.category,
          description: '',
          refNo: '',
          
          item1Name: formData.item1Name,
          item2Name: formData.item2Name,
          item3Name: formData.item3Name,
          item4Name: formData.item4Name,
          item5Name: formData.item5Name,
          
          item1Qty: 0,
          item1Value: 0,
          item2Qty: 0,
          item2Value: 0,
          item3Qty: 0,
          item3Value: 0,
          item4Qty: 0,
          item4Value: 0,
          item5Qty: 0,
          item5Value: 0,
          
          grandTotalValue: 0
        });
      } else {
        alert('Failed to save record.');
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
    }
  };

  const lastRecord = records.length > 0 ? records[records.length - 1] : formData;

  return (
    <div className="max-w-[100rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">දිනකට ඉදිරි බඩු තොග වාර්තාව</h2>
              <p className="text-slate-400 text-sm">Daily Forward Stock Report (Form F 21 C)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-8">
            
            {/* Row Identity */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="reportDate" value={formData.reportDate} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">වර්ගය (Category)</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                    <option value="ලැබීම්">ලැබීම් (Receipts)</option>
                    <option value="නිකුත් කිරීම">නිකුත් කිරීම (Issues)</option>
                    <option value="අවසාන ශේෂය">අවසාන ශේෂය (Closing Balance)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">විස්තර (Description)</label>
                  <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. මුලින්" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අදාල අංකය (Ref No)</label>
                  <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            {/* Item Names Header Definition */}
            <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-200">
                <h3 className="text-md font-bold text-indigo-800 border-b border-indigo-200 pb-2 mb-4">භාණ්ඩ නම් (Item Names)</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                        <input type="text" name="item1Name" value={formData.item1Name} onChange={handleChange} placeholder="Item 1" className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <input type="text" name="item2Name" value={formData.item2Name} onChange={handleChange} placeholder="Item 2" className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <input type="text" name="item3Name" value={formData.item3Name} onChange={handleChange} placeholder="Item 3" className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <input type="text" name="item4Name" value={formData.item4Name} onChange={handleChange} placeholder="Item 4" className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                    <div>
                        <input type="text" name="item5Name" value={formData.item5Name} onChange={handleChange} placeholder="Item 5" className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                    </div>
                </div>
            </div>

            {/* Item Values */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {/* Item 1 */}
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="text-sm font-bold text-blue-800 mb-3 truncate">{formData.item1Name || 'Item 1'}</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="item1Qty" value={formData.item1Qty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">වටිනාකම (Value)</label>
                            <input type="number" step="0.01" name="item1Value" value={formData.item1Value} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>
                
                {/* Item 2 */}
                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <h4 className="text-sm font-bold text-emerald-800 mb-3 truncate">{formData.item2Name || 'Item 2'}</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="item2Qty" value={formData.item2Qty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">වටිනාකම (Value)</label>
                            <input type="number" step="0.01" name="item2Value" value={formData.item2Value} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Item 3 */}
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <h4 className="text-sm font-bold text-amber-800 mb-3 truncate">{formData.item3Name || 'Item 3'}</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="item3Qty" value={formData.item3Qty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">වටිනාකම (Value)</label>
                            <input type="number" step="0.01" name="item3Value" value={formData.item3Value} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Item 4 */}
                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h4 className="text-sm font-bold text-purple-800 mb-3 truncate">{formData.item4Name || 'Item 4'}</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-purple-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="item4Qty" value={formData.item4Qty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-purple-700 mb-1">වටිනාකම (Value)</label>
                            <input type="number" step="0.01" name="item4Value" value={formData.item4Value} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Item 5 */}
                <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                    <h4 className="text-sm font-bold text-rose-800 mb-3 truncate">{formData.item5Name || 'Item 5'}</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-rose-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="item5Qty" value={formData.item5Qty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-rose-700 mb-1">වටිනාකම (Value)</label>
                            <input type="number" step="0.01" name="item5Value" value={formData.item5Value} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-medium">
              <PlusCircle className="w-5 h-5" />
              <span>Add Record</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Report View (වාර්තාව)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-slate-600 font-medium">
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">වර්ගය<br/>(Category)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">විස්තර<br/>(Description)</th>
                <th className="px-3 py-2 border-r-2 border-gray-400 align-bottom" rowSpan="2">අදාල අංකය<br/>(Ref No)</th>
                
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 bg-blue-50 text-blue-800 text-center border-b border-blue-200">{lastRecord.item1Name || 'Item 1'}</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 bg-emerald-50 text-emerald-800 text-center border-b border-emerald-200">{lastRecord.item2Name || 'Item 2'}</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 bg-amber-50 text-amber-800 text-center border-b border-amber-200">{lastRecord.item3Name || 'Item 3'}</th>
                <th colSpan="2" className="px-3 py-2 border-r border-slate-200 bg-purple-50 text-purple-800 text-center border-b border-purple-200">{lastRecord.item4Name || 'Item 4'}</th>
                <th colSpan="2" className="px-3 py-2 border-r-2 border-gray-400 bg-rose-50 text-rose-800 text-center border-b border-rose-200">{lastRecord.item5Name || 'Item 5'}</th>
                
                <th className="px-3 py-2 align-bottom text-center bg-slate-100 font-bold" rowSpan="2">මුළු එකතුව<br/>(Grand Total)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                {/* 1 */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">ප්‍රමාණය (Qty)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">වටිනාකම (Value)</th>
                {/* 2 */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">ප්‍රමාණය (Qty)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">වටිනාකම (Value)</th>
                {/* 3 */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">ප්‍රමාණය (Qty)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">වටිනාකම (Value)</th>
                {/* 4 */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">ප්‍රමාණය (Qty)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">වටිනාකම (Value)</th>
                {/* 5 */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">ප්‍රමාණය (Qty)</th>
                <th className="px-2 py-2 border-r-2 border-gray-400 text-center">වටිනාකම (Value)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <React.Fragment key={record.id || index}>
                  {/* To show date grouping nicely since it's a daily report */}
                  {(index === 0 || records[index - 1].reportDate !== record.reportDate) && (
                    <tr className="bg-indigo-50/50 border-b border-slate-200 text-xs font-bold text-indigo-900">
                      <td colSpan="14" className="px-3 py-2">
                        දිනය (Date): {record.reportDate}
                      </td>
                    </tr>
                  )}
                  <tr className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                    <td className="px-3 py-2 text-slate-800 border-r border-slate-100 font-semibold">{record.category}</td>
                    <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.description}</td>
                    <td className="px-3 py-2 text-slate-800 border-r-2 border-gray-400">{record.refNo}</td>

                    {/* Item 1 */}
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item1Qty?.toFixed(2) || '0.00'}</td>
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item1Value?.toFixed(2) || '0.00'}</td>
                    
                    {/* Item 2 */}
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item2Qty?.toFixed(2) || '0.00'}</td>
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item2Value?.toFixed(2) || '0.00'}</td>
                    
                    {/* Item 3 */}
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item3Qty?.toFixed(2) || '0.00'}</td>
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item3Value?.toFixed(2) || '0.00'}</td>
                    
                    {/* Item 4 */}
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item4Qty?.toFixed(2) || '0.00'}</td>
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item4Value?.toFixed(2) || '0.00'}</td>
                    
                    {/* Item 5 */}
                    <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-right">{record.item5Qty?.toFixed(2) || '0.00'}</td>
                    <td className="px-2 py-2 text-slate-800 border-r-2 border-gray-400 text-right">{record.item5Value?.toFixed(2) || '0.00'}</td>
                    
                    <td className="px-3 py-2 text-slate-800 text-right font-bold bg-slate-100/50">{record.grandTotalValue?.toFixed(2) || '0.00'}</td>
                  </tr>
                </React.Fragment>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="14" className="px-4 py-8 text-center text-slate-500">
                    No records found. Add a record to see it here.
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
