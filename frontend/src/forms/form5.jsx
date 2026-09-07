import React, { useState } from 'react';
import { FileText, PlusCircle, Trash2, Save } from 'lucide-react';
import FormHeader from '../components/FormHeader';


export default function Form5() {
  const [formData, setFormData] = useState({
    head: "ප්‍රවාහන", subHead: "ඉන්ධන", name: "කමල් පෙරේරා", voucherNo: "V-5524",
    amountInWordsRs: "දොළොස් දහස් හත්සියක්", amountInWordsCts: "පනහක්", amountInNumbersRs: "12700", amountInNumbersCts: "50",
    preparedBy: "එන්. පී. කුමාර", checkedBy: "ඩී. එස්. ජයසිංහ"
  });

  const [records, setRecords] = useState([
    { date: "2026-09-05", description: "කාර්යාලීය උපකරණ මිලදී ගැනීම", billNo: "INV-892", rs: "12500", cts: "00" },
    { date: "2026-09-05", description: "ප්‍රවාහන ගාස්තු", billNo: "T-45", rs: "1200", cts: "50" }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const defaultRecords = [
    { date: "2026-09-05", description: "කාර්යාලීය උපකරණ මිලදී ගැනීම", billNo: "INV-892", rs: "12500", cts: "00" },
    { date: "2026-09-05", description: "ප්‍රවාහන ගාස්තු", billNo: "T-45", rs: "1200", cts: "50" }
  ];

  
  const displayRecords = records;

  const totalRs = displayRecords.reduce((sum, rec) => sum + (parseInt(rec.rs) || 0), 0);
  const totalCts = displayRecords.reduce((sum, rec) => sum + (parseInt(rec.cts) || 0), 0);
  const finalCts = totalCts % 100;
  const extraRs = Math.floor(totalCts / 100);
  const finalRs = totalRs + extraRs;

  
  const handleClear = () => {
    const emptyFormData = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
    setFormData(emptyFormData);
    const emptyRecord = Object.keys(records[0]).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
    setRecords([emptyRecord]);
  };

  const handleSubmit = () => {
    alert('Form data submitted successfully!');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0">
        
        {/* Header Section */}
        <FormHeader 
          title="වවුචරය" 
          subtitle="Voucher" 
          formNumber="Form 5" 
        />
        <div className="flex justify-end items-center gap-3 print:hidden mb-6">
          <button onClick={handleClear} className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm border border-rose-200">
              <Trash2 className="w-5 h-5" />
              Clear Form
            </button>
<button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
              <Save className="w-5 h-5" />
              Print Voucher
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Head (ශීර්ෂය)</label>
                <input type="text" name="head" value={formData.head} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Sub-head (උප ශීර්ෂය)</label>
                <input type="text" name="subHead" value={formData.subHead} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Name (නම)</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Voucher No (වවුචර අංකය)</label>
                <input type="text" name="voucherNo" value={formData.voucherNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
            </div>

            <div className="mt-10 mb-4 border-b border-slate-200 pb-2">
              <h3 className="text-md font-bold text-slate-700">Records (වාර්තා)</h3>
            </div>
            
            <div className="space-y-4">
              {records.map((rec, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
                    <div className="col-span-2 md:col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Date</label>
                      <input type="date" value={rec.date} onChange={e => handleRecordChange(index, 'date', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue" />
                    </div>
                    <div className="col-span-2 md:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                      <input type="text" value={rec.description} onChange={e => handleRecordChange(index, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue" />
                    </div>
                    <div className="col-span-2 md:col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Bill No</label>
                      <input type="text" value={rec.billNo} onChange={e => handleRecordChange(index, 'billNo', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Rs (රු)</label>
                      <input type="number" value={rec.rs} onChange={e => handleRecordChange(index, 'rs', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue font-mono" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Cts (ශ)</label>
                      <input type="number" value={rec.cts} onChange={e => handleRecordChange(index, 'cts', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue font-mono" />
                    </div>
                  </div>
                  {records.length > 1 && (
                    <button onClick={() => removeRecord(index)} className="md:absolute md:-right-2 md:-top-2 p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors bg-white shadow-sm border border-rose-100 md:opacity-0 md:group-hover:opacity-100 mt-2 md:mt-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button onClick={addRecord} className="mt-4 flex items-center gap-2 text-sm text-slncc-red font-semibold hover:text-slncc-blue p-2 hover:bg-slncc-gray rounded-lg transition-colors">
              <PlusCircle className="w-5 h-5" /> Add Row
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount in Words (Rs) - රුපියල් අකුරෙන්</label>
                <input type="text" name="amountInWordsRs" value={formData.amountInWordsRs} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount in Words (Cents) - ශත අකුරෙන්</label>
                <input type="text" name="amountInWordsCts" value={formData.amountInWordsCts} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount in Numbers (Rs) - රුපියල් ඉලක්කමෙන්</label>
                <input type="text" name="amountInNumbersRs" value={formData.amountInNumbersRs} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Amount in Numbers (Cts) - ශත ඉලක්කමෙන්</label>
                <input type="text" name="amountInNumbersCts" value={formData.amountInNumbersCts} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Prepared By (පිළියෙල කළේ)</label>
                <input type="text" name="preparedBy" value={formData.preparedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Checked By (පරීක්ෂා කළේ)</label>
                <input type="text" name="checkedBy" value={formData.checkedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-8 md:p-12 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-8 right-12 font-bold text-sm print:hidden">
            Form 5 Preview
          </div>
          <div className="hidden print:block absolute top-0 right-0 font-bold text-sm">
            Form 5
          </div>

          {/* Top Info */}
          <div className="flex justify-between items-start mb-6 pt-4">
            <div className="space-y-2 w-1/2">
              <div className="flex items-end">
                <span className="w-24 font-bold">ශීර්ෂය</span>
                <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-slncc-blue print:text-black">{formData.head }</span>
              </div>
              <div className="flex items-end">
                <span className="w-24 font-bold">උප ශීර්ෂය</span>
                <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-slncc-blue print:text-black">{formData.subHead }</span>
              </div>
              <div className="flex items-end">
                <span className="w-24 font-bold">නම</span>
                <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-slncc-blue print:text-black">{formData.name }</span>
              </div>
            </div>

            <div className="text-center w-1/3">
              <h2 className="text-2xl font-bold underline decoration-2 underline-offset-4 mb-8">වවුචරය</h2>
              <div className="flex items-end justify-end mt-4">
                <span className="font-bold mr-2">වවුචර අංකය</span>
                <span className="w-32 border-b border-dotted border-slate-600 px-2 font-mono text-slncc-blue print:text-black text-center">{formData.voucherNo }</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border-2 border-slate-900 mb-6 mt-4">
            <thead>
              <tr>
                <th className="border-2 border-slate-900 p-2 text-center w-32 font-bold">දිනය</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold">විස්තර</th>
                <th className="border-2 border-slate-900 p-2 text-center w-32 font-bold">බිල් අංකය</th>
                <th className="border-2 border-slate-900 p-1 text-center w-48 font-bold" colSpan="2">මුදල</th>
              </tr>
            </thead>
            <tbody>
              {displayRecords.map((rec, idx) => (
                <tr key={idx} className="h-12">
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.date}</td>
                  <td className="border border-slate-900 p-2 text-sm">{rec.description}</td>
                  <td className="border border-slate-900 p-2 text-center text-sm">{rec.billNo}</td>
                  <td className="border border-slate-900 p-2 text-right w-24 font-mono text-sm">{rec.rs}</td>
                  <td className="border border-slate-900 p-2 text-center w-24 font-mono text-sm">{rec.cts}</td>
                </tr>
              ))}
              {/* Empty rows to match paper style */}
              {[...Array(Math.max(1, 5 - displayRecords.length))].map((_, idx) => (
                <tr key={`empty-${idx}`} className="h-12">
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                </tr>
              ))}
              {/* Total Row */}
              <tr className="h-12 bg-slate-50 print:bg-transparent font-bold">
                <td className="border border-slate-900 p-2" colSpan="3">
                  <div className="flex justify-end pr-4">එකතුව</div>
                </td>
                <td className="border border-slate-900 p-2 text-right font-mono text-lg border-double border-b-4">{finalRs}</td>
                <td className="border border-slate-900 p-2 text-center font-mono text-lg border-double border-b-4">{finalCts.toString().padStart(2, '0')}</td>
              </tr>
            </tbody>
          </table>

          {/* Footer Signatures */}
          <div className="mt-12 space-y-10">
            <div className="flex justify-between items-end">
              <div className="flex items-end w-1/2">
                <span className="w-24 font-bold">පිළියෙල කළේ</span>
                <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-slncc-blue print:text-black">{formData.preparedBy }</span>
              </div>
              <div className="flex items-end w-1/3">
                <span className="w-24 font-bold">පරීක්ෂා කළේ</span>
                <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-slncc-blue print:text-black">{formData.checkedBy }</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 font-bold leading-relaxed">
              <div className="flex items-center gap-2 flex-wrap">
                 <span>රුපියල්</span>
                 <span className="flex-1 border-b border-dotted border-slate-600 min-w-[200px] text-center font-mono text-slncc-blue print:text-black">{formData.amountInWordsRs }</span>
                 <span>ශත</span>
                 <span className="flex-1 border-b border-dotted border-slate-600 min-w-[150px] text-center font-mono text-slncc-blue print:text-black">{formData.amountInWordsCts }</span>
                 <span>(රු.</span>
                 <span className="border-b border-dotted border-slate-600 w-24 text-center font-mono text-slncc-blue print:text-black">{formData.amountInNumbersRs }</span>
                 <span>ශත.</span>
                 <span className="border-b border-dotted border-slate-600 w-16 text-center font-mono text-slncc-blue print:text-black">{formData.amountInNumbersCts }</span>
                 <span>)</span>
              </div>
              <div className="text-center mt-2">
                 පමණක් භාර ගතිමි.
              </div>
            </div>
            
            <div className="flex justify-between items-end pt-4">
              <div className="flex flex-col gap-6 w-1/2">
                <div className="flex items-start gap-2">
                  <span className="font-bold">සාක්ෂි :-</span>
                  <div className="flex flex-col gap-6 w-full">
                     <div className="flex items-end">
                       <span className="mr-2">1.</span>
                       <span className="flex-1 border-b border-dotted border-slate-600"></span>
                     </div>
                     <div className="flex items-end">
                       <span className="mr-2">2.</span>
                       <span className="flex-1 border-b border-dotted border-slate-600"></span>
                     </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-24 h-12 border-2 border-slate-900 flex items-center justify-center text-sm font-bold">
                  මුද්දරය
                </div>
                <span className="font-bold">අත්සන</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
