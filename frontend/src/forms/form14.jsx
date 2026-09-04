import React, { useState } from 'react';
import { Save, Printer, Plus, Trash2 } from 'lucide-react';

export default function Form14() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: 'නිමල් ට්‍රේඩර්ස්',
    date: '2023-10-25',
    rows: Array.from({ length: 10 }, (_, i) => {
      if(i === 0) return { no: '1', itemNo: 'I001', description: 'සීනි 50kg', qty: '2', rateRs: '14000', rateCts: '00', amountRs: '28000', amountCts: '00', retailPriceRs: '300', retailPriceCts: '00' };
      if(i === 1) return { no: '2', itemNo: 'I045', description: 'පරිප්පු 25kg', qty: '4', rateRs: '7500', rateCts: '00', amountRs: '30000', amountCts: '00', retailPriceRs: '320', retailPriceCts: '00' };
      if(i === 2) return { no: '3', itemNo: 'I012', description: 'සමන් ටින්', qty: '50', rateRs: '450', rateCts: '00', amountRs: '22500', amountCts: '00', retailPriceRs: '500', retailPriceCts: '00' };
      return { no: '', itemNo: '', description: '', qty: '', rateRs: '', rateCts: '', amountRs: '', amountCts: '', retailPriceRs: '', retailPriceCts: '' };
    }),
    preparedBy: 'කමල්',
    checkedBy: 'සුනිල්',
    cashReceivedBy: 'නිමල්',
    goodsReceivedByTitle: 'ගබඩා පාලක'
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
        { no: '', itemNo: '', description: '', qty: '', rateRs: '', rateCts: '', amountRs: '', amountCts: '', retailPriceRs: '', retailPriceCts: '' }
      ]
    });
  };

  const removeRow = (index) => {
    const newRows = formData.rows.filter((_, i) => i !== index);
    setFormData({ ...formData, rows: newRows });
  };

  const calculateTotals = () => {
    let totalRs = 0;
    let totalCts = 0;

    formData.rows.forEach(row => {
      const rs = Number(row.amountRs) || 0;
      const cts = Number(row.amountCts) || 0;
      totalRs += rs;
      totalCts += cts;
    });

    totalRs += Math.floor(totalCts / 100);
    totalCts = totalCts % 100;

    return {
      totalRs: totalRs > 0 ? totalRs : '',
      totalCts: totalRs > 0 || totalCts > 0 ? totalCts.toString().padStart(2, '0') : ''
    };
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const totals = calculateTotals();
  const printLineCls = "border-b border-dotted border-black min-h-[1.2rem] inline-block";

  return (
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-slate-800">Form 14: මුදලට/ණයට වෙළදාම් පත (තොග)</h1>
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
              <label className="text-xs font-semibold text-slate-600 uppercase">නම (Name)</label>
              <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">දිනය (Date)</label>
              <input type="date" value={formData.date} onChange={e => updateField('date', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="mb-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="p-2 text-left font-medium text-slate-600 w-12">අනු අංකය</th>
                  <th className="p-2 text-left font-medium text-slate-600 w-24">භාණ්ඩ අංකය</th>
                  <th className="p-2 text-left font-medium text-slate-600 min-w-[200px]">විස්තරය</th>
                  <th className="p-2 text-left font-medium text-slate-600 w-20">ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-28">බැගින්<br/><span className="text-xs">රු. | ශත</span></th>
                  <th className="p-2 text-center font-medium text-slate-600 w-28">මුදල<br/><span className="text-xs">රු. | ශත</span></th>
                  <th className="p-2 text-center font-medium text-slate-600 w-28">සිල්ලරට එකත් විකුණුම් මිල<br/><span className="text-xs">රු. | ශත</span></th>
                  <th className="p-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-1"><input type="text" value={row.no} onChange={e => updateRow(i, 'no', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1"><input type="text" value={row.itemNo} onChange={e => updateRow(i, 'itemNo', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1"><input type="text" value={row.description} onChange={e => updateRow(i, 'description', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500" /></td>
                    <td className="p-1"><input type="text" value={row.qty} onChange={e => updateRow(i, 'qty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1">
                      <div className="flex gap-1">
                        <input type="number" value={row.rateRs} onChange={e => updateRow(i, 'rateRs', e.target.value)} className="w-2/3 border border-slate-300 rounded px-1 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" placeholder="රු" />
                        <input type="number" value={row.rateCts} onChange={e => updateRow(i, 'rateCts', e.target.value)} className="w-1/3 border border-slate-300 rounded px-1 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" placeholder="ශත" />
                      </div>
                    </td>
                    <td className="p-1">
                      <div className="flex gap-1">
                        <input type="number" value={row.amountRs} onChange={e => updateRow(i, 'amountRs', e.target.value)} className="w-2/3 border border-slate-300 rounded px-1 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" placeholder="රු" />
                        <input type="number" value={row.amountCts} onChange={e => updateRow(i, 'amountCts', e.target.value)} className="w-1/3 border border-slate-300 rounded px-1 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" placeholder="ශත" />
                      </div>
                    </td>
                    <td className="p-1">
                      <div className="flex gap-1">
                        <input type="number" value={row.retailPriceRs} onChange={e => updateRow(i, 'retailPriceRs', e.target.value)} className="w-2/3 border border-slate-300 rounded px-1 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" placeholder="රු" />
                        <input type="number" value={row.retailPriceCts} onChange={e => updateRow(i, 'retailPriceCts', e.target.value)} className="w-1/3 border border-slate-300 rounded px-1 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" placeholder="ශත" />
                      </div>
                    </td>
                    <td className="p-1 text-center">
                      <button onClick={() => removeRow(i)} className="p-1 text-red-500 hover:bg-red-50 rounded" title="Remove row">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 flex justify-between items-center">
              <button onClick={addRow} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
                <Plus className="w-4 h-4" /> Add Row
              </button>
              <div className="text-sm">
                <span className="font-semibold text-slate-700 mr-2">එකතුව (Total): </span>
                <span className="font-bold text-blue-700">රු. {totals.totalRs || '0'}.{totals.totalCts || '00'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">පිළියෙල කළේ (Prepared by)</label>
              <input type="text" value={formData.preparedBy} onChange={e => updateField('preparedBy', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">බඩු භාරගත් තනතුර (Goods received by Title)</label>
              <input type="text" value={formData.goodsReceivedByTitle} onChange={e => updateField('goodsReceivedByTitle', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">පරීක්ෂා කළේ (Checked by)</label>
              <input type="text" value={formData.checkedBy} onChange={e => updateField('checkedBy', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="col-start-1 flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">මුදල් භාරගත් අය (Cash received by)</label>
              <input type="text" value={formData.cashReceivedBy} onChange={e => updateField('cashReceivedBy', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden">
          <div className="relative p-8 print:p-4 font-serif text-black" style={{ minHeight: '297mm' }}>
            
            <div className="flex justify-between items-start mb-6">
              <div className="text-center flex-1 ml-16">
                <h2 className="font-bold text-lg">මුදලට/ණයට වෙළදාම් පත (තොග)</h2>
              </div>
              <div className="font-bold text-sm">Form 14</div>
            </div>

            <div className="flex justify-between mb-4 text-sm font-semibold">
              <div className="flex gap-2">
                <span>නම</span>
                <span className={`${printLineCls} w-80`}>{formData.name}</span>
              </div>
              <div className="flex gap-2">
                <span>දිනය</span>
                <span className={`${printLineCls} w-40 text-center`}>{formData.date}</span>
              </div>
            </div>

            <table className="w-full border-collapse border border-black text-sm mb-6 table-fixed">
              <thead>
                <tr>
                  <th className="border border-black font-semibold p-1 w-10 align-middle text-center" rowSpan={2}>අනු<br/>අංකය</th>
                  <th className="border border-black font-semibold p-1 w-14 align-middle text-center" rowSpan={2}>භාණ්ඩ<br/>අංකය</th>
                  <th className="border border-black font-semibold p-1 align-middle text-center" rowSpan={2}>විස්තරය</th>
                  <th className="border border-black font-semibold p-1 w-14 align-middle text-center" rowSpan={2}>ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-1 w-24 text-center" colSpan={2}>බැගින්</th>
                  <th className="border border-black font-semibold p-1 w-28 text-center" colSpan={2}>මුදල</th>
                  <th className="border border-black font-semibold p-1 w-28 text-center" colSpan={2}>සිල්ලරට එකත්<br/>විකුණුම් මිල</th>
                </tr>
                <tr>
                  <th className="border border-black font-semibold p-1 text-center w-16">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-8">ශත</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-8">ශත</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">රු.</th>
                  <th className="border border-black font-semibold p-1 text-center w-8">ශත</th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="h-8">
                    <td className="border border-black border-r text-center px-1 border-dotted">{row.no}</td>
                    <td className="border border-black border-r text-center px-1 border-dotted">{row.itemNo}</td>
                    <td className="border border-black border-r px-2 border-dotted">{row.description}</td>
                    <td className="border border-black border-r text-center px-1 border-dotted">{row.qty}</td>
                    <td className="border border-black border-r text-right px-1 border-dotted">{row.rateRs}</td>
                    <td className="border border-black border-r text-center px-1 border-dotted">{row.rateCts ? row.rateCts.padStart(2,'0') : ''}</td>
                    <td className="border border-black border-r text-right px-1 border-dotted">{row.amountRs}</td>
                    <td className="border border-black border-r text-center px-1 border-dotted">{row.amountCts ? row.amountCts.padStart(2,'0') : ''}</td>
                    <td className="border border-black border-r text-right px-1 border-dotted">{row.retailPriceRs}</td>
                    <td className="border border-black border-r text-center px-1 border-dotted">{row.retailPriceCts ? row.retailPriceCts.padStart(2,'0') : ''}</td>
                  </tr>
                ))}
                <tr className="h-8 font-bold border-t border-black">
                  <td className="border border-black" colSpan={4}></td>
                  <td className="border border-black text-center" colSpan={2}>එකතුව</td>
                  <td className="border border-black text-right px-1">{totals.totalRs}</td>
                  <td className="border border-black text-center px-1">{totals.totalCts}</td>
                  <td className="border border-black" colSpan={2}></td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-between items-end mt-12 text-sm font-semibold">
              <div className="flex flex-col gap-4">
                <div className="flex items-end gap-2">
                  <span>පිළියෙල කළේ</span>
                  <span className={`${printLineCls} w-48`}>{formData.preparedBy}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span>පරීක්ෂා කළේ</span>
                  <span className={`${printLineCls} w-48`}>{formData.checkedBy}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span>මුදල් භාරගත් අය</span>
                  <span className={`${printLineCls} w-48`}>{formData.cashReceivedBy}</span>
                </div>
              </div>
              <div className="flex flex-col items-center gap-6">
                <span className="font-bold">බඩු භාරගත් බවට</span>
                <span className={`${printLineCls} w-48`}></span>
                <span className="text-center relative -top-3">{formData.goodsReceivedByTitle || 'තනතුර'}</span>
              </div>
            </div>

            <div className="text-center text-lg font-bold mt-12">
              16
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
