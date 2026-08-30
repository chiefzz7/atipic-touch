import React from 'react';
import SettingsScreen from '../screens/Settings';
import useTitle from '../hooks/useTitle';

export default function SettingsRoute() {
  useTitle('Atipic Touch - Configurações');
  return <SettingsScreen />;
}
