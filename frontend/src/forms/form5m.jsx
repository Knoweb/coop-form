import React, { useState } from 'react';
import { FileText, PlusCircle, Trash2, Save } from 'lucide-react';

export default function Form5M() {
  const [formData, setFormData] = useState({
    date: "",
    name: "",
    no: "",
    ledgerPage: "",
    reason: "",
    amount: "",
    paidBy: ""
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

  // Hardcoded table data for the preview
  const tableData = [
    { memberNo: "001", qty: "150", valRs: "15000", valCts: "00", adv: "1000", fert: "500", loan: "0", int: "0" },
    { memberNo: "002", qty: "200", valRs: "20000", valCts: "00", adv: "2000", fert: "1000", loan: "500", int: "50" },
    { memberNo: "003", qty: "120", valRs: "12000", valCts: "00", adv: "0", fert: "0", loan: "1000", int: "100" },
    { memberNo: "004", qty: "300", valRs: "30000", valCts: "00", adv: "5000", fert: "2000", loan: "0", int: "0" }
  ];

  const calculateRow = (row) => {
    const val = parseFloat(row.valRs || 0) + parseFloat(row.valCts || 0) / 100;
    const adv = parseFloat(row.adv || 0);
    const fert = parseFloat(row.fert || 0);
    const loan = parseFloat(row.loan || 0);
    const int = parseFloat(row.int || 0);
    const totDed = adv + fert + loan + int;
    const net = val - totDed;
    return { totDed: totDed.toFixed(2), net: net.toFixed(2) };
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-[1200px] mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 5 M</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">කිරි භාරගැනීමේ ආකෘතිය (Milk Receipt Form)</p>
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
              Enter Details for Receipt 1 (අංක 1 රිසිට්පත සඳහා විස්තර ඇතුළත් කරන්න)
            </h2>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Date (දිනය)</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Name (නම)</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Member No (අංකය)</label>
                <input type="text" name="no" value={formData.no} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Ledger Page (ලැ. පි.)</label>
                <input type="text" name="ledgerPage" value={formData.ledgerPage} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Reason (කාරණය)</label>
                <input type="text" name="reason" value={formData.reason} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount (රු.)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2 lg:col-span-3">
                <label className="text-sm font-semibold text-slate-600">Paid By (මුදල් ගෙවූ බවට)</label>
                <input type="text" name="paidBy" value={formData.paidBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
            </div>
            <p className="text-sm text-amber-600 mt-4 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Note: The table data is strictly hardcoded for the preview as requested.
            </p>
          </div>
        </div>

        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-4 md:p-8 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-4 right-8 font-bold text-lg">
            Form 5 M
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-12 items-stretch min-h-[800px]">
            
            {/* Left Side: Table */}
            <div className="w-full lg:w-[65%] border-r-2 border-slate-900 pr-4">
              <table className="w-full border-collapse border-2 border-slate-900 text-xs">
                <thead>
                  <tr>
                    <th className="border-2 border-slate-900 p-1 text-center w-12" rowSpan="2">
                      <div className="py-2 flex flex-col items-center justify-center leading-tight"><span>කාඩ්</span><span>අංක</span></div>
                    </th>
                    <th className="border-2 border-slate-900 p-1 text-center w-12" rowSpan="2">
                      <div className="py-2 flex flex-col items-center justify-center leading-tight"><span>භාර</span><span>ගත්</span><span>කිරි</span><span>පට්ටි</span><span>ප්‍රමා.</span></div>
                    </th>
                    <th className="border-2 border-slate-900 p-1 text-center w-12" rowSpan="2">
                      <div className="py-2 flex flex-col items-center justify-center leading-tight"><span>බැගින්</span></div>
                    </th>
                    <th className="border-2 border-slate-900 p-1 text-center" colSpan="2">වටිනා කම</th>
                    <th className="border-2 border-slate-900 p-1 text-center" colSpan="5">අඩු කිරීම්</th>
                    <th className="border-2 border-slate-900 p-1 text-center w-24" rowSpan="2">
                      <div className="py-2 flex flex-col items-center justify-center leading-tight"><span>ගෙවිය යුතු</span><span>ශුද්ධ</span><span>මුදල</span></div>
                    </th>
                  </tr>
                  <tr>
                    <th className="border-2 border-slate-900 p-1 text-center w-16">රු.</th>
                    <th className="border-2 border-slate-900 p-1 text-center w-8">ශ.</th>
                    <th className="border-2 border-slate-900 p-1 text-center w-16"><div className="flex flex-col items-center leading-tight"><span>අත්ති</span><span>කාරම්</span></div></th>
                    <th className="border-2 border-slate-900 p-1 text-center w-16"><div className="flex flex-col items-center leading-tight"><span>සත්ත්ව</span><span>ආහාර</span></div></th>
                    <th className="border-2 border-slate-900 p-1 text-center w-16">ණය</th>
                    <th className="border-2 border-slate-900 p-1 text-center w-16">පොලී</th>
                    <th className="border-2 border-slate-900 p-1 text-center w-16">එකතුව</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, idx) => {
                    const { totDed, net } = calculateRow(row);
                    return (
                      <tr key={idx} className="h-8">
                        <td className="border-2 border-slate-900 p-1 text-center">{row.memberNo}</td>
                        <td className="border-2 border-slate-900 p-1 text-center">{row.qty}</td>
                        <td className="border-2 border-slate-900 p-1 text-center">{row.days || "1"}</td>
                        <td className="border-2 border-slate-900 p-1 text-right font-mono">{row.valRs}</td>
                        <td className="border-2 border-slate-900 p-1 text-center font-mono">{row.valCts}</td>
                        <td className="border-2 border-slate-900 p-1 text-right font-mono">{row.adv}</td>
                        <td className="border-2 border-slate-900 p-1 text-right font-mono">{row.fert}</td>
                        <td className="border-2 border-slate-900 p-1 text-right font-mono">{row.loan}</td>
                        <td className="border-2 border-slate-900 p-1 text-right font-mono">{row.int}</td>
                        <td className="border-2 border-slate-900 p-1 text-right font-mono font-bold">{totDed}</td>
                        <td className="border-2 border-slate-900 p-1 text-right font-mono font-bold">{net}</td>
                      </tr>
                    )
                  })}
                  
                  {/* Empty rows */}
                  {[...Array(15)].map((_, idx) => (
                    <tr key={`empty-${idx}`} className="h-8">
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1 border-r-0"></td>
                      <td className="border-2 border-slate-900 p-1 border-l-0"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                      <td className="border-2 border-slate-900 p-1"></td>
                    </tr>
                  ))}
                  
                  {/* Totals Section */}
                  <tr className="h-10">
                    <td colSpan="9" className="border-2 border-slate-900 p-2 text-right font-bold">මෙම පිටුවේ එකතුව</td>
                    <td className="border-2 border-slate-900 p-1"></td>
                    <td className="border-2 border-slate-900 p-1"></td>
                  </tr>
                  <tr className="h-10">
                    <td colSpan="9" className="border-2 border-slate-900 p-2 text-right font-bold">පෙර පිටුවේ එකතුව</td>
                    <td className="border-2 border-slate-900 p-1"></td>
                    <td className="border-2 border-slate-900 p-1"></td>
                  </tr>
                  <tr className="h-10">
                    <td colSpan="9" className="border-2 border-slate-900 p-2 text-right font-bold">අදට මුළු එකතුව</td>
                    <td className="border-2 border-slate-900 p-1"></td>
                    <td className="border-2 border-slate-900 p-1"></td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Side: Receipt Slips */}
            <div className="w-full lg:w-[35%] flex flex-col justify-between">
              
              {/* Receipt 1 (Linked to form data) */}
              <div className="flex-1 pb-4 border-b-2 border-slate-900 text-sm flex flex-col justify-between">
                <div>
                  <div className="font-bold mb-2">අංක 1</div>
                  <div className="flex items-end mb-1">
                    <span className="w-10">දිනය</span>
                    <span className="flex-1 border-b border-dotted border-slate-600 px-1 font-mono text-slncc-blue print:text-black">{formData.date || '2026-09-08'}</span>
                  </div>
                  <div className="flex items-end mb-1">
                    <span className="w-8">නම</span>
                    <span className="flex-1 border-b border-dotted border-slate-600 px-1 font-mono text-slncc-blue print:text-black">{formData.name || 'කේ. ඩී. සිරිසේන'}</span>
                  </div>
                  <div className="flex items-end mb-1">
                    <span className="w-10">අංකය</span>
                    <span className="flex-1 border-b border-dotted border-slate-600 px-1 font-mono text-slncc-blue print:text-black">{formData.no || '001'}</span>
                    <span className="w-10 text-center">ලැ. පි.</span>
                    <span className="w-16 border-b border-dotted border-slate-600 px-1 font-mono text-slncc-blue print:text-black">{formData.ledgerPage || '15'}</span>
                  </div>
                  <div className="flex items-end mb-1">
                    <span className="w-8">197</span>
                    <span className="flex-1 border-b border-dotted border-slate-600 px-1 font-mono text-slncc-blue print:text-black">{formData.reason || 'කිරි වෙනුවෙන්'}</span>
                    <span className="ml-1">කාරණය</span>
                  </div>
                  <div className="flex items-end mb-4">
                    <span className="w-32">මට ගෙවිය යුතු රු.</span>
                    <span className="flex-1 border-b border-dotted border-slate-600 px-1 font-mono text-slncc-blue print:text-black">{formData.amount || '13500.00'}</span>
                  </div>
                  <div className="mb-8">භාරගතිමි.</div>
                </div>
                
                <div>
                  <div className="flex justify-end mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-12 border border-slate-900 flex items-center justify-center text-xs">මුද්දරය</div>
                      <span className="mt-1">අත්සන</span>
                    </div>
                  </div>
                  <div className="flex items-end">
                    <span className="w-32">මුදල් ගෙවූ බවට</span>
                    <span className="flex-1 border-b border-dotted border-slate-600 px-1 font-mono text-slncc-blue print:text-black">{formData.paidBy || 'කළමනාකරු'}</span>
                  </div>
                </div>
              </div>

              {/* Receipt 2 (Blank) */}
              <div className="flex-1 py-4 border-b-2 border-slate-900 text-sm flex flex-col justify-between">
                <div>
                  <div className="font-bold mb-2">අංක 2</div>
                  <div className="flex items-end mb-1"><span className="w-10">දිනය</span><span className="flex-1 border-b border-dotted border-slate-600"></span></div>
                  <div className="flex items-end mb-1"><span className="w-8">නම</span><span className="flex-1 border-b border-dotted border-slate-600"></span></div>
                  <div className="flex items-end mb-1"><span className="w-10">අංකය</span><span className="flex-1 border-b border-dotted border-slate-600"></span><span className="w-10 text-center">ලැ. පි.</span><span className="w-16 border-b border-dotted border-slate-600"></span></div>
                  <div className="flex items-end mb-1"><span className="w-8">197</span><span className="flex-1 border-b border-dotted border-slate-600"></span><span className="ml-1">කාරණය</span></div>
                  <div className="flex items-end mb-4"><span className="w-32">මට ගෙවිය යුතු රු.</span><span className="flex-1 border-b border-dotted border-slate-600"></span></div>
                  <div className="mb-8">භාරගතිමි.</div>
                </div>
                <div>
                  <div className="flex justify-end mb-4">
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-12 border border-slate-900 flex items-center justify-center text-xs">මුද්දරය</div>
                      <span className="mt-1">අත්සන</span>
                    </div>
                  </div>
                  <div className="flex items-end"><span className="w-32">මුදල් ගෙවූ බවට</span><span className="flex-1 border-b border-dotted border-slate-600"></span></div>
                </div>
              </div>

              {/* Receipt 3 (Blank) */}
              <div className="flex-1 py-4 border-b-2 border-slate-900 text-sm flex flex-col justify-between">
                <div className="font-bold mb-2">අංක 3</div>
                {/* Simplified structure to save space and match the empty look in the image */}
                <div className="flex-1"></div>
              </div>
              
              {/* Receipt 4 (Blank) */}
              <div className="flex-1 pt-4 text-sm flex flex-col justify-between">
                <div className="font-bold mb-2">අංක 4</div>
                <div className="flex-1"></div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
