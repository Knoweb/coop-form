const fs = require('fs');
const files = ['frontend/src/forms/form23a.jsx', 'frontend/src/forms/form24.jsx'];

files.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        const matchState = content.match(/useState\((.*?)\)/s);
        console.log(`\n--- ${file} Initial state ---`);
        console.log(matchState ? matchState[0].substring(0, 100) : "Not found");
    } catch (e) {
        console.log(`Error reading ${file}: ${e.message}`);
    }
});
