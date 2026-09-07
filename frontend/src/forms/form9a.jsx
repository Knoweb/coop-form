import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

export default function Form9A() {
  const [formData, setFormData] = useState({
    // General
    date: "",
    
    // Trade Report
    tradeAmount: "", fertAmount: "", transAmount: "", siPoAmount: "", 
    aaKalaAmount: "", totalAmount: "", taxAmount: "", waNathiAmount: "",
    
    // Office Use & Checks
    receivedDate: "", checkedBy: "", approvedBy: "",
    shortCashDay: "", excessCashDay: "", shortCashPrev: "", excessCashPrev: "", shortCashTotal: "", excessCashTotal: "",
    
    // Receipts & Payments
    recTrade: "", recFert: "", recTrans: "", recSacks: "", recOther: "", recShortCash: "", recBankDep: "", recBalance: "",
    payCashier: "", payReceiptNo: "", payMethod: "", payApprovedTrans: "", payShortCash: "",
    
    // Footer Info
    cashBillNos: "", creditBillNos: "", transferBillNos: "",
    certNoteNo: "", cashInHand: "",
    collectorNoteAmtText: "", collectorNoteTo: "",
    receivedAmt: "", receivedAmtWords: "", issuedReceiptNo: ""
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 9A</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">තොග ගබඩාවේ දෛනික මුදල් හා වෙළඳාම් වාර්තාව</p>
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
              
              <div className="col-span-1 md:col-span-2 lg:col-span-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">General Info (සාමාන්‍ය විස්තර)</h3>
              </div>
              <div className="space-y-2 lg:col-span-4">
                <label className="text-sm font-semibold text-slate-600">Date (දිනය)</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Trade Report (වෙළඳාම් වාර්තාව)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Trade (වෙළඳාම)</label>
                <input type="number" name="tradeAmount" value={formData.tradeAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Fertilizer (පොහොර)</label>
                <input type="number" name="fertAmount" value={formData.fertAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Transport (ප්‍රවාහන අ: පෑ:)</label>
                <input type="number" name="transAmount" value={formData.transAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Si. Po. (සි: පෝ:)</label>
                <input type="number" name="siPoAmount" value={formData.siPoAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Aa. Kala (ආ: කළ)</label>
                <input type="number" name="aaKalaAmount" value={formData.aaKalaAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Total (එකතුව)</label>
                <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Taxes (බදු අය)</label>
                <input type="number" name="taxAmount" value={formData.taxAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Wa. Nathi (ව: නැති)</label>
                <input type="number" name="waNathiAmount" value={formData.waNathiAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Office Use & Checks (කාර්යාලයේ ප්‍රයෝජනයට)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Received Date (ලැබුණු දිනය)</label>
                <input type="date" name="receivedDate" value={formData.receivedDate} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Checked By (පරීක්ෂා කළේ)</label>
                <input type="text" name="checkedBy" value={formData.checkedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Approved By (අනුමත කළේ)</label>
                <input type="text" name="approvedBy" value={formData.approvedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Short Cash - Day (දිනට අඩු මුදල්)</label>
                <input type="number" name="shortCashDay" value={formData.shortCashDay} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Excess Cash - Day (දිනට වැඩි මුදල්)</label>
                <input type="number" name="excessCashDay" value={formData.excessCashDay} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Receipts (ලැබීම්) - Day</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Trade (වෙළඳාම)</label>
                <input type="number" name="recTrade" value={formData.recTrade} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Fertilizer (පොහොර මුදල්)</label>
                <input type="number" name="recFert" value={formData.recFert} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Transport (ප්‍රවාහන මුදල්)</label>
                <input type="number" name="recTrans" value={formData.recTrans} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Empty Sacks (හිස් ගෝනි)</label>
                <input type="number" name="recSacks" value={formData.recSacks} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Other (ආ: ප: අර:)</label>
                <input type="number" name="recOther" value={formData.recOther} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Short Cash (අඩු මුදල්)</label>
                <input type="number" name="recShortCash" value={formData.recShortCash} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Payments (ගෙවීම්) - Day</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Pay Cashier (මුදල් භාරකරුට)</label>
                <input type="number" name="payCashier" value={formData.payCashier} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Receipt No (ලදුපත් අංක)</label>
                <input type="text" name="payReceiptNo" value={formData.payReceiptNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Approved Transfers (5B අනුමත කළ මාරු)</label>
                <input type="number" name="payApprovedTrans" value={formData.payApprovedTrans} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Short Cash (අඩු මුදල්)</label>
                <input type="number" name="payShortCash" value={formData.payShortCash} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Footer Information (පහළ විස්තර)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cash Bill Nos (මුදලට බිල් අංක)</label>
                <input type="text" name="cashBillNos" value={formData.cashBillNos} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Credit Bill Nos (ණයට බිල් අංක)</label>
                <input type="text" name="creditBillNos" value={formData.creditBillNos} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Transfer Bill Nos (මාරු බිල් අංක)</label>
                <input type="text" name="transferBillNos" value={formData.transferBillNos} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cert. Note No. (සටහන් ඉදිරිපත් අංකය)</label>
                <input type="text" name="certNoteNo" value={formData.certNoteNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cash in Hand (අත රු.)</label>
                <input type="text" name="cashInHand" value={formData.cashInHand} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
            </div>
            
            <p className="text-sm text-amber-600 mt-6 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Note: The complex table data below is heavily hardcoded for preview purposes as requested. You can use these fields to enter data for specific cells.
            </p>
          </div>
        </div>
        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-4 md:p-6 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-4 right-6 font-bold text-sm">
            Form 9 A
          </div>

          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-bold mb-1">තොග ගබඩාවේ දෛනික මුදල් හා වෙළඳාම් වාර්තාව</h2>
            <div className="flex w-full justify-between px-12 text-sm mt-2">
              <div className="flex items-end">
                <span className="font-bold mr-2">දිනට</span>
                <span className="w-32 border-b border-dotted border-slate-600 font-mono text-indigo-900 print:text-black text-center pb-1">
                  {formData.date || '2026-09-12'}
                </span>
              </div>
              <div className="font-bold">
                තොග ගබඩාවේ වාර්තාව
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            {/* Table 1: Trade Report */}
            <div className="flex-1 overflow-x-auto">
              <table className="w-full border-collapse border border-slate-900 text-[10px]">
                <thead>
                  <tr>
                    <th className="border border-slate-900 p-1 text-center w-24">විස්තරය</th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>වෙළඳාම</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>පොහොර</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>ප්‍රවාහන</span><span>අ: පෑ:</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>සි: පෝ:</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>ආ: කළ</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>එකතුව</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>බදු අය</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>ව: නැති</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold">මුදලට</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">සැපයුම්/ණයට</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold">මාරු කිරීම්</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold text-center">එකතුව</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">දිනට වෙළඳාම</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.tradeAmount || '150,000.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.fertAmount || '25,000.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.transAmount || '0.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.siPoAmount || '0.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.aaKalaAmount || '0.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px] font-bold">{formData.totalAmount || '175,000.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.taxAmount || '1,500.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.waNathiAmount || '0.00'}</td>
                  </tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">පෙර වෙළඳාම</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">අදට වෙළඳාම</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                </tbody>
              </table>
            </div>

            {/* Side Boxes */}
            <div className="w-56 flex flex-col gap-2 text-[10px]">
              <div className="border border-slate-900 p-2 font-bold">
                <div className="text-center mb-2">කාර්යාලයේ ප්‍රයෝජනයට</div>
                <div className="flex justify-between mb-1">
                  <span>ලැබුණු දිනය</span>
                  <span className="w-24 border-b border-dotted border-slate-600"></span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>පරීක්ෂා කළේ</span>
                  <span className="w-24 border-b border-dotted border-slate-600"></span>
                </div>
                <div className="flex justify-between">
                  <span>අනුමත කළේ</span>
                  <span className="w-24 border-b border-dotted border-slate-600"></span>
                </div>
              </div>
              <div className="flex-1 mt-2">
                <div className="text-center font-bold mb-1">පරීක්ෂා කිරීමෙන් පසු</div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="w-1/3"></th>
                      <th className="border border-slate-900 p-1 text-center font-bold">අඩු මුදල්</th>
                      <th className="border border-slate-900 p-1 text-center font-bold">වැඩි මුදල්</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="h-6">
                      <td className="font-bold p-1">දිනට</td>
                      <td className="border border-slate-900 text-right pr-1 font-mono">{formData.shortCashDay}</td>
                      <td className="border border-slate-900 text-right pr-1 font-mono">{formData.excessCashDay}</td>
                    </tr>
                    <tr className="h-6">
                      <td className="font-bold p-1 leading-tight">පෙර දිනට</td>
                      <td className="border border-slate-900 text-right pr-1 font-mono"></td>
                      <td className="border border-slate-900 text-right pr-1 font-mono"></td>
                    </tr>
                    <tr className="h-6">
                      <td className="font-bold p-1">අදට</td>
                      <td className="border border-slate-900 text-right pr-1 font-mono"></td>
                      <td className="border border-slate-900 text-right pr-1 font-mono"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Table 2: Receipts and Payments */}
          <div className="w-full mt-4 flex border-t-2 border-b-2 border-slate-900 border-x border-x-slate-900">
            {/* Receipts */}
            <div className="flex-1 border-r-2 border-slate-900">
              <div className="text-center font-bold border-b border-slate-900 py-1">ලැබීම්</div>
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-slate-900">
                    <th className="border-r border-slate-900 p-1 w-16"><div className="flex flex-col items-center"><span>පෙර දිනට</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border-r border-slate-900 p-1 w-32">විස්තරය</th>
                    <th className="border-r border-slate-900 p-1 w-16"><div className="flex flex-col items-center"><span>දිනට</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="p-1 w-16"><div className="flex flex-col items-center"><span>අදට මු: එකතුව</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">වෙළඳාම</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recTrade || '175,000.00'}</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">පොහොර මු:</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recFert || '25,000.00'}</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">ප්‍රවාහන කුලී</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recTrans || '5,000.00'}</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">හිස් ගෝනි</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recSacks || '1,500.00'}</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">ආ: ප: අර:</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recOther || '0.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold text-center">එකතුව</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">206,500.00</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">අඩු මුදල්</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recShortCash || '0.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold text-center">මුළු එකතුව</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">206,500.00</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">බැංකු තැන්පත්</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recBankDep || '200,000.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">ශේෂය</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">{formData.recBalance || '6,500.00'}</td><td></td></tr>
                </tbody>
              </table>
            </div>
            
            {/* Payments */}
            <div className="flex-1">
              <div className="text-center font-bold border-b border-slate-900 py-1">ගෙවීම්</div>
              <table className="w-full text-[10px]">
                <thead>
                  <tr className="border-b border-slate-900">
                    <th className="border-r border-slate-900 p-1 w-16"><div className="flex flex-col items-center"><span>පෙර දිනට</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border-r border-slate-900 p-1 w-32">විස්තරය</th>
                    <th className="border-r border-slate-900 p-1 w-16"><div className="flex flex-col items-center"><span>දිනට</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="p-1 w-16"><div className="flex flex-col items-center"><span>අදට මු: එකතුව</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold leading-tight">මුදල් භාරකරුට ගෙවීම<br/>ලදුපත් අංක: ...........</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.payCashier || '5,000.00'}</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold"></td><td className="border-r border-slate-900"></td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold text-center">එකතුව</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">5,000.00</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold leading-tight">5B. අනුමත කළ මාරු කිරීම්</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.payApprovedTrans || '0.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold text-center">එකතුව</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">5,000.00</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">අඩු මුදල්</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.payShortCash || '0.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold text-center">මුළු එකතුව</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">5,000.00</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold"></td><td className="border-r border-slate-900"></td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold"></td><td className="border-r border-slate-900"></td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold"></td><td className="border-r border-slate-900"></td><td></td></tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Footer Section */}
          <div className="flex gap-4 mt-4 text-[10px] leading-tight">
            {/* Left Block */}
            <div className="w-1/3">
              <div className="font-bold underline mb-2">දිනට පාවිච්චි කරන ලද බිල්</div>
              <div className="flex justify-between mb-1">
                <span>1 මුදලට බිල් අංක</span>
                <span className="w-24 border-b border-dotted border-slate-900 font-mono text-center">{formData.cashBillNos || '101-150'}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>2 ණයට බිල් අංක</span>
                <span className="w-24 border-b border-dotted border-slate-900 font-mono text-center">{formData.creditBillNos || 'C10-C15'}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>3 මාරු බිල් අංක</span>
                <span className="w-24 border-b border-dotted border-slate-900 font-mono text-center">{formData.transferBillNos || 'T1-T5'}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="font-bold">4 එකතුව</span>
                <span className="w-24 border-b border-dotted border-slate-900"></span>
              </div>
              <div className="mt-8 flex justify-between">
                <span>දිනය: {formData.date ? formData.date.split('-')[0] : '2026'} - {formData.date ? formData.date.split('-')[1] : '09'} - {formData.date ? formData.date.split('-')[2] : '12'}</span>
              </div>
            </div>

            {/* Center Block */}
            <div className="w-2/3 flex flex-col justify-between">
              <div>
                <p className="text-justify indent-8 mb-2">
                  අද දින මෙම ගබඩාවට ලැබුණු සම්පූර්ණ මුදල මා විසින් ගණන්කොට එහි ඇතුළත් කර ඇති බවත්, එය සත්‍ය බවට අංක <span className="font-mono underline decoration-dotted underline-offset-4 px-2">{formData.certNoteNo || 'CN-987'}</span> මුදල් සටහන් ඉදිරිපත් කරන බවට සහතික කරමි.
                </p>
                <p className="text-justify indent-8">
                  එසේම මා අත රු. <span className="font-mono underline decoration-dotted underline-offset-4 px-2">{formData.cashInHand || '6,500.00'}</span> ඉතිරිව ඇති බවද සහතික කරමි. මුදල් ගණනය මට අනුමත ඇත.
                </p>
              </div>
              
              <div className="mt-4 border-t border-slate-400 pt-2 flex justify-between items-end">
                <div className="flex-1">
                  <div className="font-bold underline mb-1">මුදල් එකතුකරන්නාගේ සටහන</div>
                  <p className="indent-4 leading-relaxed">
                    ගබඩා භාරකරුගෙන් රු. <span className="border-b border-dotted border-slate-900 w-16 inline-block font-mono text-center px-1">{formData.receivedAmt || '5,000.00'}</span> ක් <br/>
                    (රු. <span className="border-b border-dotted border-slate-900 w-48 inline-block font-mono text-center px-1">{formData.receivedAmtWords || 'පන්දහසයි'}</span> ) භාරගත් බවත් ඒ සඳහා අංක <span className="border-b border-dotted border-slate-900 w-24 inline-block font-mono text-center px-1">{formData.issuedReceiptNo || 'R-450'}</span> දරණ කුවිතාන්සිය නිකුත් කළ බවත් සහතික කරමි.
                  </p>
                </div>
                <div className="flex flex-col items-center ml-4 w-48 shrink-0">
                  <span className="w-full border-b border-slate-900 mb-1"></span>
                  <span className="font-bold">මුදල් භාරකරුගේ අත්සන</span>
                </div>
              </div>
            </div>
            
            <div className="absolute right-6 bottom-48">
               <div className="flex flex-col items-center">
                  <span className="w-32 border-b border-slate-900 mb-1"></span>
                  <span className="font-bold">ගබඩාකරුවාගේ අත්සන</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
