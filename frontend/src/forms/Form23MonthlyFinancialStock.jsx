import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form23MonthlyFinancialStock() {
  const [records, setRecords] = useState([]);
  
  const [formData, setFormData] = useState({
    storeName: '',
    reportDate: '',
    
    serialNo: '',
    itemCode: '',
    itemDescription: '',
    
    closingBalanceQty: 0,
    unitPrice: 0,
    stockTotalValue: 0,
    
    approvedQty: 0,
    writtenOffValue: 0,
    
    remarks: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-23');
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

    // AUTO-CALCULATE STOCK VALUE BEFORE POSTING
    const closingQty = parseFloat(formData.closingBalanceQty) || 0;
    const price = parseFloat(formData.unitPrice) || 0;
    const calculatedTotalValue = closingQty * price;

    const payload = { 
      ...formData,
      stockTotalValue: calculatedTotalValue
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-23', {
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
          storeName: formData.storeName,
          reportDate: formData.reportDate,
          
          serialNo: '',
          itemCode: '',
          itemDescription: '',
          
          closingBalanceQty: 0,
          unitPrice: 0,
          stockTotalValue: 0,
          
          approvedQty: 0,
          writtenOffValue: 0,
          
          remarks: ''
        });
      } else {
        alert('Failed to save record.');
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
    }
  };

  const totalStockValue = records.reduce((sum, record) => sum + (record.stockTotalValue || 0), 0);
  const totalWrittenOff = records.reduce((sum, record) => sum + (record.writtenOffValue || 0), 0);

  return (
    <div className="max-w-[90rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">මාසික මූල්‍ය බඩු ලැයිස්තුව</h2>
              <p className="text-slate-400 text-sm">Monthly Financial Stock Valuation List (Form 23)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header Metadata Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ගබඩාව (Store Name)</label>
                  <input type="text" name="storeName" value={formData.storeName} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Report Date)</label>
                  <input type="date" name="reportDate" value={formData.reportDate} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
            </div>

            {/* Entry Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Item Details */}
                <div className="md:col-span-5 bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                    <h4 className="text-sm font-bold text-indigo-800 mb-3 border-b border-indigo-200 pb-2">අයිතම විස්තර (Item Details)</h4>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-indigo-700 mb-1">අනු අංකය (Serial No)</label>
                                <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-indigo-700 mb-1">කේතය (Item Code)</label>
                                <input type="text" name="itemCode" value={formData.itemCode} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-indigo-700 mb-1">ද්‍රව්‍ය (Item Description)</label>
                            <input type="text" name="itemDescription" value={formData.itemDescription} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Balances & Valuation */}
                <div className="md:col-span-4 bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <h4 className="text-sm font-bold text-emerald-800 mb-3 border-b border-emerald-200 pb-2">වටිනාකම (Balances & Valuation)</h4>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-emerald-700 mb-1">අවසාන ශේෂ ප්‍රමාණය (Closing Qty)</label>
                                <input type="number" step="0.01" name="closingBalanceQty" value={formData.closingBalanceQty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-emerald-700 mb-1">මිල - එකක් (Unit Price)</label>
                                <input type="number" step="0.01" name="unitPrice" value={formData.unitPrice} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-emerald-700 mb-1">අනුමත ප්‍රමාණය (Approved Qty)</label>
                                <input type="number" step="0.01" name="approvedQty" value={formData.approvedQty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-emerald-700 mb-1">කපාහරින ලද වටිනාකම (Written Off)</label>
                                <input type="number" step="0.01" name="writtenOffValue" value={formData.writtenOffValue} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Remarks */}
                <div className="md:col-span-3 bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <h4 className="text-sm font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2">සටහන් (Remarks)</h4>
                    <div className="space-y-3 h-full">
                        <div className="h-full pb-6">
                            <label className="block text-xs font-medium text-amber-700 mb-1">වෙනත් කරුණු (Remarks)</label>
                            <textarea name="remarks" value={formData.remarks} onChange={handleChange} rows="3" className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
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
          <h3 className="font-bold text-slate-800">Financial Stock List (මාසික මූල්‍ය බඩු ලැයිස්තුව)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-slate-600 font-medium bg-slate-100">
              <tr className="border-b border-slate-200">
                <th className="px-3 py-3 border-r border-slate-200">අනු අංකය<br/>(Serial)</th>
                <th className="px-3 py-3 border-r border-slate-200">කේත අංකය<br/>(Code)</th>
                <th className="px-3 py-3 border-r border-slate-200">ද්‍රව්‍ය<br/>(Description)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right text-blue-700">අවසාන ශේෂ ප්‍රමාණය<br/>(Closing Qty)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">මිල - එකක්<br/>(Unit Price)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right text-green-700">තොගයේ වටිනාකම<br/>(Total Stock Value)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right text-purple-700">අනුමත ප්‍රමාණය<br/>(Approved Qty)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right text-red-700">කපාහරින ලද වටිනාකම<br/>(Written Off Value)</th>
                <th className="px-3 py-3">වෙනත් කරුණු<br/>(Remarks)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                  <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors text-slate-800">
                    <td className="px-3 py-2 border-r border-slate-100">{record.serialNo}</td>
                    <td className="px-3 py-2 border-r border-slate-100 font-medium">{record.itemCode}</td>
                    <td className="px-3 py-2 border-r border-slate-100">{record.itemDescription}</td>
                    
                    <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-blue-700">{record.closingBalanceQty?.toFixed(2) || '0.00'}</td>
                    <td className="px-3 py-2 border-r border-slate-100 text-right">{record.unitPrice?.toFixed(2) || '0.00'}</td>
                    
                    <td className="px-3 py-2 border-r border-slate-100 text-right font-bold text-green-700 bg-green-50/50">{record.stockTotalValue?.toFixed(2) || '0.00'}</td>
                    
                    <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-purple-700">{record.approvedQty?.toFixed(2) || '0.00'}</td>
                    <td className="px-3 py-2 border-r border-slate-100 text-right font-bold text-red-600 bg-red-50/50">{record.writtenOffValue?.toFixed(2) || '0.00'}</td>
                    
                    <td className="px-3 py-2">{record.remarks}</td>
                  </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-slate-500">
                    No records found. Add a record to see it here.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-slate-800 text-white font-bold text-sm border-t-2 border-slate-700">
                <tr>
                    <td colSpan="5" className="px-4 py-3 text-right">Total (මුළු එකතුව):</td>
                    <td className="px-3 py-3 text-right text-green-400 border-r border-slate-600">Rs. {totalStockValue.toFixed(2)}</td>
                    <td className="px-3 py-3 border-r border-slate-600"></td>
                    <td className="px-3 py-3 text-right text-red-400 border-r border-slate-600">Rs. {totalWrittenOff.toFixed(2)}</td>
                    <td></td>
                </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
