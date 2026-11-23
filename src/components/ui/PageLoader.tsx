import React from 'react';

export const PageLoader: React.FC = () => (
  <div className="min-h-[50vh] flex flex-col items-center justify-center p-6">
    <div className="flex space-x-2.5 mb-4">
      <span className="w-3.5 h-3.5 bg-[#0E1E4A] rounded-full animate-bounce"></span>
      <span className="w-3.5 h-3.5 bg-[#E8742A] rounded-full animate-bounce [animation-delay:150ms]"></span>
      <span className="w-3.5 h-3.5 bg-[#E8B33D] rounded-full animate-bounce [animation-delay:300ms]"></span>
    </div>
    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Chargement de la page...</p>
  </div>
);
