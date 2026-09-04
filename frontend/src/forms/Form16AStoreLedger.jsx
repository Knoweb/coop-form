import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form16AStoreLedger() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    itemDescription: '',
    receiptNo: '',
    buyingPriceUnit: 0,
    qtyReceived: 0,
    qtyIssued: 0,
    sellingPriceUnit: 0,
    handedOverNo: '',
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
    const buyingPriceUnit = formData.buyingPriceUnit || 0;
    const sellingPriceUnit = formData.sellingPriceUnit || 0;

    const qtyBalance = qtyReceived - qtyIssued;
    const buyingPriceTotal = qtyReceived * buyingPriceUnit;
    const sellingPriceTotal = qtyBalance * sellingPriceUnit;

    const newRecord = {
      ...formData,
      qtyBalance,
      buyingPriceTotal,
      sellingPriceTotal
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
          receiptNo: '',
          buyingPriceUnit: 0,
          qtyReceived: 0,
          qtyIssued: 0,
          sellingPriceUnit: 0,
          handedOverNo: '',
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
                  <label className="block text-sm font-semibold text-slate-700 mb-2">විස්තරය (Description)</label>
                  <input type="text" name="itemDescription" value={formData.itemDescription} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">රිසිට්පත් අංකය (Receipt No)</label>
                  <input type="text" name="receiptNo" value={formData.receiptNo} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buying Price */}
                <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h3 className="text-md font-bold text-blue-800 border-b border-blue-200 pb-2 mb-4">ගැනුම් මිල (Buying Price)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-blue-700 mb-1">එකක් රු. (Unit Price)</label>
                            <input type="number" step="0.01" name="buyingPriceUnit" value={formData.buyingPriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Selling Price */}
                <div className="bg-green-50 p-5 rounded-xl border border-green-100">
                    <h3 className="text-md font-bold text-green-800 border-b border-green-200 pb-2 mb-4">විකුණුම් මිල (Selling Price)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">එකක් රු. (Unit Price)</label>
                            <input type="number" step="0.01" name="sellingPriceUnit" value={formData.sellingPriceUnit} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Quantity & Balance */}
                 <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">ප්‍රමාණය සහ ශේෂය (Quantity & Balance)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">වැඩි (Qty Received)</label>
                            <input type="number" step="0.01" name="qtyReceived" value={formData.qtyReceived} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">අඩු (Qty Issued)</label>
                            <input type="number" step="0.01" name="qtyIssued" value={formData.qtyIssued} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Extras */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                    <h3 className="text-md font-bold text-slate-800 border-b border-slate-200 pb-2 mb-4">අමතර (Extras)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">භාරදුන් අංකය (Handed Over Ref)</label>
                            <input type="text" name="handedOverNo" value={formData.handedOverNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
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
                <th className="px-4 py-3 whitespace-nowrap">විස්තරය (Description)</th>
                <th className="px-4 py-3 whitespace-nowrap">රිසිට්පත් අංකය (Receipt No)</th>
                
                <th className="px-4 py-3 whitespace-nowrap text-right bg-blue-50/50 text-blue-800 border-l border-blue-200">එකක් රු. (Buy Unit)</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-blue-50/50 text-blue-800 font-bold">තොගයට රු. (Buy Total)</th>
                
                <th className="px-4 py-3 whitespace-nowrap text-right border-l border-slate-200">වැඩි (Qty In)</th>
                <th className="px-4 py-3 whitespace-nowrap text-right">අඩු (Qty Out)</th>
                <th className="px-4 py-3 whitespace-nowrap text-right font-bold">ශේෂය (Balance)</th>
                
                <th className="px-4 py-3 whitespace-nowrap text-right bg-green-50/50 text-green-800 border-l border-green-200">එකක් රු. (Sell Unit)</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-green-50/50 text-green-800 font-bold">තොගයට රු. (Sell Total)</th>
                
                <th className="px-4 py-3 whitespace-nowrap border-l border-slate-200">භාරදුන් අංකය (Ref No)</th>
                <th className="px-4 py-3 whitespace-nowrap">සටහන් (Remarks)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{record.date}</td>
                  <td className="px-4 py-3 text-slate-800">{record.itemDescription}</td>
                  <td className="px-4 py-3 text-slate-800">{record.receiptNo}</td>
                  
                  <td className="px-4 py-3 text-blue-700 bg-blue-50/10 text-right border-l border-blue-100">{record.buyingPriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-bold text-blue-800 bg-blue-50/10 text-right">{record.buyingPriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-4 py-3 text-slate-700 text-right border-l border-slate-100">{record.qtyReceived?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-slate-700 text-right">{record.qtyIssued?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-bold text-indigo-700 text-right">{record.qtyBalance?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-4 py-3 text-green-700 bg-green-50/10 text-right border-l border-green-100">{record.sellingPriceUnit?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-bold text-green-800 bg-green-50/10 text-right">{record.sellingPriceTotal?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-4 py-3 text-slate-600 border-l border-slate-100">{record.handedOverNo}</td>
                  <td className="px-4 py-3 text-slate-600">{record.remarks}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="12" className="px-4 py-8 text-center text-slate-500">
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
