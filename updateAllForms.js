const fs = require('fs');
const path = require('path');

const formsDir = 'frontend/src/forms';
const files = fs.readdirSync(formsDir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  if (file === 'form1.jsx') return; // Already updated manually
  
  const filePath = path.join(formsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // We want to find the handleSubmit function and the payload definition.
  // It usually looks like:
  // const payload = { ... };
  // try {
  
  // Find where `try {` is right after `const payload = { ... };`
  const tryIndex = content.indexOf('try {');
  const payloadMatch = content.match(/const payload = \{[\s\S]*?\};/);
  
  if (payloadMatch && tryIndex > -1) {
      const injectLocalStateLogic = `
    // --- LOCAL STATE UPDATE ---
    setRecords(prev => [...prev, { ...payload, id: Date.now() }]);
    setFormData(INITIAL_FORM_STATE);
    // --------------------------
    `;
      
      // Inject before `try {` inside handleSubmit
      // We will replace `try {` with `injectLocalStateLogic + '\n    try {'`
      // But only the FIRST `try {` inside handleSubmit.
      
      // Better approach: regex replace handleSubmit
      content = content.replace(/(const payload = \{[\s\S]*?\};\s*)(try\s*\{)/, `$1${injectLocalStateLogic}$2`);
      
      // Prevent double calling of setFormData by commenting it out in the fetch success block
      content = content.replace(/setFormData\(INITIAL_FORM_STATE\);/g, (match, offset) => {
          // If it's inside our injected block, keep it. Otherwise, comment it.
          if (content.substring(offset - 50, offset).includes('LOCAL STATE UPDATE')) {
              return match;
          }
          return `// ${match}`;
      });

      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
  }
});
