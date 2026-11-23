import React from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const InviteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Inviter un coéquipier">
    <p className="text-xs text-slate-500 mb-4">Recherchez un étudiant par son matricule UPB pour l'ajouter à votre équipe.</p>
    <Input label="Matricule UPB" placeholder="Ex: UPB-2026-XXXX" className="mb-4" />
    <Button fullWidth onClick={onClose}>Envoyer l'invitation</Button>
  </Modal>
);
