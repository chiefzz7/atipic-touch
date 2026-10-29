import { cachedGet, getLogs } from './api';

export { getLogs as getFeedingLogs };

export const getFoods = () => cachedGet('/api/foods/', { ttl: 10 * 60 * 1000 });

export async function getDashboardData(criancaId) {
  if (!criancaId) throw new Error('ID da criança não informado.');

  const [logs, foods] = await Promise.all([getLogs(criancaId), getFoods()]);
  const foodsById = Object.fromEntries(foods.map((food) => [food.id, food]));

  return {
    logs: logs.map((log) => ({ ...log, alimento: foodsById[log.alimentoId] || null })),
    foods,
  };
}
