import React from 'react';
import ReportsScreen from '../screens/Reports';
import useTitle from '../hooks/useTitle';

export default function ReportsRoute() {
  useTitle('Atipic Touch - Relatórios');
  return <ReportsScreen />;
}
