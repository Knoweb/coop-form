import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form16AStoreLedger() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    itemDescription: '',
    billNo: '',
    buyingPriceUnit: 0,
    buyingPriceTotal: 0,
    qtyIssued: 0,
    qtyReceived: 0,
    valueIssued: 0,
    valueReceived: 0,
    previousBalance: 0,
    dailyRequirement: 0,
    qtyBalance: 0,
    sellingPriceUnit: 0,
    sellingPriceTotal: 0,
    handedOverRef: '',
    remarks: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-16a');
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
      const res = await fetch('http://localhost:8080/api/form-16a', {
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
          itemDescription: '',
          billNo: '',
          buyingPriceUnit: 0,
          buyingPriceTotal: 0,
          qtyIssued: 0,
          qtyReceived: 0,
          valueIssued: 0,
          valueReceived: 0,
          previousBalance: 0,
          dailyRequirement: 0,
          qtyBalance: 0,
          sellingPriceUnit: 0,
          sellingPriceTotal: 0,
          handedOverRef: '',
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

  return (
    <div className="max-w-[90rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">තොග ගබඩාව සටහන</h2>
              <p className="text-slate-400 text-sm">Stock Ledger - Form 16 A</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Group 1: Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ද්රව්ය (Item Description)</label>
                  <input type="text" name="itemDescription" value={formData.itemDescription} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">බිල්පත් අංකය (Bill No)</label>
                  <input type="text" name="billNo" value={formData.billNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Group 2: Buying Price */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 col-span-1 md:col-span-2">
                    <h3 className="text-md font-bold text-blue-800 border-b border-blue-200 pb-2 mb-4">ගැනුම් මිල (Buying Price)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">එකක් රු. (Unit Price)</label>
                            <input type="number" step="0.01" name="buyingPriceUnit" value={formData.buyingPriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">තොගයට රු. (Total Cost)</label>
                            <input type="number" step="0.01" name="buyingPriceTotal" value={formData.buyingPriceTotal} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Group 6: Selling Price */}
                <div className="bg-green-50 p-5 rounded-xl border border-green-100 col-span-1 md:col-span-2">
                    <h3 className="text-md font-bold text-green-800 border-b border-green-200 pb-2 mb-4">විකුණුම් මිල (Selling Price)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">එකක් රු. (Unit Price)</label>
                            <input type="number" step="0.01" name="sellingPriceUnit" value={formData.sellingPriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">තොගයට රු. (Total Value)</label>
                            <input type="number" step="0.01" name="sellingPriceTotal" value={formData.sellingPriceTotal} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Group 3: Quantity */}
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                    <h3 className="text-md font-bold text-orange-800 border-b border-orange-200 pb-2 mb-4">ප්‍රමාණය (Quantity)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">අඩු (Qty Issued)</label>
                            <input type="number" step="0.01" name="qtyIssued" value={formData.qtyIssued} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">වැඩි (Qty Received)</label>
                            <input type="number" step="0.01" name="qtyReceived" value={formData.qtyReceived} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Group 4: Value */}
                <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-100">
                    <h3 className="text-md font-bold text-yellow-800 border-b border-yellow-200 pb-2 mb-4">තක් මිල (Value)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-yellow-700 mb-1">අඩු (Value Issued)</label>
                            <input type="number" step="0.01" name="valueIssued" value={formData.valueIssued} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-yellow-700 mb-1">වැඩි (Value Received)</label>
                            <input type="number" step="0.01" name="valueReceived" value={formData.valueReceived} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-yellow-200 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Group 5: Balances */}
                <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                    <h3 className="text-md font-bold text-purple-800 border-b border-purple-200 pb-2 mb-4">ශේෂයන් (Balances)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">ගිය දින ශේෂය (Prev Balance)</label>
                            <input type="number" step="0.01" name="previousBalance" value={formData.previousBalance} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">දිනකට වුවමනා (Daily Req)</label>
                            <input type="number" step="0.01" name="dailyRequirement" value={formData.dailyRequirement} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">ශේෂය (Balance)</label>
                            <input type="number" step="0.01" name="qtyBalance" value={formData.qtyBalance} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Group 7: Extras */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">භාරදුන් අංකය (Handed Over Ref)</label>
                    <input type="text" name="handedOverRef" value={formData.handedOverRef} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">සටහන් (Remarks)</label>
                    <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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
            <thead className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-3 py-3 border-r border-slate-200">දිනය (Date)</th>
                <th className="px-3 py-3 border-r border-slate-200">ද්රව්ය (Item)</th>
                <th className="px-3 py-3 border-r border-slate-200">බිල්පත් අංකය (Bill No)</th>
                
                <th className="px-3 py-3 text-right bg-blue-50/50 text-blue-800">එකක් රු. (Buy Unit)</th>
                <th className="px-3 py-3 text-right bg-blue-50/50 text-blue-800 border-r border-blue-200 font-bold">තොගයට රු. (Buy Total)</th>
                
                <th className="px-3 py-3 text-right">අඩු (Qty Iss)</th>
                <th className="px-3 py-3 text-right border-r border-slate-200">වැඩි (Qty Rec)</th>
                
                <th className="px-3 py-3 text-right">අඩු (Val Iss)</th>
                <th className="px-3 py-3 text-right border-r border-slate-200">වැඩි (Val Rec)</th>
                
                <th className="px-3 py-3 text-right bg-purple-50/50 text-purple-800">ගිය දින ශේෂය (Prev Bal)</th>
                <th className="px-3 py-3 text-right bg-purple-50/50 text-purple-800">දිනකට වුවමනා (Daily Req)</th>
                <th className="px-3 py-3 text-right bg-purple-50/50 text-purple-800 border-r border-purple-200 font-bold">ශේෂය (Balance)</th>
                
                <th className="px-3 py-3 text-right bg-green-50/50 text-green-800">එකක් රු. (Sell Unit)</th>
                <th className="px-3 py-3 text-right bg-green-50/50 text-green-800 border-r border-green-200 font-bold">තොගයට රු. (Sell Total)</th>
                
                <th className="px-3 py-3 border-r border-slate-200">භාරදුන් අංකය (Handed Over Ref)</th>
                <th className="px-3 py-3">සටහන් (Remarks)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-3 py-2 font-medium text-slate-800 border-r border-slate-100">{record.date}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.itemDescription}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.billNo}</td>
                  
                  <td className="px-3 py-2 text-blue-700 bg-blue-50/10 text-right">{record.buyingPriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-blue-800 bg-blue-50/10 text-right border-r border-blue-100">{record.buyingPriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-700 text-right">{record.qtyIssued?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-slate-100">{record.qtyReceived?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-700 text-right">{record.valueIssued?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-slate-100">{record.valueReceived?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-purple-700 bg-purple-50/10 text-right">{record.previousBalance?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-purple-700 bg-purple-50/10 text-right">{record.dailyRequirement?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-purple-800 bg-purple-50/10 text-right border-r border-purple-100">{record.qtyBalance?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-green-700 bg-green-50/10 text-right">{record.sellingPriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-green-800 bg-green-50/10 text-right border-r border-green-100">{record.sellingPriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-600 border-r border-slate-100">{record.handedOverRef}</td>
                  <td className="px-3 py-2 text-slate-600">{record.remarks}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="16" className="px-4 py-8 text-center text-slate-500">
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
