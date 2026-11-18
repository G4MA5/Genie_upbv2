
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  AlertTriangle,
  Search,
  ArrowRight,
} from "lucide-react";

// ======================================
// TYPES
// ======================================

interface EquipeAssiduite {
  id: number;
  nom: string;
  initiales: string;
  membres: number;
  seances: number;
  taux: number;
  couleur: string;
}

type Filtre = "Toutes" | "Conformes" | "Sous 70 %";

// ======================================
// DONNÉES TEMPORAIRES
// ======================================

const equipes: EquipeAssiduite[] = [
  {
    id: 1,
    nom: "Les Bâtisseurs",
    initiales: "LB",
    membres: 5,
    seances: 12,
    taux: 96,
    couleur: "bg-[#DCE6FF] text-[#2457D5]",
  },
  {
    id: 2,
    nom: "NeoSahel",
    initiales: "NS",
    membres: 4,
    seances: 12,
    taux: 88,
    couleur: "bg-[#3263D2] text-white",
  },
  {
    id: 3,
    nom: "Lagune Lab",
    initiales: "LG",
    membres: 6,
    seances: 12,
    taux: 91,
    couleur: "bg-[#ED7327] text-white",
  },
  {
    id: 4,
    nom: "Kaïros",
    initiales: "KA",
    membres: 4,
    seances: 12,
    taux: 65,
    couleur: "bg-[#0E1E4A] text-white",
  },
  {
    id: 5,
    nom: "Atelier 225",
    initiales: "A2",
    membres: 5,
    seances: 12,
    taux: 84,
    couleur: "bg-[#7044B7] text-white",
  },
  {
    id: 6,
    nom: "Kora Project",
    initiales: "KP",
    membres: 4,
    seances: 12,
    taux: 68,
    couleur: "bg-[#008F72] text-white",
  },
];

// ======================================
// COMPOSANT PRINCIPAL
// ======================================

export default function AssiduiteFormations() {
  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState<Filtre>("Toutes");

  const tauxGlobal = 82;
  const seuil = 70;

  const sousSeuil = equipes.filter(
    (equipe) => equipe.taux < seuil
  ).length;

  const conformes = equipes.filter(
    (equipe) => equipe.taux >= seuil
  ).length;

  const equipesFiltrees = useMemo(() => {
    return equipes.filter((equipe) => {
      const correspondRecherche = equipe.nom
        .toLocaleLowerCase("fr")
        .includes(recherche.toLocaleLowerCase("fr"));

      const correspondFiltre =
        filtre === "Toutes" ||
        (filtre === "Conformes" &&
          equipe.taux >= seuil) ||
        (filtre === "Sous 70 %" &&
          equipe.taux < seuil);

      return correspondRecherche && correspondFiltre;
    });
  }, [recherche, filtre]);

  return (
    <div className="mx-auto mt-[32px] w-full max-w-[1550px] pb-10 text-[#0E1E4A]">

      {/* RETOUR */}

      <Link
        to="/admin/formations"
        className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#34476B] hover:text-[#2F6BF0]"
      >
        <ArrowLeft size={18} />
        Retour aux formations
      </Link>

      {/* TITRE */}

      <div className="mt-6">
        <span className="font-mono text-[14px] text-[#2F6BF0]">
          R2c
        </span>

        <h1 className="mt-2 text-[35px] font-black tracking-[-0.035em] sm:text-[43px] lg:text-[46px]">
          Suivi de l'assiduité
        </h1>

        <p className="mt-2 text-[15px] text-[#7783A0]">
          Analysez la participation des équipes aux séances de formation.
        </p>
      </div>

      {/* STATISTIQUES */}

      <section className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-[1.4fr_1fr_1fr]">

        {/* TAUX GLOBAL */}

        <div className="rounded-[25px] bg-[#0E1E4A] p-7 text-white">
          <span className="font-mono text-[12px] font-bold uppercase tracking-wide text-[#F2C45A]">
            ASSIDUITÉ DE LA CATÉGORIE
          </span>

          <strong className="mt-3 block font-mono text-[62px] font-extrabold leading-none">
            {tauxGlobal} %
          </strong>

          <div
            className="mt-5 h-[9px] overflow-hidden rounded-full bg-[#364468]"
            role="progressbar"
            aria-label="Assiduité de la catégorie"
            aria-valuenow={tauxGlobal}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full rounded-full bg-[#F2C45A]"
              style={{
                width: `${tauxGlobal}%`,
              }}
            />
          </div>

          <p className="mt-3 text-[13px] text-[#D4DDF5]">
            Objectif minimum : {seuil} %
          </p>
        </div>

        {/* ÉQUIPES CONFORMES */}

        <div className="flex flex-col justify-center rounded-[25px] bg-[#E6F5EC] p-7">
          <CheckCircle2
            size={25}
            className="text-[#177A4F]"
          />

          <strong className="mt-4 font-mono text-[42px] font-black text-[#177A4F]">
            {conformes}
          </strong>

          <p className="mt-1 text-[14px] font-semibold text-[#177A4F]">
            Équipes conformes
          </p>
        </div>

        {/* SOUS LE SEUIL */}

        <div className="flex flex-col justify-center rounded-[25px] bg-[#FFF0DE] p-7">
          <AlertTriangle
            size={25}
            className="text-[#C86820]"
          />

          <strong className="mt-4 font-mono text-[42px] font-black text-[#C86820]">
            {sousSeuil}
          </strong>

          <p className="mt-1 text-[14px] font-semibold text-[#94601A]">
            Équipes sous 70 %
          </p>
        </div>
      </section>

      {/* LISTE DES ÉQUIPES */}

      <section className="mt-10">
        <h2 className="text-[22px] font-black">
          Assiduité par équipe
        </h2>

        <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* FILTRES */}

          <div className="flex flex-wrap gap-2">
            {(
              [
                "Toutes",
                "Conformes",
                "Sous 70 %",
              ] as Filtre[]
            ).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFiltre(item)}
                aria-pressed={filtre === item}
                className={`
                  rounded-full px-4 py-2.5
                  text-[13px] font-extrabold
                  transition-colors
                  ${
                    filtre === item
                      ? "bg-[#0E1E4A] text-white"
                      : "border border-[#DFE3EB] bg-white text-[#52617E]"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>

          {/* RECHERCHE */}

          <label className="flex min-h-[45px] items-center gap-3 rounded-full bg-[#F5F6FA] px-4">
            <Search
              size={17}
              className="text-[#8993AE]"
            />

            <input
              type="search"
              value={recherche}
              onChange={(event) =>
                setRecherche(event.target.value)
              }
              placeholder="Rechercher une équipe..."
              aria-label="Rechercher une équipe"
              className="w-full bg-transparent text-[13px] outline-none sm:w-[190px]"
            />
          </label>
        </div>

        {/* TABLEAU ORDINATEUR */}

        <div className="mt-5 hidden overflow-hidden rounded-[22px] border border-[#E9EDF4] lg:block">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#F5F6FA]">
              <tr>
                {[
                  "Équipe",
                  "Membres",
                  "Séances",
                  "Taux d'assiduité",
                  "Statut",
                  "Fiche",
                ].map((titre) => (
                  <th
                    key={titre}
                    className="px-5 py-4 text-[11px] font-extrabold uppercase tracking-wide text-[#7783A0]"
                  >
                    {titre}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {equipesFiltrees.map((equipe) => {
                const conforme =
                  equipe.taux >= seuil;

                return (
                  <tr
                    key={equipe.id}
                    className="border-t border-[#E9EDF4] hover:bg-[#FAFBFE]"
                  >
                    {/* ÉQUIPE */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            flex h-[43px] w-[43px]
                            items-center justify-center
                            rounded-[13px]
                            font-mono text-[13px]
                            font-extrabold
                            ${equipe.couleur}
                          `}
                        >
                          {equipe.initiales}
                        </span>

                        <strong className="text-[14px]">
                          {equipe.nom}
                        </strong>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-mono text-[14px]">
                      {equipe.membres}
                    </td>

                    <td className="px-5 py-4 font-mono text-[14px]">
                      {equipe.seances}
                    </td>

                    {/* PROGRESSION */}

                    <td className="min-w-[185px] px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-[8px] flex-1 overflow-hidden rounded-full bg-[#E9EDF4]">
                          <div
                            className={`h-full rounded-full ${
                              conforme
                                ? "bg-[#177A4F]"
                                : "bg-[#ED7327]"
                            }`}
                            style={{
                              width: `${equipe.taux}%`,
                            }}
                          />
                        </div>

                        <span className="font-mono text-[13px] font-extrabold">
                          {equipe.taux}%
                        </span>
                      </div>
                    </td>

                    {/* STATUT */}

                    <td className="px-5 py-4">
                      <span
                        className={`
                          inline-flex rounded-full
                          px-3 py-2 text-[12px]
                          font-extrabold
                          ${
                            conforme
                              ? "bg-[#E6F5EC] text-[#177A4F]"
                              : "bg-[#FFF0DE] text-[#C86820]"
                          }
                        `}
                      >
                        {conforme
                          ? "Conforme"
                          : "Sous le seuil"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      {equipe.id === 1 ? (
                        <Link
                          to="/admin/equipes/1"
                          aria-label={`Voir ${equipe.nom}`}
                          className="inline-flex rounded-lg p-2 text-[#2F6BF0] hover:bg-[#E1EAFF]"
                        >
                          <ArrowRight size={19} />
                        </Link>
                      ) : (
                        <span className="text-xs text-[#8993AE]">
                          —
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* CARTES MOBILE */}

        <div className="mt-5 space-y-3 lg:hidden">
          {equipesFiltrees.map((equipe) => {
            const conforme = equipe.taux >= seuil;

            return (
              <article
                key={equipe.id}
                className="rounded-[20px] border border-[#E9EDF4] p-5"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`
                      flex h-[44px] w-[44px]
                      items-center justify-center
                      rounded-[12px] font-mono
                      text-[13px] font-extrabold
                      ${equipe.couleur}
                    `}
                  >
                    {equipe.initiales}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-extrabold">
                      {equipe.nom}
                    </h3>

                    <p className="mt-1 text-[12px] text-[#7783A0]">
                      {equipe.membres} membres · {equipe.seances} séances
                    </p>
                  </div>

                  <strong className="font-mono text-[20px]">
                    {equipe.taux}%
                  </strong>
                </div>

                <div className="mt-4 h-[9px] overflow-hidden rounded-full bg-[#E9EDF4]">
                  <div
                    className={`h-full rounded-full ${
                      conforme
                        ? "bg-[#177A4F]"
                        : "bg-[#ED7327]"
                    }`}
                    style={{
                      width: `${equipe.taux}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span
                    className={`text-[12px] font-bold ${
                      conforme
                        ? "text-[#177A4F]"
                        : "text-[#C86820]"
                    }`}
                  >
                    {conforme
                      ? "Conforme"
                      : "Sous le seuil"}
                  </span>

                  {equipe.id === 1 && (
                    <Link
                      to="/admin/equipes/1"
                      className="inline-flex items-center gap-1 text-[12px] font-bold text-[#2F6BF0]"
                    >
                      Fiche équipe
                      <ArrowRight size={15} />
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {equipesFiltrees.length === 0 && (
          <p className="mt-5 rounded-xl bg-[#F5F6FA] p-10 text-center text-sm text-[#7783A0]">
            Aucune équipe ne correspond aux filtres.
          </p>
        )}
      </section>

      <p className="mt-6 text-xs text-[#8793B1]">
        Données de démonstration. Le taux global de 82 % est celui de la maquette et n'est pas calculé à partir des six équipes présentées.
      </p>
    </div>
  );
}
