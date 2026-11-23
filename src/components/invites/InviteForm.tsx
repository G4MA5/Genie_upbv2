import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { invitesApi } from '../../services/invites';
import { ApiError, jeton, messageErreur } from '../../services/api';
import { RenvoiBadge } from './RenvoiBadge';
import { JoursPrevus } from './JoursPrevus';

type Parcours = 'particulier' | 'entreprise' | 'compte';

const champ =
  'w-full h-11 px-3.5 rounded-[12px] border-2 border-[#D9E1EC] bg-[#F8FAFC] text-[14px] font-semibold text-[#0A1430] placeholder-[#9AA3B5] focus:outline-none focus:border-[#0A1430] focus:bg-white transition-all';
const etiquette = 'block text-[12px] font-bold text-[#3A4053] uppercase mb-1';

function Champ(props: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  requis?: boolean;
}) {
  return (
    <div>
      <label className={etiquette}>
        {props.label} {props.requis !== false && <span className="text-red-500">*</span>}
      </label>
      <input
        type={props.type ?? 'text'}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className={champ}
      />
    </div>
  );
}

/**
 * Inscription d'un invite (hors etudiant UPB sans compte, gere par la carte principale).
 * Parcours : particulier / entreprise (code par e-mail) ou etudiant UPB connecte (inscription-compte).
 */
export function InviteForm({ onClose }: { onClose: () => void }) {
  const connecte = !!jeton.lire();
  const [parcours, setParcours] = useState<Parcours>('particulier');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [statut, setStatut] = useState('');
  const [entreprise, setEntreprise] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [code, setCode] = useState('');
  const [consentement, setConsentement] = useState(false);
  const [jours, setJours] = useState<string[]>([]);
  const [codeEnvoye, setCodeEnvoye] = useState(false);
  const [chargement, setChargement] = useState(false);
  const setInfo = (m: string | null) => {
    if (m) toast.success(m);
  };
  const setErreur = (m: string | null) => {
    if (m) toast.error(m);
  };
  const [codeInvalide, setCodeInvalide] = useState(false);
  const [succes, setSucces] = useState<{ message: string; emailEnvoye: boolean } | null>(null);

  const envoyerCode = async () => {
    setErreur(null);
    setInfo(null);
    setChargement(true);
    try {
      const r = await invitesApi.envoyerCode(email.trim());
      setCodeEnvoye(true);
      setCodeInvalide(false);
      setInfo(r.message);
    } catch (e) {
      setErreur(messageErreur(e));
    } finally {
      setChargement(false);
    }
  };

  const soumettre = async (e: React.FormEvent) => {
    e.preventDefault();
    setErreur(null);
    setInfo(null);
    if (!consentement) {
      setErreur('Vous devez accepter l\'utilisation de vos données pour continuer.');
      return;
    }
    setChargement(true);
    try {
      let r;
      if (parcours === 'compte') {
        r = await invitesApi.inscrireAvecCompte({
          consentement: true,
          ...(jours.length ? { jours_prevus: jours } : {}),
          ...(numero.trim() ? { numero: numero.trim() } : {}),
        });
      } else {
        r = await invitesApi.inscrire({
          type_invite: parcours,
          email: email.trim(),
          numero: numero.trim(),
          code: code.trim(),
          consentement: true,
          ...(jours.length ? { jours_prevus: jours } : {}),
          ...(parcours === 'particulier'
            ? { nom: nom.trim(), prenom: prenom.trim(), statut: statut.trim() }
            : { nom_entreprise: entreprise.trim(), nom: nom.trim(), prenom: prenom.trim() }),
        });
      }
      setSucces({ message: r.message, emailEnvoye: r.email_envoye });
      toast.success('Inscription validée !');
    } catch (err) {
      if (err instanceof ApiError && err.code === 'code_invalide') {
        setCodeInvalide(true);
        setErreur(`${messageErreur(err)} Demandez un nouveau code.`);
      } else {
        setErreur(messageErreur(err));
      }
    } finally {
      setChargement(false);
    }
  };

  if (succes) {
    return (
      <div className="text-center py-3">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4">
          <CheckCircle2 size={36} strokeWidth={2.5} />
        </div>
        <h3 className="text-[22px] font-black text-[#0A1430]">Inscription validée</h3>
        <p className="text-[14px] text-[#555E77] mt-1 mb-5">
          {succes.emailEnvoye
            ? 'Votre badge vous a été envoyé par e-mail.'
            : 'Votre inscription est valable, mais l\'e-mail n\'a pas pu être envoyé. Vous pouvez demander le renvoi de votre badge.'}
        </p>
        {!succes.emailEnvoye && (
          <div className="mb-5">
            <RenvoiBadge emailInitial={email} />
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] px-4 rounded-[12px] bg-slate-100 hover:bg-slate-200 text-[#0A1430] font-bold text-[14px] transition-colors"
        >
          Fermer
        </button>
      </div>
    );
  }

  const onglet = (id: Parcours, libelle: string) => (
    <button
      type="button"
      onClick={() => {
        setParcours(id);
        setErreur(null);
        setInfo(null);
      }}
      className={`flex-1 min-h-[38px] rounded-[10px] text-[12px] font-extrabold transition-colors ${
        parcours === id ? 'bg-[#0A1430] text-white' : 'bg-slate-100 text-[#0A1430] hover:bg-slate-200'
      }`}
    >
      {libelle}
    </button>
  );

  return (
    <>
      <div className="mb-4">
        <h2 className="text-[22px] sm:text-[24px] font-black tracking-tight text-[#0A1430]">
          S'inscrire en tant qu'invité
        </h2>
        <p className="text-[13px] text-[#555E77] mt-1 leading-relaxed">
          Un badge nominatif vous sera envoyé par e-mail. Un étudiant d'une autre école s'inscrit comme particulier.
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        {onglet('particulier', 'Particulier')}
        {onglet('entreprise', 'Entreprise')}
        {onglet('compte', 'Mon compte UPB')}
      </div>

      <form onSubmit={soumettre} className="space-y-3">
        {parcours === 'compte' ? (
          connecte ? (
            <>
              <p className="text-[13px] text-[#555E77]">
                Vous êtes connecté : votre inscription utilisera votre compte Genie UPB.
              </p>
              <Champ
                label="Téléphone"
                type="tel"
                value={numero}
                onChange={setNumero}
                placeholder="Seulement si absent de votre profil"
                requis={false}
              />
            </>
          ) : (
            <p className="text-[13px] text-[#555E77]">
              Cette inscription demande d'être connecté.{' '}
              <Link to="/connexion" className="font-extrabold underline text-[#0A1430]">
                Se connecter
              </Link>
            </p>
          )
        ) : (
          <>
            {parcours === 'entreprise' && (
              <Champ label="Nom de l'entreprise" value={entreprise} onChange={setEntreprise} />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Champ label="Nom" value={nom} onChange={setNom} placeholder="Ex: Kouassi" />
              <Champ label="Prénom" value={prenom} onChange={setPrenom} placeholder="Ex: Jean-Eudes" />
            </div>
            {parcours === 'particulier' && (
              <Champ
                label="Statut"
                value={statut}
                onChange={setStatut}
                placeholder="Parent, prestataire, étudiant d'une autre école..."
              />
            )}
            <Champ label="E-mail" type="email" value={email} onChange={setEmail} placeholder="nom@exemple.com" />
            <Champ label="Téléphone" type="tel" value={numero} onChange={setNumero} placeholder="Ex: 0707070707" />
            <div>
              <label className={etiquette}>
                Code de vérification <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="6 chiffres"
                  className={champ}
                />
                <button
                  type="button"
                  onClick={envoyerCode}
                  disabled={chargement || !email.trim()}
                  className="shrink-0 px-3 rounded-[12px] bg-[#0A1430] text-white font-bold text-[13px] disabled:opacity-50"
                >
                  {codeEnvoye || codeInvalide ? 'Nouveau code' : 'Envoyer le code'}
                </button>
              </div>
            </div>
          </>
        )}

        {(parcours !== 'compte' || connecte) && <JoursPrevus valeur={jours} onChange={setJours} />}

        {(parcours !== 'compte' || connecte) && (
          <label className="flex gap-2.5 items-start cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consentement}
              onChange={(e) => setConsentement(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#0A1430]"
            />
            <span className="text-[12px] text-[#3A4053] leading-snug">
              J'accepte l'utilisation de mes données pour le concours et le suivi de présence par QR code.
            </span>
          </label>
        )}

        {(parcours !== 'compte' || connecte) && (
          <button
            type="submit"
            disabled={chargement}
            className="w-full min-h-[48px] px-5 rounded-[14px] bg-[#0A1430] text-white font-extrabold text-[15px] flex items-center justify-between gap-3 shadow-[0_8px_20px_rgba(10,20,48,0.2)] hover:bg-[#14234b] active:scale-[0.99] transition-all disabled:opacity-60"
          >
            <span>{chargement ? 'Envoi en cours...' : 'Valider mon inscription'}</span>
            <span className="w-8 h-8 rounded-[10px] bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] grid place-items-center text-[16px] text-white">
              →
            </span>
          </button>
        )}

        <details className="pt-1 text-[12px] text-[#555E77]">
          <summary className="cursor-pointer font-bold">Déjà inscrit ? Renvoyer mon badge</summary>
          <div className="pt-3">
            <RenvoiBadge />
          </div>
        </details>
      </form>
    </>
  );
}
