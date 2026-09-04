import React, { useState } from "react";
import { Save, Plus, Check, FileText, List, X } from "lucide-react";

// Row definitions matching the physical form exactly
const ROW_DEFS = [
  { key: "uparama",     label: "උපරිම",                                 type: "normal"   },
  { key: "awama",       label: "අවම",                                    type: "normal"   },
  { key: "saruwa",      label: "සෘජුව මිලට ගත් බඩුවල ප්‍රමාණය",         type: "normal"   },
  { key: "thogaMove",   label: "තොග ශාලාවලින් මාරු කළ බඩුවල ප්‍රමාණය",  type: "normal"   },
  { key: "shakhaTrans", label: "ශාඛාවලින් මාරු කිරීම් ප්‍රමාණය",         type: "normal"   },
  { key: "initGoods",   label: "ආරම්භක බඩුවල ප්‍රමාණය",                 type: "normal"   },
  { key: "sub1",        label: "එකතුව",                                  type: "subtotal" },
  { key: "heading",     label: "අඩුකිරීම්",                              type: "heading"  },
  { key: "cashSales",   label: "අත්පිට විකුණුම් ප්‍රමාණය",               type: "normal"   },
  { key: "creditSales", label: "ණයට විකුණුම් ප්‍රමාණය",                 type: "normal"   },
  { key: "returned",    label: "ආපසු යැවූ ප්‍රමාණය",                     type: "normal"   },
  { key: "damaged",     label: "නරක්වූ බඩු ප්‍රමාණය",                    type: "normal"   },
  { key: "transfer",    label: "මාරු කිරීම්",                            type: "normal"   },
  { key: "sub2",        label: "උප එකතුව",                              type: "subtotal" },
  { key: "remaining",   label: "අවසානයට ඉතිරි බඩු ප්‍රමාණය",             type: "normal"   },
  { key: "grand",       label: "එකතුව",                                  type: "subtotal" },
];

const SECTION1_KEYS = ["uparama","awama","saruwa","thogaMove","shakhaTrans","initGoods"];
const SECTION2_KEYS = ["cashSales","creditSales","returned","damaged","transfer"];
const DATA_KEYS     = [...SECTION1_KEYS, ...SECTION2_KEYS, "remaining"];

const DEFAULT_COLS = [
  { key: "shal", label: "සහල්", sub: "කි. ග්‍රෑ." },
  { key: "piti", label: "පිටි",  sub: "කි. ග්‍රෑ." },
  { key: "sini", label: "සීනි", sub: "කි. ග්‍රෑ." },
];

const pv = s => parseFloat(s) || 0;

const buildBlank = (cols) => {
  const v = { adala: "" };
  DATA_KEYS.forEach(k => cols.forEach(c => { v[`${k}_${c.key}`] = ""; }));
  return v;
};

const DUMMY = {
  id: 1, date: "2026-08-15", branch: "මධ්‍යම ශාඛාව", society: "කොළඹ සීමාසහිත", adala: "15C-001",
  uparama_shal:"850", uparama_piti:"420", uparama_sini:"310",
  awama_shal:"200", awama_piti:"100", awama_sini:"80",
  saruwa_shal:"1200", saruwa_piti:"600", saruwa_sini:"450",
  thogaMove_shal:"500", thogaMove_piti:"250", thogaMove_sini:"180",
  shakhaTrans_shal:"300", shakhaTrans_piti:"150", shakhaTrans_sini:"120",
  initGoods_shal:"400", initGoods_piti:"200", initGoods_sini:"160",
  cashSales_shal:"1800", cashSales_piti:"900", cashSales_sini:"680",
  creditSales_shal:"600", creditSales_piti:"300", creditSales_sini:"220",
  returned_shal:"50", returned_piti:"25", returned_sini:"20",
  damaged_shal:"30", damaged_piti:"15", damaged_sini:"12",
  transfer_shal:"200", transfer_piti:"100", transfer_sini:"80",
  remaining_shal:"570", remaining_piti:"280", remaining_sini:"208",
};

export default function Form15C() {
  const [society, setSociety] = useState("");
  const [branch,  setBranch]  = useState("");
  const [date,    setDate]    = useState("");

  // ── Dynamic columns state ──
  const [cols, setCols]           = useState(DEFAULT_COLS);
  const [addingCol, setAddingCol] = useState(false);
  const [newColLabel, setNewColLabel] = useState("");

  // ── Form values ──
  const [vals, setVals] = useState(buildBlank(DEFAULT_COLS));

  // ── Records ──
  const [records, setRecords]     = useState([DUMMY]);
  const [nextId,  setNextId]      = useState(2);
  const [showManual, setShowManual] = useState(false);
  const [manVals, setManVals]     = useState(buildBlank(DEFAULT_COLS));
  const [manDate, setManDate]     = useState("");
  const [manBranch, setManBranch] = useState("");

  // ── Add a new column ──
  const handleAddColumn = () => {
    const label = newColLabel.trim();
    if (!label) return;
    const key = `col_${Date.now()}`;
    const newCol = { key, label, sub: "කි. ග්‍රෑ." };
    setCols(prev => [...prev, newCol]);
    // Extend current form values
    setVals(prev => {
      const updated = { ...prev };
      DATA_KEYS.forEach(k => { updated[`${k}_${key}`] = ""; });
      return updated;
    });
    // Extend manual row values
    setManVals(prev => {
      const updated = { ...prev };
      DATA_KEYS.forEach(k => { updated[`${k}_${key}`] = ""; });
      return updated;
    });
    setNewColLabel("");
    setAddingCol(false);
  };

  // ── Remove a column ──
  const handleRemoveCol = (colKey) => {
    setCols(prev => prev.filter(c => c.key !== colKey));
    setVals(prev => {
      const updated = { ...prev };
      DATA_KEYS.forEach(k => { delete updated[`${k}_${colKey}`]; });
      return updated;
    });
  };

  // ── Auto totals ──
  const colSum  = (keys, colKey) => keys.reduce((s, k) => s + pv(vals[`${k}_${colKey}`]), 0);
  const sub1Val = c => colSum(SECTION1_KEYS, c);
  const sub2Val = c => colSum(SECTION2_KEYS, c);
  const grandVal = c => sub1Val(c);

  // ── Editable cell ──
  const cell = (rowKey, colKey) => (
    <input
      type="text"
      value={vals[`${rowKey}_${colKey}`] ?? ""}
      onChange={e => setVals(prev => ({ ...prev, [`${rowKey}_${colKey}`]: e.target.value }))}
      className="w-full text-center bg-transparent focus:outline-none focus:bg-blue-50 px-0.5 py-0.5 text-sm min-w-[60px]"
    />
  );

  const handleSubmit = e => {
    e.preventDefault();
    setRecords(prev => [...prev, { ...vals, id: nextId, date, branch, society, _cols: cols.map(c => c.key) }]);
    setNextId(n => n + 1);
    setVals(buildBlank(cols));
  };

  const tdBorder = "border border-black p-1";
  const thBorder = "border border-black p-2 font-normal text-center";

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col items-center gap-10">

      {/* ═══ FORM ═══ */}
      <form onSubmit={handleSubmit} className="bg-white p-8 w-full max-w-6xl shadow-lg border border-gray-200 text-black font-sans">

        {/* ── Paper header ── */}
        <div className="flex justify-between items-start mb-2">
          <div className="w-full">
            <div className="flex justify-between items-end">
              <div className="flex-1 flex items-end gap-1">
                <span className="whitespace-nowrap text-sm">සීමාසහිත</span>
                <input type="text" value={society} onChange={e => setSociety(e.target.value)}
                  className="flex-1 border-b border-dotted border-black bg-transparent focus:outline-none text-sm text-center" />
                <span className="whitespace-nowrap text-sm">විවිධ සේවා සමූකාර සමිතිය.</span>
              </div>
              <div className="font-bold ml-4 text-lg">15 C</div>
            </div>
            <div className="mt-4 flex items-end gap-2">
              <input type="text" value={branch} onChange={e => setBranch(e.target.value)}
                className="flex-1 border-b border-dotted border-black bg-transparent focus:outline-none text-sm" />
              <span className="whitespace-nowrap text-sm">ප්‍රාදේශීය / ශාඛාව.</span>
            </div>
          </div>
        </div>

        {/* ── Title ── */}
        <div className="mt-6 mb-4 flex items-end justify-center gap-2">
          <input type="date" value={date} onChange={e => setDate(e.target.value)}
            className="border-b border-dotted border-black bg-transparent focus:outline-none text-sm w-40" />
          <span className="font-bold text-sm">දිනට ප්‍රමාණය අනුව ඉතිරි බඩු සටහන</span>
        </div>

        {/* ── Main table ── */}
        <div className="overflow-x-auto mt-4">
          <table className="border-collapse border border-black text-sm" style={{ width: "100%" }}>
            <thead>
              <tr>
                {/* Fixed left columns */}
                <th className="border border-black p-2 font-normal text-left" rowSpan={2} style={{ minWidth: "200px" }}>
                  වෙළඳ බඩු විස්තරය
                </th>
                <th className="border border-black p-2 font-normal text-center" rowSpan={2} style={{ width: "90px" }}>
                  අදාළ සටහන් අංක
                </th>

                {/* Dynamic product columns */}
                {cols.map(c => (
                  <th key={c.key} className={`${thBorder} relative group`} style={{ minWidth: "70px" }}>
                    <div className="flex items-center justify-center gap-1">
                      <span>{c.label}</span>
                      {/* Remove column button (hover) */}
                      <button type="button" onClick={() => handleRemoveCol(c.key)}
                        className="hidden group-hover:flex absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full items-center justify-center text-[10px] hover:bg-red-700 z-10"
                        title="Remove column">
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </th>
                ))}

                {/* Add column button */}
                <th className="border border-black p-1 text-center" rowSpan={2} style={{ width: addingCol ? "130px" : "50px" }}>
                  {addingCol ? (
                    <div className="flex flex-col items-center gap-1 p-1">
                      <input
                        autoFocus
                        type="text"
                        value={newColLabel}
                        onChange={e => setNewColLabel(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter") handleAddColumn(); if (e.key === "Escape") setAddingCol(false); }}
                        placeholder="නම"
                        className="w-full border border-gray-300 rounded px-1 py-0.5 text-xs text-center focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                      <div className="flex gap-1">
                        <button type="button" onClick={handleAddColumn}
                          className="bg-green-500 text-white rounded px-1.5 py-0.5 text-xs hover:bg-green-600">✓</button>
                        <button type="button" onClick={() => { setAddingCol(false); setNewColLabel(""); }}
                          className="bg-gray-300 text-gray-700 rounded px-1.5 py-0.5 text-xs hover:bg-gray-400">✕</button>
                      </div>
                    </div>
                  ) : (
                    <button type="button" onClick={() => setAddingCol(true)}
                      className="w-8 h-8 flex items-center justify-center mx-auto bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-full transition-colors font-bold text-lg"
                      title="නව බඩු ප්‍රභේදයක් එකතු කරන්න">
                      +
                    </button>
                  )}
                </th>
              </tr>
              <tr>
                {cols.map(c => (
                  <th key={c.key} className="border border-black p-1 font-normal text-center text-xs">
                    {c.sub}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ROW_DEFS.map((row, idx) => {
                // ── Heading row ──
                if (row.type === "heading") {
                  return (
                    <tr key={row.key} className="h-9">
                      <td className="border border-black p-2 font-bold" colSpan={2 + cols.length + 1}>
                        {row.label}
                      </td>
                    </tr>
                  );
                }

                // ── Subtotal row ──
                if (row.type === "subtotal") {
                  const getVal = colKey => {
                    if (row.key === "sub1")  return sub1Val(colKey).toFixed(2);
                    if (row.key === "sub2")  return sub2Val(colKey).toFixed(2);
                    if (row.key === "grand") return grandVal(colKey).toFixed(2);
                    return "";
                  };
                  return (
                    <tr key={row.key} className="h-9 bg-gray-50">
                      <td className="border border-black p-2 text-right font-bold pr-6">{row.label}</td>
                      <td className="border border-black p-1"></td>
                      {cols.map(c => (
                        <td key={c.key} className="border border-black p-1 text-center font-bold text-sm">
                          {getVal(c.key)}
                        </td>
                      ))}
                      <td className="border border-black p-1"></td>
                    </tr>
                  );
                }

                // ── Normal data row ──
                return (
                  <tr key={row.key} className="h-9 hover:bg-blue-50/20">
                    <td className="border border-black p-2 align-middle text-sm">{row.label}</td>
                    <td className="border border-black p-1">
                      {idx === 0 && (
                        <input type="text" value={vals.adala}
                          onChange={e => setVals(prev => ({ ...prev, adala: e.target.value }))}
                          className="w-full text-center bg-transparent focus:outline-none px-0.5 text-sm" />
                      )}
                    </td>
                    {cols.map(c => (
                      <td key={c.key} className={tdBorder}>{cell(row.key, c.key)}</td>
                    ))}
                    <td className="border border-black p-1"></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Helper hint ── */}
        <p className="mt-3 text-xs text-indigo-500 text-right">
          💡 &nbsp;{cols.length === 0 ? "ඉහත" : "ඉහත +"} බොත්තම ඔබා නව බඩු ප්‍රභේදයක් (column) එකතු කරන්න &nbsp;|&nbsp; column header hover කර ✕ click කර ඉවත් කරන්න
        </p>

        {/* ── Footer ── */}
        <div className="mt-8 ml-8 mr-4 text-justify leading-relaxed text-sm">
          මා විසින් ඉදිරිපත් කරන ඉහත සඳහන් ඉතිරි බඩු සටහන නිවැරදි බවත්, එම ඉතිරි බඩු මා භාරයේ නිවැරදිව තිබෙන බවත් සහතික කරමි.
        </div>
        <div className="mt-12 flex justify-between items-end px-4">
          <div className="flex items-end gap-2 text-sm">
            <span>දිනය:-</span>
            <span className="inline-block border-b border-dotted border-black w-48"></span>
          </div>
          <div className="flex flex-col items-center text-sm">
            <span className="inline-block border-b border-dotted border-black w-64 mb-2"></span>
            <span>ගබඩා භාරකරු / කළමණාකරු</span>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="flex justify-end mt-6 pt-4 border-t border-gray-200">
          <button type="submit"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-2.5 rounded-xl font-semibold shadow-lg shadow-indigo-200 transition-all duration-200 hover:-translate-y-0.5">
            <Save className="w-5 h-5" />
            <span>Submit Entry</span>
          </button>
        </div>
      </form>

      {/* ═══ RECORDS TABLE ═══ */}
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <List className="w-5 h-5 text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800">Form 15 C — ලේඛන වාර්තාව</h2>
          </div>
          <button onClick={() => { setManVals(buildBlank(cols)); setShowManual(v => !v); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-100 text-indigo-700 font-semibold rounded-lg hover:bg-indigo-200 transition-colors text-sm">
            <Plus className="w-4 h-4" />
            <span>Add Row</span>
          </button>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full border-collapse text-xs" style={{ minWidth: "600px" }}>
            <thead>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 p-2 font-bold text-slate-500 uppercase whitespace-nowrap">දිනය</th>
                <th className="border border-slate-300 p-2 font-bold text-slate-500 uppercase whitespace-nowrap">ශාඛාව</th>
                <th className="border border-slate-300 p-2 font-bold text-slate-500 uppercase whitespace-nowrap">සටහන් අංක</th>
                {ROW_DEFS.filter(r => r.type === "normal").map(r => (
                  <th key={r.key} colSpan={cols.length || 1}
                    className="border border-slate-300 p-2 font-bold text-indigo-700 text-center bg-indigo-50/30 whitespace-nowrap">
                    {r.label}
                  </th>
                ))}
                {showManual && <th className="border border-slate-300 p-2 w-8"></th>}
              </tr>
              <tr className="bg-slate-50">
                <th className="border border-slate-300 p-1"></th>
                <th className="border border-slate-300 p-1"></th>
                <th className="border border-slate-300 p-1"></th>
                {ROW_DEFS.filter(r => r.type === "normal").map(r =>
                  cols.map(c => (
                    <th key={`${r.key}_${c.key}`} className="border border-slate-300 p-1 font-semibold text-slate-400 text-center whitespace-nowrap">
                      {c.label}
                    </th>
                  ))
                )}
                {showManual && <th className="border border-slate-300 p-1"></th>}
              </tr>
            </thead>
            <tbody>
              {/* Manual inline row */}
              {showManual && (
                <tr className="bg-yellow-50">
                  <td className="border border-slate-300 p-1">
                    <input type="date" className="w-full px-1 py-0.5 border rounded text-xs" value={manDate} onChange={e => setManDate(e.target.value)} />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input type="text" className="w-full px-1 py-0.5 border rounded text-xs" value={manBranch} onChange={e => setManBranch(e.target.value)} placeholder="ශාඛාව" />
                  </td>
                  <td className="border border-slate-300 p-1">
                    <input type="text" className="w-full px-1 py-0.5 border rounded text-xs" value={manVals.adala} onChange={e => setManVals(p => ({ ...p, adala: e.target.value }))} />
                  </td>
                  {ROW_DEFS.filter(r => r.type === "normal").map(r =>
                    cols.map(c => (
                      <td key={`${r.key}_${c.key}`} className="border border-slate-300 p-1">
                        <input type="text" className="w-full px-1 py-0.5 border rounded text-xs text-right"
                          value={manVals[`${r.key}_${c.key}`] ?? ""}
                          onChange={e => setManVals(p => ({ ...p, [`${r.key}_${c.key}`]: e.target.value }))} />
                      </td>
                    ))
                  )}
                  <td className="border border-slate-300 p-1 text-center">
                    <button onClick={() => {
                      setRecords(prev => [...prev, { ...manVals, id: nextId, date: manDate, branch: manBranch }]);
                      setNextId(n => n + 1);
                      setManVals(buildBlank(cols)); setManDate(""); setManBranch(""); setShowManual(false);
                    }} className="text-green-600 hover:text-green-800"><Check className="w-4 h-4" /></button>
                  </td>
                </tr>
              )}

              {records.length === 0 && !showManual && (
                <tr><td colSpan={3 + DATA_KEYS.length * cols.length + 1}
                  className="p-10 text-center text-slate-400 border border-slate-300">
                  <FileText className="w-10 h-10 mx-auto mb-2 text-slate-200" />
                  <p>No records yet. Fill the form above and submit.</p>
                </td></tr>
              )}

              {records.map(rec => (
                <tr key={rec.id} className="hover:bg-slate-50/50">
                  <td className="border border-slate-300 p-1.5 whitespace-nowrap">{rec.date || "—"}</td>
                  <td className="border border-slate-300 p-1.5 whitespace-nowrap">{rec.branch || "—"}</td>
                  <td className="border border-slate-300 p-1.5 whitespace-nowrap">{rec.adala || "—"}</td>
                  {ROW_DEFS.filter(r => r.type === "normal").map(r =>
                    cols.map(c => (
                      <td key={`${r.key}_${c.key}`} className="border border-slate-300 p-1.5 text-right">
                        {rec[`${r.key}_${c.key}`] || "—"}
                      </td>
                    ))
                  )}
                  {showManual && <td className="border border-slate-300 p-1.5"></td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
