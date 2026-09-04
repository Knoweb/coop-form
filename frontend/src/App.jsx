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
import Form2 from './forms/form2';
import Form3 from './forms/form3';
import Form4 from './forms/form4';
import Form9C from './forms/form9c';
import Form9D from './forms/form9d';
import Form9E from './forms/form9e';
import Form23A from './forms/form23a';
import Form24 from './forms/form24';
import Form25 from './forms/form25';
import Form27 from './forms/form27';
import Form29 from './forms/form29';
import F29 from './forms/f29';
import BranchProfitLossForm from './forms/BranchProfitLossForm';
import TelephoneRegisterForm from './forms/TelephoneRegisterForm';
import Form32ASummary from './forms/Form32ASummary';
import MilkCollectionSummary from './forms/MilkCollectionSummary';
import Form16AStoreLedger from './forms/Form16AStoreLedger';
import Form16BGoodsReceipt from './forms/Form16BGoodsReceipt';
import Form16DDailyPurchases from './forms/Form16DDailyPurchases';
import Form17SpoilagePriceChange from './forms/Form17SpoilagePriceChange';
import StoreTransferForm from './forms/StoreTransferForm';
import Form19GoodsReturn from './forms/Form19GoodsReturn';
import Form15C from './forms/Form15C';
import Form30 from './forms/form30';
import Form31 from './forms/form31';
import Sidebar from './components/Sidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentForm, setCurrentForm] = useState('form1');

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
      case 'form23a':
        return <Form23A />;
      case 'form24':
        return <Form24 />;
      case 'form15c':
        return <Form15C />;
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
      case 'form25':
        return <Form25 />;
      case 'form27':
        return <Form27 />;
      case 'form29':
        return <Form29 />;
      case 'f29':
        return <F29 />;
      case 'branchProfitLoss':
        return <BranchProfitLossForm />;
      case 'telephoneRegister':
        return <TelephoneRegisterForm />;
      case 'form32a':
        return <Form32ASummary />;
      case 'form15mMilk':
        return <MilkCollectionSummary />;
      case 'form16a':
        return <Form16AStoreLedger />;
      case 'form16b':
        return <Form16BGoodsReceipt />;
      case 'form16d':
        return <Form16DDailyPurchases />;
      case 'form17':
        return <Form17SpoilagePriceChange />;
      case 'form30':
        return <Form30 />;
      case 'form31':
        return <Form31 />;
      case 'storeTransfer':
        return <StoreTransferForm />;
      case 'form19':
        return <Form19GoodsReturn />;
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
      case 'form23a':
        return 'Form 23 A';
      case 'form24':
        return 'Form 24';
      case 'form15c':
        return 'ශාඛා ගිණුම් ලේඛනය — 15 C';
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
      case 'form25':
        return 'Form 25';
      case 'form27':
        return 'Form 27';
      case 'form29':
        return 'Form 29';
      case 'f29':
        return 'F 29';
      case 'branchProfitLoss':
        return 'Branch Profit & Loss';
      case 'telephoneRegister':
        return 'Telephone Register';
      case 'form32a':
        return 'Form 32 A Summary';
      case 'form15mMilk':
        return 'Milk Center Daily Summary';
      case 'form16a':
        return 'Stock Ledger (Form 16 A)';
      case 'form16b':
        return 'Goods Receipt (Form 16 B)';
      case 'form16d':
        return 'Daily Purchases (Form 16 D)';
      case 'form17':
        return 'Spoilages & Price Changes (Form 17)';
      case 'form30':
        return 'F 30';
      case 'form31':
        return 'Form 31';
      case 'storeTransfer':
        return 'Store Transfer Form';
      case 'form19':
        return 'Goods Return/Dispatch (Form 19)';
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
