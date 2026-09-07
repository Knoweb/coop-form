import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText, ArrowRight } from 'lucide-react';

export default function StoreTransferForm() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    fromStore: '',
    toStore: '',
    serialNo: '',
    description: '',
    quantity: 0,
    handoverCostUnit: 0,
    handoverCostTotal: 0,
    handoverSellingUnit: 0,
    handoverSellingTotal: 0,
    receiverName: '',
    receivingCostUnit: 0,
    receivingCostTotal: 0,
    receivingSellingUnit: 0,
    receivingSellingTotal: 0,
    settlementNo: '',
    transferPage: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/store-transfer');
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

    // AUTO-CALCULATE ALL TOTALS BEFORE POSTING
    const qty = Number(formData.quantity) || 0;
    
    const payload = {
      ...formData,
      handoverCostTotal: qty * (Number(formData.handoverCostUnit) || 0),
      handoverSellingTotal: qty * (Number(formData.handoverSellingUnit) || 0),
      receivingCostTotal: qty * (Number(formData.receivingCostUnit) || 0),
      receivingSellingTotal: qty * (Number(formData.receivingSellingUnit) || 0)
    };

    try {
      const res = await fetch('http://localhost:8080/api/store-transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          fromStore: '',
          toStore: '',
          serialNo: '',
          description: '',
          quantity: 0,
          handoverCostUnit: 0,
          handoverCostTotal: 0,
          handoverSellingUnit: 0,
          handoverSellingTotal: 0,
          receiverName: '',
          receivingCostUnit: 0,
          receivingCostTotal: 0,
          receivingSellingUnit: 0,
          receivingSellingTotal: 0,
          settlementNo: '',
          transferPage: ''
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
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ගබඩාවෙන් ගබඩාවට මාරු කිරීම</h2>
              <p className="text-slate-400 text-sm">Store-to-Store Transfer Form</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">මාරු කරන ගබඩාව (From Store)</label>
                  <input type="text" name="fromStore" value={formData.fromStore} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ලබන ගබඩාව (To Store)</label>
                  <input type="text" name="toStore" value={formData.toStore} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
            </div>

            {/* Item Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අනු අංකය (Serial No)</label>
                  <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">විස්තරය (Description)</label>
                  <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ප්‍රමාණය (Quantity)</label>
                  <input type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Handover */}
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                    <h3 className="text-md font-bold text-orange-800 border-b border-orange-200 pb-2 mb-4">භාරදීමේ සටහන (Handover Record)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">ගත් මිල - ඒකක (Cost Unit)</label>
                            <input type="number" step="0.01" name="handoverCostUnit" value={formData.handoverCostUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">විකුණුම් මිල - ඒකක (Selling Unit)</label>
                            <input type="number" step="0.01" name="handoverSellingUnit" value={formData.handoverSellingUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Receiving */}
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                    <div className="flex items-center justify-between border-b border-emerald-200 pb-2 mb-4">
                        <h3 className="text-md font-bold text-emerald-800">භාරගැනීමේ සටහන (Receiving Record)</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">ගත් මිල - ඒකක (Cost Unit)</label>
                            <input type="number" step="0.01" name="receivingCostUnit" value={formData.receivingCostUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">විකුණුම් මිල - ඒකක (Selling Unit)</label>
                            <input type="number" step="0.01" name="receivingSellingUnit" value={formData.receivingSellingUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Other */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="md:col-span-1">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">ලැබුම්කරු (Receiver Name)</label>
                    <input type="text" name="receiverName" value={formData.receiverName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">බේරුම් අංකය (Settlement No)</label>
                    <input type="text" name="settlementNo" value={formData.settlementNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-700 mb-1">ස්ථාන මාරු පිටුව (Transfer Page)</label>
                    <input type="text" name="transferPage" value={formData.transferPage} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">අනු අංකය<br/>(Serial)</th>
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">විස්තරය<br/>(Description)</th>
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom text-right">ප්‍රමාණය<br/>(Qty)</th>
                <th colSpan="4" className="px-3 py-2 border-r border-b border-orange-200 bg-orange-50 text-orange-800 text-center">භාරදීමේ සටහන (Handover Record)</th>
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">ලැබුම්කරු<br/>(Receiver)</th>
                <th colSpan="4" className="px-3 py-2 border-r border-b border-emerald-200 bg-emerald-50 text-emerald-800 text-center">භාරගැනීමේ සටහන (Receiving Record)</th>
                <th colSpan="2" className="px-3 py-2 border-b border-slate-200 text-center bg-slate-50">වෙනත් (Other)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-orange-100 bg-orange-50/50 text-right">ගත් මිල<br/>(Cost Unit)</th>
                <th className="px-3 py-2 border-r border-orange-100 bg-orange-50/50 text-right">මුළු වටිනාකම<br/>(Cost Total)</th>
                <th className="px-3 py-2 border-r border-orange-100 bg-orange-50/50 text-right">විකුණුම් මිල<br/>(Sell Unit)</th>
                <th className="px-3 py-2 border-r border-orange-200 bg-orange-50/50 text-right">මුළු වටිනාකම<br/>(Sell Total)</th>
                
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-right">ගත් මිල<br/>(Cost Unit)</th>
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-right">මුළු වටිනාකම<br/>(Cost Total)</th>
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-right">විකුණුම් මිල<br/>(Sell Unit)</th>
                <th className="px-3 py-2 border-r border-emerald-200 bg-emerald-50/50 text-right">මුළු වටිනාකම<br/>(Sell Total)</th>
                
                <th className="px-3 py-2 border-r border-slate-200">බේරුම් අංකය<br/>(Settlement No)</th>
                <th className="px-3 py-2">පිටුව<br/>(Page)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.serialNo}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.description}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100 text-right font-medium">{record.quantity?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-orange-50 bg-orange-50/10">{record.handoverCostUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-orange-700 font-medium text-right border-r border-orange-50 bg-orange-50/10">{record.handoverCostTotal?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-orange-50 bg-orange-50/10">{record.handoverSellingUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-orange-700 font-medium text-right border-r border-orange-100 bg-orange-50/10">{record.handoverSellingTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.receiverName}</td>
                  
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-emerald-50 bg-emerald-50/10">{record.receivingCostUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-emerald-700 font-medium text-right border-r border-emerald-50 bg-emerald-50/10">{record.receivingCostTotal?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-emerald-50 bg-emerald-50/10">{record.receivingSellingUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-emerald-700 font-medium text-right border-r border-emerald-100 bg-emerald-50/10">{record.receivingSellingTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-600 border-r border-slate-100">{record.settlementNo}</td>
                  <td className="px-3 py-2 text-slate-600">{record.transferPage}</td>
                </tr>
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
