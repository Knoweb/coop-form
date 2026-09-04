import React, { useState } from 'react';
import { Save, Printer } from 'lucide-react';

export default function Form15B() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // 10 column keys for the gunny bag types
  const bagTypes = ['b112', 'b80', 'seeni', 'piti', 'pari', 'papu', 'miri', 'kada', 'we', 'pada'];
  const bagLabels = [
    { top: '112', bottom: '' },
    { top: '80', bottom: '' },
    { top: 'සී', bottom: 'නි:' },
    { top: 'පි', bottom: 'ටි:' },
    { top: 'ප', bottom: 'රි:' },
    { top: 'ප', bottom: 'පු:' },
    { top: 'මි', bottom: 'රි:' },
    { top: 'ක', bottom: 'ඩ:' },
    { top: 'වෙ', bottom: ':' },
    { top: 'ප', bottom: 'දා:' }
  ];

  const createEmptyBagData = () => {
    const data = {};
    bagTypes.forEach(b => data[b] = '');
    return data;
  };

  const createDummyBagData = (vals) => {
    const data = createEmptyBagData();
    Object.assign(data, vals);
    return data;
  };

  const [formData, setFormData] = useState({
    warehouseType: 'මධ්‍යම',
    serialNo: 'B-402',
    certDate: '2023-11-20',
    rows: [
      { id: 'r1', label: 'ආරම්භක ඉතිරිය', refNo: '', 
        prev: createDummyBagData({b112: '150', b80: '50', seeni: '20'}), 
        today: createDummyBagData({b112: '20', b80: '10'}), 
        total: createDummyBagData({b112: '170', b80: '60', seeni: '20'}) 
      },
      { id: 'r2', label: 'ලැබීම', refNo: 'IN-45', 
        prev: createDummyBagData({b112: '50', piti: '100'}), 
        today: createDummyBagData({b112: '10'}), 
        total: createDummyBagData({b112: '60', piti: '100'}) 
      },
      { id: 'r3', label: 'එකතුව', refNo: '', 
        prev: createDummyBagData({b112: '200', b80: '50', seeni: '20', piti: '100'}), 
        today: createDummyBagData({b112: '30', b80: '10'}), 
        total: createDummyBagData({b112: '230', b80: '60', seeni: '20', piti: '100'}) 
      },
      { id: 'r4', label: 'නිකුත් කිරීම', refNo: 'OUT-12', 
        prev: createDummyBagData({b112: '100', piti: '50'}), 
        today: createDummyBagData({b112: '15'}), 
        total: createDummyBagData({b112: '115', piti: '50'}) 
      },
      { id: 'r5', label: 'දින අවසානයට ඉතිරිය', refNo: '', 
        prev: createDummyBagData({b112: '100', b80: '50', seeni: '20', piti: '50'}), 
        today: createDummyBagData({b112: '15', b80: '10'}), 
        total: createDummyBagData({b112: '115', b80: '60', seeni: '20', piti: '50'}) 
      },
    ],
    managerDate: '2023-11-20'
  });

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateRow = (rowIndex, section, field, value) => {
    const newRows = [...formData.rows];
    if (section) {
      newRows[rowIndex][section][field] = value;
    } else {
      newRows[rowIndex][field] = value;
    }
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
    <div className="max-w-[1400px] mx-auto pb-12 overflow-x-hidden">
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-slate-800">Form 15 B: ඉතිරි ගෝනි පිළිබඳ සහතිකය</h1>
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
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 print:hidden overflow-x-auto">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 pb-2 border-b border-slate-200 sticky left-0">Data Entry</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 sticky left-0">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">ගබඩාවේ වර්ගය</label>
              <div className="flex items-center gap-2">
                <input type="text" value={formData.warehouseType} onChange={e => updateField('warehouseType', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 w-full" />
                <span className="text-sm text-slate-600 font-semibold whitespace-nowrap">තොග/සිල්ලර ගබඩාව</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">අනු අංකය</label>
              <input type="text" value={formData.serialNo} onChange={e => updateField('serialNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">සහතික දිනය</label>
              <input type="date" value={formData.certDate} onChange={e => updateField('certDate', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="mb-8 min-w-[1200px]">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-t border-slate-200">
                  <th className="p-2 text-left font-medium text-slate-600 w-48" rowSpan={2}>විස්තර</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l border-slate-200 w-24" rowSpan={2}>අදාල<br/>අංකය</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l-2 border-slate-300" colSpan={10}>පෙර දිනට</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l-2 border-slate-300" colSpan={10}>දිනට</th>
                  <th className="p-2 text-center font-medium text-slate-600 border-l-2 border-slate-300" colSpan={10}>දිනට මුළු එකතුව</th>
                </tr>
                <tr className="bg-slate-50 border-b border-slate-200">
                  {['prev', 'today', 'total'].map((section, si) => (
                    <React.Fragment key={section}>
                      {bagLabels.map((lbl, i) => (
                        <th key={`${section}-${i}`} className={`p-1 text-center font-medium text-slate-600 text-[10px] w-10 leading-tight ${i === 0 ? 'border-l-2 border-slate-300' : 'border-l border-slate-200'}`}>
                          <div>{lbl.top}</div>
                          {lbl.bottom && <div>{lbl.bottom}</div>}
                        </th>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={row.id} className={`border-b border-slate-100 hover:bg-slate-50 ${row.label === 'එකතුව' || row.label === 'දින අවසානයට ඉතිරිය' ? 'font-semibold bg-slate-50/50' : ''}`}>
                    <td className="p-2 text-slate-700 font-medium">{row.label}</td>
                    <td className="p-1 border-l border-slate-200">
                      {row.label !== 'එකතුව' && row.label !== 'දින අවසානයට ඉතිරිය' && (
                        <input type="text" value={row.refNo} onChange={e => updateRow(i, null, 'refNo', e.target.value)} className="w-full border border-slate-300 rounded px-1 py-1 text-xs focus:outline-none focus:border-blue-500 text-center" />
                      )}
                    </td>
                    
                    {['prev', 'today', 'total'].map((section, si) => (
                      <React.Fragment key={section}>
                        {bagTypes.map((b, bi) => (
                          <td key={`${section}-${b}`} className={`p-0.5 ${bi === 0 ? 'border-l-2 border-slate-300' : 'border-l border-slate-200'}`}>
                            <input type="text" value={row[section][b]} onChange={e => updateRow(i, section, b, e.target.value)} className="w-full border border-slate-300 rounded px-0.5 py-1 text-xs focus:outline-none focus:border-blue-500 text-center" />
                          </td>
                        ))}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden mx-auto print:mx-0">
          <div className="relative p-8 print:p-6 font-serif text-black" style={{ minHeight: '297mm' }}>
            
            <div className="flex justify-end font-bold text-sm mb-4">
              Form 15 B
            </div>

            <div className="flex justify-center items-end mb-6 text-sm font-semibold">
              <span className={`${printLineCls} w-64 text-center`}>{formData.warehouseType}</span>
              <span>තොග/සිල්ලර ගබඩාව</span>
            </div>

            <div className="flex justify-end mb-2 pr-8 text-sm font-semibold">
              <span>අනු අංකය </span>
              <span className={`${printLineCls} w-32 ml-2 text-center`}>{formData.serialNo}</span>
            </div>

            <div className="flex justify-center items-end mb-8 text-sm font-semibold">
              <span className={`${printLineCls} w-64 text-center`}>{formData.certDate}</span>
              <span>දිනට ඉතිරි ගෝනි පිළිබඳ සහතිකය</span>
            </div>

            <table className="w-full border-collapse border border-black text-[9px] table-fixed mb-8">
              <thead>
                <tr>
                  <th className="border border-black font-semibold p-1 align-middle text-left w-24" rowSpan={2}></th>
                  <th className="border border-black font-semibold p-1 align-middle text-center w-8" rowSpan={2}>අදාල<br/>අංකය</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={10}>පෙර දිනට</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={10}>දිනට</th>
                  <th className="border border-black font-semibold p-1 text-center" colSpan={10}>දිනට මුළු එකතුව</th>
                </tr>
                <tr>
                  {['prev', 'today', 'total'].map((section, si) => (
                    <React.Fragment key={section}>
                      {bagLabels.map((lbl, i) => (
                        <th key={`${section}-${i}`} className="border border-black font-semibold px-0 py-1 text-center w-5 leading-[1.1]">
                          <div>{lbl.top}</div>
                          {lbl.bottom && <div>{lbl.bottom}</div>}
                        </th>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={row.id} className={`h-8 ${row.label === 'එකතුව' || row.label === 'දින අවසානයට ඉතිරිය' ? 'font-bold' : 'font-semibold'}`}>
                    <td className="border border-black px-1 text-[10px] leading-tight">{row.label}</td>
                    <td className="border border-black text-center px-0">{row.refNo}</td>
                    
                    {['prev', 'today', 'total'].map((section, si) => (
                      <React.Fragment key={section}>
                        {bagTypes.map((b, bi) => (
                          <td key={`${section}-${b}`} className="border border-black text-center px-0">{row[section][b]}</td>
                        ))}
                      </React.Fragment>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex flex-col gap-8 text-[11px] font-semibold px-4">
              <div className="text-center">ඉහත සඳහන් සංඛ්‍යාවන් මා භාරයේ තිබෙන බවත්, ඉතිරි ගෝනි මා භාරයේ තිබෙන බවත් සහතික කරමි.</div>
              
              <div className="flex justify-between items-end mt-4">
                <div className="flex items-end gap-2 w-1/2">
                  <span>කාර්යාලයේදී පරික්ෂා කළ බවට</span>
                  <span className={`${printLineCls} flex-1`}></span>
                </div>
                <div className="flex items-end gap-2 w-1/3">
                  <span>කළමනාකරු</span>
                  <span className={`${printLineCls} flex-1`}></span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
