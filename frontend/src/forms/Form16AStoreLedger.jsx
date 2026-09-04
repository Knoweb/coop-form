import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form16AStoreLedger() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    itemDescription: '',
    referenceNo: '',
    qtyReceived: 0,
    qtyIssued: 0,
    unitPrice: 0,
    remarks: '',
    signature: ''
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

    const qtyReceived = formData.qtyReceived || 0;
    const qtyIssued = formData.qtyIssued || 0;
    const unitPrice = formData.unitPrice || 0;

    const qtyBalance = qtyReceived - qtyIssued;
    
    const valueReceived = qtyReceived * unitPrice;
    const valueIssued = qtyIssued * unitPrice;
    const valueBalance = qtyBalance * unitPrice;

    const newRecord = {
      ...formData,
      qtyBalance,
      valueReceived,
      valueIssued,
      valueBalance
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-16a', {
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
          itemDescription: '',
          referenceNo: '',
          qtyReceived: 0,
          qtyIssued: 0,
          unitPrice: 0,
          remarks: '',
          signature: ''
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
              <h2 className="text-lg font-bold text-white">තොග ගබඩාව සටහන</h2>
              <p className="text-slate-400 text-sm">Stock Ledger - Form 16 A</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ද්රව්ය (Item Description)</label>
                  <input type="text" name="itemDescription" value={formData.itemDescription} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">බිල්පත් අංකය (Ref No)</label>
                  <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Quantities */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 col-span-1 md:col-span-2">
                    <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">ප්‍රමාණය (Quantity) & මිල (Pricing)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">ලැබුණු (Qty Received)</label>
                            <input type="number" step="0.01" name="qtyReceived" value={formData.qtyReceived} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">නිකුත් කළ (Qty Issued)</label>
                            <input type="number" step="0.01" name="qtyIssued" value={formData.qtyIssued} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-indigo-700 mb-1">ඒකක මිල (Unit Price)</label>
                            <input type="number" step="0.01" name="unitPrice" value={formData.unitPrice} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Extras */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 col-span-1">
                    <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">අමතර (Extras)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">සටහන් (Remarks)</label>
                            <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">අත්සන (Signature)</label>
                            <input type="text" name="signature" value={formData.signature} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
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
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-100 text-slate-600 font-medium border-b border-slate-200">
              <tr>
                <th className="px-4 py-3 whitespace-nowrap">දිනය (Date)</th>
                <th className="px-4 py-3 whitespace-nowrap">Item Description</th>
                <th className="px-4 py-3 whitespace-nowrap">Ref No</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-emerald-50/50">Qty Rec.</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-orange-50/50">Qty Iss.</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-indigo-50/50 font-bold">Qty Bal.</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-slate-50/50">Unit Price</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-emerald-50/50">Val Rec.</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-orange-50/50">Val Iss.</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-indigo-50/50 font-bold">Val Bal.</th>
                <th className="px-4 py-3 whitespace-nowrap">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{record.date}</td>
                  <td className="px-4 py-3 text-slate-800">{record.itemDescription}</td>
                  <td className="px-4 py-3 text-slate-800">{record.referenceNo}</td>
                  
                  <td className="px-4 py-3 text-emerald-600 bg-emerald-50/10 text-right">{record.qtyReceived?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-orange-600 bg-orange-50/10 text-right">{record.qtyIssued?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/10 text-right">{record.qtyBalance?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-4 py-3 text-slate-600 bg-slate-50/10 text-right">{record.unitPrice?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-4 py-3 text-emerald-600 bg-emerald-50/10 text-right">{record.valueReceived?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-orange-600 bg-orange-50/10 text-right">{record.valueIssued?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50/10 text-right whitespace-nowrap">{record.valueBalance?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-4 py-3 text-slate-600">{record.remarks}</td>
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
