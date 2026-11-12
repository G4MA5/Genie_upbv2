import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-lg text-[#0A1430]">{title}</h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-[#0A1430] rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-1 text-sm text-slate-600">
          {children}
        </div>
      </div>
    </div>
  );
};
