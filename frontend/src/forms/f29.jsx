import React, { useState, useRef } from 'react';
import { Save, FileText, CheckCircle2, AlertCircle, LayoutList, Plus, X } from 'lucide-react';

const EXPENSES_LABELS = ['ඩීසල්/පැට්‍රල්', 'තෙල්', 'සර්විස්', 'අළු: වැඩියා', 'ටයර් ටියුබ්', 'බදු', 'අතිකාල', 'බටා', 'පැටවුම්', 'මුරකුලී', 'මිශ්‍ර'];
const INCOME_LABELS = ['තොග ගබඩා', 'සිල්ලර', 'ප්‍ර. කොමසාරිස්:', 'පිටස්තර', 'සෙසු'];
const OVERTIME_LABELS = ['රියදුරු:', 'සේවක:'];

const createEmptyRows = (count) => Array(count).fill(0).map((_, i) => ({ id: Date.now() + i, label: (i + 1).toString(), col1: '', col2: '', col3: '', col4: '' }));
const createLabelRows = (labels) => labels.map((l, i) => ({ id: Date.now() + i, label: l, col1: '', col2: '', col3: '', col4: '' }));

export default function F29() {
  const [globalData, setGlobalData] = useState({
    date: '', vehicleNo: '',
    meterEndOfDay: '', meterPrevDay: '', meterWorkedMiles: '',
    preparedBy: '', checkedBy: '', signDate: ''
  });

  const [issuedFuel, setIssuedFuel] = useState(createEmptyRows(3));
  const [usedFuel, setUsedFuel] = useState(createEmptyRows(3));
  const [mileage, setMileage] = useState(createEmptyRows(4));
  const [expenses, setExpenses] = useState(createLabelRows(EXPENSES_LABELS));
  const [income, setIncome] = useState(createLabelRows(INCOME_LABELS));
  const [overtime, setOvertime] = useState(createLabelRows(OVERTIME_LABELS));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const printRef = useRef();

  const handleGlobalChange = (e) => {
    setGlobalData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateRow = (setter, id, field, value) => {
    setter(prev => prev.map(row => row.id === id ? { ...row, [field]: value } : row));
  };

  const addRow = (setter) => {
    setter(prev => [...prev, { id: Date.now(), label: '', col1: '', col2: '', col3: '', col4: '' }]);
  };

  const removeRow = (setter, id) => {
    setter(prev => prev.filter(row => row.id !== id));
  };

  const handleSaveForm = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const rows = [
        ...issuedFuel.map(r => ({ ...r, section: 'ISSUED_FUEL' })),
        ...usedFuel.map(r => ({ ...r, section: 'USED_FUEL' })),
        ...mileage.map(r => ({ ...r, section: 'MILEAGE' })),
        ...expenses.map(r => ({ ...r, section: 'EXPENSE' })),
        ...income.map(r => ({ ...r, section: 'INCOME' })),
        ...overtime.map(r => ({ ...r, section: 'OVERTIME' }))
      ].map(r => {
        const { id, ...rest } = r;
        return rest;
      });

      const payload = { ...globalData, rows };

      const response = await fetch('http://localhost:8080/api/f29-records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to save record');

      setSubmitStatus({ type: 'success', message: 'Record saved successfully!' });

      // Reset form
      setGlobalData({ date: '', vehicleNo: '', meterEndOfDay: '', meterPrevDay: '', meterWorkedMiles: '', preparedBy: '', checkedBy: '', signDate: '' });
      setIssuedFuel(createEmptyRows(3));
      setUsedFuel(createEmptyRows(3));
      setMileage(createEmptyRows(4));
      setExpenses(createLabelRows(EXPENSES_LABELS));
      setIncome(createLabelRows(INCOME_LABELS));
      setOvertime(createLabelRows(OVERTIME_LABELS));

      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Failed to submit record:', error);
      setSubmitStatus({ type: 'error', message: 'Failed to save record. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTable = (title, columns, data, setter, showLabelCol = false, labelColName = '', extraClasses = '') => (
    <div className={`border border-slate-800 relative group flex flex-col h-full ${extraClasses}`}>
      <div className="border-b border-slate-800 text-center font-bold text-sm py-1.5 bg-slate-100 print:bg-transparent">{title}</div>
      <div className="flex-1">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {columns.map((c, i) => <th key={i} className="border border-slate-800 text-[11px] py-1 px-1 font-semibold text-center align-middle">{c}</th>)}
              <th className="w-5 border-slate-800 print:hidden"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className="relative group/row hover:bg-slate-50 transition-colors print:hover:bg-transparent">
                {columns.map((c, i) => {
                  let field = '';
                  if (c === 'පෙර දින:') field = 'col1';
                  else if (c === 'විස්තර') field = 'col2';
                  else if (c === 'පිටු:') field = 'col2';
                  else if (c === 'දිනට') field = 'col3';
                  else if (c === 'එකතුව' || c === 'දින: එක:' || c === 'දින: මු: එක:') field = 'col4';

                  // Special handling for pre-defined label rows
                  if (showLabelCol && ((c === labelColName) || (c === 'විස්තර' && !field))) {
                    return (
                      <td key={i} className="border border-slate-800 p-0 text-xs font-semibold text-slate-900 w-1/3">
                        <input
                          type="text"
                          value={row.label}
                          onChange={(e) => updateRow(setter, row.id, 'label', e.target.value)}
                          className="w-full h-7 px-2 bg-transparent focus:outline-none focus:bg-slate-100 hover:bg-slate-50 transition-colors text-slate-900"
                          placeholder={index >= (title === 'වියදම්' ? 11 : title === 'ආදායම්' ? 5 : 0) ? 'විස්තර...' : ''}
                          readOnly={index < (title === 'වියදම්' ? 11 : title === 'ආදායම්' ? 5 : title === 'අතිකාල දීමනා පැය' ? 2 : 0)}
                        />
                      </td>
                    )
                  }

                  return (
                    <td key={i} className="border border-slate-800 p-0 h-7">
                      <input
                        type="text"
                        value={row[field]}
                        onChange={(e) => updateRow(setter, row.id, field, e.target.value)}
                        className="w-full h-full px-1 text-xs text-center focus:outline-none focus:bg-slate-100 hover:bg-slate-50 transition-colors text-slate-900 font-semibold print:bg-transparent"
                      />
                    </td>
                  );
                })}
                <td className="w-5 p-0 print:hidden text-center align-middle">
                  <button
                    onClick={() => removeRow(setter, row.id)}
                    className="text-red-400 hover:text-red-600 opacity-0 group-hover/row:opacity-100 transition-opacity p-0.5 mx-auto"
                    title="Remove Row"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={() => addRow(setter)}
        className="print:hidden w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-1 transition-colors border-t-2 border-dashed border-slate-300 bg-slate-50/50"
      >
        <Plus className="w-4 h-4" /> Add Row
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-12">
      {/* Header Controls */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">F 29 Form</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">කාර්යාලයේ ප්‍රයෝජනය පිණිස</p>
          </div>
        </div>

        <div className="w-full md:w-auto">
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

      {/* Main Print Area */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
        <div ref={printRef} className="min-w-[1000px] print:w-[1000px] mx-auto text-slate-900 bg-white p-8">

          {/* Top Info */}
          <div className="flex justify-between items-center mb-4 font-bold text-[15px]">
            <div className="tracking-wide text-slate-900">කාර්යාලයේ ප්‍රයෝජනය පිණිස</div>
            <div className="flex items-end gap-2">
              <span className="text-slate-900">දිනය:</span>
              <input type="text" name="date" value={globalData.date} onChange={handleGlobalChange} className="border-b border-dotted border-slate-800 w-32 focus:outline-none text-center text-slate-900 focus:bg-slate-50 hover:bg-slate-50/50 transition-colors" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-slate-900">වාහන අංකය:</span>
              <input type="text" name="vehicleNo" value={globalData.vehicleNo} onChange={handleGlobalChange} className="border-b border-dotted border-slate-800 w-32 focus:outline-none text-center text-slate-900 focus:bg-slate-50 hover:bg-slate-50/50 transition-colors" />
            </div>
            <div className="text-lg text-slate-900">F 29</div>
          </div>

          <div className="flex border border-slate-800">

            {/* Left 75% */}
            <div className="w-3/4 flex flex-col">

              {/* Top Row */}
              <div className="flex">
                <div className="w-[40%] border-r border-b border-slate-800">
                  {renderTable('නිකුත් කළ පැට්‍රල්/ඩීසල්/තෙල්', ['පෙර දින:', 'විස්තර', 'දිනට', 'එකතුව'], issuedFuel, setIssuedFuel, false, '', 'border-0')}
                </div>
                <div className="w-[40%] border-r border-b border-slate-800">
                  {renderTable('පාවිච්චි කළ පැට්‍රල්/ඩීසල්/තෙල්', ['පෙර දින:', 'විස්තර', 'දිනට', 'එකතුව'], usedFuel, setUsedFuel, false, '', 'border-0')}
                </div>
                <div className="w-[20%] border-b border-slate-800 flex text-xs">
                  <div className="w-[30%] border-r border-slate-800 flex items-center justify-center font-bold bg-slate-100 print:bg-transparent text-center p-1 leading-tight">
                    මීටර අංක<br />සට:
                  </div>
                  <div className="w-[70%] flex flex-col border-slate-800">
                    <div className="flex border-b border-slate-800 flex-1 group/input">
                      <div className="w-[60%] border-r border-slate-800 p-1 flex items-center group-hover/input:bg-slate-50 transition-colors">දවස අවසාන</div>
                      <input type="text" name="meterEndOfDay" value={globalData.meterEndOfDay} onChange={handleGlobalChange} className="w-[40%] focus:outline-none text-center text-slate-900 font-semibold focus:bg-slate-100 hover:bg-slate-50 transition-colors" />
                    </div>
                    <div className="flex border-b border-slate-800 flex-1 group/input">
                      <div className="w-[60%] border-r border-slate-800 p-1 flex items-center group-hover/input:bg-slate-50 transition-colors">පෙර දින අ:</div>
                      <input type="text" name="meterPrevDay" value={globalData.meterPrevDay} onChange={handleGlobalChange} className="w-[40%] focus:outline-none text-center text-slate-900 font-semibold focus:bg-slate-100 hover:bg-slate-50 transition-colors" />
                    </div>
                    <div className="flex flex-1 group/input">
                      <div className="w-[60%] border-r border-slate-800 p-1 flex items-center text-[10px] leading-tight group-hover/input:bg-slate-50 transition-colors">වැ: කළ: සැ: ග:</div>
                      <input type="text" name="meterWorkedMiles" value={globalData.meterWorkedMiles} onChange={handleGlobalChange} className="w-[40%] focus:outline-none text-center text-slate-900 font-semibold focus:bg-slate-100 hover:bg-slate-50 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="flex flex-1">
                <div className="w-1/2 border-r border-slate-800 flex flex-col">
                  {renderTable('වියදම්', ['පෙර දින:', 'පිටු:', 'විස්තර', 'දිනට', 'දින: මු: එක:'], expenses, setExpenses, true, 'විස්තර', 'border-0')}
                </div>
                <div className="w-1/2 flex flex-col">
                  {renderTable('ආදායම්', ['පෙර දින:', 'විස්තර', 'පිටු:', 'දිනට', 'දින: මු: එක:'], income, setIncome, true, 'විස්තර', 'border-0')}
                </div>
              </div>

            </div>

            {/* Right 25% */}
            <div className="w-1/4 border-l border-slate-800 flex flex-col">
              <div className="flex-1 border-b border-slate-800">
                {renderTable('වැඩ කළ සැතපුම් විස්තර', ['පෙර දින:', 'විස්තර', 'දිනට', 'දින: එක:'], mileage, setMileage, false, '', 'border-0')}
              </div>

              <div className="border-b border-slate-800 relative group flex flex-col">
                <div className="text-center font-bold text-sm py-1.5 bg-slate-100 print:bg-transparent border-b border-slate-800">
                  අතිකාල දීමනා පැය
                </div>
                <div className="flex-1">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b border-r border-slate-800 w-1/4"></th>
                        <th className="border-b border-r border-slate-800 text-[11px] py-1">පෙර දින:</th>
                        <th className="border-b border-r border-slate-800 text-[11px] py-1">දිනට</th>
                        <th className="border-b border-slate-800 text-[11px] py-1">දින: එක:</th>
                        <th className="w-5 print:hidden border-b border-slate-800"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {overtime.map((row, idx) => (
                        <tr key={row.id} className="relative group/row hover:bg-slate-50 transition-colors print:hover:bg-transparent">
                          <td className="border-b border-r border-slate-800 p-0 text-xs font-semibold text-slate-900">
                            <input type="text" value={row.label} onChange={(e) => updateRow(setOvertime, row.id, 'label', e.target.value)} className="w-full h-7 px-2 bg-transparent focus:outline-none focus:bg-slate-100 hover:bg-slate-50 transition-colors text-slate-900" readOnly={idx < 2} />
                          </td>
                          <td className="border-b border-r border-slate-800 p-0 h-7">
                            <input type="text" value={row.col1} onChange={(e) => updateRow(setOvertime, row.id, 'col1', e.target.value)} className="w-full h-full text-center focus:outline-none focus:bg-slate-100 hover:bg-slate-50 transition-colors text-slate-900 font-semibold text-xs bg-transparent print:bg-transparent" />
                          </td>
                          <td className="border-b border-r border-slate-800 p-0 h-7">
                            <input type="text" value={row.col3} onChange={(e) => updateRow(setOvertime, row.id, 'col3', e.target.value)} className="w-full h-full text-center focus:outline-none focus:bg-slate-100 hover:bg-slate-50 transition-colors text-slate-900 font-semibold text-xs bg-transparent print:bg-transparent" />
                          </td>
                          <td className="border-b border-slate-800 p-0 h-7">
                            <input type="text" value={row.col4} onChange={(e) => updateRow(setOvertime, row.id, 'col4', e.target.value)} className="w-full h-full text-center focus:outline-none focus:bg-slate-100 hover:bg-slate-50 transition-colors text-slate-900 font-semibold text-xs bg-transparent print:bg-transparent" />
                          </td>
                          <td className="w-5 p-0 print:hidden text-center align-middle border-b border-slate-800">
                            <button onClick={() => removeRow(setOvertime, row.id)} className="text-red-400 hover:text-red-600 opacity-0 group-hover/row:opacity-100 transition-opacity p-0.5 mx-auto" title="Remove Row">
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={() => addRow(setOvertime)} className="print:hidden w-full py-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center gap-1 transition-colors border-t-2 border-dashed border-slate-300 bg-slate-50/50">
                  <Plus className="w-4 h-4" /> Add Row
                </button>
              </div>

              {/* Signatures */}
              <div className="p-4 pt-8 text-xs space-y-5">
                <div className="flex items-end group/input">
                  <span className="w-20 font-semibold text-slate-900">පිළියෙල කළේ:</span>
                  <input type="text" name="preparedBy" value={globalData.preparedBy} onChange={handleGlobalChange} className="flex-1 border-b border-slate-800 focus:outline-none text-slate-900 font-semibold px-2 pb-0.5 focus:bg-slate-100 hover:bg-slate-50 transition-colors" />
                </div>
                <div className="flex items-end group/input">
                  <span className="w-20 font-semibold text-slate-900">පරීක්ෂා කළේ:</span>
                  <input type="text" name="checkedBy" value={globalData.checkedBy} onChange={handleGlobalChange} className="flex-1 border-b border-slate-800 focus:outline-none text-slate-900 font-semibold px-2 pb-0.5 focus:bg-slate-100 hover:bg-slate-50 transition-colors" />
                </div>
                <div className="flex items-end group/input">
                  <span className="w-20 font-semibold text-slate-900">දිනය:</span>
                  <input type="text" name="signDate" value={globalData.signDate} onChange={handleGlobalChange} className="flex-1 border-b border-slate-800 focus:outline-none text-slate-900 font-semibold px-2 pb-0.5 focus:bg-slate-100 hover:bg-slate-50 transition-colors" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
