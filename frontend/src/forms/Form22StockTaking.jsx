import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

export default function Form22StockTaking() {
  const [records, setRecords] = useState([]);
  
  const [formData, setFormData] = useState({
    branchOrStore: '',
    date: '',
    oldLedgerRef: '',
    newLedgerRef: '',
    startingBillNo: '',
    
    serialNo: '',
    itemCode: '',
    description: '',
    
    ledgerBalance: 0,
    countedQtyPhysical: 0,
    differenceQty: 0,
    
    unitPrice: 0,
    excessValue: 0,
    shortageValue: 0,
    
    remarks: ''
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-22');
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    // AUTO-CALCULATE DISCREPANCIES BEFORE POSTING
    const ledger = parseFloat(formData.ledgerBalance) || 0;
    const counted = parseFloat(formData.countedQtyPhysical) || 0;
    const price = parseFloat(formData.unitPrice) || 0;
    
    const diff = counted - ledger;
    let excessVal = 0;
    let shortageVal = 0;

    if (diff > 0) {
      excessVal = diff * price;
    } else if (diff < 0) {
      shortageVal = Math.abs(diff) * price;
    }

    const payload = { 
      ...formData,
      differenceQty: diff,
      excessValue: excessVal,
      shortageValue: shortageVal
    };

    try {
      const res = await fetch('http://localhost:8080/api/form-22', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchRecords();
        // Carry over header info to save time
        setFormData({
          branchOrStore: formData.branchOrStore,
          date: formData.date,
          oldLedgerRef: formData.oldLedgerRef,
          newLedgerRef: formData.newLedgerRef,
          startingBillNo: formData.startingBillNo,
          
          serialNo: '',
          itemCode: '',
          description: '',
          
          ledgerBalance: 0,
          countedQtyPhysical: 0,
          differenceQty: 0,
          
          unitPrice: 0,
          excessValue: 0,
          shortageValue: 0,
          
          remarks: ''
        });
      } else {
        alert('Failed to save record.');
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
    }
  };

  const totalExcess = records.reduce((sum, record) => sum + (record.excessValue || 0), 0);
  const totalShortage = records.reduce((sum, record) => sum + (record.shortageValue || 0), 0);

  return (
    <div className="max-w-[110rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">ඉතිරි බඩු ගණන් ගැනීමේ ලැයිස්තුව</h2>
              <p className="text-slate-400 text-sm">Stock Taking / Inventory Count List (Form 22)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Header Metadata Group */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ගබඩාව (Branch/Store)</label>
                  <input type="text" name="branchOrStore" value={formData.branchOrStore} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">පරණ පසු ග්‍රීහුම (Old Ledger Ref)</label>
                  <input type="text" name="oldLedgerRef" value={formData.oldLedgerRef} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අලුත් පසු ග්‍රීහුම (New Ledger Ref)</label>
                  <input type="text" name="newLedgerRef" value={formData.newLedgerRef} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">ආරම්භ බිල් (Starting Bill No)</label>
                  <input type="text" name="startingBillNo" value={formData.startingBillNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            {/* Audit Details */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                
                {/* Item Details */}
                <div className="md:col-span-4 bg-indigo-50 p-4 rounded-xl border border-indigo-200">
                    <h4 className="text-sm font-bold text-indigo-800 mb-3 border-b border-indigo-200 pb-2">අයිතම විස්තර (Item Details)</h4>
                    <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-indigo-700 mb-1">අනු අංකය (Serial No)</label>
                                <input type="text" name="serialNo" value={formData.serialNo} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-indigo-700 mb-1">සංකේතය (Code)</label>
                                <input type="text" name="itemCode" value={formData.itemCode} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-indigo-700 mb-1">විස්තරය (Description)</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-indigo-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Audit Quantities */}
                <div className="md:col-span-4 bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="text-sm font-bold text-blue-800 mb-3 border-b border-blue-200 pb-2">ගණන් ගැනීම (Audit Count)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">ශේෂය (Ledger Balance)</label>
                            <input type="number" step="0.01" name="ledgerBalance" value={formData.ledgerBalance} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">ගණන් ගන්නා ලද (Physical Count)</label>
                            <input type="number" step="0.01" name="countedQtyPhysical" value={formData.countedQtyPhysical} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                {/* Financials & Remarks */}
                <div className="md:col-span-4 bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <h4 className="text-sm font-bold text-amber-800 mb-3 border-b border-amber-200 pb-2">වටිනාකම (Financials)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">එකක් මිල (Unit Price)</label>
                            <input type="number" step="0.01" name="unitPrice" value={formData.unitPrice} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">වෙනත් කරුණු (Remarks)</label>
                            <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                    </div>
                </div>

            </div>

          </div>

          <div className="mt-8 flex justify-end">
            <button type="submit" className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition-all shadow-sm hover:shadow-md font-medium">
              <PlusCircle className="w-5 h-5" />
              <span>Add Record</span>
            </button>
          </div>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h3 className="font-bold text-slate-800">Ledger View (ලේජරය)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-slate-600 font-medium">
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">අනු අංකය<br/>(Serial)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">සංකේතය<br/>(Code)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">විස්තරය<br/>(Description)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom text-right" rowSpan="2">ශේෂය<br/>(Ledger Bal)</th>
                <th colSpan="3" className="px-2 py-2 border-r border-slate-200 bg-blue-50 text-blue-800 text-center border-b border-blue-200">ගණන් ගැනීම (Physical Count)</th>
                <th className="px-3 py-2 border-r border-slate-200 align-bottom text-right" rowSpan="2">එකක් මිල<br/>(Unit Price)</th>
                <th colSpan="2" className="px-2 py-2 border-r border-slate-200 bg-green-50 text-green-800 text-center border-b border-green-200">වැඩි වටිනාකම (Excess Value)</th>
                <th colSpan="2" className="px-2 py-2 border-r border-slate-200 bg-red-50 text-red-800 text-center border-b border-red-200">අඩු වටිනාකම (Shortage Value)</th>
                <th className="px-3 py-2 align-bottom" rowSpan="2">වෙනත් කරුණු<br/>(Remarks)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-2 py-2 border-r border-slate-200 text-right text-blue-700">ප්‍රමාණය (Qty)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-right text-green-700">වැඩි (Excess)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-right text-red-700">අඩු (Short)</th>
                
                <th className="px-2 py-2 border-r border-slate-200 text-right text-green-700">රු. (Rs)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-right text-green-700">ශත. (Cts)</th>
                
                <th className="px-2 py-2 border-r border-slate-200 text-right text-red-700">රු. (Rs)</th>
                <th className="px-2 py-2 border-r border-slate-200 text-right text-red-700">ශත. (Cts)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {records.map((record, index) => {
                const diff = record.differenceQty || 0;
                const isExcess = diff > 0;
                const isShort = diff < 0;
                
                const excessRs = Math.floor(record.excessValue || 0);
                const excessCts = Math.round(((record.excessValue || 0) - excessRs) * 100);
                
                const shortRs = Math.floor(record.shortageValue || 0);
                const shortCts = Math.round(((record.shortageValue || 0) - shortRs) * 100);

                return (
                  <tr key={record.id || index} className="even:bg-gray-50 hover:bg-slate-100 transition-colors text-slate-800">
                    <td className="px-3 py-2 border-r border-slate-100">{record.serialNo}</td>
                    <td className="px-3 py-2 border-r border-slate-100 font-medium">{record.itemCode}</td>
                    <td className="px-3 py-2 border-r border-slate-100">{record.description}</td>
                    <td className="px-3 py-2 border-r border-slate-100 text-right font-medium">{record.ledgerBalance?.toFixed(2) || '0.00'}</td>
                    
                    <td className="px-3 py-2 border-r border-slate-100 text-right font-bold text-blue-700 bg-blue-50/30">{record.countedQtyPhysical?.toFixed(2) || '0.00'}</td>
                    <td className={`px-3 py-2 border-r border-slate-100 text-right font-bold ${isExcess ? 'text-green-600 bg-green-50/50' : ''}`}>{isExcess ? diff.toFixed(2) : '-'}</td>
                    <td className={`px-3 py-2 border-r border-slate-100 text-right font-bold ${isShort ? 'text-red-600 bg-red-50/50' : ''}`}>{isShort ? Math.abs(diff).toFixed(2) : '-'}</td>
                    
                    <td className="px-3 py-2 border-r border-slate-100 text-right">{record.unitPrice?.toFixed(2) || '0.00'}</td>
                    
                    <td className={`px-3 py-2 border-r border-slate-100 text-right ${isExcess ? 'text-green-700' : 'text-slate-300'}`}>{isExcess ? excessRs : '-'}</td>
                    <td className={`px-3 py-2 border-r border-slate-100 text-right ${isExcess ? 'text-green-700' : 'text-slate-300'}`}>{isExcess ? excessCts.toString().padStart(2, '0') : '-'}</td>
                    
                    <td className={`px-3 py-2 border-r border-slate-100 text-right ${isShort ? 'text-red-700' : 'text-slate-300'}`}>{isShort ? shortRs : '-'}</td>
                    <td className={`px-3 py-2 border-r border-slate-100 text-right ${isShort ? 'text-red-700' : 'text-slate-300'}`}>{isShort ? shortCts.toString().padStart(2, '0') : '-'}</td>
                    
                    <td className="px-3 py-2 border-r border-slate-100">{record.remarks}</td>
                  </tr>
                );
              })}
              {records.length === 0 && (
                <tr>
                  <td colSpan="13" className="px-4 py-8 text-center text-slate-500">
                    No records found. Add a record to see it here.
                  </td>
                </tr>
              )}
            </tbody>
            <tfoot className="bg-slate-800 text-white font-bold text-sm">
                <tr>
                    <td colSpan="8" className="px-4 py-3 text-right">Total (මුළු එකතුව):</td>
                    <td colSpan="2" className="px-3 py-3 text-right text-green-400 border-r border-slate-600">Rs. {totalExcess.toFixed(2)}</td>
                    <td colSpan="2" className="px-3 py-3 text-right text-red-400 border-r border-slate-600">Rs. {totalShortage.toFixed(2)}</td>
                    <td></td>
                </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
