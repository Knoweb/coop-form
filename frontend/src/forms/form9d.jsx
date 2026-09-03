import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText, Calendar, List, Tag, Save, LayoutList, Building2, Plus, Check, X, Hash } from 'lucide-react';

const INITIAL_FORM_STATE = {
  date: '',
  societyName: '',
  branchName: '',
  formNumber: '',
  memberNo: '',
  name: '',
  receiptNo: '',
  shares: '',
  loan: '',
  interest: '',
  deposits: '',
  other: '',
  totalAmount: '',
  ledgerFolio: ''
};

export default function Form9D() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [globalSocietyName, setGlobalSocietyName] = useState('');
  const [globalBranchName, setGlobalBranchName] = useState('');
  const [globalDate, setGlobalDate] = useState('');
  const [globalFormNumber, setGlobalFormNumber] = useState('');
  
  // State for Brought Forward totals (පෙර සටහනේ)
  const [peraSatahane, setPeraSatahane] = useState({
    shares: '', loan: '', interest: '', deposits: '', other: '', totalAmount: ''
  });
  const [showManualRow, setShowManualRow] = useState(false);
  const [manualRowData, setManualRowData] = useState(INITIAL_FORM_STATE);

  const fetchRecords = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/form9d-records');
      const data = await response.json();
      setRecords(data);
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

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'globalSocietyName') setGlobalSocietyName(value);
    if (name === 'globalBranchName') setGlobalBranchName(value);
    if (name === 'globalDate') setGlobalDate(value);
    if (name === 'globalFormNumber') setGlobalFormNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      date: globalDate || formData.date,
      societyName: globalSocietyName || formData.societyName,
      branchName: globalBranchName || formData.branchName,
      formNumber: globalFormNumber || formData.formNumber,
      memberNo: formData.memberNo,
      name: formData.name,
      receiptNo: formData.receiptNo,
      shares: formData.shares ? parseFloat(formData.shares) : 0,
      loan: formData.loan ? parseFloat(formData.loan) : 0,
      interest: formData.interest ? parseFloat(formData.interest) : 0,
      deposits: formData.deposits ? parseFloat(formData.deposits) : 0,
      other: formData.other ? parseFloat(formData.other) : 0,
      totalAmount: formData.totalAmount ? parseFloat(formData.totalAmount) : 0,
      ledgerFolio: formData.ledgerFolio
    };

    try {
      const response = await fetch('http://localhost:8080/api/form9d-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchRecords();
        setFormData(prev => ({
          ...INITIAL_FORM_STATE,
          date: prev.date,
          societyName: prev.societyName,
          branchName: prev.branchName,
          formNumber: prev.formNumber
        }));
      } else {
        const errorText = await response.text();
        alert("දත්ත ඇතුළත් කිරීම අසාර්ථකයි! (Backend Error: " + response.status + ")\nකරුණාකර Backend එක Restart කරන්න.");
        console.error("Backend Error:", errorText);
      }
    } catch (error) {
      alert("දත්ත ඇතුළත් කිරීම අසාර්ථකයි! Network Error එකක් වෙන්න පුළුවන්.");
      console.error("Failed to submit record:", error);
    }
  };

  const handleSaveManualRow = async () => {
    if (!globalBranchName || !globalDate) {
      alert("කරුණාකර ඉහළින්ම Branch Name සහ Date තෝරන්න!");
      return;
    }
    
    const payload = {
      date: globalDate,
      societyName: globalSocietyName,
      branchName: globalBranchName,
      formNumber: globalFormNumber,
      memberNo: manualRowData.memberNo,
      name: manualRowData.name,
      receiptNo: manualRowData.receiptNo,
      shares: manualRowData.shares ? parseFloat(manualRowData.shares) : 0,
      loan: manualRowData.loan ? parseFloat(manualRowData.loan) : 0,
      interest: manualRowData.interest ? parseFloat(manualRowData.interest) : 0,
      deposits: manualRowData.deposits ? parseFloat(manualRowData.deposits) : 0,
      other: manualRowData.other ? parseFloat(manualRowData.other) : 0,
      totalAmount: manualRowData.totalAmount ? parseFloat(manualRowData.totalAmount) : 0,
      ledgerFolio: manualRowData.ledgerFolio
    };

    try {
      const response = await fetch('http://localhost:8080/api/form9d-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        fetchRecords();
        setShowManualRow(false);
      } else {
        const errorText = await response.text();
        alert("දත්ත ඇතුළත් කිරීම අසාර්ථකයි! (Backend Error: " + response.status + ")");
      }
    } catch (error) {
      alert("දත්ත ඇතුළත් කිරීම අසාර්ථකයි! Network Error.");
    }
  };

  // Calculate Totals
  const totals = records.reduce((acc, curr) => {
    acc.shares += (curr.shares || 0);
    acc.loan += (curr.loan || 0);
    acc.interest += (curr.interest || 0);
    acc.deposits += (curr.deposits || 0);
    acc.other += (curr.other || 0);
    acc.totalAmount += (curr.totalAmount || 0);
    return acc;
  }, { 
    shares: 0, loan: 0, interest: 0, 
    deposits: 0, other: 0, totalAmount: 0 
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 p-4 md:p-6 font-sans">
      <div className="w-full mx-auto space-y-8">
        
        <header className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-teal-600 rounded-xl shadow-lg shadow-teal-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Form 9 D (ගොවි අංශයේ දෛනික මුදල් එකතුකිරීමේ සටහන)</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Daily Cash Collection Record - Agriculture Division</p>
          </div>
        </header>

        {/* Global Header Section */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-100">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Society (සමූපකාර සමිතිය)
                  </label>
                  <input type="text" name="globalSocietyName" value={globalSocietyName} onChange={handleHeaderChange} placeholder="Enter society name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Branch Name (ශාඛාවේ නම)
                  </label>
                  <input type="text" name="globalBranchName" value={globalBranchName} onChange={handleHeaderChange} placeholder="Enter branch name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Hash className="w-4 h-4 text-slate-400" /> Form No (අංකය)
                  </label>
                  <input type="text" name="globalFormNumber" value={globalFormNumber} onChange={handleHeaderChange} placeholder="Enter form number..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
                  </label>
                  <input type="date" name="globalDate" value={globalDate} onChange={handleHeaderChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 shadow-sm" />
                </div>
             </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <PlusCircle className="w-5 h-5 text-teal-500" />
                <h2 className="text-xl font-bold text-slate-800">New Entry (නව ඇතුළත් කිරීම)</h2>
              </div>
              <div className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-slate-200 shadow-sm">
                Form 9 D
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Member No (සා/අංක)
                  </label>
                  <input required type="text" name="memberNo" value={formData.memberNo} onChange={handleInputChange} placeholder="E.g., 1001"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 shadow-sm" />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" /> Name (නම)
                  </label>
                  <input required type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 shadow-sm" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-slate-400" /> Receipt (රිසිට් පත)
                  </label>
                  <input required type="text" name="receiptNo" value={formData.receiptNo} onChange={handleInputChange} placeholder="Receipt No"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 shadow-sm" />
                </div>

              </div>

              {/* Amounts Section */}
              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Amounts (මුදල්)</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Shares (කොටස්)</label>
                    <input type="number" step="0.01" name="shares" value={formData.shares} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Loan (ණය)</label>
                    <input type="number" step="0.01" name="loan" value={formData.loan} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Interest (පොලී)</label>
                    <input type="number" step="0.01" name="interest" value={formData.interest} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Deposits (තැන්පතු)</label>
                    <input type="number" step="0.01" name="deposits" value={formData.deposits} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-500">Other (වෙනත්)</label>
                    <input type="number" step="0.01" name="other" value={formData.other} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700">Total (එකතුව)</label>
                    <input type="number" step="0.01" name="totalAmount" value={formData.totalAmount} onChange={handleInputChange} placeholder="0.00"
                      className="w-full px-3 py-2 rounded-lg border border-teal-200 bg-teal-50/30 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm font-bold text-teal-900" />
                  </div>

                </div>
              </div>

              <div className="pt-4 flex justify-between items-center">
                <div className="space-y-1.5 w-1/4">
                  <label className="text-xs font-semibold text-slate-500">L.F. (ලෙ/පි.)</label>
                  <input type="text" name="ledgerFolio" value={formData.ledgerFolio} onChange={handleInputChange} placeholder="L.F."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors duration-200 text-sm" />
                </div>
                <button type="submit" className="flex items-center space-x-2 bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-teal-200 hover:shadow-teal-300 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                  <Save className="w-5 h-5" />
                  <span>Submit Entry</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-100 flex items-center justify-between">
             <div className="flex items-center space-x-2">
                <List className="w-5 h-5 text-teal-500" />
                <h2 className="text-xl font-bold text-slate-800">Form 9 D Register</h2>
             </div>
             <button
                onClick={() => {
                  setManualRowData(INITIAL_FORM_STATE);
                  setShowManualRow(true);
                }}
                className="flex items-center space-x-1 px-3 py-1.5 bg-teal-100 text-teal-700 font-semibold rounded-lg hover:bg-teal-200 transition-colors"
                title="Add manual entry"
             >
                <Plus className="w-4 h-4" />
                <span className="text-sm">Add Row</span>
             </button>
          </div>
          
          <div className="p-4 md:p-6">
            <div className="overflow-x-auto w-full rounded-xl border border-slate-200">
              <table className="w-full min-w-[1000px] text-left border-collapse table-fixed">
                <thead>
                <tr className="bg-slate-50">
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300 w-16">සා/අංක</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300">නම</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300 w-20">රිසිට් පත</th>
                  
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">කොටස්</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">ණය</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">පොලී</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">තැන්පතු</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300">වෙනත්</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-teal-700 uppercase break-words bg-teal-50/50 border border-slate-300">එකතුව</th>
                  <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-500 uppercase break-words border border-slate-300 w-16">ලෙ/පි.</th>
                  {showManualRow && <th className="px-1 py-2 text-[10px] md:text-xs leading-tight font-bold text-slate-600 uppercase break-words bg-slate-50/50 border border-slate-300 w-12"></th>}
                </tr>
              </thead>
              <tbody>
                {showManualRow && (
                  <tr className="bg-yellow-50/50">
                    <td className="px-1 py-1 border border-slate-300"><input type="text" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.memberNo} onChange={(e) => setManualRowData({...manualRowData, memberNo: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300"><input type="text" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.name} onChange={(e) => setManualRowData({...manualRowData, name: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300"><input type="text" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.receiptNo} onChange={(e) => setManualRowData({...manualRowData, receiptNo: e.target.value})} /></td>
                    
                    <td className="px-1 py-1 border border-slate-300"><input type="number" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.shares} onChange={(e) => setManualRowData({...manualRowData, shares: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300"><input type="number" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.loan} onChange={(e) => setManualRowData({...manualRowData, loan: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300"><input type="number" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.interest} onChange={(e) => setManualRowData({...manualRowData, interest: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300"><input type="number" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.deposits} onChange={(e) => setManualRowData({...manualRowData, deposits: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300"><input type="number" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.other} onChange={(e) => setManualRowData({...manualRowData, other: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300"><input type="number" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.totalAmount} onChange={(e) => setManualRowData({...manualRowData, totalAmount: e.target.value})} /></td>
                    
                    <td className="px-1 py-1 border border-slate-300"><input type="text" className="w-full text-xs px-1 py-1 border rounded" value={manualRowData.ledgerFolio} onChange={(e) => setManualRowData({...manualRowData, ledgerFolio: e.target.value})} /></td>
                    <td className="px-1 py-1 border border-slate-300 text-center">
                      <button onClick={handleSaveManualRow} className="text-green-600 hover:text-green-800"><Check className="w-4 h-4"/></button>
                    </td>
                  </tr>
                )}
                {records.length === 0 && !showManualRow ? (
                  <tr>
                    <td colSpan={showManualRow ? "11" : "10"} className="px-2 py-12 text-center text-slate-400 border border-slate-300">
                      <div className="flex flex-col items-center justify-center">
                        <FileText className="w-12 h-12 mb-3 text-slate-200" />
                        <p className="text-xs">No records found. Add an entry above to get started.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  records.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.memberNo || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-900 font-medium break-words border border-slate-300">{record.name}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-700 break-words border border-slate-300">{record.receiptNo || '-'}</td>
                      
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.shares?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.loan?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.interest?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.deposits?.toFixed(2) || '-'}</td>
                      <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300">{record.other?.toFixed(2) || '-'}</td>
                      
                      <td className="px-1 py-2 text-xs leading-tight font-bold text-teal-700 bg-teal-50/10 break-words border border-slate-300">{record.totalAmount?.toFixed(2) || '-'}</td>
                      
                      <td className="px-1 py-2 text-xs leading-tight text-slate-500 break-words border border-slate-300">{record.ledgerFolio || '-'}</td>
                      {showManualRow && <td className="px-1 py-2 text-xs leading-tight text-slate-600 break-words border border-slate-300 text-center"></td>}
                    </tr>
                  ))
                )}
                
                {/* 1. Mema Satahane (This record) */}
                <tr className="bg-slate-50/80 font-bold">
                  <td colSpan="3" className="px-2 py-3 text-sm leading-tight text-slate-800 text-right break-words border border-slate-300">මෙම සටහනේ</td>
                  <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.shares.toFixed(2)}</td>
                  <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.loan.toFixed(2)}</td>
                  <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.interest.toFixed(2)}</td>
                  <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.deposits.toFixed(2)}</td>
                  <td className="px-1 py-3 text-xs leading-tight text-slate-800 break-words border border-slate-300">{totals.other.toFixed(2)}</td>
                  <td className="px-1 py-3 text-xs leading-tight text-teal-800 break-words border border-slate-300 bg-teal-50/50">{totals.totalAmount.toFixed(2)}</td>
                  <td colSpan={showManualRow ? 2 : 1} className="px-1 py-3 border border-slate-300 bg-slate-50/80"></td>
                </tr>
                
                {/* 2. Pera Satahane (Previous record inputs) */}
                <tr className="bg-slate-50/80 font-bold group">
                  <td colSpan="3" className="px-2 py-3 text-sm leading-tight text-slate-800 text-right break-words border border-slate-300 transition-colors group-hover:bg-teal-50/30">පෙර සටහනේ</td>
                  <td className="px-1 py-1 border border-slate-300 bg-teal-50/30">
                    <input type="number" step="0.01" className="w-full h-full bg-white border border-slate-300 rounded focus:ring-2 focus:ring-teal-400 text-xs px-2 py-1.5 outline-none" placeholder="0.00" value={peraSatahane.shares} onChange={(e) => setPeraSatahane({...peraSatahane, shares: e.target.value})} />
                  </td>
                  <td className="px-1 py-1 border border-slate-300 bg-teal-50/30">
                    <input type="number" step="0.01" className="w-full h-full bg-white border border-slate-300 rounded focus:ring-2 focus:ring-teal-400 text-xs px-2 py-1.5 outline-none" placeholder="0.00" value={peraSatahane.loan} onChange={(e) => setPeraSatahane({...peraSatahane, loan: e.target.value})} />
                  </td>
                  <td className="px-1 py-1 border border-slate-300 bg-teal-50/30">
                    <input type="number" step="0.01" className="w-full h-full bg-white border border-slate-300 rounded focus:ring-2 focus:ring-teal-400 text-xs px-2 py-1.5 outline-none" placeholder="0.00" value={peraSatahane.interest} onChange={(e) => setPeraSatahane({...peraSatahane, interest: e.target.value})} />
                  </td>
                  <td className="px-1 py-1 border border-slate-300 bg-teal-50/30">
                    <input type="number" step="0.01" className="w-full h-full bg-white border border-slate-300 rounded focus:ring-2 focus:ring-teal-400 text-xs px-2 py-1.5 outline-none" placeholder="0.00" value={peraSatahane.deposits} onChange={(e) => setPeraSatahane({...peraSatahane, deposits: e.target.value})} />
                  </td>
                  <td className="px-1 py-1 border border-slate-300 bg-teal-50/30">
                    <input type="number" step="0.01" className="w-full h-full bg-white border border-slate-300 rounded focus:ring-2 focus:ring-teal-400 text-xs px-2 py-1.5 outline-none" placeholder="0.00" value={peraSatahane.other} onChange={(e) => setPeraSatahane({...peraSatahane, other: e.target.value})} />
                  </td>
                  <td className="px-1 py-1 border border-slate-300 bg-teal-50/30">
                    <input type="number" step="0.01" className="w-full h-full bg-white border border-slate-300 rounded focus:ring-2 focus:ring-teal-400 text-xs px-2 py-1.5 text-teal-800 font-bold outline-none" placeholder="0.00" value={peraSatahane.totalAmount} onChange={(e) => setPeraSatahane({...peraSatahane, totalAmount: e.target.value})} />
                  </td>
                  <td colSpan={showManualRow ? 2 : 1} className="px-1 py-3 border border-slate-300 bg-slate-50/80"></td>
                </tr>
                
                {/* 3. Dinayata Ekathuwa (Grand Total) */}
                <tr className="bg-teal-100/60 font-extrabold text-teal-900 border-t-2 border-teal-300 shadow-sm">
                  <td colSpan="3" className="px-2 py-4 text-[15px] leading-tight text-right break-words border border-slate-300">දිනයට එකතුව</td>
                  <td className="px-2 py-4 text-sm leading-tight break-words border border-slate-300">{(totals.shares + (parseFloat(peraSatahane.shares) || 0)).toFixed(2)}</td>
                  <td className="px-2 py-4 text-sm leading-tight break-words border border-slate-300">{(totals.loan + (parseFloat(peraSatahane.loan) || 0)).toFixed(2)}</td>
                  <td className="px-2 py-4 text-sm leading-tight break-words border border-slate-300">{(totals.interest + (parseFloat(peraSatahane.interest) || 0)).toFixed(2)}</td>
                  <td className="px-2 py-4 text-sm leading-tight break-words border border-slate-300">{(totals.deposits + (parseFloat(peraSatahane.deposits) || 0)).toFixed(2)}</td>
                  <td className="px-2 py-4 text-sm leading-tight break-words border border-slate-300">{(totals.other + (parseFloat(peraSatahane.other) || 0)).toFixed(2)}</td>
                  <td className="px-2 py-4 text-sm leading-tight break-words border border-slate-300 bg-teal-200/50">{(totals.totalAmount + (parseFloat(peraSatahane.totalAmount) || 0)).toFixed(2)}</td>
                  <td colSpan={showManualRow ? 2 : 1} className="px-1 py-3 border border-slate-300"></td>
                </tr>
              </tbody>
            </table>
            </div>

            {/* Sign-off Section */}
            <div className="mt-8 border-t border-slate-300 pt-8 space-y-12">
              <div className="flex flex-col gap-6">
                 <div className="text-sm font-semibold text-slate-800 leading-8">
                    මෙදින එකතු කරන ලද රුපියල්
                    <input type="text" className="w-64 mx-2 border-b-2 border-dotted border-slate-400 bg-transparent px-2 py-1 focus:outline-none focus:border-teal-500 transition-colors inline-block" placeholder="රුපියල් ගණන..." />
                    ශත
                    <input type="text" className="w-24 mx-2 border-b-2 border-dotted border-slate-400 bg-transparent px-2 py-1 focus:outline-none focus:border-teal-500 transition-colors inline-block" placeholder="ශත ගණන..." />
                    හරි ආකර මම සටහන් කර ඇති බවත් එම මුදල් එකතුකරන්නට භාර දුන් බවත් මෙයින් සහතික කරමි.
                 </div>
                 <div className="flex justify-between items-end mt-4">
                    <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                       <span>දිනය:</span>
                       <input type="date" className="border-b-2 border-dotted border-slate-400 bg-transparent px-2 py-1 focus:outline-none focus:border-teal-500 transition-colors" />
                    </div>
                    <div className="text-sm font-semibold text-slate-800 text-center">
                       <input type="text" className="w-48 border-b-2 border-dotted border-slate-400 bg-transparent px-2 py-1 mb-2 focus:outline-none focus:border-teal-500 transition-colors text-center" placeholder="අත්සන..." /><br />
                       කළමනාකරු
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-6 border-t border-slate-200 pt-8">
                 <p className="text-sm font-semibold text-slate-800 text-center">
                    ඉහත සඳහන් මුදල පරිහරණ භාරදුන් බව මෙයින් සහතික කරමි.
                 </p>
                 <div className="flex justify-between items-end mt-4">
                    <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                       <span>දිනය:</span>
                       <input type="date" className="border-b-2 border-dotted border-slate-400 bg-transparent px-2 py-1 focus:outline-none focus:border-teal-500 transition-colors" />
                    </div>
                    <div className="text-sm font-semibold text-slate-800 text-center">
                       <input type="text" className="w-48 border-b-2 border-dotted border-slate-400 bg-transparent px-2 py-1 mb-2 focus:outline-none focus:border-teal-500 transition-colors text-center" placeholder="අත්සන..." /><br />
                       මුදල් එකතුකරන්නා
                    </div>
                 </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
