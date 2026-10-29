/**
 * Cache em memória para as consultas à API.
 *
 * - Evita consultar o banco toda vez que o usuário troca de tela.
 * - Junta chamadas simultâneas iguais em uma só requisição.
 * - É limpo ao entrar/sair da conta e invalidado quando algo é alterado.
 */

export const CACHE_TTL = {
  children: 5 * 60 * 1000,
  user: 5 * 60 * 1000,
  foods: 5 * 60 * 1000,
  logs: 30 * 1000,
};

const store = new Map();
const inflight = new Map();

// Incrementa a cada invalidação para descartar respostas "velhas"
// que ainda estavam a caminho quando algo foi alterado.
let generation = 0;

function clone(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return value;
  }
}

export async function cachedFetch(
  key,
  fetcher,
  { ttl = 60 * 1000, force = false } = {}
) {
  if (!force) {
    const entry = store.get(key);

    if (entry && entry.expiresAt > Date.now()) {
      return clone(entry.value);
    }

    const pending = inflight.get(key);

    if (pending) {
      return clone(await pending);
    }
  }

  const startedAt = generation;

  const promise = (async () => {
    const value = await fetcher();

    if (startedAt === generation) {
      store.set(key, {
        value,
        expiresAt: Date.now() + ttl,
      });
    }

    return value;
  })();

  inflight.set(key, promise);

  try {
    return clone(await promise);
  } finally {
    if (inflight.get(key) === promise) {
      inflight.delete(key);
    }
  }
}

// Remove do cache a chave e tudo que começa com "chave:"
export function invalidateCache(prefix) {
  generation += 1;

  [...store.keys()].forEach((key) => {
    if (key === prefix || key.startsWith(`${prefix}:`)) {
      store.delete(key);
    }
  });

  [...inflight.keys()].forEach((key) => {
    if (key === prefix || key.startsWith(`${prefix}:`)) {
      inflight.delete(key);
    }
  });
}

export function clearCache() {
  generation += 1;
  store.clear();
  inflight.clear();
}
