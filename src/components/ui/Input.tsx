import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, helper, className = '', ...props }) => {
  return (
    <div className="w-full text-left">
      {label && <label className="block text-xs font-bold text-[#0A1430] uppercase tracking-wider mb-1.5">{label}</label>}
      <input
        className={`w-full px-4 py-3 rounded-xl border bg-white text-[#0A1430] text-sm focus:outline-none focus:ring-2 focus:ring-[#E8742A] transition-all ${
          error ? 'border-red-500' : 'border-slate-200'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
      {helper && !error && <p className="text-xs text-slate-400 mt-1">{helper}</p>}
    </div>
  );
};
