import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import Form1 from './forms/form1';
import Schedule2 from './forms/Schedule2';
import RentJournal from './forms/RentJournal';
import StationeryJournal from './forms/StationeryJournal';
import AnnualInsuredJournal from './forms/AnnualInsuredJournal';
import MonthlyDepreciationJournal from './forms/MonthlyDepreciationJournal';
import InvestmentInterestJournal from './forms/InvestmentInterestJournal';
import RentIncomeJournal from './forms/RentIncomeJournal';
import GeneralLedgerForm from './forms/GeneralLedgerForm';
import TransferRegisterForm from './forms/TransferRegisterForm';
import MultiColumnLedgerForm from './forms/MultiColumnLedgerForm';
import Form2 from './forms/form2';
import Form3 from './forms/form3';
import Form4 from './forms/form4';
import Form9C from './forms/form9c';
import Form9D from './forms/form9d';
import Form9E from './forms/form9e';
import Form9M from './forms/form9m';
import Form10 from './forms/form10';
import Form10B from './forms/form10b';
import Form11 from './forms/form11';
import Form11A from './forms/form11a';
import Form12 from './forms/form12';
import Form14 from './forms/form14';
import Form14A from './forms/form14a';
import Form14B from './forms/form14b';
import Form14C from './forms/form14c';
import Form14D from './forms/form14d';
import Form14E from './forms/form14e';
import Form15 from './forms/form15';
import Form15A from './forms/form15a';
import Form15B from './forms/form15b';
import Form23A from './forms/form23a';
import Form24 from './forms/form24';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentForm, setCurrentForm] = useState(() => {
    return localStorage.getItem('currentForm') || 'form1';
  });

  useEffect(() => {
    localStorage.setItem('currentForm', currentForm);
  }, [currentForm]);

  const renderForm = () => {
    switch (currentForm) {
      case 'form1':
        return <Form1 />;
      case 'form2':
        return <Form2 />;
      case 'form3':
        return <Form3 />;
      case 'form9c':
        return <Form9C />;
      case 'form9d':
        return <Form9D />;
      case 'form9e':
        return <Form9E />;
      case 'form9m':
        return <Form9M />;
      case 'form10':
        return <Form10 />;
      case 'form10b':
        return <Form10B />;
      case 'form11':
        return <Form11 />;
      case 'form11a':
        return <Form11A />;
      case 'form12':
        return <Form12 />;
      case 'form14':
        return <Form14 />;
      case 'form14a':
        return <Form14A />;
      case 'form14b':
        return <Form14B />;
      case 'form14c':
        return <Form14C />;
      case 'form14d':
        return <Form14D />;
      case 'form14e':
        return <Form14E />;
      case 'form15':
        return <Form15 />;
      case 'form15a':
        return <Form15A />;
      case 'form15b':
        return <Form15B />;
      case 'form23a':
        return <Form23A />;
      case 'form24':
        return <Form24 />;
      case 'schedule2':
        return <Schedule2 />;
      case 'rentJournal':
        return <RentJournal />;
      case 'stationeryJournal':
        return <StationeryJournal />;
      case 'annualInsuredJournal':
        return <AnnualInsuredJournal />;
      case 'monthlyDepreciationJournal':
        return <MonthlyDepreciationJournal />;
      case 'investmentInterestJournal':
        return <InvestmentInterestJournal />;
      case 'rentIncomeJournal':
        return <RentIncomeJournal />;
      case 'generalLedgerForm':
        return <GeneralLedgerForm />;
      case 'transferRegisterForm':
        return <TransferRegisterForm />;
      case 'multiColumnLedgerForm':
        return <MultiColumnLedgerForm />;
      default:
        return <Form1 />;
    }
  };

  const getFormTitle = () => {
    switch (currentForm) {
      case 'form1':
        return 'Petty Cash System';
      case 'form2':
        return 'Form 2';
      case 'form3':
        return 'Form 3';
      case 'form9c':
        return 'Form 9 C';
      case 'form9d':
        return 'Form 9 D';
      case 'form9e':
        return 'Form 9 E';
      case 'form9m':
        return 'Form 9 M';
      case 'form10':
        return 'Form 10';
      case 'form10b':
        return 'Form 10 B';
      case 'form11':
        return 'Form 11';
      case 'form11a':
        return 'Form 11 A';
      case 'form12':
        return 'Form 12';
      case 'form14':
        return 'Form 14';
      case 'form14a':
        return 'Form 14 A';
      case 'form14b':
        return 'Form 14 B';
      case 'form14c':
        return 'Form 14 C';
      case 'form14d':
        return 'Form 14 D';
      case 'form14e':
        return 'Form 14 E';
      case 'form15':
        return 'Form 15';
      case 'form15a':
        return 'Form 15 A';
      case 'form15b':
        return 'Form 15 B';
      case 'form23a':
        return 'Form 23 A';
      case 'form24':
        return 'Form 24';
      case 'schedule2':
        return 'Schedule No. 2';
      case 'rentJournal':
        return 'Rent Journal';
      case 'stationeryJournal':
        return 'Stationery Journal';
      case 'annualInsuredJournal':
        return 'Annual Insured Journal';
      case 'monthlyDepreciationJournal':
        return 'Monthly Depreciation Journal';
      case 'investmentInterestJournal':
        return 'Investment Interest Journal';
      case 'rentIncomeJournal':
        return 'Rent Income Journal';
      case 'generalLedgerForm':
        return 'General Ledger';
      case 'transferRegisterForm':
        return 'Transfer Register';
      case 'multiColumnLedgerForm':
        return 'Multi-Column Ledger';
      default:
        return 'COOP Forms';
    }
  };

  return (
    <div className="flex bg-slate-50 min-h-screen">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} currentForm={currentForm} setCurrentForm={setCurrentForm} />
      
      <div className={`flex-1 transition-all duration-300 overflow-x-hidden ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-4 flex items-center bg-white shadow-sm border-b border-slate-200 sticky top-0 z-40">
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-slate-700" />
           </button>
           <h2 className="ml-4 font-bold text-slate-800">{getFormTitle()}</h2>
        </div>
        <div className="p-4 md:p-8 overflow-x-auto">
           {renderForm()}

        </div>
      </div>
    </div>
  );
}

export default App;
