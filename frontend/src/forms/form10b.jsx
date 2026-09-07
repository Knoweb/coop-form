import React, { useState, useEffect, useMemo } from 'react';
import { Save, CheckCircle2, Printer } from 'lucide-react';

export default function Form10B() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    societyName: '',
    bankName: '',
    serialNo: '',
    regionalSeal: '',
    date: '',
    accountNo: '',
    depositorName: '',
    address: '',
    oldBalanceRs: '',
    oldBalanceCts: '',
    depositRs: '',
    depositCts: '',
    amountWords: '',
    other: ''
  });

  useEffect(() => {
    // Populate dummy data
    setFormData({
      societyName: 'හික්කඩුව',
      bankName: 'හික්කඩුව',
      serialNo: 'B-45012',
      regionalSeal: '142',
      date: '2023-11-20',
      accountNo: '89045',
      depositorName: 'ඒ. බී. පෙරේරා',
      address: 'නො. 15, ගාලු පාර, හික්කඩුව',
      oldBalanceRs: '12500',
      oldBalanceCts: '50',
      depositRs: '5000',
      depositCts: '00',
      amountWords: 'රුපියල් පන්දහසක් පමණි',
      other: ''
    });
  }, []);

  const calculatedNewBalance = useMemo(() => {
    const oldRs = Number(formData.oldBalanceRs) || 0;
    const oldCts = Number(formData.oldBalanceCts) || 0;
    const depRs = Number(formData.depositRs) || 0;
    const depCts = Number(formData.depositCts) || 0;
    
    let totalCts = oldCts + depCts;
    let totalRs = oldRs + depRs + Math.floor(totalCts / 100);
    totalCts = totalCts % 100;

    return {
      rs: totalRs > 0 ? totalRs.toString() : '',
      cts: totalRs > 0 || totalCts > 0 ? totalCts.toString().padStart(2, '0') : ''
    };
  }, [formData.oldBalanceRs, formData.oldBalanceCts, formData.depositRs, formData.depositCts]);

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
            <h1 className="text-2xl font-bold text-slate-800">Form 10 B</h1>
            <p className="text-sm text-slate-500">Deposit Receipt</p>
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
              <label className="text-xs font-semibold text-slate-600 uppercase">Society Name (සමිතිය)</label>
              <input type="text" value={formData.societyName} onChange={(e) => setFormData({...formData, societyName: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Bank Name (බැංකුව)</label>
              <input type="text" value={formData.bankName} onChange={(e) => setFormData({...formData, bankName: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Serial No (අනු අංකය)</label>
              <input type="text" value={formData.serialNo} onChange={(e) => setFormData({...formData, serialNo: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Regional Seal (ප්‍රාදේශිකයේ මුද්‍රාව)</label>
              <input type="text" value={formData.regionalSeal} onChange={(e) => setFormData({...formData, regionalSeal: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Date (දිනය)</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Account No (ගිණුම් අංකය)</label>
              <input type="text" value={formData.accountNo} onChange={(e) => setFormData({...formData, accountNo: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Depositor Name (තැන්පත් කරුගේ නම)</label>
              <input type="text" value={formData.depositorName} onChange={(e) => setFormData({...formData, depositorName: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Address (ලිපිනය)</label>
              <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Pass Book Balance Rs. (පාස් පොතේ ශේෂය රු.)</label>
              <input type="number" value={formData.oldBalanceRs} onChange={(e) => setFormData({...formData, oldBalanceRs: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Pass Book Balance Cts. (පාස් පොතේ ශේෂය ශත)</label>
              <input type="number" value={formData.oldBalanceCts} onChange={(e) => setFormData({...formData, oldBalanceCts: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Deposit Rs. (තැන්පත් මුදල රු.)</label>
              <input type="number" value={formData.depositRs} onChange={(e) => setFormData({...formData, depositRs: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Deposit Cts. (තැන්පත් මුදල ශත)</label>
              <input type="number" value={formData.depositCts} onChange={(e) => setFormData({...formData, depositCts: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">Amount in Words (අකුරෙන්)</label>
              <input type="text" value={formData.amountWords} onChange={(e) => setFormData({...formData, amountWords: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">Signatures (අත්සන්)</label>
              <input type="text" value={formData.other} onChange={(e) => setFormData({...formData, other: e.target.value})} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Printable Form Container */}
        <div className="bg-white shadow rounded-xl p-6 md:p-8 overflow-x-auto text-slate-800 font-serif border border-slate-200 print:shadow-none print:border-none print:p-0">
          <div className="min-w-[700px] border-[2px] border-slate-800 p-8 md:p-12 max-w-4xl mx-auto relative bg-white">
            
            <h2 className="text-center font-bold text-xl mb-8">ෆෝරම 10 බී.</h2>

            <div className="space-y-6 text-sm mb-10 text-center">
              <div>
                <span className="border-b-2 border-dotted border-slate-500 w-48 text-center text-slate-900 inline-block translate-y-[2px]">
                  {formData.societyName}
                </span>
                <span className="ml-2 font-semibold">විවිධ සේවා සමූපකාර සමිතිය.</span>
              </div>
              <div>
                <span className="border-b-2 border-dotted border-slate-500 w-48 text-center text-slate-900 inline-block translate-y-[2px]">
                  {formData.bankName}
                </span>
                <span className="ml-2 font-semibold">ප්‍රාදේශීය - සමූපකාර ග්‍රාමීය බැංකුව.</span>
              </div>
            </div>

            <div className="flex justify-between items-start mb-6 text-sm">
              <div className="space-y-4">
                <div className="flex items-end">
                  <span className="font-semibold">කුවිතාන්සි අනු අංකය:</span>
                  <span className="border-b-2 border-dotted border-slate-500 w-48 text-center text-slate-900 ml-2 inline-block translate-y-[2px]">
                    {formData.serialNo}
                  </span>
                </div>
                <div className="flex items-end gap-6">
                  <div className="flex items-end">
                    <span className="font-semibold">ප්‍රාදේශිකයේ මුද්‍රාව</span>
                    <span className="border-b-2 border-dotted border-slate-500 w-32 text-center text-slate-900 ml-2 inline-block translate-y-[2px]">
                      {formData.regionalSeal}
                    </span>
                  </div>
                  <div className="flex items-end">
                    <span className="font-semibold">දිනය</span>
                    <span className="border-b-2 border-dotted border-slate-500 w-32 text-center text-slate-900 ml-2 inline-block translate-y-[2px]">
                      {formData.date}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border-[1.5px] border-slate-800 p-3 flex flex-col items-center justify-center min-w-[120px]">
                <span className="font-semibold text-xs mb-1">ගිණුම් අංකය</span>
                <span className="font-bold text-lg text-slate-900">{formData.accountNo}</span>
              </div>
            </div>

            <div className="space-y-4 mb-10 text-sm">
              <div className="flex items-end">
                <span className="font-semibold">තැන්පත් කරුගේ නම:</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-500 ml-2 px-2 text-slate-900 inline-block translate-y-[2px]">
                  {formData.depositorName}
                </span>
              </div>
              <div className="flex items-end">
                <span className="font-semibold">ලිපිනය:</span>
                <span className="flex-1 border-b-2 border-dotted border-slate-500 ml-2 px-2 text-slate-900 inline-block translate-y-[2px]">
                  {formData.address}
                </span>
              </div>
            </div>

            <div className="mb-10 text-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left font-normal pb-2"></th>
                    <th className="border border-slate-800 p-1 w-20 text-center font-bold">රු.</th>
                    <th className="border border-slate-800 p-1 w-16 text-center font-bold">ශත</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold pr-4 py-3 align-bottom">පාස් පොතේ ශේෂය</td>
                    <td className="border border-slate-800 p-2 text-right font-semibold text-slate-900 align-bottom">
                      {formData.oldBalanceRs}
                    </td>
                    <td className="border border-slate-800 p-2 text-center font-semibold text-slate-900 align-bottom">
                      {formData.oldBalanceCts}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 pt-3 pb-1 align-bottom">
                      තැන්පත් කරන ලද මුදල<br/>
                      <span className="text-xs font-normal">(අකුරෙන්)</span>
                      <span className="border-b border-dotted border-slate-500 ml-2 px-2 text-slate-900 inline-block translate-y-[2px] w-64">
                        {formData.amountWords}
                      </span>
                    </td>
                    <td className="border border-slate-800 p-2 text-right font-semibold text-slate-900 align-bottom">
                      {formData.depositRs}
                    </td>
                    <td className="border border-slate-800 p-2 text-center font-semibold text-slate-900 align-bottom">
                      {formData.depositCts}
                    </td>
                  </tr>
                  <tr>
                    <td className="font-semibold pr-4 py-3 align-bottom">පාස්පොතේ සඳහන් ශේෂය</td>
                    <td className="border border-slate-800 p-2 text-right font-bold text-slate-900 align-bottom bg-slate-50">
                      {calculatedNewBalance.rs}
                    </td>
                    <td className="border border-slate-800 p-2 text-center font-bold text-slate-900 align-bottom bg-slate-50">
                      {calculatedNewBalance.cts}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="flex items-end mb-16 text-sm">
              <span className="font-semibold">අත්සන්:</span>
              <span className="flex-1 border-b-2 border-dotted border-slate-500 ml-2 px-2 text-slate-900 inline-block translate-y-[2px]">
                {formData.other}
              </span>
            </div>

            <div className="flex justify-between items-end text-sm font-semibold pt-4">
              <div className="flex flex-col items-center">
                <span>ප්‍රාදේශීය කළමනාකරු</span>
              </div>
              <div className="flex flex-col items-center">
                <span>බලලත්</span>
                <span className="font-normal text-xs mt-1">වෙනත් සේවකයෙකු</span>
              </div>
              <div className="flex flex-col items-center">
                <span>තැන්පත් කරු</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
