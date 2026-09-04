import React, { useState } from 'react';
import { Save, Printer } from 'lucide-react';

export default function Form14A() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    startBillNo: '001',
    endBillNo: '050',
    warehouse: 'ප්‍රධාන ගබඩාව',
    date: '2023-10-25',
    
    // Array of 15 rows. Each row has 3 groups of (billNo, rs, cts)
    rows: Array.from({ length: 15 }, (_, rowIndex) => ({
      group1: {
        billNo: rowIndex === 0 ? 'ඉදිරියට ගෙනා/ආ' : rowIndex === 14 ? 'ඉදිරියට ගෙන ගිය' : (rowIndex === 1 ? '101' : rowIndex === 2 ? '102' : ''),
        rs: rowIndex === 1 ? '1500' : rowIndex === 2 ? '2500' : '', 
        cts: rowIndex === 1 ? '00' : rowIndex === 2 ? '50' : ''
      },
      group2: { 
        billNo: rowIndex === 1 ? '115' : rowIndex === 2 ? '116' : '', 
        rs: rowIndex === 1 ? '3000' : rowIndex === 2 ? '450' : '', 
        cts: rowIndex === 1 ? '00' : rowIndex === 2 ? '00' : '' 
      },
      group3: { 
        billNo: rowIndex === 1 ? '130' : rowIndex === 2 ? '131' : '', 
        rs: rowIndex === 1 ? '5000' : rowIndex === 2 ? '1200' : '', 
        cts: rowIndex === 1 ? '00' : rowIndex === 2 ? '00' : '' 
      }
    }))
  });

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const updateRow = (rowIndex, group, field, value) => {
    const newRows = [...formData.rows];
    newRows[rowIndex][group][field] = value;
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
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-slate-800">Form 14 A: සැකසුම් පත්‍රය - වෙළඳාම</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">පටන්ගත් බිල් අංකය</label>
              <input type="text" value={formData.startBillNo} onChange={e => updateField('startBillNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">ගබඩාව</label>
              <input type="text" value={formData.warehouse} onChange={e => updateField('warehouse', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">අවසන් කළ බිල් අංකය</label>
              <input type="text" value={formData.endBillNo} onChange={e => updateField('endBillNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">දිනය</label>
              <input type="date" value={formData.date} onChange={e => updateField('date', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 border-r border-slate-200" colSpan={3}>Group 1</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-r border-slate-200" colSpan={3}>Group 2</th>
                  <th className="p-2 text-center font-medium text-slate-600" colSpan={3}>Group 3</th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['group1', 'group2', 'group3'].map(g => (
                    <React.Fragment key={g}>
                      <th className="p-2 text-left font-medium text-slate-600 w-32">බිල් අංකය</th>
                      <th className="p-2 text-center font-medium text-slate-600 w-24">රු.</th>
                      <th className="p-2 text-center font-medium text-slate-600 w-16 border-r border-slate-200">ශත</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    {['group1', 'group2', 'group3'].map(g => (
                      <React.Fragment key={g}>
                        <td className="p-1">
                          <input type="text" value={row[g].billNo} onChange={e => updateRow(i, g, 'billNo', e.target.value)} 
                            className={`w-full border rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 ${
                              (i === 0 || i === 14) && g === 'group1' ? 'border-transparent bg-transparent font-semibold text-slate-700' : 'border-slate-300'
                            }`} 
                            readOnly={(i === 0 || i === 14) && g === 'group1'}
                          />
                        </td>
                        <td className="p-1">
                          <input type="number" value={row[g].rs} onChange={e => updateRow(i, g, 'rs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" />
                        </td>
                        <td className="p-1 border-r border-slate-200">
                          <input type="number" value={row[g].cts} onChange={e => updateRow(i, g, 'cts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
                        </td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden mx-auto">
          <div className="relative p-10 print:p-4 font-serif text-black" style={{ minHeight: '297mm' }}>
            
            <div className="text-right font-bold text-sm mb-4">Form 14 A</div>
            <div className="text-center mb-8">
              <h2 className="font-bold text-xl">සැකසුම් පත්‍රය - වෙළඳාම</h2>
            </div>

            <div className="flex justify-between items-start mb-6 text-sm font-bold">
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <span>පටන්ගත් බිල් අංකය</span>
                  <span className={`${printLineCls} w-48 text-center`}>{formData.startBillNo}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span>අවසන් කළ බිල් අංකය</span>
                  <span className={`${printLineCls} w-48 text-center`}>{formData.endBillNo}</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <span>ගබඩාව</span>
                  <span className={`${printLineCls} w-48 text-center`}>{formData.warehouse}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span>දිනය</span>
                  <span className={`${printLineCls} w-48 text-center`}>{formData.date}</span>
                </div>
              </div>
            </div>

            <div className="text-center font-bold text-base mb-6">
              මුදල් / ණය / සිල්ලර ගබඩාවලට
            </div>

            <table className="w-full border-collapse border-2 border-black text-sm table-fixed">
              <thead>
                <tr>
                  {['1', '2', '3'].map((_, idx) => (
                    <React.Fragment key={idx}>
                      <th className="border border-black font-semibold p-2 align-middle text-center" rowSpan={2}>බිල් අංකය</th>
                      <th className="border border-black font-semibold p-2 text-center" colSpan={2}>මුදල</th>
                    </React.Fragment>
                  ))}
                </tr>
                <tr>
                  {['1', '2', '3'].map((_, idx) => (
                    <React.Fragment key={idx}>
                      <th className="border border-black font-semibold p-1 text-center w-20">රු.</th>
                      <th className="border border-black font-semibold p-1 text-center w-12">ශ.</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="h-10">
                    {['group1', 'group2', 'group3'].map((g, idx) => (
                      <React.Fragment key={idx}>
                        <td className="border border-black text-center px-2 font-semibold text-[13px]">{row[g].billNo}</td>
                        <td className="border border-black text-right px-2">{row[g].rs}</td>
                        <td className="border border-black text-center px-2">{row[g].cts ? row[g].cts.padStart(2,'0') : ''}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            
          </div>
        </div>
      </div>
    </div>
  );
}
