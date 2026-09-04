import React from 'react';
import { FileText, Settings, LayoutDashboard, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, currentForm, setCurrentForm }) {
  const btn = (key, label, sub = '') => (
    <button
      onClick={() => { setCurrentForm(key); setIsOpen(false); }}
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left leading-tight ${currentForm === key ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
    >
      <FileText className="w-5 h-5 shrink-0" />
      <div className="flex flex-col">
        {sub && <span className="text-xs text-slate-400">{sub}</span>}
        <span>{label}</span>
      </div>
    </button>
  );

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
        {btn('form1',   'Form 1',   'කුඩා මුදල් පොත')}
        {btn('form2',   'Form 2',   'ගෙවීම් ලේඛනය')}
        {btn('form3',   'Form 3',   'Petty Cash Voucher')}
        {btn('form4',   'Form 4',   'Form 4')}
        {btn('form9c',  'Form 9 C', 'ශාඛා / ගබඩා / දිය සත්ත්ව')}
        {btn('form9d',  'Form 9 D', 'ගොඩනැගිලිවලට ගෙවීම් ලේඛනය')}
        {btn('form9e',  'Form 9 E', 'ශේෂය ගෙවීම් ශේෂ ලේඛනය')}
        {btn('form15c', 'Form 15 C', 'දිනට ප්‍රමාණය — ඉතිරි බඩු සටහන')}
        {btn('form15mMilk', 'Form 15 M', 'කිරි සංග්‍රහය')}
        {btn('form16a', 'Form 16 A', 'බඩු ලේජරය')}
        {btn('form16b', 'Form 16 B', 'බඩු භාර ගැනීමේ සටහන')}
        {btn('form16d', 'Form 16 D', 'දෛනික ගැනුම් සටහන')}
        {btn('form17', 'Form 17', 'නරක්වීම්/මිල වෙනස්වීම්')}
        {btn('form23a', 'Form 23 A', 'ශේෂ ගෙවීමේ ලේඛනය')}
        {btn('form24',  'Form 24',   'ස්ථාවර වත්කම් ලේඛනය')}
        {btn('form25',  'Form 25',   'ශේෂ ගෙවීම් ලේඛනය')}
        {btn('form27',  'Form 27',   'ලේඛන ගෙවීම් ලේඛනය')}
        {btn('form29',  'Form 29',   'ශේෂ ගෙවීම් ලේඛනය')}
        {btn('f29',     'F 29',      'නිළවරයේ ළිය-ලේඛන')}
        {btn('form32a', 'Form 32 A Summary', 'ශේෂ 32 A')}
        {btn('branchProfitLoss', 'Form 33', 'ශාඛා ලාභ-ලා ලේඛනය')}
        {btn('telephoneRegister', 'Form 34', 'දූරකථන ලේඛනය')}
        {btn('schedule2', 'Schedule No. 2', 'No 2 සංශෝධනය')}
        {btn('rentJournal', 'Rent Journal (No. 04)', 'ගෙවල් කුලී ගෙවීම් ජර්නලය')}
        {btn('stationeryJournal', 'Stationery Journal (Schedule No. 04)', 'කාර්යාල දිය ජර්නලය')}
        {btn('annualInsuredJournal', 'Annual Insured Journal (Schedule No. 5)', 'ජාතික රක්ෂිත ජර්නලය')}
        {btn('monthlyDepreciationJournal', 'Monthly Depreciation Journal (Schedule No. 6)', 'සේවාය ඇකිළුම් ජර්නලය')}
        {btn('investmentInterestJournal', 'Investment Interest Journal (Schedule No. 07)', 'ලාභදායී ලේඛන සෘජු ජර්නලය')}
        {btn('rentIncomeJournal', 'Rent Income Journal (Schedule No. 08)', 'ගෙවල් කුලී ආදායම් ලේඛනය')}
        {btn('generalLedgerForm',  'General Ledger', 'සම ලේජරය')}
        {btn('transferRegisterForm', 'Transfer Register', 'පැවරැම් ලේඛනය')}
        {btn('multiColumnLedgerForm', 'Multi-Column Ledger', 'විස්තරාත්මක බෙදාහැරීමේ ජර්නලය')}
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
