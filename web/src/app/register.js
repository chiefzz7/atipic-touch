import React from 'react';
import RegisterScreen from '../screens/Register';
import useTitle from '../hooks/useTitle';

export default function RegisterRoute() {
  useTitle('Atipic Touch - Cadastre-se');
  return <RegisterScreen />;
}
