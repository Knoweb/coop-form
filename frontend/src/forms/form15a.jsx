import React, { useState } from 'react';
import { Save, Printer } from 'lucide-react';

export default function Form15A() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Helper to create empty group
  const createEmptyGroup = () => ({ refNo: '', qty: '', value: '', advance: '' });
  
  // Helper to create empty row for table 1
  const createTable1Row = (isTotal = false, totalLabel = '') => ({
    isTotal,
    totalLabel,
    g1: createEmptyGroup(),
    g2: createEmptyGroup(),
    g3: createEmptyGroup(),
  });

  const [formData, setFormData] = useState({
    warehouseName: 'මධ්‍යම ගබඩාව',
    date: '2023-11-20',
    certDate: '2023-11-20',
    table1Rows: [
      { isTotal: false, totalLabel: '', g1: { refNo: '101', qty: '50', value: '2500', advance: '500' }, g2: { refNo: '102', qty: '30', value: '1500', advance: '200' }, g3: { refNo: '', qty: '', value: '', advance: '' } },
      { isTotal: false, totalLabel: '', g1: { refNo: '104', qty: '20', value: '1000', advance: '100' }, g2: { refNo: '', qty: '', value: '', advance: '' }, g3: { refNo: '', qty: '', value: '', advance: '' } },
      createTable1Row(),
      createTable1Row(),
      createTable1Row(),
      { isTotal: true, totalLabel: 'දිනට', g1: { refNo: '', qty: '70', value: '3500', advance: '600' }, g2: { refNo: '', qty: '30', value: '1500', advance: '200' }, g3: { refNo: '', qty: '', value: '', advance: '' } },
      { isTotal: true, totalLabel: 'පෙර දිනට', g1: { refNo: '', qty: '100', value: '5000', advance: '1000' }, g2: { refNo: '', qty: '50', value: '2500', advance: '500' }, g3: { refNo: '', qty: '', value: '', advance: '' } },
      { isTotal: true, totalLabel: 'එකතුව', g1: { refNo: '', qty: '170', value: '8500', advance: '1600' }, g2: { refNo: '', qty: '80', value: '4000', advance: '700' }, g3: { refNo: '', qty: '', value: '', advance: '' } },
    ],
    table2Rows: [
      { id: 't2-1', label: 'ආරම්භක ඉතිරි', refNo: '', prevQty: '150', prevVal: '7500', todayQty: '20', todayVal: '1000', totalQty: '170', totalVal: '8500' },
      { id: 't2-2', label: 'භාරගත්තා', refNo: 'A12', prevQty: '50', prevVal: '2500', todayQty: '10', todayVal: '500', totalQty: '60', totalVal: '3000' },
      { id: 't2-3', label: 'රජයේ ගබඩාවට භාරදුන්නා', refNo: 'G45', prevQty: '100', prevVal: '5000', todayQty: '0', todayVal: '0', totalQty: '100', totalVal: '5000' },
      { id: 't2-4', label: 'දින අවසානයට ඉතිරි', refNo: '', prevQty: '100', prevVal: '5000', todayQty: '30', todayVal: '1500', totalQty: '130', totalVal: '6500' },
    ],
    managerDate: '2023-11-20'
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateTable1 = (rowIndex, group, field, value) => {
    const newRows = [...formData.table1Rows];
    newRows[rowIndex][group][field] = value;
    setFormData(prev => ({ ...prev, table1Rows: newRows }));
  };

  const updateTable2 = (rowIndex, field, value) => {
    const newRows = [...formData.table2Rows];
    newRows[rowIndex][field] = value;
    setFormData(prev => ({ ...prev, table2Rows: newRows }));
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
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-slate-800">Form 15 A: ගබඩා කුවිතාන්සි සසඳුම් පත</h1>
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
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">ගබඩාවේ නම</label>
              <input type="text" value={formData.warehouseName} onChange={e => updateField('warehouseName', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">දිනය</label>
              <input type="date" value={formData.date} onChange={e => updateField('date', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">කුවිතාන්සි සසඳුම</h3>
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  {['g1', 'g2', 'g3'].map((g, i) => (
                    <React.Fragment key={g}>
                      <th className={`p-2 text-center font-medium text-slate-600 ${i > 0 ? 'border-l-2 border-slate-300' : 'border-l border-slate-200'}`}>ග/කු<br/>අංකෙ<br/>ඉ/ගෙ</th>
                      <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200">ප්‍රමාණය</th>
                      <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200">වටිනාකම</th>
                      <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200">අත්: කාරම්</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.table1Rows.map((row, i) => (
                  <tr key={i} className={`border-b border-slate-100 ${row.isTotal ? 'bg-slate-50 font-medium' : 'hover:bg-slate-50'}`}>
                    {['g1', 'g2', 'g3'].map((g, gi) => (
                      <React.Fragment key={`${i}-${g}`}>
                        <td className={`p-1 ${gi > 0 ? 'border-l-2 border-slate-300' : 'border-l border-slate-200'}`}>
                          {gi === 0 && row.isTotal ? (
                            <div className="px-2 text-slate-700">{row.totalLabel}</div>
                          ) : (
                            <input type="text" value={row[g].refNo} onChange={e => updateTable1(i, g, 'refNo', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" />
                          )}
                        </td>
                        <td className="p-1 border-l border-slate-200"><input type="number" value={row[g].qty} onChange={e => updateTable1(i, g, 'qty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                        <td className="p-1 border-l border-slate-200"><input type="number" value={row[g].value} onChange={e => updateTable1(i, g, 'value', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                        <td className="p-1 border-l border-slate-200"><input type="number" value={row[g].advance} onChange={e => updateTable1(i, g, 'advance', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-1 w-1/2 mb-6">
            <label className="text-xs font-semibold text-slate-600 uppercase">සහතික දිනය</label>
            <input type="date" value={formData.certDate} onChange={e => updateField('certDate', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>

          <div className="overflow-x-auto mb-8">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">ඉතිරි වී සඳහා සහතිකය</h3>
            <table className="w-full text-sm border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="p-2 text-left font-medium text-slate-600 w-1/4" rowSpan={2}>විස්තර</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-20" rowSpan={2}>කු:අංකය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>පෙර දිනට</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>දිනට</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200" colSpan={2}>දිනට මුළු එකතුව</th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">වටිනාකම</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">වටිනාකම</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24">වටිනාකම</th>
                </tr>
              </thead>
              <tbody>
                {formData.table2Rows.map((row, i) => (
                  <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-2 text-slate-700 font-medium">{row.label}</td>
                    <td className="p-1 border-l border-slate-200"><input type="text" value={row.refNo} onChange={e => updateTable2(i, 'refNo', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.prevQty} onChange={e => updateTable2(i, 'prevQty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.prevVal} onChange={e => updateTable2(i, 'prevVal', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.todayQty} onChange={e => updateTable2(i, 'todayQty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.todayVal} onChange={e => updateTable2(i, 'todayVal', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.totalQty} onChange={e => updateTable2(i, 'totalQty', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-center" /></td>
                    <td className="p-1 border-l border-slate-200"><input type="number" value={row.totalVal} onChange={e => updateTable2(i, 'totalVal', e.target.value)} className="w-full border border-slate-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="flex flex-col gap-1 w-1/3">
            <label className="text-xs font-semibold text-slate-600 uppercase">කළමනාකරු අත්සන් කරන දිනය</label>
            <input type="date" value={formData.managerDate} onChange={e => updateField('managerDate', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden mx-auto print:mx-0">
          <div className="relative p-12 print:p-8 font-serif text-black" style={{ minHeight: '297mm' }}>
            
            <div className="flex justify-end font-bold text-sm mb-2">
              Form 15 A
            </div>

            <div className="text-center mb-6">
              <h2 className="font-bold text-lg">ගබඩා කුවිතාන්සි සසඳුම් පත</h2>
            </div>

            <div className="flex justify-between items-end mb-4 text-sm font-semibold">
              <div className="flex items-end gap-2 w-1/2 pr-4">
                <span className="whitespace-nowrap">ගබඩාවේ නම</span>
                <span className={`${printLineCls} flex-1 text-center`}>{formData.warehouseName}</span>
              </div>
              <div className="flex items-end gap-2 w-1/3 pl-4">
                <span className="whitespace-nowrap">දිනය</span>
                <span className={`${printLineCls} flex-1 text-center`}>{formData.date}</span>
              </div>
            </div>

            <table className="w-full border-collapse border border-black text-[11px] table-fixed mb-8">
              <thead>
                <tr>
                  {['g1', 'g2', 'g3'].map((g, i) => (
                    <React.Fragment key={g}>
                      <th className={`border border-black font-semibold p-1 align-middle text-center ${i > 0 ? 'border-l-2' : ''} w-12`}>ග/කු<br/>අංකෙ<br/>ඉ/ගෙ</th>
                      <th className="border border-black font-semibold p-1 align-middle text-center w-12">ප්‍රමා-<br/>ණය</th>
                      <th className="border border-black font-semibold p-1 align-middle text-center w-16">වටිනාකම</th>
                      <th className="border border-black font-semibold p-1 align-middle text-center w-16">අත්: කාරම්</th>
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.table1Rows.map((row, i) => (
                  <tr key={i} className={`h-7 ${row.isTotal ? 'font-bold' : ''}`}>
                    {['g1', 'g2', 'g3'].map((g, gi) => (
                      <React.Fragment key={`${i}-${g}`}>
                        <td className={`border border-black text-center ${gi > 0 ? 'border-l-2' : ''} ${gi === 0 && row.isTotal ? 'text-left px-1' : 'px-1'}`}>
                          {gi === 0 && row.isTotal ? row.totalLabel : row[g].refNo}
                        </td>
                        <td className="border border-black text-center px-1">{row[g].qty}</td>
                        <td className="border border-black text-right px-1">{row[g].value}</td>
                        <td className="border border-black text-right px-1">{row[g].advance}</td>
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-end justify-center gap-2 text-sm font-semibold mb-6">
              <span className={`${printLineCls} w-64 text-center`}>{formData.certDate}</span>
              <span>දිනට ඉතිරි වී සඳහා සහතිකය</span>
            </div>

            <table className="w-full border-collapse border border-black text-[11px] table-fixed mb-8">
              <thead>
                <tr>
                  <th className="border border-black font-semibold p-1 align-middle text-left w-48" rowSpan={2}></th>
                  <th className="border border-black font-semibold p-1 align-middle text-center w-16" rowSpan={2}>කු:<br/>අංකය</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={2}>පෙර දිනට</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={2}>දිනට</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={2}>දිනට මුළු එකතුව</th>
                </tr>
                <tr>
                  <th className="border border-black font-semibold p-1 text-center w-16">ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">වටිනාකම</th>
                  <th className="border border-black font-semibold p-1 text-center w-16">ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">වටිනාකම</th>
                  <th className="border border-black font-semibold p-1 text-center w-16">ප්‍රමාණය</th>
                  <th className="border border-black font-semibold p-1 text-center w-20">වටිනාකම</th>
                </tr>
              </thead>
              <tbody>
                {formData.table2Rows.map((row, i) => (
                  <tr key={row.id} className="h-8">
                    <td className="border border-black px-2 font-semibold">{row.label}</td>
                    <td className="border border-black text-center px-1">{row.refNo}</td>
                    <td className="border border-black text-center px-1">{row.prevQty}</td>
                    <td className="border border-black text-right px-1">{row.prevVal}</td>
                    <td className="border border-black text-center px-1">{row.todayQty}</td>
                    <td className="border border-black text-right px-1">{row.todayVal}</td>
                    <td className="border border-black text-center px-1">{row.totalQty}</td>
                    <td className="border border-black text-right px-1">{row.totalVal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-6 text-[11px] font-semibold">
              <div className="text-center">ඉහත සඳහන් ඉතිරි වී ප්‍රමාණය මා භාරයේ තිබෙන බවත් ඉහත සඳහන් අනිකුත් අගයන් සටහන් නිවැරදි බවත් සහතික කරමි.</div>
              
              <div className="flex justify-between items-end mt-4 mb-10">
                <div className="flex items-end gap-2 w-1/3 text-sm">
                  <span>දිනය</span>
                  <span className={`${printLineCls} flex-1 text-center`}>{formData.managerDate}</span>
                </div>
                <div className="flex items-end gap-2 w-1/3 text-sm">
                  <span>කළමනාකරු</span>
                  <span className={`${printLineCls} flex-1`}></span>
                </div>
              </div>
            </div>
            
            <div className="border-t-2 border-dashed border-black opacity-60 w-full mt-4"></div>

          </div>
        </div>

      </div>
    </div>
  );
}
