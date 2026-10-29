import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_URL = 'https://atipic-touch-devlop.onrender.com';

export const KEYS = {
  token: '@atipictouch:token',
  userId: '@atipictouch:user_id',
  perfil: '@atipictouch:perfil',
  child: '@atipictouch:selected_child',
  responsavel: '@atipictouch:selected_responsavel',
};

const DEFAULT_TTL = 60 * 1000;
const cache = new Map(); // key -> { at, data }
const inflight = new Map(); // key -> Promise

export async function getToken() {
  const token = await AsyncStorage.getItem(KEYS.token);
  if (!token) throw new Error('Sessão expirada. Faça login novamente.');
  return token;
}

async function http(endpoint, options = {}) {
  const token = await getToken();
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    let message = `Erro HTTP ${response.status}`;
    try {
      const data = await response.json();
      if (data?.detail && typeof data.detail === 'string') message = data.detail;
    } catch {
      /* mantém mensagem padrão */
    }
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  return response.status === 204 ? null : response.json();
}

/**
 * GET com cache em memória (TTL) e deduplicação de requisições simultâneas.
 * `force: true` ignora o cache e atualiza o valor.
 */
export function cachedGet(endpoint, { ttl = DEFAULT_TTL, force = false } = {}) {
  const hit = cache.get(endpoint);
  if (!force && hit && Date.now() - hit.at < ttl) {
    return Promise.resolve(hit.data);
  }
  if (inflight.has(endpoint)) return inflight.get(endpoint);

  const promise = http(endpoint)
    .then((data) => {
      cache.set(endpoint, { at: Date.now(), data });
      return data;
    })
    .finally(() => inflight.delete(endpoint));

  inflight.set(endpoint, promise);
  return promise;
}

export function peekCache(endpoint) {
  return cache.get(endpoint)?.data;
}

export const getLogs = (childId, opts) =>
  cachedGet(`/api/feeding-logs/crianca/${childId}`, opts);

export const getMe = (opts) =>
  cachedGet('/api/users/me', { ttl: 5 * 60 * 1000, ...opts });

export const logsEndpoint = (childId) => `/api/feeding-logs/crianca/${childId}`;

/** Acorda o servidor (plano gratuito do Render dorme) sem bloquear a UI. */
export function warmUp() {
  try {
    fetch(`${API_URL}/`, { method: 'GET', mode: 'no-cors' }).catch(() => {});
  } catch {
    /* ignore */
  }
}

export async function clearSession() {
  cache.clear();
  await AsyncStorage.multiRemove(Object.values(KEYS));
}
