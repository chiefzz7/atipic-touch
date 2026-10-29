import React from 'react';
import SobreScreen from '../screens/Sobre';
import useTitle from '../hooks/useTitle';

// Rota pública (sem login): apresentação do projeto para a feira.
export default function SobreRoute() {
  useTitle('Atipic Touch - Conheça o projeto');
  return <SobreScreen />;
}
