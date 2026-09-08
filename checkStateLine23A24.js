const fs = require('fs');
const files = ['frontend/src/forms/form23a.jsx', 'frontend/src/forms/form24.jsx'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const matchState = content.match(/const \[\w+,\s*set\w+\] = useState\(\[\]\)/g);
    console.log(`\n--- ${file} State Line ---`);
    console.log(matchState ? matchState.join('\n') : "Not found");
});
