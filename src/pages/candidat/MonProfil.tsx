import React, { useState } from 'react';
import { User, Mail, Phone, School, ShieldCheck, CheckCircle2, Save, Camera } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function MonProfil() {
  const [profile, setProfile] = useState({
    nom: 'Kouassi',
    prenoms: 'Aya Marie',
    matricule: 'UPB-2026-8841',
    email: 'aya.kouassi@etudiant.upb.ci',
    telephone: '(+225) 07 48 92 10 33',
    filiere: 'Licence 3 — Génie Logiciel & Systèmes d’Information',
    ufr: 'Sciences et Technologies Numériques',
    roleEquipe: 'Capitaine d’équipe',
  });

  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Profil étudiant mis à jour avec succès !');
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs font-bold text-[#2F6BF0] uppercase tracking-wider">
          ESPACE PERSONNEL
        </span>
        <h1 className="text-3xl font-black text-[#0E1E4A]">Mon Profil Étudiant</h1>
        <p className="text-sm text-slate-500">
          Consultez et actualisez vos coordonnées personnelles et académiques.
        </p>
      </div>

      {/* Carte d'identité visuelle */}
      <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full border-4 border-[#F2C45A] bg-[#2F63D0] text-white flex items-center justify-center font-black text-3xl shadow-md">
            AK
          </div>
          <button
            type="button"
            onClick={() => toast('Modification de photo simulée')}
            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#0E1E4A] text-white flex items-center justify-center shadow hover:bg-[#2F6BF0] transition-colors cursor-pointer"
            title="Modifier l'avatar"
          >
            <Camera size={15} />
          </button>
        </div>

        <div className="flex flex-col items-center sm:items-start gap-2 flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-black text-[#0E1E4A]">
              {profile.prenoms} {profile.nom}
            </h2>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-1 border border-emerald-200">
              <CheckCircle2 size={13} />
              Inscrit UPB vérifié
            </span>
          </div>

          <span className="text-xs sm:text-sm font-mono text-[#2F6BF0] font-bold">
            Matricule officiel : {profile.matricule}
          </span>
          <span className="text-xs text-slate-500">{profile.filiere}</span>
        </div>
      </div>

      {/* Formulaire de profil */}
      <form onSubmit={handleSave} className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <ShieldCheck className="text-[#2F6BF0]" size={20} />
          <h3 className="font-black text-lg text-[#0E1E4A]">Informations Personnelles & Contact</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Nom de famille</label>
            <input
              type="text"
              value={profile.nom}
              onChange={(e) => setProfile({ ...profile, nom: e.target.value })}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Prénoms</label>
            <input
              type="text"
              value={profile.prenoms}
              onChange={(e) => setProfile({ ...profile, prenoms: e.target.value })}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Adresse e-mail universitaire</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Numéro de téléphone WhatsApp</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="tel"
                value={profile.telephone}
                onChange={(e) => setProfile({ ...profile, telephone: e.target.value })}
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 pt-4">
          <School className="text-[#E8742A]" size={20} />
          <h3 className="font-black text-lg text-[#0E1E4A]">Cursus Académique UPB</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">UFR / Faculté</label>
            <input
              type="text"
              readOnly
              value={profile.ufr}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Filière & Promotion</label>
            <input
              type="text"
              readOnly
              value={profile.filiere}
              className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-slate-500 bg-slate-50 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="min-h-[46px] px-7 rounded-xl bg-[#0E1E4A] hover:bg-[#1B2D63] text-white font-extrabold text-sm flex items-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer"
          >
            <Save size={16} />
            <span>{saving ? 'Enregistrement...' : 'Enregistrer les modifications'}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
