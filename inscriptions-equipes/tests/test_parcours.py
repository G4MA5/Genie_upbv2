"""Parcours complet : inscription, équipe, invitations, retrait, règles, soumission, validation, QR."""
import io

from PIL import Image

from tests.conftest import CODE_TEST, E, connexion, email_de, inscrire

PDF = b"%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF"


def png() -> bytes:
    b = io.BytesIO()
    Image.new("RGB", (20, 20), "red").save(b, format="PNG")
    return b.getvalue()


def test_matricule_inconnu_et_format(client):
    assert client.post("/api/auth/matricule", json={"matricule": "INCONNU123"}).status_code == 404
    assert client.post("/api/auth/matricule", json={"matricule": "ab"}).status_code == 400
    assert client.post("/api/auth/matricule", json={"matricule": "ab cd-ef"}).status_code == 400


def test_inscription_puis_connexion(client):
    r = client.post("/api/auth/matricule", json={"matricule": "kona0101L2F"})
    assert r.json()["statut"] == "nouveau"
    apercu = r.json()["etudiant"]
    assert apercu["niveau"] == "L2" and "email" not in apercu and "token" not in r.json()
    assert r.json()["email_masque"] == "ko********f@e******.test"
    # conditions non acceptées : refus, même avec le bon code
    assert connexion(client, "KONA0101L2F", conditions=False).status_code == 400
    h = inscrire(client, "KONA0101L2F", hebergement=True)
    moi = client.get("/api/espace", headers=h).json()
    assert moi["candidat"]["matricule"] == "KONA0101L2F"
    assert moi["candidat"]["hebergement"] is True
    assert moi["equipes"] == []
    r = client.post("/api/auth/matricule", json={"matricule": " kona0101l2f "})
    assert r.json()["statut"] == "existant" and "token" not in r.json()
    # reconnexion : le code e-mail est exigé aussi pour un compte existant
    r = connexion(client, " kona0101l2f ")
    assert r.status_code == 200 and r.json()["statut"] == "existant" and r.json()["token"]
    assert client.get("/api/espace").status_code == 401
    assert client.get("/api/espace", headers={"Authorization": "Bearer faux"}).status_code == 401


def test_equipe_innovation_complete(client, concours):
    chef = inscrire(client, "CHEF0001L3M")
    a = inscrire(client, "MEMA0001L1F", hebergement=True)
    b = inscrire(client, "MEMB0001L2M")

    r = client.post("/api/equipes", json={"nom": "Les Bâtisseurs", "id_concours": concours["innovation"]}, headers=chef)
    assert r.status_code == 201, r.text
    eq = r.json()
    assert eq["est_chef"] and eq["etat"] == "brouillon" and len(eq["membres"]) == 1
    assert client.post("/api/equipes", json={"nom": "Autre", "id_concours": concours["innovation"]}, headers=chef).status_code == 409

    # nom déjà pris dans la catégorie
    autre_chef = inscrire(client, "AUTR0001L1M")
    r = client.post("/api/equipes", json={"nom": "les  bâtisseurs", "id_concours": concours["innovation"]}, headers=autre_chef)
    assert r.status_code == 409

    # recherche + invitations
    assert client.get("/api/etudiants/MEMA0001L1F", headers=chef).json()["disponible"] is True
    assert client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": "PASINSCRIT1"}, headers=chef).status_code == 404
    assert client.post(f"/api/equipes/{eq["id"]}/invitations", json={"matricule": "MEMA0001L1F"}, headers=a).status_code == 404
    r = client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": "MEMA0001L1F"}, headers=chef)
    assert r.status_code == 201, r.text
    assert len(r.json()["invitations_envoyees"]) == 1
    assert client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": "MEMA0001L1F"}, headers=chef).status_code == 409
    assert client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": "MEMB0001L2M"}, headers=chef).status_code == 201

    # A reçoit aussi une invitation d'une autre équipe
    client.post("/api/equipes", json={"nom": "Rivaux", "id_concours": concours["innovation"]}, headers=autre_chef)
    client.post(f"/api/equipes/{E(client, autre_chef)}/invitations", json={"matricule": "MEMA0001L1F"}, headers=autre_chef)
    invs = client.get("/api/invitations", headers=a).json()
    assert len(invs) == 2
    assert client.get("/api/espace", headers=a).json()["invitations_en_attente"] == 2

    # A accepte Les Bâtisseurs -> l'autre invitation est refusée automatiquement
    id_inv = next(i["id"] for i in invs if i["equipe"]["nom"] == "Les Bâtisseurs")
    r = client.post(f"/api/invitations/{id_inv}/accepter", headers=a)
    assert r.status_code == 200, r.text
    assert len(r.json()["membres"]) == 2 and not r.json()["est_chef"]
    assert client.get("/api/invitations", headers=a).json() == []
    # B refuse
    id_b = client.get("/api/invitations", headers=b).json()[0]["id"]
    assert client.post(f"/api/invitations/{id_b}/refuser", headers=b).status_code == 200

    # un membre ne peut pas inviter / soumettre
    assert client.post(f"/api/equipes/{E(client, a)}/invitations", json={"matricule": "MEMB0001L2M"}, headers=a).status_code == 403
    assert client.post(f"/api/equipes/{E(client, a)}/soumettre", headers=a).status_code == 403

    # hébergement remonté dans la table membre et l'équipe
    detail = client.get("/api/espace", headers=chef).json()["equipes"][0]
    assert [c["code"] for c in detail["controles"]] == ["effectif", "document"]
    assert detail["peut_soumettre"] is False  # document manquant

    # document + soumission
    r = client.post(f"/api/equipes/{E(client, a)}/ressources", files={"fichier": ("idee.pdf", PDF, "application/pdf")}, headers=a)
    assert r.status_code == 201, r.text
    faux = client.post(f"/api/equipes/{E(client, a)}/ressources", files={"fichier": ("x.pdf", b"MZ\x90", "application/pdf")}, headers=a)
    assert faux.status_code == 400
    lien = client.get(f"/api/equipes/{E(client, chef)}/ressources/{r.json()['ressources'][0]['id']}/lien", headers=chef)
    assert lien.status_code == 200 and client.get(lien.json()["url"]).content == PDF

    r = client.post(f"/api/equipes/{E(client, chef)}/soumettre", headers=chef)
    assert r.status_code == 200, r.text
    assert r.json()["etat"] == "soumise" and r.json()["modifiable"] is False
    assert client.patch(f"/api/equipes/{E(client, chef)}", json={"nom": "Nouveau"}, headers=chef).status_code == 409

    # validation organisateurs -> QR + badge
    assert client.post(f"/api/admin/equipes/{eq['id']}/valider").status_code == 403
    r = client.post(f"/api/admin/equipes/{eq['id']}/valider", headers={"X-Admin-Key": "admin-test"})
    assert r.status_code == 200, r.text
    assert r.json()["badges"] == 2
    esp = client.get("/api/espace", headers=a).json()
    assert esp["equipes"][0]["etat"] == "validee" and esp["equipes"][0]["badge_url"]
    badge = client.get(esp["equipes"][0]["badge_url"])
    assert badge.status_code == 200 and badge.content.startswith(b"\x89PNG")


def test_retrait_membre(client, concours):
    chef = inscrire(client, "RCHF0001L3F")
    m = inscrire(client, "RMEM0001L2M")
    client.post("/api/equipes", json={"nom": "Retrait FC", "id_concours": concours["innovation"]}, headers=chef)
    client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": "RMEM0001L2M"}, headers=chef)
    inv = client.get("/api/invitations", headers=m).json()[0]["id"]
    client.post(f"/api/invitations/{inv}/accepter", headers=m)
    id_m = client.get("/api/espace", headers=m).json()["candidat"]["id"]
    assert client.post(f"/api/equipes/{E(client, m)}/membres/{id_m}/retirer", json={"motif": "Plus de nouvelles"}, headers=m).status_code == 403
    r = client.post(f"/api/equipes/{E(client, chef)}/membres/{id_m}/retirer", json={"motif": "Plus de nouvelles"}, headers=chef)
    assert r.status_code == 200 and len(r.json()["membres"]) == 1
    esp = client.get("/api/espace", headers=m).json()
    assert esp["equipes"] == []
    assert esp["retrait"]["equipe"] == "Retrait FC" and esp["retrait"]["motif"] == "Plus de nouvelles"
    # peut recréer une équipe ensuite
    assert client.post("/api/equipes", json={"nom": "Rebond", "id_concours": concours["innovation"]}, headers=m).status_code == 201


def test_regles_droit(client, concours):
    """Droit : 6 membres, ≥ 2 filles, L1/L2/L3 présents — un ajout qui rend l'équipe impossible est refusé."""
    chef = inscrire(client, "DCHF0001L1M")
    client.post("/api/equipes", json={"nom": "Themis", "id_concours": concours["droit"]}, headers=chef)
    joueurs = ["D0000002L1M", "D0000003L1M", "D0000004L1M"]
    for mat in joueurs:
        h = inscrire(client, mat)
        assert client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": mat}, headers=chef).status_code == 201
        inv = client.get("/api/invitations", headers=h).json()[0]["id"]
        assert client.post(f"/api/invitations/{inv}/accepter", headers=h).status_code == 200
    # 4 garçons L1 : il reste 2 places, il manque 2 filles ET L2 + L3 -> un 5e garçon L1 est refusé
    inscrire(client, "D0000005L1M")
    r = client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": "D0000005L1M"}, headers=chef)
    assert r.status_code == 409 and "fille" in r.json()["detail"]
    # une fille L2 puis une fille L3 complètent l'équipe
    for mat in ["D0000006L2F", "D0000007L3F"]:
        h = inscrire(client, mat)
        assert client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": mat}, headers=chef).status_code == 201
        inv = client.get("/api/invitations", headers=h).json()[0]["id"]
        assert client.post(f"/api/invitations/{inv}/accepter", headers=h).status_code == 200
    d = client.get("/api/espace", headers=chef).json()["equipes"][0]
    assert all(c["ok"] for c in d["controles"]), d["controles"]
    assert d["peut_soumettre"] is True and d["places_restantes"] == 0


def test_regles_economie(client, concours):
    chef = inscrire(client, "ECOC0001L1M")
    client.post("/api/equipes", json={"nom": "Les Cauris", "id_concours": concours["economie"]}, headers=chef)
    for mat in ["ECOX0002L1F", "ECOX0003L1M"]:
        h = inscrire(client, mat)
        client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": mat}, headers=chef)
        inv = client.get("/api/invitations", headers=h).json()[0]["id"]
        assert client.post(f"/api/invitations/{inv}/accepter", headers=h).status_code == 200
    inscrire(client, "ECOX0004L1F")
    r = client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": "ECOX0004L1F"}, headers=chef)
    assert r.status_code == 409 and "L1" in r.json()["detail"]
    d = client.get("/api/espace", headers=chef).json()["equipes"][0]
    assert not d["peut_soumettre"]


def test_photo_et_hebergement(client):
    h = inscrire(client, "PHOT0001L2F")
    r = client.post("/api/moi/photo", files={"fichier": ("moi.png", png(), "image/png")}, headers=h)
    assert r.status_code == 200, r.text
    assert client.get(r.json()["photo_url"]).status_code == 200
    assert client.post("/api/moi/photo", files={"fichier": ("moi.png", PDF, "image/png")}, headers=h).status_code == 400
    assert client.patch("/api/moi", json={"hebergement": True}, headers=h).json() == {"hebergement": True}
    assert client.get("/api/espace", headers=h).json()["candidat"]["hebergement"] is True


def test_limitation_debit(client):
    from app import security

    security._appels.clear()
    codes = [client.post("/api/auth/matricule", json={"matricule": "INCONNU123"}).status_code for _ in range(21)]
    assert codes[:20] == [404] * 20 and codes[20] == 429
    security._appels.clear()


def _rejoindre(client, chef, mat):
    h = inscrire(client, mat)
    r = client.post(f"/api/equipes/{E(client, chef)}/invitations", json={"matricule": mat}, headers=chef)
    if r.status_code != 201:
        return r
    inv = client.get("/api/invitations", headers=h).json()[0]["id"]
    return client.post(f"/api/invitations/{inv}/accepter", headers=h)


def test_regles_technologie(client, concours):
    """Technologie : 6-7 membres, ≥ 2 filles, ≤ 2 L3, 3EA + ASSRI + MIAGE obligatoires,
    filières 3EA/ASSRI/MIAGE/RIT uniquement, ≤ 4 par filière."""
    chef = inscrire(client, "TMIAGE01L1M")
    assert client.post("/api/equipes", json={"nom": "Drone Squad", "id_concours": concours["technologie"]}, headers=chef).status_code == 201

    # filière non acceptée
    r = _rejoindre(client, chef, "TECO0001L1F")
    assert r.status_code == 409 and "filières" in r.json()["detail"]

    for mat in ["TMIAGE02L1M", "TMIAGE03L2M", "TMIAGE04L2M"]:
        assert _rejoindre(client, chef, mat).status_code == 200
    # 5e MIAGE refusé (au plus 4 par filière)
    r = _rejoindre(client, chef, "TMIAGE05L1F")
    assert r.status_code == 409 and "MIAGE" in r.json()["detail"]

    assert _rejoindre(client, chef, "TASSRI01L3F").status_code == 200
    assert _rejoindre(client, chef, "T3EA0001L3M").status_code == 200
    # 3e L3 refusé
    r = _rejoindre(client, chef, "TRIT0001L3F")
    assert r.status_code == 409 and "L3" in r.json()["detail"]

    d = client.get("/api/espace", headers=chef).json()["equipes"][0]
    assert len(d["membres"]) == 6 and not d["peut_soumettre"]  # une seule fille
    assert next(c for c in d["controles"] if c["code"] == "filles")["ok"] is False

    assert _rejoindre(client, chef, "TRIT0002L2F").status_code == 200
    d = client.get("/api/espace", headers=chef).json()["equipes"][0]
    assert all(c["ok"] for c in d["controles"]), d["controles"]
    assert d["peut_soumettre"] and d["places_restantes"] == 0


def test_un_email_par_candidat(client):
    inscrire(client, "MEMEMAIL01L1F")
    r = connexion(client, "MEMEMAIL02L2M")
    assert r.status_code == 409 and "e-mail" in r.json()["detail"]


def test_double_participation_technologie_innovation(client, concours):
    """Un candidat peut être dans 2 équipes seulement si l'une est Technologie et l'autre Innovation."""
    x = inscrire(client, "DBLX0001L2F")
    # X crée une équipe Innovation
    assert client.post("/api/equipes", json={"nom": "Duo Inno", "id_concours": concours["innovation"]}, headers=x).status_code == 201
    esp = client.get("/api/espace", headers=x).json()
    assert esp["categories_possibles"] == ["technologie"]
    # une 2e Innovation, Économie ou Droit est refusée
    for cat in ("innovation", "economie", "droit"):
        r = client.post("/api/equipes", json={"nom": f"Autre {cat}", "id_concours": concours[cat]}, headers=x)
        assert r.status_code == 409 and "Technologie" in r.json()["detail"], (cat, r.text)

    # une équipe Technologie l'invite : accepté (X est 3EA ? on force une filière acceptée)
    chef_t = inscrire(client, "DBLMIAGE1L1M")
    client.post("/api/equipes", json={"nom": "Duo Tech", "id_concours": concours["technologie"]}, headers=chef_t)
    t_id = E(client, chef_t)
    # X n'est pas d'une filière Technologie -> refus par les règles de filière, pas par la double participation
    assert client.get(f"/api/etudiants/DBLX0001L2F?equipe={t_id}", headers=chef_t).json()["raison"] is None

    x2 = inscrire(client, "DBL3EA0001L2F")
    assert client.post("/api/equipes", json={"nom": "Inno 2", "id_concours": concours["innovation"]}, headers=x2).status_code == 201
    r = client.post(f"/api/equipes/{t_id}/invitations", json={"matricule": "DBL3EA0001L2F"}, headers=chef_t)
    assert r.status_code == 201, r.text
    # une équipe Économie l'invite aussi -> refusé dès l'envoi
    chef_e = inscrire(client, "DBLECO0001L1M")
    client.post("/api/equipes", json={"nom": "Duo Eco", "id_concours": concours["economie"]}, headers=chef_e)
    r = client.post(f"/api/equipes/{E(client, chef_e)}/invitations", json={"matricule": "DBL3EA0001L2F"}, headers=chef_e)
    assert r.status_code == 409 and "Technologie" in r.json()["detail"]

    inv = client.get("/api/invitations", headers=x2).json()
    assert inv[0]["compatible"] is True
    r = client.post(f"/api/invitations/{inv[0]['id']}/accepter", headers=x2)
    assert r.status_code == 200, r.text
    esp = client.get("/api/espace", headers=x2).json()
    assert sorted(e["concours"]["cle"] for e in esp["equipes"]) == ["innovation", "technologie"]
    assert esp["categories_possibles"] == []
    # plus aucune 3e équipe possible
    r = client.post("/api/equipes", json={"nom": "Trop", "id_concours": concours["technologie"]}, headers=x2)
    assert r.status_code == 409

    # Validation des deux équipes : 1 seul QR code pour X2, mais 2 badges (un par catégorie)
    import os

    import psycopg

    i_id = next(e["id"] for e in esp["equipes"] if e["concours"]["cle"] == "innovation")
    admin = {"X-Admin-Key": "admin-test"}
    with psycopg.connect(os.environ["DATABASE_URL"], autocommit=True) as c:
        c.execute("update public.equipe set soumise_le = now() where id = any(%s)", ([i_id, t_id],))
    for id_e in (i_id, t_id):
        assert client.post(f"/api/admin/equipes/{id_e}/valider", headers=admin).status_code == 200
    with psycopg.connect(os.environ["DATABASE_URL"]) as c:
        qr = c.execute(
            """select q.jeton from public.qrcode q join public."user" u on u.id = q.id_user
               where u.matricule = 'DBL3EA0001L2F' and q.type = 'participant' and q.actif"""
        ).fetchall()
    assert len(qr) == 1
    jeton = str(qr[0][0])
    esp = client.get("/api/espace", headers=x2).json()
    urls = [e["badge_url"] for e in esp["equipes"]]
    assert len(set(urls)) == 2 and all(jeton in u for u in urls)
    images = [client.get(u).content for u in urls]
    assert all(i.startswith(b"\x89PNG") for i in images) and images[0] != images[1]

    # Refus de l'équipe Technologie : X2 garde son QR (encore validé en Innovation), le chef Tech le perd
    assert client.post(f"/api/admin/equipes/{t_id}/refuser", json={"motif": "Dossier incomplet"}, headers=admin).status_code == 200
    with psycopg.connect(os.environ["DATABASE_URL"]) as c:
        actifs = dict(c.execute(
            """select u.matricule, count(q.id) filter (where q.actif) from public."user" u
               left join public.qrcode q on q.id_user = u.id and q.type = 'participant'
               where u.matricule in ('DBL3EA0001L2F', 'DBLMIAGE1L1M') group by u.matricule"""
        ).fetchall())
    assert actifs == {"DBL3EA0001L2F": 1, "DBLMIAGE1L1M": 0}


def test_documents_innovation_uniquement(client, concours):
    """Seule la catégorie Innovation fournit des documents."""
    chef = inscrire(client, "DOCS0001L2F")
    client.post("/api/equipes", json={"nom": "Doc Droit", "id_concours": concours["droit"]}, headers=chef)
    eq_id = E(client, chef)
    esp = client.get("/api/espace", headers=chef).json()
    assert esp["equipes"][0]["documents"] is False
    r = client.post(f"/api/equipes/{eq_id}/ressources", files={"fichier": ("a.pdf", PDF, "application/pdf")}, headers=chef)
    assert r.status_code == 409 and "Innovation" in r.json()["detail"]

    # en Innovation le dépôt est permis ; repasser en Droit avec des documents est refusé
    assert client.patch(f"/api/equipes/{eq_id}", json={"id_concours": concours["innovation"]}, headers=chef).status_code == 200
    r = client.post(f"/api/equipes/{eq_id}/ressources", files={"fichier": ("a.pdf", PDF, "application/pdf")}, headers=chef)
    assert r.status_code == 201 and r.json()["documents"] is True
    r = client.patch(f"/api/equipes/{eq_id}", json={"id_concours": concours["droit"]}, headers=chef)
    assert r.status_code == 409 and "documents" in r.json()["detail"]


def test_code_connexion_email(client):
    """Le matricule seul ne suffit plus : e-mail du dossier + code à 5 chiffres."""
    from app import security
    from app.services.normalisation import masquer_email

    assert masquer_email("gamalabs2.0@gmail.com") == "ga********0@g****.com"
    assert masquer_email("ab@x.ci") == "a*@x*.ci"
    assert masquer_email(None) is None

    m = "CODE0001L2F"
    security._appels.clear()
    # mauvaise adresse : aucun code envoyé
    r = client.post("/api/auth/code", json={"matricule": m, "email": "autre@exemple.test"})
    assert r.status_code == 400 and "ne correspond pas" in r.json()["detail"]
    # la casse et les espaces ne comptent pas
    r = client.post("/api/auth/code", json={"matricule": m, "email": "  " + email_de(m).upper()})
    assert r.status_code == 200 and r.json()["email_masque"].endswith("@e******.test")
    base = {"matricule": m, "email": email_de(m), "conditions_acceptees": True}
    # code de longueur fausse
    assert client.post("/api/auth/verifier", json={**base, "code": "123"}).status_code == 400
    # 5 erreurs : le code est épuisé, même le bon ne passe plus
    for i in range(5):
        r = client.post("/api/auth/verifier", json={**base, "code": "00000"})
        assert r.status_code == 400
    assert "Trop d'essais" in r.json()["detail"]
    r = client.post("/api/auth/verifier", json={**base, "code": CODE_TEST})
    assert r.status_code == 400 and "nouveau code" in r.json()["detail"]
    # nouveau code : ça marche, puis il ne resert pas
    security._appels.clear()
    assert client.post("/api/auth/code", json={"matricule": m, "email": email_de(m)}).status_code == 200
    r = client.post("/api/auth/verifier", json={**base, "code": CODE_TEST})
    assert r.status_code == 200 and r.json()["statut"] == "cree"
    assert client.post("/api/auth/verifier", json={**base, "code": CODE_TEST}).status_code == 400
    # l'ancienne route sans code n'existe plus
    assert client.post("/api/auth/inscription", json={"matricule": m, "conditions_acceptees": True}).status_code in (404, 405)
    # 5 codes par heure au maximum pour un même matricule
    security._appels.clear()
    statuts = [client.post("/api/auth/code", json={"matricule": m, "email": email_de(m)}).status_code for _ in range(4)]
    assert statuts[-1] == 429, statuts
    security._appels.clear()
