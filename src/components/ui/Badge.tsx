import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'green' | 'amber' | 'red' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'blue' }) => {
  const styles = {
    blue: "bg-[#E3EAFB] text-[#1F4BB8]",
    green: "bg-[#DFF2E7] text-[#17744B]",
    amber: "bg-[#FBEFD2] text-[#8A5A00]",
    red: "bg-[#FBE6E3] text-[#B4281F]",
    neutral: "bg-slate-100 text-slate-600"
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${styles[variant]}`}>
      {children}
    </span>
  );
};
