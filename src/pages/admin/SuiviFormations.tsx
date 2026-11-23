
import { useState } from "react";
import {
  Link,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";

import {
  Search,
  Mail,
  Menu,
  ArrowRight,
} from "lucide-react";

import AssiduiteFormations from "./formations/AssiduiteFormations";

// ======================================
// TYPES
// ======================================

interface Seance {
  id: number;
  jour: string;
  heure: string;
  titre: string;
  lieu: string;
  inscrits: number;
}

interface Raccourci {
  code: string;
  titre: string;
  description: string;
  path: string;
}

// ======================================
// DONNÉES DE LA MAQUETTE
// ======================================

const seances: Seance[] = [
  {
    id: 1,
    jour: "Auj.",
    heure: "09:00",
    titre: "Prototypage rapide et maquettes",
    lieu: "Fablab, bât. C",
    inscrits: 18,
  },
  {
    id: 2,
    jour: "Mar. 12",
    heure: "14:00",
    titre: "Préparer sa démo",
    lieu: "Salle 12",
    inscrits: 18,
  },
  {
    id: 3,
    jour: "Jeu. 14",
    heure: "17:00",
    titre: "Pitch blanc",
    lieu: "À distance",
    inscrits: 18,
  },
];

const raccourcis: Raccourci[] = [
  {
    code: "R2a",
    titre: "Planning",
    description: "12 séances programmées",
    path: "/admin/formations/planning",
  },
  {
    code: "R2b",
    titre: "Supports",
    description: "8 supports publiés",
    path: "/admin/formations/supports",
  },
  {
    code: "R2c",
    titre: "Assiduité",
    description: "Par équipe",
    path: "/admin/formations?tab=presence",
  },
];

// ======================================
// COMPOSANT PRINCIPAL
// ======================================

export default function SuiviFormations() {
  const { openAdminMenu } = useOutletContext<{
    openAdminMenu: () => void;
  }>();

  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab");

  const [recherche, setRecherche] = useState("");

  const tauxAssiduite = 82;
  const equipesSousSeuil = 2;

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

      <header
        className="
          flex flex-wrap items-center
          justify-between gap-4
        "
      >
        {/* RECHERCHE */}

        <div className="flex min-w-0 flex-1 items-center gap-3">
          {/* MENU MOBILE */}

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

          {/* CHAMP DE RECHERCHE */}

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

        {/* PROFIL ET MESSAGERIE */}

        <div className="flex items-center gap-[15px]">
          {/* ICÔNE MESSAGERIE */}

          <div
            className="
              relative flex h-[52px] w-[52px]
              items-center justify-center
              rounded-full bg-[#F6F7FB]
            "
            aria-label="Indicateur de messagerie"
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

          {/* PROFIL RESPONSABLE */}

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
              <p
                className="
                  text-[17px] font-extrabold
                  leading-tight text-[#0A1430]
                "
              >
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

      {activeTab === "presence" ? (
        <AssiduiteFormations />
      ) : (
        <main
          className="
            mx-auto mt-[58px]
            w-full max-w-[1550px]
            lg:mt-[59px]
          "
        >
          {/* TITRE */}

        <h1
          className="
            text-[35px] font-black
            leading-[1.15]
            tracking-[-0.035em]
            text-[#0E1E4A]
            sm:text-[43px]
            lg:text-[46px]
          "
        >
          Formations
        </h1>

        {/* =====================================
            SÉANCES + ASSIDUITÉ
        ===================================== */}

        <div
          className="
            mt-[25px] grid grid-cols-1
            items-start gap-[34px]
            lg:grid-cols-[minmax(0,1.37fr)_minmax(0,1fr)]
            lg:gap-[47px]
          "
        >
          {/* =============================
              PROCHAINES SÉANCES
          ============================= */}

          <section
            className="min-w-0 px-0 py-[24px]"
            aria-labelledby="prochaines-seances"
          >
            <h2
              id="prochaines-seances"
              className="
                mb-[16px] text-[22px]
                font-black tracking-[-0.02em]
                text-[#0E1E4A]
              "
            >
              Prochaines séances
            </h2>

            <div className="border-t border-[#ECECE7]">
              {seances.map((seance) => (
                <div
                  key={seance.id}
                  className="
                    grid min-h-[80px]
                    grid-cols-[78px_minmax(0,1fr)]
                    items-center gap-[16px]
                    border-b border-[#ECECE7]
                    py-[14px]
                    sm:grid-cols-[84px_minmax(0,1fr)_auto]
                    sm:gap-[15px]
                  "
                >
                  {/* DATE ET HEURE */}

                  <div
                    className="
                      flex flex-col
                      font-mono text-[15px]
                      font-medium leading-[1.35]
                      text-[#2E67FF]
                    "
                  >
                    <span>{seance.jour}</span>
                    <span>{seance.heure}</span>
                  </div>

                  {/* NOM DE SÉANCE */}

                  <h3
                    className="
                      min-w-0 text-[16px]
                      font-extrabold leading-[1.55]
                      text-[#0A1430]
                    "
                  >
                    {seance.titre}
                  </h3>

                  {/* LIEU ET INSCRITS */}

                  <p
                    className="
                      col-start-2 text-[14px]
                      font-medium leading-[1.4]
                      text-[#7783A0]
                      sm:col-start-auto
                      sm:text-right sm:text-[15px]
                    "
                  >
                    {seance.lieu}
                    {" · "}
                    {seance.inscrits} inscrits
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* =============================
              CARTE ASSIDUITÉ
          ============================= */}

          <aside
            className="
              flex min-h-[336px]
              flex-col rounded-[27px]
              bg-[#0E1E4A]
              px-[27px] py-[27px]
              text-white
            "
            aria-label="Assiduité de la catégorie"
          >
            <p
              className="
                font-mono text-[12px]
                font-bold uppercase
                tracking-[0.025em]
                text-[#F2C45A]
              "
            >
              ASSIDUITÉ DE LA CATÉGORIE
            </p>

            <strong
              className="
                mt-[10px]
                font-mono text-[68px]
                font-extrabold
                leading-[1.05]
                tracking-[-0.05em]
                text-white
                sm:text-[74px]
              "
            >
              {tauxAssiduite} %
            </strong>

            {/* BARRE DE PROGRESSION */}

            <div
              className="
                mt-[12px] h-[9px]
                w-full overflow-hidden
                rounded-full bg-[#364468]
              "
              role="progressbar"
              aria-label="Taux d'assiduité"
              aria-valuenow={tauxAssiduite}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="
                  h-full rounded-full
                  bg-[#F2C45A]
                "
                style={{
                  width: `${tauxAssiduite}%`,
                }}
              />
            </div>

            <p
              className="
                mt-[13px] text-[16px]
                font-medium text-[#D4DDF5]
              "
            >
              {equipesSousSeuil} équipes sous 70 %
            </p>
          </aside>
        </div>

        {/* =====================================
            RACCOURCIS R2a / R2b / R2c
        ===================================== */}

        <nav
          aria-label="Rubriques de formation"
          className="
            mt-[39px]
            grid grid-cols-1
            gap-[28px]
            sm:grid-cols-3
            sm:gap-[24px]
          "
        >
          {raccourcis.map((raccourci) => (
            <Link
              key={raccourci.code}
              to={raccourci.path}
              className="
                group flex flex-col
                items-start rounded-[16px]
                px-[2px] py-[7px]
                transition-colors
                hover:bg-[#F6F7FA]
              "
            >
              {/* CODE DE PAGE */}

              <span
                className="
                  font-mono text-[14px]
                  font-medium text-[#2E67FF]
                "
              >
                {raccourci.code}
              </span>

              {/* NOM ET FLÈCHE */}

              <span
                className="
                  mt-[9px]
                  inline-flex items-center gap-[10px]
                  text-[23px] font-black
                  leading-[1.25]
                  tracking-[-0.02em]
                  text-[#0E1E4A]
                "
              >
                {raccourci.titre}

                <ArrowRight
                  size={25}
                  strokeWidth={1.5}
                  className="
                    transition-transform
                    group-hover:translate-x-1
                  "
                />
              </span>

              {/* DESCRIPTION */}

              <span
                className="
                  mt-[10px] text-[15px]
                  font-medium text-[#7783A0]
                "
              >
                {raccourci.description}
              </span>
            </Link>
          ))}
        </nav>
      </main>
      )}
    </div>
  );
}
