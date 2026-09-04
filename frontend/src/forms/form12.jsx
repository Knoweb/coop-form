import React, { useState, useMemo } from 'react';
import { Save, CheckCircle2, Printer } from 'lucide-react';

export default function Form12() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [formData, setFormData] = useState({
    bankName: 'මහජන බැංකුව',
    date: '2023-10-25',
    departureTime: '10:30',
    amountRs: '150000',
    amountCts: '00',
    amountWords: 'එක් ලක්ෂ පනස් දහසක් පමණි',

    // Section 4: Money details
    cashRs: '100000', cashCts: '00',
    chargesRs: '25000', chargesCts: '00',
    refundRs: '25000', refundCts: '00',

    // Section 5-10
    carrierName: 'කේ. ඒ. නිමල්',
    vehicleNo: 'WP AB-1234',
    driverName: 'පී. බන්ඩාර',
    policeNo: '65432',

    // Notes
    notes100Nos: 'A/12 345678',
    notes100Nos2: 'B/45 987654',
    notes10Nos: 'C/12 111111',
    notes10Nos2: 'D/45 222222',

    // Witnesses
    witness1: 'එස්. අමරසිංහ',
    witness1Title: 'කළමනාකරු',
    witness2: 'ඩබ්. ප්‍රනාන්දු',
    witness2Title: 'ලිපිකරු',
  });

  const update = (field, value) => setFormData({ ...formData, [field]: value });

  const totals = useMemo(() => {
    const cashRs = Number(formData.cashRs) || 0;
    const cashCts = Number(formData.cashCts) || 0;
    const chargesRs = Number(formData.chargesRs) || 0;
    const chargesCts = Number(formData.chargesCts) || 0;
    const refundRs = Number(formData.refundRs) || 0;
    const refundCts = Number(formData.refundCts) || 0;

    let totalCts = cashCts + chargesCts + refundCts;
    let totalRs = cashRs + chargesRs + refundRs + Math.floor(totalCts / 100);
    totalCts = totalCts % 100;

    return {
      totalRs: totalRs > 0 ? totalRs : '',
      totalCts: totalRs > 0 || totalCts > 0 ? totalCts.toString().padStart(2, '0') : '',
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

  const inputCls = "border-b border-slate-400 focus:border-blue-500 outline-none bg-transparent w-full text-sm px-1 py-0.5";
  const labelCls = "text-sm font-medium text-slate-700 whitespace-nowrap";
  const printLineCls = "border-b border-black inline-block";

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans print:bg-white print:p-0">
      <div className="max-w-3xl mx-auto space-y-6 print:space-y-0 print:max-w-none">

        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow p-4 flex justify-between items-center print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Form 12</h1>
            <p className="text-sm text-slate-500">බැංකුවට මුදල් යෙනකාමේ විස්තරය (Bank Money Transfer Details)</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => window.print()} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-5 py-2 rounded text-sm font-semibold flex items-center gap-2 h-[40px]">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded text-sm font-semibold flex items-center gap-2 h-[40px] disabled:opacity-50">
              {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>

        {/* Data Entry Form */}
        <div className="bg-white rounded-xl shadow p-6 border border-slate-200 print:hidden">
          <h2 className="text-lg font-bold text-slate-800 mb-5 border-b pb-2">විස්තර ඇතුලත් කරන්න</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">1. බැංකුවේ නම (Bank Name)</label>
              <input type="text" value={formData.bankName} onChange={e => update('bankName', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="eg: BOC - හික්කඩුව" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">2. දිනය (Date)</label>
              <input type="date" value={formData.date} onChange={e => update('date', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">3. පිටත් වූ වේලාව (Departure Time)</label>
              <input type="time" value={formData.departureTime} onChange={e => update('departureTime', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">3. ගෙනයන මුදල් (Amount) - රු</label>
              <input type="number" value={formData.amountRs} onChange={e => update('amountRs', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">ශත (Cents)</label>
              <input type="number" value={formData.amountCts} onChange={e => update('amountCts', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-xs font-semibold text-slate-600 uppercase">මුදල - ශබ්ද (Amount in words)</label>
              <input type="text" value={formData.amountWords} onChange={e => update('amountWords', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" placeholder="රුපියල් ..." />
            </div>
          </div>

          <h3 className="font-semibold text-slate-700 mb-3 border-b pb-1">4. මුදල්මය විස්තර</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">මුදල් (Cash) රු</label>
              <div className="flex gap-2">
                <input type="number" value={formData.cashRs} onChange={e => update('cashRs', e.target.value)} className="border border-slate-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500 w-2/3" placeholder="රු" />
                <input type="number" value={formData.cashCts} onChange={e => update('cashCts', e.target.value)} className="border border-slate-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500 w-1/3" placeholder="ශත" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">චෙක්පත් (Cheques) රු</label>
              <div className="flex gap-2">
                <input type="number" value={formData.chargesRs} onChange={e => update('chargesRs', e.target.value)} className="border border-slate-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500 w-2/3" placeholder="රු" />
                <input type="number" value={formData.chargesCts} onChange={e => update('chargesCts', e.target.value)} className="border border-slate-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500 w-1/3" placeholder="ශත" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600">මුදල් ආනවූ (Change) රු</label>
              <div className="flex gap-2">
                <input type="number" value={formData.refundRs} onChange={e => update('refundRs', e.target.value)} className="border border-slate-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500 w-2/3" placeholder="රු" />
                <input type="number" value={formData.refundCts} onChange={e => update('refundCts', e.target.value)} className="border border-slate-300 rounded px-2 py-2 text-sm focus:outline-none focus:border-blue-500 w-1/3" placeholder="ශත" />
              </div>
            </div>
          </div>
          <div className="bg-slate-50 rounded p-3 mb-6 text-sm">
            <span className="font-semibold text-slate-700">එකතුව (Total): </span>
            <span className="font-bold text-blue-700 text-base">රු. {totals.totalRs || '0'}.{totals.totalCts || '00'}</span>
          </div>

          <table className="w-full text-sm border-collapse mb-4">
            <tbody>
              {[
                ['5. මුදල් ගෙන යන අයගේ නම',       'carrierName', 'text'],
                ['6. මුදල් ගෙන යන අයගේ අත්සන',    null,          null],
                ['7. මුදල් ගෙන රථයේ අංකය',         'vehicleNo',   'text'],
                ['8. රථයේ රියදුරුගේ නම',            'driverName',  'text'],
                ['9. රථයේ රියදුරුගේ අත්සන',        null,          null],
                ['10. පොලිස් භටයාගේ අංකය',         'policeNo',    'text'],
              ].map(([lbl, field, type]) => (
                <tr key={lbl} className="border-b border-slate-200">
                  <td className="py-2 pr-4 text-slate-600 font-medium whitespace-nowrap w-64">{lbl}</td>
                  <td className="py-2">
                    {field
                      ? <input type={type} value={formData[field]} onChange={e => update(field, e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" />
                      : <input type="text" readOnly className="border border-slate-200 rounded px-3 py-1.5 text-sm bg-slate-50 w-full" placeholder="— අත්සන —" />
                    }
                  </td>
                </tr>
              ))}
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 text-slate-600 font-medium">11. රු. 100/- නෝට්ටු සමාහරක අංක</td>
                <td className="py-2 flex flex-col gap-1">
                  <input type="text" value={formData.notes100Nos} onChange={e => update('notes100Nos', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="පේළිය 1" />
                  <input type="text" value={formData.notes100Nos2} onChange={e => update('notes100Nos2', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="පේළිය 2" />
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 text-slate-600 font-medium">12. රු. 10/- නෝට්ටු සමාහරක අංක</td>
                <td className="py-2 flex flex-col gap-1">
                  <input type="text" value={formData.notes10Nos} onChange={e => update('notes10Nos', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="පේළිය 1" />
                  <input type="text" value={formData.notes10Nos2} onChange={e => update('notes10Nos2', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="පේළිය 2" />
                </td>
              </tr>
              <tr className="border-b border-slate-200">
                <td className="py-2 pr-4 text-slate-600 font-medium align-top pt-3">සාක්ෂි 1</td>
                <td className="py-2 flex flex-col gap-1">
                  <input type="text" value={formData.witness1} onChange={e => update('witness1', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="නම" />
                  <input type="text" value={formData.witness1Title} onChange={e => update('witness1Title', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="තනතුර" />
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-slate-600 font-medium align-top pt-3">සාක්ෂි 2</td>
                <td className="py-2 flex flex-col gap-1">
                  <input type="text" value={formData.witness2} onChange={e => update('witness2', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="නම" />
                  <input type="text" value={formData.witness2Title} onChange={e => update('witness2Title', e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 w-full" placeholder="තනතුර" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ===== PRINTABLE FORM ===== */}
        <div className="bg-white shadow print:shadow-none print:p-0">
          <div className="relative p-8 print:p-6 font-serif text-black" style={{ minHeight: '297mm' }}>

            {/* Top header: bank name line + F12 + title */}
            <div className="flex items-end justify-between mb-5">
              <div className="flex items-end gap-1 flex-1 mr-4">
                <span className="border-b border-black flex-1 inline-block pb-0.5 text-sm">{formData.bankName}</span>
              </div>
              <div className="text-right">
                <div className="absolute top-4 right-6 text-sm font-bold">F 12</div>
                <span className="text-base font-bold tracking-wide">බැංකුවට මුදල් යෙනකාමේ විස්තරය</span>
              </div>
            </div>

            <div className="space-y-3 text-sm">

              {/* 1. Date */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>1. දිනය</span>
                <span className={`${printLineCls} flex-1`}>{formData.date}</span>
              </div>

              {/* 2. Departure Time */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>2. පිටත් වූ වේලාව</span>
                <span className={`${printLineCls} flex-1`}>{formData.departureTime}</span>
              </div>

              {/* Fields 3 & 4: shared CSS grid [label 1fr] [රු 10rem] [ශත 6rem] */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 10rem 6rem', rowGap: '6px', columnGap: '6px', alignItems: 'end' }}>

                {/* Field 3 row 1 */}
                <div className="flex items-end gap-1">
                  <span className={labelCls + " whitespace-nowrap"}>3. ගෙනයන මුදල් ප්‍රමාණය :-</span>
                  <span className={`${printLineCls} flex-1`}></span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs whitespace-nowrap">රුපියල්</span>
                  <span className={`${printLineCls} flex-1`}>{formData.amountRs}</span>
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-xs whitespace-nowrap">ශත</span>
                  <span className={`${printLineCls} flex-1`}>{formData.amountCts}</span>
                </div>

                {/* Field 3 row 2: words */}
                <span></span>
                <div className="flex items-end gap-1" style={{ gridColumn: '2 / 4' }}>
                  <span className="text-xs whitespace-nowrap">(රුපියල්</span>
                  <span className={`${printLineCls} flex-1`}>{formData.amountWords}</span>
                  <span className="text-xs whitespace-nowrap">ශත)</span>
                  <span className={`${printLineCls} w-16`}></span>
                </div>

                {/* Spacer row */}
                <div style={{ gridColumn: '1 / 4', height: '6px' }}></div>

                {/* Field 4 header */}
                <span className="font-semibold" style={{ gridColumn: '1 / 4' }}>4. මුදල්මය විස්තර:-</span>

                {/* Field 4 items */}
                {[
                  { label: 'මුදල්',       rs: formData.cashRs,    cts: formData.cashCts },
                  { label: 'චෙක්පත්',    rs: formData.chargesRs, cts: formData.chargesCts },
                  { label: 'මුදල් ආනවූ', rs: formData.refundRs,  cts: formData.refundCts },
                ].map(({ label, rs, cts }) => (
                  <React.Fragment key={label}>
                    <span className="text-xs text-right">{label}</span>
                    <span className={`${printLineCls}`}>{rs || ''}</span>
                    <span className={`${printLineCls}`}>{rs ? (cts || '00').toString().padStart(2, '0') : ''}</span>
                  </React.Fragment>
                ))}

                {/* සංකාව with top border */}
                <span className="text-xs font-bold text-right">එකතුව</span>
                <span className={`${printLineCls} font-bold`}>{totals.totalRs || ''}</span>
                <span className={`${printLineCls} font-bold`}>{totals.totalRs ? totals.totalCts : ''}</span>

              </div>{/* end grid */}

              {/* 5. Name */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>5. මුදල් ගෙන යන අයගේ නම</span>
                <span className={`${printLineCls} flex-1`}>{formData.carrierName}</span>
              </div>
              {/* 6. Signature */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>6. මුදල් ගෙන යන අයගේ අත්සන</span>
                <span className={`${printLineCls} flex-1`}></span>
              </div>
              {/* 7. Vehicle no */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>7. මුදල් ගෙන රථයේ අංකය</span>
                <span className={`${printLineCls} flex-1`}>{formData.vehicleNo}</span>
              </div>
              {/* 8. Driver name */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>8. මුදල් ගෙන යන රථයේ රියදුරුගේ නම</span>
                <span className={`${printLineCls} flex-1`}>{formData.driverName}</span>
              </div>
              {/* 9. Driver signature */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>9. මුදල් ගෙන යන රථයේ රියදුරුගේ අත්සන</span>
                <span className={`${printLineCls} flex-1`}></span>
              </div>
              {/* 10. Police */}
              <div className="flex items-end gap-2">
                <span className={labelCls}>10. පොලිස් භටයාගේ අංකය</span>
                <span className={`${printLineCls} flex-1`}>{formData.policeNo}</span>
              </div>
              {/* 11. 100/- notes - 2 lines */}
              <div className="space-y-1">
                <div className="flex items-end gap-2">
                  <span className={labelCls}>11. ගෙන යන රු. 100/- නොට්ටු සමාහරක අංක</span>
                  <span className={`${printLineCls} flex-1`}>{formData.notes100Nos}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="flex-1"></span>
                  <span className={`${printLineCls} flex-1`}>{formData.notes100Nos2}</span>
                </div>
              </div>
              {/* 12. 10/- notes - 2 lines */}
              <div className="space-y-1">
                <div className="flex items-end gap-2">
                  <span className={labelCls}>12. ගෙන යන රු. 10/- නොට්ටු සමාහරක අංක</span>
                  <span className={`${printLineCls} flex-1`}>{formData.notes10Nos}</span>
                </div>
                <div className="flex items-end gap-2">
                  <span className="flex-1"></span>
                  <span className={`${printLineCls} flex-1`}>{formData.notes10Nos2}</span>
                </div>
              </div>

              {/* Statement */}
              <div className="mt-4 text-sm">මෙම මුදල් මා ඉදිරියේ බැංකුවට ගෙන යන ලදී.</div>

              {/* Witnesses */}
              <div className="mt-6 grid grid-cols-2 gap-12">
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-end gap-2 w-full mb-1">
                    <span className="font-semibold text-sm whitespace-nowrap">සාක්ෂි 1</span>
                    <span className={`${printLineCls} flex-1`}>{formData.witness1}</span>
                  </div>
                  <span className="text-xs text-center w-full pl-12">තනතුර</span>
                </div>
                <div className="flex flex-col items-center w-full">
                  <div className="flex items-end gap-2 w-full mb-1">
                    <span className="font-semibold text-sm whitespace-nowrap">   2</span>
                    <span className={`${printLineCls} flex-1`}>{formData.witness2}</span>
                  </div>
                  <span className="text-xs text-center w-full pl-8">තනතුර</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
