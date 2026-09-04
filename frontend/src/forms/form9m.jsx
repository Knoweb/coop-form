import React, { useState, useEffect } from 'react';
import { Save, Building2, Calendar, CheckCircle2 } from 'lucide-react';

export default function Form9M() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Supplier Tab State
  const [supplierData, setSupplierData] = useState({
    societyName: '',
    startDate: '',
    endDate: '',
    name: '',
    supplyNo: '',
    subNo: '',
    address: '',
    records: Array(15).fill(null).map((_, i) => ({
      day: i + 1,
      morningBillNo: '', morningPints: '',
      eveningBillNo: '', eveningPints: '',
      returnedBillNo: '', returnedPints: ''
    })),
    summary: {
      morning: '',
      evening: '',
      total: '',
      returned: '',
      balance: '',
      rate: '',
      value: ''
    }
  });

  // Daily Tab State
  const [dailyData, setDailyData] = useState({
    societyName: '',
    month: '',
    startDate: '',
    endDate: '',
    members: Array(10).fill(null).map((_, i) => ({
      memberNo: '',
      days: Array(15).fill(null).map(() => ({ morning: '', evening: '', returned: '' })),
      total15: { morning: '', evening: '', returned: '', totalPints: '' }
    }))
  });

  useEffect(() => {
    // Populate dummy data on load
    const generateRandomAmount = (max) => (Math.random() * max).toFixed(2);

    // Dummy Supplier Data
    setSupplierData(prev => {
      let totalMorning = 0;
      let totalEvening = 0;
      let totalReturned = 0;

      const newRecords = prev.records.map((r, i) => {
        const mPints = parseFloat(generateRandomAmount(10));
        const ePints = parseFloat(generateRandomAmount(8));
        const retPints = Math.random() > 0.8 ? parseFloat(generateRandomAmount(2)) : 0;
        
        totalMorning += mPints;
        totalEvening += ePints;
        totalReturned += retPints;

        return {
          day: i + 1,
          morningBillNo: `MB-${1000 + i}`, morningPints: mPints.toFixed(2),
          eveningBillNo: `EB-${2000 + i}`, eveningPints: ePints.toFixed(2),
          returnedBillNo: retPints > 0 ? `RB-${3000 + i}` : '', returnedPints: retPints > 0 ? retPints.toFixed(2) : ''
        };
      });

      const totalProvided = totalMorning + totalEvening;
      const balanceAmt = totalProvided - totalReturned;
      const rateAmt = 120;
      const valueAmt = balanceAmt * rateAmt;

      return {
        societyName: 'හික්කඩුව සමූපකාර සමිතිය',
        startDate: '2023-11-01',
        endDate: '2023-11-15',
        name: 'ඒ. බී. පෙරේරා',
        supplyNo: 'MS-502',
        subNo: '01',
        address: 'නො. 15, ගාලු පාර, හික්කඩුව',
        records: newRecords,
        summary: {
          morning: totalMorning.toFixed(2),
          evening: totalEvening.toFixed(2),
          total: totalProvided.toFixed(2),
          returned: totalReturned.toFixed(2),
          balance: balanceAmt.toFixed(2),
          rate: rateAmt.toFixed(2),
          value: valueAmt.toFixed(2)
        }
      };
    });

    // Dummy Daily Data
    setDailyData(prev => {
      const newMembers = prev.members.map((m, i) => {
        let tm = 0, te = 0, tr = 0;
        const newDays = m.days.map(() => {
          const mP = parseFloat(generateRandomAmount(15));
          const eP = parseFloat(generateRandomAmount(10));
          const rP = Math.random() > 0.8 ? parseFloat(generateRandomAmount(2)) : 0;
          tm += mP; te += eP; tr += rP;
          return { morning: mP.toFixed(1), evening: eP.toFixed(1), returned: rP > 0 ? rP.toFixed(1) : '' };
        });
        
        const netTotal = tm + te - tr;
        return {
          memberNo: `M-${101 + i}`,
          days: newDays,
          total15: {
            morning: tm.toFixed(1),
            evening: te.toFixed(1),
            returned: tr > 0 ? tr.toFixed(1) : '',
            totalPints: netTotal.toFixed(1)
          }
        };
      });

      return {
        societyName: 'හික්කඩුව සමූපකාර සමිතිය',
        month: '2023-11',
        startDate: '2023-11-01',
        endDate: '2023-11-15',
        members: newMembers
      };
    });
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const renderSupplierTab = () => (
    <div className="space-y-6">
      {/* Supplier Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 uppercase">නම (Name)</label>
          <input type="text" value={supplierData.name} onChange={(e) => setSupplierData({...supplierData, name: e.target.value})} className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-semibold text-slate-600 uppercase">කිරි සැපයුම් අංකය</label>
            <input type="text" value={supplierData.supplyNo} onChange={(e) => setSupplierData({...supplierData, supplyNo: e.target.value})} className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
          </div>
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs font-semibold text-slate-600 uppercase">අනු අංකය</label>
            <input type="text" value={supplierData.subNo} onChange={(e) => setSupplierData({...supplierData, subNo: e.target.value})} className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
          </div>
        </div>
        <div className="flex flex-col gap-1 md:col-span-2">
          <label className="text-xs font-semibold text-slate-600 uppercase">ලිපිනය (Address)</label>
          <input type="text" value={supplierData.address} onChange={(e) => setSupplierData({...supplierData, address: e.target.value})} className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Main Table */}
        <div className="w-full overflow-x-auto bg-white rounded-xl shadow border border-slate-200">
          <table className="w-full text-center border-collapse text-sm">
            <thead className="bg-slate-50 text-slate-700">
              <tr>
                <th rowSpan="2" className="border border-slate-300 p-2">දින</th>
                <th colSpan="2" className="border border-slate-300 p-2">උදේ වරුව</th>
                <th colSpan="2" className="border border-slate-300 p-2">සවස වරුව</th>
                <th colSpan="2" className="border border-slate-300 p-2">නරක්වී ආපසු භාරදුන්</th>
                <th rowSpan="2" className="border border-slate-300 p-2 w-80">කාර්යාලයේ ප්‍රයෝජනය සඳහා පමණයි</th>
              </tr>
              <tr className="text-xs">
                <th className="border border-slate-300 p-1 font-medium">බිල් අංකය</th>
                <th className="border border-slate-300 p-1 font-medium">පයින්ට්</th>
                <th className="border border-slate-300 p-1 font-medium">බිල් අංකය</th>
                <th className="border border-slate-300 p-1 font-medium">පයින්ට්</th>
                <th className="border border-slate-300 p-1 font-medium">බිල් අංකය</th>
                <th className="border border-slate-300 p-1 font-medium">පයින්ට්</th>
              </tr>
            </thead>
            <tbody>
              {supplierData.records.map((r, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="border border-slate-300 p-1 font-semibold">{r.day}</td>
                  <td className="border border-slate-300 p-1"><input type="text" className="w-16 outline-none bg-transparent text-center" value={r.morningBillNo} readOnly /></td>
                  <td className="border border-slate-300 p-1"><input type="text" className="w-16 outline-none bg-transparent text-center" value={r.morningPints} readOnly /></td>
                  <td className="border border-slate-300 p-1"><input type="text" className="w-16 outline-none bg-transparent text-center" value={r.eveningBillNo} readOnly /></td>
                  <td className="border border-slate-300 p-1"><input type="text" className="w-16 outline-none bg-transparent text-center" value={r.eveningPints} readOnly /></td>
                  <td className="border border-slate-300 p-1"><input type="text" className="w-16 outline-none bg-transparent text-center" value={r.returnedBillNo} readOnly /></td>
                  <td className="border border-slate-300 p-1"><input type="text" className="w-16 outline-none bg-transparent text-center" value={r.returnedPints} readOnly /></td>
                  {i === 0 && (
                    <td rowSpan="16" className="border border-slate-300 p-4 align-top text-left bg-slate-50 w-80">
                       <div className="flex flex-col h-full justify-between">
                         <div className="space-y-3 text-sm">
                           <div className="pb-1">
                             <span className="text-slate-800 font-bold">ලැබුණු කිරි පයින්ට්</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-1 pl-4">
                             <span className="text-slate-600">උදේ</span>
                             <span className="font-semibold">{supplierData.summary.morning}</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-1 pl-4">
                             <span className="text-slate-600">සවස</span>
                             <span className="font-semibold">{supplierData.summary.evening}</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-1">
                             <span className="text-slate-600 font-bold">එකතුව</span>
                             <span className="font-bold">{supplierData.summary.total}</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-1">
                             <span className="text-slate-600">ආපසු භාරදුන්</span>
                             <span className="font-semibold text-red-600">({supplierData.summary.returned})</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-1">
                             <span className="text-slate-600 font-bold">ඉතිරිය</span>
                             <span className="font-bold">{supplierData.summary.balance}</span>
                           </div>
                           <div className="flex justify-between border-b border-slate-200 pb-1">
                             <span className="text-slate-600">බැගින්</span>
                             <span className="font-semibold">{supplierData.summary.rate}</span>
                           </div>
                           <div className="flex justify-between border-b-2 border-slate-800 pb-1 pt-2">
                             <span className="text-slate-800 font-bold text-base">වටිනාකම</span>
                             <span className="font-bold text-base text-blue-800">{supplierData.summary.value}</span>
                           </div>
                         </div>
                         
                         <div className="mt-8 space-y-6 text-xs text-slate-600 font-medium">
                           <div>
                             <p className="mb-4">මෙම සටහන් පරීක්ෂා කළ බවත් නිවැරදි<br/>බවත් සහතික කරමි.</p>
                             <div className="flex justify-between">
                               <div>දිනය....................</div>
                               <div className="text-center">....................<br/>ලිපිකරු</div>
                             </div>
                           </div>
                           <div>
                             <p className="mb-4">පුද්ගලික ලෙජරයේ පිටුව<br/>සටහන් කළ බව</p>
                             <div className="flex justify-between">
                               <div>දිනය....................</div>
                               <div className="text-center">....................<br/>ලිපිකරු</div>
                             </div>
                           </div>
                         </div>
                       </div>
                    </td>
                  )}
                </tr>
              ))}
              <tr className="bg-slate-100 font-bold">
                <td className="border border-slate-300 p-2">එකතුව</td>
                <td className="border border-slate-300 p-2"></td>
                <td className="border border-slate-300 p-2 text-blue-700">{supplierData.records.reduce((acc, curr) => acc + Number(curr.morningPints), 0).toFixed(2)}</td>
                <td className="border border-slate-300 p-2"></td>
                <td className="border border-slate-300 p-2 text-blue-700">{supplierData.records.reduce((acc, curr) => acc + Number(curr.eveningPints), 0).toFixed(2)}</td>
                <td className="border border-slate-300 p-2"></td>
                <td className="border border-slate-300 p-2 text-red-600">{supplierData.records.reduce((acc, curr) => acc + Number(curr.returnedPints), 0).toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <p className="font-medium text-slate-700">මෙයින් මෙම කර ඇති සටහන් නිවැරදි බවට සහතික කරමි.</p>
        <div className="flex gap-8">
           <div>දිනය: ...........................</div>
           <div className="text-center">....................................<br/>කිරි සපයන්නා</div>
        </div>
      </div>
    </div>
  );

  const renderDailyTab = () => (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white rounded-xl shadow border border-slate-200">
        <table className="w-full text-center border-collapse text-[11px] whitespace-nowrap">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th rowSpan="2" className="border border-slate-300 p-2 sticky left-0 bg-slate-100 w-24 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] z-10">සාමාජික අංකය</th>
              {Array(15).fill(null).map((_, i) => (
                <th key={i} colSpan="3" className="border border-slate-300 p-1">{i + 1}</th>
              ))}
              <th colSpan="4" className="border border-slate-300 p-1 bg-blue-50">15 එකතුව</th>
            </tr>
            <tr>
              {Array(15).fill(null).map((_, i) => (
                <React.Fragment key={i}>
                  <th className="border border-slate-300 p-1 font-medium w-8 text-slate-500">උ</th>
                  <th className="border border-slate-300 p-1 font-medium w-8 text-slate-500">ස</th>
                  <th className="border border-slate-300 p-1 font-medium w-10 text-slate-700 leading-tight">ආ<br/>පසු</th>
                </React.Fragment>
              ))}
              <th className="border border-slate-300 p-1 font-bold bg-blue-50">උ</th>
              <th className="border border-slate-300 p-1 font-bold bg-blue-50">ස</th>
              <th className="border border-slate-300 p-1 font-bold bg-blue-50 leading-tight">ආ<br/>පසු</th>
              <th className="border border-slate-300 p-1 font-bold bg-blue-50">එ.ප</th>
            </tr>
          </thead>
          <tbody>
            {dailyData.members.map((m, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="border border-slate-300 p-2 sticky left-0 bg-white font-semibold shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] z-10">{m.memberNo}</td>
                {m.days.map((d, di) => (
                  <React.Fragment key={di}>
                    <td className="border border-slate-300 p-1 text-slate-500">{d.morning}</td>
                    <td className="border border-slate-300 p-1 text-slate-500">{d.evening}</td>
                    <td className="border border-slate-300 p-1 font-medium text-red-600 bg-slate-50/50">{d.returned}</td>
                  </React.Fragment>
                ))}
                <td className="border border-slate-300 p-1 bg-blue-50/50">{m.total15.morning}</td>
                <td className="border border-slate-300 p-1 bg-blue-50/50">{m.total15.evening}</td>
                <td className="border border-slate-300 p-1 bg-red-50 font-bold text-red-600">{m.total15.returned}</td>
                <td className="border border-slate-300 p-1 bg-emerald-50 font-bold text-emerald-700">{m.total15.totalPints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      <div className="max-w-[1900px] mx-auto space-y-4">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Form 9 M</h1>
            <p className="text-sm text-slate-500">Milk Supply Records</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto flex-wrap">
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
              <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1"><Building2 className="w-3 h-3"/> Society Name (සමිතිය)</label>
              <input type="text" value={supplierData.societyName} onChange={() => {}} className="border border-slate-300 rounded px-3 py-1.5 text-sm w-full" readOnly />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> Month (මාසය)</label>
              <input type="month" value={dailyData.month} onChange={(e) => setDailyData({...dailyData, month: e.target.value})} className="border border-slate-300 rounded px-3 py-1.5 text-sm w-full sm:w-40" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> From (සිට)</label>
              <input type="date" value={supplierData.startDate} onChange={() => {}} className="border border-slate-300 rounded px-3 py-1.5 text-sm w-full sm:w-36" readOnly />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> To (දක්වා)</label>
              <input type="date" value={supplierData.endDate} onChange={() => {}} className="border border-slate-300 rounded px-3 py-1.5 text-sm w-full sm:w-36" readOnly />
            </div>
            <div className="flex items-end">
              <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 h-[34px] w-full sm:w-auto justify-center">
                {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save'}
              </button>
            </div>
          </div>
        </div>

        {/* Forms Container */}
        <div className="space-y-12 pb-12">
          {/* Supplier Record Form */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200">කිරි සැපයුම් සටහන (Supplier Record)</h2>
            {renderSupplierTab()}
          </div>

          {/* Daily Collection Form */}
          <div>
            <h2 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-200 mt-12">කිරි එකතු කිරීමේ දෛනික සටහන (Daily Collection)</h2>
            {renderDailyTab()}
          </div>
        </div>
        
      </div>
    </div>
  );
}
