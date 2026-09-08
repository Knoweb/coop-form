const fs = require('fs');
const file = 'frontend/src/forms/form29.jsx';

const mockData = `[
    { id: 1, tripNo: 'TR-101', goodsDetails: 'Rice Bags', qty: 50, depTime: '08:00', depPlace: 'Colombo', authOfficerSigItem: 'Manager A', arrTime: '12:00', arrPlace: 'Kandy', receivingOfficerSig: 'Officer B', drivenForWhom: 'Branch 1', amount: 5000.0 },
    { id: 2, tripNo: 'TR-102', goodsDetails: 'Sugar Bags', qty: 20, depTime: '13:00', depPlace: 'Kandy', authOfficerSigItem: 'Officer B', arrTime: '16:00', arrPlace: 'Galle', receivingOfficerSig: 'Officer C', drivenForWhom: 'Branch 2', amount: 3500.0 },
    { id: 3, tripNo: 'TR-103', goodsDetails: 'Flour Sacks', qty: 30, depTime: '09:00', depPlace: 'Galle', authOfficerSigItem: 'Officer C', arrTime: '11:30', arrPlace: 'Matara', receivingOfficerSig: 'Officer D', drivenForWhom: 'Branch 3', amount: 2000.0 }
  ]`;

let content = fs.readFileSync(file, 'utf8');

// Find the exact name of the state
const matchState = content.match(/const \[\s*([a-zA-Z0-9_]+)\s*,\s*set[a-zA-Z0-9_]+\s*\]\s*=\s*useState\(\[\]\)/);
if (matchState) {
    const varName = matchState[1];
    const regex = new RegExp(`const \\[\s*${varName}\s*,\\s*set[A-Za-z0-9_]+\\s*\\]\\s*=\\s*useState\\(\\[\\]\\)`);
    content = content.replace(regex, `const [${varName}, set${varName.charAt(0).toUpperCase() + varName.slice(1)}] = useState(${mockData})`);
    
    // Fix setter name casing if needed
    if (content.includes('setrecords')) content = content.replace('setrecords', 'setRecords');
    if (content.includes('setdisplayRecords')) content = content.replace('setdisplayRecords', 'setDisplayRecords');
    if (content.includes('setitems')) content = content.replace('setitems', 'setItems');
    if (content.includes('settableRows')) content = content.replace('settableRows', 'setTableRows');
    
    fs.writeFileSync(file, content);
    console.log(`Mock data added to ${file}`);
} else {
    console.log(`Array state not found or already populated in ${file}`);
}
