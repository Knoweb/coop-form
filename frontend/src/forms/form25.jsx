import React, { useState } from 'react';
import { PlusCircle, FileText, Calendar, LayoutList, Building2, Save, Clock, Hash, Truck } from 'lucide-react';

const INITIAL_ITEM_STATE = {
  billNo: '',
  description: '',
  packagesQty: '',
  itemQty: '',
  costUnitPrice: '',
  costTotalPrice: '',
  sellingPrice: '',
  diffLess: '',
  diffMore: '',
  valLess: '',
  valMore: '',
  netAmount: '',
  remarks: ''
};

export default function Form25() {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemData, setItemData] = useState(INITIAL_ITEM_STATE);

  const [globalDate, setGlobalDate] = useState('');
  const [globalTime, setGlobalTime] = useState('');
  const [globalFormNo, setGlobalFormNo] = useState('');
  const [loadedPlace, setLoadedPlace] = useState('');
  const [sentPlace, setSentPlace] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({ ...prev, [name]: value }));
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'globalDate') setGlobalDate(value);
    if (name === 'globalTime') setGlobalTime(value);
    if (name === 'globalFormNo') setGlobalFormNo(value);
    if (name === 'loadedPlace') setLoadedPlace(value);
    if (name === 'sentPlace') setSentPlace(value);
    if (name === 'vehicleNo') setVehicleNo(value);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemData.description) return;

    const nextSerialNo = String(currentItems.length + 1).padStart(2, '0');

    setCurrentItems(prev => [...prev, {
      ...itemData,
      serialNo: nextSerialNo,
      id: Date.now()
    }]);
    setItemData(INITIAL_ITEM_STATE);
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
      time: globalTime,
      formNo: globalFormNo,
      loadedPlace: loadedPlace,
      sentPlace: sentPlace,
      vehicleNo: vehicleNo,

      serialNo: item.serialNo,
      billNo: item.billNo,
      description: item.description,

      packagesQty: item.packagesQty ? parseFloat(item.packagesQty) : 0,
      itemQty: item.itemQty ? parseFloat(item.itemQty) : 0,

      costUnitPrice: item.costUnitPrice ? parseFloat(item.costUnitPrice) : 0,
      costTotalPrice: item.costTotalPrice ? parseFloat(item.costTotalPrice) : 0,

      sellingPrice: item.sellingPrice ? parseFloat(item.sellingPrice) : 0,

      diffLess: item.diffLess ? parseFloat(item.diffLess) : 0,
      diffMore: item.diffMore ? parseFloat(item.diffMore) : 0,

      valLess: item.valLess ? parseFloat(item.valLess) : 0,
      valMore: item.valMore ? parseFloat(item.valMore) : 0,

      netAmount: item.netAmount ? parseFloat(item.netAmount) : 0,

      remarks: item.remarks
    }));

    try {
      const response = await fetch('http://localhost:8080/api/form25-records/bulk', {
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
      <div className="w-full mx-auto space-y-8 max-w-7xl">

        {/* Form Construction Area */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
          <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-fuchsia-500/20 p-2 rounded-lg">
                <LayoutList className="w-6 h-6 text-fuchsia-400" />
              </div>
              <div>
                 <h2 className="text-lg font-bold text-white">බඩු නිකුත් කිරීමේ නිවේදනය</h2>
                 <p className="text-slate-400 text-sm">Form 25 (Goods Issue Notice)</p>
              </div>
           </div>
          </div>

          {/* Document Headers */}
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><FileText className="w-5 h-5 mr-2 text-indigo-500" /> Form Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
                </label>
                <input type="date" name="globalDate" value={globalDate} onChange={handleHeaderChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-400" /> Time (වේලාව පෙ.ව./ප.ව.)
                </label>
                <input type="time" name="globalTime" value={globalTime} onChange={handleHeaderChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-slate-400" /> Form No. (අංක)
                </label>
                <input type="text" name="globalFormNo" value={globalFormNo} onChange={handleHeaderChange} placeholder="e.g. 10234"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" /> Loaded Place (පැටවූ ස්ථානය)
                </label>
                <input type="text" name="loadedPlace" value={loadedPlace} onChange={handleHeaderChange} placeholder="Place loaded"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400" /> Sending Place (යවන ස්ථානය)
                </label>
                <input type="text" name="sentPlace" value={sentPlace} onChange={handleHeaderChange} placeholder="Destination"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-2">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-slate-400" /> Vehicle No (රථයේ අංකය)
                </label>
                <input type="text" name="vehicleNo" value={vehicleNo} onChange={handleHeaderChange} placeholder="Vehicle No"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

            </div>
          </div>

          {/* Item Entry */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><PlusCircle className="w-5 h-5 mr-2 text-indigo-500" /> Add Item</h3>
            <form onSubmit={handleAddItem} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">

                {/* Row 1 */}
                <div className="space-y-2 lg:col-span-1 opacity-70 hidden lg:block">
                  <label className="text-xs font-semibold text-slate-600">අනු අංකය (Serial)</label>
                  <input type="text" value={String(currentItems.length + 1).padStart(2, '0')} disabled
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-100 text-slate-500 cursor-not-allowed" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">බිල් අංකය (Bill No)</label>
                  <input type="text" name="billNo" value={itemData.billNo} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">විස්තරය (Description) *</label>
                  <input required type="text" name="description" value={itemData.description} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">කෑලි ගණන</label>
                  <input type="number" step="0.01" name="packagesQty" value={itemData.packagesQty} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">ප්‍රමාණය (Quantity)</label>
                  <input type="number" step="0.01" name="itemQty" value={itemData.itemQty} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                {/* Row 2: Prices */}
                <div className="col-span-full border-t border-slate-100 mt-2 mb-1"></div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">ඒකක මිල (Unit Cost)</label>
                  <input type="number" step="0.01" name="costUnitPrice" value={itemData.costUnitPrice} onChange={handleItemChange} placeholder="Rs."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">තොග මිල (Total Cost)</label>
                  <input type="number" step="0.01" name="costTotalPrice" value={itemData.costTotalPrice} onChange={handleItemChange} placeholder="Rs."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">භාරගත් ප්‍රමාණය (Received Qty)</label>
                  <input type="number" step="0.01" name="sellingPrice" value={itemData.sellingPrice} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">වෙනස - අඩු (Diff Less)</label>
                  <input type="number" step="0.01" name="diffLess" value={itemData.diffLess} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">වෙනස - වැඩි (Diff More)</label>
                  <input type="number" step="0.01" name="diffMore" value={itemData.diffMore} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="col-span-full border-t border-slate-100 mt-2 mb-1"></div>

                {/* Row 3 */}
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">වටිනාකම - අඩු (Val Less)</label>
                  <input type="number" step="0.01" name="valLess" value={itemData.valLess} onChange={handleItemChange} placeholder="Rs."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">වටිනාකම - වැඩි (Val More)</label>
                  <input type="number" step="0.01" name="valMore" value={itemData.valMore} onChange={handleItemChange} placeholder="Rs."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">පත් මුදල (Net Amount)</label>
                  <input type="number" step="0.01" name="netAmount" value={itemData.netAmount} onChange={handleItemChange} placeholder="Rs."
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-colors text-indigo-900 font-bold" />
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
            <div className="relative mb-6 text-center pt-6">
              <div className="absolute right-0 top-0 text-sm font-semibold text-slate-600">Form 25</div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-6">බඩු නිකුත් කිරීමේ නිවේදනය</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-slate-800 mb-6">
              <div className="space-y-3">
                <div className="flex items-end">
                  <span className="w-32">දිනය</span>
                  <span className="flex-1 border-b border-dotted border-slate-400 pb-1 px-2">{globalDate}</span>
                </div>
                <div className="flex items-end">
                  <span className="w-32">වේලාව පෙ.ව./ප.ව.</span>
                  <span className="flex-1 border-b border-dotted border-slate-400 pb-1 px-2">{globalTime}</span>
                </div>
                <div className="flex items-end">
                  <span className="w-32">අංක</span>
                  <span className="flex-1 border-b border-dotted border-slate-400 pb-1 px-2">{globalFormNo}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-end">
                  <span className="w-32">පැටවූ ස්ථානය</span>
                  <span className="flex-1 border-b border-dotted border-slate-400 pb-1 px-2">{loadedPlace}</span>
                </div>
                <div className="flex items-end">
                  <span className="w-32">යවන ස්ථානය</span>
                  <span className="flex-1 border-b border-dotted border-slate-400 pb-1 px-2">{sentPlace}</span>
                </div>
              </div>
            </div>

            <div className="text-sm font-medium text-slate-800 mb-8 flex flex-wrap items-end gap-2">
              <span>අංක</span>
              <span className="min-w-[150px] border-b border-dotted border-slate-400 pb-1 px-2 text-center inline-block">{vehicleNo}</span>
              <span>දරන රථයෙන් එවන පහත සඳහන් බඩු කරුණාකර භාර දෙන්න.</span>
            </div>

            {/* Complex Table */}
            <div className="overflow-x-auto w-full mb-12">
              <table className="w-full text-left border-collapse border border-slate-800 print:border-black min-w-[1200px]">
                <thead>
                  <tr>
                    <th rowSpan={2} className="px-2 py-3 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black w-[5%] text-center align-middle">බිල්<br />අංකය</th>
                    <th rowSpan={2} className="px-2 py-3 text-xs font-bold text-slate-800 border border-slate-800 print:border-black w-[15%] text-center align-middle">විස්තරය</th>
                    <th rowSpan={2} className="px-1 py-1 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black w-[4%] text-center align-middle" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>කෑලි ගණන</th>
                    <th rowSpan={2} className="px-1 py-1 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black w-[4%] text-center align-middle" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>ප්‍රමාණය</th>

                    <th colSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center">ගත් මිල</th>
                    <th rowSpan={2} className="px-1 py-1 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle w-[5%]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>භාරගත් ප්‍රමාණය</th>

                    <th colSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center">වෙනස</th>
                    <th colSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center">වටිනාකම</th>
                    <th className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle">පත් මුදල</th>
                  </tr>
                  <tr>
                    {/* ගත් මිල */}
                    <th className="px-1 py-2 text-[10px] font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[6%]">ඒකක<br />රු. ශ.</th>
                    <th className="px-1 py-2 text-[10px] font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[6%]">තොග<br />රු. ශ.</th>

                    {/* වෙනස */}
                    <th className="px-1 py-2 text-[10px] font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[5%]">අඩු</th>
                    <th className="px-1 py-2 text-[10px] font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[5%]">වැඩි</th>

                    {/* වටිනාකම */}
                    <th className="px-1 py-2 text-[10px] font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[6%]">අඩු<br />රු. ශ.</th>
                    <th className="px-1 py-2 text-[10px] font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[6%]">වැඩි<br />රු. ශ.</th>

                    {/* පත් මුදල */}
                    <th className="px-1 py-2 text-[10px] font-semibold text-slate-700 border border-slate-800 print:border-black text-center w-[6%]">රු. ශ.</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="13" className="px-2 py-12 text-center text-slate-400 border border-slate-800 print:border-black border-dashed">
                        <p className="text-xs">No items added to the form yet.</p>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id} className="group relative">
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.billNo}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black font-semibold">{item.description}</td>
                        <td className="px-1 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.packagesQty ? Number(item.packagesQty) : ''}</td>
                        <td className="px-1 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.itemQty ? Number(item.itemQty) : ''}</td>

                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right">{item.costUnitPrice ? Number(item.costUnitPrice).toFixed(2) : ''}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right">{item.costTotalPrice ? Number(item.costTotalPrice).toFixed(2) : ''}</td>

                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right">{item.sellingPrice ? Number(item.sellingPrice) : ''}</td>

                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right">{item.diffLess ? Number(item.diffLess) : ''}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right">{item.diffMore ? Number(item.diffMore) : ''}</td>

                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right">{item.valLess ? Number(item.valLess).toFixed(2) : ''}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right">{item.valMore ? Number(item.valMore).toFixed(2) : ''}</td>

                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right font-bold">{item.netAmount ? Number(item.netAmount).toFixed(2) : ''}
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

            {/* Bottom Form Texts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 pb-8 text-sm text-slate-800 font-medium">
              <div className="space-y-4">
                <p>ඉහත සඳහන් බඩු ප්‍රමාණය සඳහා භාරගැනීම සහතික කරමි.</p>
                <p>ඉහත සඳහන් බඩු හරියාකාරව භාරගතිමි.</p>
                <p>තොග ගබඩාවට ලැබුණු වේලාව පෙ/ප .................................</p>
              </div>

              <div className="flex flex-col space-y-12 items-center md:items-end">
                <div className="flex flex-col items-center">
                  <div className="w-56 border-b border-slate-800 print:border-black mb-2 border-dotted"></div>
                  <p className="font-bold text-xs">බඩු එවන නිලධාරී අත්සන</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-56 border-b border-slate-800 print:border-black mb-2 border-dotted"></div>
                  <p className="font-bold text-xs">රියදුරු අත්සන</p>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-56 border-b border-slate-800 print:border-black mb-2 border-dotted"></div>
                  <p className="font-bold text-xs">ගබඩා භාරකරු</p>
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
