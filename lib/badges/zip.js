// Création d'un fichier ZIP sans bibliothèque.
//
// Les images PNG sont déjà compressées : on les range telles quelles
// ("stocké", sans compression), ce qui est rapide et sûr. Les noms de
// fichiers sont encodés en UTF-8.

const TABLE_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

export function crc32(tampon) {
  let c = 0xffffffff;
  for (let i = 0; i < tampon.length; i++) c = TABLE_CRC[(c ^ tampon[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

// fichiers : [{ nom: "dossier/fichier.png", donnees: Buffer }]
export function creerZip(fichiers) {
  const maintenant = new Date();
  const heureDos =
    (maintenant.getHours() << 11) | (maintenant.getMinutes() << 5) | (maintenant.getSeconds() >> 1);
  const dateDos =
    ((maintenant.getFullYear() - 1980) << 9) | ((maintenant.getMonth() + 1) << 5) | maintenant.getDate();

  const locaux = [];
  const centraux = [];
  let decalage = 0;
  let tailleCentral = 0;

  for (const f of fichiers) {
    const nom = Buffer.from(f.nom, "utf8");
    const donnees = f.donnees;
    const crc = crc32(donnees);

    const entete = Buffer.alloc(30);
    entete.writeUInt32LE(0x04034b50, 0); // signature
    entete.writeUInt16LE(20, 4); // version requise
    entete.writeUInt16LE(0x0800, 6); // noms en UTF-8
    entete.writeUInt16LE(0, 8); // méthode : stocké
    entete.writeUInt16LE(heureDos, 10);
    entete.writeUInt16LE(dateDos, 12);
    entete.writeUInt32LE(crc, 14);
    entete.writeUInt32LE(donnees.length, 18);
    entete.writeUInt32LE(donnees.length, 22);
    entete.writeUInt16LE(nom.length, 26);
    entete.writeUInt16LE(0, 28);
    locaux.push(entete, nom, donnees);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE(20, 4); // version de création
    central.writeUInt16LE(20, 6); // version requise
    central.writeUInt16LE(0x0800, 8);
    central.writeUInt16LE(0, 10);
    central.writeUInt16LE(heureDos, 12);
    central.writeUInt16LE(dateDos, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(donnees.length, 20);
    central.writeUInt32LE(donnees.length, 24);
    central.writeUInt16LE(nom.length, 28);
    central.writeUInt32LE(decalage, 42);
    centraux.push(central, nom);

    tailleCentral += 46 + nom.length;
    decalage += 30 + nom.length + donnees.length;
  }

  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0);
  fin.writeUInt16LE(fichiers.length, 8);
  fin.writeUInt16LE(fichiers.length, 10);
  fin.writeUInt32LE(tailleCentral, 12);
  fin.writeUInt32LE(decalage, 16);

  return Buffer.concat([...locaux, ...centraux, fin]);
}
