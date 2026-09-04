import React, { useState, useEffect } from 'react';
import { Save, Building2, Calendar, FileText, CheckCircle2 } from 'lucide-react';

const RECEIPT_DESCRIPTIONS = [
  "ණය අයවීම",
  "පොලී අයවීම කො.ණය",
  "උකස් බඩු ණය බේරීම",
  "එම පොලී අයවීම",
  "සාමාජික ඉතුරුම් තැන්පතු",
  "එම ස්ථිර තැන්පතු",
  "සාමාජික තැන්පතු",
  "ඉතුරුම් තැන්පතු",
  "එම ස්ථිර තැන්පතු",
  "මහජන බැංකුවෙන්",
  "කාර්යාලයෙන් අත්ති:",
  "අයකළ තැ: ගාස්තු",
  "එම ලිපි ද්‍රව්‍ය",
  "අවිනිශ්චිත ගිණුම් අය",
  "කොමිස් (මිශ්‍ර)",
  "මිලට ගත් බිල්පත්",
  "වෙනත් ලැබීම්",
  "වෙනත් ලැබීම්",
  "වෙනත් ලැබීම්",
  "පෙර දිනට ශේෂය",
  "",
  "",
  "මුළු එකතුව"
];

const PAYMENT_DESCRIPTIONS = [
  "ණයදීම් කෙටිකාලීන",
  "සාමාජික ඉතුරු තැ/",
  "එම ස්ථිර තැන්පතු",
  "සාමාජික නොවන",
  "ඉතුරු/ තැන්පත්",
  "එම ස්ථිර තැන්පත්",
  "උකස් බඩු අත්තිකාරම්",
  "බැංකුවට/ කාර්යාලයට",
  "පොලී ගෙවීම් ස්ථිර තැ",
  "වැය ගිණුම් තැ/හා",
  "එම ලිපි ද්රව්ය",
  "එම ගමන් වියදම් හා ප්රවාහන",
  "එම මිශ්ර වියදම්",
  "මුද්දර ගිණුම",
  "ලිපිද්රව්ය අවිනිශ්චිත",
  "අව: ගිණුම් අය ලැබීම්",
  "යැවි චෙක්",
  "වෙනත් ගෙවීම්",
  "මිලට ගත් බිල්පත්",
  "අද දිනට ශේෂය",
  "",
  "",
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
  const [remainingBalance, setRemainingBalance] = useState('');
  const [receipts, setReceipts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    // Initialize state with dummy data
    const generateRandomAmount = (max) => (Math.random() * max).toFixed(2);
    
    const initialReceipts = Array(MAX_ROWS).fill(null).map((_, i) => {
      const desc = RECEIPT_DESCRIPTIONS[i] || '';
      if (!desc || desc === '' || desc === 'මුළු එකතුව' || desc === 'පෙර දිනට ශේෂය') {
         return createEmptyItem('RECEIPT', desc);
      }
      return {
        side: 'RECEIPT',
        description: desc,
        folio: `R${i + 1}`,
        itemDate: '10/15',
        refNo: `RC-${1000 + i}`,
        broughtForwardTransfers: generateRandomAmount(1000),
        broughtForwardCash: generateRandomAmount(500),
        todayTransfers: generateRandomAmount(200),
        todayCash: generateRandomAmount(100),
        totalTransfers: generateRandomAmount(1200),
        totalCash: generateRandomAmount(600)
      };
    });

    const initialPayments = Array(MAX_ROWS).fill(null).map((_, i) => {
      const desc = PAYMENT_DESCRIPTIONS[i] || '';
      if (!desc || desc === '' || desc === 'මුළු එකතුව' || desc === 'අද දිනට ශේෂය') {
         return createEmptyItem('PAYMENT', desc);
      }
      return {
        side: 'PAYMENT',
        description: desc,
        folio: `P${i + 1}`,
        itemDate: '10/15',
        refNo: `PV-${2000 + i}`,
        broughtForwardTransfers: generateRandomAmount(1000),
        broughtForwardCash: generateRandomAmount(500),
        todayTransfers: generateRandomAmount(200),
        todayCash: generateRandomAmount(100),
        totalTransfers: generateRandomAmount(1200),
        totalCash: generateRandomAmount(600)
      };
    });

    setSocietyName('හික්කඩුව සමූපකාර සමිතිය');
    setDate('2023-10-15');
    setRemainingBalance('45500.00');
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
        remainingBalance,
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
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase flex items-center gap-1"><FileText className="w-3 h-3"/> Remaining Bal. (ඉතිරි මුදල)</label>
              <input type="text" value={remainingBalance} onChange={(e) => setRemainingBalance(e.target.value)} className="border border-slate-300 rounded px-3 py-1.5 text-sm w-full sm:w-32" placeholder="0.00" />
            </div>
            <div className="flex items-end">
              <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-1.5 rounded text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 h-[34px]">
                {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save Book'}
              </button>
            </div>
          </div>
        </div>

        {/* Data Entry Form */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-4">දත්ත ඇතුළත් කිරීම (Data Entry)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
               <label className="text-xs font-semibold text-slate-600 uppercase">Side (පැත්ත)</label>
               <select id="form-side" className="border border-slate-300 rounded px-3 py-1.5 text-sm" onChange={(e) => {
                 const side = e.target.value;
                 const descSelect = document.getElementById('form-desc');
                 descSelect.innerHTML = '';
                 const options = side === 'RECEIPT' ? RECEIPT_DESCRIPTIONS : PAYMENT_DESCRIPTIONS;
                 options.forEach((desc, i) => {
                   if (desc !== "" && desc !== "මුළු එකතුව" && desc !== "පෙර දිනට ශේෂය" && desc !== "අද දිනට ශේෂය") {
                     descSelect.add(new Option(desc, i));
                   }
                 });
               }}>
                 <option value="RECEIPT">ලැබීම් (Receipts)</option>
                 <option value="PAYMENT">ගෙවීම් (Payments)</option>
               </select>
            </div>
            
            <div className="col-span-1 lg:col-span-2 flex flex-col gap-1">
               <label className="text-xs font-semibold text-slate-600 uppercase">Description (විස්තරය)</label>
               <select id="form-desc" className="border border-slate-300 rounded px-3 py-1.5 text-sm">
                 {RECEIPT_DESCRIPTIONS.map((desc, i) => (
                   desc !== "" && desc !== "මුළු එකතුව" && desc !== "පෙර දිනට ශේෂය" && desc !== "අද දිනට ශේෂය" ? 
                   <option key={i} value={i}>{desc}</option> : null
                 ))}
               </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Folio (ප/අ)</label>
              <input id="form-folio" type="text" className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Date (දිනය)</label>
              <input id="form-date" type="text" className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Ref No</label>
              <input id="form-ref" type="text" className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">B/F Transfers (පෙර දින - පැවරුම්)</label>
              <input id="form-bf-t" type="number" step="0.01" className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">B/F Cash (පෙර දින - මුදල්)</label>
              <input id="form-bf-c" type="number" step="0.01" className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Today Transfers (අද දින - පැවරුම්)</label>
              <input id="form-today-t" type="number" step="0.01" className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">Today Cash (අද දින - මුදල්)</label>
              <input id="form-today-c" type="number" step="0.01" className="border border-slate-300 rounded px-3 py-1.5 text-sm" />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-4 flex justify-end mt-2">
              <button onClick={() => {
                const side = document.getElementById('form-side').value;
                const index = parseInt(document.getElementById('form-desc').value);
                const setter = side === 'RECEIPT' ? setReceipts : setPayments;
                
                setter(prev => {
                  const arr = [...prev];
                  arr[index] = {
                    ...arr[index],
                    folio: document.getElementById('form-folio').value,
                    itemDate: document.getElementById('form-date').value,
                    refNo: document.getElementById('form-ref').value,
                    broughtForwardTransfers: document.getElementById('form-bf-t').value,
                    broughtForwardCash: document.getElementById('form-bf-c').value,
                    todayTransfers: document.getElementById('form-today-t').value,
                    todayCash: document.getElementById('form-today-c').value
                  };
                  return arr;
                });
                
                // Clear inputs
                document.getElementById('form-folio').value = '';
                document.getElementById('form-date').value = '';
                document.getElementById('form-ref').value = '';
                document.getElementById('form-bf-t').value = '';
                document.getElementById('form-bf-c').value = '';
                document.getElementById('form-today-t').value = '';
                document.getElementById('form-today-c').value = '';
              }} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors">
                <CheckCircle2 className="w-4 h-4" />
                ඇතුළත් කරන්න (Update Row)
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

        {/* Sign-off Section */}
        <div className="bg-white rounded-xl shadow p-4 md:p-8 mt-6">
           <p className="text-sm md:text-base text-slate-800 leading-loose">
             අද දින සියලුම ගනුදෙනු නිවැරදිව සටහන්ව ඇති බවත් අත ඉතිරි මුදල් වශයෙන් 
             <input type="text" value={remainingBalance} onChange={(e) => setRemainingBalance(e.target.value)} className="border-b border-dashed border-slate-400 w-48 mx-2 px-2 text-center font-bold text-blue-800 outline-none focus:border-blue-500 bg-transparent" placeholder=".............................." />
             මා අත නිවැරදිව තිබෙන බවත් මෙයින් සහතික කරමි.
           </p>
           <div className="mt-16 flex flex-col md:flex-row justify-between items-end gap-8 text-sm text-slate-600 px-4 md:px-12">
             <div className="flex items-end gap-2">
                <span className="mb-1">දිනය:</span>
                <div className="w-48 border-b border-dashed border-slate-400"></div>
             </div>
             <div className="flex flex-col items-center">
                <div className="w-64 border-b border-solid border-slate-800 mb-2"></div>
                <span>ග්‍රාමීය බැංකු ශාඛා කළමනාකරු</span>
             </div>
           </div>
        </div>
        
      </div>
    </div>
  );
}
