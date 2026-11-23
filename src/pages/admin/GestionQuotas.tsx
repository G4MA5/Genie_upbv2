
import { useState } from "react";
import {
  Link,
  useOutletContext,
} from "react-router-dom";
import {
  Search,
  Mail,
  Menu,
  ArrowRight,
} from "lucide-react";

// ==========================================
// TYPES
// ==========================================

interface EquipeAttente {
  id: number;
  position: number;
  nom: string;
  responsable: string;
  date: string;
}

// ==========================================
// DONNÉES DU PROTOTYPE R1b
// ==========================================

const quota = {
  placesPrises: 9,
  placesTotales: 12,
  placesRestantes: 3,
  listeAttente: 4,
};

const equipesAttente: EquipeAttente[] = [
  {
    id: 2,
    position: 1,
    nom: "Atelier 225",
    responsable: "Jean N’Guessan",
    date: "13 déc.",
  },
  {
    id: 1,
    position: 2,
    nom: "Les Bâtisseurs",
    responsable: "Aya Kouassi",
    date: "16 déc.",
  },
  {
    id: 3,
    position: 3,
    nom: "Kora Project",
    responsable: "Ines Ouattara",
    date: "17 déc.",
  },
  {
    id: 4,
    position: 4,
    nom: "Abidjan Makers",
    responsable: "Paul Brou",
    date: "18 déc.",
  },
];

// ==========================================
// COMPOSANT PRINCIPAL
// ==========================================

export default function GestionQuotas() {
  const { openAdminMenu } = useOutletContext<{
    openAdminMenu: () => void;
  }>();

  const [recherche, setRecherche] = useState("");

  const pourcentage =
    (quota.placesPrises / quota.placesTotales) * 100;

  const equipesFiltrees = equipesAttente.filter((equipe) => {
    const texte = recherche
      .trim()
      .toLocaleLowerCase("fr");

    return (
      equipe.nom.toLocaleLowerCase("fr").includes(texte) ||
      equipe.responsable
        .toLocaleLowerCase("fr")
        .includes(texte)
    );
  });

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
              Rechercher une équipe
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
              <p
                className="
                  text-[17px] font-extrabold
                  leading-tight text-[#0A1430]
                "
              >
                Dr Konan
              </p>

              <p
                className="
                  mt-1 text-[12px]
                  text-[#8290AF]
                "
              >
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
          mx-auto mt-[63px]
          w-full max-w-[1550px]
          lg:mt-[67px]
        "
      >
        {/* TITRE */}

        <h1
          className="
            text-[32px] font-black
            leading-[1.16]
            tracking-[-0.035em]
            text-[#0E1E4A]
            sm:text-[40px]
            lg:text-[46px]
          "
        >
          Quotas et liste d'attente
        </h1>

        {/* =====================================
            STATISTIQUES DES QUOTAS
        ===================================== */}

        <section
          className="
            mt-[33px] flex flex-col
            items-center gap-[32px]
            rounded-[24px] bg-white
            py-[22px]
            md:flex-row md:gap-[42px]
            lg:gap-[48px]
          "
          aria-label="Statistiques des quotas"
        >
          {/* GRAPHIQUE CIRCULAIRE */}

          <div
            className="
              relative flex h-[213px] w-[213px]
              shrink-0 items-center
              justify-center rounded-full
            "
            style={{
              background: `
                conic-gradient(
                  #D3661F 0% ${pourcentage}%,
                  #EEECE6 ${pourcentage}% 100%
                )
              `,
              transform: "rotate(-90deg)",
            }}
            role="img"
            aria-label={`${quota.placesPrises} places prises sur ${quota.placesTotales}`}
          >
            {/* CENTRE BLANC */}

            <div
              className="
                flex h-[165px] w-[165px]
                flex-col items-center justify-center
                rounded-full bg-white
              "
              style={{
                transform: "rotate(90deg)",
              }}
            >
              <strong
                className="
                  font-mono text-[44px]
                  font-extrabold leading-none
                  tracking-[-0.045em]
                  text-[#0E1E4A]
                "
              >
                {quota.placesPrises}/{quota.placesTotales}
              </strong>

              <span
                className="
                  mt-[6px] text-[14px]
                  font-semibold text-[#6A7189]
                "
              >
                places prises
              </span>
            </div>
          </div>

          {/* CHIFFRES */}

          <div
            className="
              grid w-full grid-cols-3
              gap-3 sm:gap-6
              md:flex-1 md:gap-[20px]
            "
          >
            {/* TOTAL */}

            <div className="flex min-w-0 flex-col gap-[5px]">
              <strong
                className="
                  font-mono text-[34px]
                  font-extrabold leading-none
                  text-[#0E1E4A]
                  sm:text-[44px]
                "
              >
                {quota.placesTotales}
              </strong>

              <span
                className="
                  text-[12px] font-semibold
                  leading-[1.5] text-[#6A7189]
                  sm:text-[15px]
                "
              >
                places au total
              </span>
            </div>

            {/* RESTANTES */}

            <div className="flex min-w-0 flex-col gap-[5px]">
              <strong
                className="
                  font-mono text-[34px]
                  font-extrabold leading-none
                  text-[#D3661F]
                  sm:text-[44px]
                "
              >
                {quota.placesRestantes}
              </strong>

              <span
                className="
                  text-[12px] font-semibold
                  leading-[1.5] text-[#6A7189]
                  sm:text-[15px]
                "
              >
                places restantes
              </span>
            </div>

            {/* LISTE D'ATTENTE */}

            <div className="flex min-w-0 flex-col gap-[5px]">
              <strong
                className="
                  font-mono text-[34px]
                  font-extrabold leading-none
                  text-[#8A5A00]
                  sm:text-[44px]
                "
              >
                {quota.listeAttente}
              </strong>

              <span
                className="
                  text-[12px] font-semibold
                  leading-[1.5] text-[#6A7189]
                  sm:text-[15px]
                "
              >
                en liste d'attente
              </span>
            </div>
          </div>
        </section>

        {/* =====================================
            LISTE D'ATTENTE
        ===================================== */}

        <section
          className="
            mt-[35px] overflow-hidden
            rounded-[20px] bg-white
          "
          aria-label="Équipes en liste d'attente"
        >
          {equipesFiltrees.map((equipe) => (
            <div
              key={equipe.id}
              className="
                grid min-h-[75px]
                grid-cols-[50px_minmax(0,1fr)_32px]
                items-center gap-[12px]
                border-b border-[#F2F0EA]
                px-2 py-3
                sm:grid-cols-[50px_minmax(0,1fr)_180px_110px_30px]
                sm:gap-[16px] sm:px-[22px]
              "
            >
              {/* POSITION */}

              <span
                className="
                  flex h-[47px] w-[47px]
                  shrink-0 items-center
                  justify-center rounded-full
                  bg-[#FBEFD2]
                  font-mono text-[19px]
                  font-extrabold text-[#8A5A00]
                "
              >
                {equipe.position}
              </span>

              {/* NOM DE L'ÉQUIPE */}

              <div className="min-w-0">
                <p
                  className="
                    truncate text-[16px]
                    font-extrabold text-[#0E1E4A]
                    sm:text-[17px]
                  "
                >
                  {equipe.nom}
                </p>

                {/* INFORMATIONS SUR MOBILE */}

                <div
                  className="
                    mt-[3px] flex flex-wrap
                    gap-x-3 gap-y-1
                    text-[12px] text-[#6A7189]
                    sm:hidden
                  "
                >
                  <span>{equipe.responsable}</span>
                  <span>{equipe.date}</span>
                </div>
              </div>

              {/* RESPONSABLE */}

              <span
                className="
                  hidden truncate text-[15px]
                  font-medium text-[#4A5168]
                  sm:block
                "
              >
                {equipe.responsable}
              </span>

              {/* DATE */}

              <span
                className="
                  hidden whitespace-nowrap
                  text-[15px] font-medium
                  text-[#6A7189]
                  sm:block
                "
              >
                {equipe.date}
              </span>

              {/* ACCÈS FICHE */}

              <Link
                to={
                  equipe.nom === "Les Bâtisseurs"
                    ? "/admin/equipes/1"
                    : "/admin/equipes"
                }
                aria-label={`Consulter ${equipe.nom}`}
                className="
                  flex h-[38px] w-[32px]
                  items-center justify-center
                  rounded-lg text-[#0E1E4A]
                  transition-all
                  hover:bg-[#F5F6FA]
                  hover:text-[#2F6BF0]
                "
              >
                <ArrowRight
                  size={21}
                  strokeWidth={1.6}
                />
              </Link>
            </div>
          ))}

          {/* AUCUN RÉSULTAT */}

          {equipesFiltrees.length === 0 && (
            <div
              className="
                px-5 py-12 text-center
                text-[14px] font-semibold
                text-[#6A7189]
              "
            >
              Aucune équipe trouvée.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
