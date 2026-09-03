import React, { useState, useEffect } from 'react';
import { Save, Building2, Calendar, FileText, CheckCircle2 } from 'lucide-react';

const RECEIPT_DESCRIPTIONS = [
  "ණය අයකිරීම",
  "පාරි: අයකිරීම ගෙනයාම",
  "උකස් බඩු ඇප අයකිරීම",
  "ළමා අරමුදල් අයකිරීම",
  "සාමාජික ඉතුරුම්/රක්ෂණ",
  "එම ස්ථිර තැන්පතු",
  "සාමාජික තැන්පතු",
  "ඉතුරු තැන්පතු",
  "එම ස්ථිර තැන්පතු",
  "නිවාස ණය/සුළු ණය",
  "කාන්තා/ගෘහ මූලික",
  "අගනුවර ණය ගෙවීම",
  "එම ලිපි ද්‍රව්‍ය",
  "අතිවිශේෂ ණය/අත්:",
  "පොලිය (මූල්‍ය)",
  "මිලට ගත් ද්‍රව්‍ය",
  "වෙනත් ලැබීම්",
  "වෙනත් ලැබීම්",
  "වෙනත් ලැබීම්",
  "පෙර දිනට ශේෂය",
  "මුළු එකතුව"
];

const PAYMENT_DESCRIPTIONS = [
  "තැන්පතු ගෙවීම්/ගෙනයාම",
  "සාමාජික ඉතුරුම් අ/ග",
  "එම ස්ථිර තැන්පතු",
  "සාමාජික ගෙවීම්",
  "ඉතුරුම් / තැන්පත්",
  "එම ස්ථිර තැන්පත්",
  "උකස් බඩු අත්තිකාරම්",
  "බැංකු/ව්‍යාපාරික/ගිණුම්",
  "රක්ෂණ ගෙවීම් ස්ථිර හා",
  "ණය ගිණුම් අ/ග",
  "එම ලිපි ද්‍රව්‍ය",
  "කාන්තා ගමන් වියදම් හා",
  "ප්‍රවාහන",
  "එම ගමන් වියදම්",
  "මුද්දර ගාස්තු",
  "ලිපිද්‍රව්‍ය අත්තිකාරම්",
  "අ/ව: ගිණුම් අ/ග ලැබීම්",
  "යැවී චෙක්",
  "වෙනත් ගෙවීම්",
  "මිලට ගත් ද්‍රව්‍ය",
  "අද දිනට ශේෂය",
  "මුළු එකතුව"
];

const MAX_ROWS = Math.max(RECEIPT_DESCRIPTIONS.length, PAYMENT_DESCRIPTIONS.length);

const createEmptyItem = (side, description) => ({
  side,
  description,
  broughtForwardTransfers: '',
  broughtForwardCash: '',
  folio: '',
  itemDate: '',
  refNo: '',
  todayTransfers: '',
  todayCash: '',
  totalTransfers: '',
  totalCash: ''
});

export default function Form9E() {
  const [societyName, setSocietyName] = useState('');
  const [date, setDate] = useState('');
  const [receipts, setReceipts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Initialize state
    const initialReceipts = Array(MAX_ROWS).fill(null).map((_, i) => createEmptyItem('RECEIPT', RECEIPT_DESCRIPTIONS[i] || ''));
    const initialPayments = Array(MAX_ROWS).fill(null).map((_, i) => createEmptyItem('PAYMENT', PAYMENT_DESCRIPTIONS[i] || ''));
    setReceipts(initialReceipts);
    setPayments(initialPayments);
  }, []);

  const handleInputChange = (side, index, field, value) => {
    if (side === 'RECEIPT') {
      const newReceipts = [...receipts];
      newReceipts[index][field] = value;
      setReceipts(newReceipts);
    } else {
      const newPayments = [...payments];
      newPayments[index][field] = value;
      setPayments(newPayments);
    }
  };

  const handleSave = async () => {
    if (!societyName || !date) {
      alert('Please fill in the Society Name and Date before saving.');
      return;
    }
    
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const payload = {
        societyName,
        date,
        items: [...receipts, ...payments].filter(item => item.description !== '')
      };

      const response = await fetch('http://localhost:8080/api/form9e-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert('Failed to save. Make sure the backend is running.');
      }
    } catch (error) {
      console.error(error);
      alert('Network error while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  const renderInput = (side, index, field, width = "w-16") => {
    const item = side === 'RECEIPT' ? receipts[index] : payments[index];
    if (!item || !item.description) return null;
    
    const type = (field === 'folio' || field === 'refNo' || field === 'itemDate') ? 'text' : 'number';
    
    return (
      <input
        type={type}
        step={type === 'number' ? '0.01' : undefined}
        value={item[field]}
        onChange={(e) => handleInputChange(side, index, field, e.target.value)}
        className={`${width} px-1 py-1 text-xs border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 outline-none`}
      />
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans">
      <div className="max-w-[1900px] mx-auto space-y-4">
        
        {/* Header */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Form 9 E (ගැලපීම් මුදල් පොත)</h1>
            <p className="text-sm text-slate-500">Reconciliation Cash Book</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1"><Building2 className="w-3 h-3"/> Society Name (සමිතිය)</label>
              <input type="text" value={societyName} onChange={(e) => setSocietyName(e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm w-full sm:w-64" placeholder="Enter society..." />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1"><Calendar className="w-3 h-3"/> Date (දිනය)</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm w-full sm:w-40" />
            </div>
            <div className="flex items-end">
              <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 h-[34px]">
                {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Book'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Table - Landscape Scrollable */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1500px]">
              <thead>
                {/* Super Header */}
                <tr>
                  <th colSpan="10" className="border border-slate-300 bg-emerald-50 py-2 text-center text-emerald-800 font-bold text-lg uppercase tracking-widest relative">
                    <span className="absolute left-4 top-2 text-xs opacity-50 font-normal">RECEIPTS</span>
                    ලැබීම්
                  </th>
                  <th colSpan="10" className="border border-slate-300 bg-rose-50 py-2 text-center text-rose-800 font-bold text-lg uppercase tracking-widest relative">
                    <span className="absolute right-4 top-2 text-xs opacity-50 font-normal">PAYMENTS</span>
                    ගෙවීම්
                  </th>
                </tr>
                
                {/* Group Header */}
                <tr className="bg-slate-100 text-xs text-slate-600 text-center">
                  <th colSpan="2" className="border border-slate-300 py-1">පෙර දිනට</th>
                  <th rowSpan="2" className="border border-slate-300 py-1 px-2 w-48">විස්තරය (Description)</th>
                  <th rowSpan="2" className="border border-slate-300 py-1 px-1">ප/අ</th>
                  <th rowSpan="2" className="border border-slate-300 py-1 px-1">දිනය</th>
                  <th rowSpan="2" className="border border-slate-300 py-1 px-1">රිසිට් අංකය</th>
                  <th colSpan="2" className="border border-slate-300 py-1">අද දින එකතුව</th>
                  <th colSpan="2" className="border border-slate-300 py-1">අදට මුළු එකතුව</th>
                  
                  <th rowSpan="2" className="border border-slate-300 py-1 px-2 w-48">විස්තරය (Description)</th>
                  <th rowSpan="2" className="border border-slate-300 py-1 px-1">ප/අ</th>
                  <th rowSpan="2" className="border border-slate-300 py-1 px-1">දිනය</th>
                  <th rowSpan="2" className="border border-slate-300 py-1 px-1">වවුචර් අංකය</th>
                  <th colSpan="2" className="border border-slate-300 py-1">පෙර දිනට</th>
                  <th colSpan="2" className="border border-slate-300 py-1">අද දින ගෙවීම්</th>
                  <th colSpan="2" className="border border-slate-300 py-1">අදට මුළු එකතුව</th>
                </tr>
                
                {/* Column Headers */}
                <tr className="bg-slate-50 text-[10px] text-slate-500 text-center">
                  <th className="border border-slate-300 py-1 w-16">(1) පැවරුම්</th>
                  <th className="border border-slate-300 py-1 w-16">(2) මුදල්</th>
                  <th className="border border-slate-300 py-1 w-16">(7) පැවරුම්</th>
                  <th className="border border-slate-300 py-1 w-16">(8) මුදල්</th>
                  <th className="border border-slate-300 py-1 w-16 bg-emerald-50/50">(9) පැවරුම්</th>
                  <th className="border border-slate-300 py-1 w-16 bg-emerald-50/50">(10) මුදල්</th>
                  
                  <th className="border border-slate-300 py-1 w-16">(15) පැවරුම්</th>
                  <th className="border border-slate-300 py-1 w-16">(16) මුදල්</th>
                  <th className="border border-slate-300 py-1 w-16">(17) පැවරුම්</th>
                  <th className="border border-slate-300 py-1 w-16">(18) මුදල්</th>
                  <th className="border border-slate-300 py-1 w-16 bg-rose-50/50">(19) පැවරුම්</th>
                  <th className="border border-slate-300 py-1 w-16 bg-rose-50/50">(20) මුදල්</th>
                </tr>
              </thead>
              
              <tbody>
                {receipts.length > 0 && Array(MAX_ROWS).fill(null).map((_, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    {/* LEFT SIDE: RECEIPTS */}
                    <td className="border border-slate-300 px-1 py-1">{renderInput('RECEIPT', i, 'broughtForwardTransfers')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('RECEIPT', i, 'broughtForwardCash')}</td>
                    <td className="border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700">{receipts[i]?.description}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('RECEIPT', i, 'folio', 'w-10')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('RECEIPT', i, 'itemDate', 'w-12')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('RECEIPT', i, 'refNo', 'w-14')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('RECEIPT', i, 'todayTransfers')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('RECEIPT', i, 'todayCash')}</td>
                    <td className="border border-slate-300 px-1 py-1 bg-emerald-50/30">{renderInput('RECEIPT', i, 'totalTransfers')}</td>
                    <td className="border border-slate-300 px-1 py-1 bg-emerald-50/30">{renderInput('RECEIPT', i, 'totalCash')}</td>

                    {/* RIGHT SIDE: PAYMENTS */}
                    <td className="border border-slate-300 px-2 py-1 text-xs font-semibold text-slate-700">{payments[i]?.description}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('PAYMENT', i, 'folio', 'w-10')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('PAYMENT', i, 'itemDate', 'w-12')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('PAYMENT', i, 'refNo', 'w-14')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('PAYMENT', i, 'broughtForwardTransfers')}</td>
                    <td className="border border-slate-300 px-1 py-1">{renderInput('PAYMENT', i, 'broughtForwardCash')}</td>
                    <td className="border border-slate-300 px-1 py-1 bg-slate-50">{renderInput('PAYMENT', i, 'todayTransfers')}</td>
                    <td className="border border-slate-300 px-1 py-1 bg-slate-50">{renderInput('PAYMENT', i, 'todayCash')}</td>
                    <td className="border border-slate-300 px-1 py-1 bg-rose-50/30">{renderInput('PAYMENT', i, 'totalTransfers')}</td>
                    <td className="border border-slate-300 px-1 py-1 bg-rose-50/30">{renderInput('PAYMENT', i, 'totalCash')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
}
