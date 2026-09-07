const fs = require('fs');

let sidebar = fs.readFileSync('frontend/src/components/Sidebar.jsx', 'utf8');

const newForms = `
        {btn('form5', 'Form 5', 'ගබඩා වාර්තාව')}
        {btn('form5a', 'Form 5A', 'ගබඩා වාර්තාව (කෘෂිකර්ම)')}
        {btn('form5b', 'Form 5B', 'ගබඩා වාර්තාව (පොහොර)')}
        {btn('form5m', 'Form 5M', 'කිරි පට්ටි දෛනික වාර්තාව')}
        {btn('form6', 'Form 6', 'ගබඩා වාර්තාව')}
        {btn('form7', 'Form 7', 'ගබඩා වාර්තාව')}
        {btn('form7a', 'Form 7A', 'ප්‍රාදේශික ලැබීම් හා ගෙවීම්')}
        {btn('form8', 'Form 8', 'ගෙවීම් මුදල් පොත')}
        {btn('form9a', 'Form 9A', 'තොග ගබඩා වාර්තාව')}
        {btn('form9b', 'Form 9B', 'සිල්ලර ගබඩා වාර්තාව')}`;

if (!sidebar.includes("btn('form5'")) {
    sidebar = sidebar.replace("{btn('form4', 'Form 4', 'Form 4')}", "{btn('form4', 'Form 4', 'Form 4')}" + newForms);
    fs.writeFileSync('frontend/src/components/Sidebar.jsx', sidebar);
    console.log("Sidebar updated.");
}

let app = fs.readFileSync('frontend/src/App.jsx', 'utf8');

app = app.replace(/<<<<<<< HEAD[\s\S]*?=======\r?\n/g, "");
app = app.replace(/>>>>>>> 6bf160a98d870b4d38555a13808aeb59bc8b84a6\r?\n/g, "");
fs.writeFileSync('frontend/src/App.jsx', app);
console.log("App.jsx merge conflicts removed.");

