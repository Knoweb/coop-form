import React, { useState, useEffect, useMemo } from 'react';
import { Save, CheckCircle2, Printer } from 'lucide-react';

export default function Form11() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    societyName: '',
    amountNumbersRs: '',
    amountNumbersCts: '',
    amountWords: '',
    date: '',
    timeAmPm: 'පෙරවරු',
    cashierName: '',
    depositTimeAmPm: 'පෙරවරු',
    depositTime: '',
    
    // Notes counts
    notes1000: '',
    notes500: '',
    notes200: '',
    notes100: '',
    notes50: '',
    notes20: '',
    notes10: '',
    
    // Other values
    coinsRs: '',
    coinsCts: '',
    chequesRs: '',
    chequesCts: '',
    moneyOrdersRs: '',
    moneyOrdersCts: '',
    
    accountantDate: ''
  });

  useEffect(() => {
    // Populate dummy data
    setFormData({
      societyName: 'හික්කඩුව',
      amountNumbersRs: '18550',
      amountNumbersCts: '50',
      amountWords: 'රුපියල් දහඅටදහස් පන්සිය පනහක්',
      date: '2023-11-20',
      timeAmPm: 'පෙරවරු',
      cashierName: 'ඒ. බී. පෙරේරා',
      depositTimeAmPm: 'පස්වරු',
      depositTime: '2.30',
      
      notes1000: '10',
      notes500: '10',
      notes200: '5',
      notes100: '15',
      notes50: '10',
      notes20: '10',
      notes10: '5',
      
      coinsRs: '150',
      coinsCts: '50',
      chequesRs: '100',
      chequesCts: '00',
      moneyOrdersRs: '50',
      moneyOrdersCts: '00',
      
      accountantDate: '2023-11-20'
    });
  }, []);

  const calculations = useMemo(() => {
    const val1000 = (Number(formData.notes1000) || 0) * 1000;
    const val500 = (Number(formData.notes500) || 0) * 500;
    const val200 = (Number(formData.notes200) || 0) * 200;
    const val100 = (Number(formData.notes100) || 0) * 100;
    const val50 = (Number(formData.notes50) || 0) * 50;
    const val20 = (Number(formData.notes20) || 0) * 20;
    const val10 = (Number(formData.notes10) || 0) * 10;
    
    const notesTotal = val1000 + val500 + val200 + val100 + val50 + val20 + val10;
    
    const coinsRs = Number(formData.coinsRs) || 0;
    const coinsCts = Number(formData.coinsCts) || 0;
    
    const chqRs = Number(formData.chequesRs) || 0;
    const chqCts = Number(formData.chequesCts) || 0;
    
    const moRs = Number(formData.moneyOrdersRs) || 0;
    const moCts = Number(formData.moneyOrdersCts) || 0;
    
    let totalCts = coinsCts + chqCts + moCts;
    let totalRs = notesTotal + coinsRs + chqRs + moRs + Math.floor(totalCts / 100);
    totalCts = totalCts % 100;

    return {
      v1000: val1000 > 0 ? val1000 : '',
      v500: val500 > 0 ? val500 : '',
      v200: val200 > 0 ? val200 : '',
      v100: val100 > 0 ? val100 : '',
      v50: val50 > 0 ? val50 : '',
      v20: val20 > 0 ? val20 : '',
      v10: val10 > 0 ? val10 : '',
      totalRs: totalRs > 0 ? totalRs.toString() : '',
      totalCts: totalRs > 0 || totalCts > 0 ? totalCts.toString().padStart(2, '0') : ''
    };
  }, [formData]);

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
      <div className="max-w-5xl mx-auto space-y-6 print:space-y-0 print:max-w-none">
        
        {/* Header Action Bar (Hidden in Print) */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Form 11</h1>
            <p className="text-sm text-slate-500">මුදල් සහතිකය (Cash Certificate)</p>
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
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Certificate Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">Society Name (සමිතිය)</label>
              <input type="text" value={formData.societyName} onChange={(e) => setFormData({...formData, societyName: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Date (දිනය)</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Amount Rs. (රු.)</label>
              <input type="number" value={formData.amountNumbersRs} onChange={(e) => setFormData({...formData, amountNumbersRs: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Amount Cts. (ශත)</label>
              <input type="number" value={formData.amountNumbersCts} onChange={(e) => setFormData({...formData, amountNumbersCts: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Time AM/PM (පෙරවරු/පස්වරු)</label>
              <select value={formData.timeAmPm} onChange={(e) => setFormData({...formData, timeAmPm: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white">
                <option value="පෙරවරු">පෙරවරු (AM)</option>
                <option value="පස්වරු">පස්වරු (PM)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 md:col-span-3">
              <label className="text-xs font-semibold text-slate-600 uppercase">Amount in Words (අකුරෙන්)</label>
              <input type="text" value={formData.amountWords} onChange={(e) => setFormData({...formData, amountWords: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">Cashier Name (මුදල් භාරකරුගේ නම)</label>
              <input type="text" value={formData.cashierName} onChange={(e) => setFormData({...formData, cashierName: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Deposit Time (තැන්පත් කළ වෙලාව)</label>
              <div className="flex gap-2">
                <select value={formData.depositTimeAmPm} onChange={(e) => setFormData({...formData, depositTimeAmPm: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white w-28">
                  <option value="පෙරවරු">පෙරවරු</option>
                  <option value="පස්වරු">පස්වරු</option>
                </select>
                <input type="text" placeholder="e.g. 2.30" value={formData.depositTime} onChange={(e) => setFormData({...formData, depositTime: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 flex-1" />
              </div>
            </div>
          </div>
          
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Cash Breakdown (මුදල් විස්තර)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600 uppercase mb-2">
                <div>Note Type</div>
                <div>Quantity (කෑලි ගණන)</div>
              </div>
              {[
                { label: '1000/-', field: 'notes1000' },
                { label: '500/-', field: 'notes500' },
                { label: '200/-', field: 'notes200' },
                { label: '100/-', field: 'notes100' },
                { label: '50/-', field: 'notes50' },
                { label: '20/-', field: 'notes20' },
                { label: '10/-', field: 'notes10' }
              ].map(note => (
                <div key={note.field} className="grid grid-cols-2 gap-2 items-center">
                  <div className="font-semibold text-slate-700 bg-slate-50 px-3 py-2 border rounded">රු. {note.label}</div>
                  <input type="number" min="0" value={formData[note.field]} onChange={(e) => setFormData({...formData, [note.field]: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-600 uppercase mb-2">
                <div className="col-span-1">Other Types</div>
                <div>Rs.</div>
                <div>Cts.</div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="font-semibold text-slate-700">කාසි (Coins)</div>
                <input type="number" value={formData.coinsRs} onChange={(e) => setFormData({...formData, coinsRs: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                <input type="number" value={formData.coinsCts} onChange={(e) => setFormData({...formData, coinsCts: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="font-semibold text-slate-700 leading-tight">චෙක්පත්<br/><span className="text-[10px] font-normal">(Cheques)</span></div>
                <input type="number" value={formData.chequesRs} onChange={(e) => setFormData({...formData, chequesRs: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                <input type="number" value={formData.chequesCts} onChange={(e) => setFormData({...formData, chequesCts: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <div className="font-semibold text-slate-700 leading-tight">මුදල් ඇණවුම්<br/><span className="text-[10px] font-normal">(Money Orders)</span></div>
                <input type="number" value={formData.moneyOrdersRs} onChange={(e) => setFormData({...formData, moneyOrdersRs: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
                <input type="number" value={formData.moneyOrdersCts} onChange={(e) => setFormData({...formData, moneyOrdersCts: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Printable Form Container */}
        <div className="bg-white shadow rounded-xl p-6 md:p-8 overflow-x-auto text-slate-800 font-serif border border-slate-200 print:shadow-none print:border-none print:p-0">
          <div className="min-w-[700px] border-[2px] border-slate-800 p-8 md:p-12 max-w-4xl mx-auto relative bg-white leading-relaxed">
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1"></div>
              <h2 className="text-center font-bold text-xl flex-1">මුදල් සහතිකය</h2>
              <div className="flex-1 text-right text-sm font-semibold">Form 11</div>
            </div>

            <div className="space-y-6 text-sm mb-12">
              <div className="flex items-end">
                <span className="whitespace-nowrap">සීමාසහිත</span>
                <span className="flex-1 border-b-[1.5px] border-dotted border-slate-600 mx-2 text-center translate-y-[1px]">
                  {formData.societyName}
                </span>
                <span className="whitespace-nowrap">විවිධ සේවා සමුපකාර සමිතියට අයත්/බාර ඇති මුදල් වන</span>
              </div>
              <div className="flex items-end">
                <span className="whitespace-nowrap">රු.</span>
                <span className="w-[300px] border-b-[1.5px] border-dotted border-slate-600 mx-2 text-center translate-y-[1px]">
                  {formData.amountWords}
                </span>
                <span className="whitespace-nowrap">(රු.</span>
                <span className="w-[120px] border-b-[1.5px] border-dotted border-slate-600 mx-1 text-center translate-y-[1px]">
                  {formData.amountNumbersRs}.{formData.amountNumbersCts?.padStart(2, '0') || '00'}
                </span>
                <span className="whitespace-nowrap">)</span>
                <span className="w-[150px] border-b-[1.5px] border-dotted border-slate-600 mx-2 text-center translate-y-[1px]">
                  {formData.date}
                </span>
                <span className="whitespace-nowrap">දින {formData.timeAmPm === 'පෙරවරු' ? <span className="font-semibold line-through">පෙරවරු</span> : <span>පෙරවරු</span>}/{formData.timeAmPm === 'පස්වරු' ? <span className="font-semibold line-through">පස්වරු</span> : <span>පස්වරු</span>}</span>
                <span className="flex-1 border-b-[1.5px] border-dotted border-slate-600 ml-2 translate-y-[1px]"></span>
              </div>
              <div className="flex items-end">
                <span className="whitespace-nowrap">මෙම සමිතියේ මුදල් භාරකරු වන</span>
                <span className="flex-1 border-b-[1.5px] border-dotted border-slate-600 mx-2 text-center translate-y-[1px]">
                  {formData.cashierName}
                </span>
                <span className="whitespace-nowrap">මා භාරයේ පහත සඳහන් අයුරු නිවැරදිව</span>
              </div>
              <div className="flex items-end">
                <span className="whitespace-nowrap">ඇති බවද එම මුදල් මා භාරයේ ඇති යකඩ සේප්පුවේ එම දින {formData.depositTimeAmPm === 'පෙරවරු' ? <span className="font-semibold line-through">පෙරවරු</span> : <span>පෙරවරු</span>}/{formData.depositTimeAmPm === 'පස්වරු' ? <span className="font-semibold line-through">පස්වරු</span> : <span>පස්වරු</span>}</span>
                <span className="flex-1 border-b-[1.5px] border-dotted border-slate-600 ml-2 text-center translate-y-[1px]">
                  {formData.depositTime}
                </span>
              </div>
              <div className="flex items-end">
                <span className="whitespace-nowrap">තැන්පත් කළ බවද සහතික කරමි.</span>
              </div>
            </div>

            <div className="flex text-sm mb-16">
              {/* Left Column for 'විස්තර රු ශත' text */}
              <div className="flex gap-8 font-semibold w-1/4">
                <span>විස්තර</span>
                <span>රු</span>
                <span>ශත</span>
              </div>
              
              {/* Table Column */}
              <div className="flex-1 ml-12">
                <table className="w-full border-collapse">
                  <tbody>
                    {[
                      { label: '1000/-', val: calculations.v1000, count: formData.notes1000 },
                      { label: '500/-', val: calculations.v500, count: formData.notes500 },
                      { label: '200/-', val: calculations.v200, count: formData.notes200 },
                      { label: '100/-', val: calculations.v100, count: formData.notes100 },
                      { label: '50/-', val: calculations.v50, count: formData.notes50 },
                      { label: '20/-', val: calculations.v20, count: formData.notes20 },
                      { label: '10/-', val: calculations.v10, count: formData.notes10 },
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td className="py-1">
                          {idx === 0 ? <span className="mr-2">රුපියල්</span> : <span className="mr-6 opacity-0">රුපියල්</span>}
                          <span className="inline-block w-12 text-right">{row.label}</span>
                          {idx === 0 ? <span className="ml-4 mr-4">නෝට්ටු</span> : <span className="ml-8 mr-4 text-center text-lg leading-3 relative -top-1">"</span>}
                        </td>
                        <td className="w-32 pr-4 text-center">
                          <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem] translate-y-[2px]">
                            {row.count}
                          </span>
                        </td>
                        <td className="w-24 text-right pr-2">
                          <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem] translate-y-[2px]">
                            {row.val}
                          </span>
                        </td>
                        <td className="w-16 text-center">
                          <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem] translate-y-[2px]">
                            {row.val ? '00' : ''}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td className="py-1 pt-2 font-bold">කාසි</td>
                      <td></td>
                      <td className="w-24 text-right pr-2 pt-2 border-b-[1.5px] border-slate-800 pb-2">
                        <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem]">
                          {formData.coinsRs}
                        </span>
                      </td>
                      <td className="w-16 text-center pt-2 border-b-[1.5px] border-slate-800 pb-2">
                        <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem]">
                          {formData.coinsCts}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pt-6 font-semibold whitespace-nowrap" colSpan="2">චෙක්පත් (විස්තර පසුපිට)</td>
                      <td className="w-24 text-right pr-2 pt-6">
                        <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem] translate-y-[2px]">
                          {formData.chequesRs}
                        </span>
                      </td>
                      <td className="w-16 text-center pt-6">
                        <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem] translate-y-[2px]">
                          {formData.chequesCts}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pt-2 font-semibold whitespace-nowrap" colSpan="2">මුදල් ඇණවුම් (විස්තර පසුපිට)</td>
                      <td className="w-24 text-right pr-2 pt-2 border-b-[1.5px] border-slate-800 pb-2">
                        <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem]">
                          {formData.moneyOrdersRs}
                        </span>
                      </td>
                      <td className="w-16 text-center pt-2 border-b-[1.5px] border-slate-800 pb-2">
                        <span className="border-b-[1.5px] border-slate-500 inline-block w-full min-h-[1.2rem]">
                          {formData.moneyOrdersCts}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-1 pt-4 font-bold text-right pr-8" colSpan="2">එකතුව</td>
                      <td className="w-24 text-right pr-2 pt-4 border-b-4 border-double border-slate-800">
                        <span className="inline-block w-full min-h-[1.2rem] font-bold text-slate-900">
                          {calculations.totalRs}
                        </span>
                      </td>
                      <td className="w-16 text-center pt-4 border-b-4 border-double border-slate-800">
                        <span className="inline-block w-full min-h-[1.2rem] font-bold text-slate-900">
                          {calculations.totalCts}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col items-center mb-16 text-sm">
              <span className="border-b border-dotted border-slate-500 inline-block w-64 mb-1"></span>
              <span className="font-semibold">මුදල් භාරකරුගේ අත්සන</span>
            </div>

            <div className="text-sm text-justify leading-7 mb-16">
              ඉහත සඳහන් මුදල් මා ඉදිරියේ යකඩ සේප්පුවේ මුදල් භාරකරු විසින් නිවැරදිව ගණන් බලා තැන්පත් කළ බව සහතික කරමි.
            </div>

            <div className="flex justify-between items-end text-sm">
              <div className="flex items-end">
                <span className="font-semibold">දිනය</span>
                <span className="border-b-2 border-dotted border-slate-500 inline-block px-4 ml-2 min-w-[200px] text-center translate-y-[2px]">
                  {formData.accountantDate}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <span className="border-b border-dotted border-slate-500 inline-block w-64 mb-1"></span>
                <span className="font-semibold">ගණකාධිකාරී</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
