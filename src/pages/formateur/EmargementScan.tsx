import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, X, Check, QrCode, ScanLine, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

interface ScannedStudent {
  id: string;
  initials: string;
  name: string;
  team: string;
  time: string;
  bg: string;
}

export default function EmargementScan() {
  const [torchOn, setTorchOn] = useState<boolean>(false);
  const [manualMatricule, setManualMatricule] = useState<string>('');
  const [lastScanned, setLastScanned] = useState<string>('Aya Kouassi · Présence enregistrée · Les Bâtisseurs');

  const [attendees, setAttendees] = useState<ScannedStudent[]>([
    { id: '1', initials: 'AK', name: 'Aya Kouassi', team: 'Les Bâtisseurs', time: '08:58', bg: '#F58220' },
    { id: '2', initials: 'MD', name: 'Moussa Diabaté', team: 'Les Bâtisseurs', time: '08:57', bg: '#2F6BF0' },
    { id: '3', initials: 'IO', name: 'Ines Ouattara', team: 'Kora Project', time: '08:55', bg: '#0D9488' },
    { id: '4', initials: 'PB', name: 'Paul Brou', team: 'Abidjan Makers', time: '08:52', bg: '#BE185D' },
  ]);

  const handleManualCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualMatricule.trim()) return;

    const newStudent: ScannedStudent = {
      id: `s-${Date.now()}`,
      initials: manualMatricule.slice(0, 2).toUpperCase(),
      name: `Étudiant (${manualMatricule.toUpperCase()})`,
      team: 'Équipe Lagune',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bg: '#2F6BF0',
    };

    setAttendees(prev => [newStudent, ...prev]);
    setLastScanned(`${newStudent.name} · Présence enregistrée · Équipe Lagune`);
    setManualMatricule('');
    toast.success('Badge émargé avec succès !');
  };

  const handleSimulateScan = () => {
    const demoStudents = [
      { initials: 'ST', name: 'Salif Traoré', team: 'AgriTech Côte d’Ivoire', bg: '#0D9488' },
      { initials: 'MK', name: 'Marc Kouadio', team: 'LegalBot CI', bg: '#BE185D' },
      { initials: 'CB', name: 'Christelle Bamba', team: 'Ivoire Santé', bg: '#F58220' },
    ];
    const picked = demoStudents[Math.floor(Math.random() * demoStudents.length)];
    const newStudent: ScannedStudent = {
      id: `s-${Date.now()}`,
      initials: picked.initials,
      name: picked.name,
      team: picked.team,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bg: picked.bg,
    };
    setAttendees(prev => [newStudent, ...prev]);
    setLastScanned(`${newStudent.name} · Présence enregistrée · ${newStudent.team}`);
    toast.success(`QR Code scanné : ${picked.name}`);
  };

  return (
    <div className="max-w-md mx-auto w-full min-h-[90vh] bg-[#0A1430] rounded-[32px] overflow-hidden flex flex-col shadow-2xl relative animate-fadeIn">
      {/* 1. ZONE DE CAMÉRA / VISEUR SCANNER (Exact Prototype F1b) */}
      <div className="relative h-[380px] bg-gradient-to-b from-[#2B3550] to-[#0A1018] flex items-center justify-center overflow-hidden">
        {/* Barre d'actions du haut */}
        <div className="absolute top-4 inset-x-4 flex justify-between items-center text-white z-20">
          <Link
            to="/formateur/dashboard"
            className="w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center font-bold text-lg transition-colors"
            title="Fermer le scanner"
          >
            <X size={20} />
          </Link>
          <span className="font-extrabold text-xs sm:text-sm text-white/90">
            Prototypage rapide · 09:00
          </span>
          <button
            onClick={() => {
              setTorchOn(!torchOn);
              toast(torchOn ? 'Lampe torche éteinte' : 'Lampe torche activée', { icon: '⚡' });
            }}
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold transition-all cursor-pointer ${
              torchOn ? 'bg-amber-400 text-slate-900 shadow-lg' : 'bg-white/15 text-white hover:bg-white/25'
            }`}
            title="Activer la torche"
          >
            <Zap size={18} />
          </button>
        </div>

        {/* Cadre de visée 220x220 avec ombre circulaire découpée */}
        <div className="relative w-[220px] h-[220px] rounded-[28px] border-4 border-[#E8B33D] shadow-[0_0_0_999px_rgba(0,0,0,0.45)] flex items-center justify-center">
          {/* Ligne laser animée */}
          <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E8B33D] to-transparent animate-pulse" />
          <ScanLine className="text-[#E8B33D]/30 w-16 h-16 animate-pulse" />
        </div>

        {/* Consigne sous le cadre */}
        <span className="absolute bottom-5 text-white/90 font-bold text-sm tracking-wide">
          Placez le QR code du badge dans le cadre
        </span>

        {/* Bouton de simulation de scan */}
        <button
          onClick={handleSimulateScan}
          className="absolute bottom-14 px-3 py-1 rounded-full bg-white/15 hover:bg-white/30 text-white font-mono text-[11px] font-bold backdrop-blur-sm transition-colors cursor-pointer"
        >
          [Simuler un scan caméra]
        </button>
      </div>

      {/* 2. VOLET BLANC / BAS DE PAGE DES PRÉSENCES (Exact Prototype F1b) */}
      <div className="flex-1 bg-[#F6F8FC] rounded-t-[28px] -mt-6 relative p-5 sm:p-6 flex flex-col gap-4">
        {/* Notification du dernier scan réussi */}
        <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#DFF2E7] text-[#17744B] shadow-sm animate-fadeIn">
          <div className="w-9 h-9 rounded-full bg-[#17744B] text-white flex items-center justify-center font-extrabold text-sm shrink-0">
            <Check size={18} strokeWidth={3} />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-extrabold text-sm truncate">
              {lastScanned.split(' · ')[0]}
            </span>
            <span className="text-xs font-medium text-[#17744B]/80 truncate">
              {lastScanned.split(' · ').slice(1).join(' · ')}
            </span>
          </div>
        </div>

        {/* Formulaire manuel si le scan échoue */}
        <form onSubmit={handleManualCheckIn} className="flex gap-2">
          <input
            type="text"
            value={manualMatricule}
            onChange={e => setManualMatricule(e.target.value)}
            placeholder="N° matricule (ex: UPB-2026-8841)"
            className="flex-1 px-4 py-2.5 rounded-xl border-[1.5px] border-[#D6D2C8] bg-white text-xs font-semibold text-[#0E1E4A] placeholder-slate-400 focus:outline-none focus:border-[#0E1E4A]"
          />
          <button
            type="submit"
            className="min-h-[44px] px-5 rounded-full bg-[#0E1E4A] hover:bg-[#1A2C68] text-white font-extrabold text-xs tracking-wider transition-colors cursor-pointer"
          >
            OK
          </button>
        </form>

        {/* Compteur de présences */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-extrabold text-base text-[#0E1E4A]">Présents</span>
          <span className="font-black text-base text-[#17744B] font-mono">
            {attendees.length + 8} / 18
          </span>
        </div>

        {/* Liste des étudiants émargés en temps réel */}
        <div className="space-y-3 pt-1 overflow-y-auto max-h-60 pr-1">
          {attendees.map(p => (
            <div key={p.id} className="flex items-center gap-3 py-1">
              <div
                className="w-9 h-9 rounded-full text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs"
                style={{ backgroundColor: p.bg }}
              >
                {p.initials}
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-bold text-sm text-[#0E1E4A] truncate">
                  {p.name}
                </span>
                <span className="text-xs text-[#6A7189] truncate">
                  {p.team}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-[#6A7189] shrink-0">
                {p.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
