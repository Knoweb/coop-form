import React, { useState, useEffect } from 'react';
import { PlusCircle, Phone } from 'lucide-react';

export default function TelephoneRegisterForm() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    callerName: '',
    calledNumberArea: '',
    timeTakenMinutes: '',
    callSummary: '',
    signature: '',
    officialCost: 0,
    privateCost: 0,
    receiptNo: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/telephone-register');
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
      [name]: (name === 'officialCost' || name === 'privateCost') ? Number(value) : value,
    }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/telephone-register', {
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
          callerName: '',
          calledNumberArea: '',
          timeTakenMinutes: '',
          callSummary: '',
          signature: '',
          officialCost: 0,
          privateCost: 0,
          receiptNo: ''
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
              <Phone className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">දුරකථන ලේඛනය</h2>
              <p className="text-slate-400 text-sm">Telephone Register (Form 34)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100 lg:col-span-2">
              <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">Basic Call Info</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Date (දිනය)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Caller's Name (කතාකරන්නාගේ නම)</label>
                  <input type="text" name="callerName" value={formData.callerName} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Called No. & Area (කතා කළ නොම්මරය හා පළාත)</label>
                  <input type="text" name="calledNumberArea" value={formData.calledNumberArea} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Time Taken (ගතවූ කාලය විනාඩි)</label>
                  <input type="text" name="timeTakenMinutes" value={formData.timeTakenMinutes} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Initials (කතාකරන්නාගේ කෙටි අත්සන)</label>
                  <input type="text" name="signature" value={formData.signature} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                </div>
                <div className="sm:col-span-2 lg:col-span-3">
                  <label className="block text-xs font-medium text-slate-600 mb-1">Summary (කතාවේ සාරාංශය)</label>
                  <input type="text" name="callSummary" value={formData.callSummary} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="space-y-4 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
              <h3 className="text-sm font-semibold text-indigo-800 border-b border-indigo-200 pb-2">Cost & Billing</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-indigo-800 mb-1">Official Cost - Rs. (රාජකාරී රු. ශත)</label>
                  <input type="number" step="0.01" name="officialCost" value={formData.officialCost} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-blue-700" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-indigo-800 mb-1">Private Cost - Rs. (පෞද්ගලික රු. ශත)</label>
                  <input type="number" step="0.01" name="privateCost" value={formData.privateCost} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-orange-700" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-indigo-800 mb-1">Receipt No. (රිසිට්පතේ අංකය)</label>
                  <input type="text" name="receiptNo" value={formData.receiptNo} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-slate-700" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
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
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Caller Name</th>
                <th className="px-4 py-3">Called No/Area</th>
                <th className="px-4 py-3">Mins</th>
                <th className="px-4 py-3">Summary</th>
                <th className="px-4 py-3">Initials</th>
                <th className="px-4 py-3 text-blue-700 bg-blue-50/50">Official Cost</th>
                <th className="px-4 py-3 text-orange-700 bg-orange-50/50">Private Cost</th>
                <th className="px-4 py-3">Receipt No.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-3 text-slate-700 whitespace-nowrap">{record.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-800">{record.callerName}</td>
                  <td className="px-4 py-3 text-slate-700">{record.calledNumberArea}</td>
                  <td className="px-4 py-3 text-slate-600 text-center">{record.timeTakenMinutes}</td>
                  <td className="px-4 py-3 text-slate-600">{record.callSummary}</td>
                  <td className="px-4 py-3 text-slate-600 font-medium">{record.signature}</td>
                  <td className="px-4 py-3 font-semibold text-blue-600 bg-blue-50/10 text-right">{record.officialCost?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-semibold text-orange-600 bg-orange-50/10 text-right">{record.privateCost?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-slate-700 font-medium">{record.receiptNo}</td>
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
