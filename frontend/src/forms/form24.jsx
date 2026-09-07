import React, { useState } from 'react';
import { PlusCircle, FileText, Calendar, LayoutList, Building2, Save } from 'lucide-react';

const INITIAL_ITEM_STATE = {
  cardNo: '',
  item: '',
  store1Qty: '',
  store2Qty: '',
  store3Qty: '',
  store4Qty: ''
};

export default function Form24() {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemData, setItemData] = useState(INITIAL_ITEM_STATE);

  const [globalDate, setGlobalDate] = useState('');
  const [store1Name, setStore1Name] = useState('');
  const [store2Name, setStore2Name] = useState('');
  const [store3Name, setStore3Name] = useState('');
  const [store4Name, setStore4Name] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({ ...prev, [name]: value }));
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'globalDate') setGlobalDate(value);
    if (name === 'store1Name') setStore1Name(value);
    if (name === 'store2Name') setStore2Name(value);
    if (name === 'store3Name') setStore3Name(value);
    if (name === 'store4Name') setStore4Name(value);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemData.item) return;

    const nextSerialNo = String(currentItems.length + 1).padStart(2, '0');

    // Auto-calculate total
    const s1 = parseFloat(itemData.store1Qty) || 0;
    const s2 = parseFloat(itemData.store2Qty) || 0;
    const s3 = parseFloat(itemData.store3Qty) || 0;
    const s4 = parseFloat(itemData.store4Qty) || 0;
    const total = s1 + s2 + s3 + s4;

    setCurrentItems(prev => [...prev, {
      ...itemData,
      serialNo: nextSerialNo,
      totalQty: total,
      id: Date.now()
    }]);
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
      date: globalDate,
      store1Name: store1Name,
      store2Name: store2Name,
      store3Name: store3Name,
      store4Name: store4Name,
      serialNo: item.serialNo,
      cardNo: item.cardNo,
      item: item.item,
      store1Qty: item.store1Qty ? parseFloat(item.store1Qty) : 0,
      store2Qty: item.store2Qty ? parseFloat(item.store2Qty) : 0,
      store3Qty: item.store3Qty ? parseFloat(item.store3Qty) : 0,
      store4Qty: item.store4Qty ? parseFloat(item.store4Qty) : 0,
      totalQty: item.totalQty
    }));

    try {
      const response = await fetch('http://localhost:8080/api/form24-records/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Form saved successfully!");
        setCurrentItems([]);
        setItemData(INITIAL_ITEM_STATE);
      }
    } catch (error) {
      console.error("Failed to submit record:", error);
      alert("Failed to save form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-200 text-slate-800 p-4 md:p-6 font-sans pb-24">
      <div className="w-full mx-auto space-y-8 max-w-6xl">

        {/* Form Construction Area */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
          <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-fuchsia-500/20 p-2 rounded-lg">
                <LayoutList className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">සැපයිය යුතු බඩු ලැයිස්තුව</h2>
                <p className="text-slate-400 text-sm">Form 24 (List of Goods to be Supplied)</p>
              </div>
            </div>
          </div>

          {/* Document Headers */}
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-indigo-500" /> Form Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <div className="space-y-2 md:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
                </label>
                <input type="date" name="globalDate" value={globalDate} onChange={handleHeaderChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 md:col-span-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Store 1 (ගබඩාව 1)
                  </label>
                  <input type="text" name="store1Name" value={store1Name} onChange={handleHeaderChange} placeholder="Store 1"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Store 2 (ගබඩාව 2)
                  </label>
                  <input type="text" name="store2Name" value={store2Name} onChange={handleHeaderChange} placeholder="Store 2"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Store 3 (ගබඩාව 3)
                  </label>
                  <input type="text" name="store3Name" value={store3Name} onChange={handleHeaderChange} placeholder="Store 3"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-400" /> Store 4 (ගබඩාව 4)
                  </label>
                  <input type="text" name="store4Name" value={store4Name} onChange={handleHeaderChange} placeholder="Store 4"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>
              </div>
            </div>
          </div>

          {/* Item Entry */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><PlusCircle className="w-5 h-5 mr-2 text-indigo-500" /> Add Item</h3>
            <form onSubmit={handleAddItem} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">

                <div className="space-y-2 lg:col-span-1 opacity-70 hidden md:block">
                  <label className="text-xs font-semibold text-slate-600">අනු අංකය</label>
                  <input type="text" value={String(currentItems.length + 1).padStart(2, '0')} disabled
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 text-center cursor-not-allowed" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">හැඳින්වූ අංකය (ID No)</label>
                  <input type="text" name="cardNo" value={itemData.cardNo} onChange={handleItemChange} placeholder="ID No"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">ද්‍රව්‍ය (Item) *</label>
                  <input required type="text" name="item" value={itemData.item} onChange={handleItemChange} placeholder="Item Description"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                {/* Quantities */}
                <div className="space-y-2 lg:col-span-2 grid grid-cols-4 gap-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-500 text-center block truncate">{store1Name || 'Store 1'}</label>
                    <input type="number" step="0.01" name="store1Qty" value={itemData.store1Qty} onChange={handleItemChange} placeholder="0"
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 text-center text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-500 text-center block truncate">{store2Name || 'Store 2'}</label>
                    <input type="number" step="0.01" name="store2Qty" value={itemData.store2Qty} onChange={handleItemChange} placeholder="0"
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 text-center text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-500 text-center block truncate">{store3Name || 'Store 3'}</label>
                    <input type="number" step="0.01" name="store3Qty" value={itemData.store3Qty} onChange={handleItemChange} placeholder="0"
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 text-center text-sm" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-semibold text-slate-500 text-center block truncate">{store4Name || 'Store 4'}</label>
                    <input type="number" step="0.01" name="store4Qty" value={itemData.store4Qty} onChange={handleItemChange} placeholder="0"
                      className="w-full px-2 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 text-center text-sm" />
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-2">
                <button type="submit" className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md transition-all duration-200">
                  <PlusCircle className="w-4 h-4" />
                  <span>Add Item to Form</span>
                </button>
              </div>

            </form>
          </div>
        </div>

        {/* Printable Form Preview Section */}
        <div className="bg-white rounded-none md:rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative">

          <div className="p-8 md:p-12 print:p-0">

            {/* Paper Form Header */}
            <div className="relative mb-8 text-center pt-8">
              <div className="absolute right-0 top-0 text-sm font-semibold text-slate-600">Form 24</div>

              <h2 className="text-2xl font-bold text-slate-900 mb-6">සැපයිය යුතු බඩු ලැයිස්තුව</h2>

              <div className="flex justify-end text-sm md:text-base font-semibold text-slate-800">
                <div className="flex items-end">
                  <span className="mr-3">දිනය</span>
                  <span className="border-b-2 border-dotted border-slate-400 min-w-[150px] inline-block text-center text-indigo-800 pb-1">{globalDate}</span>
                </div>
              </div>
            </div>

            {/* Complex Table */}
            <div className="overflow-x-auto w-full mb-16">
              <table className="w-full text-left border-collapse border border-slate-800 print:border-black">
                <thead>
                  <tr>
                    <th rowSpan={2} className="px-2 py-3 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[8%] text-center align-middle">අනු අංකය</th>
                    <th rowSpan={2} className="px-2 py-3 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[12%] text-center align-middle">හැඳින්වූ අංකය</th>
                    <th rowSpan={2} className="px-3 py-3 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[25%] text-center align-middle">ද්‍රව්‍ය</th>
                    <th colSpan={4} className="px-2 py-2 text-xs font-bold text-slate-800 border border-slate-800 print:border-black text-center bg-slate-50/50 print:bg-transparent">ගබඩාවල නම</th>
                    <th rowSpan={2} className="px-2 py-3 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[10%] text-center align-middle">එකතුව</th>
                  </tr>
                  <tr>
                    <th className="px-1 py-2 text-xs font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[11%]">{store1Name || '1'}</th>
                    <th className="px-1 py-2 text-xs font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[11%]">{store2Name || '2'}</th>
                    <th className="px-1 py-2 text-xs font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[11%]">{store3Name || '3'}</th>
                    <th className="px-1 py-2 text-xs font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[11%]">{store4Name || '4'}</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-2 py-12 text-center text-slate-400 border border-slate-800 print:border-black border-dashed">
                        <p className="text-xs">No items added to the form yet.</p>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id} className="group relative">
                        <td className="px-2 py-2 text-sm text-slate-800 border border-slate-800 print:border-black text-center">{item.serialNo}</td>
                        <td className="px-2 py-2 text-sm text-slate-800 border border-slate-800 print:border-black text-center">{item.cardNo}</td>
                        <td className="px-3 py-2 text-sm text-slate-800 border border-slate-800 print:border-black font-semibold">{item.item}</td>

                        <td className="px-2 py-2 text-sm text-slate-800 border border-slate-800 print:border-black text-right">{item.store1Qty ? Number(item.store1Qty) : ''}</td>
                        <td className="px-2 py-2 text-sm text-slate-800 border border-slate-800 print:border-black text-right">{item.store2Qty ? Number(item.store2Qty) : ''}</td>
                        <td className="px-2 py-2 text-sm text-slate-800 border border-slate-800 print:border-black text-right">{item.store3Qty ? Number(item.store3Qty) : ''}</td>
                        <td className="px-2 py-2 text-sm text-slate-800 border border-slate-800 print:border-black text-right">{item.store4Qty ? Number(item.store4Qty) : ''}</td>

                        <td className="px-2 py-2 text-sm font-bold text-slate-800 border border-slate-800 print:border-black text-right bg-slate-50/30 print:bg-transparent">{item.totalQty > 0 ? Number(item.totalQty) : ''}
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="absolute -right-8 top-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 print:hidden transition-opacity"
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

          </div>
        </div>

        {/* Save Action */}
        <div className="flex justify-end pb-8">
          <button
            onClick={handleSaveForm}
            disabled={currentItems.length === 0 || isSubmitting}
            className={`flex items-center space-x-2 px-10 py-4 rounded-xl font-bold text-lg shadow-xl transition-all duration-300 ${currentItems.length > 0 && !isSubmitting
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
