import React from 'react';
import LoginScreen from '../screens/Login';
import useTitle from '../hooks/useTitle';

export default function LoginRoute() {
  useTitle('Atipic Touch - Login');
  return <LoginScreen />;
}
