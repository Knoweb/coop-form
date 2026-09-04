import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function BranchProfitLossForm() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    branchName: '',
    voucherNo: '',
    income1: 0,
    income2: 0,
    income3: 0,
    income4: 0,
    expense1: 0,
    expense2: 0,
    expense3: 0,
    expense4: 0,
    expense5: 0,
    expense6: 0,
    expense7: 0,
    expense8: 0
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/branch-profit-loss');
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
      [name]: name.includes('income') || name.includes('expense') ? Number(value) : value,
    }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();
    
    const totalIncome = (formData.income1 || 0) + (formData.income2 || 0) + (formData.income3 || 0) + (formData.income4 || 0);
    const totalExpense = (formData.expense1 || 0) + (formData.expense2 || 0) + (formData.expense3 || 0) + (formData.expense4 || 0) + (formData.expense5 || 0) + (formData.expense6 || 0) + (formData.expense7 || 0) + (formData.expense8 || 0);
    const netProfit = totalIncome - totalExpense;

    const newRecord = {
      ...formData,
      totalIncome,
      totalExpense,
      netProfit
    };

    try {
      const res = await fetch('http://localhost:8080/api/branch-profit-loss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          branchName: '',
          voucherNo: '',
          income1: 0,
          income2: 0,
          income3: 0,
          income4: 0,
          expense1: 0,
          expense2: 0,
          expense3: 0,
          expense4: 0,
          expense5: 0,
          expense6: 0,
          expense7: 0,
          expense8: 0
        });
      }
    } catch (error) {
      console.error('Error saving record:', error);
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
              <h2 className="text-lg font-bold text-white">ශාඛා ලාභාලාභ ගිණුම</h2>
              <p className="text-slate-400 text-sm">Branch Profit & Loss Account</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-sm font-semibold text-slate-700 border-b border-slate-200 pb-2">General Information</h3>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Branch Name</label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Voucher No.</label>
                <input
                  type="text"
                  name="voucherNo"
                  value={formData.voucherNo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none"
                  required
                />
              </div>
            </div>

            <div className="space-y-4 bg-green-50 p-4 rounded-xl border border-green-100">
              <h3 className="text-sm font-semibold text-green-700 border-b border-green-200 pb-2">Income (ආදායම්)</h3>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(num => (
                  <div key={`inc-${num}`}>
                    <label className="block text-xs font-medium text-green-700 mb-1">Income {num}</label>
                    <input
                      type="number"
                      name={`income${num}`}
                      value={formData[`income${num}`]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-green-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-8">
            <h3 className="text-sm font-semibold text-red-700 border-b border-red-200 pb-2 mb-4">Expenses (වියදම්)</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                <div key={`exp-${num}`}>
                  <label className="block text-xs font-medium text-red-700 mb-1">Expense {num}</label>
                  <input
                    type="number"
                    name={`expense${num}`}
                    value={formData[`expense${num}`]}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-medium"
            >
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
            <thead className="bg-slate-100 text-slate-600 font-medium">
              <tr>
                <th className="px-4 py-3 border-b border-slate-200">Branch Name</th>
                <th className="px-4 py-3 border-b border-slate-200">Voucher No.</th>
                {[1, 2, 3, 4].map(num => (
                  <th key={`th-inc-${num}`} className="px-4 py-3 border-b border-slate-200 text-green-700 bg-green-50/50">Inc {num}</th>
                ))}
                <th className="px-4 py-3 border-b border-slate-200 text-green-800 bg-green-100 font-bold">Total Income</th>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                  <th key={`th-exp-${num}`} className="px-4 py-3 border-b border-slate-200 text-red-700 bg-red-50/50">Exp {num}</th>
                ))}
                <th className="px-4 py-3 border-b border-slate-200 text-red-800 bg-red-100 font-bold">Total Expense</th>
                <th className="px-4 py-3 border-b border-slate-200 text-indigo-700 bg-indigo-50 font-bold">Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => (
                <tr key={record.id || index} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800 whitespace-nowrap">{record.branchName}</td>
                  <td className="px-4 py-3 text-slate-600 whitespace-nowrap">{record.voucherNo}</td>
                  
                  {[1, 2, 3, 4].map(num => (
                    <td key={`td-inc-${num}`} className="px-4 py-3 text-slate-600 bg-green-50/10 text-right">
                      {record[`income${num}`]?.toFixed(2) || '0.00'}
                    </td>
                  ))}
                  <td className="px-4 py-3 font-semibold text-green-700 bg-green-50/50 text-right">
                    {record.totalIncome?.toFixed(2) || '0.00'}
                  </td>

                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <td key={`td-exp-${num}`} className="px-4 py-3 text-slate-600 bg-red-50/10 text-right">
                      {record[`expense${num}`]?.toFixed(2) || '0.00'}
                    </td>
                  ))}
                  <td className="px-4 py-3 font-semibold text-red-700 bg-red-50/50 text-right">
                    {record.totalExpense?.toFixed(2) || '0.00'}
                  </td>

                  <td className="px-4 py-3 font-bold text-indigo-700 bg-indigo-50/50 text-right whitespace-nowrap">
                    {record.netProfit?.toFixed(2) || '0.00'}
                  </td>
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
