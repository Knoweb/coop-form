import React, { useState } from 'react';
import { Save, FileText, Calendar, Building, CreditCard, PlusCircle } from 'lucide-react';

const INITIAL_SUMMARY_ROWS = [
  { id: 1, description: 'අයිරා ශේෂය (රතු පාටින්)', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
  { id: 2, description: 'ශේෂය ඉදිරියට ගෙනඑන', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
  { id: 3, description: 'ලැබීම් : තැන්පත් කිරීම්', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
  { id: 4, description: '           ශේෂය', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
  { id: 5, description: '           ගෙවීම්', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
  { id: 6, description: '           ශේෂය', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
  { id: 7, description: 'උපරිම සීමාව ඉක්මකර නිකුත්\nකරන ලද චෙක්පත්', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
  { id: 8, description: '           එකතුව', bank1: '', bank2: '', bank3: '', cash: '', other: '' },
];

const INITIAL_CHEQUE_STATE = {
  chequeNo: '',
  date: '',
  maxLimit: ''
};

export default function Form27() {
  const [globalDate, setGlobalDate] = useState('');
  const [bank1AccNo, setBank1AccNo] = useState('');
  const [bank2AccNo, setBank2AccNo] = useState('');
  const [bank3AccNo, setBank3AccNo] = useState('');
  
  const [summaryRows, setSummaryRows] = useState(INITIAL_SUMMARY_ROWS);
  const [chequeItems, setChequeItems] = useState([]);
  const [chequeData, setChequeData] = useState(INITIAL_CHEQUE_STATE);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSummaryChange = (id, field, value) => {
    setSummaryRows(prev => prev.map(row => 
      row.id === id ? { ...row, [field]: value } : row
    ));
  };

  const handleChequeChange = (e) => {
    const { name, value } = e.target;
    setChequeData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCheque = (e) => {
    e.preventDefault();
    if (!chequeData.chequeNo) return;
    
    setChequeItems(prev => [...prev, { 
      ...chequeData, 
      id: Date.now(),
      serialNo: String(prev.length + 1)
    }]);
    setChequeData(INITIAL_CHEQUE_STATE);
  };

  const handleRemoveCheque = (idToRemove) => {
    setChequeItems(prev => {
      const filtered = prev.filter(item => item.id !== idToRemove);
      return filtered.map((item, index) => ({
        ...item,
        serialNo: String(index + 1)
      }));
    });
  };

  const handleSaveForm = async () => {
    if (!globalDate) {
      alert("කරුණාකර දිනය ඇතුළත් කරන්න.");
      return;
    }

    setIsSubmitting(true);
    
    const payload = {
      date: globalDate,
      bank1AccNo: bank1AccNo,
      bank2AccNo: bank2AccNo,
      bank3AccNo: bank3AccNo,
      summaryDataJson: JSON.stringify(summaryRows),
      chequesDataJson: JSON.stringify(chequeItems)
    };

    try {
      const response = await fetch('http://localhost:8080/api/form27-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert("Form saved successfully!");
        setSummaryRows(INITIAL_SUMMARY_ROWS);
        setChequeItems([]);
        setGlobalDate('');
        setBank1AccNo('');
        setBank2AccNo('');
        setBank3AccNo('');
      } else {
        alert("Failed to save form. Check console.");
      }
    } catch (error) {
      console.error("Failed to submit record:", error);
      alert("Failed to save. Make sure backend is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 p-4 md:p-6 font-sans pb-24">
      <div className="w-full mx-auto space-y-8 max-w-7xl">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-slate-900">Form 27 (දෛනික මුදල් වාර්තාව - බැංකු ශේෂයෙන්)</h1>
              <p className="text-slate-500 font-medium mt-1">Daily Cash Report - Bank Balance</p>
            </div>
          </div>
        </header>

        {/* Global Details */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> දිනය (Date)
                  </label>
                  <input type="date" value={globalDate} onChange={(e) => setGlobalDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" /> ගිණුම් අංක 1 (Bank 1)
                  </label>
                  <input type="text" value={bank1AccNo} onChange={(e) => setBank1AccNo(e.target.value)} placeholder="Account No"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" /> ගිණුම් අංක 2 (Bank 2)
                  </label>
                  <input type="text" value={bank2AccNo} onChange={(e) => setBank2AccNo(e.target.value)} placeholder="Account No"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building className="w-4 h-4 text-slate-400" /> ගිණුම් අංක 3 (Bank 3)
                  </label>
                  <input type="text" value={bank3AccNo} onChange={(e) => setBank3AccNo(e.target.value)} placeholder="Account No"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>
             </div>
          </div>
        </div>

        {/* Input Table for Summary Rows */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8 p-6 md:p-8">
           <h3 className="text-lg font-bold text-slate-800 mb-6">මුදල් වාර්තාව සාරාංශය (Summary Grid)</h3>
           <div className="overflow-x-auto w-full mb-4 pb-4">
              <table className="w-full border-collapse min-w-[800px]">
                 <thead>
                    <tr className="bg-slate-50">
                       <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 border border-slate-200">විස්තරය</th>
                       <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 border border-slate-200 w-32">ගිණුම් 1 (රු.)</th>
                       <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 border border-slate-200 w-32">ගිණුම් 2 (රු.)</th>
                       <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 border border-slate-200 w-32">ගිණුම් 3 (රු.)</th>
                       <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 border border-slate-200 w-32">මුදල් අත ඉතිරි</th>
                       <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600 border border-slate-200 w-32">වෙනත් කරුණු</th>
                    </tr>
                 </thead>
                 <tbody>
                    {summaryRows.map(row => (
                       <tr key={row.id}>
                          <td className="p-1 border border-slate-200">
                             <input type="text" value={row.description} onChange={(e) => handleSummaryChange(row.id, 'description', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded bg-transparent focus:bg-slate-50 outline-none" />
                          </td>
                          <td className="p-1 border border-slate-200">
                             <input type="number" step="0.01" value={row.bank1} onChange={(e) => handleSummaryChange(row.id, 'bank1', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded bg-transparent focus:bg-slate-50 outline-none text-right" />
                          </td>
                          <td className="p-1 border border-slate-200">
                             <input type="number" step="0.01" value={row.bank2} onChange={(e) => handleSummaryChange(row.id, 'bank2', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded bg-transparent focus:bg-slate-50 outline-none text-right" />
                          </td>
                          <td className="p-1 border border-slate-200">
                             <input type="number" step="0.01" value={row.bank3} onChange={(e) => handleSummaryChange(row.id, 'bank3', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded bg-transparent focus:bg-slate-50 outline-none text-right" />
                          </td>
                          <td className="p-1 border border-slate-200">
                             <input type="number" step="0.01" value={row.cash} onChange={(e) => handleSummaryChange(row.id, 'cash', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded bg-transparent focus:bg-slate-50 outline-none text-right" />
                          </td>
                          <td className="p-1 border border-slate-200">
                             <input type="text" value={row.other} onChange={(e) => handleSummaryChange(row.id, 'other', e.target.value)}
                                className="w-full px-2 py-1.5 text-sm rounded bg-transparent focus:bg-slate-50 outline-none" />
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>

        {/* Bottom Table: Cheques Entry */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8 p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">උපරිම සීමාව ඉක්මවා නිකුත් කරන ලද චෙක්පත් විස්තරය (Cheque Details)</h3>
            
            <form onSubmit={handleAddCheque} className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-end bg-slate-50 p-4 rounded-xl border border-slate-200">
               <div className="space-y-1">
                 <label className="text-xs font-semibold text-slate-600">චෙක්පත් අංකය</label>
                 <input type="text" name="chequeNo" value={chequeData.chequeNo} onChange={handleChequeChange}
                   className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
               </div>
               <div className="space-y-1">
                 <label className="text-xs font-semibold text-slate-600">නිකුත් කළ දිනය</label>
                 <input type="date" name="date" value={chequeData.date} onChange={handleChequeChange}
                   className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
               </div>
               <div className="space-y-1">
                 <label className="text-xs font-semibold text-slate-600">උපරිම සීමාව රු.</label>
                 <input type="number" step="0.01" name="maxLimit" value={chequeData.maxLimit} onChange={handleChequeChange}
                   className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white" />
               </div>
               <div className="space-y-1">
                 <label className="text-xs font-semibold text-slate-600">&nbsp;</label>
                 <div className="flex gap-2">
                   <button type="submit" className="w-full bg-slate-800 text-white px-3 py-2 rounded-lg hover:bg-slate-700 flex items-center justify-center space-x-2">
                     <PlusCircle className="w-5 h-5" />
                     <span>Add Cheque</span>
                   </button>
                 </div>
               </div>
            </form>
            
            <div className="overflow-x-auto w-full">
              <table className="w-full border-collapse">
                 <thead>
                    <tr className="bg-slate-100 border-b-2 border-slate-200">
                       <th className="px-3 py-2 text-left text-xs font-bold text-slate-700 w-10"></th>
                       <th className="px-3 py-2 text-left text-xs font-bold text-slate-700">චෙක්පත් අංකය</th>
                       <th className="px-3 py-2 text-left text-xs font-bold text-slate-700">නිකුත් කළ දිනය</th>
                       <th className="px-3 py-2 text-right text-xs font-bold text-slate-700">උපරිම සීමාව රු.</th>
                       <th className="px-3 py-2 w-10"></th>
                    </tr>
                 </thead>
                 <tbody>
                    {chequeItems.length === 0 ? (
                       <tr><td colSpan="5" className="text-center py-6 text-slate-400 text-sm">No cheques added</td></tr>
                    ) : (
                       chequeItems.map((item) => (
                          <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                             <td className="px-3 py-2 text-sm">{item.serialNo}</td>
                             <td className="px-3 py-2 text-sm">{item.chequeNo}</td>
                             <td className="px-3 py-2 text-sm">{item.date}</td>
                             <td className="px-3 py-2 text-sm text-right">{item.maxLimit ? Number(item.maxLimit).toFixed(2) : ''}</td>
                             <td className="px-3 py-2 text-sm text-center">
                               <button onClick={() => handleRemoveCheque(item.id)} className="text-red-400 hover:text-red-600">✕</button>
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
              </table>
            </div>
        </div>

        {/* Printable Form Preview Section */}
        <div className="bg-white rounded-none md:rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative">
          <div className="p-8 md:p-12 print:p-0">
             
             {/* Paper Form Header */}
             <div className="relative mb-8 pt-6">
                <div className="absolute right-0 top-0 text-sm font-semibold text-slate-800">Form 27</div>
                
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 text-center mb-6">දෛනික මුදල් වාර්තාව - බැංකු ශේෂයෙන්</h2>
                
                <div className="flex justify-between items-start text-xs font-semibold text-slate-800">
                   <div className="space-y-1">
                      <p>සැ.යු. 1 අයිරාව සහ ගෙවීම් සලකුණ (-)</p>
                      <p className="ml-8">බැර ශේෂය සහ ලැබීම් සලකුණ (+)</p>
                      <p className="ml-8">එකතුව නිවැරදිව දැක්විය යුතුයි.</p>
                      <p className="ml-8">දිනයක අවසන් ශේෂය ඉදිරියට ගෙන යා යුතුයි.</p>
                   </div>
                   <div className="flex items-end pt-8 w-64">
                      <span>දිනය</span>
                      <span className="flex-1 border-b border-dotted border-slate-800 pb-1 px-2 text-center inline-block ml-2">{globalDate}</span>
                   </div>
                </div>
             </div>

             {/* Print Top Table */}
             <div className="overflow-x-auto w-full mb-12 border border-slate-800 print:border-black border-collapse">
                <table className="w-full border-collapse">
                   <thead>
                      <tr>
                         <th rowSpan={2} className="w-[30%] border border-slate-800 print:border-black p-2"></th>
                         <th colSpan={3} className="text-center font-bold text-sm border border-slate-800 print:border-black p-2">බැංකුවේ නම/ශාඛාව</th>
                         <th rowSpan={2} className="w-[10%] text-center font-bold text-xs border border-slate-800 print:border-black p-2 align-middle">මුදල්<br/>අත ඉතිරි</th>
                         <th rowSpan={2} className="w-[15%] text-center font-bold text-xs border border-slate-800 print:border-black p-2 align-middle">වෙනත්<br/>කරුණු</th>
                      </tr>
                      <tr>
                         <th className="text-center text-xs font-semibold border border-slate-800 print:border-black p-2">
                            ගිණුම් අංක {bank1AccNo ? <span className="underline decoration-dotted underline-offset-4">{bank1AccNo}</span> : '..........................'}<br/>
                            <div className="flex justify-between mt-2"><span>රු.</span><span>ශ.</span></div>
                         </th>
                         <th className="text-center text-xs font-semibold border border-slate-800 print:border-black p-2">
                            ගිණුම් අංක {bank2AccNo ? <span className="underline decoration-dotted underline-offset-4">{bank2AccNo}</span> : '..........................'}<br/>
                            <div className="flex justify-between mt-2"><span>රු.</span><span>ශ.</span></div>
                         </th>
                         <th className="text-center text-xs font-semibold border border-slate-800 print:border-black p-2">
                            ගිණුම් අංක {bank3AccNo ? <span className="underline decoration-dotted underline-offset-4">{bank3AccNo}</span> : '..........................'}<br/>
                            <div className="flex justify-between mt-2"><span>රු.</span><span>ශ.</span></div>
                         </th>
                      </tr>
                   </thead>
                   <tbody>
                      {summaryRows.map((row) => (
                         <tr key={row.id}>
                            <td className="border border-slate-800 print:border-black p-2 text-sm font-semibold whitespace-pre-wrap">{row.description}</td>
                            <td className="border border-slate-800 print:border-black p-2 text-sm text-right">{row.bank1}</td>
                            <td className="border border-slate-800 print:border-black p-2 text-sm text-right">{row.bank2}</td>
                            <td className="border border-slate-800 print:border-black p-2 text-sm text-right">{row.bank3}</td>
                            <td className="border border-slate-800 print:border-black p-2 text-sm text-right">{row.cash}</td>
                            <td className="border border-slate-800 print:border-black p-2 text-sm text-center">{row.other}</td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             {/* Print Bottom Table */}
             <div className="w-full mt-4">
                <table className="w-full border-collapse border border-slate-800 print:border-black">
                   <thead>
                      <tr>
                         <th className="border border-slate-800 print:border-black p-2 text-xs w-[5%] text-center"></th>
                         <th className="border border-slate-800 print:border-black p-2 text-xs w-[25%] text-center">චෙක්පත් අංකය</th>
                         <th className="border border-slate-800 print:border-black p-2 text-xs w-[35%] text-center">නිකුත් කළ දිනය</th>
                         <th className="border border-slate-800 print:border-black p-2 text-xs w-[35%] text-center">උපරිම සීමාව<br/>රු.<span className="ml-4">ශ.</span></th>
                      </tr>
                   </thead>
                   <tbody>
                      {chequeItems.length === 0 ? (
                         // Show 5 empty rows if no items
                         [1, 2, 3, 4, 5].map((num) => (
                           <tr key={num}>
                              <td className="border border-slate-800 print:border-black p-2 text-xs text-center">{num}</td>
                              <td className="border border-slate-800 print:border-black p-4"></td>
                              <td className="border border-slate-800 print:border-black p-4"></td>
                              <td className="border border-slate-800 print:border-black p-4"></td>
                           </tr>
                         ))
                      ) : (
                         chequeItems.map((cheque, idx) => (
                            <tr key={cheque.id}>
                               <td className="border border-slate-800 print:border-black p-2 text-xs text-center">{idx + 1}</td>
                               <td className="border border-slate-800 print:border-black p-2 text-xs text-center">{cheque.chequeNo}</td>
                               <td className="border border-slate-800 print:border-black p-2 text-xs text-center">{cheque.date}</td>
                               <td className="border border-slate-800 print:border-black p-2 text-xs text-right">{cheque.maxLimit ? Number(cheque.maxLimit).toFixed(2) : ''}</td>
                            </tr>
                         ))
                      )}
                   </tbody>
                </table>
             </div>

          </div>
        </div>
        
        {/* Save Action */}
        <div className="flex justify-end pb-8">
            <button 
              onClick={handleSaveForm}
              disabled={isSubmitting}
              className={`flex items-center space-x-2 px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
                !isSubmitting
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}>
              <Save className="w-6 h-6" />
              <span>{isSubmitting ? 'Saving...' : 'Save Entire Form'}</span>
            </button>
        </div>

      </div>
    </div>
  );
}
