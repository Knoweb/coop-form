import React, { useState } from 'react';
import { FileText, PlusCircle, Trash2, Printer } from 'lucide-react';

export default function Form3() {
  const [formData, setFormData] = useState({
    head: "",
    subHead: "",
    name: "",
    voucherNo: "",
    amountInWordsRs: "",
    amountInWordsCts: "",
    preparedBy: "",
    checkedBy: "",
    approvedBy: ""
  });

  const [records, setRecords] = useState([
    { date: "", description: "", billNo: "", rs: "", cts: "" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRecordChange = (index, field, value) => {
    const newRecords = [...records];
    newRecords[index][field] = value;
    setRecords(newRecords);
  };

  const addRecord = () => {
    setRecords([...records, { date: "", description: "", billNo: "", rs: "", cts: "" }]);
  };

  const removeRecord = (index) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  // Calculate totals
  const isRecordsEmpty = records.length === 1 && !records[0].date && !records[0].description && !records[0].billNo && !records[0].rs && !records[0].cts;
  
  const displayRecords = isRecordsEmpty ? [
    { date: "2026-09-04", description: "කොළඹ ගමන සඳහා ඉන්ධන", billNo: "B-452", rs: "2500", cts: "00" },
    { date: "2026-09-04", description: "රථවාහන නැවතුම් ගාස්තු", billNo: "T-12", rs: "150", cts: "00" }
  ] : records;

  const displayTotalRs = isRecordsEmpty ? 2650 : records.reduce((sum, rec) => sum + (parseInt(rec.rs) || 0), 0);
  const displayTotalCts = isRecordsEmpty ? 0 : records.reduce((sum, rec) => sum + (parseInt(rec.cts) || 0), 0);
  const displayFinalCts = displayTotalCts % 100;
  const displayFinalRs = displayTotalRs + Math.floor(displayTotalCts / 100);



  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 3</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">සුළු මුදල් වවුචරය (Petty Cash Voucher)</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
              <Printer className="w-5 h-5" />
              Print Voucher
            </button>
          </div>
        </div>

        {/* Input Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-500" /> 
              Voucher Details (වවුචරයේ විස්තර)
            </h2>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Head (ශීර්ෂය)</label>
                <input type="text" name="head" value={formData.head || 'ප්‍රවාහන'} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Sub Head (උප ශීර්ෂය)</label>
                <input type="text" name="subHead" value={formData.subHead || 'ඉන්ධන'} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Name (නම)</label>
                <input type="text" name="name" value={formData.name || 'කමල් පෙරේරා'} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Voucher No (වවුචර අංකය)</label>
                <input type="text" name="voucherNo" value={formData.voucherNo || 'PV-1025'} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-bold text-slate-700 mb-3">Expenses (වියදම්)</h3>
              <div className="space-y-3">
                {records.map((rec, index) => (
                  <div key={index} className="flex gap-3 items-start flex-wrap lg:flex-nowrap">
                    <input type="date" value={rec.date} onChange={e => handleRecordChange(index, 'date', e.target.value)} className="w-full lg:w-40 px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    <input type="text" placeholder="Description" value={rec.description} onChange={e => handleRecordChange(index, 'description', e.target.value)} className="flex-1 min-w-[200px] px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    <input type="text" placeholder="Bill No" value={rec.billNo} onChange={e => handleRecordChange(index, 'billNo', e.target.value)} className="w-full lg:w-24 px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 text-sm">රු:</span>
                      <input type="number" placeholder="0" value={rec.rs} onChange={e => handleRecordChange(index, 'rs', e.target.value)} className="w-20 px-3 py-2 rounded-lg border border-slate-200 text-sm text-right" />
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-slate-500 text-sm">ශත:</span>
                      <input type="number" placeholder="00" value={rec.cts} onChange={e => handleRecordChange(index, 'cts', e.target.value)} className="w-16 px-3 py-2 rounded-lg border border-slate-200 text-sm text-center" />
                    </div>
                    {records.length > 1 && (
                      <button onClick={() => removeRecord(index)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button onClick={addRecord} className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-semibold hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
                <PlusCircle className="w-5 h-5" /> Add Row
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount in Words (Rupees) - රුපියල් අකුරෙන්</label>
                <input type="text" name="amountInWordsRs" value={formData.amountInWordsRs || 'දෙදහස් හයසිය පනහයි'} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount in Words (Cents) - ශත අකුරෙන්</label>
                <input type="text" name="amountInWordsCts" value={formData.amountInWordsCts || 'බිංදුවයි'} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Form Container (Paper style - Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-8 md:p-12 text-slate-900 max-w-4xl mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-8 right-12 font-bold text-sm print:hidden">
            Form 3 Preview
          </div>
          <div className="hidden print:block absolute top-0 right-0 font-bold text-sm">
            Form 3
          </div>

          <div className="text-center mb-10 mt-2">
            <h2 className="text-2xl font-bold underline underline-offset-4">සුළු මුදල් වවුචරය</h2>
          </div>

          <div className="flex justify-between items-end mb-6">
            <div className="space-y-4 w-1/2">
              <div className="flex items-end">
                <span className="w-24 font-bold">ශීර්ෂය</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black text-lg">{formData.head || 'ප්‍රවාහන'}</span>
              </div>
              <div className="flex items-end">
                <span className="w-24 font-bold">උප ශීර්ෂය</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black text-lg">{formData.subHead || 'ඉන්ධන'}</span>
              </div>
              <div className="flex items-end">
                <span className="w-24 font-bold">නම</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black text-lg">{formData.name || 'කමල් පෙරේරා'}</span>
              </div>
            </div>
            
            <div className="w-1/3 space-y-4">
              <div className="flex items-end">
                <span className="w-28 font-bold">වවුචර අංක</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black text-lg text-center">{formData.voucherNo || 'PV-1025'}</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border-2 border-slate-900 mb-6 mt-10">
            <thead>
              <tr>
                <th className="border-2 border-slate-900 p-2 text-center w-32 font-bold" rowSpan="2">දිනය</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">විස්තරය</th>
                <th className="border-2 border-slate-900 p-2 text-center w-24 font-bold" rowSpan="2">බිල්පත්</th>
                <th className="border-2 border-slate-900 p-1 text-center w-40 font-bold" colSpan="2">මුදල</th>
              </tr>
              <tr>
                <th className="border-2 border-slate-900 p-1 text-center w-20 font-bold">රු:</th>
                <th className="border-2 border-slate-900 p-1 text-center w-20 font-bold">ශත</th>
              </tr>
            </thead>
            <tbody>
              {displayRecords.map((rec, idx) => (
                <tr key={idx} className="h-10">
                  <td className="border border-slate-900 p-2 text-center text-sm font-semibold">{rec.date}</td>
                  <td className="border border-slate-900 p-2 text-left text-sm font-semibold">{rec.description}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm font-semibold">{rec.billNo}</td>
                  <td className="border border-slate-900 p-2 text-right font-mono font-bold text-lg">{rec.rs}</td>
                  <td className="border border-slate-900 p-2 text-center font-mono font-bold text-lg">{rec.cts}</td>
                </tr>
              ))}
              {/* Empty rows to match paper style */}
              {[...Array(Math.max(1, 5 - displayRecords.length))].map((_, idx) => (
                <tr key={`empty-${idx}`} className="h-10">
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                </tr>
              ))}
              {/* Footer Total Row */}
              <tr>
                <td className="border border-slate-900 p-2 bg-slate-50 print:bg-transparent"></td>
                <td colSpan="2" className="border border-slate-900 p-2 text-right font-bold pr-4 bg-slate-50 print:bg-transparent text-lg">එකතුව</td>
                <td className="border border-slate-900 p-2 text-right font-bold font-mono text-xl bg-slate-50 print:bg-transparent">{displayFinalRs > 0 ? displayFinalRs : ''}</td>
                <td className="border border-slate-900 p-2 text-center font-bold font-mono text-xl bg-slate-50 print:bg-transparent">{displayFinalRs > 0 || displayFinalCts > 0 ? displayFinalCts.toString().padStart(2, '0') : ''}</td>
              </tr>
            </tbody>
          </table>

          {/* Bottom Section */}
          <div className="flex justify-between gap-12 mt-12 mb-4">
            {/* Left Signatures */}
            <div className="w-1/2 space-y-8">
              <div className="flex items-end">
                <span className="w-32 font-bold">පිළියෙල කළේ</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black">{formData.preparedBy || 'එන්. පී. කුමාර'}</span>
              </div>
              <div className="flex items-end">
                <span className="w-32 font-bold">පරීක්ෂා කළේ</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black">{formData.checkedBy || 'ඩී. එස්. ජයසිංහ'}</span>
              </div>
              <div className="flex items-end">
                <span className="w-32 font-bold">ගෙවීම් අනුමත කළේ</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black">{formData.approvedBy || 'ආර්. එම්. බණ්ඩාර'}</span>
              </div>
            </div>

            {/* Right Receipt & Stamp */}
            <div className="w-1/2 space-y-5 relative">
              <div className="flex items-end">
                <span className="w-16 font-bold">රුපියල්</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-600 text-base px-2 text-indigo-900 print:text-black font-semibold">{formData.amountInWordsRs || 'දෙදහස් හයසිය පනහයි'}</span>
              </div>
              <div className="flex items-end flex-wrap gap-y-2">
                <div className="flex items-end flex-1 min-w-[150px]">
                  <span className="w-12 font-bold">ශත</span>
                  <span className="flex-1 border-b-2 border-dotted border-slate-600 text-base px-2 text-indigo-900 print:text-black font-semibold">{formData.amountInWordsCts || 'බිංදුවයි'}</span>
                </div>
                <span className="ml-2 font-bold">පමණක් භාරගතිමි.</span>
              </div>
              
              <div className="pt-4 flex gap-4">
                <span className="font-bold w-16 mt-2">සාක්‍ෂි :-</span>
                <div className="space-y-5 flex-1">
                  <div className="flex items-end">
                    <span className="w-6 font-bold">1</span>
                    <span className="flex-1 border-b-2 border-dotted border-slate-600"></span>
                  </div>
                  <div className="flex items-end">
                    <span className="w-6 font-bold">2</span>
                    <span className="flex-1 border-b-2 border-dotted border-slate-600"></span>
                  </div>
                </div>
              </div>

              {/* Stamp Box */}
              <div className="absolute bottom-[-10px] right-0 border-2 border-slate-900 w-28 h-12 flex items-center justify-center bg-slate-50 print:bg-transparent">
                <span className="font-bold text-slate-800">මුද්දරය</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
