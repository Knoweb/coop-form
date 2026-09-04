import React, { useState } from 'react';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle, LayoutList } from 'lucide-react';

export default function Form32() {
  const emptyRow = {
    branchName: '', openingStock: '', purchases: '', transport: '', rent: '', traveling: '', customDb1: '', customDb2: '', customDb3: '', grossProfit: '', totalDebit: '',
    salesCash: '', salesCredit: '', transfers: '', transportIncome: '', rentIncome: '', customCr1: '', customCr2: '', customCr3: '', closingStock: '', grossLoss: '', totalCredit: ''
  };

  const [date, setDate] = useState('');
  const [wholesaleRows, setWholesaleRows] = useState([{ ...emptyRow }]);
  const [retailRows, setRetailRows] = useState([{ ...emptyRow }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleRowChange = (index, field, value, category) => {
    if (category === 'WHOLESALE') {
      const newRows = [...wholesaleRows];
      newRows[index][field] = value;
      setWholesaleRows(newRows);
    } else {
      const newRows = [...retailRows];
      newRows[index][field] = value;
      setRetailRows(newRows);
    }
  };

  const addRow = (category) => {
    if (category === 'WHOLESALE') setWholesaleRows([...wholesaleRows, { ...emptyRow }]);
    else setRetailRows([...retailRows, { ...emptyRow }]);
  };

  const removeRow = (index, category) => {
    if (category === 'WHOLESALE') setWholesaleRows(wholesaleRows.filter((_, i) => i !== index));
    else setRetailRows(retailRows.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const payload = [];
      const prepareRow = (r, cat) => {
        const obj = { category: cat, date };
        for (const key in r) {
          obj[key] = r[key] === '' ? 0 : parseFloat(r[key]) || 0;
        }
        obj.branchName = r.branchName;
        return obj;
      };

      wholesaleRows.forEach(r => {
        if (r.branchName && r.branchName.trim() !== '') payload.push(prepareRow(r, 'WHOLESALE'));
      });
      retailRows.forEach(r => {
        if (r.branchName && r.branchName.trim() !== '') payload.push(prepareRow(r, 'RETAIL'));
      });

      const response = await fetch('http://localhost:8080/api/form32', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save data');
      setSubmitStatus({ type: 'success', message: 'Successfully saved!' });
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to save data. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTableSection = (title, rows, category) => (
    <div className="mb-10 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-slate-50 border-b border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <div className={`w-2 h-6 rounded-full ${category === 'WHOLESALE' ? 'bg-indigo-500' : 'bg-emerald-500'}`}></div>
          {title}
        </h3>
        <button onClick={() => addRow(category)} className="flex items-center space-x-2 px-4 py-2 bg-white text-indigo-600 border border-indigo-100 rounded-lg hover:bg-indigo-50 hover:border-indigo-200 transition-all shadow-sm text-sm font-semibold">
          <Plus className="w-4 h-4" /> <span>නව පේළියක්</span>
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-700 uppercase whitespace-nowrap bg-slate-50 rounded-lg">
            <tr>
              <th className="px-3 py-4 rounded-tl-lg border-b border-slate-200 font-bold" rowSpan="2">ශාඛාවේ නම</th>
              <th className="px-3 py-2 border-b border-slate-200 text-center bg-indigo-100/50 font-extrabold text-indigo-900 rounded-t-lg mx-1" colSpan="10">හර (Debit)</th>
              <th className="px-3 py-2 border-b border-slate-200 text-center bg-emerald-100/50 font-extrabold text-emerald-900 rounded-t-lg mx-1" colSpan="11">බැර (Credit)</th>
              <th className="px-2 py-4 rounded-tr-lg border-b border-slate-200 text-center" rowSpan="2">ඉවත් කරන්න</th>
            </tr>
            <tr className="text-[11px] font-semibold tracking-wide">
              {/* Debit Columns */}
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">ආරම්භක ඉතිරි</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">ගැනුම්</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">ප්‍රවාහන</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">කුලී</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">ගමන් ගාස්තු</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">වෙනත් 1</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">වෙනත් 2</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">වෙනත් 3</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-indigo-50/30 text-indigo-800">දළ ලාභය</th>
              <th className="px-2 py-3 border-b border-slate-200 font-extrabold bg-indigo-100 text-indigo-900 shadow-sm">එකතුව</th>
              
              {/* Credit Columns */}
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">වෙළදාම මුදලට</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">වෙළදාම ණයට</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">මාරුකිරීම්</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">ප්‍රවාහන අය</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">කුලී අය</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">වෙනත් 1</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">වෙනත් 2</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">වෙනත් 3</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">අවසාන ඉතිරි</th>
              <th className="px-2 py-3 border-b border-slate-200 bg-emerald-50/30 text-emerald-800">දළ පාඩුව</th>
              <th className="px-2 py-3 border-b border-slate-200 font-extrabold bg-emerald-100 text-emerald-900 shadow-sm">එකතුව</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors group">
                <td className="px-2 py-3">
                  <input type="text" placeholder="ශාඛාව..." value={row.branchName} onChange={(e) => handleRowChange(index, 'branchName', e.target.value, category)} className="w-32 px-3 py-1.5 text-sm border-0 rounded-lg bg-slate-100 group-hover:bg-white shadow-inner focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all" />
                </td>
                {['openingStock', 'purchases', 'transport', 'rent', 'traveling', 'customDb1', 'customDb2', 'customDb3', 'grossProfit', 'totalDebit'].map(field => (
                  <td key={field} className={`px-1 py-3 ${field === 'totalDebit' ? 'bg-indigo-50/30' : ''}`}>
                    <input type="number" placeholder="0.00" value={row[field]} onChange={(e) => handleRowChange(index, field, e.target.value, category)} className={`w-20 px-2 py-1.5 text-sm border-0 rounded-lg text-right shadow-inner focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all ${field === 'totalDebit' ? 'font-bold bg-indigo-100 text-indigo-900 placeholder:text-indigo-300' : 'bg-slate-100 group-hover:bg-white text-slate-700'}`} />
                  </td>
                ))}
                {['salesCash', 'salesCredit', 'transfers', 'transportIncome', 'rentIncome', 'customCr1', 'customCr2', 'customCr3', 'closingStock', 'grossLoss', 'totalCredit'].map(field => (
                  <td key={field} className={`px-1 py-3 ${field === 'totalCredit' ? 'bg-emerald-50/30' : ''}`}>
                    <input type="number" placeholder="0.00" value={row[field]} onChange={(e) => handleRowChange(index, field, e.target.value, category)} className={`w-20 px-2 py-1.5 text-sm border-0 rounded-lg text-right shadow-inner focus:ring-2 focus:ring-inset focus:ring-emerald-500 transition-all ${field === 'totalCredit' ? 'font-bold bg-emerald-100 text-emerald-900 placeholder:text-emerald-300' : 'bg-slate-100 group-hover:bg-white text-slate-700'}`} />
                  </td>
                ))}
                <td className="px-2 py-3 text-center">
                  <button onClick={() => removeRow(index, category)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:ring-2 focus:ring-red-500 outline-none">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="max-w-[95vw] mx-auto p-4 md:p-8 space-y-6">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-700">
        <div className="flex items-center gap-5">
          <div className="p-4 bg-indigo-500/20 rounded-2xl border border-indigo-400/30 shadow-inner">
            <LayoutList className="w-8 h-8 text-indigo-300" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">ශාඛා වෙළඳ ගිණුම්</h1>
            <p className="text-indigo-200 font-medium mt-1 flex items-center gap-2">
              <span className="px-2 py-0.5 bg-indigo-500/30 rounded text-xs">Form No. 32</span>
              Branch Trading Accounts
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-950/40 p-2 pl-4 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
          <span className="text-slate-300 font-semibold text-sm">දිනය:</span>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            className="bg-slate-800/80 border border-slate-600 text-white font-medium rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-2 outline-none transition-all" 
          />
        </div>
      </div>

      {submitStatus && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 shadow-sm border ${submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-red-50 text-red-800 border-red-200'}`}>
          {submitStatus.type === 'success' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <AlertCircle className="w-6 h-6 text-red-500" />}
          <p className="font-semibold">{submitStatus.message}</p>
        </div>
      )}

      {/* Tables Section */}
      <div className="space-y-6">
        {renderTableSection('තොග (Wholesale)', wholesaleRows, 'WHOLESALE')}
        {renderTableSection('සිල්ලර (Retail)', retailRows, 'RETAIL')}
      </div>

      {/* Footer Action */}
      <div className="flex justify-end pt-4 pb-12">
        <button
          onClick={handleSave}
          disabled={isSubmitting}
          className="flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-indigo-500/30"
        >
          <Save className="w-5 h-5" />
          <span className="tracking-wide">{isSubmitting ? 'Saving...' : 'Save Record'}</span>
        </button>
      </div>
      
    </div>
  );
}
