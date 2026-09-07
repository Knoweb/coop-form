import React from 'react';
import { FileText } from 'lucide-react';

export default function FormHeader({ title, subtitle, formNumber }) {
  return (
    <header className="flex items-center justify-between mb-6 p-4 md:px-6 md:py-4 bg-[#312783] rounded-xl shadow-md print:hidden">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-[#3730A3] rounded-lg border border-[#4338CA]/50">
          <FileText className="w-6 h-6 text-[#E0E7FF]" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white">{title}</h1>
          {subtitle && (
            <p className="text-xs md:text-sm text-[#E0E7FF]/80 font-medium mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="hidden sm:flex items-center px-3 py-1.5 bg-[#1E1B4B]/40 rounded-md border border-[#3730A3]">
        <span className="text-xs font-bold text-[#E0E7FF] tracking-widest uppercase">{formNumber}</span>
      </div>
    </header>
  );
}
