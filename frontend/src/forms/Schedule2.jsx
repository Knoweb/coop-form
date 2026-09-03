import React, { useState, useEffect } from 'react';
import { Save, Plus, Trash2 } from 'lucide-react';

const INITIAL_FORM_STATE = {
  serialNo: '',
  noOfSection: '',
  placeOfWork: '',
  name: '',
  post: '',
  initialSalary: '',
  allowances: '',
  specialAllowances: '',
  othersEarnings: '',
  totalNonApproved: '',
  monthlyAdvances: '',
  festivalAdvances: '',
  loans: '',
  othersDeductions: '',
  epfEmployee: '',
  employeesEpf: ''
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

export default function Schedule2() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    fetch('http://localhost:8080/api/schedule2')
      .then(res => res.json())
      .then(data => setRecords(data))
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

    const earningsTotalApproved = 
      parseNumber(formData.initialSalary) + 
      parseNumber(formData.allowances) + 
      parseNumber(formData.specialAllowances) + 
      parseNumber(formData.othersEarnings);
    
    const totalDeductions = 
      parseNumber(formData.monthlyAdvances) + 
      parseNumber(formData.festivalAdvances) + 
      parseNumber(formData.loans) + 
      parseNumber(formData.othersDeductions) + 
      parseNumber(formData.epfEmployee);

    const balancePaid = earningsTotalApproved - totalDeductions;

    const newRecord = {
      ...formData,
      totalApproved: earningsTotalApproved,
      totalDeductions: totalDeductions,
      balancePaid: balancePaid
    };

    try {
      const res = await fetch('http://localhost:8080/api/schedule2', {
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
          <h2 className="text-xl font-bold text-slate-800">Monthly Salaries Register</h2>
          <p className="text-slate-500 text-sm">මාසික වැටුප් ලේඛනය - දත්ත ඇතුලත් කිරීම</p>
        </div>

        <form onSubmit={handleAddEntry} className="p-6 space-y-8">
          
          {/* Group 1: Employee Details */}
          <div>
            <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Employee Details (සේවක විස්තර)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField value={formData?.serialNo || ''} onChange={handleChange} label="Serial No." sinhalaLabel="අනු අංකය" name="serialNo" />
              <InputField value={formData?.noOfSection || ''} onChange={handleChange} label="No. of Section" sinhalaLabel="අංශයේ අංකය" name="noOfSection" />
              <InputField value={formData?.placeOfWork || ''} onChange={handleChange} label="Place of Work" sinhalaLabel="සේවා ස්ථානය" name="placeOfWork" />
              <InputField value={formData?.name || ''} onChange={handleChange} label="Name" sinhalaLabel="නම" name="name" />
              <InputField value={formData?.post || ''} onChange={handleChange} label="Post" sinhalaLabel="තනතුර" name="post" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Group 2: Earnings */}
            <div>
              <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Earnings (ඉපැයීම්)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField value={formData?.initialSalary || ''} onChange={handleChange} label="Initials Salary" sinhalaLabel="මූලික වැටුප" name="initialSalary" type="number" />
                <InputField value={formData?.allowances || ''} onChange={handleChange} label="Allowances" sinhalaLabel="දීමනා" name="allowances" type="number" />
                <InputField value={formData?.specialAllowances || ''} onChange={handleChange} label="Special Allowances" sinhalaLabel="විශේෂ දීමනා" name="specialAllowances" type="number" />
                <InputField value={formData?.othersEarnings || ''} onChange={handleChange} label="Others" sinhalaLabel="වෙනත්" name="othersEarnings" type="number" />
                <InputField value={formData?.totalNonApproved || ''} onChange={handleChange} label="Non Approved" sinhalaLabel="අනුමත නොකළ" name="totalNonApproved" type="number" />
              </div>
            </div>

            {/* Group 3: Deductions */}
            <div>
              <h3 className="text-lg font-bold text-indigo-700 mb-4 border-b border-indigo-100 pb-2">Deductions (අවකරණ)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField value={formData?.monthlyAdvances || ''} onChange={handleChange} label="Monthly Advances" sinhalaLabel="මාසික අත්තිකාරම්" name="monthlyAdvances" type="number" />
                <InputField value={formData?.festivalAdvances || ''} onChange={handleChange} label="Festival Advances" sinhalaLabel="උත්සව අත්තිකාරම්" name="festivalAdvances" type="number" />
                <InputField value={formData?.loans || ''} onChange={handleChange} label="Loans" sinhalaLabel="ණය" name="loans" type="number" />
                <InputField value={formData?.othersDeductions || ''} onChange={handleChange} label="Others" sinhalaLabel="වෙනත්" name="othersDeductions" type="number" />
                <InputField value={formData?.epfEmployee || ''} onChange={handleChange} label="E.P.F. Employee" sinhalaLabel="සේවක අර්ථසාධක" name="epfEmployee" type="number" />
                <InputField value={formData?.employeesEpf || ''} onChange={handleChange} label="Employers E.P.F." sinhalaLabel="සේවායෝජක අර්ථසාධක" name="employeesEpf" type="number" />
              </div>
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
          <h3 className="text-lg font-bold text-slate-800">Ledger Records</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse min-w-max">
            <thead className="bg-slate-50 text-slate-700 text-xs uppercase text-center border-b border-slate-200">
              <tr>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Serial No.<br/><span className="text-[10px] font-normal normal-case">අනු අංකය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">No. of Section<br/><span className="text-[10px] font-normal normal-case">අංශයේ අංකය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Place of Work<br/><span className="text-[10px] font-normal normal-case">සේවා ස්ථානය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Name<br/><span className="text-[10px] font-normal normal-case">නම</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Post<br/><span className="text-[10px] font-normal normal-case">තනතුර</span></th>
                
                <th colSpan="4" className="border border-slate-200 p-2">Earnings <span className="text-[10px] font-normal normal-case">(ඉපැයීම්)</span></th>
                <th colSpan="2" className="border border-slate-200 p-2">Total <span className="text-[10px] font-normal normal-case">(එකතුව)</span></th>
                <th colSpan="5" className="border border-slate-200 p-2">Deduction <span className="text-[10px] font-normal normal-case">(අවකරණ)</span></th>
                
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Total Deductions<br/><span className="text-[10px] font-normal normal-case">අවකරණ එකතුව</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Balance Paid<br/><span className="text-[10px] font-normal normal-case">ගෙවන ශේෂය</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2 whitespace-nowrap">Employees E.P.F.<br/><span className="text-[10px] font-normal normal-case">සේවායෝජක අර්ථසාධක</span></th>
                <th rowSpan="2" className="border border-slate-200 p-2">Actions</th>
              </tr>
              <tr>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Initials Salary<br/><span className="text-[10px] font-normal normal-case">මූලික වැටුප</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Allowances<br/><span className="text-[10px] font-normal normal-case">දීමනා</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Special Allowances<br/><span className="text-[10px] font-normal normal-case">විශේෂ දීමනා</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Others<br/><span className="text-[10px] font-normal normal-case">වෙනත්</span></th>
                
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium text-indigo-700 bg-indigo-50/50">Approved<br/><span className="text-[10px] font-normal normal-case">අනුමත</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Non Approved<br/><span className="text-[10px] font-normal normal-case">අනුමත නොකළ</span></th>
                
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Monthly Advances<br/><span className="text-[10px] font-normal normal-case">මාසික අත්තිකාරම්</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Festival Advances<br/><span className="text-[10px] font-normal normal-case">උත්සව අත්තිකාරම්</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Loans<br/><span className="text-[10px] font-normal normal-case">ණය</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">Others<br/><span className="text-[10px] font-normal normal-case">වෙනත්</span></th>
                <th className="border border-slate-200 p-2 whitespace-nowrap font-medium">E.P.F. Employee<br/><span className="text-[10px] font-normal normal-case">සේවක අර්ථසාධක</span></th>
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
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.serialNo}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-center">{record.noOfSection}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.placeOfWork}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.name}</td>
                  <td className="border border-slate-200 px-2 py-1.5">{record.post}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-green-600 font-medium">{record.initialSalary}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-green-600 font-medium">{record.allowances}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-green-600 font-medium">{record.specialAllowances}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-green-600 font-medium">{record.othersEarnings}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-bold text-indigo-600 bg-indigo-50/20">{record.totalApproved?.toFixed(2)}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right">{record.totalNonApproved}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-red-500 font-medium">{record.monthlyAdvances}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-red-500 font-medium">{record.festivalAdvances}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-red-500 font-medium">{record.loans}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-red-500 font-medium">{record.othersDeductions}</td>
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-red-500 font-medium">{record.epfEmployee}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-bold text-red-600 bg-red-50/20">{record.totalDeductions?.toFixed(2)}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right font-bold text-indigo-600 bg-green-50/20">{record.balancePaid?.toFixed(2)}</td>
                  
                  <td className="border border-slate-200 px-2 py-1.5 text-right text-red-500 font-medium">{record.employeesEpf}</td>
                  
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
