import React, { useState } from 'react';
import { FileText, Save, Plus } from 'lucide-react';
import FormHeader from '../components/FormHeader';

export default function Form7A() {
  const [formData, setFormData] = useState({
    societyName: "",
    branchName: "",
    sales: "",
    rice: "",
    fert: "",
    memDep: "",
    nonMemDep: "",
    memShare: "",
    memLoan: "",
    memInt: "",
    other: "",
    depRef: "",
    memRef: "",
    balance: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    alert('Form data submitted successfully!');
  };

  // Hardcoded preview table data
  
    const [rows, setRows] = useState([

    { id: 1, name: "මහනුවර ශාඛාව", sales: "15,000.00", rice: "5,000.00", fert: "0.00", memDep: "2,500.00", nonMemDep: "0.00", memShare: "1,000.00", memLoan: "500.00", memInt: "50.00", other: "", recTotal: "24,050.00", depRef: "1,000.00", memRef: "0.00", balance: "23,050.00", payTotal: "24,050.00" },
    { id: 2, name: "පේරාදෙණිය ශාඛාව", sales: "25,000.00", rice: "8,500.00", fert: "1,500.00", memDep: "4,000.00", nonMemDep: "500.00", memShare: "1,500.00", memLoan: "1,200.00", memInt: "120.00", other: "100.00", recTotal: "42,420.00", depRef: "2,500.00", memRef: "500.00", balance: "39,420.00", payTotal: "42,420.00" },
    { id: 3, name: "කටුගස්තොට ශාඛාව", sales: "18,500.00", rice: "4,200.00", fert: "0.00", memDep: "3,200.00", nonMemDep: "0.00", memShare: "800.00", memLoan: "0.00", memInt: "0.00", other: "", recTotal: "26,700.00", depRef: "0.00", memRef: "0.00", balance: "26,700.00", payTotal: "26,700.00" },
    { id: 4, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" },
    { id: 5, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" },
    { id: 6, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" },
    { id: 7, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" },
    { id: 8, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" },
    { id: 9, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" },
    { id: 10, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" }
  
    ]);

    const handleTableChange = (index, field, value) => {
        const newData = [...rows];
        newData[index][field] = value;
        setRows(newData);
    };

    const addRow = () => {
        setRows([...rows, { id: rows.length + 1, name: "", sales: "", rice: "", fert: "", memDep: "", nonMemDep: "", memShare: "", memLoan: "", memInt: "", other: "", recTotal: "", depRef: "", memRef: "", balance: "", payTotal: "" }]);
    };


  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0 print:max-w-none">
        
        {/* Header Section */}
        <FormHeader 
          title="ප්‍රාදේශික ලැබීම් හා ගෙවීම් පිළිබඳ සටහන" 
          subtitle="Regional Receipts and Payments Note" 
          formNumber="Form 7A" 
        />
        <div className="flex justify-end items-center gap-3 print:hidden mb-6">
          <button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
              <Save className="w-5 h-5" />
              Submit Form
            </button>
        </div>
        {/* Input Form Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden print:hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-slncc-blue" /> 
              Enter Details (විස්තර ඇතුළත් කරන්න)
            </h2>
          </div>
          
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2 lg:col-span-4">
                <label className="text-sm font-semibold text-slate-600">Society Name (සමූපකාර සමිතියේ නම)</label>
                <input type="text" name="societyName" value={formData.societyName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              
              {/* Receipts Group */}
              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-2">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">ලැබීම් (Receipts)</h3>
              </div>
              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Branch Name (සිල්ලර ප්‍රාදේශිකයේ නම)</label>
                <input type="text" name="branchName" value={formData.branchName} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Sales (විකුණුම්)</label>
                <input type="number" name="sales" value={formData.sales} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Rice Trade (හාල් වෙළඳාම)</label>
                <input type="number" name="rice" value={formData.rice} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Fertilizer (පොහොර වෙළඳාම)</label>
                <input type="number" name="fert" value={formData.fert} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Member Dep. (සාමාජික තැන්පත්)</label>
                <input type="number" name="memDep" value={formData.memDep} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Non-Mem Dep. (සාමාජික නොවන තැන්පත්)</label>
                <input type="number" name="nonMemDep" value={formData.nonMemDep} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Member Shares (සාමාජික කොටස්)</label>
                <input type="number" name="memShare" value={formData.memShare} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Member Loans (සාමාජික ණය)</label>
                <input type="number" name="memLoan" value={formData.memLoan} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Member Interest (සාමාජික පොලී)</label>
                <input type="number" name="memInt" value={formData.memInt} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Other (වෙනත්)</label>
                <input type="number" name="other" value={formData.other} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

              {/* Payments Group */}
              <div className="col-span-1 md:col-span-2 lg:col-span-4 mt-4">
                <h3 className="text-md font-bold text-slate-700 border-b pb-2">ගෙවීම් (Payments)</h3>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Dep. Refunds (ස: තැ: ආපසු ගෙවීම්)</label>
                <input type="number" name="depRef" value={formData.depRef} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Member Refunds (සාමාජික ආපසු ගෙවීම්)</label>
                <input type="number" name="memRef" value={formData.memRef} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Balance in Hand (අත ඉතිරි)</label>
                <input type="number" name="balance" value={formData.balance} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>

            </div>
            <p className="text-sm text-amber-600 mt-6 bg-amber-50 p-3 rounded-lg border border-amber-200">
              Note: The complex table data below is heavily hardcoded for preview purposes as requested. You can use these fields to enter data for a single row.
            </p>
          </div>
        </div>
        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-4 md:p-8 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 flex items-end">
              <span className="font-bold mr-2">සීමාසහිත</span>
              <span className="flex-1 border-b border-dotted border-slate-600 font-mono text-slncc-blue print:text-black text-center pb-1">
                {formData.societyName || 'මහනුවර'}
              </span>
              <span className="font-bold ml-2">විවිධ සේවා සමූපකාර සමිතිය</span>
            </div>
            <div className="font-bold text-lg ml-8 whitespace-nowrap">
              7 A
            </div>
          </div>

          <div className="flex justify-center mb-8">
            <h2 className="text-xl font-bold">ප්‍රාදේශික ලැබීම් හා ගෙවීම් පිළිබඳ සටහන</h2>
          </div>

          <div className="flex w-full mb-1">
            <div className="w-[72%] text-center font-bold text-lg">ලැබීම්</div>
            <div className="w-[28%] text-center font-bold text-lg">ගෙවීම්</div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-slate-900 text-[10px] sm:text-xs">
              <thead>
                <tr>
                  <th className="border border-slate-900 p-1 w-6 text-center" rowSpan="2"></th>
                  <th className="border border-slate-900 p-1 w-32 text-center" rowSpan="2">සිල්ලර ප්‍රාදේශිකයේ නම</th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2">විකුණුම්</th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>හාල්</span><span>වෙළඳාම</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>පොහොර</span><span>වෙළඳාම</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>සාමාජික</span><span>තැන්පත්</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-20" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>සාමාජික</span><span>නොවන</span><span>තැන්පත්</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>සාමාජික</span><span>කොටස්</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>සාමාජික</span><span>ණය</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>සාමාජික</span><span>පොලී</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"></th>
                  <th className="border border-slate-900 p-1 text-center w-20" rowSpan="2">එකතුව</th>
                  
                  {/* Payments Group */}
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>ස: තැ:</span><span>ආපසු</span><span>ගෙවීම්</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2"><div className="flex flex-col items-center leading-tight"><span>සාමාජික</span><span>ආපසු</span><span>ගෙවීම්</span></div></th>
                  <th className="border border-slate-900 p-1 text-center w-16" rowSpan="2">අත ඉතිරි</th>
                  <th className="border border-slate-900 p-1 text-center w-20" rowSpan="2">එකතුව</th>
                </tr>
                <tr>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, idx) => (
                  <tr key=<input type="text" value={row.id || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'id', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-center px-1" /> className="h-6">
                    <td className="border border-slate-900 p-1 text-center font-bold"><input type="text" value={row.id || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'id', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-center px-1" />.</td>
                    <td className="border border-slate-900 p-1 truncate max-w-[120px]"><input type="text" value={row.name || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'name', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-center px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.sales || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'sales', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.rice || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'rice', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.fert || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'fert', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.memDep || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'memDep', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.nonMemDep || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'nonMemDep', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.memShare || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'memShare', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.memLoan || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'memLoan', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.memInt || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'memInt', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.other || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'other', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono font-bold text-[10px] sm:text-xs"><input type="text" value={row.recTotal || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'recTotal', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.depRef || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'depRef', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.memRef || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'memRef', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono text-[10px] sm:text-xs"><input type="text" value={row.balance || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'balance', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                    <td className="border border-slate-900 p-1 text-right font-mono font-bold text-[10px] sm:text-xs"><input type="text" value={row.payTotal || ''} onChange={(e) => handleTableChange(row.id - 1 || idx, 'payTotal', e.target.value)} className="w-full bg-transparent outline-none focus:bg-indigo-50 text-inherit font-inherit text-right px-1" /></td>
                  </tr>
                ))}
                
                {/* Blank spacer rows to match image height */}
                {[...Array(10)].map((_, idx) => (
                  <tr key={`spacer-${idx}`} className="h-6">
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td><td className="border-r border-slate-900 p-1"></td>
                    <td className="border-r border-slate-900 p-1"></td><td className="p-1"></td>
                  </tr>
                ))}

                {/* Footer Totals */}
                <tr className="h-8 font-bold border-t border-slate-900">
                  <td colSpan="2" className="border border-slate-900 p-2 text-right">දිනට එකතුව</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">58,500.00</td><td className="border border-slate-900 p-1 text-right font-mono">17,700.00</td><td className="border border-slate-900 p-1 text-right font-mono">1,500.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">9,700.00</td><td className="border border-slate-900 p-1 text-right font-mono">500.00</td><td className="border border-slate-900 p-1 text-right font-mono">3,300.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">1,700.00</td><td className="border border-slate-900 p-1 text-right font-mono">170.00</td><td className="border border-slate-900 p-1 text-right font-mono">100.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">93,170.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">3,500.00</td><td className="border border-slate-900 p-1 text-right font-mono">500.00</td><td className="border border-slate-900 p-1 text-right font-mono">89,170.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">93,170.00</td>
                </tr>
                <tr className="h-8 font-bold">
                  <td colSpan="2" className="border border-slate-900 p-2 text-right">පෙර දිනට</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">120,000.00</td><td className="border border-slate-900 p-1 text-right font-mono">45,000.00</td><td className="border border-slate-900 p-1 text-right font-mono">12,000.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">25,000.00</td><td className="border border-slate-900 p-1 text-right font-mono">2,500.00</td><td className="border border-slate-900 p-1 text-right font-mono">8,500.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">5,000.00</td><td className="border border-slate-900 p-1 text-right font-mono">500.00</td><td className="border border-slate-900 p-1 text-right font-mono">250.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">218,750.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">10,000.00</td><td className="border border-slate-900 p-1 text-right font-mono">2,000.00</td><td className="border border-slate-900 p-1 text-right font-mono">206,750.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">218,750.00</td>
                </tr>
                <tr className="h-8 font-bold bg-slate-100 border-b-2 border-slate-900">
                  <td colSpan="2" className="border border-slate-900 p-2 text-right">මුළු එකතුව</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">178,500.00</td><td className="border border-slate-900 p-1 text-right font-mono">62,700.00</td><td className="border border-slate-900 p-1 text-right font-mono">13,500.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">34,700.00</td><td className="border border-slate-900 p-1 text-right font-mono">3,000.00</td><td className="border border-slate-900 p-1 text-right font-mono">11,800.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">6,700.00</td><td className="border border-slate-900 p-1 text-right font-mono">670.00</td><td className="border border-slate-900 p-1 text-right font-mono">350.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">311,920.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">13,500.00</td><td className="border border-slate-900 p-1 text-right font-mono">2,500.00</td><td className="border border-slate-900 p-1 text-right font-mono">295,920.00</td>
                  <td className="border border-slate-900 p-1 text-right font-mono">311,920.00</td>
                </tr>
              </tbody>
            </table>
                <button onClick={addRow} className="mt-4 flex items-center gap-1 px-3 py-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 font-medium text-sm transition-colors print:hidden">
                    <Plus className="w-4 h-4" /> Add Row
                </button>
        
          </div>

          <div className="flex justify-between items-end mt-16 px-8 text-sm">
            <div className="flex flex-col items-center">
              <span className="w-64 border-b border-slate-900 border-dotted mb-1"></span>
              <span className="font-bold">පිළියෙල කළේ</span>
            </div>
            
            <div className="flex flex-col items-center">
              <span className="w-64 border-b border-slate-900 border-dotted mb-1"></span>
              <span className="font-bold">පරීක්ෂා කළේ</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
