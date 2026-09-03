import React, { useState } from 'react';
import { FileText, PlusCircle, Trash2, Printer } from 'lucide-react';

export default function Form4() {
  const defaultRecords = [
    { 
      date: "2026-09-01", 
      drawerName: "නිමල් පෙරේරා", 
      relevantName: "ඒ. බී. සිල්වා", 
      bankName: "ලංකා බැංකුව", 
      chequeNo: "102456", 
      rs: "15000", 
      cts: "00", 
      reason: "ගිණුමේ මුදල් නොමැති වීම", 
      actionTaken: "දුරකථනයෙන් දැනුම් දුන්නා", 
      finalSettlement: "මුදලින් ගෙව්වා" 
    },
    { 
      date: "2026-09-03", 
      drawerName: "සමන් කුමාර", 
      relevantName: "කමල් ට්‍රේඩර්ස්", 
      bankName: "මහජන බැංකුව", 
      chequeNo: "985412", 
      rs: "25500", 
      cts: "50", 
      reason: "අත්සන වෙනස් වීම", 
      actionTaken: "ලිපියක් යැව්වා", 
      finalSettlement: "නව චෙක්පතක් ලබා ගත්තා" 
    }
  ];

  const [records, setRecords] = useState([
    { date: "", drawerName: "", relevantName: "", bankName: "", chequeNo: "", rs: "", cts: "", reason: "", actionTaken: "", finalSettlement: "" }
  ]);

  const handleRecordChange = (index, field, value) => {
    const newRecords = [...records];
    newRecords[index][field] = value;
    setRecords(newRecords);
  };

  const addRecord = () => {
    setRecords([...records, { date: "", drawerName: "", relevantName: "", bankName: "", chequeNo: "", rs: "", cts: "", reason: "", actionTaken: "", finalSettlement: "" }]);
  };

  const removeRecord = (index) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  const handlePrint = () => {
    window.print();
  };

  const hasRecords = records.some(r => r.date || r.drawerName || r.relevantName || r.bankName || r.chequeNo || r.rs || r.cts || r.reason || r.actionTaken || r.finalSettlement);
  const displayRecords = hasRecords ? records : defaultRecords;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 4</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">බැංකුවෙන් ආපසු එවූ චෙක්පත් (Dishonoured Cheques)</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
              <Printer className="w-5 h-5" />
              Print Register
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
          
          <div className="p-6">
            <div className="space-y-6">
              {records.map((rec, index) => (
                <div key={index} className="p-4 border border-slate-200 rounded-xl bg-slate-50 relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">දිනය</label>
                      <input type="date" value={rec.date} onChange={e => handleRecordChange(index, 'date', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">අත්සන්කරුගේ නම</label>
                      <input type="text" value={rec.drawerName} onChange={e => handleRecordChange(index, 'drawerName', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">අදාළ අයගේ නම</label>
                      <input type="text" value={rec.relevantName} onChange={e => handleRecordChange(index, 'relevantName', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">බැංකුවේ නම</label>
                      <input type="text" value={rec.bankName} onChange={e => handleRecordChange(index, 'bankName', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">චෙක්පත් අංකය</label>
                      <input type="text" value={rec.chequeNo} onChange={e => handleRecordChange(index, 'chequeNo', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">මුදල (රු)</label>
                      <input type="number" value={rec.rs} onChange={e => handleRecordChange(index, 'rs', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">මුදල (ශත)</label>
                      <input type="number" value={rec.cts} onChange={e => handleRecordChange(index, 'cts', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">ආපසු එවීමට හේතු</label>
                      <input type="text" value={rec.reason} onChange={e => handleRecordChange(index, 'reason', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">ගත් ක්‍රියාමාර්ගය</label>
                      <input type="text" value={rec.actionTaken} onChange={e => handleRecordChange(index, 'actionTaken', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-600">ගිණුම් පියවූ අන්දම</label>
                      <input type="text" value={rec.finalSettlement} onChange={e => handleRecordChange(index, 'finalSettlement', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm" />
                    </div>
                  </div>
                  {records.length > 1 && (
                    <button onClick={() => removeRecord(index)} className="absolute top-2 right-2 p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors bg-white shadow-sm border border-rose-100">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button onClick={addRecord} className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-semibold hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
              <PlusCircle className="w-5 h-5" /> Add Row
            </button>
          </div>
        </div>

        {/* Table Container (Paper style - Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-8 md:p-12 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0 overflow-x-auto w-full">
          
          <div className="absolute top-8 right-12 font-bold text-sm print:hidden">
            Form 4 Preview
          </div>
          <div className="hidden print:block absolute top-0 right-0 font-bold text-sm">
            Form 4
          </div>

          <div className="text-center mb-8 mt-2">
            <h2 className="text-xl font-bold">බැංකුවෙන් ආපසු එවූ චෙක්පත්</h2>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border-2 border-slate-900 mb-6 min-w-[1000px]">
            <thead>
              <tr>
                <th className="border-2 border-slate-900 p-2 text-center w-24 font-bold" rowSpan="2">දිනය</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">අත්සන්කරුගේ නම</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">අදාළ අයගේ නම</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">බැංකුවේ නම</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">චෙක්පත් අංකය</th>
                <th className="border-2 border-slate-900 p-1 text-center w-24 font-bold" colSpan="2">මුදල</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">බැංකුවෙන් ආපසු එවීමට හේතු</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">ගත් ක්‍රියාමාර්ගය</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold" rowSpan="2">අවසානයේදී ගිණුම් පියවූ අන්දම</th>
              </tr>
              <tr>
                <th className="border-2 border-slate-900 p-1 text-center w-12 font-bold">රු:</th>
                <th className="border-2 border-slate-900 p-1 text-center w-12 font-bold">ශත</th>
              </tr>
            </thead>
            <tbody>
              {displayRecords.map((rec, idx) => (
                <tr key={idx} className="h-12">
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.date}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.drawerName}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.relevantName}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.bankName}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.chequeNo}</td>
                  <td className="border border-slate-900 p-2 text-right font-mono text-sm">{rec.rs}</td>
                  <td className="border border-slate-900 p-2 text-center font-mono text-sm">{rec.cts}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.reason}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.actionTaken}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.finalSettlement}</td>
                </tr>
              ))}
              {/* Empty rows to match paper style */}
              {[...Array(Math.max(1, 10 - displayRecords.length))].map((_, idx) => (
                <tr key={`empty-${idx}`} className="h-12">
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}
