import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const INITIAL_FORM_STATE = {
  date: '',
  debitAccountNo: '',
  debitDescription: '',
  debitSubTotal: '',
  debitBalance: '',
  creditAccountNo: '',
  creditDescription: '',
  creditSubTotal: '',
  creditBalance: ''
};

const InputField = ({ label, sinhalaLabel, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1">
      {label} <span className="text-xs font-normal text-slate-500">({sinhalaLabel})</span>
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
    />
  </div>
);

export default function TransferRegisterForm() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    fetch('http://localhost:8080/api/transfer-register')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setRecords(data);
        } else {
          console.error("API returned non-array data:", data);
          setRecords([]);
        }
      })
      .catch(err => console.error("Failed to fetch records:", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const parseNumber = (val) => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    const newRecord = {
      ...formData,
      debitSubTotal: parseNumber(formData.debitSubTotal),
      debitBalance: parseNumber(formData.debitBalance),
      creditSubTotal: parseNumber(formData.creditSubTotal),
      creditBalance: parseNumber(formData.creditBalance)
    };

    try {
      const res = await fetch('http://localhost:8080/api/transfer-register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecord),
      });

      if (!res.ok) {
        throw new Error('HTTP ' + res.status);
      }
      
      const savedRecord = await res.json();
      setRecords([...records, savedRecord]);
      setFormData(INITIAL_FORM_STATE);
    } catch (error) {
      console.error("Database save failed:", error);
      alert("Failed to save to the database. Check the console for exact errors.");
    }
  };

  const handleRemoveRecord = (id) => {
    setRecords(records.filter(record => record.id !== id));
  };

  const totalDebitBalance = records.reduce((sum, record) => sum + (record.debitBalance || 0), 0);
  const totalCreditBalance = records.reduce((sum, record) => sum + (record.creditBalance || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Section: Data Entry Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Transfer Register (පැවරැම් පොත)</h2>
          <p className="text-slate-500 text-sm">Data Entry Form</p>
        </div>

        <form onSubmit={handleAddEntry} className="p-6 space-y-8">
          
          <div className="w-full md:w-1/3">
             <InputField value={formData?.date || ''} onChange={handleChange} label="Date" sinhalaLabel="දිනය" name="date" type="date" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 pt-6">
            
            {/* Debit Side (Left Column) */}
            <div className="space-y-4 p-5 rounded-xl border border-indigo-100 bg-indigo-50/30">
              <h3 className="text-lg font-bold text-indigo-700 border-b border-indigo-200 pb-2">Accounts to be Debited (බැරවිය යුතු ගිණුම්)</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField value={formData?.debitAccountNo || ''} onChange={handleChange} label="Account/Voucher No." sinhalaLabel="ගිණුම්/වවුචර් අංකය" name="debitAccountNo" />
                  <InputField value={formData?.debitDescription || ''} onChange={handleChange} label="Description" sinhalaLabel="විස්තරය" name="debitDescription" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField value={formData?.debitSubTotal || ''} onChange={handleChange} label="Sub Total" sinhalaLabel="උප එකතුව" name="debitSubTotal" type="number" />
                  <InputField value={formData?.debitBalance || ''} onChange={handleChange} label="Balance" sinhalaLabel="ශේෂය" name="debitBalance" type="number" />
                </div>
              </div>
            </div>

            {/* Credit Side (Right Column) */}
            <div className="space-y-4 p-5 rounded-xl border border-teal-100 bg-teal-50/30">
              <h3 className="text-lg font-bold text-teal-700 border-b border-teal-200 pb-2">Accounts to be Credited (හරවිය යුතු ගිණුම්)</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <InputField value={formData?.creditAccountNo || ''} onChange={handleChange} label="Account/Voucher No." sinhalaLabel="ගිණුම්/වවුචර් අංකය" name="creditAccountNo" />
                  <InputField value={formData?.creditDescription || ''} onChange={handleChange} label="Description" sinhalaLabel="විස්තරය" name="creditDescription" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <InputField value={formData?.creditSubTotal || ''} onChange={handleChange} label="Sub Total" sinhalaLabel="උප එකතුව" name="creditSubTotal" type="number" />
                  <InputField value={formData?.creditBalance || ''} onChange={handleChange} label="Balance" sinhalaLabel="ශේෂය" name="creditBalance" type="number" />
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button 
              type="submit"
              className="flex items-center space-x-2 px-6 py-2 border-2 border-indigo-600 text-indigo-700 hover:bg-indigo-50 font-bold rounded-xl transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Add Entry</span>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Section: The Ledger Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800">Register View</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-max">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase text-center">
              <tr>
                <th rowSpan="2" className="border border-slate-300 p-2 bg-slate-100">Date<br/><span className="text-[10px] font-normal normal-case">දිනය</span></th>
                <th colSpan="4" className="border border-slate-300 p-2 bg-indigo-50/80 text-indigo-800 text-sm">Accounts to be Debited (බැරවිය යුතු ගිණුම්)</th>
                <th colSpan="4" className="border border-slate-300 p-2 bg-teal-50/80 text-teal-800 text-sm">Accounts to be Credited (හරවිය යුතු ගිණුම්)</th>
                <th rowSpan="2" className="border border-slate-300 p-2">Actions</th>
              </tr>
              <tr>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-indigo-50/50">Acc/Voucher No.<br/><span className="text-[10px] font-normal normal-case">අංකය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-indigo-50/50">Description<br/><span className="text-[10px] font-normal normal-case">විස්තරය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-indigo-50/50">Sub Total<br/><span className="text-[10px] font-normal normal-case">උප එකතුව</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-indigo-50/50">Balance<br/><span className="text-[10px] font-normal normal-case">ශේෂය</span></th>
                
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-teal-50/50">Acc/Voucher No.<br/><span className="text-[10px] font-normal normal-case">අංකය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-teal-50/50">Description<br/><span className="text-[10px] font-normal normal-case">විස්තරය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-teal-50/50">Sub Total<br/><span className="text-[10px] font-normal normal-case">උප එකතුව</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-teal-50/50">Balance<br/><span className="text-[10px] font-normal normal-case">ශේෂය</span></th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && (
                <tr>
                  <td colSpan="10" className="p-8 text-center text-slate-500 border border-slate-200">
                    No records added yet. Fill the form above and click "Add Entry".
                  </td>
                </tr>
              )}
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 even:bg-gray-50 transition-colors">
                  <td className="border border-slate-200 px-2 py-1.5 text-center whitespace-nowrap">{record.date}</td>
                  
                  {/* Debit Side */}
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.debitAccountNo}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.debitDescription}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-medium text-slate-600">{record.debitSubTotal > 0 ? record.debitSubTotal.toFixed(2) : ''}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-bold text-indigo-600">{record.debitBalance > 0 ? record.debitBalance.toFixed(2) : ''}</td>
                  
                  {/* Credit Side */}
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.creditAccountNo}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.creditDescription}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-medium text-slate-600">{record.creditSubTotal > 0 ? record.creditSubTotal.toFixed(2) : ''}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-bold text-teal-600">{record.creditBalance > 0 ? record.creditBalance.toFixed(2) : ''}</td>
                  
                  <td className="border border-slate-200 p-2 text-center">
                    <button
                      onClick={() => handleRemoveRecord(record.id)}
                      className="p-1.5 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                      title="Remove Row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {/* Totals Row */}
              {records.length > 0 && (
                <tr className="bg-slate-100 font-bold">
                  <td colSpan="4" className="border border-slate-300 px-4 py-2 text-right text-slate-700">Total Debit Balance:</td>
                  <td className="border border-slate-300 px-2 py-2 text-right text-indigo-700 text-lg">{totalDebitBalance.toFixed(2)}</td>
                  <td colSpan="3" className="border border-slate-300 px-4 py-2 text-right text-slate-700">Total Credit Balance:</td>
                  <td className="border border-slate-300 px-2 py-2 text-right text-teal-700 text-lg">{totalCreditBalance.toFixed(2)}</td>
                  <td className="border border-slate-300"></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
