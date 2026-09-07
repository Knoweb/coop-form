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
import Form5 from './forms/form5';
import Form5A from './forms/form5a';
import Form5B from './forms/form5b';
import Form5M from './forms/form5m';
import Form6 from './forms/form6';
import Form7 from './forms/form7';
import Form7A from './forms/form7a';
import Form8 from './forms/form8';
import Form9A from './forms/form9a';
import Form9B from './forms/form9b';
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
import Form20WholesaleAnalysis from './forms/Form20WholesaleAnalysis';
import Form21BinCard from './forms/Form21BinCard';
import Form21BBranchRegister from './forms/Form21BBranchRegister';
import Form21AStationeryControl from './forms/Form21AStationeryControl';
import FormF21CDailyStockReport from './forms/FormF21CDailyStockReport';
import Form22StockTaking from './forms/Form22StockTaking';
import Form23MonthlyFinancialStock from './forms/Form23MonthlyFinancialStock';
import Form15C from './forms/Form15C';
import Form30 from './forms/form30';
import Form31 from './forms/form31';
import Form32 from './forms/form32';
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
      case 'form4':
        return <Form4 />;
      case 'form5': return <Form5 />;
      case 'form5a': return <Form5A />;
      case 'form5b': return <Form5B />;
      case 'form5m': return <Form5M />;
      case 'form6': return <Form6 />;
      case 'form7': return <Form7 />;
      case 'form7a': return <Form7A />;
      case 'form8': return <Form8 />;
      case 'form9a': return <Form9A />;
      case 'form9b': return <Form9B />;

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
      case 'form32':
        return <Form32 />;
      case 'storeTransfer':
        return <StoreTransferForm />;
      case 'form19':
        return <Form19GoodsReturn />;
      case 'form20':
        return <Form20WholesaleAnalysis />;
      case 'form21':
        return <Form21BinCard />;
      case 'form21b':
        return <Form21BBranchRegister />;
      case 'form21a':
        return <Form21AStationeryControl />;
      case 'form21c':
        return <FormF21CDailyStockReport />;
      case 'form22':
        return <Form22StockTaking />;
      case 'form23':
        return <Form23MonthlyFinancialStock />;
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
      case 'form4':
        return 'Form 4';
      case 'form5': return 'Form 5';
      case 'form5a': return 'Form 5A';
      case 'form5b': return 'Form 5B';
      case 'form5m': return 'Form 5M';
      case 'form6': return 'Form 6';
      case 'form7': return 'Form 7';
      case 'form7a': return 'Form 7A';
      case 'form8': return 'Form 8';
      case 'form9a': return 'Form 9A';
      case 'form9b': return 'Form 9B';

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
      case 'form15c':
        return 'Form 15 C';
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
      case 'form32':
        return 'Form 32';
      case 'storeTransfer':
        return 'Store Transfer Form';
      case 'form19':
        return 'Goods Return/Dispatch (Form 19)';
      case 'form20':
        return 'Wholesale Goods Analysis (Form 20)';
      case 'form21':
        return 'Bin Card / Stock Ledger (Form F-21)';
      case 'form21b':
        return 'Regional / Branch Register (Form 21 B)';
      case 'form21a':
        return 'Stationery Control (Form 21 A)';
      case 'form21c':
        return 'Daily Forward Stock Report (Form F 21 C)';
      case 'form22':
        return 'Stock Taking / Inventory Count List (Form 22)';
      case 'form23':
        return 'Monthly Financial Stock Valuation List (Form 23)';
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
