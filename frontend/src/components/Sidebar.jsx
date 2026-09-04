import React from 'react';
import { FileText, Settings, LayoutDashboard, X } from 'lucide-react';

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
          onClick={() => { setCurrentForm('form1'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form1' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">සුළු මුදල් පොත</span>
            <span>Form 1</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form2'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form2' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">සුළු මුදල් පොත</span>
            <span>Form 2</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form9c'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form9c' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">මුදලට / ශාඛා / ණය වෙළඳාම</span>
            <span>Form 9 C</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form4'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form4' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Form 4</span>
            <span>Form 4</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form9d'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form9d' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">අත්තිකාරම් දීමේ ලේඛනය</span>
            <span>Form 9 D</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form9e'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form9e' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">ග්‍රාමීය බැංකුව</span>
            <span className="text-sm">Form 9 E</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form9m'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form9m' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">කිරි සැපයුම්</span>
            <span className="text-sm">Form 9 M</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form10'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form10' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">මුදල් කුවිතාන්සිය</span>
            <span className="text-sm">Form 10</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form10b'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form10b' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">තැන්පතු කුවිතාන්සිය</span>
            <span className="text-sm">Form 10 B</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form11'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form11' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">මුදල් සහතිකය</span>
            <span className="text-sm">Form 11</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form11a'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form11a' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">දෛනික මුදල් එකතු කිරීමේ සටහන</span>
            <span className="text-sm">Form 11 A</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form12'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form12' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">බැංකුවට මුදල් යෙනකාමේ විස්තරය</span>
            <span className="text-sm">Form 12</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form14'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form14' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">මුදලට/ණයට වෙළදාම් පත (තොග)</span>
            <span className="text-sm">Form 14</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form14a'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form14a' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">සැකසුම් පත්‍රය - වෙළඳාම</span>
            <span className="text-sm">Form 14 A</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form14b'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form14b' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">වෙළඳාම් පත (පාරිභෝගික අංශය)</span>
            <span className="text-sm">Form 14 B</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form14c'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form14c' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">වෙළඳාම් පත (සිල්ලර ශාඛා වලට)</span>
            <span className="text-sm">Form 14 C</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form14d'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form14d' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">ගබඩා කුවිතාන්සිය</span>
            <span className="text-sm">Form 14 D</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form14e'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form14e' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">ගෝනි පිළිබඳ විස්තරය</span>
            <span className="text-sm">Form 14 E</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form15'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form15' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">සුළු මුදල් සහතිකය / ඉතිරි බඩු සටහන</span>
            <span className="text-sm">Form 15</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form15a'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form15a' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">ගබඩා කුවිතාන්සි සසඳුම් පත</span>
            <span className="text-sm">Form 15 A</span>
          </div>
        </button>
        <button onClick={() => { setCurrentForm('form15b'); setIsOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${currentForm === 'form15b' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500">ඉතිරි ගෝනි පිළිබඳ සහතිකය</span>
            <span className="text-sm">Form 15 B</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form3'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form3' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Petty Cash Voucher</span>
            <span>Form 3</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form23a'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form23a' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">බඩු ගැනුම්කරුගේ ඉල්ලීම</span>
            <span>Form 23 A</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('schedule2'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'schedule2' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">No 2 උපලේඛනය</span>
            <span>Schedule No. 2</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('rentJournal'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'rentJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">ගෙවල් කුලී ජර්නලය</span>
            <span>Rent Journal (No. 04)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('stationeryJournal'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'stationeryJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">ලිපි ද්‍රව්‍ය වැය ජර්නලය</span>
            <span>Stationery Journal (Schedule No. 04)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('annualInsuredJournal'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'annualInsuredJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">වාර්ෂික රක්ෂණ ජර්නලය</span>
            <span>Annual Insured Journal (Schedule No. 5)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('monthlyDepreciationJournal'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'monthlyDepreciationJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">මාසික ක්ෂයවීම් ජර්නලය</span>
            <span>Monthly Depreciation Journal (Schedule No. 6)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('investmentInterestJournal'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'investmentInterestJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">තැන්පත් පොළි ආදායම් ගණනය කිරීමේ ජර්නලය</span>
            <span>Investment Interest Journal (Schedule No. 07)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('rentIncomeJournal'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'rentIncomeJournal' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">ගෙවල් කුලී ආදායම් ගණනය කිරීමේ ජර්නලය</span>
            <span>Rent Income Journal (Schedule No. 08)</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('generalLedgerForm'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'generalLedgerForm' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">මහ ලෙජරය</span>
            <span>General Ledger</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('transferRegisterForm'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'transferRegisterForm' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">පැවරැම් පොත</span>
            <span>Transfer Register</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('multiColumnLedgerForm'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'multiColumnLedgerForm' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">විස්තරාත්මක බෙදාහැරීමේ ජර්නලය</span>
            <span>Multi-Column Ledger</span>
          </div>
        </button>
        <button 
          onClick={() => { setCurrentForm('form24'); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === 'form24' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5 shrink-0" />
          <div className="flex flex-col">
            <span className="text-xs text-slate-400">Form 24</span>
            <span>Form 24</span>
          </div>
        </button>
      </div>
      
      <div className="p-4 border-t border-slate-800">
        <a href="#" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </a>
      </div>
    </div>
  );
}
