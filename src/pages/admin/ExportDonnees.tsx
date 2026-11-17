
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Search,
  Mail,
  Menu,
  Check,
  ChevronDown,
  ArrowDownToLine,
  X,
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================

type Categorie =
  | "Innovation"
  | "Technologie"
  | "Économie"
  | "Droit";

type Statut =
  | "Brouillon"
  | "Soumise"
  | "Validée"
  | "Refusée"
  | "Liste d'attente";

interface EquipeExport {
  nom: string;
  chef: string;
  categorie: Categorie;
  statut: Statut;
}

// ==========================================
// DONNÉES DE DÉMONSTRATION
// ==========================================

// Ces données servent uniquement à tester
// le téléchargement avant connexion au backend.

const equipesDemo: EquipeExport[] = [
  {
    nom: "Les Bâtisseurs",
    chef: "Aya Kouassi",
    categorie: "Innovation",
    statut: "Soumise",
  },
  {
    nom: "NeoSahel",
    chef: "Moussa Diabaté",
    categorie: "Innovation",
    statut: "Soumise",
  },
  {
    nom: "Lagune Lab",
    chef: "Fatou Touré",
    categorie: "Innovation",
    statut: "Validée",
  },
  {
    nom: "Atelier 225",
    chef: "Jean N’Guessan",
    categorie: "Innovation",
    statut: "Liste d'attente",
  },
];

const categories: Categorie[] = [
  "Innovation",
  "Technologie",
  "Économie",
  "Droit",
];

const statutsDisponibles: Statut[] = [
  "Brouillon",
  "Soumise",
  "Validée",
  "Refusée",
  "Liste d'attente",
];

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export default function ExportDonnees() {
  const { openAdminMenu } = useOutletContext<{
    openAdminMenu: () => void;
  }>();

  // Catégorie sélectionnée
  const [categorie, setCategorie] =
    useState<Categorie>("Innovation");

  // Statuts sélectionnés par défaut
  const [statuts, setStatuts] = useState<Statut[]>([
    "Soumise",
    "Validée",
    "Liste d'attente",
  ]);

  // Recherche de l'en-tête
  const [recherche, setRecherche] = useState("");

  // Message après téléchargement
  const [notification, setNotification] = useState("");

  // ========================================
  // SÉLECTION DES STATUTS
  // ========================================

  function toggleStatut(statut: Statut) {
    setStatuts((actuels) => {
      if (actuels.includes(statut)) {
        return actuels.filter((item) => item !== statut);
      }

      return [...actuels, statut];
    });
  }

  // ========================================
  // FILTRAGE DES DONNÉES DE DÉMONSTRATION
  // ========================================

  const equipesFiltrees = useMemo(() => {
    return equipesDemo.filter(
      (equipe) =>
        equipe.categorie === categorie &&
        statuts.includes(equipe.statut)
    );
  }, [categorie, statuts]);

  // ========================================
  // EXPORT CSV COMPATIBLE EXCEL
  // ========================================

  function exporterTableur() {
    if (statuts.length === 0) {
      setNotification(
        "Sélectionnez au moins un statut à exporter."
      );
      return;
    }

    if (equipesFiltrees.length === 0) {
      setNotification(
        "Aucune donnée de démonstration ne correspond aux filtres."
      );
      return;
    }

    // Protéger le contenu CSV et gérer
    // les valeurs contenant des séparateurs.
    const echapperCSV = (valeur: string) => {
      const securisee = /^[\s]*[=+\-@\t\r]/.test(valeur)
        ? `'${valeur}`
        : valeur;

      return `"${securisee.replace(/"/g, '""')}"`;
    };

    const entetes = [
      "Nom de l'équipe",
      "Chef d'équipe",
      "Catégorie",
      "Statut",
    ];

    const lignes = equipesFiltrees.map((equipe) => [
      equipe.nom,
      equipe.chef,
      equipe.categorie,
      equipe.statut,
    ]);

    const contenu = [
      "sep=;",
      entetes.map(echapperCSV).join(";"),
      ...lignes.map((ligne) =>
        ligne.map(echapperCSV).join(";")
      ),
    ].join("\r\n");

    // BOM UTF-8 pour les accents dans Excel
    const fichier = new Blob(
      ["\uFEFF", contenu],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url = URL.createObjectURL(fichier);

    const lien = document.createElement("a");
    lien.href = url;

    const date = new Date()
      .toISOString()
      .slice(0, 10);

    lien.download = `genie-upb_${categorie
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")}_${date}.csv`;

    document.body.appendChild(lien);
    lien.click();
    lien.remove();

    URL.revokeObjectURL(url);

    setNotification(
      `Export CSV de démonstration : ${equipesFiltrees.length} équipe(s). Les 31 équipes du prototype ne sont pas encore connectées.`
    );
  }

  return (
    <div
      className="
        min-h-full bg-white
        px-4 pb-12 pt-5
        font-sans text-[#0E1E4A]
        sm:px-7
        lg:px-[38px] lg:pt-[31px]
      "
    >
      {/* =====================================
          BARRE SUPÉRIEURE
      ===================================== */}

      <header className="flex flex-wrap items-center justify-between gap-4">

        {/* RECHERCHE */}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={openAdminMenu}
            aria-label="Ouvrir la navigation"
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl bg-[#F5F6FA]
              lg:hidden
            "
          >
            <Menu size={21} />
          </button>

          <label
            className="
              flex h-[57px] w-full max-w-[450px]
              items-center gap-3
              rounded-full bg-[#F5F6FA]
              px-[22px]
            "
          >
            <span className="sr-only">
              Rechercher une équipe ou un étudiant
            </span>

            <input
              type="search"
              value={recherche}
              onChange={(event) =>
                setRecherche(event.target.value)
              }
              placeholder="Rechercher une équipe, un étudiant..."
              className="
                min-w-0 flex-1
                bg-transparent text-[15px]
                font-medium text-[#0E1E4A]
                outline-none
                placeholder:text-[#8993AE]
              "
            />

            <Search
              size={17}
              className="shrink-0 text-[#8993AE]"
            />
          </label>
        </div>

        {/* MESSAGERIE ET PROFIL */}

        <div className="flex items-center gap-[15px]">

          <div
            aria-label="Messagerie"
            className="
              relative flex h-[52px] w-[52px]
              items-center justify-center
              rounded-full bg-[#F6F7FB]
            "
          >
            <Mail size={20} strokeWidth={2.5} />

            <span
              className="
                absolute right-[9px] top-[7px]
                h-[8px] w-[8px]
                rounded-full bg-[#ED7327]
              "
            />
          </div>

          <div
            className="
              flex items-center gap-3
              rounded-[22px] bg-white
              px-[9px] py-[8px]
              shadow-[0_12px_35px_rgba(18,38,81,0.08)]
            "
          >
            <div
              className="
                flex h-[47px] w-[47px]
                shrink-0 items-center justify-center
                rounded-full bg-[#E0E9FF]
                font-mono text-[17px]
                font-bold text-[#2457D5]
              "
            >
              AK
            </div>

            <div className="hidden pr-[8px] sm:block">
              <p className="text-[17px] font-extrabold leading-tight text-[#0A1430]">
                Dr Konan
              </p>

              <p className="mt-1 text-[12px] text-[#8290AF]">
                Responsable Innovation
              </p>
            </div>
          </div>

        </div>
      </header>

      {/* =====================================
          CONTENU PRINCIPAL
      ===================================== */}

      <main
        className="
          mx-auto mt-[58px]
          max-w-[1100px]
          lg:mt-[62px]
        "
      >
        {/* TITRE */}

        <h1
          className="
            text-[34px] font-black
            leading-[1.15]
            tracking-[-0.035em]
            text-[#0E1E4A]
            sm:text-[43px]
            lg:text-[46px]
          "
        >
          Export pour les PCO
        </h1>

        {/* =====================================
            GRILLE FORMULAIRE / DERNIER EXPORT
        ===================================== */}

        <div
          className="
            mt-[27px] grid grid-cols-1
            items-start gap-[20px]
            lg:grid-cols-[1.3fr_1fr]
          "
        >
          {/* =================================
              FORMULAIRE EXPORT
          ================================= */}

          <section
            className="
              flex min-w-0 flex-col
              gap-[18px] rounded-[24px]
              bg-white p-2
              sm:p-[26px]
            "
          >

            {/* CATÉGORIE */}

            <label className="flex flex-col gap-[7px]">
              <span
                className="
                  text-[15px] font-semibold
                  text-[#0A1430]
                "
              >
                Catégorie
              </span>

              <div className="relative">
                <select
                  value={categorie}
                  onChange={(event) =>
                    setCategorie(
                      event.target.value as Categorie
                    )
                  }
                  className="
                    h-[59px] w-full
                    appearance-none
                    rounded-[15px]
                    border border-[#D6D2C8]
                    bg-white
                    px-[17px] pr-12
                    text-[16px] font-semibold
                    text-[#0A1430]
                    outline-none
                    transition
                    focus:border-[#2F6BF0]
                  "
                >
                  {categories.map((item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={17}
                  className="
                    pointer-events-none
                    absolute right-[19px] top-1/2
                    -translate-y-1/2
                    text-[#6A7189]
                  "
                />
              </div>
            </label>

            {/* =================================
                STATUTS À INCLURE
            ================================= */}

            <fieldset className="min-w-0">
              <legend
                className="
                  mb-[8px] text-[15px]
                  font-semibold text-[#0A1430]
                "
              >
                Statuts à inclure
              </legend>

              <div className="flex flex-wrap gap-[8px]">
                {statutsDisponibles.map((statut) => {
                  const actif = statuts.includes(statut);

                  return (
                    <label
                      key={statut}
                      className={`
                        inline-flex min-h-[48px]
                        cursor-pointer items-center
                        gap-[10px]
                        rounded-full border-[1.5px]
                        px-[15px]
                        text-[15px] font-semibold
                        transition-colors

                        ${
                          actif
                            ? "border-[#0E1E4A] text-[#0A1430]"
                            : "border-[#B5B8C4] text-[#0A1430]"
                        }
                      `}
                    >
                      <input
                        type="checkbox"
                        checked={actif}
                        onChange={() =>
                          toggleStatut(statut)
                        }
                        className="sr-only"
                      />

                      <span
                        className={`
                          flex h-[23px] w-[23px]
                          shrink-0 items-center
                          justify-center rounded-[6px]
                          border-2

                          ${
                            actif
                              ? "border-[#0E1E4A] bg-[#0E1E4A] text-white"
                              : "border-[#B5B8C4] bg-white text-transparent"
                          }
                        `}
                      >
                        {actif && (
                          <Check
                            size={16}
                            strokeWidth={3}
                          />
                        )}
                      </span>

                      <span>{statut}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            {/* =================================
                BOUTON EXPORT
            ================================= */}

            <button
              type="button"
              onClick={exporterTableur}
              disabled={statuts.length === 0}
              className="
                mt-[2px] flex
                min-h-[64px] w-full
                items-center justify-center
                gap-[8px]
                rounded-full
                bg-[#0E1E4A]
                px-4 text-center
                text-[16px] font-extrabold
                text-white
                transition-colors
                hover:bg-[#1D3573]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:text-[18px]
              "
            >
              <ArrowDownToLine size={20} />

              <span>
                Exporter en tableur (31 équipes)
              </span>
            </button>

            {/* NOTIFICATION */}

            {notification && (
              <div
                role="status"
                className="
                  flex items-start justify-between
                  gap-3 rounded-xl
                  bg-[#F1F5FC]
                  px-4 py-3 text-[13px]
                  font-semibold text-[#0E1E4A]
                "
              >
                <p>{notification}</p>

                <button
                  type="button"
                  onClick={() =>
                    setNotification("")
                  }
                  aria-label="Fermer le message"
                  className="shrink-0"
                >
                  <X size={17} />
                </button>
              </div>
            )}

          </section>

          {/* =================================
              CARTE DERNIER EXPORT
          ================================= */}

          <aside
            className="
              flex min-w-0 flex-col
              gap-[11px]
              rounded-[28px]
              bg-[#0E1E4A]
              p-[26px]
              text-white
              sm:p-[28px]
            "
          >
            <span
              className="
                font-mono text-[12px]
                font-bold uppercase
                tracking-[0.025em]
                text-[#F2C45A]
              "
            >
              DERNIER EXPORT
            </span>

            <h2
              className="
                text-[25px] font-black
                leading-[1.2]
                tracking-[-0.02em]
                text-white
                sm:text-[28px]
              "
            >
              12 déc. 2026 à 18:04
            </h2>

            <p
              className="
                break-words
                text-[15px] font-medium
                leading-[1.6]
                text-[#C9D1E8]
              "
            >
              genie-upb_innovation_2026-12-12.xlsx
              {" · "}
              28 équipes
              {" · "}
              par Dr A. Konan
            </p>
          </aside>

        </div>
      </main>
    </div>
  );
}
