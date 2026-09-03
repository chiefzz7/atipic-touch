import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:8000';

const TOKEN_KEY = '@atipictouch:token';

async function getToken() {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  if (!token) {
    throw new Error('Usuário não autenticado.');
  }

  return token;
}

async function request(endpoint, options = {}) {
  const token = await getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Erro HTTP ${response.status}`;

    try {
      const data = await response.json();

      if (data?.detail) {
        message = data.detail;
      }
    } catch {
      // Mantém a mensagem padrão.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function getFeedingLogs(criancaId) {
  if (!criancaId) {
    throw new Error('ID da criança não informado.');
  }

  return request(
    `/api/feeding-logs/crianca/${criancaId}`
  );
}

export async function getFoods() {
  return request('/api/foods/');
}

export async function getDashboardData(criancaId) {
  const [logs, foods] = await Promise.all([
    getFeedingLogs(criancaId),
    getFoods(),
  ]);

  const foodsById = {};

  foods.forEach((food) => {
    foodsById[food.id] = food;
  });

  const enrichedLogs = logs.map((log) => ({
    ...log,
    alimento: foodsById[log.alimentoId] || null,
  }));

  return {
    logs: enrichedLogs,
    foods,
  };
}
