import React, { useState } from 'react';
import { Save, Printer, Plus, Trash2 } from 'lucide-react';

export default function Form14B() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    itemNo: '',
    name: '',
    date: '',
    rows: Array.from({ length: 10 }, () => ({
      description: '',
      qty: '',
      rateRs: '', rateCts: '',
      amountRs: '', amountCts: ''
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
        { description: '', qty: '', rateRs: '', rateCts: '', amountRs: '', amountCts: '' }
      ]
    });
  };

  const removeRow = (index) => {
    const newRows = formData.rows.filter((_, i) => i !== index);
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
    <div className="max-w-5xl mx-auto pb-12">
      {/* Header controls */}
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-slate-800">Form 14 B: වෙළඳාම් පත (පාරිභෝගික අංශය)</h1>
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
              <label className="text-xs font-semibold text-slate-600 uppercase">සා. අ. (Item No)</label>
              <input type="text" value={formData.itemNo} onChange={e => updateField('itemNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
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
                  <th className="p-2 text-left font-medium text-slate-600 min-w-[200px]">විස්තර</th>
                  <th className="p-2 text-left font-medium text-slate-600 w-24">ප්‍රමාණය</th>
                  <th className="p-2 text-center font-medium text-slate-600 w-32">බැගින්<br/><span className="text-xs">රු. | ශත</span></th>
                  <th className="p-2 text-center font-medium text-slate-600 w-32">එකතුව<br/><span className="text-xs">රු. | ශත</span></th>
                  <th className="p-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {formData.rows.map((row, i) => (
                  <tr key={i} className="border-b border-slate-100">
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
                    <td className="p-1 text-center">
                      <button onClick={() => removeRow(i)} className="p-1 text-red-500 hover:bg-red-50 rounded" title="Remove row">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3">
              <button onClick={addRow} className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium px-2 py-1 bg-blue-50 hover:bg-blue-100 rounded transition-colors">
                <Plus className="w-4 h-4" /> Add Row
              </button>
            </div>
          </div>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0 min-w-[210mm] max-w-[210mm] overflow-hidden mx-auto print:mx-0">
          <div className="relative font-serif text-black h-[297mm] w-full">
            
            {/* Continuous Dashed Lines */}
            <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-black z-0"></div>
            <div className="absolute top-0 left-1/2 h-full border-l border-dashed border-black z-0"></div>

            <div className="grid grid-cols-2 grid-rows-2 w-full h-full relative z-10">
              {/* Quadrant 3: Top Left */}
              <div className="relative">
                <span className="absolute top-4 right-4 text-sm font-semibold bg-white px-1">3</span>
              </div>
              
              {/* Quadrant 1: Top Right (Form Content) */}
              <div className="relative p-4">
                <span className="absolute top-4 right-4 text-sm font-semibold bg-white px-1">1</span>
                
                <div className="flex justify-between items-start mb-2 mt-4">
                  <div className="flex-1"></div>
                  <div className="font-bold text-[11px] border-b border-dotted border-black w-24 pb-1"></div>
                  <div className="font-bold text-[11px] ml-1">උපලේඛනය Form 14 බී.</div>
                </div>

                <div className="text-center mb-4 relative">
                  <h2 className="font-bold text-sm bg-white inline-block px-2">වෙළඳාම් පත (පාරිභෝගික අංශය)</h2>
                </div>

                <div className="flex items-end justify-between mb-3 text-[11px] font-semibold bg-white">
                  <div className="flex gap-1 w-1/4">
                    <span>සා. අ.</span>
                    <span className={`${printLineCls} flex-1`}>{formData.itemNo}</span>
                  </div>
                  <div className="flex gap-1 w-2/4 px-2">
                    <span>නම</span>
                    <span className={`${printLineCls} flex-1`}>{formData.name}</span>
                  </div>
                  <div className="flex gap-1 w-1/4">
                    <span>දිනය</span>
                    <span className={`${printLineCls} flex-1 text-center`}>{formData.date}</span>
                  </div>
                </div>

                <table className="w-full border-collapse border border-black text-[11px] table-fixed bg-white">
                  <thead>
                    <tr>
                      <th className="border border-black font-semibold p-1 align-middle text-center" rowSpan={2}>විස්තර</th>
                      <th className="border border-black font-semibold p-1 w-16 align-middle text-center" rowSpan={2}>ප්‍රමාණය</th>
                      <th className="border border-black font-semibold p-1 w-20 text-center" colSpan={2}>බැගින්</th>
                      <th className="border border-black font-semibold p-1 w-20 text-center" colSpan={2}>එකතුව</th>
                    </tr>
                    <tr>
                      <th className="border border-black font-semibold p-0.5 text-center w-14">රු.</th>
                      <th className="border border-black font-semibold p-0.5 text-center w-6">ශ.</th>
                      <th className="border-black border-b border-l font-semibold p-0.5 text-center w-14"></th>
                      <th className="border-black border-b font-semibold p-0.5 text-center w-6"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.rows.map((row, i) => (
                      <tr key={i} className="h-6">
                        <td className="border border-black px-1">{row.description}</td>
                        <td className="border border-black text-center px-1">{row.qty}</td>
                        <td className="border border-black text-right px-1">{row.rateRs}</td>
                        <td className="border border-black text-center px-1">{row.rateCts ? row.rateCts.padStart(2,'0') : ''}</td>
                        <td className="border-l border-b border-black text-right px-1 border-r">{row.amountRs}</td>
                        <td className="border-b border-black text-center px-1 border-r">{row.amountCts ? row.amountCts.padStart(2,'0') : ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Quadrant 4: Bottom Left */}
              <div className="relative">
                <span className="absolute top-2 right-4 text-sm font-semibold bg-white px-1">4</span>
              </div>
              
              {/* Quadrant 2: Bottom Right */}
              <div className="relative">
                <span className="absolute top-2 right-4 text-sm font-semibold bg-white px-1">2</span>
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
}
