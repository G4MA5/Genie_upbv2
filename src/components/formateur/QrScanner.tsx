import React from 'react';
import { QrCode } from 'lucide-react';
export const QrScanner: React.FC = () => (
  <div className="bg-slate-900 text-white p-8 rounded-2xl text-center flex flex-col items-center">
    <QrCode className="w-16 h-16 text-[#E8B33D] mb-4 animate-pulse" />
    <h3 className="font-bold text-base mb-2">Scanner le QR Code Étudiant</h3>
    <p className="text-xs text-slate-400">Positionnez le pass numérique du candidat devant la caméra pour valider l'émargement.</p>
  </div>
);
