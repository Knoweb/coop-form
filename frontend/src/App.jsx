import React, { useState } from 'react';
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
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentForm, setCurrentForm] = useState('form1');

  const renderForm = () => {
    switch (currentForm) {
      case 'form1':
        return <Form1 />;
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
