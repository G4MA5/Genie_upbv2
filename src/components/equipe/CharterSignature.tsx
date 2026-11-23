import React, { useState } from 'react';
import { Button } from '../ui/Button';

export const CharterSignature: React.FC = () => {
  const [signed, setSigned] = useState(false);
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100">
      <h3 className="font-bold text-base text-[#0E1E4A] mb-2">Signature de la Charte de Participation</h3>
      <p className="text-xs text-slate-500 mb-4">Chaque membre doit approuver le règlement officiel avant la soumission finale.</p>
      <Button variant={signed ? 'outline' : 'primary'} onClick={() => setSigned(!signed)}>
        {signed ? '✓ Charte signée numériquement' : 'Signer la charte'}
      </Button>
    </div>
  );
};
