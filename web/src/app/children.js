import React from 'react';
import ChildSelectionScreen from '../screens/ChildSelection';
import useTitle from '../hooks/useTitle';

export default function ChildrenRoute() {
  useTitle('Atipic Touch - Selecione a Criança');
  return <ChildSelectionScreen />;
}
