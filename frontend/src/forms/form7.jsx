import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

export default function Form7() {
  const [formData, setFormData] = useState({
    date: "",
    societyName: "",
    cashInHandNumbers: "",
    cashInHandWords: "",
    
    // Total Income
    tiPrev: "", tiToday: "", tiTotal: "",
    
    // Approved Transfers
    atPrev: "", atApprove: "", atToday: "", atTotal: "",
    
    // Store Income
    siPrev: "", siName: "", siReceipt: "", siToday: "", siTotal: "",
    
    // Other Income
    oiDesc: "", oiReceipt: "", oiAmount: "", oiLedger: "",
    
    // Bank Deposit
    bdDesc: "", bdPrev: "", bdToday: "", bdTotal: "",
    
    // Receipts Account
    raDesc: "", raPrev: "", raToday: "", raTotal: "",
    
    // Summary
    sumDesc: "", sumCash: "", sumBank1: "", sumBank2: "", sumBank3: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    alert('Form data submitted successfully!');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0 print:max-w-none">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 7</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">මුදල් ලේඛනය (Cash Register)</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
              <Save className="w-5 h-5" />
              Submit Form
            </button>
          </div>
        </div>

        {/* Input Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> 
              Enter Details (විස්තර ඇතුළත් කරන්න)
            </h2>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">General Information (සාමාන්‍ය විස්තර)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Date (දිනය)</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-3">
                <label className="text-sm font-semibold text-slate-600">Society Name (සමූපකාර සමිතියේ නම)</label>
                <input type="text" name="societyName" value={formData.societyName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Cash in Hand - Numbers (අතේ මුදල් රු.)</label>
                <input type="text" name="cashInHandNumbers" value={formData.cashInHandNumbers} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Cash in Hand - Words (මුදල් අකුරෙන්)</label>
                <input type="text" name="cashInHandWords" value={formData.cashInHandWords} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Total Income (මුළු අය)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Prev. Date (පෙ: දිනට)</label>
                <input type="number" name="tiPrev" value={formData.tiPrev} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Today (දිනට)</label>
                <input type="number" name="tiToday" value={formData.tiToday} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Total (දිනට මුළු)</label>
                <input type="number" name="tiTotal" value={formData.tiTotal} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Approved Transfers (අනුමත කළ මාරුකිරීම්)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Prev. Date (පෙ: දිනට)</label>
                <input type="number" name="atPrev" value={formData.atPrev} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Approved No (අනුමත/ව: 5B අං:)</label>
                <input type="text" name="atApprove" value={formData.atApprove} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Today (දිනට)</label>
                <input type="number" name="atToday" value={formData.atToday} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Total (දිනට මුළු)</label>
                <input type="number" name="atTotal" value={formData.atTotal} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Store Income (තොග සිල්ලර ගබඩා වලින් ලැබුණු අය)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Prev. Date (පෙ: දිනට)</label>
                <input type="number" name="siPrev" value={formData.siPrev} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Store Name (ගබඩා: නම)</label>
                <input type="text" name="siName" value={formData.siName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Receipt No (ලදුපත් අංකය)</label>
                <input type="text" name="siReceipt" value={formData.siReceipt} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Today (දිනට)</label>
                <input type="number" name="siToday" value={formData.siToday} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Total (දිනට මුළු)</label>
                <input type="number" name="siTotal" value={formData.siTotal} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Other Income (මිල අය)</h3>
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Description (විස්තරය)</label>
                <input type="text" name="oiDesc" value={formData.oiDesc} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Receipt No (ලදුපත් අංක)</label>
                <input type="text" name="oiReceipt" value={formData.oiReceipt} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount (මුදල)</label>
                <input type="number" name="oiAmount" value={formData.oiAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Ledger Page (ලෙජර පිටු)</label>
                <input type="text" name="oiLedger" value={formData.oiLedger} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Bank Deposit & Receipts Account (බැංකු තැන්පත් කිරීම් සහ ලැබීම් ගිණුම)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank Dep. Desc (බැංකු තැන්පත් විස්තර)</label>
                <input type="text" name="bdDesc" value={formData.bdDesc} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank Dep. Prev (පෙ: දිනට)</label>
                <input type="number" name="bdPrev" value={formData.bdPrev} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank Dep. Today (දිනට)</label>
                <input type="number" name="bdToday" value={formData.bdToday} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank Dep. Total (දිනට මුළු)</label>
                <input type="number" name="bdTotal" value={formData.bdTotal} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Rec. Acc. Desc (ලැබීම් ගිණුම විස්තර)</label>
                <input type="text" name="raDesc" value={formData.raDesc} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Rec. Acc. Prev (පෙ: දිනට)</label>
                <input type="number" name="raPrev" value={formData.raPrev} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Rec. Acc. Today (දිනට)</label>
                <input type="number" name="raToday" value={formData.raToday} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Rec. Acc. Total (දිනට මුළු)</label>
                <input type="number" name="raTotal" value={formData.raTotal} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Cash & Bank Summary (දිනට මුදල් හා බැංකු සාරාංශය)</h3>
              </div>
              <div className="space-y-2 lg:col-span-4">
                <label className="text-sm font-semibold text-slate-600">Description (විස්තර)</label>
                <input type="text" name="sumDesc" value={formData.sumDesc} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cash (මුදල්)</label>
                <input type="number" name="sumCash" value={formData.sumCash} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank 1 (බැංකු 1)</label>
                <input type="number" name="sumBank1" value={formData.sumBank1} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank 2 (බැංකු 2)</label>
                <input type="number" name="sumBank2" value={formData.sumBank2} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank 3 (බැංකු 3)</label>
                <input type="number" name="sumBank3" value={formData.sumBank3} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              
            </div>
            <p className="text-sm text-amber-600 mt-6 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Note: The complex table data below is heavily hardcoded for preview purposes as requested. You can use these fields to enter data for a single row of the respective sections.
            </p>
          </div>
        </div>

        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-4 md:p-6 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-4 right-6 font-bold text-sm">
            Form 7
          </div>

          <div className="flex justify-between items-center mb-2 mt-4 text-sm">
            <div className="flex items-end">
              <span className="font-bold mr-2">දිනය :</span>
              <span className="w-32 border-b border-dotted border-slate-600 text-center font-mono text-indigo-900 print:text-black leading-none pb-1">{formData.date || '2026-09-12'}</span>
            </div>
            <div className="font-bold text-lg underline decoration-1 underline-offset-4">
              මුදල් ලේඛනය
            </div>
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>

          {/* Upper Table */}

          <div className="overflow-x-auto mb-4">
            <table className="w-full border-collapse border border-slate-900 text-[10px] sm:text-xs">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 text-center font-bold" colSpan="3">මුළු අය</th>
                  <th className="border border-slate-900 p-1 text-center font-bold" colSpan="4">අනුමත කළ මාරුකිරීම්</th>
                  <th className="border border-slate-900 p-1 text-center font-bold" colSpan="4">තොග සිල්ලර ගබඩා වලින් ලැබුණු අය</th>
                  <th className="border border-slate-900 p-1 text-center font-bold" colSpan="3">මිල අය</th>
                  <th className="border border-slate-900 p-1 text-center font-bold w-12" rowSpan="2">
                    <div className="flex flex-col items-center">
                      <span>ලෙජර</span><span>පිටු</span>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th className="border border-slate-900 p-1 text-center w-16">පෙ: දිනට</th>
                  <th className="border border-slate-900 p-1 text-center w-16">දිනට</th>
                  <th className="border border-slate-900 p-1 text-center w-20">දිනට මුළු</th>
                  
                  <th className="border border-slate-900 p-1 text-center w-16">පෙ: දිනට</th>
                  <th className="border border-slate-900 p-1 text-center w-20">
                    <div className="flex flex-col items-center">
                      <span>අනුමත</span><span>ව: 5 B අං:</span>
                    </div>
                  </th>
                  <th className="border border-slate-900 p-1 text-center w-16">දිනට</th>
                  <th className="border border-slate-900 p-1 text-center w-20">දිනට මුළු</th>
                  
                  <th className="border border-slate-900 p-1 text-center w-16">පෙ: දිනට</th>
                  <th className="border border-slate-900 p-1 text-center w-24">ගබඩා : නම</th>
                  <th className="border border-slate-900 p-1 text-center w-16">
                    <div className="flex flex-col items-center">
                      <span>ලදුපත්</span><span>අංකය</span>
                    </div>
                  </th>
                  <th className="border border-slate-900 p-1 text-center w-16">දිනට</th>
                  <th className="border border-slate-900 p-1 text-center w-20">දිනට මුළු</th>
                  
                  <th className="border border-slate-900 p-1 text-center w-32">විස්තරය</th>
                  <th className="border border-slate-900 p-1 text-center w-16">
                    <div className="flex flex-col items-center">
                      <span>ලදුපත්</span><span>අංක</span>
                    </div>
                  </th>
                  <th className="border border-slate-900 p-1 text-center w-20">මුදල</th>
                </tr>
              </thead>
              <tbody>
                {/* Row 1 - Thoga */}
                <tr className="h-6">
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono">15,000</td>
                  <td className="border border-slate-900 p-1 font-bold bg-slate-100">තොග</td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1">සාමාජික ගාස්තු</td>
                  <td className="border border-slate-900 p-1 text-center font-mono">R-102</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">5,000.00</td>
                  <td className="border border-slate-900 p-1 text-center">45</td>
                </tr>
                {/* Row 2 - Thoga 1 */}
                <tr className="h-6">
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 pl-4">1</td><td className="border border-slate-900 p-1 text-center font-mono">T-01</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">2,500</td><td className="border border-slate-900 p-1 text-right font-mono">17,500</td>
                  <td className="border border-slate-900 p-1">කොටස් මුදල්</td><td className="border border-slate-900 p-1 text-center font-mono">R-103</td><td className="border border-slate-900 p-1 text-right font-mono">2,500.00</td><td className="border border-slate-900 p-1"></td>
                </tr>
                {/* Row 3 - Thoga 2 */}
                <tr className="h-6">
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 pl-4">2</td><td className="border border-slate-900 p-1 text-center font-mono">T-02</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">1,500</td><td className="border border-slate-900 p-1 text-right font-mono">19,000</td>
                  <td className="border border-slate-900 p-1">ණය ආපසු ගෙවීම්</td><td className="border border-slate-900 p-1 text-center font-mono">R-104</td><td className="border border-slate-900 p-1 text-right font-mono">10,000.00</td><td className="border border-slate-900 p-1"></td>
                </tr>
                {/* Row 4 - Thoga 3 */}
                <tr className="h-6">
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 pl-4">3</td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                </tr>
                {/* Row 5 - Thoga 4 */}
                <tr className="h-6">
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 pl-4">4</td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                </tr>
                {/* Row 6 - Thoga Total */}
                <tr className="h-6 font-bold bg-slate-50">
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 text-center">එකතුව</td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono">4,000</td><td className="border border-slate-900 p-1 text-right font-mono">19,000</td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                </tr>
                
                {/* Row 7 - Sillara */}
                <tr className="h-6">
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 text-right font-mono">12,500</td><td className="border border-slate-900 p-1 text-right font-mono">82,500</td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 text-right font-mono">5,000</td><td className="border border-slate-900 p-1 text-right font-mono">25,000</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">35,000</td><td className="border border-slate-900 p-1 font-bold bg-slate-100">සිල්ලර</td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                </tr>
                {/* Rows 8 to 15 - Sillara 1 to 8 */}
                {[1,2,3,4,5,6,7,8].map((num) => (
                  <tr key={`sil-${num}`} className="h-6">
                    <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                    <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                    <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 pl-4">{num}</td>
                    <td className="border border-slate-900 p-1 text-center font-mono">{num === 1 ? 'S-01' : num === 2 ? 'S-02' : ''}</td>
                    <td className="border border-slate-900 p-1 text-right font-mono">{num === 1 ? '3,500' : num === 2 ? '4,500' : ''}</td>
                    <td className="border border-slate-900 p-1 text-right font-mono">{num === 1 ? '38,500' : num === 2 ? '43,000' : ''}</td>
                    <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  </tr>
                ))}
                {/* Row 16 - Sillara 9 */}
                <tr className="h-6">
                  <td className="border border-slate-900 p-1 text-right font-mono">70,000</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono">20,000</td><td className="border border-slate-900 p-1 text-center font-mono">TR-85</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 pl-4">9</td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-bold" colSpan="2">දිනට මුළු එකතුව</td>
                  <td className="border border-slate-900 p-1 text-right font-mono font-bold">17,500.00</td><td className="border border-slate-900 p-1"></td>
                </tr>
                {/* Row 17 - Sillara Total */}
                <tr className="h-6 font-bold bg-slate-50">
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 text-center">එකතුව</td><td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono">8,000</td><td className="border border-slate-900 p-1 text-right font-mono">43,000</td>
                  <td className="border border-slate-900 p-1 text-right font-bold" colSpan="2">පෙර දිනට</td>
                  <td className="border border-slate-900 p-1 text-right font-mono font-bold">45,000.00</td><td className="border border-slate-900 p-1"></td>
                </tr>
                {/* Row 18 - Grand Total */}
                <tr className="h-6 font-bold bg-slate-100">
                  <td className="border border-slate-900 p-1 text-right font-mono">70,000</td><td className="border border-slate-900 p-1 text-right font-mono">12,500</td><td className="border border-slate-900 p-1 text-right font-mono">82,500</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">20,000</td><td className="border border-slate-900 p-1"></td><td className="border border-slate-900 p-1 text-right font-mono">5,000</td><td className="border border-slate-900 p-1 text-right font-mono">25,000</td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1">
                    <div className="flex flex-col items-center leading-tight"><span>සමූපකාර</span><span>මුළු එකතුව</span></div>
                  </td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono">12,000</td><td className="border border-slate-900 p-1 text-right font-mono">62,000</td>
                  <td className="border border-slate-900 p-1 text-right font-bold" colSpan="2">අදට මුළු එකතුව ශීර්ෂ</td>
                  <td className="border border-slate-900 p-1 text-right font-mono font-bold">62,500.00</td><td className="border border-slate-900 p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Lower Tables Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-slate-900 mt-2 text-[10px] sm:text-xs">
            
            {/* Table A: Bank Deposit */}
            <div className="border-r border-slate-900">
              <div className="text-center font-bold border-b border-slate-900 p-1 bg-slate-50">බැංකු තැන්පත් කිරීම් ගිණුම</div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-900">
                    <th className="border-r border-slate-900 p-1 w-24">විස්තර</th>
                    <th className="border-r border-slate-900 p-1 w-16">පෙ: දිනට</th>
                    <th className="border-r border-slate-900 p-1 w-16">දිනට</th>
                    <th className="p-1 w-20">දිනට මුළු</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">චෙක්පත්</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">10,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">5,000</td>
                    <td className="p-1 text-right font-mono">15,000</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">මුදල් තැන්පතු</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">25,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">15,000</td>
                    <td className="p-1 text-right font-mono">40,000</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">තැපැල් තැන්පතු</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">0</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">0</td>
                    <td className="p-1 text-right font-mono">0</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">මුදල්</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">5,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">2,000</td>
                    <td className="p-1 text-right font-mono">7,000</td>
                  </tr>
                  <tr className="bg-slate-100 font-bold h-24">
                    <td className="border-r border-slate-900 p-1">එකතුව</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">40,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">22,000</td>
                    <td className="p-1 text-right font-mono">62,000</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table B: Receipts Account */}
            <div className="border-r border-slate-900">
              <div className="text-center font-bold border-b border-slate-900 p-1 bg-slate-50">ලැබීම් ගිණුම</div>
              <table className="w-full h-full">
                <thead>
                  <tr className="border-b border-slate-900">
                    <th className="border-r border-slate-900 p-1 w-24">විස්තර</th>
                    <th className="border-r border-slate-900 p-1 w-16">පෙ: දිනට</th>
                    <th className="border-r border-slate-900 p-1 w-16">දිනට</th>
                    <th className="p-1 w-20">දිනට මුළු</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">තොග ගබඩාව</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">15,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">4,000</td>
                    <td className="p-1 text-right font-mono">19,000</td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">සිල්ලර ගබඩාව</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">35,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">8,000</td>
                    <td className="p-1 text-right font-mono">43,000</td>
                  </tr>
                  <tr className="border-b border-slate-900 h-16">
                    <td className="border-r border-slate-900 p-1 align-top">මිල</td>
                    <td className="border-r border-slate-900 p-1 align-top text-right font-mono">45,000</td>
                    <td className="border-r border-slate-900 p-1 align-top text-right font-mono">17,500</td>
                    <td className="p-1 align-top text-right font-mono">62,500</td>
                  </tr>
                  <tr className="bg-slate-100 font-bold h-24">
                    <td className="border-r border-slate-900 p-1">එකතුව</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">95,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">29,500</td>
                    <td className="p-1 text-right font-mono">124,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Table C: Summary */}
            <div>
              <div className="text-center font-bold border-b border-slate-900 p-1 bg-slate-50">දිනට මුදල් හා බැංකු සාරාංශය</div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-900">
                    <th className="border-r border-slate-900 p-1 w-24">විස්තර</th>
                    <th className="border-r border-slate-900 p-1 w-16">මුදල්</th>
                    <th className="border-r border-slate-900 p-1 w-16">බැංකු 1</th>
                    <th className="border-r border-slate-900 p-1 w-16">බැංකු 2</th>
                    <th className="p-1 w-16">බැංකු 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1 leading-tight">මු/තැ/තැ/ශේෂය</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">12,500</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">55,000</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">ආදායම්</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">29,500</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                  <tr className="border-b border-slate-900 font-bold bg-slate-50">
                    <td className="border-r border-slate-900 p-1 text-center">එකතුව</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">42,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">55,000</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">බැංකු තැන්පතු</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">15,000</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">15,000</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">දිනට ගෙවීම්</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">8,500</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">2,500</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                  <tr className="border-b border-slate-900 font-bold bg-slate-50">
                    <td className="border-r border-slate-900 p-1 text-center">ශේෂය</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">18,500</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">67,500</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                  <tr className="border-b border-slate-900">
                    <td className="border-r border-slate-900 p-1">දිනට යැවීම</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                  <tr className="font-bold bg-slate-100">
                    <td className="border-r border-slate-900 p-1">දිනට ශේෂය</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">18,500</td>
                    <td className="border-r border-slate-900 p-1 text-right font-mono">67,500</td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="p-1"></td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* Footer Text & Signatures */}
          <div className="mt-6 text-sm flex flex-col gap-6">
            <div className="flex flex-wrap gap-2 items-end leading-loose">
              <span className="w-32 border-b border-dotted border-slate-600 font-mono text-indigo-900 print:text-black text-center">{formData.date || '2026-09-12'}</span>
              <span>දිනට සීමාවිත</span>
              <span className="w-64 border-b border-dotted border-slate-600 font-mono text-indigo-900 print:text-black text-center px-2">{formData.societyName || 'මහනුවර'}</span>
              <span>සමූපකාර සමිතියේ අතේ මුදල් රු</span>
              <span className="w-32 border-b border-dotted border-slate-600 font-mono text-indigo-900 print:text-black text-center">{formData.cashInHandNumbers || '18,500.00'}</span>
              <span>(රු</span>
              <span className="w-64 border-b border-dotted border-slate-600 font-mono text-indigo-900 print:text-black text-center px-2">{formData.cashInHandWords || 'දහ අට දහස් පන්සියයක්'}</span>
              <span>) මා භාරයේ නිවැරදිව තිබෙන බවට සහතික කරමි.</span>
            </div>

            <div className="flex justify-between items-end mt-4">
              <div className="flex flex-col items-center">
                <span className="font-bold mb-8">නිවැරදිව සටහන් කළෙමි</span>
                <span className="w-48 border-b border-slate-900 mb-1"></span>
                <span className="font-bold text-xs">ගිණුම් ලිපිකරු</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="w-48 border-b border-slate-900 mb-1"></span>
                <span className="font-bold text-xs">කළමනාකරු</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-bold text-xs self-start mb-6">දිනය......................................</span>
                <span className="w-48 border-b border-slate-900 mb-1"></span>
                <span className="font-bold text-xs">මුදල් භාරකරු</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

