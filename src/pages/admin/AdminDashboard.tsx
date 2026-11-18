
import { useState } from "react";
import {
  Link,
  useOutletContext,
} from "react-router-dom";
import {
  Search,
  Mail,
  ChevronDown,
  Menu,
  CircleDot,
  Triangle,
  ArrowRight,
} from "lucide-react";

import heroImage from "../../assets/images/admin_hero_etudiantes.png";

// TYPES

type StatutEquipe = "Soumise" | "Validée" | "Attente";

interface Equipe {
  id: number;
  nom: string;
  initiales: string;
  membres: number;
  date: string;
  statut: StatutEquipe;
  couleur: string;
}

interface Formateur {
  id: number;
  nom: string;
  initiales: string;
  specialite: string;
  couleur: string;
}

// DONNÉES DE LA MAQUETTE

const equipes: Equipe[] = [
  {
    id: 1,
    nom: "Les Bâtisseurs",
    initiales: "LB",
    membres: 5,
    date: "il y a 2 h",
    statut: "Soumise",
    couleur: "bg-[#DCE6FF] text-[#2457CD]",
  },
  {
    id: 2,
    nom: "NeoSahel",
    initiales: "NS",
    membres: 4,
    date: "hier",
    statut: "Soumise",
    couleur: "bg-[#3263D2] text-white",
  },
  {
    id: 3,
    nom: "Lagune Lab",
    initiales: "LG",
    membres: 6,
    date: "3 déc.",
    statut: "Validée",
    couleur: "bg-[#ED7327] text-white",
  },
  {
    id: 4,
    nom: "Kaïros",
    initiales: "KA",
    membres: 4,
    date: "1 déc.",
    statut: "Attente",
    couleur: "bg-[#0E1E4A] text-white",
  },
];

const formateurs: Formateur[] = [
  {
    id: 1,
    nom: "Yao Kouamé",
    initiales: "YK",
    specialite: "Pitch & business model",
    couleur: "bg-[#3263D2]",
  },
  {
    id: 2,
    nom: "Awa Bamba",
    initiales: "AB",
    specialite: "Prototypage rapide",
    couleur: "bg-[#ED7327]",
  },
  {
    id: 3,
    nom: "Ibrahim Koné",
    initiales: "IK",
    specialite: "Design thinking",
    couleur: "bg-[#14794E]",
  },
];

const statutStyle: Record<StatutEquipe, string> = {
  Soumise: "bg-[#E4EBFB] text-[#2457D5]",
  Validée: "bg-[#DDF7E9] text-[#08784B]",
  Attente: "bg-[#FFF2BE] text-[#916000]",
};

export default function AdminDashboard() {
  const { openAdminMenu } = useOutletContext<{
    openAdminMenu: () => void;
  }>();

  const [recherche, setRecherche] = useState("");
  const [filtre, setFiltre] = useState("Toutes");

  const equipesFiltrees = equipes.filter((equipe) => {
    const rechercheOK = equipe.nom
      .toLocaleLowerCase("fr")
      .includes(recherche.toLocaleLowerCase("fr"));

    const filtreOK =
      filtre === "Toutes" || equipe.statut === filtre;

    return rechercheOK && filtreOK;
  });

  return (
    <div className="min-h-full bg-white px-4 pb-10 pt-5 text-[#0A1430] sm:px-7 lg:px-[38px] lg:pt-[31px] w-full">
      <div className="w-full max-w-[1600px] mx-auto">

      {/* BARRE SUPÉRIEURE */}

      <header className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex min-w-0 flex-1 items-center gap-3">

          <button
            type="button"
            onClick={openAdminMenu}
            aria-label="Ouvrir la navigation"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F5FA] lg:hidden"
          >
            <Menu size={21} />
          </button>

          <label className="flex h-[57px] w-full max-w-[450px] items-center gap-3 rounded-full bg-[#F5F6FA] px-[22px]">
            <span className="sr-only">
              Rechercher une équipe ou un étudiant
            </span>

            <input
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Rechercher une équipe, un étudiant..."
              className="min-w-0 flex-1 bg-transparent text-[15px] font-medium text-[#0A1430] outline-none placeholder:text-[#8C98B5]"
            />

            <Search
              size={17}
              className="shrink-0 text-[#8996B5]"
            />
          </label>
        </div>

        <div className="flex items-center gap-[15px]">

          {/* MESSAGERIE */}

          <Link
            to="/admin"
            aria-label="Messagerie"
            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#F6F7FB]"
          >
            <Mail size={20} strokeWidth={2.5} />

            <span className="absolute right-[9px] top-[7px] h-[8px] w-[8px] rounded-full bg-[#ED7327]" />
          </Link>

          {/* PROFIL */}

          <div className="flex items-center gap-3 rounded-[22px] bg-white px-[9px] py-[8px] shadow-[0_12px_35px_rgba(18,38,81,0.08)]">

            <div className="flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full bg-[#E0E9FF] font-mono text-[17px] font-bold text-[#2457D5]">
              AK
            </div>

            <div className="hidden pr-[8px] sm:block">
              <p className="text-[17px] font-extrabold leading-tight">
                Dr Konan
              </p>

              <p className="mt-1 text-[12px] text-[#8290AF]">
                Responsable Innovation
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* TITRE */}

      <h1 className="mb-[27px] mt-[34px] text-[27px] font-black tracking-[-0.03em] sm:text-[30px]">
        Vue d'ensemble
      </h1>

      {/* BANNIÈRE BLEUE */}

      <section
        className="relative min-h-[275px] overflow-visible rounded-[35px] bg-[#3163D0] text-white"
        aria-label="Résumé des inscriptions"
      >

        {/* GRILLE DE FOND */}

        <div
          className="absolute inset-0 overflow-hidden rounded-[35px]"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.17) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.17) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "47px 47px",
          }}
        />

        {/* CONTENU BANNIÈRE */}

        <div className="relative z-10 flex min-h-[275px] flex-col justify-center px-[24px] py-[30px] sm:px-[43px]">

          <div className="max-w-[620px]">

            <span className="inline-flex max-w-full items-center rounded-full bg-white px-[20px] py-[9px] text-[25px] font-black leading-tight tracking-tight text-[#2457D5] sm:text-[34px]">
              12 équipes à valider
            </span>

            <p className="mt-[20px] max-w-[470px] text-[16px] font-semibold leading-[1.55] sm:text-[17px]">
              Catégorie Innovation · les validations
              sont ouvertes jusqu'au 18 décembre.
            </p>

            {/* INFOS ÉQUIPES / PLACES */}

            <div className="mt-[19px] flex flex-wrap items-center gap-[26px]">

              <div className="flex items-center gap-[12px]">

                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#F47725] text-white">
                  <CircleDot size={19} strokeWidth={3} />
                </span>

                <div>
                  <p className="text-[17px] font-extrabold">
                    Équipes
                  </p>
                  <p className="text-[13px] font-medium">
                    18 inscrites
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-[12px]">

                <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#DBE6FF] text-[#2457D5]">
                  <Triangle
                    size={19}
                    fill="currentColor"
                    strokeWidth={0}
                  />
                </span>

                <div>
                  <p className="text-[17px] font-extrabold">
                    Places
                  </p>
                  <p className="text-[13px] font-medium">
                    3 restantes sur 12
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* IMAGE DE TON DOSSIER ASSETS */}

        <div className="absolute -top-[22px] bottom-0 right-[3%] hidden w-[33%] overflow-hidden rounded-t-[27px] lg:block">
          <img
            src={heroImage}
            alt="Participantes Génie UPB"
            className="h-full w-full object-cover object-center"
          />
        </div>

      </section>

      {/* TROIS COLONNES */}

      <div className="mt-[28px] grid grid-cols-1 items-start gap-[25px] lg:grid-cols-3">

        {/* COLONNE 1 : ÉQUIPES */}

        <section className="min-w-0">

          <div className="mb-[14px] flex h-[45px] items-center justify-between gap-3">

            <h2 className="text-[21px] font-black tracking-tight">
              Équipes à valider
            </h2>

            <div className="relative">
              <select
                value={filtre}
                onChange={(e) => setFiltre(e.target.value)}
                aria-label="Filtrer les équipes"
                className="h-[38px] appearance-none rounded-xl border border-[#E1E6F0] bg-white py-2 pl-4 pr-8 text-[13px] font-semibold text-[#34476B]"
              >
                <option value="Toutes">Toutes</option>
                <option value="Soumise">Soumises</option>
                <option value="Validée">Validées</option>
                <option value="Attente">Attente</option>
              </select>

              <ChevronDown
                size={13}
                className="pointer-events-none absolute right-3 top-3 text-[#34476B]"
              />
            </div>

          </div>

          <div className="space-y-[7px] rounded-[25px] bg-[#F5F6FA] p-[10px]">

            {equipesFiltrees.map((equipe) => (

              <Link
                key={equipe.id}
                to={`/admin/equipes/${equipe.id}`}
                className="flex min-h-[91px] items-center gap-[14px] rounded-[20px] bg-white px-[14px] py-[13px] transition hover:shadow-md"
              >

                <span
                  className={`flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[13px] font-mono text-[17px] font-extrabold ${equipe.couleur}`}
                >
                  {equipe.initiales}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-[16px] font-extrabold">
                    {equipe.nom}
                  </p>

                  <p className="mt-1 text-[13px] leading-[1.5] text-[#8793B1]">
                    {equipe.membres} membres · {equipe.date}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-[12px] px-[13px] py-[8px] text-[12px] font-extrabold ${statutStyle[equipe.statut]}`}
                >
                  {equipe.statut}
                </span>

              </Link>

            ))}

            {equipesFiltrees.length === 0 && (
              <p className="p-6 text-center text-sm text-[#8793B1]">
                Aucune équipe trouvée.
              </p>
            )}
          </div>

        </section>

        {/* COLONNE 2 : ACTIVITÉ */}

        <section className="min-w-0">

          <h2 className="mb-[14px] flex h-[45px] items-center text-[21px] font-black tracking-tight">
            Activité
          </h2>

          {/* GRAPHIQUE */}

          <div className="flex h-[223px] flex-col overflow-hidden rounded-[27px] bg-[#0A1430] px-[22px] pb-[21px] pt-[21px] text-white">

            <h3 className="text-[18px] font-extrabold">
              Soumissions par semaine
            </h3>

            <p className="mt-[8px] text-[13px] text-[#C3D1F9]">
              Depuis l'ouverture le 23 nov.
            </p>

            <div
              className="mt-auto flex h-[112px] items-end gap-[10px]"
              role="img"
              aria-label="Graphique illustratif des soumissions sur quatre semaines"
            >
              {[28, 52, 43, 86].map((hauteur, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t-[11px] ${
                    index === 3
                      ? "bg-[#5897F7]"
                      : "bg-[#3B4560]"
                  }`}
                  style={{ height: `${hauteur}%` }}
                />
              ))}
            </div>
          </div>

          {/* STATISTIQUES */}

          <div className="mt-[13px] grid grid-cols-2 gap-[12px]">

            <div className="flex min-h-[111px] flex-col justify-center rounded-[26px] bg-[#E1EAFF] px-[19px]">

              <strong className="font-mono text-[33px] font-extrabold leading-none">
                3
              </strong>

              <span className="mt-[12px] text-[13px] font-semibold text-[#725100]">
                En liste d'attente
              </span>
            </div>

            <div className="flex min-h-[111px] flex-col justify-center rounded-[26px] bg-[#ED7327] px-[19px] text-white">

              <strong className="font-mono text-[33px] font-extrabold leading-none">
                86%
              </strong>

              <span className="mt-[12px] text-[13px] font-semibold">
                Assiduité
              </span>
            </div>

          </div>

        </section>

        {/* COLONNE 3 : FORMATEURS */}

        <section className="min-w-0">

          <div className="mb-[14px] flex h-[45px] items-center justify-between gap-3">

            <h2 className="text-[21px] font-black tracking-tight">
              Formateurs
            </h2>

            <Link
              to="/admin/formations"
              className="text-[13px] font-semibold text-[#2F6BF0] underline"
            >
              Voir tout
            </Link>
          </div>

          <div className="space-y-[7px] rounded-[25px] bg-[#F5F6FA] p-[9px]">

            {formateurs.map((formateur) => (
              <div
                key={formateur.id}
                className="flex min-h-[84px] items-center gap-[12px] rounded-[19px] bg-white px-[12px] py-[11px]"
              >

                <span
                  className={`flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full font-mono text-[15px] font-extrabold text-white ${formateur.couleur}`}
                >
                  {formateur.initiales}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-extrabold">
                    {formateur.nom}
                  </p>

                  <p className="mt-1 text-[12px] leading-[1.35] text-[#8793B1]">
                    {formateur.specialite}
                  </p>
                </div>

                <Link
                  to="/admin/formations"
                  className="shrink-0 rounded-xl border border-[#E0E6F0] px-[11px] py-[9px] text-[12px] font-semibold text-[#233457] hover:bg-[#F5F6FA]"
                >
                  Séances
                </Link>
              </div>
            ))}

          </div>
        </section>

      </div>

      </div>
    </div>
  );
}
