// Modèles d'e-mails. Chaque fonction renvoie { sujet, texte, html }.

function echapper(valeur) {
  return String(valeur).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

// Types d'invités (table invite) : pour le libellé du badge d'un invité.
const LIBELLES_TYPE_INVITE = {
  etudiant_upb: "Invité (étudiant UPB)",
  particulier: "Invité",
  entreprise: "Invité (entreprise)",
};

// Types de badge (table qrcode).
const LIBELLES_BADGE = {
  invite: "Invité",
  jure: "Juré",
  encadreur: "Encadreur / Formateur",
  formateur: "Encadreur / Formateur",
  organisateur: "Organisateur",
  partenaire: "Partenaire",
  benevole: "Bénévole",
};

export function emailCode({ code, minutes }) {
  return {
    sujet: "Votre code de vérification GENIE UPB",
    texte: [
      `Votre code de vérification GENIE UPB est : ${code}`,
      `Il est valable ${minutes} minutes.`,
      "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
    ].join("\n"),
    html: `<p>Bonjour,</p>
<p>Votre code de vérification GENIE UPB est :</p>
<p style="font-size:28px;font-weight:bold;letter-spacing:6px">${echapper(code)}</p>
<p>Il est valable ${minutes} minutes.</p>
<p>Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>`,
  };
}

// E-mail du badge.
//   typeBadge     type du badge (table qrcode), ex. "jure"
//   typeInvite    pour les invités : etudiant_upb, particulier ou entreprise
//   lienMotDePasse lien pour définir le mot de passe d'un compte créé
//   reemis        true quand le badge remplace un badge désactivé
export function emailBadge({
  prenom,
  nom,
  typeBadge = "invite",
  typeInvite,
  lienMotDePasse,
  reemis = false,
}) {
  const libelle =
    (typeInvite && LIBELLES_TYPE_INVITE[typeInvite]) || LIBELLES_BADGE[typeBadge] || "Badge";

  let introduction;
  let sujet = "Votre badge GENIE UPB 2026";
  if (reemis) {
    introduction =
      "Votre badge GENIE UPB 2026 a été réémis. L'ancien badge ne fonctionne plus : seul le badge joint à ce message est valable.";
    sujet = "Votre nouveau badge GENIE UPB 2026";
  } else if (typeBadge === "invite") {
    introduction = "Votre inscription au concours GENIE UPB 2026 est confirmée.";
  } else if (typeBadge === "benevole") {
    introduction =
      "Votre candidature de bénévole pour le concours GENIE UPB 2026 est acceptée. Merci de votre engagement !";
  } else {
    introduction = "Votre badge GENIE UPB 2026 est prêt.";
  }

  const droits =
    typeBadge === "invite"
      ? "Le badge est strictement personnel. Il donne accès au site ; il ne donne pas droit aux repas."
      : "Le badge est strictement personnel : ne le prêtez à personne.";

  const lignes = [
    `Bonjour ${prenom} ${nom},`,
    "",
    introduction,
    `Type de badge : ${libelle}.`,
    "",
    "Votre badge numérique (QR code) est joint à ce message. Enregistrez l'image dans votre téléphone : vous la présenterez à l'entrée et à la sortie du site, même sans connexion.",
    droits,
  ];
  if (lienMotDePasse) {
    lignes.push(
      "",
      "Un compte GENIE UPB a été créé pour vous. Pour définir votre mot de passe, ouvrez ce lien :",
      lienMotDePasse
    );
  }
  lignes.push("", "L'équipe GENIE UPB");

  const htmlLien = lienMotDePasse
    ? `<p>Un compte GENIE UPB a été créé pour vous. <a href="${echapper(lienMotDePasse)}">Définir mon mot de passe</a>.</p>`
    : "";

  return {
    sujet,
    texte: lignes.join("\n"),
    html: `<p>Bonjour ${echapper(prenom)} ${echapper(nom)},</p>
<p>${echapper(introduction)}<br>Type de badge : <strong>${echapper(libelle)}</strong>.</p>
<p>Votre badge numérique (QR code) est joint à ce message. Enregistrez l'image dans votre téléphone : vous la présenterez à l'entrée et à la sortie du site, même sans connexion.</p>
<p>${echapper(droits)}</p>
${htmlLien}
<p>L'équipe GENIE UPB</p>`,
  };
}

// Invitation à une rencontre (entretien) envoyée à un candidat bénévole.
// details : texte libre du responsable (jour, heure, lieu...), facultatif.
export function emailRencontreBenevole({ prenom, details }) {
  const lignes = [
    `Bonjour ${prenom},`,
    "",
    "Merci pour votre candidature de bénévole au concours GENIE UPB 2026.",
    "La commission Logistique aimerait vous rencontrer pour un court entretien.",
  ];
  if (details) lignes.push("", details);
  lignes.push(
    "",
    "Vous pouvez répondre directement à ce message pour confirmer ou proposer un autre moment.",
    "",
    "L'équipe GENIE UPB"
  );
  return {
    sujet: "Rencontre pour votre candidature de bénévole GENIE UPB",
    texte: lignes.join("\n"),
    html: `<p>Bonjour ${echapper(prenom)},</p>
<p>Merci pour votre candidature de bénévole au concours GENIE UPB 2026.<br>La commission Logistique aimerait vous rencontrer pour un court entretien.</p>
${details ? `<p>${echapper(details).replace(/\n/g, "<br>")}</p>` : ""}
<p>Vous pouvez répondre directement à ce message pour confirmer ou proposer un autre moment.</p>
<p>L'équipe GENIE UPB</p>`,
  };
}

// Réponse négative à un candidat bénévole. motif : facultatif.
export function emailRefusBenevole({ prenom, motif }) {
  const lignes = [
    `Bonjour ${prenom},`,
    "",
    "Merci d'avoir proposé votre aide pour le concours GENIE UPB 2026.",
    "Nous ne pouvons malheureusement pas retenir votre candidature de bénévole cette fois-ci.",
  ];
  if (motif) lignes.push("", `Précision : ${motif}`);
  lignes.push("", "Vous pouvez déposer une nouvelle candidature depuis le site si votre situation change.", "", "L'équipe GENIE UPB");
  return {
    sujet: "Votre candidature de bénévole GENIE UPB",
    texte: lignes.join("\n"),
    html: `<p>Bonjour ${echapper(prenom)},</p>
<p>Merci d'avoir proposé votre aide pour le concours GENIE UPB 2026.<br>Nous ne pouvons malheureusement pas retenir votre candidature de bénévole cette fois-ci.</p>
${motif ? `<p>Précision : ${echapper(motif)}</p>` : ""}
<p>Vous pouvez déposer une nouvelle candidature depuis le site si votre situation change.</p>
<p>L'équipe GENIE UPB</p>`,
  };
}
