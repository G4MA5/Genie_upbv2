import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, XCircle, Info, ShieldCheck } from 'lucide-react';

interface AttendanceRow {
  title: string;
  date: string;
  status: 'Présent' | 'En retard' | 'Absent';
  bg: string;
  fg: string;
  room: string;
}

export default function AssiduitePresence() {
  const attendanceList: AttendanceRow[] = [
    {
      title: 'Atelier pitch : convaincre en 7 minutes',
      date: '4 janv. 2027',
      status: 'Présent',
      bg: '#DFF2E7',
      fg: '#17744B',
      room: 'À distance (Connexion validée 13:58)',
    },
    {
      title: 'Lancement des formations & esprit d’équipe',
      date: '21 déc. 2026',
      status: 'Présent',
      bg: '#DFF2E7',
      fg: '#17744B',
      room: 'Amphi A (Badge scanné 08:52)',
    },
    {
      title: 'Méthodes de créativité et idéation',
      date: '22 déc. 2026',
      status: 'En retard',
      bg: '#FBEFD2',
      fg: '#8A5A00',
      room: 'Salle 14 (Émargement manuel 09:25)',
    },
    {
      title: 'Étude de marché & validation terrain',
      date: '28 déc. 2026',
      status: 'Absent',
      bg: '#FBE6E3',
      fg: '#B4281F',
      room: 'Séance en replay disponible',
    },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-16">
      {/* 1. RETOUR & TITRE */}
      <div className="flex items-center gap-4">
        <Link
          to="/espace/formations"
          className="w-11 h-11 rounded-full bg-white text-[#0E1E4A] border border-slate-200 flex items-center justify-center font-bold text-lg shadow-sm hover:scale-105 active:scale-95 transition-all"
          title="Retour aux formations"
        >
          ←
        </Link>
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#E8742A]">
            Suivi Présences • P5d
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0E1E4A] tracking-tight">
            Mon assiduité
          </h1>
        </div>
      </div>

      {/* 2. GAUGES CIRCULAIRES COMPARATIVES (Moi 88% vs Mon équipe 74%) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Gauge Moi */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center shadow-inner"
            style={{
              background: 'conic-gradient(#17744B 0 88%, #EEECE6 88%)',
            }}
          >
            <div className="w-22 h-22 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-black text-[#0E1E4A]">88 %</span>
              <span className="text-[10px] font-bold text-emerald-600 uppercase">Éligible</span>
            </div>
          </div>
          <span className="font-bold text-sm text-[#4A5168]">
            Mon taux individuel
          </span>
        </div>

        {/* Gauge Mon équipe */}
        <div className="bg-white rounded-[24px] p-6 border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-3">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center shadow-inner"
            style={{
              background: 'conic-gradient(#E8B33D 0 74%, #EEECE6 74%)',
            }}
          >
            <div className="w-22 h-22 rounded-full bg-white flex flex-col items-center justify-center shadow-sm">
              <span className="text-2xl font-black text-[#0E1E4A]">74 %</span>
              <span className="text-[10px] font-bold text-amber-600 uppercase">À surveiller</span>
            </div>
          </div>
          <span className="font-bold text-sm text-[#4A5168]">
            Moyenne de l'équipe
          </span>
        </div>
      </div>

      {/* 3. ALERTE RÈGLE D'ÉMARGEMENT */}
      <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[#E9ECF5] text-[#0E1E4A] font-medium text-sm leading-relaxed border border-blue-100 shadow-sm">
        <span className="w-6 h-6 rounded-full bg-[#0E1E4A] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          i
        </span>
        <span>
          <strong className="font-extrabold">Présentiel :</strong> badge scanné à l'entrée par les formateurs. <strong className="font-extrabold">À distance :</strong> présence enregistrée à la connexion sur la plateforme.
        </span>
      </div>

      {/* 4. HISTORIQUE DÉTAILLÉ DES SÉANCES & STATUTS */}
      <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm divide-y divide-slate-100">
        <div className="p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-extrabold text-sm sm:text-base text-[#0E1E4A]">
            Relevé officiel des séances
          </h3>
          <span className="text-xs font-mono font-bold text-slate-500">
            3 validées / 4 tenues
          </span>
        </div>

        {attendanceList.map((item, index) => (
          <div
            key={index}
            className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <span className="font-bold text-sm sm:text-base text-[#121628]">
                {item.title}
              </span>
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#6A7189]">
                <span className="font-mono font-semibold">{item.date}</span>
                <span>•</span>
                <span>{item.room}</span>
              </div>
            </div>

            <div className="self-start sm:self-center">
              <span
                className="px-3 py-1 rounded-full font-bold text-xs inline-flex items-center gap-1.5 shadow-sm"
                style={{ backgroundColor: item.bg, color: item.fg }}
              >
                {item.status === 'Présent' && <CheckCircle2 size={13} />}
                {item.status === 'En retard' && <Clock size={13} />}
                {item.status === 'Absent' && <XCircle size={13} />}
                <span>{item.status}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 5. BLOC RASSURANCE CRITÈRE DU TOURNOI */}
      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center gap-3.5">
        <ShieldCheck className="text-emerald-600 shrink-0" size={24} />
        <p className="text-xs sm:text-sm font-medium leading-relaxed">
          Votre assiduité individuelle de <strong>88%</strong> dépasse le seuil réglementaire de <strong>80%</strong>. Votre droit de passage devant le jury est sécurisé.
        </p>
      </div>
    </div>
  );
}
