import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText, DollarSign, Calendar, List, Tag, Save, LayoutList, User , User } from 'lucide-react';

const INITIAL_FORM_STATE = {
  date: '',
  name: '',
  description: '',
  voucherNo: '',
  amountReceived: '',
  amountPaid: '',
  ledgerFolio: '',
  analysis: {
    Transport: '',
    Stationery: '',
    Postage: '',
    Meals: '',
    Other: ''
  }
};

const ANALYSIS_CATEGORIES = [
  { key: 'Transport', label: 'Transport (ගමන් වියදම්)' },
  { key: 'Stationery', label: 'Stationery (ලිපි ද්රව්ය)' },
  { key: 'Postage', label: 'Postage (තැපැල් ගාස්තු)' },
  { key: 'Meals', label: 'Meals (ආහාර)' },
  { key: 'Other', label: 'Other (වෙනත්)' }
];

export default function Form1() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/records');
      const data = await response.json();
      const mappedData = data.map(record => ({
        ...record,
        analysis: {
          Transport: record.transport || '',
          Stationery: record.stationery || '',
          Postage: record.postage || '',
          Meals: record.meals || '',
          Other: record.other || ''
        }
      }));
      setRecords(mappedData);
    } catch (error) {
      console.error("Failed to fetch records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnalysisChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      analysis: {
        ...prev.analysis,
        [category]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      date: formData.date,
      name: formData.name,
      description: formData.description,
      voucherNo: formData.voucherNo,
      amountReceived: formData.amountReceived ? parseFloat(formData.amountReceived) : null,
      amountPaid: formData.amountPaid ? parseFloat(formData.amountPaid) : null,
      ledgerFolio: formData.ledgerFolio,
      transport: formData.analysis.Transport ? parseFloat(formData.analysis.Transport) : null,
      stationery: formData.analysis.Stationery ? parseFloat(formData.analysis.Stationery) : null,
      postage: formData.analysis.Postage ? parseFloat(formData.analysis.Postage) : null,
      meals: formData.analysis.Meals ? parseFloat(formData.analysis.Meals) : null,
      other: formData.analysis.Other ? parseFloat(formData.analysis.Other) : null
    };

    try {
      const response = await fetch('http://localhost:8080/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchRecords();
        setFormData(INITIAL_FORM_STATE);
      }
    } catch (error) {
      console.error("Failed to submit record:", error);
    }
  };

  // Calculate Balance dynamically
  let currentBalance = 0;
  const processedRecords = records.map(record => {
    const received = parseFloat(record.amountReceived) || 0;
    const paid = parseFloat(record.amountPaid) || 0;
    currentBalance = currentBalance + received - paid;
    return { ...record, balance: currentBalance, received, paid };
  });

  // Calculate Totals
  const totals = processedRecords.reduce((acc, curr) => {
    acc.received += curr.received;
    acc.paid += curr.paid;
    ANALYSIS_CATEGORIES.forEach(cat => {
      acc.analysis[cat.key] += parseFloat(curr.analysis[cat.key]) || 0;
    });
    return acc;
  }, { received: 0, paid: 0, analysis: Object.fromEntries(ANALYSIS_CATEGORIES.map(c => [c.key, 0])) });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 p-4 md:p-6 font-sans">
      <div className="w-full mx-auto space-y-8">
        
        <header className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Petty Cash Book (සුළු මුදල් පොත)</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage and track minor expenses effortlessly</p>
          </div>
        </header>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl font-bold text-slate-800">New Entry (නව ඇතුළත් කිරීම)</h2>
              </div>
              <div className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-slate-200 shadow-sm">
                Form 1
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                {/* Standard Fields */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
                  </label>
                  <input required type="date" name="date" value={formData.date} onChange={handleInputChange}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" /> Name (කාටද දුන්නේ)
                  </label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="E.g., Kamal"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>

                <div className="space-y-2 xl:col-span-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Description / Details (විස්තරය)
                  </label>
                  <input required type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="E.g., Office Supplies"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Voucher No (වවුචර අංකය)
                  </label>
                  <input type="text" name="voucherNo" value={formData.voucherNo} onChange={handleInputChange} placeholder="E.g., V-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" /> Amount Received (ලැබුණු මුදල)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400">Rs</span>
                    <input type="number" step="0.01" name="amountReceived" value={formData.amountReceived} onChange={handleInputChange} placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors duration-200 shadow-sm text-emerald-900 font-semibold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-rose-400" /> Amount Paid (ගෙවූ මුදල)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400">Rs</span>
                    <input type="number" step="0.01" name="amountPaid" value={formData.amountPaid} onChange={handleInputChange} placeholder="0.00"
                      className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-rose-200 bg-rose-50/30 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200 shadow-sm text-rose-900 font-semibold" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <List className="w-4 h-4 text-slate-400" /> Ledger Folio (ලෙජර පිටුව)
                  </label>
                  <input type="text" name="ledgerFolio" value={formData.ledgerFolio} onChange={handleInputChange} placeholder="L.F."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>
              </div>

              {/* Analysis Section */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Analysis of Payments (ගෙවීම් විශ්ලේෂණය)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {ANALYSIS_CATEGORIES.map(category => (
                    <div key={category.key} className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">{category.label}</label>
                      <input type="number" step="0.01" value={formData.analysis[category.key]} onChange={(e) => handleAnalysisChange(category.key, e.target.value)} placeholder="0.00"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                  <Save className="w-5 h-5" />
                  <span>Submit Entry</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center space-x-2">
                <List className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl font-bold text-slate-800">Petty Cash Register</h2>
             </div>
             <div className="bg-indigo-50 px-4 py-2 rounded-lg">
                <span className="text-sm font-bold text-indigo-900">Current Balance: Rs {currentBalance.toFixed(2)}</span>
             </div>
          </div>
          
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[1000px] text-left border-collapse table-fixed border border-slate-300">
              <thead>
                <tr className="bg-slate-50">
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words bg-slate-50 border border-slate-300">Date (දිනය)</th>`r`n                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Name (කාටද දුන්නේ)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Name (කාටද දුන්නේ)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Description / Details (විස්තරය)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Voucher No (වවුචර අංකය)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-emerald-600 uppercase break-words bg-emerald-50/50 border border-slate-300">Amount Received (ලැබුණු මුදල) (Rs)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-rose-600 uppercase break-words bg-rose-50/50 border border-slate-300">Amount Paid (ගෙවූ මුදල) (Rs)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-indigo-600 uppercase break-words bg-indigo-50/50 border border-slate-300">Balance (ශේෂය) (Rs)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Ledger Folio (ලෙජර පිටුව)</th>
                  {ANALYSIS_CATEGORIES.map(cat => (
                    <th key={cat.key} className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-400 uppercase break-words bg-slate-50/50 border border-slate-300">{cat.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {processedRecords.length === 0 ? (
                  <tr>
                    <td colSpan={8 + ANALYSIS_CATEGORIES.length} className="px-2 py-12 text-center text-slate-400 border border-slate-300">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 mb-3 text-slate-200" />
                        <p className="text-xs">No records found. Add an entry above to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  processedRecords.map((record, idx) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-1 py-2 text-xs leading-tight font-medium text-slate-900 break-words bg-white group-hover:bg-slate-50 transition-colors border border-slate-300">{record.date}</td>`r`n                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.name}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.name}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.description}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-500 break-words border border-slate-300">{record.voucherNo || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight font-semibold text-emerald-600 bg-emerald-50/10 break-words border border-slate-300">{record.received > 0 ? record.received.toFixed(2) : '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight font-semibold text-rose-600 bg-rose-50/10 break-words border border-slate-300">{record.paid > 0 ? record.paid.toFixed(2) : '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight font-bold text-indigo-700 bg-indigo-50/10 break-words border border-slate-300">{record.balance.toFixed(2)}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-500 break-words border border-slate-300">{record.ledgerFolio || '-'}</td>
                      {ANALYSIS_CATEGORIES.map(cat => (
                        <td key={cat.key} className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">
                          {record.analysis[cat.key] ? parseFloat(record.analysis[cat.key]).toFixed(2) : '-'}
                        </td>
                      ))}
                    </tr>
                  ))
                )}
                
                {/* Total Row */}
                {processedRecords.length > 0 && (
                  <tr className="bg-slate-100/80 font-bold">
                    <td colSpan="4" className="px-1 py-3 text-xs leading-tight text-slate-800 text-right uppercase break-words bg-slate-100/80 border border-slate-300">Totals:</td>
                    <td className="px-1 py-3 text-xs leading-tight text-emerald-700 break-words border border-slate-300">{totals.received.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-rose-700 break-words border border-slate-300">{totals.paid.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-indigo-800 break-words border border-slate-300">{currentBalance.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-slate-500 break-words border border-slate-300"></td>
                    {ANALYSIS_CATEGORIES.map(cat => (
                      <td key={cat.key} className="px-1 py-3 text-xs leading-tight text-slate-700 break-words border border-slate-300">
                        {totals.analysis[cat.key] > 0 ? totals.analysis[cat.key].toFixed(2) : '-'}
                      </td>
                    ))}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}



