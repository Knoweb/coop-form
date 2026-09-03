import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText, Calendar, List, Tag, Save, LayoutList, Building2 } from 'lucide-react';

const INITIAL_FORM_STATE = {
  date: '',
  storeName: '',
  billNo: '',
  name: '',
  folio: '',
  totalAmount: '',
  goodsAmount: '',
  aPaKoAmount: '',
  teaPoAmount: '',
  emptySacksAmount: '',
  otherAmount: ''
};

export default function Form9C() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [globalStoreName, setGlobalStoreName] = useState('');
  const [globalDate, setGlobalDate] = useState('');

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/form9c-records');
      const data = await response.json();
      setRecords(data);
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

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'globalStoreName') setGlobalStoreName(value);
    if (name === 'globalDate') setGlobalDate(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      date: globalDate || formData.date,
      storeName: globalStoreName || formData.storeName,
      billNo: formData.billNo,
      name: formData.name,
      folio: formData.folio,
      totalAmount: formData.totalAmount ? parseFloat(formData.totalAmount) : 0,
      goodsAmount: formData.goodsAmount ? parseFloat(formData.goodsAmount) : 0,
      aPaKoAmount: formData.aPaKoAmount ? parseFloat(formData.aPaKoAmount) : 0,
      teaPoAmount: formData.teaPoAmount ? parseFloat(formData.teaPoAmount) : 0,
      emptySacksAmount: formData.emptySacksAmount ? parseFloat(formData.emptySacksAmount) : 0,
      otherAmount: formData.otherAmount ? parseFloat(formData.otherAmount) : 0
    };

    try {
      const response = await fetch('http://localhost:8080/api/form9c-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchRecords();
        // Reset form data except global headers
        setFormData(prev => ({
          ...INITIAL_FORM_STATE,
          date: prev.date,
          storeName: prev.storeName
        }));
      }
    } catch (error) {
      console.error("Failed to submit record:", error);
    }
  };

  // Calculate Totals
  const totals = records.reduce((acc, curr) => {
    acc.totalAmount += (curr.totalAmount || 0);
    acc.goodsAmount += (curr.goodsAmount || 0);
    acc.aPaKoAmount += (curr.aPaKoAmount || 0);
    acc.teaPoAmount += (curr.teaPoAmount || 0);
    acc.emptySacksAmount += (curr.emptySacksAmount || 0);
    acc.otherAmount += (curr.otherAmount || 0);
    return acc;
  }, { 
    totalAmount: 0, goodsAmount: 0, aPaKoAmount: 0, 
    teaPoAmount: 0, emptySacksAmount: 0, otherAmount: 0 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 p-4 md:p-6 font-sans">
      <div className="w-full mx-auto space-y-8">
        
        <header className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Form 9 C (මුදලට / ශාඛා / ණය වෙළඳාම)</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Cash / Branch / Credit Sales</p>
          </div>
        </header>

        {/* Global Header Section */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Store / Retailer (තොග/සිල්ලර ගබඩාව)
                  </label>
                  <input type="text" name="globalStoreName" value={globalStoreName} onChange={handleHeaderChange} placeholder="Enter store name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
                  </label>
                  <input type="date" name="globalDate" value={globalDate} onChange={handleHeaderChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>
             </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-indigo-500" />
                <h2 className="text-xl font-bold text-slate-800">New Entry (නව ඇතුළත් කිරීම)</h2>
              </div>
              <div className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-slate-200 shadow-sm">
                Form 9 C
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Bill No (බිල් අංකය)
                  </label>
                  <input required type="text" name="billNo" value={formData.billNo} onChange={handleInputChange} placeholder="E.g., B-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>

                <div className="space-y-2 xl:col-span-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Name (නම)
                  </label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <List className="w-4 h-4 text-slate-400" /> Folio (පත්‍රය)
                  </label>
                  <input type="text" name="folio" value={formData.folio} onChange={handleInputChange} placeholder="L.F."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>

              </div>

              {/* Amounts Section */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Amounts (මුදල්)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Total (මුළු මුදල)</label>
                    <input type="number" step="0.01" name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-indigo-200 bg-indigo-50/30 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm font-bold text-indigo-900" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Goods (බඩු)</label>
                    <input type="number" step="0.01" name="goodsAmount" value={formData.goodsAmount} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">A.Pa.Ko (ඇ. පා. කෝ.)</label>
                    <input type="number" step="0.01" name="aPaKoAmount" value={formData.aPaKoAmount} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Tea/Po (තේ / පො.)</label>
                    <input type="number" step="0.01" name="teaPoAmount" value={formData.teaPoAmount} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Empty Sacks (හිස් ගෝනි)</label>
                    <input type="number" step="0.01" name="emptySacksAmount" value={formData.emptySacksAmount} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Other (වෙනත්)</label>
                    <input type="number" step="0.01" name="otherAmount" value={formData.otherAmount} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-sm" />
                  </div>

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
                <h2 className="text-xl font-bold text-slate-800">Form 9 C Register</h2>
             </div>
          </div>
          
          <div className="p-4 md:p-6">
            <div className="overflow-x-auto w-full rounded-xl border border-slate-200">
              <table className="w-full min-w-[1000px] text-left border-collapse table-fixed">
                <thead>
                <tr className="bg-slate-50">
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words bg-slate-50 border border-slate-300">Date (දිනය)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Store (ගබඩාව)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Bill No (බිල් අංකය)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Name (නම)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">Folio (පත්‍රය)</th>
                  
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-indigo-700 uppercase break-words bg-indigo-50/50 border border-slate-300">Total (මුළු මුදල)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">Goods (බඩු)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">A.Pa.Ko (ඇ.පා.කෝ)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">Tea/Po (තේ/පො)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">Sacks (හිස් ගෝනි)</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">Other (වෙනත්)</th>
                </tr>
              </thead>
              <tbody>
                {records.length === 0 ? (
                  <tr>
                    <td colSpan="11" className="px-2 py-12 text-center text-slate-400 border border-slate-300">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 mb-3 text-slate-200" />
                        <p className="text-xs">No records found. Add an entry above to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-1 py-2 text-xs leading-tight font-medium text-slate-900 break-words bg-white group-hover:bg-slate-50 transition-colors border border-slate-300">{record.date || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.storeName || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.billNo || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.name}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-500 break-words border border-slate-300">{record.folio || '-'}</td>
                      
                      <td className="px-1 py-2 text-xs leading-tight font-bold text-indigo-700 bg-indigo-50/10 break-words border border-slate-300">{record.totalAmount?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.goodsAmount?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.aPaKoAmount?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.teaPoAmount?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.emptySacksAmount?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.otherAmount?.toFixed(2) || '-'}</td>
                    </tr>
                  ))
                )}
                
                {/* Total Row */}
                {records.length > 0 && (
                  <tr className="bg-slate-100/80 font-bold">
                    <td colSpan="5" className="px-1 py-3 text-xs leading-tight text-slate-800 text-right uppercase break-words bg-slate-100/80 border border-slate-300">Totals (එකතුව):</td>
                    <td className="px-1 py-3 text-xs leading-tight text-indigo-800 break-words border border-slate-300 bg-indigo-100/50">{totals.totalAmount.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.goodsAmount.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.aPaKoAmount.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.teaPoAmount.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.emptySacksAmount.toFixed(2)}</td>
                    <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.otherAmount.toFixed(2)}</td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
