import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const INITIAL_FORM_STATE = {
  date: '',
  description: '',
  referenceNo: '',
  cat1: '0',
  cat2: '0',
  cat3: '0',
  cat4: '0',
  cat5: '0',
  cat6: '0',
  cat7: '0',
  cat8: '0'
};

const CATEGORIES = [
  { key: 'cat1', label: 'Category 1' },
  { key: 'cat2', label: 'Category 2' },
  { key: 'cat3', label: 'Category 3' },
  { key: 'cat4', label: 'Category 4' },
  { key: 'cat5', label: 'Category 5' },
  { key: 'cat6', label: 'Category 6' },
  { key: 'cat7', label: 'Category 7' },
  { key: 'cat8', label: 'Category 8' }
];

const InputField = ({ label, sinhalaLabel, name, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-slate-700 mb-1">
      {label} {sinhalaLabel && <span className="text-xs font-normal text-slate-500">({sinhalaLabel})</span>}
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

export default function MultiColumnLedgerForm() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    fetch('http://localhost:8080/api/multi-column-ledger')
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

    let rowTotal = 0;
    CATEGORIES.forEach(cat => {
      rowTotal += parseNumber(formData[cat.key]);
    });

    const newRecord = {
      ...formData,
      cat1: parseNumber(formData.cat1),
      cat2: parseNumber(formData.cat2),
      cat3: parseNumber(formData.cat3),
      cat4: parseNumber(formData.cat4),
      cat5: parseNumber(formData.cat5),
      cat6: parseNumber(formData.cat6),
      cat7: parseNumber(formData.cat7),
      cat8: parseNumber(formData.cat8),
      total: rowTotal
    };

    try {
      const res = await fetch('http://localhost:8080/api/multi-column-ledger', {
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

  return (
    <div className="space-y-6">
      {/* Top Section: Data Entry Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800">Multi-Column Ledger</h2>
          <p className="text-slate-500 text-sm">විස්තරාත්මක බෙදාහැරීමේ ජර්නලය - දත්ත ඇතුලත් කිරීම</p>
        </div>

        <form onSubmit={handleAddEntry} className="p-6 space-y-8">
          
          {/* General Details */}
          <div>
            <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">General Details (සාමාන්‍ය විස්තර)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField value={formData?.date || ''} onChange={handleChange} label="Date" sinhalaLabel="දිනය" name="date" type="date" />
              <InputField value={formData?.description || ''} onChange={handleChange} label="Description" sinhalaLabel="විස්තරය" name="description" />
              <InputField value={formData?.referenceNo || ''} onChange={handleChange} label="Reference / Voucher No." sinhalaLabel="සඳහන් අංකය" name="referenceNo" />
            </div>
          </div>

          {/* Distribution Categories */}
          <div>
            <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Distribution Analysis (බෙදාහැරීමේ එකතුව)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {CATEGORIES.map(cat => (
                <InputField 
                  key={cat.key}
                  value={formData?.[cat.key] || ''} 
                  onChange={handleChange} 
                  label={cat.label} 
                  name={cat.key} 
                  type="number" 
                />
              ))}
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
          <h3 className="text-lg font-bold text-slate-800">Distribution Ledger View</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-max">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase text-center border-b border-slate-200">
              <tr>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Date<br/><span className="text-[10px] font-normal normal-case">දිනය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Description<br/><span className="text-[10px] font-normal normal-case">විස්තරය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Ref No.<br/><span className="text-[10px] font-normal normal-case">සඳහන් අංකය</span></th>
                
                <th colSpan="8" className="border border-slate-200 p-2 bg-indigo-50/50">Distribution Analysis (බෙදාහැරීමේ එකතුව)</th>
                
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap bg-indigo-50">Total<br/><span className="text-[10px] font-normal normal-case">එකතුව</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2">Actions</th>
              </tr>
              <tr>
                {CATEGORIES.map(cat => (
                  <th key={cat.key} className="border border-slate-200 p-2 whitespace-nowrap font-medium bg-indigo-50/20 text-[10px]">
                    {cat.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && (
                <tr>
                  <td colSpan="13" className="p-8 text-center text-slate-500 border border-slate-200">
                    No records added yet. Fill the form above and click "Add Entry".
                  </td>
                </tr>
              )}
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 even:bg-gray-50 transition-colors">
                  <td className="border border-slate-200 px-2 py-1.5 text-center whitespace-nowrap">{record.date}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.description}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.referenceNo}</td>
                  
                  {CATEGORIES.map(cat => (
                    <td key={cat.key} className="border border-slate-200 px-2 py-1.5 text-right text-slate-600">
                      {record[cat.key] > 0 ? record[cat.key] : ''}
                    </td>
                  ))}
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-bold text-indigo-600 bg-indigo-50/30">{record.total?.toFixed(2)}</td>
                  
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
