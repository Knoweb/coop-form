import React, { useState, useEffect, useMemo } from 'react';
import { Save, CheckCircle2, Printer, Plus, Trash2 } from 'lucide-react';

export default function Form11A() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [date, setDate] = useState('');

  // Main Table Rows
  const initialRow = {
    societyName: '',
    receiptNo: '',
    n1000: '', n500: '', n200: '', n100: '', n50: '', n20: '', n10: '',
    coinsRs: '', coinsCts: '',
    chequesRs: '', chequesCts: ''
  };
  
  const [rows, setRows] = useState([]);
  const [currentRecord, setCurrentRecord] = useState({ ...initialRow });

  const updateCurrentRecord = (field, value) => {
    setCurrentRecord({ ...currentRecord, [field]: value });
  };

  const handleAddRecord = (e) => {
    e.preventDefault();
    if (!currentRecord.societyName) return;
    if (rows.length >= 10) {
      alert('උපරිම වාර්තා 10ක් පමණක් ඇතුලත් කළ හැක. (Maximum 10 records allowed)');
      return;
    }
    setRows([...rows, currentRecord]);
    setCurrentRecord({ ...initialRow });
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  // Calculations for Main Table
  const tableData = useMemo(() => {
    let grandTotalRs = 0;
    let grandTotalCts = 0;
    let colTotals = {
      n1000Count: 0, n500Count: 0, n200Count: 0, n100Count: 0, n50Count: 0, n20Count: 0, n10Count: 0,
      n1000: 0, n500: 0, n200: 0, n100: 0, n50: 0, n20: 0, n10: 0,
      coinsRs: 0, coinsCts: 0, chequesRs: 0, chequesCts: 0
    };

    const processedRows = rows.map(row => {
      const c1000 = Number(row.n1000) || 0;
      const c500 = Number(row.n500) || 0;
      const c200 = Number(row.n200) || 0;
      const c100 = Number(row.n100) || 0;
      const c50 = Number(row.n50) || 0;
      const c20 = Number(row.n20) || 0;
      const c10 = Number(row.n10) || 0;

      const v1000 = c1000 * 1000;
      const v500 = c500 * 500;
      const v200 = c200 * 200;
      const v100 = c100 * 100;
      const v50 = c50 * 50;
      const v20 = c20 * 20;
      const v10 = c10 * 10;

      const notesTotal = v1000 + v500 + v200 + v100 + v50 + v20 + v10;
      const coinsRs = Number(row.coinsRs) || 0;
      const coinsCts = Number(row.coinsCts) || 0;
      const chqRs = Number(row.chequesRs) || 0;
      const chqCts = Number(row.chequesCts) || 0;

      let totalCts = coinsCts + chqCts;
      let totalRs = notesTotal + coinsRs + chqRs + Math.floor(totalCts / 100);
      totalCts = totalCts % 100;

      // Add to column totals
      colTotals.n1000Count += c1000; colTotals.n500Count += c500; colTotals.n200Count += c200;
      colTotals.n100Count += c100; colTotals.n50Count += c50; colTotals.n20Count += c20; colTotals.n10Count += c10;
      
      colTotals.n1000 += v1000; colTotals.n500 += v500; colTotals.n200 += v200;
      colTotals.n100 += v100; colTotals.n50 += v50; colTotals.n20 += v20; colTotals.n10 += v10;
      colTotals.coinsRs += coinsRs; colTotals.coinsCts += coinsCts;
      colTotals.chequesRs += chqRs; colTotals.chequesCts += chqCts;

      grandTotalRs += totalRs;
      grandTotalCts += totalCts;

      return {
        ...row,
        v1000: v1000 || '', v500: v500 || '', v200: v200 || '',
        v100: v100 || '', v50: v50 || '', v20: v20 || '', v10: v10 || '',
        totalRs: totalRs || '',
        totalCts: totalCts ? totalCts.toString().padStart(2, '0') : (totalRs ? '00' : '')
      };
    });

    grandTotalRs += Math.floor(grandTotalCts / 100);
    grandTotalCts = grandTotalCts % 100;

    colTotals.coinsRs += Math.floor(colTotals.coinsCts / 100);
    colTotals.coinsCts = colTotals.coinsCts % 100;
    colTotals.chequesRs += Math.floor(colTotals.chequesCts / 100);
    colTotals.chequesCts = colTotals.chequesCts % 100;

    return {
      rows: processedRows,
      grandTotalRs,
      grandTotalCts: grandTotalCts.toString().padStart(2, '0'),
      colTotals
    };
  }, [rows]);

  // Bottom Left Section
  const [openingBalance, setOpeningBalance] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [bankDeposit, setBankDeposit] = useState('');

  const summaryCalc = useMemo(() => {
    const ob = Number(openingBalance) || 0;
    const exp = Number(expenditure) || 0;
    const dep = Number(bankDeposit) || 0;
    
    // total collection = tableData.grandTotalRs (ignoring cents for simple balance, or we can use decimal)
    const collection = tableData.grandTotalRs + (Number(tableData.grandTotalCts) / 100);
    const cb = ob + collection - exp - dep;
    
    return {
      collection: collection.toFixed(2),
      closingBalance: cb.toFixed(2)
    };
  }, [openingBalance, expenditure, bankDeposit, tableData]);

  // Bottom Right Section (Bank Bills)
  const [bankBills, setBankBills] = useState(Array(4).fill({ desc: '', rs: '', cts: '' }));
  
  const updateBankBill = (index, field, value) => {
    const newBills = [...bankBills];
    newBills[index] = { ...newBills[index], [field]: value };
    setBankBills(newBills);
  };

  const bankBillsTotal = useMemo(() => {
    let rs = 0; let cts = 0;
    bankBills.forEach(bill => {
      rs += Number(bill.rs) || 0;
      cts += Number(bill.cts) || 0;
    });
    rs += Math.floor(cts / 100);
    cts = cts % 100;
    return { rs, cts: cts.toString().padStart(2, '0') };
  }, [bankBills]);

  // Bottom Footer Fields
  const [depositAmountStr, setDepositAmountStr] = useState('');
  const [depositDate, setDepositDate] = useState('');
  const [bankSecretNo, setBankSecretNo] = useState('');

  useEffect(() => {
    // Populate some dummy data for preview
    setDate('2023-11-20');
    
    const dRows = [];
    dRows.push({ ...initialRow, societyName: 'හික්කඩුව', receiptNo: '1024', n1000: '5', n500: '2', coinsRs: '150', coinsCts: '50' });
    dRows.push({ ...initialRow, societyName: 'ගාල්ල', receiptNo: '1025', n1000: '10', n100: '5', chequesRs: '5000', chequesCts: '00' });
    setRows(dRows);

    setOpeningBalance('15000.00');
    setExpenditure('2000.00');
    setBankDeposit('10000.00');

    const dBills = Array(4).fill({ desc: '', rs: '', cts: '' });
    dBills[0] = { desc: 'BOC - 1234', rs: '5000', cts: '00' };
    setBankBills(dBills);

    setDepositAmountStr('රු. 10,000.00');
    setDepositDate('2023-11-21');
    setBankSecretNo('785412');
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans print:bg-white print:p-0">
      <div className="max-w-[1400px] mx-auto space-y-6 print:space-y-0 print:max-w-none">
        
        {/* Action Bar */}
        <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 print:hidden">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Form 11 A</h1>
            <p className="text-sm text-slate-500">දෛනික මුදල් එකතු කිරීමේ සටහන (Daily Cash Collection Record)</p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button onClick={() => window.print()} className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors h-[40px]">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button onClick={handleSave} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-50 h-[40px]">
              {saveSuccess ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {isSaving ? 'Saving...' : saveSuccess ? 'Saved!' : 'Save'}
            </button>
          </div>
        </div>

        {/* Data Entry Form */}
        <div className="bg-white rounded-xl shadow p-6 border border-slate-200 print:hidden overflow-x-auto">
          <h2 className="text-lg font-bold text-slate-800 mb-4 border-b pb-2">Record Data Entry</h2>
          
          <div className="flex gap-4 mb-6">
            <div className="flex flex-col gap-1 w-64">
              <label className="text-xs font-semibold text-slate-600 uppercase">දිනය (Date)</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <div className="mb-8 border border-slate-200 rounded-lg p-5 bg-slate-50">
            <h3 className="font-semibold text-slate-700 mb-4">නව වාර්තාවක් එක් කරන්න (Add New Record)</h3>
            <form onSubmit={handleAddRecord} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600">ගබඩාවේ නම (Store Name)</label>
                  <input type="text" value={currentRecord.societyName} onChange={(e) => updateCurrentRecord('societyName', e.target.value)} required className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600">කුවිතාන්සි අංකය (Receipt No)</label>
                  <input type="text" value={currentRecord.receiptNo} onChange={(e) => updateCurrentRecord('receiptNo', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
                {[1000, 500, 200, 100, 50, 20, 10].map(note => (
                  <div key={note} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">රු {note}/- ගණන</label>
                    <input type="number" min="0" value={currentRecord[`n${note}`]} onChange={(e) => updateCurrentRecord(`n${note}`, e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white" />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600">කාසි (Coins)</label>
                  <div className="flex gap-2">
                    <input type="number" min="0" placeholder="රු (Rs)" value={currentRecord.coinsRs} onChange={(e) => updateCurrentRecord('coinsRs', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white w-1/2" />
                    <input type="number" min="0" placeholder="ශත (Cts)" value={currentRecord.coinsCts} onChange={(e) => updateCurrentRecord('coinsCts', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white w-1/2" />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-slate-600">චෙක්පත් (Cheques)</label>
                  <div className="flex gap-2">
                    <input type="number" min="0" placeholder="රු (Rs)" value={currentRecord.chequesRs} onChange={(e) => updateCurrentRecord('chequesRs', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white w-1/2" />
                    <input type="number" min="0" placeholder="ශත (Cts)" value={currentRecord.chequesCts} onChange={(e) => updateCurrentRecord('chequesCts', e.target.value)} className="border border-slate-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white w-1/2" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm">
                  <Plus className="w-4 h-4" /> වාර්තාව එක් කරන්න
                </button>
              </div>
            </form>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-slate-700 mb-3">ඇතුලත් කළ වාර්තා (Added Records - {rows.length}/10)</h3>
            {rows.length === 0 ? (
              <div className="text-sm text-slate-500 italic p-6 border rounded-lg bg-slate-50 text-center">කිසිදු වාර්තාවක් ඇතුලත් කර නොමැත. (No records added yet)</div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="border-b border-slate-200 p-3 w-12 text-center">#</th>
                      <th className="border-b border-slate-200 p-3 text-left">ගබඩාවේ නම</th>
                      <th className="border-b border-slate-200 p-3 w-32 text-center">කුවිතාන්සි අංකය</th>
                      <th className="border-b border-slate-200 p-3 w-32 text-right">මුළු මුදල</th>
                      <th className="border-b border-slate-200 p-3 w-16 text-center">මකන්න</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 border-b last:border-b-0 border-slate-100">
                        <td className="p-3 text-center text-slate-500">{idx + 1}</td>
                        <td className="p-3 font-medium text-slate-700">{row.societyName}</td>
                        <td className="p-3 text-center text-slate-600">{row.receiptNo}</td>
                        <td className="p-3 text-right font-semibold text-slate-700">{row.totalRs}.{row.totalCts}</td>
                        <td className="p-3 text-center">
                          <button onClick={() => removeRow(idx)} className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 border-t pt-6">
            <div className="space-y-3">
              <h3 className="font-bold text-slate-700 mb-2">ශේෂයන් (Summary Balances)</h3>
              <div className="flex justify-between items-center max-w-sm">
                <span className="text-sm">අග ඉතිරිය (Opening Bal)</span>
                <input type="number" value={openingBalance} onChange={(e) => setOpeningBalance(e.target.value)} className="border px-2 py-1 rounded w-32 text-right text-sm" />
              </div>
              <div className="flex justify-between items-center max-w-sm">
                <span className="text-sm">වියදම (Expenditure)</span>
                <input type="number" value={expenditure} onChange={(e) => setExpenditure(e.target.value)} className="border px-2 py-1 rounded w-32 text-right text-sm" />
              </div>
              <div className="flex justify-between items-center max-w-sm">
                <span className="text-sm">බැංකු තැන්පත් (Bank Deposit)</span>
                <input type="number" value={bankDeposit} onChange={(e) => setBankDeposit(e.target.value)} className="border px-2 py-1 rounded w-32 text-right text-sm" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-700 mb-2">බැංකු බිල්පත් (Bank Bills)</h3>
              {bankBills.map((bill, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-slate-500 w-4">{idx + 1}.</span>
                  <input type="text" value={bill.desc} onChange={(e) => updateBankBill(idx, 'desc', e.target.value)} placeholder="විස්තරය" className="border px-2 py-1 rounded flex-1 text-sm" />
                  <input type="number" value={bill.rs} onChange={(e) => updateBankBill(idx, 'rs', e.target.value)} placeholder="රු" className="border px-2 py-1 rounded w-20 text-right text-sm" />
                  <input type="number" value={bill.cts} onChange={(e) => updateBankBill(idx, 'cts', e.target.value)} placeholder="ශත" className="border px-2 py-1 rounded w-12 text-center text-sm" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t pt-6">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">තැන්පත් කළ මුදල</label>
              <input type="text" value={depositAmountStr} onChange={(e) => setDepositAmountStr(e.target.value)} className="border rounded px-3 py-2 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">තැන්පත් කළ දිනය</label>
              <input type="text" value={depositDate} onChange={(e) => setDepositDate(e.target.value)} className="border rounded px-3 py-2 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-slate-600 uppercase">බැංකුවේ රහස්‍ය අංකය</label>
              <input type="text" value={bankSecretNo} onChange={(e) => setBankSecretNo(e.target.value)} className="border rounded px-3 py-2 text-sm" />
            </div>
          </div>
        </div>

        {/* Printable View - A4 Landscape layout essentially */}
        <div className="bg-white shadow rounded-xl p-6 overflow-x-auto text-slate-800 font-serif border border-slate-200 print:shadow-none print:border-none print:p-0">
          <div className="min-w-[1200px] print:w-full mx-auto relative bg-white leading-snug">
            
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-end gap-2 text-sm font-semibold">
                <span>දිනය......................................</span>
                <span className="relative -top-1 -ml-36 bg-white px-2 inline-block min-w-[120px] text-center">{date}</span>
              </div>
              <h2 className="text-center font-bold text-xl underline underline-offset-4 flex-1">දෛනික මුදල් එකතු කිරීමේ සටහන</h2>
              <div className="text-sm font-semibold">Form 11 A</div>
            </div>

            {/* Main Table */}
            <table className="w-full border-collapse border border-black text-[11px] mb-8">
              <thead>
                <tr>
                  <th rowSpan="3" className="border border-black w-48 p-1 font-semibold">ගබඩාවේ නම</th>
                  <th colSpan="2" className="border border-black w-24 p-1 font-semibold text-center leading-tight">මුළු මුදල</th>
                  <th rowSpan="3" className="border border-black w-24 p-1 font-semibold text-center leading-tight">කුවිතාන්සි<br/>අංකය</th>
                  <th colSpan="18" className="border border-black p-1 font-semibold text-center text-lg tracking-widest py-2">විස්තර</th>
                  <th rowSpan="3" className="border border-black w-32 p-1 font-semibold text-center leading-tight">මුදල්<br/>භාරකරුගේ<br/>අත්සන/කෙටි අත්සන</th>
                </tr>
                <tr>
                  <th rowSpan="2" className="border border-black p-1 font-semibold text-center">රු</th>
                  <th rowSpan="2" className="border border-black p-1 font-semibold text-center">ශත</th>
                  
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center whitespace-nowrap">රු 1000/-<br/>නෝට්ටු</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center whitespace-nowrap">රු 500/-<br/>නෝට්ටු</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center whitespace-nowrap">රු 200/-<br/>නෝට්ටු</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center whitespace-nowrap">රු 100/-<br/>නෝට්ටු</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center whitespace-nowrap">රු 50/-<br/>නෝට්ටු</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center whitespace-nowrap">රු 20/-<br/>නෝට්ටු</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center whitespace-nowrap">10/-<br/>නෝට්ටු</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center">කාසි</th>
                  <th colSpan="2" className="border border-black p-1 font-semibold text-center">චෙක්පත්</th>
                </tr>
                <tr>
                  {/* Note subheaders */}
                  {[...Array(7)].map((_, i) => (
                    <React.Fragment key={i}>
                      <th className="border border-black p-1 font-semibold text-center">ගණන</th>
                      <th className="border border-black p-1 font-semibold text-center">මුදල</th>
                    </React.Fragment>
                  ))}
                  {/* Coins & Cheques subheaders */}
                  <th className="border border-black p-1 font-semibold text-center">රු</th>
                  <th className="border border-black p-1 font-semibold text-center">ශත</th>
                  <th className="border border-black p-1 font-semibold text-center">රු</th>
                  <th className="border border-black p-1 font-semibold text-center">ශත</th>
                </tr>
              </thead>
              <tbody>
                {/* We render exactly 10 rows for print layout to match physical form */}
                {tableData.rows.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="h-7">
                    <td className="border border-black px-2">{row.societyName}</td>
                    <td className="border border-black px-1 text-right">{row.totalRs}</td>
                    <td className="border border-black px-1 text-center">{row.totalCts}</td>
                    <td className="border border-black px-1 text-center">{row.receiptNo}</td>
                    
                    <td className="border border-black px-1 text-center">{row.n1000}</td>
                    <td className="border border-black px-1 text-right">{row.v1000}</td>
                    <td className="border border-black px-1 text-center">{row.n500}</td>
                    <td className="border border-black px-1 text-right">{row.v500}</td>
                    <td className="border border-black px-1 text-center">{row.n200}</td>
                    <td className="border border-black px-1 text-right">{row.v200}</td>
                    <td className="border border-black px-1 text-center">{row.n100}</td>
                    <td className="border border-black px-1 text-right">{row.v100}</td>
                    <td className="border border-black px-1 text-center">{row.n50}</td>
                    <td className="border border-black px-1 text-right">{row.v50}</td>
                    <td className="border border-black px-1 text-center">{row.n20}</td>
                    <td className="border border-black px-1 text-right">{row.v20}</td>
                    <td className="border border-black px-1 text-center">{row.n10}</td>
                    <td className="border border-black px-1 text-right">{row.v10}</td>
                    
                    <td className="border border-black px-1 text-right">{row.coinsRs ? row.coinsRs : ''}</td>
                    <td className="border border-black px-1 text-center">{row.coinsRs || row.coinsCts ? (row.coinsCts || '00') : ''}</td>
                    
                    <td className="border border-black px-1 text-right">{row.chequesRs ? row.chequesRs : ''}</td>
                    <td className="border border-black px-1 text-center">{row.chequesRs || row.chequesCts ? (row.chequesCts || '00') : ''}</td>
                    
                    <td className="border border-black px-1"></td>
                  </tr>
                ))}
                
                {/* Fill remaining rows up to 10 if less than 10 data rows */}
                {[...Array(Math.max(0, 10 - tableData.rows.length))].map((_, idx) => (
                  <tr key={`empty-${idx}`} className="h-7">
                    {[...Array(23)].map((_, colIdx) => <td key={colIdx} className="border border-black px-1"></td>)}
                  </tr>
                ))}

                {/* Grand Total Row */}
                <tr className="h-8 font-bold">
                  <td className="border border-black px-2 text-center">මුළු එකතුව</td>
                  <td className="border border-black px-1 text-right">{tableData.grandTotalRs > 0 ? tableData.grandTotalRs : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.grandTotalRs > 0 || tableData.grandTotalCts > 0 ? tableData.grandTotalCts : ''}</td>
                  <td className="border border-black px-1"></td>
                  
                  <td className="border border-black px-1 text-center">{tableData.colTotals.n1000Count > 0 ? tableData.colTotals.n1000Count : ''}</td>
                  <td className="border border-black px-1 text-right">{tableData.colTotals.n1000 > 0 ? tableData.colTotals.n1000 : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.n500Count > 0 ? tableData.colTotals.n500Count : ''}</td>
                  <td className="border border-black px-1 text-right">{tableData.colTotals.n500 > 0 ? tableData.colTotals.n500 : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.n200Count > 0 ? tableData.colTotals.n200Count : ''}</td>
                  <td className="border border-black px-1 text-right">{tableData.colTotals.n200 > 0 ? tableData.colTotals.n200 : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.n100Count > 0 ? tableData.colTotals.n100Count : ''}</td>
                  <td className="border border-black px-1 text-right">{tableData.colTotals.n100 > 0 ? tableData.colTotals.n100 : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.n50Count > 0 ? tableData.colTotals.n50Count : ''}</td>
                  <td className="border border-black px-1 text-right">{tableData.colTotals.n50 > 0 ? tableData.colTotals.n50 : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.n20Count > 0 ? tableData.colTotals.n20Count : ''}</td>
                  <td className="border border-black px-1 text-right">{tableData.colTotals.n20 > 0 ? tableData.colTotals.n20 : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.n10Count > 0 ? tableData.colTotals.n10Count : ''}</td>
                  <td className="border border-black px-1 text-right">{tableData.colTotals.n10 > 0 ? tableData.colTotals.n10 : ''}</td>
                  
                  <td className="border border-black px-1 text-right">{tableData.colTotals.coinsRs > 0 ? tableData.colTotals.coinsRs : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.coinsRs > 0 || tableData.colTotals.coinsCts > 0 ? tableData.colTotals.coinsCts.toString().padStart(2,'0') : ''}</td>
                  
                  <td className="border border-black px-1 text-right">{tableData.colTotals.chequesRs > 0 ? tableData.colTotals.chequesRs : ''}</td>
                  <td className="border border-black px-1 text-center">{tableData.colTotals.chequesRs > 0 || tableData.colTotals.chequesCts > 0 ? tableData.colTotals.chequesCts.toString().padStart(2,'0') : ''}</td>
                  
                  <td className="border border-black px-1"></td>
                </tr>
              </tbody>
            </table>

            {/* Bottom Section */}
            <div className="flex justify-between items-start text-sm px-4">
              
              {/* Bottom Left: Summary */}
              <div className="w-1/3">
                <table className="w-full font-semibold">
                  <tbody>
                    <tr>
                      <td className="w-32 pb-2">අග ඉතිරිය</td>
                      <td className="pb-2">
                        <span className="border-b border-black w-48 inline-block translate-y-[2px]">{openingBalance}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-2">එකතුකිරීම</td>
                      <td className="pb-2">
                        <span className="border-b border-black w-48 inline-block translate-y-[2px]">{summaryCalc.collection}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-2">එකතුව</td>
                      <td className="pb-2">
                        <span className="border-b border-black w-48 inline-block translate-y-[2px]">{summaryCalc.total}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-2">බැංකු තැන්පත්</td>
                      <td className="pb-2">
                        <span className="border-b border-black w-48 inline-block translate-y-[2px]">{bankDeposit}</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="pb-2">අත ඉතිරිය</td>
                      <td className="pb-2">
                        <span className="border-b border-black w-48 inline-block translate-y-[2px]">{summaryCalc.closingBalance}</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Bottom Right: Bank Bills */}
              <div className="w-[350px]">
                <table className="w-full border-collapse border border-black mb-8">
                  <thead>
                    <tr>
                      <th className="border border-black py-1 px-2 font-semibold">ජංගම ගිණුම</th>
                      <th className="border border-black py-1 px-2 font-semibold w-24">මුදල</th>
                      <th className="border border-black py-1 px-2 w-12"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {bankBills.map((bill, idx) => (
                      <tr key={idx} className="h-6">
                        <td className="border border-black px-2">{idx + 1}. {bill.desc}</td>
                        <td className="border border-black px-1 text-right">{bill.rs}</td>
                        <td className="border border-black px-1 text-center">{bill.rs ? (bill.cts || '00') : ''}</td>
                      </tr>
                    ))}
                    <tr className="h-6 font-bold">
                      <td className="border border-black px-2 text-center">එකතුව</td>
                      <td className="border border-black px-1 text-right">{bankBillsTotal.rs > 0 ? bankBillsTotal.rs : ''}</td>
                      <td className="border border-black px-1 text-center">{bankBillsTotal.rs > 0 || bankBillsTotal.cts > 0 ? bankBillsTotal.cts : ''}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Signatures below the table */}
                <div className="flex flex-col items-center mt-12 space-y-12">
                  <div className="flex flex-col items-center w-full">
                    <span className="border-b border-black w-64 inline-block mb-1"></span>
                    <span className="font-semibold text-sm">මුදල් භාරදෙන අයගේ අත්සන</span>
                  </div>
                  <div className="flex flex-col items-center w-full">
                    <span className="border-b border-black w-64 inline-block mb-1"></span>
                    <span className="font-semibold text-sm">අයදුම්කරුගේ අත්සන</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Footer info */}
            <div className="flex justify-between items-end mt-12 px-4 pb-4">
              <div className="space-y-3 font-semibold text-sm">
                <div className="flex items-end">
                  <span className="w-60">1. තැන්පත් කළ මුදල</span>
                  <span className="border-b border-black w-64 inline-block translate-y-[2px]">{depositAmountStr}</span>
                </div>
                <div className="flex items-end">
                  <span className="w-60">2. තැන්පත් කළ දිනය</span>
                  <span className="border-b border-black w-64 inline-block translate-y-[2px]">{depositDate}</span>
                </div>
                <div className="flex items-end">
                  <span className="w-60">3. බැංකුවේ රහස්‍ය අංකය</span>
                  <span className="border-b border-black w-64 inline-block translate-y-[2px]">{bankSecretNo}</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-2 right-1/2 font-bold text-lg">15</div>

          </div>
        </div>
      </div>
    </div>
  );
}
