import {
  cachedFetch,
  invalidateCache,
  CACHE_TTL,
} from "../cache/cache";

import {
  getToken,
} from "../auth/auth";

const API_URL =
  "https://atipic-touch-devlop.onrender.com";

function getApiErrorMessage(
  data,
  fallback
) {
  if (
    typeof data?.detail ===
    "string"
  ) {
    return data.detail;
  }

  if (
    Array.isArray(
      data?.detail
    ) &&
    data.detail[0]?.msg
  ) {
    return data.detail[0].msg;
  }

  return fallback;
}

async function fetchCurrentUser() {
  const token =
    await getToken();

  if (!token) {
    throw new Error(
      "Sessão não encontrada. Faça login novamente."
    );
  }

  const response =
    await fetch(
      `${API_URL}/api/users/me`,
      {
        method: "GET",
        headers: {
          Accept:
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },
      }
    );

  const data =
    await response
      .json()
      .catch(
        () => null
      );

  if (!response.ok) {
    throw new Error(
      getApiErrorMessage(
        data,
        "Não foi possível carregar os dados do responsável."
      )
    );
  }

  return data;
}

async function updateCurrentUserRequest({
  nome,
  telefone,
}) {
  const token =
    await getToken();

  if (!token) {
    throw new Error(
      "Sessão não encontrada. Faça login novamente."
    );
  }

  const response =
    await fetch(
      `${API_URL}/api/users/me`,
      {
        method: "PATCH",

        headers: {
          Accept:
            "application/json",

          "Content-Type":
            "application/json",

          Authorization:
            `Bearer ${token}`,
        },

        body:
          JSON.stringify({
            nome,
            telefone,
          }),
      }
    );

  const data =
    await response
      .json()
      .catch(
        () => null
      );

  if (!response.ok) {
    throw new Error(
      getApiErrorMessage(
        data,
        "Não foi possível atualizar os dados do responsável."
      )
    );
  }

  return data;
}

export function getCurrentUser({ force = false } = {}) {
  return cachedFetch("user", fetchCurrentUser, {
    ttl: CACHE_TTL.user,
    force,
  });
}

export async function updateCurrentUser(...args) {
  const result = await updateCurrentUserRequest(...args);

  invalidateCache("user");

  return result;
}
