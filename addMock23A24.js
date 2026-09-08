const fs = require('fs');

const mockData23A = `[
    { id: 1, serialNo: '01', description: 'Office Chairs', requestedQuantity: 10, issuedQuantity: 10, otherDetails: 'Received in good condition' },
    { id: 2, serialNo: '02', description: 'Tables', requestedQuantity: 5, issuedQuantity: 5, otherDetails: 'Received' },
    { id: 3, serialNo: '03', description: 'Computers', requestedQuantity: 3, issuedQuantity: 2, otherDetails: '1 item short' }
  ]`;

const mockData24 = `[
    { id: 1, serialNo: '01', cardNo: 'C-101', item: 'Rice (kg)', store1Qty: 50, store2Qty: 30, store3Qty: 20, store4Qty: 0, totalQty: 100 },
    { id: 2, serialNo: '02', cardNo: 'C-102', item: 'Sugar (kg)', store1Qty: 20, store2Qty: 20, store3Qty: 20, store4Qty: 10, totalQty: 70 },
    { id: 3, serialNo: '03', cardNo: 'C-103', item: 'Dhal (kg)', store1Qty: 100, store2Qty: 50, store3Qty: 0, store4Qty: 0, totalQty: 150 }
  ]`;

function updateFile(file, mockData) {
    let content = fs.readFileSync(file, 'utf8');
    const regex = /const \[\s*(records|displayRecords)\s*,\s*set[A-Za-z0-9_]+\s*\]\s*=\s*useState\(\[\]\)/;
    if (regex.test(content)) {
        content = content.replace(regex, `const [$1, set${"$1".charAt(0).toUpperCase() + "$1".slice(1)}] = useState(${mockData})`);
        
        if (content.includes('setrecords')) content = content.replace('setrecords', 'setRecords');
        if (content.includes('setdisplayRecords')) content = content.replace('setdisplayRecords', 'setDisplayRecords');
        
        fs.writeFileSync(file, content);
        console.log(`Mock data added to ${file}`);
    } else {
        console.log(`Array state not found or already populated in ${file}`);
    }
}

updateFile('frontend/src/forms/form23a.jsx', mockData23A);
updateFile('frontend/src/forms/form24.jsx', mockData24);
