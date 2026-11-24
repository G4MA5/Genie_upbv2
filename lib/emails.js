// Modèles d'e-mails. Chaque fonction renvoie { sujet, texte, html }.
//
// Tous les e-mails de GENIE UPB partagent le même gabarit : bandeau bleu
// « GÉNIE UPB · 3ᵉ ÉDITION », carte blanche, bouton bleu nuit et pied de page
// UPB. C'est le même que celui du backend FastAPI
// (inscriptions-equipes/app/services/email.py, fonction _gabarit) : toute
// modification du design doit être faite aux deux endroits.

function echapper(valeur) {
  return String(valeur).replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

// Gabarit commun.
//   titre       titre affiché dans le bandeau bleu
//   corpsHtml   contenu (déjà échappé)
//   bouton      { libelle, lien } facultatif
//   repondre    true si le destinataire peut répondre à l'e-mail
function gabarit(titre, corpsHtml, { bouton, repondre = false } = {}) {
  const cta = bouton
    ? `<p style="margin:28px 0 8px"><a href="${echapper(bouton.lien)}" style="background:#0A1430;color:#fff;text-decoration:none;font-weight:800;padding:14px 22px;border-radius:14px;display:inline-block">${echapper(bouton.libelle)} →</a></p>`
    : "";
  const pied = repondre
    ? "Université Polytechnique de Bingerville · Vous pouvez répondre directement à ce message."
    : "Université Polytechnique de Bingerville · Message automatique, merci de ne pas y répondre.";
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="margin:0;background:#F6F8FC;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:24px;overflow:hidden">
<tr><td style="background:#2F6BF0;color:#fff;padding:26px 28px">
<div style="font-weight:900;letter-spacing:.08em;font-size:13px;color:#DCE7FF">GÉNIE UPB · 3ᵉ ÉDITION</div>
<div style="font-weight:900;font-size:24px;margin-top:8px">${echapper(titre)}</div></td></tr>
<tr><td style="padding:26px 28px;color:#3D4459;font-size:15px;line-height:1.55">${corpsHtml}${cta}</td></tr>
<tr><td style="padding:16px 28px;background:#F1F4FA;color:#6A7189;font-size:12px">
${pied}</td></tr>
</table></td></tr></table></body></html>`;
}

// Code de vérification mis en valeur (même encadré que le code de connexion des candidats).
function blocCode(code) {
  return `<p style="margin:22px 0;text-align:center"><span style="display:inline-block;background:#F1F4FA;border-radius:16px;padding:14px 26px;font-size:34px;font-weight:900;letter-spacing:12px;color:#0A1430">${echapper(code)}</span></p>`;
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
    sujet: `${code} est votre code GÉNIE UPB`,
    texte: [
      `Votre code de vérification GENIE UPB est : ${code}`,
      `Il est valable ${minutes} minutes.`,
      "Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.",
    ].join("\n"),
    html: gabarit(
      "Votre code de vérification",
      `<p>Bonjour,</p>
<p>Votre code de vérification GENIE UPB est :</p>
${blocCode(code)}
<p>Il est valable <b>${minutes} minutes</b> et ne sert qu'une fois.</p>
<p>Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.</p>`
    ),
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
  let titre = "Votre badge est prêt";
  if (reemis) {
    introduction =
      "Votre badge GENIE UPB 2026 a été réémis. L'ancien badge ne fonctionne plus : seul le badge joint à ce message est valable.";
    sujet = "Votre nouveau badge GENIE UPB 2026";
    titre = "Votre nouveau badge";
  } else if (typeBadge === "invite") {
    introduction = "Votre inscription au concours GENIE UPB 2026 est confirmée.";
    titre = "Inscription confirmée 🎉";
  } else if (typeBadge === "benevole") {
    introduction =
      "Votre candidature de bénévole pour le concours GENIE UPB 2026 est acceptée. Merci de votre engagement !";
    titre = "Bienvenue parmi les bénévoles 🎉";
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

  return {
    sujet,
    texte: lignes.join("\n"),
    html: gabarit(
      titre,
      `<p>Bonjour ${echapper(prenom)} ${echapper(nom)},</p>
<p>${echapper(introduction)}<br>Type de badge : <strong>${echapper(libelle)}</strong>.</p>
<p>Votre badge numérique (QR code) est joint à ce message. Enregistrez l'image dans votre téléphone : vous la présenterez à l'entrée et à la sortie du site, même sans connexion.</p>
<p>${echapper(droits)}</p>
${lienMotDePasse ? "<p>Un compte GENIE UPB a été créé pour vous : définissez votre mot de passe avec le bouton ci-dessous.</p>" : ""}`,
      lienMotDePasse ? { bouton: { libelle: "Définir mon mot de passe", lien: lienMotDePasse } } : {}
    ),
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
    html: gabarit(
      "Rencontrons-nous",
      `<p>Bonjour ${echapper(prenom)},</p>
<p>Merci pour votre candidature de bénévole au concours GENIE UPB 2026.<br>La commission Logistique aimerait vous rencontrer pour un court entretien.</p>
${details ? `<p>${echapper(details).replace(/\n/g, "<br>")}</p>` : ""}
<p>Vous pouvez répondre directement à ce message pour confirmer ou proposer un autre moment.</p>`,
      { repondre: true }
    ),
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
    html: gabarit(
      "Votre candidature de bénévole",
      `<p>Bonjour ${echapper(prenom)},</p>
<p>Merci d'avoir proposé votre aide pour le concours GENIE UPB 2026.<br>Nous ne pouvons malheureusement pas retenir votre candidature de bénévole cette fois-ci.</p>
${motif ? `<p>Précision : ${echapper(motif)}</p>` : ""}
<p>Vous pouvez déposer une nouvelle candidature depuis le site si votre situation change.</p>`
    ),
  };
}
