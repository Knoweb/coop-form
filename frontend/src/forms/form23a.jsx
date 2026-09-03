import React, { useState } from 'react';
import { PlusCircle, FileText, Calendar, List, Save, LayoutList, Building2, User, Hash, Info } from 'lucide-react';

const INITIAL_ITEM_STATE = {
  serialNo: '',
  description: '',
  requestedQuantity: '',
  issuedQuantity: '',
  otherDetails: ''
};

export default function Form23A() {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemData, setItemData] = useState(INITIAL_ITEM_STATE);
  const [globalName, setGlobalName] = useState('');
  const [globalStoreName, setGlobalStoreName] = useState('');
  const [globalDate, setGlobalDate] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({ ...prev, [name]: value }));
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'globalName') setGlobalName(value);
    if (name === 'globalStoreName') setGlobalStoreName(value);
    if (name === 'globalDate') setGlobalDate(value);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemData.description) return;
    
    const nextSerialNo = String(currentItems.length + 1).padStart(2, '0');
    setCurrentItems(prev => [...prev, { ...itemData, serialNo: nextSerialNo, id: Date.now() }]);
    setItemData(INITIAL_ITEM_STATE); // reset item inputs
  };

  const handleRemoveItem = (id) => {
    setCurrentItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSaveForm = async () => {
    if (currentItems.length === 0) {
      alert("Please add at least one item to the form.");
      return;
    }

    setIsSubmitting(true);
    
    const payload = currentItems.map(item => ({
      name: globalName,
      storeName: globalStoreName,
      date: globalDate,
      serialNo: item.serialNo,
      description: item.description,
      requestedQuantity: item.requestedQuantity ? parseFloat(item.requestedQuantity) : 0,
      issuedQuantity: item.issuedQuantity ? parseFloat(item.issuedQuantity) : 0,
      otherDetails: item.otherDetails
    }));

    try {
      const response = await fetch('http://localhost:8080/api/form23a-records/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert("Form saved successfully!");
        setCurrentItems([]);
        setItemData(INITIAL_ITEM_STATE);
        // Optionally clear global fields too
        // setGlobalName('');
        // setGlobalStoreName('');
        // setGlobalDate('');
      }
    } catch (error) {
      console.error("Failed to submit record:", error);
      alert("Failed to save form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate Totals for the current form
  const totals = currentItems.reduce((acc, curr) => {
    acc.requestedQuantity += (curr.requestedQuantity ? parseFloat(curr.requestedQuantity) : 0);
    acc.issuedQuantity += (curr.issuedQuantity ? parseFloat(curr.issuedQuantity) : 0);
    return acc;
  }, { 
    requestedQuantity: 0, issuedQuantity: 0
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 p-4 md:p-6 font-sans pb-24">
      <div className="w-full mx-auto space-y-8 max-w-6xl">
        
        <header className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Form 23 A (බඩු ගැනුම්කරුගේ ඉල්ලීම)</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Create a New Buyer's Request for Goods</p>
          </div>
        </header>

        {/* Form Construction Area */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
          
          {/* Document Headers */}
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-indigo-500" /> Form Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" /> Name (නම)
                  </label>
                  <input type="text" name="globalName" value={globalName} onChange={handleHeaderChange} placeholder="Enter buyer's name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Store (තොග ගබඩාවෙන්)
                  </label>
                  <input type="text" name="globalStoreName" value={globalStoreName} onChange={handleHeaderChange} placeholder="Enter store name..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
                  </label>
                  <input type="date" name="globalDate" value={globalDate} onChange={handleHeaderChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 shadow-sm" />
                </div>
             </div>
          </div>

          {/* Item Entry */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><PlusCircle className="w-5 h-5 mr-2 text-indigo-500" /> Add Item</h3>
            <form onSubmit={handleAddItem} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                
                <div className="space-y-2 lg:col-span-1 opacity-70">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                     Serial No (අනු අංකය)
                  </label>
                  <input type="text" value={String(currentItems.length + 1).padStart(2, '0')} disabled
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                     Description (විස්තරය) *
                  </label>
                  <input required type="text" name="description" value={itemData.description} onChange={handleItemChange} placeholder="Item description"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    Requested (ඉල්ලන ප්‍රමාණය)
                  </label>
                  <input type="number" step="0.01" name="requestedQuantity" value={itemData.requestedQuantity} onChange={handleItemChange} placeholder="0.00"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                    Issued (නිකුත් කළ යුතු ප්‍රමාණය)
                  </label>
                  <input type="number" step="0.01" name="issuedQuantity" value={itemData.issuedQuantity} onChange={handleItemChange} placeholder="0.00"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                </div>
                
                <div className="space-y-2 lg:col-span-4">
                  <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
                     Other Details (වෙනත් කරුණු)
                  </label>
                  <input type="text" name="otherDetails" value={itemData.otherDetails} onChange={handleItemChange} placeholder="Optional details"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors" />
                </div>

                <div className="lg:col-span-1">
                   <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-200">
                    <PlusCircle className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>

              </div>
            </form>
          </div>
        </div>

        {/* Printable Form Preview Section */}
        <div className="bg-white rounded-none md:rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative">
          
          <div className="p-8 md:p-12 print:p-0">
             
             {/* Paper Form Header */}
             <div className="text-center mb-10">
                <h2 className="text-xl font-bold text-slate-800">බඩු ගැනුම්කරුගේ ඉල්ලීම</h2>
                <p className="text-sm font-semibold text-slate-600">Form 23 A</p>
             </div>

             <div className="flex flex-col md:flex-row justify-between mb-8 gap-4 md:gap-8 font-medium text-slate-800 text-sm md:text-base border-b border-slate-200 pb-6">
                <div className="flex items-end">
                   <span>නම</span>
                   <span className="flex-1 border-b border-dashed border-slate-400 mx-3 min-w-[200px] inline-block text-center text-indigo-800 pb-1">{globalName}</span>
                </div>
                <div className="flex items-end">
                   <span className="flex-1 border-b border-dashed border-slate-400 mx-3 min-w-[200px] inline-block text-center text-indigo-800 pb-1">{globalStoreName}</span>
                   <span>තොග ගබඩාවෙන්</span>
                </div>
                <div className="flex items-end">
                   <span>දිනය</span>
                   <span className="flex-1 border-b border-dashed border-slate-400 mx-3 min-w-[150px] inline-block text-center text-indigo-800 pb-1">{globalDate}</span>
                </div>
             </div>

            {/* Exact 5 Column Table */}
            <div className="overflow-x-auto w-full mb-16">
              <table className="w-full text-left border-collapse border border-slate-800 print:border-black">
                <thead>
                <tr>
                  <th className="px-3 py-4 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[10%] text-center">අනු අංකය</th>
                  <th className="px-3 py-4 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[40%] text-center">විස්තරය</th>
                  <th className="px-3 py-4 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[15%] text-center">ඉල්ලන ප්‍රමාණය</th>
                  <th className="px-3 py-4 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[15%] text-center">නිකුත් කළ යුතු ප්‍රමාණය</th>
                  <th className="px-3 py-4 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[20%] text-center">වෙනත් කරුණු</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-2 py-8 text-center text-slate-400 border border-slate-800 print:border-black border-dashed">
                      <p className="text-xs">No items added to the form yet.</p>
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr key={item.id} className="group relative">
                      <td className="px-3 py-3 text-sm text-slate-800 border border-slate-800 print:border-black text-center">{item.serialNo}</td>
                      <td className="px-3 py-3 text-sm text-slate-800 border border-slate-800 print:border-black font-semibold">{item.description}</td>
                      <td className="px-3 py-3 text-sm text-slate-800 border border-slate-800 print:border-black text-right">{item.requestedQuantity ? parseFloat(item.requestedQuantity).toFixed(2) : ''}</td>
                      <td className="px-3 py-3 text-sm text-slate-800 border border-slate-800 print:border-black text-right">{item.issuedQuantity ? parseFloat(item.issuedQuantity).toFixed(2) : ''}</td>
                      <td className="px-3 py-3 text-sm text-slate-800 border border-slate-800 print:border-black">{item.otherDetails}
                        <button 
                           onClick={() => handleRemoveItem(item.id)} 
                           className="absolute -right-8 top-3 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 print:hidden transition-opacity"
                           title="Remove Item">
                           ✕
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
            
            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-4 pb-8">
                <div className="flex justify-start">
                    <div className="flex flex-col items-center">
                        <div className="w-48 md:w-64 border-b border-slate-800 print:border-black mb-2 border-dotted"></div>
                        <p className="text-sm font-bold text-slate-800">ගැනුම්කරුගේ අත්සන</p>
                    </div>
                </div>
                <div className="flex justify-end">
                    <div className="flex flex-col items-center">
                        <div className="w-48 md:w-64 border-b border-slate-800 print:border-black mb-2 border-dotted"></div>
                        <p className="text-sm font-bold text-slate-800">කළමනාකරුගේ අත්සන</p>
                    </div>
                </div>
            </div>

          </div>
        </div>
        
        {/* Save Action */}
        <div className="flex justify-end pb-8">
            <button 
              onClick={handleSaveForm}
              disabled={currentItems.length === 0 || isSubmitting}
              className={`flex items-center space-x-2 px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${
                currentItems.length > 0 && !isSubmitting
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-1' 
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}>
              <Save className="w-6 h-6" />
              <span>{isSubmitting ? 'Saving...' : 'Save Entire Form'}</span>
            </button>
        </div>

      </div>
    </div>
  );
}
