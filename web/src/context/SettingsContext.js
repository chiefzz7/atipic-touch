import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS, getMe } from '../services/api';

export const DEFAULT_SETTINGS = {
  profile: { nome: '', email: '', registro: '', telefone: '', especialidade: '', foto: null },
  clinic: { nome: '', endereco: '' },
  documents: { assinatura: null, usarHash: true, usarQrCode: false },
  system: {
    limiarRejeicao: 70,
    amostraMinima: 2,
    autoSync: true,
    intervaloSync: 60,
    alertaOffline: true,
    diasOffline: 7,
    anonimizar: true,
  },
};

const merge = (base, extra) => ({
  profile: { ...base.profile, ...(extra?.profile || {}) },
  clinic: { ...base.clinic, ...(extra?.clinic || {}) },
  documents: { ...base.documents, ...(extra?.documents || {}) },
  system: { ...base.system, ...(extra?.system || {}) },
});

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [ready, setReady] = useState(false);
  const settingsRef = useRef(DEFAULT_SETTINGS);
  const storageKey = useRef(null);

  const apply = useCallback((next) => {
    settingsRef.current = next;
    setSettings(next);
  }, []);

  const resolveKey = useCallback(async () => {
    const userId = (await AsyncStorage.getItem(KEYS.userId)) || 'anon';
    storageKey.current = `@atipictouch:settings:${userId}`;
    return storageKey.current;
  }, []);

  // Carrega as preferências do usuário logado e completa o perfil com os dados da conta.
  const reload = useCallback(async () => {
    let stored = null;
    try {
      const raw = await AsyncStorage.getItem(await resolveKey());
      stored = raw ? JSON.parse(raw) : null;
    } catch {
      /* usa padrões */
    }

    apply(merge(DEFAULT_SETTINGS, stored));
    setReady(true);

    try {
      const token = await AsyncStorage.getItem(KEYS.token);
      if (!token) return;
      const me = await getMe();
      if (!me) return;
      const current = settingsRef.current;
      apply({
        ...current,
        profile: {
          ...current.profile,
          nome: current.profile.nome || me.nome || me.name || '',
          email: current.profile.email || me.email || '',
        },
      });
    } catch {
      /* perfil da conta é opcional */
    }
  }, [apply, resolveKey]);

  useEffect(() => {
    reload();
  }, [reload]);

  const save = useCallback(
    async (patch) => {
      const next = merge(settingsRef.current, patch);
      apply(next);
      await AsyncStorage.setItem(storageKey.current || (await resolveKey()), JSON.stringify(next));
      return next;
    },
    [apply, resolveKey]
  );

  const value = useMemo(() => ({ settings, ready, save, reload }), [settings, ready, save, reload]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings precisa estar dentro de <SettingsProvider>');
  return ctx;
}
