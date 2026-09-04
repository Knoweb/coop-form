import React, { useState } from 'react';
import { Save, CheckCircle2, AlertCircle, LayoutList, Truck, Calendar, PenTool, UserCheck, MessageSquare, ShieldCheck, Plus, X } from 'lucide-react';

export default function Form31() {
  const [globalData, setGlobalData] = useState({
    vehicleNo: '',
    date: '',
    driverSignature: '',
    officerSignature: '',
    managerComments: '',
    managerSignature: ''
  });

  const [driverRepairs, setDriverRepairs] = useState(['']);
  const [officerRepairs, setOfficerRepairs] = useState(['']);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleGlobalChange = (e) => {
    setGlobalData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDriverRepairChange = (index, value) => {
    const newRepairs = [...driverRepairs];
    newRepairs[index] = value;
    setDriverRepairs(newRepairs);
  };

  const handleOfficerRepairChange = (index, value) => {
    const newRepairs = [...officerRepairs];
    newRepairs[index] = value;
    setOfficerRepairs(newRepairs);
  };

  const addDriverRepair = () => {
    setDriverRepairs([...driverRepairs, '']);
  };

  const removeDriverRepair = (index) => {
    setDriverRepairs(driverRepairs.filter((_, i) => i !== index));
  };

  const addOfficerRepair = () => {
    setOfficerRepairs([...officerRepairs, '']);
  };

  const removeOfficerRepair = (index) => {
    setOfficerRepairs(officerRepairs.filter((_, i) => i !== index));
  };

  const handleSaveForm = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const payload = {
        ...globalData,
        driverRepairs: driverRepairs.filter(r => r.trim() !== ''),
        officerRepairs: officerRepairs.filter(r => r.trim() !== '')
      };
      
      const response = await fetch('http://localhost:8080/api/form31/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save');
      }
      
      setSubmitStatus({ type: 'success', message: 'Record saved successfully!' });
      
      // Optionally reset form
      setGlobalData({
        vehicleNo: '',
        date: '',
        driverSignature: '',
        officerSignature: '',
        managerComments: '',
        managerSignature: ''
      });
      setDriverRepairs(['']);
      setOfficerRepairs(['']);
      
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error(error);
      setSubmitStatus({ type: 'error', message: 'Failed to save record. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-12 p-4 md:p-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Form 31</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">රථවාහන අළුත්වැඩියා කිරීමේ විස්තර පත්‍රය (Vehicle Repair Details)</p>
          </div>
        </div>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-3">
          <button
            onClick={handleSaveForm}
            disabled={isSubmitting}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold rounded-2xl transition-all shadow-md shadow-indigo-200 hover:shadow-lg hover:-translate-y-0.5"
          >
            <Save className="w-5 h-5" />
            <span>{isSubmitting ? 'Saving...' : 'Save Record'}</span>
          </button>
        </div>
      </header>

      {submitStatus && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
          {submitStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{submitStatus.message}</p>
        </div>
      )}

      {/* DATA ENTRY SECTION */}
      <form className="space-y-6 mb-12">
        {/* Top Info Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-400" /> වාහන අංකය (Vehicle No)
              </label>
              <input 
                type="text" 
                name="vehicleNo" 
                value={globalData.vehicleNo} 
                onChange={handleGlobalChange} 
                placeholder="E.g., WP AB-1234"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> දිනය (Date)
              </label>
              <input 
                type="date" 
                name="date" 
                value={globalData.date} 
                onChange={handleGlobalChange}
                placeholder="YYYY-MM-DD"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm" 
              />
            </div>
          </div>
        </div>

        {/* Section 1: Driver's Report */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <PenTool className="w-5 h-5 text-indigo-500" /> 
              අවශ්‍ය අළුත්වැඩියා කිරීම් ගැන රියදුරාගේ වාර්තාව (Driver's Report)
            </h2>
            <button type="button" onClick={addDriverRepair} className="flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add Repair
            </button>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 gap-3">
              {driverRepairs.map((repair, index) => (
                <div key={`driver-${index}`} className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={repair}
                    placeholder={`Repair item ${index + 1}`}
                    onChange={(e) => handleDriverRepairChange(index, e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                  />
                  {driverRepairs.length > 1 && (
                    <button type="button" onClick={() => removeDriverRepair(index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <div className="space-y-2 w-full md:w-72">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-400" /> රියදුරුගේ අත්සන (Driver's Signature)
                </label>
                <input 
                  type="text" 
                  name="driverSignature" 
                  value={globalData.driverSignature} 
                  onChange={handleGlobalChange}
                  placeholder="Enter name/signature"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors shadow-sm" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Chief Officer's Report */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> 
              ප්‍රධාන නිලධාරී තැනගේ වාර්තාව (Chief Officer's Report)
            </h2>
            <button type="button" onClick={addOfficerRepair} className="flex items-center gap-1 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 px-3 py-1.5 rounded-lg transition-colors">
              <Plus className="w-4 h-4" /> Add Note
            </button>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 gap-3">
              {officerRepairs.map((repair, index) => (
                <div key={`officer-${index}`} className="flex items-center gap-3 group">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={repair}
                    placeholder={`Officer note ${index + 1}`}
                    onChange={(e) => handleOfficerRepairChange(index, e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                  />
                  {officerRepairs.length > 1 && (
                    <button type="button" onClick={() => removeOfficerRepair(index)} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <div className="space-y-2 w-full md:w-72">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-400" /> නිලධාරීගේ අත්සන (Officer's Signature)
                </label>
                <input 
                  type="text" 
                  name="officerSignature" 
                  value={globalData.officerSignature} 
                  onChange={handleGlobalChange}
                  placeholder="Enter name/signature"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors shadow-sm" 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Manager's Comments */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-100 bg-slate-50/50 p-6">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-500" /> 
              කළමනාකාරගේ අදහස් (Manager's Comments)
            </h2>
          </div>
          <div className="p-6 md:p-8 space-y-6">
            <div className="space-y-2">
              <textarea
                name="managerComments"
                value={globalData.managerComments}
                onChange={handleGlobalChange}
                rows={4}
                placeholder="Enter manager's comments here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors shadow-sm resize-y"
              />
            </div>
            
            <div className="pt-6 mt-6 border-t border-slate-100 flex justify-end">
              <div className="space-y-2 w-full md:w-72">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-400" /> කළමනාකරුගේ අත්සන (Manager's Signature)
                </label>
                <input 
                  type="text" 
                  name="managerSignature" 
                  value={globalData.managerSignature} 
                  onChange={handleGlobalChange}
                  placeholder="Enter name/signature"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors shadow-sm" 
                />
              </div>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
}
