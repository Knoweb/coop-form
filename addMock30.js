const fs = require('fs');
const file = 'frontend/src/forms/form30.jsx';

const mockWholesale = `[
    { id: 1, prevRs: '1000', prevCts: '50', todayRs: '500', todayCts: '25' },
    { id: 2, prevRs: '2500', prevCts: '00', todayRs: '1200', todayCts: '75' },
    { id: 3, prevRs: '3400', prevCts: '20', todayRs: '1800', todayCts: '50' }
  ]`;

const mockRetail = `[
    { id: 1, prevRs: '500', prevCts: '00', todayRs: '200', todayCts: '50' },
    { id: 2, prevRs: '800', prevCts: '25', todayRs: '350', todayCts: '75' },
    { id: 3, prevRs: '1200', prevCts: '50', todayRs: '600', todayCts: '00' }
  ]`;

let content = fs.readFileSync(file, 'utf8');

const regexWholesale = /const \[wholesaleRows, setWholesaleRows\] = useState\(\[\s*\{\s*id: 1, prevRs: '', prevCts: '', todayRs: '', todayCts: ''\s*\}\s*\]\);/;
if (regexWholesale.test(content)) {
    content = content.replace(regexWholesale, `const [wholesaleRows, setWholesaleRows] = useState(${mockWholesale});`);
}

const regexRetail = /const \[retailRows, setRetailRows\] = useState\(\[\s*\{\s*id: 1, prevRs: '', prevCts: '', todayRs: '', todayCts: ''\s*\}\s*\]\);/;
if (regexRetail.test(content)) {
    content = content.replace(regexRetail, `const [retailRows, setRetailRows] = useState(${mockRetail});`);
}

fs.writeFileSync(file, content);
console.log('Mock data added to form30.jsx');
