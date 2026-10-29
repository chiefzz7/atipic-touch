import { useCallback, useEffect, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS, getLogs, getMe, logsEndpoint, peekCache } from '../services/api';
import { useSettings } from '../context/SettingsContext';

/**
 * Fonte única de dados (Dashboard e Relatórios).
 * - Renderiza instantaneamente a partir do cache e revalida em segundo plano.
 * - Respeita a "Sincronização automática" definida em Configurações.
 */
export default function useReportData({ withProfessional = false } = {}) {
  const { settings } = useSettings();
  const { autoSync, intervaloSync } = settings.system;

  const [logs, setLogs] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastSync, setLastSync] = useState(null);
  const childRef = useRef(null);
  const mounted = useRef(true);

  const carregarDados = useCallback(
    async ({ force = false, silent = false } = {}) => {
      try {
        if (!silent) setError('');

        if (!childRef.current) {
          const [token, childData] = await Promise.all([
            AsyncStorage.getItem(KEYS.token),
            AsyncStorage.getItem(KEYS.child),
          ]);
          if (!token) throw new Error('Sessão expirada. Faça login novamente.');
          if (!childData) throw new Error('Nenhuma criança selecionada. Escolha um paciente primeiro.');
          childRef.current = JSON.parse(childData);
          if (mounted.current) setSelectedChild(childRef.current);
        }

        const child = childRef.current;
        const cached = peekCache(logsEndpoint(child.id));
        if (cached && !force && mounted.current) {
          setLogs(cached);
          setLoading(false);
        }
        if (force && mounted.current) setRefreshing(true);

        const [data, me] = await Promise.all([
          getLogs(child.id, { force }),
          withProfessional ? getMe().catch(() => null) : Promise.resolve(null),
        ]);

        if (!mounted.current) return;
        setLogs(data);
        if (me) setProfessional(me);
        setLastSync(new Date());
        setError('');
      } catch (err) {
        if (!mounted.current) return;
        if (!silent) setError(err.message || 'Não foi possível carregar os dados.');
      } finally {
        if (mounted.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [withProfessional]
  );

  useEffect(() => {
    mounted.current = true;
    carregarDados();
    return () => {
      mounted.current = false;
    };
  }, [carregarDados]);

  // Sincronização automática (pausa quando a aba está oculta).
  useEffect(() => {
    if (!autoSync) return undefined;
    const ms = Math.max(15, Number(intervaloSync) || 60) * 1000;
    const id = setInterval(() => {
      if (typeof document !== 'undefined' && document.hidden) return;
      carregarDados({ force: true, silent: true });
    }, ms);
    return () => clearInterval(id);
  }, [autoSync, intervaloSync, carregarDados]);

  const atualizar = useCallback(() => carregarDados({ force: true }), [carregarDados]);

  return {
    logs,
    selectedChild,
    professional,
    loading,
    refreshing,
    error,
    lastSync,
    carregarDados,
    atualizar,
  };
}
