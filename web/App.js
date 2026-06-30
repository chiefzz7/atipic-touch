import './global.css';
import React, { useState } from 'react';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');

  if (currentScreen === 'register') {
    return <Register onNavigate={setCurrentScreen} />
  }

  return <Login onNavigate={setCurrentScreen} />;
}