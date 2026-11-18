
import { useMemo, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Mail,
  Menu,
  Check,
  X,
  CircleCheck,
  AlertCircle,
} from "lucide-react";

type StatutEquipe =
  | "Soumise"
  | "Validée"
  | "Refusée"
  | "Liste d'attente";

interface Membre {
  id: number;
  initiales: string;
  nom: string;
  filiere: string;
  niveau: string;
  charte: string;
  chef?: boolean;
  couleur: string;
}

interface Verification {
  titre: string;
  description: string;
  conforme: boolean;
}

// Données de démonstration issues de la maquette R1a
const membres: Membre[] = [
  {
    id: 1,
    initiales: "AK",
    nom: "Aya Kouassi",
    filiere: "Génie industriel",
    niveau: "L2",
    charte: "2 déc. · 18:45",
    chef: true,
    couleur: "#CE671F",
  },
  {
    id: 2,
    initiales: "MD",
    nom: "Moussa Diabaté",
    filiere: "Informatique",
    niveau: "L3",
    charte: "3 déc. · 09:12",
    couleur: "#3E7CD5",
  },
  {
    id: 3,
    initiales: "FT",
    nom: "Fatou Touré",
    filiere: "Génie civil",
    niveau: "L1",
    charte: "3 déc. · 21:30",
    couleur: "#009577",
  },
  {
    id: 4,
    initiales: "KY",
    nom: "Koffi Yao",
    filiere: "Électronique",
    niveau: "L2",
    charte: "4 déc. · 11:05",
    couleur: "#A74591",
  },
  {
    id: 5,
    initiales: "SB",
    nom: "Salif Bakayoko",
    filiere: "Mécanique",
    niveau: "L3",
    charte: "5 déc. · 16:48",
    couleur: "#6A7189",
  },
];

const verifications: Verification[] = [
  {
    titre: "Taille d'équipe",
    description: "Conforme",
    conforme: true,
  },
  {
    titre: "Niveau L1 à L3",
    description: "Conforme",
    conforme: true,
  },
  {
    titre: "Chartes acceptées",
    description: "Conforme",
    conforme: true,
  },
];

const couleursStatut: Record<StatutEquipe, string> = {
  Soumise: "bg-[#E3EAFB] text-[#2153CB]",
  Validée: "bg-[#DFF2E7] text-[#17744B]",
  Refusée: "bg-[#FBE6E3] text-[#C8372D]",
  "Liste d'attente": "bg-[#FBEFD2] text-[#8A5A00]",
};

export default function FicheEquipeAdmin() {
  const { id } = useParams<{ id: string }>();

  const { openAdminMenu } = useOutletContext<{
    openAdminMenu: () => void;
  }>();

  const [recherche, setRecherche] = useState("");
  const [statut, setStatut] = useState<StatutEquipe>("Soumise");
  const [modal, setModal] = useState<
    "valider" | "refuser" | "attente" | null
  >(null);
  const [motifRefus, setMotifRefus] = useState("");
  const [notification, setNotification] = useState("");

  const membresFiltres = useMemo(() => {
    const texte = recherche.trim().toLocaleLowerCase("fr");

    return membres.filter((membre) =>
      `${membre.nom} ${membre.filiere} ${membre.niveau}`
        .toLocaleLowerCase("fr")
        .includes(texte)
    );
  }, [recherche]);

  const equipeConforme = verifications.every(
    (verification) => verification.conforme
  );

  function confirmerDecision() {
    if (!modal) return;

    if (modal === "refuser" && !motifRefus.trim()) {
      return;
    }

    if (modal === "valider" && !equipeConforme) {
      setNotification(
        "L'équipe ne remplit pas toutes les conditions."
      );
      setModal(null);
      return;
    }

    const nouveauStatut: Record<
      "valider" | "refuser" | "attente",
      StatutEquipe
    > = {
      valider: "Validée",
      refuser: "Refusée",
      attente: "Liste d'attente",
    };

    setStatut(nouveauStatut[modal]);

    setNotification(
      modal === "valider"
        ? "L'équipe a été validée dans cette démonstration."
        : modal === "refuser"
          ? "La candidature a été refusée dans cette démonstration."
          : "L'équipe a été placée en liste d'attente dans cette démonstration."
    );

    setModal(null);
    setMotifRefus("");
  }

  return (
    <div className="min-h-full bg-white px-4 pb-12 pt-5 font-sans text-[#0A1430] sm:px-7 lg:px-[38px] lg:pt-[31px]">

      {/* =========== HEADER =========== */}

      <header className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <button
            type="button"
            onClick={openAdminMenu}
            aria-label="Ouvrir la navigation"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F5F6FA] lg:hidden"
          >
            <Menu size={21} />
          </button>

          <label className="flex h-[57px] w-full max-w-[450px] items-center gap-3 rounded-full bg-[#F5F6FA] px-[22px]">
            <span className="sr-only">
              Rechercher un membre
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
          <span
            aria-label="Messagerie"
            className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#F6F7FB]"
          >
            <Mail size={20} strokeWidth={2.5} />

            <span className="absolute right-[9px] top-[7px] h-[8px] w-[8px] rounded-full bg-[#ED7327]" />
          </span>

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

      {/* =========== CONTENU =========== */}

      <main className="mx-auto mt-[56px] w-full max-w-[1550px] lg:mt-[59px]">

        {/* RETOUR */}

        <Link
          to="/admin/equipes"
          className="inline-flex items-center gap-2 text-[16px] font-semibold text-[#0E1E4A] transition hover:text-[#2F6BF0]"
        >
          <ArrowLeft size={18} />
          Équipes à valider
        </Link>

        {/* TITRE DE L'ÉQUIPE */}

        <div className="mt-[23px]">
          <p className="text-[15px] font-semibold uppercase tracking-[0.01em] text-[#D95613]">
            INNOVATION · SOUMISE LE 16 DÉC. 2026 À 21:14
          </p>

          <div className="mt-[4px] flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-[37px] font-black leading-[1.15] tracking-[-0.035em] text-[#0E1E4A] sm:text-[50px]">
              Les Bâtisseurs
            </h1>

            <span
              className={`inline-flex items-center gap-2 rounded-full px-[17px] py-[9px] text-[15px] font-bold ${couleursStatut[statut]}`}
            >
              <span className="h-[10px] w-[10px] rounded-full bg-current" />
              {statut}
            </span>
          </div>
        </div>

        {/* TABLEAU + CONFORMITÉ */}

        <div className="mt-[27px] grid grid-cols-1 items-start gap-[40px] xl:grid-cols-[minmax(0,1.85fr)_minmax(270px,1fr)] xl:gap-[45px]">

          {/* TABLEAU MEMBRES */}

          <div className="min-w-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[570px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#E5E5E5]">
                    <th className="pb-[14px] pl-[24px] pr-3 font-mono text-[12px] font-medium uppercase text-[#67799E]">
                      MEMBRE
                    </th>
                    <th className="pb-[14px] pr-3 font-mono text-[12px] font-medium uppercase text-[#67799E]">
                      FILIÈRE
                    </th>
                    <th className="pb-[14px] pr-3 font-mono text-[12px] font-medium uppercase text-[#67799E]">
                      NIVEAU
                    </th>
                    <th className="pb-[14px] font-mono text-[12px] font-medium uppercase text-[#67799E]">
                      CHARTES
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {membresFiltres.map((membre) => (
                    <tr
                      key={membre.id}
                      className="h-[66px] border-b border-[#E9E9E9]"
                    >
                      <td className="py-[11px] pl-[24px] pr-3">
                        <div className="flex items-center gap-[11px]">
                          <span
                            className="flex h-[37px] w-[37px] shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-bold text-white"
                            style={{
                              backgroundColor: membre.couleur,
                            }}
                          >
                            {membre.initiales}
                          </span>

                          <span className="flex min-w-0 items-center gap-2">
                            <span className="text-[15px] font-extrabold leading-[1.3] text-[#0A1430]">
                              {membre.nom}
                            </span>

                            {membre.chef && (
                              <span className="shrink-0 rounded-full bg-[#FFF1CE] px-[10px] py-[4px] text-[12px] font-bold text-[#956200]">
                                Chef
                              </span>
                            )}
                          </span>
                        </div>
                      </td>

                      <td className="py-[11px] pr-3 text-[15px] font-medium text-[#354565]">
                        {membre.filiere}
                      </td>

                      <td className="py-[11px] pr-3 text-[15px] font-bold">
                        {membre.niveau}
                      </td>

                      <td className="whitespace-nowrap py-[11px] text-[14px] font-medium text-[#008455]">
                        <span className="inline-flex items-center gap-[5px]">
                          <Check size={17} strokeWidth={2} />
                          {membre.charte}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {membresFiltres.length === 0 && (
                <p className="p-7 text-center text-sm text-[#8793B1]">
                  Aucun membre trouvé.
                </p>
              )}
            </div>
          </div>

          {/* VÉRIFICATIONS */}

          <aside aria-label="Vérification de conformité">
            {verifications.map((verification) => (
              <div
                key={verification.titre}
                className="flex min-h-[81px] items-start gap-[14px] border-b border-[#EBEBEB] py-[13px]"
              >
                <span
                  className={`mt-[3px] flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full text-white ${
                    verification.conforme
                      ? "bg-[#177A4F]"
                      : "bg-[#DC2626]"
                  }`}
                >
                  {verification.conforme ? (
                    <Check size={22} strokeWidth={2.7} />
                  ) : (
                    <X size={20} strokeWidth={2.7} />
                  )}
                </span>

                <div>
                  <h3 className="text-[15px] font-extrabold text-[#0A1430]">
                    {verification.titre}
                  </h3>

                  <p
                    className={`mt-[3px] text-[14px] font-medium ${
                      verification.conforme
                        ? "text-[#008455]"
                        : "text-[#DC2626]"
                    }`}
                  >
                    {verification.description}
                  </p>
                </div>
              </div>
            ))}
          </aside>
        </div>

        {/* =========== ACTIONS =========== */}

        <div className="mt-[22px] flex flex-wrap items-center gap-[12px]">
          <button
            type="button"
            onClick={() => setModal("valider")}
            disabled={statut === "Validée"}
            className="min-h-[59px] rounded-full bg-[#177A4F] px-[28px] text-[16px] font-extrabold text-white transition hover:bg-[#10653F] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Valider l'équipe
          </button>

          <button
            type="button"
            onClick={() => setModal("refuser")}
            disabled={statut === "Refusée"}
            className="min-h-[59px] rounded-full border border-[#E12F25] bg-white px-[28px] text-[16px] font-bold text-[#CB2720] transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Refuser
          </button>

          <button
            type="button"
            onClick={() => setModal("attente")}
            disabled={statut === "Liste d'attente"}
            className="min-h-[59px] rounded-full border border-[#0E1E4A] bg-white px-[28px] text-[16px] font-semibold text-[#0E1E4A] transition hover:bg-[#F6F7FA] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Mettre en liste d'attente
          </button>
        </div>

        {notification && (
          <div
            role="status"
            className="mt-5 flex items-center gap-3 rounded-xl bg-[#E6F4EC] p-4 text-sm font-semibold text-[#17744B]"
          >
            <CircleCheck size={20} />
            {notification}

            <button
              type="button"
              className="ml-auto"
              onClick={() => setNotification("")}
              aria-label="Fermer le message"
            >
              <X size={18} />
            </button>
          </div>
        )}

      </main>

      {/* =========== MODALE DE DÉCISION =========== */}

      {modal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1430]/65 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModal(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="decision-title"
            className="w-full max-w-[450px] rounded-[25px] bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div
                className={`flex h-[49px] w-[49px] items-center justify-center rounded-full ${
                  modal === "valider"
                    ? "bg-[#E6F5EC] text-[#177A4F]"
                    : modal === "refuser"
                      ? "bg-[#FDE8E8] text-[#DC2626]"
                      : "bg-[#FFF2CE] text-[#956200]"
                }`}
              >
                {modal === "valider" ? (
                  <CircleCheck size={26} />
                ) : (
                  <AlertCircle size={26} />
                )}
              </div>

              <button
                type="button"
                onClick={() => setModal(null)}
                aria-label="Fermer"
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={21} />
              </button>
            </div>

            <h2
              id="decision-title"
              className="mt-5 text-[23px] font-black text-[#0E1E4A]"
            >
              {modal === "valider"
                ? "Valider l'équipe"
                : modal === "refuser"
                  ? "Refuser la candidature"
                  : "Mettre en liste d'attente"}
            </h2>

            <p className="mt-2 text-[14px] text-[#6A7189]">
              Vous êtes sur le point de modifier le statut
              de l'équipe <strong>Les Bâtisseurs</strong>.
            </p>

            {modal === "refuser" && (
              <label className="mt-5 block">
                <span className="mb-2 block text-[14px] font-bold">
                  Motif du refus
                </span>

                <textarea
                  value={motifRefus}
                  onChange={(event) =>
                    setMotifRefus(event.target.value)
                  }
                  rows={4}
                  placeholder="Précisez le motif du refus..."
                  className="w-full resize-none rounded-xl border border-[#DFE3EB] p-3 text-sm outline-none focus:border-[#2F6BF0]"
                />
              </label>
            )}

            <p className="mt-4 text-xs text-[#8793B1]">
              Mode démonstration : aucune décision
              n'est enregistrée sur le serveur.
            </p>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-xl bg-[#F2F4F8] px-5 py-3 text-sm font-bold"
              >
                Annuler
              </button>

              <button
                type="button"
                onClick={confirmerDecision}
                disabled={
                  modal === "refuser" &&
                  !motifRefus.trim()
                }
                className={`rounded-xl px-5 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-40 ${
                  modal === "valider"
                    ? "bg-[#177A4F]"
                    : modal === "refuser"
                      ? "bg-[#DC2626]"
                      : "bg-[#0E1E4A]"
                }`}
              >
                Confirmer
              </button>
            </div>
          </section>
        </div>
      )}

      {/* L'ID est réservé au branchement API ultérieur */}
      <span data-equipe-id={id ?? "1"} hidden />
    </div>
  );
}
