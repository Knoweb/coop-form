import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const INITIAL_FORM_STATE = {
  date: '',
  descriptionReceipts: '',
  voucherNoReceipts: '',
  receiptsAmount: '',
  descriptionPayments: '',
  voucherNoPayments: '',
  folio: '',
  paymentsAmount: ''
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

export default function GeneralLedgerForm() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    fetch('http://localhost:8080/api/general-ledger')
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
      receiptsAmount: parseNumber(formData.receiptsAmount),
      paymentsAmount: parseNumber(formData.paymentsAmount)
    };

    try {
      const res = await fetch('http://localhost:8080/api/general-ledger', {
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

  const totalReceipts = records.reduce((sum, record) => sum + (record.receiptsAmount || 0), 0);
  const totalPayments = records.reduce((sum, record) => sum + (record.paymentsAmount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Section: Data Entry Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">General Ledger</h2>
          <p className="text-slate-500 text-sm">මහ ලෙජරය - දත්ත ඇතුලත් කිරීම</p>
        </div>

        <form onSubmit={handleAddEntry} className="p-6 space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Receipts Side */}
            <div className="space-y-4 p-4 rounded-xl border border-green-100 bg-green-50/30">
              <h3 className="text-lg font-bold text-green-700 border-b border-green-200 pb-2">Receipts (ලැබීම්)</h3>
              <div className="grid grid-cols-1 gap-4">
                <InputField value={formData?.date || ''} onChange={handleChange} label="Date" sinhalaLabel="දිනය" name="date" type="date" />
                <InputField value={formData?.descriptionReceipts || ''} onChange={handleChange} label="Description" sinhalaLabel="විස්තරය" name="descriptionReceipts" />
                <div className="grid grid-cols-2 gap-4">
                  <InputField value={formData?.voucherNoReceipts || ''} onChange={handleChange} label="Voucher No." sinhalaLabel="වවුචර් අංකය" name="voucherNoReceipts" />
                  <InputField value={formData?.receiptsAmount || ''} onChange={handleChange} label="Amount" sinhalaLabel="මුදල" name="receiptsAmount" type="number" />
                </div>
              </div>
            </div>

            {/* Payments Side */}
            <div className="space-y-4 p-4 rounded-xl border border-red-100 bg-red-50/30">
              <h3 className="text-lg font-bold text-red-700 border-b border-red-200 pb-2">Payments (ගෙවීම්)</h3>
              <div className="grid grid-cols-1 gap-4">
                <InputField value={formData?.descriptionPayments || ''} onChange={handleChange} label="Description" sinhalaLabel="විස්තරය" name="descriptionPayments" />
                <div className="grid grid-cols-3 gap-4">
                  <InputField value={formData?.voucherNoPayments || ''} onChange={handleChange} label="Voucher No." sinhalaLabel="වවුචර් අංකය" name="voucherNoPayments" />
                  <InputField value={formData?.folio || ''} onChange={handleChange} label="Ledger Folio" sinhalaLabel="ලෙජර් පිටුව" name="folio" />
                  <InputField value={formData?.paymentsAmount || ''} onChange={handleChange} label="Amount" sinhalaLabel="මුදල" name="paymentsAmount" type="number" />
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
          <h3 className="text-lg font-bold text-slate-800">Ledger View</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-max">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase text-center">
              <tr>
                <th colSpan="4" className="border border-slate-300 p-2 bg-green-50/50 text-green-800 text-sm">Receipts (ලැබීම්)</th>
                <th colSpan="4" className="border border-slate-300 p-2 bg-red-50/50 text-red-800 text-sm">Payments (ගෙවීම්)</th>
                <th rowSpan="2" className="border border-slate-300 p-2">Actions</th>
              </tr>
              <tr>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-green-50/30">Date<br/><span className="text-[10px] font-normal normal-case">දිනය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-green-50/30">Description<br/><span className="text-[10px] font-normal normal-case">විස්තරය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-green-50/30">Voucher No.<br/><span className="text-[10px] font-normal normal-case">වවුචර් අංකය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-green-50/30">Amount<br/><span className="text-[10px] font-normal normal-case">මුදල</span></th>
                
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-red-50/30">Description<br/><span className="text-[10px] font-normal normal-case">විස්තරය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-red-50/30">Voucher No.<br/><span className="text-[10px] font-normal normal-case">වවුචර් අංකය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-red-50/30">Folio<br/><span className="text-[10px] font-normal normal-case">ලෙජර් පිටුව</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap bg-red-50/30">Amount<br/><span className="text-[10px] font-normal normal-case">මුදල</span></th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && (
                <tr>
                  <td colSpan="9" className="p-8 text-center text-slate-500 border border-slate-200">
                    No records added yet. Fill the form above and click "Add Entry".
                  </td>
                </tr>
              )}
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 even:bg-gray-50 transition-colors">
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.date}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.descriptionReceipts}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.voucherNoReceipts}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-medium text-green-600">{record.receiptsAmount > 0 ? record.receiptsAmount.toFixed(2) : ''}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5">{record.descriptionPayments}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.voucherNoPayments}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.folio}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-medium text-red-500">{record.paymentsAmount > 0 ? record.paymentsAmount.toFixed(2) : ''}</td>
                  
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
                  <td colSpan="3" className="border border-slate-300 px-4 py-2 text-right text-slate-700">Total Receipts:</td>
                  <td className="border border-slate-300 px-2 py-2 text-right text-green-700">{totalReceipts.toFixed(2)}</td>
                  <td colSpan="3" className="border border-slate-300 px-4 py-2 text-right text-slate-700">Total Payments:</td>
                  <td className="border border-slate-300 px-2 py-2 text-right text-red-700">{totalPayments.toFixed(2)}</td>
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
