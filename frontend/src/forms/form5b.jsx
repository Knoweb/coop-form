import React, { useState } from 'react';
import FormHeader from '../components/FormHeader';

import { FileText, PlusCircle, Trash2, Save, Plus } from 'lucide-react';

export default function Form5B() {
  const [formData, setFormData] = useState({
    head: "ගිණුම් මාරු", subHead: "අභ්‍යන්තර", no: "TR-501", approvedBy: "ඒ. එම්. පෙරේරා", preparedBy: "එන්. පී. කුමාර"
  });

  const [records, setRecords] = useState([
    { date: "2026-09-06", description: "ප්‍රධාන ගිණුමට මාරු කිරීම", account: "A/C 102", rs: "50000", cts: "00" },
    { date: "2026-09-06", description: "සුබසාධක අරමුදලට මාරු කිරීම", account: "A/C 450", rs: "15000", cts: "00" }
  ]);


  const [tableRows, setTableRows] = useState([
    { date: '2026-09-06', description: 'ප්‍රධාන ගිණුමට මාරු කිරීම', account: 'A/C 102', rs: '50000', cts: '00' },
    { date: '2026-09-06', description: 'සුබසාධක අරමුදලට මාරු කිරීම', account: 'A/C 450', rs: '15000', cts: '00' },
    { date: '', description: '', account: '', rs: '', cts: '' }
  ]);

  const handleRowChange = (idx, field, value) => {
    const newRows = [...tableRows];
    newRows[idx][field] = value;
    setTableRows(newRows);
  };

  const addTableRow = () => {
    setTableRows(prev => [...prev, { date: '', description: '', account: '', rs: '', cts: '' }]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRecordChange = (index, field, value) => {
    const newRecords = [...records];
    newRecords[index][field] = value;
    setRecords(newRecords);
  };

  const addRecord = () => {
    setRecords([...records, { date: "", description: "", account: "", rs: "", cts: "" }]);
  };

  const removeRecord = (index) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  const defaultRecords = [
    { date: "2026-09-06", description: "ප්‍රධාන ගිණුමට මාරු කිරීම", account: "A/C 102", rs: "50000", cts: "00" },
    { date: "2026-09-06", description: "සුබසාධක අරමුදලට මාරු කිරීම", account: "A/C 450", rs: "15000", cts: "00" }
  ];

  
  const displayRecords = records;

  
  const handleClear = () => {
    const emptyFormData = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
    setFormData(emptyFormData);
    const emptyRecord = Object.keys(records[0]).reduce((acc, key) => ({ ...acc, [key]: "" }), {});
    setRecords([emptyRecord]);
  };

  const handleSubmit = () => {
    alert('Form data submitted successfully!');
  };

  return (
    <div className="flex-1 bg-slate-50 min-h-screen font-sans overflow-x-hidden p-4 md:p-8 print:bg-white print:p-0">
      <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-12 print:pb-0 print:space-y-0">
        
        {/* Header Section */}
        <FormHeader 
          title="අනුමත කළ මාරුකිරීම්" 
          subtitle="Approved Transfers" 
          formNumber="Form 5B" 
        />
        <div className="flex justify-end items-center gap-3 print:hidden mb-6">
          <button onClick={handleClear} className="flex items-center gap-2 bg-rose-50 hover:bg-rose-100 text-rose-600 px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm border border-rose-200">
              <Trash2 className="w-5 h-5" />
              Clear Form
            </button>
<button onClick={handleSubmit} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl transition-colors font-semibold shadow-sm">
              <Save className="w-5 h-5" />
              Print Voucher
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Head (ශීර්ෂය)</label>
                <input type="text" name="head" value={formData.head} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Sub-head (උප ශීර්ෂය)</label>
                <input type="text" name="subHead" value={formData.subHead} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">No (අංක)</label>
                <input type="text" name="no" value={formData.no} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
            </div>

            <div className="mt-10 mb-4 border-b border-slate-200 pb-2">
              <h3 className="text-md font-bold text-slate-700">Records (වාර්තා)</h3>
            </div>
            
            <div className="space-y-4">
              {records.map((rec, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 items-start md:items-center p-4 border border-slate-200 rounded-xl bg-slate-50 relative group">
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full">
                    <div className="col-span-2 md:col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Date (දිනය)</label>
                      <input type="date" value={rec.date} onChange={e => handleRecordChange(index, 'date', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue" />
                    </div>
                    <div className="col-span-2 md:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Description (විස්තර)</label>
                      <input type="text" value={rec.description} onChange={e => handleRecordChange(index, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue" />
                    </div>
                    <div className="col-span-2 md:col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Account (ගිණුම)</label>
                      <input type="text" value={rec.account} onChange={e => handleRecordChange(index, 'account', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Rs (රු)</label>
                      <input type="number" value={rec.rs} onChange={e => handleRecordChange(index, 'rs', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue font-mono" />
                    </div>
                    <div className="col-span-1 space-y-1">
                      <label className="text-xs font-semibold text-slate-500 uppercase">Cts (ශ)</label>
                      <input type="number" value={rec.cts} onChange={e => handleRecordChange(index, 'cts', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-slncc-blue focus:ring-1 focus:ring-slncc-blue font-mono" />
                    </div>
                  </div>
                  {records.length > 1 && (
                    <button onClick={() => removeRecord(index)} className="md:absolute md:-right-2 md:-top-2 p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors bg-white shadow-sm border border-rose-100 md:opacity-0 md:group-hover:opacity-100 mt-2 md:mt-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <button onClick={addRecord} className="mt-4 flex items-center gap-2 text-sm text-slncc-red font-semibold hover:text-slncc-blue p-2 hover:bg-slncc-gray rounded-lg transition-colors">
              <PlusCircle className="w-5 h-5" /> Add Row
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Approved By (අනුමත කළේ)</label>
                <input type="text" name="approvedBy" value={formData.approvedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Prepared By (පිළියෙල කළේ)</label>
                <input type="text" name="preparedBy" value={formData.preparedBy} onChange={handleInputChange} className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slncc-blue focus:border-slncc-blue transition-colors" />
              </div>
            </div>
          </div>
        </div>

        {/* Paper Container (Printable) */}
        <div className="bg-white shadow-xl border border-slate-300 p-8 md:p-12 text-slate-900 mx-auto font-serif relative print:shadow-none print:border-none print:p-0">
          
          <div className="absolute top-8 right-12 font-bold text-sm print:hidden">
            Form 5B Preview
          </div>
          <div className="hidden print:block absolute top-0 right-0 font-bold text-sm">
            Form 5 B
          </div>

          <div className="flex justify-between items-start mb-6">
            <div className="w-1/3 space-y-1 mt-4">
              <div className="flex items-end">
                <span className="w-24 font-bold">ශීර්ෂය</span>
                <span className="flex-1 font-mono text-slncc-blue print:text-black leading-none">{formData.head }</span>
              </div>
              <div className="flex items-end mt-2">
                <span className="w-24 font-bold">උප ශීර්ෂය</span>
                <span className="flex-1 font-mono text-slncc-blue print:text-black leading-none">{formData.subHead }</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center">
              <h2 className="text-xl font-bold underline decoration-1 underline-offset-4 mb-2">වවුචරය</h2>
              <h3 className="text-lg font-bold underline decoration-1 underline-offset-4">අනුමත කළ මාරුකිරීම්</h3>
            </div>
            
            <div className="w-1/3 flex justify-end mt-4">
              <div className="flex items-end">
                <span className="font-bold mr-4">අංක</span>
                <span className="w-24 border-b border-dotted border-slate-600 text-center font-mono text-slncc-blue print:text-black">{formData.no }</span>
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full border-collapse border-2 border-slate-900 mb-8 mt-6">
            <thead>
              <tr>
                <th className="border-2 border-slate-900 p-2 text-center w-32 font-bold">දිනය</th>
                <th className="border-2 border-slate-900 p-2 text-center font-bold">විස්තර</th>
                <th className="border-2 border-slate-900 p-2 text-center w-32 font-bold">ගිණුම</th>
                <th className="border-2 border-slate-900 p-1 text-center w-48 font-bold" colSpan="2">මුදල</th>
              </tr>
            </thead>
            <tbody>
              <tr className="h-12">
                <td className="border border-slate-900 p-2 text-center text-sm">2026-09-06</td>
                <td className="border border-slate-900 p-2 text-sm">ප්‍රධාන ගිණුමට මාරු කිරීම</td>
                <td className="border border-slate-900 p-2 text-center text-sm">A/C 102</td>
                <td className="border border-slate-900 p-2 text-right w-24 font-mono text-sm border-r-0">50000</td>
                <td className="border border-slate-900 p-2 text-center w-12 font-mono text-sm border-l-0">00</td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2 text-center text-sm">2026-09-06</td>
                <td className="border border-slate-900 p-2 text-sm">සුබසාධක අරමුදලට මාරු කිරීම</td>
                <td className="border border-slate-900 p-2 text-center text-sm">A/C 450</td>
                <td className="border border-slate-900 p-2 text-right w-24 font-mono text-sm border-r-0">15000</td>
                <td className="border border-slate-900 p-2 text-center w-12 font-mono text-sm border-l-0">00</td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2 border-r-0"></td>
                <td className="border border-slate-900 p-2 border-l-0"></td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2 border-r-0"></td>
                <td className="border border-slate-900 p-2 border-l-0"></td>
              </tr>
              <tr className="h-12">
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2"></td>
                <td className="border border-slate-900 p-2 border-r-0"></td>
                <td className="border border-slate-900 p-2 border-l-0"></td>
              </tr>
            </tbody>
          </table>

          {/* Footer Signatures */}
          <div className="flex justify-between items-end mt-16 px-4">
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm">{formData.approvedBy }</span>
              <span className="font-bold">අනුමත කළේ</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-sm">{formData.preparedBy }</span>
              <span className="font-bold">පිළියෙල කළේ</span>
            </div>

            <div className="flex flex-col items-center w-48">
              <span className="w-full border-b border-dotted border-slate-900 mb-2"></span>
              <span className="font-bold">අත්සන</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
