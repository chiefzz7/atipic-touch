import React from 'react';
import DashboardScreen from '../screens/Dashboard';
import useTitle from '../hooks/useTitle';

export default function DashboardRoute() {
  useTitle('Atipic Touch - Dashboard');
  return <DashboardScreen />;
}
