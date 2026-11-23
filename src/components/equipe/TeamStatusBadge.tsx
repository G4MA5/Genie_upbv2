import React from 'react';
import { Badge } from '../ui/Badge';
export const TeamStatusBadge: React.FC<{ statut: string }> = ({ statut }) => {
  const map: Record<string, 'blue' | 'green' | 'amber' | 'red'> = {
    soumise: 'blue',
    validee: 'green',
    attente: 'amber',
    refusee: 'red'
  };
  return <Badge variant={map[statut] || 'neutral'}>{statut.toUpperCase()}</Badge>;
};
