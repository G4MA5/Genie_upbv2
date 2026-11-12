import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { label: string; value: string }[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, error, className = '', ...props }) => {
  return (
    <div className="w-full text-left">
      {label && <label className="block text-xs font-bold text-[#0A1430] uppercase tracking-wider mb-1.5">{label}</label>}
      <select
        className={`w-full px-4 py-3 rounded-xl border bg-white text-[#0A1430] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8742A] transition-all ${
          error ? 'border-red-500' : 'border-slate-200'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
    </div>
  );
};
