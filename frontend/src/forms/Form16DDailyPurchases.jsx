import React, { useState, useEffect, useMemo } from 'react';
import { PlusCircle, FileText, TrendingDown, TrendingUp } from 'lucide-react';

export default function Form16DDailyPurchases() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    storeType: 'WHOLESALE',
    transactionType: 'PURCHASE',
    serialNo: '',
    storeKeeperName: '',
    billNo: '',
    buyingPrice: 0,
    sellingPrice: 0
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-16d');
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
      const res = await fetch('http://localhost:8080/api/form-16d', {
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
          storeType: 'WHOLESALE',
          transactionType: 'PURCHASE',
          serialNo: '',
          storeKeeperName: '',
          billNo: '',
          buyingPrice: 0,
          sellingPrice: 0
        });
      } else {
        alert('Failed to save record.');
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
    }
  };

  const totals = useMemo(() => {
    return records.reduce((acc, curr) => {
      const multiplier = curr.transactionType === 'RETURN' ? -1 : 1;
      return {
        buyingPrice: acc.buyingPrice + ((curr.buyingPrice || 0) * multiplier),
        sellingPrice: acc.sellingPrice + ((curr.sellingPrice || 0) * multiplier)
      };
    }, { buyingPrice: 0, sellingPrice: 0 });
  }, [records]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">දෛනික ගැනුම් සටහන</h2>
              <p className="text-slate-400 text-sm">Daily Purchasing Summary - Form 16 D</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ගබඩාව (Store Type)</label>
                  <select name="storeType" value={formData.storeType} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="WHOLESALE">තොග ගබඩාව (Wholesale)</option>
                    <option value="RETAIL">සිල්ලර ගබඩාව (Retail)</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">වර්ගය (Transaction Type)</label>
                  <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="PURCHASE">ගැනුම් (Purchase)</option>
                    <option value="RETURN">ආපසු යැවීම් (Return)</option>
                  </select>
               </div>
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අනු අංකය (Serial No)</label>
                  <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">තොග භාරකරුගේ නම (Store Keeper)</label>
                  <input type="text" name="storeKeeperName" value={formData.storeKeeperName} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">බිල් අංකය (Bill No)</label>
                  <input type="text" name="billNo" value={formData.billNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            {/* Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">තොගය ගත් මිල රු. (Buying Price)</label>
                  <input type="number" step="0.01" name="buyingPrice" value={formData.buyingPrice} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">තොගය විකුණුම් මිල රු. (Selling Price)</label>
                  <input type="number" step="0.01" name="sellingPrice" value={formData.sellingPrice} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Ledger View</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 border-r border-slate-200">දිනය (Date)</th>
                <th className="px-4 py-3 border-r border-slate-200">ගබඩාව (Store)</th>
                <th className="px-4 py-3 border-r border-slate-200">වර්ගය (Type)</th>
                <th className="px-4 py-3 border-r border-slate-200">අනු අංකය (Serial No)</th>
                <th className="px-4 py-3 border-r border-slate-200">භාරකරු (Store Keeper)</th>
                <th className="px-4 py-3 border-r border-slate-200">බිල් අංකය (Bill No)</th>
                <th className="px-4 py-3 text-right bg-blue-50/50 text-blue-800 border-r border-blue-200">ගත් මිල (Buying Price)</th>
                <th className="px-4 py-3 text-right bg-green-50/50 text-green-800">විකුණුම් මිල (Selling Price)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => {
                const isReturn = record.transactionType === 'RETURN';
                return (
                  <tr key={record.id || index} className={`transition-colors ${isReturn ? 'bg-red-50 hover:bg-red-100 text-red-900' : 'even:bg-gray-50 hover:bg-slate-100 text-slate-800'}`}>
                    <td className="px-4 py-3 font-medium border-r border-slate-100">{record.date}</td>
                    <td className="px-4 py-3 border-r border-slate-100">{record.storeType === 'WHOLESALE' ? 'තොග (Wholesale)' : 'සිල්ලර (Retail)'}</td>
                    <td className="px-4 py-3 border-r border-slate-100 font-medium">
                      {isReturn ? (
                        <span className="flex items-center space-x-1 text-red-600">
                          <TrendingDown className="w-4 h-4" /> <span>ආපසු (Return)</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 text-emerald-600">
                          <TrendingUp className="w-4 h-4" /> <span>ගැනුම් (Purchase)</span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 border-r border-slate-100">{record.serialNo}</td>
                    <td className="px-4 py-3 border-r border-slate-100">{record.storeKeeperName}</td>
                    <td className="px-4 py-3 border-r border-slate-100">{record.billNo}</td>
                    
                    <td className={`px-4 py-3 text-right border-r font-medium ${isReturn ? 'border-red-100 text-red-700' : 'border-blue-100 text-blue-700 bg-blue-50/10'}`}>
                      {isReturn ? '-' : ''}{record.buyingPrice?.toFixed(2) || '0.00'}
                    </td>
                    <td className={`px-4 py-3 text-right font-medium ${isReturn ? 'text-red-700' : 'text-green-700 bg-green-50/10'}`}>
                      {isReturn ? '-' : ''}{record.sellingPrice?.toFixed(2) || '0.00'}
                    </td>
                  </tr>
                );
              })}
              {records.length === 0 && (
                <tr>
                  <td colSpan="8" className="px-4 py-8 text-center text-slate-500">
                    No records found. Add a record to see it here.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-slate-800 text-white font-bold">
              <tr>
                <td colSpan="6" className="px-4 py-3 text-right border-r border-slate-700">අදට එකතුව (Today's Total)</td>
                <td className="px-4 py-3 text-right border-r border-slate-700 text-blue-300">{totals.buyingPrice.toFixed(2)}</td>
                <td className="px-4 py-3 text-right text-green-300">{totals.sellingPrice.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
