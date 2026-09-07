const fs = require('fs');

let form1 = fs.readFileSync('frontend/src/forms/form1.jsx', 'utf8');

const additionalMockData = `,
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
        analysis: {
          Transport: '',
          Stationery: 500,
          Postage: '',
          Meals: '',
          Other: ''
        }
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
        analysis: {
          Transport: '',
          Stationery: '',
          Postage: 200,
          Meals: '',
          Other: ''
        }
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
        analysis: {
          Transport: '',
          Stationery: '',
          Postage: '',
          Meals: 1200,
          Other: ''
        }
      }`;

form1 = form1.replace(/Other:\s*''\r?\n\s*\}\r?\n\s*\}/, "Other: ''\n        }\n      }" + additionalMockData);

fs.writeFileSync('frontend/src/forms/form1.jsx', form1);
console.log("form1 mock data added");
