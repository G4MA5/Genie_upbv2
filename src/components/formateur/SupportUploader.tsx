import React from 'react';
import { Upload } from 'lucide-react';
import { Button } from '../ui/Button';
export const SupportUploader: React.FC = () => (
  <div className="bg-white p-6 rounded-2xl border border-dashed border-slate-300 text-center flex flex-col items-center">
    <Upload className="w-10 h-10 text-slate-400 mb-2" />
    <h4 className="font-bold text-sm text-[#0A1430] mb-1">Téléverser un support de cours (PDF, Diaporama)</h4>
    <p className="text-xs text-slate-400 mb-4">Taille max : 50 Mo</p>
    <Button size="sm">Choisir un fichier</Button>
  </div>
);
