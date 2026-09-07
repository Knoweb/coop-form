import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';
import FormHeader from '../components/FormHeader';


export default function Form8() {
  const [formData, setFormData] = useState({
    date: "",
    voucherNo: "",
    chequeNo: "",
    description: "",
    ledgerFolio1: "",
    bank1Amount: "",
    bank2Amount: "",
    analysis1: "",
    analysis2: "",
    analysis3: "",
    analysis4: "",
    ledgerFolio2: ""
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

  // Hardcoded preview table data
  const rows = [
    { id: 1, vNo: "V-1001", cNo: "154210", desc: "ලංකා විදුලිබල මණ්ඩලය", lf1: "15", b1: "5,400.00", b2: "", a1: "5,400.00", a2: "", a3: "", a4: "", lf2: "" },
    { id: 2, vNo: "V-1002", cNo: "154211", desc: "ජල සම්පාදන මණ්ඩලය", lf1: "18", b1: "1,200.00", b2: "", a1: "1,200.00", a2: "", a3: "", a4: "", lf2: "" },
    { id: 3, vNo: "V-1003", cNo: "154212", desc: "සේවක වැටුප්", lf1: "42", b1: "45,000.00", b2: "", a1: "", a2: "45,000.00", a3: "", a4: "", lf2: "" },
    { id: 4, vNo: "V-1004", cNo: "-", desc: "සුළු මුදල් ප්‍රතිපූරණය", lf1: "12", b1: "", b2: "5,000.00", a1: "", a2: "", a3: "5,000.00", a4: "", lf2: "" },
    { id: 5, vNo: "V-1005", cNo: "154213", desc: "ප්‍රවාහන ගාස්තු", lf1: "25", b1: "3,500.00", b2: "", a1: "", a2: "", a3: "", a4: "3,500.00", lf2: "58" },
    { id: 6, vNo: "", cNo: "", desc: "", lf1: "", b1: "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" },
    { id: 7, vNo: "", cNo: "", desc: "", lf1: "", b1: "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" },
    { id: 8, vNo: "", cNo: "", desc: "", lf1: "", b1: "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" },
    { id: 9, vNo: "", cNo: "", desc: "", lf1: "", b1: "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" },
    { id: 10, vNo: "", cNo: "", desc: "", lf1: "", b1: "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" },
    { id: 11, vNo: "", cNo: "", desc: "", lf1: "", b1: "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" },
    { id: 12, vNo: "", cNo: "", desc: "", lf1: "", b1: "", b2: "", a1: "", a2: "", a3: "", a4: "", lf2: "" }
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0 print:max-w-none">
        
        {/* Header Section */}
        <FormHeader 
          title="ගෙවීම් මුදල් පොත" 
          subtitle="Payments Cash Book" 
          formNumber="Form 8" 
        />
        <div className="flex justify-end items-center gap-3 print:hidden mb-6">
          <button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
              <Save className="w-5 h-5" />
              Submit Form
            </button>
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
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">General Information (සාමාන්‍ය විස්තර)</h3>
              </div>
              <div className="space-y-2 lg:col-span-4">
                <label className="text-sm font-semibold text-slate-600">Date (දිනය)</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Transaction Details (ගනුදෙනු විස්තර)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Voucher No (වවුචර අංකය)</label>
                <input type="text" name="voucherNo" value={formData.voucherNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Cheque No (චෙක්පත් අංකය)</label>
                <input type="text" name="chequeNo" value={formData.chequeNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Description (විස්තර)</label>
                <input type="text" name="description" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Ledger Folio (ලෙ: පි: අංකය)</label>
                <input type="text" name="ledgerFolio1" value={formData.ledgerFolio1} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank Account 1 (බැංකු ගිණුම් අංක 1)</label>
                <input type="number" name="bank1Amount" value={formData.bank1Amount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Bank Account 2 (බැංකු ගිණුම් අංක 2)</label>
                <input type="number" name="bank2Amount" value={formData.bank2Amount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">Account Analysis (ගිණුම් විග්‍රහය)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Analysis 1</label>
                <input type="number" name="analysis1" value={formData.analysis1} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Analysis 2</label>
                <input type="number" name="analysis2" value={formData.analysis2} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Analysis 3</label>
                <input type="number" name="analysis3" value={formData.analysis3} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Analysis 4</label>
                <input type="number" name="analysis4" value={formData.analysis4} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Other Ledger Folio (ලෙ: පි: අංකය)</label>
                <input type="text" name="ledgerFolio2" value={formData.ledgerFolio2} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              
            </div>
            <p className="text-sm text-amber-600 mt-6 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Note: The complex table data below is heavily hardcoded for preview purposes as requested. You can use these fields to enter data for a single row.
            </p>
          </div>
        </div>

        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-4 md:p-8 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-4 right-6 font-bold text-sm">
            Form 8
          </div>

          <div className="flex justify-between items-start mb-6">
            <div className="flex items-end">
              <span className="font-bold mr-2">දිනය :</span>
              <span className="w-32 border-b border-dotted border-slate-600 font-mono text-slncc-blue print:text-black text-center pb-1">
                {formData.date || '2026-09-12'}
              </span>
            </div>
            <div className="font-bold text-2xl underline decoration-1 underline-offset-4 mr-16">
              ගෙවීම් මුදල් පොත
            </div>
            <div></div>
          </div>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-[10px] sm:text-xs">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-2 w-16 text-center" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>වවුචර</span><span>අංකය</span></div></th>
                  <th className="border border-slate-900 p-2 w-16 text-center" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>චෙක්පත්</span><span>අංකය</span></div></th>
                  <th className="border border-slate-900 p-2 text-center w-48" rowSpan="2">විස්තර</th>
                  <th className="border border-slate-900 p-1 text-center w-12" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>ලෙ: පි:</span><span>අංකය</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>බැංකු ගිණුම්</span><span>අංක 1</span><div className="w-full flex justify-between px-1 mt-1 font-normal border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>බැංකු ගිණුම්</span><span>අංක 2</span><div className="w-full flex justify-between px-1 mt-1 font-normal border-t border-slate-400"><span>රු.</span><span>ශ.</span></div></div></th>
                  <th className="border border-slate-900 p-1 text-center font-bold" colSpan="4">ගිණුම් විග්‍රහය</th>
                  <th className="border border-slate-900 p-1 text-center w-12" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>ලෙ: පි:</span><span>අංකය</span></div></th>
                </tr>
                <tr>
                  <th className="border border-slate-900 p-1 text-center w-16"><div className="flex justify-between px-1 font-normal"><span>රු.</span><span>ශ.</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16"><div className="flex justify-between px-1 font-normal"><span>රු.</span><span>ශ.</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16"><div className="flex justify-between px-1 font-normal"><span>රු.</span><span>ශ.</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16"><div className="flex justify-between px-1 font-normal"><span>රු.</span><span>ශ.</span></div></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="h-6">
                    <td className="border border-slate-900 p-1 text-center font-mono">{row.vNo}</td>
                    <td className="border border-slate-900 p-1 text-center font-mono">{row.cNo}</td>
                    <td className="border border-slate-900 p-1">{row.desc}</td>
                    <td className="border border-slate-900 p-1 text-center font-mono">{row.lf1}</td>
                    <td className="border border-slate-900 p-1 text-right font-mono pr-4">{row.b1}</td>
                    <td className="border border-slate-900 p-1 text-right font-mono pr-4">{row.b2}</td>
                    
                    <td className="border border-slate-900 p-1 text-right font-mono pr-4">{row.a1}</td>
                    <td className="border border-slate-900 p-1 text-right font-mono pr-4">{row.a2}</td>
                    <td className="border border-slate-900 p-1 text-right font-mono pr-4">{row.a3}</td>
                    <td className="border border-slate-900 p-1 text-right font-mono pr-4">{row.a4}</td>
                    
                    <td className="border border-slate-900 p-1 text-center font-mono">{row.lf2}</td>
                  </tr>
                ))}
                
                {/* Footer Totals */}
                <tr className="h-8 font-bold border-t-2 border-slate-900">
                  <td colSpan="3" className="border border-slate-900 p-2 text-right">දිනට මුළු ගෙවීම</td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">55,100.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">5,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">6,600.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">45,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">5,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">3,500.00</td>
                  <td className="border border-slate-900 p-1"></td>
                </tr>
                <tr className="h-8 font-bold">
                  <td colSpan="3" className="border border-slate-900 p-2 text-right">පෙර දිනට එකතුව</td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">120,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">10,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">25,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">80,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">15,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">10,000.00</td>
                  <td className="border border-slate-900 p-1"></td>
                </tr>
                <tr className="h-8 font-bold bg-slate-100 border-b-2 border-slate-900">
                  <td colSpan="3" className="border border-slate-900 p-2 text-right">දිනට මුළු එකතුව</td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">175,100.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">15,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">31,600.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">125,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">20,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono pr-4">13,500.00</td>
                  <td className="border border-slate-900 p-1"></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-end mt-16 px-16 text-sm">
            <div className="flex flex-col items-center">
              <span className="w-64 border-b border-slate-900 mb-1"></span>
              <span className="font-bold">සභාපති / භාණ්ඩාගාරික</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="w-64 border-b border-slate-900 mb-1"></span>
              <span className="font-bold">පිළියෙල කළේ</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
