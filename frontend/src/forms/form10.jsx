import React, { useState, useEffect, useMemo } from 'react';
import { Save, CheckCircle2, Printer } from 'lucide-react';

export default function Form10() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    serialNo: '',
    date: '',
    accountsFor: '',
    receivedFrom: '',
    amountWordsRs: '',
    amountWordsCts: '',
    items: [
      { desc: '', rs: '', cts: '' },
      { desc: '', rs: '', cts: '' },
      { desc: '', rs: '', cts: '' }
    ],
    totalRs: '',
    totalCts: ''
  });

  useEffect(() => {
    // Populate dummy data
    setFormData({
      serialNo: '10245',
      date: '2023-11-20',
      accountsFor: 'සාමාජික ඉතුරුම් තැන්පතු',
      receivedFrom: 'ඒ. බී. පෙරේරා',
      amountWordsRs: 'පන්සිය',
      amountWordsCts: 'බින්දුවක්',
      items: [
        { desc: 'සාමාජික ඉතුරුම්', rs: '250', cts: '00' },
        { desc: 'ණය පියවීම්', rs: '150', cts: '50' },
        { desc: 'වෙනත්', rs: '100', cts: '00' }
      ]
    });
  }, []);

  const calculatedTotals = useMemo(() => {
    let sumRs = 0;
    let sumCts = 0;
    
    formData.items.forEach(item => {
      sumRs += Number(item.rs) || 0;
      sumCts += Number(item.cts) || 0;
    });

    sumRs += Math.floor(sumCts / 100);
    sumCts = sumCts % 100;

    return {
      rs: sumRs > 0 ? sumRs.toString() : '',
      cts: sumRs > 0 || sumCts > 0 ? sumCts.toString().padStart(2, '0') : ''
    };
  }, [formData.items]);

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto space-y-6 print:space-y-0 print:max-w-none">
        
        {/* Header Action Bar (Hidden in Print) */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Form 10</h1>
            <p className="text-sm text-slate-500">Cash Receipt</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={() => window.print()} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors h-[40px] flex-1 sm:flex-none justify-center">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 h-[40px] flex-1 sm:flex-none justify-center shadow-sm">
              {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Receipt'}
            </button>
          </div>
        </div>

        {/* Data Entry Form (Hidden in Print) */}
        <div className="bg-white rounded-xl shadow p-6 border border-slate-200 print:hidden">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Receipt Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Serial No (අනු අංකය)</label>
              <input type="text" value={formData.serialNo} onChange={(e) => setFormData({...formData, serialNo: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Date (දිනය)</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Accounts For (ගිණුම් වෙනුවෙන්)</label>
              <input type="text" value={formData.accountsFor} onChange={(e) => setFormData({...formData, accountsFor: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Received From (ගෙන් මුදල්)</label>
              <input type="text" value={formData.receivedFrom} onChange={(e) => setFormData({...formData, receivedFrom: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Amount in words - Rs (රුපියල්)</label>
              <input type="text" value={formData.amountWordsRs} onChange={(e) => setFormData({...formData, amountWordsRs: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Amount in words - Cts (ශත)</label>
              <input type="text" value={formData.amountWordsCts} onChange={(e) => setFormData({...formData, amountWordsCts: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          
          <h3 className="font-bold text-slate-700 mb-2 text-sm uppercase">Items</h3>
          <div className="space-y-2">
            {formData.items.map((item, index) => (
              <div key={index} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder={`Item ${index + 1} Description`}
                  value={item.desc}
                  onChange={(e) => handleItemChange(index, 'desc', e.target.value)}
                  className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" 
                />
                <input 
                  type="number" 
                  placeholder="Rs."
                  value={item.rs}
                  onChange={(e) => handleItemChange(index, 'rs', e.target.value)}
                  className="w-24 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-right" 
                />
                <input 
                  type="number" 
                  placeholder="Cts."
                  value={item.cts}
                  onChange={(e) => handleItemChange(index, 'cts', e.target.value)}
                  className="w-20 border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 text-right" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Printable Form Container */}
        <div className="bg-white shadow rounded-xl p-6 md:p-8 overflow-x-auto text-slate-800 font-serif border border-slate-200 print:shadow-none print:border-none print:p-0">
          <div className="min-w-[600px] border-[3px] border-slate-800 p-8 md:p-12 max-w-3xl mx-auto relative bg-white">
            
            {/* Top Right Info */}
            <div className="flex flex-col items-end gap-3 mb-8 text-sm">
              <div className="font-bold text-xl mb-1 mr-6">Form 10</div>
              <div className="flex items-end gap-2">
                <span>අනු අංකය</span>
                <span className="border-b-2 border-dotted border-slate-500 w-32 text-center text-slate-900 inline-block translate-y-[1px]">
                  {formData.serialNo}
                </span>
              </div>
              <div className="flex items-end gap-2">
                <span>දිනය</span>
                <span className="border-b-2 border-dotted border-slate-500 w-32 text-center text-slate-900 inline-block translate-y-[1px]">
                  {formData.date}
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-center text-3xl font-bold mb-12 mr-32 tracking-wide">මුදල් කුවිතාන්සිය.</h2>

            {/* Paragraph with inline inputs */}
            <div className="space-y-8 leading-loose text-base max-w-2xl mx-auto">
              <div className="flex items-end whitespace-nowrap">
                <span>පහත සඳහන් ගිණුම් වෙනුවෙන්</span>
                <span className="flex-1 border-b border-dotted border-slate-500 ml-2 px-2 text-slate-900 inline-block translate-y-[3px]">
                  {formData.accountsFor}
                </span>
              </div>
              <div className="flex items-end whitespace-nowrap">
                <span className="w-64 border-b border-dotted border-slate-500 mr-2 px-2 text-slate-900 inline-block translate-y-[3px]">
                  {formData.receivedFrom}
                </span>
                <span>මයා/මහත්මිය ගෙන් මුදල් රුපියල්</span>
                <span className="flex-1 border-b border-dotted border-slate-500 mx-2 px-2 text-slate-900 text-center inline-block translate-y-[3px]">
                  {formData.amountWordsRs}
                </span>
              </div>
              <div className="flex items-end whitespace-nowrap">
                <span>ශත</span>
                <span className="w-48 border-b border-dotted border-slate-500 mx-2 px-2 text-slate-900 text-center inline-block translate-y-[3px]">
                  {formData.amountWordsCts}
                </span>
                <span>පමණක් භාරගතිමි.</span>
              </div>
            </div>

            {/* Items Table */}
            <div className="mt-14 max-w-2xl mx-auto pl-8">
              <div className="flex justify-end gap-16 font-bold mb-6 pr-10">
                <span>රු.</span>
                <span>ශත</span>
              </div>
              
              <div className="space-y-6">
                {formData.items.map((item, index) => (
                  <div key={index} className="flex items-end gap-4">
                    <span className="font-semibold">{index + 1}.</span>
                    <span className="flex-1 border-b border-dotted border-slate-500 px-2 text-slate-900 inline-block translate-y-[3px]">
                      {item.desc}
                    </span>
                    <span className="w-20 border-b border-dotted border-slate-500 px-2 text-center text-slate-900 inline-block translate-y-[3px]">
                      {item.rs}
                    </span>
                    <span className="w-16 border-b border-dotted border-slate-500 px-2 text-center text-slate-900 inline-block translate-y-[3px]">
                      {item.cts}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total Row */}
              <div className="flex justify-end items-end gap-4 mt-8">
                <span className="font-bold mr-6">එකතුව</span>
                <div className="w-20 text-center font-bold text-slate-900 border-b-[3px] border-double border-slate-700 pb-1 translate-y-[4px]">
                  {calculatedTotals.rs}
                </div>
                <div className="w-16 text-center font-bold text-slate-900 border-b-[3px] border-double border-slate-700 pb-1 translate-y-[4px]">
                  {calculatedTotals.cts}
                </div>
              </div>
            </div>

            {/* Bottom Signatures */}
            <div className="mt-20 flex justify-between items-end max-w-3xl mx-auto pt-8">
              <div className="space-y-8">
                <div className="flex items-end gap-2">
                  <span className="font-bold">රු.</span>
                  <span className="border-b border-dotted border-slate-500 w-48 text-center text-slate-900 font-bold inline-block translate-y-[3px]">
                    {calculatedTotals.rs ? `${calculatedTotals.rs}.${calculatedTotals.cts}` : ''}
                  </span>
                </div>
                <div className="flex items-end gap-2">
                  <span>දිනය</span>
                  <span className="border-b-2 border-dotted border-slate-500 w-32 text-center text-slate-900 inline-block translate-y-[1px]">
                    {formData.date}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                 <div className="w-56 border-b border-dotted border-slate-500 mb-2"></div>
                 <span className="font-medium">අත්සන</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
