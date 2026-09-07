const fs = require('fs');

let form1 = fs.readFileSync('frontend/src/forms/form1.jsx', 'utf8');

const mockDataString = `[
    {
      id: 1,
      date: '2026-09-01',
      name: 'John Doe',
      description: 'Travel Expenses',
      voucherNo: 'V-101',
      amountReceived: 5000,
      amountPaid: 1500,
      ledgerFolio: 'LF-01',
      transport: 1500,
      stationery: 0,
      postage: 0,
      meals: 0,
      other: 0,
      analysis: { Transport: 1500, Stationery: '', Postage: '', Meals: '', Other: '' }
    },
    {
      id: 2,
      date: '2026-09-02',
      name: 'Jane Smith',
      description: 'Office Supplies',
      voucherNo: 'V-102',
      amountReceived: 0,
      amountPaid: 500,
      ledgerFolio: 'LF-02',
      transport: 0,
      stationery: 500,
      postage: 0,
      meals: 0,
      other: 0,
      analysis: { Transport: '', Stationery: 500, Postage: '', Meals: '', Other: '' }
    },
    {
      id: 3,
      date: '2026-09-03',
      name: 'Post Office',
      description: 'Stamps',
      voucherNo: 'V-103',
      amountReceived: 0,
      amountPaid: 200,
      ledgerFolio: 'LF-03',
      transport: 0,
      stationery: 0,
      postage: 200,
      meals: 0,
      other: 0,
      analysis: { Transport: '', Stationery: '', Postage: 200, Meals: '', Other: '' }
    },
    {
      id: 4,
      date: '2026-09-04',
      name: 'Local Cafe',
      description: 'Staff Lunch',
      voucherNo: 'V-104',
      amountReceived: 0,
      amountPaid: 1200,
      ledgerFolio: 'LF-04',
      transport: 0,
      stationery: 0,
      postage: 0,
      meals: 1200,
      other: 0,
      analysis: { Transport: '', Stationery: '', Postage: '', Meals: 1200, Other: '' }
    }
  ]`;

form1 = form1.replace('const [records, setRecords] = useState([]);', `const [records, setRecords] = useState(${mockDataString});`);

const newSubmitLogic = `
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const payload = {
      date: formData.date,
      name: formData.name,
      description: formData.description,
      voucherNo: formData.voucherNo,
      amountReceived: formData.amountReceived ? parseFloat(formData.amountReceived) : null,
      amountPaid: formData.amountPaid ? parseFloat(formData.amountPaid) : null,
      ledgerFolio: formData.ledgerFolio,
      transport: formData.analysis.Transport ? parseFloat(formData.analysis.Transport) : null,
      stationery: formData.analysis.Stationery ? parseFloat(formData.analysis.Stationery) : null,
      postage: formData.analysis.Postage ? parseFloat(formData.analysis.Postage) : null,
      meals: formData.analysis.Meals ? parseFloat(formData.analysis.Meals) : null,
      other: formData.analysis.Other ? parseFloat(formData.analysis.Other) : null
    };

    // --- MOCK DATA LOGIC ---
    const newRecord = {
      ...payload,
      id: Date.now(),
      analysis: {
        Transport: payload.transport || '',
        Stationery: payload.stationery || '',
        Postage: payload.postage || '',
        Meals: payload.meals || '',
        Other: payload.other || ''
      }
    };
    
    setRecords(prev => [...prev, newRecord]);
    setFormData(INITIAL_FORM_STATE);
    // -----------------------

    try {
      const response = await fetch('http://localhost:8080/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        // fetchRecords();
      }
    } catch (error) {
      console.error("Failed to submit record to backend API:", error);
    }
  };
`;

form1 = form1.replace(/const handleSubmit = async \(e\) => \{[\s\S]*?console\.error\("Failed to submit record:", error\);\s*\}\s*\};/, newSubmitLogic);

fs.writeFileSync('frontend/src/forms/form1.jsx', form1);
console.log("form1 updated with 4 mock rows and local state");
