import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form17SpoilagePriceChange() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    storeType: 'WHOLESALE',
    serialNo: '',
    billNo: '',
    itemDescription: '',
    quantity: 0,
    unitPrice: 0,
    reducedPrice: 0,
    increasedPrice: 0,
    valueLess: 0,
    valueMore: 0,
    spoilageDeduction: 0,
    priceChangeLoss: 0,
    priceChangeProfit: 0,
    inspectorSignature: '',
    managerSignature: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-17');
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
      const res = await fetch('http://localhost:8080/api/form-17', {
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
          serialNo: '',
          billNo: '',
          itemDescription: '',
          quantity: 0,
          unitPrice: 0,
          reducedPrice: 0,
          increasedPrice: 0,
          valueLess: 0,
          valueMore: 0,
          spoilageDeduction: 0,
          priceChangeLoss: 0,
          priceChangeProfit: 0,
          inspectorSignature: '',
          managerSignature: ''
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
            <div className="bg-rose-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-rose-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">නරක්වීම් සහ මිල වෙනස්වීම් සටහන</h2>
              <p className="text-slate-400 text-sm">Spoilages and Price Changes Record - Form 17</p>
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ගබඩාව (Store Type)</label>
                  <select name="storeType" value={formData.storeType} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                    <option value="WHOLESALE">තොග ගබඩාව (Wholesale)</option>
                    <option value="RETAIL">සිල්ලර ගබඩාව (Retail)</option>
                  </select>
               </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අනු අංකය (Serial No)</label>
                  <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">බිල් අංකය (Bill No)</label>
                  <input type="text" name="billNo" value={formData.billNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ද්රව්ය විස්තර (Item Description)</label>
                  <input type="text" name="itemDescription" value={formData.itemDescription} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ප්‍රමාණය (Quantity)</label>
                  <input type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Prices */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h3 className="text-md font-bold text-blue-800 border-b border-blue-200 pb-2 mb-4">මිල (Prices)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">ඒකක මිල (Unit Price)</label>
                            <input type="number" step="0.01" name="unitPrice" value={formData.unitPrice} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">අඩු මිල (Reduced Price)</label>
                            <input type="number" step="0.01" name="reducedPrice" value={formData.reducedPrice} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">වැඩි මිල (Increased Price)</label>
                            <input type="number" step="0.01" name="increasedPrice" value={formData.increasedPrice} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Values */}
                <div className="bg-purple-50 p-5 rounded-xl border border-purple-100">
                    <h3 className="text-md font-bold text-purple-800 border-b border-purple-200 pb-2 mb-4">වටිනාකම (Values)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">අඩු (Value Less)</label>
                            <input type="number" step="0.01" name="valueLess" value={formData.valueLess} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-purple-700 mb-1">වැඩි (Value More)</label>
                            <input type="number" step="0.01" name="valueMore" value={formData.valueMore} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                    </div>
                </div>
                
                {/* Spoilage & Variance */}
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                    <h3 className="text-md font-bold text-orange-800 border-b border-orange-200 pb-2 mb-4">නරක්වීම් හා වෙනස්වීම් (Spoilage & Variance)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">නරක්වීම් අඩුවීම (Spoilage Deduction)</label>
                            <input type="number" step="0.01" name="spoilageDeduction" value={formData.spoilageDeduction} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">මිල වෙනස්වීම්: පාඩුව (Price Change Loss)</label>
                            <input type="number" step="0.01" name="priceChangeLoss" value={formData.priceChangeLoss} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">මිල වෙනස්වීම්: ලාභය (Price Change Profit)</label>
                            <input type="number" step="0.01" name="priceChangeProfit" value={formData.priceChangeProfit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">පරීක්ෂක (Inspector Signature)</label>
                    <input type="text" name="inspectorSignature" value={formData.inspectorSignature} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">කළමනාකරු (Manager Signature)</label>
                    <input type="text" name="managerSignature" value={formData.managerSignature} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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
                <th className="px-3 py-3 border-r border-slate-200">ගබඩාව (Store)</th>
                <th className="px-3 py-3 border-r border-slate-200">අනු අංකය (Serial No)</th>
                <th className="px-3 py-3 border-r border-slate-200">බිල් අංකය (Bill No)</th>
                <th className="px-3 py-3 border-r border-slate-200">ද්රව්ය (Description)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">ප්‍රමාණය (Quantity)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">ඒකක මිල (Unit Price)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">අඩු මිල (Reduced)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">වැඩි මිල (Increased)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">වටිනාකම අඩු (Value Less)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">වටිනාකම වැඩි (Value More)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">නරක්වීම් අඩුවීම (Spoilage)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">මිල පාඩුව (Loss)</th>
                <th className="px-3 py-3 border-r border-slate-200 text-right">මිල ලාභය (Profit)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-3 py-2 font-medium text-slate-800 border-r border-slate-100">{record.date}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.storeType === 'WHOLESALE' ? 'තොග (Wholesale)' : 'සිල්ලර (Retail)'}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.serialNo}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.billNo}</td>
                  <td className="px-3 py-2 text-slate-800 border-r border-slate-100">{record.itemDescription}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-slate-100">{record.quantity?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-slate-700 text-right border-r border-slate-100">{record.unitPrice?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-red-600 text-right border-r border-slate-100">{record.reducedPrice?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-green-600 text-right border-r border-slate-100">{record.increasedPrice?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-red-600 text-right border-r border-slate-100">{record.valueLess?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 text-green-600 text-right border-r border-slate-100">{record.valueMore?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-red-600 bg-red-50/20 text-right border-r border-red-100">{record.spoilageDeduction?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-red-600 bg-red-50/20 text-right border-r border-red-100">{record.priceChangeLoss?.toFixed(2) || '0.00'}</td>
                  <td className="px-3 py-2 font-bold text-green-600 bg-green-50/20 text-right border-r border-green-100">{record.priceChangeProfit?.toFixed(2) || '0.00'}</td>
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
