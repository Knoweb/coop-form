import React from 'react';
import { FileText, Settings, LayoutDashboard, X, Users } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, currentForm, setCurrentForm }) {
  return (
    <div className={`bg-slate-900 text-slate-300 h-screen fixed left-0 top-0 flex flex-col shadow-2xl z-50 transition-all duration-300 ${isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'}`}>
      <div className="p-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <LayoutDashboard className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">COOP Forms</h1>
        </div>
        <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-slate-800 rounded-lg md:hidden">
           <X className="w-5 h-5 text-slate-400" />
        </button>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
        <button 
          onClick={() => { setCurrentForm('form1'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form1' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">සුළු මුදල් පොත</span>
            <span>Form 1</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form2'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form2' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">සුළු මුදල් පොත</span>
            <span>Form 2</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form9c'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form9c' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">මුදලට / ශාඛා / ණය වෙළඳාම</span>
            <span>Form 9 C</span>
          </div>
        </button>
        <button 
            onClick={() => { setCurrentForm('form3'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form3' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">සුළු මුදල් වවුචරය</span>
              <span>Form 3</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form4'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form4' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">බැංකුවෙන් ආපසු එවූ චෙක්පත්</span>
              <span>Form 4</span>
            </div>

        </button>
          <button 
            onClick={() => { setCurrentForm('form5'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form5' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">වවුචරය</span>
              <span>Form 5</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form5a'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form5a' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">විකුණුම් විස්තරය</span>
              <span>Form 5A</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form5b'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form5b' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">අනුමත කළ මාරුකිරීම්</span>
              <span>Form 5B</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form5m'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form5m' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">කිරි භාරගැනීම</span>
              <span>Form 5M</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form6'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form6' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">චෙක්පත් නිකුත් කිරීමේ සටහන</span>
              <span>Form 6</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form7'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form7' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">මුදල් ලේඛනය</span>
              <span>Form 7</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form7a'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form7a' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">ප්‍රාදේශික ලැබීම් හා ගෙවීම්</span>
              <span>Form 7A</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form8'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form8' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">ගෙවීම් මුදල් පොත</span>
              <span>Form 8</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form9a'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form9a' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">ගබඩා වාර්තාව</span>
              <span>Form 9A</span>
            </div>
          </button>
          <button 
            onClick={() => { setCurrentForm('form9b'); setIsOpen(false); }}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form9b' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
            <FileText className="w-5 h-5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-xs text-slate-400">සිල්ලර ගබඩා වාර්තාව</span>
              <span>Form 9B</span>
            </div>
          </button>
        <button 
          onClick={() => { setCurrentForm('form23a'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form23a' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">බඩු ගැනුම්කරුගේ ඉල්ලීම</span>
            <span>Form 23 A</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('schedule2'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'schedule2' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">No 2 උපලේඛනය</span>
            <span>Schedule No. 2</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('rentJournal'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'rentJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">ගෙවල් කුලී ජර්නලය</span>
            <span>Rent Journal (No. 04)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('stationeryJournal'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'stationeryJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">ලිපි ද්‍රව්‍ය වැය ජර්නලය</span>
            <span>Stationery Journal (Schedule No. 04)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('annualInsuredJournal'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'annualInsuredJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">වාර්ෂික රක්ෂණ ජර්නලය</span>
            <span>Annual Insured Journal (Schedule No. 5)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('monthlyDepreciationJournal'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'monthlyDepreciationJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">මාසික ක්ෂයවීම් ජර්නලය</span>
            <span>Monthly Depreciation Journal (Schedule No. 6)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('investmentInterestJournal'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'investmentInterestJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">තැන්පත් පොළි ආදායම් ගණනය කිරීමේ ජර්නලය</span>
            <span>Investment Interest Journal (Schedule No. 07)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('rentIncomeJournal'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'rentIncomeJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">ගෙවල් කුලී ආදායම් ගණනය කිරීමේ ජර්නලය</span>
            <span>Rent Income Journal (Schedule No. 08)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('generalLedgerForm'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'generalLedgerForm' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">මහ ලෙජරය</span>
            <span>General Ledger</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('transferRegisterForm'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'transferRegisterForm' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">පැවරැම් පොත</span>
            <span>Transfer Register</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('multiColumnLedgerForm'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'multiColumnLedgerForm' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">විස්තරාත්මක බෙදාහැරීමේ ජර්නලය</span>
            <span>Multi-Column Ledger</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form24'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form24' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Form 24</span>
            <span>Form 24</span>
          </div>
        </button>
      </div>
      
      <div className="p-4 border-t border-slate-800">
        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
          <Settings className="w-5 h-5 shrink-0" />
          <span>Settings</span>
        </button>
      </div>
    </div>
  );
}
