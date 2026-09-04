import React, { useState } from 'react';
import { Save, FileText, CheckCircle2, AlertCircle, LayoutList, Building2, Calendar, Truck } from 'lucide-react';

export default function Form30() {
  const [globalData, setGlobalData] = useState({
    societyName: '',
    date: '',
    vehicleNo: ''
  });

  const [wholesaleRows, setWholesaleRows] = useState([
    { id: 1, prevRs: '', prevCts: '', todayRs: '', todayCts: '' }
  ]);

  const [retailRows, setRetailRows] = useState([
    { id: 1, prevRs: '', prevCts: '', todayRs: '', todayCts: '' }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleGlobalChange = (e) => {
    setGlobalData({ ...globalData, [e.target.name]: e.target.value });
  };

  const updateRow = (type, id, field, value) => {
    const setter = type === 'WHOLESALE' ? setWholesaleRows : setRetailRows;
    setter(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const handleAddRow = (type) => {
    const setter = type === 'WHOLESALE' ? setWholesaleRows : setRetailRows;
    setter(prev => [...prev, { id: prev.length > 0 ? Math.max(...prev.map(r => r.id)) + 1 : 1, prevRs: '', prevCts: '', todayRs: '', todayCts: '' }]);
  };

  const handleRemoveRow = (type, id) => {
    const setter = type === 'WHOLESALE' ? setWholesaleRows : setRetailRows;
    setter(prev => prev.filter(row => row.id !== id));
  };


  const calculateTotal = (rs1, cts1, rs2, cts2) => {
    const totalCts = (parseFloat(cts1 || 0) + parseFloat(cts2 || 0));
    const extraRs = Math.floor(totalCts / 100);
    const finalCts = totalCts % 100;
    const finalRs = (parseFloat(rs1 || 0) + parseFloat(rs2 || 0) + extraRs);
    
    if (finalRs === 0 && finalCts === 0 && !rs1 && !cts1 && !rs2 && !cts2) return { rs: '', cts: '' };
    return { 
      rs: finalRs, 
      cts: finalCts.toString().padStart(2, '0') 
    };
  };

  const calculateColumnTotals = (rows) => {
    let totalPrevRs = 0, totalPrevCts = 0;
    let totalTodayRs = 0, totalTodayCts = 0;
    let hasData = false;
    
    rows.forEach(row => {
      if (row.prevRs || row.prevCts || row.todayRs || row.todayCts) hasData = true;
      totalPrevRs += parseFloat(row.prevRs || 0);
      totalPrevCts += parseFloat(row.prevCts || 0);
      totalTodayRs += parseFloat(row.todayRs || 0);
      totalTodayCts += parseFloat(row.todayCts || 0);
    });
    
    totalPrevRs += Math.floor(totalPrevCts / 100);
    totalPrevCts = totalPrevCts % 100;
    totalTodayRs += Math.floor(totalTodayCts / 100);
    totalTodayCts = totalTodayCts % 100;
    
    const finalTotal = calculateTotal(totalPrevRs, totalPrevCts, totalTodayRs, totalTodayCts);
    
    if (!hasData) return { prevRs: '', prevCts: '', todayRs: '', todayCts: '', finalRs: '', finalCts: '' };
    
    return {
      prevRs: totalPrevRs,
      prevCts: totalPrevCts.toString().padStart(2, '0'),
      todayRs: totalTodayRs,
      todayCts: totalTodayCts.toString().padStart(2, '0'),
      finalRs: finalTotal.rs,
      finalCts: finalTotal.cts
    };
  };

  const handleSaveForm = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = [];

      wholesaleRows.forEach(row => {
        const total = calculateTotal(row.prevRs, row.prevCts, row.todayRs, row.todayCts);
        payload.push({
          societyName: globalData.societyName,
          date: globalData.date || null,
          vehicleNo: globalData.vehicleNo,
          category: 'WHOLESALE',
          rowIndex: row.id,
          prevDateRs: row.prevRs ? parseFloat(row.prevRs) : 0,
          prevDateCts: row.prevCts ? parseFloat(row.prevCts) : 0,
          todayRs: row.todayRs ? parseFloat(row.todayRs) : 0,
          todayCts: row.todayCts ? parseFloat(row.todayCts) : 0,
          totalRs: total.rs ? parseFloat(total.rs) : 0,
          totalCts: total.cts ? parseFloat(total.cts) : 0
        });
      });

      retailRows.forEach(row => {
        const total = calculateTotal(row.prevRs, row.prevCts, row.todayRs, row.todayCts);
        payload.push({
          societyName: globalData.societyName,
          date: globalData.date || null,
          vehicleNo: globalData.vehicleNo,
          category: 'RETAIL',
          rowIndex: row.id,
          prevDateRs: row.prevRs ? parseFloat(row.prevRs) : 0,
          prevDateCts: row.prevCts ? parseFloat(row.prevCts) : 0,
          todayRs: row.todayRs ? parseFloat(row.todayRs) : 0,
          todayCts: row.todayCts ? parseFloat(row.todayCts) : 0,
          totalRs: total.rs ? parseFloat(total.rs) : 0,
          totalCts: total.cts ? parseFloat(total.cts) : 0
        });
      });

      const response = await fetch('http://localhost:8080/api/form30-records/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save record');

      setSubmitStatus({ type: 'success', message: 'Record saved successfully!' });
      
      setGlobalData({ societyName: '', date: '', vehicleNo: '' });
      setWholesaleRows([{ id: 1, prevRs: '', prevCts: '', todayRs: '', todayCts: '' }]);
      setRetailRows([{ id: 1, prevRs: '', prevCts: '', todayRs: '', todayCts: '' }]);

      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Failed to submit record:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to save record. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDataEntryGrid = (title, type, rows) => (
    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-slate-800">{title}</h4>
        <button onClick={() => handleAddRow(type)} className="text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-3 py-1.5 rounded-lg font-semibold transition-colors shadow-sm border border-indigo-200">
          + Add Row
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rows.map((row, index) => (
          <div key={row.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 relative group">
            <div className="flex justify-between items-center">
              <div className="font-bold text-indigo-600 text-sm">Row {index + 1}</div>
              {rows.length > 1 && (
                <button onClick={() => handleRemoveRow(type, row.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold">✕ Remove</button>
              )}
            </div>
            
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">පෙර දිනය (Previous Date)</label>
              <div className="flex gap-2">
                <input type="number" placeholder="රු." value={row.prevRs} onChange={(e) => updateRow(type, row.id, 'prevRs', e.target.value)} className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                <input type="number" placeholder="ශ." value={row.prevCts} onChange={(e) => updateRow(type, row.id, 'prevCts', e.target.value)} className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500">දිනට (Today)</label>
              <div className="flex gap-2">
                <input type="number" placeholder="රු." value={row.todayRs} onChange={(e) => updateRow(type, row.id, 'todayRs', e.target.value)} className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
                <input type="number" placeholder="ශ." value={row.todayCts} onChange={(e) => updateRow(type, row.id, 'todayCts', e.target.value)} className="w-full px-3 py-1.5 text-sm rounded-lg border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-12 p-4 md:p-6 font-sans">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Form 30</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">ගබඩාවල ප්‍රවාහන ගාස්තු (Store Transport Charges)</p>
          </div>
        </div>
      </header>

      {submitStatus && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
          submitStatus.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {submitStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{submitStatus.message}</p>
        </div>
      )}

      {/* Data Entry Section */}
      <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
        <div className="p-6 md:p-8 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center"><FileText className="w-5 h-5 mr-2 text-indigo-500" /> Form Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400" /> Society Name (සමිතියේ නම)
              </label>
              <input type="text" name="societyName" value={globalData.societyName} onChange={handleGlobalChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" /> Date (දිනය)
              </label>
              <input type="date" name="date" value={globalData.date} onChange={handleGlobalChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <Truck className="w-4 h-4 text-slate-400" /> Vehicle No (වාහන අංකය)
              </label>
              <input type="text" name="vehicleNo" value={globalData.vehicleNo} onChange={handleGlobalChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          {renderDataEntryGrid('තොග (Wholesale)', 'WHOLESALE', wholesaleRows)}
          {renderDataEntryGrid('සිල්ලර (Retail)', 'RETAIL', retailRows)}
        </div>
      </div>

      {/* Printable Preview */}
      <div className="bg-white rounded-none md:rounded-xl shadow-2xl border border-slate-200 overflow-x-auto relative mb-8">
        <div className="min-w-[1000px] print:w-full print:min-w-0 p-8 md:p-12 text-slate-900 bg-white mx-auto">
          
          <div className="flex justify-between items-start mb-6">
            <div className="text-sm font-bold w-1/2">
              සීමාසහිත <span className="inline-block border-b border-dotted border-slate-900 min-w-[200px] text-center">{globalData.societyName}</span> විවිධ සේවා සමුපකාර සමිතිය
            </div>
            <div className="text-lg font-bold">F30</div>
          </div>

          <h2 className="text-xl font-bold text-center mb-8">ගබඩාවල ප්‍රවාහන ගාස්තු</h2>

          <div className="flex justify-between items-end mb-4 font-bold text-sm">
            <div>දිනය <span className="inline-block border-b border-dotted border-slate-900 min-w-[150px] text-center">{globalData.date}</span></div>
            <div>වාහන අංක <span className="inline-block border-b border-dotted border-slate-900 min-w-[150px] text-center">{globalData.vehicleNo}</span></div>
          </div>

          <table className="w-full border-collapse border border-black mb-8">
            <thead className="bg-indigo-50 text-indigo-900 print:bg-transparent print:text-black">
              <tr>
                <th colSpan="2" className="border border-black py-2 font-bold text-sm w-[22%]">පෙර දිනය</th>
                <th rowSpan="2" className="border border-black py-2 font-bold text-sm w-[34%] text-center">විස්තර</th>
                <th colSpan="2" className="border border-black py-2 font-bold text-sm w-[22%]">දිනට</th>
                <th colSpan="2" className="border border-black py-2 font-bold text-sm w-[22%]">අදට මුළු එකතුව</th>
              </tr>
              <tr className="text-center text-xs">
                <th className="border border-black py-1 w-[15%]">රු.</th>
                <th className="border border-black py-1 w-[7%]">ශ.</th>
                <th className="border border-black py-1 w-[15%]">රු.</th>
                <th className="border border-black py-1 w-[7%]">ශ.</th>
                <th className="border border-black py-1 w-[15%]">රු.</th>
                <th className="border border-black py-1 w-[7%]">ශ.</th>
              </tr>
            </thead>
            <tbody>
              {/* Wholesale Rows */}
              {(() => {
                const wholesaleTotal = calculateColumnTotals(wholesaleRows);
                return (
                  <>
                    {wholesaleRows.map((row, idx) => {
                      const total = calculateTotal(row.prevRs, row.prevCts, row.todayRs, row.todayCts);
                      return (
                        <tr key={`w-${row.id}`} className="text-center text-xs h-7">
                    <td className="border border-black">{row.prevRs}</td>
                    <td className="border border-black">{row.prevCts}</td>
                    {idx === 0 && (
                      <td rowSpan={Math.max(1, wholesaleRows.length)} className="border border-black align-top p-0 relative bg-indigo-50/50 print:bg-transparent">
                        <div className="absolute top-1.5 left-2 font-bold z-10">තොග</div>
                        <div className="absolute top-0 left-0 flex flex-col h-full w-full pl-16">
                          {Array.from({length: wholesaleRows.length}).map((_, n) => (
                            <div key={n} className="flex-1 flex items-center text-[11px] font-normal text-slate-600 print:text-black">
                              {n + 1}
                            </div>
                          ))}
                        </div>
                      </td>
                    )}
                    <td className="border border-black">{row.todayRs}</td>
                    <td className="border border-black">{row.todayCts}</td>
                    <td className="border border-black">{total.rs}</td>
                        <td className="border border-black">{total.cts}</td>
                      </tr>
                    );
                    })}
                    
                    <tr className="text-center text-xs h-8 font-bold bg-indigo-100 text-indigo-900 print:bg-transparent print:text-black">
                      <td className="border border-black border-y-[3px]">{wholesaleTotal.prevRs}</td>
                      <td className="border border-black border-y-[3px]">{wholesaleTotal.prevCts}</td>
                      <td className="border border-black border-y-[3px]">තොග එකතුව</td>
                      <td className="border border-black border-y-[3px]">{wholesaleTotal.todayRs}</td>
                      <td className="border border-black border-y-[3px]">{wholesaleTotal.todayCts}</td>
                      <td className="border border-black border-y-[3px]">{wholesaleTotal.finalRs}</td>
                      <td className="border border-black border-y-[3px]">{wholesaleTotal.finalCts}</td>
                    </tr>
                  </>
                );
              })()}

              {/* Retail Rows */}
              {(() => {
                const retailTotal = calculateColumnTotals(retailRows);
                return (
                  <>
                    {retailRows.map((row, idx) => {
                      const total = calculateTotal(row.prevRs, row.prevCts, row.todayRs, row.todayCts);
                      return (
                        <tr key={`r-${row.id}`} className="text-center text-xs h-7">
                    <td className="border border-black">{row.prevRs}</td>
                    <td className="border border-black">{row.prevCts}</td>
                    {idx === 0 && (
                      <td rowSpan={Math.max(1, retailRows.length)} className="border border-black align-top p-0 relative bg-emerald-50/50 print:bg-transparent">
                        <div className="absolute top-1.5 left-2 font-bold z-10">සිල්ලර</div>
                        <div className="absolute top-0 left-0 flex flex-col h-full w-full pl-16">
                          {Array.from({length: retailRows.length}).map((_, n) => (
                            <div key={n} className="flex-1 flex items-center text-[11px] font-normal text-slate-600 print:text-black">
                              {n + 1}
                            </div>
                          ))}
                        </div>
                      </td>
                    )}
                    <td className="border border-black">{row.todayRs}</td>
                    <td className="border border-black">{row.todayCts}</td>
                    <td className="border border-black">{total.rs}</td>
                    <td className="border border-black">{total.cts}</td>
                  </tr>
                );
              })}

              <tr className="text-center text-xs h-8 font-bold bg-emerald-100 text-emerald-900 print:bg-transparent print:text-black">
                <td className="border border-black">{retailTotal.prevRs}</td>
                <td className="border border-black">{retailTotal.prevCts}</td>
                <td className="border border-black">සිල්ලර එකතුව</td>
                <td className="border border-black">{retailTotal.todayRs}</td>
                <td className="border border-black">{retailTotal.todayCts}</td>
                <td className="border border-black">{retailTotal.finalRs}</td>
                <td className="border border-black">{retailTotal.finalCts}</td>
              </tr>
            </>
          );
        })()}
            </tbody>
          </table>

          <div className="flex justify-end mt-16 font-bold text-sm">
            <div className="text-center">
              අත්සන ..............................................................
            </div>
          </div>

        </div>
      </div>

      <div className="flex justify-end pb-8">
        <button
          onClick={handleSaveForm}
          disabled={isSubmitting}
          className="flex items-center space-x-2 px-10 py-4 rounded-xl font-bold text-lg bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-200 transition-all duration-300 hover:-translate-y-1"
        >
          <Save className="w-6 h-6" />
          <span>{isSubmitting ? 'Saving...' : 'Save Entire Form'}</span>
        </button>
      </div>

    </div>
  );
}
