import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const base = "font-bold rounded-xl transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer";
  
  const variants = {
    primary: "bg-[#E8742A] hover:bg-[#d4651e] text-white shadow-md hover:shadow-lg active:scale-95",
    outline: "border-2 border-[#0A1430] text-[#0A1430] hover:bg-[#0A1430] hover:text-white",
    ghost: "bg-transparent hover:bg-slate-100 text-[#0A1430]",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3.5 text-base"
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
