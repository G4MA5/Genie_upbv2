import React from 'react';
import { urlFichier } from '../../lib/api';
import { couleurAvatar } from '../../lib/format';

interface Props {
  personne: { id?: number; initiales: string; photo_url?: string | null; matricule?: string };
  className?: string;
  couleur?: string;
}

/** Photo de profil si disponible, sinon pastille colorée avec les initiales. */
export default function Avatar({ personne, className = 'w-10 h-10 text-[14px]', couleur }: Props) {
  const photo = urlFichier(personne.photo_url);
  return (
    <span
      style={{
        backgroundColor: photo ? undefined : couleur ?? couleurAvatar(personne.matricule ?? personne.id),
        backgroundImage: photo ? `url(${photo})` : undefined,
      }}
      className={`shrink-0 rounded-full bg-cover bg-center text-white grid place-items-center font-extrabold select-none ${className}`}
    >
      {photo ? '' : personne.initiales}
    </span>
  );
}
