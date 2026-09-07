import React, { useState } from 'react';
import { Save, Printer } from 'lucide-react';

const initialRows = [
  { id: 'r1', desc: 'උපරිම ........................', type: 'input' },
  { id: 'r2', desc: 'අවම ........................', type: 'input' },
  { id: 'r3', desc: 'සමිතිගෙන් ලැබුණ බඩුවල වටිනාකම', type: 'input' },
  { id: 'r4', desc: 'සුළු මුදලින් ගත් බඩුවල වටිනාකම', type: 'input' },
  { id: 'r5', desc: 'එකතුව', type: 'subtotal' },
  { id: 'r6', desc: 'මිල වැඩිවීම', type: 'input' },
  { id: 'r7', desc: 'මාරු කිරීම', type: 'input' },
  { id: 'r8', desc: 'එකතුව', type: 'subtotal' },
  { id: 'r9', desc: 'ආරම්භක වටිනාකම', type: 'input' },
  { id: 'r10', desc: 'මුළු එකතුව', type: 'total' },
  { id: 'r11', desc: 'අඩු කිරීම්', type: 'header' },
  { id: 'r12', desc: 'වෙළඳාම් අත්පිට', type: 'input', indent: true },
  { id: 'r13', desc: 'වෙළඳාම් ණයට', type: 'input', indent: true },
  { id: 'r14', desc: 'සිල්ලර ගබඩා බඩු දීම', type: 'input', indent: true },
  { id: 'r15', desc: 'මාරු කිරීම (තොග)', type: 'input', indent: true },
  { id: 'r16', desc: 'එකතුව', type: 'subtotal' },
  { id: 'r17', desc: 'ආපසු යැවීම', type: 'input', indent: true },
  { id: 'r18', desc: 'මිල අඩුවීම', type: 'input', indent: true },
  { id: 'r19', desc: 'නරක්වුන බඩු', type: 'input', indent: true },
  { id: 'r20', desc: 'වෙනත්', type: 'input', indent: true },
  { id: 'r21', desc: 'එකතුව', type: 'subtotal' },
  { id: 'r22', desc: 'අවසානයට ඉතිරි බඩු (විකුණුම් මිලට)', type: 'input' },
  { id: 'r23', desc: 'මුළු එකතුව', type: 'total' }
];

export default function Form15() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    warehouseName: 'මධ්‍යම තොග',
    certDate: '2023-11-20',
    noteDate: '2023-11-20',
    cashInHand: { rs: '15000', cts: '00' },
    received1: { rs: '5000', cts: '50' },
    received2: { rs: '2500', cts: '00' },
    goodsBought: { rs: '8000', cts: '00' },
    otherPayments: { rs: '1500', cts: '00' },
    remainingCash: { rs: '13000', cts: '50' },
    rows: initialRows.map((r, i) => ({
      ...r,
      refNo: i === 1 ? '102' : i === 2 ? '103' : '',
      qty: i === 1 ? '50' : i === 2 ? '25' : '',
      prevDayRs: i === 0 ? '12000' : '', 
      prevDayCts: i === 0 ? '00' : '',
      todayRs: i === 1 ? '5000' : '', 
      todayCts: i === 1 ? '00' : '',
      totalRs: i === 4 ? '17000' : '', 
      totalCts: i === 4 ? '00' : ''
    }))
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedField = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: { ...prev[parent], [field]: value }
    }));
  };

  const updateRow = (index, field, value) => {
    const newRows = [...formData.rows];
    newRows[index][field] = value;
    setFormData(prev => ({ ...prev, rows: newRows }));
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
        <h1 className="text-2xl font-bold text-slate-800">Form 15</h1>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">සිල්ලර/තොග ගබඩාව</label>
                <input type="text" value={formData.warehouseName} onChange={e => updateField('warehouseName', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-slate-600 uppercase">සුළු මුදල් සහතික දිනය</label>
                <input type="date" value={formData.certDate} onChange={e => updateField('certDate', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            <div className="flex flex-col gap-1 justify-end">
              <label className="text-xs font-semibold text-slate-600 uppercase">බඩු සටහන් දිනය</label>
              <input type="date" value={formData.noteDate} onChange={e => updateField('noteDate', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 p-4 bg-slate-50 rounded-lg border border-slate-200">
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-slate-700 border-b pb-1">ලැබීම් (Receipts)</h3>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label className="col-span-2 text-sm text-slate-600">අත ඉතිරිය</label>
                <input type="number" placeholder="රු." value={formData.cashInHand.rs} onChange={e => updateNestedField('cashInHand', 'rs', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" />
                <input type="number" placeholder="ශ." value={formData.cashInHand.cts} onChange={e => updateNestedField('cashInHand', 'cts', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label className="col-span-2 text-sm text-slate-600">ලැබුණා 1</label>
                <input type="number" placeholder="රු." value={formData.received1.rs} onChange={e => updateNestedField('received1', 'rs', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" />
                <input type="number" placeholder="ශ." value={formData.received1.cts} onChange={e => updateNestedField('received1', 'cts', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label className="col-span-2 text-sm text-slate-600">ලැබුණා 2</label>
                <input type="number" placeholder="රු." value={formData.received2.rs} onChange={e => updateNestedField('received2', 'rs', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" />
                <input type="number" placeholder="ශ." value={formData.received2.cts} onChange={e => updateNestedField('received2', 'cts', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-slate-700 border-b pb-1">ගෙවීම් (Payments)</h3>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label className="col-span-2 text-sm text-slate-600">බඩු ගැනීම</label>
                <input type="number" placeholder="රු." value={formData.goodsBought.rs} onChange={e => updateNestedField('goodsBought', 'rs', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" />
                <input type="number" placeholder="ශ." value={formData.goodsBought.cts} onChange={e => updateNestedField('goodsBought', 'cts', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label className="col-span-2 text-sm text-slate-600">වෙනත් ගෙවීම්</label>
                <input type="number" placeholder="රු." value={formData.otherPayments.rs} onChange={e => updateNestedField('otherPayments', 'rs', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" />
                <input type="number" placeholder="ශ." value={formData.otherPayments.cts} onChange={e => updateNestedField('otherPayments', 'cts', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
              </div>
              <div className="grid grid-cols-4 gap-2 items-center">
                <label className="col-span-2 text-sm text-slate-600 font-bold">අත ඉතිරි</label>
                <input type="number" placeholder="රු." value={formData.remainingCash.rs} onChange={e => updateNestedField('remainingCash', 'rs', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm font-bold focus:outline-none focus:border-blue-500 text-right" />
                <input type="number" placeholder="ශ." value={formData.remainingCash.cts} onChange={e => updateNestedField('remainingCash', 'cts', e.target.value)} className="border border-slate-300 rounded px-2 py-1 text-sm font-bold focus:outline-none focus:border-blue-500 text-center" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="p-2 text-left font-medium text-slate-600 w-1/3" rowSpan={2}>වෙළඳාම් බඩු සීමාව</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24" rowSpan={2}>අදාල බඩු<br/>ගත් අංකය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24" rowSpan={2}>ඉතිරි සහල්<br/>ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>පෙර දිනට</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>දිනට</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>අදට මුළු එකතුව</th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20">රු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-12">ශ.</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20">රු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-12">ශ.</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20">රු.</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-12">ශ.</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={row.id} className={`border-b border-slate-100 ${row.type === 'header' ? 'bg-slate-100 font-semibold' : row.type === 'total' ? 'bg-slate-50 font-bold' : row.type === 'subtotal' ? 'font-semibold' : 'hover:bg-slate-50'}`}>
                    <td className={`p-1.5 text-slate-700 ${row.type === 'subtotal' || row.type === 'total' ? 'text-right pr-4' : ''} ${row.indent ? 'pl-6' : 'pl-2'}`}>
                      {row.desc}
                    </td>
                    
                    {row.type === 'header' ? (
                      <td colSpan={8} className="border-l border-slate-200"></td>
                    ) : (
                      <>
                        <td className="p-1 border-l border-slate-200">
                          {row.type !== 'subtotal' && row.type !== 'total' && (
                            <input type="text" value={row.refNo} onChange={e => updateRow(i, 'refNo', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
                          )}
                        </td>
                        <td className="p-1 border-l border-slate-200">
                          {row.type !== 'subtotal' && row.type !== 'total' && (
                            <input type="text" value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
                          )}
                        </td>
                        <td className="p-1 border-l border-slate-200"><input type="number" value={row.prevDayRs} onChange={e => updateRow(i, 'prevDayRs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                        <td className="p-1"><input type="number" value={row.prevDayCts} onChange={e => updateRow(i, 'prevDayCts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                        <td className="p-1 border-l border-slate-200"><input type="number" value={row.todayRs} onChange={e => updateRow(i, 'todayRs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                        <td className="p-1"><input type="number" value={row.todayCts} onChange={e => updateRow(i, 'todayCts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                        <td className="p-1 border-l border-slate-200"><input type="number" value={row.totalRs} onChange={e => updateRow(i, 'totalRs', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                        <td className="p-1"><input type="number" value={row.totalCts} onChange={e => updateRow(i, 'totalCts', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden mx-auto print:mx-0">
          <div className="relative p-12 print:p-8 font-serif text-black" style={{ minHeight: '297mm' }}>
            
            <div className="flex justify-end mb-4 font-bold text-sm">
              Form 15
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <div className="flex items-end gap-2 text-sm font-semibold">
                <span className={`${printLineCls} flex-1`}>{formData.warehouseName}</span>
                <span>සිල්ලර/තොග ගබඩාව</span>
              </div>
              <div className="flex items-end gap-2 text-sm font-semibold w-2/3 mx-auto">
                <span className={`${printLineCls} flex-1 text-center`}>{formData.certDate}</span>
                <span>දිනට සුළු මුදල් සහතිකය</span>
              </div>
            </div>

            <div className="flex justify-between mb-8 text-sm font-semibold px-4">
              <div className="flex flex-col gap-2 w-5/12">
                <div className="flex justify-end gap-6 mb-1 text-xs">
                  <span className="w-20 text-center">රු.</span>
                  <span className="w-12 text-center">ශ.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24">අත ඉතිරිය</span>
                  <div className="flex flex-1 gap-2 border-b border-dotted border-black pb-1">
                    <span className="w-20 text-right">{formData.cashInHand.rs}</span>
                    <span className="w-12 text-center">{formData.cashInHand.cts}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24">ලැබුණා</span>
                  <div className="flex flex-1 gap-2 border-b border-dotted border-black pb-1">
                    <span className="w-20 text-right">{formData.received1.rs}</span>
                    <span className="w-12 text-center">{formData.received1.cts}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24"></span>
                  <div className="flex flex-1 gap-2 border-b border-dotted border-black pb-1">
                    <span className="w-20 text-right">{formData.received2.rs}</span>
                    <span className="w-12 text-center">{formData.received2.cts}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-24"></span>
                  <div className="flex flex-1 gap-2 border-y-[3px] border-dotted border-black h-1.5">
                    <span className="w-20"></span>
                    <span className="w-12"></span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 w-5/12">
                <div className="flex justify-end gap-6 mb-1 text-xs">
                  <span className="w-20 text-center">රු.</span>
                  <span className="w-12 text-center">ශ.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24">බඩු ගැනීම</span>
                  <div className="flex flex-1 gap-2 border-b border-dotted border-black pb-1">
                    <span className="w-20 text-right">{formData.goodsBought.rs}</span>
                    <span className="w-12 text-center">{formData.goodsBought.cts}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24">වෙනත් ගෙවීම්</span>
                  <div className="flex flex-1 gap-2 border-b border-dotted border-black pb-1">
                    <span className="w-20 text-right">{formData.otherPayments.rs}</span>
                    <span className="w-12 text-center">{formData.otherPayments.cts}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-24 font-bold">අත ඉතිරි</span>
                  <div className="flex flex-1 gap-2 border-b border-dotted border-black pb-1 font-bold">
                    <span className="w-20 text-right">{formData.remainingCash.rs}</span>
                    <span className="w-12 text-center">{formData.remainingCash.cts}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-24"></span>
                  <div className="flex flex-1 gap-2 border-y-[3px] border-dotted border-black h-1.5">
                    <span className="w-20"></span>
                    <span className="w-12"></span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-end justify-center gap-2 text-sm font-semibold mb-2">
              <span className={`${printLineCls} flex-1 text-center`}>{formData.noteDate}</span>
              <span>දිනට ඉතිරි බඩු සටහන (විකුණුම් මිලට)</span>
            </div>

            <table className="w-full border-collapse border border-black text-[11px] table-fixed mb-6">
              <thead>
                <tr>
                  <th className="border border-black font-semibold p-2 align-middle text-left w-56" rowSpan={2}>
                    <div className="border-b border-black pb-1 w-24">වෙළඳාම් බඩු සීමාව</div>
                  </th>
                  <th className="border border-black font-semibold p-1 align-middle text-center w-14" rowSpan={2}>අදාල බඩු<br/>ගත් අංකය</th>
                  <th className="border border-black font-semibold p-1 align-middle text-center w-14" rowSpan={2}>ඉතිරි සහල්<br/>ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={2}>පෙර දිනට</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={2}>දිනට</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={2}>අදට මුළු එකතුව</th>
                </tr>
                <tr>
                  <th className="border border-black font-semibold p-1 text-center w-12">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-6">ශ.</th>
                  <th className="border border-black font-semibold p-1 text-center w-12">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-6">ශ.</th>
                  <th className="border border-black font-semibold p-1 text-center w-12">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-6">ශ.</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => {
                  const isHeader = row.type === 'header';
                  const isTotal = row.type === 'total';
                  const isSubtotal = row.type === 'subtotal';
                  const hasValues = !isHeader;
                  
                  return (
                    <tr key={row.id} className={`h-6 ${isTotal || isSubtotal || isHeader ? 'font-bold' : ''}`}>
                      <td className={`border border-black px-2 ${row.indent ? 'pl-6' : ''} ${isTotal || isSubtotal ? 'text-right pr-4' : ''}`}>
                        {row.desc}
                      </td>
                      {hasValues ? (
                        <>
                          <td className="border border-black text-center px-1">{(row.type !== 'total' && row.type !== 'subtotal') ? row.refNo : ''}</td>
                          <td className="border border-black text-center px-1">{(row.type !== 'total' && row.type !== 'subtotal') ? row.qty : ''}</td>
                          <td className="border border-black text-right px-1">{row.prevDayRs}</td>
                          <td className="border border-black text-center px-1">{row.prevDayCts ? row.prevDayCts.padStart(2,'0') : ''}</td>
                          <td className="border border-black text-right px-1">{row.todayRs}</td>
                          <td className="border border-black text-center px-1">{row.todayCts ? row.todayCts.padStart(2,'0') : ''}</td>
                          <td className="border border-black text-right px-1">{row.totalRs}</td>
                          <td className="border border-black text-center px-1">{row.totalCts ? row.totalCts.padStart(2,'0') : ''}</td>
                        </>
                      ) : (
                        <td colSpan={8} className="border border-black bg-slate-100/50"></td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="flex flex-col items-center gap-8 text-xs font-semibold">
              <div>මා විසින් ඉදිරිපත් කරන ඉහත සඳහන් ඉතිරි බඩු සටහන නිවැරදි බවත් ඉතිරි බඩු මා භාරයේ තිබෙන බවත් සහතික කරමි.</div>
              
              <div className="flex justify-end w-full pr-12">
                <div className="flex flex-col items-center w-48">
                  <div className={`${printLineCls} w-full`}></div>
                  <div className="mt-1">ගබඩා භාරකරුගේ අත්සන</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
