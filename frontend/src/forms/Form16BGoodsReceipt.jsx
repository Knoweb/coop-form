import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form16BGoodsReceipt() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    retailStore: '',
    serialNo: '',
    description: '',
    returnableEmpties: '',
    quantity: 0,
    wholesalePriceUnit: 0,
    retailPriceUnit: 0,
    remarks: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-16b');
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

    const quantity = formData.quantity || 0;
    const wholesalePriceUnit = formData.wholesalePriceUnit || 0;
    const retailPriceUnit = formData.retailPriceUnit || 0;

    const wholesalePriceTotal = quantity * wholesalePriceUnit;
    const retailPriceTotal = quantity * retailPriceUnit;

    const newRecord = {
      ...formData,
      wholesalePriceTotal,
      retailPriceTotal
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-16b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          date: '',
          retailStore: '',
          serialNo: '',
          description: '',
          returnableEmpties: '',
          quantity: 0,
          wholesalePriceUnit: 0,
          retailPriceUnit: 0,
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
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">බඩු භාර ගැනීමේ සටහන</h2>
              <p className="text-slate-400 text-sm">Goods Receipt Note - Form 16 B</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">සිල්ලර ගබඩාව (Retail Store)</label>
                  <input type="text" name="retailStore" value={formData.retailStore} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
            </div>

            {/* Item Details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අංකය (S.No)</label>
                  <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">විස්තර (Description)</label>
                  <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ආපසු එවිය යුතු (Returnable Empties)</label>
                  <input type="text" name="returnableEmpties" value={formData.returnableEmpties} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ප්‍රමාණය (Quantity)</label>
                  <input type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Wholesale Price */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h3 className="text-md font-bold text-blue-800 border-b border-blue-200 pb-2 mb-4">තොග ගබඩා විකුණුම් මිල (Wholesale Price)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">එකකට (Per Unit)</label>
                            <input type="number" step="0.01" name="wholesalePriceUnit" value={formData.wholesalePriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Retail Price */}
                <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                    <h3 className="text-md font-bold text-green-800 border-b border-green-200 pb-2 mb-4">සිල්ලර ගබඩා විකුණුම් මිල (Retail Price)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">එකකට (Per Unit)</label>
                            <input type="number" step="0.01" name="retailPriceUnit" value={formData.retailPriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Extras */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-1">වෙනත් කරුණු (Remarks)</label>
                <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row justify-between md:items-center">
          <h3 className="font-bold text-slate-800">Ledger View</h3>
          <p className="text-sm text-slate-500">Totals auto-calculated for Wholesale & Retail</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-3 py-3 border-r border-slate-200">දිනය (Date)</th>
                <th className="px-3 py-3 border-r border-slate-200">සිල්ලර ගබඩාව (Store)</th>
                <th className="px-3 py-3 border-r border-slate-200">අංකය (S.No)</th>
                <th className="px-3 py-3 border-r border-slate-200">විස්තර (Description)</th>
                <th className="px-3 py-3 border-r border-slate-200">ආපසු එවිය යුතු (Empties)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">ප්‍රමාණය (Quantity)</th>
                
                <th className="px-3 py-3 text-right bg-blue-50/50 text-blue-800">තොග එකකට (W. Unit)</th>
                <th className="px-3 py-3 text-right bg-blue-50/50 text-blue-800 border-r border-blue-200 font-bold">තොග එකතුව (W. Total)</th>
                
                <th className="px-3 py-3 text-right bg-green-50/50 text-green-800">සිල්ලර එකකට (R. Unit)</th>
                <th className="px-3 py-3 text-right bg-green-50/50 text-green-800 border-r border-green-200 font-bold">සිල්ලර එකතුව (R. Total)</th>
                
                <th className="px-3 py-3">වෙනත් කරුණු (Remarks)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-3 py-2 font-medium text-slate-800 border-r border-slate-100">{record.date}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.retailStore}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.serialNo}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.description}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.returnableEmpties}</td>
                  <td className="px-3 py-2 font-medium text-slate-800 text-right border-r border-slate-100">{record.quantity?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-blue-700 bg-blue-50/10 text-right">{record.wholesalePriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-blue-800 bg-blue-50/10 text-right border-r border-blue-100">{record.wholesalePriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-green-700 bg-green-50/10 text-right">{record.retailPriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-green-800 bg-green-50/10 text-right border-r border-green-100">{record.retailPriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-3 py-2 text-slate-600">{record.remarks}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="11" className="px-4 py-8 text-center text-slate-500">
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
