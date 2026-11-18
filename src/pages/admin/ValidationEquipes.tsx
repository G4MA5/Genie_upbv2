
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  CheckCircle2,
  Clock3,
  AlertCircle,
  XCircle,
  ArrowRight,
  X,
  Filter,
  Check,
} from "lucide-react";

// TYPES

type Statut =
  | "En attente de validation"
  | "Validée"
  | "Dossier incomplet"
  | "Rejetée";

type Categorie =
  | "Technologie"
  | "Innovation"
  | "Économie"
  | "Droit";

interface Equipe {
  id: number;
  nom: string;
  categorie: Categorie;
  filiere: string;
  chef: string;
  membres: number;
  minimum: number;
  date: string;
  statut: Statut;
  motifRejet?: string;
}

// DONNÉES TEMPORAIRES

const equipesInitiales: Equipe[] = [
  {
    id: 1,
    nom: "Les Bâtisseurs",
    categorie: "Innovation",
    filiere: "MIAGE",
    chef: "Aya Kouassi",
    membres: 3,
    minimum: 4,
    date: "02/12/2026",
    statut: "Dossier incomplet",
  },
  {
    id: 2,
    nom: "Tech Vision",
    categorie: "Technologie",
    filiere: "RIT",
    chef: "Jean Koffi",
    membres: 4,
    minimum: 4,
    date: "03/12/2026",
    statut: "En attente de validation",
  },
  {
    id: 3,
    nom: "Eco Leaders",
    categorie: "Économie",
    filiere: "MIAGE",
    chef: "Marie Konan",
    membres: 4,
    minimum: 4,
    date: "03/12/2026",
    statut: "Validée",
  },
  {
    id: 4,
    nom: "Justice Plus",
    categorie: "Droit",
    filiere: "Droit",
    chef: "Paul Yao",
    membres: 4,
    minimum: 4,
    date: "04/12/2026",
    statut: "En attente de validation",
  },
  {
    id: 5,
    nom: "Digital Future",
    categorie: "Innovation",
    filiere: "ASSRI",
    chef: "Eric N'Dri",
    membres: 4,
    minimum: 4,
    date: "04/12/2026",
    statut: "En attente de validation",
  },
];

const filtresStatut = [
  "Toutes",
  "En attente de validation",
  "Validée",
  "Dossier incomplet",
  "Rejetée",
] as const;

type FiltreStatut = (typeof filtresStatut)[number];

const categories: Array<"Toutes" | Categorie> = [
  "Toutes",
  "Technologie",
  "Innovation",
  "Économie",
  "Droit",
];

// STYLES DES STATUTS

const statutStyles: Record<Statut, string> = {
  "En attente de validation":
    "bg-orange-50 text-orange-700 border-orange-200",
  "Validée":
    "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Dossier incomplet":
    "bg-yellow-50 text-yellow-700 border-yellow-200",
  "Rejetée":
    "bg-red-50 text-red-700 border-red-200",
};

const categorieStyles: Record<Categorie, string> = {
  Technologie: "bg-orange-50 text-orange-600",
  Innovation: "bg-purple-50 text-purple-700",
  Économie: "bg-green-50 text-green-700",
  Droit: "bg-rose-50 text-rose-700",
};

// COMPOSANT

export default function ValidationEquipes() {
  const [equipes, setEquipes] =
    useState<Equipe[]>(equipesInitiales);

  const [recherche, setRecherche] = useState("");
  const [statut, setStatut] = useState<FiltreStatut>("Toutes");
  const [categorie, setCategorie] =
    useState<"Toutes" | Categorie>("Toutes");

  const [equipeARejeter, setEquipeARejeter] =
    useState<Equipe | null>(null);

  const [motif, setMotif] = useState("");
  const [message, setMessage] = useState("");

  // STATISTIQUES

  const total = equipes.length;

  const enAttente = equipes.filter(
    (e) => e.statut === "En attente de validation"
  ).length;

  const validees = equipes.filter(
    (e) => e.statut === "Validée"
  ).length;

  const incompletes = equipes.filter(
    (e) => e.statut === "Dossier incomplet"
  ).length;

  // FILTRAGE

  const equipesFiltrees = useMemo(() => {
    return equipes.filter((equipe) => {
      const rechercheOK =
        `${equipe.nom} ${equipe.chef} ${equipe.filiere}`
          .toLocaleLowerCase("fr")
          .includes(recherche.toLocaleLowerCase("fr"));

      const statutOK =
        statut === "Toutes" || equipe.statut === statut;

      const categorieOK =
        categorie === "Toutes" ||
        equipe.categorie === categorie;

      return rechercheOK && statutOK && categorieOK;
    });
  }, [equipes, recherche, statut, categorie]);

  // VALIDATION

  function validerEquipe(id: number) {
    const equipe = equipes.find((e) => e.id === id);

    if (!equipe) return;

    if (equipe.membres < equipe.minimum) {
      setMessage(
        `L'équipe "${equipe.nom}" ne possède pas le nombre minimum de membres.`
      );
      return;
    }

    setEquipes((precedentes) =>
      precedentes.map((equipe) =>
        equipe.id === id
          ? {
              ...equipe,
              statut: "Validée",
              motifRejet: undefined,
            }
          : equipe
      )
    );

    setMessage("Équipe validée localement.");
  }

  // REJET

  function rejeterEquipe() {
    if (!equipeARejeter || !motif.trim()) return;

    setEquipes((precedentes) =>
      precedentes.map((equipe) =>
        equipe.id === equipeARejeter.id
          ? {
              ...equipe,
              statut: "Rejetée",
              motifRejet: motif.trim(),
            }
          : equipe
      )
    );

    setEquipeARejeter(null);
    setMotif("");
    setMessage("Candidature rejetée localement.");
  }

  return (
    <div className="mx-auto w-full max-w-[1550px] space-y-6 p-4 sm:p-7 lg:p-9">

      {/* TITRE */}

      <div>
        <p className="mb-2 font-mono text-[11px] font-bold uppercase tracking-[0.15em] text-[#2F6BF0]">
          Responsable / Organisation
        </p>

        <h1 className="text-2xl font-black tracking-tight text-[#0A1430] sm:text-3xl">
          Équipes à valider
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Consultez les candidatures et gérez les
          validations des équipes du concours.
        </p>
      </div>

      {/* STATISTIQUES */}

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">

        {[
          {
            label: "Total équipes",
            valeur: total,
            icon: Users,
            color: "text-blue-600",
          },
          {
            label: "En attente",
            valeur: enAttente,
            icon: Clock3,
            color: "text-orange-500",
          },
          {
            label: "Validées",
            valeur: validees,
            icon: CheckCircle2,
            color: "text-emerald-600",
          },
          {
            label: "Dossiers incomplets",
            valeur: incompletes,
            icon: AlertCircle,
            color: "text-yellow-600",
          },
        ].map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <Icon
                size={22}
                className={item.color}
              />

              <p className="mt-4 font-mono text-3xl font-extrabold text-[#0A1430]">
                {item.valeur}
              </p>

              <p className="mt-1 text-xs font-bold text-slate-500 sm:text-sm">
                {item.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* RECHERCHE ET FILTRES */}

      <section className="rounded-[22px] border border-slate-100 bg-white p-4 shadow-sm sm:p-6">

        <div className="mb-5 flex items-center gap-2">
          <Filter
            size={19}
            className="text-[#2F6BF0]"
          />

          <h2 className="text-lg font-black">
            Filtrer les candidatures
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-[#0A1430]">
              Rechercher une équipe
            </span>

            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-[#2F6BF0]">
              <Search
                size={19}
                className="text-slate-400"
              />

              <input
                type="search"
                value={recherche}
                onChange={(e) =>
                  setRecherche(e.target.value)
                }
                placeholder="Nom, chef d'équipe, filière..."
                className="h-12 w-full min-w-0 bg-transparent text-sm outline-none"
              />
            </div>
          </label>

          <label className="block">
            <span className="mb-2 block text-xs font-extrabold text-[#0A1430]">
              Catégorie
            </span>

            <select
              value={categorie}
              onChange={(e) =>
                setCategorie(
                  e.target.value as "Toutes" | Categorie
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold outline-none focus:border-[#2F6BF0]"
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat === "Toutes"
                    ? "Toutes les catégories"
                    : cat}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* FILTRES DE STATUT */}

        <div className="mt-5 flex flex-wrap gap-2">
          {filtresStatut.map((filtre) => (
            <button
              key={filtre}
              type="button"
              onClick={() => setStatut(filtre)}
              aria-pressed={statut === filtre}
              className={`
                rounded-full px-4 py-2 text-xs font-extrabold
                transition-colors
                ${
                  statut === filtre
                    ? "bg-[#0A1430] text-white"
                    : "bg-[#F6F7FA] text-slate-600 hover:bg-blue-50"
                }
              `}
            >
              {filtre}
            </button>
          ))}
        </div>
      </section>

      {/* NOTIFICATION LOCALE */}

      {message && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-800"
        >
          <span>{message}</span>

          <button
            type="button"
            onClick={() => setMessage("")}
            aria-label="Fermer la notification"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* LISTE DES ÉQUIPES */}

      <section className="overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-sm">

        <div className="flex items-center justify-between gap-3 border-b border-slate-100 px-5 py-5 sm:px-6">
          <h2 className="text-lg font-black">
            Liste des équipes
          </h2>

          <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-xs font-bold text-[#2F6BF0]">
            {equipesFiltrees.length} résultat(s)
          </span>
        </div>

        {/* TABLEAU DESKTOP */}

        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#F6F7FA]">
              <tr>
                {[
                  "Équipe",
                  "Catégorie",
                  "Filière",
                  "Chef d'équipe",
                  "Effectif",
                  "Soumission",
                  "Statut",
                  "Actions",
                ].map((col) => (
                  <th
                    key={col}
                    className="whitespace-nowrap px-4 py-4 text-[11px] font-black uppercase tracking-wide text-slate-500"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {equipesFiltrees.map((equipe) => (
                <tr
                  key={equipe.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >
                  <td className="px-4 py-5">
                    <span className="font-extrabold text-[#0A1430]">
                      {equipe.nom}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`rounded-lg px-3 py-2 text-xs font-extrabold ${categorieStyles[equipe.categorie]}`}
                    >
                      {equipe.categorie}
                    </span>
                  </td>

                  <td className="px-4 py-5 text-sm font-semibold">
                    {equipe.filiere}
                  </td>

                  <td className="px-4 py-5 text-sm font-semibold">
                    {equipe.chef}
                  </td>

                  <td className="px-4 py-5 font-mono text-sm font-bold">
                    {equipe.membres}/{equipe.minimum}
                  </td>

                  <td className="px-4 py-5 font-mono text-xs text-slate-500">
                    {equipe.date}
                  </td>

                  <td className="px-4 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1.5 text-[11px] font-extrabold ${statutStyles[equipe.statut]}`}
                    >
                      {equipe.statut}
                    </span>
                  </td>

                  <td className="px-4 py-5">
                    <div className="flex items-center gap-2">

                      {equipe.statut !== "Validée" &&
                        equipe.statut !== "Rejetée" && (
                          <button
                            type="button"
                            onClick={() =>
                              validerEquipe(equipe.id)
                            }
                            className="rounded-lg bg-emerald-500 p-2 text-white hover:bg-emerald-600"
                            title="Valider"
                            aria-label={`Valider ${equipe.nom}`}
                          >
                            <Check size={17} />
                          </button>
                        )}

                      <Link
                        to={`/admin/equipes/${equipe.id}`}
                        className="rounded-lg bg-blue-50 p-2 text-[#2F6BF0] hover:bg-blue-100"
                        title="Fiche"
                        aria-label={`Fiche ${equipe.nom}`}
                      >
                        <ArrowRight size={17} />
                      </Link>

                      {equipe.statut !== "Rejetée" && (
                        <button
                          type="button"
                          onClick={() => {
                            setEquipeARejeter(equipe);
                            setMotif("");
                          }}
                          className="rounded-lg bg-red-50 p-2 text-red-500 hover:bg-red-100"
                          title="Rejeter"
                          aria-label={`Rejeter ${equipe.nom}`}
                        >
                          <X size={17} />
                        </button>
                      )}

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CARTES MOBILE / TABLETTE */}

        <div className="space-y-3 p-3 lg:hidden">
          {equipesFiltrees.map((equipe) => (
            <article
              key={equipe.id}
              className="rounded-2xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-black text-[#0A1430]">
                    {equipe.nom}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {equipe.filiere} · {equipe.chef}
                  </p>
                </div>

                <span className="font-mono text-sm font-black text-[#2F6BF0]">
                  {equipe.membres}/{equipe.minimum}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-extrabold ${categorieStyles[equipe.categorie]}`}
                >
                  {equipe.categorie}
                </span>

                <span
                  className={`rounded-full border px-3 py-1.5 text-xs font-extrabold ${statutStyles[equipe.statut]}`}
                >
                  {equipe.statut}
                </span>
              </div>

              <p className="mt-3 font-mono text-xs text-slate-400">
                Soumise le {equipe.date}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {equipe.statut !== "Validée" &&
                  equipe.statut !== "Rejetée" && (
                    <button
                      type="button"
                      onClick={() =>
                        validerEquipe(equipe.id)
                      }
                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-bold text-white"
                    >
                      <Check size={16} />
                      Valider
                    </button>
                  )}

                <Link
                  to={`/admin/equipes/${equipe.id}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2.5 text-xs font-bold text-blue-700"
                >
                  Fiche
                  <ArrowRight size={16} />
                </Link>

                {equipe.statut !== "Rejetée" && (
                  <button
                    type="button"
                    onClick={() => {
                      setEquipeARejeter(equipe);
                      setMotif("");
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2.5 text-xs font-bold text-red-600"
                  >
                    <XCircle size={16} />
                    Rejeter
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* LISTE VIDE */}

        {equipesFiltrees.length === 0 && (
          <div className="py-16 text-center">
            <Search
              size={35}
              className="mx-auto mb-3 text-slate-300"
            />

            <p className="text-sm font-bold text-slate-500">
              Aucune équipe trouvée.
            </p>
          </div>
        )}

      </section>

      {/* MODALE DE REJET */}

      {equipeARejeter && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1430]/70 p-4"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setEquipeARejeter(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rejet-title"
            className="w-full max-w-md rounded-[24px] bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <XCircle size={25} />
              </div>

              <button
                type="button"
                onClick={() => setEquipeARejeter(null)}
                aria-label="Fermer"
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <h2
              id="rejet-title"
              className="mt-5 text-xl font-black text-[#0A1430]"
            >
              Rejeter la candidature
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Équipe :{" "}
              <strong>{equipeARejeter.nom}</strong>
            </p>

            <label className="mt-5 block">
              <span className="mb-2 block text-sm font-bold">
                Motif du rejet
              </span>

              <textarea
                value={motif}
                onChange={(e) =>
                  setMotif(e.target.value)
                }
                rows={4}
                placeholder="Précisez le motif du rejet..."
                className="w-full resize-none rounded-xl border border-slate-200 p-4 text-sm outline-none focus:border-[#2F6BF0]"
              />
            </label>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setEquipeARejeter(null)}
                className="flex-1 rounded-xl bg-slate-100 px-4 py-3 text-sm font-extrabold"
              >
                Annuler
              </button>

              <button
                type="button"
                disabled={!motif.trim()}
                onClick={rejeterEquipe}
                className="flex-1 rounded-xl bg-[#EF4444] px-4 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                Confirmer le rejet
              </button>
            </div>

            <p className="mt-4 text-xs text-slate-400">
              Simulation locale : aucune notification
              n'est envoyée au candidat.
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
