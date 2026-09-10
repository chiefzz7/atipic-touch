import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8000';

export default function useReportData() {
  const [logs, setLogs] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [professional, setProfessional] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carregarDados = async () => {
    try {
      setLoading(true);
      setError('');

      const token = await AsyncStorage.getItem(
        '@atipictouch:token'
      );

      const childData = await AsyncStorage.getItem(
        '@atipictouch:selected_child'
      );

      if (!token) {
        throw new Error(
          'Token de autenticação não encontrado.'
        );
      }

      if (!childData) {
        throw new Error(
          'Nenhuma criança selecionada.'
        );
      }

      const child = JSON.parse(childData);

      setSelectedChild(child);

      const [logsResponse, professionalResponse] =
        await Promise.all([
          fetch(
            `${API_URL}/api/feeding-logs/crianca/${child.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          fetch(`${API_URL}/api/users/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

      if (!logsResponse.ok) {
        throw new Error(
          `Erro ao carregar registros: ${logsResponse.status}`
        );
      }

      const logsData = await logsResponse.json();

      setLogs(logsData);

      if (professionalResponse.ok) {
        const professionalData =
          await professionalResponse.json();

        setProfessional(professionalData);
      }
    } catch (err) {
      console.error('ERRO REPORTS:', err);

      setError(
        err.message ||
          'Não foi possível carregar os dados do relatório.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return {
    logs,
    selectedChild,
    professional,
    loading,
    error,
    carregarDados,
  };
}
