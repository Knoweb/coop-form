import React, { useState, useEffect } from 'react';
import FormHeader from '../components/FormHeader';
import { PlusCircle, FileText, DollarSign, Calendar, List, Tag, Save, LayoutList, Building2, Plus } from 'lucide-react';

const ANALYSIS_CATEGORIES = ['Transport', 'Stationery', 'Postage', 'Meals', 'Other'];

const ANALYSIS_LABELS = {
  'Transport': 'Transport (ගමන් වියදම්)',
  'Stationery': 'Stationery (ලිපි ද්‍රව්‍ය)',
  'Postage': 'Postage (තැපැල් ගාස්තු)',
  'Meals': 'Meals (ආහාර)',
  'Other': 'Other (වෙනත්)'
};

const INITIAL_FORM_STATE = {
  storeName: '',
  fromDate: '',
  toDate: '',
  amountReceived: '',
  date: '',
  description: '',
  voucherNo: '',
  amountPaid: '',
  analysis: {
    Transport: '',
    Stationery: '',
    Postage: '',
    Meals: '',
    Other: ''
  },
  note: ''
};

export default function Form2() {
  const [records, setRecords] = useState([
    { id:1, date:'2026-09-01', description:'Office Supplies', voucherNo:'V-201', amountReceived: 10000, amountPaid:0, ledgerFolio:'LF-01', note:'Opening balance', analysis:{} },
    { id:2, date:'2026-09-02', description:'Transport Payment', voucherNo:'V-202', amountReceived:0, amountPaid:2500, ledgerFolio:'LF-02', note:'', analysis:{} },
    { id:3, date:'2026-09-03', description:'Stationery Purchase', voucherNo:'V-203', amountReceived:0, amountPaid:1800, ledgerFolio:'LF-03', note:'', analysis:{} }
  ]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/form2/records');
      const data = await response.json();
      const mappedData = data.map(record => ({
        ...record,
        analysis: {
          Transport: record.transport || '',
          Stationery: record.stationery || '',
          Postage: record.postage || '',
          Meals: record.meals || '',
          Other: record.other || ''
        }
      }));
      setRecords(mappedData);
    } catch (error) {
      console.error("Failed to fetch records:", error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAnalysisChange = (category, value) => {
    setFormData(prev => ({
      ...prev,
      analysis: {
        ...prev.analysis,
        [category]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      date: formData.date, description: formData.description,
      voucherNo: formData.voucherNo,
      amountReceived: formData.amountReceived ? parseFloat(formData.amountReceived) : 0,
      amountPaid: formData.amountPaid ? parseFloat(formData.amountPaid) : 0,
      ledgerFolio: formData.ledgerFolio, note: formData.note || '', analysis: {}
    };
    setRecords(prev => [...prev, { ...payload, id: Date.now() }]);
    setFormData(INITIAL_FORM_STATE || Object.keys(formData).reduce((a,k)=>({...a,[k]:''}),{}));
    try { await fetch('http://localhost:8080/api/form2-records', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) }); }
    catch(e) { console.error("Backend unavailable:", e); }
  };

  // Calculate Balance dynamically
  const [prevPageTotals, setPrevPageTotals] = useState({
    received: '5000.00',
    paid: '2000.00',
    analysis: {
      Transport: '500.00',
      Stationery: '300.00',
      Postage: '200.00',
      Meals: '800.00',
      Other: '200.00'
    }
  });

  const handlePrevPageTotalChange = (field, category, value) => {
    if (category) {
      setPrevPageTotals(prev => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          [category]: value
        }
      }));
    } else {
      setPrevPageTotals(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const prevReceived = parseFloat(prevPageTotals.received) || 0;
  const prevPaid = ANALYSIS_CATEGORIES.reduce((sum, cat) => sum + (parseFloat(prevPageTotals.analysis[cat]) || 0), 0);
  const prevBalance = prevReceived - prevPaid;

  let currentBalance = 0;
  const processedRecords = records.map(record => {
    const received = parseFloat(record.amountReceived) || 0;
    const paid = parseFloat(record.amountPaid) || 0;
    currentBalance = currentBalance + received - paid;
    return { ...record, balance: currentBalance, received, paid };
  });

  // Calculate Totals
  const totals = processedRecords.reduce((acc, curr) => {
    acc.received += curr.received;
    acc.paid += curr.paid;
    ANALYSIS_CATEGORIES.forEach(cat => {
      acc.analysis[cat] = (acc.analysis[cat] || 0) + (parseFloat(curr.analysis[cat]) || 0);
    });
    return acc;
  }, { received: 0, paid: 0, analysis: {} });

  const grandTotalReceived = totals.received + prevReceived;
  const grandTotalPaid = totals.paid + prevPaid;
  const grandTotalBalance = grandTotalReceived - grandTotalPaid;

  return (
    <div className="flex-1 bg-slate-50 min-h-screen p-4 md:p-8 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        
        {/* Header Section */}
        <FormHeader 
          title="සුළු මුදල් පොත" 
          subtitle="Petty Cash Book" 
          formNumber="Form 2" 
        />
        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-slncc-blue" /> 
              Add New Entry (නව ඇතුළත් කිරීම)
            </h2>
          </div>
          
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Meta Fields Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slncc-gray/30 p-6 rounded-xl border border-indigo-100">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Store Name (ගබඩාවේ නම)
                  </label>
                  <input type="text" name="storeName" value={formData.storeName} onChange={handleInputChange} placeholder="E.g., Colombo Branch"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-slncc-blue transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> From Date (සිට)
                  </label>
                  <input type="date" name="fromDate" value={formData.fromDate} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-slncc-blue transition-colors shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> To Date (දක්වා)
                  </label>
                  <input type="date" name="toDate" value={formData.toDate} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-slncc-blue transition-colors shadow-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Standard Fields */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
                  </label>
                  <input required type="date" name="date" value={formData.date} onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors shadow-sm" />
                </div>
                
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Description (විස්තරය)
                  </label>
                  <input required type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="E.g., Office Supplies"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Voucher No (වවුචර අංකය)
                  </label>
                  <input type="text" name="voucherNo" value={formData.voucherNo} onChange={handleInputChange} placeholder="E.g., V-001"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors shadow-sm" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-500" /> Amount Received (ලැබුණු මුදල)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400">රු.</span>
                    <input type="number" step="0.01" name="amountReceived" value={formData.amountReceived} onChange={handleInputChange} placeholder="0.00"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-emerald-50/30 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-rose-500" /> Amount Paid (ගෙවූ මුදල)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-slate-400">රු.</span>
                    <input type="number" step="0.01" name="amountPaid" value={formData.amountPaid} onChange={handleInputChange} placeholder="0.00"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-rose-50/30 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors shadow-sm" />
                  </div>
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Note (සටහන)
                  </label>
                  <input type="text" name="note" value={formData.note} onChange={handleInputChange} placeholder="Additional details..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors shadow-sm" />
                </div>
              </div>

              {/* Analysis of Payments */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <List className="w-4 h-4" />
                  ANALYSIS OF PAYMENTS (ගෙවීම් විග්‍රහය)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {ANALYSIS_CATEGORIES.map(category => (
                    <div key={category} className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">
                        {ANALYSIS_LABELS[category]}
                      </label>
                      <input type="number" step="0.01" value={formData.analysis[category]} onChange={(e) => handleAnalysisChange(category, e.target.value)} placeholder="0.00"
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue transition-colors shadow-sm text-sm" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-gray-200 transition-all active:scale-95">
              <Save className="w-5 h-5" /> Submit Entry
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <LayoutList className="w-5 h-5 text-slncc-blue" /> 
              Petty Cash Register
            </h2>
            <div className="bg-slncc-gray px-4 py-2 rounded-lg">
              <span className="text-sm font-bold text-slncc-blue">Current Balance: රු. {grandTotalBalance.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1200px] text-left border-collapse">
              <thead>
                <tr>
                  <th colSpan="2" className="px-2 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-700 break-words bg-slate-100 border border-slate-300 w-24 text-center align-middle">
                    ලැබුණු මුදල
                  </th>
                  <th rowSpan="2" className="px-2 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-700 break-words bg-slate-100 border border-slate-300 w-24 text-center align-middle">
                    දිනය
                  </th>
                  <th rowSpan="2" className="px-2 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-700 break-words bg-slate-100 border border-slate-300 text-center align-middle">
                    විස්තරය
                  </th>
                  <th rowSpan="2" className="px-2 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-700 break-words bg-slate-100 border border-slate-300 w-20 text-center align-middle">
                    වවුචර<br/>අංකය
                  </th>
                  <th colSpan="2" className="px-2 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-700 break-words bg-slate-100 border border-slate-300 w-24 text-center align-middle">
                    ගෙවූ මුදල
                  </th>
                  <th colSpan="2" className="px-2 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-700 break-words bg-slate-100 border border-slate-300 w-24 text-center align-middle">
                    දින අවසානයේ<br/>අත ඉතිරි
                  </th>
                  <th colSpan={ANALYSIS_CATEGORIES.length} className="px-2 py-2 text-xs md:text-sm font-bold text-slate-700 bg-slate-100 border border-slate-300 text-center uppercase tracking-wide align-middle">
                    ගෙවීම් විග්‍රහය
                  </th>
                  <th rowSpan="2" className="px-2 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-700 break-words bg-slate-100 border border-slate-300 w-32 text-center align-middle">
                    සටහන
                  </th>
                </tr>
                <tr>
                  {/* Received Rs/Cts */}
                  <th className="px-1 py-1 text-[10px] font-bold bg-slncc-blue text-white border border-slate-300 bg-slate-50 text-center w-12">රු.</th>
                  <th className="px-1 py-1 text-[10px] font-bold bg-slncc-blue text-white border border-slate-300 bg-slate-50 text-center w-12">ශ.</th>
                  
                  {/* Paid Rs/Cts */}
                  <th className="px-1 py-1 text-[10px] font-bold bg-slncc-blue text-white border border-slate-300 bg-slate-50 text-center w-12">රු.</th>
                  <th className="px-1 py-1 text-[10px] font-bold bg-slncc-blue text-white border border-slate-300 bg-slate-50 text-center w-12">ශ.</th>
                  
                  {/* Balance Rs/Cts */}
                  <th className="px-1 py-1 text-[10px] font-bold bg-slncc-blue text-white border border-slate-300 bg-slate-50 text-center w-12">රු.</th>
                  <th className="px-1 py-1 text-[10px] font-bold bg-slncc-blue text-white border border-slate-300 bg-slate-50 text-center w-12">ශ.</th>

                  {/* Analysis Categories */}
                  {ANALYSIS_CATEGORIES.map(category => (
                    <th key={category} className="px-1 py-1 text-[10px] leading-tight font-bold text-slate-600 uppercase break-words border border-slate-300 w-20 bg-slate-50 text-center align-middle">
                      {ANALYSIS_LABELS[category]}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {processedRecords.map((record, index) => {
                  const rParts = record.received > 0 ? record.received.toFixed(2).split('.') : ['', ''];
                  const pParts = record.paid > 0 ? record.paid.toFixed(2).split('.') : ['', ''];
                  const bParts = record.balance.toFixed(2).split('.');
                  
                  return (
                    <tr key={index} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="px-1 py-2 text-xs leading-tight font-medium text-emerald-600 border border-slate-300 text-right">{rParts[0]}</td>
                      <td className="px-1 py-2 text-[10px] leading-tight font-medium text-emerald-600 border border-slate-300 text-center">{rParts[1]}</td>
                      
                      <td className="px-1 py-2 text-xs leading-tight font-medium text-slate-900 break-words bg-white group-hover:bg-slate-50 transition-colors border border-slate-300 text-center"><input type="date" value={record.date || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],date:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300"><input type="text" value={record.description || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],description:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300 text-center"><input type="text" value={record.voucherNo || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],voucherNo:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1 text-center" /></td>
                      
                      <td className="px-1 py-2 text-xs leading-tight font-medium text-rose-600 border border-slate-300 text-right">{pParts[0]}</td>
                      <td className="px-1 py-2 text-[10px] leading-tight font-medium text-rose-600 border border-slate-300 text-center">{pParts[1]}</td>
                      
                      <td className="px-1 py-2 text-xs leading-tight font-bold text-slncc-red border border-slate-300 text-right">{bParts[0]}</td>
                      <td className="px-1 py-2 text-[10px] leading-tight font-bold text-slncc-red border border-slate-300 text-center">{bParts[1]}</td>
                      
                      {ANALYSIS_CATEGORIES.map(cat => (
                        <td key={cat} className="px-1 py-2 text-xs leading-tight text-slate-500 break-words border border-slate-300 text-right">
                          {record.analysis && record.analysis[cat] ? parseFloat(record.analysis[cat]).toFixed(2) : ''}
                        </td>
                      ))}
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300"><input type="text" value={record.note || ""} onChange={(e) => { const r=[...records]; r[index]={...r[index],note:e.target.value}; setRecords(r); }} className="w-full bg-transparent outline-none focus:bg-blue-50 text-xs px-1" /></td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                {/* Row 1: This page total */}
                <tr>
                  <td className="px-1 py-2 text-xs font-bold text-emerald-600 border border-slate-300 text-right">{totals.received.toFixed(2).split('.')[0]}</td>
                  <td className="px-1 py-2 text-[10px] font-bold text-emerald-600 border border-slate-300 text-center">{totals.received.toFixed(2).split('.')[1]}</td>
                  
                  <td className="border border-slate-300"></td>
                  <td className="px-2 py-2 text-[10px] md:text-xs font-bold text-slate-800 border border-slate-300 text-right whitespace-nowrap">මෙම පිටුවේ : එකතුව</td>
                  <td className="border border-slate-300"></td>
                  
                  <td className="px-1 py-2 text-xs font-bold text-rose-600 border border-slate-300 text-right">{totals.paid.toFixed(2).split('.')[0]}</td>
                  <td className="px-1 py-2 text-[10px] font-bold text-rose-600 border border-slate-300 text-center">{totals.paid.toFixed(2).split('.')[1]}</td>
                  
                  <td className="px-1 py-2 text-xs font-bold text-slncc-red border border-slate-300 text-right">{currentBalance.toFixed(2).split('.')[0]}</td>
                  <td className="px-1 py-2 text-[10px] font-bold text-slncc-red border border-slate-300 text-center">{currentBalance.toFixed(2).split('.')[1]}</td>
                  
                  {ANALYSIS_CATEGORIES.map(cat => (
                    <td key={cat} className="px-1 py-2 text-xs font-bold text-slate-700 border border-slate-300 text-right">
                      {totals.analysis[cat] ? totals.analysis[cat].toFixed(2) : ''}
                    </td>
                  ))}
                  <td className="border border-slate-300"></td>
                </tr>

                {/* Row 2: Previous page total */}
                <tr className="bg-amber-50/30">
                  <td colSpan="2" className="px-1 py-1 border border-slate-300">
                    <input type="number" step="0.01" value={prevPageTotals.received} onChange={(e) => handlePrevPageTotalChange('received', null, e.target.value)} className="w-full text-right text-xs font-bold text-emerald-600 bg-transparent outline-none" placeholder="0.00" />
                  </td>
                  
                  <td className="border border-slate-300"></td>
                  <td className="px-2 py-2 text-[10px] md:text-xs font-bold text-slate-800 border border-slate-300 text-right whitespace-nowrap">පෙර පිටුවේ : එකතුව</td>
                  <td className="border border-slate-300"></td>
                  
                  <td colSpan="2" className="px-1 py-1 border border-slate-300">
                    <input type="number" step="0.01" value={prevPaid > 0 ? prevPaid.toFixed(2) : ''} readOnly className="w-full text-right text-xs font-bold text-rose-600 bg-transparent outline-none" placeholder="0.00" />
                  </td>
                  
                  <td colSpan="2" className="px-1 py-2 text-xs font-bold text-slncc-red border border-slate-300 text-right bg-transparent">{prevBalance !== 0 ? prevBalance.toFixed(2) : ''}</td>
                  
                  {ANALYSIS_CATEGORIES.map(cat => (
                    <td key={cat} className="px-1 py-1 border border-slate-300">
                      <input type="number" step="0.01" value={prevPageTotals.analysis[cat]} onChange={(e) => handlePrevPageTotalChange('analysis', cat, e.target.value)} className="w-full text-right text-xs font-bold text-slate-700 bg-transparent outline-none" placeholder="" />
                    </td>
                  ))}
                  <td className="border border-slate-300"></td>
                </tr>

                {/* Row 3: Grand total */}
                <tr className="bg-slncc-gray/30">
                  <td className="px-1 py-2 text-xs font-bold text-emerald-600 border border-slate-300 text-right">{grandTotalReceived.toFixed(2).split('.')[0]}</td>
                  <td className="px-1 py-2 text-[10px] font-bold text-emerald-600 border border-slate-300 text-center">{grandTotalReceived.toFixed(2).split('.')[1]}</td>
                  
                  <td className="border border-slate-300"></td>
                  <td className="px-2 py-2 text-[10px] md:text-xs font-bold text-slate-800 border border-slate-300 text-right whitespace-nowrap">මුලු එකතුව</td>
                  <td className="border border-slate-300"></td>
                  
                  <td className="px-1 py-2 text-xs font-bold text-rose-600 border border-slate-300 text-right">{grandTotalPaid.toFixed(2).split('.')[0]}</td>
                  <td className="px-1 py-2 text-[10px] font-bold text-rose-600 border border-slate-300 text-center">{grandTotalPaid.toFixed(2).split('.')[1]}</td>
                  
                  <td className="px-1 py-2 text-xs font-bold text-slncc-red border border-slate-300 text-right">{grandTotalBalance.toFixed(2).split('.')[0]}</td>
                  <td className="px-1 py-2 text-[10px] font-bold text-slncc-red border border-slate-300 text-center">{grandTotalBalance.toFixed(2).split('.')[1]}</td>
                  
                  {ANALYSIS_CATEGORIES.map(cat => {
                    const grandCatTotal = (totals.analysis[cat] || 0) + (parseFloat(prevPageTotals.analysis[cat]) || 0);
                    return (
                      <td key={cat} className="px-1 py-2 text-xs font-bold text-slate-900 border border-slate-300 text-right">
                        {grandCatTotal > 0 ? grandCatTotal.toFixed(2) : ''}
                      </td>
                    );
                  })}
                  <td className="border border-slate-300"></td>
                </tr>
              </tfoot>
            </table>
              <button onClick={() => setRecords(prev => [...prev, { id:Date.now(), date:'', description:'', voucherNo:'', amountReceived:'', amountPaid:'', ledgerFolio:'', note:'', analysis:{} }])} className="mt-3 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                <Plus className="w-4 h-4" /> Add Row
              </button>
          </div>
          
           <div className="p-8 border-t border-slate-200 mt-8 flex flex-col md:flex-row justify-between items-end">
            <div className="text-sm text-slate-500 italic">
              ඉහත සඳහන් වියදම් මා විසින් දරණ ලදී. වියදම් සඳහා කුවිතාන්සි අමුණා ඇත.
            </div>
            <div className="mt-8 md:mt-0 text-center">
              <div className="w-48 border-b border-slate-400 mb-2"></div>
              <p className="text-sm font-semibold text-slate-700">ගබඩා කළමනාකරු</p>
              <div className="w-48 border-b border-slate-400 mb-2 mt-6"></div>
              <p className="text-sm font-semibold text-slate-700">දිනය</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
