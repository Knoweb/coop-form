import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

export default function Form9B() {
  const [formData, setFormData] = useState({
    // General
    date: "",
    
    // Trade Report
    tradeItem1: "", tradeItem2: "", tradeItem3: "", totalAmount: "", otherAmount: "",
    
    // Office Use & Checks
    receivedDate: "", checkedBy: "", approvedBy: "",
    shortCashDay: "", excessCashDay: "", shortCashPrev: "", excessCashPrev: "", shortCashTotal: "", excessCashTotal: "",
    
    // Receipts & Payments
    recTrade: "", recEmptySacks: "", recOther: "", recShortCash: "", recBankDep: "", recBalance: "",
    payCashier: "", payReceiptNo: "", payApprovedTrans: "", payShortCash: "",
    
    // Footer Info
    cashBillNos: "", creditBillNos: "", transferBillNos: "",
    certNoteNo: "", cashInHand: "",
    cashAmount: "", chequeAmount: "", otherPaymentsAmount: "", notesInHandTotal: "",
    collectorNoteAmtText: "",
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
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 9B</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">සිල්ලර ගබඩාවේ දෛනික මුදල් හා වෙළඳාම් වාර්තාව</p>
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
              <FileText className="w-5 h-5 text-slncc-blue" /> 
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
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Trade Report (වෙළඳාම් වාර්තාව)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Rice (හාල්)</label>
                <input type="number" name="tradeItem1" value={formData.tradeItem1} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Sugar (සීනි)</label>
                <input type="number" name="tradeItem2" value={formData.tradeItem2} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Flour (පිටි)</label>
                <input type="number" name="tradeItem3" value={formData.tradeItem3} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Total (එකතුව)</label>
                <input type="number" name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Other (වෙනත්)</label>
                <input type="number" name="otherAmount" value={formData.otherAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Office Use & Checks (කාර්යාලයේ ප්‍රයෝජනයට)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Received Date (ලැබුණු දිනය)</label>
                <input type="date" name="receivedDate" value={formData.receivedDate} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Checked By (පරීක්ෂා කළේ)</label>
                <input type="text" name="checkedBy" value={formData.checkedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Approved By (අනුමත කළේ)</label>
                <input type="text" name="approvedBy" value={formData.approvedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Short Cash - Day (දිනට අඩු මුදල්)</label>
                <input type="number" name="shortCashDay" value={formData.shortCashDay} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Excess Cash - Day (දිනට වැඩි මුදල්)</label>
                <input type="number" name="excessCashDay" value={formData.excessCashDay} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Receipts (ලැබීම්) - Day</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Trade (වෙළඳාම)</label>
                <input type="number" name="recTrade" value={formData.recTrade} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Empty Sacks (හිස් ගෝනි / අ: ප: අර:)</label>
                <input type="number" name="recEmptySacks" value={formData.recEmptySacks} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Short Cash (අඩු මුදල්)</label>
                <input type="number" name="recShortCash" value={formData.recShortCash} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank Dep. (බැංකු තැන්පත්)</label>
                <input type="number" name="recBankDep" value={formData.recBankDep} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Balance (ශේෂය)</label>
                <input type="number" name="recBalance" value={formData.recBalance} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Payments (ගෙවීම්) - Day</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Pay Cashier (මුදල් භාරකරුට)</label>
                <input type="number" name="payCashier" value={formData.payCashier} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Receipt No (ලදුපත් අංක)</label>
                <input type="text" name="payReceiptNo" value={formData.payReceiptNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Approved Transfers (5B අනුමත කළ මාරු)</label>
                <input type="number" name="payApprovedTrans" value={formData.payApprovedTrans} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Short Cash (අඩු මුදල්)</label>
                <input type="number" name="payShortCash" value={formData.payShortCash} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Footer Information (පහළ විස්තර)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cash Bill Nos (මුදලට බිල් අංක)</label>
                <input type="text" name="cashBillNos" value={formData.cashBillNos} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Credit Bill Nos (ණයට බිල් අංක)</label>
                <input type="text" name="creditBillNos" value={formData.creditBillNos} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Transfer Bill Nos (මාරු බිල් අංක)</label>
                <input type="text" name="transferBillNos" value={formData.transferBillNos} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cert. Note No. (සටහන් ඉදිරිපත් අංකය)</label>
                <input type="text" name="certNoteNo" value={formData.certNoteNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cash (මුදල්)</label>
                <input type="text" name="cashAmount" value={formData.cashAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cheques (චෙක්පත්)</label>
                <input type="text" name="chequeAmount" value={formData.chequeAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Other Payments (වෙනත් ගෙවීම්)</label>
                <input type="text" name="otherPaymentsAmount" value={formData.otherPaymentsAmount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Total Notes in Hand (අත ඉතිරිව ඇති සටහන් එකතුව)</label>
                <input type="text" name="notesInHandTotal" value={formData.notesInHandTotal} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cash in Hand (අත රු.)</label>
                <input type="text" name="cashInHand" value={formData.cashInHand} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
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
            Form 9 B
          </div>

          <div className="flex flex-col items-center mb-4">
            <h2 className="text-xl font-bold mb-1">සිල්ලර ගබඩාවේ දෛනික මුදල් හා වෙළඳාම් වාර්තාව</h2>
            <div className="flex w-full justify-between px-12 text-sm mt-2">
              <div className="flex items-end">
                <span className="font-bold mr-2">දිනය</span>
                <span className="w-32 border-b border-dotted border-slate-600 font-mono text-slncc-blue print:text-black text-center pb-1">
                  {formData.date || '2026-09-12'}
                </span>
              </div>
              <div className="font-bold">
                සිල්ලර ගබඩාවේ වාර්තාව
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
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>හාල්</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>සීනි</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>පිටි</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>එකතුව</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                    <th className="border border-slate-900 p-1 text-center w-12"><div className="flex flex-col items-center"><span>වෙනත්</span><div className="flex w-full justify-between mt-1 px-1 font-normal text-[8px] border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold">මුදලට</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">සැපයුම්/ණයට</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold">මාරු කිරීම්</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold text-center">එකතුව</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">දිනට වෙළඳාම</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.tradeItem1 || '25,000.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.tradeItem2 || '15,000.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.tradeItem3 || '10,000.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px] font-bold">{formData.totalAmount || '50,000.00'}</td>
                    <td className="border border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.otherAmount || '2,500.00'}</td>
                  </tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">පෙර වෙළඳාම</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
                  <tr className="h-6"><td className="border border-slate-900 p-1 font-bold leading-tight">අදට වෙළඳාම</td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td><td className="border border-slate-900"></td></tr>
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
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">වෙළඳාම</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recTrade || '50,000.00'}</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">හිස් ගෝනි / ආ: ප: අර:</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recEmptySacks || '1,000.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold text-center">එකතුව</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">51,000.00</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">අඩු මුදල්</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recShortCash || '0.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold text-center">මුළු එකතුව</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">51,000.00</td><td></td></tr>
                  <tr className="h-5"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">බැංකු තැන්පත්</td><td className="border-r border-slate-900 text-right pr-2 font-mono text-[9px]">{formData.recBankDep || '45,000.00'}</td><td></td></tr>
                  <tr className="h-5 border-t border-slate-900"><td className="border-r border-slate-900"></td><td className="border-r border-slate-900 p-1 font-bold">ශේෂය</td><td className="border-r border-slate-900 text-right pr-2 font-mono font-bold text-[9px]">{formData.recBalance || '6,000.00'}</td><td></td></tr>
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
              
              <div className="mt-8 font-bold underline mb-2">මුදල් එකතුකරන්නාගේ සටහන</div>
              <div className="flex justify-between items-end">
                <span>ගබඩා භාරකරුගෙන් රු.</span>
                <span className="w-24 border-b border-dotted border-slate-900 font-mono text-center pb-1">{formData.receivedAmt || '5,000.00'}</span>
              </div>
              <div className="mt-1">
                <span>ක් (රු. <span className="border-b border-dotted border-slate-900 w-32 inline-block text-center font-mono">{formData.receivedAmtWords || 'පන්දහසයි'}</span> ) භාරගත් බවත්, ඒ සඳහා අංක <span className="border-b border-dotted border-slate-900 w-16 inline-block text-center font-mono">{formData.issuedReceiptNo || 'R-450'}</span> දරණ කුවිතාන්සිය නිකුත් කළ බවත් සහතික කරමි.</span>
              </div>
              <div className="mt-4 flex justify-between items-end">
                <span>දිනය: {formData.date ? formData.date.split('-')[0] : '2026'}-{formData.date ? formData.date.split('-')[1] : '09'}-{formData.date ? formData.date.split('-')[2] : '12'}</span>
              </div>
            </div>

            {/* Right Block */}
            <div className="w-2/3 pl-8 flex flex-col justify-between">
              <div>
                <p className="text-justify indent-8 mb-2">
                  අද දින මෙම ගබඩාවට ලැබුණු සම්පූර්ණ මුදල මා විසින් ගණන්කොට එහි ඇතුළත් කර ඇති බවත්, එය සත්‍ය බවට අංක <span className="font-mono underline decoration-dotted underline-offset-4 px-2">{formData.certNoteNo || 'CN-987'}</span> දරණ මුදල් සටහන් ඉදිරිපත් කරන බවට සහතික කරමි.
                </p>
                <p className="text-justify indent-8 mb-4">
                  එසේම මා අත රු. <span className="font-mono underline decoration-dotted underline-offset-4 px-2">{formData.cashInHand || '6,000.00'}</span> ඉතිරිව ඇති බවද සහතික කරමි.
                </p>
                
                <div className="pl-8 mb-8 space-y-1">
                  <div className="flex items-end">
                    <span className="w-40">මුදල්</span>
                    <span className="w-32 border-b border-dotted border-slate-900 font-mono text-right pr-2">{formData.cashAmount || '4,500.00'}</span>
                  </div>
                  <div className="flex items-end">
                    <span className="w-40">චෙක්පත්</span>
                    <span className="w-32 border-b border-dotted border-slate-900 font-mono text-right pr-2">{formData.chequeAmount || '1,000.00'}</span>
                  </div>
                  <div className="flex items-end">
                    <span className="w-40">වෙනත් ගෙවීම්</span>
                    <span className="w-32 border-b border-dotted border-slate-900 font-mono text-right pr-2">{formData.otherPaymentsAmount || '500.00'}</span>
                  </div>
                  <div className="flex items-end">
                    <span className="w-40">අත ඉතිරිව ඇති සටහන් එකතුව</span>
                    <span className="w-32 border-b border-dotted border-slate-900 font-mono text-right pr-2 font-bold">{formData.notesInHandTotal || '6,000.00'}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-end mt-4">
                <div className="flex flex-col items-center">
                  <span className="w-40 border-b border-slate-900 mb-1"></span>
                  <span className="font-bold">ගබඩාකරුවාගේ අත්සන</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="w-40 border-b border-slate-900 mb-1"></span>
                  <span className="font-bold">මුදල් භාරකරුගේ අත්සන</span>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
