import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function MilkCollectionSummary() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    receivedMorning: 0,
    receivedEvening: 0,
    excess: 0,
    issuedMorning: 0,
    issuedEvening: 0,
    spoiledReturned: 0,
    shortage: 0
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-15m-milk');
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
      [name]: name === 'date' ? value : Number(value),
    }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    const receivedMorning = formData.receivedMorning || 0;
    const receivedEvening = formData.receivedEvening || 0;
    const excess = formData.excess || 0;

    const totalReceived = receivedMorning + receivedEvening;
    const grandTotalReceived = totalReceived + excess;

    const issuedMorning = formData.issuedMorning || 0;
    const issuedEvening = formData.issuedEvening || 0;
    const spoiledReturned = formData.spoiledReturned || 0;
    const shortage = formData.shortage || 0;

    const totalIssued = issuedMorning + issuedEvening;
    const grandTotalIssued = totalIssued + spoiledReturned + shortage;

    const newRecord = {
      ...formData,
      totalReceived,
      grandTotalReceived,
      totalIssued,
      grandTotalIssued
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-15m-milk', {
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
          receivedMorning: 0,
          receivedEvening: 0,
          excess: 0,
          issuedMorning: 0,
          issuedEvening: 0,
          spoiledReturned: 0,
          shortage: 0
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
            <div className="bg-emerald-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">කිරි මධ්යස්ථානය දිනික සටහන</h2>
              <p className="text-slate-400 text-sm">Milk Center Daily Summary - Form 15 M</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-1">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-slate-50 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" required />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Receipts */}
                <div className="bg-emerald-50 p-5 rounded-xl border border-emerald-100">
                    <h3 className="text-md font-bold text-emerald-800 border-b border-emerald-200 pb-2 mb-4">ලැබීම් (Receipts)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">භාර ගත් උදේ (Received Morning)</label>
                            <input type="number" step="0.01" name="receivedMorning" value={formData.receivedMorning} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">භාර ගත් සවස (Received Evening)</label>
                            <input type="number" step="0.01" name="receivedEvening" value={formData.receivedEvening} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-emerald-700 mb-1">වැඩි (Excess)</label>
                            <input type="number" step="0.01" name="excess" value={formData.excess} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Issues */}
                <div className="bg-orange-50 p-5 rounded-xl border border-orange-100">
                    <h3 className="text-md font-bold text-orange-800 border-b border-orange-200 pb-2 mb-4">නිකුත් කිරීම් (Issues)</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">භාරදුන් උදේ (Issued Morning)</label>
                            <input type="number" step="0.01" name="issuedMorning" value={formData.issuedMorning} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">භාරදුන් සවස (Issued Evening)</label>
                            <input type="number" step="0.01" name="issuedEvening" value={formData.issuedEvening} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">නරක්වී ආපසු භාරදීම (Spoiled/Returned)</label>
                            <input type="number" step="0.01" name="spoiledReturned" value={formData.spoiledReturned} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-orange-700 mb-1">අඩු (Shortage)</label>
                            <input type="number" step="0.01" name="shortage" value={formData.shortage} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none" />
                        </div>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-medium">
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
                <th className="px-4 py-3 whitespace-nowrap text-right bg-emerald-50/50">Rec. Morning</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-emerald-50/50">Rec. Evening</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-emerald-50/50">Excess</th>
                <th className="px-4 py-3 whitespace-nowrap text-right font-bold text-emerald-700 bg-emerald-100">Grand Total (Rec)</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-orange-50/50">Iss. Morning</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-orange-50/50">Iss. Evening</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-orange-50/50">Spoiled</th>
                <th className="px-4 py-3 whitespace-nowrap text-right bg-orange-50/50">Shortage</th>
                <th className="px-4 py-3 whitespace-nowrap text-right font-bold text-orange-700 bg-orange-100">Grand Total (Iss)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{record.date}</td>
                  
                  <td className="px-4 py-3 text-slate-600 bg-emerald-50/10 text-right">{record.receivedMorning?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-slate-600 bg-emerald-50/10 text-right">{record.receivedEvening?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-slate-600 bg-emerald-50/10 text-right">{record.excess?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-bold text-emerald-600 bg-emerald-50 text-right whitespace-nowrap">{record.grandTotalReceived?.toFixed(2) || '0.00'}</td>
                  
                  <td className="px-4 py-3 text-slate-600 bg-orange-50/10 text-right">{record.issuedMorning?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-slate-600 bg-orange-50/10 text-right">{record.issuedEvening?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-slate-600 bg-orange-50/10 text-right">{record.spoiledReturned?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 text-slate-600 bg-orange-50/10 text-right">{record.shortage?.toFixed(2) || '0.00'}</td>
                  <td className="px-4 py-3 font-bold text-orange-600 bg-orange-50 text-right whitespace-nowrap">{record.grandTotalIssued?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-slate-500">
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
