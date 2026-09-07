import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form21BinCard() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    itemName: '',
    headerDate: '',
    headerPrice: 0,
    dateLeft: '',
    refLeft: '',
    inLeft: 0,
    outLeft: 0,
    balanceLeft: 0,
    dateRight: '',
    refRight: '',
    inRight: 0,
    outRight: 0,
    balanceRight: 0
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-21');
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

    const payload = { ...formData };

    try {
      const res = await fetch('http://localhost:8080/api/form-21', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          itemName: formData.itemName, // Carry over header info to save time
          headerDate: formData.headerDate,
          headerPrice: formData.headerPrice,
          dateLeft: '',
          refLeft: '',
          inLeft: 0,
          outLeft: 0,
          balanceLeft: 0,
          dateRight: '',
          refRight: '',
          inRight: 0,
          outRight: 0,
          balanceRight: 0
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
              <h2 className="text-lg font-bold text-white">බින් කාඩ්පත / තොග ලේජරය</h2>
              <p className="text-slate-400 text-sm">Bin Card / Stock Ledger (Form F-21)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">භාණ්ඩය (Item Name)</label>
                  <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="headerDate" value={formData.headerDate} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">මිල (Price)</label>
                  <input type="number" step="0.01" name="headerPrice" value={formData.headerPrice} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Side */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                    <h3 className="text-md font-bold text-blue-800 border-b border-blue-200 pb-2 mb-4">වම් පැත්ත (Left Side)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">දිනය (Date)</label>
                            <input type="date" name="dateLeft" value={formData.dateLeft} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">සඳහන (Ref)</label>
                            <input type="text" name="refLeft" value={formData.refLeft} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">ලැබුම් (In)</label>
                            <input type="number" step="0.01" name="inLeft" value={formData.inLeft} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">නිකුත් (Out)</label>
                            <input type="number" step="0.01" name="outLeft" value={formData.outLeft} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">ශේෂය (Balance)</label>
                            <input type="number" step="0.01" name="balanceLeft" value={formData.balanceLeft} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                    <h3 className="text-md font-bold text-emerald-800 border-b border-emerald-200 pb-2 mb-4">දකුණු පැත්ත (Right Side)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">දිනය (Date)</label>
                            <input type="date" name="dateRight" value={formData.dateRight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">සඳහන (Ref)</label>
                            <input type="text" name="refRight" value={formData.refRight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">ලැබුම් (In)</label>
                            <input type="number" step="0.01" name="inRight" value={formData.inRight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">නිකුත් (Out)</label>
                            <input type="number" step="0.01" name="outRight" value={formData.outRight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">ශේෂය (Balance)</label>
                            <input type="number" step="0.01" name="balanceRight" value={formData.balanceRight} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
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
                <th className="px-3 py-2 border-r border-slate-200" colSpan="3">Header Data</th>
                <th colSpan="5" className="px-3 py-2 border-r-2 border-gray-400 bg-blue-50 text-blue-800 text-center border-b border-blue-200">වම් පැත්ත (Left Section)</th>
                <th colSpan="5" className="px-3 py-2 bg-emerald-50 text-emerald-800 text-center border-b border-emerald-200">දකුණු පැත්ත (Right Section)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 text-center">භාණ්ඩය<br/>(Item)</th>
                <th className="px-3 py-2 border-r border-slate-200 text-center">දිනය<br/>(Date)</th>
                <th className="px-3 py-2 border-r-2 border-gray-400 text-center">මිල<br/>(Price)</th>

                <th className="px-3 py-2 border-r border-slate-200 text-center">දිනය<br/>(Date)</th>
                <th className="px-3 py-2 border-r border-slate-200 text-center">සඳහන<br/>(Ref)</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right text-blue-700">ලැබුම්<br/>(In)</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right text-red-700">නිකුත්<br/>(Out)</th>
                <th className="px-3 py-2 border-r-2 border-gray-400 text-right font-bold text-slate-800">ශේෂය<br/>(Balance)</th>

                <th className="px-3 py-2 border-r border-slate-200 text-center">දිනය<br/>(Date)</th>
                <th className="px-3 py-2 border-r border-slate-200 text-center">සඳහන<br/>(Ref)</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right text-blue-700">ලැබුම්<br/>(In)</th>
                <th className="px-3 py-2 border-r border-slate-200 text-right text-red-700">නිකුත්<br/>(Out)</th>
                <th className="px-3 py-2 text-right font-bold text-slate-800">ශේෂය<br/>(Balance)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100 font-medium">{record.itemName}</td>
                  <td className="px-3 py-2 text-slate-600 border-r border-slate-100 text-center">{record.headerDate}</td>
                  <td className="px-3 py-2 text-slate-800 border-r-2 border-gray-400 text-right font-semibold">{record.headerPrice?.toFixed(2) || '0.00'}</td>

                  {/* Left */}
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100 text-center">{record.dateLeft}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100 text-center">{record.refLeft}</td>
                  <td className="px-3 py-2 text-blue-700 text-right border-r border-slate-100 font-medium">{record.inLeft?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-red-700 text-right border-r border-slate-100 font-medium">{record.outLeft?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-800 text-right border-r-2 border-gray-400 font-bold">{record.balanceLeft?.toFixed(2) || '0.00'}</td>
                  
                  {/* Right */}
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100 text-center">{record.dateRight}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100 text-center">{record.refRight}</td>
                  <td className="px-3 py-2 text-blue-700 text-right border-r border-slate-100 font-medium">{record.inRight?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-red-700 text-right border-r border-slate-100 font-medium">{record.outRight?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-800 text-right font-bold">{record.balanceRight?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="13" className="px-4 py-8 text-center text-slate-500">
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
