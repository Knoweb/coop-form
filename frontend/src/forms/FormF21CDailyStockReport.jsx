import React, { useState, useEffect } from 'react';
import { PlusCircle, FileText } from 'lucide-react';

const PRESET_ROWS = {
  'ලැබීම්': [
    'සුදු ඩීසල්',
    'මෝටර් පෙට්‍රල්',
    'භූමිතෙල් (රූටා)',
    'ආපසු ලැබෙන බඩු (මිල අඩුයි)',
    'අළුත් මුදල් එකතුව'
  ],
  'නිකුත් කිරීම': [
    'ද්‍රව්‍ය විකුණූ',
    'ද්‍රව්‍ය මාරු',
    'ද්‍රව්‍ය සම්පත් ආපසුයැවීම',
    'එකතු වූ අඩුම',
    'බහාලුම් ද්‍රව්‍ය',
    'වෙනකුත්'
  ],
  'අවසාන ශේෂය': [
    'ද්‍රව්‍ය අවසාන මෝටර් ශේෂය',
    'ද්‍රව්‍ය ආරක්ෂක මෝටර් ශේෂය',
    'ද්‍රව්‍ය ටියුබ් කපන ද්‍රව්‍ය'
  ]
};

export default function FormF21CDailyStockReport() {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    reportDate: '',
    sectionCategory: 'ලැබීම්',
    rowName: PRESET_ROWS['ලැබීම්'][0],
    refNo: '',
    
    prevDayQty: 0,
    prevDayVal: 0,
    dailyQty: 0,
    dailyVal: 0,
    totalQty: 0,
    totalVal: 0,
    salesQty: 0,
    salesVal: 0,
    varianceQty: 0,
    varianceVal: 0,
    grandTotalVal: 0
  });

  const fetchRecords = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/form-f21c');
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
    
    // When section changes, reset the row name to the first option of the new section
    if (name === 'sectionCategory') {
      setFormData((prev) => ({
        ...prev,
        sectionCategory: value,
        rowName: PRESET_ROWS[value][0]
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    }
  };

  const handleAddEntry = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/form-f21c', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchRecords();
        setFormData({
          reportDate: formData.reportDate,
          sectionCategory: formData.sectionCategory,
          rowName: formData.rowName,
          refNo: '',
          prevDayQty: 0,
          prevDayVal: 0,
          dailyQty: 0,
          dailyVal: 0,
          totalQty: 0,
          totalVal: 0,
          salesQty: 0,
          salesVal: 0,
          varianceQty: 0,
          varianceVal: 0,
          grandTotalVal: 0
        });
      } else {
        alert('Failed to save record.');
      }
    } catch (error) {
      console.error('Error saving record:', error);
      alert('Error saving record.');
    }
  };

  // Group records by Date and then by Section
  const groupedRecords = records.reduce((acc, record) => {
    if (!acc[record.reportDate]) acc[record.reportDate] = {};
    if (!acc[record.reportDate][record.sectionCategory]) {
      acc[record.reportDate][record.sectionCategory] = [];
    }
    acc[record.reportDate][record.sectionCategory].push(record);
    return acc;
  }, {});

  return (
    <div className="max-w-[110rem] mx-auto space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-800 px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-fuchsia-500/20 p-2 rounded-lg">
              <FileText className="w-6 h-6 text-fuchsia-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">දිනකට ඉදිරි බඩු තොග වාර්තාව</h2>
              <p className="text-slate-400 text-sm">Daily Forward Stock Report (Form F 21 C)</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleAddEntry} className="p-6">
          <div className="space-y-6">
            
            {/* Identity Group */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-slate-50 p-5 rounded-xl border border-slate-200">
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">දිනය (Date)</label>
                  <input type="date" name="reportDate" value={formData.reportDate} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required />
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අංශය (Section)</label>
                  <select name="sectionCategory" value={formData.sectionCategory} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                    {Object.keys(PRESET_ROWS).map(sec => (
                        <option key={sec} value={sec}>{sec}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අයිතමය (Row Name)</label>
                  <select name="rowName" value={formData.rowName} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" required>
                    {PRESET_ROWS[formData.sectionCategory].map(item => (
                        <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">අදාල අංකය (Ref No)</label>
                  <input type="text" name="refNo" value={formData.refNo} onChange={handleChange} className="w-full px-4 py-2 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
               </div>
            </div>

            {/* Metrics Group */}
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                    <h4 className="text-sm font-bold text-blue-800 mb-3 text-center">මුල් දිනේ ඉදිරිපත්<br/>(Previous Day)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="prevDayQty" value={formData.prevDayQty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-blue-700 mb-1">වටිනාකම (Val)</label>
                            <input type="number" step="0.01" name="prevDayVal" value={formData.prevDayVal} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-200">
                    <h4 className="text-sm font-bold text-emerald-800 mb-3 text-center">දිනකදී<br/>(Daily)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="dailyQty" value={formData.dailyQty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-emerald-700 mb-1">වටිනාකම (Val)</label>
                            <input type="number" step="0.01" name="dailyVal" value={formData.dailyVal} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <h4 className="text-sm font-bold text-amber-800 mb-3 text-center">එකතුව<br/>(Total)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="totalQty" value={formData.totalQty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-amber-700 mb-1">වටිනාකම (Val)</label>
                            <input type="number" step="0.01" name="totalVal" value={formData.totalVal} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
                    <h4 className="text-sm font-bold text-purple-800 mb-3 text-center">විකුණුම්<br/>(Sales)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-purple-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="salesQty" value={formData.salesQty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-purple-700 mb-1">වටිනාකම (Val)</label>
                            <input type="number" step="0.01" name="salesVal" value={formData.salesVal} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
                        </div>
                    </div>
                </div>

                <div className="bg-rose-50 p-4 rounded-xl border border-rose-200">
                    <h4 className="text-sm font-bold text-rose-800 mb-3 text-center">වෙනස්වීම්<br/>(Variance)</h4>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium text-rose-700 mb-1">ප්‍රමාණය (Qty)</label>
                            <input type="number" step="0.01" name="varianceQty" value={formData.varianceQty} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-rose-700 mb-1">වටිනාකම (Val)</label>
                            <input type="number" step="0.01" name="varianceVal" value={formData.varianceVal} onChange={handleChange} className="w-full px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-sm focus:ring-2 focus:ring-rose-500 outline-none" />
                        </div>
                    </div>
                </div>
                
                <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-200 flex flex-col justify-center">
                    <h4 className="text-sm font-bold text-indigo-800 mb-3 text-center">මුළු එකතුව<br/>(Grand Total)</h4>
                    <div>
                        <input type="number" step="0.01" name="grandTotalVal" value={formData.grandTotalVal} onChange={handleChange} className="w-full px-3 py-2 bg-white border border-indigo-200 rounded-lg text-base font-bold text-indigo-700 focus:ring-2 focus:ring-indigo-500 outline-none text-center" />
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
          <h3 className="font-bold text-slate-800">Report View (වාර්තාව)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead className="text-slate-600 font-medium">
              <tr className="bg-slate-100 border-b border-slate-200">
                <th className="px-3 py-2 border-r border-slate-200 align-bottom" rowSpan="2">Section / Row Name<br/>(අංශය / අයිතමය)</th>
                <th className="px-3 py-2 border-r-2 border-gray-400 align-bottom" rowSpan="2">අදාල අංකය<br/>(Ref No)</th>
                
                <th colSpan="2" className="px-2 py-2 border-r border-slate-200 bg-blue-50 text-blue-800 text-center border-b border-blue-200">මුල් දිනේ ඉදිරිපත්<br/>(Previous Day)</th>
                <th colSpan="2" className="px-2 py-2 border-r border-slate-200 bg-emerald-50 text-emerald-800 text-center border-b border-emerald-200">දිනකදී<br/>(Daily)</th>
                <th colSpan="2" className="px-2 py-2 border-r border-slate-200 bg-amber-50 text-amber-800 text-center border-b border-amber-200">එකතුව<br/>(Total)</th>
                <th colSpan="2" className="px-2 py-2 border-r border-slate-200 bg-purple-50 text-purple-800 text-center border-b border-purple-200">විකුණුම්<br/>(Sales)</th>
                <th colSpan="2" className="px-2 py-2 border-r-2 border-gray-400 bg-rose-50 text-rose-800 text-center border-b border-rose-200">වෙනස්වීම්<br/>(Variance)</th>
                
                <th className="px-3 py-2 align-bottom text-center bg-slate-100 font-bold" rowSpan="2">මුළු එකතුව<br/>(Grand Total)</th>
              </tr>
              <tr className="bg-slate-50 border-b border-slate-200">
                {/* Previous */}
                <th className="px-2 py-2 border-r border-slate-200 text-center text-blue-700">Qty</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center text-blue-700">Val</th>
                {/* Daily */}
                <th className="px-2 py-2 border-r border-slate-200 text-center text-emerald-700">Qty</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center text-emerald-700">Val</th>
                {/* Total */}
                <th className="px-2 py-2 border-r border-slate-200 text-center text-amber-700">Qty</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center text-amber-700">Val</th>
                {/* Sales */}
                <th className="px-2 py-2 border-r border-slate-200 text-center text-purple-700">Qty</th>
                <th className="px-2 py-2 border-r border-slate-200 text-center text-purple-700">Val</th>
                {/* Variance */}
                <th className="px-2 py-2 border-r border-slate-200 text-center text-rose-700">Qty</th>
                <th className="px-2 py-2 border-r-2 border-gray-400 text-center text-rose-700">Val</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {Object.keys(groupedRecords).map(date => (
                <React.Fragment key={date}>
                  {/* Date Header */}
                  <tr className="bg-indigo-100 border-b border-slate-200 text-sm font-bold text-indigo-900">
                    <td colSpan="13" className="px-4 py-3">
                      දිනය (Date): {date}
                    </td>
                  </tr>
                  
                  {/* Map through sections inside this date */}
                  {['ලැබීම්', 'නිකුත් කිරීම', 'අවසාන ශේෂය'].map(section => (
                     groupedRecords[date][section] && (
                        <React.Fragment key={`${date}-${section}`}>
                          {/* Section Header */}
                          <tr className="bg-slate-100/80 border-b border-slate-200 text-xs font-bold text-slate-700">
                            <td colSpan="13" className="px-6 py-2 border-r-2 border-gray-400">
                              {section}
                            </td>
                          </tr>
                          
                          {groupedRecords[date][section].map(record => (
                              <tr key={record.id} className="even:bg-gray-50 hover:bg-slate-100 transition-colors text-slate-800">
                                <td className="px-6 py-2 border-r border-slate-200 font-medium">{record.rowName}</td>
                                <td className="px-2 py-2 border-r-2 border-gray-400 text-center">{record.refNo}</td>
                                
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.prevDayQty?.toFixed(2) || '0.00'}</td>
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.prevDayVal?.toFixed(2) || '0.00'}</td>
                                
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.dailyQty?.toFixed(2) || '0.00'}</td>
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.dailyVal?.toFixed(2) || '0.00'}</td>
                                
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.totalQty?.toFixed(2) || '0.00'}</td>
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.totalVal?.toFixed(2) || '0.00'}</td>
                                
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.salesQty?.toFixed(2) || '0.00'}</td>
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.salesVal?.toFixed(2) || '0.00'}</td>
                                
                                <td className="px-2 py-2 border-r border-slate-200 text-right">{record.varianceQty?.toFixed(2) || '0.00'}</td>
                                <td className="px-2 py-2 border-r-2 border-gray-400 text-right">{record.varianceVal?.toFixed(2) || '0.00'}</td>
                                
                                <td className="px-2 py-2 text-right font-bold bg-slate-100/50">{record.grandTotalVal?.toFixed(2) || '0.00'}</td>
                              </tr>
                          ))}
                        </React.Fragment>
                     )
                  ))}
                </React.Fragment>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan="13" className="px-4 py-8 text-center text-slate-500">
                    No records found. Add a record to see it here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
