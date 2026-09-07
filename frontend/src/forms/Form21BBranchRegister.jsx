import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText, ArrowLeftRight } from 'lucide-react';

export default function Form21BBranchRegister() {
  const [records, setRecords] = useState([]);
  
  const [formData, setFormData] = useState({
    branchOrDepartmentName: '',
    bookAccountRef: '',
    
    date: '',
    billAndDescription: '',
    serialRangeFromTo: '',
    quantity: 0,
    value: 0,
    
    returnDate: '',
    returnBalance: '',
    returnSerialRange: '',
    returnOfficerSignature: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-21b');
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
      const res = await fetch('http://localhost:8080/api/form-21b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchRecords();
        // Carry over header info to save time
        setFormData({
          branchOrDepartmentName: formData.branchOrDepartmentName,
          bookAccountRef: formData.bookAccountRef,
          
          date: '',
          billAndDescription: '',
          serialRangeFromTo: '',
          quantity: 0,
          value: 0,
          
          returnDate: '',
          returnBalance: '',
          returnSerialRange: '',
          returnOfficerSignature: ''
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
    <div className="max-w-[95rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ප්‍රාදේශිකයේ / අංශයේ නම</h2>
              <p className="text-slate-400 text-sm">Regional / Branch Register (Form 21 B)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header Metadata Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ප්‍රාදේශිකයේ/අංශයේ නම (Branch/Dept Name)</label>
                  <input type="text" name="branchOrDepartmentName" value={formData.branchOrDepartmentName} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">පොත් ආකාරයට (Book/Account Ref)</label>
                  <input type="text" name="bookAccountRef" value={formData.bookAccountRef} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            {/* Entry Details */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Main Entry Section */}
                <div className="lg:col-span-7 bg-indigo-50 p-5 rounded-xl border border-indigo-200">
                    <h4 className="text-sm font-bold text-indigo-800 mb-4 border-b border-indigo-200 pb-2">නිකුත් කිරීම් (Main Entry)</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-indigo-700 mb-1">දිනය (Date)</label>
                            <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" required />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-indigo-700 mb-1">අනු අංකය සිට දක්වා (Serial Range)</label>
                            <input type="text" name="serialRangeFromTo" value={formData.serialRangeFromTo} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs font-medium text-indigo-700 mb-1">බිල්පත හා විස්තර (Bill & Description)</label>
                            <input type="text" name="billAndDescription" value={formData.billAndDescription} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-indigo-700 mb-1">ප්‍රමාණය (Quantity)</label>
                            <input type="number" step="0.01" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-indigo-700 mb-1">වටිනාකම (Value)</label>
                            <input type="number" step="0.01" name="value" value={formData.value} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="hidden lg:flex items-center justify-center lg:col-span-1">
                    <ArrowLeftRight className="w-8 h-8 text-slate-300" />
                </div>

                {/* Return Section */}
                <div className="lg:col-span-4 bg-emerald-50 p-5 rounded-xl border border-emerald-200">
                    <h4 className="text-sm font-bold text-emerald-800 mb-4 border-b border-emerald-200 pb-2">ආපසු හැවීම් (Returns)</h4>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">දිනය (Return Date)</label>
                            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">ශේෂය (Balance)</label>
                            <input type="text" name="returnBalance" value={formData.returnBalance} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">අනු අංකය සිට දක්වා (Serial Range)</label>
                            <input type="text" name="returnSerialRange" value={formData.returnSerialRange} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">භාර ගන්නාගේ අත්සන (Officer Signature Name)</label>
                            <input type="text" name="returnOfficerSignature" value={formData.returnOfficerSignature} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                </div>

            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-medium">
              <PlusCircle className="w-5 h-5" />
              <span>Add Record</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Branch Register (ප්‍රාදේශිකයේ / අංශයේ නම)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-slate-600 font-medium">
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">දිනය<br/>(Date)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">බිල්පත හා විස්තර<br/>(Bill & Description)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">අනු අංකය සිට දක්වා<br/>(Serial Range)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom text-right" rowSpan="2">ප්‍රමාණය<br/>(Qty)</th>
                <th className="px-3 py-2 border-r-2 border-gray-400 align-bottom text-right" rowSpan="2">වටිනාකම<br/>(Value)</th>
                <th colSpan="4" className="px-3 py-2 border-b border-emerald-200 bg-emerald-50 text-emerald-800 text-center">ආපසු හැවීම් (Returns)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-emerald-700">දිනය (Date)</th>
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-emerald-700">ශේෂය (Balance)</th>
                <th className="px-3 py-2 border-r border-emerald-100 bg-emerald-50/50 text-emerald-700">අනු අංකය (Serial)</th>
                <th className="px-3 py-2 bg-emerald-50/50 text-emerald-700">අත්සන (Signature)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                  <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors text-slate-800">
                    <td className="px-3 py-2 border-r border-slate-100">{record.date}</td>
                    <td className="px-3 py-2 border-r border-slate-100">{record.billAndDescription}</td>
                    <td className="px-3 py-2 border-r border-slate-100">{record.serialRangeFromTo}</td>
                    <td className="px-3 py-2 border-r border-slate-100 text-right font-medium text-indigo-700">{record.quantity?.toFixed(2) || '0.00'}</td>
                    <td className="px-3 py-2 border-r-2 border-gray-400 text-right font-medium">{record.value?.toFixed(2) || '0.00'}</td>
                    
                    <td className="px-3 py-2 border-r border-emerald-50 bg-emerald-50/30">{record.returnDate}</td>
                    <td className="px-3 py-2 border-r border-emerald-50 bg-emerald-50/30">{record.returnBalance}</td>
                    <td className="px-3 py-2 border-r border-emerald-50 bg-emerald-50/30">{record.returnSerialRange}</td>
                    <td className="px-3 py-2 bg-emerald-50/30 italic">{record.returnOfficerSignature}</td>
                  </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="9" className="px-4 py-8 text-center text-slate-500">
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
