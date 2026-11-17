import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * ============================================================================
 * P3c : GESTION DES MEMBRES DE L'ÉQUIPE (ESPACE PARTICIPANT)
 * ============================================================================
 * Reproduction 1:1 intégrale du prototype officiel (Prototype (4).html L19602902) :
 * - Bouton retour `←` + bouton "+ Inviter" en pilule (#0E1E4A)
 * - Tag catégorie "LES BÂTISSEURS · INNOVATION" et titre "Membres"
 * - Donut jauge d'effectif "3/4" avec message "Encore 1 membre (4 à 6 requis)"
 * - Liste des membres avec badge "Chef" et bouton "Retirer" en grille fluide 2 colonnes
 * - Section "INVITATIONS ENVOYÉES" en tirets avec badge "En attente" en grille 2 colonnes
 * - Modal officielle de retrait avec sélection de motif, avertissement et lien vers P3r
 * - Bottom-sheet d'invitation avec recherche d'étudiants par matricule/nom et validation
 * 100% pleine largeur sur grand écran.
 */

interface Member {
  id: string;
  name: string;
  meta: string;
  i: string;
  bg: string;
  isChef?: boolean;
}

interface PendingInvite {
  id: string;
  name: string;
  meta: string;
  i: string;
}

interface SearchStudent {
  id: string;
  name: string;
  meta: string;
  i: string;
  av: string;
}

const INITIAL_MEMBERS: Member[] = [
  {
    id: 'm-1',
    name: 'Aya Kouassi',
    meta: 'L2 · MIAGE · Capitaine',
    i: 'AK',
    bg: '#F58220',
    isChef: true,
  },
  {
    id: 'm-2',
    name: 'Moussa Diallo',
    meta: 'L2 · Génie Civil',
    i: 'MD',
    bg: '#2F6BF0',
  },
  {
    id: 'm-3',
    name: 'Fatou Touré',
    meta: 'L1 · Économie',
    i: 'FT',
    bg: '#00875A',
  },
];

const INITIAL_PENDING: PendingInvite[] = [
  {
    id: 'p-1',
    name: 'Franck Kouamé',
    meta: 'L2 · Math-Info · Invité aujourd’hui',
    i: 'FK',
  },
];

const SEARCH_STUDENTS: SearchStudent[] = [
  {
    id: 's-1',
    name: 'Koffi Jean-Luc',
    meta: 'L2 · Informatique · UPB2026-4412',
    i: 'KJ',
    av: '#8E44AD',
  },
  {
    id: 's-2',
    name: 'Bamba Salimata',
    meta: 'L1 · Mathématiques · UPB2026-9021',
    i: 'BS',
    av: '#2F6BF0',
  },
  {
    id: 's-3',
    name: 'Yao Emmanuel',
    meta: 'L3 · Électronique · UPB2026-7833',
    i: 'YE',
    av: '#00875A',
  },
];

export default function MembresEquipe() {
  const navigate = useNavigate();

  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [pending, setPending] = useState<PendingInvite[]>(INITIAL_PENDING);

  // État du modal de retrait
  const [rmTarget, setRmTarget] = useState<Member | null>(null);
  const [rmReason, setRmReason] = useState('Plus de nouvelles');

  // État du bottom sheet d'invitation
  const [invOpen, setInvOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  // Notification toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Confirmation de retrait
  const handleConfirmRemove = () => {
    if (!rmTarget) return;
    const targetName = rmTarget.name;
    setMembers((prev) => prev.filter((m) => m.id !== rmTarget.id));
    setRmTarget(null);
    showToast(`${targetName} a été retiré de l'équipe`);
  };

  // Envoi d'invitation
  const handleSendInvite = () => {
    const student = SEARCH_STUDENTS.find((s) => s.id === selectedStudent);
    if (!student) return;
    setPending((prev) => [
      ...prev,
      {
        id: `p-${Date.now()}`,
        name: student.name,
        meta: `${student.meta.split('·')[0].trim()} · Invité à l'instant`,
        i: student.i,
      },
    ]);
    setSelectedStudent(null);
    setSearchQuery('');
    setInvOpen(false);
    showToast(`Invitation envoyée à ${student.name}`);
  };

  const filteredStudents = SEARCH_STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.meta.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn relative">
      
      {/* ====================================================================
          MODAL DE RETRAIT DE MEMBRE
          ==================================================================== */}
      {rmTarget && (
        <div
          onClick={() => setRmTarget(null)}
          className="fixed inset-0 z-[520] bg-[#0A1430]/55 backdrop-blur-[6px] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] bg-white rounded-[28px] p-6 flex flex-col gap-4 shadow-[0_30px_60px_rgba(0,0,0,0.3)] animate-scaleIn border border-[#EEF1F7]"
          >
            {/* Header modal */}
            <div className="flex items-center gap-3.5">
              <span className="w-14 h-14 rounded-full bg-[#FFE4E0] text-[#C8372D] grid place-items-center font-extrabold text-[18px]">
                {rmTarget.i}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="font-extrabold text-[21px] leading-[1.15] text-[#0A1430]">
                  Retirer {rmTarget.name} ?
                </span>
                <span className="font-medium text-[14px] text-[#6A7189]">
                  de l'équipe Les Bâtisseurs
                </span>
              </div>
            </div>

            {/* Motif */}
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
              MOTIF (FACULTATIF)
            </span>
            <div className="flex flex-wrap gap-2">
              {['Plus de nouvelles', 'Changement d’équipe', 'Autre'].map((r) => {
                const isPicked = rmReason === r;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRmReason(r)}
                    className={`min-h-[40px] px-4 rounded-full border-2 font-bold text-[14px] cursor-pointer transition-colors ${
                      isPicked
                        ? 'border-[#0A1430] bg-[#0A1430] text-white'
                        : 'border-[#E3E8F0] bg-white text-[#0A1430] hover:border-slate-400'
                    }`}
                  >
                    {r}
                  </button>
                );
              })}
            </div>

            {/* Info notice */}
            <div className="flex gap-2.5 p-3.5 rounded-[16px] bg-[#F3F6FD] font-medium text-[14px] leading-[1.45] text-[#3D4459]">
              <span className="font-extrabold text-[#2F63D0]">i</span>
              <span>
                {rmTarget.name} recevra une notification et pourra rejoindre une autre équipe. L'équipe repassera à 2 membres sur 4 requis.
              </span>
            </div>

            {/* Boutons Annuler / Retirer */}
            <div className="flex gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setRmTarget(null)}
                className="flex-1 min-h-[52px] rounded-[16px] border-2 border-[#E3E8F0] text-[#0A1430] font-extrabold text-[16px] flex items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleConfirmRemove}
                className="flex-[1.3] min-h-[52px] rounded-[16px] bg-[#C8372D] text-white font-extrabold text-[16px] flex items-center justify-center cursor-pointer shadow-[0_8px_20px_rgba(200,55,45,0.3)] hover:bg-[#B4281F] transition-colors"
              >
                Retirer
              </button>
            </div>

            {/* Lien direct pour tester l'écran retiré */}
            <button
              type="button"
              onClick={() => navigate('/espace/equipe?state=removed')}
              className="text-center font-bold text-[14px] text-[#2F63D0] cursor-pointer underline hover:text-[#1D4FD8] pt-1"
            >
              Voir l'écran reçu par {rmTarget.name} →
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          BOTTOM SHEET D'INVITATION (invShow)
          ==================================================================== */}
      {invOpen && (
        <div
          onClick={() => setInvOpen(false)}
          className="fixed inset-0 z-[500] bg-[#0A1430]/55 backdrop-blur-[6px] flex items-end justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[580px] max-h-[86vh] bg-[#F6F8FC] rounded-t-[32px] p-6 pb-8 pt-4 flex flex-col gap-4 shadow-[0_-20px_50px_rgba(0,0,0,0.25)] animate-slideUp"
          >
            {/* Poignée de drag */}
            <span className="self-center w-12 h-1.5 rounded-full bg-[#D6D2C8]" />

            {/* Titre et fermeture */}
            <div className="flex justify-between items-center">
              <h3 className="m-0 font-black text-[26px] text-[#0A1430]">
                Inviter des membres
              </h3>
              <button
                type="button"
                onClick={() => setInvOpen(false)}
                className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#EEF1F7] grid place-items-center font-bold text-[18px] text-[#0A1430] cursor-pointer hover:bg-slate-50"
              >
                ×
              </button>
            </div>

            {/* Champ de recherche */}
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[18px] text-[#6A7189]">
                ⌕
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Nom ou matricule UPB"
                className="w-full min-h-[56px] rounded-[18px] border-2 border-transparent bg-white pl-11 pr-4 font-semibold text-[17px] text-[#0A1430] outline-none shadow-[0_6px_16px_rgba(14,30,74,0.06)] focus:border-[#2F63D0]"
              />
            </div>

            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
              RECHERCHE D'ÉTUDIANTS ÉLIGIBLES
            </span>

            {/* Liste des résultats */}
            <div className="flex-1 min-h-[160px] max-h-[300px] overflow-y-auto flex flex-col gap-2">
              {filteredStudents.map((st) => {
                const isSelected = selectedStudent === st.id;
                return (
                  <div
                    key={st.id}
                    onClick={() => setSelectedStudent(isSelected ? null : st.id)}
                    className={`flex gap-3.5 items-center p-3 px-4 rounded-[18px] bg-white border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#2F63D0] shadow-sm'
                        : 'border-transparent hover:border-slate-200'
                    }`}
                  >
                    <span
                      style={{ backgroundColor: st.av }}
                      className="w-11 h-11 shrink-0 rounded-full text-white grid place-items-center font-extrabold text-[15px]"
                    >
                      {st.i}
                    </span>
                    <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                      <span className="font-bold text-[16px] text-[#0A1430] truncate">
                        {st.name}
                      </span>
                      <span className="font-medium text-[13px] text-[#6A7189] truncate">
                        {st.meta}
                      </span>
                    </div>
                    <span
                      className={`w-7 h-7 rounded-full border-2 grid place-items-center font-extrabold text-[12px] transition-colors ${
                        isSelected
                          ? 'border-[#2F63D0] bg-[#2F63D0] text-white'
                          : 'border-slate-300 bg-white text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                );
              })}

              {filteredStudents.length === 0 && (
                <div className="py-8 px-4 text-center font-medium text-[15px] text-[#6A7189]">
                  Aucun étudiant trouvé. Vérifie l'orthographe ou le matricule UPB.
                </div>
              )}
            </div>

            {/* Bouton d'action envoi */}
            <button
              type="button"
              disabled={!selectedStudent}
              onClick={handleSendInvite}
              className={`min-h-[58px] rounded-[20px] font-extrabold text-[17px] flex items-center justify-center gap-2.5 cursor-pointer transition-all duration-300 shadow-md ${
                selectedStudent
                  ? 'bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-[#0A1430] shadow-[0_10px_22px_rgba(232,98,26,0.3)] hover:scale-[1.01]'
                  : 'bg-[#E3E8F0] text-[#8E9BBF] cursor-not-allowed'
              }`}
            >
              Envoyer l'invitation {selectedStudent ? '(1)' : ''}
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          TOAST FLOTTANT
          ==================================================================== */}
      {toastMsg && (
        <div className="fixed left-1/2 bottom-[100px] -translate-x-1/2 z-[600] px-5 py-3.5 rounded-full bg-[#0A1430] text-white font-bold text-[15px] shadow-[0_14px_30px_rgba(0,0,0,0.3)] whitespace-nowrap animate-badgeIn">
          ✓ {toastMsg}
        </div>
      )}

      {/* ====================================================================
          CONTENU DE LA PAGE MEMBRES (100% pleine largeur fluide)
          ==================================================================== */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* Barre d'action supérieure */}
        <div className="flex justify-between items-center w-full">
          <button
            type="button"
            onClick={() => navigate('/espace/equipe?state=team')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center font-bold text-[20px] text-[#0E1E4A] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setInvOpen(true)}
            className="min-h-[46px] px-5 rounded-full bg-[#0E1E4A] text-white font-bold text-[16px] flex items-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-transform"
          >
            + Inviter
          </button>
        </div>

        {/* Titres */}
        <div className="flex flex-col gap-1">
          <span className="font-bold text-[14px] text-[#F58220] tracking-wider uppercase">
            LES BÂTISSEURS · INNOVATION
          </span>
          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-none text-[#0E1E4A] tracking-[-0.02em]">
            Membres
          </h1>
        </div>

        {/* Jauge d'effectif avec donut chart */}
        <div className="w-full bg-white rounded-[22px] p-5 flex gap-5 items-center shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
          {/* Cercle jauge conic */}
          <div className="relative w-[76px] h-[76px] rounded-full bg-[conic-gradient(#E8B33D_0_75%,#EEECE6_75%)] flex items-center justify-center shrink-0">
            <div className="w-15 h-15 rounded-full bg-white flex items-center justify-center font-black text-[22px] text-[#0E1E4A]">
              {members.length}/4
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1">
            <span className="font-extrabold text-[17px] text-[#0E1E4A]">
              {members.length < 4
                ? `Encore ${4 - members.length} membre${4 - members.length > 1 ? 's' : ''}`
                : 'Effectif complet'}
            </span>
            <span className="font-medium text-[15px] leading-[1.4] text-[#6A7189]">
              Il faut 4 à 6 membres pour soumettre l'équipe.
            </span>
          </div>
        </div>

        {/* Liste des membres actifs en grille 2 colonnes */}
        <div className="w-full flex flex-col gap-3">
          <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
            MEMBRES ACTIFS ({members.length})
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
            {members.map((mb) => (
              <div
                key={mb.id}
                className="bg-white rounded-[20px] p-4 px-4.5 flex gap-3.5 items-center shadow-sm border border-[#EEF1F7] hover:shadow-[0_8px_20px_rgba(10,20,48,0.06)] transition-shadow"
              >
                <span
                  style={{ backgroundColor: mb.bg }}
                  className="w-12 h-12 shrink-0 rounded-full text-white font-black text-[16px] flex items-center justify-center shadow-sm"
                >
                  {mb.i}
                </span>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="font-bold text-[16px] text-[#121628] truncate">
                    {mb.name}
                  </span>
                  <span className="font-medium text-[14px] text-[#6A7189] truncate">
                    {mb.meta}
                  </span>
                </div>

                {mb.isChef ? (
                  <span className="px-3 py-1 rounded-full bg-[#FBEFD2] text-[#8A5A00] font-black text-[13px] shrink-0">
                    Chef
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setRmTarget(mb)}
                    className="min-h-[40px] px-3.5 rounded-[12px] border-[1.5px] border-[#F0C9C4] text-[#B4281F] font-bold text-[14px] flex items-center justify-center cursor-pointer hover:bg-red-50 active:scale-95 transition-all"
                  >
                    Retirer
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section INVITATIONS ENVOYÉES */}
        {pending.length > 0 && (
          <div className="w-full flex flex-col gap-3 mt-2">
            <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189] px-1">
              INVITATIONS ENVOYÉES ({pending.length})
            </span>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full">
              {pending.map((pv) => (
                <div
                  key={pv.id}
                  className="bg-white border-[1.5px] border-dashed border-[#C9D3EA] rounded-[20px] p-4 px-4.5 flex gap-3.5 items-center shadow-sm"
                >
                  <span className="w-11 h-11 shrink-0 rounded-full bg-[#E3EBFB] text-[#2F63D0] grid place-items-center font-black text-[15px]">
                    {pv.i}
                  </span>
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="font-bold text-[16px] text-[#0A1430] truncate">
                      {pv.name}
                    </span>
                    <span className="font-medium text-[13px] text-[#6A7189] truncate">
                      {pv.meta}
                    </span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FFF3C2] text-[#8A5A00] font-black text-[13px] shrink-0">
                    En attente
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
