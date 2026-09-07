const fs = require('fs');

const allFiles = fs.readdirSync('frontend/src/forms').filter(f => f.startsWith('Form') || f.startsWith('form'));

allFiles.forEach(file => {
    if (file.toLowerCase().includes('15c') || 
        file.toLowerCase().includes('16a') || 
        file.toLowerCase().includes('16b') || 
        file.toLowerCase().includes('16d') || 
        file.toLowerCase().includes('17') || 
        file.toLowerCase().includes('18') || 
        file.toLowerCase().includes('19')) {
        const content = fs.readFileSync(`frontend/src/forms/${file}`, 'utf8');
        const buttonRegex = /<button[^>]*>.*?<\/button>/gs;
        let match;
        while ((match = buttonRegex.exec(content)) !== null) {
            if (match[0].toLowerCase().includes('save') || match[0].toLowerCase().includes('submit')) {
                console.log(`\n--- ${file} ---`);
                console.log(match[0]);
            }
        }
    }
});
