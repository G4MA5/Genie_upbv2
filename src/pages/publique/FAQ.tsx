import React, { useState } from 'react';
import { faqCategories, faqList, FaqItem } from '../../data/faqData';
import { ChevronDown, Search, Mail, Phone, MapPin, Send, HelpCircle, MessageSquare } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function FAQ() {
  const [activeTheme, setActiveTheme] = useState<string>('Tous');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ '1': true });

  const [formData, setFormData] = useState({ nom: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredFaq = faqList.filter((item) => {
    const matchTheme = activeTheme === 'Tous' || item.theme === activeTheme;
    const matchSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.reponse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTheme && matchSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) {
      toast.error('Veuillez remplir tous les champs du formulaire.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Votre message a bien été envoyé au comité d’organisation !');
      setFormData({ nom: '', email: '', message: '' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F6F8FC] py-10 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-mono text-xs md:text-sm font-semibold tracking-wider text-[#2F6BF0] uppercase">
              AIDE & ASSISTANCE
            </span>
            <span className="inline-block w-8 h-[2px] bg-[#2F6BF0]/40 rounded-full" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0E1E4A] tracking-tight leading-tight">
            Questions fréquentes
          </h1>

          <p className="text-base sm:text-lg text-[#4A5168] leading-relaxed max-w-2xl">
            Retrouvez toutes les réponses essentielles sur les inscriptions, le travail en équipe,
            les formations obligatoires et le déroulement du tournoi.
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une question (ex: équipe, formations, gratuit...)"
            className="w-full h-13 pl-12 pr-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-sm sm:text-base text-[#0E1E4A] placeholder:text-slate-400 focus:outline-none focus:border-[#2F6BF0] focus:ring-2 focus:ring-[#2F6BF0]/20 transition-all"
          />
        </div>

        {/* Filtres par thématique */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {faqCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTheme(cat)}
              className={`flex-none min-h-[38px] px-4 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTheme === cat
                  ? 'bg-[#0E1E4A] text-white shadow-sm'
                  : 'bg-white text-[#4A5168] border border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordéon FAQ prototype */}
        <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-[0_4px_24px_rgba(10,20,48,0.04)] divide-y divide-slate-100">
          {filteredFaq.length > 0 ? (
            filteredFaq.map((item) => {
              const isOpen = !!openItems[item.id];
              return (
                <div key={item.id} className="p-5 sm:p-6 transition-colors hover:bg-slate-50/50">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex justify-between items-center gap-4 text-left cursor-pointer"
                  >
                    <span className="font-extrabold text-base sm:text-lg text-[#0E1E4A] leading-snug">
                      {item.question}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#0E1E4A] text-white' : 'text-slate-500'
                      }`}
                    >
                      <ChevronDown size={18} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="mt-3.5 text-sm sm:text-base leading-relaxed text-[#4A5168] animate-fadeIn">
                      {item.reponse}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              Aucune réponse ne correspond à votre recherche « {searchQuery} ».
            </div>
          )}
        </div>

        {/* Bloc Contact & Formulaire direct */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {/* Coordonnées officielles */}
          <div className="bg-[#0E1E4A] rounded-[28px] p-6 sm:p-8 text-white flex flex-col justify-between gap-6 shadow-md">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-bold text-[#F58220] uppercase tracking-wider">
                VOUS AVEZ UNE AUTRE QUESTION ?
              </span>
              <h3 className="font-black text-2xl sm:text-3xl text-white">
                Contactez l’équipe d’organisation
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Notre secrétariat répond aux candidats et formateurs du lundi au vendredi de 8h à 18h.
              </p>
            </div>

            <div className="flex flex-col gap-3.5 text-sm text-[#C9D6F5] font-medium pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#F58220] shrink-0">
                  <Phone size={18} />
                </div>
                <span>(+225) 07 00 11 22 33 / 05 44 55 66 77</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#A9C2FF] shrink-0">
                  <Mail size={18} />
                </div>
                <span>contact@genie.upb.ci</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-[#2F6BF0] shrink-0">
                  <MapPin size={18} />
                </div>
                <span>Campus UPB Bingerville · Secrétariat Tournoi</span>
              </div>
            </div>
          </div>

          {/* Formulaire de message direct */}
          <div className="bg-white rounded-[28px] p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col gap-4">
            <h4 className="font-black text-xl text-[#0E1E4A]">Envoyez-nous un message</h4>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nom complet</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  placeholder="Ex: Kouamé Jean"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Adresse e-mail</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Ex: kouame@etudiant.upb.ci"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Votre message</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Posez votre question avec précision..."
                  className="w-full p-3.5 rounded-xl border border-slate-200 text-sm text-[#0E1E4A] focus:outline-none focus:border-[#2F6BF0]"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full min-h-[46px] rounded-xl bg-[#2F6BF0] hover:bg-[#1D4FD8] text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm cursor-pointer mt-1"
              >
                <Send size={16} />
                <span>{submitting ? 'Envoi en cours...' : 'Envoyer ma question'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
