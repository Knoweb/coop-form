const fs = require('fs');
const file = 'frontend/src/forms/form30.jsx';

try {
    let content = fs.readFileSync(file, 'utf8');
    const keys = new Set();
    const regex = /record\.([a-zA-Z0-9_]+)/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        keys.add(match[1]);
    }
    if (keys.size === 0) {
        const regex2 = /rec\.([a-zA-Z0-9_]+)/g;
        let match2;
        while ((match2 = regex2.exec(content)) !== null) {
            keys.add(match2[1]);
        }
    }
    if (keys.size === 0) {
        const regex3 = /item\.([a-zA-Z0-9_]+)/g;
        let match3;
        while ((match3 = regex3.exec(content)) !== null) {
            keys.add(match3[1]);
        }
    }
    console.log(`\n--- ${file} Keys ---`);
    console.log(Array.from(keys).join(', '));
    
    const matchState = content.match(/useState\((.*?)\)/s);
    console.log("Initial state:", matchState ? matchState[0].substring(0, 50) : "Not found");
} catch (e) {
    console.log(`Error reading ${file}: ${e.message}`);
}
