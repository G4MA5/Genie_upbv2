import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ArrowLeft, Info } from 'lucide-react';

/**
 * ============================================================================
 * P5d : ASSIDUITÉ ET PRÉSENCE (ESPACE PARTICIPANT)
 * ============================================================================
 * Affichage des présences réelles de l'étudiant :
 * - Cadrans d'assiduité (0% / en attente avant le début des ateliers)
 * - Notice d'explication du pointage
 * - Historique des émargements (état vide avant le démarrage des formations)
 */

interface AttendanceRecord {
  id: string;
  t: string;
  d: string;
  s: string;
  bg: string;
  fg: string;
}

// Liste réelle d'émargements : initialement vide avant le démarrage effectif des ateliers
const ATTENDANCE_LIST: AttendanceRecord[] = [];

export default function AssiduitePresence() {
  const navigate = useNavigate();
  const totalSessions = ATTENDANCE_LIST.length;
  const presentCount = ATTENDANCE_LIST.filter((a) => a.s === 'Présent').length;
  const assiduiteMoi = totalSessions > 0 ? Math.round((presentCount / totalSessions) * 100) : null;

  return (
    <div className="flex-1 w-full min-h-screen bg-[#F6F8FC] flex flex-col font-['Nunito',sans-serif] animate-fadeIn">
      {/* Conteneur 100% pleine largeur fluide sans contrainte étroite */}
      <div className="w-full flex-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-14 pt-20 md:pt-8 pb-28 md:pb-16 flex flex-col gap-6">
        
        {/* En-tête : Bouton retour en rond */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/espace/formations')}
            className="w-[46px] h-[46px] rounded-full bg-white shadow-[0_4px_12px_rgba(10,20,48,0.06)] border border-[#EEF1F7] flex items-center justify-center text-[#0A1430] cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            aria-label="Retour"
          >
            <ArrowLeft size={20} strokeWidth={2.5} />
          </button>

          <h1 className="m-0 font-black text-[32px] md:text-[36px] leading-[1.05] text-[#0A1430] tracking-[-0.02em]">
            Mon assiduité
          </h1>
        </div>

        {/* Grille 2 colonnes équilibrée sur grand écran */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          
          {/* Colonne 1 : Deux cadrans donut conic + Notice */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Cadran 1 : Moi */}
              <div className="bg-white rounded-[24px] p-6 flex flex-col items-center gap-3 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
                <div
                  className="w-[104px] h-[104px] rounded-full flex items-center justify-center"
                  style={{
                    background: assiduiteMoi !== null
                      ? `conic-gradient(#17744B 0 ${assiduiteMoi}%, #EEECE6 ${assiduiteMoi}%)`
                      : '#EEECE6',
                  }}
                >
                  <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center font-black text-[22px] text-[#0A1430]">
                    {assiduiteMoi !== null ? `${assiduiteMoi} %` : '—'}
                  </div>
                </div>
                <span className="font-extrabold text-[16px] text-[#0A1430]">Moi</span>
                <span className="font-medium text-[12px] text-[#6A7189] -mt-1">
                  {totalSessions > 0 ? `${presentCount}/${totalSessions} séance(s)` : 'En attente'}
                </span>
              </div>

              {/* Cadran 2 : Mon équipe */}
              <div className="bg-white rounded-[24px] p-6 flex flex-col items-center gap-3 shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7]">
                <div
                  className="w-[104px] h-[104px] rounded-full flex items-center justify-center"
                  style={{
                    background: totalSessions > 0
                      ? 'conic-gradient(#E8B33D 0 0%, #EEECE6 0%)'
                      : '#EEECE6',
                  }}
                >
                  <div className="w-[80px] h-[80px] rounded-full bg-white flex items-center justify-center font-black text-[22px] text-[#0A1430]">
                    —
                  </div>
                </div>
                <span className="font-extrabold text-[16px] text-[#0A1430]">Mon équipe</span>
                <span className="font-medium text-[12px] text-[#6A7189] -mt-1">
                  En attente
                </span>
              </div>
            </div>

            {/* Notice explicative */}
            <div className="flex gap-3 p-4 px-5 rounded-[20px] bg-[#E9ECF5] text-[#0A1430] font-medium text-[15px] leading-[1.5] shadow-sm items-start">
              <Info size={18} className="shrink-0 text-[#2F6BF0] mt-0.5" />
              <span>
                Présentiel : badge scanné à l'entrée par le formateur. À distance : présence enregistrée automatiquement à la connexion.
              </span>
            </div>
          </div>

          {/* Colonne 2 : Liste des émargements */}
          <div className="bg-white rounded-[24px] overflow-hidden shadow-[0_6px_20px_rgba(10,20,48,0.04)] border border-[#EEF1F7] flex flex-col">
            <div className="p-4 px-5 border-b border-[#F2F0EA]">
              <span className="font-semibold text-[12px] font-mono tracking-[0.06em] text-[#6A7189]">
                HISTORIQUE DES ÉMARGEMENTS
              </span>
            </div>

            {ATTENDANCE_LIST.length > 0 ? (
              ATTENDANCE_LIST.map((a, idx) => (
                <div
                  key={a.id}
                  className={`min-h-[68px] p-4 px-5 flex gap-3.5 items-center ${
                    idx > 0 ? 'border-t border-[#F2F0EA]' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <span className="font-bold text-[16px] text-[#121628] leading-snug truncate">
                      {a.t}
                    </span>
                    <span className="font-medium text-[13px] text-[#6A7189] truncate">
                      {a.d}
                    </span>
                  </div>
                  <span
                    style={{ backgroundColor: a.bg, color: a.fg }}
                    className="px-3 py-1 rounded-full font-black text-[13px] shrink-0"
                  >
                    {a.s}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#F3F6FD] text-[#2F6BF0] flex items-center justify-center">
                  <ClipboardCheck size={26} strokeWidth={2.2} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-extrabold text-[17px] text-[#0A1430]">
                    Aucune présence enregistrée pour le moment
                  </span>
                  <span className="font-medium text-[14px] text-[#6A7189] max-w-[380px] leading-relaxed">
                    Les ateliers de formation débuteront prochainement. Vos émargements apparaîtront ici automatiquement dès votre première séance.
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      <div aria-hidden="true" className="h-[90px] shrink-0" />
    </div>
  );
}
