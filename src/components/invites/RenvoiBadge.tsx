import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { invitesApi } from '../../services/invites';
import { messageErreur } from '../../services/api';

/** Renvoi du badge par e-mail : demande un code, puis renvoie le badge. */
export function RenvoiBadge({ emailInitial = '' }: { emailInitial?: string }) {
  const [email, setEmail] = useState(emailInitial);
  const [code, setCode] = useState('');
  const [codeEnvoye, setCodeEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);

  const champ =
    'w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all';

  const demanderCode = async () => {
    setChargement(true);
    try {
      const r = await invitesApi.envoyerCode(email.trim());
      setCodeEnvoye(true);
      toast.success(r.message);
    } catch (e) {
      toast.error(messageErreur(e));
    } finally {
      setChargement(false);
    }
  };

  const renvoyer = async () => {
    setChargement(true);
    try {
      const r = await invitesApi.renvoyerBadge(email.trim(), code.trim());
      toast.success(r.message || 'Votre badge a été renvoyé par e-mail.');
      setCode('');
    } catch (e) {
      toast.error(messageErreur(e));
    } finally {
      setChargement(false);
    }
  };

  return (
    <div className="space-y-3 text-left">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre e-mail d'inscription"
        className={champ}
      />
      {!codeEnvoye ? (
        <button
          type="button"
          onClick={demanderCode}
          disabled={chargement || !email.trim()}
          className="w-full min-h-[44px] rounded-[12px] bg-[#0A1430] text-white font-bold text-[14px] disabled:opacity-50"
        >
          {chargement ? 'Envoi...' : 'Recevoir un code'}
        </button>
      ) : (
        <>
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
            placeholder="Code à 6 chiffres"
            className={champ}
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={renvoyer}
              disabled={chargement || code.length !== 6}
              className="flex-1 min-h-[44px] rounded-[12px] bg-[#0A1430] text-white font-bold text-[14px] disabled:opacity-50"
            >
              {chargement ? 'Envoi...' : 'Renvoyer mon badge'}
            </button>
            <button
              type="button"
              onClick={demanderCode}
              disabled={chargement}
              className="px-3 min-h-[44px] rounded-[12px] bg-slate-100 text-[#0A1430] font-bold text-[13px]"
            >
              Nouveau code
            </button>
          </div>
        </>
      )}
    </div>
  );
}
