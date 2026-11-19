
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
  Download,
  FileText,
  Eye,
  RotateCcw,
  History,
  FileCheck2,
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

interface HistoriqueSoumission {
  numero: number;
  date: string;
  statut: "Refusée" | "Soumise" | "Validée";
  motif?: string;
  fichier: string;
  taille?: string;
}

interface EquipeDetails {
  id: number;
  nom: string;
  categorie: string;
  dateSoumission: string;
  nomFichier: string;
  tailleFichier: string;
  nbSoumissions: number;
  chefProjet: string;
  descriptionProjet: string;
  historique: HistoriqueSoumission[];
}

const equipesData: Record<number, EquipeDetails> = {
  1: {
    id: 1,
    nom: "Les Bâtisseurs",
    categorie: "Innovation",
    dateSoumission: "16 déc. 2026 à 21:14",
    nomFichier: "Dossier_Projet_Les_Batisseurs_v2.pdf",
    tailleFichier: "4.8 Mo",
    nbSoumissions: 2,
    chefProjet: "Aya Kouassi",
    descriptionProjet:
      "Système intelligent d'optimisation énergétique pour les campus universitaires connectés en Afrique de l'Ouest, intégrant des capteurs IoT low-power et un algorithme prédictif de régulation des charges.",
    historique: [
      {
        numero: 1,
        date: "10 déc. 2026 à 14:20",
        statut: "Refusée",
        motif:
          "Cahier des charges incomplet : budget prévisionnel et étude d'impact environnemental insuffisants.",
        fichier: "Dossier_Projet_Les_Batisseurs_v1.pdf",
        taille: "3.2 Mo",
      },
      {
        numero: 2,
        date: "16 déc. 2026 à 21:14",
        statut: "Soumise",
        motif:
          "Version révisée avec budget complet, bilan carbone et calendrier de déploiement jalonné.",
        fichier: "Dossier_Projet_Les_Batisseurs_v2.pdf",
        taille: "4.8 Mo",
      },
    ],
  },
  2: {
    id: 2,
    nom: "NeoSahel",
    categorie: "Technologie",
    dateSoumission: "17 déc. 2026 à 10:45",
    nomFichier: "Dossier_Projet_NeoSahel_v1.pdf",
    tailleFichier: "3.9 Mo",
    nbSoumissions: 1,
    chefProjet: "Moussa Diabaté",
    descriptionProjet:
      "Plateforme mobile et USSD d'alerte météo agricole géolocalisée et de gestion communautaire des points d'eau pastoraux en zone sahélienne.",
    historique: [
      {
        numero: 1,
        date: "17 déc. 2026 à 10:45",
        statut: "Soumise",
        fichier: "Dossier_Projet_NeoSahel_v1.pdf",
        taille: "3.9 Mo",
      },
    ],
  },
  3: {
    id: 3,
    nom: "Lagune Lab",
    categorie: "Économie",
    dateSoumission: "03 déc. 2026 à 16:30",
    nomFichier: "Dossier_Projet_LaguneLab_v1.pdf",
    tailleFichier: "5.2 Mo",
    nbSoumissions: 1,
    chefProjet: "Fatou Touré",
    descriptionProjet:
      "Micro-assurance paramétrique décentralisée pour les coopératives de pêche artisanale de la lagune Ébrié avec règlements instantanés par Mobile Money.",
    historique: [
      {
        numero: 1,
        date: "03 déc. 2026 à 16:30",
        statut: "Validée",
        fichier: "Dossier_Projet_LaguneLab_v1.pdf",
        taille: "5.2 Mo",
      },
    ],
  },
  4: {
    id: 4,
    nom: "Kaïros",
    categorie: "Droit",
    dateSoumission: "15 déc. 2026 à 18:00",
    nomFichier: "Memoire_Plaidoirie_Kairos_v2.pdf",
    tailleFichier: "4.1 Mo",
    nbSoumissions: 2,
    chefProjet: "Koffi Yao",
    descriptionProjet:
      "Mémoire juridique d'appel et stratégie de plaidoirie relative à la protection des données biométriques des mineurs face aux plateformes numériques d'apprentissage.",
    historique: [
      {
        numero: 1,
        date: "08 déc. 2026 à 11:15",
        statut: "Refusée",
        motif:
          "Manque d'argumentation juridique de droit OHADA et articulation jurisprudentielle incomplète.",
        fichier: "Memoire_Plaidoirie_Kairos_v1.pdf",
        taille: "2.8 Mo",
      },
      {
        numero: 2,
        date: "15 déc. 2026 à 18:00",
        statut: "Soumise",
        motif:
          "Mémoire enrichi avec jurisprudence OHADA et analyse constitutionnelle comparée.",
        fichier: "Memoire_Plaidoirie_Kairos_v2.pdf",
        taille: "4.1 Mo",
      },
    ],
  },
};

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
  const equipeId = Number(id) || 1;
  const donneesInitiales = equipesData[equipeId] || equipesData[1];

  const { openAdminMenu } = useOutletContext<{
    openAdminMenu: () => void;
  }>();

  const [recherche, setRecherche] = useState("");
  const [equipeInfo, setEquipeInfo] = useState<EquipeDetails>(donneesInitiales);
  const [statut, setStatut] = useState<StatutEquipe>(
    donneesInitiales.historique[donneesInitiales.historique.length - 1]?.statut === "Refusée"
      ? "Refusée"
      : donneesInitiales.historique[donneesInitiales.historique.length - 1]?.statut === "Validée"
        ? "Validée"
        : "Soumise"
  );
  const [modal, setModal] = useState<
    "valider" | "refuser" | "attente" | null
  >(null);
  const [motifRefus, setMotifRefus] = useState("");
  const [notification, setNotification] = useState("");
  const [apercuModal, setApercuModal] = useState(false);

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

  function telechargerProjet(fichier?: string) {
    const nomFichierATelecharger = fichier || equipeInfo.nomFichier;
    const contenu = `%PDF-1.4
1 0 obj <</Type /Catalog /Pages 2 0 R>> endobj
2 0 obj <</Type /Pages /Kids [3 0 R] /Count 1>> endobj
3 0 obj <</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources <</Font <</F1 5 0 R>>>>>> endobj
4 0 obj <</Length 280>> stream
BT
/F1 20 Tf
50 720 Td
(GENIE UPB 2027 - DOSSIER DE PROJET OFFICIEL) Tj
0 -35 Td
/F1 14 Tf
(Equipe : ${equipeInfo.nom}) Tj
0 -24 Td
(Categorie : ${equipeInfo.categorie}) Tj
0 -24 Td
(Chef de projet : ${equipeInfo.chefProjet}) Tj
0 -24 Td
(Soumission no : ${equipeInfo.nbSoumissions}) Tj
0 -24 Td
(Date de depot : ${equipeInfo.dateSoumission}) Tj
0 -24 Td
(Fichier source : ${nomFichierATelecharger}) Tj
0 -35 Td
/F1 11 Tf
(Document certifie conforme et telecharge depuis l'espace Responsable GENIE UPB.) Tj
ET
endstream
endobj
5 0 obj <</Type /Font /Subtype /Type1 /BaseFont /Helvetica>> endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000236 00000 n 
0000000450 00000 n 
trailer <</Size 6 /Root 1 0 R>>
startxref
520
%%EOF`;

    const blob = new Blob([contenu], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomFichierATelecharger;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setNotification(`Téléchargement lancé avec succès : ${nomFichierATelecharger}`);
  }

  function simulerNouvelleSoumission() {
    const nextNum = equipeInfo.nbSoumissions + 1;
    const nouveauFichier = `Dossier_Projet_${equipeInfo.nom.replace(/\s+/g, "_")}_v${nextNum}.pdf`;
    const nouvelHistorique: HistoriqueSoumission[] = [
      ...equipeInfo.historique,
      {
        numero: nextNum,
        date: "À l'instant",
        statut: "Soumise",
        fichier: nouveauFichier,
        taille: "5.1 Mo",
        motif: "Nouvelle version révisée déposée suite au refus précédent.",
      },
    ];

    setEquipeInfo({
      ...equipeInfo,
      nbSoumissions: nextNum,
      nomFichier: nouveauFichier,
      tailleFichier: "5.1 Mo",
      dateSoumission: "À l'instant",
      historique: nouvelHistorique,
    });

    setStatut("Soumise");
    setNotification(
      `Nouvelle soumission enregistrée avec succès ! Le compteur est passé à ${nextNum} soumission${nextNum > 1 ? "s" : ""}.`
    );
  }

  function confirmerDecision() {
    if (!modal) return;

    if (modal === "refuser" && !motifRefus.trim()) {
      return;
    }

    if (modal === "valider" && !equipeConforme) {
      setNotification("L'équipe ne remplit pas toutes les conditions.");
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

    const statutChoisi = nouveauStatut[modal];
    setStatut(statutChoisi);

    if (modal === "refuser") {
      const historiqueMaj = equipeInfo.historique.map((h, index) => {
        if (index === equipeInfo.historique.length - 1) {
          return {
            ...h,
            statut: "Refusée" as const,
            motif: motifRefus || "Dossier refusé par le responsable.",
          };
        }
        return h;
      });
      setEquipeInfo({
        ...equipeInfo,
        historique: historiqueMaj,
      });
    } else if (modal === "valider") {
      const historiqueMaj = equipeInfo.historique.map((h, index) => {
        if (index === equipeInfo.historique.length - 1) {
          return {
            ...h,
            statut: "Validée" as const,
          };
        }
        return h;
      });
      setEquipeInfo({
        ...equipeInfo,
        historique: historiqueMaj,
      });
    }

    setNotification(
      modal === "valider"
        ? `L'équipe ${equipeInfo.nom} a été validée avec succès.`
        : modal === "refuser"
          ? `La soumission de l'équipe ${equipeInfo.nom} a été refusée. L'équipe conserve le droit de soumettre un nouveau projet.`
          : `L'équipe ${equipeInfo.nom} a été placée en liste d'attente.`
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

        {/* TITRE DE L'ÉQUIPE + BADGES */}

        <div className="mt-[23px]">
          <p className="text-[15px] font-semibold uppercase tracking-[0.01em] text-[#D95613]">
            {equipeInfo.categorie} · SOUMISE {equipeInfo.dateSoumission.toLowerCase().startsWith('à') ? '' : 'LE '}{equipeInfo.dateSoumission.toUpperCase()}
          </p>

          <div className="mt-[6px] flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-[37px] font-black leading-[1.15] tracking-[-0.035em] text-[#0E1E4A] sm:text-[50px]">
              {equipeInfo.nom}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
              {/* Badge Compteur de Soumissions */}
              <div
                className="inline-flex items-center gap-2 rounded-full border border-[#2153CB]/25 bg-[#EFF4FE] px-[16px] py-[9px] shadow-sm"
                title={`Cette équipe a effectué ${equipeInfo.nbSoumissions} soumission(s) au total`}
              >
                <History size={16} className="text-[#2153CD]" />
                <span className="text-[14px] font-bold text-[#2153CB]">
                  {equipeInfo.nbSoumissions > 1
                    ? `${equipeInfo.nbSoumissions}e soumission`
                    : "1ère soumission"}
                </span>
                <span className="flex h-5 items-center justify-center rounded-full bg-[#2457CD] px-2 text-[11px] font-black text-white">
                  #{equipeInfo.nbSoumissions}
                </span>
              </div>

              {/* Badge Statut */}
              <span
                className={`inline-flex items-center gap-2 rounded-full px-[17px] py-[9px] text-[15px] font-bold ${couleursStatut[statut]}`}
              >
                <span className="h-[10px] w-[10px] rounded-full bg-current" />
                {statut}
              </span>
            </div>
          </div>
        </div>

        {/* =========== CARTE DOSSIER PROJET & COMPTEUR DE SOUMISSIONS =========== */}

        <section aria-labelledby="section-projet" className="mt-[26px]">
          <div className="overflow-hidden rounded-[26px] border border-[#E1E7F3] bg-gradient-to-br from-[#FAFCFF] via-white to-[#F5F8FE] p-6 shadow-sm transition hover:shadow-md sm:p-7">
            {/* Entête du bloc projet */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E9EFF9] pb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFEFE5] text-[#D95613] shadow-sm">
                  <FileText size={24} strokeWidth={2.4} />
                </div>
                <div>
                  <h2 id="section-projet" className="text-[20px] font-extrabold text-[#0E1E4A]">
                    Dossier de projet de l'équipe
                  </h2>
                  <p className="mt-0.5 text-[13px] text-[#6A7189]">
                    Fichier officiel soumis par l'équipe pour examen et évaluation par le jury
                  </p>
                </div>
              </div>

              {/* Widget Compteur de soumissions */}
              <div className="flex items-center gap-3 rounded-2xl border border-[#DFE7F5] bg-white px-4 py-2.5 shadow-[0_4px_16px_rgba(18,38,81,0.05)]">
                <div className="flex flex-col text-right">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#8290AF]">
                    Compteur de soumissions
                  </span>
                  <span className="text-[15px] font-black text-[#0E1E4A]">
                    {equipeInfo.nbSoumissions} {equipeInfo.nbSoumissions > 1 ? "soumissions faites" : "soumission faite"}
                  </span>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2457CD] font-mono text-[18px] font-black text-white shadow-sm">
                  {equipeInfo.nbSoumissions}
                </div>
              </div>
            </div>

            {/* Ligne principale du document avec boutons */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E6EDF8] bg-white p-4 shadow-sm sm:p-5">
              <div className="flex min-w-0 items-center gap-3.5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FDEEE9] text-[#C8372D] shadow-sm">
                  <span className="font-mono text-[13px] font-black uppercase text-[#C8372D]">PDF</span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[16px] font-extrabold text-[#0E1E4A]">
                    {equipeInfo.nomFichier}
                  </p>
                  <p className="mt-0.5 text-[13px] text-[#7180A0]">
                    {equipeInfo.tailleFichier} · Déposé {equipeInfo.dateSoumission.toLowerCase().startsWith('à') ? '' : 'le '}{equipeInfo.dateSoumission} ·{" "}
                    <span className="font-bold text-[#D95613]">
                      Version {equipeInfo.nbSoumissions} (actuelle)
                    </span>
                  </p>
                </div>
              </div>

              {/* Bouton Télécharger le projet & Bouton Aperçu */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setApercuModal(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D5DFEF] bg-white px-4 py-3 text-[14px] font-bold text-[#34476B] transition hover:bg-[#F5F7FB] active:scale-[0.98] w-full sm:w-auto"
                >
                  <Eye size={17} />
                  Aperçu du projet
                </button>

                <button
                  type="button"
                  onClick={() => telechargerProjet()}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2457CD] px-5 py-3 text-[14px] font-extrabold text-white shadow-md transition hover:bg-[#1C47B0] active:scale-[0.98] w-full sm:w-auto"
                >
                  <Download size={18} strokeWidth={2.4} />
                  Télécharger le projet
                </button>
              </div>
            </div>

            {/* Note explicative sur le droit de refournir un projet */}
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-[#DFE8FA] bg-[#F4F7FE] p-3.5 text-[13px] text-[#34476B]">
              <RotateCcw size={17} className="mt-0.5 shrink-0 text-[#2457CD]" />
              <div className="space-y-1">
                <p>
                  <strong className="text-[#0E1E4A]">Fonctionnement du compteur de soumission :</strong>{" "}
                  Si le projet d'une équipe est refusé, celle-ci a le droit de corriger et de refournir un nouveau projet. Le compteur comptabilise chaque soumission effectuée afin que le responsable puisse suivre les itérations.
                </p>
              </div>
            </div>

            {/* Historique des soumissions précédentes */}
            {equipeInfo.historique.length > 0 && (
              <div className="mt-4 rounded-xl border border-[#E9EFF9] bg-white p-4">
                <div className="flex flex-wrap items-center justify-between gap-1 mb-3">
                  <p className="flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-wider text-[#8290AF]">
                    <History size={14} className="shrink-0" />
                    Historique des soumissions de l'équipe ({equipeInfo.historique.length})
                  </p>
                  <span className="text-[12px] text-[#6A7189]">
                    Dernière mise à jour : {equipeInfo.dateSoumission}
                  </span>
                </div>

                <div className="space-y-2.5">
                  {equipeInfo.historique.map((h) => (
                    <div
                      key={h.numero}
                      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 rounded-xl p-3 text-[13px] transition ${
                        h.numero === equipeInfo.nbSoumissions
                          ? "border border-[#BFD5FB] bg-[#F5F8FF]"
                          : "border border-[#EBEBEB] bg-[#FAFAFA]"
                      }`}
                    >
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#0E1E4A] font-mono text-[11px] font-bold text-white">
                            v{h.numero}
                          </span>
                          <span className="truncate font-bold text-[#0E1E4A]">
                            {h.fichier}
                          </span>
                          <span className="text-[12px] text-[#8290AF] shrink-0">({h.date})</span>
                        </div>
                        {h.motif && (
                          <p className="text-[12px] italic text-[#C8372D] pl-8 sm:pl-8 break-words" title={h.motif}>
                            Motif : {h.motif}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-2.5 shrink-0 pl-8 sm:pl-0 pt-1 sm:pt-0 border-t border-gray-100 sm:border-0">
                        <span
                          className={`rounded-full px-2.5 py-1 text-[11px] font-extrabold ${
                            h.statut === "Validée"
                              ? "bg-[#DFF2E7] text-[#17744B]"
                              : h.statut === "Refusée"
                                ? "bg-[#FBE6E3] text-[#C8372D]"
                                : "bg-[#E3EAFB] text-[#2153CB]"
                          }`}
                        >
                          {h.statut}
                        </span>

                        <button
                          type="button"
                          onClick={() => telechargerProjet(h.fichier)}
                          title="Télécharger cette version"
                          className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#D5DFEF] text-[#2457CD] hover:bg-white active:scale-95 transition"
                        >
                          <Download size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bannière d'action si le projet a été refusé : simulation d'un nouveau dépôt */}
            {statut === "Refusée" && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#FCDAD7] bg-[#FFF5F5] p-4 text-[13px]">
                <div className="flex items-center gap-2.5 text-[#C8372D]">
                  <AlertCircle size={20} className="shrink-0" />
                  <div>
                    <p className="font-extrabold">Projet actuellement refusé</p>
                    <p className="text-[12px] text-[#8C231C]">
                      L'équipe a la possibilité de redéposer un projet révisé. Vous pouvez simuler cette nouvelle soumission pour observer l'incrémentation du compteur.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={simulerNouvelleSoumission}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#C8372D] px-4 py-2.5 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#B32B22] active:scale-[0.98]"
                >
                  <RotateCcw size={15} />
                  Simuler nouveau dépôt équipe (Soumission #{equipeInfo.nbSoumissions + 1})
                </button>
              </div>
            )}
          </div>
        </section>

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
              de l'équipe <strong>{equipeInfo.nom}</strong>.
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

      {/* =========== MODALE APERÇU DU PROJET =========== */}

      {apercuModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A1430]/65 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setApercuModal(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="apercu-title"
            className="w-full max-w-[620px] max-h-[90vh] overflow-y-auto rounded-[26px] bg-white p-5 sm:p-7 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#EDF1FA] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFEFE5] text-[#D95613]">
                  <FileText size={22} strokeWidth={2.4} />
                </div>
                <div>
                  <h2 id="apercu-title" className="text-[19px] font-black text-[#0E1E4A]">
                    Aperçu du dossier projet
                  </h2>
                  <p className="text-[12px] text-[#8290AF]">
                    {equipeInfo.nomFichier} · Soumission n° {equipeInfo.nbSoumissions}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setApercuModal(false)}
                aria-label="Fermer"
                className="rounded-xl p-2 text-[#8290AF] hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-[14px]">
              <div className="rounded-xl bg-[#F6F8FD] p-4 border border-[#E9EFFD]">
                <h3 className="font-extrabold text-[#0E1E4A] mb-1">
                  Résumé exécutif du projet
                </h3>
                <p className="text-[#354565] leading-relaxed">
                  {equipeInfo.descriptionProjet}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-[#EDF1FA] p-3">
                  <span className="text-[11px] font-bold uppercase text-[#8290AF] block">
                    Équipe & Chef
                  </span>
                  <span className="font-extrabold text-[#0E1E4A] text-[14px]">
                    {equipeInfo.nom} ({equipeInfo.chefProjet})
                  </span>
                </div>

                <div className="rounded-xl border border-[#EDF1FA] p-3">
                  <span className="text-[11px] font-bold uppercase text-[#8290AF] block">
                    Compteur de soumission
                  </span>
                  <span className="font-extrabold text-[#2457CD] text-[14px]">
                    Version {equipeInfo.nbSoumissions} ({equipeInfo.nbSoumissions > 1 ? `${equipeInfo.nbSoumissions}e tentative` : "1ère tentative"})
                  </span>
                </div>

                <div className="rounded-xl border border-[#EDF1FA] p-3">
                  <span className="text-[11px] font-bold uppercase text-[#8290AF] block">
                    Catégorie
                  </span>
                  <span className="font-extrabold text-[#0E1E4A] text-[14px]">
                    {equipeInfo.categorie}
                  </span>
                </div>

                <div className="rounded-xl border border-[#EDF1FA] p-3">
                  <span className="text-[11px] font-bold uppercase text-[#8290AF] block">
                    Format & Taille
                  </span>
                  <span className="font-extrabold text-[#0E1E4A] text-[14px]">
                    PDF conforme · {equipeInfo.tailleFichier}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-[#E6F4EC] bg-[#F2FAF5] p-3 text-[13px] text-[#17744B] flex items-center gap-2">
                <CircleCheck size={18} className="shrink-0" />
                <span>Ce document remplit les critères formels d'éligibilité (taille, format et intégrité).</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3 border-t border-[#EDF1FA] pt-4">
              <button
                type="button"
                onClick={() => setApercuModal(false)}
                className="rounded-xl bg-[#F2F4F8] px-5 py-2.5 text-sm font-bold text-[#34476B]"
              >
                Fermer
              </button>

              <button
                type="button"
                onClick={() => {
                  telechargerProjet();
                  setApercuModal(false);
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2457CD] px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#1C47B0]"
              >
                <Download size={16} />
                Télécharger le document
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
