import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form20WholesaleAnalysis() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    storeName: '',
    buyerName: '',
    billNo: '',
    item1Name: '',
    item1Code: '',
    item1UnitPrice: 0,
    item1Qty: 0,
    item1Freight: 0,
    item1Other: 0,
    item2Name: '',
    item2Code: '',
    item2UnitPrice: 0,
    item2Qty: 0,
    item2Freight: 0,
    item2Other: 0,
    item3Name: '',
    item3Code: '',
    item3UnitPrice: 0,
    item3Qty: 0,
    item3Freight: 0,
    item3Other: 0,
    ledgerPage: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-20');
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

    try {
      const res = await fetch('http://localhost:8080/api/form-20', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          date: '',
          storeName: '',
          buyerName: '',
          billNo: '',
          item1Name: '',
          item1Code: '',
          item1UnitPrice: 0,
          item1Qty: 0,
          item1Freight: 0,
          item1Other: 0,
          item2Name: '',
          item2Code: '',
          item2UnitPrice: 0,
          item2Qty: 0,
          item2Freight: 0,
          item2Other: 0,
          item3Name: '',
          item3Code: '',
          item3UnitPrice: 0,
          item3Qty: 0,
          item3Freight: 0,
          item3Other: 0,
          ledgerPage: ''
        });
      } else {
        alert('Failed to save record.');
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
    }
  };

  return (
    <div className="max-w-[100rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">තොග ගබඩාවේ බඩු විග්‍රහ කිරීම</h2>
              <p className="text-slate-400 text-sm">Wholesale Goods Analysis (Form 20)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header & Transaction Info */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">තොග ගබඩාව (Store Name)</label>
                  <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">වෙළඳ (Buyer/Trade)</label>
                  <input type="text" name="buyerName" value={formData.buyerName} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">බිල්පත් අංකය (Bill No)</label>
                  <input type="text" name="billNo" value={formData.billNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">පොතේ පිටුව (Ledger Page)</label>
                  <input type="text" name="ledgerPage" value={formData.ledgerPage} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Commodity 1 */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                    <h3 className="text-md font-bold text-blue-800 border-b border-blue-200 pb-2 mb-4">ද්‍රව්‍ය 1 (Commodity 1)</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">ද: නම (Name)</label>
                            <input type="text" name="item1Name" value={formData.item1Name} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">සැ: අ: (Code)</label>
                            <input type="text" name="item1Code" value={formData.item1Code} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">ඒ: එක (Unit Price)</label>
                            <input type="number" step="0.01" name="item1UnitPrice" value={formData.item1UnitPrice} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">ප්‍රමාණ (Qty)</label>
                            <input type="number" step="0.01" name="item1Qty" value={formData.item1Qty} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">කුලී (Freight)</label>
                            <input type="number" step="0.01" name="item1Freight" value={formData.item1Freight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">වෙන (Other)</label>
                            <input type="number" step="0.01" name="item1Other" value={formData.item1Other} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Commodity 2 */}
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                    <h3 className="text-md font-bold text-emerald-800 border-b border-emerald-200 pb-2 mb-4">ද්‍රව්‍ය 2 (Commodity 2)</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">ද: නම (Name)</label>
                            <input type="text" name="item2Name" value={formData.item2Name} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">සැ: අ: (Code)</label>
                            <input type="text" name="item2Code" value={formData.item2Code} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">ඒ: එක (Unit Price)</label>
                            <input type="number" step="0.01" name="item2UnitPrice" value={formData.item2UnitPrice} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">ප්‍රමාණ (Qty)</label>
                            <input type="number" step="0.01" name="item2Qty" value={formData.item2Qty} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">කුලී (Freight)</label>
                            <input type="number" step="0.01" name="item2Freight" value={formData.item2Freight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">වෙන (Other)</label>
                            <input type="number" step="0.01" name="item2Other" value={formData.item2Other} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Commodity 3 */}
                <div className="bg-amber-50 p-5 rounded-xl border border-amber-200">
                    <h3 className="text-md font-bold text-amber-800 border-b border-amber-200 pb-2 mb-4">ද්‍රව්‍ය 3 (Commodity 3)</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-1">ද: නම (Name)</label>
                            <input type="text" name="item3Name" value={formData.item3Name} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-1">සැ: අ: (Code)</label>
                            <input type="text" name="item3Code" value={formData.item3Code} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-1">ඒ: එක (Unit Price)</label>
                            <input type="number" step="0.01" name="item3UnitPrice" value={formData.item3UnitPrice} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-1">ප්‍රමාණ (Qty)</label>
                            <input type="number" step="0.01" name="item3Qty" value={formData.item3Qty} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-1">කුලී (Freight)</label>
                            <input type="number" step="0.01" name="item3Freight" value={formData.item3Freight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-amber-700 mb-1">වෙන (Other)</label>
                            <input type="number" step="0.01" name="item3Other" value={formData.item3Other} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

          </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-medium">
              <PlusCircle className="w-5 h-5" />
              <span>Add Record</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Ledger View</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-slate-600 font-medium">
              <tr className="bg-slate-100 border-b border-slate-200">
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">වෙළඳ<br/>(Buyer)</th>
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">බිල්පත් අංකය<br/>(Bill No)</th>
                
                <th colSpan="4" className="px-3 py-2 border-r border-b border-blue-200 bg-blue-50 text-blue-800 text-center">ද්‍රව්‍ය 1 (Commodity 1)</th>
                <th colSpan="4" className="px-3 py-2 border-r border-b border-emerald-200 bg-emerald-50 text-emerald-800 text-center">ද්‍රව්‍ය 2 (Commodity 2)</th>
                <th colSpan="4" className="px-3 py-2 border-r border-b border-amber-200 bg-amber-50 text-amber-800 text-center">ද්‍රව්‍ය 3 (Commodity 3)</th>
                
                <th rowSpan="2" className="px-3 py-3 align-bottom">පොතේ පිටුව<br/>(Page)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-blue-100 bg-blue-50/50 text-right">ඒ: එක<br/>(Unit)</th>
                <th className="px-3 py-2 border-r border-blue-100 bg-blue-50/50 text-right">ප්‍රමාණ<br/>(Qty)</th>
                <th className="px-3 py-2 border-r border-blue-100 bg-blue-50/50 text-right">කුලී<br/>(Freight)</th>
                <th className="px-3 py-2 border-r border-blue-200 bg-blue-50/50 text-right">වෙන<br/>(Other)</th>
                
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-right">ඒ: එක<br/>(Unit)</th>
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-right">ප්‍රමාණ<br/>(Qty)</th>
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-right">කුලී<br/>(Freight)</th>
                <th className="px-3 py-2 border-r border-emerald-200 bg-emerald-50/50 text-right">වෙන<br/>(Other)</th>
                
                <th className="px-3 py-2 border-r border-amber-100 bg-amber-50/50 text-right">ඒ: එක<br/>(Unit)</th>
                <th className="px-3 py-2 border-r border-amber-100 bg-amber-50/50 text-right">ප්‍රමාණ<br/>(Qty)</th>
                <th className="px-3 py-2 border-r border-amber-100 bg-amber-50/50 text-right">කුලී<br/>(Freight)</th>
                <th className="px-3 py-2 border-r border-amber-200 bg-amber-50/50 text-right">වෙන<br/>(Other)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.buyerName}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.billNo}</td>
                  
                  {/* Commodity 1 */}
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-blue-50 bg-blue-50/10">
                    <div className="text-[10px] font-semibold text-blue-800 text-left mb-1 truncate max-w-[80px]">{record.item1Name} {record.item1Code ? `(${record.item1Code})` : ''}</div>
                    {record.item1UnitPrice?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-blue-50 bg-blue-50/10">{record.item1Qty?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-blue-50 bg-blue-50/10">{record.item1Freight?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-blue-100 bg-blue-50/10">{record.item1Other?.toFixed(2) || '0.00'}</td>
                  
                  {/* Commodity 2 */}
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-emerald-50 bg-emerald-50/10">
                    <div className="text-[10px] font-semibold text-emerald-800 text-left mb-1 truncate max-w-[80px]">{record.item2Name} {record.item2Code ? `(${record.item2Code})` : ''}</div>
                    {record.item2UnitPrice?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-emerald-50 bg-emerald-50/10">{record.item2Qty?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-emerald-50 bg-emerald-50/10">{record.item2Freight?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-emerald-100 bg-emerald-50/10">{record.item2Other?.toFixed(2) || '0.00'}</td>
                  
                  {/* Commodity 3 */}
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-amber-50 bg-amber-50/10">
                    <div className="text-[10px] font-semibold text-amber-800 text-left mb-1 truncate max-w-[80px]">{record.item3Name} {record.item3Code ? `(${record.item3Code})` : ''}</div>
                    {record.item3UnitPrice?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-amber-50 bg-amber-50/10">{record.item3Qty?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-amber-50 bg-amber-50/10">{record.item3Freight?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-amber-100 bg-amber-50/10">{record.item3Other?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-600">{record.ledgerPage}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="15" className="px-4 py-8 text-center text-slate-500">
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
