"""Règles de composition des équipes par catégorie (document « Contraintes d'inscription »).

Deux niveaux de contrôle :
  * verifier_ajout()  -> au moment d'inviter / d'accepter : refuse tout ajout qui rendrait
                         l'équipe impossible à compléter (taille max, plafonds de niveau,
                         places restantes insuffisantes pour respecter les minimums).
  * controles()       -> au moment de la soumission : toutes les règles doivent être vraies.

Pour modifier une règle (ex. Technologie confirmée), il suffit d'éditer REGLES ci-dessous.
"""
from dataclasses import dataclass, field

FILIERES_ECO = {"SEA", "SEG"}
FILIERE_DROIT = "SJAP"


@dataclass(frozen=True)
class Regle:
    cle: str
    min_membres: int
    max_membres: int
    # niveaux autorisés (None = tous) et plafonds / minimums par niveau
    niveaux_autorises: frozenset[str] | None = None
    plafonds_niveau: dict[str, int] = field(default_factory=dict)
    minimums_niveau: dict[str, int] = field(default_factory=dict)
    min_filles: int = 0
    # (filières, nombre minimum) exigé quand l'équipe atteint sa taille max
    filieres_si_complete: tuple[frozenset[str], int] | None = None
    # filières acceptées (None = toutes), filières refusées, minimums par filière, plafond par filière
    filieres_autorisees: frozenset[str] | None = None
    filieres_interdites: frozenset[str] = frozenset()
    filieres_obligatoires: dict[str, int] = field(default_factory=dict)
    max_meme_filiere: int | None = None
    document_requis: bool = False
    resume: list[str] = field(default_factory=list)

    def accepte_filiere(self, filiere: str | None) -> bool:
        if self.filieres_autorisees is not None and filiere not in self.filieres_autorisees:
            return False
        return filiere not in self.filieres_interdites

    def message_filiere(self, filiere: str | None) -> str:
        if self.filieres_autorisees is not None:
            liste = " et ".join(sorted(self.filieres_autorisees))
            return f"Cette catégorie est réservée aux étudiants de {liste} (filière de l'étudiant : {filiere or 'inconnue'})."
        liste = ", ".join(sorted(self.filieres_interdites))
        return f"Cette catégorie n'est pas ouverte aux filières {liste} (filière de l'étudiant : {filiere or 'inconnue'})."

    @property
    def taille(self) -> str:
        if self.min_membres == self.max_membres:
            return f"{self.max_membres} membres"
        return f"{self.min_membres} à {self.max_membres} membres"


REGLES: dict[str, Regle] = {
    "innovation": Regle(
        cle="innovation",
        min_membres=1,
        max_membres=6,
        document_requis=True,
        resume=[
            "1 à 6 membres : une seule personne peut présenter son projet.",
            "Idée de solution à déposer (document de 3 pages maximum).",
            "Ouverte à toutes les filières.",
        ],
    ),
    "droit": Regle(
        cle="droit",
        min_membres=6,
        max_membres=6,
        minimums_niveau={"L1": 1, "L2": 1, "L3": 1},
        min_filles=2,
        filieres_autorisees=frozenset({FILIERE_DROIT}),
        resume=[
            "Exactement 6 membres, dont au moins 2 filles.",
            "Au moins un étudiant de L1, de L2 et de L3.",
            "Réservée aux étudiants de la filière SJAP.",
        ],
    ),
    "economie": Regle(
        cle="economie",
        min_membres=4,
        max_membres=6,
        niveaux_autorises=frozenset({"L1", "L2", "L3"}),
        plafonds_niveau={"L1": 3, "L2": 2, "L3": 1},
        minimums_niveau={"L1": 2, "L2": 2},
        filieres_autorisees=frozenset(FILIERES_ECO),
        resume=[
            "4 à 6 membres : au plus 3 L1, 2 L2 et 1 L3 ; au moins 2 L1 et 2 L2.",
            "Réservée aux étudiants des filières SEA et SEG.",
        ],
    ),
    "technologie": Regle(
        cle="technologie",
        min_membres=6,
        max_membres=7,
        plafonds_niveau={"L3": 2},
        min_filles=2,
        filieres_interdites=frozenset({FILIERE_DROIT, *FILIERES_ECO}),
        filieres_obligatoires={"3EA": 1, "ASSRI": 1, "MIAGE": 1},
        max_meme_filiere=4,
        resume=[
            "6 à 7 membres, dont au moins 2 filles et au plus 2 étudiants de L3.",
            "Au moins un étudiant de 3EA, un d'ASSRI et un de MIAGE ; RIT est facultative.",
            "Ouverte à toutes les filières sauf SJAP, SEA et SEG ; au plus 4 étudiants d'une même filière.",
            "Le chef d'équipe (capitaine) est le seul contact de l'équipe avec les organisateurs.",
        ],
    ),
}

REGLE_PAR_DEFAUT = Regle(cle="autre", min_membres=1, max_membres=6, resume=["1 à 6 membres."])


def regle_pour(cle: str | None) -> Regle:
    return REGLES.get(cle or "", REGLE_PAR_DEFAUT)


@dataclass
class Profil:
    """Ce dont les règles ont besoin pour un membre."""

    niveau: str | None
    genre: str | None
    filiere: str | None


@dataclass
class Controle:
    code: str
    libelle: str
    ok: bool
    detail: str

    def as_dict(self) -> dict:
        return {"code": self.code, "libelle": self.libelle, "ok": self.ok, "detail": self.detail}


def _compter(membres: list[Profil], niveau: str) -> int:
    return sum(1 for m in membres if m.niveau == niveau)


def _compter_filiere(membres: list[Profil], filiere: str) -> int:
    return sum(1 for m in membres if m.filiere == filiere)


def _manques(regle: Regle, membres: list[Profil]) -> tuple[int, int, int]:
    """(filles manquantes, places de niveau manquantes, places de filière manquantes)."""
    filles = sum(1 for m in membres if m.genre == "F")
    manque_filles = max(0, regle.min_filles - filles)
    manque_niveaux = sum(max(0, mini - _compter(membres, niv)) for niv, mini in regle.minimums_niveau.items())
    manque_filieres = sum(
        max(0, mini - _compter_filiere(membres, f)) for f, mini in regle.filieres_obligatoires.items()
    )
    return manque_filles, manque_niveaux, manque_filieres


def verifier_ajout(regle: Regle, membres: list[Profil], nouveau: Profil) -> str | None:
    """Renvoie un message d'erreur si `nouveau` ne peut pas rejoindre l'équipe, sinon None."""
    apres = [*membres, nouveau]
    n = len(apres)
    if n > regle.max_membres:
        return f"L'équipe est complète ({regle.max_membres} membres maximum)."

    if regle.niveaux_autorises is not None and nouveau.niveau not in regle.niveaux_autorises:
        autorises = ", ".join(sorted(regle.niveaux_autorises))
        return f"Cette catégorie n'accepte que les niveaux {autorises} (niveau de l'étudiant : {nouveau.niveau or 'inconnu'})."

    for niv, plafond in regle.plafonds_niveau.items():
        if _compter(apres, niv) > plafond:
            return f"L'équipe a déjà {plafond} membre(s) de {niv}, le maximum pour cette catégorie."

    if not regle.accepte_filiere(nouveau.filiere):
        return regle.message_filiere(nouveau.filiere)

    if regle.max_meme_filiere is not None and nouveau.filiere:
        if _compter_filiere(apres, nouveau.filiere) > regle.max_meme_filiere:
            return f"L'équipe a déjà {regle.max_meme_filiere} étudiants de {nouveau.filiere}, le maximum par filière."

    if regle.filieres_si_complete and n == regle.max_membres:
        filieres, mini = regle.filieres_si_complete
        if sum(1 for m in apres if m.filiere in filieres) < mini:
            noms = " ou ".join(sorted(filieres))
            return f"Une équipe de {n} doit compter au moins {mini} étudiants de {noms}."

    restantes = regle.max_membres - n
    manque_filles, manque_niveaux, manque_filieres = _manques(regle, apres)
    # Une même personne peut combler à la fois un manque de fille, de niveau et de filière.
    if max(manque_filles, manque_niveaux, manque_filieres) > restantes:
        besoins = []
        if manque_filles:
            besoins.append(f"{manque_filles} fille(s)")
        if manque_niveaux:
            manquants = [niv for niv, mini in regle.minimums_niveau.items() if _compter(apres, niv) < mini]
            besoins.append("des étudiants de " + ", ".join(manquants))
        if manque_filieres:
            manquantes = [f for f, mini in regle.filieres_obligatoires.items() if _compter_filiere(apres, f) < mini]
            besoins.append("des étudiants de " + ", ".join(manquantes))
        return (
            "Il ne resterait pas assez de places pour respecter les règles de la catégorie "
            f"(il faut encore {' et '.join(besoins)})."
        )
    return None


def controles(regle: Regle, membres: list[Profil], nb_documents: int) -> list[Controle]:
    """Liste des contrôles affichés avant la soumission."""
    n = len(membres)
    res = [
        Controle(
            "effectif",
            "Effectif",
            regle.min_membres <= n <= regle.max_membres,
            f"{n} membre(s) · {regle.taille} requis",
        )
    ]

    if regle.minimums_niveau or regle.plafonds_niveau or regle.niveaux_autorises:
        erreurs = []
        if regle.niveaux_autorises is not None:
            hors = [m.niveau or "inconnu" for m in membres if m.niveau not in regle.niveaux_autorises]
            if hors:
                erreurs.append("niveau non autorisé : " + ", ".join(hors))
        for niv, mini in regle.minimums_niveau.items():
            if _compter(membres, niv) < mini:
                erreurs.append(f"au moins {mini} {niv}")
        for niv, plafond in regle.plafonds_niveau.items():
            if _compter(membres, niv) > plafond:
                erreurs.append(f"au plus {plafond} {niv}")
        repartition = " · ".join(
            f"{niv} : {_compter(membres, niv)}" for niv in sorted({m.niveau or '?' for m in membres})
        )
        res.append(
            Controle(
                "niveaux",
                "Niveaux d'études",
                not erreurs,
                ("Manque : " + ", ".join(erreurs)) if erreurs else (repartition or "—"),
            )
        )

    if regle.min_filles:
        filles = sum(1 for m in membres if m.genre == "F")
        res.append(
            Controle("filles", "Mixité", filles >= regle.min_filles, f"{filles} fille(s) · {regle.min_filles} minimum")
        )

    if (
        regle.filieres_autorisees is not None
        or regle.filieres_interdites
        or regle.filieres_obligatoires
        or regle.max_meme_filiere
    ):
        erreurs = []
        hors = sorted({m.filiere or "inconnue" for m in membres if not regle.accepte_filiere(m.filiere)})
        if hors:
            erreurs.append("filière non acceptée : " + ", ".join(hors))
        manquantes = [f for f, mini in regle.filieres_obligatoires.items() if _compter_filiere(membres, f) < mini]
        if manquantes:
            erreurs.append("il manque " + ", ".join(manquantes))
        if regle.max_meme_filiere is not None:
            trop = sorted({m.filiere for m in membres if m.filiere and _compter_filiere(membres, m.filiere) > regle.max_meme_filiere})
            if trop:
                erreurs.append(f"plus de {regle.max_meme_filiere} étudiants en " + ", ".join(trop))
        repartition = " · ".join(
            f"{f} : {_compter_filiere(membres, f)}" for f in sorted({m.filiere or '?' for m in membres})
        )
        res.append(
            Controle(
                "filieres",
                "Filières",
                not erreurs,
                ("À corriger : " + " ; ".join(erreurs)) if erreurs else (repartition or "—"),
            )
        )

    if regle.filieres_si_complete and n == regle.max_membres:
        filieres, mini = regle.filieres_si_complete
        nb = sum(1 for m in membres if m.filiere in filieres)
        noms = " ou ".join(sorted(filieres))
        res.append(Controle("filieres", "Filières", nb >= mini, f"{nb} étudiant(s) de {noms} · {mini} minimum"))

    if regle.document_requis:
        res.append(
            Controle(
                "document",
                "Document de présentation",
                nb_documents > 0,
                f"{nb_documents} document(s) déposé(s)" if nb_documents else "Déposez l'idée de votre solution (3 pages max.)",
            )
        )
    return res


# --- Participation à plusieurs équipes ---------------------------------------
# Au plus 2 équipes : UNE dans une catégorie « principale » (Droit, Technologie ou Économie, selon la
# filière) et UNE en Innovation. Le rôle (chef ou membre) ne compte pas. La filière est vérifiée à part
# (Regle.accepte_filiere) : SJAP -> Droit, SEA/SEG -> Économie, autres filières -> Technologie.
CATEGORIES = ("technologie", "innovation", "economie", "droit")
CATEGORIES_PRINCIPALES = ("technologie", "economie", "droit")
COMBINAISONS_AUTORISEES = {frozenset({c, "innovation"}) for c in CATEGORIES_PRINCIPALES}
NOMS_CATEGORIES = {"technologie": "Technologie", "innovation": "Innovation", "economie": "Économie", "droit": "Droit"}


def combinaison_valide(cles: list[str | None]) -> bool:
    if len(cles) <= 1:
        return True
    if len(cles) == 2 and len(set(cles)) == 2:
        return frozenset(cles) in COMBINAISONS_AUTORISEES  # type: ignore[arg-type]
    return False


def categories_possibles(cles_actuelles: list[str | None]) -> list[str]:
    """Catégories qu'un candidat peut encore rejoindre compte tenu de ses équipes actuelles (hors filière)."""
    return [c for c in CATEGORIES if combinaison_valide([*cles_actuelles, c])]


def message_incompatibilite(cles_actuelles: list[str | None], nouvelle: str | None, sujet: str = "Tu") -> str:
    tu = sujet == "Tu"
    fais, peux = ("fais", "peux") if tu else ("fait", "peut")
    nom = lambda c: NOMS_CATEGORIES.get(c or "", c or "?")  # noqa: E731
    if len(cles_actuelles) >= 2:
        liste = " et ".join(nom(c) for c in cles_actuelles)
        return f"{sujet} {fais} déjà partie de deux équipes ({liste}) : c'est le maximum."
    actuelle = cles_actuelles[0] if cles_actuelles else None
    if actuelle == nouvelle:
        return f"{sujet} {fais} déjà partie d'une équipe {nom(actuelle)} : une seule équipe par catégorie."
    # Deux catégories principales (ex. Droit + Économie)
    return (
        f"{sujet} {fais} déjà partie d'une équipe {nom(actuelle)} : {sujet.lower() if tu else sujet} {peux} "
        "encore rejoindre une équipe Innovation, mais pas une deuxième équipe en Droit, Technologie ou Économie."
    )
