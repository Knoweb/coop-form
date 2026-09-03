import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';

const INITIAL_FORM_STATE = {
  sectionNo: '',
  property: '',
  policyNo: '',
  insuredAmount: '',
  insuredPeriod: '',
  annualPremium: '',
  jan: '0',
  feb: '0',
  mar: '0',
  apr: '0',
  may: '0',
  jun: '0',
  jul: '0',
  aug: '0',
  sep: '0',
  oct: '0',
  nov: '0',
  dec: '0'
};

const MONTHS = [
  { key: 'jan', label: 'January', sinhalaLabel: 'ජනවාරි', shortEn: 'Jan' },
  { key: 'feb', label: 'February', sinhalaLabel: 'පෙබරවාරි', shortEn: 'Feb' },
  { key: 'mar', label: 'March', sinhalaLabel: 'මාර්තු', shortEn: 'Mar' },
  { key: 'apr', label: 'April', sinhalaLabel: 'අප්‍රේල්', shortEn: 'Apr' },
  { key: 'may', label: 'May', sinhalaLabel: 'මැයි', shortEn: 'May' },
  { key: 'jun', label: 'June', sinhalaLabel: 'ජූනි', shortEn: 'Jun' },
  { key: 'jul', label: 'July', sinhalaLabel: 'ජූලි', shortEn: 'Jul' },
  { key: 'aug', label: 'August', sinhalaLabel: 'අගෝස්තු', shortEn: 'Aug' },
  { key: 'sep', label: 'September', sinhalaLabel: 'සැප්තැම්බර්', shortEn: 'Sep' },
  { key: 'oct', label: 'October', sinhalaLabel: 'ඔක්තෝබර්', shortEn: 'Oct' },
  { key: 'nov', label: 'November', sinhalaLabel: 'නොවැම්බර්', shortEn: 'Nov' },
  { key: 'dec', label: 'December', sinhalaLabel: 'දෙසැ:', shortEn: 'Dec' }
];

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

export default function AnnualInsuredJournal() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    fetch('http://localhost:8080/api/annual-insured')
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

    let monthsTotal = 0;
    MONTHS.forEach(m => {
      monthsTotal += parseNumber(formData[m.key]);
    });

    const newRecord = {
      ...formData,
      insuredAmount: parseNumber(formData.insuredAmount),
      annualPremium: parseNumber(formData.annualPremium),
      total: monthsTotal
    };

    try {
      const res = await fetch('http://localhost:8080/api/annual-insured', {
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
          <h2 className="text-xl font-bold text-slate-800">Annual Insured Journal</h2>
          <p className="text-slate-500 text-sm">වාර්ෂික රක්ෂණ ජර්නලය - දත්ත ඇතුලත් කිරීම</p>
        </div>

        <form onSubmit={handleAddEntry} className="p-6 space-y-8">
          
          {/* Group 1: General Details */}
          <div>
            <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Policy Details (පොලිසි විස්තර)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <InputField value={formData?.sectionNo || ''} onChange={handleChange} label="Section No" sinhalaLabel="අංශයේ අංකය" name="sectionNo" />
              <InputField value={formData?.property || ''} onChange={handleChange} label="Insured Unit Property" sinhalaLabel="රක්ෂිත දේපල/ස්ථානය" name="property" />
              <InputField value={formData?.policyNo || ''} onChange={handleChange} label="No. of Policy" sinhalaLabel="පොලිසි අංකය" name="policyNo" />
              <InputField value={formData?.insuredAmount || ''} onChange={handleChange} label="Insured Amount" sinhalaLabel="රක්ෂිත වටිනාකම" name="insuredAmount" type="number" />
              <InputField value={formData?.insuredPeriod || ''} onChange={handleChange} label="Insured Period" sinhalaLabel="රක්ෂිත කාලය" name="insuredPeriod" />
              <InputField value={formData?.annualPremium || ''} onChange={handleChange} label="Annual Premi." sinhalaLabel="වාර්ෂික වාරිකය" name="annualPremium" type="number" />
            </div>
          </div>

          {/* Group 2: Monthly Expenditure */}
          <div>
            <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Monthly Breakdown (මාසික විස්තර)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {MONTHS.map(month => (
                <InputField 
                  key={month.key}
                  value={formData?.[month.key] || ''} 
                  onChange={handleChange} 
                  label={month.label} 
                  sinhalaLabel={month.sinhalaLabel} 
                  name={month.key} 
                  type="number" 
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
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
          <h3 className="text-lg font-bold text-slate-800">Journal Ledger</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-max">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase text-center border-b border-slate-200">
              <tr>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Section No<br/><span className="text-[10px] font-normal normal-case">අංශයේ අංකය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Insured Unit Property<br/><span className="text-[10px] font-normal normal-case">රක්ෂිත දේපල/ස්ථානය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">No. of Policy<br/><span className="text-[10px] font-normal normal-case">පොලිසි අංකය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Insured Amount<br/><span className="text-[10px] font-normal normal-case">රක්ෂිත වටිනාකම</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Insured Period<br/><span className="text-[10px] font-normal normal-case">රක්ෂිත කාලය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Annual Premi.<br/><span className="text-[10px] font-normal normal-case">වාර්ෂික වාරිකය</span></th>
                
                <th colSpan="12" className="border border-slate-200 p-2">Year <span className="text-[10px] font-normal normal-case">(වර්ෂය)</span></th>
                
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Total<br/><span className="text-[10px] font-normal normal-case">එකතුව</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2">Actions</th>
              </tr>
              <tr>
                {MONTHS.map(month => (
                  <th key={month.key} className="border border-slate-200 p-2 whitespace-nowrap font-medium">
                    {month.shortEn}<br/><span className="text-[10px] font-normal normal-case">{month.sinhalaLabel}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.length === 0 && (
                <tr>
                  <td colSpan="20" className="p-8 text-center text-slate-500 border border-slate-200">
                    No records added yet. Fill the form above and click "Add Entry".
                  </td>
                </tr>
              )}
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 even:bg-gray-50 transition-colors">
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.sectionNo}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.property}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.policyNo}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-blue-600 font-medium">{record.insuredAmount}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.insuredPeriod}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-blue-600 font-medium">{record.annualPremium}</td>
                  
                  {MONTHS.map(month => (
                    <td key={month.key} className="border border-slate-200 px-2 py-1.5 text-right">
                      {record[month.key]}
                    </td>
                  ))}
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-bold text-indigo-600 bg-indigo-50/20">{record.total?.toFixed(2)}</td>
                  
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
