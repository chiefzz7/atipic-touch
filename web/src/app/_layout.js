import '../../global.css';
import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { SettingsProvider } from '../context/SettingsContext';
import { warmUp } from '../services/api';

export default function RootLayout() {
  useEffect(() => {
    warmUp();
  }, []);

  return (
    <SettingsProvider>
      <Slot />
    </SettingsProvider>
  );
}
