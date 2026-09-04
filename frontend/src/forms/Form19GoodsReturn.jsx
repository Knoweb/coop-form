import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form19GoodsReturn() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    fromStore: '',
    toStore: '',
    transactionType: 'ආපසු යැවීම (Return)',
    date: '',
    serialNo: '',
    receivedDateRef: '',
    description: '',
    quantity: 0,
    costPriceUnit: 0,
    costPriceTotal: 0,
    sellingPriceUnit: 0,
    sellingPriceTotal: 0,
    transferNo: '',
    pageNoted: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-19');
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

    // AUTO-CALCULATE TOTALS BEFORE POSTING
    const qty = Number(formData.quantity) || 0;
    
    const payload = {
      ...formData,
      costPriceTotal: qty * (Number(formData.costPriceUnit) || 0),
      sellingPriceTotal: qty * (Number(formData.sellingPriceUnit) || 0)
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-19', {
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
          transactionType: 'ආපසු යැවීම (Return)',
          date: '',
          serialNo: '',
          receivedDateRef: '',
          description: '',
          quantity: 0,
          costPriceUnit: 0,
          costPriceTotal: 0,
          sellingPriceUnit: 0,
          sellingPriceTotal: 0,
          transferNo: '',
          pageNoted: ''
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
              <h2 className="text-lg font-bold text-white">බඩු ආපසු යැවීම/එවීම</h2>
              <p className="text-slate-400 text-sm">Goods Return/Dispatch (Form 19)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ගබඩාවෙන් (From Store)</label>
                  <input type="text" name="fromStore" value={formData.fromStore} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ගබඩාවට (To Store)</label>
                  <input type="text" name="toStore" value={formData.toStore} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ආපසු යැවීම/එවීම (Type)</label>
                  <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                      <option value="ආපසු යැවීම (Return)">ආපසු යැවීම (Return)</option>
                      <option value="ආපසු එවීම (Dispatch)">ආපසු එවීම (Dispatch)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අනු අංකය (Serial No)</label>
                  <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ලැබුණු දින/ලිපිනය (Rec. Date/Ref)</label>
                  <input type="text" name="receivedDateRef" value={formData.receivedDateRef} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">විස්තරය (Description)</label>
                  <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ප්‍රමාණය (Quantity)</label>
                  <input type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Cost Price */}
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                    <h3 className="text-md font-bold text-orange-800 border-b border-orange-200 pb-2 mb-4">ගත් මිල (Cost Price)</h3>
                    <div>
                        <label className="block text-sm font-medium text-orange-700 mb-1">එකක (Unit Price)</label>
                        <input type="number" step="0.01" name="costPriceUnit" value={formData.costPriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                    </div>
                </div>

                {/* Selling Price */}
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                    <h3 className="text-md font-bold text-emerald-800 border-b border-emerald-200 pb-2 mb-4">විකුණුම් මිල (Selling Price)</h3>
                    <div>
                        <label className="block text-sm font-medium text-emerald-700 mb-1">එකක (Unit Price)</label>
                        <input type="number" step="0.01" name="sellingPriceUnit" value={formData.sellingPriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                    </div>
                </div>

                {/* Remarks */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">වෙනත් කරුණු (Remarks)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">මාරුකළ අංකය (Transfer No)</label>
                            <input type="text" name="transferNo" value={formData.transferNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">සටහන් කළ පිටුව (Page Noted)</label>
                            <input type="text" name="pageNoted" value={formData.pageNoted} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">අනු අංකය<br/>(Serial)</th>
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">ලැබුණු දින/ලිපිනය<br/>(Rec. Date/Ref)</th>
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom">විස්තරය<br/>(Description)</th>
                <th rowSpan="2" className="px-3 py-3 border-r border-slate-200 align-bottom text-right">ප්‍රමාණය<br/>(Qty)</th>
                <th colSpan="2" className="px-3 py-2 border-r border-b border-orange-200 bg-orange-50 text-orange-800 text-center">ගත් මිල (Cost Price)</th>
                <th colSpan="2" className="px-3 py-2 border-r border-b border-emerald-200 bg-emerald-50 text-emerald-800 text-center">විකුණුම් මිල (Selling Price)</th>
                <th colSpan="2" className="px-3 py-2 border-b border-slate-200 text-center bg-slate-50">වෙනත් කරුණු (Remarks)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-orange-100 bg-orange-50/50 text-right">එකක<br/>(Unit)</th>
                <th className="px-3 py-2 border-r border-orange-200 bg-orange-50/50 text-right">තොගයට<br/>(Total)</th>
                
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-right">එකක<br/>(Unit)</th>
                <th className="px-3 py-2 border-r border-emerald-200 bg-emerald-50/50 text-right">තොගයට<br/>(Total)</th>
                
                <th className="px-3 py-2 border-r border-slate-200">මාරුකළ අංකය<br/>(Transfer No)</th>
                <th className="px-3 py-2">සටහන් කළ පිටුව<br/>(Page Noted)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.serialNo}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.receivedDateRef}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.description}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100 text-right font-medium">{record.quantity?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-orange-50 bg-orange-50/10">{record.costPriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-orange-700 font-medium text-right border-r border-orange-100 bg-orange-50/10">{record.costPriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-emerald-50 bg-emerald-50/10">{record.sellingPriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-emerald-700 font-medium text-right border-r border-emerald-100 bg-emerald-50/10">{record.sellingPriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-600 border-r border-slate-100">{record.transferNo}</td>
                  <td className="px-3 py-2 text-slate-600">{record.pageNoted}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-slate-500">
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
