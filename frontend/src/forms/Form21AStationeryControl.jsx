import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form21AStationeryControl() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    unitCost: 0,
    itemType: '',
    bookNo: '',
    
    recDate: '',
    recSealedBillNo: '',
    recBroughtBy: '',
    recInitials: '',
    recSerialFromTo: '',
    recQty: 0,
    
    issDate: '',
    issReceiverRef: '',
    issBillSerialFromTo: '',
    issSignature: '',
    issQty: 0,
    issBalance: 0
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-21a');
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

    // AUTO-CALCULATE VALUES BEFORE POSTING
    const recValue = (formData.recQty || 0) * (formData.unitCost || 0);
    const issValue = (formData.issQty || 0) * (formData.unitCost || 0);

    const payload = { 
      ...formData,
      recValue,
      issValue
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-21a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          unitCost: formData.unitCost, // Carry over header info to save time
          itemType: formData.itemType,
          bookNo: formData.bookNo,
          
          recDate: '',
          recSealedBillNo: '',
          recBroughtBy: '',
          recInitials: '',
          recSerialFromTo: '',
          recQty: 0,
          
          issDate: '',
          issReceiverRef: '',
          issBillSerialFromTo: '',
          issSignature: '',
          issQty: 0,
          issBalance: formData.issBalance // Balance carries over
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
    <div className="max-w-[110rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ලිපිද්‍රව්‍ය පාලනය</h2>
              <p className="text-slate-400 text-sm">Stationery Control (Form 21 A)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header Configurations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">එකක් ගත් මිල (Unit Cost)</label>
                  <input type="number" step="0.01" name="unitCost" value={formData.unitCost} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">වර්ගය (Item Type)</label>
                  <input type="text" name="itemType" value={formData.itemType} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">පොත් අංකයට (Book No)</label>
                  <input type="text" name="bookNo" value={formData.bookNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Receipts Side */}
                <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                    <h3 className="text-md font-bold text-green-800 border-b border-green-200 pb-2 mb-4">ලැබීම් (Receipts)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">දිනය (Date)</label>
                            <input type="date" name="recDate" value={formData.recDate} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">මුද්‍රා තැබූ බිල් (Sealed Bill No)</label>
                            <input type="text" name="recSealedBillNo" value={formData.recSealedBillNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">ගෙන ආ අය/රිසිට් (Brought By)</label>
                            <input type="text" name="recBroughtBy" value={formData.recBroughtBy} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">කෙටි අත්සන (Initials)</label>
                            <input type="text" name="recInitials" value={formData.recInitials} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">අනු අංක (Serial From-To)</label>
                            <input type="text" name="recSerialFromTo" value={formData.recSerialFromTo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="recQty" value={formData.recQty} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Issues Side */}
                <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                    <h3 className="text-md font-bold text-red-800 border-b border-red-200 pb-2 mb-4">නිකුත් කිරීම් (Issues)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-red-700 mb-1">දිනය (Date)</label>
                            <input type="date" name="issDate" value={formData.issDate} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-red-700 mb-1">රහස් අංකය (Receiver's Ref)</label>
                            <input type="text" name="issReceiverRef" value={formData.issReceiverRef} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-red-700 mb-1">බිල්පත් අනු අංක (Bill Serial)</label>
                            <input type="text" name="issBillSerialFromTo" value={formData.issBillSerialFromTo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-red-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="issQty" value={formData.issQty} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-red-700 mb-1">අත්සන (Signature)</label>
                            <input type="text" name="issSignature" value={formData.issSignature} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-red-700 mb-1">ඉතිරිය (Balance)</label>
                            <input type="number" step="0.01" name="issBalance" value={formData.issBalance} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none" />
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
                <th className="px-3 py-2 border-r border-slate-200 text-center" colSpan="3">Header Info</th>
                <th colSpan="7" className="px-3 py-2 border-r-2 border-gray-400 bg-green-50 text-green-800 text-center border-b border-green-200">ලැබීම් (Receipts)</th>
                <th colSpan="7" className="px-3 py-2 bg-red-50 text-red-800 text-center border-b border-red-200">නිකුත් කිරීම් (Issues)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                {/* Header Sub */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">එකක් ගත් මිල<br/>(Unit Cost)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">වර්ගය<br/>(Item Type)</th>
                <th className="px-2 py-2 border-r-2 border-gray-400 text-center">පොත් අංකයට<br/>(Book No)</th>

                {/* Receipts Sub */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">දිනය<br/>(Date)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">මුද්‍රා තැබූ බිල්<br/>(Sealed Bill)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">ගෙන ආ අය<br/>(Brought By)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">කෙටි අත්සන<br/>(Initials)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">අනු අංක<br/>(Serial Range)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-right text-green-700">ප්‍රමාණය<br/>(Qty)</th>
                <th className="px-2 py-2 border-r-2 border-gray-400 text-right text-green-700 font-bold">වටිනාකම<br/>(Value)</th>

                {/* Issues Sub */}
                <th className="px-2 py-2 border-r border-slate-200 text-center">දිනය<br/>(Date)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">රහස් අංකය<br/>(Receiver Ref)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">අනු අංක<br/>(Serial Range)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-right text-red-700">ප්‍රමාණය<br/>(Qty)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-right text-red-700 font-bold">වටිනාකම<br/>(Value)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center">අත්සන<br/>(Signature)</th>
                <th className="px-2 py-2 text-right font-bold text-slate-800">ඉතිරිය<br/>(Balance)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  {/* Header */}
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center font-medium">{record.unitCost?.toFixed(2) || '0.00'}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 font-medium">{record.itemType}</td>
                  <td className="px-2 py-2 text-slate-800 border-r-2 border-gray-400 font-medium">{record.bookNo}</td>

                  {/* Receipts */}
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.recDate}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.recSealedBillNo}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.recBroughtBy}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.recInitials}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.recSerialFromTo}</td>
                  <td className="px-2 py-2 text-green-700 text-right border-r border-slate-100 font-medium">{record.recQty?.toFixed(2) || '0.00'}</td>
                  <td className="px-2 py-2 text-green-700 text-right border-r-2 border-gray-400 font-bold">{record.recValue?.toFixed(2) || '0.00'}</td>
                  
                  {/* Issues */}
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.issDate}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.issReceiverRef}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.issBillSerialFromTo}</td>
                  <td className="px-2 py-2 text-red-700 text-right border-r border-slate-100 font-medium">{record.issQty?.toFixed(2) || '0.00'}</td>
                  <td className="px-2 py-2 text-red-700 text-right border-r border-slate-100 font-bold">{record.issValue?.toFixed(2) || '0.00'}</td>
                  <td className="px-2 py-2 text-slate-800 border-r border-slate-100 text-center">{record.issSignature}</td>
                  <td className="px-2 py-2 text-slate-800 text-right font-bold bg-slate-100/50">{record.issBalance?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="17" className="px-4 py-8 text-center text-slate-500">
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
