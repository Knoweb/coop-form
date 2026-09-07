const fs = require('fs');

let app = fs.readFileSync('frontend/src/App.jsx', 'utf8');

// Add to imports if not there
const importsToAdd = `
import Form5 from './forms/form5';
import Form5A from './forms/form5a';
import Form5B from './forms/form5b';
import Form5M from './forms/form5m';
import Form6 from './forms/form6';
import Form7 from './forms/form7';
import Form7A from './forms/form7a';
import Form8 from './forms/form8';
import Form9A from './forms/form9a';
import Form9B from './forms/form9b';
`;
if (!app.includes('import Form5')) {
    app = app.replace("import Form4 from './forms/form4';", "import Form4 from './forms/form4';" + importsToAdd);
}

// Add to renderForm
const renderCases = `
      case 'form5': return <Form5 />;
      case 'form5a': return <Form5A />;
      case 'form5b': return <Form5B />;
      case 'form5m': return <Form5M />;
      case 'form6': return <Form6 />;
      case 'form7': return <Form7 />;
      case 'form7a': return <Form7A />;
      case 'form8': return <Form8 />;
      case 'form9a': return <Form9A />;
      case 'form9b': return <Form9B />;
`;
if (!app.includes("case 'form5': return <Form5 />;")) {
    app = app.replace("case 'form4':\r\n        return <Form4 />;", "case 'form4':\r\n        return <Form4 />;" + renderCases);
    app = app.replace("case 'form4':\n        return <Form4 />;", "case 'form4':\n        return <Form4 />;" + renderCases);
}

// Add to getFormTitle
const titleCases = `
      case 'form5': return 'Form 5';
      case 'form5a': return 'Form 5A';
      case 'form5b': return 'Form 5B';
      case 'form5m': return 'Form 5M';
      case 'form6': return 'Form 6';
      case 'form7': return 'Form 7';
      case 'form7a': return 'Form 7A';
      case 'form8': return 'Form 8';
      case 'form9a': return 'Form 9A';
      case 'form9b': return 'Form 9B';
`;
if (!app.includes("case 'form5': return 'Form 5';")) {
    app = app.replace("case 'form4':\r\n        return 'Form 4';", "case 'form4':\r\n        return 'Form 4';" + titleCases);
    app = app.replace("case 'form4':\n        return 'Form 4';", "case 'form4':\n        return 'Form 4';" + titleCases);
}

fs.writeFileSync('frontend/src/App.jsx', app);
