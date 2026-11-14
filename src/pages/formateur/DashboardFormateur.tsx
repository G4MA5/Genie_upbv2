import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Calendar, FileText, MessageSquare, Clock, MapPin, Users, ArrowRight, Sparkles } from 'lucide-react';

interface SessionCard {
  id: string;
  day: string;
  time: string;
  title: string;
  details: string;
  now: boolean;
  bg: string;
  fg: string;
  sub: string;
}

export default function DashboardFormateur() {
  const sessions: SessionCard[] = [
    {
      id: 'f1',
      day: 'Aujourd’hui',
      time: '09:00',
      title: 'Prototypage rapide et maquettes',
      details: 'Fablab, bât. C · 18 inscrits',
      now: true,
      bg: '#0E1E4A',
      fg: '#ffffff',
      sub: '#C9D1E8',
    },
    {
      id: 'f2',
      day: 'Mardi 12 janv.',
      time: '14:00',
      title: 'Préparer sa démo et tests utilisateurs',
      details: 'Salle 12 · 18 inscrits',
      now: false,
      bg: '#ffffff',
      fg: '#0E1E4A',
      sub: '#6A7189',
    },
    {
      id: 'f3',
      day: 'Jeudi 14 janv.',
      time: '17:00',
      title: 'Session pitch à blanc & retours critiques',
      details: 'À distance (Visioconférence) · 18 inscrits',
      now: false,
      bg: '#ffffff',
      fg: '#0E1E4A',
      sub: '#6A7189',
    },
  ];

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-4xl mx-auto w-full animate-fadeIn pb-12">
      {/* 1. ENTÊTE AVEC TAG FORMATRICE INNOVATION (Exact Prototype F1) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-base font-medium text-[#6A7189]">Bonjour,</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0E1E4A] tracking-tight">
            Mme Konan
          </h1>
        </div>

        <div className="self-start sm:self-center">
          <span className="px-4 py-2 rounded-full bg-white border border-[#F58220]/30 text-[#F58220] font-extrabold text-xs sm:text-sm shadow-sm inline-flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#F58220]" />
            Formatrice · Innovation
          </span>
        </div>
      </div>

      {/* 2. SESSIONS PROGRAMMÉES (CARTE ACTIVE BLEU FONCÉ AVEC BOUTON ORANGE) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-[#0E1E4A]">Mes séances programmées</h2>
          <Link
            to="/formateur/seances"
            className="text-xs font-bold text-[#2F6BF0] hover:underline flex items-center gap-1"
          >
            <span>Voir le calendrier complet</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {sessions.map(s => (
            <div
              key={s.id}
              className="rounded-[24px] p-6 shadow-sm border border-slate-100 flex flex-col gap-3 transition-all"
              style={{
                backgroundColor: s.bg,
                color: s.fg,
                backgroundImage: s.now
                  ? 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)'
                  : 'none',
                backgroundSize: '24px 24px',
              }}
            >
              <div className="flex justify-between items-center text-xs font-mono font-bold" style={{ color: s.sub }}>
                <span>{s.day} · {s.time}</span>
                {s.now && (
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-sans font-extrabold text-[11px] uppercase tracking-wider">
                    En cours / Aujourd'hui
                  </span>
                )}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black leading-snug">
                  {s.title}
                </h3>
                <p className="text-sm font-medium" style={{ color: s.sub }}>
                  {s.details}
                </p>
              </div>

              {s.now ? (
                <div className="pt-2">
                  <Link
                    to="/formateur/seances/scan-qr"
                    className="min-h-[50px] px-6 rounded-2xl bg-gradient-to-b from-[#FF9A3D] to-[#E8621A] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/30 hover:scale-[1.01] active:scale-95 transition-all"
                  >
                    <QrCode size={20} />
                    <span>Prendre les présences (Scan QR)</span>
                  </Link>
                </div>
              ) : (
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">18 équipes inscrites</span>
                  <Link
                    to="/formateur/seances"
                    className="text-xs font-bold text-[#0E1E4A] hover:underline"
                  >
                    Détails de la séance →
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. BENTO ACCÈS RAPIDE FORMATEUR */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <Link
          to="/formateur/seances"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[110px] group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#2F6BF0] flex items-center justify-center group-hover:scale-105 transition-transform">
            <Calendar size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A]">Planning & Salles</h4>
            <span className="text-xs text-slate-400">Janvier 2027</span>
          </div>
        </Link>

        <Link
          to="/formateur/supports"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[110px] group"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A]">Publier un Support</h4>
            <span className="text-xs text-slate-400">PDF, Gabarits, Liens</span>
          </div>
        </Link>

        <Link
          to="/formateur/annonces"
          className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between min-h-[110px] group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#BE185D] flex items-center justify-center group-hover:scale-105 transition-transform">
            <MessageSquare size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-base text-[#0E1E4A]">Questions & Annonces</h4>
            <span className="text-xs text-slate-400">1 question en attente</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
