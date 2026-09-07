const fs = require('fs');

// Since the automated replacements partially broke things, let's restore from git and redo cleanly.
// First check if there's a backup in git
const { execSync } = require('child_process');

['form1.jsx', 'form2.jsx', 'form3.jsx', 'form4.jsx'].forEach(form => {
    try {
        const result = execSync(`git show HEAD:frontend/src/forms/${form}`, { encoding: 'utf8' });
        fs.writeFileSync(`frontend/src/forms/${form}`, result);
        console.log(`Restored ${form} from git HEAD`);
    } catch(e) {
        console.log(`Could not restore ${form}:`, e.message.substring(0, 100));
    }
});
