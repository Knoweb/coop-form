const fs = require('fs');
const dir = 'frontend/src/forms';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.jsx')) {
        const filePath = `${dir}/${file}`;
        let content = fs.readFileSync(filePath, 'utf8');
        if (content.includes('bg-slncc-red')) {
            content = content.replace(/bg-slncc-red/g, 'bg-blue-600');
            fs.writeFileSync(filePath, content);
            console.log(`Updated ${file}`);
        }
    }
});
