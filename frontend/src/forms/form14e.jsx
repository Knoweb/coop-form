import React, { useState } from 'react';
import { Save, Printer } from 'lucide-react';

const predefinedRows = [
  "112 හාල් ගෝනි",
  "80 හාල් ගෝනි",
  "සීනි ගෝනි",
  "පිටි ගෝනි",
  "පරිප්පු",
  "මිරිස්",
  "කඩල",
  "වෙනත්",
  "පරණ"
];

export default function Form14E() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    date: '2023-11-15',
    warehouseType: 'තොග',
    serialNo: 'E-502',
    rows: predefinedRows.map((desc, i) => ({
      description: desc,
      qty: i === 0 ? '10' : i === 1 ? '5' : '',
      rateRs: i === 0 ? '50' : i === 1 ? '50' : '',
      rateCts: i === 0 || i === 1 ? '00' : '',
      valueRs: i === 0 ? '500' : i === 1 ? '250' : '',
      valueCts: i === 0 || i === 1 ? '00' : ''
    }))
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateRow = (index, field, value) => {
    const newRows = [...formData.rows];
    newRows[index][field] = value;
    setFormData({ ...formData, rows: newRows });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const printLineCls = "border-b border-dotted border-black min-h-[1.2rem] inline-block";

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-slate-800">Form 14 E: භාරගත්/විකුණු ගෝනි පිළිබඳ විස්තරය</h1>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium transition-colors">
            <Printer className="w-4 h-4" /> Print
          </button>
          <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50">
            <Save className="w-4 h-4" /> {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save'}
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        {/* ===== DATA ENTRY FORM ===== */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 print:hidden">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-200">Data Entry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">දිනය</label>
              <input type="date" value={formData.date} onChange={e => updateField('date', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">ගබඩා වර්ගය (තොග/ගෝනි/සිල්ලර)</label>
              <input type="text" value={formData.warehouseType} onChange={e => updateField('warehouseType', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="උදා: ප්‍රධාන" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">අනු අංකය</label>
              <input type="text" value={formData.serialNo} onChange={e => updateField('serialNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="p-2 text-left font-medium text-slate-600 min-w-[150px]" rowSpan={2}>විස්තර</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24" rowSpan={2}>ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>බැගින්</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>වටිනාකම</th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20">රු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-16">ශ.</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">රු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-16">ශ.</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-2 font-medium text-slate-600">{row.description}</td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.rateRs} onChange={e => updateRow(i, 'rateRs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1"><input type="number" value={row.rateCts} onChange={e => updateRow(i, 'rateCts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.valueRs} onChange={e => updateRow(i, 'valueRs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1"><input type="number" value={row.valueCts} onChange={e => updateRow(i, 'valueCts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden mx-auto print:mx-0">
          <div className="relative p-12 print:p-8 font-serif text-black" style={{ minHeight: '297mm' }}>
            
            <div className="flex justify-end mb-6 font-bold text-sm">
              Form 14 E
            </div>

            <div className="flex items-end justify-center gap-2 text-sm font-semibold mb-2 whitespace-nowrap">
              <span className={`${printLineCls} w-48 text-center`}>{formData.date}</span>
              <span>දින</span>
              <span className={`${printLineCls} w-32 text-center`}>{formData.warehouseType}</span>
              <span>තොග/ගෝනි/සිල්ලර ගබඩාවෙන්</span>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-bold text-base">භාරගත්/විකුණු ගෝනි පිළිබඳ විස්තරය.</h2>
            </div>

            <div className="flex justify-end mb-2 text-sm font-semibold">
              <div className="flex items-end gap-2 w-1/3">
                <span>අනු අංකය</span>
                <span className={`${printLineCls} flex-1`}>{formData.serialNo}</span>
              </div>
            </div>

            <table className="w-full border-collapse border border-black text-sm table-fixed mb-8">
              <thead>
                <tr>
                  <th className="border border-black font-semibold p-2 align-middle text-center" rowSpan={2}>විස්තර</th>
                  <th className="border border-black font-semibold p-2 text-center w-28" rowSpan={2}>ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-2 align-middle text-center w-32" colSpan={2}>බැගින්</th>
                  <th className="border border-black font-semibold p-2 text-center w-32" colSpan={2}>වටිනාකම</th>
                </tr>
                <tr>
                  <th className="border border-black font-semibold p-1 text-center w-20">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-12">ශ.</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-12">ශ.</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="h-10">
                    <td className="border border-black font-semibold px-4">{row.description}</td>
                    <td className="border border-black text-center px-1">{row.qty}</td>
                    <td className="border border-black text-right px-2">{row.rateRs}</td>
                    <td className="border border-black text-center px-1">{row.rateCts ? row.rateCts.padStart(2,'0') : ''}</td>
                    <td className="border border-black text-right px-2">{row.valueRs}</td>
                    <td className="border border-black text-center px-1">{row.valueCts ? row.valueCts.padStart(2,'0') : ''}</td>
                  </tr>
                ))}
                <tr className="h-10 font-bold">
                  <td className="border border-black text-center pr-12">එකතුව</td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col items-center gap-12 text-sm font-semibold">
              <div>ඉහත සඳහන් විස්තර අනුව ගෝනි භාරගත් බවත්/ විකුණු බවත් සහතික කරමි.</div>
              
              <div className="flex flex-col items-center w-64 mr-[-400px]">
                <div className={`${printLineCls} w-full`}></div>
                <div className="mt-2">ගෝනි ගබඩාවේ කළමනාකරු</div>
              </div>

              <div className="mt-8 text-xs font-normal text-center">
                (බැගින් හා වටිනාකම තීරය සම්පූර්ණ කළ යුත්තේ විකිණීමේදී පමණකි.)
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
