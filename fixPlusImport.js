const fs = require('fs');

['form2.jsx', 'form3.jsx', 'form4.jsx'].forEach(form => {
    let content = fs.readFileSync(`frontend/src/forms/${form}`, 'utf8');
    
    // Check if Plus is missing and add it
    if (!content.includes(", Plus }") && !content.includes(",Plus }") && !content.includes("{ Plus,") && !content.includes("Plus,")) {
        content = content.replace(
            /import \{ ([^}]+) \} from 'lucide-react';/,
            (match, icons) => `import { ${icons.trim()}, Plus } from 'lucide-react';`
        );
        fs.writeFileSync(`frontend/src/forms/${form}`, content);
        console.log(`Fixed Plus import in ${form}`);
    } else {
        console.log(`${form} already has Plus import`);
    }
});
