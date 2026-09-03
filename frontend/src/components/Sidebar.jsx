import React from 'react';
import { FileText, Settings, LayoutDashboard, X } from 'lucide-react';

export default function Sidebar({ isOpen, setIsOpen, activeForm, setActiveForm }) {
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
          onClick={() => { setActiveForm('form1'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeForm === 'form1' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <span>Form 1</span>
        </button>
        <button 
          onClick={() => { setActiveForm('form9c'); setIsOpen(false); }}
          className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeForm === 'form9c' ? 'bg-indigo-600/10 text-indigo-400 font-semibold' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
          <FileText className="w-5 h-5" />
          <span>Form 9 C</span>
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
