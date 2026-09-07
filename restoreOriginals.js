const { execSync } = require('child_process');
const fs = require('fs');

// Restore originals from git
['form1.jsx', 'form2.jsx', 'form3.jsx'].forEach(form => {
    const original = execSync(`git show HEAD:frontend/src/forms/${form}`, { encoding: 'utf8' });
    fs.writeFileSync(`frontend/src/forms/${form}`, original);
    console.log(`Restored ${form} from git`);
});
