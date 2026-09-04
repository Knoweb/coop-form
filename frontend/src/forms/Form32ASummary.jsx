import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form32ASummary() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    serialNo: '',
    ref1: '',
    ref2: '',
    val1: 0,
    val2: 0,
    val3: 0,
    val4: 0,
    val5: 0,
    val6: 0,
    val7: 0,
    val8: 0,
    val9: 0,
    val10: 0,
    remarks: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-32a');
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.startsWith('val') ? Number(value) : value,
    }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    const total = (formData.val1 || 0) + (formData.val2 || 0) + (formData.val3 || 0) + 
                  (formData.val4 || 0) + (formData.val5 || 0) + (formData.val6 || 0) + 
                  (formData.val7 || 0) + (formData.val8 || 0) + (formData.val9 || 0) + 
                  (formData.val10 || 0);

    const newRecord = {
      ...formData,
      total
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-32a', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          serialNo: '',
          ref1: '',
          ref2: '',
          val1: 0,
          val2: 0,
          val3: 0,
          val4: 0,
          val5: 0,
          val6: 0,
          val7: 0,
          val8: 0,
          val9: 0,
          val10: 0,
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
              <h2 className="text-lg font-bold text-white">Form 32 A</h2>
              <p className="text-slate-400 text-sm">Summary Matrix</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">References</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Serial No.</label>
                  <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">අනුමත කල ද.අ. (Approved Ref)</label>
                  <input type="text" name="ref1" value={formData.ref1} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">ගිණුම් ද.අ. (Account Ref)</label>
                  <input type="text" name="ref2" value={formData.ref2} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
                </div>
              </div>
            </div>

            <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-semibold text-indigo-800 border-b border-indigo-200 pb-2 mb-4">Values</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  "භාණ්ඩ ලැබුම් පත (Goods Receipt)",
                  "මාරු ව.අ. (Transfer V.No)",
                  "වෙනත් (Other)",
                  "වවුචර (Voucher)",
                  "විකුණුම් මුදල (Sales Amount)",
                  "විකුණුම් නැවත (Sales Return)",
                  "විකුණුම් 14 B (Sales 14 B)",
                  "මාරු වීම් (Transfers)",
                  "ආපසු යැවීම් (Returns)",
                  "මිල අඩුවීම (Price Decrease)"
                ].map((label, index) => {
                  const num = index + 1;
                  return (
                    <div key={`val-${num}`}>
                      <label className="block text-xs font-medium text-indigo-800 mb-1">{label}</label>
                      <input
                        type="number"
                        step="0.01"
                        name={`val${num}`}
                        value={formData[`val${num}`]}
                        onChange={handleChange}
                        className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
               <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2 mb-4">Remarks</h3>
               <textarea name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" rows="2"></textarea>
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
                <th className="px-4 py-3 whitespace-nowrap">Serial No.</th>
                <th className="px-4 py-3 whitespace-nowrap">අනුමත කල ද.අ. (Approved Ref)</th>
                <th className="px-4 py-3 whitespace-nowrap">ගිණුම් ද.අ. (Account Ref)</th>
                {[
                  "භාණ්ඩ ලැබුම් පත (Goods Receipt)",
                  "මාරු ව.අ. (Transfer V.No)",
                  "වෙනත් (Other)",
                  "වවුචර (Voucher)",
                  "විකුණුම් මුදල (Sales Amount)",
                  "විකුණුම් නැවත (Sales Return)",
                  "විකුණුම් 14 B (Sales 14 B)",
                  "මාරු වීම් (Transfers)",
                  "ආපසු යැවීම් (Returns)",
                  "මිල අඩුවීම (Price Decrease)"
                ].map((label, index) => (
                  <th key={`th-val-${index + 1}`} className="px-4 py-3 whitespace-nowrap bg-indigo-50/50">{label}</th>
                ))}
                <th className="px-4 py-3 text-indigo-700 bg-indigo-100 font-bold whitespace-nowrap">Total</th>
                <th className="px-4 py-3">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{record.serialNo}</td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{record.ref1}</td>
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{record.ref2}</td>
                  
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <td key={`td-val-${num}`} className="px-4 py-3 text-slate-600 bg-indigo-50/10 text-right">
                      {record[`val${num}`]?.toFixed(2) || '0.00'}
                    </td>
                  ))}
                  
                  <td className="px-4 py-3 font-bold text-indigo-600 bg-indigo-50 text-right whitespace-nowrap">
                    {record.total?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{record.remarks}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="15" className="px-4 py-8 text-center text-slate-500">
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
