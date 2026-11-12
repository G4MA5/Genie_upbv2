import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden mb-3 bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left font-bold text-sm text-[#0A1430] hover:bg-slate-50 transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 text-sm text-slate-600 border-t border-slate-50">
          {children}
        </div>
      )}
    </div>
  );
};
