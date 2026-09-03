import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import Form1 from './forms/form1';
import Form2 from './forms/form2';
import Form3 from './forms/form3';
import Form9C from './forms/form9c';
import Form23A from './forms/form23a';
import Form24 from './forms/form24';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeForm, setActiveForm] = useState('form1');

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
           {activeForm === 'form2' && <Form2 />}
           {activeForm === 'form3' && <Form3 />}
           {activeForm === 'form9c' && <Form9C />}
           {activeForm === 'form23a' && <Form23A />}
           {activeForm === 'form24' && <Form24 />}
        </div>
      </div>
    </div>
  );
}

export default App;
