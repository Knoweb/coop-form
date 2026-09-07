import React, { useState } from 'react';
import { Save, Printer } from 'lucide-react';

export default function Form14D() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    memberNo: 'M-5214',
    name: 'නිමල් පෙරේරා',
    formNo: 'D-205',
    date: '2023-11-12',
    material: 'හාල් (නාඩු)',
    rupeesWords: 'දහසය දහස් පන්සිය',
    centsWords: 'බිංදුවයි',
    warehouseName: 'මධ්‍යම ගබඩාව',
    rows: Array.from({ length: 5 }, (_, i) => ({
      grade: (i + 1).toString(),
      qtyBu: i === 0 ? '10' : i === 1 ? '5' : '',
      qtySe: i === 0 ? '2' : i === 1 ? '1' : '',
      rate: i === 0 ? '1100' : i === 1 ? '1100' : '',
      valueRs: i === 0 ? '11000' : i === 1 ? '5500' : '',
      valueCts: i === 0 || i === 1 ? '00' : '',
      advanceRs: i === 0 ? '5000' : '',
      advanceCts: i === 0 ? '00' : ''
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
        <h1 className="text-2xl font-bold text-slate-800">Form 14 D: ගබඩා කුවිතාන්සිය</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">සාමාජික අංකය</label>
              <input type="text" value={formData.memberNo} onChange={e => updateField('memberNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">අංකය</label>
              <input type="text" value={formData.formNo} onChange={e => updateField('formNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">නම</label>
              <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">දිනය</label>
              <input type="date" value={formData.date} onChange={e => updateField('date', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">ද්‍රව්‍ය</label>
              <input type="text" value={formData.material} onChange={e => updateField('material', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 w-16" rowSpan={2}>ශ්‍රේණිය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24" rowSpan={2}>බැගින්</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>වටිනාකම</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>අත්තිකාරම්</th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20">බු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-20">සේ.</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">රු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-16">ශ.</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">රු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-16">ශ.</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-1 text-center font-medium text-slate-500">{row.grade}</td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.qtyBu} onChange={e => updateRow(i, 'qtyBu', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1"><input type="number" value={row.qtySe} onChange={e => updateRow(i, 'qtySe', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.rate} onChange={e => updateRow(i, 'rate', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.valueRs} onChange={e => updateRow(i, 'valueRs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1"><input type="number" value={row.valueCts} onChange={e => updateRow(i, 'valueCts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.advanceRs} onChange={e => updateRow(i, 'advanceRs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1"><input type="number" value={row.advanceCts} onChange={e => updateRow(i, 'advanceCts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">මුදල (රුපියල් - අකුරෙන්)</label>
              <input type="text" value={formData.rupeesWords} onChange={e => updateField('rupeesWords', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">මුදල (ශත - අකුරෙන්)</label>
              <input type="text" value={formData.centsWords} onChange={e => updateField('centsWords', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">ගබඩාවේ නම</label>
              <input type="text" value={formData.warehouseName} onChange={e => updateField('warehouseName', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden mx-auto print:mx-0">
          <div className="relative p-12 print:p-6 font-serif text-black" style={{ minHeight: '297mm' }}>
            
            <div className="flex justify-between items-start mb-6">
              <div className="w-1/4"></div>
              <div className="w-2/4 text-center">
                <h2 className="font-bold text-lg">ගබඩා කුවිතාන්සිය</h2>
              </div>
              <div className="w-1/4 text-right font-bold text-sm">
                Form 14 D
              </div>
            </div>

            <div className="flex justify-between items-start mb-6 text-sm font-semibold">
              <div className="flex flex-col gap-3 w-1/2">
                <div className="flex items-end gap-2 pr-8">
                  <span>සාමාජික අංකය</span>
                  <span className={`${printLineCls} flex-1`}>{formData.memberNo}</span>
                </div>
                <div className="flex items-end gap-2 pr-8">
                  <span>නම</span>
                  <span className={`${printLineCls} flex-1`}>{formData.name}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-1/2 pl-8">
                <div className="flex items-end gap-2">
                  <span>අංකය</span>
                  <span className={`${printLineCls} flex-1`}>{formData.formNo}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span>දිනය</span>
                  <span className={`${printLineCls} flex-1 text-center`}>{formData.date}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span>ද්‍රව්‍ය</span>
                  <span className={`${printLineCls} flex-1`}>{formData.material}</span>
                </div>
              </div>
            </div>

            <table className="w-full border-collapse border-2 border-black text-sm table-fixed mb-8">
              <thead>
                <tr>
                  <th className="border border-black font-bold p-2 align-middle text-center w-20" rowSpan={2}>ශ්‍රේණිය</th>
                  <th className="border border-black font-bold p-2 text-center" colSpan={2}>ප්‍රමාණය</th>
                  <th className="border border-black font-bold p-2 align-middle text-center w-24" rowSpan={2}>බැගින්</th>
                  <th className="border border-black font-bold p-2 text-center" colSpan={2}>වටිනාකම</th>
                  <th className="border border-black font-bold p-2 text-center" colSpan={2}>අත්තිකාරම්</th>
                </tr>
                <tr>
                  <th className="border border-black font-bold p-1 text-center w-16">බු.</th>
                  <th className="border border-black font-bold p-1 text-center w-16">සේ.</th>
                  <th className="border border-black font-bold p-1 text-center w-20">රු.</th>
                  <th className="border border-black font-bold p-1 text-center w-12">ශ.</th>
                  <th className="border border-black font-bold p-1 text-center w-20">රු.</th>
                  <th className="border border-black font-bold p-1 text-center w-12">ශ.</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="h-10">
                    <td className="border border-black text-center font-semibold">{row.grade}</td>
                    <td className="border border-black text-center px-1">{row.qtyBu}</td>
                    <td className="border border-black text-center px-1">{row.qtySe}</td>
                    <td className="border border-black text-right px-2">{row.rate}</td>
                    <td className="border border-black text-right px-2">{row.valueRs}</td>
                    <td className="border border-black text-center px-1">{row.valueCts ? row.valueCts.padStart(2,'0') : ''}</td>
                    <td className="border border-black text-right px-2">{row.advanceRs}</td>
                    <td className="border border-black text-center px-1">{row.advanceCts ? row.advanceCts.padStart(2,'0') : ''}</td>
                  </tr>
                ))}
                <tr className="h-10 font-bold">
                  <td className="border border-black text-center">එකතුව</td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                  <td className="border border-black"></td>
                </tr>
              </tbody>
            </table>

            <div className="flex flex-col gap-5 text-sm font-semibold mb-6">
              <div className="flex justify-end pr-12">
                <span>ඉහත සඳහන් ද්‍රව්‍ය භාර ගතිමි/භාරදී මුදලින්</span>
              </div>
              <div className="flex items-end gap-2">
                <span>රුපියල්</span>
                <span className={`${printLineCls} flex-1 text-center`}>{formData.rupeesWords}</span>
                <span>ශත</span>
                <span className={`${printLineCls} w-32 text-center`}>{formData.centsWords}</span>
              </div>
              <div>අවසාන ගෙවීම/අත්තිකාරම් වශයෙන් භාර ගතිමි.</div>
              <div className="flex items-end gap-2 w-2/3">
                <span>සාමාජිකයාගේ අත්සන</span>
                <span className={`${printLineCls} flex-1`}></span>
              </div>
              <div>ද්‍රව්‍ය භාරගත් බවට/හා මුදල් ගෙවූ බවට</div>
              <div className="flex items-end gap-2 pl-8 w-2/3">
                <span>කළමනාකරු</span>
                <span className={`${printLineCls} flex-1`}></span>
              </div>
              <div className="flex items-end gap-2 w-2/3">
                <span>ගබඩාවේ නම</span>
                <span className={`${printLineCls} flex-1 text-center`}>{formData.warehouseName}</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
