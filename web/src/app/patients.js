import React from 'react';
import PatientSelectionScreen from '../screens/PatientSelection';
import useTitle from '../hooks/useTitle';

export default function PatientsRoute() {
  useTitle('Atipic Touch - Selecione o Responsável');
  return <PatientSelectionScreen />;
}
