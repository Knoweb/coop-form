import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Form1 from './forms/form1';
import Form9C from './forms/form9c';
import Form9D from './forms/form9d';
import Form9E from './forms/form9e';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeForm, setActiveForm] = useState(() => {
    return localStorage.getItem('activeForm') || 'form1';
  });

  useEffect(() => {
    localStorage.setItem('activeForm', activeForm);
  }, [activeForm]);

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} activeForm={activeForm} setActiveForm={setActiveForm} />
      
      <div className={`flex-1 transition-all duration-300 overflow-x-hidden ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4 flex items-center bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-slate-700" />
           </button>
           <h2 className="ml-4 font-bold text-slate-800">Petty Cash System</h2>
        </div>
        <div className="p-4 md:p-8">
           {activeForm === 'form1' && <Form1 />}
           {activeForm === 'form9c' && <Form9C />}
           {activeForm === 'form9d' && <Form9D />}
           {activeForm === 'form9e' && <Form9E />}
        </div>
      </div>
    </div>
  );
}

export default App;
