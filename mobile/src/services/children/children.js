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

async function registerChildRequest({
  nome,
  dataNascimento,
  temasPreferidos,
  restricoesMedicas,
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
      `${API_URL}/api/children/`,
      {
        method: "POST",

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
            dataNascimento,
            temasPreferidos,
            restricoesMedicas,
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
        "Não foi possível cadastrar a criança."
      )
    );
  }

  return data;
}

async function fetchChildren() {
  const token =
    await getToken();

  if (!token) {
    throw new Error(
      "Sessão não encontrada."
    );
  }

  const response =
    await fetch(
      `${API_URL}/api/children/`,
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
        "Não foi possível verificar o cadastro da criança."
      )
    );
  }

  return data;
}

async function updateChildRequest(
  childId,
  {
    nome,
    dataNascimento,
    temasPreferidos,
    restricoesMedicas,
  }
) {
  if (!childId) {
    throw new Error(
      "Criança inválida."
    );
  }

  const token =
    await getToken();

  if (!token) {
    throw new Error(
      "Sessão não encontrada. Faça login novamente."
    );
  }

  const response =
    await fetch(
      `${API_URL}/api/children/${encodeURIComponent(
        childId
      )}`,
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
            dataNascimento,
            temasPreferidos,
            restricoesMedicas,
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
        "Não foi possível atualizar os dados da criança."
      )
    );
  }

  return data;
}

export function getChildren({ force = false } = {}) {
  return cachedFetch("children", fetchChildren, {
    ttl: CACHE_TTL.children,
    force,
  });
}

export async function registerChild(...args) {
  const result = await registerChildRequest(...args);

  invalidateCache("children");

  return result;
}

export async function updateChild(...args) {
  const result = await updateChildRequest(...args);

  invalidateCache("children");

  return result;
}
