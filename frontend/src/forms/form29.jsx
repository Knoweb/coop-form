import React, { useState } from 'react';
import { PlusCircle, FileText, Calendar, LayoutList, Building2, Save, Clock, Hash, Truck, User } from 'lucide-react';

const INITIAL_ITEM_STATE = {
  tripNo: '',
  goodsDetails: '',
  qty: '',
  depTime: '',
  depPlace: '',
  authOfficerSigItem: '',
  arrTime: '',
  arrPlace: '',
  receivingOfficerSig: '',
  drivenForWhom: '',
  amount: ''
};

export default function Form29() {
  const [currentItems, setCurrentItems] = useState([]);
  const [itemData, setItemData] = useState(INITIAL_ITEM_STATE);

  // Global States
  const [vehicleNo, setVehicleNo] = useState('');
  const [date, setDate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [assistantName, setAssistantName] = useState('');
  const [workedHoursDaily, setWorkedHoursDaily] = useState('');
  const [workedHoursWeekly, setWorkedHoursWeekly] = useState('');

  const [signature1, setSignature1] = useState('');
  const [signature2, setSignature2] = useState('');
  const [otHours1, setOtHours1] = useState('');
  const [otHours2, setOtHours2] = useState('');

  const [licenseNo, setLicenseNo] = useState('');
  const [meterStart, setMeterStart] = useState('');
  const [meterEnd, setMeterEnd] = useState('');
  const [drivenMiles, setDrivenMiles] = useState('');

  const [authOfficerSig, setAuthOfficerSig] = useState('');
  const [workStartTime, setWorkStartTime] = useState('');
  const [workEndTime, setWorkEndTime] = useState('');
  const [obtainedFuel, setObtainedFuel] = useState('');
  const [remainingFuel, setRemainingFuel] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemData.goodsDetails) return;

    setCurrentItems(prev => [...prev, {
      ...itemData,
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
      vehicleNo,
      date,
      driverName,
      assistantName,
      workedHoursDaily,
      workedHoursWeekly,
      signature1,
      signature2,
      otHours1,
      otHours2,
      licenseNo,
      meterStart,
      meterEnd,
      drivenMiles,
      authOfficerSig,
      workStartTime,
      workEndTime,
      obtainedFuel,
      remainingFuel,

      tripNo: item.tripNo,
      goodsDetails: item.goodsDetails,
      qtyTons: item.qty,
      depTime: item.depTime,
      depPlace: item.depPlace,
      authOfficerSigItem: item.authOfficerSigItem,
      arrTime: item.arrTime,
      arrPlace: item.arrPlace,
      receivingOfficerSig: item.receivingOfficerSig,
      drivenForWhom: item.drivenForWhom,
      amount: item.amount ? parseFloat(item.amount) : 0
    }));

    try {
      const response = await fetch('http://localhost:8080/api/form29-records/bulk', {
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

        <header className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-200">
            <LayoutList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Form 29 (රථ වාහන වැඩ සටහන)</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Vehicle Work Schedule</p>
          </div>
        </header>

        {/* Global Details Form */}
        <div className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden mb-8">
          <div className="p-6 md:p-8 bg-slate-50 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center"><FileText className="w-5 h-5 mr-2 text-indigo-500" /> Form Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   වාහන අංකය (Vehicle No)
                </label>
                <input type="text" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   දිනය (Date)
                </label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   රියදුරුගේ නම (Driver Name)
                </label>
                <input type="text" value={driverName} onChange={e => setDriverName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   සහායකයාගේ නම (Assistant Name)
                </label>
                <input type="text" value={assistantName} onChange={e => setAssistantName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   වැඩ කළ පැය ගණන - රියදුරු
                </label>
                <input type="text" value={workedHoursDaily} onChange={e => setWorkedHoursDaily(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   වැඩ කළ පැය ගණන - සේවක
                </label>
                <input type="text" value={workedHoursWeekly} onChange={e => setWorkedHoursWeekly(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>
              
              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   වැඩිපුර පැය ගණන (OT 1)
                </label>
                <input type="text" value={otHours1} onChange={e => setOtHours1(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   වැඩිපුර පැය ගණන (OT 2)
                </label>
                <input type="text" value={otHours2} onChange={e => setOtHours2(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   බලපත්‍ර අංකය (License No)
                </label>
                <input type="text" value={licenseNo} onChange={e => setLicenseNo(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   මීටරය පටන් ගැනීම (Meter Start)
                </label>
                <input type="text" value={meterStart} onChange={e => setMeterStart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   මීටරය අවසානය (Meter End)
                </label>
                <input type="text" value={meterEnd} onChange={e => setMeterEnd(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   ධාව: සැ: ගණන (Driven Miles)
                </label>
                <input type="text" value={drivenMiles} onChange={e => setDrivenMiles(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   වැඩ ආරම්භ කළ වේලාව
                </label>
                <input type="time" value={workStartTime} onChange={e => setWorkStartTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   වැඩ අවසන් කළ වේලාව
                </label>
                <input type="time" value={workEndTime} onChange={e => setWorkEndTime(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   ලබාගත් පැට්‍රල්/ඩීසල්
                </label>
                <input type="text" value={obtainedFuel} onChange={e => setObtainedFuel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>

              <div className="space-y-2 lg:col-span-1">
                <label className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                   ඉතිරි පැට්‍රල්/ඩීසල්
                </label>
                <input type="text" value={remainingFuel} onChange={e => setRemainingFuel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 transition-colors" />
              </div>
            </div>
          </div>

          {/* Item Entry */}
          <div className="p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center"><PlusCircle className="w-5 h-5 mr-2 text-indigo-500" /> Add Item</h3>
            <form onSubmit={handleAddItem} className="space-y-6">
              
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 items-end">
                
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">ගමන් වාරය</label>
                  <input type="text" name="tripNo" value={itemData.tripNo} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="space-y-2 lg:col-span-2">
                  <label className="text-xs font-semibold text-slate-600">බඩුවල විස්තර *</label>
                  <input required type="text" name="goodsDetails" value={itemData.goodsDetails} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">ප්‍රමාණය</label>
                  <input type="text" name="qty" value={itemData.qty} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">පිටත්වූ වේලාව</label>
                  <input type="time" name="depTime" value={itemData.depTime} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">පිටත්වූ ස්ථානය</label>
                  <input type="text" name="depPlace" value={itemData.depPlace} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">පැමිණි වේලාව</label>
                  <input type="time" name="arrTime" value={itemData.arrTime} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">පැමිණි ස්ථානය</label>
                  <input type="text" name="arrPlace" value={itemData.arrPlace} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>

                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">කා වෙනුවෙන්ද</label>
                  <input type="text" name="drivenForWhom" value={itemData.drivenForWhom} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div className="space-y-2 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-600">මුදල රු.</label>
                  <input type="number" step="0.01" name="amount" value={itemData.amount} onChange={handleItemChange}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 text-indigo-900 font-bold" />
                </div>

                <div className="lg:col-span-1">
                  <button type="submit" className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2.5 rounded-lg font-semibold transition-all">
                    <PlusCircle className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Printable Preview */}
        <div className="bg-white rounded-none md:rounded-xl shadow-2xl border border-slate-200 overflow-hidden relative">
          <div className="p-8 md:p-12 print:p-0">
            
            <div className="relative mb-6 text-center pt-6">
              <div className="absolute right-0 top-0 text-sm font-semibold text-slate-800">Form 29</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 font-sinhala">රථ වාහන වැඩ සටහන</h2>
            </div>

            {/* Print Header */}
            <div className="text-xs md:text-sm font-semibold text-slate-800 mb-4 flex items-end">
               වාහන අංකය: <span className="border-b border-slate-400 border-dotted flex-1 ml-2 min-w-[200px]">{vehicleNo}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs font-semibold text-slate-800 mb-6">
               <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 items-end">
                  <span className="whitespace-nowrap">දිනය</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{date}</span>
                  
                  <span className="whitespace-nowrap">රියදුරුගේ නම</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{driverName}</span>
                  
                  <span className="whitespace-nowrap">සහායකයාගේ නම</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{assistantName}</span>
                  
                  <span className="whitespace-nowrap">වැඩ කළ පැය ගණන (රියදුරු)</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{workedHoursDaily}</span>
                  
                  <span className="whitespace-nowrap">වැඩ කළ පැය ගණන (සේවක)</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{workedHoursWeekly}</span>
               </div>

               <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 items-end">
                  <span className="whitespace-nowrap">අත්සන</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{signature1}</span>
                  
                  <span className="whitespace-nowrap">අත්සන</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{signature2}</span>
                  
                  <span className="whitespace-nowrap">වැඩිපුර පැය ගණන</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{otHours1}</span>
                  
                  <span className="whitespace-nowrap">වැඩිපුර පැය ගණන</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{otHours2}</span>
               </div>

               <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 items-end">
                  <span className="whitespace-nowrap">බලපත්‍ර අංකය</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{licenseNo}</span>
                  
                  <span className="whitespace-nowrap">මීටරය පටන් ගැනීම</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{meterStart}</span>
                  
                  <span className="whitespace-nowrap">මීටරය අවසානය</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{meterEnd}</span>
                  
                  <span className="whitespace-nowrap">ධාව: සැ: ගණන</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{drivenMiles}</span>
               </div>

               <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-4 items-end">
                  <span className="whitespace-nowrap">බලය දුන් නිල: අත්සන</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{authOfficerSig}</span>
                  
                  <span className="whitespace-nowrap">වැඩ ආරම්භ කළ වේලාව</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{workStartTime}</span>
                  
                  <span className="whitespace-nowrap">වැඩ අවසන් කළ වේලාව</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{workEndTime}</span>
                  
                  <span className="whitespace-nowrap">ලබාගත් පැට්‍රල්/ඩීසල්</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{obtainedFuel}</span>
                  
                  <span className="whitespace-nowrap">ඉතිරි පැට්‍රල්/ඩීසල්</span>
                  <span className="border-b border-dotted border-slate-400 pb-1 px-1 text-blue-700 font-bold">{remainingFuel}</span>
               </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto w-full mb-12 mt-8">
              <table className="w-full text-left border-collapse border border-slate-800 print:border-black min-w-[1000px]">
                <thead>
                  <tr>
                    <th rowSpan={2} className="px-1 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>ගමන් වාරය</th>
                    <th rowSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle w-[15%]">බඩුවල විස්තර</th>
                    <th rowSpan={2} className="px-1 py-1 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle">ප්‍රමාණය</th>
                    <th rowSpan={2} className="px-1 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>පිටත්වූ වේලාව</th>
                    <th rowSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle">පිටත්වූ<br/>ස්ථානය</th>
                    <th rowSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle">අවසර දෙන<br/>නිලධාරියාගේ<br/>අත්සන</th>
                    <th rowSpan={2} className="px-1 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>පැමිණි වේලාව</th>
                    <th rowSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle">පැමිණි<br/>ස්ථානය</th>
                    <th rowSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle">බඩු භාරගත්<br/>නිලධාරී<br/>තැනගේ<br/>අත්සන</th>
                    <th rowSpan={2} className="px-2 py-2 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>ධාවනය කළේ කා වෙනුවෙන්ද</th>
                    <th colSpan={2} className="px-2 py-1 text-[10px] font-bold text-slate-800 border border-slate-800 print:border-black text-center align-middle">මුදල</th>
                  </tr>
                  <tr>
                    <th className="px-1 py-1 text-[10px] font-semibold border border-slate-800 print:border-black text-center w-[5%]">රු.</th>
                    <th className="px-1 py-1 text-[10px] font-semibold border border-slate-800 print:border-black text-center w-[5%]">ශ.</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length === 0 ? (
                    <tr>
                      <td colSpan="14" className="px-2 py-12 text-center text-slate-400 border border-slate-800 print:border-black border-dashed">
                        <p className="text-xs">No items added to the form yet.</p>
                      </td>
                    </tr>
                  ) : (
                    currentItems.map((item) => (
                      <tr key={item.id} className="group relative">
                        <td className="px-1 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.tripNo}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black font-medium">{item.goodsDetails}</td>
                        <td className="px-1 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.qty}</td>
                        
                        <td className="px-1 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.depTime}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.depPlace}</td>
                        
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.authOfficerSigItem}</td>
                        
                        <td className="px-1 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.arrTime}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.arrPlace}</td>
                        
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.receivingOfficerSig}</td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-center">{item.drivenForWhom}</td>
                        
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right font-semibold">
                           {item.amount ? Math.floor(item.amount) : ''}
                        </td>
                        <td className="px-2 py-3 text-xs text-slate-800 border border-slate-800 print:border-black text-right font-semibold">
                           {item.amount ? Math.round((item.amount - Math.floor(item.amount)) * 100).toString().padStart(2, '0') : ''}
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

          </div>
        </div>

        {/* Save Action */}
        <div className="flex justify-end pb-8 mt-4">
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
