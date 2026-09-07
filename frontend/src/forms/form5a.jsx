import React, { useState } from 'react';
import { FileText, PlusCircle, Trash2, Save } from 'lucide-react';

export default function Form5A() {
  const [formData, setFormData] = useState({
    date: "2026-09-05", memberNo: "M-4589", ledgerPage: "12", name: "පී. කේ. සමරසිංහ"
  });

  const [records, setRecords] = useState([
    { grnNo: "GRN-101", grnValue: "25000.00", deductionLoan: "2000.00", deductionInterest: "250.00", deductionAdvance: "5000.00", deductionOther: "0.00" },
    { grnNo: "GRN-105", grnValue: "18000.00", deductionLoan: "0.00", deductionInterest: "0.00", deductionAdvance: "3000.00", deductionOther: "150.00" }
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
    setRecords([...records, { grnNo: "", grnValue: "", deductionLoan: "", deductionInterest: "", deductionAdvance: "", deductionOther: "" }]);
  };

  const removeRecord = (index) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  const defaultRecords = [
    { grnNo: "GRN-101", grnValue: "25000.00", deductionLoan: "2000.00", deductionInterest: "250.00", deductionAdvance: "5000.00", deductionOther: "0.00" },
    { grnNo: "GRN-105", grnValue: "18000.00", deductionLoan: "0.00", deductionInterest: "0.00", deductionAdvance: "3000.00", deductionOther: "150.00" }
  ];

  
  const displayRecords = records;

  
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
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">Form 5A</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium mt-1">විකුණුම් විස්තරය (Sales Description)</p>
          </div>
          <div className="flex items-center gap-3">
            
            <button onClick={handleClear} className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm border border-rose-200">
              <Trash2 className="w-5 h-5" />
              Clear Form
            </button>
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
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Date (දිනය)</label>
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Member No (සාමාජික අංකය)</label>
                <input type="text" name="memberNo" value={formData.memberNo} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">L/P (ලි/පි)</label>
                <input type="text" name="ledgerPage" value={formData.ledgerPage} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Name (නම)</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
              </div>
            </div>

            <div className="mt-10 mb-4 border-b border-slate-200 pb-2">
              <h3 className="text-md font-bold text-slate-700">Records (වාර්තා)</h3>
            </div>
            
            <div className="space-y-4">
              {records.map((rec, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">GRN No (අංක)</label>
                      <input type="text" value={rec.grnNo} onChange={e => handleRecordChange(index, 'grnNo', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Value (වටිනාකම)</label>
                      <input type="number" value={rec.grnValue} onChange={e => handleRecordChange(index, 'grnValue', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Loan (ණය)</label>
                      <input type="number" value={rec.deductionLoan} onChange={e => handleRecordChange(index, 'deductionLoan', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Interest (පොලී)</label>
                      <input type="number" value={rec.deductionInterest} onChange={e => handleRecordChange(index, 'deductionInterest', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Advance (අත්තිකාරම්)</label>
                      <input type="number" value={rec.deductionAdvance} onChange={e => handleRecordChange(index, 'deductionAdvance', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Other (වෙනත්)</label>
                      <input type="number" value={rec.deductionOther} onChange={e => handleRecordChange(index, 'deductionOther', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono" />
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
            
            <button onClick={addRecord} className="mt-4 flex items-center gap-2 text-sm text-indigo-600 font-semibold hover:text-indigo-700 p-2 hover:bg-indigo-50 rounded-lg transition-colors">
              <PlusCircle className="w-5 h-5" /> Add Row
            </button>
          </div>
        </div>

        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-6 md:p-10 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-8 right-12 font-bold text-sm print:hidden">
            Form 5A Preview
          </div>
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 flex justify-center mt-4">
              <h2 className="text-xl font-bold">විකුණුම් විස්තරය</h2>
            </div>
            <div className="text-right font-bold text-lg w-32">
              5 ඒ
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left Side: Table */}
            <div className="w-full lg:w-3/5 overflow-x-auto">
              <table className="w-full border-collapse border-2 border-slate-900 text-sm">
                <thead>
                  <tr>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold" colSpan="2">ගබඩා කුවිතා:</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold" colSpan="4">අඩුකිරීම</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-20" rowSpan="2">මුළු අඩුකිරීම්</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-24" rowSpan="2">ඉතිරි ගෙවීම්</th>
                  </tr>
                  <tr>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-16">අංක</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-24">වටිනාකම</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-20">ණය</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-20">පොලී</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-24">අත්තිකාරම්</th>
                    <th className="border-2 border-slate-900 p-1 text-center font-bold w-20">වෙනත්</th>
                  </tr>
                </thead>
                <tbody>
                  {displayRecords.map((rec, idx) => {
                    const grnVal = parseFloat(rec.grnValue) || 0;
                    const loan = parseFloat(rec.deductionLoan) || 0;
                    const interest = parseFloat(rec.deductionInterest) || 0;
                    const advance = parseFloat(rec.deductionAdvance) || 0;
                    const other = parseFloat(rec.deductionOther) || 0;
                    const totalDed = loan + interest + advance + other;
                    const balance = grnVal - totalDed;
                    
                    return (
                      <tr key={idx} className="h-10">
                        <td className="border border-slate-900 p-1 text-center">{rec.grnNo}</td>
                        <td className="border border-slate-900 p-1 text-right font-mono">{rec.grnValue ? grnVal.toFixed(2) : ''}</td>
                        <td className="border border-slate-900 p-1 text-right font-mono">{rec.deductionLoan ? loan.toFixed(2) : ''}</td>
                        <td className="border border-slate-900 p-1 text-right font-mono">{rec.deductionInterest ? interest.toFixed(2) : ''}</td>
                        <td className="border border-slate-900 p-1 text-right font-mono">{rec.deductionAdvance ? advance.toFixed(2) : ''}</td>
                        <td className="border border-slate-900 p-1 text-right font-mono">{rec.deductionOther ? other.toFixed(2) : ''}</td>
                        <td className="border border-slate-900 p-1 text-right font-mono font-bold">{rec.grnValue || rec.deductionLoan ? totalDed.toFixed(2) : ''}</td>
                        <td className="border border-slate-900 p-1 text-right font-mono font-bold">{rec.grnValue ? balance.toFixed(2) : ''}</td>
                      </tr>
                    );
                  })}
                  {/* Empty rows to match paper style */}
                  {[...Array(Math.max(1, 8 - displayRecords.length))].map((_, idx) => (
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
            </div>

            {/* Right Side: Details & Signatures */}
            <div className="w-full lg:w-2/5 space-y-8 pt-2">
              <div className="space-y-4">
                <div className="flex items-end text-sm">
                  <span className="w-16 font-bold">දිනය</span>
                  <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black leading-none">{formData.date }</span>
                </div>
                <div className="flex items-end text-sm">
                  <span className="w-24 font-bold">සාමාජික අංකය</span>
                  <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black leading-none">{formData.memberNo }</span>
                  <span className="w-12 font-bold text-center">ලි/පි</span>
                  <span className="w-16 border-b border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black leading-none">{formData.ledgerPage }</span>
                </div>
                <div className="flex items-end text-sm">
                  <span className="w-16 font-bold">නම</span>
                  <span className="flex-1 border-b border-dotted border-slate-600 px-2 font-mono text-indigo-900 print:text-black leading-none">{formData.name }</span>
                </div>
              </div>

              <div className="space-y-1 font-bold text-sm">
                <div>මෙහි සඳහන්</div>
                <div>මුදල්</div>
                <div>භාර ගතිමි</div>
              </div>

              <div className="space-y-4 pt-4">
                <p className="font-bold text-sm leading-relaxed">
                  නිවැරදිව සටහන්කර මුදල් ගෙවූ බව <br/> සහතික කරමි.
                </p>
                <div className="text-right font-bold text-sm pt-8">
                  කළමනාකරු
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
