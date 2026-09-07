import React, { useState } from 'react';
import { FileText, Save } from 'lucide-react';

export default function Form6() {
  const [formData, setFormData] = useState({
    officerName: "",
    date: "",
    noticeNo: ""
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
    { chqDate: "2026-09-10", chqNo: "854125", payee: "කමල් ට්‍රේඩර්ස්", maxRs: "50000", maxCts: "00", amtRs: "45500", amtCts: "00", invNo: "INV-1024" },
    { chqDate: "2026-09-10", chqNo: "854126", payee: "සමූපකාර තොග වෙළඳසැල", maxRs: "100000", maxCts: "00", amtRs: "85000", amtCts: "50", invNo: "INV-1089" },
    { chqDate: "2026-09-11", chqNo: "854127", payee: "විජය හාඩ්වෙයාර්", maxRs: "25000", maxCts: "00", amtRs: "24000", amtCts: "00", invNo: "HW-455" },
    { chqDate: "2026-09-11", chqNo: "854128", payee: "ලංකා විදුලිබල මණ්ඩලය", maxRs: "15000", maxCts: "00", amtRs: "12450", amtCts: "00", invNo: "CEB-896" }
  ];

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-[1000px] mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 6</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">චෙක්පත් නිකුත් කිරීමේ සටහන (Cheque Issue Register)</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Officer's Name (නිලධාරියාගේ නම)</label>
                <input type="text" name="officerName" value={formData.officerName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Date (දිනය)</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Goods Issue Notice No (බඩු නිකුත් කිරීමේ නිවේදන අංකය)</label>
                <input type="text" name="noticeNo" value={formData.noticeNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
            </div>
            <p className="text-sm text-amber-600 mt-6 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Note: The table data is strictly hardcoded for the preview as requested.
            </p>
          </div>
        </div>

        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-8 md:p-12 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-8 right-12 font-bold text-lg">
            Form 6
          </div>

          <div className="flex justify-center mb-8 mt-2">
            <h2 className="text-xl font-bold underline decoration-2 underline-offset-4">චෙක්පත් නිකුත් කිරීමේ සටහන</h2>
          </div>

          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center text-base">
              <span className="font-bold flex flex-col justify-center leading-tight">
                <span>චෙක්පත් භාරගත්</span>
                <span>නිලධාරියාගේ නම</span>
              </span>
              <span className="text-xl font-light mx-2">&#125;</span>
              <span className="w-64 border-b border-dotted border-slate-600 font-mono text-slncc-blue print:text-black leading-none pb-1">{formData.officerName || 'එච්. ඩී. සිරිසේන'}</span>
            </div>
            
            <div className="flex items-end mt-4">
              <span className="font-bold mr-2">දිනය</span>
              <span className="w-48 border-b border-dotted border-slate-600 font-mono text-slncc-blue print:text-black text-center leading-none pb-1">{formData.date || '2026-09-10'}</span>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border border-slate-900 text-sm mt-4">
            <thead>
              <tr>
                <th className="border border-slate-900 p-1 text-center font-bold w-24" rowSpan="2">
                  <div className="flex flex-col items-center leading-tight py-2">
                    <span>චෙක්පතේ</span>
                    <span>දිනය</span>
                    <span>(1)</span>
                  </div>
                </th>
                <th className="border border-slate-900 p-1 text-center font-bold w-24" rowSpan="2">
                  <div className="flex flex-col items-center leading-tight py-2">
                    <span>චෙක්පතේ</span>
                    <span>අංකය</span>
                    <span>(2)</span>
                  </div>
                </th>
                <th className="border border-slate-900 p-1 text-center font-bold" rowSpan="2">
                  <div className="flex flex-col items-center leading-tight py-2">
                    <span>ආදායකයාගේ නම</span>
                    <span>(3)</span>
                  </div>
                </th>
                <th className="border border-slate-900 p-1 text-center font-bold" colSpan="2">
                  <div className="flex flex-col items-center leading-tight">
                    <span>උපරිම</span>
                    <span>සීමාව</span>
                    <span>(4)</span>
                  </div>
                </th>
                <th className="border border-slate-900 p-1 text-center font-bold" colSpan="2">
                  <div className="flex flex-col items-center leading-tight">
                    <span>චෙක්පතේ</span>
                    <span>මුදල</span>
                    <span>(5)</span>
                  </div>
                </th>
                <th className="border border-slate-900 p-1 text-center font-bold w-32" rowSpan="2">
                  <div className="flex flex-col items-center leading-tight py-2">
                    <span>අදාළ</span>
                    <span>ඉන්වොයිස්</span>
                    <span>අංකය</span>
                  </div>
                </th>
              </tr>
              <tr>
                <th className="border border-slate-900 p-1 text-center w-16">රු.</th>
                <th className="border border-slate-900 p-1 text-center w-8">ශ.</th>
                <th className="border border-slate-900 p-1 text-center w-16">රු.</th>
                <th className="border border-slate-900 p-1 text-center w-8">ශ.</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className="h-10">
                  <td className="border border-slate-900 p-1 text-center font-mono">{row.chqDate}</td>
                  <td className="border border-slate-900 p-1 text-center font-mono">{row.chqNo}</td>
                  <td className="border border-slate-900 p-1 pl-2">{row.payee}</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">{row.maxRs}</td>
                  <td className="border border-slate-900 p-1 text-center font-mono">{row.maxCts}</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">{row.amtRs}</td>
                  <td className="border border-slate-900 p-1 text-center font-mono">{row.amtCts}</td>
                  <td className="border border-slate-900 p-1 text-center font-mono">{row.invNo}</td>
                </tr>
              ))}
              {/* Empty rows */}
              {[...Array(6)].map((_, idx) => (
                <tr key={`empty-${idx}`} className="h-10">
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                  <td className="border border-slate-900 p-1"></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer Text */}
          <div className="mt-8 space-y-6 text-sm">
            <div className="flex gap-4">
              <span className="font-bold">1.</span>
              <p>ඉහත සඳහන් චෙක්පත් භාරගතිමි.</p>
            </div>
            
            <div className="flex gap-4">
              <span className="font-bold">2.</span>
              <p className="leading-relaxed text-justify">
                ඉහතින් භාරගන්නා ලද චෙක්පත් යොදා කරන ලද වියදම් 5 වෙනි තීරුවේ නිවැරදිව සටහන්කර ඒ සඳහා ඉන්වොයිස් අංක 6 වෙනි තීරුවේ ඇතුළත්කර ඇත. අදාළ ඉන්වොයිස් මීට අමුණා ඇත. බඩු ගබඩාවට යැවීමේ විස්තර අංක <span className="inline-block w-48 border-b border-dotted border-slate-600 mx-2 text-center font-mono text-slncc-blue print:text-black">{formData.noticeNo || 'GN-7412'}</span> දරණ බඩු නිකුත් කිරීමේ නිවේදනයෙන් සටහන් කර ඇත.
              </p>
            </div>

            <div className="flex justify-end pt-8">
              <div className="flex flex-col items-center w-48">
                <span className="w-full border-b border-slate-900 mb-2"></span>
                <span className="font-bold">අත්සන සහ දිනය</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
