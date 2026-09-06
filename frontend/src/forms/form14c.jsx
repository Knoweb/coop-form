import React, { useState } from 'react';
import { Save, Printer, Plus, Trash2 } from 'lucide-react';

export default function Form14C() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    societyName: 'කොළඹ දකුණ',
    warehouseName: 'ප්‍රධාන ගබඩාව',
    formNo: 'C-1025',
    date: '2023-10-25',
    rows: Array.from({ length: 10 }, (_, i) => ({
      serialNo: (i + 1).toString(),
      itemNo: i === 0 ? 'IT-001' : i === 1 ? 'IT-002' : '',
      description: i === 0 ? 'සීනි' : i === 1 ? 'පරිප්පු' : '',
      binQty: i === 0 ? '150' : i === 1 ? '75' : '',
      qty: i === 0 ? '50' : i === 1 ? '25' : '',
      wholesaleUnit: i === 0 ? '280' : i === 1 ? '310' : '',
      wholesaleTotal: i === 0 ? '14000' : i === 1 ? '7750' : '',
      retailUnit: i === 0 ? '300' : i === 1 ? '330' : '',
      retailTotal: i === 0 ? '15000' : i === 1 ? '8250' : ''
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

  const addRow = () => {
    setFormData({
      ...formData,
      rows: [
        ...formData.rows,
        {
          serialNo: (formData.rows.length + 1).toString(),
          itemNo: '', description: '', binQty: '', qty: '',
          wholesaleUnit: '', wholesaleTotal: '', retailUnit: '', retailTotal: ''
        }
      ]
    });
  };

  const removeRow = (index) => {
    const newRows = formData.rows.filter((_, i) => i !== index);
    // Re-assign serial numbers
    newRows.forEach((row, idx) => {
      row.serialNo = (idx + 1).toString();
    });
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
        <h1 className="text-2xl font-bold text-slate-800">Form 14 C: වෙළඳාම් පත (සිල්ලර ශාඛා වලට)</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="flex flex-col gap-1 lg:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">සමුපකාර සමිතිය</label>
              <input type="text" value={formData.societyName} onChange={e => updateField('societyName', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="සීමාසහිත..." />
            </div>
            <div className="flex flex-col gap-1 lg:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">ගබඩාවේ නම</label>
              <input type="text" value={formData.warehouseName} onChange={e => updateField('warehouseName', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">අංකය</label>
              <input type="text" value={formData.formNo} onChange={e => updateField('formNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">දිනය</label>
              <input type="date" value={formData.date} onChange={e => updateField('date', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 w-12" rowSpan={2}>අනු<br/>අංකය</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-20" rowSpan={2}>හැඳින්වූ<br/>අංකය</th>
                  <th className="p-2 text-left font-medium text-slate-600 min-w-[150px]" rowSpan={2}>විස්තරය</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-20" rowSpan={2}>බින්<br/>ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-20" rowSpan={2}>ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>තොග ගබඩාවේ මිල</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>තොග ගබඩාවේ මිල</th>
                  <th className="p-2 w-10" rowSpan={2}></th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20">ඒකක</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-24">මුදල</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20">ඒකක</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-24">මුදල</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-1 text-center font-medium text-slate-500">{row.serialNo}</td>
                    <td className="p-1"><input type="text" value={row.itemNo} onChange={e => updateRow(i, 'itemNo', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1"><input type="text" value={row.description} onChange={e => updateRow(i, 'description', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500" /></td>
                    <td className="p-1"><input type="text" value={row.binQty} onChange={e => updateRow(i, 'binQty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1"><input type="text" value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.wholesaleUnit} onChange={e => updateRow(i, 'wholesaleUnit', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1"><input type="number" value={row.wholesaleTotal} onChange={e => updateRow(i, 'wholesaleTotal', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.retailUnit} onChange={e => updateRow(i, 'retailUnit', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1"><input type="number" value={row.retailTotal} onChange={e => updateRow(i, 'retailTotal', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    
                    <td className="p-1 text-center">
                      <button onClick={() => removeRow(i)} className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors" title="Remove row">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={addRow} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
            <Plus className="w-4 h-4" /> Add Row
          </button>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[297mm] max-w-[297mm] overflow-hidden mx-auto print:mx-0">
          <div className="relative p-12 print:p-6 font-serif text-black" style={{ minHeight: '210mm' }}>
            
            <div className="relative mb-2">
              <div className="flex gap-2 text-sm font-semibold pr-24">
                <span>සීමාසහිත</span>
                <span className={`${printLineCls} flex-1 text-center`}>{formData.societyName}</span>
                <span>සමුපකාර සමිතිය.</span>
              </div>
              <div className="absolute top-0 right-0 font-bold text-sm">Form 14 C</div>
            </div>

            <div className="text-center mb-6">
              <h2 className="font-bold text-base">වෙළඳාම් පත (සිල්ලර ශාඛා වලට)</h2>
            </div>

            <div className="flex justify-between items-end mb-6 text-sm font-semibold">
              <div className="flex gap-2 w-1/2">
                <span>ගබඩාවේ නම</span>
                <span className={`${printLineCls} flex-1`}>{formData.warehouseName}</span>
              </div>
              <div className="flex flex-col gap-3 w-1/4">
                <div className="flex gap-2">
                  <span>අංකය</span>
                  <span className={`${printLineCls} flex-1`}>{formData.formNo}</span>
                </div>
                <div className="flex gap-2">
                  <span>දිනය</span>
                  <span className={`${printLineCls} flex-1 text-center`}>{formData.date}</span>
                </div>
              </div>
            </div>

            <table className="w-full border-collapse border border-black text-sm table-fixed mb-8">
              <thead>
                <tr>
                  <th className="border border-black font-semibold p-2 align-middle text-center w-12" rowSpan={2}>අනු<br/>අංකය</th>
                  <th className="border border-black font-semibold p-2 align-middle text-center w-16" rowSpan={2}>හැඳින්වූ<br/>අංකය</th>
                  <th className="border border-black font-semibold p-2 align-middle text-center" rowSpan={2}>විස්තරය</th>
                  <th className="border border-black font-semibold p-2 align-middle text-center w-16" rowSpan={2}>බින්<br/>ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-2 align-middle text-center w-20" rowSpan={2}>ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-2 text-center w-40" colSpan={2}>තොග ගබඩාවේ මිල</th>
                  <th className="border border-black font-semibold p-2 text-center w-40" colSpan={2}>තොග ගබඩාවේ මිල</th>
                </tr>
                <tr>
                  <th className="border border-black font-semibold p-1 text-center w-20">ඒකක</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">මුදල</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">ඒකක</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">මුදල</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="h-8">
                    <td className="border border-black text-center px-1">{row.serialNo}</td>
                    <td className="border border-black text-center px-1">{row.itemNo}</td>
                    <td className="border border-black px-2">{row.description}</td>
                    <td className="border border-black text-center px-1">{row.binQty}</td>
                    <td className="border border-black text-center px-1">{row.qty}</td>
                    <td className="border border-black text-right px-1">{row.wholesaleUnit}</td>
                    <td className="border border-black text-right px-1">{row.wholesaleTotal}</td>
                    <td className="border border-black text-right px-1">{row.retailUnit}</td>
                    <td className="border border-black text-right px-1">{row.retailTotal}</td>
                  </tr>
                ))}
                <tr className="h-8 font-bold">
                  <td className="border border-black text-center" colSpan={5}>එකතුව</td>
                  <td className="border border-black text-right px-1"></td>
                  <td className="border border-black text-right px-1"></td>
                  <td className="border border-black text-right px-1"></td>
                  <td className="border border-black text-right px-1"></td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between items-start text-sm font-semibold mt-12">
              <div className="flex flex-col gap-6 w-1/3">
                <div className="flex gap-2">
                  <span className="whitespace-nowrap">පිළියෙල කළේ</span>
                  <span className={`${printLineCls} flex-1`}></span>
                </div>
                <div className="flex gap-2">
                  <span className="whitespace-nowrap">පරික්ෂා කළේ</span>
                  <span className={`${printLineCls} flex-1`}></span>
                </div>
              </div>
              
              <div className="w-1/3 text-center mt-12">
                <span>නිවැරදිව භාර ගතිමි.</span>
              </div>

              <div className="flex flex-col gap-6 w-1/3 text-right">
                <div className="mb-2">ප්‍රවාහනය සඳහා භාරගතිමි.</div>
                <div className="flex gap-2 justify-end">
                  <span className="whitespace-nowrap">රියදුරු</span>
                  <span className={`${printLineCls} w-48`}></span>
                </div>
                <div className="flex gap-2 justify-end">
                  <span className="whitespace-nowrap">තනතුර</span>
                  <span className={`${printLineCls} w-48`}></span>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t border-dashed border-black"></div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
